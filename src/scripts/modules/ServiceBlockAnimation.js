import { TweenMax, Linear } from 'gsap'
import $ from 'jquery'
import emit from '../emit'


export default class ServiceBlockAnimation {
  constructor(elem, opts) {
    this.elem = elem
    this.contents = this.elem.querySelectorAll(
      '[data-module-service-block-animation="content"]'
    )
    this.opts = this.getOpts(opts)
    this.mask = this.getMask()
    this.appendMaskToElem(this.mask)
    this.prepareAnimation()
    this.state = {
      animated: false,
    }
    this.addEvents()
  }

  getOpts(opts) {
    return {
      delay: 0,
      maskColor: '#f0f3f5',
      offset: 550,
      ...opts,
    }
  }

  addEvents() {
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
    // const scrollTop = window.scrollY
    const scrollTop = $(window).scrollTop()
    const offsetTop = this.getOffsetTop() - this.opts.offset

    if (!this.state.animated && scrollTop > offsetTop) {
      this.animate()
    }
  }

  appendMaskToElem(mask) {
    this.elem.style.position = 'relative'
    this.elem.style.overflow = 'hidden'
    this.elem.appendChild(mask)
  }

  createMask(charWidth, charHeight) {
    const mask = document.createElement('div')
    mask.style.width = `${charWidth + 1}px`
    mask.style.height = `${charHeight + 1}px`
    mask.style.backgroundColor = this.opts.maskColor
    mask.style.position = 'absolute'
    mask.style.top = '0px'
    mask.style.left = '0px'
    return mask
  }

  getOffsetTop() {
    return this.elem.getBoundingClientRect().top + window.pageYOffset
  }

  getMask() {
    return this.createMask(this.elem.clientWidth, this.elem.clientHeight)
  }

  prepareAnimation() {
    TweenMax.set(this.mask, {
      opacity: 1,
      x: 0,
    })
    TweenMax.set(this.contents, {
      opacity: 0,
    })
  }

  animate() {
    const tl = new TimelineMax({
      onComplete: () => {
        this.state.animated = true
      },
    })
      .to(this.mask, 0.1, {
        delay: this.opts.delay,
        ease: Linear.easeOut,
        opacity: 0,
        x: this.mask.clientWidth,
      })
      .to(this.contents, 0.3, {
        delay: 0.3,
        ease: Linear.easeNone,
        opacity: 1,
      })
  }
}
