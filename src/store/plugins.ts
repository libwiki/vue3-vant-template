import _ from "lodash";
import {Store} from "pinia";

// 扩展pinia的功能，给所有的store添加$reset方法，用于重置store到初始状态
export function StoreResetPlugin({store}: { store: Store }) {
    const initialState = _.cloneDeep(store.$state);
    store.$reset = () => store.$patch(_.cloneDeep(initialState));
}