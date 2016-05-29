/**
 * Created by whisp_000 on 2016/5/30.
 */
/**
 * Created by whisp_000 on 2016/5/28.
 */
'use strict'
var PMdateRequest = require('../build/services/CrawlerServices');
let pm = (new PMdateRequest()).gethtml((err,data)=>{
    console.log(data);
});

