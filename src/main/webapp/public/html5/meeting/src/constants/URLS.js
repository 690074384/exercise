const URLS =  {
    //登录
    LOGIN_URL: '/mr/login/LogIn.aciton',
    //登出
    LOGOUT_URL: '/mr/login/LogOut.aciton',

    //查询会议室列表
    SELECT_ROOM_INFO: '/mr/ajax/selectRoomInfo.action',
    //查询一个会议室
    SELECT_ROOM_INFO_BY_ID: '/mr/ajax/getRoomReserveInfo.action',

    //预定会议室
    RESERVE_ROOM: '/mr/ajax/reserveRoom.action',

    //查询我的会议
    GET_MYROOM_SUMMARY_URL: '/mr/ajax/getMyRoomInfo.action',
    //删除我的预定
    DELETE_MYROOM_URL: '/mr/ajax/deleteReserve.action',
    //抢会议室
    GRAB_MEETING_ROOM: '/mr/ajax/grabMeetingRoom.action',
    //抢错了
    RECALL_GRAB: '/mr/ajax/recallGrab.action',

    //获取会议室详细情况信息
    AJAX_GET_AREAS: '/mr/ajax/getAllAreasAndBuildings',

}

export default URLS;
