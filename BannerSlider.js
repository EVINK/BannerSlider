/*
 图片循环构造器
 */

function Slider() {
    let opts = {
        address: ["http://file1.wailian.work/2017/06/23/bgimg_1.jpg",
            "http://file1.wailian.work/2017/06/23/bgimg_2.jpg",
            "http://file1.wailian.work/2017/06/23/bgimg_3.jpg",
            "http://file1.wailian.work/2017/06/23/bgimg_4.jpg",],
        method: "random",
        containerId: 'null'
    };
    Slider.prototype.opts = null;
    Slider.prototype.init = function () {
        if (this.opts === null) {
            this.opts = opts;
        }
        let address = this.opts.address;
        let containerId = this.opts.containerId;
        // 创建图片元素
        let i = 0;
        let div = document.createElement('div');
        div.className = 'div-cover';
        for (let key in address) {
            let img = document.createElement('img');
            img.className = 'img-cover';
            img.id = "img-cover" + i;
            img.src = address[key];
            div.appendChild(img);
            i++;
        }
        let container = null;
        if (containerId === 'null') {
            container = document.getElementsByTagName('body')[0];
        } else {
            container = document.getElementById(containerId);
        }
        container.appendChild(div);
        this.slide(div);
    };
    Slider.prototype.slide = function (div) {
        let methods = ['easy','leftSlide','rightSlide','upSlide','downSlide','expandX','roll'];
        let method = this.opts.method;
        let head = document.getElementsByTagName('head')[0];
        let style = document.createElement(`style`);
        let images = div.getElementsByTagName('img');
        addStyle(style, '.div-cover', 'width:100%;height:100%;position:relative;overflow:hidden;');
        addStyle(style, '.img-cover', 'width:100%;height:100%;position:absolute;top:0;left:0;display:none');

        if(method === 'random'){
            method = methods[Math.round(Math.random() * (methods.length-1))];
        }

        if (method === methods[1]) {
            addStyle(style, '@keyframes showUp', 'from{left:-100%;}to{left:0}');
            addStyle(style, '@keyframes hideDown', 'from{left:0;}to{left:100%;}');
        } else if (method === methods[2]) {
            addStyle(style, '@keyframes showUp', 'from{left:100%;}to{left:0;}');
            addStyle(style, '@keyframes hideDown', 'from{left:0;}to{left:-100%;}');
        } else if (method === methods[3]) {
            addStyle(style, '@keyframes showUp', 'from{top:-100%;}to{top:0;}');
            addStyle(style, '@keyframes hideDown', 'from{top:0;}to{top:100%;}');
        } else if (method === methods[4]) {
            addStyle(style, '@keyframes showUp', 'from{top:100%;}to{top:0;}');
            addStyle(style, '@keyframes hideDown', 'from{top:0;}to{top:-100%;}');
        } else if(method === methods[5]){
            addStyle(style, '@keyframes showUp', 'from{transform:rotate3d(0,1,0,60deg);}to{transform:rotate3D(0,0,0,0);}');
            addStyle(style, '@keyframes hideDown', 'from{opacity:1;}to{opacity:0;}');
        }else if(method === methods[6]){
            addStyle(style, '@keyframes showUp', 'from{transform:rotate(60deg);}to{transform:rotate3D(0,0,0,0);}');
            addStyle(style, '@keyframes hideDown', 'from{transform:rotate3D(0,0,0,0);}to{transform:rotate(-120deg);}');
        } else {
            // 这里执行 easy-slide (即默认方法)
            addStyle(style, '@keyframes showUp', 'from{opacity:0;}to{opacity:1;}');
            addStyle(style, '@keyframes hideDown', 'from{opacity:1;}to{opacity:0;}');
        }

        addStyle(style, '.show', 'display:block;animation: showUp 1s; z-index:9');
        addStyle(style, '.hide', 'display:block;animation: hideDown 1s ; animation-fill-mode:forwards;');
        head.appendChild(style);

        function circle() {
            for (let i = 0; i <= images.length; i++) {
                setTimeout(() => {
                    if (i === (images.length)) {
                        // 清除 最后一张图片的进入动画 ， 添加 退出动画
                        images[i - 1].className = images[i - 1].className.substring(0, images[i - 1].className.indexOf(' show'));
                        images[i - 1].className += ' hide';
                        circle();
                        return;
                    }
                    if (i === 0) {
                        // 去掉 倒数第二张图片的退出动画
                        if (images[images.length - 2].className.indexOf(' hide') !== -1) {
                            images[images.length - 2].className = images[images.length - 2].className.substring(0, images[images.length - 2].className.indexOf(' hide'));
                        }
                    }
                    if (i > 0) {
                        // 去掉 倒数第一张图片的退出动画
                        if (i === 1 && images[images.length - 1].className.indexOf(' hide') !== -1) {
                            images[images.length - 1].className = images[images.length - 1].className.substring(0, images[images.length - 1].className.indexOf(' hide'));
                        }
                        // 去掉上 上一副图片的退出动画
                        if (i > 1) {
                            images[i - 2].className = images[i - 2].className.substring(0, images[i - 2].className.indexOf(' hide'));
                        }
                        // 去掉上一副图片的进入动画
                        images[i - 1].className = images[i - 1].className.substring(0, images[i - 1].className.indexOf(' show'));
                        //为上一副图片添加退出动画 , 先 清除 后 补入
                        images[i - 1].className += ' hide';
                    }
                    images[i].className += ' show';

                    // 异步休眠 3000毫秒 ，在程序醒来的时候，循环内的代码会全部一次执行
                    // 使用i参数，每次更新i的值时，会让下一次循环继续休眠
                }, i * 3000);
            }
        }

        circle();

    };
}

function addStyle(styleSheet, selector, cssCode) {
    styleSheet.innerText += selector + '{' + cssCode + '}';
}
