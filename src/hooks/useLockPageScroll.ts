import {onMounted, onUnmounted, ref} from "vue";
import {disablePageScroll, enablePageScroll} from "scroll-lock";

const events = [
    'touchmove',
    'mouseover',
];

// 用于锁定body的滚动，解决ios浏览器的上下弹性滚动问题
export function usePageScrollHelper(autoEnabled = true) {
    const scrollRef = ref<HTMLElement | undefined>()


    function tryScroll(el?: HTMLElement | null) {
        if (el) {
            enableScroll(el)
        }
    }

    onMounted(() => {
        disableScroll(); // 默认禁用body滚动
        if (autoEnabled) { // 如果scrollRef存在则开启scrollRef的滚动效果
            tryScroll(scrollRef.value)
        }
    })
    onUnmounted(() => {
        enablePageScroll();
    })

    // 禁用滚动
    function disableScroll(el?: HTMLElement | null) {
        if (el) {
            events.forEach(v => el.removeEventListener(v, handle))
        } else { // 禁用body滚动
            disablePageScroll(document.documentElement)
        }
    }

    // 开启滚动
    function enableScroll(el?: HTMLElement | null) {
        if (el) {
            events.forEach(v => el.addEventListener(v, handle))
        } else { // 开启body滚动
            enablePageScroll(document.documentElement)
        }

    }


    function handle(e: Event) {
        e.stopPropagation()
    }

    return {
        scrollRef,
        tryScroll,
        disableScroll,
        enableScroll,
    }
}