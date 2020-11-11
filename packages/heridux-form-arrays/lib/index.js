
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('../../../node_modules/immutable/dist/immutable.es.js'), require('../../../node_modules/lodash/isPlainObject.js'), require('../../../node_modules/lodash/isEqual.js'), require('../../../node_modules/redux/es/redux.js'), require('../../../node_modules/react/index.js'), require('@heridux/form/utils')) :
  typeof define === 'function' && define.amd ? define(['exports', '../../../node_modules/immutable/dist/immutable.es.js', '../../../node_modules/lodash/isPlainObject.js', '../../../node_modules/lodash/isEqual.js', '../../../node_modules/redux/es/redux.js', '../../../node_modules/react/index.js', '@heridux/form/utils'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.version = {}, global.immutable_es_js, global.isPlainObject, global.isEqual, global.redux_js, null, global.utils));
}(this, (function (exports, immutable_es_js, isPlainObject, isEqual, redux_js, index_js, utils) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var isPlainObject__default = /*#__PURE__*/_interopDefaultLegacy(isPlainObject);
  var isEqual__default = /*#__PURE__*/_interopDefaultLegacy(isEqual);

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

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
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

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
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

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;

    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = o[Symbol.iterator]();
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  /**
   * Creation of Heridux store
   * @class
   */

  var Heridux = /*#__PURE__*/function () {
    _createClass(Heridux, null, [{
      key: "createReduxStore",
      value: function createReduxStore(reducer, preloadedState, enhancer) {
        var DEVTOOLS = window.__REDUX_DEVTOOLS_EXTENSION__;

        reducer = reducer || function () {
          var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          return state;
        };

        Heridux.reduxStore = redux_js.createStore(reducer, preloadedState, enhancer || (DEVTOOLS === null || DEVTOOLS === void 0 ? void 0 : DEVTOOLS()));
        Heridux.reduxReducers = reducer;
      }
    }, {
      key: "connect",
      value: function connect(store, initialReducers) {
        Heridux.reduxStore = store;
        Heridux.reduxReducers = initialReducers;
      }
      /**
       * Constructor
       * @param {String} STATE_PROPERTY string name for this slice of state. Generated actions wille use this as a prefix.
       */

    }]);

    function Heridux(STATE_PROPERTY) {
      var _this = this;

      _classCallCheck(this, Heridux);

      _defineProperty(this, "_reducer", function (state, _ref) {
        var action = _extends({}, _ref);

        var currentState = state || _this.initialState;
        var func = _this._reducers[action.type];
        delete action.type;

        if (action._type) {
          action.type = action._type;
          delete action._type;
        }

        return func ? func(currentState, action) : currentState;
      });

      this.initialState = {};
      this.STATE_PROPERTY = STATE_PROPERTY;
      this._actions = {};
      this._reducers = {};

      this._createGenericActions();
    }
    /**
     * Create generic action to set simple values in the store without creating named actions
     * @private
     * @returns {undefined}
     */


    _createClass(Heridux, [{
      key: "_createGenericActions",
      value: function _createGenericActions() {
        // in some classes inheriting from Heridux, createAction is overloaded
        // we therefore make sure to take the original
        var createAction = Heridux.prototype.createAction;
        createAction.call(this, "set", function (state, _ref2) {
          var prop = _ref2.prop,
              value = _ref2.value;
          return state.set(prop, immutable_es_js.fromJS(value));
        });
      }
      /**
       * Set a first level value without creating a specific action
       * @param {String} prop property name
       * @param {any} value property value
       * @returns {undefined}
       */

    }, {
      key: "set",
      value: function set(prop, value) {
        return this.execAction("set", {
          prop: prop,
          value: value
        });
      }
      /**
       * Get full action name with prefix + SCREAMING_SNAKE_CASE action name
       * @private
       * @example
       * const myStore = new Heridux("myPartialStore")
       * myStore._getFullActionName("myAction")
       * // returns "myPartialStore/MY_ACTION"
       * @param {String} shortName action name defined in createAction
       * @return {String} full name
       */

    }, {
      key: "_getFullActionName",
      value: function _getFullActionName(shortName) {
        return this.STATE_PROPERTY + "/" + shortName.replace(/[A-Z]/g, function (s) {
          return "_" + s;
        }).toUpperCase();
      }
      /**
       * Get short action name
       * @private
       * @example
       * const myStore = new Heridux("MON_STORE_PARTIEL")
       * myStore._getShortActionName("MON_STORE_PARTIEL/MY_ACTION")
       * // returns "myAction"
       * @param {String} fullName nom complet de l'action
       * @return {String} short name
       */

    }, {
      key: "_getShortActionName",
      value: function _getShortActionName(fullName) {
        return fullName.replace(new RegExp("^" + this.STATE_PROPERTY + "/"), "").toLowerCase().replace(/_([a-z])/g, function (s, s1) {
          return s1.toUpperCase();
        });
      }
      /**
       * Get original redux store object
       * @private
       * @return {Object} redux store
       */

    }, {
      key: "_getReduxStore",
      value: function _getReduxStore() {
        var reduxStore = Heridux.reduxStore;
        if (!reduxStore) throw new Error("Redux store has not been defined as reduxStore key of Heridux");
        return reduxStore;
      }
      /**
       * Get store slice
       * @param {Immutable.Map} [state] global state (if not specified, call getState method of redux store)
       * @return {Immutable.Map} store slice
       */

    }, {
      key: "getState",
      value: function getState(state) {
        var fullState = (state || this._getReduxStore().getState())[this.STATE_PROPERTY];

        if (fullState) return fullState;else {
          console.warn("key ".concat(this.STATE_PROPERTY, " not found in redux store. You may forgot to register heridux store"));
          /* if store is not registered yet, returns the initial state */

          return this.initialState;
        }
      }
      /**
       * Get js value of a first level key
       * @param {String} key key name
       * @param {Immutable.Map} [state] global state (if not specified, call getState method of redux store)
       * @return {*} key value (converted in plain js if immutable)
       */

    }, {
      key: "get",
      value: function get(key, state) {
        var _value$toJS, _value$toJS2;

        var value = this.getState(state).get(key);
        return (_value$toJS = value === null || value === void 0 ? void 0 : (_value$toJS2 = value.toJS) === null || _value$toJS2 === void 0 ? void 0 : _value$toJS2.call(value)) !== null && _value$toJS !== void 0 ? _value$toJS : value;
      }
      /**
       * Get js value of a nested key
       * @example
       * const store = new Heridux("myPartialStore")
       * store.setInitialState({
       *  list : [{ name : "foo"}, { name : "bar" }]
       * })
       * store.getIn(["list", 0, "name"]) // foo
       * @param {Array} path Iterable key path (more details in Immutable.js documentation)
       * @param {Immutable.Map} [state] global state (if not specified, call getState method of redux store)
       * @return {*} key value (converted in plain js if immutable)
       * @see {@link https://immutable-js.github.io/immutable-js/}
       */

    }, {
      key: "getIn",
      value: function getIn(path, state) {
        var value = this.getState(state).getIn(path);
        return value && value.toJS ? value.toJS() : value;
      }
      /**
       * Get action from short name action
       * @private
       * @param {String} name action short name
       * @return {Function} redux action
       */

    }, {
      key: "_getAction",
      value: function _getAction(name) {
        return this._actions[this._getFullActionName(name)];
      }
      /**
       * Define the initial state of the store slice. It will automatically be converted to immutable.
       * @param {Object} state plain js state
       * @return {undefined}
       */

    }, {
      key: "setInitialState",
      value: function setInitialState(state) {
        this.initialState = immutable_es_js.fromJS(state);
      }
      /**
       * Create action/reducer couple
       * @example
       * const myStore = new Heridux("myPartialStore")
       *
       * myStore.setInitialState({
       *  list : ["foo", "bar"]
       * })
       *
       * myStore.createAction("pop", state => state.update("list", arr => arr.pop())
       *
       * myStore.execAction("pop")
       *
       * myStore.get("list") //  ["foo"]
       * @param {String} name action short name
       * @param {Function} reducer function to modify the state
       * @return {undefined}
       */

    }, {
      key: "createAction",
      value: function createAction(name, reducer) {
        var actionName = this._getFullActionName(name);

        this._actions[actionName] = function (args) {
          var payload = {};

          if (args) {
            var type = args.type,
                rest = _objectWithoutProperties(args, ["type"]);

            payload = _objectSpread2({}, rest);
            if (type) payload._type = type;
          }

          return _objectSpread2({
            type: actionName
          }, payload);
        };

        this._reducers[actionName] = reducer;
      }
      /**
       * Execute action registered by createAction method
       * @param {String} name action short name
       * @param {Object} options additional parameters
       * @return {undefined}
       * @see createAction
       */

    }, {
      key: "execAction",
      value: function execAction(name, options) {
        var func = this._getAction(name);

        if (!func) throw new Error(name + " : unknown action on store " + this.STATE_PROPERTY);
        return this.dispatch(func(options));
      }
      /**
       * reducer function
       * @private
       * @param {*} state state slice
       * @param {*} params action parameters
       * @returns {undefined}
       */

    }, {
      key: "_isReduxRegistered",

      /**
       * Test if store has been registered in redux global store
       * @private
       * @returns {Boolean} true if store is registered
       */
      value: function _isReduxRegistered() {
        try {
          var state = this._getReduxStore().getState() || {};
          return Boolean(state[this.STATE_PROPERTY]);
        } catch (e) {
          return false;
        }
      }
      /**
       * Register heridux store in global redux store
       * @return {undefined}
       */

    }, {
      key: "register",
      value: function register() {
        if (this._isReduxRegistered()) {
          console.warn("key ".concat(this.STATE_PROPERTY, " already exists in global store\n      if this is due to hot reload, maybe you should reload your page entirely"));
        } else {
          var newReducers = _objectSpread2(_objectSpread2({}, Heridux.reduxReducers), {}, _defineProperty({}, this.STATE_PROPERTY, this._reducer));

          var reduxStore = this._getReduxStore();

          reduxStore.replaceReducer(redux_js.combineReducers(newReducers));
          Heridux.reduxReducers = newReducers;
          if (Heridux.onRegister) Heridux.onRegister(newReducers);
        }
      }
      /**
       * dispatch any action on global redux store
       * @param {Object|Function} action redux action
       * @return {undefined|Promise} promise if async
       */

    }, {
      key: "dispatch",
      value: function dispatch(action) {
        return this._getReduxStore().dispatch(action);
      }
    }, {
      key: "subscribe",
      value: function subscribe(callback) {
        return this._getReduxStore().subscribe(callback);
      }
    }]);

    return Heridux;
  }();

  _defineProperty(Heridux, "reduxStore", null);

  _defineProperty(Heridux, "reduxReducers", null);

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

  new Dictionnary();

  function normalizeKey(path) {
    if (path == null) {
      throw new Error("path is undefined. You may forgot the formKey property on your Control component ?");
    }

    return Array.isArray(path) ? _toConsumableArray(path) : path.split(".");
  }
  function getKeyValue(obj, key) {
    return obj && key.length ? getKeyValue(obj[key[0]], key.slice(1)) : obj;
  }
  function setKeyValue(obj, key, value) {
    if (!Array.isArray(key)) throw new Error("key must be an Array");
    if (key.length === 0) throw new Error("key is empty.");
    if (key.length === 1) return obj[key] = value;
    if (obj[key[0]] == null) obj[key[0]] = typeof key[1] === "number" ? [] : {};
    return setKeyValue(obj[key[0]], key.slice(1), value);
  }
  /**
   * Compare le nouveau formulaire à l'ancien et incrémente les propriétés changesCount et touched
   * s'il y a eu une modification
   * @param {Immutable.Map} oldState état avant la modification
   * @param {Immutable.Map} newState état après la modification
   * @returns {Immutable.Map} état avec la propriété changesCount et touched à jour
   */

  function stateWithChanges(oldState, newState) {
    var hasFormChange = !oldState.get("form").equals(newState.get("form"));

    if (hasFormChange) {
      return newState.merge({
        touched: true,
        changesCount: newState.get("changesCount") + 1
      });
    } else return oldState;
  }

  /**
   * Gestion des formulaires avec Heridux
   * @extends Heridux
   */

  var HeriduxForm = /*#__PURE__*/function (_Heridux) {
    _inherits(HeriduxForm, _Heridux);

    var _super = _createSuper(HeriduxForm);

    function HeriduxForm(STATE_PROPERTY) {
      var _this;

      _classCallCheck(this, HeriduxForm);

      _this = _super.call(this, STATE_PROPERTY);
      var initialState = {
        form: {},
        error: null,
        touched: false,
        changesCount: 0
      };

      _this.setInitialState(initialState);

      _this.initialFormDefinition = null;
      _this.validationRules = {};

      _this.createAction("destroyForm", function (state) {
        return state.merge(immutable_es_js.fromJS(initialState));
      });

      _this.createAction("redefineForm", function (state, _ref) {
        var form = _ref.form;
        return state.merge(immutable_es_js.fromJS(_objectSpread2(_objectSpread2({}, initialState), {}, {
          form: form
        })));
      });

      _this.createAction("setFieldValue", function (state, _ref2) {
        var path = _ref2.path,
            value = _ref2.value;
        var key = ["form"].concat(_toConsumableArray(path));
        var field = state.getIn(key);
        if (!field) throw new Error("No field registered at path " + _this._stringifyPath(path));
        if (isEqual__default['default'](value, field.get("value"))) return state;
        var initialValue = field.get("initialValue");
        var hasChanged = !isEqual__default['default'](value, initialValue);
        var newState = state.mergeIn(key, {
          value: value && _typeof(value) === "object" ? immutable_es_js.fromJS(value) : value,
          error: null,
          warning: null,
          touched: hasChanged
        });
        if (hasChanged) newState = newState.set("touched", true);else newState = newState.set("touched", _this.isFormTouched(newState));
        return newState.set("changesCount", newState.get("changesCount") + 1);
      });

      _this.createAction("initFieldValue", function (state, _ref3) {
        var path = _ref3.path,
            value = _ref3.value;
        var field = state.getIn(["form"].concat(_toConsumableArray(path)));
        if (field.get("value") === value && field.get("initialValue") === value) return state;
        var newState = state.mergeIn(["form"].concat(_toConsumableArray(path)), {
          initialValue: value,
          value: value,
          error: null,
          warning: null,
          touched: false
        });
        return newState.merge({
          touched: _this.isFormTouched(newState),
          changesCount: state.get("changesCount") + 1
        });
      });

      _this.createAction("removeFields", function (state, _ref4) {
        var path = _ref4.path;
        return stateWithChanges(state, state.deleteIn(["form"].concat(_toConsumableArray(path))));
      });

      _this.createAction("addFields", function (state, _ref5) {
        var path = _ref5.path,
            fields = _ref5.fields;

        var mapFields = _this._processForm(fields, path);

        var newState = state.mergeDeepIn(["form"], immutable_es_js.fromJS(mapFields));
        return stateWithChanges(state, newState);
      });

      _this.createAction("cancelFieldValue", function (state, _ref6) {
        var path = _ref6.path;
        var field = state.getIn(["form"].concat(_toConsumableArray(path)));
        var initialValue = field.get("initialValue");
        if (field.get("value") === initialValue) return state;
        var newState = state.mergeIn(["form"].concat(_toConsumableArray(path)), {
          value: initialValue,
          error: null,
          warning: null,
          touched: false
        });
        return newState.merge({
          touched: _this.isFormTouched(newState),
          changesCount: state.get("changesCount") + 1
        });
      });

      _this.createAction("initFormValues", function (state, _ref7) {
        var values = _ref7.values,
            _ref7$path = _ref7.path,
            path = _ref7$path === void 0 ? [] : _ref7$path;

        // si certaines valeurs sont des objets, le mergeDeepIn va parcourir la valeur et ne mettre à jour
        // qu'une partie de la valeur. Donc avant on met à null les valeurs qui vont être modifiées.
        var emptyValues = _this.mapFields(function () {
          return {
            value: null,
            initialValue: null
          };
        }, state, values, path);

        var newValues = _this.mapFields(function (value) {
          return {
            value: value,
            initialValue: value,
            error: null,
            warning: null,
            touched: false
          };
        }, state, values, path);

        var newState = stateWithChanges(state, state.mergeDeepIn(["form"].concat(_toConsumableArray(path)), emptyValues).mergeDeepIn(["form"].concat(_toConsumableArray(path)), newValues));
        return path ? newState : newState.set("touched", false);
      });

      _this.createAction("resetFormValues", function (state, _ref8) {
        var _ref8$path = _ref8.path,
            path = _ref8$path === void 0 ? [] : _ref8$path;

        // réinitialisation des valeurs
        var newValues = _this.mapFields(function () {
          return {
            value: null,
            initialValue: null,
            error: null,
            warning: null,
            touched: false
          };
        }, state, null, path);

        var newState = stateWithChanges(state, state.mergeDeepIn(["form"].concat(_toConsumableArray(path)), newValues));
        return (path === null || path === void 0 ? void 0 : path.length) ? newState : newState.merge({
          touched: false,
          error: null
        });
      });

      _this.createAction("cancelFormValues", function (state, _ref9) {
        var _ref9$path = _ref9.path,
            path = _ref9$path === void 0 ? [] : _ref9$path;

        var emptyValues = _this.mapFields(function () {
          return {
            value: null
          };
        }, state, null, path);

        var newValues = _this.mapFields(function (field) {
          return {
            value: field.initialValue,
            error: null,
            warning: null,
            touched: false
          };
        }, state, null, path);

        var newState = stateWithChanges(state, state.mergeDeepIn(["form"].concat(_toConsumableArray(path)), emptyValues).mergeDeepIn(["form"].concat(_toConsumableArray(path)), newValues));
        return (path === null || path === void 0 ? void 0 : path.length) ? newState : newState.merge({
          touched: false,
          error: null
        });
      });

      _this.createAction("setFormValues", function (state, _ref10) {
        var values = _ref10.values,
            _ref10$path = _ref10.path,
            path = _ref10$path === void 0 ? [] : _ref10$path;

        var emptyValues = _this.mapFields(function () {
          return {
            value: null
          };
        }, state, values, path);

        var newValues = _this.mapFields(function (value, key) {
          return {
            value: value,
            error: null,
            warning: null,
            touched: state.getIn([].concat(_toConsumableArray(key), ["initialValue"])) !== value
          };
        }, state, values, path);

        var newState = state.mergeDeepIn(["form"].concat(_toConsumableArray(path)), emptyValues).mergeDeepIn(["form"].concat(_toConsumableArray(path)), newValues);
        return stateWithChanges(state, newState).set("touched", _this.isFormTouched(newState));
      });

      _this.createAction("setFieldWarning", function (state, _ref11) {
        var path = _ref11.path,
            message = _ref11.message,
            properties = _ref11.properties;
        return state.mergeDeepIn(["form"].concat(_toConsumableArray(path)), {
          warning: {
            message: message,
            properties: properties
          },
          touched: true
        });
      });

      _this.createAction("setFieldError", function (state, _ref12) {
        var path = _ref12.path,
            message = _ref12.message,
            properties = _ref12.properties;
        return state.mergeDeepIn(["form"].concat(_toConsumableArray(path)), {
          error: {
            message: message,
            properties: properties
          },
          touched: true
        });
      });

      _this.createAction("setGlobalError", function (state, _ref13) {
        var error = _ref13.error;
        return state.set("error", error);
      });

      return _this;
    }

    _createClass(HeriduxForm, [{
      key: "_stringifyPath",
      value: function _stringifyPath(path) {
        return "[" + path.join(", ") + "]";
      }
      /**
       * Récupération des règles de validation d'un champ du formulaire
       * @param {Array} path clé d'accès au champ
       * @returns {Rules} l'objet contenant les règles de validation
       */

    }, {
      key: "getValidationRules",
      value: function getValidationRules(path) {
        return getKeyValue(this.validationRules, path);
      }
      /**
       * Renvoie un objet composé des résultats d'une fonction de rappel exécutée sur chaque champ de formulaire
       * @param {Function} callback fonction à exécuter sur chaque champ de formulaire
       * @param {Object} _state state à utiliser si disponible
       * @param {Object} _values valeurs sur lesquelles itérer si ce ne sont pas celles du formulaire dans le store
       * @param {Array} _path valeur interne de la clé
       * @returns {Object} objet résultat
       */

    }, {
      key: "mapFields",
      value: function mapFields(callback, _state, _values) {
        var _this2 = this;

        var _path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

        var state = _state || this.getState();

        var path = normalizeKey(_path);

        var values = _values || state.getIn(["form"].concat(_toConsumableArray(path)));

        if (immutable_es_js.Iterable.isIterable(values)) values = values.toJS();
        var isArray = Array.isArray(values);
        var map = isArray ? [] : {};

        var processField = function processField(value, n) {
          var newKey = [].concat(_toConsumableArray(path), [n]);

          if (_this2.isField(newKey)) {
            return callback(value, newKey);
          } else if (Array.isArray(value) || isPlainObject__default['default'](value)) {
            return _this2.mapFields(callback, state, value, newKey);
          } else {
            // pour éviter de confondre ce cas avec celui ou callback renvoie null
            throw new Error("unexpected value");
          }
        };

        if (isArray) {
          values.forEach(function (value, i) {
            try {
              map.push(processField(value, i));
            } catch (e) {}
          });
        } else if (isPlainObject__default['default'](values)) {
          for (var n in values) {
            try {
              map[n] = processField(values[n], n);
            } catch (e) {}
          }
        } else if (values) {
          throw new Error(_typeof(values) + " : type incorrect for values iteration");
        } else {
          console.warn("values is a falsy value", values, path);
        }

        return map;
      }
    }, {
      key: "isField",
      value: function isField(path) {
        return this.getValidationRules(path) instanceof Rules;
      }
      /**
       * Vérification de la validité de la valeur d'un champ
       * @param {Object} params objet contenant les clés suivantes :
       * key : position du champ dans le formulaire ;
       * value : valeur du champ ;
       * values : autres valeurs du formulaire (en cas de champs dépendants les uns des autres) ;
       * @returns {undefined}
       * @throws {FormError|FormWarning} en cas de non validité
       */

    }, {
      key: "checkFieldValue",
      value: function checkFieldValue(_ref14) {
        var key = _ref14.key,
            value = _ref14.value,
            values = _ref14.values;
        var rules = this.getValidationRules(key);
        if (!rules) return;

        if (!(rules instanceof Rules)) {
          var msg = "rules must be an instance of Rules class";
          console.error(msg, rules);
          throw new Error(msg);
        }

        try {
          rules.check(value, values, {
            key: key
          });
        } catch (e) {
          if (e instanceof FormWarning) {
            this.setFieldWarning(key, e.message, e.properties);
          } else {
            this.setFieldError(key, e.message, e.properties);
          }

          throw e;
        }
      }
      /**
       * Vérification du formulaire
       * @param {Object} formValues valeurs à vérifier si ce ne sont pas celles du store
       * @returns {Boolean} true si tous les champs sont corrects, false sinon
       */

    }, {
      key: "checkForm",
      value: function checkForm() {
        var _this3 = this;

        var formValues = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var state = this.getState();
        var values = formValues || state.get("form").toJS();
        var valid = true;

        var callback = function callback(field, key) {
          var _field$error;

          if ((_field$error = field.error) === null || _field$error === void 0 ? void 0 : _field$error.message) valid = false;else {
            try {
              _this3.checkFieldValue({
                key: key,
                value: field.value,
                values: values
              });
            } catch (e) {
              valid = false;
            }
          }
        };

        this.mapFields(callback, state, values);
        return valid;
      }
      /**
       * Initialisation du formulaire. Les champs non déclarés seront ignorés
       * @param {Object} values valeurs d'initialisation
       * @returns {undefined}
       */

    }, {
      key: "initFormValues",
      value: function initFormValues(values) {
        return this.execAction("initFormValues", {
          values: values
        });
      }
      /**
       * Initialisation d'une partie du formulaire. Les champs non déclarés seront ignorés
       * @param {Array} path point d'entrée
       * @param {Object} values valeurs d'initialisation
       * @returns {undefined}
       */

    }, {
      key: "initFormValuesIn",
      value: function initFormValuesIn(path, values) {
        return this.execAction("initFormValues", {
          values: values,
          path: path && normalizeKey(path)
        });
      }
      /**
       * Annulation des modifications (retour aux valeurs initiales définies par la méthode initFormValues)
       * @returns {undefined}
       */

    }, {
      key: "cancelFormValues",
      value: function cancelFormValues() {
        return this.execAction("cancelFormValues");
      }
      /**
       * Annulation des modifications d'une partie du formulaure
       * (retour aux valeurs initiales définies par la méthode initFormValues)
       * @param {Array} path point d'entrée
       * @returns {undefined}
       */

    }, {
      key: "cancelFormValuesIn",
      value: function cancelFormValuesIn(path) {
        return this.execAction("cancelFormValues", {
          path: path && normalizeKey(path)
        });
      }
      /**
       * Réinitialisation des valeurs du formulaires (toutes fixées à null)
       * @returns {undefined}
       */

    }, {
      key: "resetFormValues",
      value: function resetFormValues() {
        return this.execAction("resetFormValues");
      }
      /**
       * Réinitialisation d'une partie des valeurs du formulaires (toutes fixées à null)
       * @param {Array} path point d'entrée
       * @returns {undefined}
       */

    }, {
      key: "resetFormValuesIn",
      value: function resetFormValuesIn(path) {
        return this.execAction("resetFormValues", {
          path: path && normalizeKey(path)
        });
      }
      /**
       * Ajout dynamique de champs dans le formulaire (postérieur à la méthode defineForm)
       * @param {Array|String} path chemin où insérer les nouveaux champs
       * @param {Object} fields objet dont les clés sont les noms des champs et les valeurs les règles
       * de validation
       * @returns {undefined}
       */

    }, {
      key: "addFields",
      value: function addFields(path, fields) {
        if (isPlainObject__default['default'](path) && fields == null) {
          return this.execAction("addFields", {
            path: [],
            fields: path
          });
        } else {
          return this.execAction("addFields", {
            path: path ? normalizeKey(path) : [],
            fields: fields
          });
        }
      }
      /**
       * Suppression dynamique de champs de formulaire
       * @param {Array|String} path chemin ou supprimer les champs
       * @returns {undefined}
       */

    }, {
      key: "removeFields",
      value: function removeFields(path) {
        return this.execAction("removeFields", {
          path: normalizeKey(path)
        });
      }
      /**
       * Attribution d'une valeur à un champ
       * @param {Array|String} path chemin du champ
       * @param {*} value valeur du champ
       * @returns {undefined}
       */

    }, {
      key: "setFieldValue",
      value: function setFieldValue(path, value) {
        var key = normalizeKey(path);
        this.execAction("setFieldValue", {
          path: key,
          value: value
        });

        try {
          this.checkFieldValue({
            key: key,
            value: value,
            values: this.get("form")
          });
        } catch (e) {}
      }
      /**
       * Initialisation d'un champ
       * @param {Array|String} path chemin du champ
       * @param {*} value valeur du champ
       * @returns {undefined}
       */

    }, {
      key: "initFieldValue",
      value: function initFieldValue(path, value) {
        return this.execAction("initFieldValue", {
          path: normalizeKey(path),
          value: value
        });
      }
      /**
       * Annulation des modifications d'un champ (retour à la valeur initiale)
       * @param {Array|String} path chemin du champ
       * @returns {undefined}
       */

    }, {
      key: "cancelFieldValue",
      value: function cancelFieldValue(path) {
        return this.execAction("cancelFieldValue", {
          path: normalizeKey(path)
        });
      }
      /**
       * Définition d'un message d'avetissement
       * @param {Array|String} path chemin du champ
       * @param {String} message contenu du message
       * @param {Object} properties propriétés supplémentaires liées à l'erreur
       * @returns {undefined}
       */

    }, {
      key: "setFieldWarning",
      value: function setFieldWarning(path, message, properties) {
        return this.execAction("setFieldWarning", {
          path: normalizeKey(path),
          message: message,
          properties: properties
        });
      }
      /**
       * Définition d'un message d'erreur
       * @param {Array|String} path chemin du champ
       * @param {String} message contenu du message
       * @param {Object} properties propriétés supplémentaires liées à l'erreur
       * @returns {undefined}
       */

    }, {
      key: "setFieldError",
      value: function setFieldError(path, message, properties) {
        return this.execAction("setFieldError", {
          path: normalizeKey(path),
          message: message,
          properties: properties
        });
      }
      /**
       * Définition d'une erreur globale sur le formulaire
       * @param {String} error contenu de l'erreur
       * @returns {undefined}
       */

    }, {
      key: "setGlobalError",
      value: function setGlobalError(error) {
        return this.execAction("setGlobalError", {
          error: error
        });
      }
      /**
       * Teste si le formulaire a été modifié
       * @param {Immutable.Map} state optionnel état du store si on l'a sous la main
       * @returns {Boolean} true si le formulaire a été modifié, false sinon
       */

    }, {
      key: "isFormTouched",
      value: function isFormTouched(state) {
        var touched = false;
        this.mapFields(function (field) {
          if (field.touched) touched = true;
        }, state);
        return touched;
      }
      /**
       * Teste si le formulaire contient des erreurs. Attention, il ne lance pas les validations
       * mais se contente de vérifier si des erreurs ont été levées.
       * @param {Immutable.Map} state optionnel état du store si on l'a sous la main
       * @returns {Boolean} true si le formulaire contient des erreurs, false sinon
       */

    }, {
      key: "isFormValid",
      value: function isFormValid(state) {
        var valid = true;
        this.mapFields(function (field) {
          if (field.error) valid = false;
        }, state);
        return valid;
      }
      /**
       * Récupère l'ensemble des erreurs du formulaire sous forme de tableau
       * @param {Immutable.Map} state optionnel état du store si on l'a sous la main
       * @returns {Array} tableau des erreurs
       */

    }, {
      key: "getFormErrors",
      value: function getFormErrors(state) {
        var fieldErrors = [];
        this.mapFields(function (field, key) {
          if (field.error) {
            fieldErrors.push({
              key: key,
              error: field.error.message
            });
          }
        }, state);
        return fieldErrors;
      }
      /**
       * Attribue les valeurs au formulaire. Attention, les validations ne sont pas
       * lancées car certaines peuvent être interdépendantes (si besoin exécuter la
       * méthode checkForm ensuite)
       * @param {Object} values objet contenant les valeurs
       * @returns {undefined}
       */

    }, {
      key: "setFormValues",
      value: function setFormValues(values) {
        return this.execAction("setFormValues", {
          values: values
        });
      }
      /**
       * Attribue des valeurs au formulaire. Attention, les validations ne sont pas
       * lancées car certaines peuvent être interdépendantes (si besoin exécuter la
       * méthode checkForm ensuite)
       * @param {Array} path optionnel, point d'entrée si on ne veut affecter qu'une partie du formulaire
       * @param {Object} values objet contenant les valeurs
       * @returns {undefined}
       */

    }, {
      key: "setFormValuesIn",
      value: function setFormValuesIn(path, values) {
        return this.execAction("setFormValues", {
          values: values,
          path: path && normalizeKey(path)
        });
      }
      /**
       * Récupère l'ensemble des valeurs du formulaire
       * @param {Immutable.Map} state optionnel état du store si on l'a sous la main
       * @returns {Object} objet décrivant les valeurs
       */

    }, {
      key: "getFormValues",
      value: function getFormValues(state) {
        return this.mapFields(function (field) {
          return field.value;
        }, state);
      }
      /**
       * Récupère une partie des valeurs du formulaire
       * @param {Array} path optionnel, point d'entrée si on ne veut récupérer qu'une partie du formulaire
       * @param {Immutable.Map} state optionnel état du store si on l'a sous la main
       * @returns {Object} objet décrivant les valeurs
       */

    }, {
      key: "getFormValuesIn",
      value: function getFormValuesIn(path, state) {
        return this.mapFields(function (field) {
          return field.value;
        }, state, null, path && normalizeKey(path));
      }
    }, {
      key: "_getFieldProp",
      value: function _getFieldProp(path, prop, state) {
        var store = this.getState(state);
        var value = store.getIn(["form"].concat(_toConsumableArray(normalizeKey(path)), [prop]));
        return value && value.toJS ? value.toJS() : value;
      }
      /**
       * Récupération de la valeur d'un champ
       * @param {Array|String} path chemin du champ
       * @param {Immutable.Map} state optionnel état du store si on l'a sous la main
       * @returns {*} valeur du champ
       */

    }, {
      key: "getFieldValue",
      value: function getFieldValue(path, state) {
        return this._getFieldProp(path, "value", state);
      }
      /**
       * Récupération du message d'avertissement d'un champ
       * @param {Array|String} path chemin du champ
       * @param {Immutable.Map} state optionnel état du store si on l'a sous la main
       * @returns {String} message d'avertissement du champ
       */

    }, {
      key: "getFieldWarning",
      value: function getFieldWarning(path, state) {
        var warning = this._getFieldProp(path, "warning", state);

        return (warning === null || warning === void 0 ? void 0 : warning.message) ? warning : null;
      }
      /**
       * Récupération du message d'erreur d'un champ
       * @param {Array|String} path chemin du champ
       * @param {Immutable.Map} state optionnel état du store si on l'a sous la main
       * @returns {String} message d'erreur du champ
       */

    }, {
      key: "getFieldError",
      value: function getFieldError(path, state) {
        var error = this._getFieldProp(path, "error", state);

        return (error === null || error === void 0 ? void 0 : error.message) ? error : null;
      }
      /**
       * Teste si un champ a été modifié
       * @param {Array|String} path chemin du champ
       * @param {Immutable.Map} state optionnel état du store si on l'a sous la main
       * @returns {Boolean} true si le champ a été modifié
       */

    }, {
      key: "isFieldTouched",
      value: function isFieldTouched(path, state) {
        return this._getFieldProp(path, "touched", state);
      }
      /**
       * Définit la structure du formulaire
       * @param {Object} fields objet décrivant le formulaire (nom des champs en clé, objet Rules en valeur)
       * @returns {undefined}
       */

    }, {
      key: "defineForm",
      value: function defineForm(fields) {
        this.validationRules = {};

        var form = this._processForm(fields);

        if (this.initialFormDefinition) this.execAction("redefineForm", {
          form: form
        });else this.setInitialState(_objectSpread2(_objectSpread2({}, this.initialState.toJS()), {}, {
          form: form
        }));
        this.initialFormDefinition = form;
      }
      /**
       * Réinitialise complètement la structure du formulaire
       * @returns {undefined}
       */

    }, {
      key: "destroyForm",
      value: function destroyForm() {
        return this.execAction("destroyForm");
      }
      /**
       * Définit les règles de validation pour un champ donné
       * @param {Array|String} path chemin du champ
       * @param {Rules} rules objet de validation
       * @returns {undefined}
       */

    }, {
      key: "defineFieldRules",
      value: function defineFieldRules(path, rules) {
        setKeyValue(this.validationRules, path, rules && rules instanceof Rules ? rules : new Rules());
      }
    }, {
      key: "_processForm",
      value: function _processForm(fields) {
        var _this4 = this;

        var initialKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var form = {};

        var processForm = function processForm(field) {
          var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

          if (isPlainObject__default['default'](field)) {
            var hasKey = false;

            for (var n in field) {
              hasKey = true;
              processForm(field[n], [].concat(_toConsumableArray(key), [n]));
            }

            if (!hasKey) setKeyValue(form, key, {});
          } else if (Array.isArray(field)) {
            if (!field.length) setKeyValue(form, key, []);

            for (var i = 0; i < field.length; i++) {
              processForm(field[i], [].concat(_toConsumableArray(key), [i]));
            }
          } else {
            _this4.defineFieldRules(key, field);

            setKeyValue(form, key, {
              value: null,
              initialValue: null,
              error: null,
              warning: null,
              touched: false
            });
          }
        };

        processForm(fields, initialKey);
        return form;
      }
      /**
       * Lance les validations du formulaire et renvoie les valeurs s'il n'y a pas d'erreur.
       * Une erreur est jetée dans le cas contraire
       * @returns {Object} objet contenant les valeurs
       * @throws jète une erreur si des champs ne sont pas valides
       */

    }, {
      key: "submitForm",
      value: function submitForm() {
        var test = this.checkForm();

        if (!test) {
          var error = new Error("form error");
          error.errors = this.getFormErrors();
          throw error;
        }

        return this.getFormValues();
      }
    }, {
      key: "templateDriven",
      set: function set(bool) {
        this._templateDriven = Boolean(bool);
      },
      get: function get() {
        return Boolean(this._templateDriven);
      }
    }]);

    return HeriduxForm;
  }(Heridux);

  /**
   * Constructeur de champs de type tableau
   * @param {Object} obj objet décrivant un élément du tableau
   * @returns {FormArray} instance
   */

  function FormArray(obj) {
    if (!(this instanceof FormArray)) return new FormArray(obj); // permet d'instancier sans new

    Array.call(this);
    this.structure = obj;
  }
  FormArray.prototype = Object.create(Array.prototype);
  /**
   * Gestion des tableaux de formulaire avec Heridux
   * @extends HeriduxForm
   */

  var FormStore = /*#__PURE__*/function (_Store) {
    _inherits(FormStore, _Store);

    var _super = _createSuper(FormStore);

    function FormStore(STATE_PROPERTY) {
      var _this;

      _classCallCheck(this, FormStore);

      _this = _super.call(this, STATE_PROPERTY);

      _this.createAction("formArrayAdd", function (state, _ref) {
        var path = _ref.path,
            index = _ref.index;
        var key = utils.normalizeKey(path);
        var fields = _this.getValidationRules([].concat(_toConsumableArray(key), [index])) || {};

        if (!fields) {
          throw new Error("FormArray has not been defined at path ".concat(_this._stringifyPath(key)));
        }

        var newFields = _this._processForm(fields, [].concat(_toConsumableArray(key), [index]), true); // on doit respecter la structure complète


        newFields = utils.findKey(newFields, [].concat(_toConsumableArray(key), [index])); // mais seule la nouvelle clé nous intéresse

        var newState = state.updateIn(["form"].concat(_toConsumableArray(key)), function (arr) {
          return arr ? arr.insert(index, immutable_es_js.fromJS(newFields)) : immutable_es_js.List([immutable_es_js.fromJS(newFields)]);
        });
        return utils.stateWithChanges(state, newState);
      });

      _this.createAction("formArrayRemove", function (state, _ref2) {
        var path = _ref2.path,
            index = _ref2.index;
        var key = utils.normalizeKey(path);

        var list = _this._getList(state, key);

        var ind = index == null ? list.size - 1 : index;
        return utils.stateWithChanges(state, state.deleteIn(["form"].concat(_toConsumableArray(key), [ind])));
      });

      _this.createAction("formArrayMove", function (state, _ref3) {
        var path = _ref3.path,
            oldIndex = _ref3.oldIndex,
            newIndex = _ref3.newIndex;
        var key = utils.normalizeKey(path);

        var list = _this._getList(state, key);

        var field = list.get(oldIndex);
        var newState = state.deleteIn(["form"].concat(_toConsumableArray(key), [oldIndex])).updateIn(["form"].concat(_toConsumableArray(key)), function (arr) {
          return arr.insert(newIndex, field);
        });
        return utils.stateWithChanges(state, newState);
      });

      _this.createAction("formArrayReset", function (state, _ref4) {
        var path = _ref4.path;
        var key = utils.normalizeKey(path);
        var newState = state.setIn(["form"].concat(_toConsumableArray(key)), immutable_es_js.List());
        return utils.stateWithChanges(state, newState);
      });

      var originalResetFormValues = _this._reducers[_this._getFullActionName("resetFormValues")];

      _this.createAction("resetFormValues", function (state, _ref5) {
        var _ref5$path = _ref5.path,
            path = _ref5$path === void 0 ? [] : _ref5$path;

        var newState = _this._resetAffectedFormArrays(state, {
          path: path
        });

        return originalResetFormValues(newState, {
          path: path
        });
      });

      var originalSetFormValues = _this._reducers[_this._getFullActionName("setFormValues")];

      _this.createAction("setFormValues", function (state, _ref6) {
        var values = _ref6.values,
            _ref6$path = _ref6.path,
            path = _ref6$path === void 0 ? [] : _ref6$path;

        var newState = _this._resetAffectedFormArrays(state, {
          values: values,
          path: path
        });

        return originalSetFormValues(newState, {
          values: values,
          path: path
        });
      });

      var originalInitFormValues = _this._reducers[_this._getFullActionName("initFormValues")];

      _this.createAction("initFormValues", function (state, _ref7) {
        var values = _ref7.values,
            _ref7$path = _ref7.path,
            path = _ref7$path === void 0 ? [] : _ref7$path;

        var newState = _this._resetAffectedFormArrays(state, {
          values: values,
          path: path
        });

        return originalInitFormValues(newState, {
          values: values,
          path: path
        });
      });

      return _this;
    }

    _createClass(FormStore, [{
      key: "_resetAffectedFormArrays",
      value: function _resetAffectedFormArrays(state, _ref8) {
        var _this2 = this;

        var _values = _ref8.values,
            _ref8$path = _ref8.path,
            path = _ref8$path === void 0 ? [] : _ref8$path;
        var newState = state;

        var values = _values || this.getFormValuesIn(path, state);

        if (this.isField(path)) return newState;

        if (Array.isArray(values)) {
          if (this._isFormArray(path)) {
            var list = newState.getIn(["form"].concat(_toConsumableArray(path)));
            if (list) newState = newState.setIn(["form"].concat(_toConsumableArray(path)), immutable_es_js.List());
          } else {
            values.forEach(function (value, i) {
              newState = _this2._resetAffectedFormArrays(newState, {
                values: value,
                path: [].concat(_toConsumableArray(path), [i])
              });
            });
          }
        } else if (isPlainObject__default['default'](values)) {
          for (var n in values) {
            newState = this._resetAffectedFormArrays(newState, {
              values: values[n],
              path: [].concat(_toConsumableArray(path), [n])
            });
          }
        }

        return newState;
      }
    }, {
      key: "_getList",
      value: function _getList(state, path) {
        if (!this._isFormArray(path)) {
          throw new Error("field at key ".concat(this._stringifyPath(path), " is not a FormArray"));
        }

        return state.getIn(["form"].concat(_toConsumableArray(path)));
      }
    }, {
      key: "_isFormArray",
      value: function _isFormArray(path) {
        return this.getValidationRules(path) instanceof FormArray;
      }
    }, {
      key: "_getFormArrays",
      value: function _getFormArrays(_state, _obj) {
        var _path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

        var state = _state || this.getState();

        var path = utils.normalizeKey(_path);

        var obj = _obj || state.getIn(["form"].concat(_toConsumableArray(path)));

        var formArrays = [];
        if (this._isFormArray(path)) formArrays.push(path);

        var _iterator = _createForOfIteratorHelper(obj.entries()),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _step$value = _slicedToArray(_step.value, 2),
                key = _step$value[0],
                value = _step$value[1];

            var searchKey = [].concat(_toConsumableArray(path), [key]);
            var rules = this.getValidationRules(searchKey);
            if (rules instanceof FormArray) formArrays.push(searchKey);

            if (value instanceof immutable_es_js.Map || value instanceof immutable_es_js.List) {
              formArrays.push.apply(formArrays, _toConsumableArray(this._getFormArrays(state, value, searchKey)));
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        return formArrays;
      }
      /**
       * Définit la structure des éléments du tableau si on ne l'a pas fait dans defineForm
       * @param {String|Array} path chemin du tableau de formulaire
       * @param {Object} itemDefinition description de la structure des éléments du tableau
       * @returns {undefined}
       */

    }, {
      key: "formArrayDef",
      value: function formArrayDef(path, itemDefinition) {
        /* mode strict (pas de redéfinition possible)
         const rules = this.getValidationRules([...path, 0])
         if (rules) throw new Error(`FormArray has already been defined at path ${this._stringifyPath(path)}`)*/
        return this._processForm(new FormArray(itemDefinition), utils.normalizeKey(path));
      }
      /**
       * Ajoute un élément au tableau
       * @param {String|Array} path chemin du tableau de formulaire
       * @param {Number} ind indice où ajouter l'élément (à la fin par défaut)
       * @returns {Number} l'indice où a été ajouté l'élément
       */

    }, {
      key: "formArrayAdd",
      value: function formArrayAdd(path, ind) {
        var index = ind;

        if (index == null) {
          var key = utils.normalizeKey(path);

          var list = this._getList(this.getState(), key);

          index = (list === null || list === void 0 ? void 0 : list.size) || 0;
        }

        this.execAction("formArrayAdd", {
          path: path,
          index: index
        });
        return index;
      }
      /**
       * Supprime un élément du tableau
       * @param {String|Array} path chemin du tableau de formulaire
       * @param {Number} index indice de l'élément à supprimer (le dernier par défaut)
       * @returns {undefined}
       */

    }, {
      key: "formArrayRemove",
      value: function formArrayRemove(path) {
        var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        return this.execAction("formArrayRemove", {
          path: path,
          index: index
        });
      }
      /**
       * Supprime tous les éléments du tableau
       * @param {String|Array} path chemin du tableau de formulaire
       * @returns {undefined}
       */

    }, {
      key: "formArrayReset",
      value: function formArrayReset(path) {
        return this.execAction("formArrayReset", {
          path: path
        });
      }
      /**
       * Déplace un élément du tableau
       * @param {String|Array} path chemin du tableau de formulaire
       * @param {Number} oldIndex indice de l'élément à déplacer
       * @param {Number} newIndex indice où déplacer l'élément
       * @returns {undefined}
       */

    }, {
      key: "formArrayMove",
      value: function formArrayMove(path, oldIndex, newIndex) {
        return this.execAction("formArrayMove", {
          path: path,
          oldIndex: oldIndex,
          newIndex: newIndex
        });
      }
      /**
       * Renvoie la longueur du tableau
       * @param {String|Array} path chemin du du tableau de formulaire
       * @param {Immutable} state optionnel, état du store
       * @returns {Number} longueur du tableau
       */

    }, {
      key: "getFormArrayLength",
      value: function getFormArrayLength(path, state) {
        var array = this.getState(state).getIn(["form"].concat(_toConsumableArray(utils.normalizeKey(path))));
        return array.size;
      }
      /**
       * Renvoie un objet permettant de manipuler plus facilement le tableau de formulaire
       * @param {String|Array} path chemin du tableau de formulaire
       * @returns {Object} objet contenant les méthodes add, remove, move et la propriété length
       */

    }, {
      key: "getFormArray",
      value: function getFormArray(path) {
        var that = this;
        return {
          add: function add() {
            var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            that.formArrayAdd(path, index);
            return this;
          },
          remove: function remove() {
            var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            that.formArrayRemove(path, index);
            return this;
          },
          move: function move(oldIndex, newIndex) {
            that.formArrayMove(path, oldIndex, newIndex);
            return this;
          },

          get length() {
            return that.getFormArrayLength(path);
          }

        };
      }
    }, {
      key: "_resetFormArrayKeys",
      value: function _resetFormArrayKeys(path) {
        var _this3 = this;

        return path.reduce(function (newPath, arg) {
          return [].concat(_toConsumableArray(newPath), [_this3._isFormArray(newPath) ? 0 : arg]);
        }, []);
      }
    }, {
      key: "getValidationRules",
      value: function getValidationRules(path) {
        var resetPath = this._resetFormArrayKeys(path);

        return _get(_getPrototypeOf(FormStore.prototype), "getValidationRules", this).call(this, resetPath);
      }
    }, {
      key: "_processForm",
      value: function _processForm(fields) {
        var _this4 = this;

        var initialKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var skipRule = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var form = {};

        var processForm = function processForm(field) {
          var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
          var skipValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

          if (isPlainObject__default['default'](field)) {
            var hasKey = false;

            for (var n in field) {
              hasKey = true;
              processForm(field[n], [].concat(_toConsumableArray(key), [n]), skipValue);
            }

            if (!hasKey && !skipValue) utils.setKeyValue(form, key, {});
          } else if (Array.isArray(field)) {
            if (!field.length) utils.setKeyValue(form, key, []);

            for (var i = 0; i < field.length; i++) {
              processForm(field[i], [].concat(_toConsumableArray(key), [i]), skipValue);
            }
          } else if (field instanceof FormArray) {
            if (!skipValue) utils.setKeyValue(form, key, []);
            var arr = new FormArray(field.structure);

            if (!skipRule) {
              utils.setKeyValue(_this4.validationRules, _this4._resetFormArrayKeys(key), arr);
            }

            for (var _n in field.structure) {
              processForm(field.structure[_n], [].concat(_toConsumableArray(key), [0, _n]), true);
            }
          } else {
            if (!skipRule) _this4.defineFieldRules(key, field);
            if (skipValue) return;
            utils.setKeyValue(form, key, {
              value: null,
              initialValue: null,
              error: null,
              warning: null,
              touched: false
            });
          }
        };

        processForm(fields, initialKey);
        return form;
      }
    }]);

    return FormStore;
  }(HeriduxForm);

  exports.FormArray = FormArray;
  exports.default = FormStore;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
