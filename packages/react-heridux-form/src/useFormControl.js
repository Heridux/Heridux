/* eslint-disable max-statements */
import { useCallback } from "react"
import { useStore, useSelector } from "@heridux/react"
import { normalizeKey, stringifyKey } from "@heridux/form"

export default function useFormControl(formKey, validationRule) {
  const key = normalizeKey(formKey)
  const strKey = stringifyKey(formKey)
  const store = useStore()
  const field = useSelector(state => state.getIn(["form", ...key]))

  const onChange = useCallback(e => {
    const val = e && e.target ? e.target.value : e

    store.setFieldValue(strKey, val)
  }, [store, strKey])

  if (!store) return {}

  let rule = store.getValidationRules(key)

  if (!rule || !field) {

    if (validationRule && store.templateDriven) {
      const path = [...key]
      const lastKey = path.pop()

      store.addFields(path, { [lastKey] : validationRule })

      rule = validationRule

    } else {
      const msg = `[${key.join()}] is not a known key in form ${store.STATE_PROPERTY}`

      console.error(msg, store.validationRules)
      throw new Error(msg)
    }
  }

  const { value = null, touched = false, error = null, warning = null } = field || {}

  return {
    store,
    touched,
    warning,
    error,
    value : value == null ? "" : value,
    required : rule.required,
    onChange
  }
}
