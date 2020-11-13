import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _inherits from '@babel/runtime/helpers/inherits';
import _possibleConstructorReturn from '@babel/runtime/helpers/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/getPrototypeOf';
import React, { memo, useEffect, useCallback } from 'react';
import FormStore from '@heridux/form-arrays';
import { useHeridux, Provider } from '@heridux/react';
export { Provider, useHeridux } from '@heridux/react';
import _extends from '@babel/runtime/helpers/extends';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import PropTypes from 'prop-types';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import { normalizeKey } from '@heridux/form';

var Form = /*#__PURE__*/memo(function (_ref) {
  var onSubmit = _ref.onSubmit,
      looseControl = _ref.looseControl,
      children = _ref.children,
      onChange = _ref.onChange,
      rest = _objectWithoutProperties(_ref, ["onSubmit", "looseControl", "children", "onChange"]);

  var store = useHeridux();
  var changesCount = store.get("changesCount");

  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    var test = store.checkForm();

    if (onSubmit && (test || looseControl)) {
      onSubmit(store.getFormValues());
    }
  };

  useEffect(function () {
    if (onChange) onChange(store.getFormValues());
  }, [changesCount]);
  useEffect(function () {
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
    React.createElement("form", _extends({}, rest, {
      onSubmit: handleSubmit
    }), children)
  );
});
Form.propTypes = {
  children: PropTypes.node,
  intl: PropTypes.object,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  looseControl: PropTypes.bool
};

function useFormControl(formKey, validationRule) {
  var store = useHeridux();
  var onChange = useCallback(function (e) {
    var val = e && e.target ? e.target.value : e;
    store.setFieldValue(key, val);
  }, []);
  if (!store) return {};
  var key = normalizeKey(formKey);
  var field = store.getIn(["form"].concat(_toConsumableArray(key)));
  var rule = store.getValidationRules(key);

  if (!rule || !field) {
    if (validationRule && store.templateDriven) {
      var path = _toConsumableArray(key);

      var lastKey = path.pop();
      store.addFields(path, _defineProperty({}, lastKey, validationRule));
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

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var HeriduxForm = /*#__PURE__*/function (_FormStore) {
  _inherits(HeriduxForm, _FormStore);

  var _super = _createSuper(HeriduxForm);

  function HeriduxForm() {
    _classCallCheck(this, HeriduxForm);

    return _super.apply(this, arguments);
  }

  _createClass(HeriduxForm, [{
    key: "createFormComponent",
    value: function createFormComponent() {
      var useHeriduxHook = this.createHook();

      var FormComponent = function FormComponent(props) {
        return /*#__PURE__*/React.createElement(Provider, {
          value: useHeriduxHook()
        }, /*#__PURE__*/React.createElement(Form, props));
      };

      return FormComponent;
    }
  }]);

  return HeriduxForm;
}(FormStore);

export default HeriduxForm;
export { Form, useFormControl };
