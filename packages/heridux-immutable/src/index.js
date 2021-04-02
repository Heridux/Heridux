import Heridux from "@heridux/core"
import { fromJS } from "immutable"


/**
 * Creation of Heridux immutable store.
 * The API is exactly the same as Heridux, but it will use Immutable to manage state.
 * @see {@link https://github.com/Heridux/Heridux/tree/main/packages/heridux|Heridux}
 * @see {@link https://immutable-js.github.io/immutable-js/|Immutable}
 * @link The API is exactly the same
 * @example import Heridux from "@heridux/immutable"
 *
 * const myStore = new Heridux("myPartialStore")
 *
 * // define initial state with a plain object, it will be converted to immutable map.
 * myStore.setInitialState({
 *  list : ["foo"]
 * })
 *
 * // state is an immutable map in reducers
 * myStore.createAction("push", (state, { item }) => {
 *   return state.updateIn(["list"], arr => arr.push(item))
 * })
 *
 * myStore.register()
 *
 * myStore.execAction("push", { item : "bar" })
 *
 * myStore.get("list") // ["foo", "bar"]
 * @class
 */
export default class HeriduxImmutable extends Heridux {

  constructor(STATE_PROPERTY) {
    super(STATE_PROPERTY)
    this._createGenericActions()
  }

  /**
   * Create generic action to set simple values in the store without creating named actions
   * @private
   * @returns {undefined}
   */
  _createGenericActions() {
    // in some classes inheriting from Heridux, createAction is overloaded
    // we therefore make sure to take the original
    const { createAction } = Heridux.prototype

    createAction.call(this, "set", (state, { prop, value }) => state.set(prop, fromJS(value)))
  }

  /**
   * Set a first level value without creating a specific action
   * @param {String} prop property name
   * @param {any} value property value
   * @returns {undefined}
   * @private
   */
  set(prop, value) {
    return this.execAction("set", { prop, value })
  }

  /**
   * Get js value of a first level key
   * @param {String} key key name
   * @param {Immutable.Map} [state] global state (if not specified, call getState method of redux store)
   * @return {*} key value (converted in plain js if immutable)
   * @private
   */
  get(key, state) {

    const value = this.getState(state).get(key)

    return value?.toJS?.() ?? value
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
   * @private
   */
  getIn(path, state) {

    const value = this.getState(state).getIn(path)

    return value && value.toJS ? value.toJS() : value
  }

  /**
   * Define the initial state of the store slice. It will automatically be converted to immutable.
   * @param {Object} state plain js state
   * @return {undefined}
   * @private
   */
  setInitialState(state) {

    this.initialState = fromJS(state)
  }

}

