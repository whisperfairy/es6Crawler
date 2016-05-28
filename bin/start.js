/**
 * Created by whisp_000 on 2016/5/28.
 */
'use strict'
function myarray()
{
    this.a=10;
}
myarray.prototype=new Array();
var my=new myarray();
console.log(myarray.prototype.constructor===Array)
console.log(my.a);