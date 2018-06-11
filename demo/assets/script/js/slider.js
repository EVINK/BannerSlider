"use strict";
function $(selector) {
    var element;
    var firstChar = selector.substr(0, 1);
    var mainSelector = selector.substr(1);
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
var Slider = (function () {
    function Slider(options) {
        this.options = {
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
        this.components = {};
        this.styles = {
            imgBox: "#slider-img-box {\n                    position: relative;\n                    width: inherit;\n                    height: inherit;\n                    // overflow: hidden;\n                }",
            imgContainers: "#slider-img-box .slider-img-containers {\n                        position: absolute;\n                        top: 0;\n                        left: 0;\n                        width: inherit;\n                        height: inherit;\n                    }",
            imgs: "#slider-img-box .slider-img-containers .slider-img {\n                    width: inherit;\n                    height: inherit;\n                }",
        };
        this.options = Object.assign(this.options, options);
        this.init();
    }
    Slider.prototype.init = function () {
        this.generateStyleSheet();
        var imgs;
        imgs = this.options.address;
        if (imgs === (null || undefined))
            throw new DOMException('can`t get img elements, Slider.js init failure.');
        var body;
        if (this.options.containerId === 'body')
            body = $('body')[0];
        else
            body = $('#' + this.options.containerId);
        var imgBox = document.createElement('div');
        imgBox.id = 'slider-img-box';
        var i = 1;
        var imgContainers = new Array();
        var imgElements = new Array();
        for (var _i = 0, imgs_1 = imgs; _i < imgs_1.length; _i++) {
            var value = imgs_1[_i];
            var img = this.generateImg({
                containerId: "slider-img-container-" + i,
                containerClasses: ["slider-img-containers"],
                id: "slider-img-" + i,
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
    };
    Slider.prototype.slide = function () {
        var _this = this;
        setInterval(function () {
            _this.containerSlideEvent();
        }, 1000);
    };
    Slider.prototype.containerSlideEvent = function () {
        var containers = this.components.imgContainers;
        for (var _i = 0, containers_1 = containers; _i < containers_1.length; _i++) {
            var container = containers_1[_i];
        }
    };
    Slider.prototype.generateImg = function (attributes, i) {
        var container = document.createElement('div');
        container.id = attributes.containerId;
        for (var _i = 0, _a = (attributes.containerClasses); _i < _a.length; _i++) {
            var claz = _a[_i];
            container.className += claz + " ";
        }
        var img = document.createElement('img');
        img.id = attributes.id;
        for (var _b = 0, _c = (attributes.classes); _b < _c.length; _b++) {
            var claz = _c[_b];
            img.className += claz + " ";
        }
        img.src = attributes.src;
        container.appendChild(img);
        attributes.farther.appendChild(container);
        var displaceMent = i * 100;
        var style = " #slider-img-box #" + container.id + " {\n                        left: " + displaceMent + "%;\n                    }";
        this.appendToSheet(style);
        return [container, img];
    };
    Slider.prototype.generateStyleSheet = function () {
        var parent = $('html')[0];
        var body = $('body')[0];
        var sheet = document.createElement('style');
        sheet.id = 'slider-sheet';
        sheet.className = 'slider-sheet';
        parent.insertBefore(sheet, body);
        this.components.sheet = sheet;
        this.appendToSheet(this.styles.imgBox);
        this.appendToSheet(this.styles.imgContainers);
        this.appendToSheet(this.styles.imgs);
        return sheet;
    };
    Slider.prototype.appendToSheet = function (style) {
        this.components.sheet.innerHTML += style;
        this.components.sheet.innerHTML += '\n';
    };
    return Slider;
}());
var opts = {};
var s = new Slider(opts);
