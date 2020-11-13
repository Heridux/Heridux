(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@babel/runtime/helpers/classCallCheck'), require('@babel/runtime/helpers/createClass'), require('@babel/runtime/helpers/inherits'), require('@babel/runtime/helpers/possibleConstructorReturn'), require('@babel/runtime/helpers/getPrototypeOf'), require('react'), require('@heridux/form-arrays'), require('@heridux/react'), require('@babel/runtime/helpers/extends'), require('@babel/runtime/helpers/objectWithoutProperties'), require('prop-types'), require('@babel/runtime/helpers/defineProperty'), require('@babel/runtime/helpers/toConsumableArray'), require('@heridux/form')) :
typeof define === 'function' && define.amd ? define(['exports', '@babel/runtime/helpers/classCallCheck', '@babel/runtime/helpers/createClass', '@babel/runtime/helpers/inherits', '@babel/runtime/helpers/possibleConstructorReturn', '@babel/runtime/helpers/getPrototypeOf', 'react', '@heridux/form-arrays', '@heridux/react', '@babel/runtime/helpers/extends', '@babel/runtime/helpers/objectWithoutProperties', 'prop-types', '@babel/runtime/helpers/defineProperty', '@babel/runtime/helpers/toConsumableArray', '@heridux/form'], factory) :
(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ReactHeriduxForm = {}, global._classCallCheck, global._createClass, global._inherits, global._possibleConstructorReturn, global._getPrototypeOf, global.React, global.FormStore, global.react, global._extends, global._objectWithoutProperties, global.PropTypes, global._defineProperty, global._toConsumableArray, global.form));
}(this, (function (exports, _classCallCheck, _createClass, _inherits, _possibleConstructorReturn, _getPrototypeOf, React, FormStore, react, _extends, _objectWithoutProperties, PropTypes, _defineProperty, _toConsumableArray, form) { 'use strict';

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _inherits__default = /*#__PURE__*/_interopDefaultLegacy(_inherits);
var _possibleConstructorReturn__default = /*#__PURE__*/_interopDefaultLegacy(_possibleConstructorReturn);
var _getPrototypeOf__default = /*#__PURE__*/_interopDefaultLegacy(_getPrototypeOf);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var FormStore__default = /*#__PURE__*/_interopDefaultLegacy(FormStore);
var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var _objectWithoutProperties__default = /*#__PURE__*/_interopDefaultLegacy(_objectWithoutProperties);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);

var Form = /*#__PURE__*/React.memo(function (_ref) {
  var onSubmit = _ref.onSubmit,
      looseControl = _ref.looseControl,
      children = _ref.children,
      onChange = _ref.onChange,
      rest = _objectWithoutProperties__default['default'](_ref, ["onSubmit", "looseControl", "children", "onChange"]);

  var store = react.useHeridux();
  var changesCount = store.get("changesCount");

  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    var test = store.checkForm();

    if (onSubmit && (test || looseControl)) {
      onSubmit(store.getFormValues());
    }
  };

  React.useEffect(function () {
    if (onChange) onChange(store.getFormValues());
  }, [changesCount]);
  React.useEffect(function () {
    return function () {
      if (store.templateDriven) {
        // nettoyage au démontage
        // store est un objet dont le prototype est le store réel
        Object.getPrototypeOf(store).validationRules = {};
      }
    };
  }, []);
  return (
    /*#__PURE__*/
    // eslint-disable-next-line react/jsx-no-bind
    React__default['default'].createElement("form", _extends__default['default']({}, rest, {
      onSubmit: handleSubmit
    }), children)
  );
});
Form.propTypes = {
  children: PropTypes__default['default'].node,
  intl: PropTypes__default['default'].object,
  onSubmit: PropTypes__default['default'].func,
  onChange: PropTypes__default['default'].func,
  looseControl: PropTypes__default['default'].bool
};

function useFormControl(formKey, validationRule) {
  var store = react.useHeridux();
  var onChange = React.useCallback(function (e) {
    var val = e && e.target ? e.target.value : e;
    store.setFieldValue(key, val);
  }, []);
  if (!store) return {};
  var key = form.normalizeKey(formKey);
  var field = store.getIn(["form"].concat(_toConsumableArray__default['default'](key)));
  var rule = store.getValidationRules(key);

  if (!rule || !field) {
    if (validationRule && store.templateDriven) {
      var path = _toConsumableArray__default['default'](key);

      var lastKey = path.pop();
      store.addFields(path, _defineProperty__default['default']({}, lastKey, validationRule));
      rule = validationRule;
    } else {
      var msg = "[".concat(key.join(), "] is not a known key in form ").concat(store.STATE_PROPERTY);
      console.error(msg, store.validationRules);
      throw new Error(msg);
    }
  }

  var _ref = field || {},
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? null : _ref$value,
      _ref$touched = _ref.touched,
      touched = _ref$touched === void 0 ? false : _ref$touched,
      _ref$error = _ref.error,
      error = _ref$error === void 0 ? null : _ref$error,
      _ref$warning = _ref.warning,
      warning = _ref$warning === void 0 ? null : _ref$warning;

  return {
    store: store,
    touched: touched,
    warning: warning,
    error: error,
    value: value == null ? "" : value,
    required: rule.required,
    onChange: onChange
  };
}

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf__default['default'](Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf__default['default'](this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn__default['default'](this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var HeriduxForm = /*#__PURE__*/function (_FormStore) {
  _inherits__default['default'](HeriduxForm, _FormStore);

  var _super = _createSuper(HeriduxForm);

  function HeriduxForm() {
    _classCallCheck__default['default'](this, HeriduxForm);

    return _super.apply(this, arguments);
  }

  _createClass__default['default'](HeriduxForm, [{
    key: "createFormComponent",
    value: function createFormComponent() {
      var useHeriduxHook = this.createHook();

      var FormComponent = function FormComponent(props) {
        return /*#__PURE__*/React__default['default'].createElement(react.Provider, {
          value: useHeriduxHook()
        }, /*#__PURE__*/React__default['default'].createElement(Form, props));
      };

      return FormComponent;
    }
  }]);

  return HeriduxForm;
}(FormStore__default['default']);

Object.defineProperty(exports, 'Provider', {
enumerable: true,
get: function () {
return react.Provider;
}
});
Object.defineProperty(exports, 'useHeridux', {
enumerable: true,
get: function () {
return react.useHeridux;
}
});
exports.Form = Form;
exports.default = HeriduxForm;
exports.useFormControl = useFormControl;

Object.defineProperty(exports, '__esModule', { value: true });

})));
