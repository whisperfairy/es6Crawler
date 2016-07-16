/**
 * Created by whisp_000 on 2016/5/28.
 */
const http = require('http');
const iconv = require('iconv-lite');
const cheerio = require('cheerio');
const BufferHelper = require('bufferhelper');
const pmdao = require('../dao/PM25Dao');
import {StackEvent} from '../Event/StackEvent';
import {PMStationInfo} from '../entities/PMStationInfo';
console.log(this);
class CrawlerServices {
    constructor(city) {
            this.Tag = city.CityTag || "",
            this.city=city,
            this.CityName = city.CityName || "",
            this.URL = city.CityURL || "",
            this.html = "",
            this.CrawlerInfo = []
    }

    gethtml() {
        let _ = this;
        console.log("html start");
        let promise = new Promise((resolve, reject)=> {
            // ... some code
            let  request_timer = null;
// 请求5秒超时

        let req=http.get(this.URL, (res) => {
             clearTimeout(request_timer);
                let bufferHelper = new BufferHelper();
              let response_timer = setTimeout(function() {
                res.destroy();
                reject("Response Timeout.");
                console.log('Response Timeout.');
              }, 60000);
                res.on('data', (d) => {
                    bufferHelper.concat(d);
                });
                res.on('end', function () {
                    _.html = iconv.decode(bufferHelper.toBuffer(), 'utf8');
                    clearTimeout(response_timer);
                    console.log(_.CityName + "gethtml success");
                    resolve(_.html);
                });
            }).on('error', (e) => {

                reject(e);
            });
            request_timer = setTimeout(function() {
                req.abort();
                reject("Request Timeout.");
                console.log('Request Timeout.');
            }, 10000);
            req.end();
        });

        return promise;
    }

    catchdata() {
        let _ =this;
        var promise = new Promise((resolve, reject)=> {
            // ... some code
            console.log("catch start");
            let data = this.html;
            //console.log(data);
            //cheerio
            //cheerio本身默认是转实体的
            //cheerio.load(html,{decodeEntities: false}); 加个参数
            var $ = cheerio.load(data, {decodeEntities: false});
            var results = [];
            $(this.Tag).children().each(function (i, elem) {
                var arr = [];
                if($(elem).children().length<6)
                {
                    reject();
                }
                $(elem).children().each(function (j, el) {
                    arr.push($(el).text());
                });
                arr.push(_.city.StationInfo[i].positionX);
                arr.push(_.city.StationInfo[i].positionY);
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
       start()
      {
         const _ = this;
         let asyncPM = async function asyncPM ()
         {
             try {
             await _.gethtml();
             await _.catchdata();
             await _.dealData();
                 return true;
             }
             catch (e)
             {

                 throw new Error('出错了');
             }

         };
          asyncPM().then(
              ()=>{
             StackEvent.emit('popstack');
          }).catch(
              (e) =>
        {    StackEvent.emit('retry');
             console.log(e);
         });
      }
}
export {CrawlerServices}