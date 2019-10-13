
import $ from 'jquery'

export default class Toggle {
  constructor(elem) {
    this.elem = elem
    // this.bindEvents()
    this.bindEvents()
  }
  bindEvents() {
    $('#nav-toggle').on('click', function(e) {
      e.preventDefault()
    })
    // this.elem.addEventListener('click', e => {
    //   console.log('ToggleModule toggle click')
    //   e.preventDefault()
    //   console.log(e.preventDefault())
    // })
  }

}

