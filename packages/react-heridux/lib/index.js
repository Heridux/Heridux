import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _extends from '@babel/runtime/helpers/extends';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _inherits from '@babel/runtime/helpers/inherits';
import _possibleConstructorReturn from '@babel/runtime/helpers/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/getPrototypeOf';
import React, { createContext, useReducer, useContext } from 'react';
import { connect, useSelector } from 'react-redux';
import Heridux from '@heridux/core';
import { Iterable } from 'immutable';

function toJS(Component) {
  return function (props) {
    var propsJS = Object.entries(props).reduce(function (newProps, prop) {
      newProps[prop[0]] = Iterable.isIterable(prop[1]) ? prop[1].toJS() : prop[1];
      return newProps;
    }, {});
    return /*#__PURE__*/React.createElement(Component, propsJS);
  };
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var context = /*#__PURE__*/createContext();
var Provider = context.Provider;

var ReactHeridux = /*#__PURE__*/function (_Heridux) {
  _inherits(ReactHeridux, _Heridux);

  var _super = _createSuper(ReactHeridux);

  function ReactHeridux() {
    _classCallCheck(this, ReactHeridux);

    return _super.apply(this, arguments);
  }

  _createClass(ReactHeridux, [{
    key: "connect",

    /**
     * Connect a react component to heridux store
     * @param {Function} mapStateToProps properties to inject to the component
     * @param {Function} mapDispatchToProps functions to inject to the component
     * @return {Function} function to connect the component
     * @see {@link https://react-redux.js.org/}
     */
    value: function connect$1(mapStateToProps, mapDispatchToProps) {
      var _this = this;

      if (this._isReduxRegistered()) {
        return function (Component) {
          return connect(function (state, ownProps) {
            var partialState = _this.getState(state);

            return mapStateToProps(partialState, ownProps);
          }, mapDispatchToProps || function () {
            return {};
          })(toJS(Component));
        };
      } else {
        return function (Component) {
          return function (props) {
            var store = useHeridux();
            var state = store.getState();
            var dispatch = store.dispatch.bind(store);
            var extraProps = (mapStateToProps === null || mapStateToProps === void 0 ? void 0 : mapStateToProps(state, props)) || {};
            if (mapDispatchToProps) extraProps = _objectSpread(_objectSpread({}, extraProps), mapDispatchToProps(dispatch, props));
            return /*#__PURE__*/React.createElement(Component, _extends({}, props, extraProps));
          };
        };
      }
    }
    /**
     * Create a hook to use heridux store as internal state instead of redux
     * @returns {Function} hook
     * @see {@link https://fr.reactjs.org/docs/hooks-custom.html}
     */

  }, {
    key: "createHook",
    value: function createHook() {
      var _this2 = this;

      if (this._hookCreated) {
        throw new Error("Only one hook can be created from an instance of Heridux");
      }

      return function () {
        if (_this2._isReduxRegistered()) {
          useSelector(function (state) {
            return state[_this2.STATE_PROPERTY];
          });
        } else {
          var _useReducer = useReducer(_this2._reducer, _this2.initialState),
              _useReducer2 = _slicedToArray(_useReducer, 2),
              state = _useReducer2[0],
              dispatch = _useReducer2[1];

          _this2.dispatch = dispatch;

          _this2.getState = function () {
            return state;
          };

          _this2._hookCreated = true;
        }

        return Object.create(_this2); // new reference to force update
      };
    }
  }]);

  return ReactHeridux;
}(Heridux);
function useHeridux() {
  var heridux = useContext(context);

  if (!heridux) {
    console.error("Heridux not found. Please put your component inside a Heridux Provider.");
  }

  return heridux;
}

export default ReactHeridux;
export { Provider, context, useHeridux };
