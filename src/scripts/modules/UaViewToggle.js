export default class UaViewToggle {
  constructor(elem) {
    /* ieかedgeの時に描画処理
    -------------------------------------*/
    this.init(elem);
  }
  init(elem) {
    const ua = navigator.userAgent
    if (ua.match(/(msie|edge|trident)/i)) {
      elem.style.display = "block"
    } else {
      elem.style.display = "none"
    }
  }
}