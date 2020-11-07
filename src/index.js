import React, { createContext, useReducer, useContext } from "react"
import { combineReducers } from "redux"
import { connect as reduxConnect, useSelector } from "react-redux"
import { fromJS } from "immutable"
import { toJS } from "./utils"

export const context = createContext()

export const { Provider } = context

/**
 * Creation of Heridux store
 * @class
 */
export default class Heridux {

  static reduxStore = null
  static reduxReducers = null
  /**
   * Constructor
   * @param {String} STATE_PROPERTY string name for this slice of state. Generated actions wille use this as a prefix.
   */
  constructor(STATE_PROPERTY) {
    this.initialState = {}
    this.STATE_PROPERTY = STATE_PROPERTY
    this._actions = {}
    this._reducers = {}
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
   * Get full action name with prefix + SCREAMING_SNAKE_CASE action name
   * @private
   * @example
   * const myStore = new Heridux("myPartialStore")
   * myStore._getFullActionName("myAction")
   * // returns "myPartialStore/MY_ACTION"
   * @param {String} shortName action name defined in createAction
   * @return {String} full name
   */
  _getFullActionName(shortName) {

    return this.STATE_PROPERTY + "/" + shortName.replace(/[A-Z]/g, s => "_" + s).toUpperCase()
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
  _getShortActionName(fullName) {

    return fullName
      .replace(new RegExp("^" + this.STATE_PROPERTY + "/"), "")
      .toLowerCase()
      .replace(/_([a-z])/g, (s, s1) => s1.toUpperCase())
  }

  /**
   * Get original redux store object
   * @private
   * @return {Object} redux store
   */
  _getReduxStore() {
    const { reduxStore } = Heridux

    if (!reduxStore) throw new Error("Redux store has not been defined as reduxStore key of Heridux")

    return reduxStore
  }

  /**
   * Get store slice
   * @param {Immutable.Map} [state] global state (if not specified, call getState method of redux store)
   * @return {Immutable.Map} store slice
   */
  getState(state) {

    const fullState = (state || this._getReduxStore().getState())[this.STATE_PROPERTY]

    if (fullState) return fullState
    else {
      console.warn(`key ${this.STATE_PROPERTY} not found in redux store. You may forgot to register heridux store`)

      /* if store is not registered yet, returns the initial state */
      return this.initialState
    }
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
   * Get action from short name action
   * @private
   * @param {String} name action short name
   * @return {Function} redux action
   */
  _getAction(name) {

    return this._actions[this._getFullActionName(name)]
  }

  /**
   * Define the initial state of the store slice. It will automatically be converted to immutable.
   * @param {Object} state plain js state
   * @return {undefined}
   */
  setInitialState(state) {

    this.initialState = fromJS(state)
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
  createAction(name, reducer) {

    const actionName = this._getFullActionName(name)

    this._actions[actionName] = args => {

      let payload = {}

      if (args) {

        const { type, ...rest } = args

        payload = { ...rest }

        if (type) payload._type = type
      }

      return { type : actionName, ...payload }
    }

    this._reducers[actionName] = reducer
  }


  /**
   * Execute action registered by createAction method
   * @param {String} name action short name
   * @param {Object} options additional parameters
   * @return {undefined}
   * @see createAction
   */
  execAction(name, options) {

    const func = this._getAction(name)

    if (!func) throw new Error(name + " : unknown action on store " + this.STATE_PROPERTY)

    return this.dispatch(func(options))
  }

  /**
   * reducer function
   * @private
   * @param {*} state state slice
   * @param {*} params action parameters
   * @returns {undefined}
   */
  _reducer = (state, { ...action }) => {

    const currentState = state || this.initialState

    const func = this._reducers[action.type]

    delete action.type

    if (action._type) {
      action.type = action._type
      delete action._type
    }

    return func ? func(currentState, action) : currentState
  }

  /**
   * Test if store has been registered in redux global store
   * @private
   * @returns {Boolean} true if store is registered
   */
  _isReduxRegistered() {
    try {
      const state = this._getReduxStore().getState() || {}

      return Boolean(state[this.STATE_PROPERTY])
    } catch (e) {
      return false
    }
  }

  /**
   * Register heridux store in global redux store
   * @return {undefined}
   */
  register() {

    if (this._isReduxRegistered()) {
      console.warn(`key ${this.STATE_PROPERTY} already exists in global store
      if this is due to hot reload, maybe you should reload your page entirely`)

    } else {

      const newReducers = {
        ...Heridux.reduxReducers,
        [this.STATE_PROPERTY] : this._reducer
      }

      const reduxStore = this._getReduxStore()

      reduxStore.replaceReducer(combineReducers(newReducers))

      Heridux.reduxReducers = newReducers

      if (Heridux.onRegister) Heridux.onRegister(newReducers)
    }
  }

  /**
   * dispatch any action on global redux store
   * @param {Object|Function} action redux action
   * @return {undefined|Promise} promise if async
   */
  dispatch(action) {
    return this._getReduxStore().dispatch(action)
  }

  /**
   * Connect a react component to heridux store
   * @param {Function} mapStateToProps properties to inject to the component
   * @param {Function} mapDispatchToProps functions to inject to the component
   * @return {Function} function to connect the component
   * @see {@link https://react-redux.js.org/}
   */
  connect(mapStateToProps, mapDispatchToProps) {

    if (this._isReduxRegistered()) {

      return Component => reduxConnect((state, ownProps) => {

        const partialState = this.getState(state)

        return mapStateToProps(partialState, ownProps)

      }, mapDispatchToProps || (() => ({})))(toJS(Component))

    } else {

      return Component => props => {

        const { state, dispatch } = useHeridux()

        let extraProps = mapStateToProps?.(state, props) || {}

        if (mapDispatchToProps) extraProps = { ...extraProps, ...mapDispatchToProps(dispatch, props) }

        return <Component { ...props } { ...extraProps }/>
      }
    }
  }

  /**
   * Create a hook to use heridux store as internal state instead of redux
   * @returns {Function} hook
   * @see {@link https://fr.reactjs.org/docs/hooks-custom.html}
   */
  createHook() {

    if (this._hookCreated) {
      throw new Error("Only one hook can be created from an instance of Heridux")
    }

    return () => {

      if (this._isReduxRegistered()) {
        useSelector(state => state[this.STATE_PROPERTY])

      } else {

        const [state, dispatch] = useReducer(this._reducer, this.initialState)

        this.dispatch = dispatch
        this.getState = () => state

        this._hookCreated = true
      }

      return Object.create(this) // new reference to force update
    }

  }

}

/**
 * Hook to use heridux store
 * @returns {Heridux} heridux object to manage store
 */
export function useHeridux() {
  const heridux = useContext(context)

  if (!heridux) {
    console.error("Heridux not found. Please put your component inside a Heridux Provider.")
  }

  return heridux
}