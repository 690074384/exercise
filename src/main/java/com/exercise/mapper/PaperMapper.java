package com.exercise.mapper;

import com.exercise.po.Paper;
import com.exercise.po.QuestionMain;

import java.util.List;
import java.util.Map;

public interface PaperMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Paper record);

    int insertSelective(Paper record);

    Paper selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Paper record);

    int updateByPrimaryKey(Paper record);

    List<Integer> getRelationIdByPaperId(Integer id);

    Integer getRelationIdByQuestionMainId(Map<String,Object> map);
}