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
      var num = Math.floor(Math.random() * 5)
      // var date = new Date()
      // var d = Math.floor(date.getTime() / 1000 / 60 / 60 / 24 / )
      // console.log('---- date.getTime() : ' + date.getTime())
      // console.log('---- d : ' + d)
      // console.log('---- num : ' + num)
      var el = document.getElementsByClassName('p-kv__main')[0];
      // console.log(el)
      // if(num % 5 === 0) {
      //   console.log('1');
      //   el.setAttribute('id','kv01')
      // } else if(num % 5 === 1) {
      //   console.log('2');
      //   el.setAttribute('id','kv02')
      // } else if(num % 5 === 2) {
      //   console.log('3');
      //   el.setAttribute('id','kv03')
      // } else {
      //   console.log('4');
      //   el.setAttribute('id','kv04')
      // }
    }

    // let date = new Date()
    // let temp = date.getTime()
    // console.log('---- date.getTime() : ' + temp)
    // let uniqueNum = Math.floor(date.getTime() / 1000 / 60);
    // console.log('---- uniqueNum : ' + uniqueNum)
    // if(uniqueNum % 2 === 0) {
    //   console.log('--- even');
    //   this.elem.setAttribute('id','kv02')
    // } else {
    //   console.log('--- odd');
    //   this.elem.setAttribute('id','kv01')
    // }

  }

}