import _ from "lodash";
import {ref, toRaw} from "vue";

/**
 * 简单的表单数据，仅仅实现了重置功能
 * @param data
 */
export function useSimpleFormMeta<T = any>(data: T) {
    const loading = ref(false)
    const formData = ref<T>(_.cloneDeep(data))
    const _value = _.cloneDeep(formData.value)
    return {
        loading,
        formData, // 当前的数据 Ref<T>
        // 还原数据到初始状态
        reset() {
            formData.value = _.cloneDeep(_value);
        },
        toggleLoading(state: boolean) {
            loading.value = state;
        },
        getFormData() { // 取表单数据（会进行拷贝处理）
            return _.cloneDeep(toRaw(formData.value));
        },
    }
}
