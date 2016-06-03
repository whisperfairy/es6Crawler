/**
 * Created by whisp_000 on 2016/5/28.
 */
'use strict'
// var PMdateRequest = require('../build/services/CrawlerServices');
// let pm=new PMdateRequest.CrawlerServices();
// let pm = ().gethtml((err,data)=>{
//     console.log(data);
// });
var PMdateRequest = require('../build/services/CrawlerServices');
var config = require ('../build/config/directionalWebsiteURL');

let pm=new PMdateRequest.CrawlerServices(config.URLConfig.CityURL[0]);
console.log(pm.gethtml());

