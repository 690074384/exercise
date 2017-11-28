import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Button, Toast, Card, Modal, Flex } from 'antd-mobile';
import { RESERVE_ROOM_REQUESTED, GRAB_MEETING_ROOM_REQUESTED } from '../../constants/roomList';

class RoomCard extends React.Component {
  constructor(props) {
    super(props);
    // time9-time20用来保存每个时间格子的state,free代表空闲，booked代表已预定，checked代表已选中
    this.state = {
      disableShow: false,
      showBtnFlag: false,
      time9: 'free',
      time10: 'free',
      time11: 'free',
      time12: 'free',
      time13: 'free',
      time14: 'free',
      time15: 'free',
      time16: 'free',
      time17: 'free',
      time18: 'free',
      time19: 'free',
      time20: 'free',
      startGridIndex: 0,
      endGridIndex: 0,
      data: {
        building:'',
        capacity:'',
        createTime:'',
        deleteFlag:'',
        floor:'',
        hasProjector:'',
        reserveList:'',
        revseredList:[],
        roomId:'',
        roomName:'',
        roomNum:'',
        updateTime:'',
      },
    }
    this.showBtn = this.showBtn.bind(this);
    this.reserveRoom = this.reserveRoom.bind(this);
    this.grabMeetingRoom = this.grabMeetingRoom.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data
    });
    const data = nextProps.data.revseredList||[];
    this.setTimeGridState(data);
  }

  componentDidMount(){
    this.setState({
      data: this.props.data
    });
    const data = this.props.data.revseredList||[];
    this.setTimeGridState(data);
  }

  setTimeGridState(data){
    let queryDate = new Date(this.props.queryDate.replace(/-/g,'/')).getTime();
    let dateTime = new Date().getTime();
    let currentHour = new Date().getHours();
    let timeObj = {};
    // 初始化时间格子
    data.map((item, index) => {
      if (((index+9) < currentHour)&&!(queryDate > dateTime)) {
        timeObj['time'+(index+9)] = 'timeout';
      } else {
        timeObj['time'+(index+9)] = data[index].used=='1'?'booked':'free';
      }
    });
    this.setState(timeObj);
  }
  queryReserveTimeById(revId) {
      const data = this.state.data.revseredList||[];
      let tempArr = [];
      data.forEach((item, index) => {
          if(item.reserveInfo) {
              if(item.reserveInfo.revId == revId) {
                  tempArr.push({beginTime: item.beginTime, endTime: item.endTime})
              }
          }
      })
      if(tempArr.length>0) {
          return {beginTime:tempArr[0].beginTime, endTime: tempArr[tempArr.length-1].endTime}
      } else {
          return {};
      }

  }
  showBtn(e) {
    let { disableShow } = this.props;
    disableShow = disableShow || this.state.disableShow;
    const targetName = e.target.nodeName;
    if(targetName=='INPUT'||targetName=='TEXTAREA'||targetName=='BUTTON') {
      return;
    }
    const data = this.state.data.revseredList||[];

    const {building, floor, roomNum} = this.state.data;

    const timeIndex = $(e.target).attr('data-time-index');
    let currentGirdState = this.state['time'+timeIndex];
    if(currentGirdState=='free'){
      this.setState({
        ['time'+timeIndex]: 'checked'
      });
      if(this.state.showBtnFlag) {
        return;
      }
      // return;
    } else if (currentGirdState=='checked') {
      this.setState({
        ['time'+timeIndex]: 'free'
      });
      return;
    } else if (currentGirdState=='booked') {
        const str1 = building+'#楼'+floor+'层'+roomNum;
        const startEndTimeObj = this.queryReserveTimeById(data[timeIndex-9].reserveInfo.revId);
        const str2 = startEndTimeObj.beginTime+'-'+startEndTimeObj.endTime;
        const queryDate = new Date(this.props.queryDate.replace(/-/g,'/')+' '+startEndTimeObj.beginTime+':00').getTime();
        const currentDate = new Date().getTime();
        //如果预定会议室10分钟后
        if(currentDate-queryDate > 10*60*1000) {
            const reserveInfoJSX = (<div style={{lineHeight: '0.3333rem', fontSize: '0.3466rem', color: '#030303', textAlign: 'left', paddingTop: '0.2rem'}}>
                                    <div className=""><div className="dib tar " style={{width: '45%'}}>协商会议室：</div>{str1}</div><br/>
                                    <div className=""><div className="dib tar " style={{width: '45%'}}>预定人：</div>{data[timeIndex-9].reserveInfo.revUserName}</div><br/>
                                    <div className=""><div className="dib tar " style={{width: '45%'}}>预定时间：</div>{str2}</div><br/>
                                    <div className="tac" style={{lineHeight: '0.4rem', color: '#ff8080'}}>被抢方会被禁用7天，建议协商为主，<br/>请您拍照留存证据，以免发生纠纷</div>
                                 </div>);
            Modal.alert((<div style={{ color: '#030303', fontSize: '0.4rem', borderBottom: '1PX solid #ddd', paddingBottom: '0.4rem' }}>会议室已被预定，但对方没来</div>), reserveInfoJSX, [
                { text: '取消', style: { color: '#0076FF' } },
                { text: '果断抢', onPress: () => {this.grabMeetingRoom(data[timeIndex-9].reserveInfo.revId)}, style: { color: '#0076FF' } }
              ])
            return;
        } else {
            const reserveInfoJSX = (<div style={{lineHeight: '0.3333rem', fontSize: '0.3466rem', color: '#030303', textAlign: 'left', paddingTop: '0.2rem'}}>
                                    <div className=""><div className="dib tar " style={{width: '45%'}}>协商会议室：</div>{str1}</div><br/>
                                    <div className=""><div className="dib tar " style={{width: '45%'}}>预定人：</div>{data[timeIndex-9].reserveInfo.revUserName}</div><br/>
                                    <div className=""><div className="dib tar " style={{width: '45%'}}>预定时间：</div>{str2}</div><br/>
                                 </div>);
            Modal.alert((<div style={{ color: '#030303', fontSize: '0.4rem', borderBottom: '1PX solid #ddd', paddingBottom: '0.4rem' }}>会议室已被预定，是否协商会议室?</div>), reserveInfoJSX, [
                { text: '取消', style: { color: '#0076FF' } },
                { text: '拨打电话', onPress: () => location.href = `tel:${data[timeIndex-9].reserveInfo.revUserPhone}`, style: { color: '#0076FF' } }
              ])
            return;
        }
    }
    //禁用显示隐藏
    if(!disableShow) {
      if(!this.state.showBtnFlag) {
        this.setState({
          showBtnFlag:true
        });
      } else {
        this.setState({
          showBtnFlag:false
        });
      }
    }
  }
  reserveRoom() {
    const { dispatch } = this.props;
    const {data} = this.state;
    const id = data.roomId;
    const date = this.props.queryDate;
    const title = this.refs.meetingTitle.value.trim();
    const remark = this.refs.meetingRemark.value.trim();
    const { time9, time10, time11, time12, time13, time14, time15, time16, time17, time18, time19, time20 } = this.state;
    let timeList = [];
    if(time9 == 'checked') {
      timeList.push('9-10')
    }
    if(time10 == 'checked') {
      timeList.push('10-11')
    }
    if(time11 == 'checked') {
      timeList.push('11-12')
    }
    if(time12 == 'checked') {
      timeList.push('12-13')
    }
    if(time13 == 'checked') {
      timeList.push('13-14')
    }
    if(time14 == 'checked') {
      timeList.push('14-15')
    }
    if(time15 == 'checked') {
      timeList.push('15-16')
    }
    if(time16 == 'checked') {
      timeList.push('16-17')
    }
    if(time17 == 'checked') {
      timeList.push('17-18')
    }
    if(time18 == 'checked') {
      timeList.push('18-19')
    }
    if(time19 == 'checked') {
      timeList.push('19-20')
    }
    if(time20 == 'checked') {
      timeList.push('20-21')
    }
    // 校验
    if(timeList.length  == 0) {
      Toast.info('请选择会议时间！')
      return
    }
    if(title == '') {
      Toast.info('请选择会议主题！')
      return;
    }
    for (let i = 0; i < timeList.length; i++) {
      for (let j = i+1; j < timeList.length; j++) {
        let [firstHead, firstTail] = timeList[i].split('-');
        let [secondHead, secondTail] = timeList[j].split('-');
        if (firstTail == secondHead) {
          timeList[i] = firstHead + '-' + secondTail;
          timeList.splice(j, 1);
          j--;
        }
      }
    }

    const time = timeList.join(',')
    const params = { id, date, title, remark, time};
    Toast.loading('加载中...', 0, () => {});
    dispatch({type: RESERVE_ROOM_REQUESTED, params, _this: this});
  }
  showPunishInfo(data = {revInfo: []}) {
      Toast.hide();
      const tempJsx = data.revInfo.map((item,index) => <div key={index}>{`${item.building}#${item.floor}层${item.roomNum}  ${item.reserveTime}`}</div>)
      Modal.alert('提示', (<div style={{color: '#030303', textAlign: 'left'}}>
          <span>因您预定的会议室被抢，{data.days}天内您不能预定，还剩{data.punishDays}天</span><br/>
          <div style={{color: '#999', lineHeight: '0.8rem'}}>被抢会议室：</div>
          {tempJsx}
      </div>), [
       { text: '知道了', style: { color: '#0076FF' } },
     ]);

  }
  grabMeetingRoom(revId='') {
      const { dispatch } = this.props;
      const {data} = this.state;
      const params = {revId};
      Toast.loading('加载中...', 0, () => {});
      dispatch({type: GRAB_MEETING_ROOM_REQUESTED, params});
  }
  render() {
    const {disableShow} = this.props;
    const {data} = this.state;
    let isShowClassName = 'roomItem';
    if(disableShow) {
      isShowClassName = 'roomItem roomItem-show';
    } else {
      if(this.state.showBtnFlag) {
        isShowClassName = 'roomItem roomItem-show';

      } else {
        isShowClassName = 'roomItem';
      }
    }
    return (
      <div className={isShowClassName} onClick={this.showBtn}>
        <Card full>
          <Card.Header style={{height: '80px'}}
            title={<span className="gray3 f30">{data.area}{data.building}#楼{data.floor}层{data.roomNum}</span>}
            thumb=""
            extra={<span className="f26">容纳人数:<span className="red2 mr20">{data.capacity}人</span>投影仪:<span className="red2">{data.hasProjector==1?'有':'无'}</span></span>}
          />
          <Card.Body>
            <div className="input-wrap mb20">
              <Flex>
                <div className="w150">会议主题：</div>
                <Flex.Item><input className="sunl-input" placeholder="请填写会议主题" ref="meetingTitle" /></Flex.Item>
              </Flex>
            </div>
            <div className="textarea-wrap mb20">
            <Flex>
              <div className="w150">备注：</div>
              <Flex.Item><textarea className="sunl-textarea" ref="meetingRemark"></textarea></Flex.Item>
            </Flex>
            </div>
            <Flex wrap="wrap">
              <div className="mr20">上午</div>
              <div className={'icon-time '+this.state.time9} data-time-index={9}><span data-time-index={9}>09-10</span></div>
              <div className={'icon-time '+this.state.time10} data-time-index={10}><span data-time-index={10}>10-11</span></div>
              <div className={'icon-time '+this.state.time11} data-time-index={11}><span data-time-index={11}>11-12</span></div>
              <div className={'icon-time '+this.state.time12} data-time-index={12}><span data-time-index={12}>12-13</span></div>
            </Flex>
            <Flex wrap="wrap">
              <div className="mr20">下午</div>
              <div className={'icon-time '+this.state.time13} data-time-index={13}><span data-time-index={13}>13-14</span></div>
              <div className={'icon-time '+this.state.time14} data-time-index={14}><span data-time-index={14}>14-15</span></div>
              <div className={'icon-time '+this.state.time15} data-time-index={15}><span data-time-index={15}>15-16</span></div>
              <div className={'icon-time '+this.state.time16} data-time-index={16}><span data-time-index={16}>16-17</span></div>
              <div className={'icon-time '+this.state.time17} data-time-index={17}><span data-time-index={17}>17-18</span></div>
              <div className={'icon-time '+this.state.time18} data-time-index={18}><span data-time-index={18}>18-19</span></div>
            </Flex>
            <Flex wrap="wrap">
              <div className="mr20">晚上</div>
              <div className={'icon-time '+this.state.time19} data-time-index={19}><span data-time-index={19}>19-20</span></div>
              <div className={'icon-time '+this.state.time20} data-time-index={20}><span data-time-index={20}>20-21</span></div>
            </Flex>
          </Card.Body>
          <Card.Footer content={
            <div>
            <Flex wrap="wrap">
              <div className="icon-time-small timeout-small"></div><span className="mr40 f24">已过期</span>
              <div className="icon-time-small booked-small mr10" style={{marginTop: '4px'}}></div><span className="mr40 f24">已预定</span>
              <div className="icon-time-small checked-small"></div><span className="mr40 f24">已选</span>
              <div className="icon-time-small free-small"></div><span className="mr40 f24">空闲</span>
            </Flex>
            <div className="pt20 btn-wrap" >
              <button className="query-button" onClick={this.reserveRoom}>预定会议室</button>
            </div>
            </div>
          } />
        </Card>
        {this.props.children}
      </div>
    );
  }
}

const getRoomCard = (state) => {
  return state.roomCard;
}
const selectors = createSelector(
  (roomCard) => {
    return {...roomCard};
  }
)

export default connect(selectors)(RoomCard);
