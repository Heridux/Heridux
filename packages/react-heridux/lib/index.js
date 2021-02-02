import _extends from '@babel/runtime/helpers/extends';
import React, { createContext, memo, useReducer, useContext } from 'react';
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
 * Provider component
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
export { ContextProvider, Provider, connect, context, useSelector, useStore };
