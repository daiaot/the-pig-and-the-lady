import { TweenMax, TimelineMax } from 'gsap'

export default class Splash {
  constructor(elem) {
    this.elem = elem
    this.body = document.body
    this.isSplash = elem.classList.contains('p-splash') ? true : false
    this.bg = elem.querySelector('[data-module-loading="bg"]')
    this.heightAdjust()
    this.bindEvents()
  }

  heightAdjust() {
    let target = document.getElementsByClassName('p-splash')
    if (
      this.isSplash === true &&
      window.devicePixelRatio === 3 &&
      (window.screen.width === 375 || window.screen.height === 375) &&
      /iPhone/.test(window.navigator.userAgent)
    ) {
      target[0].style.height = 'calc(100vh - 110px)'
    } else if (
      this.isSplash === true &&
      navigator.userAgent.match(/(iPhone|iPod)/i)
    ) {
      target[0].style.height = 'calc(100vh - 75px)'
    } else if (
      this.isSplash === true &&
      navigator.userAgent.match(/(Android)/i)
    ) {
      target[0].style.height = 'calc(100vh - 45px)'
    }
  }

  bindEvents() {
    this.animate()
  }

  locationHref() {
    location.href = this.href
  }

  prepareSlideOutAnimation() {
    return new Promise(resolve => {
      TweenMax.set(this.elem, { display: 'block' })
      TweenMax.set(this.body, { css: { overflow: 'hidden' } })
      resolve()
    })
  }

  topSplash() {
    return new Promise(() => {
      TweenMax.set(this.bg, {
        opacity: 1,
        zIndex: 110,
      })
      TweenMax.to(this.bg, 3.0, {
        ease: Expo.easeInOut,
        // ease: Expo.easeOut,
        // ease: Expo.easeIn,
        opacity: 0,
        zIndex: 0,
      })
    })
  }
  async animate() {
    // const ua = navigator.userAgent
    // if (ua.match(/(iPhone|iPad|iPod|Android)/i)) {
    // } else {
    // }
    this.topSplash()
    // await TweenMax.set(this.body, { css: { overflow: 'scroll' } })
    // await TweenMax.set(this.body, { css: { overflowX: 'hidden' } })
    // await TweenMax.set(this.body, { css: { width: '100vw' } })

    // await TweenMax.set(this.body, { css: { overflow: '' } })
    // await TweenMax.set(this.body, { css: { posison: '' } })
    // await TweenMax.set(this.body, { css: { top: '' } })
  }
}
