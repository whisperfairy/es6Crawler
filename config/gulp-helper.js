/**
 * Created by whisp_000 on 2016/5/27.
 */
function filepath(){
  var arr = arguments[0].split("/" ) ;
  var result={
    folder:arr[arr.length-2],
    filename:arr[arr.length-1]
  };
  return result;
};
exports.filepath=filepath;
