# BannerSlider , an original javascript plugin for web designer

### Step 1 <br/>
  import BannerSlider.js to your page.<br/>
  ```javascript
  <script charset="UTF-8" src="BannerSlider.js"></script>
  ```
  
### Step 2 <br/>
  easy to use.<br/>
```javascript
  let slider = new Slider();
    slider.opts = {
        address: ["http://file1.wailian.work/2017/06/23/bgimg_1.jpg",
            "http://file1.wailian.work/2017/06/23/bgimg_2.jpg",
            "http://file1.wailian.work/2017/06/23/bgimg_3.jpg",
            ...,
            "http://file1.wailian.work/2017/06/23/bgimg_n.jpg"],
        method: "leftSlide",    // 可选参数
        containerId: 'body',    // 可选参数
        duration: '1.5s', // 可选参数
        delay: 2000     //  可选参数
    };
    slider.init();
```
> method parameters are listed here 

```javascript
    'easy','leftSlide','rightSlide','upSlide','downSlide','expandX','roll','random'
```
