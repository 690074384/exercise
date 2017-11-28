package com.exercise.service.serviceImpl;

import com.exercise.mapper.EntPaperUserRecordMapper;
import com.exercise.po.EntPaperUserRecord;
import com.exercise.service.EntPaperUserRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class EntPaperUserRecordServiceImpl implements EntPaperUserRecordService {

    @Autowired
    private EntPaperUserRecordMapper entPaperUserRecordMapper;

    public int insert(EntPaperUserRecord entPaperUserRecord) {
        return entPaperUserRecordMapper.insert(entPaperUserRecord);
    }
}
