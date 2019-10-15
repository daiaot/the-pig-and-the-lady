import $ from 'jquery'

export default class ReservationScroll {

  constructor(elem) {
    this.elem = elem
    // this.widget = document.querySelectorAll('#tc-widget')
    this.widget = this.elem.querySelectorAll('#tc-widget')
    // this.showWidget = false
    this.bindEvents()
  }

  bindEvents() {
    window.addEventListener('scroll', this.onScroll.bind(this))
  }

  onScroll() {

    // const top = this.elem.getBoundingClientRect().top
    // const relativeHeight = this.elem.getBoundingClientRect().height * -1
    // if (top < 0) {
    //   this.elem.children[0].classList.add('is-fixed')
    // } else if (top > relativeHeight) {
    //   this.elem.children[0].classList.remove('is-fixed')
    // }

    const top = this.elem.getBoundingClientRect().top
    const bottom = this.elem.getBoundingClientRect().bottom
    // const win_top = document.body.getBoundingClientRect().top
    const win_top = document.body.getBoundingClientRect().top * -1
    // const winTop = window.pageYOffset
    const relativeHeight = this.elem.getBoundingClientRect().height * 3
    // const relativeHeight = this.elem.getBoundingClientRect().height

    // const win_height = document.body.getBoundingClientRect().height

    // const endPoint = win_top + top - relativeHeight
    // const flg = bottom - endPoint

    // console.log('-- elem.top :' + this.elem.getBoundingClientRect().top)
    // console.log('-- document.body.top :' + document.body.getBoundingClientRect().top)
    // console.log('-- document.body.bottom :' + this.elem.getBoundingClientRect().bottom)
    // console.log('-- this.elem.Height :' + this.elem.getBoundingClientRect().height)
    // console.log('-- document.body.Height :' + document.body.getBoundingClientRect().height)

    // console.log('-- endPoint :' + endPoint)
    // console.log('-- flg :' + flg)


    console.log('-- win_top :' + win_top)
    console.log('-- relativeHeight :' + relativeHeight)

    if (win_top > relativeHeight) {
      TweenMax.to(this.widget, 0.01, {
        x: '100%',
        ease: Power3.easeInOut,
      })
    } else {
      TweenMax.to(this.widget, 0.01, {
        x: '0%',
        ease: Power3.easeInOut,
      })
    }

    // if(endPoint )

  }

}