"use strict";
import {CrawlerServices as CrawlerClass} from '../services/CrawlerServices'
 let dao = require('../dao/PM25Dao');
import {URLConfig} from '../config/directionalWebsiteURL';
import {PMStationInfo} from '../entities/PMStationInfo'
 URLConfig.CityURL.forEach((element, index, array)=>{
     let asyncPM = async function (cityinfo){
         let crawler=new CrawlerClass(cityinfo);
         await crawler.gethtml();
         await crawler.catchdata();
         await crawler.dealData();
         return crawler;
     };
      asyncPM(element);
 });
