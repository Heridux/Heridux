/* eslint no-unused-expressions:0 max-statements:0*/
import Heridux from "@heridux/core"
import FormStore, { Rules } from "../lib"

Heridux.createReduxStore()

const myRedux = new FormStore("FORM_EXAMPLE")

myRedux.defineForm({
  name : Rules.string.isRequired,
  age : Rules.number,
  genre : Rules.custom(val => {
    if (!["male", "female"].includes(val)) throw new Error("incorrect genre")

    return true
  }),
  hobbies : {
    first : Rules.all([Rules.string, Rules.minLength(3)]).isRequired,
    second : Rules.all([Rules.string, Rules.minLength(3)]).isRequired
  }
})

myRedux.register()

test("should define form", () => {

  const name = myRedux.getIn(["form", "name"])

  expect(name).toHaveProperty("value")
  expect(name).toHaveProperty("warning")
  expect(name).toHaveProperty("error")
  expect(name).toHaveProperty("initialValue")
  expect(myRedux.getIn(["form", "name", "touched"])).toBe(false)
})

test("should set field", () => {

  myRedux.setFieldValue("name", "Yannick")

  expect(myRedux.getIn(["form", "name", "value"])).toBe("Yannick")
  expect(myRedux.getFieldValue("name")).toBe("Yannick")
  expect(myRedux.getIn(["form", "name", "touched"])).toBe(true)

})

test("should unset field", () => {

  myRedux.setFieldValue("name", null)

  expect(myRedux.getIn(["form", "name", "value"])).toBeNull()
  expect(myRedux.getIn(["form", "name", "touched"])).toBe(false)

})

test("should init field", () => {

  myRedux.initFieldValue("name", "Yannick")

  expect(myRedux.getIn(["form", "name", "value"])).toBe("Yannick")
  expect(myRedux.getIn(["form", "name", "touched"])).toBe(false)

})

test("should set subfield", () => {

  const key = ["hobbies", "first"]

  myRedux.setFieldValue(key, "aerial")

  expect(myRedux.getIn(["form", ...key, "value"])).toBe("aerial")
  expect(myRedux.getFieldValue(["hobbies", "first"])).toBe("aerial")

})

test("should set field warning", () => {

  const key = ["hobbies", "first"]

  myRedux.setFieldWarning(key, "be careful")

  expect(myRedux.getFieldWarning(["hobbies", "first"]).message).toBe("be careful")

})

test("should set field error", () => {

  const key = ["hobbies", "first"]

  myRedux.setFieldError(key, "sorry guy")

  expect(myRedux.getFieldError(["hobbies", "first"]).message).toBe("sorry guy")

})

test("should add an error", () => {

  myRedux.setFieldValue("genre", "masculin")

  expect( myRedux.getFieldError("genre").message ).toBe("incorrect genre")

})

test("should init form values", () => {

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

  expect( myRedux.getFieldValue("name") ).toBe("Paul")
  expect( myRedux.getFieldValue(["hobbies", "first"]) ).toBe("weapons")
  expect( myRedux.isFieldTouched(["hobbies", "first"]) ).toBeFalsy()
  expect( myRedux.getFormValues() ).toEqual(initialValues)
  expect( myRedux.isFormTouched() ).toBeFalsy()

})

test("should set form values", () => {

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

  expect( myRedux.getFieldValue("name") ).toBe("Pauline")
  expect( myRedux.getFieldValue(["hobbies", "first"]) ).toBe("music")
  expect( myRedux.isFieldTouched(["hobbies", "first"]) ).toBeTruthy()
  expect( myRedux.isFormTouched() ).toBeTruthy()

})

test("should cancel form values", () => {

  myRedux.cancelFormValues()

  expect( myRedux.getFieldValue("name") ).toBe("Paul")
  expect( myRedux.getFieldValue(["hobbies", "first"]) ).toBe("weapons")
  expect( myRedux.isFieldTouched(["hobbies", "first"]) ).toBeFalsy()
  expect( myRedux.isFormTouched() ).toBeFalsy()

})

test("should reset form values", () => {

  myRedux.resetFormValues()

  expect( myRedux.getFieldValue("name") ).toBeNull()
  expect( myRedux.getFieldValue(["hobbies", "first"]) ).toBeNull()
  expect( myRedux.isFieldTouched(["hobbies", "first"]) ).toBeFalsy()
  expect( myRedux.isFormTouched() ).toBeFalsy()

})

test("should manage object values", () => {

  myRedux.addFields([], { period : null })

  const date = Number(new Date())

  myRedux.setFieldValue("period", {
    dateStart : date,
    dateEnd : date
  })

  expect( myRedux.getFieldValue("period") ).toEqual({ dateStart : date, dateEnd : date })

  expect( myRedux.getFormValues().period ).toEqual({ dateStart : date, dateEnd : date })

})

test("should add fields", () => {

  const key = ["hobbies", "third"]

  myRedux.addFields(key, Rules.string)

  myRedux.initFieldValue(key, "javascript")

  expect( myRedux.getFieldValue(key) ).toBe("javascript")

  myRedux.setFieldValue(key, 25)

  expect(typeof myRedux.getFieldError(key).message).toBe("string")

})
