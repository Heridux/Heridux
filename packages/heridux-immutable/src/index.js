import Heridux from "@heridux/core"
import { fromJS } from "immutable"


/**
 * Creation of Heridux store
 * @class
 */
export default class HeriduxImmutable extends Heridux {

  /**
   * Constructor
   * @param {String} STATE_PROPERTY string name for this slice of state. Generated actions wille use this as a prefix.
   */
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
   */
  set(prop, value) {
    return this.execAction("set", { prop, value })
  }

  /**
   * Get js value of a first level key
   * @param {String} key key name
   * @param {Immutable.Map} [state] global state (if not specified, call getState method of redux store)
   * @return {*} key value (converted in plain js if immutable)
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
   */
  getIn(path, state) {

    const value = this.getState(state).getIn(path)

    return value && value.toJS ? value.toJS() : value
  }

  /**
   * Define the initial state of the store slice. It will automatically be converted to immutable.
   * @param {Object} state plain js state
   * @return {undefined}
   */
  setInitialState(state) {

    this.initialState = fromJS(state)
  }

}

