
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import Login from '../../components/login/Index';


const getLogin = (state) => {
  return state.login;
}
const selectors = createSelector(
  [getLogin],
  (login) => {
    return {...login};
  }
)

export default connect(selectors)(Login);
