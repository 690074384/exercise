import { takeEvery, isCancelError } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { getJSON } from '../common/dataService';
import URLS from '../constants/URLS';
import { hashHistory } from 'react-router';

import { SELECT_ROOM_INFO_REQUESTED, SELECT_ROOM_INFO_SUCCEEDED, SELECT_ROOM_INFO_FAILED,
          RESERVE_ROOM_REQUESTED, RESERVE_ROOM_SUCCEEDED, RESERVE_ROOM_FAILED,
          GRAB_MEETING_ROOM_REQUESTED,
          GRAB_MEETING_ROOM_SUCCEEDED,
          GRAB_MEETING_ROOM_FAILED,
      AJAX_GET_AREAS_REQUESTED, AJAX_GET_AREAS_SUCCEEDED, AJAX_GET_AREAS_FAILED}  from '../constants/roomList';

function* fetchRoomList(action) {
    try {
        const { params, newSearch } = action;
        const data = yield call(getJSON, URLS.SELECT_ROOM_INFO, params);
        yield put({type: SELECT_ROOM_INFO_SUCCEEDED, roomList: data.dataList, newSearch, total: data.total, isLoading: false});
    } catch(e) {
        yield put({type: SELECT_ROOM_INFO_FAILED, message: e});
    }
}

function* fetchRoomListSaga() {
    yield takeEvery(SELECT_ROOM_INFO_REQUESTED, fetchRoomList);
}

function* reserveRoom(action) {
    try {
        const { params, _this } = action;
        const data = yield call(getJSON, URLS.RESERVE_ROOM, params);
        yield put({type: RESERVE_ROOM_SUCCEEDED, data, _this});
        if(!data) {
            hashHistory.push('/myRoom');
        }
    } catch(e) {
        yield put({type: RESERVE_ROOM_FAILED, message: e});
    }
}

function* reserveRoomSaga() {
    yield takeEvery(RESERVE_ROOM_REQUESTED, reserveRoom);
}
function* grabMeetingRoom(action) {
    try {
        const { params } = action;
        const data = yield call(getJSON, URLS.GRAB_MEETING_ROOM, params);
        yield put({type: GRAB_MEETING_ROOM_SUCCEEDED});
        yield hashHistory.push('/myRoom');
    } catch(e) {
        yield put({type: GRAB_MEETING_ROOM_FAILED, message: e});
    }
}
function* ajaxGetAreas(action) {
    try {
        const data = yield call(getJSON, URLS.AJAX_GET_AREAS);
        yield put({type: AJAX_GET_AREAS_SUCCEEDED, areas: data});
    } catch(e) {
        yield put({type: AJAX_GET_AREAS_FAILED, message: e});
    }
}

function* ajaxGetAreasSaga() {
    yield takeEvery(AJAX_GET_AREAS_REQUESTED, ajaxGetAreas);
}

function* grabMeetingRoomSaga() {
    yield takeEvery(GRAB_MEETING_ROOM_REQUESTED, grabMeetingRoom);
}
export {
    fetchRoomListSaga,reserveRoomSaga,grabMeetingRoomSaga,ajaxGetAreasSaga
}
