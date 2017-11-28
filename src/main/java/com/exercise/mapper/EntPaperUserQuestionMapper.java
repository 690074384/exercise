package com.exercise.mapper;

import com.exercise.po.EntPaperUserQuestion;

import java.util.Map;

public interface EntPaperUserQuestionMapper{
    int deleteByPrimaryKey(Integer id);

    int insert(EntPaperUserQuestion record);

    int insertSelective(EntPaperUserQuestion record);

    EntPaperUserQuestion selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(EntPaperUserQuestion record);

    int updateByPrimaryKeyWithBLOBs(EntPaperUserQuestion record);

    int updateByPrimaryKey(EntPaperUserQuestion record);

    int insertOne(Map<String, Object> map);
}