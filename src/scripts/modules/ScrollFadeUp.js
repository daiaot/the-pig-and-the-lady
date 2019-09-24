import emit from '../emit'
import LottieAnimation from './LottieAnimation.js'

export default class ScrollFadeUp {
  constructor(elem, opts = '') {
    this.elem = elem
    this.opts = opts
    this.LottieAnimation = new LottieAnimation(this.elem)
    this.lottieState = false

    this.addEvents()
  }
  addEvents() {
    emit.ev.on('pageLoaded', () => {
      this.onLoad()
    })
    window.addEventListener('scroll', this.onScroll.bind(this))
  }

  onLoad() {
    const top = this.elem.getBoundingClientRect().top
    const wh = window.innerHeight
    if (top < (wh / 3) * 2) {
      this.elem.classList.add('is-active')
      if (!this.lottieState) {
        this.lottieState = true
        this.LottieAnimation.play()
      }
    }
  }

  onScroll() {
    const top = this.elem.getBoundingClientRect().top
    const wh = window.innerHeight
    if (top < (wh / 3) * 2) {
      this.elem.classList.add('is-active')
      if (!this.lottieState) {
        this.lottieState = true
        this.LottieAnimation.play()
      }
    }
  }
}
