package com.exercise.mapper;

import com.exercise.po.ChoiceOption;

import java.util.List;

public interface ChoiceOptionMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(ChoiceOption record);

    int insertSelective(ChoiceOption record);

    ChoiceOption selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(ChoiceOption record);

    int updateByPrimaryKeyWithBLOBs(ChoiceOption record);

    int updateByPrimaryKey(ChoiceOption record);

    List<ChoiceOption> selectByQuestionId(Integer questionId);
}