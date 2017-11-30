package com.exercise.processor;

import com.exercise.po.*;
import com.exercise.service.*;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Lazy(false)
@Component
public class MissionProcessor {

    private static MissionProcessor missionProcessor;

    @Resource
    private FillBlankService fillBlankService;

    @Resource
    private ChoiceService choiceService;

    @Resource
    private QuestionMainService questionMainService;

    @Resource
    private PaperService paperService;

    @Resource
    private ChoiceOptionService choiceOptionService;

    @Resource
    private EssayService essayService;

    @PostConstruct
    public void init() {
        missionProcessor = this;
        missionProcessor.fillBlankService = this.fillBlankService;
        missionProcessor.fillBlankService = this.fillBlankService;
        missionProcessor.choiceService = this.choiceService;
        missionProcessor.questionMainService = this.questionMainService;
        missionProcessor.paperService = this.paperService;
        missionProcessor.choiceOptionService = this.choiceOptionService;

    }

    public static Map<String, Object> insertData(Map<String, Object> map) {
        QuestionMain questionMain = missionProcessor.questionMainService.selectByPrimaryKey((Integer) map.get("question_main_id"));

        if (map.get("contentType").toString().equals("BLANK")) {
            //   map.put("question_sub_id", -1);
            map.put("mark_paper_way", 1);
            FillBlank fillBlank = missionProcessor.fillBlankService.getById((Integer) map.get("questionId"));
            if (fillBlank.getAnswer() != null && fillBlank.getAnswer().equals(map.get("answer").toString())) {
                map.put("correct_flag", 1);
                map.put("score", questionMain.getScore());
            } else {
                map.put("correct_flag", 2);
                map.put("score", 0f);
            }
        } else if (map.get("contentType").toString().equals("CHOICE")) {
            Choice choice = missionProcessor.choiceService.getById((Integer) map.get("questionId"));
            map.put("mark_paper_way", 0);
            //     map.put("question_sub_id", -1);
            if (choice.getCorrect_answer() != null && choice.getCorrect_answer().equals(map.get("answer").toString())) {
                map.put("correct_flag", 1);
                map.put("score", questionMain.getScore());
            } else {
                map.put("correct_flag", 2);
                map.put("score", 0f);
            }
        } else if (map.get("contentType").toString().equals("ESSAY")) {
            //   Essay essay = essayService.getById(questionId);
            map.put("mark_paper_way", 2);
            map.put("correct_flag", 0);
            if (map.get("answer").toString() != null && !map.get("answer").toString().equals("") && !map.get("answer").toString().trim().equals("")) {
                map.put("correct_flag", 4);
            }
            map.put("score", 0f);
        }

        Integer parent_question_id = questionMain.getParent_question_id();
        if (questionMain.getParent_question_id() == 0) {
            map.put("question_id", questionMain.getQuestion_id());
        } else {
            map.put("question_sub_id", questionMain.getQuestion_id());
            while (parent_question_id != 0) {
                questionMain = missionProcessor.questionMainService.selectByPrimaryKey(parent_question_id);
                parent_question_id = questionMain.getParent_question_id();
            }
            map.put("question_id", questionMain.getQuestion_id());
        }

        List<Integer> questionSequenceList = missionProcessor.paperService.getRelationIdByPaperId((Integer) map.get("paper_id"));

        //根据paper_id和question_main_id，从关系表中获取到本试题在试卷中的序列

        Integer paperQuestionRelId = missionProcessor.paperService.getRelationIdByQuestionMainId(map);
        Integer sequence = 1 + questionSequenceList.indexOf(paperQuestionRelId);
        map.put("sequence", sequence);

        if (map.get("answer").toString() == null || map.get("answer").toString().equals("") || map.get("answer").toString().trim().equals("")) {
            map.put("correct_flag", 4);
        }

        map.put("answer", "'" + map.get("answer").toString() + "'");

        return map;
    }

    public static Map<String, Object> findQuestionById(Integer paperId) {

        List<QuestionMain> questionMainList = missionProcessor.questionMainService.findQuestionByPaperId(paperId);

        return setSon(questionMainList, paperId);
    }

