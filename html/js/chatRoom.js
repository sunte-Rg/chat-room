/**
 * Created by family-rg on 2017/7/20.
 */
define(['vue','socket','toask','page','jquery'],function(Vue,Socket,Toask,PageUtil,$){

    var ChatRoom = function (){
        this.socket;
        this.toask  = new Toask();
        this.pageUtil  = new PageUtil();
        this.userInfo = {
            username:"",
            token:""
        };
        this.users = [];
        this.vue =null;
    }

    ChatRoom.prototype.initApp = function(){
        var self  = this ;
       self.pageUtil.init({
           page: {
               MAIN: {id: "main_page", title: "首页"},
               LOGIN: {id: "login_page", title: "用户登录"},
               REGISTER: {id: "register_page", title: "用户注册"},
               INDEX:{id:"chat_page",title:"聊天室",callBack:function(){
                   self.socket.disconnect(self.vue.username);
               }}
           }, titleId: "title"
       });

        self.vue = new Vue({
            el: "#chatRoom",
            data: {
               chatInfo:[],
                username:"",
                sendContent:"",
                onlineNum:0
            },
            methods:{
                login:function(){
                   self.login();
                },
                register:function(){
                    self.register();
                },
                sendMessage:function(){
                    self.sendMessage();
                    this.sendContent = "";
                }
            },
            beforeCreate: function () {
                // console.group('beforeCreate 创建前状态===============》');
                // console.log("%c%s", "color:red", "el     : " + this.$el); //undefined
                // console.log("%c%s", "color:red", "data   : " + this.$data); //undefined
                // console.log("%c%s", "color:red", "message: " + this.message)
            },
            created: function () {
                // console.group('created 创建完毕状态===============》');
                // console.log("%c%s", "color:red", "el     : " + this.$el); //undefined
                // console.log("%c%s", "color:red", "data   : " + this.$data); //已被初始化
                // console.log("%c%s", "color:red", "message: " + this.message); //已被初始化
            },
            beforeMount: function () {
                // console.group('beforeMount 挂载前状态===============》');
                // console.log("%c%s", "color:red", "el     : " + (this.$el)); //已被初始化
                // console.log(this.$el);
                // console.log("%c%s", "color:red", "data   : " + this.$data); //已被初始化
                // console.log("%c%s", "color:red", "message: " + this.message); //已被初始化
            },
            mounted: function () {
                // console.group('mounted 挂载结束状态===============》');
                // console.log("%c%s", "color:red", "el     : " + this.$el); //已被初始化
                // console.log(this.$el);
                // console.log("%c%s", "color:red", "data   : " + this.$data); //已被初始化
                // console.log("%c%s", "color:red", "message: " + this.message); //已被初始化
                document.getElementById("chatRoom").style.display="block";
            },
            beforeUpdate: function () {
                // console.group('beforeUpdate 更新前状态===============》');
                // console.log("%c%s", "color:red", "el     : " + this.$el);
                // console.log(this.$el);
                // console.log("%c%s", "color:red", "data   : " + this.$data);
                // console.log("%c%s", "color:red", "message: " + this.message);
            },
            updated: function () {
                // console.group('updated 更新完成状态===============》');
                // console.log("%c%s", "color:red", "el     : " + this.$el);
                // console.log(this.$el);
                // console.log("%c%s", "color:red", "data   : " + this.$data);
                // console.log("%c%s", "color:red", "message: " + this.message);
            },
            beforeDestroy: function () {
                // console.group('beforeDestroy 销毁前状态===============》');
                // console.log("%c%s", "color:red", "el     : " + this.$el);
                // console.log(this.$el);
                // console.log("%c%s", "color:red", "data   : " + this.$data);
                // console.log("%c%s", "color:red", "message: " + this.message);
            },
            destroyed: function () {
                // console.group('destroyed 销毁完成状态===============》');
                // console.log("%c%s", "color:red", "el     : " + this.$el);
                // console.log(this.$el);
                // console.log("%c%s", "color:red", "data   : " + this.$data);
                // console.log("%c%s", "color:red", "message: " + this.message)
            }
        });
        self.initEvent();
        self.pageUtil.goToPage(self.pageUtil.page.MAIN);
    }

    ChatRoom.prototype.initEvent = function(){
        var self = this ;

        document.getElementById("back").onclick = function(){
            self.pageUtil.backPage();
        }

        //click login
        document.getElementById("login").onclick = function(){
            self.pageUtil.goToPage(self.pageUtil.page.LOGIN);
        }

        //click register
        document.getElementById("register").onclick = function(){
            self.pageUtil.goToPage(self.pageUtil.page.REGISTER);
        }
        var content_ele = document.getElementById("content");
    }

    ChatRoom.prototype.register = function(){
        var self = this ;
        var requestParam = {
            username:self.vue.username
        }
        $.ajax({
            type: 'POST',
            url: "/sub_register",
            dataType: "json",
            data: requestParam,
            success: function(result){
                if(result.code == "000000"){
                    self.pageUtil.backPage();
                    self.initChatRoom();
                    self.pageUtil.goToPage(self.pageUtil.page.INDEX);
                }else
                    self.toask.info(result.content,1500);
            }
        });
    }

    ChatRoom.prototype.login = function(){
        var self = this ;
        var requestParam = {
            username:self.vue.username,
            test:"test"
        }
        $.ajax({
            type: 'POST',
            url: "/sub_login",
            dataType: "json",
            data: requestParam,
            success: function(result){
                if(result.code == "000000"){
                    self.pageUtil.backPage();
                    self.initChatRoom();
                    self.pageUtil.goToPage(self.pageUtil.page.INDEX);
                }else
                    self.toask.info(result.content,1500);
            }
        });
    }

    ChatRoom.prototype.initChatRoom = function(){
        var self = this ;
        self.socket = Socket.connect();
        self.socket.on('connect', function () {
            self.toask.info('已连接聊天室！');

            self.socket.emit("session",self.vue.username)

            self.socket.on('disconnect', function () {
                self.toask.info('已与聊天室失去连接！');
                self.pageUtil.backPage();
            });
        });
        self.socket.on("message_notice",function(data){
            self.vue.chatInfo.push(data);
        })
        self.socket.on("onlineNum_notice",function(data){
            self.vue.onlineNum = data*1 /2 ;
        })
    }

    ChatRoom.prototype.sendMessage = function(){
        var self = this ;
        var param = {
            username:self.vue.username,
            content:self.vue.sendContent
        }
        self.socket.emit("sendMessage",param);
    }
    return  ChatRoom ;
});