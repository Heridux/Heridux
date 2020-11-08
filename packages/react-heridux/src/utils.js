import React from "react"
import { Iterable } from "immutable"

export function toJS(Component) {
  return props => {
    const propsJS = Object.entries(props).reduce((newProps, prop) => {

      newProps[prop[0]] = Iterable.isIterable(prop[1]) ? prop[1].toJS() : prop[1]

      return newProps

    }, {})

    return <Component { ...propsJS }/>
  }
}
