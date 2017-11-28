/**
 * 所有访问数据的接口调用该服务
 */


import global from './global';
import { LOGIN_SHOW } from '../constants/login'
import { Toast } from 'antd-mobile';

	const getJSON = (url,data) =>{
		return new Promise((resolve, reject) => {
			getData(url, data, "POST", "json",
			resolve, reject);
		});
	}

	const getData = (url, data, method, dataType, success, error ,theOptions) => {

		var options = {
			url: url,
			method: method,
			data: data,
			dataType: dataType
		};
		$.extend(options, theOptions);
		if(typeof data == 'string'){
			options.contentType  = 'application/json';
		}
		var request = $.ajax(options);

		request.done(function( data ) {
			if(dataType=='json'){ // dataType == json
				if(typeof data == 'object' && typeof data.statusCode != 'undefined'){
					if(data.statusCode==0){
						if(typeof success == 'function'){
							success.call(this, data.data,request);
						}
					}else{
						if(typeof error == 'function'){
							error.call(this, data.statusDesc,request);
						}else{
							alert(data.statusDesc);
						}
					}
				}
			}
			else{ //dataType == html
				if(typeof data == 'string' && data != 'error'){
					if(typeof success == 'function'){
						success.call(this, data,request);
					}
				}else{
					if(typeof error == 'function'){
						error.call(this, '请求数据失败，请稍后再试',jqXHR);
					}else{
						alert('请求数据失败，请稍后再试');
					}
				}
			}
		});

		request.fail(function( jqXHR, textStatus ) {
			if(jqXHR.status == 401){
				//go to login page
				
				//此处被注释掉，是因为需要保证用户填写完预定会议室的信息，点击预定显示登录页
				//登录后还要保持用户填写的信息
				//这样就不能让登录页走router，只能做页面隐藏和显示
				// window.location.href="#/login";
        Toast.hide();
				const { store } = global;
				const { dispatch } = store;
				dispatch({type: LOGIN_SHOW})
				return;
			}
			if(typeof error == 'function'){
				error.call(this, '请求数据失败，请稍后再试',jqXHR);
			}else{
				alert('请求数据失败，请稍后再试');
			}
		});
	}

export 	{getJSON };
