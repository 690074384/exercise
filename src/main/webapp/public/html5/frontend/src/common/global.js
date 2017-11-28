var global = {
    hasLogin: '',
    userId: '',
    userName: '',
    login: function(params) {
        this.hasLogin = params.hasLogin;
        this.userId = params.userId ? params.userId : -1;
        this.userName = params.userName;
    },
    logout: function() {
        this.hasLogin = false;
        this.userId = '';
        this.userName = '';
    },

    showAjaxConnectionTip: true
}

export {global};