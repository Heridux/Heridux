/* eslint-disable no-empty */
import { fromJS, Iterable } from "immutable"
import isPlainObject from "lodash/isPlainObject"
import isEqual from "lodash/isEqual"
import Heridux from "@heridux/immutable"
import { Rules, FormWarning } from "@heridux/form-rules"
import { getKeyValue, setKeyValue, normalizeKey, stateWithChanges } from "./utils"

/**
 * Form store constructor
 * @extends Heridux
 * @param {String} [STATE_PROPERTY] string name for this store (if you plan to use it with redux)
 * @returns {undefined}
 * @example import HeriduxForm from "@heridux/form"
 * import Rules from "@heridux/rules"
 *
 * const store = new HeriduxForm("myForm")
 *
 * store.defineForm({
 *   name : Rules.string.isRequired,
 *   age : Rules.number,
 *   address : {
 *     street : Rules.string,
 *     city : Rules.string,
 *     zipCode : Rules.number
 *   }
 * })
 *
 * // register store in redux store (see @heridux/core for more details)
 * store.register()
 *
 * store.initFormValues({
 *   name : "Roger",
 *   age : 56
 * })
 *
 * store.setFieldValue(["address", "city"], "Paris")
 *
 * store.getFieldValue("age") // 56
 */
export default class HeriduxForm extends Heridux {

