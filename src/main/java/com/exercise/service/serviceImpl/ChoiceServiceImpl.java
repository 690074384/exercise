package com.exercise.service.serviceImpl;
import com.exercise.mapper.ChoiceMapper;
import com.exercise.po.Choice;
import com.exercise.service.ChoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChoiceServiceImpl implements ChoiceService {

    @Autowired
    private ChoiceMapper choiceMapper;

    public Choice getById(Integer questionId) {
        return choiceMapper.selectByPrimaryKey(questionId);
    }
}
