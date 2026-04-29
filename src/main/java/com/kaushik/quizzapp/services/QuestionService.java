package com.kaushik.quizzapp.services;

import com.kaushik.quizzapp.Question;
import com.kaushik.quizzapp.dao.QuestionDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {

    @Autowired
    QuestionDao questionDao;
    public List<Question> getAllQuestion() {
         return questionDao.findAll();


    }
}
