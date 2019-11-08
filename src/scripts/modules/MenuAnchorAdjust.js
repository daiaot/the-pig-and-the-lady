import { TweenMax, TimelineMax } from 'gsap'

export default class MenuAnchorAdjust {

  constructor(elem) {
    this.target = document.querySelectorAll('#lunch')[0]
    this.anchor = elem.querySelector('[data-module-adjust="lunch"]')
    this.link = elem.querySelectorAll('li a')
    this.bindEvents()
  }

  bindEvents() {

    const ua = navigator.userAgent

    for (let i = 0; i < this.link.length; i++) {
      this.link[i].addEventListener('click', () => {
        var path = this.link[i].getAttribute('href')
        if (path == '#lunch') {
          this.target.classList.add('is-adjust')

          // window.addEventListener('scroll', this.onScroll.bind(this))

          if (ua.match(/(iPhone|iPad|iPod|Android)/i)) {
            window.addEventListener('touchmove', this.onTouchMove.bind(this))
          } else {
            window.addEventListener('scroll', this.onScroll.bind(this))
          }
        } else {
          this.target.classList.remove('is-adjust')
        }
        return false
      })
    }
  }

  onScroll() {
    const pos = this.target.getBoundingClientRect().top
    // console.log('---- position')
    // console.log(pos)
    if (pos < 0) {
      this.target.classList.remove('is-adjust')
      return false
    }
  }

  onTouchMove() {
    const pos = this.target.getBoundingClientRect().top
    // console.log('---- position')
    // console.log(pos)
    // if (pos < -300 || pos > 4) {
    // if (pos < -100) {
    // if (pos > 160) {
    if (pos > 140) {
      this.target.classList.remove('is-adjust')
      return false
    }
  }


}