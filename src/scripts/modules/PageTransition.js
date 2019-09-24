import { TweenMax, TimelineMax, Linear } from 'gsap'
import emit from '../emit'
import LottieAnimation from './LottieAnimation.js'


export default class PageTransition {
  constructor(elem, opts) {
    this.elem = elem
    this.isLower = elem.classList.contains('lower') ? true : false
    this.target = this.isLower ? document : elem
    this.body = document.body
    this.innerLink = document.querySelectorAll('a')
    TweenMax.set(this.body, { css: { overflow: 'hidden' } })
    this.splashMask = this.createMask(this.elem, '#f0f3f5')
    this.appendMask(this.splashMask, this.elem)
    this.navigation = this.target.querySelector(
      '[data-module-splash="navigation_lower"]'
    )
    this.navigationLogo = this.target.querySelectorAll(
      '[data-module-splash="navigation-content-logo"]'
    )
    this.navigationLinks = this.target.querySelectorAll(
      '[data-module-splash="navigation-content-links"]'
    )
    this.loadingIcon = elem.querySelector(
      '[data-module-loading="loading-icon"]'
    )
    this.bg = elem.querySelector('[data-module-loading="bg"]')
    this.LottieAnimation = new LottieAnimation(this.elem)
    this.prepareSlideInAnimation()
    this.animate()
    this.bindEvents()
  }

  bindEvents() {
    for (let i = 0; i < this.innerLink.length; i = i + 1) {
      this.innerLink[i].addEventListener('click', e => {
        let target = e.currentTarget.getAttribute('target')
        this.href = e.currentTarget.getAttribute('href')
        if ((target === null || target === '') && !this.href.match(/^#/)) {
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

  prepareSlideOutAnimation() {
    return new Promise(resolve => {
      TweenMax.set(this.elem, { display: 'block' })
      TweenMax.set(this.body, { css: { overflow: 'hidden' } })
      TweenMax.set(this.splashMask, {
        opacity: 1,
        display: 'block',
        x: -this.navigation.clientWidth,
        zIndex: 1,
      })
      resolve()
    })
  }
  prepareSlideInAnimation() {
    return new Promise(resolve => {
      TweenMax.set(this.splashMask, {
        opacity: 1,
        x: 0,
        zIndex: 1,
      })
      TweenMax.set(this.navigation, {
        opacity: 1,
        width: '100%',
        x: -this.navigation.clientWidth,
      })
      TweenMax.set(this.loadingIcon, {
        opacity: 1,
        zIndex: 2,
      })
      // TweenMax.set(this.loadingIcon, {
      //   opacity: 1,
      //   zIndex: 2,
      // })
    })
  }

  slideInNavigation() {
    return new Promise(resolve => {
      const tl = new TimelineMax({
        onComplete: () => resolve(),
      })
        .to(this.navigation, 0, {
          delay: 0.07,
          opacity: 1,
        })
        .to(this.navigation, 0.3, {
          x: 0,
          ease: Expo.easeInOut,
        })
        .to(this.navigation.children, 0, {
          opacity: 1,
        })
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
      TweenMax.to(this.splashMask, 0.6, {
        onComplete: () => {
          TweenMax.set(this.body, { css: { overflow: 'scroll' } })
          TweenMax.set(this.body, { css: { overflowX: 'hidden' } })
          TweenMax.set(this.body, { css: { width: '100vw' } })
          TweenMax.set(this.elem, { display: 'none' })
          // this.target.style.display = 'none'
          resolve()
        },
        x: this.splashMask.clientWidth,
        ease: Power3.easeInOut,
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
          setTimeout(() => {
          resolve()
          }, 1000);
        },
      }).to(this.loadingIcon, 0.1, {
        opacity: 1,
        onComplete: () => {
          setTimeout(() => {
            this.LottieAnimation.play()
          }, 900);
        }
      })
    })
  }

  loaded() {
    return new Promise(resolve => {
      TweenMax.to(this.loadingIcon, 0.1, {
        delay: 0.5,
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

  async transitionStart() {
    await this.prepareSlideOutAnimation()
    await this.slideInVideoMask()
    await this.locationHref()
  }

  async animate() {
    await this.slideInVideoMask()
    await this.loading()
    await TweenMax.to(this.bg, 0.01, { display: 'none' })
    await this.loaded()
    await this.slideOutVideoMask()
    await this.slideInNavigation()
    await this.fadeInNavLinks()
    await emit.ev.emit('pageLoaded', true)
  }
}