  // eslint-disable-next-line max-statements
  constructor(STATE_PROPERTY) {

    super(STATE_PROPERTY)

    const initialState = {
      form : {},
      error : null,
      touched : false,
      changesCount : 0
    }

    this.setInitialState(initialState)
    this.initialFormDefinition = null
    this.validationRules = {}

    this.createAction("destroyForm", state => state.merge(fromJS(initialState)))

    this.createAction("redefineForm", (state, { form }) => state.merge(fromJS({ ...initialState, form })))

    this.createAction("setFieldValue", (state, { path, value }) => {

      const key = ["form", ...path]
      const field = state.getIn(key)

      if (!field) throw new Error("No field registered at path " + this._stringifyPath(path))

      if (isEqual(value, field.get("value"))) return state

      const initialValue = field.get("initialValue")

      const hasChanged = !isEqual(value, initialValue)

      let newState = state.mergeIn(key, {
        value : (value && typeof value === "object") ? fromJS(value) : value,
        error : null,
        warning : null,
        touched : hasChanged
      })

      if (hasChanged) newState = newState.set("touched", true)
      else newState = newState.set("touched", this.isFormTouched(newState))

      return newState.set("changesCount", newState.get("changesCount") + 1)

    })

    this.createAction("initFieldValue", (state, { path, value }) => {

      const field = state.getIn(["form", ...path])

      if (field.get("value") === value && field.get("initialValue") === value) return state

      const newState = state.mergeIn(["form", ...path], {
        initialValue : value,
        value,
        error : null,
        warning : null,
        touched : false
      })

      return newState.merge({
        touched : this.isFormTouched(newState),
        changesCount : state.get("changesCount") + 1
      })
    })

    this.createAction("removeFields", (state, { path }) => {
      return stateWithChanges(state, state.deleteIn(["form", ...path]))
    })

    this.createAction("addFields", (state, { path, fields }) => {
      const mapFields = this._processForm(fields, path)
      const newState = state.mergeDeepIn(["form"], fromJS(mapFields))

      return stateWithChanges(state, newState)
    })

    this.createAction("cancelFieldValue", (state, { path }) => {

      const field = state.getIn(["form", ...path])
      const initialValue = field.get("initialValue")

      if (field.get("value") === initialValue) return state

      const newState = state.mergeIn(["form", ...path], {
        value : initialValue,
        error : null,
        warning : null,
        touched : false
      })

      return newState.merge({
        touched : this.isFormTouched(newState),
        changesCount : state.get("changesCount") + 1
      })
    })

    this.createAction("initFormValues", (state, { values, path = [] }) => {

      // si certaines valeurs sont des objets, le mergeDeepIn va parcourir la valeur et ne mettre à jour
      // qu'une partie de la valeur. Donc avant on met à null les valeurs qui vont être modifiées.
      const emptyValues = this.mapFields(() => ({ value : null, initialValue : null }), state, values, path)

      const newValues = this.mapFields(value => ({
        value,
        initialValue : value,
        error : null,
        warning : null,
        touched : false
      }), state, values, path)

      const newState = stateWithChanges(
        state,
        state
          .mergeDeepIn(["form", ...path], emptyValues)
          .mergeDeepIn(["form", ...path], newValues)
      )

      return path?.length ? newState : newState.set("touched", false)
    })

    this.createAction("resetFormValues", (state, { path = [] }) => {

      // réinitialisation des valeurs
      const newValues = this.mapFields(() => ({
        value : null,
        initialValue : null,
        error : null,
        warning : null,
        touched : false
      }), state, null, path)

      const newState = stateWithChanges(state, state.mergeDeepIn(["form", ...path], newValues))

      return path?.length ? newState : newState.merge({ touched : false, error : null })
    })

    this.createAction("cancelFormValues", (state, { path = [] }) => {

      const emptyValues = this.mapFields(() => ({ value : null }), state, null, path)

      const newValues = this.mapFields(field => ({
        value : field.initialValue,
        error : null,
        warning : null,
        touched : false
      }), state, null, path)

      const newState = stateWithChanges(
        state,
        state
          .mergeDeepIn(["form", ...path], emptyValues)
          .mergeDeepIn(["form", ...path], newValues)
      )

      return path?.length ? newState : newState.merge({ touched : false, error : null })
    })

    this.createAction("setFormValues", (state, { values, path = [] }) => {

      const emptyValues = this.mapFields(() => ({ value : null }), state, values, path)

      const newValues = this.mapFields((value, key) => ({
        value,
        error : null,
        warning : null,
        touched : state.getIn([...key, "initialValue"]) !== value
      }), state, values, path)

      const newState = state
        .mergeDeepIn(["form", ...path], emptyValues)
        .mergeDeepIn(["form", ...path], newValues)

      return stateWithChanges(state, newState)
        .set("touched", this.isFormTouched(newState))
    })

    this.createAction("setFieldWarning", (state, { path, message, properties }) => (
      state.mergeDeepIn(["form", ...path], { warning : { message, properties }, touched : true })
    ))

    this.createAction("setFieldError", (state, { path, message, properties }) => (
      state.mergeDeepIn(["form", ...path], { error : { message, properties }, touched : true })
    ))

    this.createAction("setGlobalError", (state, { error }) => state.set("error", error))

    this.createAction("validateForm", state => {

      const values = this.mapFields(field => ({
        ...field,
        initialValue : field.value,
        touched : false,
        error : null,
        warning : null
      }), state)

      return state
        .mergeDeepIn(["form"], values)
        .merge({ touched : false, error : null, changesCount : 0 })
    })

  }

  /**
   * Defines structure of the form
   * @param {Object} fields object describing the form (field name in key, Rules object in value)
   * @returns {undefined}
   * @example import HeriduxForm from "@heridux/form"
 * import Rules from "@heridux/rules"
 *
 * const store = new HeriduxForm("myForm")
 *
 * store.defineForm({
 *   name : Rules.string.isRequired,
 *   age : Rules.number,
 *   address : {
 *     street : Rules.string,
 *     city : Rules.string,
 *     zipCode : Rules.number
 *   }
 * })
 *
 * // register store in redux store (see @heridux/core for more details)
 * store.register()
   */
  defineForm(fields) {

    this.validationRules = {}

    const form = this._processForm(fields)

    if (this.initialFormDefinition) this.execAction("redefineForm", { form })
    else this.setInitialState({ ...this.initialState.toJS(), form })

    this.initialFormDefinition = form
  }


