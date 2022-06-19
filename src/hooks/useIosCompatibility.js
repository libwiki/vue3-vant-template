// ios兼容性处理
import {onMounted, watch} from "vue";
import {useWindowSize} from "@vant/use";

export function useIosCompatibility() {
    const {width, height} = useWindowSize();
    watch([width, height], () => {
        initIosHeight()
    });
    onMounted(() => {
        initIosHeight()
        prohibitScaling();
        // visibilityChange();
    })

    // 解决IOS端100%高度问题
    function initIosHeight() {
        // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
        // Then we set the value in the --vh custom property to the root of the document
        const vh = window.innerHeight, vw = window.innerWidth
        document.documentElement.style.setProperty('--vh', `${vh}px`)
        document.documentElement.style.setProperty('--vw', `${vw}px`)
        // We listen to the resize event
        window.addEventListener('resize', () => {
            // We execute the same script as before
            const vh = window.innerHeight, vw = window.innerWidth;
            document.documentElement.style.setProperty('--vh', `${vh}px`)
            document.documentElement.style.setProperty('--vw', `${vw}px`)
        })
    }

    function visibilityChange() {
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') { // 解决ios等锁屏导致的socket断线不会重连问题


            }
        });
    }

    // ios双击缩放禁止
    function prohibitScaling() {
        document.addEventListener('touchstart', function (event) {
            if (event.touches.length > 1) {
                event.preventDefault();
            }
        });
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function (event) {
            let now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
        document.addEventListener('gesturestart', function (event) {
            event.preventDefault();
        });
    };
}
