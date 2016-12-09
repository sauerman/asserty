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
  },
  func: function func(item) {
    return isset(item) || typeof item !== 'function' ? 'value is not of type function' : true;
  }
};