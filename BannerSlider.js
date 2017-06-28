/**
 *
 * @constructor BannerSlider
 */

function Slider() {
    let opts = {
        address: ["http://file1.wailian.work/2017/06/23/bgimg_1.jpg",
            "http://file1.wailian.work/2017/06/23/bgimg_2.jpg",
            "http://file1.wailian.work/2017/06/23/bgimg_3.jpg",
            "http://file1.wailian.work/2017/06/23/bgimg_4.jpg"],
        method: "random",
        containerId: 'body',
        duration: '1s',
        delay: 3000,
        indicatorStyle: 'dot',
        customIndicator: false,
        indicatorCodes: ['box-shadow:0 0 5px 2px red; opacity:0.8'],
        hasLink: false,
        links: ["http://www.evink.tk",
            "http://www.evink.tk",
            "http://www.evink.tk",
            "http://www.evink.tk"]
    };
    let timeoutBreak = -1;
    let isRecoveryHighlight = false;
    Slider.prototype.opts = null;
    Slider.prototype.init = function () {
        if (this.opts === null) {
            this.opts = opts;
        }
        let address = this.opts.address;
        let containerId;
        let hasLink;
        let links;
        (this.opts.containerId === undefined) ? containerId = opts.containerId : containerId = this.opts.containerId;
        (this.opts.hasLink === undefined) ? hasLink = opts.hasLink : hasLink = this.opts.hasLink;
        (this.opts.links === undefined) ? links = opts.links : links = this.opts.links;
        // 创建图片元素
        let i = 0;
        let div = document.createElement('div');
        let dotBox = document.createElement('div');
        div.className = 'div-cover';
        dotBox.className = 'box-cover';
        for (let key in address) {
            let img = document.createElement('img');
            img.className = 'img-cover';
            img.id = "img-cover" + i;
            img.src = address[key];
            div.appendChild(img);
            // 创建图片标识
            let sign = document.createElement('div');
            sign.className = 'sign-cover';
            sign.id = 'sign-' + i;
            dotBox.appendChild(sign);
            i++;
            events(sign, img, i);
        }
        div.appendChild(dotBox);
        let container = null;
        if (containerId === 'body') {
            container = document.getElementsByTagName('body')[0];
        } else {
            container = document.getElementById(containerId);
        }
        container.appendChild(div);
        this.slide(div);

        // 置换变量， 临时用以存储的id  ， 放在循环体外部
        let signHighlightId = 0;    // 通过这个值判断是否进行了hover操作
        let picHighlightId = 0;
        let pic_hideHighlightId = 0;

        function events(sign, img, i) {
            // 事件监听
            addEventListener(sign, "hover", () => {
                timeoutBreak = 0;
                //移除sign高亮
                let signHighlight = div.getElementsByClassName('sign-cover sign-on')[0];
                signHighlightId = signHighlight.id;
                removeClass(signHighlight, ' sign-on');
                //移除图片高亮
                let picHighlight = div.getElementsByClassName('img-cover show')[0];
                let picHighlight_hide = div.getElementsByClassName('img-cover hide');
                picHighlightId = picHighlight.id;
                removeClass(picHighlight, ' show');
                for (let i = 0; i < picHighlight_hide.length; i++) {
                    pic_hideHighlightId = picHighlight_hide[i].id;
                    removeClass(picHighlight_hide[i], ' hide');
                }
                //为当前sign添加高亮
                sign.className += ' sign-on';
                // 为当前图片添加高亮
                img.className += ' show';
            });

            addEventListener(div, 'mouseLeave', () => {
                if (signHighlightId === 0) {
                    // 未曾进行hover操作 ，将什么也不执行
                    return;
                }
                timeoutBreak = -1;
                isRecoveryHighlight = !isRecoveryHighlight;
                // 去掉当前高亮
                removeClass(document.getElementsByClassName('sign-cover sign-on')[0], ' sign-on');
                removeClass(document.getElementsByClassName('img-cover show')[0], ' show');
                // 还原事件前的高亮
                if (signHighlightId !== 0) {
                    document.getElementById(signHighlightId).className += ' sign-on';
                    signHighlightId = 0;
                }
                if (picHighlightId !== 0) document.getElementById(picHighlightId).className += ' show';
                if (pic_hideHighlightId !== 0) document.getElementById(pic_hideHighlightId).className += ' hide';
            });

            if (hasLink) {
                addEventListener(img, 'click', () => {
                    open(links[i], '_blank');
                });
            }

        }

    };
    Slider.prototype.slide = function (div) {
        const methods = ['random', 'leftSlide', 'rightSlide', 'upSlide', 'downSlide', 'expandX', 'roll'];
        let method = this.opts.method;
        let duration = '1s';
        let delay = 3000;
        let head = document.getElementsByTagName('head')[0];
        let style = document.createElement(`style`);
        let images = div.getElementsByTagName('img');
        let signs = div.getElementsByClassName('sign-cover');
        (!this.opts.duration) ? duration = '1s' : duration = this.opts.duration;
        (!this.opts.delay) ? delay = 3000 : delay = this.opts.delay;

        addStyle(style, '.div-cover', 'width:100%;height:100%;position:relative;overflow:hidden;');
        addStyle(style, '.img-cover', 'width:100%;height:100%;position:absolute;top:0;left:0;display:none;');
        if (this.opts.hasLink === true) addStyle(style, '.img-cover', 'cursor:pointer;');

        const covers = ['width:100%;height:auto;position:absolute;bottom:5px;z-index:9;text-align:center;',
            'width:10px;height:10px;background:white;border-radius:5px;display:inline-block;margin:0 10px;opacity:0.5;',
            'box-shadow:0 0 5px 2px lightblue; opacity:0.8;'];
        if (this.opts.customIndicator === true) {
            // 自定义指示器
            let css;
            ( this.opts.indicatorCodes === undefined ) ? css = opts.indicatorCodes : css = this.opts.indicatorCodes;
            switch (css.length) {
                case 2:
                    addStyle(style, '.box-cover', covers[0]);
                    addStyle(style, '.sign-cover', css[0]);
                    addStyle(style, '.sign-on', css[1]);
                    break;
                case 3:
                    addStyle(style, '.box-cover', css[0]);
                    addStyle(style, '.sign-cover', css[1]);
                    addStyle(style, '.sign-on', css[2]);
                    break;
                default:
                    addStyle(style, '.box-cover', covers[0]);
                    addStyle(style, '.sign-cover', covers[1]);
                    addStyle(style, '.sign-on', css[0]);
                    break;
            }
        } else {
            switch (this.opts.indicatorStyle) {
                case 'vertical':
                    addStyle(style, '.box-cover', `${covers[0]}width: auto;right: 10px;bottom:50%;transform:translateY(50%);`);
                    addStyle(style, '.sign-cover', `${covers[1]}display: block;margin: 10px 0;`);
                    addStyle(style, '.sign-on', covers[2]);
                    break;
                case 'thumb':
                    addStyle(style, '.box-cover', covers[0]);
                    addStyle(style, '.sign-cover', `${covers[1]}width:80px;height:40px;border-radius:2px;`);
                    addStyle(style, '.sign-on', `${covers[2]}opacity:1`);
                    // 添加sign小图
                    for (let i = 0; i < signs.length; i++) {
                        addStyle(style, `#${signs[i].id}`, `background: URL(${this.opts.address[i]});background-size:100%;`);
                    }
                    break;
                default:
                    addStyle(style, '.box-cover', covers[0]);
                    addStyle(style, '.sign-cover', covers[1]);
                    addStyle(style, '.sign-on', covers[2]);
                    break;
            }
        }

        if (method === methods[0]) {
            method = methods[Math.round(Math.random() * (methods.length - 1))];
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
        } else if (method === methods[5]) {
            addStyle(style, '@keyframes showUp', 'from{transform:rotate3d(0,1,0,60deg);}to{transform:rotate3D(0,0,0,0);}');
            addStyle(style, '@keyframes hideDown', 'from{opacity:1;}to{opacity:0;}');
        } else if (method === methods[6]) {
            addStyle(style, '@keyframes showUp', 'from{transform:rotate(60deg);}to{transform:rotate3D(0,0,0,0);}');
            addStyle(style, '@keyframes hideDown', 'from{transform:rotate3D(0,0,0,0);}to{transform:rotate(-120deg);}');
        } else {
            // 这里执行 easy-slide (即默认方法)
            addStyle(style, '@keyframes showUp', 'from{opacity:0;}to{opacity:1;}');
            addStyle(style, '@keyframes hideDown', 'from{opacity:1;}to{opacity:0;}');
        }

        addStyle(style, '.show', `display:block;animation: showUp ${duration}; z-index:9`);
        addStyle(style, '.hide', `display:block;animation: hideDown ${duration} ; animation-fill-mode:forwards;`);
        head.appendChild(style);

        function circle() {
            for (let i = 0; i <= images.length; i++) {
                setTimeout(() => {
                    // 添加高亮,并且保持下一次循环正常
                    if (timeoutBreak !== -1) {   // -1 表示 自循环
                        if (i === images.length) circle();
                        return;
                    }

                    if (isRecoveryHighlight) {    // 去除被还原的高亮
                        isRecoveryHighlight = !isRecoveryHighlight;
                        //移除sign高亮
                        let signHighlight = div.getElementsByClassName('sign-cover sign-on');
                        for (let j = 0; j < signHighlight.length; j++)  removeClass(signHighlight[j], ' sign-on');
                        //移除图片高亮
                        let picHighlight = div.getElementsByClassName('img-cover show');
                        let picHighlight_hide = div.getElementsByClassName('img-cover hide');
                        for (let i = 0; i < picHighlight.length; i++)   removeClass(picHighlight[i], ' show');
                        for (let i = 0; i < picHighlight_hide.length; i++)  removeClass(picHighlight_hide[i], ' hide');
                    }

                    if (i === images.length) {
                        // 清除 最后一张图片的进入动画 ， 添加 退出动画
                        removeClass(images[i - 1], ' show');
                        removeClass(signs[i - 1], ' sign-on');
                        images[i - 1].className += ' hide';
                        circle();
                        return;
                    }
                    if (i === 0) {
                        // 去掉 倒数第二张图片的退出动画
                        removeClass(images[images.length - 2], ' hide');
                    }
                    if (i > 0) {
                        // 去掉 倒数第一张图片的退出动画
                        if (i === 1) removeClass(images[images.length - 1], ' hide');
                        // 去掉上 上一副图片的退出动画
                        if (i > 1) removeClass(images[i - 2], ' hide');
                        // 去掉上一副图片的进入动画
                        removeClass(images[i - 1], ' show');
                        removeClass(signs[i - 1], ' sign-on');
                        //为上一副图片添加退出动画 , 先 清除 后 补入
                        images[i - 1].className += ' hide';
                    }
                    images[i].className += ' show';
                    signs[i].className += ' sign-on';

                    // 异步休眠 3000毫秒 ，在程序醒来的时候，循环内的代码会全部一次执行
                    // 使用i参数，每次更新i的值时，会让下一次循环继续休眠
                }, i * delay);
            }
        }

        circle();
    };
}

function removeClass(selector, className) {
    if (selector.className.indexOf(className) !== -1)
        selector.className = selector.className.substring(0, selector.className.indexOf(className));
}


function addEventListener(component, motivation, callback) {

    if (motivation === 'hover') {
        return component.onmouseover = () => {
            return callback();
        };
    }

    if (motivation === 'mouseLeave') {
        return component.onmouseleave = () => {
            return callback();
        };
    }

    if (motivation === 'click') {
        return component.onclick = () => {
            return callback();
        };
    }

}

function addStyle(styleSheet, selector, cssCode) {
    styleSheet.innerText += selector + '{' + cssCode + '}';
}