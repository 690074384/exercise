package com.exercise.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.exercise.po.*;
import com.exercise.service.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.util.*;

import static com.exercise.processor.MissionProcessor.test;

@Controller
@RequestMapping("mission")
public class Mission {

    @Resource
    private PaperService paperService;

    @Resource
    private QuestionMainService questionMainService;

    @Resource
    private EntPaperUserQuestionService entPaperUserQuestionService;

    @Resource
    private EntPaperUserRecordService entPaperUserRecordService;

    @Resource
    private ChoiceService choiceService;

    @Resource
    private FillBlankService fillBlankService;

    @Resource
    private EssayService essayService;

    @Resource
    private ChoiceOptionService choiceOptionService;

    @ResponseBody
    @RequestMapping("index")
    public Object getRoomDetail(HttpServletRequest request, HttpServletResponse response) {

        Paper paper = paperService.getPaper(1);

        System.out.println("***************************************************************");
        System.out.println(paper.getName());
        System.out.println("***************************************************************");
        return paper;
    }

    /**
     * 生成学员答卷记录
     *
     * @param jsonObject
     * @return
     */

    @ResponseBody
    @RequestMapping(value = "createRecord", method = RequestMethod.POST)
    public Object createRecord(@RequestBody JSONObject jsonObject, HttpServletRequest request) throws Exception {

        EntPaperUserRecord entPaperUserRecord = new EntPaperUserRecord();


        try {
            entPaperUserRecord.setStu_id(jsonObject.getInteger("stu_id"));
            //根据用户id从用户表取出用户名
            entPaperUserRecord.setStu_name("lvpenghui");

            entPaperUserRecord.setExam_id(jsonObject.getInteger("exam_id"));
            entPaperUserRecord.setPaper_id(jsonObject.getInteger("paper_id"));
            entPaperUserRecord.setPaper_id_source(jsonObject.getString("paper_id_source"));
            entPaperUserRecord.setAnswer_paper_time(jsonObject.getInteger("answer_paper_time"));
            entPaperUserRecord.setStart_time(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(jsonObject.getString("start_time")));
            entPaperUserRecord.setEnd_time(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(jsonObject.getString("end_time")));
        } catch (Exception e) {
            //处理
        }

        entPaperUserRecord.setActual_question_amount(jsonObject.getByte("actual_question_amount"));
        entPaperUserRecord.setActual_correct_amount(jsonObject.getByte("actual_correct_amount"));
        entPaperUserRecord.setStatus_code(jsonObject.getString("status_code"));

        //通过试卷id获取到试卷的基本信息
        Paper paper = paperService.getPaper(jsonObject.getInteger("paper_id"));
        if (paper.getSource() != null) {
            entPaperUserRecord.setSource(paper.getSource());
        }
        if (paper.getType() != null) {
            entPaperUserRecord.setPaper_type(paper.getType());
        }
        if (paper.getQuestion_amount() != null) {
            entPaperUserRecord.setQuestion_amount((byte) paper.getQuestion_amount().intValue());
        }
        if (paper.getTotal_score() != null) {
            entPaperUserRecord.setTotal_score(paper.getTotal_score().floatValue());
        }
        entPaperUserRecord.setOperator("lph");

        entPaperUserRecord.setDelete_flag((byte) 0);
        entPaperUserRecord.setCreate_time(new Date());
        entPaperUserRecord.setUpdate_time(new Date());

        Integer paper_user_record_id = entPaperUserRecordService.insert(entPaperUserRecord);
        //request.getSession().getAttribute("user");
        request.setAttribute("paper_user_record_id", paper_user_record_id);

        return JSONArray.toJSON(entPaperUserRecord);
    }


