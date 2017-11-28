import '../lib/mobiscroll/mobiscroll';
import '../lib/mobiscroll/mobiscroll.css';
import '../lib/dropload/dropload';
import '../lib/dropload/dropload.css';
import { GET_ALLROOM_INFO } from '../constants/URLS';
import { getJSON } from '../common/dataService';
import { global } from '../common/global';
const template = require('./Home.html');
let Model = Backbone.Model.extend({
  defaults: {
    date: '',
    params: {
      pageNo: 1,
      pageSize: 10
    },
    data: {
      "dataList": {
          rows: [],
          "total": 0, //总记录数
          "pageNo": 1, //第几页
          "pageSize": 10, //总页数
        }
    }
  }
});

let Home = Backbone.View.extend({
	events: {
    'click #query': 'getAllRoomInfo',
    'click .ant-radio-group': 'handleRadioChange',

		'click a[name=bookMeetingRoom]': 'bookMeetingRoom'
	},

	initialize(options) {
    this.options = options;
    this.model = new Model();
    this.listenTo(this.model, "change:data", this.renderList);

    this.render();
    setTimeout(()=>{
    this.getAllRoomInfo();

    },100)

	},
  handleRadioChange(e) {
    if(e.target.nodeName=='SPAN'||e.target.nodeName=='LABEL'){
      return;
    }
    let $parent = $(e.target).parent().parent();
    if (!$parent.hasClass('ant-radio-button-wrapper-checked')) {
      $parent.addClass('ant-radio-button-wrapper-checked');
      $parent.siblings().removeClass('ant-radio-button-wrapper-checked');
    } else {
      $parent.removeClass('ant-radio-button-wrapper-checked');
    }

  },
	getAllRoomInfo(e) {
    if(!!e) {
      this.model.set('params', {
        pageNo: 1,
        pageSize: 10
      });
      $('.listContent').html('<ul id="dataList"></ul>');
      this.model.set('data', {
        "match": 0,
        "dataList": {
          rows: [],
          "total": 0, //总记录数
          "pageNo": 1, //第几页
          "pageSize": 10, //总页数
        }
      });

    }
    let _this = this;
    // dropload
    $('.listContent').dropload({
        scrollArea : window,
        loadDownFn : function(me){
          let date = _this.$el.find('#date').val();
          let start = _this.$el.find('#start').val();
          let end = _this.$el.find('#end').val();
          let num = _this.$el.find('#num .ant-radio-button-wrapper-checked input[name=num]').val();
          let minNum = !!num?num.split('-')[0]:1;
          let maxNum = !!num?num.split('-')[1]:100;
          let hasProjector = _this.$el.find('#hasProjector .ant-radio-button-wrapper-checked input[name=hasProjector]').val();
          _this.model.set('date', date);
          let pageNo = _this.model.get('params').pageNo;
          let pageSize = _this.model.get('params').pageSize;
          let params = Object.assign(_this.model.get('params'), {date, start, end, minNum, maxNum, hasProjector});
          getJSON(GET_ALLROOM_INFO, params)
          .then(data => {
            _this.model.set('data', data);
            _this.model.set('params', {
              pageNo: data.dataList.pageNo+1,
              pageSize: data.dataList.pageSize
            });
            if(pageSize > data.dataList.rows.length){
              // 锁定
              me.lock();
              // 无数据
              me.noData();
            }
            me.resetload();
          })
          .catch( e => {
            me.lock();
            me.noData();
            alert(e);
          })
        }
    });
    if(_this.model.get('data').dataList.match == 2) {
      swal('没有符合条件的会议室，以下是推荐会议室列表');
    }
  },

  bookMeetingRoom(e) {
    e.stopPropagation();
  },

  renderList() {
    let data = this.model.get('data').dataList, date = this.model.get('date'), liStr = '';
    data.rows.forEach( (item) => {
      let projectorStr = '';
      if((item.projector+'')=='1') {
        projectorStr = '有投影仪';
      } else {
        projectorStr = '没有投影仪';
      }
      let hashInfo = item.id+'*'+item.roomName+'*'+date;
      let revseredList = item.revseredList;
      let gridStr = '';

      for(let i = 0; i<revseredList.length; i++) {
        let isUsed = revseredList[i].used == '1'?'item-grid-used':''
        if(i%2==0){
          gridStr += `
            <div class="item-grid ${isUsed}">
              ${i+9-i/2}
            </div>
          `;
        } else {
          gridStr += `
            <div class="item-grid ${isUsed}">

            </div>
          `;
        }

      }
      liStr += `<li >
                  <a href="#roomDetail/${item.id}">
                  <div class="item-warp pt10">
                    <div class="item-head">
                      会议室名称：${item.roomName}
                      <ol class="fr fs14" style="text-align: right">
                        <li>可容纳${item.capacity}人</li>
                        <li>${projectorStr}</li>
                      </ol>
                    </div>
                    <div class="item-content mt10">
                      <p style="height: 40px;">
                        <span class="red-grid"></span>已预订
                        <span class="green-grid ml10"></span>未预订
                        </p>
                      <ul class="smallTimeGrid mb10">
                        <li>
                         ${gridStr}
                        </li>
                      </ul>
                    </div>
                    <div class="item-foot">
                      <a href="#book/${hashInfo}" class="fr ghost-btn-1" name="bookMeetingRoom" style="margin-top: 5px;">预订</a>
                    </div>
                  </div>
                  </a>
                </li>`;
    });
    this.$el.find('#dataList').append(liStr);
  },
	render() {
		this.$el.html(template.render());
    let currDate = new Date();
    let currYear = currDate.getFullYear();
    let currMonth = currDate.getMonth()+1;
    let currDay = currDate.getDate();
    let hh = currDate.getHours(); //截取小时
    let mm = currDate.getMinutes(); //截取分钟
    mm = mm<10?('0'+mm):mm;
    if(mm <= 30){
      mm = '30';
    } else {
      mm = '00';
      hh = parseInt(hh)+1;
    }
    hh = hh<10?('0'+hh):hh;
    this.$el.find('#date').val(currYear+'-'+currMonth+'-'+currDay);
    this.$el.find('#start').val(hh+':'+mm);

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
      nowText: "现在",
      stepMinute: 30,
      startYear: currYear , //开始年份
      endYear: currYear + 30 //结束年份
    };

    this.$el.find("#date").mobiscroll($.extend(opt['date'], opt['default']));
    this.$el.find("#start, #end").mobiscroll($.extend(opt['time'], opt['default']));

	}

});

export { Home };
