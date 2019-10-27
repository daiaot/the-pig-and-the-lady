import { TweenMax, TimelineMax } from 'gsap'

export default class LoadToTop {
  constructor(elem) {
    this.elem = elem
    this.cover = document.querySelector('.p-loading__cover')
    this.bindEvents()
    // this.session = sessionStorage
  }

  bindEvents() {
    console.log('---- LoadToTop bindEvents()')

    // window.onbeforeunload = function() {
    window.addEventListener('DOMContentLoaded', () => {

      // window.beforeunload = function() {
      // var session_value = localStorage.getItem('pig_session')
      var session_value = sessionStorage.getItem('pig_session')

      console.log('---- this.session.value')
      console.log(session_value)

      if (session_value) {
        console.log('have session')
        console.log(this.cover)
        TweenMax.set(this.cover, { display: 'none' })
        // TweenMax.set(this.cover, { display: 'none' })
        // this.cover.style.backgroundColor = '#ffffff'
      } else {
        console.log('no session')
      }
    })
  }
}
