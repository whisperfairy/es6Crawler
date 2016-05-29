/**
 * Created by Administrator on 2016/2/6.
 */
var DaoBase = require('./DaoBase'),
    models = require('./../models'),
    Blog = models.dailypm;

var PMDao = new DaoBase(Blog);

module.exports = PMDao; 