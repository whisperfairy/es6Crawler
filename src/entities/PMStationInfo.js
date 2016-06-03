/**
 * Created by whisp_000 on 2016/6/1.
 */
export class PMStationInfo 
{
    constructor(pmstation)
    {
        this.stationname=pmstation[0];
        this.AQI=pmstation[1];
        this.ranktype=pmstation[2];
        this.primarypollution=pmstation[3];
        this.pm25=pmstation[4];
        this.pm10=pmstation[5];
        this.co=pmstation[6];
        this.no2=pmstation[7];
        this.o3=pmstation[8];
        this.o3_8h=pmstation[9];
        this.so2=pmstation[10];
    }
}
