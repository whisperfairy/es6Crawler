/**
 * Created by whisp_000 on 2016/5/29.
 */
'use strict';
function* async1()
{
    var a=yield setTimeout(()=>{
        console.log('async1 done');
    },1000);
    return (a);
};
function* async2()
{
    var a=yield setTimeout(()=>{
        console.log('async2 done');
    },1000)
    return (a);
};

function* generatortest() {
    var step1=yield async1();
    var step2=yield async2();
    return 0;
}
var g =generatortest();



