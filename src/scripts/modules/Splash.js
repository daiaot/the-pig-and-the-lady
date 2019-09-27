import { TweenMax, TimelineMax } from 'gsap'
import emit from '../emit'
import LottieAnimation from './LottieAnimation.js'

export default class Splash {
  constructor(elem) {
    this.elem = elem
    this.body = document.body
    this.innerLink = document.querySelectorAll('a')
    TweenMax.set(this.body, { css: { overflow: 'hidden' } })
    this.isSplash = elem.classList.contains('p-splash') ? true : false
    // this.splashMask = this.createMask(this.elem, '#f0f3f5')
    // this.appendMask(this.splashMask, this.elem)
    this.navigation = elem.querySelector('[data-module-splash="navigation"]')
    this.navigationLogo = elem.querySelectorAll(
      '[data-module-splash="navigation-content-logo"]'
    )
    this.navigationLinks = elem.querySelectorAll(
      '[data-module-splash="navigation-content-links"]'
    )
    this.video = elem.querySelector('[data-module-splash="video"]')
    this.loadingIcon = elem.querySelector('[data-module-splash="loading-icon"]')
    this.kvImage = elem.querySelector('[data-module-splash="visual"]')
    this.bg = elem.querySelector('[data-module-loading="bg"]')
    TweenMax.set(this.kvImage, { css: { opacity: '0' } })
    this.LottieAnimation = new LottieAnimation(this.elem)
    this.heightAdjust()
    this.prepareSlideInAnimation()
    this.animate()
    this.bindEvents()
  }

  heightAdjust() {
    let target = document.getElementsByClassName('p-splash')
    if (this.isSplash === true && window.devicePixelRatio === 3 &&
      (window.screen.width === 375 || window.screen.height === 375) &&
      /iPhone/.test(window.navigator.userAgent)) {
      target[0].style.height = 'calc(100vh - 110px)'
    } else if (this.isSplash === true && navigator.userAgent.match(/(iPhone|iPod)/i)) {
      target[0].style.height = 'calc(100vh - 75px)'
    }
    else if (
      this.isSplash === true &&
      navigator.userAgent.match(/(Android)/i)
    ) {
      target[0].style.height = 'calc(100vh - 45px)'
    }
  }

