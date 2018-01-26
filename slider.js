
let divs = document.getElementsByTagName("div");
for(let i in divs){
    if( "object" != typeof divs[i]) continue;
    console.log(divs[i]);
    divs[i].style.left = `${(i) * 100}%`;
}

!function s(){
    let interval = setTimeout(() => {
        let main = document.getElementsByTagName("main")[0];
        // 移除首元素
        let firstChild = main.firstChild;
        main.removeChild(main.firstChild);
        // 添加到末尾
        main.appendChild(firstChild);
        // 处理 postion位置
        for(let i in divs){
            if( "object" != typeof divs[i]) continue;
            console.log(divs[i]);
            divs[i].style.left = `${(i) * 100 - 100}%`;
        }
        s();
    }, 1500);
}()



/**
 *  constructor
 */
function Slider(){
    let opts = {};
    Slider.prototype.opts = null;
    Slider.prototype.init = () => {};
    Slider.prototype.slider = () => {};
}



function removeClass(selector, className) {
    if (selector.className.indexOf(className) !== -1)
        selector.className = selector.className.substring(0, selector.className.indexOf(className));
}


function addEventListener(component, motivation, callback) {

    if (motivation === 'hover') {
        return component.onmouseover = () => {
            return callback();
        };
    }

    if (motivation === 'mouseLeave') {
        return component.onmouseleave = () => {
            return callback();
        };
    }

    if (motivation === 'click') {
        return component.onclick = () => {
            return callback();
        };
    }

}

function addStyle(styleSheet, selector, cssCode) {
    styleSheet.innerText += selector + '{' + cssCode + '}';
}