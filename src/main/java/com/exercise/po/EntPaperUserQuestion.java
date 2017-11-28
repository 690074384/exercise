package com.exercise.po;

import java.util.Date;

public class EntPaperUserQuestion {
    private Integer id;

    private Integer paper_user_record_id;

    private Integer sequence;

    private Integer question_id;

    private Integer question_sub_id;

    private String question_id_source;

    private String question_type;

    private Byte mark_paper_way;

    private Byte correct_flag;

    private Integer answer_time;

    private Float score;

    private Date create_time;

    private Date update_time;

    private String operator;

    private Byte delete_flag;

    private String answer;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPaper_user_record_id() {
        return paper_user_record_id;
    }

    public void setPaper_user_record_id(Integer paper_user_record_id) {
        this.paper_user_record_id = paper_user_record_id;
    }

    public Integer getSequence() {
        return sequence;
    }

    public void setSequence(Integer sequence) {
        this.sequence = sequence;
    }

    public Integer getQuestion_id() {
        return question_id;
    }

    public void setQuestion_id(Integer question_id) {
        this.question_id = question_id;
    }

    public Integer getQuestion_sub_id() {
        return question_sub_id;
    }

    public void setQuestion_sub_id(Integer question_sub_id) {
        this.question_sub_id = question_sub_id;
    }

    public String getQuestion_id_source() {
        return question_id_source;
    }

    public void setQuestion_id_source(String question_id_source) {
        this.question_id_source = question_id_source == null ? null : question_id_source.trim();
    }

    public String getQuestion_type() {
        return question_type;
    }

    public void setQuestion_type(String question_type) {
        this.question_type = question_type == null ? null : question_type.trim();
    }

    public Byte getMark_paper_way() {
        return mark_paper_way;
    }

    public void setMark_paper_way(Byte mark_paper_way) {
        this.mark_paper_way = mark_paper_way;
    }

    public Byte getCorrect_flag() {
        return correct_flag;
    }

    public void setCorrect_flag(Byte correct_flag) {
        this.correct_flag = correct_flag;
    }

    public Integer getAnswer_time() {
        return answer_time;
    }

    public void setAnswer_time(Integer answer_time) {
        this.answer_time = answer_time;
    }

    public Float getScore() {
        return score;
    }

    public void setScore(Float score) {
        this.score = score;
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

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer == null ? null : answer.trim();
    }
}