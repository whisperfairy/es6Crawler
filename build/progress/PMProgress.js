"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StartPMCrawler = undefined;

var _CrawlerServices = require('../services/CrawlerServices');

var _directionalWebsiteURL = require('../config/directionalWebsiteURL');

var _StackEvent = require('../Event/StackEvent');

// let dao = require('../dao/PM25Dao');

var iter = _directionalWebsiteURL.URLConfig.CityURL[Symbol.iterator]();
var i = 0;
var cityinfo = void 0;
_StackEvent.StackEvent.on('popstack', function () {
    cityinfo = iter.next();
    console.log("i=" + i);
    if (cityinfo.done != true) {
        i++;
        var crawler = new _CrawlerServices.CrawlerServices(cityinfo.value);
        crawler.start();
    } else {
        console.log('finish');
        i = 0;
        iter = null;
        iter = _directionalWebsiteURL.URLConfig.CityURL[Symbol.iterator]();
    }
});
_StackEvent.StackEvent.on('retry', function () {
    console.log("i=" + i);
    var crawler = new _CrawlerServices.CrawlerServices(cityinfo.value);
    crawler.start();
});
var StartPMCrawler = function StartPMCrawler() {
    for (var _i = 0; _i < 1; _i++) {
        cityinfo = iter.next();
        if (cityinfo.done == true) {
            break;
        }
        var crawler = new _CrawlerServices.CrawlerServices(cityinfo.value);
        crawler.start();
    }
};
exports.StartPMCrawler = StartPMCrawler;