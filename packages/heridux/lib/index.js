import _objectWithoutProperties from '../node_modules/@babel/runtime/helpers/objectWithoutProperties.js';
import _extends from '../node_modules/@babel/runtime/helpers/extends.js';
import _classCallCheck from '../node_modules/@babel/runtime/helpers/classCallCheck.js';
import _createClass from '../node_modules/@babel/runtime/helpers/createClass.js';
import _defineProperty from '../node_modules/@babel/runtime/helpers/defineProperty.js';
import { createStore, combineReducers } from '../node_modules/redux/es/redux.js';
import { fromJS } from '../node_modules/immutable/dist/immutable.es.js';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
/**
 * Creation of Heridux store
 * @class
 */

var Heridux = /*#__PURE__*/function () {
  _createClass(Heridux, null, [{
    key: "createReduxStore",
    value: function createReduxStore(reducer, preloadedState, enhancer) {
      var DEVTOOLS = window.__REDUX_DEVTOOLS_EXTENSION__;

      var _reducer = reducer || function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return state;
      };

      Heridux.reduxStore = createStore(_reducer, preloadedState, enhancer || (DEVTOOLS === null || DEVTOOLS === void 0 ? void 0 : DEVTOOLS()));
      Heridux.reduxReducers = _reducer;
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
        return state.set(prop, fromJS(value));
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
      this.initialState = fromJS(state);
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

          payload = _objectSpread({}, rest);
          if (type) payload._type = type;
        }

        return _objectSpread({
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
        var newReducers = _objectSpread(_objectSpread({}, Heridux.reduxReducers), {}, _defineProperty({}, this.STATE_PROPERTY, this._reducer));

        var reduxStore = this._getReduxStore();

        reduxStore.replaceReducer(combineReducers(newReducers));
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

export default Heridux;
