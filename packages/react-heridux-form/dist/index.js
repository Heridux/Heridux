(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('@heridux/form-arrays'), require('@heridux/react'), require('@babel/runtime/helpers/extends'), require('prop-types'), require('@heridux/form')) :
typeof define === 'function' && define.amd ? define(['exports', 'react', '@heridux/form-arrays', '@heridux/react', '@babel/runtime/helpers/extends', 'prop-types', '@heridux/form'], factory) :
(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ReactHeriduxForm = {}, global.React, global.HeriduxForm, global.ReactHeridux, global._extends, global.PropTypes, global.HeriduxForm));
}(this, (function (exports, React, FormStore, react, _extends, PropTypes, form) { 'use strict';

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var FormStore__default = /*#__PURE__*/_interopDefaultLegacy(FormStore);
var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

const Form = /*#__PURE__*/React.memo(({
  onSubmit,
  looseControl,
  children,
  onChange,
  ...rest
}) => {
  const store = react.useHeridux();
  const changesCount = store.get("changesCount");

  const handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    const test = store.checkForm();

    if (onSubmit && (test || looseControl)) {
      onSubmit(store.getFormValues());
    }
  };

  React.useEffect(() => {
    if (onChange) onChange(store.getFormValues());
  }, [changesCount, onChange]);
  React.useEffect(() => () => {
    if (store.templateDriven) {
      // nettoyage au démontage
      // store est un objet dont le prototype est le store réel
      Object.getPrototypeOf(store).validationRules = {};
    }
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

/* eslint-disable max-statements */
function useFormControl(formKey, validationRule) {
  const store = react.useHeridux();
  const onChange = React.useCallback(e => {
    const val = e && e.target ? e.target.value : e;
    store.setFieldValue(key, val);
  }, []);
  if (!store) return {};
  const key = form.normalizeKey(formKey);
  const field = store.getIn(["form", ...key]);
  let rule = store.getValidationRules(key);

  if (!rule || !field) {
    if (validationRule && store.templateDriven) {
      const path = [...key];
      const lastKey = path.pop();
      store.addFields(path, {
        [lastKey]: validationRule
      });
      rule = validationRule;
    } else {
      const msg = `[${key.join()}] is not a known key in form ${store.STATE_PROPERTY}`;
      console.error(msg, store.validationRules);
      throw new Error(msg);
    }
  }

  const {
    value = null,
    touched = false,
    error = null,
    warning = null
  } = field || {};
  return {
    store,
    touched,
    warning,
    error,
    value: value == null ? "" : value,
    required: rule.required,
    onChange
  };
}

class HeriduxForm extends FormStore__default['default'] {
  createFormComponent() {
    const useHeriduxHook = this.createHook();

    const FormComponent = props => /*#__PURE__*/React__default['default'].createElement(react.Provider, {
      value: useHeriduxHook()
    }, /*#__PURE__*/React__default['default'].createElement(Form, props));

    return FormComponent;
  }

}

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
