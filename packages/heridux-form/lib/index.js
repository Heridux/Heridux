import { fromJS, Iterable } from 'immutable';
import isPlainObject from 'lodash/isPlainObject';
import { Rules, FormWarning } from '@heridux/form-rules';
export { FormError, FormWarning, default as Rules } from '@heridux/form-rules';
import isEqual from 'lodash/isEqual';
import Heridux from '@heridux/core';

function normalizeKey(path) {
  if (path == null) {
    throw new Error("path is undefined. You may forgot the formKey property on your Control component ?");
  }

  return Array.isArray(path) ? [...path] : path.split(".");
}
function stringifyKey(key) {
  if (typeof key === "string") return key;else if (Array.isArray(key)) return key.join(".");else throw new TypeError(typeof key + " : incorrect type for key");
}
function getKeyValue(obj, key) {
  return obj && key.length ? getKeyValue(obj[key[0]], key.slice(1)) : obj;
}
function setKeyValue(obj, key, value) {
  if (!Array.isArray(key)) throw new Error("key must be an Array");
  if (key.length === 0) throw new Error("key is empty.");
  if (key.length === 1) return obj[key] = value;
  if (obj[key[0]] == null) obj[key[0]] = typeof key[1] === "number" ? [] : {};
  return setKeyValue(obj[key[0]], key.slice(1), value);
}
/**
 * Compare le nouveau formulaire à l'ancien et incrémente les propriétés changesCount et touched
 * s'il y a eu une modification
 * @param {Immutable.Map} oldState état avant la modification
 * @param {Immutable.Map} newState état après la modification
 * @returns {Immutable.Map} état avec la propriété changesCount et touched à jour
 */

function stateWithChanges(oldState, newState) {
  const hasFormChange = !oldState.get("form").equals(newState.get("form"));

  if (hasFormChange) {
    return newState.merge({
      touched: true,
      changesCount: newState.get("changesCount") + 1
    });
  } else return oldState;
}

/* eslint-disable no-empty */
/**
 * Gestion des formulaires avec Heridux
 * @extends Heridux
 */

