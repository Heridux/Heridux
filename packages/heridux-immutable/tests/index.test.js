/* eslint no-unused-expressions:0 max-statements:0*/
import Heridux from "../src"
import { Map } from "immutable"

Heridux.createReduxStore()

const myRedux = new Heridux("STORE_EXAMPLE")

myRedux.setInitialState({
  items : ["toto", "tata", "titi"],
  type : "firstNames"
})

myRedux.createAction("editItem", (state, { index, name }) => state.setIn(["items", index], name))

myRedux.createAction("changeType", (state, { type }) => state.set("type", type))

myRedux.register()

test("should store as immutable", () => {

  expect(myRedux.getState()).toBeInstanceOf(Map)
})

test("should update list", () => {

  myRedux.execAction("editItem", { index : 0, name : "Yannick" })

  const items = myRedux.get("items")

  expect(items[0]).toBe("Yannick")
  expect(items[1]).toBe("tata")

})

test("should manage 'type' collision", () => {

  myRedux.execAction("changeType", { type : "lastNames" })

  expect(myRedux.get("type")).toBe("lastNames")

})
