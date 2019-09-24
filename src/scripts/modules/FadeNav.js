import ScrollReveal from 'scrollreveal'

export default class FadeNav {

  constructor(elem, opts="") {
    this.elem = elem
    this.opts = opts

    var navBar = {
      origin: 'left',
      opacity: 0,
      duration: '500',
      distance: '100%',
      viewFactor: '0.4',
      mobile: 'false'
    }
    var navLogo = {
      origin: 'left',
      opacity: 0,
      duration: '1000',
      distance: '0',
      viewFactor: '0.4',
      delay: '500',
      mobile: 'false'
    }
    var navMenu = {
      origin: 'left',
      opacity: 0,
      duration: '1500',
      distance: '0',
      viewFactor: '0.4',
      delay: '1500',
      mobile: 'false'
    }
    var navDefault = {
      origin: 'left'
    }

    switch(this.opts.opts) {
      case 'navBar':
        ScrollReveal().reveal(elem, navBar)
        break;
      case 'navLogo':
      ScrollReveal().reveal(elem, navLogo)
        break;
      case 'navMenu':
        ScrollReveal().reveal(elem, navMenu)
        break;
      default:
        console.log('---- default')
        ScrollReveal().reveal(elem, navDefault)
        break;
    }


  }
}