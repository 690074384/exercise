
import React, { Component, PropTypes } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Footer from './footer/footer';
//login
import Login from './login/login'

class AppComponent extends React.Component {
  constructor(props) {
    super(props);

  }
  componentDidMount(){

  }
  componentWillUnmount(){
  }

  render() {
    const { login, dispatch } = this.props;
    const { showLogin } = login;
    let footer = (<div></div>);
    if(this.props.location.pathname.indexOf('roomDetail') == -1) {
      footer = (<Footer {...this.props} />);
    }
    return (
      <div className='w_100 h_100'>
        <Login {...this.props}/>
        <div className={showLogin ? 'dn' : '' + ' w_100 h_100'}>
          {this.props.children}
          {footer}
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

const getState = (state) => {
  return state ;
};

const selectors = createSelector(
  [getState],
  (state) => {
    return  state ;
  }
)

export default connect(selectors)(AppComponent);
