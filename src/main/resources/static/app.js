let state = {
    username: '',
    useremail: '',
    questions: [],
    currentQuestionIndex: 0,
    score: 0
};

let timerInterval;

// DOM Elements
const screens = {
    loader: document.getElementById('loader-screen'),
    registration: document.getElementById('registration-screen'),
    quiz: document.getElementById('quiz-screen'),
    result: document.getElementById('result-screen')
};

// Initialization
document.addEventListener('DOMContentLoaded', initApp);

async function initApp() {
    try {
        // Fetch questions from the Spring Boot backend
        const response = await fetch('/question/allQuestions');
        if (!response.ok) throw new Error('Failed to fetch questions');
        
        state.questions = await response.json();
        
        // Hide loader and show registration
        showScreen('registration');
    } catch (error) {
        console.error('Error loading quiz:', error);
        screens.loader.innerHTML = '<p style="color: var(--error)">Failed to load quiz data. Please ensure the backend is running.</p>';
    }
}

// Registration logic
document.getElementById('registration-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const usernameInput = document.getElementById('username');
    const useremailInput = document.getElementById('useremail');
    
    if (usernameInput.value.trim() === '' || useremailInput.value.trim() === '') return;
    
    state.username = usernameInput.value.trim();
    state.useremail = useremailInput.value.trim();
    document.getElementById('display-name').textContent = state.username;
    
    if (state.questions.length > 0) {
        startQuiz();
    } else {
        alert("No questions available in the database.");
    }
});

// Quiz Logic
function startQuiz() {
    state.currentQuestionIndex = 0;
    state.score = 0;
    updateScoreDisplay();
    document.getElementById('total-q-num').textContent = state.questions.length;
    showScreen('quiz');
    loadQuestion();
}

function loadQuestion() {
    // Reset Timer
    clearInterval(timerInterval);
    document.getElementById('time-left').textContent = '30';
    document.querySelector('.timer-display').classList.remove('warning');
    
    const question = state.questions[state.currentQuestionIndex];
    
    // Update Progress
    document.getElementById('current-q-num').textContent = state.currentQuestionIndex + 1;
    const progressPercent = ((state.currentQuestionIndex) / state.questions.length) * 100;
    document.getElementById('progress-bar').style.width = `${progressPercent}%`;
    
    // Set Question Text
    document.getElementById('question-text').textContent = question.question;
    
    // Setup Options Grid
    const optionsGrid = document.getElementById('options-grid');
    optionsGrid.innerHTML = '';
    
    // The backend might return options with null if they were mapped wrong, but assuming our recent fix, they should be populated.
    // Using an array to hold the option mapping
    const options = [
        { key: 'A', text: question.option1 },
        { key: 'B', text: question.option2 },
        { key: 'C', text: question.option3 },
        { key: 'D', text: question.option4 }
    ];
    
    options.forEach(opt => {
        if(!opt.text) return; // Skip null options just in case
        
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `<span style="font-weight: bold; margin-right: 10px;">${opt.key}.</span> ${opt.text}`;
        
        btn.addEventListener('click', () => selectOption(opt.key, btn, question.correctAnswer));
        optionsGrid.appendChild(btn);
    });
    
    // Hide Next Button
    const nextBtn = document.getElementById('next-btn');
    nextBtn.classList.add('hidden');
    // Change text if it's the last question
    if (state.currentQuestionIndex === state.questions.length - 1) {
        nextBtn.innerHTML = 'See Results <span class="arrow">→</span>';
    } else {
        nextBtn.innerHTML = 'Next Question <span class="arrow">→</span>';
    }
    
    // Start Timer
    startTimer();
}

function startTimer() {
    let timeLeft = 30;
    const timeDisplay = document.getElementById('time-left');
    const timerContainer = document.querySelector('.timer-display');
    
    timerInterval = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        
        if (timeLeft <= 5) {
            timerContainer.classList.add('warning');
        }
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timeOut();
        }
    }, 1000);
}

