import {onUnmounted, ref} from "vue";
import {Subscription} from "rxjs/internal/Subscription";

// 一个自动关闭rxjs订阅的助手
export function useSocketSubAutoClose() {
    const socketSub = ref<Subscription[]>([])

    function closeSub() {
        socketSub.value.map(v => v.unsubscribe())
        socketSub.value = [];
    }

    onUnmounted(closeSub)
    return {
        socketSub,
        closeSub,
        push(sub: Subscription) {
            socketSub.value.push(sub)
        }
    }
}