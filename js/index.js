/**
 * Created by edge on 2016/4/7.
 */
var DOM = {};
DOM.next = function (ele) {
    if(ele.nextElementSibling) {
        return ele.nextElementSibling;
    }
    var next = ele.nextSibling;
    while(next) {
        if(next.nodeType === 1) {
            return next;
        }
        next = next.nextSibling;
    }
    return null;
};

DOM.prev = function (ele) {
    if(ele.previousElementSibling) {
        return ele.previousElementSibling;
    }
    var prev = ele.previousSibling;
    while(prev) {
        if(prev.nodeType === 1) {
            return prev;
        }
        prev = prev.previousSibling;
    }
    return null;
};

DOM.allNext = function (ele) {
    var arr = [];
    while(ele.nextElementSibling) {
        if(ele.nextElementSibling) {
            arr.push(ele.nextElementSibling);
        }
        ele.nextElementSibling = ele.nextElementSibling.nextElementSibling;
    }
    return arr;
};

/*document.documentElement.onmouseover = function (e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    if((target.tagName == 'A'||target.tagName == 'LI')&& target.parentNode.parentNode.className == 'barRight') {
        target.nextElementSibling.style.display = "block";
    }

}

document.documentElement.onmouseout = function (e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    if((target.tagName == 'A'||target.tagName == 'LI')&& target.parentNode.parentNode.className == 'barRight') {
        target.nextElementSibling.style.display = "none";
    }
}*/

window.onload = function () {
    var oDiv = document.getElementById('topBar');
    var oLis = oDiv.getElementsByTagName('li');
    for(var i = 0; i < oLis.length;i++) {
        oLis[i].index = i;

        oLis[i].onmouseover = function () {
            var oDivsmall = oLis[this.index].getElementsByTagName('div')[0];
            var oA = oLis[this.index].getElementsByTagName('a')[0];
            var oI = oA.getElementsByTagName('i')[0];
            if(oDivsmall) {
                oA.className = 'hover';
                oI.className = 'change';
                oDivsmall.style.display = 'block';
            }
        };

        oLis[i].onmouseout = function () {
            var oDivsmall = oLis[this.index].getElementsByTagName('div')[0];
            var oA = oLis[this.index].getElementsByTagName('a')[0];
            var oI = oA.getElementsByTagName('i')[0];
            if(oDivsmall) {
                oA.className = '';
                oI.className = '';
                oDivsmall.style.display = 'none';
            }
        };
    }


    // 促销导航
    var tabInner = document.getElementById('tabInner');                 // 轮播图DIV对象
    var tabInner_li = tabInner.getElementsByTagName("li")[0];           // 轮播图图片节点
    var oDivW = tabInner.getElementsByTagName("li")[0].offsetWidth;      // 图片宽度

    var divClone = tabInner_li.cloneNode(true);                         // 复制一个图片对象
    tabInner.appendChild(divClone);                                     // 添加到节点


    var tab_len = tabInner.getElementsByTagName("li").length ;           // 轮播图图片数量
    tabInner.style.width = oDivW * tab_len + 'px';                      // 设置轮播图大小
    var index =  0;                                                     // 图片当前位置

    var col = tabInner.getElementsByTagName("li")[0].getAttribute("col");       // 初始化背景色
    document.getElementsByClassName("gome-main")[0].style.backgroundColor = 'rgb(' + col + ')' ;

    // 轮播图
    var autoTimer = setInterval(autoMove,2000);

    // 轮播方法
    function autoMove () {
        index++;
        if(index == tab_len) {
            tabInner.style.left = 0;
            index = 1;
        }
        menuSync();
        animate(tabInner,{left:-oDivW * index},800);
    }


    // 左滚动
    document.querySelector(".direct-left").onclick = function(){        // 左滚动
        index++;
        clearInterval(autoTimer);
        if(index == tab_len ){                                          // 偏移到最大，重新开始
            tabInner.style.left = 0;     // 轮播图偏移最后一张图片
            index = 1;
        }
        menuSync();
        animate( tabInner , {left : -oDivW * index},600);                // 偏移操作

        autoTimer = setInterval(autoMove,2000);
    }


    // 右边滚动
    document.querySelector(".direct-right").onclick = function(){
        index--;                                                        // 右滚动
        clearInterval(autoTimer);
        if(index == -1 ){                                                // 偏移到最大，重新开始
            tabInner.style.left = -oDivW * tab_len + 'px';                // 轮播图偏移最后一张图片
            index = tab_len - 2;
        }
        menuSync();
        animate( tabInner , {left:-oDivW * index},600);
        autoTimer = setInterval(autoMove,2000);
    }


    // 菜单同步显示
    function menuSync(){
        var tabBtns = document.getElementById("tabBtn");
        var tabBtnsLi = tabBtns.getElementsByTagName("li");

        [].forEach.call(tabBtnsLi,function(e,i,a){
            // 菜单样式切换
            if( i == index ){
                e.className = 'c2';
            }else {
                e.className = 'c1';
            }

            // 获取图片背景色
            var col = tabInner.getElementsByTagName("li")[index].getAttribute("col");
            document.getElementsByClassName("gome-main")[0].style.backgroundColor = 'rgb(' + col + ')' ;

        });
    }

    // 菜单监听
    (function a(){
        var tabBtns = document.getElementById("tabBtn");
        var tabBtnsLi = tabBtns.getElementsByTagName("li");

        function change(){
            clearInterval(autoTimer);
            index = this.index;
            menuSync();
            animate( tabInner , {left:-oDivW * index},600);
            autoTimer = setInterval(autoMove,2000);
        };

        [].forEach.call(tabBtnsLi,function(e,i,a){
            e.index = i;
            e.onclick = change;
            e.onmouseover = change;
        });
    })();


};
