package com.exercise.service.serviceImpl;

import com.exercise.mapper.EntPaperUserQuestionMapper;
import com.exercise.mapper.PaperMapper;
import com.exercise.po.Paper;
import com.exercise.service.EntPaperUserQuestionService;
import com.exercise.service.PaperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class EntPaperUserQuestionServiceImpl implements EntPaperUserQuestionService {

    @Autowired
    private EntPaperUserQuestionMapper entPaperUserQuestionMapper;

    public int insertOne(Map<String, Object> map) {
        return entPaperUserQuestionMapper.insertOne(map);
    }
}
