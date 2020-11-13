(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@babel/runtime/helpers/slicedToArray'), require('@babel/runtime/helpers/toConsumableArray'), require('@babel/runtime/helpers/classCallCheck'), require('@babel/runtime/helpers/createClass'), require('@babel/runtime/helpers/get'), require('@babel/runtime/helpers/inherits'), require('@babel/runtime/helpers/possibleConstructorReturn'), require('@babel/runtime/helpers/getPrototypeOf'), require('@heridux/form'), require('immutable'), require('lodash/isPlainObject')) :
typeof define === 'function' && define.amd ? define(['exports', '@babel/runtime/helpers/slicedToArray', '@babel/runtime/helpers/toConsumableArray', '@babel/runtime/helpers/classCallCheck', '@babel/runtime/helpers/createClass', '@babel/runtime/helpers/get', '@babel/runtime/helpers/inherits', '@babel/runtime/helpers/possibleConstructorReturn', '@babel/runtime/helpers/getPrototypeOf', '@heridux/form', 'immutable', 'lodash/isPlainObject'], factory) :
(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.HeriduxForm = {}, global._slicedToArray, global._toConsumableArray, global._classCallCheck, global._createClass, global._get, global._inherits, global._possibleConstructorReturn, global._getPrototypeOf, global.Store, global.immutable, global.isPlainObject));
}(this, (function (exports, _slicedToArray, _toConsumableArray, _classCallCheck, _createClass, _get, _inherits, _possibleConstructorReturn, _getPrototypeOf, Store, immutable, isPlainObject) { 'use strict';

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _get__default = /*#__PURE__*/_interopDefaultLegacy(_get);
var _inherits__default = /*#__PURE__*/_interopDefaultLegacy(_inherits);
var _possibleConstructorReturn__default = /*#__PURE__*/_interopDefaultLegacy(_possibleConstructorReturn);
var _getPrototypeOf__default = /*#__PURE__*/_interopDefaultLegacy(_getPrototypeOf);
var Store__default = /*#__PURE__*/_interopDefaultLegacy(Store);
var isPlainObject__default = /*#__PURE__*/_interopDefaultLegacy(isPlainObject);

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf__default['default'](Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf__default['default'](this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn__default['default'](this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
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

var FormStore = /*#__PURE__*/function (_Store) {
  _inherits__default['default'](FormStore, _Store);

  var _super = _createSuper(FormStore);

  function FormStore(STATE_PROPERTY) {
    var _this;

    _classCallCheck__default['default'](this, FormStore);

    _this = _super.call(this, STATE_PROPERTY);

    _this.createAction("formArrayAdd", function (state, _ref) {
      var path = _ref.path,
          index = _ref.index;
      var key = Store.normalizeKey(path);
      var fields = _this.getValidationRules([].concat(_toConsumableArray__default['default'](key), [index])) || {};

      if (!fields) {
        throw new Error("FormArray has not been defined at path ".concat(_this._stringifyPath(key)));
      }

      var newFields = _this._processForm(fields, [].concat(_toConsumableArray__default['default'](key), [index]), true); // on doit respecter la structure complète


      newFields = Store.getKeyValue(newFields, [].concat(_toConsumableArray__default['default'](key), [index])); // mais seule la nouvelle clé nous intéresse

      var newState = state.updateIn(["form"].concat(_toConsumableArray__default['default'](key)), function (arr) {
        return arr ? arr.insert(index, immutable.fromJS(newFields)) : immutable.List([immutable.fromJS(newFields)]);
      });
      return Store.stateWithChanges(state, newState);
    });

    _this.createAction("formArrayRemove", function (state, _ref2) {
      var path = _ref2.path,
          index = _ref2.index;
      var key = Store.normalizeKey(path);

      var list = _this._getList(state, key);

      var ind = index == null ? list.size - 1 : index;
      return Store.stateWithChanges(state, state.deleteIn(["form"].concat(_toConsumableArray__default['default'](key), [ind])));
    });

    _this.createAction("formArrayMove", function (state, _ref3) {
      var path = _ref3.path,
          oldIndex = _ref3.oldIndex,
          newIndex = _ref3.newIndex;
      var key = Store.normalizeKey(path);

      var list = _this._getList(state, key);

      var field = list.get(oldIndex);
      var newState = state.deleteIn(["form"].concat(_toConsumableArray__default['default'](key), [oldIndex])).updateIn(["form"].concat(_toConsumableArray__default['default'](key)), function (arr) {
        return arr.insert(newIndex, field);
      });
      return Store.stateWithChanges(state, newState);
    });

    _this.createAction("formArrayReset", function (state, _ref4) {
      var path = _ref4.path;
      var key = Store.normalizeKey(path);
      var newState = state.setIn(["form"].concat(_toConsumableArray__default['default'](key)), immutable.List());
      return Store.stateWithChanges(state, newState);
    });

    var originalResetFormValues = _this._reducers[_this._getFullActionName("resetFormValues")];

    _this.createAction("resetFormValues", function (state, _ref5) {
      var _ref5$path = _ref5.path,
          path = _ref5$path === void 0 ? [] : _ref5$path;

      var newState = _this._resetAffectedFormArrays(state, {
        path: path
      });

      return originalResetFormValues(newState, {
        path: path
      });
    });

    var originalSetFormValues = _this._reducers[_this._getFullActionName("setFormValues")];

    _this.createAction("setFormValues", function (state, _ref6) {
      var values = _ref6.values,
          _ref6$path = _ref6.path,
          path = _ref6$path === void 0 ? [] : _ref6$path;

      var newState = _this._resetAffectedFormArrays(state, {
        values: values,
        path: path
      });

      return originalSetFormValues(newState, {
        values: values,
        path: path
      });
    });

    var originalInitFormValues = _this._reducers[_this._getFullActionName("initFormValues")];

    _this.createAction("initFormValues", function (state, _ref7) {
      var values = _ref7.values,
          _ref7$path = _ref7.path,
          path = _ref7$path === void 0 ? [] : _ref7$path;

      var newState = _this._resetAffectedFormArrays(state, {
        values: values,
        path: path
      });

      return originalInitFormValues(newState, {
        values: values,
        path: path
      });
    });

    return _this;
  }

  _createClass__default['default'](FormStore, [{
    key: "_resetAffectedFormArrays",
    value: function _resetAffectedFormArrays(state, _ref8) {
      var _this2 = this;

      var _values = _ref8.values,
          _ref8$path = _ref8.path,
          path = _ref8$path === void 0 ? [] : _ref8$path;
      var newState = state;

      var values = _values || this.getFormValuesIn(path, state);

      if (this.isField(path)) return newState;

      if (Array.isArray(values)) {
        if (this._isFormArray(path)) {
          var list = newState.getIn(["form"].concat(_toConsumableArray__default['default'](path)));
          if (list) newState = newState.setIn(["form"].concat(_toConsumableArray__default['default'](path)), immutable.List());
        } else {
          values.forEach(function (value, i) {
            newState = _this2._resetAffectedFormArrays(newState, {
              values: value,
              path: [].concat(_toConsumableArray__default['default'](path), [i])
            });
          });
        }
      } else if (isPlainObject__default['default'](values)) {
        for (var n in values) {
          newState = this._resetAffectedFormArrays(newState, {
            values: values[n],
            path: [].concat(_toConsumableArray__default['default'](path), [n])
          });
        }
      }

      return newState;
    }
  }, {
    key: "_getList",
    value: function _getList(state, path) {
      if (!this._isFormArray(path)) {
        throw new Error("field at key ".concat(this._stringifyPath(path), " is not a FormArray"));
      }

      return state.getIn(["form"].concat(_toConsumableArray__default['default'](path)));
    }
  }, {
    key: "_isFormArray",
    value: function _isFormArray(path) {
      return this.getValidationRules(path) instanceof FormArray;
    }
  }, {
    key: "_getFormArrays",
    value: function _getFormArrays(_state, _obj) {
      var _path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

      var state = _state || this.getState();

      var path = Store.normalizeKey(_path);

      var obj = _obj || state.getIn(["form"].concat(_toConsumableArray__default['default'](path)));

      var formArrays = [];
      if (this._isFormArray(path)) formArrays.push(path);

      var _iterator = _createForOfIteratorHelper(obj.entries()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray__default['default'](_step.value, 2),
              key = _step$value[0],
              value = _step$value[1];

          var searchKey = [].concat(_toConsumableArray__default['default'](path), [key]);
          var rules = this.getValidationRules(searchKey);
          if (rules instanceof FormArray) formArrays.push(searchKey);

          if (value instanceof immutable.Map || value instanceof immutable.List) {
            formArrays.push.apply(formArrays, _toConsumableArray__default['default'](this._getFormArrays(state, value, searchKey)));
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return formArrays;
    }
    /**
     * Définit la structure des éléments du tableau si on ne l'a pas fait dans defineForm
     * @param {String|Array} path chemin du tableau de formulaire
     * @param {Object} itemDefinition description de la structure des éléments du tableau
     * @returns {undefined}
     */

  }, {
    key: "formArrayDef",
    value: function formArrayDef(path, itemDefinition) {
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

  }, {
    key: "formArrayAdd",
    value: function formArrayAdd(path, ind) {
      var index = ind;

      if (index == null) {
        var key = Store.normalizeKey(path);

        var list = this._getList(this.getState(), key);

        index = (list === null || list === void 0 ? void 0 : list.size) || 0;
      }

      this.execAction("formArrayAdd", {
        path: path,
        index: index
      });
      return index;
    }
    /**
     * Supprime un élément du tableau
     * @param {String|Array} path chemin du tableau de formulaire
     * @param {Number} index indice de l'élément à supprimer (le dernier par défaut)
     * @returns {undefined}
     */

  }, {
    key: "formArrayRemove",
    value: function formArrayRemove(path) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return this.execAction("formArrayRemove", {
        path: path,
        index: index
      });
    }
    /**
     * Supprime tous les éléments du tableau
     * @param {String|Array} path chemin du tableau de formulaire
     * @returns {undefined}
     */

  }, {
    key: "formArrayReset",
    value: function formArrayReset(path) {
      return this.execAction("formArrayReset", {
        path: path
      });
    }
    /**
     * Déplace un élément du tableau
     * @param {String|Array} path chemin du tableau de formulaire
     * @param {Number} oldIndex indice de l'élément à déplacer
     * @param {Number} newIndex indice où déplacer l'élément
     * @returns {undefined}
     */

  }, {
    key: "formArrayMove",
    value: function formArrayMove(path, oldIndex, newIndex) {
      return this.execAction("formArrayMove", {
        path: path,
        oldIndex: oldIndex,
        newIndex: newIndex
      });
    }
    /**
     * Renvoie la longueur du tableau
     * @param {String|Array} path chemin du du tableau de formulaire
     * @param {Immutable} state optionnel, état du store
     * @returns {Number} longueur du tableau
     */

  }, {
    key: "getFormArrayLength",
    value: function getFormArrayLength(path, state) {
      var array = this.getState(state).getIn(["form"].concat(_toConsumableArray__default['default'](Store.normalizeKey(path))));
      return array.size;
    }
    /**
     * Renvoie un objet permettant de manipuler plus facilement le tableau de formulaire
     * @param {String|Array} path chemin du tableau de formulaire
     * @returns {Object} objet contenant les méthodes add, remove, move et la propriété length
     */

  }, {
    key: "getFormArray",
    value: function getFormArray(path) {
      var that = this;
      return {
        add: function add() {
          var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
          that.formArrayAdd(path, index);
          return this;
        },
        remove: function remove() {
          var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
          that.formArrayRemove(path, index);
          return this;
        },
        move: function move(oldIndex, newIndex) {
          that.formArrayMove(path, oldIndex, newIndex);
          return this;
        },

        get length() {
          return that.getFormArrayLength(path);
        }

      };
    }
  }, {
    key: "_resetFormArrayKeys",
    value: function _resetFormArrayKeys(path) {
      var _this3 = this;

      return path.reduce(function (newPath, arg) {
        return [].concat(_toConsumableArray__default['default'](newPath), [_this3._isFormArray(newPath) ? 0 : arg]);
      }, []);
    }
  }, {
    key: "getValidationRules",
    value: function getValidationRules(path) {
      var resetPath = this._resetFormArrayKeys(path);

      return _get__default['default'](_getPrototypeOf__default['default'](FormStore.prototype), "getValidationRules", this).call(this, resetPath);
    }
  }, {
    key: "_processForm",
    value: function _processForm(fields) {
      var _this4 = this;

      var initialKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var skipRule = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var form = {};

      var processForm = function processForm(field) {
        var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var skipValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (isPlainObject__default['default'](field)) {
          var hasKey = false;

          for (var n in field) {
            hasKey = true;
            processForm(field[n], [].concat(_toConsumableArray__default['default'](key), [n]), skipValue);
          }

          if (!hasKey && !skipValue) Store.setKeyValue(form, key, {});
        } else if (Array.isArray(field)) {
          if (!field.length) Store.setKeyValue(form, key, []);

          for (var i = 0; i < field.length; i++) {
            processForm(field[i], [].concat(_toConsumableArray__default['default'](key), [i]), skipValue);
          }
        } else if (field instanceof FormArray) {
          if (!skipValue) Store.setKeyValue(form, key, []);
          var arr = new FormArray(field.structure);

          if (!skipRule) {
            Store.setKeyValue(_this4.validationRules, _this4._resetFormArrayKeys(key), arr);
          }

          for (var _n in field.structure) {
            processForm(field.structure[_n], [].concat(_toConsumableArray__default['default'](key), [0, _n]), true);
          }
        } else {
          if (!skipRule) _this4.defineFieldRules(key, field);
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
  }]);

  return FormStore;
}(Store__default['default']);

exports.FormArray = FormArray;
exports.default = FormStore;

Object.defineProperty(exports, '__esModule', { value: true });

})));
