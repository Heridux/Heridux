import Heridux from "@heridux/react"
import PropTypes from "prop-types"
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

Heridux.createReduxStore()

const hStore = new Heridux("counterStore")

hStore.setInitialState({ counter : 0 })

hStore.createAction("increment", state => (
  state.set("counter", state.get("counter") + 1)
))

hStore.createAction("decrement", state => (
  state.set("counter", state.get("counter") - 1)
))

hStore.register()


class MyComponent extends React.Component {

  static propTypes = { counter : PropTypes.number }

  handleIncrement() { hStore.execAction("increment") }

  handleDecrement() { hStore.execAction("decrement") }

  render() {

    return (
      <div>
        <p>Clicked: <span>{ this.props.counter }</span> times</p>
        <button onClick={ this.handleIncrement }>+</button>
        <button onClick={ this.handleDecrement }>-</button>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  counter : state.get("counter")
})

const MyConnectedComponent = hStore.connect(mapStateToProps)(MyComponent)

ReactDOM.render(
  <Provider store={ Heridux.reduxStore }>
    <div>
      <MyConnectedComponent/>
    </div>
  </Provider>,
  document.getElementById("container")
)
