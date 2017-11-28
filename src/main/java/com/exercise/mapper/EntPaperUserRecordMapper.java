package com.exercise.mapper;

import com.exercise.po.EntPaperUserRecord;

public interface EntPaperUserRecordMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(EntPaperUserRecord record);

    int insertSelective(EntPaperUserRecord record);

    EntPaperUserRecord selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(EntPaperUserRecord record);

    int updateByPrimaryKey(EntPaperUserRecord record);
}