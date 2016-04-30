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


    // ��������
    var tabInner = document.getElementById('tabInner');                 // �ֲ�ͼDIV����
    var tabInner_li = tabInner.getElementsByTagName("li")[0];           // �ֲ�ͼͼƬ�ڵ�
    var oDivW = tabInner.getElementsByTagName("li")[0].offsetWidth;      // ͼƬ���

    var divClone = tabInner_li.cloneNode(true);                         // ����һ��ͼƬ����
    tabInner.appendChild(divClone);                                     // ��ӵ��ڵ�


    var tab_len = tabInner.getElementsByTagName("li").length ;           // �ֲ�ͼͼƬ����
    tabInner.style.width = oDivW * tab_len + 'px';                      // �����ֲ�ͼ��С
    var index =  0;                                                     // ͼƬ��ǰλ��

    var col = tabInner.getElementsByTagName("li")[0].getAttribute("col");       // ��ʼ������ɫ
    document.getElementsByClassName("gome-main")[0].style.backgroundColor = 'rgb(' + col + ')' ;

    // �ֲ�ͼ
    var autoTimer = setInterval(autoMove,2000);

    // �ֲ�����
    function autoMove () {
        index++;
        if(index == tab_len) {
            tabInner.style.left = 0;
            index = 1;
        }
        menuSync();
        animate(tabInner,{left:-oDivW * index},800);
    }


    // �����
    document.querySelector(".direct-left").onclick = function(){        // �����
        index++;
        clearInterval(autoTimer);
        if(index == tab_len ){                                          // ƫ�Ƶ�������¿�ʼ
            tabInner.style.left = 0;     // �ֲ�ͼƫ�����һ��ͼƬ
            index = 1;
        }
        menuSync();
        animate( tabInner , {left : -oDivW * index},600);                // ƫ�Ʋ���

        autoTimer = setInterval(autoMove,2000);
    }


    // �ұ߹���
    document.querySelector(".direct-right").onclick = function(){
        index--;                                                        // �ҹ���
        clearInterval(autoTimer);
        if(index == -1 ){                                                // ƫ�Ƶ�������¿�ʼ
            tabInner.style.left = -oDivW * tab_len + 'px';                // �ֲ�ͼƫ�����һ��ͼƬ
            index = tab_len - 2;
        }
        menuSync();
        animate( tabInner , {left:-oDivW * index},600);
        autoTimer = setInterval(autoMove,2000);
    }


    // �˵�ͬ����ʾ
    function menuSync(){
        var tabBtns = document.getElementById("tabBtn");
        var tabBtnsLi = tabBtns.getElementsByTagName("li");

        [].forEach.call(tabBtnsLi,function(e,i,a){
            // �˵���ʽ�л�
            if( i == index ){
                e.className = 'c2';
            }else {
                e.className = 'c1';
            }

            // ��ȡͼƬ����ɫ
            var col = tabInner.getElementsByTagName("li")[index].getAttribute("col");
            document.getElementsByClassName("gome-main")[0].style.backgroundColor = 'rgb(' + col + ')' ;

        });
    }

    // �˵�����
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
