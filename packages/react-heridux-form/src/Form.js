/* eslint-disable react/prop-types */
import React, { memo, useEffect, useCallback, useRef } from "react"
import { useSelector, useStore } from "@heridux/react"

// https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
function usePrevious(value) {
  const ref = useRef()

  useEffect(() => { ref.current = value })

  return ref.current
}

const Form = memo(({ onSubmit, looseControl, children, onChange, ...rest }) => {
  const store = useStore()
  const changesCount = useSelector(state => state.get("changesCount"))
  const prevChangesCount = usePrevious(changesCount)

  const handleSubmit = useCallback(e => {
    e.preventDefault()
    e.stopPropagation()

    const test = store.checkForm()

    if (onSubmit && (test || looseControl)) {
      onSubmit(store.getFormValues())
    }
  }, [store, looseControl, onSubmit])

  useEffect(() => {
    if (onChange && changesCount !== prevChangesCount) onChange(store.getFormValues())
  }, [store, onChange, changesCount, prevChangesCount])

  useEffect(() => () => {
    if (store.templateDriven) { // nettoyage au démontage
      store.validationRules = {}
    }
  }, [store])

  return (
    <form { ...rest } onSubmit={ handleSubmit }>
      { children }
    </form>
  )

})

export default Form
