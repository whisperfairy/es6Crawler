/**
 * Created by whisp_000 on 2016/5/28.
 */
var http =require('http');
var iconv= require('iconv-lite');
var cheerio=require('cheerio');
var BufferHelper =require('bufferhelper');
class CrawlerServices
{
       constructor(city)
    {   
        this.Tag=city.CityTag||"",
        this.CityName=city.CityName||"",
        this.URL=city.CityURL||""
    }
    gethtml()
    {
        var promise = new Promise(function(resolve, reject) {
            // ... some code
            http.get(this.URL, (res) => {

                var bufferHelper = new BufferHelper();
                res.on('data', (d) => {
                    bufferHelper.concat(d);
                });
                res.on('end',function()
                {
                    this.html= iconv.decode(bufferHelper.toBuffer(),'utf8');
                    resolve(value);

                });
            }).on('error', (e) => {
                console.error(e);
                reject(error);
            });
           return promise;
        });

    }
    catchdata(htmldata,tag,callback)
    {
        var promise = new Promise(function(resolve, reject) {
            // ... some code
            var data=htmldata;
            if (data==null)
            {
                data=this.html;
            }
            //console.log(data);
            //cheerio
            //cheerio本身默认是转实体的
            // cheerio.load(html,{decodeEntities: false}); 加个参数
            var $ =cheerio.load(data,{decodeEntities: false});
            var results=[];
            $(this.Tag).children().each(function(i, elem) {
                var arr=[];
                $(this).children().each(function(j, el) {

                    arr.push($(el).text());
                });
                results.push(arr);
            });
            resolve(results);
        });
        return promise;
    }
    
}
module.exports =CrawlerServices;