(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@babel/runtime/helpers/extends'), require('react'), require('prop-types'), require('immutable'), require('react-redux'), require('@heridux/core')) :
typeof define === 'function' && define.amd ? define(['exports', '@babel/runtime/helpers/extends', 'react', 'prop-types', 'immutable', 'react-redux', '@heridux/core'], factory) :
(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ReactHeridux = {}, global._extends, global.React, global.PropTypes, global.Immutable, global.reactRedux, global.Heridux));
}(this, (function (exports, _extends, React, PropTypes, immutable, reactRedux, Heridux) { 'use strict';

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
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
  Provider: ContextProvider
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
        const state = useSelector(s => s);
        let extraProps = (mapStateToProps === null || mapStateToProps === void 0 ? void 0 : mapStateToProps(state, props)) || {};
        if (mapDispatchToProps) extraProps = { ...extraProps,
          ...mapDispatchToProps(this.dispatch, props)
        };
        return /*#__PURE__*/React__default['default'].createElement(Component, _extends__default['default']({}, props, extraProps));
      };
    }
  }

}
/**
 * Provider component
 */

const Provider = /*#__PURE__*/React.memo(({
  store,
  children
}) => {
  let heriduxState;

  if (store._isReduxRegistered()) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    heriduxState = reactRedux.useSelector(state => state[store.STATE_PROPERTY]);
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [state, dispatch] = React.useReducer(store._reducer, store.initialState);
    store.dispatch = dispatch;

    store.getState = () => state;

    heriduxState = state;
  }

  return /*#__PURE__*/React__default['default'].createElement(ContextProvider, {
    value: {
      store,
      state: heriduxState
    }
  }, children);
});
Provider.propTypes = {
  store: PropTypes__default['default'].instanceOf(Heridux__default['default']),
  children: PropTypes__default['default'].node
};
/**
 * Extract data from the store state, using a selector function
 * @param {Function} selector function receiving state as argument
 * @see {@link https://react-redux.js.org/api/hooks#useselector)}
 * @returns {*} data extracted
 */

const useSelector = selector => {
  const {
    state
  } = React.useContext(context);
  const value = selector(state);
  return immutable.Iterable.isIterable(value) ? value.toJS() : value;
};
/**
 * Returns a reference to the store that was passed in to the <Provider> component
 * @see {@link https://react-redux.js.org/api/hooks#usestore}
 * @returns {Heridux} heridux store
 */

const useStore = () => {
  const {
    store
  } = React.useContext(context);
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
  } = React.useContext(context);
  let extraProps = (mapStateToProps === null || mapStateToProps === void 0 ? void 0 : mapStateToProps(state, props)) || {};
  if (mapDispatchToProps) extraProps = { ...extraProps,
    ...mapDispatchToProps(store.dispatch, props)
  };
  return /*#__PURE__*/React__default['default'].createElement(Component, _extends__default['default']({}, props, extraProps, {
    store: store
  }));
};

exports.ContextProvider = ContextProvider;
exports.Provider = Provider;
exports.connect = connect;
exports.context = context;
exports.default = ReactHeridux;
exports.useSelector = useSelector;
exports.useStore = useStore;

Object.defineProperty(exports, '__esModule', { value: true });

})));
