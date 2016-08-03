"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.readXlsx = readXlsx;
exports.writeXlsxweather = writeXlsxweather;
exports.writeXlsxPM = writeXlsxPM;
exports.writeXlsxCityPM = writeXlsxCityPM;
/**
 * Created by whisperHu on 2015/12/28.
 */
var datapumps = require('datapumps'),
    Pump = datapumps.Pump,
    MongodbMixin = datapumps.mixin.MongodbMixin,
    ExcelReaderMixin = datapumps.mixin.ExcelReaderMixin,
    ExcelWriterMixin = datapumps.mixin.ExcelWriterMixin;
function readXlsx(callback) {
    var result = new Array();
    pump.mixin(ExcelReaderMixin({ worksheet: "Sheet1", columnMapping: {
            "countyID": "countyID",
            "countyEN": "countyEN",
            "countyCN": "countyCN",
            "city": "city",
            "province": "province"
        }, path: "./resources/cityinfo2.xlsx"
    })).process(callback).run().then(function () {
        console.log(pump.errorBuffer());
    });
};
function writeXlsxweather(callback) {
    var pump = new Pump();
    var date = new Date();
    var now = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    pump.mixin(MongodbMixin('connect string)).useCollection('dailyweathers').from(pump.find({ create_at: { $gte: now } })).mixin(ExcelWriterMixin()).createWorkbook('./resources/tmp/temp' + now.getFullYear() + (now.getMonth() + 1) + now.getDate() + '.xlsx').createWorksheet('weather').writeHeaders(['id', 'city', 'lon', 'lat', 'tmp', 'fl', 'windspd', 'windsc', 'winddeg', 'winddir', 'cond', 'pcpn', 'hum', 'pres', 'vis', 'time']).process(function (weather) {
        return pump.writeRow([weather.countyID, weather.city, weather.lon, weather.lat, weather.tmp, weather.fl, weather.windspd, weather.windsc, weather.winddeg, weather.winddir, weather.cond, weather.pcpn, weather.hum, weather.pres, weather.vis, weather.create_at.toString()]);
    }).logErrorsToConsole().run().then(function () {
        console.log("Done writing contacts to file");
        callback();
    });
};

function writeXlsxPM(callback) {
    var promise = new Promise(function (resolve, reject) {
        var date = new Date();

        var pump = new Pump();
        var now = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        pump.mixin(MongodbMixin('connect string)).useCollection('dailycitypms').from(pump.find({ create_at: { $gte: now } })).mixin(ExcelWriterMixin()).createWorkbook('./resources/tmp/temppm' + now.getFullYear() + (now.getMonth() + 1) + now.getDate() + '.xlsx').createWorksheet('AQI').writeHeaders(['rank', 'city', 'aqi', 'ranktype', 'primarypollution', 'pm25', 'pm10', 'co', 'no2', 'o3', 'o3_8h', 'so2', 'time']).process(function (AQI) {
            return pump.writeRow([AQI.rank, AQI.city, AQI.aqi, AQI.ranktype, AQI.primarypollution, AQI.pm25, AQI.pm10, AQI.co, AQI.no2, AQI.o3, AQI.o3_8h, AQI.so2, AQI.create_at.toString()]);
        }).logErrorsToConsole().run().then(function () {
            console.log("Done writing contacts to file");
            callback();
        });
    });
};
function writeXlsxCityPM() {
    var promise = new Promise(function (resolve, reject) {
        var date = new Date();
        var pump = new Pump();
        var now = new Date();
        now.setHours(yesterday.getHours() - 24);
        pump.mixin(MongodbMixin('mongodb://bjfu:hu0923010227@120.25.223.69/bjfuweather')).useCollection('citypms').from(pump.find({ create_at: { $gte: now } })).mixin(ExcelWriterMixin()).createWorkbook('../resources/tmp/tempcitypm' + now.getFullYear() + (now.getMonth() + 1) + now.getDate() + '.xlsx').createWorksheet('AQI').writeHeaders(['stationname', 'city', 'aqi', 'ranktype', 'primarypollution', 'pm25', 'pm10', 'co', 'no2', 'o3', 'o3_8h', 'so2', 'time']).process(function (AQI) {
            return pump.writeRow([AQI.stationname, AQI.city, AQI.AQI, AQI.ranktype, AQI.primarypollution, AQI.pm25, AQI.pm10, AQI.co, AQI.no2, AQI.o3, AQI.o3_8h, AQI.so2, AQI.create_at.toLocaleString()]);
        }).logErrorsToConsole().run().then(function () {
            console.log("Done writing contacts to file");
            resolve('done');
        });
    });
    return promise;
}