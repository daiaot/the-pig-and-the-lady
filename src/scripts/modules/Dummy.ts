interface IDummyOpt {
  dummy_opt?: string | boolean | number | any[]
}

interface IOpts extends IDummyOpt {
  [key: string]: any
}

/**
 * dummy class
 */
export default class Dummy {
  private elem: HTMLElement
  private opts: IOpts

  constructor(elem: HTMLElement, opts: IOpts) {
    this.elem = elem
    this.opts = opts

    this.bindEvents()

    // dynamic import
    import('./DynamicImport').then(module => new module.default(this.getElem()))
  }

  private bindEvents(): void {
    this.elem.addEventListener('click', this.handleClick.bind(this))
  }

  private handleClick(): void {
    console.log(this.getInnerHtml(this.getElem())) // "Click me!"
    console.log(this.getFirstLetter(this.getOpt('dummy_opt'))) // "d"
  }

  public getFirstLetter<T extends IOpts['dummy_opt']>(arg: T): string {
    // type guard
    if (typeof arg === 'string') {
      return arg.charAt(0)
    }

    throw new Error(`argument "${arg}" is not string!`)
  }

  public getInnerHtml = (elem: HTMLElement): string => elem.innerHTML

  public getElem = (): HTMLElement => this.elem

  public getOpt = (opt: string): string | undefined => this.opts[opt]
}
