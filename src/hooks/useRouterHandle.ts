import _ from "lodash";
import {LocationQueryValue, useRoute, useRouter} from "vue-router";

// 解析路由参数
export function useRouterHandle() {
    const route = useRoute();
    const router = useRouter();
    return {
        route,
        router,
        async getRouteQuery(key: string, defaultVal: string | null = null): Promise<LocationQueryValue | undefined> {
            await router.isReady();
            const val = route.query[key]
            const v = _.isArray(val) ? val.pop() : val;
            return v || defaultVal
        },
    }
}