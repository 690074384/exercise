import { handleActions } from 'redux-actions';
import { LOGIN_SUCCEEDED, LOGIN_FAILED, LOGIN_SHOW, LOGIN_HIDE }  from '../constants/login';
import { Toast } from 'antd-mobile';

export default handleActions({
    [LOGIN_SUCCEEDED](state, action) {
        //登录了成功后，隐藏登录页面
        //登录页面是不走router的
        Toast.hide();
        const showLogin = false;
        return {...state, showLogin}
    },
    [LOGIN_FAILED](state, action) {
        Toast.hide();
        Toast.info(action.message);
        return state;
    },
    [LOGIN_SHOW](state, action) {
        const showLogin = true;
        return {...state, showLogin}
    },
    [LOGIN_HIDE](state, action) {
        const showLogin = false;
        return {...state, showLogin}
    }
}, {

})