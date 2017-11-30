package com.exercise.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.exercise.po.*;
import com.exercise.processor.MissionProcessor;
import com.exercise.service.*;
import com.exercise.util.ExceptionUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;

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
     * <p>
     * {
     * "stu_id" : 11111,
     * "exam_id" : 1,
     * "paper_id" : 2,
     * "paper_id_source" : "t_paper"
     * }
     *
     * @param jsonObject
     * @return
     */

    @ResponseBody
    @RequestMapping(value = "createRecord", method = RequestMethod.POST)
    public Object createRecord(@RequestBody JSONObject jsonObject, HttpServletRequest request) throws Exception {

        Map<String, Object> resultMap = new HashMap<String, Object>();

        EntPaperUserRecord entPaperUserRecord = new EntPaperUserRecord();

        if (jsonObject.get("stu_id") == null || jsonObject.get("exam_id") == null || jsonObject.get("paper_id_source") == null || jsonObject.getInteger("paper_id") == null)
            return JSONArray.toJSON(ExceptionUtil.paramException());

        entPaperUserRecord.setStu_id(jsonObject.getInteger("stu_id"));
        entPaperUserRecord.setExam_id(jsonObject.getInteger("exam_id"));
        entPaperUserRecord.setPaper_id(jsonObject.getInteger("paper_id"));
        entPaperUserRecord.setPaper_id_source(jsonObject.getString("paper_id_source"));
        //根据用户id从用户表取出用户名
        entPaperUserRecord.setStu_name("lvpenghui");
        entPaperUserRecord.setAnswer_paper_time(0);
        entPaperUserRecord.setStart_time(new Date());
        entPaperUserRecord.setEnd_time(new Date());

        entPaperUserRecord.setActual_question_amount((byte) 0);
        entPaperUserRecord.setActual_correct_amount((byte) 0);
        entPaperUserRecord.setStatus_code("UNCOMPLETE");

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
        entPaperUserRecord.setOperator("onstart");

        entPaperUserRecord.setDelete_flag((byte) 0);
        entPaperUserRecord.setCreate_time(new Date());
        entPaperUserRecord.setUpdate_time(new Date());

        try {
            Integer paper_user_record_id = entPaperUserRecordService.insert(entPaperUserRecord);
            //request.getSession().getAttribute("user");
            request.setAttribute("paper_user_record_id", paper_user_record_id);
        } catch (Exception e) {
            return JSONArray.toJSON(ExceptionUtil.dbException());
        }

        resultMap.put("entPaperUserRecord", entPaperUserRecord);
        resultMap.put("msg", "插入成功！");
        resultMap.put("code", "1");
        return JSONArray.toJSON(resultMap);
    }


    /**
     * 根据试卷ID获取所有问题 mission2
     *
     * @param
     * @return {
     * "id" : 19
     * }
     */
    @ResponseBody
    @RequestMapping("findQuestion")
    public Object findQuestionById(@RequestBody JSONObject jsonObject) {
        if (jsonObject.get("id") == null)
            return JSONArray.toJSON(ExceptionUtil.paramException());
        Map<String, Object> resultMap = MissionProcessor.findQuestionById(jsonObject.getInteger("id"));
        resultMap.put("msg", "插入成功！");
        resultMap.put("code", "1");
        return JSONArray.toJSON(resultMap);
    }

    /**
     * 提交学员单道题答题记录 mission3
     * <p>
     * {
     * "question_main_id" : 3,
     * "paper_id" : 2,
     * "user_id" : 6,
     * "answer" : "A",
     * "answer_time" : 19800000
     * }
     *
     * @param jsonObject
     * @return
     */
    @ResponseBody
    @RequestMapping("insertOneQuestion")
    public Object insertOneQuestion(@RequestBody JSONObject jsonObject, HttpServletRequest request) {

        if (jsonObject.getInteger("question_main_id") == null || jsonObject.getInteger("paper_id") == null || jsonObject.getInteger("answer_time") == null || jsonObject.getInteger("user_id") == null)
            return ExceptionUtil.paramException();
        Paper paper = paperService.getPaper(jsonObject.getInteger("paper_id"));
        String answer = jsonObject.getString("answer");
        Integer answerTime = jsonObject.getInteger("answer_time");
        String tableChoose = "ent_paper_user_question_" + String.format("%02d", jsonObject.getInteger("user_id") % 100);
        Map<String, Object> map = new HashMap<String, Object>();
        QuestionMain questionMain = questionMainService.selectByPrimaryKey(jsonObject.getInteger("question_main_id"));
        String contentType = questionMain.getContent_type();
        Integer questionId = questionMain.getQuestion_id();


        //本步骤需要：1、在生成学员答卷记录时将paper_user_record_id放入session中；2、从session中取出paper_user_record_id放入map，此处暂时以1代替
        //map.put("paper_user_record_id", request.getAttribute("paper_user_record_id"));
        map.put("paper_user_record_id", 1);

        map.put("question_main_id", jsonObject.getInteger("question_main_id"));
        map.put("questionId", questionId);
        map.put("question_main_id", questionMain.getId());
        map.put("question_type", "'" + questionMain.getQuestion_type() + "'");
        map.put("contentType", contentType);
        map.put("answer", answer);
        map.put("paper_id", paper.getId());
        map.put("answer_time", answerTime);
        map.put("create_time", new Date());
        map.put("update_time", new Date());
        map.put("operator", "'lph'");
        map.put("delete_flag", 0);

        map.put("question_id_source", "'t_question_main'");
        map.put("table_choose", tableChoose);

        map = MissionProcessor.insertData(map);
        try {
            entPaperUserQuestionService.insertOne(map);
        } catch (Exception e) {
            return ExceptionUtil.dbException();
        }
        Map<String,Object> resultMap = new HashMap<String,Object>();
        resultMap.put("msg", "插入成功！");
        resultMap.put("code", "1");
        resultMap.put("result",Float.parseFloat(map.get("score").toString()) > 0 ? "right" : "wrong");
        return resultMap;
    }

    /**
     * 学员交卷，存储学员所有的答题记录，非主观题即时出分
     *
     * @param jsonObject
     * @param request
     * @return
     */
    @ResponseBody
    @RequestMapping("commitPaper")
/*    @Transactional*/
    public Object commitPaper(@RequestBody JSONObject jsonObject, HttpServletRequest request) {

        if (jsonObject.getInteger("paper_id") == null || jsonObject.get("answer_all") == null || jsonObject.getInteger("user_id") == null)
            return ExceptionUtil.paramException();

        Paper paper = paperService.getPaper(jsonObject.getInteger("paper_id"));
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

            map = MissionProcessor.insertData(map);
            if (questionMainService.getNumByParenetId(questionMain.getId()) == 0)
                totalScore += Float.parseFloat(map.get("score").toString());

            try {
                entPaperUserQuestionService.insertOne(map);
            } catch (Exception e) {
                return ExceptionUtil.dbException();
            }
        }
        Map<String,Object> resultMap = new HashMap<String,Object>();
        resultMap.put("msg", "插入成功！");
        resultMap.put("code", "1");
        resultMap.put("非主观题得分：",totalScore);
        return resultMap;
    }
}