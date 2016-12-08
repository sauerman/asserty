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