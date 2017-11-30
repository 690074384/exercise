package com.exercise.util;

import java.util.HashMap;
import java.util.Map;

public class ExceptionUtil {
    public static Map<String , Object> paramException(){
        Map<String , Object> resultMap = new HashMap<String,Object>();
        resultMap.put("code", "-1");
        resultMap.put("msg", "参数传递有误！");
        return resultMap;
    }

    public static Map<String , Object> dbException(){
        Map<String , Object> resultMap = new HashMap<String,Object>();
        resultMap.put("code", "-1");
        resultMap.put("msg", "数据插入失败！");
        return resultMap;
    }

}
