import $ from 'jquery'
import { TweenMax } from 'gsap'


let current_scrollY

export default class BurgerMenu {
  constructor(elem) {
    this.el = elem
    this.body = document.body
    this.items = this.el.querySelectorAll('.c-svg_container')
    this.btn = document.querySelector('#nav-toggle')
    this.links = this.el.querySelectorAll('.p-burger_item')
    this.nav = this.el.querySelectorAll('.p-burger_container')
    this.flg = false
    this.current = 0
    this.state = {
      status: 'closed',
    }

    // ナビオープン時のバックグラウンド
    this.splashMask = this.createMask(this.el, '#fff')
    this.appendMask(this.splashMask, this.el)
    // this.appendMask(this.splashMask, this.body)

    this.bindEvent()
    this.anchorLink()
  }

  appendMask(mask, target) {
    target.appendChild(mask)
  }

  removeMask(mask, target) {
    target.removeChild(mask)
  }


  bindEvent() {
    // this.btn.addEventListener('click', this.animate.bind(this))
    this.btn.addEventListener('click', () => {
    // this.btn.addEventListener('click', e => {

      // e.preventDefault()

      //- click時のtop位置を取得
      // this.current = this.el.getBoundingClientRect().top
      // this.current = document.body.getBoundingClientRect().top * -1
      // console.log('---- this.current')
      // console.log(this.current)

      // $(window).on('touchmove', function(event) {
      //   event.preventDefault();
      // });


      // TweenMax.set(this.body, { css: { overflow: 'hidden' } })
      // TweenMax.set(this.body, { css: { position: 'fixed' } })
      // TweenMax.set(this.body, { css: { top: '`this.current`' } })
      // TweenMax.set(this.body, { css: { top: 'this.current' } })


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
    // $('html').addClass('scroll-prevent')
    this.state.status = 'opened'
    this.toggleSlide()
    this.bgSlide()
    // e.preventDefault()
    this.prepareSlideOutAnimation()
  }

  prepareSlideOutAnimation() {

    // console.log('--------- openAnimation()')

    return new Promise(resolve => {
      TweenMax.set(this.el, { display: 'block' })

      // this.body.classList.add("hoge");

      TweenMax.set(this.body, { css: { overflow: 'hidden' } })
      // TweenMax.set(this.body, { css: { overflow: 'auto' } })
      TweenMax.set(this.body, { css: { height: '100%' } })
      // TweenMax.set(this.body, { css: { zIndex: '0' } })
      TweenMax.set(this.body, { css: { touchAction: 'none' } })

      // add by aotsuka
      // this.current_scrollY = $( window ).scrollTop()
      TweenMax.set(this.body, { css: { width: '100%' } })
      current_scrollY = $( window ).scrollTop()
      TweenMax.set(this.body, { css: { position: 'fixed' } })
      // console.log('-- open()')
      // console.log('-- current_scrollY : ' + current_scrollY)
      TweenMax.set(this.body, { css: { top: -1 * current_scrollY } })
      TweenMax.set(this.body, { css: { width: '100%' } })
      // TweenMax.set(this.body, { css: { zIndex: '-1' } })


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

    // console.log('--------- closeAnimation()')


    this.state.status = 'animating'
    // this.body.classList.remove("hoge");
    TweenMax.set(this.body, { css: { overflow: 'scroll' } })
    TweenMax.set(this.body, { css: { touchAction: '' } })
    TweenMax.set(this.body, { css: { position: '' } })
    // TweenMax.set(this.body, { css: { scrollTop: '' } })


    // add by aotsuka
    // this.removeMask(this.splashMask, this.el)
    $('body').removeClass('scroll-prevent')


    // TweenMax.to(this.splashMask, 0.5, {
    //   onComplete: function() {
    //     this.target.style.display = 'none'
    //   },
    //   x: this.splashMask.clientWidth,
    //   ease: Expo.easeInOut,
    // })

    // add by aotsuka
    // console.log('-- close()')
    // console.log('-- current_scrollY : ' + (-1 * current_scrollY))
    TweenMax.set(this.body, { css: { width: '' } })
    TweenMax.set(this.body, { css: { height: '' } })
    // TweenMax.set(this.body, { css: { position: 'relative' } })
    // TweenMax.set(this.body, { css: { top: -1 * this.current_scrollY } })
    // TweenMax.set(this.body, { css: { top: -1 * current_scrollY } })
    $( 'html, body' ).prop( { scrollTop: current_scrollY } );
    // TweenMax.set(this.body, { css: { top: -1 * current_scrollY } })

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

    this.slideOutNav()
  }

  animate() {
    if (this.state.status === 'closed') {
      TweenMax.set(this.btn, { className: '+=is-open' })
      // $('body').addClass('scroll-prevent')
      this.openAnimation()
    } else if (this.state.status === 'opened') {
      TweenMax.set(this.btn, { className: '-=is-open' })
      // $('body').removeClass('scroll-prevent')
      this.closeAnimation()
    } else {
      return false
    }
  }

  anchorLink() {
    const thisModule = this
    // console.log('---- thisModule')
    // console.log(thisModule)
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
          } else {
            // contactの場合
          }
          // TweenMax.set(thisModule.btn, { className: '-=is-open' })
          // thisModule.closeAnimation()
        } else {
          let url = this.querySelector('a').getAttribute('href')
          console.log('---- URL: ' + url)
          let reg = new RegExp("^(https?:)?\/\/"+document.domain)
          if (url.match(reg) || url.charAt(0) === "/") {
            // //内部リンク時の処理
            // console.log('---- this.dataset.path')
            // console.log(this.dataset.path)
            // window.location = this.dataset.path
            window.location = url
            // console.log('---- window.location')
            // console.log(window.location)
          }
          // thisModule.closeAnimation()
        }
        TweenMax.set(thisModule.btn, { className: '-=is-open' })
        thisModule.closeAnimation()
      })
    }
  }

  slideOutNav() {
    return new Promise(resolve => {
      resolve()
      TweenMax.set(this.nav, { css: { zIndex: 1 } })
      TweenMax.set(this.body, { css: { overflow: '' } })
      TweenMax.set(this.body, { css: { height: '' } })

      // add by aotsuka
      // TweenMax.set(this.body, { css: { width: '' } })
      // TweenMax.set(this.body, { css: { zIndex: '0' } })

      // this.removeMask(this.splashMask, this.el)
      // $('body').removeClass('scroll-prevent')

      TweenMax.set(this.splashMask, {
        opacity: 0,
        display: 'none',
        // x: 0,
        zIndex: -1,
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
