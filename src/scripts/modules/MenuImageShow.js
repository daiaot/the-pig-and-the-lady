
import $ from 'jquery'

export default class MenuImageShow {

  constructor(elem) {

    this.elem = elem
    this.thumbBody = document.querySelector('.p-menu-thumb')

    this.thumbArea = document.querySelector('#menu-thumb')
    this.target = this.elem.getAttribute('data-image')
    this.caption = this.elem.getAttribute('data-caption')
    this.jpCaption = this.elem.getAttribute('data-jp-caption')

    // SPの処理
    this.thumb = this.elem.querySelector('.p-menu-item__img')
    this.showFlg = false

    this.bindEvents()
  }

  bindEvents() {

    const ua = navigator.userAgent

    // if (ua.match(/(iPhone|iPad|iPod|Android)/i)) {
    if (ua.match(/(iPhone|iPod|Android)/i)) {

      //- sp時のクリックでの表示・非表示切り替えをいったんとめる

      // this.elem.addEventListener('click', () => {
      //   if (!this.showFlg) {
      //     this.thumb.classList.add('is-show')
      //     this.showFlg = true
      //   } else {
      //     this.thumb.classList.remove('is-show')
      //     this.showFlg = false
      //   }
      // })
    } else {
        // this.elem.addEventListener('click', () => {
        this.elem.addEventListener('mouseover', () => {
          if (this.target) {
            let addImage = document.createElement('img')
            addImage.setAttribute('src', this.target)
            addImage.setAttribute('alt', this.caption)

            let addCaption = document.createElement('p')
            addCaption.classList.add('p-menu-thumb__name')
            addCaption.innerHTML = this.caption

            let addJpCaption = document.createElement('p')
            addJpCaption.classList.add('p-menu-thumb__name--jp')
            addJpCaption.innerHTML = this.jpCaption

            this.thumbArea.appendChild(addImage)
            this.thumbArea.appendChild(addCaption)
            this.thumbArea.appendChild(addJpCaption)
            // this.thumbBody.appendChild(addCaption)
            // this.thumbBody.appendChild(addJpCaption)

          }
      })
      this.elem.addEventListener('mouseout', () => {
        this.thumbArea.textContent = null
        // this.thumbBody.textContent = null
        // this.thumbBody.removeChild(p)
      })
    }

  }

}