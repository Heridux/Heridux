import { Iterable } from 'immutable';
import Heridux from '@heridux/core';
import _extends from '@babel/runtime/helpers/extends';
import React, { useReducer, createContext, useContext } from 'react';
import { connect, useSelector } from 'react-redux';

function toJS(Component) {
  return props => {
    const propsJS = Object.entries(props).reduce((newProps, prop) => {
      newProps[prop[0]] = Iterable.isIterable(prop[1]) ? prop[1].toJS() : prop[1];
      return newProps;
    }, {});
    return /*#__PURE__*/React.createElement(Component, propsJS);
  };
}

const context = /*#__PURE__*/createContext();
const {
  Provider
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
      return Component => connect((state, ownProps) => {
        const partialState = this.getState(state);
        return mapStateToProps(partialState, ownProps);
      }, mapDispatchToProps || (() => ({})))(toJS(Component));
    } else {
      return Component => props => {
        const store = useHeridux();
        const state = store.getState();
        const dispatch = store.dispatch.bind(store);
        let extraProps = (mapStateToProps === null || mapStateToProps === void 0 ? void 0 : mapStateToProps(state, props)) || {};
        if (mapDispatchToProps) extraProps = { ...extraProps,
          ...mapDispatchToProps(dispatch, props)
        };
        return /*#__PURE__*/React.createElement(Component, _extends({}, props, extraProps));
      };
    }
  }
  /**
   * Create a hook to use heridux store as internal state instead of redux
   * @returns {Function} hook
   * @see {@link https://fr.reactjs.org/docs/hooks-custom.html}
   */


  createHook() {
    if (this._hookCreated) {
      throw new Error("Only one hook can be created from an instance of Heridux");
    }

    return () => {
      if (this._isReduxRegistered()) {
        useSelector(state => state[this.STATE_PROPERTY]);
      } else {
        const [state, dispatch] = useReducer(this._reducer, this.initialState);
        this.dispatch = dispatch;

        this.getState = () => state;

        this._hookCreated = true;
      }

      return Object.create(this); // new reference to force update
    };
  }

}
/**
 * Hook to use heridux store
 * @returns {Heridux} heridux object to manage store
 */

function useHeridux() {
  const heridux = useContext(context);

  if (!heridux) {
    console.error("Heridux not found. Please put your component inside a Heridux Provider.");
  }

  return heridux;
}

export default ReactHeridux;
export { Provider, context, useHeridux };
