package com.kaushik.quizzapp.controller;

import com.kaushik.quizzapp.UserResult;
import com.kaushik.quizzapp.services.UserResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("result")
public class UserResultController {

    @Autowired
    private UserResultService userResultService;

    @PostMapping("submit")
    public String submitResult(@RequestBody UserResult userResult) {
        userResultService.saveResult(userResult);
        return "Success";
    }
}
