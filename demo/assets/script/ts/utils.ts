
/**
 * 仿造JQuery风格的查询器
 * @param selector
 */
function $(selector: string): any {
    let element: any
    let firstChar: string = selector.substr(0, 1);
    let mainSelector: string = selector.substr(1);
    switch (firstChar) {
        case '#':
            // id
            element = document.getElementById(mainSelector);
            if (element == null)
                throw new DOMException('no such a HTMLElement while id as ' + mainSelector);
            break;
        case '.':
            // class
            element = document.getElementsByClassName(mainSelector);
            if (element == null || element.length <= 0) {
                throw new DOMException('no such a HTMLCollectionOf Element while class as ' + mainSelector);
            }
            break;
        default:
            // tag
            element = document.getElementsByTagName(selector);
            if (element == null || element.length <= 0) {
                throw new DOMException('no such a NodeListOf Element while as ' + selector);
            }
            break;
    }
    return element;
}

