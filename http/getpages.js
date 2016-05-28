/**
 * Created by whisp_000 on 2016/5/28.
 */
import {http} from 'http'
class PMdateRequest
{
       constructor()
    {
        this.html='';
    }
    gethtml()
    {
        http.get('http://pm25.in/rank', (res) => {
          
            var bufferHelper = new BufferHelper();
            res.on('data', (d) => {
                bufferHelper.concat(d);
            });
            res.on('end',function()
            {
                this.html= iconv.decode(bufferHelper.toBuffer(),'utf8');
                callback(null,this.html);
            });
        }).on('error', (e) => {
            console.error(e);
        });
    }
}