class HeriduxForm extends Heridux {
  // eslint-disable-next-line max-statements
  constructor(STATE_PROPERTY) {
    super(STATE_PROPERTY);
    const initialState = {
      form: {},
      error: null,
      touched: false,
      changesCount: 0
    };
    this.setInitialState(initialState);
    this.initialFormDefinition = null;
    this.validationRules = {};
    this.createAction("destroyForm", state => state.merge(fromJS(initialState)));
    this.createAction("redefineForm", (state, {
      form
    }) => state.merge(fromJS({ ...initialState,
      form
    })));
    this.createAction("setFieldValue", (state, {
      path,
      value
    }) => {
      const key = ["form", ...path];
      const field = state.getIn(key);
      if (!field) throw new Error("No field registered at path " + this._stringifyPath(path));
      if (isEqual(value, field.get("value"))) return state;
      const initialValue = field.get("initialValue");
      const hasChanged = !isEqual(value, initialValue);
      let newState = state.mergeIn(key, {
        value: value && typeof value === "object" ? fromJS(value) : value,
        error: null,
        warning: null,
        touched: hasChanged
      });
      if (hasChanged) newState = newState.set("touched", true);else newState = newState.set("touched", this.isFormTouched(newState));
      return newState.set("changesCount", newState.get("changesCount") + 1);
    });
    this.createAction("initFieldValue", (state, {
      path,
      value
    }) => {
      const field = state.getIn(["form", ...path]);
      if (field.get("value") === value && field.get("initialValue") === value) return state;
      const newState = state.mergeIn(["form", ...path], {
        initialValue: value,
        value,
        error: null,
        warning: null,
        touched: false
      });
      return newState.merge({
        touched: this.isFormTouched(newState),
        changesCount: state.get("changesCount") + 1
      });
    });
    this.createAction("removeFields", (state, {
      path
    }) => {
      return stateWithChanges(state, state.deleteIn(["form", ...path]));
    });
    this.createAction("addFields", (state, {
      path,
      fields
    }) => {
      const mapFields = this._processForm(fields, path);

      const newState = state.mergeDeepIn(["form"], fromJS(mapFields));
      return stateWithChanges(state, newState);
    });
    this.createAction("cancelFieldValue", (state, {
      path
    }) => {
      const field = state.getIn(["form", ...path]);
      const initialValue = field.get("initialValue");
      if (field.get("value") === initialValue) return state;
      const newState = state.mergeIn(["form", ...path], {
        value: initialValue,
        error: null,
        warning: null,
        touched: false
      });
      return newState.merge({
        touched: this.isFormTouched(newState),
        changesCount: state.get("changesCount") + 1
      });
    });
    this.createAction("initFormValues", (state, {
      values,
      path = []
    }) => {
      // si certaines valeurs sont des objets, le mergeDeepIn va parcourir la valeur et ne mettre à jour
      // qu'une partie de la valeur. Donc avant on met à null les valeurs qui vont être modifiées.
      const emptyValues = this.mapFields(() => ({
        value: null,
        initialValue: null
      }), state, values, path);
      const newValues = this.mapFields(value => ({
        value,
        initialValue: value,
        error: null,
        warning: null,
        touched: false
      }), state, values, path);
      const newState = stateWithChanges(state, state.mergeDeepIn(["form", ...path], emptyValues).mergeDeepIn(["form", ...path], newValues));
      return path ? newState : newState.set("touched", false);
    });
    this.createAction("resetFormValues", (state, {
      path = []
    }) => {
      // réinitialisation des valeurs
      const newValues = this.mapFields(() => ({
        value: null,
        initialValue: null,
        error: null,
        warning: null,
        touched: false
      }), state, null, path);
      const newState = stateWithChanges(state, state.mergeDeepIn(["form", ...path], newValues));
      return (path === null || path === void 0 ? void 0 : path.length) ? newState : newState.merge({
        touched: false,
        error: null
      });
    });
    this.createAction("cancelFormValues", (state, {
      path = []
    }) => {
      const emptyValues = this.mapFields(() => ({
        value: null
      }), state, null, path);
      const newValues = this.mapFields(field => ({
        value: field.initialValue,
        error: null,
        warning: null,
        touched: false
      }), state, null, path);
      const newState = stateWithChanges(state, state.mergeDeepIn(["form", ...path], emptyValues).mergeDeepIn(["form", ...path], newValues));
      return (path === null || path === void 0 ? void 0 : path.length) ? newState : newState.merge({
        touched: false,
        error: null
      });
    });
    this.createAction("setFormValues", (state, {
      values,
      path = []
    }) => {
      const emptyValues = this.mapFields(() => ({
        value: null
      }), state, values, path);
      const newValues = this.mapFields((value, key) => ({
        value,
        error: null,
        warning: null,
        touched: state.getIn([...key, "initialValue"]) !== value
      }), state, values, path);
      const newState = state.mergeDeepIn(["form", ...path], emptyValues).mergeDeepIn(["form", ...path], newValues);
      return stateWithChanges(state, newState).set("touched", this.isFormTouched(newState));
    });
    this.createAction("setFieldWarning", (state, {
      path,
      message,
      properties
    }) => state.mergeDeepIn(["form", ...path], {
      warning: {
        message,
        properties
      },
      touched: true
    }));
    this.createAction("setFieldError", (state, {
      path,
      message,
      properties
    }) => state.mergeDeepIn(["form", ...path], {
      error: {
        message,
        properties
      },
      touched: true
    }));
    this.createAction("setGlobalError", (state, {
      error
    }) => state.set("error", error));
  }

  set templateDriven(bool) {
    this._templateDriven = Boolean(bool);
  }

  get templateDriven() {
    return Boolean(this._templateDriven);
  }

  _stringifyPath(path) {
    return "[" + path.join(", ") + "]";
  }
  /**
   * Récupération des règles de validation d'un champ du formulaire
   * @param {Array} path clé d'accès au champ
   * @returns {Rules} l'objet contenant les règles de validation
   */


  getValidationRules(path) {
    return getKeyValue(this.validationRules, path);
  }
  /**
   * Renvoie un objet composé des résultats d'une fonction de rappel exécutée sur chaque champ de formulaire
   * @param {Function} callback fonction à exécuter sur chaque champ de formulaire
   * @param {Object} _state state à utiliser si disponible
   * @param {Object} _values valeurs sur lesquelles itérer si ce ne sont pas celles du formulaire dans le store
   * @param {Array} _path valeur interne de la clé
   * @returns {Object} objet résultat
   */
  // eslint-disable-next-line max-params


