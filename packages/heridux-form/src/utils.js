export function normalizeKey(path) {

  if (path == null) {
    throw new Error("path is undefined. You may forgot the formKey property on your Control component ?")
  }

  return Array.isArray(path) ? [...path] : path.split(".")
}

export function stringifyKey(key) {
  if (typeof key === "string") return key
  else if (Array.isArray(key)) return key.join(".")
  else throw new TypeError((typeof key) + " : incorrect type for key")
}

export function getKeyValue(obj, key) {
  return obj && key.length ? getKeyValue(obj[key[0]], key.slice(1)) : obj
}

export function setKeyValue(obj, key, value) {

  if (!Array.isArray(key)) throw new Error("key must be an Array")

  if (key.length === 0) throw new Error("key is empty.")

  if (key.length === 1) return obj[key] = value

  if (obj[key[0]] == null) obj[key[0]] = (typeof key[1] === "number") ? [] : {}

  return setKeyValue(obj[key[0]], key.slice(1), value)
}

/**
 * Compare le nouveau formulaire à l'ancien et incrémente les propriétés changesCount et touched
 * s'il y a eu une modification
 * @param {Immutable.Map} oldState état avant la modification
 * @param {Immutable.Map} newState état après la modification
 * @returns {Immutable.Map} état avec la propriété changesCount et touched à jour
 * @private
 */
export function stateWithChanges(oldState, newState) {

  const hasFormChange = !oldState.get("form").equals(newState.get("form"))

  if (hasFormChange) {

    return newState.merge({
      touched : true,
      changesCount : newState.get("changesCount") + 1
    })

  } else return oldState

}
