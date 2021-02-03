import Heridux from "@heridux/core"
import { produce } from "immer"


/**
 * Creation of Heridux store
 * @class
 */
export default class HeriduxImmer extends Heridux {

  /**
   * Constructor
   * @param {String} STATE_PROPERTY string name for this slice of state. Generated actions wille use this as a prefix.
   */
  constructor(STATE_PROPERTY) {
    super(STATE_PROPERTY)
    this._createGenericActions()
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
   */
  createAction(name, reducer) {
    return super.createAction(name, (state, props) => produce(state, draft => { reducer(draft, props) }))
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

    createAction.call(this, "set", (state, { prop, value }) => { state[prop] = value })
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

}

