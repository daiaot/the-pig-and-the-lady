import { TweenMax, TimelineMax } from 'gsap'

export default class Splash {
  constructor(elem) {
    this.elem = elem
    this.body = document.body
    this.isSplash = elem.classList.contains('p-splash') ? true : false
    this.bg = elem.querySelector('[data-module-loading="bg"]')
    this.msg = elem.querySelectorAll('.p-loading__msg')
    // console.log('--- this.msg')
    // console.log(this.msg)

    // this.heightAdjust()
    this.bindEvents()
  }

  // heightAdjust() {
  //   let target = document.getElementsByClassName('p-splash')
  //   if (
  //     this.isSplash === true &&
  //     window.devicePixelRatio === 3 &&
  //     (window.screen.width === 375 || window.screen.height === 375) &&
  //     /iPhone/.test(window.navigator.userAgent)
  //   ) {
  //     target[0].style.height = 'calc(100vh - 110px)'
  //   } else if (
  //     this.isSplash === true &&
  //     navigator.userAgent.match(/(iPhone|iPod)/i)
  //   ) {
  //     target[0].style.height = 'calc(100vh - 75px)'
  //   } else if (
  //     this.isSplash === true &&
  //     navigator.userAgent.match(/(Android)/i)
  //   ) {
  //     target[0].style.height = 'calc(100vh - 45px)'
  //   }
  // }

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
        ease: Expo.easeInOut,
        opacity: 1,
        zIndex: 110,
      })
      TweenMax.to(this.bg, 8.0, {
        ease: Expo.easeInOut,
        // ease: Expo.easeOut,
        // ease: Expo.easeIn,
        opacity: 0,
        zIndex: 0,
      })
    })
  }

  topSplashLogo() {
    return new Promise(() => {

      TweenMax.fromTo(this.msg, 2.0, {
        opacity: 0,
        zIndex: 110
      },
      {
        ease: Expo.easeInOut,
        zIndex: 0,
        opacity: 1
      })
      // TweenMax.set(this.msg, 5, {
      //   opacity: 1,
      //   zIndex: 110,
      // })
      // TweenMax.to(this.msg, 8.0, {
      //   ease: Expo.easeInOut,
      //   opacity: 0,
      //   zIndex: 0,
      // })
    })
  }

  async animate() {
    // const ua = navigator.userAgent
    // if (ua.match(/(iPhone|iPad|iPod|Android)/i)) {
    // } else {
    // }

    TweenMax.to(this.msg, 2.0, { ease: Expo.easeInOut, opacity: 1 })
    await TweenMax.to(this.bg, 4.0, { ease: Expo.easeInOut, opacity: 0, zIndex: -1, delay: 2.0 })

    // await TweenMax.to(this.msg, 3.0, { opacity: 0 })

    // this.topSplash()
    // await this.topSplashLogo()

    // await TweenMax.to(this.msg, 5.0, { ease: Expo.ease, opacity: 0 })
    // TweenMax.set(this.msg, 2.0, {
    //   ease: Expo.easeInOut,
    //   opacity: 1,
    // })

    // await TweenMax.set(this.body, { css: { overflow: 'scroll' } })
    // await TweenMax.set(this.body, { css: { overflowX: 'hidden' } })
    // await TweenMax.set(this.body, { css: { width: '100vw' } })

    // await TweenMax.set(this.body, { css: { overflow: '' } })
    // await TweenMax.set(this.body, { css: { posison: '' } })
    // await TweenMax.set(this.body, { css: { top: '' } })
  }
}
