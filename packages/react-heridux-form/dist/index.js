(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('@heridux/form-arrays'), require('@heridux/react'), require('@babel/runtime/helpers/extends'), require('@heridux/form')) :
typeof define === 'function' && define.amd ? define(['exports', 'react', '@heridux/form-arrays', '@heridux/react', '@babel/runtime/helpers/extends', '@heridux/form'], factory) :
(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ReactHeriduxForm = {}, global.React, global.HeriduxForm, global.ReactHeridux, global._extends, global.HeriduxForm));
}(this, (function (exports, React, FormStore, react, _extends, form) { 'use strict';

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var FormStore__default = /*#__PURE__*/_interopDefaultLegacy(FormStore);
var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);

function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const Form = /*#__PURE__*/React.memo(({
  onSubmit,
  looseControl,
  children,
  onChange,
  ...rest
}) => {
  const store = react.useStore();
  const changesCount = react.useSelector(state => state.get("changesCount"));
  const prevChangesCount = usePrevious(changesCount);
  const handleSubmit = React.useCallback(e => {
    e.preventDefault();
    e.stopPropagation();
    const test = store.checkForm();

    if (onSubmit && (test || looseControl)) {
      onSubmit(store.getFormValues());
    }
  }, [store, looseControl, onSubmit]);
  React.useEffect(() => {
    if (onChange && changesCount !== prevChangesCount) onChange(store.getFormValues());
  }, [store, onChange, changesCount, prevChangesCount]);
  React.useEffect(() => () => {
    if (store.templateDriven) {
      // nettoyage au démontage
      store.validationRules = {};
    }
  }, [store]);
  return /*#__PURE__*/React__default['default'].createElement("form", _extends__default['default']({}, rest, {
    onSubmit: handleSubmit
  }), children);
});

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
  set templateDriven(bool) {
    this._templateDriven = Boolean(bool);
  }

  get templateDriven() {
    return Boolean(this._templateDriven);
  }

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
