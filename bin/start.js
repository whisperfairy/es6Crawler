/**
 * Created by whisp_000 on 2016/5/30.
 */
/**
 * Created by whisp_000 on 2016/5/28.
 */
'use strict';

var _PMProgress = require('../build/progress/PMProgress');

var PMProgress = _interopRequireWildcard(_PMProgress);

var _dataPumpServices = require('../build/services/dataPumpServices');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
//
var later = require('later');
later.date.localTime();
var sched1 = later.parse.recur().on(40).minute();
var task1 = later.setInterval(function() {
    PMProgress.StartPMCrawler();
}, sched1);
var sched2 = later.parse.recur().on(23).hour().on(55).minute();
var task2 = later.setInterval(function() {
    (0, _dataPumpServices.writeXlsxCityPM)().then(function (d) {
        console.log(d);
    });
}, sched2);
