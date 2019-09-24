import { TweenMax, TimelineMax, Linear } from 'gsap'
import LottieAnimation from './LottieAnimation.js'

export default class Splash {
  constructor(elem, opts) {
    this.elem = elem
    this.body = document.body
    TweenMax.set(this.body, { css: { overflow: 'hidden' } })
    this.splashMask = this.createMask(this.elem, '#f0f3f5')
    this.appendMask(this.splashMask, this.elem)
    this.loadingIcon = elem.querySelector(
      '[data-module-loading="loading-icon"]'
    )
    this.bg = elem.querySelector('[data-module-loading="bg"]')
    this.LottieAnimation = new LottieAnimation(this.elem)

    this.prepareAnimation()
    this.animate()
  }

  createMask(elem, maskColor) {
    const mask = document.createElement('div')
    mask.style.width = `${elem.clientWidth + 1}px`
    mask.style.height = `${elem.clientHeight + 1}px`
    mask.style.backgroundColor = maskColor
    mask.style.position = 'absolute'
    mask.style.top = '0px'
    mask.style.left = '0px'
    return mask
  }

  appendMask(mask, target) {
    // target.style.position = 'relative'
    target.style.overflow = 'hidden'
    target.appendChild(mask)
  }

  prepareAnimation() {
    TweenMax.set(this.splashMask, {
      opcity: 1,
      x: -this.splashMask.clientWidth,
      zIndex: 1,
    })
    TweenMax.set(this.loadingIcon, {
      zIndex: 2,
    })
  }

  slideInVideoMask() {
    return new Promise(resolve => {
      TweenMax.to(this.splashMask, 0.5, {
        delay: 1,
        onComplete: () => resolve(),
        x: 0,
      })
    })
  }

  slideOutVideoMask() {
    return new Promise(resolve => {
      TweenMax.to(this.splashMask, 0.6, {
        onComplete: () => {
          TweenMax.set(this.body, { css: { overflow: 'scroll' } })
          TweenMax.set(this.elem, { display: 'none' })
          // this.target.style.display = 'none'
          resolve()
        },
        x: this.splashMask.clientWidth,
        ease: Power1.easeInOut,
      })
    })
  }

  showVideo() {
    return new Promise(resolve => {
      TweenMax.set(this.video, {
        onComplete: () => resolve(),
        opacity: 1,
      })
    })
  }

  loading() {
    return new Promise(resolve => {
      const tl = new TimelineMax({
        onComplete: () => {
          TweenMax.to(this.bg, 0.01, {
            display: 'none',
          })
          resolve()
        },
      }).to(this.loadingIcon, 1.5, {
        opacity: 1,
      })
    })
  }

  loaded() {
    return new Promise(resolve => {
      TweenMax.to(this.loadingIcon, 0.1, {
        onComplete: () => {
          resolve()
        },
        opacity: 0,
      })
    })
  }

  loadVideo(src) {
    return new Promise((resolve, reject) => {
      this.video.src = src
      this.video.addEventListener('loadeddata', () => resolve())
    })
  }

  async animate() {
    await this.slideInVideoMask()
    await this.loading()
    await this.loaded()
    await this.slideOutVideoMask()
  }
}
