import $ from 'jquery'
import 'slick-carousel'

export default class Slider {
  constructor(selector) {
    this.$el = $(selector)
    this.init()

    this.bindEvent()
  }

  init() {
    this.$el.slick({
      // variableWidth: true,
      arrows: false,
      autoplay: true,
      pauseOnFocus: false,
      pauseOnHover: false,
      pauseOnDotsHover: false,
      dots: false,
      slidesToScroll: 1,
      slidesToShow: 1,
      infinite: true,
      speed: 1,
      fade: true,
      touchMove: false,
      // cssEase: 'linear',
      // cssEase: 'ease',
      responsive: [
        {
          breakpoint: 768,
          settings: {
            centerPadding: '20px',
            variableWidth: false,
          },
        },
      ],
    })
  }

  bindEvent() {
    $('.p-top-about__slide').on('touchmove', function(event, slick, currentSlide, nextSlide){
      $('.p-top-about__slide').slick('slickPlay');
    });
  }
}
