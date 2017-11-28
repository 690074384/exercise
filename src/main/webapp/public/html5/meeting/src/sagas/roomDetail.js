import { takeEvery, isCancelError } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { getJSON } from '../common/dataService';
import URLS from '../constants/URLS';
import { hashHistory } from 'react-router';

import { GET_ONE_ROOM_REQUESTED, GET_ONE_ROOM_SUCCEEDED, GET_ONE_ROOM_FAILED } from '../constants/roomDetail';

function* fetchOneRoom(action) {
    try {
        const { params } = action;
        const data = yield call(getJSON, URLS.SELECT_ROOM_INFO_BY_ID, params);
        yield put({type: GET_ONE_ROOM_SUCCEEDED, roomDetailInfo: data});
    } catch(e) {
        yield put({type: GET_ONE_ROOM_FAILED, message: e});
    }
}

function* fetchOneRoomSaga() {
    yield takeEvery(GET_ONE_ROOM_REQUESTED, fetchOneRoom);
}

export {
    fetchOneRoomSaga
}
