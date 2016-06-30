"use strict";
import {CrawlerServices as CrawlerClass} from '../services/CrawlerServices'
// let dao = require('../dao/PM25Dao');
import {URLConfig} from '../config/directionalWebsiteURL';

import {StackEvent} from '../Event/StackEvent';
let iter = URLConfig.CityURL[Symbol.iterator]();
let i=0;
let cityinfo;
StackEvent.on('popstack', function () {
    cityinfo = iter.next();
    console.log("i="+i);
    if (cityinfo.done!= true) {
        i++;
        let crawler = new CrawlerClass(cityinfo.value);
        crawler.start();

    }
    else {
        console.log('finish');
    }
});
StackEvent.on('retry', function () {
    console.log("i="+i);
        let crawler = new CrawlerClass(cityinfo.value);
        crawler.start();
});
const StartPMCrawler=function StartPMCrawler(){
    for (let i = 0; i < 1; i++) {
         cityinfo = iter.next();
        if (cityinfo.done == true) {
            break;
        }
        let crawler = new CrawlerClass(cityinfo.value)
        crawler.start();
    }

};
export {StartPMCrawler};