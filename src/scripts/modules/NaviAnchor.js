import $ from 'jquery'
import { stringify } from 'querystring'

export default class NaviAnchor {
  constructor() {
    this.bindEvents()
  }

  bindEvents() {
    $('a[href^="#"]').click(function() {
      const speed = 500
      let href = $(this).attr('href')
      const target = $(href === '#' || href === '' ? 'html' : href)
      const position = target.offset().top
      $('html, body').animate({ scrollTop: position }, speed, 'swing')
      return false
    })
  }
}
