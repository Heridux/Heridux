import React, { memo, useCallback, useEffect } from 'react';
import FormStore from '@heridux/form-arrays';
import { useStore, useSelector, Provider } from '@heridux/react';
export { Provider, connect, useSelector, useStore } from '@heridux/react';
import _extends from '@babel/runtime/helpers/extends';
import { normalizeKey, stringifyKey } from '@heridux/form';

const Form = /*#__PURE__*/memo(({
  onSubmit,
  looseControl,
  children,
  onChange,
  ...rest
}) => {
  const store = useStore();
  const changesCount = useSelector(state => state.get("changesCount"));
  const handleSubmit = useCallback(e => {
    e.preventDefault();
    e.stopPropagation();
    const test = store.checkForm();

    if (onSubmit && (test || looseControl)) {
      onSubmit(store.getFormValues());
    }
  }, [store, looseControl, onSubmit]);
  useEffect(() => {
    if (onChange) onChange(store.getFormValues());
  }, [store, onChange, changesCount]);
  useEffect(() => () => {
    if (store.templateDriven) {
      // nettoyage au démontage
      // store est un objet dont le prototype est le store réel
      Object.getPrototypeOf(store).validationRules = {};
    }
  }, [store]);
  return (
    /*#__PURE__*/
    // eslint-disable-next-line react/jsx-no-bind
    React.createElement("form", _extends({}, rest, {
      onSubmit: handleSubmit
    }), children)
  );
});

/* eslint-disable max-statements */
function useFormControl(formKey, validationRule) {
  const key = normalizeKey(formKey);
  const strKey = stringifyKey(formKey);
  const store = useStore();
  const field = useSelector(state => state.getIn(["form", ...key]));
  const onChange = useCallback(e => {
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

class HeriduxForm extends FormStore {
  set templateDriven(bool) {
    this._templateDriven = Boolean(bool);
  }

  get templateDriven() {
    return Boolean(this._templateDriven);
  }

  createFormComponent() {
    return props => /*#__PURE__*/React.createElement(Provider, {
      value: this
    }, /*#__PURE__*/React.createElement(Form, props));
  }

}

export default HeriduxForm;
export { Form, useFormControl };
