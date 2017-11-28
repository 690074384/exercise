package com.exercise.service.serviceImpl;
import com.exercise.mapper.EssayMapper;
import com.exercise.po.Essay;
import com.exercise.service.EssayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EssayServiceImpl implements EssayService {

    @Autowired
    private EssayMapper essayMapper;

    public Essay getById(Integer questionId) {
        return essayMapper.selectByPrimaryKey(questionId);
    }
}
