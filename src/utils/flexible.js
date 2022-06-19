import designConfig from '../../design.config';
(function flexible(window, document) {
    let docEl = document.documentElement;
    let dpr = window.devicePixelRatio || 1;
    const maxWidth = Number(designConfig.maxViewPort);
    const bisection = 10;
    const dprMultiple = 12;

    // adjust body font size
    function setBodyFontSize() {
        if (document.body) {
            document.body.style.fontSize = (dprMultiple * dpr) + 'px'
        } else {
            document.addEventListener('DOMContentLoaded', setBodyFontSize)
        }
    }

    setBodyFontSize();

    // set 1rem = viewWidth / 10
    function setRemUnit() {
        let viewWidth = docEl.clientWidth || document.body.clientWidth;
        let viewHeight = docEl.clientHeight || document.body.clientHeight;
        const clientWidth = viewWidth;
        if (viewWidth > maxWidth) {
            viewWidth = maxWidth;
        }
        if (viewWidth > viewHeight) { // 横屏时处理（设计图图是竖屏）
            viewWidth = Number(viewHeight) || viewWidth;
        }
        const paddingX = (clientWidth - viewWidth) / 2;
        let rem = viewWidth / bisection;
        sessionStorage.setItem('ROOT_FONT_SIZE', `${rem}`)
        sessionStorage.setItem('ROOT_VIEW_WIDTH', `${viewWidth}`)
        sessionStorage.setItem('ROOT_VIEW_MAX_WIDTH', `${viewWidth}`);
        sessionStorage.setItem('ROOT_PADDING_X', `${paddingX}`);

        docEl.style.fontSize = rem + 'px';
        docEl.style.setProperty('--view-width', `${viewWidth}px`);
        docEl.style.setProperty('--padding-x', `${paddingX}px`);
        docEl.style.setProperty('--max-view-port', `${maxWidth}px`);
    }

    setRemUnit()

    // reset rem unit on page resize
    window.addEventListener('resize', setRemUnit)
    window.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            setRemUnit()
        }
    })

    // detect 0.5px supports
    if (dpr >= 2) {
        let fakeBody = document.createElement('body')
        let testElement = document.createElement('div')
        testElement.style.border = '.5px solid transparent'
        fakeBody.appendChild(testElement)
        docEl.appendChild(fakeBody)
        if (testElement.offsetHeight === 1) {
            docEl.classList.add('hairlines')
        }
        docEl.removeChild(fakeBody)
    }
}(window, document))
