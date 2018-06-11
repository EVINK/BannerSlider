/// <reference path="utils.ts" />

// import { $ } from "./utils"; module = commonjs

/**
 * Slider主类
 * @constructor
 */
class Slider {

    // 程序暴露给外部调用的默认配置
    options: Options = {
        address: ['http://ov998a2gm.bkt.clouddn.com/lib/pictures/content_1.jpg',
            'http://ov998a2gm.bkt.clouddn.com/lib/pictures/content_2.jpg',
            'http://ov998a2gm.bkt.clouddn.com/lib/pictures/bgimg_3.jpg',
            'http://ov998a2gm.bkt.clouddn.com/lib/pictures/bgimg_4.jpg'],
        method: 'random',
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
                    // overflow: hidden;
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

    // 初始化图片组件
    init() {

        // 创建sheet
        this.generateStyleSheet();

        // 创建图片元素
        let imgs: Array<string> | undefined;
        imgs = this.options.address;
        if (imgs === (null || undefined))
            throw new DOMException('can`t get img elements, Slider.js init failure.');

        let body;
        if (this.options.containerId === 'body')
            body = $('body')[0];
        else
            body = $('#' + this.options.containerId as string);
        let imgBox: HTMLDivElement = document.createElement('div');
        imgBox.id = 'slider-img-box';
        let i: number = 1;
        let imgContainers: Array<HTMLDivElement> = new Array();
        let imgElements: Array<HTMLImageElement> = new Array();
        for (let value of imgs) {
            let img = this.generateImg({
                containerId: `slider-img-container-${i}`,
                containerClasses: [`slider-img-containers`],
                id: `slider-img-${i}`,
                classes: ['slider-img'],
                src: value,
                farther: imgBox
            }, i - 1);
            i++;
            imgContainers.push(img[0]);
            imgElements.push(img[1]);
        }
        body.appendChild(imgBox);

        this.components.imgBox = imgBox;
        this.components.imgContainers = imgContainers;
        this.components.imgs = imgElements;

    }

    // 核心逻辑:滑动
    slide() {
        setInterval(() => {
            this.containerSlideEvent();
        }, 1000);
    }

    containerSlideEvent() {
        let containers = this.components.imgContainers;
        for (let container of containers) {

        }
    }


    /**
     *
     * @param attributes
     * @param i
     * @returns Array<HTMLDivElement, HTMLImgElement>
     */
    generateImg(attributes: ImgAttribute, i: number): Array<any> {
        let container: HTMLDivElement = document.createElement('div');
        container.id = attributes.containerId;
        for (let claz of (attributes.containerClasses)) {
            container.className += claz + ` `;
        }
        let img: HTMLImageElement = document.createElement('img');
        img.id = attributes.id;
        for (let claz of (attributes.classes)) {
            img.className += claz + ` `;
        }
        img.src = attributes.src;
        container.appendChild(img);
        attributes.farther.appendChild(container);
        let displaceMent = i * 100;
        let style = ` #slider-img-box #${container.id} {
                        left: ${displaceMent}%;
                    }`;
        this.appendToSheet(style);
        return [container, img];
    }

    generateStyleSheet() {
        let parent = $('html')[0];
        let body = $('body')[0];
        let sheet = document.createElement('style');
        sheet.id = 'slider-sheet';
        sheet.className = 'slider-sheet';
        parent.insertBefore(sheet, body);
        this.components.sheet = sheet;
        this.appendToSheet(this.styles.imgBox);
        this.appendToSheet(this.styles.imgContainers);
        this.appendToSheet(this.styles.imgs);
        return sheet;
    }

    appendToSheet(style: string) {
        this.components.sheet.innerHTML += style;
        this.components.sheet.innerHTML += '\n';
    }

}


// @example
let opts = {
};
let s = new Slider(opts);



