package com.exercise.service;

import com.exercise.po.QuestionMain;

import java.util.List;

public interface QuestionMainService {

     List<QuestionMain> findQuestionByPaperId(int id);

    QuestionMain selectByPrimaryKey(int qid);

    Integer getNumByParenetId(Integer id);

}