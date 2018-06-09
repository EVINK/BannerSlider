
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
    containerId: string,
    containerClasses: Array<string>,
    id: string,
    classes: Array<string>,
    src: string,
    farther: HTMLElement
}

interface Components {
    sheet: HTMLStyleElement,
}