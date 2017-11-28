import '../lib/mobiscroll/mobiscroll';
import '../lib/mobiscroll/mobiscroll.css';
import { RESERVE_ROOM, ROOM_RESERVE_INFO, GRAB_MEETING_ROOM } from '../constants/URLS';
import { getJSON } from '../common/dataService';
import { global } from '../common/global';

const template = require('./Book.html');

let Model = Backbone.Model.extend({
  defaults: {
    data: {
      dataList: []
    }
  }
});

let Book = Backbone.View.extend({
	events: {
    'click #book': 'bookRoom',
    'click #grabMeetingRoom': 'grabMeetingRoom',
		'click #startMin, #endMin': 'roomMinuteInfo',
    'click .item-grid': 'handleGridClick',
    'blur #title': 'enableBtn',
    'change #date': 'renderTimeGird',

	},

	initialize(options) {
    this.options = options;
    this.model = new Model();
    this.model.set('options', options);
		this.render();
    // setTimeout(() => {
    //   this.roomHourInfo();
    // }, 50);
    this.renderTimeGird();

	},
  enableBtn() {
    let title = this.$el.find('#title').val();
    let hasCheckGrid = $('.timeGrid').find('.item-grid-checked').length > 0;
    if($.trim(title) != '' && hasCheckGrid) {
      $('#book').addClass('btn-active');
    } else {
      $('#book').removeClass('btn-active');
    }
    if($.trim(title) != '' ) {
      $('#grabMeetingRoom').addClass('btn-active');
    } else {
      $('#grabMeetingRoom').removeClass('btn-active');
    }
  },
  renderTimeGird() {
    let timeStr = '';
    let roomId = this.$el.find('#id').val();
    let date = this.$el.find('#date').val();
    getJSON(ROOM_RESERVE_INFO, {
      roomId: roomId,
      date: date
    })
    .then(data => {
      this.model.set('data', data);
      for (let i = 0; i < data.dataList.length; i++) {
        let isUsed = data.dataList[i].used == '1'?'item-grid-used':'';
        let revSubject = data.dataList[i].reserveInfo ? data.dataList[i].reserveInfo.revSubject: 'null';
        let revUserName = data.dataList[i].revUserName ? data.dataList[i].reserveInfo.revUserName: 'null';
        let revUserPhone = data.dataList[i].revUserPhone ? data.dataList[i].reserveInfo.revUserPhone: 'null';
        timeStr += `<div class="item-grid ${isUsed}" data-index="${i}"
                    data-begin="${data.dataList[i].beginTime}"
                    data-end="${data.dataList[i].endTime}"
                    data-revSubject="${revSubject}"
                    data-revUserName="${revUserName}"
                    data-revUserPhone="${revUserPhone}"
                    >
                      <div class="hold-padding"></div>
                      <div class="item-content"></div>
                    </div>`
      }
      this.$el.find('.timeGrid li').html(timeStr);
    })
    .catch( e => alert(e));

  },
  handleGridClick(e) {
    let $parent = $(e.target).parent();
    let startCheckedGird = $('.timeGrid').find('.item-grid-checked').first().attr('data-index');
    let endCheckedGird = $parent.attr('data-index');
    if($parent.hasClass('item-grid-used')){
      let revUserName = $parent.attr('data-revUserName'),
          revSubject = $parent.attr('data-revSubject'),
          revUserPhone = $parent.attr('data-revUserPhone');
      swal('预订人：'+revUserName+'，手机：'+revUserPhone+'，会议主题：'+revSubject);
      return;
    }
    if($('.timeGrid').find('.item-grid-checked').length==0){
      if(!$parent.hasClass('item-grid-used')) {
        $parent.addClass('item-grid-checked');
      }
    } else if ($('.timeGrid').find('.item-grid-checked').length==1&&startCheckedGird == endCheckedGird) {
      $parent.removeClass('item-grid-checked');
    } else {
      $('.timeGrid').find('.item-grid').each(function(index){
        if(index<=endCheckedGird&&index>=startCheckedGird&&!$(this).hasClass('item-grid-used')) {
          $(this).addClass('item-grid-checked');
        } else {
          $(this).removeClass('item-grid-checked');
        }
      });
    }
    this.enableBtn();
  },

	grabMeetingRoom() {
    let roomId = this.$el.find('#id').val();
    let title = this.$el.find('#title').val();
    let remark = this.$el.find('#remark').val();
    if($.trim(title) == '') {
      swal('会议主题不能为空');
      return;
    }
    let curTime = new Date().getTime();
    let date = this.$el.find('#date').val();
    let dataList = this.model.get('data').dataList;
    let grabFlag = false;
    dataList.forEach((item, index) => {
      let beginTime = new Date(date.replace(/-/g,'/')+ ' '+item.beginTime+':00').getTime(),
          endTime = new Date(date.replace(/-/g,'/')+ ' '+item.endTime+':00').getTime();
      if(curTime>=beginTime && curTime<endTime && $('.timeGrid li').find('div[data-index='+index+']').hasClass('item-grid-used')){
        grabFlag = true;
        swal({
          title: "确定要抢会议室吗?",
          text: "抢会议室需要拍照留证，请拍下该会议室空闲的照片",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          closeOnConfirm: false
        },
        function(){
          let params = {
            roomId: roomId,
            title: title,
            remark: remark,
          };
          getJSON(GRAB_MEETING_ROOM, params)
          .then(data => {
            location.hash = '#myBook';
          })
          .catch( e => swal(e))
        });
        return;
      }
    });
    if(!grabFlag) {
      swal('当前时间会议室空闲，无需抢会议室');
      return;
    }

  },
  bookRoom() {

    let id = this.$el.find('#id').val();
    let start = $('.timeGrid').find('.item-grid-checked').first().attr('data-begin')+':00';
    let end = $('.timeGrid').find('.item-grid-checked').last().attr('data-end')+':00';
    // let start = this.$el.find('#startHour').val()+':'+this.$el.find('#startMin').val()+':00';
    // let end = this.$el.find('#endHour').val()+':'+this.$el.find('#endMin').val()+':00';
    let date = this.$el.find('#date').val();
    let title = this.$el.find('#title').val();
    let remark = this.$el.find('#remark').val();
    if($.trim(title) == '') {
      swal('会议主题不能为空');
      return;
    }
    if($('.timeGrid').find('.item-grid-checked').length == 0) {
      swal('请选择预定时间');
      return;
    }
    let params = {
      id: id,
      start: start,
      end: end,
      date: date,
      title: title,
      remark: remark,
    };
    getJSON(RESERVE_ROOM, params)
    .then(data => {
      location.hash = '#myBook';
    })
    .catch( e => alert(e))
  },
	render() {
		this.$el.html(template.render());
    let [id, roomName, date] = this.model.get('options').sub.split('*');

    let currYear = (new Date()).getFullYear();
    let currMonth = (new Date()).getMonth()+1;
    let currDay = (new Date()).getDate();

    this.$el.find('#id').val(id);
    this.$el.find('#roomName').html(roomName);
    this.$el.find('#date').val(date||(currYear+'-'+currMonth+'-'+currDay));

    let opt={};
    opt.date = {preset : 'date'};
    opt.datetime = {preset : 'datetime'};
    opt.time = {preset : 'time'};
    opt.default = {
      theme: 'android-ics light', //皮肤样式
      display: 'modal', //显示方式
      mode: 'scroller', //日期选择模式
      dateFormat: 'yyyy-mm-dd',
      lang: 'zh',
      showNow: true,
      nowText: "今天",
      startYear: currYear , //开始年份
      endYear: currYear + 30 //结束年份
    };

    this.$el.find(".date_input").mobiscroll($.extend(opt['date'], opt['default']));

	}

});

export { Book };
