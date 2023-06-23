import {onMounted} from "vue";

// ios兼容性处理
export function useIosCompatibility() {
    onMounted(() => {
        prohibitScaling();
        // visibilityChange();
    })


    function visibilityChange() {
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') { // 解决ios等锁屏导致的socket断线不会重连问题


            }
        });
    }

    // ios双击缩放禁止
    function prohibitScaling() {
        // https://developer.mozilla.org/zh-CN/docs/Web/CSS/touch-action
        document.documentElement.style.touchAction = 'manipulation';
        document.addEventListener('touchstart', function (event) {
            if (event.touches.length > 1) {
                event.preventDefault();
            }
        });
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function (event) {
            let now = (new Date()).getTime();
            if (now - lastTouchEnd <= 200) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
        document.addEventListener('gesturestart', function (event) {
            event.preventDefault();
        });
        document.addEventListener('click', function (event) {
            const t = event.target as HTMLElement
            if (t && t.nodeName && t.nodeName.toUpperCase() === "INPUT") {
                // 排除input组件的事件委托（禁用会影响到文件上传组件 <input type='file'/>）
            } else {
                event.preventDefault();
            }

        });
        document.addEventListener('dblclick', function (event) {
            event.preventDefault();
        });
        document.addEventListener('contextmenu', function (event) {
            event.preventDefault();
        });
    }
}
