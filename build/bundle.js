var asserty =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.default = function (id) {
	  var spec = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { types: {} };
	
	  /* branch-transpiler start */instances[id];
	
	  if (instances[id] === undefined) {
	    instances[id] = createInstance(id, spec);
	  } else if (true) {
	    instances[id] = Object.assign(instances[id].types, spec.types);
	  }
	  /* branch-transpiler end */
	
	  return instances[id];
	};
	
	var _util = __webpack_require__(2);
	
	var _types = __webpack_require__(3);
	
	var _types2 = _interopRequireDefault(_types);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var instances = {};
	
	function createInstance(id, spec) {
	  function check(type, value) {
	    /**
	     * check if multiple types allowed
	     */
	    var result = void 0;
	    /* branch-transpiler start */result;
	
	    if (type.indexOf('|') === -1) {
	      result = checkType(type, value);
	    } else if (true) {
	      result = checkTypes(type.split('|'), value);
	    }
	    /* branch-transpiler end */
	
	    return result;
	  }
	
	  function checkTypes(types, value) {
	    var result = '';
	
	    types.forEach(function (type, index) {
	      if (result !== true) {
	        if (index > 0) {
	          result += ' and ';
	        }
	        var _check = checkType(type, value);
	
	        if (_check === true) {
	          result = true;
	        } else {
	          result += _check;
	        }
	      }
	    });
	    return result;
	  }
	
	  function checkType(type, value) {
	    /**
	     * check if optional
	     */
	    if (type.indexOf('?') !== -1) {
	      if (value === null || value === undefined) {
	        return true;
	      } else {
	        type = type.replace(/\?/g, '');
	      }
	    }
	
	    /**
	     * check for exact value
	     */
	    if (type.indexOf('===') === 0) {
	      if (type.indexOf('"') === 3 || type.indexOf('\'') === 3) {
	        //is string
	        type = type.substr(4, type.length - 5);
	        if (value !== type) {
	          return 'value is not ==="' + type + '" but ' + value;
	        } else {
	          return true;
	        }
	      } else {
	        //is number
	        type = type.substr(3, type.length - 3);
	        if (value !== parseInt(type, 10)) {
	          return 'value is not ===' + type + ' but ' + value;
	        } else {
	          return true;
	        }
	      }
	    }
	
	    var typeName = type.trim();
	
	    if (spec.types[typeName]) {
	      return checkObjectType(typeName, value);
	    } else if (_types2.default[typeName]) {
	      return _types2.default[typeName](value);
	    }
	
	    throw new Error('Type ' + type + ' unknown');
	  }
	
	  function checkObjectType(type, object) {
	    if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) !== 'object' && typeof object !== 'function') {
	      return 'expected value of type ' + type + ' got ' + object;
	    }
	
	    var result = void 0;
	    Object.keys(spec.types[type]).find(function (key) {
	      var childType = spec.types[type][key];
	      var value = void 0;
	
	      if (type.indexOf('*') === 0) {
	        if (typeof object.get !== 'function') {
	          result = type + ' has no getter-function.';
	          return true;
	        }
	        value = object.get(key);
	      } else {
	        value = object.key;
	      }
	
	      result = check(childType, object[key]);
	      if (result !== true) {
	        result = 'Field "' + key + '" --> ' + result;
	        return true;
	      }
	    });
	
	    return result;
	  }
	
	  function validate(args) {
	    var result = true;
	
	    for (var _len = arguments.length, types = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      types[_key - 1] = arguments[_key];
	    }
	
	    types.find(function (type, index) {
	      var result = check(type, args[index]);
	      if (result !== true) {
	        (0, _util.log)('error', 'Argument', index, '(Value: ', args[index], ') is errorous. Message: ', result);
	        result = false;
	        return true;
	      }
	    });
	
	    return result;
	  }
	
	  function assert(args) {
	    for (var _len2 = arguments.length, types = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	      types[_key2 - 1] = arguments[_key2];
	    }
	
	    types.forEach(function (type, index) {
	      var result = check(type, args[index]);
	      if (result !== true) {
	        (0, _util.log)('error', 'Argument', index, '(Value: ', args[index], ') is errorous. Message: ', result);
	        throw new Error('assertion failed...');
	      }
	    });
	  }
	
	  return {
	    id: id,
	    types: spec.types,
	    validate: validate,
	    assert: assert
	  };
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.log = log;
	function log() {
	  var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'log';
	
	  for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    message[_key - 1] = arguments[_key];
	  }
	
	  /* branch-transpiler start */
	
	  if (typeof console[method] === 'function') {
	    var _console;
	
	    (_console = console)[method].apply(_console, message);
	  } else if (true) {
	    var _console2;
	
	    (_console2 = console).log.apply(_console2, message);
	  }
	  /* branch-transpiler end */
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function isUndefined(item) {
	  if (item === undefined) {
	    return 'value is undefined';
	  } else {
	    return false;
	  }
	}
	
	function isNull(item) {
	  if (item === null) {
	    return 'value is null';
	  } else {
	    return false;
	  }
	}
	
	function isset(item) {
	  return isUndefined(item) || isNull(item);
	}
	
	exports.default = {
	  number: function number(item) {
	    return isset(item) || typeof item !== 'number' ? 'value is not of type number' : true;
	  },
	  string: function string(item) {
	    return isset(item) || typeof item !== 'string' ? 'value is not of type string' : true;
	  },
	  boolean: function boolean(item) {
	    return isset(item) || typeof item !== 'boolean' ? 'value is not of type boolean' : true;
	  }
	};

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map