  /**
   * Initialization of the form. Undeclared fields will be ignored.
   * @param {Object} values initialization values
   * @returns {undefined}
   * @example import HeriduxForm from "@heridux/form"
 * import Rules from "@heridux/rules"
 *
 * const store = new HeriduxForm("myForm")
 *
 * store.defineForm({
 *   name : Rules.string.isRequired,
 *   age : Rules.number
 * })
 *
 * store.register()
 *
 * store.initFormValues({
 *   name : "Roger",
 *   age : 56,
 *   address : "Paris"
 * })
 *
 * // initFormValues won't consider form has been touched
 * store.get("touched") // false
 *
 * // unknown keys are ignored
 * store.getFieldValue("address") // null
   */
  initFormValues(values) {
    return this.execAction("initFormValues", { values })
  }

  /**
   * Initialization of part of the form. Undeclared fields will be ignored.
   * @param {Array} path entry point
   * @param {Object} values initialization values
   * @returns {undefined}
   * @example import HeriduxForm from "@heridux/form"
 * import Rules from "@heridux/rules"
 *
 * const store = new HeriduxForm("myForm")
 *
 * store.defineForm({
 *   name : Rules.string.isRequired,
 *   age : Rules.number,
 *   address : {
 *     street : Rules.string,
 *     city : Rules.string,
 *     zipCode : Rules.number
 * }
 * })
 *
 * store.register()
 *
 * store.initFormValuesIn(["address"], {
 *   street : "Victor Hugo",
 *   city : "Toulouse",
 *   zipCode : 31000
 * })
 *
 * // initFormValuesIn won't consider form has been touched
 * store.get("touched") // false
 *
 * store.getFormValues()
 * // {
 * //   name : null,
 * //   age : null,
 * //   address : {
 * //     street : "Victor Hugo",
 * //     city : "Toulouse",
 * //     zipCode : 31000
 * //   }
 * //}
   */
  initFormValuesIn(path, values) {
    return this.execAction("initFormValues", { values, path : path && normalizeKey(path) })
  }

  /**
   * Transform array path to string
   * @private
   * @param {Array} path array path
   * @returns {String} string path
   */
  _stringifyPath(path) {
    return "[" + path.join(", ") + "]"
  }

  /**
   * Check validity of the form
   * @param {Object} [_formValues] values to check if they are not those of the store
   * @returns {Boolean} true if all fields are valid, false otherwise
   */
  checkForm(_formValues = null) {

    const state = this.getState()
    const values = _formValues || state.get("form").toJS()

    let valid = true

    const callback = (field, key) => {
      if (field.error?.message) valid = false
      else {
        try {
          this.checkFieldValue({
            key,
            value : field.value,
            values
          })
        } catch (e) { valid = false }
      }
    }

    this.mapFields(callback, state, values)

    return valid
  }

  /**
   * Cancel modifications (return to the initial values defined by the initFormValues method)
   * @returns {undefined}
   */
  cancelFormValues() {
    return this.execAction("cancelFormValues")
  }

  /**
   * Cancel modifications to part of form (return to the initial values defined by the initFormValues method)
   * @param {Array} path entry point
   * @returns {undefined}
   */
  cancelFormValuesIn(path) {
    return this.execAction("cancelFormValues", { path : path && normalizeKey(path) })
  }

  /**
   * Réinitialisation des valeurs du formulaires (toutes fixées à null)
   * @returns {undefined}
   */
  resetFormValues() {
    return this.execAction("resetFormValues")
  }

  /**
   * Réinitialisation d'une partie des valeurs du formulaires (toutes fixées à null)
   * @param {Array} path point d'entrée
   * @returns {undefined}
   */
  resetFormValuesIn(path) {
    return this.execAction("resetFormValues", { path : path && normalizeKey(path) })
  }

