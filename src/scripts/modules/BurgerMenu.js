import $ from 'jquery'
import { TweenMax } from 'gsap'

export default class BurgerMenu {
  constructor(elem, opts) {
    this.el = elem
    this.items = this.el.querySelectorAll('.c-svg_container')
    this.btn = document.querySelector('#nav-toggle')
    this.links = this.el.querySelectorAll('.p-burger_item')
    this.flg = false
    this.state = {
      status: 'closed',
    }
    this.bindEvent()
    this.anchorLink()
  }

  bindEvent() {
    this.btn.addEventListener('click', this.animate.bind(this))
  }

  bgSlide() {
    TweenMax.to(this.el, 0.3, {
      css: {
        right: 0,
      },
      onComplete: () => this.lettersFade(),
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
    this.state.status = 'animating'
    this.bgSlide()
  }

  closeAnimation() {
    this.state.status = 'animating'
    this.allLetters = this.el.querySelectorAll('g')
    TweenMax.to(this.allLetters, 0.2, { opacity: 0 })
    TweenMax.to(this.el, 0.3, {
      css: {
        right: '-100%',
      },
      onComplete: () => (this.state.status = 'closed'),
    })
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
}
