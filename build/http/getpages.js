'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _http = require('http');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PMdateRequest = function () {
    function PMdateRequest() {
        (0, _classCallCheck3.default)(this, PMdateRequest);

        this.html = '';
    }

    (0, _createClass3.default)(PMdateRequest, [{
        key: 'gethtml',
        value: function gethtml() {
            _http.http.get('http://pm25.in/rank', function (res) {

                var bufferHelper = new BufferHelper();
                res.on('data', function (d) {
                    bufferHelper.concat(d);
                });
                res.on('end', function () {
                    this.html = iconv.decode(bufferHelper.toBuffer(), 'utf8');
                    callback(null, this.html);
                });
            }).on('error', function (e) {
                console.error(e);
            });
        }
    }]);
    return PMdateRequest;
}(); /**
      * Created by whisp_000 on 2016/5/28.
      */