    /**
     * 根据试卷ID获取所有问题 mission2
     *
     * @param
     * @return
     */
    @ResponseBody
    @RequestMapping("findQuestion")
    public Object findQuestionById(@RequestBody JSONObject jsonObject) {
        Map map = new HashMap();
        List<QuestionMain> questionMainList = questionMainService.findQuestionByPaperId((Integer) jsonObject.get("id"));
        List<QuestionMain> fatherQuestionMainList = new ArrayList<QuestionMain>();

        for (int i = 0; i < questionMainList.size(); i++) {
            if (questionMainList.get(i).getParent_question_id() != null && questionMainList.get(i).getParent_question_id() == 0) {
                fatherQuestionMainList.add(questionMainList.get(i));
            }
        }

        List<Choice> choiceList;
        List<FillBlank> fillBlankList;
        List<Essay> essayList;
        Paper paper = paperService.getPaper((Integer) jsonObject.get("id"));
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

                choice = choiceService.getById(fatherQuestionMainList.get(i).getQuestion_id());
                choiceOption = choiceOptionService.getById(fatherQuestionMainList.get(i).getQuestion_id());
                choice.setChoiceOptionMap(choiceOption);

                map.put("CHOICE--" + choiceNum++, choice);
            } else if (fatherQuestionMainList.get(i).getContent_type() != null && fatherQuestionMainList.get(i).getContent_type().equals("BLANK")) {
                fillBlank = fillBlankService.getById(fatherQuestionMainList.get(i).getQuestion_id());

                map.put("BLANK--" + essayNum++, fillBlank);
            } else if (fatherQuestionMainList.get(i).getContent_type() != null && fatherQuestionMainList.get(i).getContent_type().equals("ESSAY")) {
                essay = essayService.getById(fatherQuestionMainList.get(i).getQuestion_id());

                choiceList = new ArrayList<Choice>();
                fillBlankList = new ArrayList<FillBlank>();
                essayList = new ArrayList<Essay>();
/*                  有问题
                    List<QuestionMain> questionMainList1 = questionMainService.findByParentId(fatherQuestionMainList.get(i).getId());
                    while(questionMainList1.size()>0){

                        if (sonQuestionMainList.get(j).getParent_question_id() == fatherQuestionMainList.get(i).getId()) {
                            if (sonQuestionMainList.get(j).getContent_type().equals("CHOICE")) {
                                choice = choiceService.getById(sonQuestionMainList.get(j).getQuestion_id());
                                choiceOption = choiceOptionService.getById(sonQuestionMainList.get(j).getQuestion_id());
                                choice.setChoiceOptionMap(choiceOption);
                                choiceList.add(choice);
                            } else if (sonQuestionMainList.get(j).getContent_type().equals("BLANK")) {
                                fillBlank = fillBlankService.getById(sonQuestionMainList.get(j).getQuestion_id());
                                fillBlankList.add(fillBlank);
                            } else if (sonQuestionMainList.get(j).getContent_type().equals("ESSAY")) {
                                essay = essayService.getById(sonQuestionMainList.get(j).getQuestion_id());
                                essayList.add(essay);
                            }
                        }
                    }*/
                essay.setChoiceList(choiceList);
                essay.setFillBlankList(fillBlankList);
                essay.setEssayList(essayList);

                map.put("ESSAY--" + blankNum++, essay);
            }

        }
        return JSONArray.toJSON(map);
    }

    /**
     * 提交学员单道题答题记录 mission3
     * 问题，选择一道题之后，暂未考虑到有子题的情况
     * @param jsonObject
     * @return
     */
    @ResponseBody
    @RequestMapping("insertOneQuestion")
    public Object InsertOneQuestion(@RequestBody JSONObject jsonObject, HttpServletRequest request) {

        QuestionMain questionMain = questionMainService.selectByPrimaryKey((Integer) jsonObject.get("question_main_id"));
        Paper paper = paperService.getPaper((Integer) jsonObject.get("paper_id"));
        String answer = jsonObject.get("answer").toString();
        Integer answerTime = (Integer) jsonObject.get("answer_time");
        String contentType = questionMain.getContent_type();
        Integer questionId = questionMain.getQuestion_id();
        String tableChoose = "ent_paper_user_question_" + String.format("%02d", (Integer) jsonObject.get("user_id") % 100);
        Map<String, Object> map = new HashMap<String, Object>();

        //本步骤需要：1、在生成学员答卷记录时将paper_user_record_id放入session中；2、从session中取出paper_user_record_id放入map，此处暂时以1代替
        //map.put("paper_user_record_id", request.getAttribute("paper_user_record_id"));
        map.put("paper_user_record_id", 1);

        map.put("question_main_id", (Integer) jsonObject.get("question_main_id"));
        map.put("questionId", questionId);
        map.put("answer", answer);
        map.put("paper_id", paper.getId());
        map.put("answer_time", answerTime);
        map.put("create_time", new Date());
        map.put("update_time", new Date());
        map.put("operator", "'lph'");
        map.put("delete_flag", 0);
        map.put("question_main_id", questionMain.getId());
        map.put("question_type", "'" + questionMain.getQuestion_type() + "'");
        map.put("question_id_source", "'t_question_main'");
        map.put("table_choose", tableChoose);
        map.put("contentType", contentType);

        map = test(map);
        entPaperUserQuestionService.insertOne(map);
        return Float.parseFloat(map.get("score").toString()) > 0 ? "right" : "wrong";
    }

    /**
     *  学员交卷，存储学员所有的答题记录，非主观题即时出分
     *  问题：1、可改为批处理插入sql
     *         2、分数计算时不计算根
     * @param jsonObject
     * @param request
     * @return
     */
    @ResponseBody
    @RequestMapping("commitPaper")
    public Object commitPaper(@RequestBody JSONObject jsonObject, HttpServletRequest request) {

        //  QuestionMain questionMain = questionMainService.selectByPrimaryKey((Integer) jsonObject.get("question_main_id"));
        Paper paper = paperService.getPaper((Integer) jsonObject.get("paper_id"));
        List<HashMap> answer_all = (List) jsonObject.get("answer_all");
        String tableChoose = "ent_paper_user_question_" + String.format("%02d", (Integer) jsonObject.get("user_id") % 100);

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("paper_user_record_id", 1);

        map.put("paper_id", paper.getId());
        map.put("create_time", new Date());
        map.put("update_time", new Date());
        map.put("operator", "'lph'");
        map.put("delete_flag", 0);
        map.put("question_id_source", "'t_question_main'");
        map.put("table_choose", tableChoose);

        float totalScore = 0f;

        for (int i = 0; i < answer_all.size(); i++) {

            QuestionMain questionMain = questionMainService.selectByPrimaryKey((Integer) answer_all.get(i).get("question_main_id"));
            String answer = answer_all.get(i).get("answer").toString();
            map.put("answer", answer);
            Integer answerTime = (Integer) answer_all.get(i).get("answer_time");
            map.put("answer_time", answerTime);
            map.put("question_main_id", questionMain.getId());
            map.put("question_type", "'" + questionMain.getQuestion_type() + "'");
            map.put("contentType", questionMain.getContent_type());
            map.put("questionId", questionMain.getQuestion_id());

            map = test(map);
            totalScore += Float.parseFloat(map.get("score").toString());

            entPaperUserQuestionService.insertOne(map);

        }
        return totalScore;
    }
}
