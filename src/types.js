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

export default {
  number(item) {
    return isset(item) || 
      typeof item !== 'number'
      ? 'value is not of type number'
      : true;
  },

  string(item) {
    return isset(item) ||
      typeof item !== 'string'
      ? 'value is not of type string'
      : true;
  },
  
  boolean(item) {
    return isset(item) ||
      typeof item !== 'boolean'
      ? 'value is not of type boolean'
      : true;
  },
  
  array(item) {
    return isset(item) ||
      typeof Array.isArray(item)
      ? 'value is not of type array'
      : true;
  },
  
  func(item) {
    return isset(item) ||
      typeof item !== 'function'
      ? 'value is not of type function'
      : true;
  }
};