  /**
   * Ajout dynamique de champs dans le formulaire (postérieur à la méthode defineForm)
   * @param {Array|String} path chemin où insérer les nouveaux champs
   * @param {Object} fields objet dont les clés sont les noms des champs et les valeurs les règles
   * de validation
   * @returns {undefined}
   */
  addFields(path, fields) {

    if (isPlainObject(path) && fields == null) {

      return this.execAction("addFields", {
        path : [],
        fields : path
      })

    } else {

      return this.execAction("addFields", {
        path : path ? normalizeKey(path) : [],
        fields
      })

    }
  }

  /**
   * Suppression dynamique de champs de formulaire
   * @param {Array|String} path chemin ou supprimer les champs
   * @returns {undefined}
   */
  removeFields(path) {
    return this.execAction("removeFields", { path : normalizeKey(path) })
  }

  /**
   * Attribution d'une valeur à un champ
   * @param {Array|String} path chemin du champ
   * @param {*} value valeur du champ
   * @returns {undefined}
   */
  setFieldValue(path, value) {
    const key = normalizeKey(path)

    this.execAction("setFieldValue", { path : key, value })

    try {
      this.checkFieldValue({ key, value, values : this.get("form") })
    } catch (e) {}
  }

  /**
   * Initialisation d'un champ
   * @param {Array|String} path chemin du champ
   * @param {*} value valeur du champ
   * @returns {undefined}
   */
  initFieldValue(path, value) {
    return this.execAction("initFieldValue", {
      path : normalizeKey(path),
      value
    })
  }

  /**
   * Annulation des modifications d'un champ (retour à la valeur initiale)
   * @param {Array|String} path chemin du champ
   * @returns {undefined}
   */
  cancelFieldValue(path) {
    return this.execAction("cancelFieldValue", { path : normalizeKey(path) })
  }

  /**
   * Définition d'un message d'avetissement
   * @param {Array|String} path chemin du champ
   * @param {String} message contenu du message
   * @param {Object} properties propriétés supplémentaires liées à l'erreur
   * @returns {undefined}
   */
  setFieldWarning(path, message, properties) {
    return this.execAction("setFieldWarning", { path : normalizeKey(path), message, properties })
  }

  /**
   * Définition d'un message d'erreur
   * @param {Array|String} path chemin du champ
   * @param {String} message contenu du message
   * @param {Object} properties propriétés supplémentaires liées à l'erreur
   * @returns {undefined}
   */
  setFieldError(path, message, properties) {
    return this.execAction("setFieldError", { path : normalizeKey(path), message, properties })
  }

  /**
   * Définition d'une erreur globale sur le formulaire
   * @param {String} error contenu de l'erreur
   * @returns {undefined}
   */
  setGlobalError(error) {
    return this.execAction("setGlobalError", { error })
  }

  /**
   * Teste si le formulaire a été modifié
   * @param {Immutable.Map} state optionnel état du store si on l'a sous la main
   * @returns {Boolean} true si le formulaire a été modifié, false sinon
   */
  isFormTouched(state) {

    let touched = false

    this.mapFields(field => {
      if (field.touched) touched = true
    }, state)

    return touched
  }

  /**
   * Teste si le formulaire contient des erreurs. Attention, il ne lance pas les validations
   * mais se contente de vérifier si des erreurs ont été levées.
   * @param {Immutable.Map} state optionnel état du store si on l'a sous la main
   * @returns {Boolean} true si le formulaire contient des erreurs, false sinon
   */
  isFormValid(state) {

    let valid = true

    this.mapFields(field => {
      if (field.error) valid = false
    }, state)

    return valid
  }

  /**
   * Récupère l'ensemble des erreurs du formulaire sous forme de tableau
   * @param {Immutable.Map} state optionnel état du store si on l'a sous la main
   * @returns {Array} tableau des erreurs
   */
  getFormErrors(state) {

    const fieldErrors = []

    this.mapFields((field, key) => {
      if (field.error) {
        fieldErrors.push({ key, error : field.error.message })
      }
    }, state)

    return fieldErrors
  }

