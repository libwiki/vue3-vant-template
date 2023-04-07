import {defineStore} from "pinia";
import _ from "lodash";

export const useRefreshStore = defineStore('pageRefresh', {
    state() {
        return {
            loading: false,
        }
    },
    actions: {
        toggleLoading(val?: boolean) {
            val = _.isBoolean(val) ? val : !this.loading;
            this.loading = val;
        }
    }
})
