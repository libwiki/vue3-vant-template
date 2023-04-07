<script setup>
import {useRefresh} from "@/hooks/useRefresh";

const refreshHelper = useRefresh();

refreshHelper.onRefresh(v => { // 监听处理页面的下拉刷新事件
  console.log('下拉刷新触发')
  refreshHelper.toggleLoading(false) // 关闭下拉刷新动画
})
</script>

<template>
  分类页面
</template>

<style lang="less" scoped>

</style>
