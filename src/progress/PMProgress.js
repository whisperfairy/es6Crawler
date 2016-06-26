"use strict";
import {CrawlerServices as CrawlerClass} from '../services/CrawlerServices'
// let dao = require('../dao/PM25Dao');
import {URLConfig} from '../config/directionalWebsiteURL';

import {StackEvent} from '../Event/StackEvent';
let iter = URLConfig.CityURL[Symbol.iterator]();
let i=0;
StackEvent.on('popstack', function () {
    let cityinfo = iter.next();
    if (cityinfo.done!= true) {
        let crawler = new CrawlerClass(cityinfo.value)
        crawler.start();
        i++;
        console.log("i="+i);
    }
    else {
        console.log('finish');
    }
});
for (let i = 0; i < 1; i++) {
    let cityinfo = iter.next();
    if (cityinfo.done == true) {
        break;
    }
    let crawler = new CrawlerClass(cityinfo.value)
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
