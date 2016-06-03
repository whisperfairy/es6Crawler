/**
 * Created by Administrator on 2016/2/6.
 */
var DaoBase = require('./DaoBase'),
    models = require('./../models'),
    citypm = models.citypm;

var PMDao = new DaoBase(citypm);

module.exports = PMDao; 