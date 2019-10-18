import $ from 'jquery'

export default class FixMenuNav {
  // constructor(elem, opts = '') {
  constructor(elem) {
    this.elem = elem
    // this.opts = opts
    this.title = document.querySelectorAll('h2')
    this.addEvents()
  }
  addEvents() {
    // window.addEventListener('scroll', this.onScroll.bind(this))
    window.addEventListener('scroll', this.onScroll.bind(this))
  }

  onScroll() {

    const scrollTop = $(window).scrollTop()
    // const offsetTop = this.elem.getBoundingClientRect().top
    const offsetTop = this.title[0].getBoundingClientRect().top
    const ua = navigator.userAgent

    if (scrollTop > offsetTop) {
      this.elem.classList.add('is-fixed')
    } else {
      this.elem.classList.remove('is-fixed')
    }

    // if (ua.match(/(iPhone|iPad|iPod|Android)/i)) {
    //   if (scrollTop > offsetTop) {
    //     this.elem.classList.add('is-fixed')
    //   } else {
    //     this.elem.classList.remove('is-fixed')
    //   }
    // } else {
    //   if (scrollTop > offsetTop) {
    //     this.elem.classList.add('is-fixed')
    //   } else {
    //     this.elem.classList.remove('is-fixed')
    //   }
    // }

  }

}
