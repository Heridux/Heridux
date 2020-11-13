(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@babel/runtime/helpers/classCallCheck'), require('@babel/runtime/helpers/createClass'), require('@babel/runtime/helpers/typeof'), require('lodash/isPlainObject'), require('@babel/runtime/helpers/inherits'), require('@babel/runtime/helpers/possibleConstructorReturn'), require('@babel/runtime/helpers/getPrototypeOf'), require('@babel/runtime/helpers/wrapNativeSuper')) :
typeof define === 'function' && define.amd ? define(['exports', '@babel/runtime/helpers/classCallCheck', '@babel/runtime/helpers/createClass', '@babel/runtime/helpers/typeof', 'lodash/isPlainObject', '@babel/runtime/helpers/inherits', '@babel/runtime/helpers/possibleConstructorReturn', '@babel/runtime/helpers/getPrototypeOf', '@babel/runtime/helpers/wrapNativeSuper'], factory) :
(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.HeriduxFormRules = {}, global._classCallCheck, global._createClass, global._typeof, global.isPlainObject, global._inherits, global._possibleConstructorReturn, global._getPrototypeOf, global._wrapNativeSuper));
}(this, (function (exports, _classCallCheck, _createClass, _typeof, isPlainObject, _inherits, _possibleConstructorReturn, _getPrototypeOf, _wrapNativeSuper) { 'use strict';

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _typeof__default = /*#__PURE__*/_interopDefaultLegacy(_typeof);
var isPlainObject__default = /*#__PURE__*/_interopDefaultLegacy(isPlainObject);
var _inherits__default = /*#__PURE__*/_interopDefaultLegacy(_inherits);
var _possibleConstructorReturn__default = /*#__PURE__*/_interopDefaultLegacy(_possibleConstructorReturn);
var _getPrototypeOf__default = /*#__PURE__*/_interopDefaultLegacy(_getPrototypeOf);
var _wrapNativeSuper__default = /*#__PURE__*/_interopDefaultLegacy(_wrapNativeSuper);

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf__default['default'](Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf__default['default'](this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn__default['default'](this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var FormWarning = /*#__PURE__*/function (_Error) {
  _inherits__default['default'](FormWarning, _Error);

  var _super = _createSuper(FormWarning);

  function FormWarning(msg, properties) {
    var _this;

    _classCallCheck__default['default'](this, FormWarning);

    _this = _super.call(this, msg);
    _this.properties = properties;
    return _this;
  }

  return FormWarning;
}( /*#__PURE__*/_wrapNativeSuper__default['default'](Error));
var FormError = /*#__PURE__*/function (_Error2) {
  _inherits__default['default'](FormError, _Error2);

  var _super2 = _createSuper(FormError);

  function FormError(msg, properties) {
    var _this2;

    _classCallCheck__default['default'](this, FormError);

    _this2 = _super2.call(this, msg);
    _this2.properties = properties;
    return _this2;
  }

  return FormError;
}( /*#__PURE__*/_wrapNativeSuper__default['default'](Error));

var required = function required(value) {
  if (value != null && String(value).length > 0) return true;
  throw new FormError("errorRequired");
};
var minValue = function minValue(min) {
  return function (value) {
    if (value >= min) return true;
    throw new FormError("errorMinValue", {
      value: value,
      min: min
    });
  };
};
var maxValue = function maxValue(max) {
  return function (value) {
    if (value <= max) return true;
    throw new FormError("errorMaxValue", {
      value: value,
      max: max
    });
  };
};
var minLength = function minLength(min) {
  return function (value) {
    if (value && value.length >= min) return true;
    throw new FormError("errorMinLength", {
      value: value,
      min: min
    });
  };
};
var maxLength = function maxLength(max) {
  return function (value) {
    if (!value || value && value.length <= max) return true;
    throw new FormError("errorMaxLength", {
      value: value,
      max: max
    });
  };
};
var type = function type(typeName) {
  return function (value) {
    var test;
    if (typeName === "array") test = Array.isArray(value);else if (typeName === "plainObject") test = isPlainObject__default['default'](value);else if (typeName === "integer") test = Number.isInteger(value);else if (value === null || value === undefined) test = true;else test = _typeof__default['default'](value) === typeName;
    if (!test) throw new FormError("typeInvalid", {
      value: value,
      typeName: typeName
    });
    return true;
  };
};
var instance = function instance(Construct) {
  return function (value) {
    if (value instanceof Construct) return true;
    throw new FormError("instanceInvalid", {
      value: value,
      constructor: Construct.name
    });
  };
};
var slug = function slug(value) {
  if (/^[\w-.]+$/.test(value)) return true;
  throw new FormError("slugInvalid");
};
var email = function email(value) {
  if (/^[\w.!#$%&’*+/=?^_`{|}~-]+@[\w-]+(?:\.[\w-]+)*$/.test(value)) return true;
  throw new FormError("emailInvalid");
};
var id = function id(value) {
  if (value == null || typeof value === "string") return true;
  throw new FormError("idInvalid");
};
var alphaNum = function alphaNum() {
  var additionalChars = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var accents = "áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ";
  var chars = additionalChars.replace(/./g, function (s) {
    return "\\" + s;
  });
  var regex = new RegExp("^[\\w" + accents + chars + ". ]*$");
  return function (value) {
    if (regex.test(value)) return true;
    throw new FormError("errorAlphaNum", {
      additionalChars: additionalChars
    });
  };
};
var oneOf = function oneOf(values) {
  return function (value) {
    if (values.includes(value)) return true;
    throw new FormError("choiceInvalid", {
      values: values,
      value: value
    });
  };
};
var regex = function regex(reg) {
  return function (value) {
    if (reg.test(value)) return true;
    throw new FormError("invalidRegex", {
      regex: reg.toString()
    });
  };
};
var date = function date(value) {
  if (isNaN(new Date(value))) throw new FormError("dateInvalid");
  return true;
};

var Rule = /*#__PURE__*/function () {
  function Rule(rule) {
    _classCallCheck__default['default'](this, Rule);

    this.rule = rule;
  }

  _createClass__default['default'](Rule, [{
    key: "check",
    value: function check(value, jsValues, props) {
      if (!this.rule) return true;
      return this.rule(value, jsValues, props);
    }
  }]);

  return Rule;
}();

var Rules = /*#__PURE__*/function () {
  function Rules() {
    var rules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var reactProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck__default['default'](this, Rules);

    var rulesArray = Array.isArray(rules) ? rules : [rules];
    this.rules = rulesArray.map(function (rule) {
      return rule instanceof Rule || rule instanceof Rules ? rule : new Rule(rule);
    });
    this.required = false;
    this.reactProps = reactProps;
  }

  _createClass__default['default'](Rules, [{
    key: "check",
    value: function check(value, jsValues, props) {
      var _this = this;

      this.rules.forEach(function (rule) {
        if (value != null && value !== "" || _this.required) rule.check(value, jsValues, props);
      });
    }
  }, {
    key: "add",
    value: function add(rule) {
      this.rules.push(rule);
    }
  }, {
    key: "isRequired",
    get: function get() {
      this.rules.unshift(new Rule(required));
      this.required = true;
      return this;
    }
  }]);

  return Rules;
}();

var Dictionnary = /*#__PURE__*/function () {
  function Dictionnary() {
    _classCallCheck__default['default'](this, Dictionnary);
  }

  _createClass__default['default'](Dictionnary, [{
    key: "alphaNum",
    value: function alphaNum$1(_char) {
      return new Rules(alphaNum(_char));
    }
  }, {
    key: "minValue",
    value: function minValue$1(min) {
      return new Rules(minValue(min), {
        type: "number"
      });
    }
  }, {
    key: "maxValue",
    value: function maxValue$1(max) {
      return new Rules(maxValue(max), {
        type: "number"
      });
    }
  }, {
    key: "minLength",
    value: function minLength$1(length) {
      return new Rules(minLength(length));
    }
  }, {
    key: "maxLength",
    value: function maxLength$1(length) {
      return new Rules(maxLength(length));
    }
  }, {
    key: "regex",
    value: function regex$1(_regex) {
      return new Rules(regex(_regex));
    }
  }, {
    key: "instanceOf",
    value: function instanceOf(Constructor) {
      return new Rules(instance(Constructor));
    }
  }, {
    key: "custom",
    value: function custom(func) {
      var rules = new Rules(func);
      rules.required = true; // l'absence de données doît être gérée par la règle custom elle-même

      return rules;
    }
  }, {
    key: "oneOf",
    value: function oneOf$1(values) {
      return new Rules(oneOf(values), {
        type: "select",
        options: values.map(function (value) {
          return {
            value: value,
            label: value
          };
        })
      });
    }
  }, {
    key: "all",
    value: function all(rules) {
      return new Rules(rules);
    }
  }, {
    key: "shape",
    value: function shape(plainObject) {
      var rules = new Rules(type("plainObject"));
      rules.add(new Rule(function (value) {
        for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          rest[_key - 1] = arguments[_key];
        }

        for (var key in plainObject) {
          var _plainObject$key;

          (_plainObject$key = plainObject[key]).check.apply(_plainObject$key, [value[key]].concat(rest));
        }
      }));
      return rules;
    }
  }, {
    key: "arrayOf",
    value: function arrayOf(rulesObject) {
      var rules = new Rules(type("array"), {
        type: "select",
        multi: true
      });
      rules.add(new Rule(function (value) {
        for (var _len2 = arguments.length, rest = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          rest[_key2 - 1] = arguments[_key2];
        }

        value.forEach(function (valuePart) {
          return rulesObject.check.apply(rulesObject, [valuePart].concat(rest));
        });
      }));
      return rules;
    }
  }, {
    key: "any",
    get: function get() {
      return new Rules();
    }
  }, {
    key: "string",
    get: function get() {
      return new Rules(type("string"));
    }
  }, {
    key: "bool",
    get: function get() {
      return new Rules(type("boolean"), {
        type: "switch"
      });
    }
  }, {
    key: "array",
    get: function get() {
      return new Rules(type("array"), {
        type: "select",
        multi: true
      });
    }
  }, {
    key: "number",
    get: function get() {
      return new Rules(type("number"), {
        type: "number"
      });
    }
  }, {
    key: "integer",
    get: function get() {
      return new Rules(type("integer"), {
        type: "integer"
      });
    }
  }, {
    key: "object",
    get: function get() {
      return new Rules(type("object"));
    }
  }, {
    key: "plainObject",
    get: function get() {
      return new Rules(type("plainObject"));
    }
  }, {
    key: "id",
    get: function get() {
      return new Rules(id);
    }
  }, {
    key: "slug",
    get: function get() {
      return new Rules(slug);
    }
  }, {
    key: "email",
    get: function get() {
      return new Rules(email);
    }
  }, {
    key: "date",
    get: function get() {
      return new Rules(date, {
        type: "date"
      });
    }
  }], [{
    key: "add",
    value: function add(name, rule, reactProps) {
      Object.defineProperty(name, Dictionnary.prototype, {
        get: function get() {
          return new Rules(rule, reactProps);
        }
      });
    }
  }]);

  return Dictionnary;
}();

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
