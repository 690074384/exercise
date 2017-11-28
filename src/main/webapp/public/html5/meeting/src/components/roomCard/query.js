import React, { Component, PropTypes } from 'react';
import { Button, Toast, WhiteSpace, Flex, DatePicker, List, Picker } from 'antd-mobile';
import moment from 'moment';
const today = moment().format('YYYY-MM-DD');
const tomorrow = moment().add(1, 'd').format('YYYY-MM-DD');
const theDayAfterTomorrow = moment().add(2, 'd').format('YYYY-MM-DD');

const queryIcon = require('../../images/query@3x.png');
class Query extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          pageNo: 1,
          pageSize: 10,
          date: today, //日期
          isCustomDate: false, //是否是自定义日期
          startTime: '', //开始时间
          duration: '', //计划时长
          area: '',
          building: '', //楼号
          floor: '', //楼层选择
          minNum: '', //最小容纳人数
          maxNum: '', //最大容纳人数
          hasProjector: '', //是否有投影设备
          isCollapse: true, //是否是折叠状态
        }
        this.collapse = this.collapse.bind(this);
        this.createQuery = this.createQuery.bind(this);
        this.search = this.search.bind(this);
        this.onDurationChange = this.onDurationChange.bind(this);
        this.onFloorChange = this.onFloorChange.bind(this);
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
    }
    //计划时长校验
    onDurationChange(e){
        const duration = e.target.value.trim() - 0;
        //如果填了非数字的，那么duration为NaN
        //判断出错情况，非数字和负数，注意，可以为0，因为什么都不填就是0
        if(isNaN(duration) || duration < 0) {
            // 当出错时，什么都不做
        } else if(duration == 0){
            this.setState({duration: ''})
        } else {
            this.setState({duration})
        }
    }
    //楼层校验
    onFloorChange(e) {
        const floor = e.target.value.trim() - 0;
        //如果填了非数字的，那么duration为NaN
        //判断出错情况，非数字和负数，注意，可以为0，因为什么都不填就是0
        if(isNaN(floor) || floor < 0 || floor > 7) {
            // 当出错时，什么都不做
        } else if(floor == 0){
            this.setState({floor: ''})
        } else {
            this.setState({floor})
        }
    }
    //点击查询的事件
    search() {
        const { onSearch } = this.props;
        const { date, startTime, end, minNum, maxNum, hasProjector
                ,duration, area, building, floor, pageSize, pageNo } = this.state;
        let buildingValue = '';
        let areaValue = '';
        if(building) {
            buildingValue = building.split('-').pop();
            areaValue = building.split('-')[0];

        }
        const params = {
            date, startTime ,end, minNum, maxNum, hasProjector
            ,duration, area: areaValue, building:buildingValue, floor, pageSize, pageNo
        }
        if( onSearch && typeof onSearch == 'function') {
            Toast.loading('加载中...', 0, () => {});

            onSearch(params);
        }
        //查询后把查询条件折叠起来
        this.collapse(true)
    }
    //展开/收起查询条件
    collapse(isCollapse) {
        this.setState({isCollapse})
    }
    // 格式化数据
    formatArray = (arr = []) => {
        return arr.map(item => {
            return {label: `${item.area}-${item.building}`, value: `${item.area}-${item.building}`}
        })
    }
    createQuery() {
        const { date, isCustomDate, startTime, duration, building, floor
            ,minNum, maxNum, hasProjector, isCollapse } = this.state;
        const {areas} = this.props;
        if(!isCollapse) {
            //因为DatePicker推荐的子元素是List.Item
            //如果需要在DatePick中自定义子元素，那么要自定义一个子组件
            //只有这样，才不会出extra的warning
            //参考issue：https://github.com/ant-design/ant-design-mobile/issues/616
            const CustomDatePickerChildren = (props) => (
                <div onClick={props.onClick}>
                    {props.children}
                </div>
            );
            const startTimeData = [
              {value: '09:00', label: '09:00'},
              {value: '10:00', label: '10:00'},
              {value: '11:00', label: '11:00'},
              {value: '12:00', label: '12:00'},
              {value: '13:00', label: '13:00'},
              {value: '14:00', label: '14:00'},
              {value: '15:00', label: '15:00'},
              {value: '16:00', label: '16:00'},
              {value: '17:00', label: '17:00'},
              {value: '18:00', label: '18:00'},
              {value: '19:00', label: '19:00'},
              {value: '20:00', label: '20:00'},
              {value: '21:00', label: '21:00'},
            ];
            return (
                <div className="bsbb mb20">
                    <div className="query-box">
                        <WhiteSpace size="md" />
                        <span className='f30'>会议日期</span>
                        <WhiteSpace size="xs" />
                        <Flex wrap="wrap">
                            <div className={"sunl-radio" + ((date == today) && !isCustomDate ? ' sunl-radio-checked' : '')} onClick={() => {this.dateChoose(1)}}>今天</div>
                            <div className={"sunl-radio" + ((date == tomorrow) && !isCustomDate ? ' sunl-radio-checked' : '')} onClick={() => {this.dateChoose(2)}}>明天</div>
                            <div className={"sunl-radio" + ((date == theDayAfterTomorrow) && !isCustomDate ? ' sunl-radio-checked' : '')} onClick={() => {this.dateChoose(3)}}>后天</div>
                            <DatePicker mode="date" onChange={(v) => { this.dateChoose(0, v) }} minDate={moment()} maxDate={moment().add(6, 'd')}>
                                <CustomDatePickerChildren>
                                    <div className={"sunl-radio" + (isCustomDate ? ' sunl-radio-checked sunl-radio-customdate' : '')}>{ isCustomDate ? date : '自定义'}</div>
                                </CustomDatePickerChildren>
                            </DatePicker>
                        </Flex>
                        <WhiteSpace size="xs" />
                    </div>
                    <List.Item wrap>
                        <div className='fl query-item-label'>
                          <span className='f30 query-span'>开始时间</span>
                        </div>
                        <div className='fl' >

                            <Picker cols={1} data={startTimeData}
                              onChange={(v) => this.setState({ startTime: v[0] })}
                            >
                              <CustomDatePickerChildren><input value={startTime} className='query-item-input' readOnly={true}/></CustomDatePickerChildren>
                            </Picker>
                        </div>
                    </List.Item>
                    <List.Item wrap>
                        <div className='fl query-item-label'>
                            <span className='f30 query-span'>计划时长</span>
                        </div>
                        <div className='fl'>
                            <Picker cols={1} data={[{value: 1, label: 1},{value: 2, label: 2},{value: 3, label: 3},{value: 4, label: 4},{value: 5, label: 5},{value: 6, label: 6},{value: 7, label: 7}]}
                              onChange={(v) => this.setState({ duration: v[0] })}
                            >
                              <CustomDatePickerChildren><input value={duration} className='query-item-input' readOnly={true}/><span className="pl10 f30">小时</span></CustomDatePickerChildren>

                            </Picker>


                        </div>
                    </List.Item>
                    <List.Item wrap>
                        <WhiteSpace size="xs" />
                        <span className='f30' className='f30'>选择地点</span>
                        <WhiteSpace size="xs" />
                        <WhiteSpace size="xs" />
                        <Flex wrap="wrap">
                            <div className={"sunl-radio" + (building == '' ? ' sunl-radio-checked' : '')} onClick={() => {this.setState({building: ''})}}>不限</div>
                            {/*<div className={"sunl-radio-180" + (building == '4' ? ' sunl-radio-checked' : '')} onClick={() => {this.setState({building: '4'})}}>北京4号楼</div>
                                                        <div className={"sunl-radio-180" + (building == '6' ? ' sunl-radio-checked' : '')} onClick={() => {this.setState({building: '6'})}}>北京6号楼</div>
                                                        <div className="sunl-radio" style={{'visibility': 'hidden'}}></div>
                                                        <div className={"mt10 sunl-radio-180" + (building == '广州-A' ? ' sunl-radio-checked' : '')} onClick={() => {this.setState({building: '广州-A'})}}>广州A座</div>
                                                        <div className={"mt10 sunl-radio-180" + (building == '广州-B' ? ' sunl-radio-checked' : '')} onClick={() => {this.setState({building: '广州-B'})}}>广州B座</div>*/}

                            <Picker cols={1} data={this.formatArray(areas)}
                              onChange={(v) => this.setState({ building: v[0] })}
                            >
                              <CustomDatePickerChildren>
                                <input placeholder="选择地点(地区-楼名)" value={building} className='query-item-input' onChange={()=>{}}/>
                                <span className="pl10 f30">号楼</span>
                              </CustomDatePickerChildren>

                            </Picker>                            
                        </Flex>
                        <WhiteSpace size="xs" />
                    </List.Item>
                    <List.Item wrap>
                        <WhiteSpace size="xs" />
                        <span className='f30'>楼层选择</span>
                        <WhiteSpace size="xs" />
                        <WhiteSpace size="xs" />
                        <Flex wrap="wrap">
                            <div className={"sunl-radio" + (floor == '' ? ' sunl-radio-checked' : '')} onClick={() => {this.setState({floor: ''})}}>不限</div>

                            <Picker cols={1} data={[{value: 1, label: 1},{value: 2, label: 2},{value: 3, label: 3},{value: 4, label: 4},{value: 5, label: 5},{value: 6, label: 6},{value: 7, label: 7}]}
                              onChange={(v) => this.setState({ floor: v[0] })}
                            >
                              <CustomDatePickerChildren>
                                <input placeholder="选择楼层（1-7）" value={floor} className='query-item-input' onChange={this.onFloorChange} />
                                <span className="pl10 f30">层</span>
                              </CustomDatePickerChildren>

                            </Picker>
                        </Flex>
                        <WhiteSpace size="xs" />
                    </List.Item>
                    <List.Item wrap>
                        <WhiteSpace size="xs" />
                        <span className='f30'>容纳人数</span>
                        <WhiteSpace size="xs" />
                        <WhiteSpace size="xs" />
                        <Flex wrap="wrap">
                            <div className={"sunl-radio" + ((minNum == '' && maxNum == '') ? ' sunl-radio-checked' : '')} onClick={() => {this.setState({minNum: '', maxNum: ''})}}>不限</div>
                            <div className={"sunl-radio" + ((minNum == '' && maxNum == 8) ? ' sunl-radio-checked' : '')} onClick={() => {this.setState({minNum: '', maxNum: 8})}}>8人</div>
                            <div className={"sunl-radio" + ((minNum == 8 && maxNum == 15) ? ' sunl-radio-checked' : '')} onClick={() => {this.setState({minNum: 8, maxNum: 15})}}>8-15人</div>
                            <div className={"sunl-radio sunl-radio-customdate" + ((minNum == 15 && maxNum == '') ? ' sunl-radio-checked' : '')} onClick={() => {this.setState({minNum: 15, maxNum: ''})}}>15人以上</div>
                        </Flex>
                        <WhiteSpace size="xs" />
                    </List.Item>
                    <List.Item wrap>
                        <WhiteSpace size="xs" />
                        <span className='f30'>投影设备</span>
                        <WhiteSpace size="xs" />
                        <WhiteSpace size="xs" />
                        <Flex wrap="wrap">
                            <div className={"sunl-radio" + (hasProjector === '' ? ' sunl-radio-checked' : '')} onClick={() => {this.setState({hasProjector: ''})}}>不限</div>
                            <div className={"sunl-radio" + (hasProjector === 1 ? ' sunl-radio-checked' : '')} onClick={() => {this.setState({hasProjector: 1})}}>有</div>
                            <div className={"sunl-radio" + (hasProjector === 0 ? ' sunl-radio-checked' : '')} onClick={() => {this.setState({hasProjector: 0})}}>无</div>
                        </Flex>
                        <WhiteSpace size="md" />
                    </List.Item>
                    <div className="query-box" style={{paddingBottom:'20px'}}>

                        <div onClick={this.search} className="query-button">
                          <img src={queryIcon} className="mr20" style={{width: '0.5333rem', height: 'auto', verticalAlign: '-10%'}}/>查询会议室
                        </div>
                        <WhiteSpace size="md" />

                    </div>

                </div>
            )
        } else {
            return (
                <div className="bsbb psr" style={{paddingTop:'0.92rem', marginBottom: '0.26667rem'}}>
                    <Flex wrap>
                        <div className="query-banner" onClick={() => {this.collapse(false)}}></div>
                    </Flex>
                    <div className="query-box f30" style={{color: "#888"}} onClick={() => {this.collapse(false)}}>
                        <WhiteSpace size="md" />
                        <Flex wrap="wrap">
                            <Flex.Item>会议日期：{date}</Flex.Item>
                            <Flex.Item className="tar">开始时间：{
                                (() => {
                                    // if(startTime != 0 && duration != '') {
                                    //     return moment(startTime).format('HH:MM') + ' - ' + moment(startTime).add(duration, 'h').format('HH:MM')
                                    // } else {
                                    //     return '';
                                    // }
                                    if(startTime != '') {
                                        return startTime
                                    } else {
                                        return '不限';
                                    }
                                })()

                            }</Flex.Item>
                        </Flex>
                        <WhiteSpace size="xs" />
                        <Flex wrap="wrap">
                            <Flex.Item>选择地点：{building == '' ? '不限' : (building + '号楼')}</Flex.Item>
                            <Flex.Item className="tar">容纳人数：{
                                (() => {
                                    if(minNum == '' && maxNum == '') {
                                        return '不限';
                                    } else if(minNum !='' && maxNum == '') {
                                        return '15人以上';
                                    } else if(minNum == '' && maxNum != '') {
                                        return '8人';
                                    } else if(minNum != '' && maxNum != '') {
                                        return '8-15人';
                                    }
                                })()

                            }</Flex.Item>
                        </Flex>
                        <WhiteSpace size="xs" />
                        <Flex wrap="wrap">
                            <Flex.Item>投影设备：{hasProjector == '' ? '不限' : (hasProjector ? '有' : '无')}</Flex.Item>
                            <Flex.Item className="tar">楼层选择：{floor == '' ? '不限' : (floor + '层')}</Flex.Item>
                        </Flex>
                        <WhiteSpace size="md" />
                    </div>

                </div>
            )
        }
    }
    render() {
        return this.createQuery();
    }
}

export default Query;
