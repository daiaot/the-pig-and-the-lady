import $ from 'jquery'
import { TweenMax } from 'gsap'

export default class BurgerMenu {
  constructor(elem, opts) {
    this.el = elem
    this.body = document.body
    this.items = this.el.querySelectorAll('.c-svg_container')
    this.btn = document.querySelector('#nav-toggle')
    this.links = this.el.querySelectorAll('.p-burger_item')
    this.nav = this.el.querySelectorAll('.p-burger_container')
    this.flg = false
    this.state = {
      status: 'closed',
    }

    // ナビオープン時のバックグラウンド
    this.splashMask = this.createMask(this.el, '#fff')
    this.appendMask(this.splashMask, this.el)

    this.bindEvent()
    this.anchorLink()
  }

  bindEvent() {
    // this.btn.addEventListener('click', this.animate.bind(this))

    this.btn.addEventListener('click', e => {
      TweenMax.set(this.body, { css: { overflow: 'hidden' } })
      e.preventDefault()
      // this.animate.bind(this)
      this.animate()
    })

    // this.btn.addEventListener('click', e => {
    // this.btn.addEventListener('click', e => {
    //   console.log('toggle click')
    //   e.preventDefault()
    //   this.animate.bind(this)
    // })
  }

  bgSlide() {
    console.log('bgSlide()')
    console.log('status: ' + this.state.status)

    TweenMax.to(this.el, 0.3, {
      css: {
        right: 0,
      },
      // onComplete: () => this.lettersFade(),
    })
  }

  toggleSlide() {
    // console.log('toggleSlide()')
    // console.log('status: ' + this.state.status)

    TweenMax.to(this.btn, 0.3, {
      css: {
        right: '50%',
      },
    })
  }

  lettersFade() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i]
      this.letters = item.querySelectorAll('g')
      TweenMax.staggerFromTo(
        this.letters,
        0.6,
        {
          y: 40*Math.random()
        },
        {
          y: 0,
          opacity: 1,
          delay: 0.1 * i,
          ease: Expo.easeOut
        },
        0.04,
        () => {
          if (i === this.items.length - 1) {
            this.state.status = 'opened'
          }
        }
      )
    }
  }

  openAnimation() {
    // console.log('openAnimation()')
    // console.log('status: ' + this.state.status)

    // this.state.status = 'animating'
    this.state.status = 'opened'
    this.toggleSlide()
    this.bgSlide()
    // this.slideInVideoMask()
    // e.preventDefault()
    this.prepareSlideOutAnimation()
  }

  appendMask(mask, target) {
    // target.style.position = 'relative'
    // SP時のnewsを表示させるため、一時的に'hidden'解除
    target.style.overflow = 'hidden'
    target.appendChild(mask)
  }
  prepareSlideOutAnimation() {
    return new Promise(resolve => {
      TweenMax.set(this.el, { display: 'block' })

      this.body.classList.add("hoge");
      TweenMax.set(this.body, { css: { overflow: 'hidden' } })
      // TweenMax.set(this.body, { css: { overflow: 'auto' } })
      TweenMax.set(this.body, { css: { height: '100%' } })
      // TweenMax.set(this.body, { css: { zIndex: '0' } })
      TweenMax.set(this.body, { css: { touchAction: 'none' } })
      TweenMax.set(this.nav, { css: { zIndex: 20 } })
      TweenMax.set(this.splashMask, {
        opacity: .5,
        // display: 'block',
        // x: -this.navigation.clientWidth,
        zIndex: 10,
        overflow: 'hidden',
      })
      resolve()
    })
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
    mask.style.opacity = '0'
    return mask
  }

  closeAnimation() {
    console.log('closeAnimation()')
    console.log(this.state.status)

    this.state.status = 'animating'
    // this.allLetters = this.el.querySelectorAll('g')
    // TweenMax.to(this.allLetters, 0.2, { opacity: 0 })

    this.body.classList.remove("hoge");
    TweenMax.set(this.body, { css: { overflow: 'scroll' } })
    TweenMax.set(this.body, { css: { touchAction: '' } })

    TweenMax.to(this.btn, 0.3, {
      css: {
        right: '0',
      },
    })

    TweenMax.to(this.el, 0.3, {
      css: {
        right: '-100%',
      },
      onComplete: () => (this.state.status = 'closed'),
    })

    this.slideOutVideoMask()
  }

  animate() {
    console.log('animate()')
    console.log('status: ' + this.state.status)
    if (this.state.status === 'closed') {
      TweenMax.set(this.btn, { className: '+=is-open' })
      this.openAnimation()
    } else if (this.state.status === 'opened') {
      TweenMax.set(this.btn, { className: '-=is-open' })
      this.closeAnimation()
    } else {
      return false
    }
  }

  anchorLink() {
    const thisModule = this
    for (let j = 0; j < this.links.length; j++) {
      this.links[j].addEventListener('click', function() {
        if (this.dataset.anchor !== undefined) {
          const href = `#${this.dataset.anchor}`
          const target = $(href === '#' || href === '' ? 'html' : href)
          const top = target.offset().top
          $('html, body').animate({ scrollTop: top }, 300, 'swing')
          TweenMax.set(thisModule.btn, { className: '-=is-open' })
          thisModule.closeAnimation()
        } else {
          window.location = this.dataset.path
        }
      })
    }
  }


  // slideInVideoMask() {
  //   return new Promise(resolve => {
  //     TweenMax.to(this.splashMask, 0.5, {
  //       onComplete: () => resolve(),
  //       x: 0,
  //       ease: Power3.easeInOut,
  //     })
  //   })
  // }

  slideOutVideoMask() {
    return new Promise(resolve => {
      resolve()
      TweenMax.set(this.nav, { css: { zIndex: 1 } })
      TweenMax.set(this.body, { css: { overflow: '' } })
      TweenMax.set(this.body, { css: { height: '' } })
      TweenMax.set(this.splashMask, {
        opacity: 0,
        x: 0,
        zIndex: 0,
      })
      // TweenMax.to(this.splashMask, 0.5, {
      //   onComplete: function() {
      //     this.target.style.display = 'none'
      //   },
      //   x: this.splashMask.clientWidth,
      //   ease: Expo.easeInOut,
      // })
    })
  }


}


