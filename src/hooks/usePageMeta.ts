import {reactive, toRaw} from "vue"
import _ from "lodash"

/**
 * 分页参数处理钩子
 * @param limit {number} 每页请求数量
 * @returns {{pageMeta: {count: number, limit: number, index: number, total_pages: number, isEnd: boolean}, updateLimit: updateLimit, updatePageMeta: function(page:number,count:number):void, getPageMeta: (function(index:?number): {count: number, limit: number, index: number, total_pages: number, isEnd: boolean})}}
 */
export function usePageMeta(limit = 15) {
    // 分页数据信息
    const pageMeta = reactive<IPageMeta>({ // 分页数据
        index: 1, // 当前分页 同current_page
        count: 0, // 总数据量
        limit, // 每页请求的条数
        total_pages: 0, // 总页数
        isEnd: true,
    });


    return {
        pageMeta,
        /**
         * 这是定制化是更新的pageMeta的快捷方法
         * 1、一般用于请求到列表数据成功后，更新页面数据信息
         * @param page {number}
         * @param count {number}
         */
        updatePageMeta(page: number, count = 0) {
            count = count || 0;
            if (page > 0 && page !== pageMeta.index) { // 当前的最新页码
                pageMeta.index = page;
            }
            if (count !== pageMeta.count) { // 当前的总数据量
                pageMeta.count = count || 0;
            }
            pageMeta.total_pages = Math.ceil(count / pageMeta.limit); // 总页码
            pageMeta.isEnd = pageMeta.index >= pageMeta.total_pages;
        },
        updateLimit(limit = 10) {
            pageMeta.limit = limit;
        },
        getPageMeta(index: number): IPageMeta {
            const params = _.cloneDeep(toRaw(pageMeta))
            if (index > 0) {
                params.index = index;
            }
            // delete params.isEnd
            // delete params.count
            // delete params.total_pages
            return params
        }
    };
}

export interface IPageMeta {
    index: number, // 当前分页 同current_page
    count: number, // 总数据量
    limit: number, // 每页请求的条数
    total_pages: number, // 总页数
    isEnd: boolean,
}
