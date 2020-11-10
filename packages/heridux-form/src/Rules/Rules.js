/* eslint newline-before-return:0, max-params:0 */

import * as allRules from "./allRules"
import Rule from "./Rule"

export default class Rules {

  constructor(rules = [], reactProps = null) {

    const rulesArray = Array.isArray(rules) ? rules : [rules]

    this.rules = rulesArray.map(rule => {
      return (rule instanceof Rule || rule instanceof Rules) ? rule : new Rule(rule)
    })

    this.required = false
    this.reactProps = reactProps
  }

  get isRequired() {
    this.rules.unshift(new Rule(allRules.required))
    this.required = true
    return this
  }

  check(value, jsValues, props) {
    this.rules.forEach(rule => {
      if ((value != null && value !== "") || this.required) rule.check(value, jsValues, props)
    })
  }

  add(rule) {
    this.rules.push(rule)
  }

}

