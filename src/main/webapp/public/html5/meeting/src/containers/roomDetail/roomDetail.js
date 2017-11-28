
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { Button, Toast, Card, Modal, WhiteSpace, Flex, DatePicker } from 'antd-mobile';
import RoomCard from '../../components/roomCard/roomCard';
import { GET_ONE_ROOM_REQUESTED } from '../../constants/roomDetail';
import moment from 'moment';
import { hashHistory, History } from 'react-router';

const today = moment().format('YYYY-MM-DD');
const tomorrow = moment().add(1, 'd').format('YYYY-MM-DD');
const theDayAfterTomorrow = moment().add(2, 'd').format('YYYY-MM-DD');

class RoomDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCustomDate: false, //是否是自定义日期
      date: today,
    };
    this.dateChoose = this.dateChoose.bind(this);
  }

  componentDidMount(){
    this.queryRoomInfo();
  }

  gotoRoomList() {
    hashHistory.push('roomList');
  }

  queryRoomInfo() {
    const { dispatch, routeParams } = this.props;
    let id = routeParams.roomId;
    let {date} = this.state;
    let params = {
      id: id,
      date: date,
    }
    dispatch({type: GET_ONE_ROOM_REQUESTED, params});
  }
  //选择日期
  dateChoose(value, custom) {
      switch(value) {
      case 0: //自定义
        this.setState({
          date: custom.format('YYYY-MM-DD'),
          isCustomDate: true
        })
      break;
      case 1: //今天
        this.setState({
          date: today,
          isCustomDate: false
        })
      break;
      case 2: //明天
        this.setState({
          date: tomorrow,
          isCustomDate: false
        })
      break;
      case 3: //后天
        this.setState({
          date: theDayAfterTomorrow,
          isCustomDate: false
        })
      break;
      }
      setTimeout(()=>{
        this.queryRoomInfo();
      },0);
  }
  render() {
    let {roomDetailInfo} = this.props;
    const {date,isCustomDate} = this.state;
    const CustomDatePickerChildren = (props) => (
        <div onClick={props.onClick}>
            {props.children}
        </div>
    );
    let list = (<RoomCard data={roomDetailInfo} disableShow={true} queryDate={date}/>);
    return (
      <div className="">
        <div className="query-box mb20">
            <WhiteSpace size="md" />
            <span className='f30'>会议日期</span>
            <WhiteSpace size="xs" />
            <Flex wrap="wrap">
                <div className={"sunl-radio" + ((date == today) && !isCustomDate ? ' sunl-radio-checked' : '')} onClick={() => {this.dateChoose(1)}}>今天</div>
                <div className={"sunl-radio" + ((date == tomorrow) && !isCustomDate ? ' sunl-radio-checked' : '')} onClick={() => {this.dateChoose(2)}}>明天</div>
                <div className={"sunl-radio" + ((date == theDayAfterTomorrow) && !isCustomDate ? ' sunl-radio-checked' : '')} onClick={() => {this.dateChoose(3)}}>后天</div>
                <DatePicker mode="date" onChange={(v) => { this.dateChoose(0, v) }} minDate={moment()} maxDate={moment().add(7, 'd')}>
                    <CustomDatePickerChildren>
                        <div className={"sunl-radio" + (isCustomDate ? ' sunl-radio-checked sunl-radio-customdate' : '')}>{ isCustomDate ? date : '自定义'}</div>
                    </CustomDatePickerChildren>
                </DatePicker>
            </Flex>
            <WhiteSpace size="md" />
        </div>
        {list}
        <div onClick={this.gotoRoomList} style={{color: '#666',fontSize: '0.3734rem', width: '100%', textAlign: 'center', textDecoration: 'underline'}}>
          查找更多会议室
        </div>
      </div>
    );
  }
}

const getRoomDetail = (state) => {
  return state.roomDetail;
}
const selectors = createSelector(
  [getRoomDetail],
  (roomDetail) => {
    return {...roomDetail};
  }
)

export default connect(selectors)(RoomDetail);
