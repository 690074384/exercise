
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Button, Toast, Card, Modal, WhiteSpace, Flex, InputItem, DatePicker, Picker, List, ListView, RefreshControl } from 'antd-mobile';
import RoomCard from '../../components/roomCard/roomCard';
import Query from '../../components/roomCard/Query';
import { SELECT_ROOM_INFO_REQUESTED, CLEAN_ROOM_INFO, AJAX_GET_AREAS_REQUESTED } from '../../constants/roomList';
import moment from 'moment';


function MyBody(props) {
  return (
    <div className="am-list-body my-body">
      {props.children}
    </div>
  );
}

const today = moment().format('YYYY-MM-DD');

class RoomList extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      isLoading: false,
      hasMore: false,
      dataSource: dataSource.cloneWithRows({}),
    }
    this.onSearch = this.onSearch.bind(this);
    this.onEndReached = this.onEndReached.bind(this);

  }
  componentWillMount(){
    this.params = {
        pageNo: 1,
        pageSize: 10,
        date: today, //日期
        startTime: '', //开始时间
        duration: '', //计划时长
        building: '', //楼号
        floor: '', //楼层选择
        minNum: '', //最小容纳人数
        maxNum: '', //最大容纳人数
        hasProjector: '', //是否有投影设备
    }
  }
  componentDidMount(){
    Toast.loading('加载中...', 0, () => {});
    this.onSearch({}, true);
    this.ajaxGetAreas();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.roomList.rows !== this.props.roomList.rows) {
      if(nextProps.roomList.rows) {
        this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.roomList.rows),
        isLoading: nextProps.isLoading
      });
      }
      
    }
  }
  ajaxGetAreas() {
    const { dispatch } = this.props;
    dispatch({type: AJAX_GET_AREAS_REQUESTED})
  }
  onSearch(params, newSearch) {
    const { dispatch } = this.props;
    Object.assign(this.params, params);
    if(newSearch) {
      dispatch({type: CLEAN_ROOM_INFO})
    }
    dispatch({type: SELECT_ROOM_INFO_REQUESTED, params: this.params, newSearch})
  }

  onEndReached(event) {
    const { roomList } = this.props;
    const { pageNo, pageSize } = this.params;
    const total = roomList.total;
    
    if (this.state.isLoading || pageNo * pageSize >= total) {
      return;
    }
    
    this.setState({ isLoading: true });
    this.onSearch({pageNo: pageNo + 1}, false);
  }

  render() {
    const separator = (sectionID, rowID) => (
      <div key={`${sectionID}-${rowID}`} style={{ height: '0.26667rem', background: '#efeff4'}}/>
    );
    const row = (rowData, sectionID, rowID) => {
      return (
        <RoomCard key={rowID} data={rowData} queryDate={this.params.date}/>
      );
    };
    const { roomList } = this.props;
    let rows = roomList.rows || [];
    let listJSX;

    if(rows.length > 0) {
      listJSX = (
        <ListView ref="lv"
          dataSource={this.state.dataSource}
          renderFooter={() => <div style={{ padding: '0.26667rem', textAlign: 'center' }}>
            {this.state.isLoading ? '加载中...' : '加载完毕'}
          </div>}
          renderRow={row}
          renderSeparator={separator}
          renderBodyComponent={() => <MyBody />}
          className="am-list"
          pageSize={10}
          scrollRenderAheadnceDista={500}
          scrollEventThrottle={20}
          onScroll={() => {}}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={10}
          style={{
            height: document.documentElement.clientHeight*3/4,
            overflow: 'auto',
          }}
        />
      );
    } else {
      listJSX = (<div className="m20 gray9 tac pt20 f28">没有符合条件会议室</div>);
    }
    return (
      <div className="app-wrap">
        <Query {...this.props} onSearch={ params => {this.onSearch(params, true)}}/>
        {listJSX}
        {this.props.children}
      </div>
    );
  }
}

const getRoomList = (state) => {
  return state.roomList;
}
const selectors = createSelector(
  [getRoomList],
  (roomList) => {
    return {...roomList};
  }
)

export default connect(selectors)(RoomList);
