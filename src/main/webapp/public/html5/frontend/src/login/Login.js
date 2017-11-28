const template = require('./Login.html');
const { LOGIN_URL } = require('../constants/URLS');
const { getJSON } = require('../common/dataService');
const { global } = require('../common/global');

var Login = Backbone.View.extend({
	el: '<div class="loginBg"></div>',
	events: {
		'click #submit': 'submit'
	},
  	initialize(options) {
  		this.render();
  	},

  	validate(){

  	},

  	submit() {
  		const username = $.trim(this.$el.find('input#loginUserName').val());
  		const password = $.trim(this.$el.find('input#loginPassword').val());
  		getJSON(LOGIN_URL, {
  			username, password
  		})
  		.then( data => this.submitSuccess(data) )
  		.catch( e => alert(e) )
  	},

  	submitSuccess(data) {
  		global.login(data);
  		//登录成功后，跳转到首页
  		router.navigate('home',  {trigger: true})
  	},

  	render() {
  		this.$el.html(template.render())
  	}

});

export { Login };