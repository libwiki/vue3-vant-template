import safeAreaInsets from "safe-area-insets";
import {computed, onMounted, onUnmounted, reactive} from "vue";
import {px2vw} from "@/utils/helpers";

// 获取ios的上下安全区域
export function useSafeArea(defaultVal: ISafeAreaDatum = {bottom: 10, top: 20}) {
    const insets = reactive<ISafeAreaDatum>({})

    function init() {
        insets.top = safeAreaInsets.top;
        insets.left = safeAreaInsets.left;
        insets.right = safeAreaInsets.right;
        insets.bottom = safeAreaInsets.bottom;
    }

    const topHeightStyle = computed(() => {
        return {
            height: getSafeVal('top')
        }
    })
    const topPaddingStyle = computed(() => {
        return {
            paddingBottom: getSafeVal('top')
        }
    })

    const bottomHeightStyle = computed(() => {
        return {
            height: getSafeVal('bottom')
        }
    })
    const bottomPaddingStyle = computed(() => {
        return {
            paddingBottom: getSafeVal('bottom')
        }
    })


    function getSafeVal(key: keyof ISafeAreaDatum): string {
        const item = insets[key];
        if (item) {
            return `${item}px`
        }
        const v = defaultVal[key]
        if (v) {
            return px2vw(v);
        }
        return '0px';

    }

    onMounted(() => {
        init();
        safeAreaInsets.onChange(init)
    })
    onUnmounted(() => {
        safeAreaInsets.offChange(init)
    })
    return {
        insets,
        getSafeVal,
        topHeightStyle,
        topPaddingStyle,
        bottomHeightStyle,
        bottomPaddingStyle,
    }
}

export interface ISafeAreaDatum {
    left?: number,
    top?: number,
    right?: number,
    bottom?: number,
}