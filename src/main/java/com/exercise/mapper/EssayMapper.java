package com.exercise.mapper;

import com.exercise.po.Essay;
import com.exercise.po.EssayWithBLOBs;

public interface EssayMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(EssayWithBLOBs record);

    int insertSelective(EssayWithBLOBs record);

    EssayWithBLOBs selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(EssayWithBLOBs record);

    int updateByPrimaryKeyWithBLOBs(EssayWithBLOBs record);

    int updateByPrimaryKey(Essay record);
}