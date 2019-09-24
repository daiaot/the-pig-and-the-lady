import Lottie from 'lottie-web'
import type1 from '../../images/data/01.json'
import type2 from '../../images/data/02.json'
import type3 from '../../images/data/03.json'
import type4 from '../../images/data/04.json'
import type5 from '../../images/data/05.json'
import type6 from '../../images/data/06.json'
import type7 from '../../images/data/07.json'
import type8 from '../../images/data/08.json'
import type9 from '../../images/data/09.json'
import type10 from '../../images/data/10.json'
import type11 from '../../images/data/11.json'
import type12 from '../../images/data/12.json'

export default class LottieAnimation {
  constructor(elem) {
    this.elem = elem
    if (!navigator.userAgent.match(/(msie|edge|trident)/i)) {
      this.svgList = {
        type1,
        type2,
        type3,
        type4,
        type5,
        type6,
        type7,
        type8,
        type9,
        type10,
        type11,
        type12,
      }
      this.anim = []
    }
    this.init()
  }

  init() {
    if (!navigator.userAgent.match(/(msie|edge|trident)/i)) {
      this.targetState = Array.from(this.elem.querySelectorAll('[data-lottie]')).map(target => {
        const opts = JSON.parse(target.dataset.lottie)
        const delay = opts.delay || 0
        const packet = {
          target,
          type: this.svgList["type" + opts.type],
          delay,
          params: this.set(target, this.svgList["type" + opts.type], delay)
        }
        return packet
      })
    } else {
      this.targetState = Array.from(this.elem.querySelectorAll('[data-lottie]')).map((target,index) => {
        const opts = JSON.parse(target.dataset.lottie)
        const delay = opts.delay || 0
        const packet = {
          target: target.querySelector('[data-module="UaViewToggle"]'),
          delay,
        }
        return packet
      })
    }
  }

  set(target, type, delay) {
    const params = {
      container: target,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: type,
      rendererSettings: {
        progressiveLoad: true
      }
    }
    this.anim.push(Lottie.loadAnimation(params))
  }

  play() {
    if (this.targetState) {
      if (!navigator.userAgent.match(/(msie|edge|trident)/i)) {
        this.targetState.map((obj, index) => {
          setTimeout(() => {
            this.anim[index].play()
          }, obj.delay * 1000);
        })
      } else {
        this.targetState.map(obj => {
          setTimeout(() => {
            console.log(obj);
            obj.target.classList.add('is-active')
          }, obj.delay * 1000);
        })
      }
    }
  }
}
