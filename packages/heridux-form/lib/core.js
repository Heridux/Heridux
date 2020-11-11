import _classCallCheck from '../node_modules/@babel/runtime/helpers/classCallCheck.js';
import _createClass from '../node_modules/@babel/runtime/helpers/createClass.js';
import _defineProperty from '../node_modules/@babel/runtime/helpers/defineProperty.js';
import { fromJS, Iterable } from '../node_modules/immutable/dist/immutable.es.js';
import Heridux from './heridux/lib/index.js';
import _typeof from '../node_modules/@babel/runtime/helpers/typeof.js';
import isPlainObject from '../node_modules/lodash/isPlainObject.js';
import _inherits from '../node_modules/@babel/runtime/helpers/inherits.js';
import _possibleConstructorReturn from '../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js';
import _getPrototypeOf from '../node_modules/@babel/runtime/helpers/getPrototypeOf.js';
import { Rules, FormWarning } from './heridux-form-rules/lib/index.js';
import _toConsumableArray from '../node_modules/@babel/runtime/helpers/toConsumableArray.js';
import isEqual from '../node_modules/lodash/isEqual.js';

function normalizeKey(path) {
  if (path == null) {
    throw new Error("path is undefined. You may forgot the formKey property on your Control component ?");
  }

  return Array.isArray(path) ? _toConsumableArray(path) : path.split(".");
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
  var hasFormChange = !oldState.get("form").equals(newState.get("form"));

  if (hasFormChange) {
    return newState.merge({
      touched: true,
      changesCount: newState.get("changesCount") + 1
    });
  } else return oldState;
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * Gestion des formulaires avec Heridux
 * @extends Heridux
 */

var HeriduxForm = /*#__PURE__*/function (_Heridux) {
  _inherits(HeriduxForm, _Heridux);

  var _super = _createSuper(HeriduxForm);

  // eslint-disable-next-line max-statements
  function HeriduxForm(STATE_PROPERTY) {
    var _this;

    _classCallCheck(this, HeriduxForm);

    _this = _super.call(this, STATE_PROPERTY);
    var initialState = {
      form: {},
      error: null,
      touched: false,
      changesCount: 0
    };

    _this.setInitialState(initialState);

    _this.initialFormDefinition = null;
    _this.validationRules = {};

    _this.createAction("destroyForm", function (state) {
      return state.merge(fromJS(initialState));
    });

    _this.createAction("redefineForm", function (state, _ref) {
      var form = _ref.form;
      return state.merge(fromJS(_objectSpread(_objectSpread({}, initialState), {}, {
        form: form
      })));
    });

    _this.createAction("setFieldValue", function (state, _ref2) {
      var path = _ref2.path,
          value = _ref2.value;
      var key = ["form"].concat(_toConsumableArray(path));
      var field = state.getIn(key);
      if (!field) throw new Error("No field registered at path " + _this._stringifyPath(path));
      if (isEqual(value, field.get("value"))) return state;
      var initialValue = field.get("initialValue");
      var hasChanged = !isEqual(value, initialValue);
      var newState = state.mergeIn(key, {
        value: value && _typeof(value) === "object" ? fromJS(value) : value,
        error: null,
        warning: null,
        touched: hasChanged
      });
      if (hasChanged) newState = newState.set("touched", true);else newState = newState.set("touched", _this.isFormTouched(newState));
      return newState.set("changesCount", newState.get("changesCount") + 1);
    });

    _this.createAction("initFieldValue", function (state, _ref3) {
      var path = _ref3.path,
          value = _ref3.value;
      var field = state.getIn(["form"].concat(_toConsumableArray(path)));
      if (field.get("value") === value && field.get("initialValue") === value) return state;
      var newState = state.mergeIn(["form"].concat(_toConsumableArray(path)), {
        initialValue: value,
        value: value,
        error: null,
        warning: null,
        touched: false
      });
      return newState.merge({
        touched: _this.isFormTouched(newState),
        changesCount: state.get("changesCount") + 1
      });
    });

    _this.createAction("removeFields", function (state, _ref4) {
      var path = _ref4.path;
      return stateWithChanges(state, state.deleteIn(["form"].concat(_toConsumableArray(path))));
    });

    _this.createAction("addFields", function (state, _ref5) {
      var path = _ref5.path,
          fields = _ref5.fields;

      var mapFields = _this._processForm(fields, path);

      var newState = state.mergeDeepIn(["form"], fromJS(mapFields));
      return stateWithChanges(state, newState);
    });

    _this.createAction("cancelFieldValue", function (state, _ref6) {
      var path = _ref6.path;
      var field = state.getIn(["form"].concat(_toConsumableArray(path)));
      var initialValue = field.get("initialValue");
      if (field.get("value") === initialValue) return state;
      var newState = state.mergeIn(["form"].concat(_toConsumableArray(path)), {
        value: initialValue,
        error: null,
        warning: null,
        touched: false
      });
      return newState.merge({
        touched: _this.isFormTouched(newState),
        changesCount: state.get("changesCount") + 1
      });
    });

    _this.createAction("initFormValues", function (state, _ref7) {
      var values = _ref7.values,
          _ref7$path = _ref7.path,
          path = _ref7$path === void 0 ? [] : _ref7$path;

      // si certaines valeurs sont des objets, le mergeDeepIn va parcourir la valeur et ne mettre à jour
      // qu'une partie de la valeur. Donc avant on met à null les valeurs qui vont être modifiées.
      var emptyValues = _this.mapFields(function () {
        return {
          value: null,
          initialValue: null
        };
      }, state, values, path);

      var newValues = _this.mapFields(function (value) {
        return {
          value: value,
          initialValue: value,
          error: null,
          warning: null,
          touched: false
        };
      }, state, values, path);

      var newState = stateWithChanges(state, state.mergeDeepIn(["form"].concat(_toConsumableArray(path)), emptyValues).mergeDeepIn(["form"].concat(_toConsumableArray(path)), newValues));
      return path ? newState : newState.set("touched", false);
    });

    _this.createAction("resetFormValues", function (state, _ref8) {
      var _ref8$path = _ref8.path,
          path = _ref8$path === void 0 ? [] : _ref8$path;

      // réinitialisation des valeurs
      var newValues = _this.mapFields(function () {
        return {
          value: null,
          initialValue: null,
          error: null,
          warning: null,
          touched: false
        };
      }, state, null, path);

      var newState = stateWithChanges(state, state.mergeDeepIn(["form"].concat(_toConsumableArray(path)), newValues));
      return (path === null || path === void 0 ? void 0 : path.length) ? newState : newState.merge({
        touched: false,
        error: null
      });
    });

    _this.createAction("cancelFormValues", function (state, _ref9) {
      var _ref9$path = _ref9.path,
          path = _ref9$path === void 0 ? [] : _ref9$path;

      var emptyValues = _this.mapFields(function () {
        return {
          value: null
        };
      }, state, null, path);

      var newValues = _this.mapFields(function (field) {
        return {
          value: field.initialValue,
          error: null,
          warning: null,
          touched: false
        };
      }, state, null, path);

      var newState = stateWithChanges(state, state.mergeDeepIn(["form"].concat(_toConsumableArray(path)), emptyValues).mergeDeepIn(["form"].concat(_toConsumableArray(path)), newValues));
      return (path === null || path === void 0 ? void 0 : path.length) ? newState : newState.merge({
        touched: false,
        error: null
      });
    });

    _this.createAction("setFormValues", function (state, _ref10) {
      var values = _ref10.values,
          _ref10$path = _ref10.path,
          path = _ref10$path === void 0 ? [] : _ref10$path;

      var emptyValues = _this.mapFields(function () {
        return {
          value: null
        };
      }, state, values, path);

      var newValues = _this.mapFields(function (value, key) {
        return {
          value: value,
          error: null,
          warning: null,
          touched: state.getIn([].concat(_toConsumableArray(key), ["initialValue"])) !== value
        };
      }, state, values, path);

      var newState = state.mergeDeepIn(["form"].concat(_toConsumableArray(path)), emptyValues).mergeDeepIn(["form"].concat(_toConsumableArray(path)), newValues);
      return stateWithChanges(state, newState).set("touched", _this.isFormTouched(newState));
    });

    _this.createAction("setFieldWarning", function (state, _ref11) {
      var path = _ref11.path,
          message = _ref11.message,
          properties = _ref11.properties;
      return state.mergeDeepIn(["form"].concat(_toConsumableArray(path)), {
        warning: {
          message: message,
          properties: properties
        },
        touched: true
      });
    });

    _this.createAction("setFieldError", function (state, _ref12) {
      var path = _ref12.path,
          message = _ref12.message,
          properties = _ref12.properties;
      return state.mergeDeepIn(["form"].concat(_toConsumableArray(path)), {
        error: {
          message: message,
          properties: properties
        },
        touched: true
      });
    });

    _this.createAction("setGlobalError", function (state, _ref13) {
      var error = _ref13.error;
      return state.set("error", error);
    });

    return _this;
  }

  _createClass(HeriduxForm, [{
    key: "_stringifyPath",
    value: function _stringifyPath(path) {
      return "[" + path.join(", ") + "]";
    }
    /**
     * Récupération des règles de validation d'un champ du formulaire
     * @param {Array} path clé d'accès au champ
     * @returns {Rules} l'objet contenant les règles de validation
     */

  }, {
    key: "getValidationRules",
    value: function getValidationRules(path) {
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

  }, {
    key: "mapFields",
    value: function mapFields(callback, _state, _values) {
      var _this2 = this;

      var _path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

      var state = _state || this.getState();

      var path = normalizeKey(_path);

      var values = _values || state.getIn(["form"].concat(_toConsumableArray(path)));

      if (Iterable.isIterable(values)) values = values.toJS();
      var isArray = Array.isArray(values);
      var map = isArray ? [] : {};

      var processField = function processField(value, n) {
        var newKey = [].concat(_toConsumableArray(path), [n]);

        if (_this2.isField(newKey)) {
          return callback(value, newKey);
        } else if (Array.isArray(value) || isPlainObject(value)) {
          return _this2.mapFields(callback, state, value, newKey);
        } else {
          // pour éviter de confondre ce cas avec celui ou callback renvoie null
          throw new Error("unexpected value");
        }
      };

      if (isArray) {
        values.forEach(function (value, i) {
          try {
            map.push(processField(value, i));
          } catch (e) {}
        });
      } else if (isPlainObject(values)) {
        for (var n in values) {
          try {
            map[n] = processField(values[n], n);
          } catch (e) {}
        }
      } else if (values) {
        throw new Error(_typeof(values) + " : type incorrect for values iteration");
      } else {
        console.warn("values is a falsy value", values, path);
      }

      return map;
    }
  }, {
    key: "isField",
    value: function isField(path) {
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

  }, {
    key: "checkFieldValue",
    value: function checkFieldValue(_ref14) {
      var key = _ref14.key,
          value = _ref14.value,
          values = _ref14.values;
      var rules = this.getValidationRules(key);
      if (!rules) return;

      if (!(rules instanceof Rules)) {
        var msg = "rules must be an instance of Rules class";
        console.error(msg, rules);
        throw new Error(msg);
      }

      try {
        rules.check(value, values, {
          key: key
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

  }, {
    key: "checkForm",
    value: function checkForm() {
      var _this3 = this;

      var formValues = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var state = this.getState();
      var values = formValues || state.get("form").toJS();
      var valid = true;

      var callback = function callback(field, key) {
        var _field$error;

        if ((_field$error = field.error) === null || _field$error === void 0 ? void 0 : _field$error.message) valid = false;else {
          try {
            _this3.checkFieldValue({
              key: key,
              value: field.value,
              values: values
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

  }, {
    key: "initFormValues",
    value: function initFormValues(values) {
      return this.execAction("initFormValues", {
        values: values
      });
    }
    /**
     * Initialisation d'une partie du formulaire. Les champs non déclarés seront ignorés
     * @param {Array} path point d'entrée
     * @param {Object} values valeurs d'initialisation
     * @returns {undefined}
     */

  }, {
    key: "initFormValuesIn",
    value: function initFormValuesIn(path, values) {
      return this.execAction("initFormValues", {
        values: values,
        path: path && normalizeKey(path)
      });
    }
    /**
     * Annulation des modifications (retour aux valeurs initiales définies par la méthode initFormValues)
     * @returns {undefined}
     */

  }, {
    key: "cancelFormValues",
    value: function cancelFormValues() {
      return this.execAction("cancelFormValues");
    }
    /**
     * Annulation des modifications d'une partie du formulaure
     * (retour aux valeurs initiales définies par la méthode initFormValues)
     * @param {Array} path point d'entrée
     * @returns {undefined}
     */

  }, {
    key: "cancelFormValuesIn",
    value: function cancelFormValuesIn(path) {
      return this.execAction("cancelFormValues", {
        path: path && normalizeKey(path)
      });
    }
    /**
     * Réinitialisation des valeurs du formulaires (toutes fixées à null)
     * @returns {undefined}
     */

  }, {
    key: "resetFormValues",
    value: function resetFormValues() {
      return this.execAction("resetFormValues");
    }
    /**
     * Réinitialisation d'une partie des valeurs du formulaires (toutes fixées à null)
     * @param {Array} path point d'entrée
     * @returns {undefined}
     */

  }, {
    key: "resetFormValuesIn",
    value: function resetFormValuesIn(path) {
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

  }, {
    key: "addFields",
    value: function addFields(path, fields) {
      if (isPlainObject(path) && fields == null) {
        return this.execAction("addFields", {
          path: [],
          fields: path
        });
      } else {
        return this.execAction("addFields", {
          path: path ? normalizeKey(path) : [],
          fields: fields
        });
      }
    }
    /**
     * Suppression dynamique de champs de formulaire
     * @param {Array|String} path chemin ou supprimer les champs
     * @returns {undefined}
     */

  }, {
    key: "removeFields",
    value: function removeFields(path) {
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

  }, {
    key: "setFieldValue",
    value: function setFieldValue(path, value) {
      var key = normalizeKey(path);
      this.execAction("setFieldValue", {
        path: key,
        value: value
      });

      try {
        this.checkFieldValue({
          key: key,
          value: value,
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

  }, {
    key: "initFieldValue",
    value: function initFieldValue(path, value) {
      return this.execAction("initFieldValue", {
        path: normalizeKey(path),
        value: value
      });
    }
    /**
     * Annulation des modifications d'un champ (retour à la valeur initiale)
     * @param {Array|String} path chemin du champ
     * @returns {undefined}
     */

  }, {
    key: "cancelFieldValue",
    value: function cancelFieldValue(path) {
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

  }, {
    key: "setFieldWarning",
    value: function setFieldWarning(path, message, properties) {
      return this.execAction("setFieldWarning", {
        path: normalizeKey(path),
        message: message,
        properties: properties
      });
    }
    /**
     * Définition d'un message d'erreur
     * @param {Array|String} path chemin du champ
     * @param {String} message contenu du message
     * @param {Object} properties propriétés supplémentaires liées à l'erreur
     * @returns {undefined}
     */

  }, {
    key: "setFieldError",
    value: function setFieldError(path, message, properties) {
      return this.execAction("setFieldError", {
        path: normalizeKey(path),
        message: message,
        properties: properties
      });
    }
    /**
     * Définition d'une erreur globale sur le formulaire
     * @param {String} error contenu de l'erreur
     * @returns {undefined}
     */

  }, {
    key: "setGlobalError",
    value: function setGlobalError(error) {
      return this.execAction("setGlobalError", {
        error: error
      });
    }
    /**
     * Teste si le formulaire a été modifié
     * @param {Immutable.Map} state optionnel état du store si on l'a sous la main
     * @returns {Boolean} true si le formulaire a été modifié, false sinon
     */

  }, {
    key: "isFormTouched",
    value: function isFormTouched(state) {
      var touched = false;
      this.mapFields(function (field) {
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

  }, {
    key: "isFormValid",
    value: function isFormValid(state) {
      var valid = true;
      this.mapFields(function (field) {
        if (field.error) valid = false;
      }, state);
      return valid;
    }
    /**
     * Récupère l'ensemble des erreurs du formulaire sous forme de tableau
     * @param {Immutable.Map} state optionnel état du store si on l'a sous la main
     * @returns {Array} tableau des erreurs
     */

  }, {
    key: "getFormErrors",
    value: function getFormErrors(state) {
      var fieldErrors = [];
      this.mapFields(function (field, key) {
        if (field.error) {
          fieldErrors.push({
            key: key,
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

  }, {
    key: "setFormValues",
    value: function setFormValues(values) {
      return this.execAction("setFormValues", {
        values: values
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

  }, {
    key: "setFormValuesIn",
    value: function setFormValuesIn(path, values) {
      return this.execAction("setFormValues", {
        values: values,
        path: path && normalizeKey(path)
      });
    }
    /**
     * Récupère l'ensemble des valeurs du formulaire
     * @param {Immutable.Map} state optionnel état du store si on l'a sous la main
     * @returns {Object} objet décrivant les valeurs
     */

  }, {
    key: "getFormValues",
    value: function getFormValues(state) {
      return this.mapFields(function (field) {
        return field.value;
      }, state);
    }
    /**
     * Récupère une partie des valeurs du formulaire
     * @param {Array} path optionnel, point d'entrée si on ne veut récupérer qu'une partie du formulaire
     * @param {Immutable.Map} state optionnel état du store si on l'a sous la main
     * @returns {Object} objet décrivant les valeurs
     */

  }, {
    key: "getFormValuesIn",
    value: function getFormValuesIn(path, state) {
      return this.mapFields(function (field) {
        return field.value;
      }, state, null, path && normalizeKey(path));
    }
  }, {
    key: "_getFieldProp",
    value: function _getFieldProp(path, prop, state) {
      var store = this.getState(state);
      var value = store.getIn(["form"].concat(_toConsumableArray(normalizeKey(path)), [prop]));
      return value && value.toJS ? value.toJS() : value;
    }
    /**
     * Récupération de la valeur d'un champ
     * @param {Array|String} path chemin du champ
     * @param {Immutable.Map} state optionnel état du store si on l'a sous la main
     * @returns {*} valeur du champ
     */

  }, {
    key: "getFieldValue",
    value: function getFieldValue(path, state) {
      return this._getFieldProp(path, "value", state);
    }
    /**
     * Récupération du message d'avertissement d'un champ
     * @param {Array|String} path chemin du champ
     * @param {Immutable.Map} state optionnel état du store si on l'a sous la main
     * @returns {String} message d'avertissement du champ
     */

  }, {
    key: "getFieldWarning",
    value: function getFieldWarning(path, state) {
      var warning = this._getFieldProp(path, "warning", state);

      return (warning === null || warning === void 0 ? void 0 : warning.message) ? warning : null;
    }
    /**
     * Récupération du message d'erreur d'un champ
     * @param {Array|String} path chemin du champ
     * @param {Immutable.Map} state optionnel état du store si on l'a sous la main
     * @returns {String} message d'erreur du champ
     */

  }, {
    key: "getFieldError",
    value: function getFieldError(path, state) {
      var error = this._getFieldProp(path, "error", state);

      return (error === null || error === void 0 ? void 0 : error.message) ? error : null;
    }
    /**
     * Teste si un champ a été modifié
     * @param {Array|String} path chemin du champ
     * @param {Immutable.Map} state optionnel état du store si on l'a sous la main
     * @returns {Boolean} true si le champ a été modifié
     */

  }, {
    key: "isFieldTouched",
    value: function isFieldTouched(path, state) {
      return this._getFieldProp(path, "touched", state);
    }
    /**
     * Définit la structure du formulaire
     * @param {Object} fields objet décrivant le formulaire (nom des champs en clé, objet Rules en valeur)
     * @returns {undefined}
     */

  }, {
    key: "defineForm",
    value: function defineForm(fields) {
      this.validationRules = {};

      var form = this._processForm(fields);

      if (this.initialFormDefinition) this.execAction("redefineForm", {
        form: form
      });else this.setInitialState(_objectSpread(_objectSpread({}, this.initialState.toJS()), {}, {
        form: form
      }));
      this.initialFormDefinition = form;
    }
    /**
     * Réinitialise complètement la structure du formulaire
     * @returns {undefined}
     */

  }, {
    key: "destroyForm",
    value: function destroyForm() {
      return this.execAction("destroyForm");
    }
    /**
     * Définit les règles de validation pour un champ donné
     * @param {Array|String} path chemin du champ
     * @param {Rules} rules objet de validation
     * @returns {undefined}
     */

  }, {
    key: "defineFieldRules",
    value: function defineFieldRules(path, rules) {
      setKeyValue(this.validationRules, path, rules && rules instanceof Rules ? rules : new Rules());
    }
  }, {
    key: "_processForm",
    value: function _processForm(fields) {
      var _this4 = this;

      var initialKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var form = {};

      var processForm = function processForm(field) {
        var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

        if (isPlainObject(field)) {
          var hasKey = false;

          for (var n in field) {
            hasKey = true;
            processForm(field[n], [].concat(_toConsumableArray(key), [n]));
          }

          if (!hasKey) setKeyValue(form, key, {});
        } else if (Array.isArray(field)) {
          if (!field.length) setKeyValue(form, key, []);

          for (var i = 0; i < field.length; i++) {
            processForm(field[i], [].concat(_toConsumableArray(key), [i]));
          }
        } else {
          _this4.defineFieldRules(key, field);

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

  }, {
    key: "submitForm",
    value: function submitForm() {
      var test = this.checkForm();

      if (!test) {
        var error = new Error("form error");
        error.errors = this.getFormErrors();
        throw error;
      }

      return this.getFormValues();
    }
  }, {
    key: "templateDriven",
    set: function set(bool) {
      this._templateDriven = Boolean(bool);
    },
    get: function get() {
      return Boolean(this._templateDriven);
    }
  }]);

  return HeriduxForm;
}(Heridux);

export { HeriduxForm as H, stateWithChanges as a, getKeyValue as g, normalizeKey as n, setKeyValue as s };
