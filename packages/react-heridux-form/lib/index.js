import { normalizeKey } from '@heridux/form';
import _extends from '@babel/runtime/helpers/extends';
import React, { memo, useEffect, useCallback } from 'react';
import FormStore from '@heridux/form-arrays';
import { useHeridux, Provider } from '@heridux/react';
export { Provider, useHeridux } from '@heridux/react';
import PropTypes from 'prop-types';

const Form = /*#__PURE__*/memo(({
  onSubmit,
  looseControl,
  children,
  onChange,
  ...rest
}) => {
  const store = useHeridux();
  const changesCount = store.get("changesCount");

  const handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    const test = store.checkForm();

    if (onSubmit && (test || looseControl)) {
      onSubmit(store.getFormValues());
    }
  };

  useEffect(() => {
    if (onChange) onChange(store.getFormValues());
  }, [changesCount, onChange]);
  useEffect(() => () => {
    if (store.templateDriven) {
      // nettoyage au démontage
      // store est un objet dont le prototype est le store réel
      Object.getPrototypeOf(store).validationRules = {};
    }
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

/* eslint-disable max-statements */
function useFormControl(formKey, validationRule) {
  const store = useHeridux();
  const onChange = useCallback(e => {
    const val = e && e.target ? e.target.value : e;
    store.setFieldValue(key, val);
  }, []);
  if (!store) return {};
  const key = normalizeKey(formKey);
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

class HeriduxForm extends FormStore {
  createFormComponent() {
    const useHeriduxHook = this.createHook();

    const FormComponent = props => /*#__PURE__*/React.createElement(Provider, {
      value: useHeriduxHook()
    }, /*#__PURE__*/React.createElement(Form, props));

    return FormComponent;
  }

}

export default HeriduxForm;
export { Form, useFormControl };
