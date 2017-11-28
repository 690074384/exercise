
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { Button, Toast, Card, Modal } from 'antd-mobile';
import Room from '../../components/myRoom/Index';
import { MYROOM_SUMMARY_REQUESTED, MYROOM_DELETE_REQUESTED,RECALL_GRAB_REQUESTED } from '../../constants/myRoom';

let pageNo = 1;

class MyRoom extends React.Component {
  constructor(props) {
    super(props);
    this.deleteRoom = this.deleteRoom.bind(this);
    this.recallGrab = this.recallGrab.bind(this);
  }
  componentDidMount(){
    const { dispatch } = this.props;
    let params = {
      pageNo: 1,
      pageSize: 100,
    }

    Toast.loading('加载中...', 0, () => {});

    dispatch({type: MYROOM_SUMMARY_REQUESTED, params});
  }
  deleteRoom(id) {
    const { dispatch } = this.props;
    Modal.alert('', (<span style={{color: '#030303'}}>是否撤销会议?</span>), [
     { text: '取消', style: { color: '#0076FF' } },
     { text: '确认', style: { color: '#0076FF' }, onPress: () => {
        const params = {
          reserveId: id
        }
        Toast.loading('加载中...', 0, () => {});
        dispatch({type: MYROOM_DELETE_REQUESTED, params});
     } },
   ]);
  }
  recallGrab(id) {
    const { dispatch } = this.props;
    Modal.alert('', (<span style={{color: '#030303'}}>是否撤销所抢会议?</span>), [
     { text: '取消', style: { color: '#0076FF' } },
     { text: '确认', style: { color: '#0076FF' }, onPress: () => {
        const params = {
          reserveId: id
        }
        Toast.loading('加载中...', 0, () => {});
        dispatch({type: RECALL_GRAB_REQUESTED, params});
     } },
   ]);
  }
  createRoomList() {
    const { roomList } = this.props;
    let rows = [];
    if(roomList.length&&roomList.length > 0){
      roomList.forEach( (room, index) => {
        rows.push(
          <div key={'room' + index}>
            <div className="reserve-time">{room.reserveInfo.reserveTime}</div>
            <Room room={room} cancelRoom={this.deleteRoom} recallGrab={this.recallGrab}/>
          </div>
        )
      });
    } else {
      rows.push(<div key={'noRoom'} className="m20 gray9 tac pt20">没有预定记录</div>);
    }

    return rows;
  }

  render() {
    return (
      <div className="app-wrap pl20 pr20 w_100 h_100" style={{overflow: 'auto', WebkitOverflowScrolling: 'touch'}}>
        {this.createRoomList()}
      </div>
    );
  }
}

const getMyRoom = (state) => {
  return state.myRoom;
}
const selectors = createSelector(
  [getMyRoom],
  (myRoom) => {
    return {...myRoom};
  }
)

export default connect(selectors)(MyRoom);
