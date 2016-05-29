"use strict";
let CrawlerClass = require ('../services/CrawlerServices');
let dap = require('../dao/PM25Dao');
import {URLConfig} from '../config/directionalWebsiteURL';

 URLConfig.CityURL.forEach((element, index, array)=>{
     let asyncPM = async function (cityinfo){
         console.log(cityinfo);
         let crawler=new CrawlerClass(cityinfo);
         var f1 = await crawler.gethtml();
         var f2 = await crawler.catchdata();
         return f2
     };
     asyncPM(element).then
 })
