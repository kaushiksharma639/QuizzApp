package com.kaushik.quizzapp.services;

import com.kaushik.quizzapp.UserResult;
import com.kaushik.quizzapp.dao.UserResultDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//contain user result
// view user result
@Service
public class UserResultService {

    @Autowired
    private UserResultDao userResultDao;

    public UserResult saveResult(UserResult result) {
        return userResultDao.save(result);
    }
}
