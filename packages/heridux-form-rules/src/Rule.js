export default class Rule {

  constructor(rule) {
    this.rule = rule
  }

  check(value, jsValues, props) {

    if (!this.rule) return true

    return this.rule(value, jsValues, props)
  }

}
