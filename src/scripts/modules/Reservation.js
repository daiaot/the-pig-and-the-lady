import $ from 'jquery'

export default class Reservation {

  constructor(elem) {
    this.elem = elem
    this.widget = this.elem.querySelector('#tc-widget')
    this.toggle = this.elem.querySelector('.p-reservation__btn')
    // flag
    this.showWidget = false //- ウィジェット表示状態：true（表示）／false（非表示）
    this.toggleFlg = false //- トグルクリック履歴：true（履歴あり）／false（履歴あり）
    this.location = window.location.pathname

    // 日付用デートピッカー
    // this.datePicker = this.widget.querySelector('.tc-date')
    this.datePicker
    // console.log('日付用デートピッカー')
    // console.log(this.datePicker)

    this.init()
  }

  init() {
    const ua = navigator.userAgent
    if ((this.location != '/') && (!ua.match(/(iPhone|iPad|iPod|Android)/i))) {
      // 下層ページ（PC）のとき
      this.hiddenWidget()
    }
    if (ua.match(/(iPhone|iPad|iPod|Android)/i)) {
      // SPのとき
      this.showWidget = true
    }

    // this.getDatePicker()
    this.addEvents()
  }

  getDatePicker() {

    console.log('---- getDatePicker()')
    // this.datePicker = this.elem.querySelector('#reservation_start_date')
    // console.log('---- 日付用デートピッカー取得')
    // console.log(this.datePicker)

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.datePicker = this.elem.querySelector('#reservation_start_date')
        this.pikaSingle = document.querySelectorAll('.pika-single')[0]
        console.log('---- 日付用デートピッカー取得')
        console.log(this.datePicker)

        console.log('---- ピッカー取得')
        console.log(this.pikaSingle)

        resolve()
      }, 2000)
    })

    // promise.then(() => {
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       console.log('---- 日付用デートピッカー取得')
    //       this.datePicker = this.elem.querySelector('#reservation_start_date')
    //       resolve()
    //     }, 1000)
    //   })
    // }).catch(() => { // エラーハンドリング
    //   console.error('Something wrong!')
    // })

    // return new Promise((resolve) => {
    //   setTimeout(resolve, 5000)
    //   this.datePicker = this.elem.querySelector('#reservation_start_date')
    // })
  }

  addEvents() {

    const ua = navigator.userAgent
    if (this.location === '/') {
      window.addEventListener('scroll', this.onScroll.bind(this))

      // this.toggle.addEventListener('click', e => {
      this.toggle.addEventListener('click', () => {
        // e.preventDefault()
        this.toggleClick()
      })
      // if (ua.match(/(iPhone)/i)) {
      //   console.log('---- iphone')
      //   return new Promise((resolve, reject) => {
      //     console.log('---- 日付用デートピッカー イベントリスナー')
      //     setTimeout(() => {
      //       this.datePicker.addEventListener('click', () => {
      //         this.datePickerClick()
      //         this.datePickerAfterProc()
      //       }, false)
      //       resolve()
      //     }, 2500)
      //   })
      // }
      // // this.datePicker.addEventListener('click', () => {
      // //   this.datePickerClick()
      // // })

    } else {
      this.toggle.addEventListener('click', () => {
        // e.preventDefault()
        this.toggleClick()
      })
      // if (ua.match(/(iPhone)/i)) {
      //   console.log('---- iphone')
      //   return new Promise((resolve, reject) => {
      //     console.log('---- 日付用デートピッカー イベントリスナー')
      //     setTimeout(() => {
      //       this.datePicker.addEventListener('click', () => {
      //         this.datePickerClick()
      //         this.datePickerAfterProc()
      //       }, false)
      //       resolve()
      //     }, 2500)
      //   })
      // }
    }
  }


  onScroll() {

    // let scrollTop = window.scrollY
    // console.log('---- window.scrollY')
    // console.log(window.scrollY)

    const win_top = document.body.getBoundingClientRect().top * -1
    const relativeHeight = this.elem.getBoundingClientRect().height * 3

    const ua = navigator.userAgent
    if (!ua.match(/(iPhone|iPad|iPod|Android)/i)) {

      if (this.location === '/') {

        if (win_top > relativeHeight) { //-先頭以外

          //- スクロールでウィジェットを隠す

          if (this.toggleFlg == false) {

            // トグルクリック履歴がなければイベントを発生
            TweenMax.to(this.widget, 0.01, {
              x: '101%',
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

    }

  }

  hiddenWidget() {
    TweenMax.to(this.widget, 0.01, {
      x: '101%',
      ease: Power3.easeInOut,
    })
    // ウィジェット表示フラグ
    this.showWidget = false
  }


  toggleClick() {

    //- トグルクリック履歴フラグ
    this.toggleFlg = true

    if (this.showWidget) { //- ウィジェットが表示されている

      TweenMax.to(this.widget, 0.5, {
        x: '101%',
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

  datePickerClick() {

    console.log('---- datePickerClick()')
    let scrollTop = window.scrollY
    // let scrollTop = window.document.scrollTop
    console.log('---- window.scrollY')
    console.log(scrollTop)

    const top = this.elem.getBoundingClientRect().top
    const bottom = this.elem.getBoundingClientRect().bottom
    const height = this.elem.getBoundingClientRect().height
    console.log('---- getBoundingClientRect().top')
    console.log(top)
    console.log('---- getBoundingClientRect().bottom')
    console.log(bottom)
    console.log('---- getBoundingClientRect().height')
    console.log(height)
    const pos = scrollTop + top



    // TweenMax.set(this.elem, { css: { position: 'absolute' } })
    // TweenMax.set(this.pikaSingle, { css: { top: scrollTop } })
    TweenMax.set(this.pikaSingle, { css: { top: pos } })
    // TweenMax.set(this.pikaSingle, { css: { bottom: top } })

    // TweenMax.set(this.elem, { css: { top: scrollTop } })
    // TweenMax.set(this.elem, { css: { bottom: 0 } })

  }

  datePickerAfterProc() {
    console.log('---- datePickerAfterProc()')

    // TweenMax.set(this.pikaSingle, { css: { top: '' } })
    // TweenMax.set(this.elem, { css: { position: '' } })
    // TweenMax.set(this.elem, { css: { top: '' } })


  }
}