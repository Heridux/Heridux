/* eslint-disable react/prop-types */
import React, { createContext, useReducer, useContext, memo } from "react"
import { connect as reduxConnect, useSelector as useReduxSelector } from "react-redux"
import Heridux from "@heridux/core"
import { toJS } from "./utils"

const context = createContext()

const { Provider : ContextProvider } = context

export default class ReactHeridux extends Heridux {

  /**
   * Connect a react component to heridux store
   * @param {Function} mapStateToProps properties to inject to the component
   * @param {Function} mapDispatchToProps functions to inject to the component
   * @return {Function} function to connect the component
   * @see {@link https://react-redux.js.org/}
   * @private
   */
  connect(mapStateToProps, mapDispatchToProps) {

    if (this._isReduxRegistered()) {

      return Component => reduxConnect((state, ownProps) => {

        const partialState = this.getState(state)

        return mapStateToProps(partialState, ownProps)

      }, mapDispatchToProps || (() => ({})))(toJS(Component))

    } else {

      return Component => props => {

        const state = useSelector(s => s)

        let extraProps = mapStateToProps?.(state, props) || {}

        if (mapDispatchToProps) extraProps = { ...extraProps, ...mapDispatchToProps(this.dispatch, props) }

        return <Component { ...props } { ...extraProps }/>
      }
    }
  }

}

/**
 * Component that makes the Heridux store available to any nested components
 * @example
 * import Heridux from "@heridux/immer"
 * import { Provider } from "@heridux/react"
 * import Component from "./Component"
 *
 * const store = new Heridux("counterStore")
 *
 * store.setInitialState({ counter: 0 })
 *
 * store.createAction("increment", (state) => {
 *  state.counter++
 * })
 *
 * store.register()
 *
 * export default () => (
 *  <Provider store={ store }>
 *    <Component/>
 *  </Provider>
 * )
 */
export const Provider = memo(({ store, children }) => {
  let heriduxState

  if (store._isReduxRegistered()) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    heriduxState = useReduxSelector(state => state[store.STATE_PROPERTY])
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [state, dispatch] = useReducer(store._reducer, store.initialState)

    store.dispatch = dispatch
    store.getState = () => state
    heriduxState = state
  }

  return (
    <ContextProvider value={ { store, state : heriduxState } }>
      { children }
    </ContextProvider>
  )
})

/**
 * Extract data from the store state, using a selector function
 * @param {Function} selector function receiving state as argument
 * @see {@link https://react-redux.js.org/api/hooks#useselector)}
 * @returns {*} data extracted
 * @example import React from "react"
 * import { useSelector } from "@heridux/react"
 *
 * const MyComponent = () => {
 *   const counter = useSelector((state) => state.counter)
 *
 *   return <div>Clicked: {counter} times</div>
 * }
 */
export const useSelector = selector => {
  const { state } = useContext(context)
  const value = selector(state)

  return (typeof value?.toJS === "function") ? value.toJS() : value
}

/**
 * Returns a reference to the store that was passed in to the <Provider> component
 * @see {@link https://react-redux.js.org/api/hooks#usestore}
 * @returns {Heridux} heridux store
 * @example import React, { useCallback } from "react"
 * import { useStore } from "@heridux/react"
 *
 * const MyComponent = () => {
 *   const store = useStore()
 *   // function reference won't change, you can safely add it to dependencies
 *   const handleClick = useCallback(() => store.execAction("increment"), [store])

 *   return <button onClick={ handleClick }>+</button>
 * }
 */
export const useStore = () => {
  const { store } = useContext(context)

  return store
}

/**
   * Connect a react component to heridux store, inside a <Provider> component
   * @param {Function} mapStateToProps properties to inject to the component
   * @param {Function} mapDispatchToProps functions to inject to the component
   * @return {Function} function to connect the component
   * @see {@link https://react-redux.js.org/}
   * @example <caption>store.js</caption>
   * import Heridux from "@heridux/immer"
   *
   * const store = new Heridux("counterStore")
   *
   * store.setInitialState({ counter: 0 })
   *
   * store.createAction("increment", (state) => {
   *  state.counter++
   * })
   *
   * store.register()
   *
   * export default store
   *
   * @example <caption>Component.js</caption>
   * import React from "react"
   * import { connect } from "@heridux/react"
   *
   * const Component = ({ counter }) => <p>{ counter } times</p>
   *
   * const mapStateToProps = state => ({ counter : state.counter })
   *
   * export default connect(mapStateToProps)(Component)
   *
   * @example <caption>App.js</caption>
   * import { Provider } from "@heridux/react"
   * import Component from "./Component"
   * import store from "./store"
   *
   * export default () => <Provider store={ store }><Component/></Provider>
   */
export const connect = (mapStateToProps, mapDispatchToProps) => Component => props => {
  const { store, state } = useContext(context)

  let extraProps = mapStateToProps?.(state, props) || {}

  if (mapDispatchToProps) extraProps = { ...extraProps, ...mapDispatchToProps(store.dispatch, props) }

  return <Component { ...props } { ...extraProps } store={ store }/>
}

