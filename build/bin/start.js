/**
 * Created by whisp_000 on 2016/5/30.
 */
/**
 * Created by whisp_000 on 2016/5/28.
 */
'use strict';

var _PMProgress = require('../progress/PMProgress');

var PMProgress = _interopRequireWildcard(_PMProgress);

var _dataPumpServices = require('../services/dataPumpServices');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//PMProgress.StartPMCrawler();
(0, _dataPumpServices.writeXlsxCityPM)().then(function (d) {
  console.log(d);
});