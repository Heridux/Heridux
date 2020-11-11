/* eslint no-unused-expressions:0 max-statements:0*/
import Heridux from "./"

Heridux.createReduxStore()

describe("Heridux", () => {

  const myRedux = new Heridux("STORE_EXAMPLE")

  myRedux.setInitialState({
    items : ["toto", "tata", "titi"],
    type : "firstNames"
  })

  myRedux.createAction("editItem", (state, { index, name }) => state.setIn(["items", index], name))
  myRedux.createAction("changeType", (state, { type }) => state.set("type", type))

  myRedux.register()

  it("should prefix actions correctly", () => {

    const fullName = myRedux._getFullActionName("setItem")

    expect(fullName).to.equal("STORE_EXAMPLE/SET_ITEM")
  })

  it("should unprefix actions correctly", () => {

    const shortName = myRedux._getShortActionName("STORE_EXAMPLE/SET_ITEM")

    expect(shortName).to.equal("setItem")
  })

  it("should update list", () => {

    myRedux.execAction("editItem", { index : 0, name : "Yannick" })

    const items = myRedux.get("items")

    expect(items[0]).to.equal("Yannick")
    expect(items[1]).to.equal("tata")

  })

  it("should manage 'type' collision", () => {

    myRedux.execAction("changeType", { type : "lastNames" })

    expect(myRedux.get("type")).to.equal("lastNames")

  })


})
