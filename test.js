/**
 * Created by family-rg on 2017/7/14.
 */
var server = require("./server");
var socketIo = require("socket.io");
var ResponseUtils = require("./responseUtils").ResponseUtils;
var httpHandle = new server.HttpHandle();
var users = [] ; //已经注册的用户
var onLine ={}; //在线的用户
var chat_room_content = []; //发送的消息记录

httpHandle.init();
var io = socketIo.listen(httpHandle.server);
httpHandle.app.use('/',httpHandle.express.static(__dirname+'/html'));
httpHandle.start('8888');

httpHandle.app.post("/sub_login",function(req,res) {
    var username = req.body.username;
    var nowUser = onLine[username];
    var responseResult = new ResponseUtils();

    if (users.indexOf(username) < 0) {
        responseResult.setResult({
            code: "0000003",
            content: "该账号不存在！"
        });
    } else if (!!nowUser) {//用户已登录
        console.log("已登录");
        responseResult.setResult({
            code: "0000002",
            content: "该账号已经登录！"
        })
    }
    console.log(JSON.stringify(responseResult.getResult()));
    res.send(responseResult.getResult());

});


httpHandle.app.post("/sub_register",function(req,res){
    var username = req.body.username;
    var responseResult = new ResponseUtils() ;
    if(users.indexOf(username)<0){  //用户未注册
        users.push(username);
    }else{  //用户已注册
        responseResult.setResult({
            code:"000001",
            content:"该账号已经注册！"
        })
    }
    res.send(responseResult.getResult());
});
 function getLength(jsonObj){
    var jsonLen = 0 ;
    for(var i in jsonObj){
        jsonLen++;
    }
    return jsonLen;
}


io.on("connection",function(scoket){
    console.log("用户已经连接");


    scoket.on("session",function(username){
        console.log(username+"用户session 保存");
        onLine[username] = scoket //注册后自动登录
        onLine[scoket] = username //注册后自动登录
        //调用通知事件
        io.sockets.emit("onlineNum_notice",getLength(onLine));
    });
    scoket.on("sendMessage",function(data){
        io.sockets.emit("message_notice",data)
    });



    scoket.on("disconnect",function(){
        console.log(onLine[scoket]+"用户已断开连接");

        delete  onLine[onLine[scoket]] //注册后自动登录
        delete  onLine[scoket] //注册后自动登录
        io.sockets.emit("onlineNum_notice",getLength(onLine));
    });

});
 ;