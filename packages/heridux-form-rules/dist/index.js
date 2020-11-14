(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash/isPlainObject')) :
typeof define === 'function' && define.amd ? define(['exports', 'lodash/isPlainObject'], factory) :
(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.HeriduxFormRules = {}, global.isPlainObject));
}(this, (function (exports, isPlainObject) { 'use strict';

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var isPlainObject__default = /*#__PURE__*/_interopDefaultLegacy(isPlainObject);

class FormWarning extends Error {
  constructor(msg, properties) {
    super(msg);
    this.properties = properties;
  }

}
class FormError extends Error {
  constructor(msg, properties) {
    super(msg);
    this.properties = properties;
  }

}

const required = value => {
  if (value != null && String(value).length > 0) return true;
  throw new FormError("errorRequired");
};
const minValue = min => value => {
  if (value >= min) return true;
  throw new FormError("errorMinValue", {
    value,
    min
  });
};
const maxValue = max => value => {
  if (value <= max) return true;
  throw new FormError("errorMaxValue", {
    value,
    max
  });
};
const minLength = min => value => {
  if (value && value.length >= min) return true;
  throw new FormError("errorMinLength", {
    value,
    min
  });
};
const maxLength = max => value => {
  if (!value || value && value.length <= max) return true;
  throw new FormError("errorMaxLength", {
    value,
    max
  });
};
const type = typeName => value => {
  let test;
  if (typeName === "array") test = Array.isArray(value);else if (typeName === "plainObject") test = isPlainObject__default['default'](value);else if (typeName === "integer") test = Number.isInteger(value);else if (value === null || value === undefined) test = true;else test = typeof value === typeName;
  if (!test) throw new FormError("typeInvalid", {
    value,
    typeName
  });
  return true;
};
const instance = Construct => value => {
  if (value instanceof Construct) return true;
  throw new FormError("instanceInvalid", {
    value,
    constructor: Construct.name
  });
};
const slug = value => {
  if (/^[\w-.]+$/.test(value)) return true;
  throw new FormError("slugInvalid");
};
const email = value => {
  if (/^[\w.!#$%&’*+/=?^_`{|}~-]+@[\w-]+(?:\.[\w-]+)*$/.test(value)) return true;
  throw new FormError("emailInvalid");
};
const id = value => {
  if (value == null || typeof value === "string") return true;
  throw new FormError("idInvalid");
};
const alphaNum = (additionalChars = "") => {
  const accents = "áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ";
  const chars = additionalChars.replace(/./g, s => "\\" + s);
  const regex = new RegExp("^[\\w" + accents + chars + ". ]*$");
  return value => {
    if (regex.test(value)) return true;
    throw new FormError("errorAlphaNum", {
      additionalChars
    });
  };
};
const oneOf = values => value => {
  if (values.includes(value)) return true;
  throw new FormError("choiceInvalid", {
    values,
    value
  });
};
const regex = reg => value => {
  if (reg.test(value)) return true;
  throw new FormError("invalidRegex", {
    regex: reg.toString()
  });
};
const date = value => {
  if (isNaN(new Date(value))) throw new FormError("dateInvalid");
  return true;
};

class Rule {
  constructor(rule) {
    this.rule = rule;
  }

  check(value, jsValues, props) {
    if (!this.rule) return true;
    return this.rule(value, jsValues, props);
  }

}

/* eslint newline-before-return:0, max-params:0 */
class Rules {
  constructor(rules = [], reactProps = null) {
    const rulesArray = Array.isArray(rules) ? rules : [rules];
    this.rules = rulesArray.map(rule => {
      return rule instanceof Rule || rule instanceof Rules ? rule : new Rule(rule);
    });
    this.required = false;
    this.reactProps = reactProps;
  }

  get isRequired() {
    this.rules.unshift(new Rule(required));
    this.required = true;
    return this;
  }

  check(value, jsValues, props) {
    this.rules.forEach(rule => {
      if (value != null && value !== "" || this.required) rule.check(value, jsValues, props);
    });
  }

  add(rule) {
    this.rules.push(rule);
  }

}

class Dictionnary {
  static add(name, rule, reactProps) {
    Object.defineProperty(name, Dictionnary.prototype, {
      get() {
        return new Rules(rule, reactProps);
      }

    });
  }

  get any() {
    return new Rules();
  }

  get string() {
    return new Rules(type("string"));
  }

  get bool() {
    return new Rules(type("boolean"), {
      type: "switch"
    });
  }

  get array() {
    return new Rules(type("array"), {
      type: "select",
      multi: true
    });
  }

  get number() {
    return new Rules(type("number"), {
      type: "number"
    });
  }

  get integer() {
    return new Rules(type("integer"), {
      type: "integer"
    });
  }

  get object() {
    return new Rules(type("object"));
  }

  get plainObject() {
    return new Rules(type("plainObject"));
  }

  get id() {
    return new Rules(id);
  }

  get slug() {
    return new Rules(slug);
  }

  get email() {
    return new Rules(email);
  }

  get date() {
    return new Rules(date, {
      type: "date"
    });
  }

  alphaNum(char) {
    return new Rules(alphaNum(char));
  }

  minValue(min) {
    return new Rules(minValue(min), {
      type: "number"
    });
  }

  maxValue(max) {
    return new Rules(maxValue(max), {
      type: "number"
    });
  }

  minLength(length) {
    return new Rules(minLength(length));
  }

  maxLength(length) {
    return new Rules(maxLength(length));
  }

  regex(regex$1) {
    return new Rules(regex(regex$1));
  }

  instanceOf(Constructor) {
    return new Rules(instance(Constructor));
  }

  custom(func) {
    const rules = new Rules(func);
    rules.required = true; // l'absence de données doît être gérée par la règle custom elle-même

    return rules;
  }

  oneOf(values) {
    return new Rules(oneOf(values), {
      type: "select",
      options: values.map(value => ({
        value,
        label: value
      }))
    });
  }

  all(rules) {
    return new Rules(rules);
  }

  shape(plainObject) {
    const rules = new Rules(type("plainObject"));
    rules.add(new Rule((value, ...rest) => {
      for (const key in plainObject) {
        plainObject[key].check(value[key], ...rest);
      }
    }));
    return rules;
  }

  arrayOf(rulesObject) {
    const rules = new Rules(type("array"), {
      type: "select",
      multi: true
    });
    rules.add(new Rule((value, ...rest) => {
      value.forEach(valuePart => rulesObject.check(valuePart, ...rest));
    }));
    return rules;
  }

}

var index = new Dictionnary();

exports.Dictionnary = Dictionnary;
exports.FormError = FormError;
exports.FormWarning = FormWarning;
exports.Rule = Rule;
exports.Rules = Rules;
exports.alphaNum = alphaNum;
exports.date = date;
exports.default = index;
exports.email = email;
exports.id = id;
exports.instance = instance;
exports.maxLength = maxLength;
exports.maxValue = maxValue;
exports.minLength = minLength;
exports.minValue = minValue;
exports.oneOf = oneOf;
exports.regex = regex;
exports.required = required;
exports.slug = slug;
exports.type = type;

Object.defineProperty(exports, '__esModule', { value: true });

})));
