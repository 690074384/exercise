package com.exercise.mapper;

import com.exercise.po.FillBlank;

public interface FillBlankMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(FillBlank record);

    int insertSelective(FillBlank record);

    FillBlank selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(FillBlank record);

    int updateByPrimaryKeyWithBLOBs(FillBlank record);

    int updateByPrimaryKey(FillBlank record);
}