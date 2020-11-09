import React from "react"
import FormStore from "../Remote"
import { Provider } from "../../"
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
