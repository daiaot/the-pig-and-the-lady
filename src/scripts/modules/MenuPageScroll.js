import $ from 'jquery'
import { stringify } from 'querystring'

export default class MenuPageScroll {
  constructor() {

    this.target = document.querySelectorAll('#takeout')[0]
    this.bindEvents()
  }

  bindEvents() {

  // console.log('---- MenuScroll bindEvents()')

    const speed = 500
    // let href = $(this).attr('href')
    var href = location.href

    // console.log('---- href')
    // console.log(href)

    // var urlArray = location.split('/');
    var urlArray = href.split('/');
    var path = urlArray[3]  // menu
    var id = urlArray[4]    // ?id=takeout
    // console.log('---- param.length')
    // console.log(urlArray[3])
    // console.log(urlArray[4])



    var urlParam = location.search.substring(1);
    // console.log('---- urlParam')
    // console.log(urlParam)
    if(urlParam) {

      // 「&」が含まれている場合は「&」で分割
      var param = urlParam.split('&');

      // パラメータを格納する用の配列を用意
      var paramArray = [];

      // 用意した配列にパラメータを格納
      console.log('---- param.length')
      console.log(param.length)

      for (var i = 0; i < param.length; i++) {
        var paramItem = param[i].split('=');
        paramArray[paramItem[0]] = paramItem[1];
        console.log('---- paramArray')
        console.log(paramArray[0])
      }
      // パラメータidがtakeoutかどうかを判断する
      if (paramArray.id == 'takeout') {
        const target = '#' + paramArray.id

        // console.log('---- target')
        // console.log(target)

        // target = $(href === '#' || href === '' ? 'html' : href)
        // const target = $(href === '#' || href === '' ? 'html' : href)

        // const position = target.offset().top
        const position = this.target.getBoundingClientRect().top
        // console.log('---- position')
        // console.log(position)
        // let position = urlParam.offset().top

        setTimeout(() => {
          $('html, body').animate({ scrollTop: position }, speed, 'swing')
        }, 1500);

        return false

      }
    }
    // const target = $(href === '#' || href === '' ? 'html' : href)
    // const position = target.offset().top
    // $('html, body').animate({ scrollTop: position }, speed, 'swing')
    // return false
  }

}
