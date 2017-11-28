package com.exercise.service.serviceImpl;

import com.exercise.mapper.PaperMapper;
import com.exercise.po.Paper;
import com.exercise.po.QuestionMain;
import com.exercise.service.PaperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class PaperServiceImpl implements PaperService {

    @Autowired
    private PaperMapper paperMapper;


    public Paper getPaper(Integer id) {
        return paperMapper.selectByPrimaryKey(id);
    }

    public List<Integer> getRelationIdByPaperId(Integer id) {
        return paperMapper.getRelationIdByPaperId(id);
    }

    public Integer getRelationIdByQuestionMainId(Map<String,Object> map) {
        return paperMapper.getRelationIdByQuestionMainId(map);
    }

}
