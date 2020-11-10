import React from "react"
import FormStore from "@heridux/form-arrays"
import { Provider } from "@heridux/form"
import Form from "./Form"

export { default as useFormControl } from "./useFormControl"
export { default as Form } from "./Form"

export default class HeriduxForm extends FormStore {

  createFormComponent() {

    const useHeriduxHook = this.createHook()

    const FormComponent = props => (
      <Provider value={ useHeriduxHook() }>
        <Form { ...props }/>
      </Provider>
    )

    return FormComponent
  }

}
