import {ref} from "vue"

export function usePageMeta(limit = 10) {
    // 分页数据信息
    const pageMeta = ref({ // 分页数据
        index: 1, // 当前分页 同current_page
        count: 0, // 总数据量
        limit, // 每页请求的条数
        total_pages: 0, // 总页数
        isEnd: true,
    });

    /**
     * 这是定制化是更新的pageMeta的快捷方法
     * 1、一般用于请求到列表数据成功后，更新页面数据信息
     * @param page {number}
     * @param count {number}
     */
    function updatePageMeta(page, count = 0) {
        if (page !== pageMeta.value.index) { // 当前的最新页码
            pageMeta.value.index = page;
        }
        if (count !== pageMeta.value.count) { // 当前的总数据量
            pageMeta.value.count = count;
        }
        pageMeta.value.total_pages = Math.ceil(count / pageMeta.value.limit); // 总页码
        pageMeta.value.isEnd = pageMeta.value.index >= pageMeta.value.total_pages;
    }

    return {
        pageMeta,
        updatePageMeta,
    };
}
