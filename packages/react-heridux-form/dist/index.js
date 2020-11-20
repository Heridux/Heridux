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
  const store = react.useStore();
  const changesCount = react.useSelector(state => state.get("changesCount"));
  const handleSubmit = React.useCallback(e => {
    e.preventDefault();
    e.stopPropagation();
    const test = store.checkForm();

    if (onSubmit && (test || looseControl)) {
      onSubmit(store.getFormValues());
    }
  }, [store, looseControl, onSubmit]);
  React.useEffect(() => {
    if (onChange) onChange(store.getFormValues());
  }, [store, onChange, changesCount]);
  React.useEffect(() => () => {
    if (store.templateDriven) {
      // nettoyage au démontage
      // store est un objet dont le prototype est le store réel
      Object.getPrototypeOf(store).validationRules = {};
    }
  }, [store]);
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
  onSubmit: PropTypes__default['default'].func,
  onChange: PropTypes__default['default'].func,
  looseControl: PropTypes__default['default'].bool
};

/* eslint-disable max-statements */
function useFormControl(formKey, validationRule) {
  const key = form.normalizeKey(formKey);
  const strKey = form.stringifyKey(formKey);
  const store = react.useStore();
  const field = react.useSelector(state => state.getIn(["form", ...key]));
  const onChange = React.useCallback(e => {
    const val = e && e.target ? e.target.value : e;
    store.setFieldValue(strKey, val);
  }, [store, strKey]);
  if (!store) return {};
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
    return props => /*#__PURE__*/React__default['default'].createElement(react.Provider, {
      value: this
    }, /*#__PURE__*/React__default['default'].createElement(Form, props));
  }

}

Object.defineProperty(exports, 'Provider', {
enumerable: true,
get: function () {
return react.Provider;
}
});
Object.defineProperty(exports, 'connect', {
enumerable: true,
get: function () {
return react.connect;
}
});
Object.defineProperty(exports, 'useSelector', {
enumerable: true,
get: function () {
return react.useSelector;
}
});
Object.defineProperty(exports, 'useStore', {
enumerable: true,
get: function () {
return react.useStore;
}
});
exports.Form = Form;
exports.default = HeriduxForm;
exports.useFormControl = useFormControl;

Object.defineProperty(exports, '__esModule', { value: true });

})));
