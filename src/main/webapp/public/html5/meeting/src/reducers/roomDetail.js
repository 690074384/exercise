import { handleActions } from 'redux-actions';
import { GET_ONE_ROOM_SUCCEEDED, GET_ONE_ROOM_FAILED }  from '../constants/roomDetail';
import { Toast } from 'antd-mobile';

export default handleActions({

    [GET_ONE_ROOM_SUCCEEDED](state, action) {
        Toast.hide();
        const { roomDetailInfo } = action;
        return {...state, roomDetailInfo};
    },
    [GET_ONE_ROOM_FAILED](state, action) {
        Toast.hide();	
        Toast.info(action.message);
        return state;
    },
}, {
  roomDetailInfo: {}
})
