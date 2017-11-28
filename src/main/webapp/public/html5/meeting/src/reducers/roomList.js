import { handleActions } from 'redux-actions';
import { SELECT_ROOM_INFO_SUCCEEDED, SELECT_ROOM_INFO_FAILED,
          RESERVE_ROOM_SUCCEEDED, RESERVE_ROOM_FAILED, CLEAN_ROOM_INFO,
          GRAB_MEETING_ROOM_SUCCEEDED,GRAB_MEETING_ROOM_FAILED,
            AJAX_GET_AREAS_SUCCEEDED, AJAX_GET_AREAS_FAILED}  from '../constants/roomList';

import { Toast } from 'antd-mobile';
import { hashHistory } from 'react-router';

export default handleActions({
    [CLEAN_ROOM_INFO](state, action) {
        const roomList = [];
        return {...state, roomList}
    },
    [SELECT_ROOM_INFO_SUCCEEDED](state, action) {
        const { roomList, newSearch , isLoading} = action;
        // 如果不是新查询，那么是要把新的数据追加到队尾
        if(!newSearch) {
            const currentRoomList = state.roomList;
            if(currentRoomList.rows) {
                roomList.rows = currentRoomList.rows.concat(roomList.rows)
            }
        }
        Toast.hide();
        return {...state, roomList, isLoading};
    },
    [SELECT_ROOM_INFO_FAILED](state, action) {
        Toast.hide();
        Toast.info(action.message);
        return state;
    },
    [RESERVE_ROOM_SUCCEEDED](state, action) {
        Toast.hide();
        const { data, _this } = action;
        if(data) {
            _this.showPunishInfo(data);
        }
        return state;
    },
    [RESERVE_ROOM_FAILED](state, action) {
        Toast.hide();
        Toast.info(action.message);
        return state;
    },
    [GRAB_MEETING_ROOM_SUCCEEDED](state, action) {
        Toast.hide();
        return {...state};
    },
    [GRAB_MEETING_ROOM_FAILED](state, action) {
        Toast.hide();
        Toast.info(action.message);
        return state;
    }, 
    [AJAX_GET_AREAS_SUCCEEDED](state, action) {
        Toast.hide();
        const { areas } = action;
        return {...state, areas};
    },
    [AJAX_GET_AREAS_FAILED](state, action) {
        Toast.hide();
        Toast.info(action.message);
        return state;
    },
}, {
  roomList: [],
  areas: [],
})
