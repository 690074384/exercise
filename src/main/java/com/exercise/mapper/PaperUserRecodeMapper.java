package com.exercise.mapper;

import com.exercise.po.PaperUserRecode;

public interface PaperUserRecodeMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(PaperUserRecode record);

    int insertSelective(PaperUserRecode record);

    PaperUserRecode selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(PaperUserRecode record);

    int updateByPrimaryKey(PaperUserRecode record);
}