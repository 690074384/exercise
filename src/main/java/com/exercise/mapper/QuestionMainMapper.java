package com.exercise.mapper;

import com.exercise.po.QuestionMain;

import java.util.List;

public interface QuestionMainMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(QuestionMain record);

    int insertSelective(QuestionMain record);

    QuestionMain selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(QuestionMain record);

    int updateByPrimaryKey(QuestionMain record);

    List<QuestionMain> findQuestionByPaperId(int id);
}