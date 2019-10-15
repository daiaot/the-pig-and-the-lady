
import $ from 'jquery'

export default class MenuImageShow {

  constructor(elem) {

    this.elem = elem
    this.thumbArea = document.querySelector('#menu-thumb')
    this.target = this.elem.getAttribute('data-image')
    this.caption = this.elem.getAttribute('data-caption')

    // SPの処理
    this.thumb = this.elem.querySelector('.p-menu-item__img')
    this.showFlg = false

    this.bindEvents()
  }

  bindEvents() {

    const ua = navigator.userAgent

    if (ua.match(/(iPhone|iPad|iPod|Android)/i)) {
      this.elem.addEventListener('click', () => {
        if (!this.showFlg) {
          this.thumb.classList.add('is-show')
          this.showFlg = true
        } else {
          this.thumb.classList.remove('is-show')
          this.showFlg = false
        }
      })
    } else {
      this.elem.addEventListener('mouseover', () => {
        if (this.target) {
          let addImage = document.createElement('img')
          addImage.setAttribute('src', this.target)
          addImage.setAttribute('alt', this.caption)
          this.thumbArea.appendChild(addImage)
        }
      })
        this.elem.addEventListener('mouseout', () => {
        this.thumbArea.textContent = null
      })
    }

  }

}