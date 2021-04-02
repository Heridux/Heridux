import _extends from '@babel/runtime/helpers/extends';
import React, { memo, useReducer, useContext, createContext } from 'react';
import { connect as connect$1, useSelector as useSelector$1 } from 'react-redux';
import Heridux from '@heridux/core';

function toJS(Component) {
  return props => {
    const propsJS = Object.entries(props).reduce((newProps, prop) => {
      var _prop$;

      newProps[prop[0]] = typeof ((_prop$ = prop[1]) === null || _prop$ === void 0 ? void 0 : _prop$.toJS) === "function" ? prop[1].toJS() : prop[1];
      return newProps;
    }, {});
    return /*#__PURE__*/React.createElement(Component, propsJS);
  };
}

const context = /*#__PURE__*/createContext();
const {
  Provider: ContextProvider
} = context;
class ReactHeridux extends Heridux {
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
      return Component => connect$1((state, ownProps) => {
        const partialState = this.getState(state);
        return mapStateToProps(partialState, ownProps);
      }, mapDispatchToProps || (() => ({})))(toJS(Component));
    } else {
      return Component => props => {
        const state = useSelector(s => s);
        let extraProps = (mapStateToProps === null || mapStateToProps === void 0 ? void 0 : mapStateToProps(state, props)) || {};
        if (mapDispatchToProps) extraProps = { ...extraProps,
          ...mapDispatchToProps(this.dispatch, props)
        };
        return /*#__PURE__*/React.createElement(Component, _extends({}, props, extraProps));
      };
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
 * store.createAction("increment", state => { state.counter++ })
 *
 * store.register()
 *
 * export default () => (
 *  <Provider store={ store }>
 *    <Component/>
 *  </Provider>
 * )
 */

const Provider = /*#__PURE__*/memo(({
  store,
  children
}) => {
  let heriduxState;

  if (store._isReduxRegistered()) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    heriduxState = useSelector$1(state => state[store.STATE_PROPERTY]);
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [state, dispatch] = useReducer(store._reducer, store.initialState);
    store.dispatch = dispatch;

    store.getState = () => state;

    heriduxState = state;
  }

  return /*#__PURE__*/React.createElement(ContextProvider, {
    value: {
      store,
      state: heriduxState
    }
  }, children);
});
/**
 * Extract data from the store state, using a selector function
 * @param {Function} selector function receiving state as argument
 * @see {@link https://react-redux.js.org/api/hooks#useselector)}
 * @returns {*} data extracted
 * @example import React from "react"
 * import { useSelector } from "@heridux/react"
 *
 * const MyComponent = () => {
 *   const counter = useSelector(state => state.counter)
 *
 *   return <div>Clicked: {counter} times</div>
 * }
 */

const useSelector = selector => {
  const {
    state
  } = useContext(context);
  const value = selector(state);
  return typeof (value === null || value === void 0 ? void 0 : value.toJS) === "function" ? value.toJS() : value;
};
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

const useStore = () => {
  const {
    store
  } = useContext(context);
  return store;
};
/**
   * Connect a react component to heridux store, inside a <Provider> component
   * @param {Function} mapStateToProps properties to inject to the component
   * @param {Function} mapDispatchToProps functions to inject to the component
   * @return {Function} function to connect the component
   * @see {@link https://react-redux.js.org/}
   * @example import React from "react"
   * import { connect } from "@heridux/react"
   *
   * const Component = ({ counter }) => <p>{ counter } times</p>
   *
   * const mapStateToProps = state => ({ counter : state.counter })
   *
   * export default connect(mapStateToProps)(Component)
   */

const connect = (mapStateToProps, mapDispatchToProps) => Component => props => {
  const {
    store,
    state
  } = useContext(context);
  let extraProps = (mapStateToProps === null || mapStateToProps === void 0 ? void 0 : mapStateToProps(state, props)) || {};
  if (mapDispatchToProps) extraProps = { ...extraProps,
    ...mapDispatchToProps(store.dispatch, props)
  };
  return /*#__PURE__*/React.createElement(Component, _extends({}, props, extraProps, {
    store: store
  }));
};

export default ReactHeridux;
export { Provider, connect, useSelector, useStore };