  mapFields(callback, _state, _values, _path = []) {
    const state = _state || this.getState();

    const path = normalizeKey(_path);

    let values = _values || state.getIn(["form", ...path]);

    if (Iterable.isIterable(values)) values = values.toJS();
    const isArray = Array.isArray(values);
    const map = isArray ? [] : {};

    const processField = (value, n) => {
      const newKey = [...path, n];

      if (this.isField(newKey)) {
        return callback(value, newKey);
      } else if (Array.isArray(value) || isPlainObject(value)) {
        return this.mapFields(callback, state, value, newKey);
      } else {
        // pour éviter de confondre ce cas avec celui ou callback renvoie null
        throw new Error("unexpected value");
      }
    };

    if (isArray) {
      values.forEach((value, i) => {
        try {
          map.push(processField(value, i));
        } catch (e) {}
      });
    } else if (isPlainObject(values)) {
      for (const n in values) {
        try {
          map[n] = processField(values[n], n);
        } catch (e) {}
      }
    } else if (values) {
      throw new Error(typeof values + " : type incorrect for values iteration");
    } else {
      console.warn("values is a falsy value", values, path);
    }

    return map;
  }

  isField(path) {
    return this.getValidationRules(path) instanceof Rules;
  }
  /**
   * Vérification de la validité de la valeur d'un champ
   * @param {Object} params objet contenant les clés suivantes :
   * key : position du champ dans le formulaire ;
   * value : valeur du champ ;
   * values : autres valeurs du formulaire (en cas de champs dépendants les uns des autres) ;
   * @returns {undefined}
   * @throws {FormError|FormWarning} en cas de non validité
   */


  checkFieldValue({
    key,
    value,
    values
  }) {
    const rules = this.getValidationRules(key);
    if (!rules) return;

    if (!(rules instanceof Rules)) {
      const msg = "rules must be an instance of Rules class";
      console.error(msg, rules);
      throw new Error(msg);
    }

    try {
      rules.check(value, values, {
        key
      });
    } catch (e) {
      if (e instanceof FormWarning) {
        this.setFieldWarning(key, e.message, e.properties);
      } else {
        this.setFieldError(key, e.message, e.properties);
      }

      throw e;
    }
  }
  /**
   * Vérification du formulaire
   * @param {Object} formValues valeurs à vérifier si ce ne sont pas celles du store
   * @returns {Boolean} true si tous les champs sont corrects, false sinon
   */


  checkForm(formValues = null) {
    const state = this.getState();
    const values = formValues || state.get("form").toJS();
    let valid = true;

    const callback = (field, key) => {
      var _field$error;

      if ((_field$error = field.error) === null || _field$error === void 0 ? void 0 : _field$error.message) valid = false;else {
        try {
          this.checkFieldValue({
            key,
            value: field.value,
            values
          });
        } catch (e) {
          valid = false;
        }
      }
    };

    this.mapFields(callback, state, values);
    return valid;
  }
  /**
   * Initialisation du formulaire. Les champs non déclarés seront ignorés
   * @param {Object} values valeurs d'initialisation
   * @returns {undefined}
   */


  initFormValues(values) {
    return this.execAction("initFormValues", {
      values
    });
  }
  /**
   * Initialisation d'une partie du formulaire. Les champs non déclarés seront ignorés
   * @param {Array} path point d'entrée
   * @param {Object} values valeurs d'initialisation
   * @returns {undefined}
   */


  initFormValuesIn(path, values) {
    return this.execAction("initFormValues", {
      values,
      path: path && normalizeKey(path)
    });
  }
  /**
   * Annulation des modifications (retour aux valeurs initiales définies par la méthode initFormValues)
   * @returns {undefined}
   */


  cancelFormValues() {
    return this.execAction("cancelFormValues");
  }
  /**
   * Annulation des modifications d'une partie du formulaure
   * (retour aux valeurs initiales définies par la méthode initFormValues)
   * @param {Array} path point d'entrée
   * @returns {undefined}
   */


  cancelFormValuesIn(path) {
    return this.execAction("cancelFormValues", {
      path: path && normalizeKey(path)
    });
  }
  /**
   * Réinitialisation des valeurs du formulaires (toutes fixées à null)
   * @returns {undefined}
   */


  resetFormValues() {
    return this.execAction("resetFormValues");
  }
  /**
   * Réinitialisation d'une partie des valeurs du formulaires (toutes fixées à null)
   * @param {Array} path point d'entrée
   * @returns {undefined}
   */


