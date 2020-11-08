import React, { createContext, useReducer, useContext } from "react"
import { connect as reduxConnect, useSelector } from "react-redux"
import Heridux from "@heridux/core"


export const context = createContext()

export const { Provider } = context

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
