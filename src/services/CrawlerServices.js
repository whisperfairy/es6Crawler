/**
 * Created by whisp_000 on 2016/5/28.
 */
const http = require('http');
const iconv = require('iconv-lite');
const cheerio = require('cheerio');
const BufferHelper = require('bufferhelper');
const pmdao = require('../dao/PM25Dao');
import {PMStationInfo} from '../entities/PMStationInfo'

class CrawlerServices {
    constructor(city) {
        this.Tag = city.CityTag || "",
            this.CityName = city.CityName || "",
            this.URL = city.CityURL || "",
            this.html = "",
            this.CrawlerInfo = []
    }

    gethtml() {
        let _ = this;
        var promise = new Promise((resolve, reject)=> {
            // ... some code
            http.get(this.URL, (res) => {
                var bufferHelper = new BufferHelper();
                res.on('data', (d) => {
                    bufferHelper.concat(d);
                });
                res.on('end', function () {
                    _.html = iconv.decode(bufferHelper.toBuffer(), 'utf8');
                    console.log(_.CityName + "gethtml success");
                    resolve(_.html);
                });
            }).on('error', (e) => {
                console.error(e);
                reject(e);
            });
        });
        return promise;
    }

    catchdata() {
        var promise = new Promise((resolve, reject)=> {
            // ... some code
            let data = this.html;
            //console.log(data);
            //cheerio
            //cheerio本身默认是转实体的
            // cheerio.load(html,{decodeEntities: false}); 加个参数
            var $ = cheerio.load(data, {decodeEntities: false});
            var results = [];
            $(this.Tag).children().each(function (i, elem) {
                var arr = [];
                $(elem).children().each(function (j, el) {
                    arr.push($(el).text());
                });
                results.push(arr);
            });
            console.log(this.CityName + "catch success");
            this.CrawlerInfo = results;
            resolve(results);
        });
        return promise;
    }

    dealData() {
        let _ = this;
        var promise = new Promise((resolve, reject)=> {
            async function dbinsert() {
                for (let ele in _.CrawlerInfo) {
                    let stationinfo = new PMStationInfo(_.CrawlerInfo[ele]);
                    stationinfo.city = _.CityName;
                    let saveQ =await pmdao.saveEntity(stationinfo);
                }
                resolve();
            }
            dbinsert();
            // this.CrawlerInfo.forEach((ele, index, arr)=> {
            //     async function dealdata() {
            //         // console.log(ele);
            //         let stationinfo = new PMStationInfo(ele);
            //         let saveQ = await pmdao.saveEntity(stationinfo);
            //         return saveQ;
            //     }
            //     dealdata().then(function(data){
            //         resolve(data);
            //         console.log('db success');
            //     });
            // })

        });
        return promise;
    }
}
export {CrawlerServices}