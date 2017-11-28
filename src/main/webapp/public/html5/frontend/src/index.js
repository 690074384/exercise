import './styles/index.less';
import 'sweetalert/dist/sweetalert.css';
import swal from 'sweetalert';
import Backbone from 'backbone';
import { router } from './router';
import { LOGIN } from './constants/URLS';
import { getJSON } from './common/dataService';
// import attachFastClick from 'fastclick';
// attachFastClick.attach(document.body);
//全局router，方便navigate
window.router = router;

let hasHistoryStart = false;

if(!hasHistoryStart) {
    Backbone.history.start({pushState: false});
    hasHistoryStart = true
}

$('#closeLoginBox').on('click', function(){
	$('#login').animate({top: '-200px'});
	$('#mask').hide();
});

$('#goToLogin').on('click', function(){
	let username = $.trim($('#username').val());
	let password = $.trim($('#password').val());
	if(username == '') {
		swal('账号不能为空');
		return;
	}
	if(password == '') {
		swal('密码不能为空');
		return;
	}
	getJSON(LOGIN, {
		username: username,
		password: password
	})
    .then(data => {
    	swal('登录成功');
    	setCookie('accessToken', data.token, 168);
      $('#login').animate({top: '-200px'});
			$('#mask').hide();
			if(location.hash == '#myBook') {
				location.reload();
			}
    })
    .catch( e => alert(e))
});

function setCookie(cookiename, cookievalue, hours) {
	var date = new Date();
	date.setTime(date.getTime() + Number(hours) * 3600 * 1000);
	document.cookie = cookiename + "=" + cookievalue + "; path=/;expires = " + date.toGMTString();

}
