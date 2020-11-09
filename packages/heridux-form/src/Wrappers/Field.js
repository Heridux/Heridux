import React, { memo, useCallback, useContext } from "react"
import PropTypes from "prop-types"
import { useFormControl } from "../React"
import Rules from "../Rules"
import { context } from "./Context"

const Field = memo(({ children, formKey, validationRule }) => {
  const contextKey = useContext(context)?.formKey
  const { value, onChange } = useFormControl(formKey || contextKey, validationRule)
  const child = React.Children.only(children)
  const { onChange : originalOnChange } = child.props

  let handleChange = onChange

  if (originalOnChange) {
    handleChange = useCallback((...args) => {
      onChange(...args)
      originalOnChange(...args)
    }, [originalOnChange])
  }

  return React.cloneElement(child, { value, onChange : handleChange })
})

Field.propTypes = {
  formKey : PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  validationRule : PropTypes.instanceOf(Rules),
  children : PropTypes.func
}

export default Field
