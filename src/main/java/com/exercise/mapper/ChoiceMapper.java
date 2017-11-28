package com.exercise.mapper;

import com.exercise.po.Choice;
import com.exercise.po.ChoiceWithBLOBs;
public interface ChoiceMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(ChoiceWithBLOBs record);

    int insertSelective(ChoiceWithBLOBs record);

    ChoiceWithBLOBs selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(ChoiceWithBLOBs record);

    int updateByPrimaryKeyWithBLOBs(ChoiceWithBLOBs record);

    int updateByPrimaryKey(Choice record);
}