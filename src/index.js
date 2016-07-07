let instances = {};
let TYPES = {
  number(item) {
    if (item === null) {
      return 'value is null';
    } else if (item === undefined) {
      return 'value is undefined';
    } else if (typeof item !== 'number') {
      return 'value is not of type number';
    }

    return true;
  },

  string(item) {
    if (item === null) {
      return 'value is null';
    } else if (item === undefined) {
      return 'value is undefined';
    } else if (typeof item !== 'string') {
      return 'value is not of type string';
    }

    return true;
  }
}

function log(method = 'log', ...message) {
  if (typeof console[method] === 'function') {
    console[method](...message);
  } else {
    console.log(...message);
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
    if (typeof object !== 'object' && typeof object !== 'function') {
      return 'expected value of type ' + type + ' got ' + object;
    }

    let result;
    Object.keys(spec.types[type]).find(key => {
      let childType = spec.types[type][key];
      let value;

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

  function validate(args, ...types) {
    let result = true;

    types.find((type, index) => {
      let result = check(type, args[index]);
      if (result !== true) {
        log('error', 'Argument', index, '(Value: ', args[index], ') is errorous. Message: ', result);
        result = false;
        return true;
      }
    });

    return result;
  }

  function assert(args, ...types) {
    types.forEach((type, index) => {
      let result = check(type, args[index]);
      if (result !== true) {
        log('error', 'Argument', index, '(Value: ', args[index], ') is errorous. Message: ', result);
        throw new Error('assertion failed...');
      }
    });
  }

  return {
    id,
    types: spec.types,
    validate,
    assert
  };
}

export default function(id, spec = {}) {
  if (!spec.types) {
    spec.types = {};
  }

  let instance = instances[id];
  if (instance) {
    Object.assign(instance.types, spec.types);
    return instance;
  }
  else {
    instances[id] = createInstance(id, spec);
    return instances[id];
  }
}