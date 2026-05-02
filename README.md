# QuizzApp 🚀

A professional, full-stack Spring Boot application for managing and taking quizzes. This project features a robust Java backend, a PostgreSQL database, and a clean web interface, all containerized and automated with a modern CI/CD pipeline.

## 🌟 Features

- **Quiz Management**: Fetch and display a list of quiz questions.
- **Result Submission**: Securely submit and store user quiz results.
- **Modern Tech Stack**: Built with Spring Boot 3+ and Java 17.
- **Containerized**: Fully Dockerized for consistent deployment across environments.
- **CI/CD Integrated**: Automated builds and Docker image publishing via GitHub Actions to GitHub Container Registry (GHCR).
- **Responsive UI**: A clean, vanilla JavaScript frontend served directly by the backend.

## 🛠️ Tech Stack

- **Backend**: Java 17, Spring Boot 4.0.5, Spring Data JPA, Hibernate
- **Database**: PostgreSQL
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Tools**: Lombok, Maven, Actuator
- **DevOps**: Docker, GitHub Actions, GHCR

## 🚀 Getting Started

### Prerequisites

- **Java 17** or higher
- **Maven** 3.8+
- **PostgreSQL** (Running locally or via Docker)
- **Docker** (Optional, for containerized run)

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/kaushiksharma639/QuizzApp.git
   cd QuizzApp
   ```

2. **Database Setup**:
   Create a PostgreSQL database named `quizz_question`.
   Update `src/main/resources/application.properties` with your database credentials:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/quizz_question
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

3. **Build the application**:
   ```bash
   ./mvnw clean install
   ```

4. **Run the application**:
   ```bash
   ./mvnw spring-boot:run
   ```
   The application will be available at `http://localhost:8080`.

### Running with Docker

1. **Build the JAR**:
   ```bash
   ./mvnw clean package -DskipTests
   ```

2. **Build the Docker Image**:
   ```bash
   docker build -t quizzapp .
   ```

3. **Run the Container**:
   ```bash
   docker run -p 8080:8080 quizzapp
   ```

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/question/allQuestions` | Retrieve all quiz questions |
| `POST` | `/result/submit` | Submit user quiz results |

## 🏗️ Project Structure

```text
├── .github/workflows/    # CI/CD pipeline configuration
├── src/
│   ├── main/
│   │   ├── java/         # Backend source code
│   │   └── resources/
│   │       ├── static/   # Frontend (HTML, CSS, JS)
│   │       └── application.properties
├── Dockerfile            # Container configuration
└── pom.xml               # Maven dependencies
```

## 🛠️ CI/CD Pipeline

This project uses **GitHub Actions** for continuous integration and deployment.
- **Build Stage**: Compiles code, runs Maven build (skipping DB-dependent tests).
- **Deploy Stage**: Builds a Docker image and pushes it to `ghcr.io/kaushiksharma639/quizzapp`.

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git checkout -b feature/AmazingFeature`)
5. Open a Pull Request

---
Developed by [Kaushik Sharma](https://github.com/kaushiksharma639)
