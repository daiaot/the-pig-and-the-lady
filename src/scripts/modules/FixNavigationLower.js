export default class FixNavigationLower {
  constructor(elem, opts = '') {
    this.elem = elem
    this.opts = opts
    this.fixFlg = false
    this.addEvents()
  }
  addEvents() {
    this.elem.children[0].classList.add('is-fixed')
    // window.addEventListener('scroll', this.onScroll.bind(this))
  }

  onScroll() {
    const top = this.elem.getBoundingClientRect().top
    const relativeHeight = this.elem.getBoundingClientRect().height * -1
    if (top < 0) {
      this.elem.children[0].classList.add('is-fixed')
    } else if (top > relativeHeight) {
      this.elem.children[0].classList.remove('is-fixed')
    }
  }

}
