;(function(window) {

var svgSprite = '<svg>' +
  ''+
    '<symbol id="icon-user" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M522.24 61.44c112.64 0 204.8 92.16 204.8 204.8s-92.16 204.8-204.8 204.8-204.8-92.16-204.8-204.8 92.16-204.8 204.8-204.8m0-51.2c-143.36 0-256 112.64-256 256s112.64 256 256 256 256-112.64 256-256-112.64-256-256-256z" fill="" ></path>'+
      ''+
      '<path d="M512 471.04v51.2c71.68 0 133.12 10.24 168.96 15.36 15.36 0 30.72 10.24 46.08 15.36 10.24 5.12 15.36 5.12 25.6 10.24 163.84 76.8 220.16 209.92 199.68 307.2-10.24 40.96-35.84 92.16-87.04 97.28H153.6c-46.08 0-71.68-46.08-81.92-87.04-20.48-97.28 30.72-235.52 204.8-317.44 71.68-25.6 148.48-35.84 235.52-35.84V471.04m0 0c-76.8 0-168.96 10.24-256 40.96-337.92 158.72-276.48 501.76-102.4 501.76h716.8c179.2-15.36 220.16-353.28-102.4-501.76-5.12 0-46.08-15.36-76.8-20.48-46.08-10.24-107.52-20.48-179.2-20.48z" fill="" ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-detail" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M186.181818 279.272727h651.636364v46.545455H186.181818zM186.181818 418.909091h651.636364v46.545454H186.181818zM186.181818 558.545455h651.636364v46.545454H186.181818zM186.181818 698.181818h651.636364v46.545455H186.181818z" fill="" ></path>'+
      ''+
      '<path d="M837.818182 46.545455c79.127273 0 139.636364 60.509091 139.636363 139.636363v651.636364c0 79.127273-60.509091 139.636364-139.636363 139.636363H186.181818c-79.127273 0-139.636364-60.509091-139.636363-139.636363V186.181818c0-79.127273 60.509091-139.636364 139.636363-139.636363h651.636364m0-46.545455H186.181818C83.781818 0 0 83.781818 0 186.181818v651.636364c0 102.4 83.781818 186.181818 186.181818 186.181818h651.636364c102.4 0 186.181818-83.781818 186.181818-186.181818V186.181818c0-102.4-83.781818-186.181818-186.181818-186.181818z" fill="" ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-order-manage" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M118.153846 236.307692h787.692308v39.384616H118.153846zM118.153846 472.615385h787.692308v39.384615H118.153846zM118.153846 708.923077h551.384616v39.384615H118.153846z" fill="" ></path>'+
      ''+
      '<path d="M866.461538 0H157.538462C70.892308 0 0 70.892308 0 157.538462v708.923076c0 86.646154 70.892308 157.538462 157.538462 157.538462h708.923076c86.646154 0 157.538462-70.892308 157.538462-157.538462V157.538462c0-86.646154-70.892308-157.538462-157.538462-157.538462z m-39.384615 748.307692c-43.323077 0-78.769231 35.446154-78.769231 78.769231v157.538462H157.538462c-66.953846 0-118.153846-51.2-118.153847-118.153847V157.538462c0-66.953846 51.2-118.153846 118.153847-118.153847h708.923076c66.953846 0 118.153846 51.2 118.153847 118.153847v590.76923h-157.538462z" fill="" ></path>'+
      ''+
    '</symbol>'+
  ''+
'</svg>'
var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
var shouldInjectCss = script.getAttribute("data-injectcss")

/**
 * document ready
 */
var ready = function(fn){
  if(document.addEventListener){
      document.addEventListener("DOMContentLoaded",function(){
          document.removeEventListener("DOMContentLoaded",arguments.callee,false)
          fn()
      },false)
  }else if(document.attachEvent){
     IEContentLoaded (window, fn)
  }

  function IEContentLoaded (w, fn) {
      var d = w.document, done = false,
      // only fire once
      init = function () {
          if (!done) {
              done = true
              fn()
          }
      }
      // polling for no errors
      ;(function () {
          try {
              // throws errors until after ondocumentready
              d.documentElement.doScroll('left')
          } catch (e) {
              setTimeout(arguments.callee, 50)
              return
          }
          // no errors, fire

          init()
      })()
      // trying to always fire before onload
      d.onreadystatechange = function() {
          if (d.readyState == 'complete') {
              d.onreadystatechange = null
              init()
          }
      }
  }
}

/**
 * Insert el before target
 *
 * @param {Element} el
 * @param {Element} target
 */

var before = function (el, target) {
  target.parentNode.insertBefore(el, target)
}

/**
 * Prepend el to target
 *
 * @param {Element} el
 * @param {Element} target
 */

var prepend = function (el, target) {
  if (target.firstChild) {
    before(el, target.firstChild)
  } else {
    target.appendChild(el)
  }
}

function appendSvg(){
  var div,svg

  div = document.createElement('div')
  div.innerHTML = svgSprite
  svg = div.getElementsByTagName('svg')[0]
  if (svg) {
    svg.setAttribute('aria-hidden', 'true')
    svg.style.position = 'absolute'
    svg.style.width = 0
    svg.style.height = 0
    svg.style.overflow = 'hidden'
    prepend(svg,document.body)
  }
}

if(shouldInjectCss && !window.__iconfont__svg__cssinject__){
  window.__iconfont__svg__cssinject__ = true
  try{
    document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
  }catch(e){
    console && console.log(e)
  }
}

ready(appendSvg)


})(window)