    public static Map<String, Object> setSon(List<QuestionMain> questionMainList, Integer paperId) {
        Map<String, Object> map = new HashMap();

        List<QuestionMain> fatherQuestionMainList = getFatherQuestionMain(questionMainList);
        Paper paper = missionProcessor.paperService.getPaper(paperId);
        map.put("paper", paper);
        Choice choice;
        List<ChoiceOption> choiceOption;
        Essay essay;
        FillBlank fillBlank;

        int choiceNum = 1;
        int essayNum = 1;
        int blankNum = 1;
        for (int i = 0; i < fatherQuestionMainList.size(); i++) {

            if (fatherQuestionMainList.get(i).getContent_type() != null && fatherQuestionMainList.get(i).getContent_type().equals("CHOICE")) {

                choice = missionProcessor.choiceService.getById(fatherQuestionMainList.get(i).getQuestion_id());
                choiceOption = missionProcessor.choiceOptionService.getById(fatherQuestionMainList.get(i).getQuestion_id());
                choice.setChoiceOptionMap(choiceOption);

                map.put("CHOICE--" + choiceNum++, choice);
                System.out.println("choice-" + fatherQuestionMainList.get(i).getId());
            } else if (fatherQuestionMainList.get(i).getContent_type() != null && fatherQuestionMainList.get(i).getContent_type().equals("BLANK")) {
                fillBlank = missionProcessor.fillBlankService.getById(fatherQuestionMainList.get(i).getQuestion_id());

                map.put("BLANK--" + essayNum++, fillBlank);
                System.out.println("blank" + fatherQuestionMainList.get(i).getId());
            } else if (fatherQuestionMainList.get(i).getContent_type() != null && fatherQuestionMainList.get(i).getContent_type().equals("ESSAY")) {

                essay = getEssayDetail(questionMainList, fatherQuestionMainList.get(i));
                map.put("ESSAY--" + blankNum++, essay);
            }

        }
        return map;
    }

    public static Essay getEssayDetail(List<QuestionMain> questionMainList, QuestionMain fatherQuestionMain) {

        List<QuestionMain> sonQuestionMainList = getSonQuestionMain(questionMainList);
        List<QuestionMain> grandSonQuestionMainList;
        List<Choice> choiceList = new ArrayList<Choice>();
        List<FillBlank> fillBlankList = new ArrayList<FillBlank>();
        List<Essay> essayList = new ArrayList<Essay>();
        List<Choice> choiceList2 = new ArrayList<Choice>();
        List<FillBlank> fillBlankList2 = new ArrayList<FillBlank>();
        List<Essay> essayList2 = new ArrayList<Essay>();
        Choice choice;
        List<ChoiceOption> choiceOption;
        Essay essay1 = missionProcessor.essayService.getById(fatherQuestionMain.getQuestion_id());
        Essay essay2 = new Essay();
        FillBlank fillBlank;
        Essay essay;

        for (int i = 0; i < sonQuestionMainList.size(); i++) {
            if (sonQuestionMainList.get(i).getParent_question_id().equals(fatherQuestionMain.getId())) {
                if (sonQuestionMainList.get(i).getContent_type().equals("CHOICE")) {
                    choice = missionProcessor.choiceService.getById(sonQuestionMainList.get(i).getQuestion_id());
                    choiceOption = missionProcessor.choiceOptionService.getById(sonQuestionMainList.get(i).getQuestion_id());
                    choice.setChoiceOptionMap(choiceOption);
                    choiceList.add(choice);
                } else if (sonQuestionMainList.get(i).getContent_type().equals("BLANK")) {
                    fillBlank = missionProcessor.fillBlankService.getById(sonQuestionMainList.get(i).getQuestion_id());
                    fillBlankList.add(fillBlank);
                } else if (sonQuestionMainList.get(i).getContent_type().equals("ESSAY")) {
                    grandSonQuestionMainList = getSonQuestionMain(sonQuestionMainList);
                    if (grandSonQuestionMainList.size()==0) {
                        essay = missionProcessor.essayService.getById(sonQuestionMainList.get(i).getQuestion_id());
                        essayList.add(essay);
                    } else {
                        essay2 = missionProcessor.essayService.getById(sonQuestionMainList.get(i).getQuestion_id());
                        for (int j = 0; j < grandSonQuestionMainList.size(); j++) {
                            if (sonQuestionMainList.get(i).getId().equals(grandSonQuestionMainList.get(j).getParent_question_id())) {
                                if (grandSonQuestionMainList.get(j).getContent_type().equals("CHOICE")) {
                                    choice = missionProcessor.choiceService.getById(grandSonQuestionMainList.get(j).getQuestion_id());
                                    choiceOption = missionProcessor.choiceOptionService.getById(grandSonQuestionMainList.get(j).getQuestion_id());
                                    choice.setChoiceOptionMap(choiceOption);
                                    choiceList2.add(choice);
                                    essay2.setChoiceList(choiceList2);
                                } else if (grandSonQuestionMainList.get(j).getContent_type().equals("BLANK")) {
                                    fillBlank = missionProcessor.fillBlankService.getById(grandSonQuestionMainList.get(j).getQuestion_id());
                                    fillBlankList2.add(fillBlank);
                                    essay2.setFillBlankList(fillBlankList2);
                                } else if (grandSonQuestionMainList.get(j).getContent_type().equals("ESSAY")) {
                                    essay = missionProcessor.essayService.getById(grandSonQuestionMainList.get(j).getQuestion_id());
                                    essayList2.add(essay);
                                    essay2.setEssayList(essayList2);
                                }
                            }
                        }
                        essayList.add(essay2);

                    }
                }
            }
        }
        essay1.setChoiceList(choiceList);
        essay1.setFillBlankList(fillBlankList);
        essay1.setEssayList(essayList);
        return essay1;
    }

