/**
 * Created by family-rg on 2017/7/20.
 */
define(['vue','socket','toask','page'],function(Vue,Socket,Toask,PageUtil){

    var ChatRoom = function (){
        this.socket = Socket.connect();
        this.toask  = new Toask();
        this.pageUtil  = new PageUtil({
                MAIN:{id:"main_page",title:"首页"},
                LOGIN:{id:"login_page",title:"用户登录"},
                REGISTER:{id:"register_page",title:"用户注册"}
        });
        this.userInfo = {
            username:"",
            token:""
        };
        this.users = [];
        this.vue =null;
    }

    ChatRoom.prototype.initApp = function(){
        var self  = this ;
        self.vue = new Vue({
            el: "#chatRoom",
            data: {
               chatInfo:[],
                username:""
            },
            methods:{
                login:function(){
                    console.log("loin");
                },
                register:function(){},

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

        self.pageUtil.goToPage(self.pageUtil.pageName.MAIN);
        document.getElementById("main_page").style.width="100%";
    }

    ChatRoom.prototype.initEvent = function(){
        var self = this ;

        document.getElementById("back").onclick = function(){
            backPage();
        }

        //click login
        document.getElementById("login").onclick = function(){
            self.login();
        }


        //click register
        document.getElementById("register").onclick = function(){
            self.register();
        }
        //发送消息按钮
        document.getElementById("send").onclick = function(){
            self.sendMessage();
        }

        var content_ele = document.getElementById("content");

        self.socket.on("system_notice",function(data){
            console.log(data);
            var chat_str = "";
            for(var chat in data){
                chat = data[chat];
                chat_str+= ("<p>"+chat.username+" : "+ chat.content +"</p>");
            }
            content_ele.innerHTML = chat_str;
        })


    }

    ChatRoom.prototype.register = function(){
        goToPage(PAGE.REGISTER);
    }

    ChatRoom.prototype.login = function(){
        goToPage(PAGE.LOGIN);

    }

    ChatRoom.prototype.sendMessage = function(){
        var self = this ;
        var param = {
            userInfo:self.userInfo,
            content:document.getElementById("send_content").value
        }
        self.socket.emit("sendMessage",param);
        document.getElementById("send_content").value="";
    }
    return  ChatRoom ;
});