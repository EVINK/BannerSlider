/// <reference path="utils.ts" />

// import { $ } from "./utils" module = commonjs


class IMGArray {
    private _arr: Array<any> = []

    get arr() {
        console.log('GETTER')
        return this._arr
    }

    set arr(value) {
        console.warn('set function has been banned for IMGArray')
    }

    public push(value: any) {
        console.log(1111)
        return this._arr.push(value)
    }

    public pop() {
        return this._arr.pop()
    }

}


/**
 * Slider主类
 * @constructor
 */
class Slider {

    // 程序暴露给外部调用的默认配置
    public options: Options = {
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
    }

    // 程序初始化时所创造的组件
    private components: Components = {} as any

    // imgsConponents
    private imgsComponents: Array<Components> = []

    // 存放组件的样式
    private styles = {
        // class
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
        // id
    }

    private body = document.body

    // 构造函数
    constructor(options: Options) {
        this.options = Object.assign(this.options, options)
        this.init()
        this.slide()
    }

    // 初始化图片组件
    private init() {

        // 创建sheet
        this.generateStyleSheet()

        // 创建图片元素
        let imgs: Array<string> | undefined
        imgs = this.options.address
        if (imgs === (null || undefined))
            throw new DOMException('can`t get img elements, Slider.js init failure.')

        if (this.options.containerId === 'body')
            this.body = window.document.body
        else
            this.body = $('#' + this.options.containerId as string)
        const imgBox: HTMLDivElement = document.createElement('div')
        imgBox.id = 'slider-img-box'
        let i: number = 5
        let imgContainers: Array<HTMLDivElement> = new Array()
        let imgElements: Array<HTMLImageElement> = new Array()
        // 生成第一遍
        for (let value of imgs) {
            let img = this.generateImg({
                containerId: `slider-img-container-${i}`,
                containerClasses: [`slider-img-containers`],
                id: `slider-img-${i}`,
                classes: ['slider-img'],
                src: value,
                farther: imgBox
            }, i, imgs.length)
            i++
            imgContainers.push(img[0])
            imgElements.push(img[1])
            this.imgsComponents.push(img[0])
        }
        // 记录起始图片
        this.components.startImg = imgElements[0]
        this.components.startImgContainer = imgContainers[0]

        // // 生成第二遍
        // for (let value of imgs) {
        //     let img = this.generateImg({
        //         containerId: `slider-img-container-${i}`,
        //         containerClasses: [`slider-img-containers`],
        //         id: `slider-img-${i}`,
        //         classes: ['slider-img'],
        //         src: value,
        //         farther: imgBox
        //     }, i, imgs.length)
        //     i++
        //     imgContainers.push(img[0])
        //     imgElements.push(img[1])
        // }
        // 记录结尾图片
        this.components.endImg = imgElements[imgElements.length - 1]
        this.components.endImgContainer = imgContainers[imgContainers.length - 1]

        this.body.appendChild(imgBox)

        this.components.imgBox = imgBox
        this.components.imgContainers = imgContainers
        this.components.imgs = imgElements

    }

    /**
     *
     * @param attributes
     * @param i
     * @param imgsLength
     * @returns Array<HTMLDivElement, HTMLImgElement>
     */
    private generateImg(attributes: ImgAttribute, i: number, imgsLength: number): Array<any> {
        let originalIndex = i
        let container: HTMLDivElement = document.createElement('div')
        container.id = attributes.containerId
        for (let claz of (attributes.containerClasses)) {
            container.className += claz + ` `
        }
        let img: HTMLImageElement = document.createElement('img')
        img.id = attributes.id
        for (let claz of (attributes.classes)) {
            img.className += claz + ` `
        }
        img.src = attributes.src
        container.appendChild(img)
        attributes.farther.appendChild(container)

        // 位移
        let displaceMent
        if (i >= imgsLength) {
            i = i - imgsLength - 1
            displaceMent = i * 100
        } else {
            displaceMent = (imgsLength - i + 1) * -100
        }
        let style = ` #slider-img-box #${container.id} {
                        left: ${displaceMent}%
                    }`

        // 添加keyframe
        if (originalIndex != 1) {
            // i为1时， 该元素会被动态的移除
            let keyframe = ` @keyframes slide-${originalIndex} {
                0% {
                    left: ${displaceMent}%;
                }
                100% {
                    left: ${displaceMent - 100}%;
                }
            }`
            this.appendToSheet(keyframe)
        }

        this.appendToSheet(style)

        return [container, img]
    }

    private generateStyleSheet() {
        const html = $('html')[0]
        let sheet = document.createElement('style')
        sheet.id = 'slider-sheet'
        sheet.className = 'slider-sheet'
        html.insertBefore(sheet, document.body)
        this.components.sheet = sheet
        this.appendToSheet(this.styles.imgBox)
        this.appendToSheet(this.styles.imgContainers)
        this.appendToSheet(this.styles.imgs)
        return sheet
    }

    private appendToSheet(style: string) {
        this.components.sheet.innerHTML += style
        this.components.sheet.innerHTML += '\n'
    }

    // 添加进入动画
    private addInAnimations(originalIndex: number) {

    }

    // 添加退出动画
    private addOutAnimations(originalIndex: number) {

    }

    // 核心逻辑:滑动
    // TODO： 此方法不应该耦合， 传入起始组件， 长度
    slide() {
        console.log('slide')
        setInterval(() => {
            console.log(1)
            this.containerSlideEvent()
        }, 1000)
    }

    containerSlideEvent() {
        let containers = this.components.imgContainers
        console.log(containers[0])

        // let imgLength = containers.length
        // let i = 0
        // for (let container of containers) {
        //     let id = container.id
        //     this.appendToSheet(`#${id}{
        //         animation: slide-${i + 1} 1s;
        //         animation-fill-mode: forwards;
        //     }`)

        //     i++
        // }

    }

    private imgsOnChange(img: Components) {

    }


}


// @example
let opts: { EvinK?: any } = {
}

let arr = []
// let s = new Slider(opts)





