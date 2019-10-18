import { TweenMax, TimelineMax } from 'gsap'

export default class KeyVisual {
  constructor(elem) {

    // console.log('KeyVisual ---- constructor()')

    this.elem = elem
    this.body = document.body
    this.kv = this.elem.querySelectorAll('.p-kv__main_fig')
    //this.kv_image
    // this.init()
    this.bindEvents()
  }

  bindEvents() {

    // console.log('KeyVisual ---- bindEvents()')

    document.body.onload = function () {
      var num = Math.floor(Math.random() * 7 + 1)
      // var date = new Date()
      // var d = Math.floor(date.getTime() / 1000 / 60 / 60 / 24 / )
      // console.log('---- date.getTime() : ' + date.getTime())
      // console.log('---- d : ' + d)
      // console.log('---- num : ' + num)
      var el = document.getElementsByClassName('p-kv__main')[0];
      // console.log(el)
      // console.log('num -- ' + num)

      if (num % 4 === 0) {
        // console.log('4');
        el.setAttribute('id','kv04')
      } else if(num % 4 === 1) {
        // console.log('3');
        el.setAttribute('id','kv03')
      } else if(num % 4 === 2) {
        // console.log('2');
        el.setAttribute('id','kv02')
      } else {
        // console.log('1');
        el.setAttribute('id','kv01')
      }
    }

  }

}