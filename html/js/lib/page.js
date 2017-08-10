/**
 * Created by family-rg on 2017/8/4.
 */
(function(global,factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : //cmd
        typeof define === 'function' && define.amd ? define(factory) : //amd
            (global.Vue = factory()); //window
}(this,function() {

    var Page = function () {
        this.pageName ; //  Example  {  MAIN:{id:"main_page",title:"index"} }
        this.pageState = 0;  // 0 : 未初始化  1：初始化成功，正常显示页面  2:页面切换中
        this.pageHistory = [];//页面历史记录，勿改动
        this.titleId = '';//显示title的id
    }

    Page.prototype.init = function(param){
        if(!param) return ;
        var self = this ;
        self.pageName = param.pageName;
        self.titleId = param.titleId;
    }

    Page.prototype.goToPage = function (nextPage) {
        if(!nextPage){
            console.error("goToPage() Not specified nextPage");
            return;
        }
        var self = this, pageHistory = self.pageHistory;
        var nowPage = pageHistory.length > 0 ? pageHistory[pageHistory.length - 1] : undefined;
        var nowPageEle = nowPage ? document.getElementById(nowPage.id) : nowPage;
        var nextPageEle = document.getElementById(nextPage.id);
        if (nowPageEle) {
            nowPageEle.style.width = "0%";
        }
        if (nextPageEle) {
            nextPageEle.style.width = "100%";
        }
        document.getElementById(self.titleId).innerText = nextPage.title;
        pageHistory.push(nextPage);
    }

    Page.prototype.backPage = function () {
        var self = this, pageHistory = self.pageHistory;
        if (pageHistory.length <= 1) return;
        var backPage = pageHistory.pop();
        var showPage = pageHistory[pageHistory.length - 1];
        var backPageEle = document.getElementById(backPage.id);
        var showPageEle = document.getElementById(showPage.id);
        document.getElementById(self.titleId).innerText = showPage.title;
        if (backPageEle) {
            backPageEle.style.width = "0%";
        }
        if (showPageEle) {
            showPageEle.style.width = "100%";
        }
    }
    return Page;
}))