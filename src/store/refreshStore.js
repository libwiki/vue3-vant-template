import {defineStore} from "pinia";

export const useRefreshStore = defineStore('pageRefresh', {
    state() {
        return {
            loading: false,
        }
    }
})
