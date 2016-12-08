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


assert.assert(['hua..'], 'string 5..5');

assert.assert(['lol'], 'string|number');



console.log('finish');