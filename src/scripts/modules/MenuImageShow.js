
import $ from 'jquery'

export default class MenuImageShow {

  constructor(elem) {

    // console.log('-- MenuImageShow Module')

    this.elem = elem
    document.querySelector('#nav-toggle')
    this.thumbArea = document.querySelector('#menu-thumb')
    // console.log('-- this.thumbArea')
    // console.log(this.thumbArea)

    this.target = this.elem.getAttribute('data-image')
    this.caption = this.elem.getAttribute('data-caption')

    // console.log('-- this.target')
    // console.log(this.target)


    // SPの処理
    this.thumb = this.elem.querySelector('.p-menu-item__img')
    // console.log('-- this.thumb')
    // console.log(this.thumb)
    this.showFlg = false

    this.bindEvents()
  }

  bindEvents() {

    // console.log('-- MenuImageShow bindEvents()')

    const ua = navigator.userAgent

    if (ua.match(/(iPhone|iPad|iPod|Android)/i)) {
      // console.log('-------- SP')

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
        // console.log('--- onmouseover')
        if (this.target) {
          // let addImage = document.createElement('div')
          // addImage.innerHTML = `
          // <img src="${this.target}" alt="">
          // `
          let addImage = document.createElement('img')
          addImage.setAttribute('src', this.target)
          addImage.setAttribute('alt', this.caption)
  
          // console.log('---- addImage')
          // console.log(addImage)
          this.thumbArea.appendChild(addImage)
        }
      })
        this.elem.addEventListener('mouseout', () => {
        // console.log('--- onmouseover')
        this.thumbArea.textContent = null
      })
  
    }


  }

}