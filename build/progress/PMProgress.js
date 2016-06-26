"use strict";

var _CrawlerServices = require('../services/CrawlerServices');

var _directionalWebsiteURL = require('../config/directionalWebsiteURL');

var _StackEvent = require('../Event/StackEvent');

// let dao = require('../dao/PM25Dao');

var iter = _directionalWebsiteURL.URLConfig.CityURL[Symbol.iterator]();
var i = 0;
_StackEvent.StackEvent.on('popstack', function () {
    var cityinfo = iter.next();
    if (cityinfo.done != true) {
        var crawler = new _CrawlerServices.CrawlerServices(cityinfo.value);
        crawler.start();
        i++;
        console.log("i=" + i);
    } else {
        console.log('finish');
    }
});
for (var _i = 0; _i < 1; _i++) {
    var cityinfo = iter.next();
    if (cityinfo.done == true) {
        break;
    }
    var crawler = new _CrawlerServices.CrawlerServices(cityinfo.value);
    crawler.start();
};
// URLConfig.CityURL.forEach((element, index, array)=>{
//     let asyncPM = async function (cityinfo){
//         let crawler=new CrawlerClass(cityinfo);
//         await crawler.gethtml();
//         await crawler.catchdata();
//         await crawler.dealData();
//         return crawler;
//     };
//      asyncPM(element);
// });