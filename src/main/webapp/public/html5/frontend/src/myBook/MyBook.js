import '../lib/mobiscroll/mobiscroll';
import '../lib/mobiscroll/mobiscroll.css';
import { GET_MYROOM_INFO, DELETE_RESERVE } from '../constants/URLS';
import { getJSON } from '../common/dataService';
import { global } from '../common/global';
const template = require('./MyBook.html');

let Model = Backbone.Model.extend({
  defaults: {
  	params: {
      pageNo: 1,
      pageSize: 10
    },
    data: {
      "total": 0, //总记录数
      "pageNo": 1, //第几页
      "pageSize": 10, //总页数
      "rows": []
    }
  }
});

let MyBook = Backbone.View.extend({
	events: {
		'click #query': 'getMyRoomInfo',
		'click .delete': 'deleteRoom',

	},

  

	initialize(options) {
    this.options = options;
    this.model = new Model();
    this.listenTo(this.model, "change:data", this.renderList);
		this.render();
		setTimeout(()=>{
   		this.getMyRoomInfo();
    },100)
	},

	deleteRoom(e) {
		let reserveId = $(e.target).attr('reserveId');
		getJSON(DELETE_RESERVE, {reserveId: reserveId})
    .then(data => {
 			window.location.reload();
    })
    .catch( e => {
      alert(e);
    })
	},

	getMyRoomInfo(e) {
		if(!!e) {
			this.model.set('params', {
	      pageNo: 1,
	      pageSize: 10
	    });
	    $('.listContent').html('<ul id="myBookList"></ul>');
      this.model.set('data', {
	      "total": 0, //总记录数
	      "pageNo": 1, //第几页
	      "pageSize": 10, //总页数
	      "rows": []
	    });

		}
    let _this = this;
    $('.dropload-down').remove();
    // dropload
    $('.listContent').dropload({
        scrollArea : window,
        loadDownFn : function(me){
          let start = _this.$el.find('#start').val();
			    let end = _this.$el.find('#end').val();
			    let params = Object.assign(_this.model.get('params'), {start: start, end: end});
          getJSON(GET_MYROOM_INFO, {})
          .then(data => {

            _this.model.set('data', data);
            _this.model.set('params', {
              pageNo: data.pageNo+1,
              pageSize: data.pageSize
            });
            if(_this.model.get('params').pageSize > data.rows.length){
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
  },

  renderList() {
    let data = this.model.get('data').rows, date = this.model.get('date'), liStr = '';
    data.forEach( (item) => {
      liStr += `<li>
						<div class="item-warp pt10">
							<div class="item-head">
								会议室名称：${item.roomName}
								<ol class="fr fs14" style="text-align: right">
									<li>${item.reserveInfo.date}</li>
									<li>会议时间：${item.reserveInfo.start}-${item.reserveInfo.end}</li>
								</ol>
							</div>
							<div class="item-content mt10">
								<p>会议主题：${item.reserveInfo.title}</p>
								<p>会议备注：${item.reserveInfo.remark}</p>
							</div>
							<div class="item-foot">
								<span class="fs14">预定时间：${item.reserveInfo.reserveTime}</span>
								<a class="fr ghost-btn-1 delete" style="margin-top: 7px;" reserveId="${item.reserveInfo.reserveId}">撤销</a>
							</div>
						</div>
					</li>`;
    });
    this.$el.find('#myBookList').append(liStr);
  },

	render() {
		this.$el.html(template.render());
    let currYear = (new Date()).getFullYear();
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

export { MyBook };