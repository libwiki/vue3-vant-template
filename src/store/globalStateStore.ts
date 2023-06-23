import {defineStore} from "pinia";
import {reactive} from "vue";
import _ from "lodash";

// 全局的状态，此处仅有一个网络的请求状态，关联到每一次的net接口请求状态
export const useGlobalStateStore = defineStore("globalState", () => {
    const state = reactive({
        loading: false
    })
    return {
        state,
        toggleLoading(loading: boolean) {
            state.loading = _.isBoolean(loading) ? loading : !state.loading;
            return state.loading;
        },
    };
});