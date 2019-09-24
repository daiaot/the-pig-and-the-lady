export default class LoadToTop {
  constructor(elem, opts) {
    this.elem = elem
    this.opts = opts

    this.bindEvents()
  }

  bindEvents() {
    window.onbeforeunload = function() {
      window.scrollTo(0, 0)
    }
  }
}
