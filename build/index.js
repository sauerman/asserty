'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = function (id) {
  var spec = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  if (!spec.types) {
    spec.types = {};
  }

  var instance = instances[id];
  if (instance) {
    Object.assign(instance.types, spec.types);
    return instance;
  } else {
    instances[id] = createInstance(id, spec);
    return instances[id];
  }
};

var instances = {};
var TYPES = {
  number: function number(item) {
    if (item === null) {
      return 'value is null';
    } else if (item === undefined) {
      return 'value is undefined';
    } else if (typeof item !== 'number') {
      return 'value is not of type number';
    }

    return true;
  },
  string: function string(item) {
    if (item === null) {
      return 'value is null';
    } else if (item === undefined) {
      return 'value is undefined';
    } else if (typeof item !== 'string') {
      return 'value is not of type string';
    }

    return true;
  }
};

function log() {
  var method = arguments.length <= 0 || arguments[0] === undefined ? 'log' : arguments[0];

  for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    message[_key - 1] = arguments[_key];
  }

  if (typeof console[method] === 'function') {
    var _console;

    (_console = console)[method].apply(_console, message);
  } else {
    var _console2;

    (_console2 = console).log.apply(_console2, message);
  }
}

function createInstance(id, spec) {
  function check(type, value) {
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
        type = type.substr(4, type.length - 5);
        if (value !== type) {
          return 'value is not ==="' + type + '" but ' + value;
        } else {
          return true;
        }
      } else {
        type = type.substr(3, type.length - 3);
        if (value !== parseInt(type, 10)) {
          return 'value is not ===' + type + ' but ' + value;
        } else {
          return true;
        }
      }
    }

    if (TYPES[type]) {
      return TYPES[type](value);
    }

    if (spec.types[type]) {
      return checkObjectType(type, value);
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

    for (var _len2 = arguments.length, types = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      types[_key2 - 1] = arguments[_key2];
    }

    types.find(function (type, index) {
      var result = check(type, args[index]);
      if (result !== true) {
        log('error', 'Argument', index, '(Value: ', args[index], ') is errorous. Message: ', result);
        result = false;
        return true;
      }
    });

    return result;
  }

  function assert(args) {
    for (var _len3 = arguments.length, types = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      types[_key3 - 1] = arguments[_key3];
    }

    types.forEach(function (type, index) {
      var result = check(type, args[index]);
      if (result !== true) {
        log('error', 'Argument', index, '(Value: ', args[index], ') is errorous. Message: ', result);
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