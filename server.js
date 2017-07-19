/**
 * Created by family-rg on 2017/7/14.
 */
var HttpHandle = function(){
    this.http = require("http"); //http请求
    this.url = require("url");  //url处理
    this.exec = require("child_process").exec;//非阻塞操作：exec
    this.express = require("express");
    this.app=null;
    this.server=null;
    this.reqData = "";
    this.pathHandle = {}; //path对应的处理fun
}

HttpHandle.prototype.init =function() {
    var self = this;
    // self.http.createServer(function(req,resp){
    //     self.reqData = "";
    //     req.setEncoding("utf8");
    //     req.addListener("data", function(chunk) {  //获取req传递的数据
    //         // called when a new chunk of data was received
    //         console.log("req传递数据："+chunk);
    //         self.reqData +=chunk ;
    //     });
    //
    //     req.addListener("end", function() {   //req 数据获取完成
    //         // called when all chunks of data have been received
    //         console.log("req数据获取完成："+self.reqData);
    //         callFun(req,resp, self.url.parse(req.url).pathname);
    //         resp.end();
    //     });
    //
    // }).listen(port);
    self.app = self.express();
    self.server = self.http.createServer(self.app);
}

HttpHandle.prototype.start= function(port){
    var self = this;
    self.server.listen(port);
}

HttpHandle.prototype.route = function(path){
    var self = this;
    if( typeof  self.pathHandle[path] =="function"){
        return self.pathHandle[path]();
    }else{
       return  "<h2 style ='color:red;'>This "+ path+" 404</h2>";
    }
}

exports.HttpHandle = HttpHandle ;
