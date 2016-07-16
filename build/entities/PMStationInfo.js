"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PMStationInfo = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by whisp_000 on 2016/6/1.
 */

var PMStationInfo = exports.PMStationInfo = function PMStationInfo(pmstation) {
    (0, _classCallCheck3.default)(this, PMStationInfo);

    this.stationname = pmstation[0];
    this.AQI = pmstation[1];
    this.ranktype = pmstation[2];
    this.primarypollution = pmstation[3];
    this.pm25 = pmstation[4];
    this.pm10 = pmstation[5];
    this.co = pmstation[6];
    this.no2 = pmstation[7];
    this.o3 = pmstation[8];
    this.o3_8h = pmstation[9];
    this.so2 = pmstation[10];
    this.PositionX = pmstation[11];
    this.PositionY = pmstation[12];
};