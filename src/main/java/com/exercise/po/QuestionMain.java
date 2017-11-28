package com.exercise.po;

import java.math.BigDecimal;
import java.util.Date;

public class QuestionMain {
    private Integer id;

    private String code;

    private String source_type;

    private String question_type;

    private String content_type;

    private Integer question_id;

    private BigDecimal score;

    private Integer knowledge_tree_id;

    private Integer main_node_id;

    private Integer vice_node_id_1;

    private Integer vice_node_id_2;

    private Byte difficulty_value;

    private Integer exam_province;

    private Integer exam_session;

    private Byte current_version;

    private Integer parent_question_id;

    private Integer sequence;

    private Byte invalid_flag;

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

    public String getSource_type() {
        return source_type;
    }

    public void setSource_type(String source_type) {
        this.source_type = source_type == null ? null : source_type.trim();
    }

    public String getQuestion_type() {
        return question_type;
    }

    public void setQuestion_type(String question_type) {
        this.question_type = question_type == null ? null : question_type.trim();
    }

    public String getContent_type() {
        return content_type;
    }

    public void setContent_type(String content_type) {
        this.content_type = content_type == null ? null : content_type.trim();
    }

    public Integer getQuestion_id() {
        return question_id;
    }

    public void setQuestion_id(Integer question_id) {
        this.question_id = question_id;
    }

    public BigDecimal getScore() {
        return score;
    }

    public void setScore(BigDecimal score) {
        this.score = score;
    }

    public Integer getKnowledge_tree_id() {
        return knowledge_tree_id;
    }

    public void setKnowledge_tree_id(Integer knowledge_tree_id) {
        this.knowledge_tree_id = knowledge_tree_id;
    }

    public Integer getMain_node_id() {
        return main_node_id;
    }

    public void setMain_node_id(Integer main_node_id) {
        this.main_node_id = main_node_id;
    }

    public Integer getVice_node_id_1() {
        return vice_node_id_1;
    }

    public void setVice_node_id_1(Integer vice_node_id_1) {
        this.vice_node_id_1 = vice_node_id_1;
    }

    public Integer getVice_node_id_2() {
        return vice_node_id_2;
    }

    public void setVice_node_id_2(Integer vice_node_id_2) {
        this.vice_node_id_2 = vice_node_id_2;
    }

    public Byte getDifficulty_value() {
        return difficulty_value;
    }

    public void setDifficulty_value(Byte difficulty_value) {
        this.difficulty_value = difficulty_value;
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

    public Byte getCurrent_version() {
        return current_version;
    }

    public void setCurrent_version(Byte current_version) {
        this.current_version = current_version;
    }

    public Integer getParent_question_id() {
        return parent_question_id;
    }

    public void setParent_question_id(Integer parent_question_id) {
        this.parent_question_id = parent_question_id;
    }

    public Integer getSequence() {
        return sequence;
    }

    public void setSequence(Integer sequence) {
        this.sequence = sequence;
    }

    public Byte getInvalid_flag() {
        return invalid_flag;
    }

    public void setInvalid_flag(Byte invalid_flag) {
        this.invalid_flag = invalid_flag;
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