package com.exercise.po;

import java.util.Date;

public class EntPaperUserRecord {
    private Integer id;

    private Integer stu_id;

    private String stu_name;

    private Integer exam_id;

    private Integer paper_id;

    private String paper_id_source;

    private String source;

    private Integer answer_paper_time;

    private String paper_type;

    private Date start_time;

    private Date end_time;

    private Byte question_amount;

    private Byte actual_question_amount;

    private Byte actual_correct_amount;

    private Float total_score;

    private String status_code;

    private Date create_time;

    private Date update_time;

    private String operator;

    private Byte delete_flag;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getStu_id() {
        return stu_id;
    }

    public void setStu_id(Integer stu_id) {
        this.stu_id = stu_id;
    }

    public String getStu_name() {
        return stu_name;
    }

    public void setStu_name(String stu_name) {
        this.stu_name = stu_name == null ? null : stu_name.trim();
    }

    public Integer getExam_id() {
        return exam_id;
    }

    public void setExam_id(Integer exam_id) {
        this.exam_id = exam_id;
    }

    public Integer getPaper_id() {
        return paper_id;
    }

    public void setPaper_id(Integer paper_id) {
        this.paper_id = paper_id;
    }

    public String getPaper_id_source() {
        return paper_id_source;
    }

    public void setPaper_id_source(String paper_id_source) {
        this.paper_id_source = paper_id_source == null ? null : paper_id_source.trim();
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source == null ? null : source.trim();
    }

    public Integer getAnswer_paper_time() {
        return answer_paper_time;
    }

    public void setAnswer_paper_time(Integer answer_paper_time) {
        this.answer_paper_time = answer_paper_time;
    }

    public String getPaper_type() {
        return paper_type;
    }

    public void setPaper_type(String paper_type) {
        this.paper_type = paper_type == null ? null : paper_type.trim();
    }

    public Date getStart_time() {
        return start_time;
    }

    public void setStart_time(Date start_time) {
        this.start_time = start_time;
    }

    public Date getEnd_time() {
        return end_time;
    }

    public void setEnd_time(Date end_time) {
        this.end_time = end_time;
    }

    public Byte getQuestion_amount() {
        return question_amount;
    }

    public void setQuestion_amount(Byte question_amount) {
        this.question_amount = question_amount;
    }

    public Byte getActual_question_amount() {
        return actual_question_amount;
    }

    public void setActual_question_amount(Byte actual_question_amount) {
        this.actual_question_amount = actual_question_amount;
    }

    public Byte getActual_correct_amount() {
        return actual_correct_amount;
    }

    public void setActual_correct_amount(Byte actual_correct_amount) {
        this.actual_correct_amount = actual_correct_amount;
    }

    public Float getTotal_score() {
        return total_score;
    }

    public void setTotal_score(Float total_score) {
        this.total_score = total_score;
    }

    public String getStatus_code() {
        return status_code;
    }

    public void setStatus_code(String status_code) {
        this.status_code = status_code == null ? null : status_code.trim();
    }

    public Date getCreate_time() {
        return create_time;
    }

    public void setCreate_time(Date create_time) {
        this.create_time = create_time;
    }

    public Date getUpdate_time() {
        return update_time;
    }

    public void setUpdate_time(Date update_time) {
        this.update_time = update_time;
    }

    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator == null ? null : operator.trim();
    }

    public Byte getDelete_flag() {
        return delete_flag;
    }

    public void setDelete_flag(Byte delete_flag) {
        this.delete_flag = delete_flag;
    }
}