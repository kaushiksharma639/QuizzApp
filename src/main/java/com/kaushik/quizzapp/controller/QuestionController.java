package com.kaushik.quizzapp.controller;

import com.kaushik.quizzapp.Question;
import com.kaushik.quizzapp.services.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

//Control the sequence of question
@RestController
    @RequestMapping("question")
    // control all the question in quizz
    public class QuestionController{

        @Autowired
        QuestionService questionService;

        @GetMapping("allQuestions")
        public List<Question> getAllQuestion(){

            return questionService.getAllQuestion();
        }
}
