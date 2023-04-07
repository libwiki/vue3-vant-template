import {onUnmounted, reactive} from "vue";
import {Subscription} from "rxjs";
import {refreshSubInstance} from "@/rxjs/RefreshSubject";
import {SubscribeObserverFunc} from "@/rxjs/BaseSubject";
import {useRefreshStore} from "@/store/refreshStore";

export function useRefresh(autoRelease: boolean = true) {
    const refreshStore = useRefreshStore()
    const state = reactive<{
        subject?: Subscription | null
    }>({})


    function subscribe(func: SubscribeObserverFunc<boolean>): Subscription {
        unSubscribe();
        const sub = refreshSubInstance.subscribe(func)
        state.subject = sub;
        return sub;
    }

    function unSubscribe() {
        if (state.subject) {
            state.subject.unsubscribe();
            state.subject = null;
        }
    }

    onUnmounted(() => {
        if (autoRelease) { // 自动释放
            unSubscribe();
        }
    })

    return {
        loading: refreshStore.loading,
        subscribe,
        onRefresh: subscribe,
        unSubscribe,
        getSubject() {
            return state.subject
        },
        toggleLoading(val?: boolean) {
            refreshStore.toggleLoading(val)
        }
    }
}