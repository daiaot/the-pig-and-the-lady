import { TweenMax, TimelineMax } from 'gsap'

export default class Splash {
  constructor(elem) {
    this.elem = elem
    this.body = document.body
    this.isSplash = elem.classList.contains('p-splash') ? true : false
    this.bg = elem.querySelector('[data-module-loading="bg"]')
    this.msg = elem.querySelectorAll('.p-loading__msg')
    // console.log('---- this.msg')
    // console.log(this.msg)
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
      // TweenMax.set(this.body, { css: { overflow: 'hidden' } })
      // TweenMax.set(this.body, { css: { posison: 'fixde' } })
      // TweenMax.set(this.body, { css: { top: '0px' } })

      TweenMax.set(this.msg, 2.0, {
        ease: Expo.easeInOut,
        opacity: 1,
      })

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

      // TweenMax.set(this.msg, {
      //   opacity: 0,
      // })
      // TweenMax.to(this.msg, 2.0, {
      //   ease: Expo.easeInOut,
      //   opacity: 1,
      // })
    })
  }

  // async transitionStart() {
  //   await this.prepareSlideOutAnimation()
  //   await this.slideInVideoMask()
  //   await this.locationHref()
  //   // await this.topSplash()
  // }

  async animate() {
    // const ua = navigator.userAgent
    // if (ua.match(/(iPhone|iPad|iPod|Android)/i)) {
    // } else {
    // }

    // await TweenMax.to(this.bg, 0.01, { display: 'none' })
    // await TweenMax.to(this.bg, 0.8, { display: 'none' })

    // TweenMax.set(this.body, {
    //   overflow: 'hidden',
    //   position: 'fixed',
    //   top: '0px',
    // })
    // await this.topSplash()
    await this.topSplash()

    TweenMax.set(this.body, {
      overflow: '',
      position: '',
      top: '',
    })

    // await TweenMax.set(this.body, { css: { overflow: 'scroll' } })

    // await TweenMax.set(this.body, { css: { overflowX: 'hidden' } })
    // await TweenMax.set(this.body, { css: { width: '100vw' } })

    // await TweenMax.set(this.body, { css: { overflow: '' } })
    // await TweenMax.set(this.body, { css: { posison: '' } })
    // await TweenMax.set(this.body, { css: { top: '' } })

    // await TweenMax.set(this.kvImage, { css: { opacity: '1' } })
    // await this.slideOutVideoMask()
    // await emit.ev.emit('pageLoaded', true)
    // await this.slideInNavigation()
    // await this.fadeInNavLinks()
  }
}
