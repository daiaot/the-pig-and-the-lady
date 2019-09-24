import { TweenMax } from 'gsap'
import $ from 'jquery'

export default class SectionTitleAnimation {
  constructor(elem, opts) {
    this.elem = elem
    this.chars = elem.querySelectorAll('.sr-seq')
    this.opts = this.getOpts(opts)
    this.state = {
      animated: false,
    }
    this.prepareAnimation()
    this.addEvents()
  }

  getOpts(opts) {
    return {
      offset: 400,
      ...opts,
    }
  }

  addEvents() {
    window.addEventListener('scroll', this.onScroll.bind(this))
  }

  onScroll() {
    // const scrollTop = window.scrollY
    const scrollTop = $(window).scrollTop()
    const offsetTop = this.getOffsetTop() - this.opts.offset
    if (!this.state.animated && scrollTop > offsetTop) {
      this.animate()
    }
  }

  getOffsetTop() {
    return this.elem.getBoundingClientRect().top + window.pageYOffset
  }

  generateRange(eventsNumberOfTimes) {
    return Math.floor(Math.random() * eventsNumberOfTimes)
  }

  prepareAnimation() {
    TweenMax.set(this.chars, {
      opacity: 0,
    })
  }

  animate() {
    const promises = Array.from(this.chars).map(
      char =>
        new Promise(resolve => {
          TweenMax.fromTo(char, 1.5,
            {
              y: 200,
              onComplete: () => {
                resolve()
            },
            },
            {
              ease: Expo.easeOut,
              opacity: 1,
              y: 0,
              delay: this.generateRange(15) * 0.1,
          })
        })
    )
    Promise.all(promises).then(() => {
      this.state.animated = true
    })
  }
}
