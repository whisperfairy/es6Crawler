'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CrawlerServices = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _StackEvent = require('../Event/StackEvent');

var _PMStationInfo = require('../entities/PMStationInfo');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by whisp_000 on 2016/5/28.
 */
var http = require('http');
var iconv = require('iconv-lite');
var cheerio = require('cheerio');
var BufferHelper = require('bufferhelper');
var pmdao = require('../dao/PM25Dao');

console.log(undefined);

var CrawlerServices = function () {
    function CrawlerServices(city) {
        (0, _classCallCheck3.default)(this, CrawlerServices);

        this.Tag = city.CityTag || "", this.CityName = city.CityName || "", this.URL = city.CityURL || "", this.html = "", this.CrawlerInfo = [];
    }

    (0, _createClass3.default)(CrawlerServices, [{
        key: 'gethtml',
        value: function gethtml() {
            var _this = this;

            var _ = this;
            var promise = new Promise(function (resolve, reject) {
                // ... some code
                http.get(_this.URL, function (res) {
                    var bufferHelper = new BufferHelper();
                    res.on('data', function (d) {
                        bufferHelper.concat(d);
                    });
                    res.on('end', function () {
                        _.html = iconv.decode(bufferHelper.toBuffer(), 'utf8');
                        console.log(_.CityName + "gethtml success");
                        resolve(_.html);
                    });
                }).on('error', function (e) {
                    console.error(e);
                    reject(e);
                });
            });
            return promise;
        }
    }, {
        key: 'catchdata',
        value: function catchdata() {
            var _this2 = this;

            var promise = new Promise(function (resolve, reject) {
                // ... some code
                var data = _this2.html;
                //console.log(data);
                //cheerio
                //cheerio本身默认是转实体的
                //cheerio.load(html,{decodeEntities: false}); 加个参数
                var $ = cheerio.load(data, { decodeEntities: false });
                var results = [];
                $(_this2.Tag).children().each(function (i, elem) {
                    var arr = [];
                    $(elem).children().each(function (j, el) {
                        arr.push($(el).text());
                    });
                    results.push(arr);
                });
                console.log(_this2.CityName + "catch success");
                _this2.CrawlerInfo = results;
                resolve(results);
            });
            return promise;
        }
    }, {
        key: 'dealData',
        value: function dealData() {
            var _ = this;
            var promise = new Promise(function (resolve, reject) {
                var dbinsert = function () {
                    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
                        var ele, stationinfo, saveQ;
                        return _regenerator2.default.wrap(function _callee$(_context) {
                            while (1) {
                                switch (_context.prev = _context.next) {
                                    case 0:
                                        _context.t0 = _regenerator2.default.keys(_.CrawlerInfo);

                                    case 1:
                                        if ((_context.t1 = _context.t0()).done) {
                                            _context.next = 10;
                                            break;
                                        }

                                        ele = _context.t1.value;
                                        stationinfo = new _PMStationInfo.PMStationInfo(_.CrawlerInfo[ele]);

                                        stationinfo.city = _.CityName;
                                        _context.next = 7;
                                        return pmdao.saveEntity(stationinfo);

                                    case 7:
                                        saveQ = _context.sent;
                                        _context.next = 1;
                                        break;

                                    case 10:
                                        resolve();

                                    case 11:
                                    case 'end':
                                        return _context.stop();
                                }
                            }
                        }, _callee, this);
                    }));
                    return function dbinsert() {
                        return ref.apply(this, arguments);
                    };
                }();

                dbinsert();
                // this.CrawlerInfo.forEach((ele, index, arr)=> {
                //     async function dealdata() {
                //         // console.log(ele);
                //         let stationinfo = new PMStationInfo(ele);
                //         let saveQ = await pmdao.saveEntity(stationinfo);
                //         return saveQ;
                //     }
                //     dealdata().then(function(data){
                //         resolve(data);
                //         console.log('db success');
                //     });
                // })
            });
            return promise;
        }
    }, {
        key: 'start',
        value: function start() {
            var _ = this;
            var asyncPM = function () {
                var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
                    return _regenerator2.default.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.next = 2;
                                    return _.gethtml();

                                case 2:
                                    _context2.next = 4;
                                    return _.catchdata();

                                case 4:
                                    _context2.next = 6;
                                    return _.dealData();

                                case 6:
                                    return _context2.abrupt('return', true);

                                case 7:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this);
                }));

                function asyncPM() {
                    return ref.apply(this, arguments);
                }

                return asyncPM;
            }();
            asyncPM();
        }
    }]);
    return CrawlerServices;
}();

exports.CrawlerServices = CrawlerServices;