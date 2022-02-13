class Option {
  constructor() {
    this.options = global.TOMSOPTIONS || {}
  }

  set(value) {
    this.options = value
    global.TOMSOPTIONS = value
    return this
  }

  get() {
    return this.options
  }
}

module.exports = {
  Option
}
