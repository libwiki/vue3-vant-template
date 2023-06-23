import {onMounted, onUnmounted, ref} from "vue";
import {disablePageScroll, enablePageScroll} from "scroll-lock";

const events = [
    'touchmove',
    'mouseover',
];

// 用于锁定body的滚动，解决ios浏览器的上下弹性滚动问题
export function useLockPageScroll(autoLock = false) {
    const scrollRef = ref<HTMLElement | undefined>()

    // 尝试解锁某一个元素的滑动穿透（使该元素可以滑动）
    function tryUnLockScroll(el?: HTMLElement | null) {
        if (el) {
            unLockScroll(el)
        }
    }

    onMounted(() => {
        if (autoLock) { // 如果scrollRef存在则开启scrollRef的滚动效果
            lockScroll(); // 禁用body滚动（锁定body滚动效果）
            tryUnLockScroll(scrollRef.value); // 允许该元素滑动
        }
    })
    onUnmounted(() => {
        enablePageScroll();
    })

    // 禁用滚动(锁定)
    function lockScroll(el?: HTMLElement | null) {
        if (el) {
            // 禁用某元素的滑动，使该元素的滑动效果穿透，(默认会将自身滚动效果委托给body，但是body默认就是禁用滚动效果的，从而达到禁用滚动？)
            events.forEach(v => el.removeEventListener(v, handle))
        } else { // 禁用body滚动
            disablePageScroll(document.documentElement)
        }
    }

    // 开启滚动（解锁）
    function unLockScroll(el?: HTMLElement | null) {
        if (el) {
            // 解锁某个元素的滑动，禁止滑动穿透（使该元素能够自行处理滑动效果，使之自身就拥有了滚动效果？）
            events.forEach(v => el.addEventListener(v, handle))
        } else { // 开启body滚动
            enablePageScroll(document.documentElement)
        }

    }

    function handle(e: Event) {
        e.stopPropagation();// 禁止滑动穿透
    }

    return {
        scrollRef,
        tryUnLockScroll,
        lockScroll,
        unLockScroll,
    }
}