import React, { memo, useEffect } from "react"
import PropTypes from "prop-types"
import { useHeridux } from "../.."

const Form = memo(({ onSubmit, looseControl, children, onChange, ...rest }) => {

  const store = useHeridux()

  const changesCount = store.get("changesCount")

  const handleSubmit = e => {
    e.preventDefault()
    e.stopPropagation()

    const test = store.checkForm()

    if (onSubmit && (test || looseControl)) {
      onSubmit(store.getFormValues())
    }
  }

  useEffect(() => {
    if (onChange) onChange(store.getFormValues())
  }, [changesCount])

  useEffect(() => () => {
    if (store.templateDriven) { // nettoyage au démontage
      // store est un objet dont le prototype est le store réel
      Object.getPrototypeOf(store).validationRules = {}
    }
  }, [])

  return (
    // eslint-disable-next-line react/jsx-no-bind
    <form { ...rest } onSubmit={ handleSubmit }>
      { children }
    </form>
  )

})

Form.propTypes = {
  children : PropTypes.node,
  intl : PropTypes.object,
  onSubmit : PropTypes.func,
  onChange : PropTypes.func,
  looseControl : PropTypes.bool
}

export default Form
