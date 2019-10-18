export default class FixNavigation {
  constructor(elem, opts = '') {
    this.elem = elem
    this.opts = opts
    this.fixFlg = false
    this.isLower = elem.classList.contains('nav-bar-lower') ? true : false
    this.addEvents()
  }
  addEvents() {
    const ua_2 = navigator.userAgent
    if (!ua_2.match(/(iPhone|iPad|iPod|Android)/i)) {
      this.elem.classList.add('is-hidden')
    }
    window.addEventListener('scroll', this.onScroll.bind(this))
  }

  onScroll() {
    const top = this.elem.getBoundingClientRect().top
    const win_top = document.body.getBoundingClientRect().top
    const winTop = window.pageYOffset
    const relativeHeight = this.elem.getBoundingClientRect().height * -1
    const ua = navigator.userAgent
    // console.log(this.elem.getBoundingClientRect().top)
    // console.log(this.elem.getBoundingClientRect().win_top)
    // console.log(this.elem.getBoundingClientRect().height * -1)
    // console.log(window.pageYOffset)
    if (ua.match(/(iPhone|iPad|iPod|Android)/i)) {
      if (top < 0) {
        this.elem.children[0].classList.add('is-fixed')
      } else if (top > relativeHeight) {
        this.elem.children[0].classList.remove('is-fixed')
      }
    } else {

      if (this.isLower == false) {
        // if (top < -1200) {
        // if (winTop > 1080) {
        if (winTop > 620) {
          this.elem.classList.remove('is-hidden')
          this.elem.children[0].classList.add('is-fixed')
          // } else if (140 > relativeHeight) {
        } else {
          this.elem.classList.add('is-hidden')
          this.elem.children[0].classList.remove('is-fixed')
        }
      } else {
        // console.log('test')
        this.elem.classList.remove('is-hidden')
        this.elem.classList.add('is-fixed')
      }

    }
  }
}
