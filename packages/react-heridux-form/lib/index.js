import _objectWithoutProperties from '../node_modules/@babel/runtime/helpers/objectWithoutProperties.js';
import _extends from '../node_modules/@babel/runtime/helpers/extends.js';
import _classCallCheck from '../node_modules/@babel/runtime/helpers/classCallCheck.js';
import _createClass from '../node_modules/@babel/runtime/helpers/createClass.js';
import _defineProperty from '../node_modules/@babel/runtime/helpers/defineProperty.js';
import '../node_modules/redux/es/redux.js';
import '../node_modules/immutable/dist/immutable.es.js';
import '../../heridux/lib/index.js';
import '../node_modules/@babel/runtime/helpers/typeof.js';
import '../node_modules/lodash/isPlainObject.js';
import _inherits from '../node_modules/@babel/runtime/helpers/inherits.js';
import _possibleConstructorReturn from '../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js';
import _getPrototypeOf from '../node_modules/@babel/runtime/helpers/getPrototypeOf.js';
import '../node_modules/@babel/runtime/helpers/wrapNativeSuper.js';
import '../../heridux-form-rules/lib/index.js';
import _toConsumableArray from '../node_modules/@babel/runtime/helpers/toConsumableArray.js';
import '../node_modules/lodash/isEqual.js';
import { n as normalizeKey } from '../../core-5727f50c.js';
import '../node_modules/@babel/runtime/helpers/slicedToArray.js';
import '../node_modules/@babel/runtime/helpers/get.js';
import FormStore from '../../heridux-form-arrays/lib/index.js';
import React, { memo, useEffect, useCallback } from '../node_modules/react/index.js';
import '../node_modules/react-redux/es/index.js';
import { useHeridux, Provider } from '../../react-heridux/lib/index.js';
export { Provider, useHeridux } from '../../react-heridux/lib/index.js';
import PropTypes from '../node_modules/prop-types/index.js';

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
