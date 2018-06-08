
interface Options {
    // 图片的地址: 必要
    address?: Array<string>;
    // 滑动方式
    method?: string;
    // 容器id, 默认为"body"
    containerId?: string;
    // 动画时长
    duration?: number;
    // 停留时长
    delay?: number;
    // 指示器风格
    indicatorStyle?: string;
    // 自定义指示器
    customIndicator?: boolean;
    indicatorCodes?: Array<string>;
    // 点击事件
    hasClick?: boolean;
    callback?: Array<() => void>;

}


interface ImgAttribute {
    id: string,
    classes: Array<string>,
    src: string,
    farther: HTMLElement
}

function $(selector: string) {
    let element: any;
    let firstChar: string = selector.substr(0, 1);
    let mainSelector: string = selector.substr(1);
    switch (firstChar) {
        case "#":
            // id
            element = document.getElementById(mainSelector);
            if (element == null)
                throw new DOMException("no such a HTMLElement while id as " + mainSelector);
            break;
        case ".":
            // class
            element = document.getElementsByClassName(mainSelector);
            if (element == null || element.length <= 0) {
                throw new DOMException("no such a HTMLCollectionOf Element while class as " + mainSelector);
            }
            break;
        default:
            // tag
            element = document.getElementsByTagName(selector);
            if (element == null || element.length <= 0) {
                throw new DOMException("no such a NodeListOf Element while as " + selector);
            }
            break;
    }
    return element;
}

class Slider {

    options: Options = {
        address: ["http://file1.wailian.work/2017/06/23/bgimg_1.jpg",
            "http://file1.wailian.work/2017/06/23/bgimg_2.jpg",
            "http://file1.wailian.work/2017/06/23/bgimg_3.jpg",
            "http://file1.wailian.work/2017/06/23/bgimg_4.jpg"],
        method: "random",
        containerId: 'body',
        duration: 1,
        delay: 3000,
        indicatorStyle: 'dot',
        customIndicator: false,
        indicatorCodes: ['box-shadow:0 0 5px 2px red; opacity:0.8'],
        hasClick: false,
        callback: []
    };

    constructor(options: Options) {
        this.options = Object.assign(this.options, options);
        this.init();
    }

    init() {
        // 创建图片元素
        let imgs: Array<string> | undefined;
        imgs = this.options.address;
        if (imgs === (null || undefined))
            throw new DOMException("can`t get img elements, Slider.js init failure.");
        else {
            let body = $("body")[0];
            let imgBox: HTMLElement = document.createElement("div");
            imgBox.id = "imgBox";
            let i: number = 0;
            for (let value in imgs) {
                this.generateImg({
                    id: "img" + i,
                    classes: ["img" + i],
                    src: value,
                    farther: imgBox
                });
            }
            body.appendChild(imgBox);
        }


    }

    slide() {
        console.log("a");
    }

    generateImg(attributes: ImgAttribute) {
        let img: HTMLElement = document.createElement("img");
        img.id = attributes.id;
        for (let claz in (attributes.classes)) {
            img.className += claz + " ";
        }
        attributes.farther.appendChild(img);
    }

}


// test
let opts = {
};
let s = new Slider(opts);



