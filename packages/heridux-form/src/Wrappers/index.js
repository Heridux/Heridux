import React from "react"
import Context from "./Context"
import Field from "./Field"
import Error from "./Error"

Context.Field = Field
Context.Error = Error

const Warning = props => <Error level="warning" { ...props }/>

Context.Warning = Warning

export default Context
