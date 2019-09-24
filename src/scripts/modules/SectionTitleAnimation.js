import { TweenMax, Linear } from 'gsap'
import emit from '../emit'

export default class SectionTitleAnimation {
  constructor(elem, opts) {
    this.elem = elem
    this.chars = Array.prototype.slice.call(elem.querySelectorAll('.character'));
    this.opts = this.getOpts(opts)
    this.state = {
      animationStart: false,
    }
    this.addEvents()
  }

  getOpts(opts) {
    return {
      maskColor: '#ffffff',
      offset: window.innerHeight * 0.85,
      ...opts,
    }
  }

  addEvents() {
    emit.ev.once('pageLoaded', () => {
      this.onLoad()
    })
    window.addEventListener('scroll', this.onScroll.bind(this))
  }

  onLoad() {
    const offsetTop = this.getOffsetTop()
    const scrollBottom = window.pageYOffset + window.innerHeight

    if (!this.state.animationStart && scrollBottom > offsetTop) {
      this.animate()
    }
  }

  onScroll() {
    const scrollTop = window.pageYOffset
    const offsetTop = this.getOffsetTop() - this.opts.offset
    if (!this.state.animationStart && scrollTop > offsetTop) {
      this.animate()
    }
  }

  getOffsetTop() {
    return this.elem.getBoundingClientRect().top + window.pageYOffset
  }

  animate() {
    this.state.animationStart = true
    this.chars.forEach((element, i) => {
      TweenMax.fromTo(
        element,
        0.6 + i * i * 0.01,
        {
          y: 40 * Math.random(),
        },
        {
          ease: Expo.easeOut,
          opacity: 1,
          y: 0,
          delay: i * i * 0.01,
        }
      )
    })
  }
}