  /**
   * Attribue les valeurs au formulaire. Attention, les validations ne sont pas
   * lancées car certaines peuvent être interdépendantes (si besoin exécuter la
   * méthode checkForm ensuite)
   * @param {Object} values objet contenant les valeurs
   * @returns {undefined}
   */
  setFormValues(values) {
    return this.execAction("setFormValues", { values })
  }

  /**
   * Attribue des valeurs au formulaire. Attention, les validations ne sont pas
   * lancées car certaines peuvent être interdépendantes (si besoin exécuter la
   * méthode checkForm ensuite)
   * @param {Array} path optionnel, point d'entrée si on ne veut affecter qu'une partie du formulaire
   * @param {Object} values objet contenant les valeurs
   * @returns {undefined}
   */
  setFormValuesIn(path, values) {
    return this.execAction("setFormValues", { values, path : path && normalizeKey(path) })
  }

  /**
   * Retrieves form values
   * @param {Immutable.Map} [_state] state of the store if available
   * @returns {Object} object describing values
   */
  getFormValues(_state) {
    return this.mapFields(field => field.value, _state)
  }

  /**
   * Retrieves values of a form part
   * @param {Array|String} path key path to form part
   * @param {Immutable.Map} [_state] state of the store if available
   * @returns {Object} object describing values
   */
  getFormValuesIn(path, _state) {
    return this.mapFields(field => field.value, _state, null, path && normalizeKey(path))
  }

  _getFieldProp(path, prop, state) {

    const store = this.getState(state)

    const value = store.getIn(["form", ...normalizeKey(path), prop])

    return (value && value.toJS) ? value.toJS() : value
  }

  /**
   * Retrieves field value
   * @param {Array|String} path key path to the field
   * @param {Immutable.Map} [_state] state of the store if available
   * @returns {*} field value
   */
  getFieldValue(path, _state) {
    return this._getFieldProp(path, "value", _state)
  }

  /**
   * Retrieves the warning message of a field
   * @param {Array|String} path key path to the field
   * @param {Immutable.Map} [_state] state of the store if available
   * @returns {String} warning message
   */
  getFieldWarning(path, _state) {
    const warning = this._getFieldProp(path, "warning", _state)

    return warning?.message ? warning : null
  }

  /**
   * Retrieves the error message of a field
   * @param {Array|String} path key path to the field
   * @param {Immutable.Map} [_state] state of the store if available
   * @returns {String} error message
   */
  getFieldError(path, _state) {
    const error = this._getFieldProp(path, "error", _state)

    return error?.message ? error : null
  }

  /**
   * Tests if a field has been modified
   * @param {Array|String} path key path to the field
   * @param {Immutable.Map} [_state] state of the store if available
   * @returns {Boolean} true if the field has been modified
   */
  isFieldTouched(path, _state) {
    return this._getFieldProp(path, "touched", _state)
  }

  /**
   * Completely reset the form structure
   * @returns {undefined}
   */
  destroyForm() {
    return this.execAction("destroyForm")
  }

  /**
   * Defines validation rules for a given field
   * @param {Array|String} path key path to the field
   * @param {Rules} rules validation object
   * @returns {undefined}
   * @private
   */
  defineFieldRules(path, rules) {
    setKeyValue(this.validationRules, path, rules && rules instanceof Rules ? rules : new Rules())
  }

  _processForm(fields, initialKey = []) {

    const form = {}

    const processForm = (field, key = []) => {

      if (isPlainObject(field)) {

        let hasKey = false

        for (const n in field) {
          hasKey = true
          processForm(field[n], [...key, n])
        }

        if (!hasKey) setKeyValue(form, key, {})

      } else if (Array.isArray(field)) {

        if (!field.length) setKeyValue(form, key, [])

        for (let i = 0; i < field.length; i++) processForm(field[i], [...key, i])

      } else {

        this.defineFieldRules(key, field)

        setKeyValue(form, key, {
          value : null,
          initialValue : null,
          error : null,
          warning : null,
          touched : false
        })
      }
    }

    processForm(fields, initialKey)

    return form
  }

