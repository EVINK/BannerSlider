/*
 ͼƬѭ��������
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
        // ����ͼƬԪ��
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
            // ����ִ�� easy-slide (��Ĭ�Ϸ���)
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
                        // ��� ���һ��ͼƬ�Ľ��붯�� �� ��� �˳�����
                        images[i - 1].className = images[i - 1].className.substring(0, images[i - 1].className.indexOf(' show'));
                        images[i - 1].className += ' hide';
                        circle();
                        return;
                    }
                    if (i === 0) {
                        // ȥ�� �����ڶ���ͼƬ���˳�����
                        if (images[images.length - 2].className.indexOf(' hide') !== -1) {
                            images[images.length - 2].className = images[images.length - 2].className.substring(0, images[images.length - 2].className.indexOf(' hide'));
                        }
                    }
                    if (i > 0) {
                        // ȥ�� ������һ��ͼƬ���˳�����
                        if (i === 1 && images[images.length - 1].className.indexOf(' hide') !== -1) {
                            images[images.length - 1].className = images[images.length - 1].className.substring(0, images[images.length - 1].className.indexOf(' hide'));
                        }
                        // ȥ���� ��һ��ͼƬ���˳�����
                        if (i > 1) {
                            images[i - 2].className = images[i - 2].className.substring(0, images[i - 2].className.indexOf(' hide'));
                        }
                        // ȥ����һ��ͼƬ�Ľ��붯��
                        images[i - 1].className = images[i - 1].className.substring(0, images[i - 1].className.indexOf(' show'));
                        //Ϊ��һ��ͼƬ����˳����� , �� ��� �� ����
                        images[i - 1].className += ' hide';
                    }
                    images[i].className += ' show';

                    // �첽���� 3000���� ���ڳ���������ʱ��ѭ���ڵĴ����ȫ��һ��ִ��
                    // ʹ��i������ÿ�θ���i��ֵʱ��������һ��ѭ����������
                }, i * 3000);
            }
        }

        circle();

    };
}

function addStyle(styleSheet, selector, cssCode) {
    styleSheet.innerText += selector + '{' + cssCode + '}';
}
