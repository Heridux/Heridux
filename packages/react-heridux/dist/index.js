(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@babel/runtime/helpers/slicedToArray'), require('@babel/runtime/helpers/extends'), require('@babel/runtime/helpers/defineProperty'), require('@babel/runtime/helpers/classCallCheck'), require('@babel/runtime/helpers/createClass'), require('@babel/runtime/helpers/inherits'), require('@babel/runtime/helpers/possibleConstructorReturn'), require('@babel/runtime/helpers/getPrototypeOf'), require('react'), require('react-redux'), require('@heridux/core'), require('immutable')) :
typeof define === 'function' && define.amd ? define(['exports', '@babel/runtime/helpers/slicedToArray', '@babel/runtime/helpers/extends', '@babel/runtime/helpers/defineProperty', '@babel/runtime/helpers/classCallCheck', '@babel/runtime/helpers/createClass', '@babel/runtime/helpers/inherits', '@babel/runtime/helpers/possibleConstructorReturn', '@babel/runtime/helpers/getPrototypeOf', 'react', 'react-redux', '@heridux/core', 'immutable'], factory) :
(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ReactHeridux = {}, global._slicedToArray, global._extends, global._defineProperty, global._classCallCheck, global._createClass, global._inherits, global._possibleConstructorReturn, global._getPrototypeOf, global.React, global.reactRedux, global.Heridux, global.immutable));
}(this, (function (exports, _slicedToArray, _extends, _defineProperty, _classCallCheck, _createClass, _inherits, _possibleConstructorReturn, _getPrototypeOf, React, reactRedux, Heridux, immutable) { 'use strict';

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _inherits__default = /*#__PURE__*/_interopDefaultLegacy(_inherits);
var _possibleConstructorReturn__default = /*#__PURE__*/_interopDefaultLegacy(_possibleConstructorReturn);
var _getPrototypeOf__default = /*#__PURE__*/_interopDefaultLegacy(_getPrototypeOf);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var Heridux__default = /*#__PURE__*/_interopDefaultLegacy(Heridux);

function toJS(Component) {
  return function (props) {
    var propsJS = Object.entries(props).reduce(function (newProps, prop) {
      newProps[prop[0]] = immutable.Iterable.isIterable(prop[1]) ? prop[1].toJS() : prop[1];
      return newProps;
    }, {});
    return /*#__PURE__*/React__default['default'].createElement(Component, propsJS);
  };
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty__default['default'](target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf__default['default'](Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf__default['default'](this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn__default['default'](this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var context = /*#__PURE__*/React.createContext();
var Provider = context.Provider;

var ReactHeridux = /*#__PURE__*/function (_Heridux) {
  _inherits__default['default'](ReactHeridux, _Heridux);

  var _super = _createSuper(ReactHeridux);

  function ReactHeridux() {
    _classCallCheck__default['default'](this, ReactHeridux);

    return _super.apply(this, arguments);
  }

  _createClass__default['default'](ReactHeridux, [{
    key: "connect",

    /**
     * Connect a react component to heridux store
     * @param {Function} mapStateToProps properties to inject to the component
     * @param {Function} mapDispatchToProps functions to inject to the component
     * @return {Function} function to connect the component
     * @see {@link https://react-redux.js.org/}
     */
    value: function connect(mapStateToProps, mapDispatchToProps) {
      var _this = this;

      if (this._isReduxRegistered()) {
        return function (Component) {
          return reactRedux.connect(function (state, ownProps) {
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
            return /*#__PURE__*/React__default['default'].createElement(Component, _extends__default['default']({}, props, extraProps));
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
          reactRedux.useSelector(function (state) {
            return state[_this2.STATE_PROPERTY];
          });
        } else {
          var _useReducer = React.useReducer(_this2._reducer, _this2.initialState),
              _useReducer2 = _slicedToArray__default['default'](_useReducer, 2),
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
}(Heridux__default['default']);
function useHeridux() {
  var heridux = React.useContext(context);

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
