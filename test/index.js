var asserty = require('../build');
var assert = asserty('test', {
  types: {
    Point: {
      x: 'number',
      y: 'number?',
      'fallback': 'Test'
    },

    Test: {
      x: 'number'
    },

    spec: {
      instanceId: 'string|number',
      target: '==="browser"|==="node"'
    },
    
    DOM: {
      document: {},
      container: 'string',
    }
  }
});

function add(point) {
  assert.assert(arguments, 'Point');
  return point.x + (point.y || 0);
}

function test() {
  add({x: 1, y: 2, fallback: {
    x: 2
  }});

  console.log('run test');
}

console.log('start');
test();

assert.assert(['lol'], 'string|number');
assert.assert([{instanceId: '1', target: 'browse'}], 'spec');


console.log('finish');  