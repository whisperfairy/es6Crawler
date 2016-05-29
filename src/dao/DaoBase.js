/**
 * Created with JetBrains WebStorm.
 * User: P0018766
 * Date: 13-1-23
 * Time: 下午4:34
 * To change this template use File | Settings | File Templates.
 */

function DaoBase (Model){

    this.model = Model;
}
//save
DaoBase.prototype.getMongoEntity=function(entity)
{
    var MDBEntities = new this.model(entity);
    return MDBEntities; //Krouky
}; 
DaoBase.prototype.saveEntity=function(entity,callback)
{   console.log(entity);
    this.save(this.getMongoEntity(entity),callback);
};
//2种方法的entitie不同，前者是我自己定义用于构造数据的，后者是new Model(entity);出来的对象。
DaoBase.prototype.save =function(entity,callback)
{
    entity.save(function(error,doc) {
        if (error) {
            console.log("error :" + error);
        } else {
            //console.log(doc);
            callback(doc);
        }
    });
};
//create
DaoBase.prototype.create   = function (doc,callback){
    this.model.create(doc, function (error) {
        if(error) return callback(error);
        return callback(doc);
    });
};


DaoBase.prototype.getById = function (id, callback) {
    this.model.findOne({_id:id}, function(error, model){
        if(error) return callback(error,null);
        return callback(null,model);
    });
};


DaoBase.prototype.countByQuery = function (query, callback) {
    this.model.count(query, function(error, model){
        if(error) return callback(error,null);
        return callback(null,model);
    });
};


DaoBase.prototype.getByQuery = function (query,fileds,opt,callback) {
    this.model.find(query, fileds, opt, function(error,model){
        if(error) return callback(error,null);

        return callback(null,model);
    });
};


    DaoBase.prototype.getAll = function (callback) {

    this.model.find({}, function(error,model){
        if(error) return callback(error,null);
       // console.log(model);
        return callback(null, model);
    });
};

DaoBase.prototype.delete = function (query, callback){
    this.model.remove(query, function(error){
        if(error) return callback(error);

        return callback(null);
    });
};


DaoBase.prototype.update = function( conditions, update ,options, callback) {
    this.model.update(conditions, update, options, function (error) {
        if(error) return callback(error);
        return callback(null);
    });
};

module.exports = DaoBase;