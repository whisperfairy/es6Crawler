/**
 * Created by Administrator on 2016/2/6.
 */
var PMEntities = function(pmarr){

    this.rank=pmarr[0];
    this.city=pmarr[1];
    this.aqi=pmarr[2];
    this.ranktype=pmarr[3];
    this.primarypollution=pmarr[4];
    this.pm25=pmarr[5];
    this.pm10=pmarr[6];
    this.co=pmarr[7];
    this.no2=pmarr[8];
    this.o3=pmarr[9];
    this.o3_8h=pmarr[10];
    this.so2=pmarr[11];
};
module.exports=PMEntities;