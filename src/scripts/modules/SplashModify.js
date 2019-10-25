import { TweenMax, TimelineMax } from 'gsap'

export default class splashModify {
  constructor(elem) {
    this.elem = elem
    this.body = document.body
    this.content = document.getElementById('top')
    // this.isSplash = elem.classList.contains('p-splash') ? true : false
    this.bg = elem.querySelector('[data-module-loading="bg"]')
    // this.msg = elem.querySelectorAll('.p-loading__msg')
    this.msg
    this.session = sessionStorage
        // this.heightAdjust()

    if (!this.session.getItem('pig_session')) {
      // TweenMax.to(this.content, 0.01, { ease: Expo.easeInOut, opacity: 0 })
      TweenMax.to(this.body, 0.01, { ease: Expo.easeInOut, opacity: 0 })
    }
    this.splashBg = this.createSplashBg(this.elem, '#f37779')
    this.appendSplashBg(this.splashBg, this.elem)
    // this.appendSplashBg(this.splashBg, this.msg)
    // this.slideInVideoMask()
    this.init()
    this.addSplashContent()

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

  init() {
    console.log('---- init()')
    // this.splashBgDelete()

    // this.body.style.opacity = '0'

    if (!this.session.getItem('pig_session')) {
      // this.splashBg = this.createSplashBg(this.elem, '#f37779')
      // this.appendSplashBg(this.splashBg, this.elem)
      // this.addSplashContent()
    }
  }

  appendSplashBg(bg, target) {

    console.log('---- appendSplashBg()')

    if (!this.session.getItem('pig_session')) {

      // TweenMax.to(this.body, 0.01, { ease: Expo.easeInOut, opacity: 0 })

      // target.appendChild(bg)
      // target.insertBefore(bg)
      bg.classList.add('p-loading__bg')
      // bg.appendChild(addImage)

      var opening = document.createElement('img')
      opening.classList.add('p-loading__msg')
      opening.setAttribute('src', '/assets/images/top/img_splash_msg.svg')
      // opening.innerHTML = splashMsg

      var parentDiv = target.parentNode;
      // parentDiv.insertBefore(bg, target.nextElementSibling)
      target.insertBefore(bg, target.firstChild)
      bg.insertBefore(opening, bg.firstChild)
      this.msg = this.elem.querySelectorAll('.p-loading__msg')
    }
  }

  createSplashBg(elem, maskColor) {

    console.log('---- createSplashBg()')

    const mask = document.createElement('div')
    mask.style.width = `${elem.clientWidth + 1}px`
    mask.style.height = `100vh`
    mask.style.backgroundColor = maskColor
    mask.style.position = 'fixed'
    mask.style.zIndex = '-1'
    mask.style.top = '0px'
    // mask.style.right = '0px'
    // mask.style.left = '0px'
    mask.style.opacity = '0'
    mask.style.display = 'none'
    return mask
  }

  bindEvents() {

    console.log('---- bindEvents()')

    if (!this.session.getItem('pig_session')) {
      this.animate()
    }
  }

  // locationHref() {
  //   location.href = this.href
  // }

  // prepareSlideOutAnimation() {
  //   return new Promise(resolve => {
  //     TweenMax.set(this.elem, { display: 'block' })
  //     TweenMax.set(this.body, { css: { overflow: 'hidden' } })
  //     resolve()
  //   })
  // }

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

  // slideInVideoMask() {
    addSplashContent() {

    console.log('---- addSplashContent()')

    // TweenMax.to(this.splashBg, 0, {
    //   display: 'block',
    //   opacity: 1,
    //   zIndex: 100,
    // })

    return new Promise(resolve => {
      TweenMax.to(this.splashBg, 0.01, {
        onComplete: () => resolve(),
        display: 'block',
        opacity: 1,
        zIndex: 100,
        // ease: Power3.easeInOut,
      })
    })
  }

  async animate() {

    console.log('---- animate()')
    // const ua = navigator.userAgent
    // if (ua.match(/(iPhone|iPad|iPod|Android)/i)) {
    // } else {
    // }


    // await this.addSplashContent()

    // TweenMax.set(this.splashBg, { display: 'block', opacity: 1, zIndex: 100 })

    // TweenMax.set(this.bg, { opacity: 1, zIndex: 100 })

    // TweenMax.to(this.content, 0.01, { ease: Expo.easeInOut, opacity: 1 })
    TweenMax.to(this.body, 0.01, { ease: Expo.easeInOut, opacity: 1 })

    TweenMax.to(this.msg, 2.0, { ease: Expo.easeInOut, opacity: 1, zIndex: 120 })
    // await TweenMax.to(this.bg, 4.0, { ease: Expo.easeInOut, opacity: 0, zIndex: -1, delay: 2.0 })

    // await TweenMax.to(this.bg, 0.5, { opacity: 0, zIndex: -1, delay: 3.0 })
    await TweenMax.to(this.splashBg, 0.5, { display: 'none', opacity: 0, zIndex: -1, delay: 3.0 })
    // await TweenMax.to(this.msg, 3.0, { display: 'none'})

    // await TweenMax.to(this.msg, 0.1, { display: 'none', opacity: 0, delay: 3.0 })

    // await TweenMax.to(this.msg, 1.0, { opacity: 0, zIndex: -1, delay: 3.0})


    // await TweenMax.to(this.msg, 3.0, { opacity: 0 })

    // this.topSplash()
    // await this.topSplashLogo()

    // await TweenMax.to(this.msg, 5.0, { ease: Expo.ease, opacity: 0 })
    // TweenMax.set(this.msg, 2.0, {
    //   ease: Expo.easeInOut,
    //   opacity: 1,
    // })

    // sessionStorage設定
    this.session.setItem('pig_session', 'true')

    // console.log('---- sessionStorage')
    // console.log(this.session.getItem('pig_session'))

    // スプラッシュのbgを削除
    // this.bg.textContent = null
    // this.elem.removeChild(this.bg)
    // console.log('---- スプラッシュbg削除')
    // console.log(this.bg)
  }

  splashBgDelete() {
    TweenMax.to(this.bg, 0, { opacity: 0, zIndex: -1 })
    // this.bg.textContent = null
  }
}
