/**
 * Created by family-rg on 2017/7/14.
 */
var HttpHandle = function(){
    this.http = require("http"); //http请求
    this.url = require("url");  //url处理
    this.exec = require("child_process").exec;//非阻塞操作：exec
    this.express = require("express");
    this.bodyParser = require('body-parser');
    this.app=null;
    this.server=null;
}

HttpHandle.prototype.init =function() {
    var self = this;
    self.app = self.express();
    self.server = self.http.createServer(self.app);

    // parse application/x-www-form-urlencoded
    self.app.use(self.bodyParser.urlencoded({extended: false}))
    // parse application/json
    self.app.use(self.bodyParser.json())
}

HttpHandle.prototype.start= function(port){
    var self = this;
    self.server.listen(port);
}


exports.HttpHandle = HttpHandle ;
