# Heridux

The easiest way to use and reuse redux stores or react internal states.

## Packages

### [@heridux/core](packages/heridux)
A few lines of code to make redux more user-friendly, reusable and expandable.

```javascript
import Heridux from "@heridux/core"

const store = new Heridux("counterStore")

store.setInitialState({ counter : 0 })

store.createAction("increment", state => ({
  ...state, counter : state.counter + 1
}))

store.createAction("decrement", state => ({
  ...state, counter : state.counter - 1
}))

store.register()

store.execAction("increment")
store.get("counter") // 1
```

### [@heridux/immer](packages/heridux-immer)
Manage your state with [ImmerJS](https://immerjs.github.io/immer)

```javascript
import Heridux from "@heridux/immer"

const store = new Heridux("counterStore")

store.setInitialState({ counter : 0 })

store.createAction("increment", state => {
  state.counter++
})

store.createAction("decrement", state => {
  state.counter--
})
```

### [@heridux/imutable](packages/heridux-imutable)
Manage your state with [ImmutableJS](https://immutable-js.github.io/immutable-js/)

```javascript
import Heridux from "@heridux/immutable"

const store = new Heridux("counterStore")

store.setInitialState({ counter : 0 })

store.createAction("increment", state => (
  state.set("counter", state.get("counter") + 1)
))

store.createAction("decrement", state => (
  state.set("counter", state.get("counter") - 1)
))
```

### [@heridux/react](packages/react-heridux)
Use heridux with react (HOC or hook).

```javascript
import { useStore, useSelector } from "@heridux/react"

const MyComponent = () => {
  const store = useStore()
  const counter = useSelector(state => state.counter)

  return (
    <div>
      <p>Clicked: <span>{ counter }</span> times</p>
      <button onClick={ () => store.execAction("increment") }>+</button>
      <button onClick={ () => store.execAction("decrement") }>-</button>
    </div>
  )
}
```

### [@heridux/form-rules](packages/heridux-form-rules)
Type check your fields the way you know it with PropTypes

```javascript
import Rules from "@heridux/form-rules"

const form = {
  name : Rules.minLength(2).isRequired,
  age : Rules.number,
  birthday : Rules.date,
  genre : Rules.oneOf(["male", "female"]),
  email : Rules.email,
  hobbies : Rules.arrayOf([Rules.string])
}

try {
  form.name.check("Foo")
} catch (e) {
  console.error(e.message)
}
```

### [@heridux/form](packages/heridux-form)
Manage your forms easily with heridux-form.

```javascript
import HeriduxForm from "@heridux/form"
import Rules from "@heridux/rules"

const store = new HeriduxForm("myForm")

store.defineForm({
  name : Rules.string.isRequired,
  age : Rules.number,
  address : {
    street : Rules.string,
    city : Rules.string,
    zipCode : Rules.number
  }
})

store.register()

store.initFormValues({
  name : "Roger",
  age : 56
})

store.setFieldValue(["address", "city"], "Paris")

store.getFieldValue("age") // 56
```

### [@heridux/form-arrays](packages/heridux-form-arrays)
Manage easily array fields with heridux

```javascript
import HeriduxForm from "@heridux/form"
import Rules from "@heridux/form-rules"
import FormArrays from "@heridux/form-arrays"

const store = new HeriduxForm("myForm")

store.defineForm({
  name : Rules.string.isRequired,
  age : Rules.number,
  friends : FormArray({
    name : Rules.string.isRequired,
    age : Rules.number
  })
})

store.register()
```

### [@heridux/react-form](packages/react-heridux-form)
Use heridux forms with React

```javascript
import { useFormControl } from "@heridux/react-form"

const Field = ({ formKey }) => {
  const { value, onChange, error } = useFormControl(formKey)

  return (
    <div>
      <input value={ value } onChange={ onChange }>
      { error && <span style={ { color : "red" } }>{ error }</span>}
    </div>
  )
}
```
