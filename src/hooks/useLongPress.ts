import {onUnmounted, ref} from "vue";

type longPressFunc = () => void


// 长按事件助手函数
export function useLongPress(longPress: longPressFunc, interval = 500) {

    const elRef = ref<HTMLElement | null>()

    let timer: number | null = null;

    function onPointerDown(e: PointerEvent) {
        clearTimer();
        timer = setTimeout(longPress, interval)
        e.preventDefault();
    }

    function onPointerUp() {
        clearTimer();
    }

    function onPointerMove() {
        // clearTimer();
    }

    function bindEl(el?: HTMLElement) {
        unbindEl();
        elRef.value = el;
        if (elRef.value) {
            elRef.value.addEventListener('pointerdown', onPointerDown)
            elRef.value.addEventListener('pointerup', onPointerUp)
            elRef.value.addEventListener('pointermove', onPointerMove)
        }
    }

    function clearTimer() {
        if (timer) {
            clearTimeout(timer)
            timer = null;
        }
    }

    function unbindEl() {
        if (elRef.value) {
            elRef.value.removeEventListener('pointerdown', onPointerDown)
            elRef.value.removeEventListener('pointerup', onPointerUp)
            elRef.value.removeEventListener('pointermove', onPointerMove)
            elRef.value = null;
        }

    }

    onUnmounted(unbindEl); // 页面卸载时清除事件绑定

    return {
        bindEl,
        unbindEl,
    }
}