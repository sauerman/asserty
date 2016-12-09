import {log} from './util';
import TYPES from './types';

let instances = {};

function createInstance(id, spec) {
  function check(type, value) {
    /**
     * check if multiple types allowed
     */
    let result;
    result = branch 
      (type.indexOf('|')) {
      (-1               ): checkType(type, value)
      (                 ): checkTypes(type.split('|'), value)
    }
    
    return result;
  }
  
  function checkTypes(types, value) {
    let result = '';
    
    types.forEach((type, index) => {
      if (result !== true) {
        if (index > 0) {
          result += ' and ';
        }
        let check = checkType(type, value);
        
        if (check === true) {
          result = true;
        } else {
          result += check;
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
      if (type.indexOf('"') === 3 || type.indexOf('\'') === 3) { //is string
        type = type.substr(4, type.length - 5);
        if (value !== type) {
          return 'value is not ==="' + type + '" but ' + value;
        } else {
          return true;
        }
      } else { //is number
        type = type.substr(3, type.length - 3);
        if (value !== parseInt(type, 10)) {
          return 'value is not ===' + type + ' but ' + value;
        } else {
          return true;
        }
      }
    }

    let typeName = type.trim();

    if (spec.types[typeName]) {
      return checkObjectType(typeName, value);
    } 
    
    if (typeName === 'function') {
      typeName = 'func';
    }
    
    if (TYPES[typeName]) {
      return TYPES[typeName](value);
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

module.exports = function(id, spec = {types:{}}) {
  branch
    (instances[id]) {
    (undefined    ): instances[id] = createInstance(id, spec)
    (             ): Object.assign(instances[id].types, spec.types)
  }
  
  return instances[id];
};
