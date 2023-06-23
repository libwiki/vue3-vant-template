import {defineStore} from "pinia";
import _ from "lodash";
import {ref} from "vue";

export const useRefreshStore = defineStore('useRefreshStore', () => {
    const loading = ref<boolean>(false)
    return {
        loading,
        toggleLoading(val?: boolean) {
            val = _.isBoolean(val) ? val : !loading.value;
            loading.value = val;
        }
    }

})
