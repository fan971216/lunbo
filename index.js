window.onload = function() {

    var containerWidth = parseInt(document.getElementById('container').style.width); //容器的宽度
    var imgLength = document.getElementById('list').getElementsByTagName('img').length; //图片数量
    var buttonArr = document.getElementById('buttons');
    var circle = document.getElementById('circle');
    var buttons = document.getElementById('buttons').getElementsByTagName('span'); //圆点
    var list = document.getElementById('list');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var container = document.getElementById('container');
    var index = 1; //当前第几个图片

    //设置list的宽度
    list.setAttribute('width',containerWidth*imgLength+'px');


    /*
    根据图片数量动态添加圆点
    */
    var _html = '';
    for (var i = 0; i < imgLength; i++) {
        var circleIndex = i + 1;
        if (i == 0) {
            _html += '<span index="1" class="on"></span>';
        } else {
            _html += '<span index="' + circleIndex + '" ></span>';
        }

        circle.innerHTML = _html;


    }

    /*
     图片偏移
    */
    function animate(offset) {
        var newLeft = parseInt(list.style.left) + offset;
        list.style.left = newLeft + 'px';
        list.style.transition='left .7s';
        list.style.width=containerWidth*imgLength+'px';
        var sumWidth = containerWidth * (imgLength - 1);
        if (newLeft < -sumWidth) {
            list.style.left = 0 + 'px';
            list.style.transition='right .7s';
            list.style.width=containerWidth*imgLength+'px';
        }
        if (newLeft > 0) {
            list.style.left = -sumWidth + 'px';
            list.style.transition='right .7s';
            list.style.width=containerWidth*imgLength+'px';

        }


    }

    /*
    圆点按钮的显示
    */
    function buttonShow() {
        //首先清除原来的样式
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].className == 'on') {
                buttons[i].className = '';
            }
        }

        //然后设置当前的圆点
        buttons[index - 1].className = 'on';
    }


    /*
    左右点击
    */
    prev.onclick = function() {
        index -= 1;
        if (index < 1) {
            index = imgLength;
        }
        buttonShow();
        animate(containerWidth); //向前的按钮  图片流向右移动 
    }
    next.onclick = function() {
        index += 1;
        if (index > imgLength) {
            index = 1;
        }
        buttonShow();
        animate(-containerWidth); //向后的按钮  图片流向左移动

    }

    /*
    定时轮播
    */
    var timer;

    function play() {
        timer = setInterval(function() {
            next.onclick();
        }, 1500)
    }
    play();


    /*
    鼠标放上去停止轮播 离开后开始轮播
    */

    function stop() {
        clearInterval(timer);
    }
    container.onmouseover = stop;
    container.onmouseout = play;


    /*
    点击圆点，跳转到对应的图片
    */
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function() {
            console.log(i);
            var clickIndex = parseInt(this.getAttribute('index')); //点击的是第几张图
            var offset = containerWidth * (index - clickIndex);
            animate(offset);
            index = clickIndex;
            buttonShow();
        }
    }



}