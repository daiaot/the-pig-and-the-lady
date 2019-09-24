import emit from '../emit'
import Lottie from 'lottie-web'
import LottieAnimation from './LottieAnimation.js'
export default class ScrollImageWipe {
  constructor(elem, opts = '') {
    this.elem = elem
    this.opts = this.getOpts(opts)
    this.state = {
      animationStart: false,
      lottiePlay: false
    }
    this.LottieAnimation = new LottieAnimation(this.elem)
    this.addEvents()
  }

  getOffsetTop() {
    return this.elem.getBoundingClientRect().top + window.pageYOffset
  }

  getOpts(opts) {
    return {
      maskColor: '#ffffff',
      offset: window.innerHeight * 0.85,
      ...opts,
    }
  }

  addEvents() {
    emit.ev.on('pageLoaded', () => {
      this.onLoad()
    })
    emit.ev.on('pageLoaded', () => {
      this.onLoad()
    })
    window.addEventListener('scroll', this.onScroll.bind(this))
  }

  onLoad() {
    const offsetTop = this.getOffsetTop() - this.opts.offset
    const scrollBottom = window.pageYOffset + window.innerHeight

    if (!this.state.animationStart && scrollBottom > offsetTop) {
      this.animate()

    }
  }

  onScroll() {
    emit.ev.emit('pageLoaded', true)
  }

  animate() {
    // this.state.animationStart = true
    const top = this.elem.getBoundingClientRect().top
    const wh = window.innerHeight
    if (top < (wh / 3) * 2) {
      this.elem.classList.add('is-active')
      if (!this.state.lottiePlay) {
        this.state.lottiePlay = true
        setTimeout(() => {
          this.LottieAnimation.play()
        }, 1250);
      }
    }
  }
}
