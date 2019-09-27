  import { TweenMax, Linear, Expo } from 'gsap'
  import emit from '../emit'
  import LottieAnimation from './LottieAnimation.js'

  export default class LogoTitleAnimation {
    constructor(elem, opts) {
      this.elem = elem
      this.hdg = elem.querySelector('.amime_title')
      this.svgs = Array.prototype.slice.call(
        this.hdg.querySelectorAll('.character-parent')
      )
      this.charsArr = []
      this.svgs.forEach((svg, i) => {
        const charArr = Array.prototype.slice.call(
          svg.querySelectorAll('.character')
        )
        this.charsArr.push(charArr)
      })

      // console.log(this.charsArr)

      // this.text = elem.querySelector('.p-hmsc-content__about--intro ')
      this.opts = this.getOpts(opts)

      this.state = {
        animationStart: false,
        lottie: false,
      }
      this.flag = false
      this.LottieAnimation = new LottieAnimation(this.elem)
      this.addEvents()
    }

    getOpts(opts) {
      return {
        maskColor: '#ffffff',
        offset: window.innerHeight * 0.7,
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

      if (!this.state.animationStart && scrollBottom > offsetTop && !this.state.lottie) {
        this.state.lottie = true
        this.animate()
      }
    }

    onScroll() {
      const scrollTop = window.pageYOffset
      const offsetTop = this.getOffsetTop() - this.opts.offset
      if (!this.state.animationStart && scrollTop > offsetTop && !this.state.lottie) {
        this.state.lottie = true
        this.animate()
      }
    }

    appendMaskToElem(masks) {
      Array.from(this.chars).forEach((char, i) => {
        const mask = masks[i]
        char.style.position = 'relative'
        char.style.overflow = 'hidden'
        char.appendChild(mask)
      })
    }

    createMask(charWidth, charHeight, i) {
      const mask = document.createElement('div')
      mask.style.width = `${charWidth + 1}px`
      mask.style.height = `${charHeight + 1}px`
      mask.style.backgroundColor = this.opts.maskColor
      mask.style.position = 'absolute'
      mask.style.top = '0px'
      mask.style.left = '0px'
      mask.dataset.charId = i
      return mask
    }

    getOffsetTop() {
      return this.elem.getBoundingClientRect().top + window.pageYOffset
    }

    animate() {
      this.LottieAnimation.play()
      this.state.animationStart = true
      this.TL = new TimelineMax({
        paused: true,
      })
      const cover01 = this.elem.querySelector('.logo_cover-1')
      const cover02 = this.elem.querySelector('.logo_cover-2')
      const cover03 = this.elem.querySelector('.logo_cover-3')

      this.charsArr.forEach((chars, i) => {
        chars.forEach((element, j) => {
          TweenMax.fromTo(
            element,
            0.6 + j * j * 0.01,
            {
              y: 40 * Math.random(),
            },
            {
              ease: Expo.easeOut,
              opacity: 1,
              y: 0,
              delay: j * j * 0.01,
            }
          )
        })
      })

      this.TL.set(cover01, { className: '+=is-hidden' }, 0.8)
      this.TL.set(cover02, { className: '+=is-hidden' }, 0.8)
      this.TL.set(cover03, { className: '+=is-hidden' }, 1.4)
      // console.log(this.text);
      
      // this.TL.to(this.text, 0.5, { y: 0, opacity: 1, ease: Power3.easeOut }, 1.7)

      this.TL.restart()
    }
  }