  resetFormValuesIn(path) {
    return this.execAction("resetFormValues", {
      path: path && normalizeKey(path)
    });
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
        path: [],
        fields: path
      });
    } else {
      return this.execAction("addFields", {
        path: path ? normalizeKey(path) : [],
        fields
      });
    }
  }
  /**
   * Suppression dynamique de champs de formulaire
   * @param {Array|String} path chemin ou supprimer les champs
   * @returns {undefined}
   */


  removeFields(path) {
    return this.execAction("removeFields", {
      path: normalizeKey(path)
    });
  }
  /**
   * Attribution d'une valeur à un champ
   * @param {Array|String} path chemin du champ
   * @param {*} value valeur du champ
   * @returns {undefined}
   */


  setFieldValue(path, value) {
    const key = normalizeKey(path);
    this.execAction("setFieldValue", {
      path: key,
      value
    });

    try {
      this.checkFieldValue({
        key,
        value,
        values: this.get("form")
      });
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
      path: normalizeKey(path),
      value
    });
  }
  /**
   * Annulation des modifications d'un champ (retour à la valeur initiale)
   * @param {Array|String} path chemin du champ
   * @returns {undefined}
   */


  cancelFieldValue(path) {
    return this.execAction("cancelFieldValue", {
      path: normalizeKey(path)
    });
  }
  /**
   * Définition d'un message d'avetissement
   * @param {Array|String} path chemin du champ
   * @param {String} message contenu du message
   * @param {Object} properties propriétés supplémentaires liées à l'erreur
   * @returns {undefined}
   */


  setFieldWarning(path, message, properties) {
    return this.execAction("setFieldWarning", {
      path: normalizeKey(path),
      message,
      properties
    });
  }
  /**
   * Définition d'un message d'erreur
   * @param {Array|String} path chemin du champ
   * @param {String} message contenu du message
   * @param {Object} properties propriétés supplémentaires liées à l'erreur
   * @returns {undefined}
   */


  setFieldError(path, message, properties) {
    return this.execAction("setFieldError", {
      path: normalizeKey(path),
      message,
      properties
    });
  }
  /**
   * Définition d'une erreur globale sur le formulaire
   * @param {String} error contenu de l'erreur
   * @returns {undefined}
   */


  setGlobalError(error) {
    return this.execAction("setGlobalError", {
      error
    });
  }
  /**
   * Teste si le formulaire a été modifié
   * @param {Immutable.Map} state optionnel état du store si on l'a sous la main
   * @returns {Boolean} true si le formulaire a été modifié, false sinon
   */


  isFormTouched(state) {
    let touched = false;
    this.mapFields(field => {
      if (field.touched) touched = true;
    }, state);
    return touched;
  }
  /**
   * Teste si le formulaire contient des erreurs. Attention, il ne lance pas les validations
   * mais se contente de vérifier si des erreurs ont été levées.
   * @param {Immutable.Map} state optionnel état du store si on l'a sous la main
   * @returns {Boolean} true si le formulaire contient des erreurs, false sinon
   */


  isFormValid(state) {
    let valid = true;
    this.mapFields(field => {
      if (field.error) valid = false;
    }, state);
    return valid;
  }
  /**
   * Récupère l'ensemble des erreurs du formulaire sous forme de tableau
   * @param {Immutable.Map} state optionnel état du store si on l'a sous la main
   * @returns {Array} tableau des erreurs
   */


  getFormErrors(state) {
    const fieldErrors = [];
    this.mapFields((field, key) => {
      if (field.error) {
        fieldErrors.push({
          key,
          error: field.error.message
        });
      }
    }, state);
    return fieldErrors;
  }
  /**
   * Attribue les valeurs au formulaire. Attention, les validations ne sont pas
   * lancées car certaines peuvent être interdépendantes (si besoin exécuter la
   * méthode checkForm ensuite)
   * @param {Object} values objet contenant les valeurs
   * @returns {undefined}
   */


  setFormValues(values) {
    return this.execAction("setFormValues", {
      values
    });
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
    return this.execAction("setFormValues", {
      values,
      path: path && normalizeKey(path)
    });
  }
  /**
   * Récupère l'ensemble des valeurs du formulaire
   * @param {Immutable.Map} state optionnel état du store si on l'a sous la main
   * @returns {Object} objet décrivant les valeurs
   */


  getFormValues(state) {
    return this.mapFields(field => field.value, state);
  }
  /**
   * Récupère une partie des valeurs du formulaire
   * @param {Array} path optionnel, point d'entrée si on ne veut récupérer qu'une partie du formulaire
   * @param {Immutable.Map} state optionnel état du store si on l'a sous la main
   * @returns {Object} objet décrivant les valeurs
   */


  getFormValuesIn(path, state) {
    return this.mapFields(field => field.value, state, null, path && normalizeKey(path));
  }

  _getFieldProp(path, prop, state) {
    const store = this.getState(state);
    const value = store.getIn(["form", ...normalizeKey(path), prop]);
    return value && value.toJS ? value.toJS() : value;
  }
  /**
   * Récupération de la valeur d'un champ
   * @param {Array|String} path chemin du champ
   * @param {Immutable.Map} state optionnel état du store si on l'a sous la main
   * @returns {*} valeur du champ
   */


  getFieldValue(path, state) {
    return this._getFieldProp(path, "value", state);
  }
  /**
   * Récupération du message d'avertissement d'un champ
   * @param {Array|String} path chemin du champ
   * @param {Immutable.Map} state optionnel état du store si on l'a sous la main
   * @returns {String} message d'avertissement du champ
   */


  getFieldWarning(path, state) {
    const warning = this._getFieldProp(path, "warning", state);

    return (warning === null || warning === void 0 ? void 0 : warning.message) ? warning : null;
  }
  /**
   * Récupération du message d'erreur d'un champ
   * @param {Array|String} path chemin du champ
   * @param {Immutable.Map} state optionnel état du store si on l'a sous la main
   * @returns {String} message d'erreur du champ
   */


  getFieldError(path, state) {
    const error = this._getFieldProp(path, "error", state);

    return (error === null || error === void 0 ? void 0 : error.message) ? error : null;
  }
  /**
   * Teste si un champ a été modifié
   * @param {Array|String} path chemin du champ
   * @param {Immutable.Map} state optionnel état du store si on l'a sous la main
   * @returns {Boolean} true si le champ a été modifié
   */


  isFieldTouched(path, state) {
    return this._getFieldProp(path, "touched", state);
  }
  /**
   * Définit la structure du formulaire
   * @param {Object} fields objet décrivant le formulaire (nom des champs en clé, objet Rules en valeur)
   * @returns {undefined}
   */


  defineForm(fields) {
    this.validationRules = {};

    const form = this._processForm(fields);

    if (this.initialFormDefinition) this.execAction("redefineForm", {
      form
    });else this.setInitialState({ ...this.initialState.toJS(),
      form
    });
    this.initialFormDefinition = form;
  }
  /**
   * Réinitialise complètement la structure du formulaire
   * @returns {undefined}
   */


  destroyForm() {
    return this.execAction("destroyForm");
  }
  /**
   * Définit les règles de validation pour un champ donné
   * @param {Array|String} path chemin du champ
   * @param {Rules} rules objet de validation
   * @returns {undefined}
   */


  defineFieldRules(path, rules) {
    setKeyValue(this.validationRules, path, rules && rules instanceof Rules ? rules : new Rules());
  }

  _processForm(fields, initialKey = []) {
    const form = {};

    const processForm = (field, key = []) => {
      if (isPlainObject(field)) {
        let hasKey = false;

        for (const n in field) {
          hasKey = true;
          processForm(field[n], [...key, n]);
        }

        if (!hasKey) setKeyValue(form, key, {});
      } else if (Array.isArray(field)) {
        if (!field.length) setKeyValue(form, key, []);

        for (let i = 0; i < field.length; i++) processForm(field[i], [...key, i]);
      } else {
        this.defineFieldRules(key, field);
        setKeyValue(form, key, {
          value: null,
          initialValue: null,
          error: null,
          warning: null,
          touched: false
        });
      }
    };

    processForm(fields, initialKey);
    return form;
  }
  /**
   * Lance les validations du formulaire et renvoie les valeurs s'il n'y a pas d'erreur.
   * Une erreur est jetée dans le cas contraire
   * @returns {Object} objet contenant les valeurs
   * @throws jète une erreur si des champs ne sont pas valides
   */


  submitForm() {
    const test = this.checkForm();

    if (!test) {
      const error = new Error("form error");
      error.errors = this.getFormErrors();
      throw error;
    }

    return this.getFormValues();
  }

}

export default HeriduxForm;
export { getKeyValue, normalizeKey, setKeyValue, stateWithChanges, stringifyKey };
