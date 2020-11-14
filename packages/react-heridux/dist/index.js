(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@babel/runtime/helpers/extends'), require('react'), require('react-redux'), require('@heridux/core'), require('immutable')) :
typeof define === 'function' && define.amd ? define(['exports', '@babel/runtime/helpers/extends', 'react', 'react-redux', '@heridux/core', 'immutable'], factory) :
(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ReactHeridux = {}, global._extends, global.React, global.reactRedux, global.Heridux, global.Immutable));
}(this, (function (exports, _extends, React, reactRedux, Heridux, immutable) { 'use strict';

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var Heridux__default = /*#__PURE__*/_interopDefaultLegacy(Heridux);

function toJS(Component) {
  return props => {
    const propsJS = Object.entries(props).reduce((newProps, prop) => {
      newProps[prop[0]] = immutable.Iterable.isIterable(prop[1]) ? prop[1].toJS() : prop[1];
      return newProps;
    }, {});
    return /*#__PURE__*/React__default['default'].createElement(Component, propsJS);
  };
}

const context = /*#__PURE__*/React.createContext();
const {
  Provider
} = context;
class ReactHeridux extends Heridux__default['default'] {
  /**
   * Connect a react component to heridux store
   * @param {Function} mapStateToProps properties to inject to the component
   * @param {Function} mapDispatchToProps functions to inject to the component
   * @return {Function} function to connect the component
   * @see {@link https://react-redux.js.org/}
   */
  connect(mapStateToProps, mapDispatchToProps) {
    if (this._isReduxRegistered()) {
      return Component => reactRedux.connect((state, ownProps) => {
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
        return /*#__PURE__*/React__default['default'].createElement(Component, _extends__default['default']({}, props, extraProps));
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
        reactRedux.useSelector(state => state[this.STATE_PROPERTY]);
      } else {
        const [state, dispatch] = React.useReducer(this._reducer, this.initialState);
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
  const heridux = React.useContext(context);

  if (!heridux) {
    console.error("Heridux not found. Please put your component inside a Heridux Provider.");
  }

  return heridux;
}

exports.Provider = Provider;
exports.context = context;
exports.default = ReactHeridux;
exports.useHeridux = useHeridux;

Object.defineProperty(exports, '__esModule', { value: true });

})));