function timeOut() {
    const question = state.questions[state.currentQuestionIndex];
    selectOption(null, null, question.correctAnswer);
}

function selectOption(selectedKey, selectedBtn, correctKey) {
    // Stop the timer
    clearInterval(timerInterval);
    
    // Disable all options
    const allBtns = document.querySelectorAll('.option-btn');
    allBtns.forEach(btn => btn.classList.add('disabled'));
    
    // Check if correct
    if (selectedKey === correctKey) {
        selectedBtn.classList.add('correct');
        state.score++;
        updateScoreDisplay();
    } else if (selectedKey !== null) {
        selectedBtn.classList.add('wrong');
    }
        
        // Find and highlight correct answer
        allBtns.forEach(btn => {
            if (btn.innerHTML.includes(`>${correctKey}.</span>`)) {
                btn.classList.add('correct');
            }
        });
    
    // Show Next Button
    document.getElementById('next-btn').classList.remove('hidden');
}

// Next Button Handler
document.getElementById('next-btn').addEventListener('click', () => {
    state.currentQuestionIndex++;
    
    if (state.currentQuestionIndex < state.questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

// Results Logic
function showResults() {
    showScreen('result');
    
    const percentage = Math.round((state.score / state.questions.length) * 100);
    
    // Show reaction gif based on score
    const reactionGif = document.getElementById('reaction-gif');
    reactionGif.classList.remove('hidden');
    
    if (percentage > 50) {
        // Happy cartoon playing trumpet
        reactionGif.src = "https://media.giphy.com/media/3o7TDEPZRUvTtaXmMg/giphy.gif";
    } else {
        // Sad cartoon
        reactionGif.src = "https://media.giphy.com/media/Ty9Sg8oHghPWg/giphy.gif";
    }
    
    document.getElementById('score-percentage').textContent = `${percentage}%`;
    document.getElementById('final-score').textContent = state.score;
    document.getElementById('final-total').textContent = state.questions.length;
    
    // Animate Circle
    setTimeout(() => {
        const circle = document.getElementById('score-circle-fill');
        circle.style.strokeDasharray = `${percentage}, 100`;
        
        // Color based on score
        if (percentage >= 80) circle.style.stroke = "var(--success)";
        else if (percentage < 50) circle.style.stroke = "var(--error)";
    }, 100);
    
    // Feedback Message
    const feedbackEl = document.getElementById('feedback-message');
    if (percentage === 100) feedbackEl.textContent = `Perfect score, ${state.username}!`;
    else if (percentage >= 80) feedbackEl.textContent = `Excellent job, ${state.username}!`;
    else if (percentage >= 50) feedbackEl.textContent = `Good effort, ${state.username}.`;
    else feedbackEl.textContent = `Keep practicing, ${state.username}!`;
    
    // Save to Database
    saveResultToDatabase();
}

async function saveResultToDatabase() {
    try {
        const payload = {
            name: state.username,
            email: state.useremail,
            score: state.score,
            totalQuestions: state.questions.length
        };
        
        await fetch('/result/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        console.log("Result saved successfully.");
    } catch (err) {
        console.error("Failed to save result:", err);
    }
}

// Restart logic
document.getElementById('restart-btn').addEventListener('click', () => {
    const circle = document.getElementById('score-circle-fill');
    circle.style.strokeDasharray = `0, 100`; // Reset circle
    
    // Reset form fields
    document.getElementById('username').value = '';
    document.getElementById('useremail').value = '';
    
    // Go back to registration
    showScreen('registration');
});

// Exit button logic
document.getElementById('exit-btn').addEventListener('click', () => {
    if(confirm("Are you sure you want to exit? Your current score will be saved.")) {
        clearInterval(timerInterval);
        showResults();
    }
});

// Utils
function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.add('hidden'));
    screens[screenName].classList.remove('hidden');
}

function updateScoreDisplay() {
    document.getElementById('current-score').textContent = state.score;
}
