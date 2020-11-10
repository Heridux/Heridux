import Rules from "./Rules"
import Rule from "./Rule"
import * as allRules from "./allRules"

export default class Dictionnary {

  static add(name, rule, reactProps) {
    Object.defineProperty(name, Dictionnary.prototype, {
      get() {
        return new Rules(rule, reactProps)
      }
    })
  }

  get any() {
    return new Rules()
  }

  get string() {
    return new Rules(allRules.type("string"))
  }

  get bool() {
    return new Rules(allRules.type("boolean"), { type : "switch" })
  }

  get array() {
    return new Rules(allRules.type("array"), { type : "select", multi : true })
  }

  get number() {
    return new Rules(allRules.type("number"), { type : "number" })
  }

  get integer() {
    return new Rules(allRules.type("integer"), { type : "integer" })
  }

  get object() {
    return new Rules(allRules.type("object"))
  }

  get plainObject() {
    return new Rules(allRules.type("plainObject"))
  }

  get id() {
    return new Rules(allRules.id)
  }

  get slug() {
    return new Rules(allRules.slug)
  }

  get email() {
    return new Rules(allRules.email)
  }

  get date() {
    return new Rules(allRules.date, { type : "date" })
  }

  alphaNum(char) {
    return new Rules(allRules.alphaNum(char))
  }

  minValue(min) {
    return new Rules(allRules.minValue(min), { type : "number" })
  }

  maxValue(max) {
    return new Rules(allRules.maxValue(max), { type : "number" })
  }

  minLength(length) {
    return new Rules(allRules.minLength(length))
  }

  maxLength(length) {
    return new Rules(allRules.maxLength(length))
  }

  regex(regex) {
    return new Rules(allRules.regex(regex))
  }

  instanceOf(Constructor) {
    return new Rules(allRules.instance(Constructor))
  }

  custom(func) {
    const rules = new Rules(func)

    rules.required = true // l'absence de données doît être gérée par la règle custom elle-même

    return rules
  }

  oneOf(values) {
    return new Rules(allRules.oneOf(values), {
      type : "select",
      options : values.map(value => ({ value, label : value }))
    })
  }

  all(rules) {
    return new Rules(rules)
  }

  shape(plainObject) {

    const rules = new Rules(allRules.type("plainObject"))

    rules.add(new Rule((value, ...rest) => {
      for (const key in plainObject) {
        plainObject[key].check(value[key], ...rest)
      }
    }))

    return rules
  }

  arrayOf(rulesObject) {

    const rules = new Rules(allRules.type("array"), { type : "select", multi : true })

    rules.add(new Rule((value, ...rest) => {
      value.forEach(valuePart => rulesObject.check(valuePart, ...rest))
    }))

    return rules
  }

}

