import React from "react"
import PropTypes from "prop-types"

export const context = React.createContext()

const Context = ({ formKey, ...rest }) => <context.Provider value={ { formKey } } { ...rest }/>

Context.propTypes = {
  formKey : PropTypes.oneOf([PropTypes.string, PropTypes.array])
}

Context.displayName = "WrapContext"

export default Context
