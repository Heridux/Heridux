import Heridux from "../src"

Heridux.createReduxStore()

const myRedux = new Heridux("STORE_EXAMPLE")

myRedux.setInitialState({
  items : ["toto", "tata", "titi"],
  type : "firstNames"
})

myRedux.createAction("editItem", (state, { index, name }) => {
  const newItems = [...state.items]

  newItems[index] = name

  return {
    ...state,
    items : newItems
  }
})

myRedux.createAction("changeType", (state, { type }) => ({ ...state, type }))

myRedux.register()

test("should prefix actions correctly", () => {

  const fullName = myRedux._getFullActionName("setItem")

  expect(fullName).toBe("STORE_EXAMPLE/SET_ITEM")
})

test("should unprefix actions correctly", () => {

  const shortName = myRedux._getShortActionName("STORE_EXAMPLE/SET_ITEM")

  expect(shortName).toBe("setItem")
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
