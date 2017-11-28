import React from 'react';
import styles from '../../styles/less/login.less';
import { Toast } from 'antd-mobile';

import { LOGIN_REQUESTED } from '../../constants/login';

class Login extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          errorMessage: '',
          username: '',
          password: '',
          showUsernameDelete: false,
          showPasswordDelete: false
        }

        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onChange = this.onChange.bind(this);
        this.delete = this.delete.bind(this);
      }
      onFocus(input){
        const { username, password } = this.state;
        if(input == 'username' ) {
          this.setState({
            showUsernameDelete: username.trim() !== '',
            showPasswordDelete: false
          })
        } else if(input == 'password') {
          this.setState({
            showUsernameDelete: false,
            showPasswordDelete: password.trim() !== ''
          })
        }
      }
      delete(icon) {
        if(icon == 'username') {
          this.setState({
            username: '',
            showUsernameDelete: false
          })
        } else if(icon == 'password') {
          this.setState({
            password: '',
            showPasswordDelete: false
          })
        }
      }
      onChange(input, event) {
        const value = event.target.value.trim()
        if(input == 'username') {
          this.setState({
            username: value,
            showUsernameDelete: value !== ''
          })
        } else if(input == 'password') {
          this.setState({
            password: value,
            showPasswordDelete: value !==''
          })
        }
      }
      handleLoginClick(e){
        const { dispatch } = this.props;
        const { username, password } = this.state;
        if(username == ''){
          Toast.info('请输入263账号！');
          return;
        }
        if(password == ''){
          Toast.info('请输入263密码');
          return;
        }
        const params = { username, password };
        dispatch({type: LOGIN_REQUESTED, params});
      }

      render() {
        const { showUsernameDelete, showPasswordDelete, username, password } = this.state;
        const { showLogin } = this.props
        return (
            <div className={styles.root + (showLogin ? '' : (' ' + styles['root--hidden']))}>
              <div className={styles['form-container']}>
                <form>
                <div className={styles['input-container']}>
                  <i className={styles['icon-username']}></i>
                  <input onFocus={() => {this.onFocus('username')}} value={username}
                   placeholder="请输入263账号"  className={styles['input-username']}
                   onChange={ (event) => this.onChange('username', event)}/>
                  <i onClick={() => {this.delete('username')}} className={showUsernameDelete ? styles['icon-delete--show'] : styles['icon-delete--none']}></i>
                  <span className={styles['mail-suffix']}>@sunlands.com</span>
                </div>
                <div className={styles['input-container']}>
                  <i className={styles['icon-password']}></i>
                  <input onFocus={() => {this.onFocus('password')}} type="password"
                  value={password} placeholder="请输入263密码"  className={styles['input-password']}
                  onChange={ (event) => this.onChange('password', event)}/>
                  <i onClick={() => {this.delete('password')}} className={showPasswordDelete ? styles['icon-password-delete--show'] : styles['icon-delete--none']}></i>
                </div>
                <div onClick={this.handleLoginClick} className={styles['button-submit--actived']}>
                  登录
                </div>
                </form>
              </div>
            </div>
        );
      }
}

export default Login;
