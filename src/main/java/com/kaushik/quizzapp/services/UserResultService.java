package com.kaushik.quizzapp.services;

import com.kaushik.quizzapp.UserResult;
import com.kaushik.quizzapp.dao.UserResultDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//save all the user result
// To trigger the pipeline, commit these changes and run: git push origin main
@Service
public class UserResultService {

    @Autowired
    private UserResultDao userResultDao;

    public UserResult saveResult(UserResult result) {
        return userResultDao.save(result);
    }
}
