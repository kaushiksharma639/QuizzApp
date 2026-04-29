package com.kaushik.quizzapp.dao;

import com.kaushik.quizzapp.UserResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserResultDao extends JpaRepository<UserResult, Integer> {
}
