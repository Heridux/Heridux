(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@heridux/core'), require('immutable')) :
typeof define === 'function' && define.amd ? define(['exports', '@heridux/core', 'immutable'], factory) :
(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.HeriduxImmutable = {}, global.Heridux, global.Immutable));
}(this, (function (exports, Heridux, immutable) { 'use strict';

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Heridux__default = /*#__PURE__*/_interopDefaultLegacy(Heridux);

/**
 * Creation of Heridux store
 * @class
 */

class HeriduxImmutable extends Heridux__default['default'] {
  /**
   * Constructor
   * @param {String} STATE_PROPERTY string name for this slice of state. Generated actions wille use this as a prefix.
   */
  constructor(STATE_PROPERTY) {
    super(STATE_PROPERTY);

    this._createGenericActions();
  }
  /**
   * Create generic action to set simple values in the store without creating named actions
   * @private
   * @returns {undefined}
   */


  _createGenericActions() {
    // in some classes inheriting from Heridux, createAction is overloaded
    // we therefore make sure to take the original
    const {
      createAction
    } = Heridux__default['default'].prototype;
    createAction.call(this, "set", (state, {
      prop,
      value
    }) => state.set(prop, immutable.fromJS(value)));
  }
  /**
   * Set a first level value without creating a specific action
   * @param {String} prop property name
   * @param {any} value property value
   * @returns {undefined}
   */


  set(prop, value) {
    return this.execAction("set", {
      prop,
      value
    });
  }
  /**
   * Get js value of a first level key
   * @param {String} key key name
   * @param {Immutable.Map} [state] global state (if not specified, call getState method of redux store)
   * @return {*} key value (converted in plain js if immutable)
   */


  get(key, state) {
    var _value$toJS, _value$toJS2;

    const value = this.getState(state).get(key);
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


  getIn(path, state) {
    const value = this.getState(state).getIn(path);
    return value && value.toJS ? value.toJS() : value;
  }
  /**
   * Define the initial state of the store slice. It will automatically be converted to immutable.
   * @param {Object} state plain js state
   * @return {undefined}
   */


  setInitialState(state) {
    this.initialState = immutable.fromJS(state);
  }

}

exports.default = HeriduxImmutable;

Object.defineProperty(exports, '__esModule', { value: true });

})));
