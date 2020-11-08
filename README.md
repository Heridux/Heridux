# Heridux

The easiest way to use and reuse redux stores

## Packages

### [@heridux/core](tree/main/packages/heridux)
A few lines of code to make redux more user-friendly.

```javascript
const store = new Heridux("counterStore")

store.setInitialState({ counter : 0 })

store.createAction("increment", state => (
  state.set("counter", state.get("counter") + 1)
))

store.createAction("decrement", state => (
  state.set("counter", state.get("counter") - 1)
))

store.execAction("increment")
store.get("counter") // 1
```

### [@heridux/react](tree/main/packages/react-heridux)
Use heridux with react (HOC or hook).

```javascript
const MyComponent = () => {
  const store = useHeridux()
  return (
    <div>
      <p>Clicked: <span>{ store.get("counter") }</span> times</p>
      <button onClick={ () => store.execAction("increment") }>+</button>
      <button onClick={ () => store.execAction("increment") }>-</button>
    </div>
  )
}
```
