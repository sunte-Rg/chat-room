![](https://raw.githubusercontent.com/sunte-Rg/chat-room/master/html/favicon.ico)
# chat-room
未用到数据库，欢迎交流
后端主入口： /html/main.js

下载项目，安装依赖包，然后直接 node main 即可，默认端口是8888

涉及框架与技术：
* express、socket.io、requireJs、vue、less、jquery（只用了ajax）
* 自己也封装了写小工具，单页面用的pageUtil，移动端模拟底部Toask等

功能点：
* 登录、注册（只需要输入昵称即可）
* 在线人数统计
* 即时聊天

遇到的坑：
  * 1：登录后不允许再登录。
  * 2：用户手动退出或关闭浏览器或刷新页面时，如何及时注销登录。
  * 3：怎样获取每个socket的唯一标识。
  
注意点：需要关注socket connect的逻辑和socket disconnect触发的条件。
