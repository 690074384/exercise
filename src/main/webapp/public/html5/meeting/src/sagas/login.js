import { takeEvery, isCancelError } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { getJSON } from '../common/dataService';
import URLS from '../constants/URLS';
import { hashHistory } from 'react-router';

import { LOGIN_REQUESTED, LOGIN_SUCCEEDED, LOGIN_FAILED }  from '../constants/login';

function setCookie(cookiename, cookievalue, hours) {
	var date = new Date();
	date.setTime(date.getTime() + Number(hours) * 3600 * 1000);
	document.cookie = cookiename + "=" + cookievalue + "; path=/;expires = " + date.toGMTString();

}

function* login(action) {
    try {
        const { params } = action;
        const data = yield call(getJSON, URLS.LOGIN_URL, params);
        //登录成功，不需要任何数据
        // setCookie('accessToken', data.token, 168);
        yield put({type: LOGIN_SUCCEEDED});
        // yield hashHistory.push('roomList');
    } catch(e) {
        yield put({type: LOGIN_FAILED, message: e});
    }
}

function* loginSaga() {
    yield takeEvery(LOGIN_REQUESTED, login);
}



export {
    loginSaga
}
