const EventEmitter = require('events').EventEmitter

const emit = new class Emit {
  constructor() {
    this.ev = new EventEmitter()
  }
}()

export default emit
