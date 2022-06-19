<script setup>
import {useRefreshStore} from "../../store/refreshStore";
import {EventsEnum} from "../../events/EventsEnum";
import {onMounted,onUnmounted} from "vue";

const refreshStore = useRefreshStore()
onMounted(() => { // 页面渲染时进行事件监听
  window.emitter.on(EventsEnum.onRefresh, () => {
    console.log('下拉刷新触发')
    refreshStore.loading = false; // 关闭下拉刷新动画
  }); // 监听处理页面的下拉刷新事件
})

onUnmounted(() => { // 离开页面时移除事件监听
  window.emitter.off(EventsEnum.onRefresh)
})
</script>

<template>
  分类页面
</template>

<style lang="less" scoped>

</style>
