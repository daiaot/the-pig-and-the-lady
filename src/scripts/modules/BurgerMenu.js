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
    this.appendMask(this.splashMask, this.body)

    this.bindEvent()
    this.anchorLink()
  }

  appendMask(mask, target) {
    target.appendChild(mask)
  }

  bindEvent() {
    // this.btn.addEventListener('click', this.animate.bind(this))

    this.btn.addEventListener('click', e => {
      TweenMax.set(this.body, { css: { overflow: 'hidden' } })
      e.preventDefault()
      // this.animate.bind(this)
      this.animate()
    })
  }

  bgSlide() {
    // console.log('bgSlide()')
    // console.log('status: ' + this.state.status)

    TweenMax.to(this.el, 0.3, {
      css: {
        right: 0,
      },
    })
  }

  toggleSlide() {
    const ua = navigator.userAgent
    let videoSrc
    if (ua.match(/(iPhone|iPad|iPod|Android)/i)) {
      TweenMax.to(this.btn, 0.3, {
        css: {
          right: '43%',
        },
      })
    } else {
      TweenMax.to(this.btn, 0.3, {
        css: {
          right: '50%',
        },
      })
    }
  }


  openAnimation() {
    this.state.status = 'opened'
    this.toggleSlide()
    this.bgSlide()
    // e.preventDefault()
    this.prepareSlideOutAnimation()
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
        display: 'block',
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
    // mask.style.right = '0px'
    mask.style.left = '0px'
    mask.style.opacity = '0'
    mask.style.display = 'none'
    return mask
  }

  closeAnimation() {

    this.state.status = 'animating'
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

    // this.slideOutVideoMask()
    this.slideOutNav()
  }

  animate() {
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
          if(this.dataset.anchor !== 'contact') {
            const href = `#${this.dataset.anchor}`
            const target = $(href === '#' || href === '' ? 'html' : href)
            // const top = target.offset().top
            // $('html, body').animate({ scrollTop: top }, 300, 'swing')
            // TweenMax.set(thisModule.btn, { className: '-=is-open' })
            // thisModule.closeAnimation()
          }
          TweenMax.set(thisModule.btn, { className: '-=is-open' })
          thisModule.closeAnimation()
        } else {
          window.location = this.dataset.path
        }
      })
    }
  }

  // slideOutVideoMask() {
  slideOutNav() {
    return new Promise(resolve => {
      resolve()
      TweenMax.set(this.nav, { css: { zIndex: 1 } })
      TweenMax.set(this.body, { css: { overflow: '' } })
      TweenMax.set(this.body, { css: { height: '' } })
      TweenMax.set(this.splashMask, {
        opacity: 0,
        display: 'none',
        x: 0,
        zIndex: 0,
      })
      TweenMax.to(this.splashMask, 0.5, {
        onComplete: function() {
          this.target.style.display = 'none'
        },
        x: this.splashMask.clientWidth,
        ease: Expo.easeInOut,
      })
    })
  }

}
