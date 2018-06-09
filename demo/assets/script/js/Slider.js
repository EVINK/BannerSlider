"use strict";
/**
 * 仿造JQuery风格的查询器
 * @param selector
 */
function $(selector) {
    var element;
    var firstChar = selector.substr(0, 1);
    var mainSelector = selector.substr(1);
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
var Slider = /** @class */ (function () {
    // 构造函数
    function Slider(options) {
        // 程序暴露给外部调用的默认配置
        this.options = {
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
        this.components = {};
        // 存放组件的样式
        this.styles = {
            // class
            imgBox: "#slider-img-box {\n                    position: relative;\n                    width: inherit;\n                    height: inherit;\n                }",
            imgContainers: "#slider-img-box .slider-img-containers {\n                        position: absolute;\n                        top: 0;\n                        left: 0;\n                        width: inherit;\n                        height: inherit;\n                    }",
            imgs: "#slider-img-box .slider-img-containers .slider-img {\n                    width: inherit;\n                    height: inherit;\n                }",
        };
        this.options = Object.assign(this.options, options);
        this.init();
    }
    // 初始化
    Slider.prototype.init = function () {
        // 创建sheet
        this.generateStyleSheet();
        // 创建图片元素
        var imgs;
        imgs = this.options.address;
        if (imgs === (null || undefined))
            throw new DOMException("can`t get img elements, Slider.js init failure.");
        else {
            var body = void 0;
            if (this.options.containerId === "body")
                body = $("body")[0];
            else
                body = $("#" + this.options.containerId);
            var imgBox = document.createElement("div");
            imgBox.id = "slider-img-box";
            var i = 1;
            for (var _i = 0, imgs_1 = imgs; _i < imgs_1.length; _i++) {
                var value = imgs_1[_i];
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
    };
    Slider.prototype.slide = function () {
        console.log("a");
    };
    Slider.prototype.generateImg = function (attributes) {
        var container = document.createElement("div");
        container.id = attributes.containerId;
        for (var _i = 0, _a = (attributes.containerClasses); _i < _a.length; _i++) {
            var claz = _a[_i];
            container.className += claz + "";
        }
        var img = document.createElement("img");
        img.id = attributes.id;
        for (var _b = 0, _c = (attributes.classes); _b < _c.length; _b++) {
            var claz = _c[_b];
            img.className += claz + " ";
        }
        img.src = attributes.src;
        container.appendChild(img);
        attributes.farther.appendChild(container);
    };
    Slider.prototype.generateStyleSheet = function () {
        var parent = $("html")[0];
        var body = $("body")[0];
        var sheet = document.createElement("style");
        sheet.id = "slider-sheet";
        sheet.className = "slider-sheet";
        parent.insertBefore(sheet, body);
        this.components.sheet = sheet;
        return sheet;
    };
    return Slider;
}());
// @example
var opts = {};
var s = new Slider(opts);
