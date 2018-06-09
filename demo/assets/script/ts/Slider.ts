
/**
 * 仿造JQuery风格的查询器
 * @param selector
 */
function $(selector: string): any {
    let element: any
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

/**
 * Slider主类
 * @constructor
 */
class Slider {

    // 程序暴露给外部调用的默认配置
    options: Options = {
        address: ["http://ov998a2gm.bkt.clouddn.com/lib/pictures/content_1.jpg",
            "http://ov998a2gm.bkt.clouddn.com/lib/pictures/content_2.jpg",
            "http://ov998a2gm.bkt.clouddn.com/lib/pictures/bgimg_3.jpg",
            "http://ov998a2gm.bkt.clouddn.com/lib/pictures/bgimg_4.jpg"],
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

    // 程序初始化时所创造的组件
    components: Components = {} as any;

    // 存放组件的样式
    styles = {
        // class
        imgBox: `#slider-img-box {
                    position: relative;
                    width: inherit;
                    height: inherit;
                }`,

        imgContainers: `#slider-img-box .slider-img-containers {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: inherit;
                        height: inherit;
                    }`,

        imgs: `#slider-img-box .slider-img-containers .slider-img {
                    width: inherit;
                    height: inherit;
                }`,
        // id
    }

    // 构造函数
    constructor(options: Options) {
        this.options = Object.assign(this.options, options);
        this.init();
    }

    // 初始化
    init() {

        // 创建sheet
        this.generateStyleSheet();

        // 创建图片元素
        let imgs: Array<string> | undefined;
        imgs = this.options.address;
        if (imgs === (null || undefined))
            throw new DOMException("can`t get img elements, Slider.js init failure.");
        else {
            let body;
            if (this.options.containerId === "body")
                body = $("body")[0];
            else
                body = $("#" + this.options.containerId as string);
            let imgBox: HTMLElement = document.createElement("div");
            imgBox.id = "slider-img-box";
            let i: number = 1;
            for (let value of imgs) {
                this.generateImg({
                    containerId: "slider-img-container" + i,
                    containerClasses: "slider-img-containers",
                    id: "slider-img-" + i,
                    classes: ["slider-img"],
                    src: value,
                    farther: imgBox
                });
                i++;
            }
            body.appendChild(imgBox);
        }


    }

    slide() {
        console.log("a");
    }

    generateImg(attributes: ImgAttribute) {
        let container: HTMLDivElement = document.createElement("div");
        container.id = attributes.containerId;
        for (let claz of (attributes.containerClasses)) {
            container.className += claz + "";
        }
        let img: HTMLImageElement = document.createElement("img");
        img.id = attributes.id;
        for (let claz of (attributes.classes)) {
            img.className += claz + " ";
        }
        img.src = attributes.src;
        container.appendChild(img);
        attributes.farther.appendChild(container);
    }

    generateStyleSheet() {
        let parent = $("html")[0];
        let body = $("body")[0];
        let sheet = document.createElement("style");
        sheet.id = "slider-sheet";
        sheet.className = "slider-sheet";
        parent.insertBefore(sheet, body);
        this.components.sheet = sheet;
        return sheet;
    }

}


// @example
let opts = {
};
let s = new Slider(opts);



