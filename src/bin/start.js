/**
 * Created by whisp_000 on 2016/5/30.
 */
/**
 * Created by whisp_000 on 2016/5/28.
 */
'use strict'
import * as PMProgress from "../progress/PMProgress";
import {writeXlsxCityPM}from '../services/dataPumpServices'
//
const later = require('later');
later.date.localTime();
const sched1 = later.parse.recur().on(30).minute();

const task1 = later.setInterval(function() {
    PMProgress.StartPMCrawler();
}, sched1);
const sched2 = later.parse.recur().on(23).hour().on(55).minute();

const task2 = later.setInterval(function() {
    writeXlsxCityPM().then(function (d) {
        console.log(d);
    });
}, sched2);
