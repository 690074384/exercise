package com.exercise.service.serviceImpl;

import com.exercise.mapper.FillBlankMapper;
import com.exercise.po.FillBlank;
import com.exercise.service.FillBlankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class FillBlankServiceImpl implements FillBlankService {

    @Autowired
    private FillBlankMapper fillBlankMapper;
    public FillBlank getById(Integer questionId) {
        return fillBlankMapper.selectByPrimaryKey(questionId);
    }
}
