import $ from 'jquery'
import 'slick-carousel'

export default class Slider {
  constructor(selector) {
    this.$el = $(selector)
    this.init()
  }

  init() {
    let prevArrow = '<div class="slick-prev"></div>'
    let nextArrow = '<div class="slick-next"></div>'
    this.$el.slick({
      variableWidth: true,
      autoplay: false,
      dots: false,
      slidesToScroll: 1,
      slidesToShow: 1,
      infinite: false,
      prevArrow: `${prevArrow}`,
      nextArrow: `${nextArrow}`,
      responsive: [
        {
          breakpoint: 795,
          settings: {
            centerPadding: '20px',
            variableWidth: false,
          },
        },
      ],
    })
  }
}
