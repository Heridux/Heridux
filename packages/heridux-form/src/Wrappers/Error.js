import React, { memo, useContext } from "react"
import PropTypes from "prop-types"
import { useFormControl } from "../React"
import Rules from "../Rules"
import { context } from "./Context"

const FieldError = memo(({ children, formKey, validationRule, level }) => {
  const contextKey = useContext(context)?.formKey
  const { error, warning } = useFormControl(formKey || contextKey, validationRule)
  const child = React.Children.only(children)
  const childChildren = React.Children.toArray(child.props.children)
  const msg = (level === "error") ? error?.message : warning?.message

  return React.cloneElement(child, {}, msg ? [...childChildren, msg] : childChildren)
})

FieldError.propTypes = {
  formKey : PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  level : PropTypes.oneOf(["error", "warning"]),
  validationRule : PropTypes.instanceOf(Rules),
  children : PropTypes.func
}

FieldError.defaultProps = {
  level : "error"
}

export default FieldError
