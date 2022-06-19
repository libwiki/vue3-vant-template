<script setup>
import {EventsEnum} from "../../events/EventsEnum";
import {useRefreshStore} from "../../store/refreshStore";
import {onMounted, onUnmounted} from "vue";

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
  <div>
    <p class="tw-py-10 tw-border">首页</p>
    <p class="tw-border" v-for="item in 20">test - {{ item }}</p>
    <p>end</p>
  </div>
</template>

<style lang="less" scoped>

</style>