  /**
   * Starts form validation and returns form values if there is no error.
   * An error is thrown otherwise
   * @returns {Object} form values
   * @throws {Error} if some fields are incorrect
   * @private
   */
  submitForm() {

    const test = this.checkForm()

    if (!test) {
      const error = new Error("form error")

      error.errors = this.getFormErrors()

      throw error
    }

    return this.getFormValues()
  }

  /**
   * Set current values as initial values. Form will be considered unmodified.
   * Warning : field rules won't be check (use checkForm if needed)
   * @returns {undefined}
   * @example import HeriduxForm from "@heridux/form"
   * import Rules from "@heridux/rules"
   *
   * const store = new HeriduxForm("myForm")
   *
   * store.defineForm({
   *   name : Rules.string.isRequired,
   *   age : Rules.number
   * })
   *
   * store.register()
   *
   * store.setFieldValue("name", "Roger")
   * store.setFieldValue("age", "56")
   *
   * store.get("touched") // true
   *
   * store.validateForm()
   *
   * store.get("touched") // false
   * store.cancelFormValues() // no effect since values are now considered as initial values
  */
  validateForm() {
    this.execAction("validateForm")
  }

  /**
   * Get validation rules of form field
   * @param {Array} path field key path
   * @returns {Rules} object containing validation rules
   * @private
   */
  getValidationRules(path) {
    return getKeyValue(this.validationRules, path)
  }

  /**
   * Returns an object composed of the results of a callback executed on each form field
   * @param {Function} callback function to run on each form field
   * @param {Object} [_state] state to use if available
   * @param {Object} [_values] values to iterate over if they are not those of the form in the store
   * @param {Array} [_path] internal key value
   * @returns {Object} result
   * @private
   */
  // eslint-disable-next-line max-params
  mapFields(callback, _state, _values, _path = []) {

    const state = _state || this.getState()
    const path = normalizeKey(_path)

    let values = _values || state.getIn(["form", ...path])

    if (Iterable.isIterable(values)) values = values.toJS()

    const isArray = Array.isArray(values)
    const map = isArray ? [] : {}

    const processField = (value, n) => {
      const newKey = [...path, n]

      if (this.isField(newKey)) {
        return callback(value, newKey)
      } else if (Array.isArray(value) || isPlainObject(value)) {
        return this.mapFields(callback, state, value, newKey)
      } else {
        // pour éviter de confondre ce cas avec celui ou callback renvoie null
        throw new Error("unexpected value")
      }
    }

    if (isArray) {
      values.forEach((value, i) => {
        try {
          map.push(processField(value, i))
        } catch (e) {}
      })
    } else if (isPlainObject(values)) {
      for (const n in values) {
        try {
          map[n] = processField(values[n], n)
        } catch (e) {}
      }
    } else if (values) {
      throw new Error((typeof values) + " : type incorrect for values iteration")
    } else {
      console.warn("values is a falsy value", values, path)
    }

    return map
  }

  /**
   * Checks if a field is registered at path passed as argument
   * @param {Array} path key path
   * @returns {Bool} true if a field is registered
   */
  isField(path) {
    return this.getValidationRules(path) instanceof Rules
  }

  /**
   * Check validity of a field value
   * @param {Object} params object
   * @param {Array} params.key keypath to field
   * @param {any} params.value field value
   * @param {Object} params.values other values of form
   * @returns {undefined}
   * @throws {FormError|FormWarning} in case of unvalidity
   * @private
   */
  checkFieldValue({ key, value, values }) {

    const rules = this.getValidationRules(key)

    if (!rules) return

    if (!(rules instanceof Rules)) {
      const msg = "rules must be an instance of Rules class"

      console.error(msg, rules)
      throw new Error(msg)
    }

    try {
      rules.check(value, values, { key })
    } catch (e) {
      if (e instanceof FormWarning) {
        this.setFieldWarning(key, e.message, e.properties)
      } else {
        this.setFieldError(key, e.message, e.properties)
      }

      throw e
    }
  }

}

