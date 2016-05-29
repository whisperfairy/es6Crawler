'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CrawlerServices = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by whisp_000 on 2016/5/28.
 */
var http = require('http');
var iconv = require('iconv-lite');
var cheerio = require('cheerio');
var BufferHelper = require('bufferhelper');

var CrawlerServices = function () {
    function CrawlerServices(city) {
        (0, _classCallCheck3.default)(this, CrawlerServices);

        this.Tag = city.CityTag || "", this.CityName = city.CityName || "", this.URL = city.CityURL || "";
    }

    (0, _createClass3.default)(CrawlerServices, [{
        key: 'gethtml',
        value: function gethtml() {

            http.get(this.URL, function (res) {

                var bufferHelper = new BufferHelper();
                res.on('data', function (d) {
                    bufferHelper.concat(d);
                });
                res.on('end', function () {
                    this.html = iconv.decode(bufferHelper.toBuffer(), 'utf8');
                    resolve(value);
                });
            }).on('error', function (e) {
                console.error(e);
            });
        }
    }, {
        key: 'catchdata',
        value: function catchdata(htmldata, tag, callback) {
            var data = htmldata;
            if (data == null) {
                data = this.html;
            }
            //console.log(data);
            //cheerio
            //cheerio本身默认是转实体的
            // cheerio.load(html,{decodeEntities: false}); 加个参数
            var $ = cheerio.load(data, { decodeEntities: false });
            var results = [];
            $(this.Tag).children().each(function (i, elem) {
                var arr = [];
                $(this).children().each(function (j, el) {

                    arr.push($(el).text());
                });
                results.push(arr);
            });
            return results;
        }
    }]);
    return CrawlerServices;
}();

exports.CrawlerServices = CrawlerServices;