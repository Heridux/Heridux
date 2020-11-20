(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@heridux/form'), require('immutable'), require('lodash/isPlainObject')) :
typeof define === 'function' && define.amd ? define(['exports', '@heridux/form', 'immutable', 'lodash/isPlainObject'], factory) :
(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.HeriduxForm = {}, global.HeriduxForm, global.Immutable, global.isPlainObject));
}(this, (function (exports, Store, immutable, isPlainObject) { 'use strict';

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Store__default = /*#__PURE__*/_interopDefaultLegacy(Store);
var isPlainObject__default = /*#__PURE__*/_interopDefaultLegacy(isPlainObject);

/* eslint max-statements:0, newline-before-return:0 */
/**
 * Constructeur de champs de type tableau
 * @param {Object} obj objet décrivant un élément du tableau
 * @returns {FormArray} instance
 */

function FormArray(obj) {
  if (!(this instanceof FormArray)) return new FormArray(obj); // permet d'instancier sans new

  Array.call(this);
  this.structure = obj;
}
FormArray.prototype = Object.create(Array.prototype);
/**
 * Gestion des tableaux de formulaire avec Heridux
 * @extends HeriduxForm
 */

class FormStore extends Store__default['default'] {
  constructor(STATE_PROPERTY) {
    super(STATE_PROPERTY);
    this.createAction("formArrayAdd", (state, {
      path,
      index
    }) => {
      const key = Store.normalizeKey(path);
      const fields = this.getValidationRules([...key, index]) || {};

      if (!fields) {
        throw new Error(`FormArray has not been defined at path ${this._stringifyPath(key)}`);
      }

      let newFields = this._processForm(fields, [...key, index], true); // on doit respecter la structure complète


      newFields = Store.getKeyValue(newFields, [...key, index]); // mais seule la nouvelle clé nous intéresse

      const newState = state.updateIn(["form", ...key], arr => arr ? arr.insert(index, immutable.fromJS(newFields)) : immutable.List([immutable.fromJS(newFields)]));
      return Store.stateWithChanges(state, newState);
    });
    this.createAction("formArrayRemove", (state, {
      path,
      index
    }) => {
      const key = Store.normalizeKey(path);

      const list = this._getList(state, key);

      const ind = index == null ? list.size - 1 : index;
      return Store.stateWithChanges(state, state.deleteIn(["form", ...key, ind]));
    });
    this.createAction("formArrayMove", (state, {
      path,
      oldIndex,
      newIndex
    }) => {
      const key = Store.normalizeKey(path);

      const list = this._getList(state, key);

      const field = list.get(oldIndex);
      const newState = state.deleteIn(["form", ...key, oldIndex]).updateIn(["form", ...key], arr => arr.insert(newIndex, field));
      return Store.stateWithChanges(state, newState);
    });
    this.createAction("formArrayReset", (state, {
      path
    }) => {
      const key = Store.normalizeKey(path);
      const newState = state.setIn(["form", ...key], immutable.List());
      return Store.stateWithChanges(state, newState);
    });

    const originalResetFormValues = this._reducers[this._getFullActionName("resetFormValues")];

    this.createAction("resetFormValues", (state, {
      path = []
    }) => {
      const newState = this._resetAffectedFormArrays(state, {
        path
      });

      return originalResetFormValues(newState, {
        path
      });
    });

    const originalSetFormValues = this._reducers[this._getFullActionName("setFormValues")];

    this.createAction("setFormValues", (state, {
      values,
      path = []
    }) => {
      const newState = this._resetAffectedFormArrays(state, {
        values,
        path
      });

      return originalSetFormValues(newState, {
        values,
        path
      });
    });

    const originalInitFormValues = this._reducers[this._getFullActionName("initFormValues")];

    this.createAction("initFormValues", (state, {
      values,
      path = []
    }) => {
      const newState = this._resetAffectedFormArrays(state, {
        values,
        path
      });

      return originalInitFormValues(newState, {
        values,
        path
      });
    });
  }

  _resetAffectedFormArrays(state, {
    values: _values,
    path = []
  }) {
    let newState = state;

    const values = _values || this.getFormValuesIn(path, state);

    if (this.isField(path)) return newState;

    if (Array.isArray(values)) {
      if (this._isFormArray(path)) {
        const list = newState.getIn(["form", ...path]);
        if (list) newState = newState.setIn(["form", ...path], immutable.List());
      } else {
        values.forEach((value, i) => {
          newState = this._resetAffectedFormArrays(newState, {
            values: value,
            path: [...path, i]
          });
        });
      }
    } else if (isPlainObject__default['default'](values)) {
      for (const n in values) {
        newState = this._resetAffectedFormArrays(newState, {
          values: values[n],
          path: [...path, n]
        });
      }
    }

    return newState;
  }

  _getList(state, path) {
    if (!this._isFormArray(path)) {
      throw new Error(`field at key ${this._stringifyPath(path)} is not a FormArray`);
    }

    return state.getIn(["form", ...path]);
  }

  _isFormArray(path) {
    return this.getValidationRules(path) instanceof FormArray;
  }

  _getFormArrays(_state, _obj, _path = []) {
    const state = _state || this.getState();

    const path = Store.normalizeKey(_path);

    const obj = _obj || state.getIn(["form", ...path]);

    const formArrays = [];
    if (this._isFormArray(path)) formArrays.push(path);

    for (const [key, value] of obj.entries()) {
      const searchKey = [...path, key];
      const rules = this.getValidationRules(searchKey);
      if (rules instanceof FormArray) formArrays.push(searchKey);

      if (value instanceof immutable.Map || value instanceof immutable.List) {
        formArrays.push(...this._getFormArrays(state, value, searchKey));
      }
    }

    return formArrays;
  }
  /**
   * Définit la structure des éléments du tableau si on ne l'a pas fait dans defineForm
   * @param {String|Array} path chemin du tableau de formulaire
   * @param {Object} itemDefinition description de la structure des éléments du tableau
   * @returns {undefined}
   */


  formArrayDef(path, itemDefinition) {
    /* mode strict (pas de redéfinition possible)
      const rules = this.getValidationRules([...path, 0])
      if (rules) throw new Error(`FormArray has already been defined at path ${this._stringifyPath(path)}`)*/
    return this._processForm(new FormArray(itemDefinition), Store.normalizeKey(path));
  }
  /**
   * Ajoute un élément au tableau
   * @param {String|Array} path chemin du tableau de formulaire
   * @param {Number} ind indice où ajouter l'élément (à la fin par défaut)
   * @returns {Number} l'indice où a été ajouté l'élément
   */


  formArrayAdd(path, ind) {
    let index = ind;

    if (index == null) {
      const key = Store.normalizeKey(path);

      const list = this._getList(this.getState(), key);

      index = (list === null || list === void 0 ? void 0 : list.size) || 0;
    }

    this.execAction("formArrayAdd", {
      path,
      index
    });
    return index;
  }
  /**
   * Supprime un élément du tableau
   * @param {String|Array} path chemin du tableau de formulaire
   * @param {Number} index indice de l'élément à supprimer (le dernier par défaut)
   * @returns {undefined}
   */


  formArrayRemove(path, index = null) {
    return this.execAction("formArrayRemove", {
      path,
      index
    });
  }
  /**
   * Supprime tous les éléments du tableau
   * @param {String|Array} path chemin du tableau de formulaire
   * @returns {undefined}
   */


  formArrayReset(path) {
    return this.execAction("formArrayReset", {
      path
    });
  }
  /**
   * Déplace un élément du tableau
   * @param {String|Array} path chemin du tableau de formulaire
   * @param {Number} oldIndex indice de l'élément à déplacer
   * @param {Number} newIndex indice où déplacer l'élément
   * @returns {undefined}
   */


  formArrayMove(path, oldIndex, newIndex) {
    return this.execAction("formArrayMove", {
      path,
      oldIndex,
      newIndex
    });
  }
  /**
   * Renvoie la longueur du tableau
   * @param {String|Array} path chemin du du tableau de formulaire
   * @param {Immutable} state optionnel, état du store
   * @returns {Number} longueur du tableau
   */


  getFormArrayLength(path, state) {
    const array = this.getState(state).getIn(["form", ...Store.normalizeKey(path)]);
    return array.size;
  }
  /**
   * Renvoie un objet permettant de manipuler plus facilement le tableau de formulaire
   * @param {String|Array} path chemin du tableau de formulaire
   * @returns {Object} objet contenant les méthodes add, remove, move et la propriété length
   */


  getFormArray(path) {
    const that = this;
    return {
      add(index = null) {
        that.formArrayAdd(path, index);
        return this;
      },

      remove(index = null) {
        that.formArrayRemove(path, index);
        return this;
      },

      move(oldIndex, newIndex) {
        that.formArrayMove(path, oldIndex, newIndex);
        return this;
      },

      get length() {
        return that.getFormArrayLength(path);
      }

    };
  }

  _resetFormArrayKeys(path) {
    return path.reduce((newPath, arg) => [...newPath, this._isFormArray(newPath) ? 0 : arg], []);
  }

  getValidationRules(path) {
    const resetPath = this._resetFormArrayKeys(path);

    return super.getValidationRules(resetPath);
  }

  _processForm(fields, initialKey = [], skipRule = false) {
    const form = {};

    const processForm = (field, key = [], skipValue = false) => {
      if (isPlainObject__default['default'](field)) {
        let hasKey = false;

        for (const n in field) {
          hasKey = true;
          processForm(field[n], [...key, n], skipValue);
        }

        if (!hasKey && !skipValue) Store.setKeyValue(form, key, {});
      } else if (Array.isArray(field)) {
        if (!field.length) Store.setKeyValue(form, key, []);

        for (let i = 0; i < field.length; i++) processForm(field[i], [...key, i], skipValue);
      } else if (field instanceof FormArray) {
        if (!skipValue) Store.setKeyValue(form, key, []);
        const arr = new FormArray(field.structure);

        if (!skipRule) {
          Store.setKeyValue(this.validationRules, this._resetFormArrayKeys(key), arr);
        }

        for (const n in field.structure) processForm(field.structure[n], [...key, 0, n], true);
      } else {
        if (!skipRule) this.defineFieldRules(key, field);
        if (skipValue) return;
        Store.setKeyValue(form, key, {
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

}

exports.FormArray = FormArray;
exports.default = FormStore;

Object.defineProperty(exports, '__esModule', { value: true });

})));
