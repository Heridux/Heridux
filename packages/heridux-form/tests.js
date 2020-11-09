/* eslint no-unused-expressions:0 max-statements:0*/
import FormStore, { Rules, type } from "./"

describe("mreact/lib/heridux/Form", () => {

  const myRedux = new FormStore("FORM_EXAMPLE")

  myRedux.defineForm({
    name : Rules.string.isRequired,
    age : Rules.number,
    genre : Rules.custom(val => { return (["male", "female"].indexOf(val) === -1) ? "incorrect genre" : "" }),
    hobbies : {
      first : Rules.all([Rules.string, Rules.minLength(3)]).isRequired,
      second : Rules.all([Rules.string, Rules.minLength(3)]).isRequired
    }
  })

  myRedux.register()

  it("should define form", () => {

    const name = myRedux.getIn(["form", "name"])

    expect(name).to.have.property("value")
    expect(name).to.have.property("warning")
    expect(name).to.have.property("error")
    expect(name).to.have.property("initialValue")
    expect(myRedux.getIn(["form", "name", "touched"])).to.equal(false)
  })

  it("should set field", () => {

    myRedux.setFieldValue("name", "Yannick")

    expect(myRedux.getIn(["form", "name", "value"])).to.equal("Yannick")
    expect(myRedux.getFieldValue("name")).to.equal("Yannick")
    expect(myRedux.getIn(["form", "name", "touched"])).to.equal(true)

  })

  it("should unset field", () => {

    myRedux.setFieldValue("name", null)

    expect(myRedux.getIn(["form", "name", "value"])).to.be.null

    expect(myRedux.getIn(["form", "name", "touched"])).to.equal(false)

  })

  it("should init field", () => {

    myRedux.initFieldValue("name", "Yannick")

    expect(myRedux.getIn(["form", "name", "value"])).to.equal("Yannick")
    expect(myRedux.getIn(["form", "name", "touched"])).to.equal(false)

  })

  it("should set subfield", () => {

    const key = ["hobbies", "first"]

    myRedux.setFieldValue(key, "aerial")

    expect(myRedux.getIn(["form", ...key, "value"])).to.equal("aerial")
    expect(myRedux.getFieldValue(["hobbies", "first"])).to.equal("aerial")

  })

  it("should set field warning", () => {

    const key = ["hobbies", "first"]

    myRedux.setFieldWarning(key, "be careful")

    expect(myRedux.getFieldWarning(["hobbies", "first"]).message).to.equal("be careful")

  })

  it("should set field error", () => {

    const key = ["hobbies", "first"]

    myRedux.setFieldError(key, "sorry guy")

    expect(myRedux.getFieldError(["hobbies", "first"]).message).to.equal("sorry guy")

  })

  it("should add an error", () => {

    myRedux.setFieldValue("genre", "masculin")

    expect( myRedux.getFieldError("genre").message ).to.equal("incorrect genre")

  })

  it("should init form values", () => {

    const initialValues = {
      name : "Paul",
      age : "Jackson",
      genre : "male",
      hobbies : {
        first : "weapons",
        second : "hamburgers"
      }
    }

    myRedux.initFormValues(initialValues)

    expect( myRedux.getFieldValue("name") ).to.equal("Paul")
    expect( myRedux.getFieldValue(["hobbies", "first"]) ).to.equal("weapons")
    expect( myRedux.isFieldTouched(["hobbies", "first"]) ).to.be.false
    expect( myRedux.getFormValues() ).to.deep.equal(initialValues)
    expect( myRedux.isFormTouched() ).to.be.false

  })

  it("should set form values", () => {

    const values = {
      name : "Pauline",
      age : "Croze",
      genre : "female",
      hobbies : {
        first : "music",
        second : "music"
      }
    }

    myRedux.setFormValues(values)

    expect( myRedux.getFieldValue("name") ).to.equal("Pauline")
    expect( myRedux.getFieldValue(["hobbies", "first"]) ).to.equal("music")
    expect( myRedux.isFieldTouched(["hobbies", "first"]) ).to.be.true
    expect( myRedux.isFormTouched() ).to.be.true

  })

  it("should cancel form values", () => {

    myRedux.cancelFormValues()

    expect( myRedux.getFieldValue("name") ).to.equal("Paul")
    expect( myRedux.getFieldValue(["hobbies", "first"]) ).to.equal("weapons")
    expect( myRedux.isFieldTouched(["hobbies", "first"]) ).to.be.false
    expect( myRedux.isFormTouched() ).to.be.false

  })

  it("should reset form values", () => {

    myRedux.resetFormValues()

    expect( myRedux.getFieldValue("name") ).to.be.null
    expect( myRedux.getFieldValue(["hobbies", "first"]) ).to.be.null
    expect( myRedux.isFieldTouched(["hobbies", "first"]) ).to.be.false
    expect( myRedux.isFormTouched() ).to.be.false

  })

  it("should manage object values", () => {

    myRedux.addFields([], { period : null })

    const date = Number(new Date())

    myRedux.setFieldValue("period", {
      dateStart : date,
      dateEnd : date
    })

    expect( myRedux.getFieldValue("period") ).to.eql({ dateStart : date, dateEnd : date })

    expect( myRedux.getFormValues().period ).to.eql({ dateStart : date, dateEnd : date })

  })

  it("should add fields", () => {

    const key = ["hobbies", "third"]

    myRedux.addFields(key, type("string"))

    myRedux.initFieldValue(key, "javascript")

    expect( myRedux.getFieldValue(key) ).to.equal("javascript")

    myRedux.setFieldValue(key, 25)

    expect( myRedux.getFieldError(key) ).to.be.a("string")

  })

})
