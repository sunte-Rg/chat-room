/**
 * Created by family-rg on 2017/8/15.
 */


/**
 * 响应类
 * @param param  {code:"",content:""}  编码，内容
 * @constructor
 */
var ResponseUtils = function(){
    this.code = "000000";
    this.content ="成功";
    this.result = {};
}

ResponseUtils.prototype.setResult = function(param){
    var self = this;
    self.code = !param.code?self.code:param.code;
    self.content = !param.content?self.content:param.content;
    self.result = !param.result?self.result:param.result;
}

ResponseUtils.prototype.getResult = function(){
    var self = this;
    return {code:self.code,content:self.content,result:self.result};
}

exports.ResponseUtils = ResponseUtils ;