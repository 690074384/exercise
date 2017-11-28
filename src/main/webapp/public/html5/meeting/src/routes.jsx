import React from 'react';
import ReactDom from 'react-dom';

import {getJSON} from './common/dataService';
import global from './common/global';
import util from './common/util';
import URLS from './constants/URLS';

//main
import Main from './containers/Main';
import MyRoom from './containers/myRoom/myRoom';
import RoomList from './containers/roomList/roomList';
import RoomDetail from './containers/roomDetail/RoomDetail';
//login
//import Login from './containers/login/login'

const routes = [{
  path: '/',
  component: Main,
  indexRoute: {component: RoomList},
  childRoutes: [
    {
      path: 'myRoom',
      component: MyRoom
    },
    {
      path: 'roomList',
      component: RoomList
    },
    {
      path: 'roomDetail/:roomId',
      component: RoomDetail
    }
  ]
},
    //{
      //path: 'login',
      //component: Login
    //}
];

export default routes;
