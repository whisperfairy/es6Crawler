/**
 * Created by whisp_000 on 2016/6/3.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({

    stationname:{type:String},
    city:{type:String},
    AQI:{type:String},
    ranktype:{type:String},
    primarypollution:{type:String},
    pm25:{type:String},
    pm10:{type:String},
    co:{type:String},
    no2:{type:String},
    o3:{type:String},
    o3_8h:{type:String},
    so2:{type:String},
    PositionX:{type:String},
    PositionY:{type:String},
    create_at:{ type:Date, default:Date.now}
});
mongoose.model('citypm', schema);
