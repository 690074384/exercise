import Backbone from 'backbone';

import {Home} from './home/Home';
import {Book} from './book/Book';
import {RoomDetail} from './roomDetail/RoomDetail';
import {MyBook} from './myBook/MyBook';
import {Footer} from './footer/Footer';
let $main = $('#main');
let currentView = null;
let footer = null;
let inited = false;
let Router = Backbone.Router.extend({

  routes: {
    "":       "home",  // #home
    "home":   "home",  // #home
    "book(/:sub)":   "book",  // #book
    "myBook(/:sub)":   "myBook",  // #book
    "roomDetail(/:sub)":   "roomDetail",  // #roomDetail
  },

  home: function() {
    this._switchView(Home);
  },
  book: function(sub) {
      this._switchView(Book, {sub: sub || ''});
  },
  myBook: function() {
      this._switchView(MyBook);
  },
  roomDetail: function(sub) {
      this._switchView(RoomDetail, {sub: sub || ''});
  },
  _switchView: function(View, param){
    currentView && currentView.remove && currentView.remove();
    if (footer==null){
      footer = new Footer();
    }
    $main.html('');
    let view = new View(param);
    $main.append(view.$el);
    currentView = view;
  }

});

let router =  new Router();
export {router};