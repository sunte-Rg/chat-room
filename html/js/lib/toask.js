/**
 * Created by family-rg on 2017/7/29.
 */
(function(global,factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : //cmd
        typeof define === 'function' && define.amd ? define(factory) : //amd
            (global.Toask = factory()); //window
}(this,function(){

    var Toask = function(){
        this.id = "";
        this.time = 2000;
        this.state = 0; //0:未初始化 1:初始化 2:显示中
        this.init();
    }

    Toask.prototype.init = function() {
        var self = this;
        if (self.state != 0) return;
        var styleElems = document.getElementsByTagName("style");
        if (styleElems.length == 0) {
            var tempStyle = document.createElement("style");
            tempStyle.setAttribute("type", "text/css");
            document.getElementsByTagName("head")[0].appendChild(tempStyle);
        }

        //如果页面中没有STYLE标签，则在HEAD中插入STYLE标签
        var styleElem = styleElems[0];

        var toaskCss = ' .__prompt_info{' +
            ' width: 50%;' +
            'display:none;' +
            'position: fixed;' +
            'left: 25%;' +
            'text-align: center;' +
            ' background: grey;' +
            ' color: #FFFFFF;' +
            ' padding: 1%;' +
            '  bottom: 5%;' +
            ' border-radius: .3rem;' +
            ' -webkit-border-radius: .3rem;' +
            ' opacity: 0.8;' +
            '}';
        if (styleElem.styleSheet) {//IE
            styleElem.styleSheet.cssText += toaskCss;
            //alert("ie");
        } else {
            styleElem.appendChild(document.createTextNode(toaskCss));
            //alert("webkit");
        }


        self.id = "prompt_info__" + Math.random().toString().substr(2, 8);
        var toaskEle = document.createElement('p');
        toaskEle.id = self.id;
        toaskEle.className = "__prompt_info"
        document.body.appendChild(toaskEle);
    }

    Toask.prototype.info = function(content,time){
        var self = this ;
        if(self.state == 2) return ;
        document.getElementById(self.id).innerText = content;
        document.getElementById(self.id).style.display = "block";
        self.state = 2 ;
        setTimeout(function(){
            self.state = 1 ;
            document.getElementById(self.id).style.display = "none";
        },time?time:self.time);
    }

    return Toask ;
}))

