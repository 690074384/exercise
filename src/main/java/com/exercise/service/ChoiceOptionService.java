package com.exercise.service;

import com.exercise.po.ChoiceOption;

import java.util.List;

public interface ChoiceOptionService {
    List<ChoiceOption> getById(Integer questionId);
}
