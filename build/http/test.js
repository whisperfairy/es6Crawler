/**
 * Created by whisp_000 on 2016/5/29.
 */
'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [async1, async2, generatortest].map(_regenerator2.default.mark);

function async1() {
    var a;
    return _regenerator2.default.wrap(function async1$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return setTimeout(function () {
                        console.log('async1 done');
                    }, 1000);

                case 2:
                    a = _context.sent;
                    return _context.abrupt('return', a);

                case 4:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked[0], this);
};
function async2() {
    var a;
    return _regenerator2.default.wrap(function async2$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    _context2.next = 2;
                    return setTimeout(function () {
                        console.log('async2 done');
                    }, 1000);

                case 2:
                    a = _context2.sent;
                    return _context2.abrupt('return', a);

                case 4:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _marked[1], this);
};

function generatortest() {
    var step1, step2;
    return _regenerator2.default.wrap(function generatortest$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
                case 0:
                    _context3.next = 2;
                    return async1();

                case 2:
                    step1 = _context3.sent;
                    _context3.next = 5;
                    return async2();

                case 5:
                    step2 = _context3.sent;
                    return _context3.abrupt('return', 0);

                case 7:
                case 'end':
                    return _context3.stop();
            }
        }
    }, _marked[2], this);
}
var g = generatortest();