  bindEvents() {
    for (let i = 0; i < this.innerLink.length; i = i + 1) {
      this.innerLink[i].addEventListener('click', e => {
        let target = e.currentTarget.getAttribute('target')
        this.href = e.currentTarget.getAttribute('href')
        if ((target === null || target === '') && !this.href.match(/#/)) {
          e.preventDefault()
          this.transitionStart()
        }
      })
    }
  }

  locationHref() {
    location.href = this.href
  }

  createMask(elem, maskColor) {
    const mask = document.createElement('div')
    mask.style.width = `${elem.clientWidth + 1}px`
    mask.style.height = `100vh`
    mask.style.backgroundColor = maskColor
    mask.style.position = 'fixed'
    mask.style.zIndex = '10'
    mask.style.top = '0px'
    mask.style.right = '0px'
    return mask
  }

  appendMask(mask, target) {
    // target.style.position = 'relative'
    // SP時のnewsを表示させるため、一時的に'hidden'解除
    target.style.overflow = 'hidden'
    target.appendChild(mask)
  }

  prepareSlideOutAnimation() {
    return new Promise(resolve => {
      TweenMax.set(this.elem, { display: 'block' })
      TweenMax.set(this.body, { css: { overflow: 'hidden' } })
      // TweenMax.set(this.splashMask, {
      //   opacity: 1,
      //   display: 'block',
      //   x: -this.navigation.clientWidth,
      //   zIndex: 100,
      // })
      resolve()
    })
  }

  prepareSlideInAnimation() {
    return new Promise(() => {
      // TweenMax.set(this.splashMask, {
      //   opacity: 1,
      //   x: 0,
      //   zIndex: 10,
      // })
      // TweenMax.set(this.navigation, {
      //   opacity: 1,
      //   width: '100%',
      //   x: -this.navigation.clientWidth,
      // })
      TweenMax.set(this.loadingIcon, {
        opacity: 0,
        zIndex: 11,
      })
      TweenMax.to(this.loadingIcon, 0.1, {
        opacity: 1,
        zIndex: 11,
      })
    })
  }

  slideInVideoMask() {
    return new Promise(resolve => {
      TweenMax.to(this.splashMask, 0.5, {
        onComplete: () => resolve(),
        x: 0,
        ease: Power3.easeInOut,
      })
    })
  }

  slideOutVideoMask() {
    return new Promise(resolve => {
      resolve()
      TweenMax.to(this.splashMask, 0.5, {
        onComplete: function() {
          this.target.style.display = 'none'
        },
        x: this.splashMask.clientWidth,
        ease: Expo.easeInOut,
      })
    })
  }

  showVideo() {
    return new Promise(resolve => {
      TweenMax.set(this.body, { css: { overflow: 'scroll' } })
      TweenMax.set(this.video, {
        onComplete: () => {
          resolve()
          this.video.play()
        },
        opacity: 1,
      })
    })
  }

  loading() {
    return new Promise(resolve => {
      const tl = new TimelineMax({
        onComplete: () => {
          setTimeout(() => {
            resolve()
          }, 1500);
        },
      }).to(this.loadingIcon, 0.1, {
        opacity: 1,
        onComplete: () => {
        this.LottieAnimation.play()
        },
      })
    })
  }

  loaded() {
    return new Promise(resolve => {
      TweenMax.to(this.loadingIcon, 0.1, {
        onComplete: () => {
          TweenMax.set(this.loadingIcon, {
            zIndex: 0,
          })
          resolve()
        },
        opacity: 0,
      })
    })
  }

  slideInNavigation() {
    return new Promise(resolve => {
    })
  }

  fadeInNavLinks() {
    return new Promise(resolve => {
      TweenMax.staggerTo(
        this.navigationLogo,
        0.8,
        {
          opacity: 1,
          ease: Expo.easeInOut,
        },
        0.07,
        () => resolve()
      )
      const linkIndexArr = []
      for (let i = 0; i < this.navigationLinks.length; i++) {
        linkIndexArr.push(i)
      }
      for (var j = linkIndexArr.length - 1; j >= 0; j--) {
        var rand = Math.floor(Math.random() * (j + 1))
        ;[linkIndexArr[j], linkIndexArr[rand]] = [
          linkIndexArr[rand],
          linkIndexArr[j],
        ]
      }
      linkIndexArr.forEach((linkIndex, i) => {
        TweenMax.staggerFromTo(
          this.navigationLinks[linkIndex].querySelectorAll('.character'),
          0.8,
          {
            opacity: 0,
            y: 3,
          },
          {
            opacity: 1,
            y: 0,
            delay: i / 10,
            ease: Power4.easeInOut,
          },
          0.01 + 0.01 * i,
          () => resolve()
        )
      })
    })
  }

  slideOutNavigationChildMask() {
    return new Promise(resolve => {
      TweenMax.staggerTo(
        this.navigationContents.getElementsByTagName('path'),
        0.3,
        {
          opacity: 1,
          ease: Expo.easeInOut,
        },
        0.05,
        () => resolve()
      )
    })
  }

  loadVideo(src) {
    return new Promise((resolve) => {
      this.video.src = src
      this.video.addEventListener('canplay', () => resolve())
      setTimeout(resolve, 5000)
    })
  }

  async transitionStart() {
    await this.prepareSlideOutAnimation()
    await this.slideInVideoMask()
    await this.locationHref()
  }

  async animate() {
    const ua = navigator.userAgent
    if (ua.match(/(iPhone|iPad|iPod|Android)/i)) {
    } else {
    }

    // await this.slideInVideoMask()
    // await this.loading()
    // await this.loadVideo(videoSrc)
    await TweenMax.to(this.bg, 0.01, { display: 'none' })
    await this.loaded()
    // await this.showVideo()
    await TweenMax.set(this.body, { css: { overflow: 'scroll' } })
    await TweenMax.set(this.body, { css: { overflowX: 'hidden' } })
    await TweenMax.set(this.body, { css: { width: '100vw' } })
    await TweenMax.set(this.kvImage, { css: { opacity: '1' } })
    // await this.slideOutVideoMask()
    await emit.ev.emit('pageLoaded', true)
    await this.slideInNavigation()
    await this.fadeInNavLinks()
  }
}
