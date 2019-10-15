import $ from 'jquery'

export default class ReservationShow {

  constructor(elem) {
    this.elem = elem

    this.widget = document.querySelectorAll('#tc-widget')
    this.showWidget = false
    this.bindEvents()
  }

  bindEvents() {

    this.elem.addEventListener('click', () => {
      if (!this.showWidget) {
        TweenMax.to(this.widget, 0.5, {
          x: '100%',
          ease: Power3.easeInOut,
        })
        this.showWidget = true

      } else {
        TweenMax.to(this.widget, 0.2, {
          x: '0%',
          ease: Power3.easeInOut,
        })
        this.showWidget = false
      }
    })
  }

}