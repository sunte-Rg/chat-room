/**
 * Created by family-rg on 2017/7/14.
 */

var server = require("./server");
var socketIo = require("socket.io");
var httpHandle = new server.HttpHandle();
var users = [] ;
var chat_room_content = [];
httpHandle.pathHandle['/'] = function(){
    return '<h1>你好!</h1>';
}

httpHandle.init();
var io = socketIo.listen(httpHandle.server);
httpHandle.app.use('/',httpHandle.express.static(__dirname+'/html'));
httpHandle.start('8888');

io.on("connection",function(scoket){
    scoket.on("test",function(data){
        console.log("收到数据"+data);
        chat_room_content.push(data);
        io.sockets.emit("system_notice",chat_room_content);
    });
});