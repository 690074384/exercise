import { takeEvery, isCancelError } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { getJSON } from '../common/dataService';
import URLS from '../constants/URLS';

import { MYROOM_SUMMARY_REQUESTED, MYROOM_SUMMARY_SUCCEEDED, MYROOM_SUMMARY_FAILED,
        MYROOM_DELETE_REQUESTED, MYROOM_DELETE_SUCCEEDED, MYROOM_DELETE_FAILED,
        RECALL_GRAB_REQUESTED, RECALL_GRAB_SUCCEEDED, RECALL_GRAB_FAILED, } from '../constants/myRoom'

function* fetchMyRoomData(action) {
    try {
        const { params } = action;
        const data = yield call(getJSON, URLS.GET_MYROOM_SUMMARY_URL, params);
        const { rows } = data;
        yield put({type: MYROOM_SUMMARY_SUCCEEDED, roomList: rows});
    } catch(e) {
        yield take({type: MYROOM_SUMMARY_FAILED, message: e});
    }
}

function* fetchMyRoomDataSaga() {
    yield takeEvery( MYROOM_SUMMARY_REQUESTED, fetchMyRoomData)
}

function* deleteRoom(action) {
    try {
        const { params } = action;
        const data = yield call(getJSON, URLS.DELETE_MYROOM_URL, params);
        yield put({type: MYROOM_DELETE_SUCCEEDED, deleteId: params.reserveId});
    } catch(e) {
        yield put({type: MYROOM_DELETE_FAILED, message: e});
    }
}

function* deleteRoomSaga() {
    yield takeEvery( MYROOM_DELETE_REQUESTED, deleteRoom)
}
function* recallGrab(action) {
    try {
        const { params } = action;
        const data = yield call(getJSON, URLS.RECALL_GRAB, params);
        yield put({type: RECALL_GRAB_SUCCEEDED, deleteId: params.reserveId});
    } catch(e) {
        yield put({type: RECALL_GRAB_FAILED, message: e});
    }
}

function* recallGrabSaga() {
    yield takeEvery( RECALL_GRAB_REQUESTED, recallGrab)
}
export {
    fetchMyRoomDataSaga,
    deleteRoomSaga,
    recallGrabSaga,
}
