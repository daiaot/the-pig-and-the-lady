import $ from 'jquery'
import { TweenMax, TimelineMax } from 'gsap'

export default class MenuAnchorAdjust {

  constructor(elem) {
    this.target = document.querySelectorAll('#lunch')[0]
    this.anchor = elem.querySelector('[data-module-adjust="lunch"]')
    // console.log('---- target')
    console.log(this.target)
    this.bindEvents()
  }

  bindEvents() {
    // console.log('---- bindEvents()')
    this.anchor.addEventListener('click', () => {
            this.target.classList.add('is-adjust')
      // $('html, body').animate({ scrollTop: position }, speed, 'swing')
      return false
    })
  }


}
