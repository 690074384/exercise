import { GET_ROOM_DETAIL, ROOM_RESERVE_INFO } from '../constants/URLS';
import { getJSON } from '../common/dataService';
import { global } from '../common/global';
const template = require('./RoomDetail.html');

let Model = Backbone.Model.extend({
  defaults: {
    roomDetailInfo: {},
    reserveInfo: {}
  }
});

let RoomDetail = Backbone.View.extend({
	events: {
		'click #goToBook': 'goToBook',
    'change #date': 'renderTimeGird',

	},

	initialize(options) {
    this.options = options;
    this.model = new Model();
    this.listenTo(this.model, "change:roomDetailInfo", this.render);
		this.render();
    this.getRoomDetail();
    $(document).on('change', '#date', ()=>{
      this.renderTimeGird();
    });
	},
  goToBook() {
    let id = this.options.sub;
    let roomName = this.model.get('roomDetailInfo').roomName;
    let date = this.$el.find('#date').val();
    window.location.hash = '#book/'+id+'*'+roomName+'*'+date;
  },
  renderTimeGird() {
    let timeStr = '';
    let roomId = this.options.sub;
    let date = this.$el.find('#date').val();
    getJSON(ROOM_RESERVE_INFO, {
      roomId: roomId,
      date: date
    })
    .then(data => {
      for (let i = 0; i < data.dataList.length; i++) {
        let isUsed = data.dataList[i].used == '1'?'item-grid-used':''
        timeStr += `<div class="item-grid ${isUsed}" data-index="${i}" data-begin="${data.dataList[i].beginTime}" data-end="${data.dataList[i].endTime}">
                      <div class="hold-padding"></div>
                      <div class="item-content"></div>
                    </div>`
      }
      this.$el.find('.timeGrid li').html(timeStr);
    })
    .catch( e => alert(e));
    
  },
  //获取会议室详细情况信息
	getRoomDetail() {
    let id = this.options.sub;
    
    getJSON(GET_ROOM_DETAIL, {id: id})
    .then(data => {
      let hasProjectorStr = '没有';
      if (data.hasProjector+'' == '1') {
        hasProjectorStr = '有';
      }
      this.model.set('roomDetailInfo', Object.assign(data, {hasProjectorStr: hasProjectorStr}));
      this.renderTimeGird();
    })
    .catch( e => alert(e))
  },
   
	render() {
		this.$el.html(template.render(this.model.get('roomDetailInfo')));
    let currYear = (new Date()).getFullYear();
    let currMonth = (new Date()).getMonth()+1;
    let currDay = (new Date()).getDate();
    this.$el.find('#date').val(currYear+'-'+currMonth+'-'+currDay);

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

export { RoomDetail };