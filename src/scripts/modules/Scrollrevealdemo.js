import ScrollReveal from 'scrollreveal'

export default class Scrollrevealdemo {
  constructor(elem) {
    this.elem = elem
    console.log('---- Scrollrevealdemo')
    ScrollReveal().reveal(elem)
  }
}