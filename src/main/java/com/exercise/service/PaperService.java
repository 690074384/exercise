package com.exercise.service;


import com.exercise.po.Paper;
import com.exercise.po.QuestionMain;

import java.util.List;
import java.util.Map;

public interface PaperService {

    Paper getPaper(Integer id);

    List<Integer> getRelationIdByPaperId(Integer id);

    Integer getRelationIdByQuestionMainId(Map<String, Object> map);
}