package com.exercise.util;

import com.alibaba.fastjson.JSONArray;

/**
 * 可能会用到题目迭代中
 */
public class Test {
    public static void main(String[] args) {
        TreeNode root = new TreeNode("0", "0", "000000", "00JJJ");
        TreeNode node = null;
        node = new TreeNode("1", "0", "111111", "11AAA");
        root.add(node);
        node = new TreeNode("2", "0", "222222", "11BBB");
        root.add(node);
        node = new TreeNode("3", "2", "333333", "11CCC");
        root.add(node);
        // JSONObject obj = JSONObject.fromObject(root);//有根
        JSONArray obj = (JSONArray) JSONArray.toJSON(root.getChildren());// 不要根
        System.out.println(obj.toString());
    }
}