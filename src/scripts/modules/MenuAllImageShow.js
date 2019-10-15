import $ from 'jquery'

export default class MenuAllImageShow {

  constructor(elem) {
    this.elem = elem
    this.thumbList = document.querySelectorAll('.p-menu-item__img')
    this.showFlg = false
    this.bindEvents()
  }

  bindEvents() {
    this.elem.addEventListener('click', () => {
      if (!this.showFlg) {
        for (let i = 0; i < this.thumbList.length; i = i + 1) {
          this.thumbList[i].classList.add('is-show')
        }
        this.elem.classList.add('is-show')
        this.showFlg = true
      } else {
        for (let i = 0; i < this.thumbList.length; i = i + 1) {
          this.thumbList[i].classList.remove('is-show')
        }
        this.elem.classList.remove('is-show')
        this.showFlg = false
      }
    })
  }

}