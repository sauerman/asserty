'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
  array: function array(item) {
    return isset(item) || _typeof(Array.isArray(item)) ? 'value is not of type array' : true;
  },
  func: function func(item) {
    return isset(item) || typeof item !== 'function' ? 'value is not of type function' : true;
  }
};