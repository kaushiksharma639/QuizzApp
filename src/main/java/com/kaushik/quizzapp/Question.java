package com.kaushik.quizzapp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;
// containe question for quizz
@Data
@Entity
@JsonPropertyOrder({"id", "question", "option1", "option2", "option3", "option4", "correctAnswer"})
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;
    private String question;

    @Column(name = "option_a")
    private String option1;

    @Column(name = "option_b")
    private String option2;

    @Column(name = "option_c")
    private String option3;

    @Column(name = "option_d")
    private String option4;

    private String correctAnswer;

}
