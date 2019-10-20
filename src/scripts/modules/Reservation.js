import $ from 'jquery'

export default class Reservation {

  constructor(elem) {
    this.elem = elem
    this.widget = this.elem.querySelector('#tc-widget')
    this.toggle = this.elem.querySelector('.p-reservation__btn')
    // flag
    this.showWidget = false //- ウィジェット表示状態：true（表示）／false（非表示）
    this.toggleFlg = false //- トグルクリック履歴：true（履歴あり）／false（履歴あり）

    this.init()
  }

  init() {
    this.addEvents()
  }


  addEvents() {
    window.addEventListener('scroll', this.onScroll.bind(this))
    // this.toggle.addEventListener('click', e => {
    this.toggle.addEventListener('click', () => {
      // e.preventDefault()
      this.toggleClick()
    })
  }


  onScroll() {

    const win_top = document.body.getBoundingClientRect().top * -1
    const relativeHeight = this.elem.getBoundingClientRect().height * 3

    if (win_top > relativeHeight) { //-先頭以外

      //- スクロールでウィジェットを隠す

      if(this.toggleFlg == false) {

        // トグルクリック履歴がなければイベントを発生
        TweenMax.to(this.widget, 0.01, {
          x: '100%',
          ease: Power3.easeInOut,
        })
        // ウィジェット表示フラグ
        this.showWidget = false
      }

    } else if (win_top < relativeHeight) {  //-先頭

      TweenMax.to(this.widget, 0.01, {
        x: '0%',
        ease: Power3.easeInOut,
      })
      // ウィジェット表示フラグ
      this.showWidget = true
      // トグルクリック履歴フラグをリセット
      this.toggleFlg = false

    }
  }


  toggleClick() {

    //- トグルクリック履歴フラグ
    this.toggleFlg = true

    if (this.showWidget) { //- ウィジェットが表示されている

      TweenMax.to(this.widget, 0.5, {
        x: '100%',
        ease: Power3.easeInOut,
      })
      this.showWidget = false

    } else if (!this.showWidget) { //- ウィジェットが表示されていない

      TweenMax.to(this.widget, 0.5, {
        x: '0%',
        ease: Power3.easeInOut,
      })
      this.showWidget = true
    }

    return false

  }
}