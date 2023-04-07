<script lang="ts" setup>
import {useRefresh} from "@/hooks/useRefresh";

const refreshHelper = useRefresh();

refreshHelper.onRefresh(v => { // 监听处理页面的下拉刷新事件
  console.log('下拉刷新触发')
  refreshHelper.toggleLoading(false) // 关闭下拉刷新动画
})
</script>

<template>
  <div>
    <p class="tw-py-10 tw-border">首页</p>
    <p class="tw-border" v-for="item in 20">test - {{ item }}</p>
    <p>end</p>
  </div>
</template>

<style lang="less" scoped>

</style>
