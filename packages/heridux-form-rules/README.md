# heridux-form-rules
## Type check your fields the way you know it with PropTypes

```javascript
import Rules, { FormError, FormWarning } from "@heridux/form-rules"

const form = {
  anyType : Rules.any,

  booleans : Rules.bool,

  strings : {

    any : Rules.string,

    alphaNum : Rules.alphaNum(),

    alphaNumWithSpecialChars : Rules.alphaNum("-"),

    minLength : Rules.minLength(2),

    maxLength : Rules.maxLength(20),

    slug : Rules.slug,

    date : Rules.date,

    regex : Rules.regex(/^[A-Z]/)
  },

  numbers : {

    any : Rules.number,

    integer : Rules.integer,

    minValue : Rules.minValue(0),

    maxValue : Rules.maxValue(150)
  },

  arrays : {

    any : Rules.array,

    typed : Rules.arrayOf(Rules.string)
  },

  objects : {

    any : Rules.object,

    plainObject : Rules.plainObject,

    specificKeys : Rules.shape({
      name : Rules.string,
      age : Rules.integer
    }),

    instance : Rules.instanceOf(moment)
  },

  specificValues : Rules.oneOf(["AM", "PM"]),

  required : Rules.any.isRequired,

  combinations : Rules.all([
    Rules.string,
    Rules.minLength(2),
    Rules.maxLength(20)
  ]),

  customRules : {

    basic : Rules.custom((value/* , allValues */) => {
      if (value !== "foo") {
        throw new Error("foo is the only correct value")
      }
    }),

    withParams : Rules.custom((value/* , allValues */) => {
      const min = 2

      if (value.length < min) {
        // To pass translation parameters you must use the FormError constructor
        // rather than a generic Error
        throw new FormError("errorMinLength", { value, min })

      } else if (value.length < min + 2) {
        // You can also throw FormWarning object to get a warning level alert
        throw new FormWarning("errorMinLength", { value, min })
      }
    })

  }

})


try {
  form.customRules.basic.check("Foo")
} catch (e) {
  console.error(e.message)
}
```
