export default class DynamicImport {
  constructor(elem: HTMLElement) {
    setTimeout(() => {
      elem.innerHTML = 'Dynamic!'
    }, 3000)
  }
}
