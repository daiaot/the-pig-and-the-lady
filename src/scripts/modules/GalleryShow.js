
import $ from 'jquery'
import Swiper from 'swiper'

export default class GalleryShow {
  constructor(elem) {
    this.elem = elem
    this.init()
  }

  init() {
    const modal = $('#js-galleryModal')
    const modalClose = $('#js-galleryModalClose')
    const modalOverlay = $('#js-galleryModalOverlay')
    const open = 'is-open'

    // swiper
    const modalSwiper = new Swiper('#js-galleryModalSwiper', {
      loop: true,
      navigation: {
        nextEl: '#js-swiper-button-next',
        prevEl: '#js-swiper-button-prev',
      },
      pagination: {
        el: '#js-swiper-numbers',
        type: 'fraction',
      },
      spaceBetween: 30,
      watchActiveIndex: true,
    })

    // modalを開く対象の指定
    // $('.gallery-content__item a').on('click', function(e) {
    $('.gallery-content__item').on('click', function(e) {
      e.preventDefault()

      const slideNum = $(this).data('slide')
      modalSwiper.slideTo(slideNum, 0)

      if (!modal.hasClass(open)) {
        modal.css('visibility', 'visible').addClass(open)
        $('html').css('overflow', 'hidden')
      }
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
