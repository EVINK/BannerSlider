"use strict";
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
var Slider = /** @class */ (function () {
    function Slider(options) {
        this.options = {
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
        this.options = Object.assign(this.options, options);
        this.init();
    }
    Slider.prototype.init = function () {
        // 创建图片元素
        var imgs;
        imgs = this.options.address;
        if (imgs === (null || undefined))
            throw new DOMException("can`t get img elements, Slider.js init failure.");
        else {
            var body = $("body")[0];
            var imgBox = document.createElement("div");
            imgBox.id = "imgBox";
            var i = 0;
            for (var value in imgs) {
                this.generateImg({
                    id: "img" + i,
                    classes: ["img" + i],
                    src: value,
                    farther: imgBox
                });
            }
            body.appendChild(imgBox);
        }
    };
    Slider.prototype.slide = function () {
        console.log("a");
    };
    Slider.prototype.generateImg = function (attributes) {
        var img = document.createElement("img");
        img.id = attributes.id;
        for (var claz in (attributes.classes)) {
            img.className += claz + " ";
        }
        attributes.farther.appendChild(img);
    };
    return Slider;
}());
// test
var opts = {};
var s = new Slider(opts);
