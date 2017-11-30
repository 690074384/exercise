package com.exercise.service.serviceImpl;

import com.exercise.mapper.QuestionMainMapper;
import com.exercise.po.QuestionMain;
import com.exercise.service.QuestionMainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionMainServiceImpl implements QuestionMainService {

    @Autowired
    private QuestionMainMapper questionMainMapper;

    public List<QuestionMain> findQuestionByPaperId(int id) {
        return questionMainMapper.findQuestionByPaperId(id);
    }

    public QuestionMain selectByPrimaryKey(int qid) {
        return questionMainMapper.selectByPrimaryKey(qid);
    }

    public Integer getNumByParenetId(Integer id) {
        return questionMainMapper.getNumByParenetId(id);
    }
}
