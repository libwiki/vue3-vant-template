import {reactive, toRaw} from "vue"
import _ from "lodash"
import {IPageBaseMeta} from "@/api/entity/globals";

/**
 * 分页参数处理钩子
 */
export function usePageMeta(limit = 15) {
    // 分页数据信息
    const pageMeta = reactive<IPageBaseMeta>({ // 分页数据
        current_page: 1, // 当前分页
        total: 0, // 总数据量
        total_pages: 0, // 总页数
        per_page: limit, // 每页请求的条数
        isEnd: true,
    });


    return {
        pageMeta,
        /**
         * 这是定制化是更新的pageMeta的快捷方法
         * 1、一般用于请求到列表数据成功后，更新页面数据信息
         * @param current_page {number}
         * @param total {number}
         */
        updatePageMeta(current_page: number, total = 0) {
            total = total || 0;
            if (current_page > 0 && current_page !== pageMeta.current_page) { // 当前的最新页码
                pageMeta.current_page = current_page;
            }
            if (total !== pageMeta.total) { // 当前的总数据量
                pageMeta.total = total || 0;
            }
            pageMeta.total_pages = Math.ceil(total / pageMeta.per_page); // 总页码
            pageMeta.isEnd = pageMeta.current_page >= pageMeta.total_pages;
        },
        updateLimit(per_page = 15) {
            pageMeta.per_page = per_page;
        },
        getPageMeta(current_page: number): IPageBaseMeta {
            const params = _.cloneDeep(toRaw(pageMeta))
            if (current_page > 0) {
                params.current_page = current_page;
            }
            return params
        }
    };
}
