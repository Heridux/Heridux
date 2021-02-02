/* eslint-disable react/prop-types */
import React, { createContext, useReducer, useContext, memo } from "react"
import { connect as reduxConnect, useSelector as useReduxSelector } from "react-redux"
import Heridux from "@heridux/core"
import { toJS } from "./utils"

export const context = createContext()

export const { Provider : ContextProvider } = context

export default class ReactHeridux extends Heridux {

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

        const state = useSelector(s => s)

        let extraProps = mapStateToProps?.(state, props) || {}

        if (mapDispatchToProps) extraProps = { ...extraProps, ...mapDispatchToProps(this.dispatch, props) }

        return <Component { ...props } { ...extraProps }/>
      }
    }
  }

}

/**
 * Provider component
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
   */
export const connect = (mapStateToProps, mapDispatchToProps) => Component => props => {
  const { store, state } = useContext(context)

  let extraProps = mapStateToProps?.(state, props) || {}

  if (mapDispatchToProps) extraProps = { ...extraProps, ...mapDispatchToProps(store.dispatch, props) }

  return <Component { ...props } { ...extraProps } store={ store }/>
}

