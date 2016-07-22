/**
 * Created by Administrator on 2016/1/21.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    rank:{type:String},
    city:{type:String},
    aqi:{type:String},
    ranktype:{type:String},
    primarypollution:{type:String},
    pm25:{type:String},
    pm10:{type:String},
    co:{type:String},
    no2:{type:String},
    o3:{type:String},
    o3_8h:{type:String},
    so2:{type:String},
    create_at:{ type:String, default:Date.now.toLocaleString() }

});
mongoose.model('dailypm', schema);
