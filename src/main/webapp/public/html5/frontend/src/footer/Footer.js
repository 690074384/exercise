const template = require('./Footer.html');

let Model = Backbone.Model.extend({
  defaults: {
  }
});

let Footer = Backbone.View.extend({

  el: "#footer",
  events: {
  },

  initialize(options = {}) {
    this.model = new Model();
    this.render();
    if(location.hash=='#home') {
      $('#footer').find('li[name=home]').addClass('current-page');
    } else if(location.hash=='#myBook') {
      $('#footer').find('li[name=myBook]').addClass('current-page');
    }
    $('#footer').on('click', 'li', function() {
      const $this = $(this);
      if(!$this.hasClass('current-page')) {
        $this.addClass('current-page');
        $this.siblings().removeClass('current-page');
      }
    });
    $('body').on('focus', 'input[type=text],input[type=num]', function() {
      $('#footer').hide();
    });
    $('body').on('blur', 'input[type=text],input[type=num]', function() {
      $('#footer').show();
    });
  },

  render() {
    this.$el.html(template.render());
  }

});

export { Footer };
