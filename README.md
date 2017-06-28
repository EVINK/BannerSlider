# BannerSlider , an original javascript plugin for web designer

### Step 1 导入文件到页面<br/>

```javascript
<script charset="UTF-8" src="BannerSlider.js"></script>
```
  
### Step 2 基础用法<br/>

#### Quickly Peeking / 快速预览.<br/>

```javascript
new Slider().init();
```
#### Basic Usage / 基础用法 .<br/>

```javascript
  let slider = new Slider();
    slider.opts = {
        address: ["http://file1.wailian.work/2017/06/23/bgimg_1.jpg",
            "http://file1.wailian.work/2017/06/23/bgimg_2.jpg",
            "http://file1.wailian.work/2017/06/23/bgimg_3.jpg",
            ...,
            "http://file1.wailian.work/2017/06/23/bgimg_N.jpg"],
        method: 'leftSlide',     // 可选参数
        indicatorStyle: 'thumb', // 可选参数
        containerId: 'body',     // 可选参数
        duration: '1.5s',        // 可选参数
        delay: 2000              // 可选参数
    };
    slider.init();
```
> method parameters are listed here /  滑动方式的参数在下面列出 .<br/>

```javascript
    'easy',       // 默认  透明渐变
    'leftSlide',  // 左侧划入
    'rightSlide', // 右侧划入
    'upSlide',    // 由上而下
    'downSlide',  // 由下而上
    'expandX',    // 横向扩展
    'roll',       // 60°翻转
    'random'      // 从以上的滑动方法随机选择一个
```
> indicatorStyle parameters are listed here / 高亮指示的参数在下面列出 .<br/>

```javascript
    'dot',       // 默认  小圆点
    'vertical',  // 右侧垂直 小圆点
    'thumb'      // 小图模式
```

> BannerSlider width/height depends on container`s width or heright.

```html
<div id="containerId" style="width: 500px; height: 300px; "></div>
```

### Step 3 自定义高亮指示和图片点击事件<br/> 

#### Advanced Usage.<br/>

> customize highlight indicator / 自定义高亮指示.<br/>

```javascript
  let slider = new Slider();
    slider.opts = {
        address: ["http://file1.wailian.work/2017/06/23/bgimg_1.jpg",
            "http://file1.wailian.work/2017/06/23/bgimg_2.jpg",
            "http://file1.wailian.work/2017/06/23/bgimg_3.jpg",
            ...,
            "http://file1.wailian.work/2017/06/23/bgimg_N.jpg"],
        customIndicator: true,
        indicatorCodes: ['highlightOn css codes']
        //or ...
        //indicatorCodes: ['highlightOff css codes','highlightOn css codes']
        //indicatorCodes: ['highlightBox css codes','highlightOff css codes','highlightOn css codes']
    };
    slider.init();
```

indicatorCodes是一个数组，支持至多3个string元素，每个string是一串css代码<br/>
由此，可以高度自定义只属于你自己的图片指示器<br/>

> images click events / 图片点击事件.<br/>

```javascript
  let callback = [];
  for(let i = 0 ;i<N; i++){
        callback[i] = function () {
            open('http://www.evink.tk','_blank');
        }
  }
  let slider = new Slider();
    slider.opts = {
        address: ["http://file1.wailian.work/2017/06/23/bgimg_1.jpg",
            "http://file1.wailian.work/2017/06/23/bgimg_2.jpg",
            "http://file1.wailian.work/2017/06/23/bgimg_3.jpg",
            ...,
            "http://file1.wailian.work/2017/06/23/bgimg_N.jpg"],
        hasClick: true,
        callback: callback
        // or ...
        // callback: [func1(), func2(), func3() ,... ,funcN()]
    };
    slider.init();
```
