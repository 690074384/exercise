package com.exercise.po;

import java.math.BigDecimal;
import java.util.Date;

public class Paper {
    private Integer id;

    private String code;

    private Integer subject_id;

    private Integer knowledge_tree_id;

    private String name;

    private String type;

    private Byte invalid_flag;

    private Integer question_amount;

    private BigDecimal total_score;

    private String video_url;

    private Byte current_version;

    private String source;

    private Integer exam_province;

    private Integer exam_session;

    private BigDecimal avg_difficulty_value;

    private Date create_time;

    private String creator;

    private Date update_time;

    private String operator;

    private Byte delete_flag;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code == null ? null : code.trim();
    }

    public Integer getSubject_id() {
        return subject_id;
    }

    public void setSubject_id(Integer subject_id) {
        this.subject_id = subject_id;
    }

    public Integer getKnowledge_tree_id() {
        return knowledge_tree_id;
    }

    public void setKnowledge_tree_id(Integer knowledge_tree_id) {
        this.knowledge_tree_id = knowledge_tree_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type == null ? null : type.trim();
    }

    public Byte getInvalid_flag() {
        return invalid_flag;
    }

    public void setInvalid_flag(Byte invalid_flag) {
        this.invalid_flag = invalid_flag;
    }

    public Integer getQuestion_amount() {
        return question_amount;
    }

    public void setQuestion_amount(Integer question_amount) {
        this.question_amount = question_amount;
    }

    public BigDecimal getTotal_score() {
        return total_score;
    }

    public void setTotal_score(BigDecimal total_score) {
        this.total_score = total_score;
    }

    public String getVideo_url() {
        return video_url;
    }

    public void setVideo_url(String video_url) {
        this.video_url = video_url == null ? null : video_url.trim();
    }

    public Byte getCurrent_version() {
        return current_version;
    }

    public void setCurrent_version(Byte current_version) {
        this.current_version = current_version;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source == null ? null : source.trim();
    }

    public Integer getExam_province() {
        return exam_province;
    }

    public void setExam_province(Integer exam_province) {
        this.exam_province = exam_province;
    }

    public Integer getExam_session() {
        return exam_session;
    }

    public void setExam_session(Integer exam_session) {
        this.exam_session = exam_session;
    }

    public BigDecimal getAvg_difficulty_value() {
        return avg_difficulty_value;
    }

    public void setAvg_difficulty_value(BigDecimal avg_difficulty_value) {
        this.avg_difficulty_value = avg_difficulty_value;
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