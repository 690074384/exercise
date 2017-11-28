package com.exercise.service.serviceImpl;
import com.exercise.mapper.ChoiceOptionMapper;
import com.exercise.po.ChoiceOption;
import com.exercise.service.ChoiceOptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChoiceOptionServiceImpl implements ChoiceOptionService {

    @Autowired
    private ChoiceOptionMapper choiceOptionMapper;


    public List<ChoiceOption> getById(Integer questionId) {
        return choiceOptionMapper.selectByQuestionId(questionId);
    }
}