    public static List<QuestionMain> getFatherQuestionMain(List<QuestionMain> questionMainList) {

        List<QuestionMain> fatherQuestionMainList = new ArrayList<QuestionMain>();

        for (int i = 0; i < questionMainList.size(); i++) {
            if (questionMainList.get(i).getParent_question_id() != null && questionMainList.get(i).getParent_question_id() == 0)
                fatherQuestionMainList.add(questionMainList.get(i));
        }
        return fatherQuestionMainList;
    }

    public static List<QuestionMain> getSonQuestionMain(List<QuestionMain> questionMainList) {

        List<QuestionMain> sonQuestionMainList = new ArrayList<QuestionMain>();

        for (int i = 0; i < questionMainList.size(); i++) {
            if (questionMainList.get(i).getParent_question_id() != null && questionMainList.get(i).getParent_question_id() != 0)
                sonQuestionMainList.add(questionMainList.get(i));
        }
        return sonQuestionMainList;
    }

   /* public static Choice setSonList(List<QuestionMain> questionMainList) {

        List<Choice> choiceList;
        List<FillBlank> fillBlankList;
        List<Essay> essayList;
        Choice choice;
        List<ChoiceOption> choiceOption;

        choice = missionProcessor.choiceService.getById(questionMainList.get(i).getQuestion_id());
        choiceOption = missionProcessor.choiceOptionService.getById(questionMainList.get(i).getQuestion_id());
        choice.setChoiceOptionMap(choiceOption);

        choiceList = new ArrayList<Choice>();
        fillBlankList = new ArrayList<FillBlank>();
        essayList = new ArrayList<Essay>();
        for (int j = 0; i < questionMainList.size(); j++) {

            if (questionMainList.get(j).getParent_question_id() == questionMainList.get(i).getId()) {
                if (questionMainList.get(j).getContent_type().equals("CHOICE")) {
                    choice = choiceService.getById(questionMainList.get(j).getQuestion_id());
                    choiceOption = choiceOptionService.getById(questionMainList.get(j).getQuestion_id());
                    choice.setChoiceOptionMap(choiceOption);
                    choiceList.add(choice);
                }else if(questionMainList.get(j).getContent_type().equals("BLANK")){
                    fillBlank = fillBlankService.getById(questionMainList.get(j).getQuestion_id());
                    fillBlankList.add(fillBlank);
                }else if(questionMainList.get(j).getContent_type().equals("ESSAY")){
                    essay = essayService.getById(questionMainList.get(j).getQuestion_id());
                    essayList.add(essay);
                }
            }
            choice.setChoiceList(choiceList);
            choice.setFillBlankList(fillBlankList);
            choice.setEssayList(essayList);
        }
    }
    */

}
