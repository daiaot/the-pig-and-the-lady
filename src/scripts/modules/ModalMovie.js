
import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper'

export default class ModalMovie {
  constructor(elem) {
    this.elem = elem
    this.init()
  }

  init() {
    // const modal = $('#js-galleryModal')
    // const modalClose = $('#js-galleryModalClose')
    // const modalOverlay = $('#js-galleryModalOverlay')

    const modal = $('#js-movie-modal')
    const modalClose = $('#js-movie-modalClose')
    const modalOverlay = $('#js-movie-modalOverlay')
    const open = 'is-open'

    // swiper
    // const modalSwiper = new Swiper('#js-galleryModalSwiper', {
    const modalSwiper = new Swiper('#js-movie-modalSwiper', {
      // loop: true,
      // spaceBetween: 30,
      simulateTouch: false,
      // noSwiping: true,
    })

    // modalを開く対象の指定
    // $('.gallery-content__item a').on('click', function(e) {
    $('.p-about-story__movie').on('click', function(e) {
      e.preventDefault()

      const slideNum = $(this).data('slide')
      // console.log('slideNum : ' + slideNum)
      // console.log(slideNum)
      modalSwiper.slideTo(slideNum, 0)
      if (!modal.hasClass(open)) {
        modal.css('visibility', 'visible').addClass(open)
        $('html').css('overflow', 'hidden')
      }
      // console.log('modalSwiper : ' + modalSwiper.realIndex);
    })

    // 以下非表示系
    modalClose.on('click', function() {
      modal.css('visibility', 'hidden').removeClass(open)
      $('html').css('overflow', 'visible')
    })

    modalOverlay.on('click', function() {
      modal.css('visibility', 'hidden').removeClass(open)
      $('html').css('overflow', 'visible')
    })
  }
}
