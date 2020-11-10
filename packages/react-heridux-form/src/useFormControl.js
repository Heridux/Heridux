/* eslint-disable max-statements */
import { useCallback } from "react"
import { useHeridux } from "@heridux/form"
import { normalizeKey } from "@heridux/form/utils"

export default function useFormControl(formKey, validationRule) {

  const store = useHeridux()

  const onChange = useCallback(e => {
    const val = e && e.target ? e.target.value : e

    store.setFieldValue(key, val)
  }, [])

  if (!store) return {}

  const key = normalizeKey(formKey)
  const field = store.getIn(["form", ...key])

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
