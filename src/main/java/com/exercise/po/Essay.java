package com.exercise.po;

import java.util.Date;
import java.util.List;

public class Essay {
    private Integer id;

    private Date create_time;

    private String creator;

    private Date update_time;

    private String operator;

    private Byte delete_flag;

    private List<Essay> essayList;

    private List<Choice> choiceList;

    private List<FillBlank> fillBlankList;

    public List<Essay> getEssayList() {
        return essayList;
    }

    public void setEssayList(List<Essay> essayList) {
        this.essayList = essayList;
    }

    public List<Choice> getChoiceList() {
        return choiceList;
    }

    public void setChoiceList(List<Choice> choiceList) {
        this.choiceList = choiceList;
    }

    public List<FillBlank> getFillBlankList() {
        return fillBlankList;
    }

    public void setFillBlankList(List<FillBlank> fillBlankList) {
        this.fillBlankList = fillBlankList;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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
}