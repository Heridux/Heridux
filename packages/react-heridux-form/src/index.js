import React from "react"
import FormStore from "@heridux/form-arrays"
import { Provider } from "@heridux/react"
import Form from "./Form"

export { Provider, useSelector, useStore, connect } from "@heridux/react"
export { default as useFormControl } from "./useFormControl"
export { default as Form } from "./Form"

export default class HeriduxForm extends FormStore {

  createFormComponent() {
    return props => <Provider value={ this }><Form { ...props }/></Provider>
  }

}
