(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@heridux/core'), require('immer')) :
typeof define === 'function' && define.amd ? define(['exports', '@heridux/core', 'immer'], factory) :
(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.HeriduxImmer = {}, global.Heridux, global.immer));
}(this, (function (exports, Heridux, immer) { 'use strict';

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Heridux__default = /*#__PURE__*/_interopDefaultLegacy(Heridux);

/**
 * Creation of Heridux immer store.
 * The API is exactly the same as Heridux, but it will use Immer to manage state.
 * @see {@link https://github.com/Heridux/Heridux/tree/main/packages/heridux|Heridux}
 * @see {@link https://immerjs.github.io/immer/|Immer}
 * @example import Heridux from "@heridux/immer"
 *
 * const myStore = new Heridux("myPartialStore")
 *
 * myStore.setInitialState({
 *  list : ["foo"]
 * })
 *
 * // mutate the state all you want with immer
 * myStore.createAction("push", (state, { item }) => { state.push(item) })
 *
 * myStore.register()
 *
 * myStore.execAction("push", { item : "bar" })
 *
 * myStore.get("list") // ["foo", "bar"]
 * @class
 */

class HeriduxImmer extends Heridux__default['default'] {
  constructor(STATE_PROPERTY) {
    super(STATE_PROPERTY);

    this._createGenericActions();
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
   * myStore.createAction("pop", state => { state.list.pop() })
   *
   * myStore.execAction("pop")
   *
   * myStore.get("list") //  ["foo"]
   * @param {String} name action short name
   * @param {Function} reducer function to modify the state
   * @return {undefined}
   * @private
   */


  createAction(name, reducer) {
    return super.createAction(name, (state, props) => immer.produce(state, draft => {
      reducer(draft, props);
    }));
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
    }) => {
      state[prop] = value;
    });
  }
  /**
   * Set a first level value without creating a specific action
   * @param {String} prop property name
   * @param {any} value property value
   * @returns {undefined}
   * @private
   */


  set(prop, value) {
    return this.execAction("set", {
      prop,
      value
    });
  }

}

exports.default = HeriduxImmer;

Object.defineProperty(exports, '__esModule', { value: true });

})));
