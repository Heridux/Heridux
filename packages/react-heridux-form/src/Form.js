import React, { memo, useEffect, useCallback } from "react"
import PropTypes from "prop-types"
import { useSelector, useStore } from "@heridux/react"

const Form = memo(({ onSubmit, looseControl, children, onChange, ...rest }) => {
  const store = useStore()
  const changesCount = useSelector(state => state.get("changesCount"))

  const handleSubmit = useCallback(e => {
    e.preventDefault()
    e.stopPropagation()

    const test = store.checkForm()

    if (onSubmit && (test || looseControl)) {
      onSubmit(store.getFormValues())
    }
  }, [store, looseControl, onSubmit])

  useEffect(() => {
    if (onChange) onChange(store.getFormValues())
  }, [store, onChange, changesCount])

  useEffect(() => () => {
    if (store.templateDriven) { // nettoyage au démontage
      // store est un objet dont le prototype est le store réel
      Object.getPrototypeOf(store).validationRules = {}
    }
  }, [store])

  return (
    // eslint-disable-next-line react/jsx-no-bind
    <form { ...rest } onSubmit={ handleSubmit }>
      { children }
    </form>
  )

})

Form.propTypes = {
  children : PropTypes.node,
  onSubmit : PropTypes.func,
  onChange : PropTypes.func,
  looseControl : PropTypes.bool
}

export default Form
