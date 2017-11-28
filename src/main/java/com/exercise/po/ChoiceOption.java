package com.exercise.po;

import java.util.Date;

public class ChoiceOption {
    private Integer id;

    private Integer question_id;

    private Byte sequence;

    private String option_title;

    private Byte is_correct;

    private Date create_time;

    private String creator;

    private Date update_time;

    private String operator;

    private Byte delete_flag;

    private String content;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getQuestion_id() {
        return question_id;
    }

    public void setQuestion_id(Integer question_id) {
        this.question_id = question_id;
    }

    public Byte getSequence() {
        return sequence;
    }

    public void setSequence(Byte sequence) {
        this.sequence = sequence;
    }

    public String getOption_title() {
        return option_title;
    }

    public void setOption_title(String option_title) {
        this.option_title = option_title == null ? null : option_title.trim();
    }

    public Byte getIs_correct() {
        return is_correct;
    }

    public void setIs_correct(Byte is_correct) {
        this.is_correct = is_correct;
    }

    public Date getCreate_time() {
        return create_time;
    }

    public void setCreate_time(Date create_time) {
        this.create_time = create_time;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator == null ? null : creator.trim();
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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }
}