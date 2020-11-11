
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('../../../node_modules/lodash/isPlainObject.js')) :
  typeof define === 'function' && define.amd ? define(['exports', '../../../node_modules/lodash/isPlainObject.js'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.version = {}, global.isPlainObject));
}(this, (function (exports, isPlainObject) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var isPlainObject__default = /*#__PURE__*/_interopDefaultLegacy(isPlainObject);

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  var FormWarning = /*#__PURE__*/function (_Error) {
    _inherits(FormWarning, _Error);

    var _super = _createSuper(FormWarning);

    function FormWarning(msg, properties) {
      var _this;

      _classCallCheck(this, FormWarning);

      _this = _super.call(this, msg);
      _this.properties = properties;
      return _this;
    }

    return FormWarning;
  }( /*#__PURE__*/_wrapNativeSuper(Error));
  var FormError = /*#__PURE__*/function (_Error2) {
    _inherits(FormError, _Error2);

    var _super2 = _createSuper(FormError);

    function FormError(msg, properties) {
      var _this2;

      _classCallCheck(this, FormError);

      _this2 = _super2.call(this, msg);
      _this2.properties = properties;
      return _this2;
    }

    return FormError;
  }( /*#__PURE__*/_wrapNativeSuper(Error));

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
      if (typeName === "array") test = Array.isArray(value);else if (typeName === "plainObject") test = isPlainObject__default['default'](value);else if (typeName === "integer") test = Number.isInteger(value);else if (value === null || value === undefined) test = true;else test = _typeof(value) === typeName;
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
      _classCallCheck(this, Rule);

      this.rule = rule;
    }

    _createClass(Rule, [{
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

      _classCallCheck(this, Rules);

      var rulesArray = Array.isArray(rules) ? rules : [rules];
      this.rules = rulesArray.map(function (rule) {
        return rule instanceof Rule || rule instanceof Rules ? rule : new Rule(rule);
      });
      this.required = false;
      this.reactProps = reactProps;
    }

    _createClass(Rules, [{
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
      _classCallCheck(this, Dictionnary);
    }

    _createClass(Dictionnary, [{
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
