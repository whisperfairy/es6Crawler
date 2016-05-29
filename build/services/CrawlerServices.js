'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by whisp_000 on 2016/5/28.
 */
var http = require('http');
var iconv = require('iconv-lite');
var cheerio = require('cheerio');
var BufferHelper = require('bufferhelper');

var CrawlerServices = function () {
    function CrawlerServices() {
        _classCallCheck(this, CrawlerServices);

        this.html = '';
    }

    _createClass(CrawlerServices, [{
        key: 'gethtml',
        value: function gethtml() {
            var promise = new Promise(function (resolve, reject) {
                // ... some code
                http.get('http://pm25.in/rank', function (res) {

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
                    reject(error);
                });
                return promise;
            });
        }
    }, {
        key: 'catchdata',
        value: function catchdata(htmldata, tag, callback) {
            var promise = new Promise(function (resolve, reject) {
                // ... some code
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
                $(tag).children().each(function (i, elem) {
                    var arr = [];
                    $(this).children().each(function (j, el) {

                        arr.push($(el).text());
                    });
                    results.push(arr);
                });
                resolve(results);
            });
            return promise;
        }
    }]);

    return CrawlerServices;
}();

module.exports = CrawlerServices;