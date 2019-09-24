import ScrollReveal from 'scrollreveal'
import { TweenMax, Power3, TimelineMax } from 'gsap'
import LottieAnimation from './LottieAnimation.js'

export default class Scrollreveal {
  constructor(elem, opts) {
    this.elem = elem
    this.opts = opts
    this.flg = false
    this.init()
  }

  init() {
    if (this.opts.type === 'fade_up') {
      TweenMax.set(this.elem, { y: 20, opacity: 0 })
      window.addEventListener('scroll', this.fadeInScroll.bind(this))
    }
    if (this.opts.type === 'splash') {
      this.LottieAnimation = new LottieAnimation(this.elem)
      window.addEventListener('scroll', this.lottieAnimScroll.bind(this))
    }
    // } else if (this.opts.type === 'logo') {
    //   window.addEventListener('scroll', this.logo.bind(this))
    // }
  }

  fadeInScroll() {
    const elemTopOffset = this.elem.getBoundingClientRect().top
    if (elemTopOffset < window.innerHeight * 0.8) {
      if (!this.flg) {
        this.flg = true
        TweenMax.to(this.elem, 0.5, { y: 0, opacity: 1, ease: Power3.easeOut })
      }
    }
  }
  lottieAnimScroll() {
    const elemTopOffset = this.elem.getBoundingClientRect().top
    if (elemTopOffset < window.innerHeight * 0.8) {
      if (!this.flg) {
        this.flg = true
        this.LottieAnimation.play()
      }
    }
  }

  // logo() {
  //   const TL = new TimelineMax({ paused: true })
  //   const cover01 = this.elem.querySelector('.logo_cover-1')
  //   const cover02 = this.elem.querySelector('.logo_cover-2')
  //   const cover03 = this.elem.querySelector('.logo_cover-3')

  //   TL.set(cover01, { className: '+=is-hidden' }, 0.4)
  //   TL.set(cover02, { className: '+=is-hidden' }, 0.4)
  //   TL.set(cover03, { className: '+=is-hidden' }, 1)

  //   const elemTopOffset = this.elem.getBoundingClientRect().top
  //   if (elemTopOffset < window.innerHeight * 0.8) {
  //     if (!this.flg) {
  //       TL.restart()
  //       this.flg = true
  //     }
  //   }
  // }
}
