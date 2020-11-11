import isPlainObject from "lodash/isPlainObject"
import { /* FormWarning,*/ FormError } from "./Errors"

export const required = value => {
  if (value != null && String(value).length > 0) return true

  throw new FormError("errorRequired")
}

export const minValue = min => value => {
  if (value >= min) return true

  throw new FormError("errorMinValue", { value, min })
}

export const maxValue = max => value => {
  if (value <= max) return true

  throw new FormError("errorMaxValue", { value, max })
}

export const minLength = min => value => {
  if (value && value.length >= min) return true

  throw new FormError("errorMinLength", { value, min })
}

export const maxLength = max => value => {
  if (!value || (value && value.length <= max)) return true

  throw new FormError("errorMaxLength", { value, max })
}

export const type = typeName => value => {
  let test

  if (typeName === "array") test = Array.isArray(value)
  else if (typeName === "plainObject") test = isPlainObject(value)
  else if (typeName === "integer") test = Number.isInteger(value)
  else if (value === null || value === undefined) test = true
  else test = typeof value === typeName

  if (!test) throw new FormError("typeInvalid", { value, typeName })

  return true
}

export const instance = Construct => value => {
  if (value instanceof Construct) return true

  throw new FormError("instanceInvalid", { value, constructor : Construct.name })
}

export const slug = value => {
  if (/^[\w-.]+$/.test(value)) return true

  throw new FormError("slugInvalid")
}

export const email = value => {
  if (/^[\w.!#$%&’*+/=?^_`{|}~-]+@[\w-]+(?:\.[\w-]+)*$/.test(value)) return true

  throw new FormError("emailInvalid")
}

export const id = value => {
  if (value == null || typeof value === "string") return true

  throw new FormError("idInvalid")
}

export const alphaNum = (additionalChars = "") => {
  const accents = "áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ"
  const chars = additionalChars.replace(/./g, s => "\\" + s)
  const regex = new RegExp("^[\\w" + accents + chars + ". ]*$")

  return value => {
    if (regex.test(value)) return true

    throw new FormError("errorAlphaNum", { additionalChars })
  }
}

export const oneOf = values => value => {
  if (values.includes(value)) return true

  throw new FormError("choiceInvalid", { values, value })
}

export const regex = reg => value => {
  if (reg.test(value)) return true

  throw new FormError("invalidRegex", { regex : reg.toString() })
}

export const date = value => {
  if (isNaN(new Date(value))) throw new FormError("dateInvalid")

  return true
}
