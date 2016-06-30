/**
 * Created by whisp_000 on 2016/5/30.
 */
/**
 * Created by whisp_000 on 2016/5/28.
 */
'use strict'
import * as PMProgress from "../progress/PMProgress";
import {writeXlsxCityPM}from '../services/dataPumpServices'
//PMProgress.StartPMCrawler();
writeXlsxCityPM().then((d)=>{
    console.log(d);
});