import React from "react"

export function toJS(Component) {
  return props => {
    const propsJS = Object.entries(props).reduce((newProps, prop) => {

      newProps[prop[0]] = (typeof prop[1]?.toJS === "function") ? prop[1].toJS() : prop[1]

      return newProps

    }, {})

    return <Component { ...propsJS }/>
  }
}
