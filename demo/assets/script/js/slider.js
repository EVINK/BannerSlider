"use strict";
function $(selector) {
    let element;
    let firstChar = selector.substr(0, 1);
    let mainSelector = selector.substr(1);
    switch (firstChar) {
        case '#':
            element = document.getElementById(mainSelector);
            if (element == null)
                throw new DOMException('no such a HTMLElement while id as ' + mainSelector);
            break;
        case '.':
            element = document.getElementsByClassName(mainSelector);
            if (element == null || element.length <= 0) {
                throw new DOMException('no such a HTMLCollectionOf Element while class as ' + mainSelector);
            }
            break;
        default:
            element = document.getElementsByTagName(selector);
            if (element == null || element.length <= 0) {
                throw new DOMException('no such a NodeListOf Element while as ' + selector);
            }
            break;
    }
    return element;
}
class IMGArray {
    constructor() {
        this._arr = [];
    }
    get arr() {
        console.log('GETTER');
        return this._arr;
    }
    set arr(value) {
        console.warn('set function has been banned for IMGArray');
    }
    push(value) {
        console.log(1111);
        return this._arr.push(value);
    }
    pop() {
        return this._arr.pop();
    }
}
class Slider {
    constructor(options) {
        this.options = {
            address: ['http://evink.jscli.org/lib/pictures/content_1.jpg',
                'http://evink.jscli.org/lib/pictures/content_2.jpg',
                'http://evink.jscli.org/lib/pictures/bgimg_3.jpg',
                'http://evink.jscli.org/lib/pictures/bgimg_4.jpg'],
            method: 'random',
            containerId: 'body',
            duration: 1,
            delay: 3000,
            indicatorStyle: 'dot',
            customIndicator: false,
            indicatorCodes: ['box-shadow:0 0 5px 2px red opacity:0.8'],
            hasClick: false,
            callback: []
        };
        this.components = {};
        this.imgsComponents = [];
        this.styles = {
            imgBox: `#slider-img-box {
                    position: relative;
                    width: inherit;
                    height: inherit;
                   /* overflow: hidden; */
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
        };
        this.body = document.body;
        this.options = Object.assign(this.options, options);
        this.init();
        this.slide();
    }
    init() {
        this.generateStyleSheet();
        let imgs;
        imgs = this.options.address;
        if (imgs === (null || undefined))
            throw new DOMException('can`t get img elements, Slider.js init failure.');
        if (this.options.containerId === 'body')
            this.body = window.document.body;
        else
            this.body = $('#' + this.options.containerId);
        const imgBox = document.createElement('div');
        imgBox.id = 'slider-img-box';
        let i = 5;
        let imgContainers = new Array();
        let imgElements = new Array();
        for (let value of imgs) {
            let img = this.generateImg({
                containerId: `slider-img-container-${i}`,
                containerClasses: [`slider-img-containers`],
                id: `slider-img-${i}`,
                classes: ['slider-img'],
                src: value,
                farther: imgBox
            }, i, imgs.length);
            i++;
            imgContainers.push(img[0]);
            imgElements.push(img[1]);
            this.imgsComponents.push(img[0]);
        }
        this.components.startImg = imgElements[0];
        this.components.startImgContainer = imgContainers[0];
        this.components.endImg = imgElements[imgElements.length - 1];
        this.components.endImgContainer = imgContainers[imgContainers.length - 1];
        this.body.appendChild(imgBox);
        this.components.imgBox = imgBox;
        this.components.imgContainers = imgContainers;
        this.components.imgs = imgElements;
    }
    generateImg(attributes, i, imgsLength) {
        let originalIndex = i;
        let container = document.createElement('div');
        container.id = attributes.containerId;
        for (let claz of (attributes.containerClasses)) {
            container.className += claz + ` `;
        }
        let img = document.createElement('img');
        img.id = attributes.id;
        for (let claz of (attributes.classes)) {
            img.className += claz + ` `;
        }
        img.src = attributes.src;
        container.appendChild(img);
        attributes.farther.appendChild(container);
        let displaceMent;
        if (i >= imgsLength) {
            i = i - imgsLength - 1;
            displaceMent = i * 100;
        }
        else {
            displaceMent = (imgsLength - i + 1) * -100;
        }
        let style = ` #slider-img-box #${container.id} {
                        left: ${displaceMent}%
                    }`;
        if (originalIndex != 1) {
            let keyframe = ` @keyframes slide-${originalIndex} {
                0% {
                    left: ${displaceMent}%;
                }
                100% {
                    left: ${displaceMent - 100}%;
                }
            }`;
            this.appendToSheet(keyframe);
        }
        this.appendToSheet(style);
        return [container, img];
    }
    generateStyleSheet() {
        const html = $('html')[0];
        let sheet = document.createElement('style');
        sheet.id = 'slider-sheet';
        sheet.className = 'slider-sheet';
        html.insertBefore(sheet, document.body);
        this.components.sheet = sheet;
        this.appendToSheet(this.styles.imgBox);
        this.appendToSheet(this.styles.imgContainers);
        this.appendToSheet(this.styles.imgs);
        return sheet;
    }
    appendToSheet(style) {
        this.components.sheet.innerHTML += style;
        this.components.sheet.innerHTML += '\n';
    }
    addInAnimations(originalIndex) {
    }
    addOutAnimations(originalIndex) {
    }
    slide() {
        console.log('slide');
        setInterval(() => {
            console.log(1);
            this.containerSlideEvent();
        }, 1000);
    }
    containerSlideEvent() {
        let containers = this.components.imgContainers;
        console.log(containers[0]);
    }
    imgsOnChange(img) {
    }
}
let opts = {};
let arr = [];
