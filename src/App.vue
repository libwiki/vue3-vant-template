<script setup>
import {isFalse, isTrue, px2vw} from "./utils/helpers";
import {useRoute, useRouter} from "vue-router";
import {computed, ref, watch} from "vue";
import {useRefreshStore} from "./store/refreshStore";
import {useIosCompatibility} from "./hooks/useIosCompatibility";
import Config from "./config/Configs";
import TabbarConfig from "./config/TabbarConfig";
import AuthHelpers from "@/utils/AuthHelpers";
import {refreshSubInstance} from "@/rxjs/RefreshSubject";

const $route = useRoute();
AuthHelpers.syncUserinfo(false); // 初始化登录用户的信息到store中
useIosCompatibility(); // ios适配


// 是否有顶部导航栏
const hasNavBar = computed(() => {
  return isTrue($route.meta.navbar);
});


// 是否显示返回按钮
const showBack = computed(() => {
  return isTrue($route.meta.showBack);
})
// 是否有底部菜单栏
const hasTabBar = computed(() => {
  return isTrue($route.meta.tabbar);
});
const routeName = computed(() => {
  return $route.name;
})
const bodyStyle = computed(() => {
  const meta = $route.meta || {};
  const styles = meta.pageStyle || {};
  if (meta.pageBgColor) {
    styles.backgroundColor = meta.pageBgColor;
  }
  return styles;
})


// 导航栏索引
const tabBarIndex = ref(TabbarConfig.defaultIndex);

watch(routeName, (val) => { // 监听路由变化设置当前菜单索引（刷新页面时自动索引菜单）
  const index = TabbarConfig.data.findIndex(v => v.routeName === val)
  if (index > -1 && tabBarIndex.value !== index) {
    tabBarIndex.value = index;
  }
})

// 全局主题配置
const themeVars = {
  dividerMargin: '0.5rem',

}
const refreshStore = useRefreshStore()

function onRefresh() {
  // 触发下拉刷新页面，对应的页面需要实现下拉刷新的具体逻辑
  refreshSubInstance.next();
}

const configProviderClass = computed(() => {
  return {
    'tw-max-w-view-port': true,
    'config-provider': true,
    'padding-nav-bar': hasNavBar.value,
    'padding-tab-bar': hasTabBar.value
  }
});
const router = useRouter();
const onBack = () => {
  if (window.history.length > 1) { // 可后退的
    router.back();
  } else { // 否则直接到首页
    router.replace({name: Config.homeRouteName})
  }
}
</script>

<template>
  <van-pull-refresh
      class="tw-px-position-center tw-min-h-screen"
      :disabled="isFalse($route.meta.refresh)"
      v-model="refreshStore.loading"
      @refresh="onRefresh">
    <van-config-provider
        :class="configProviderClass"
        :style="bodyStyle"
        :theme-vars="themeVars">
      <!--顶部导航栏 start-->
      <van-nav-bar
          fixed
          class="tw-mx-position-center tw-max-w-view-port"
          safe-area-inset-top
          v-if="hasNavBar"
          @click-left="onBack">
        <template #left>
          <van-icon v-if="showBack" :size="px2vw(17)" name="arrow-left" color="#27292B"/>
        </template>
        <template #title>
          <span class="tw-text-dark tw-text-17 tw-font-normal tw-leading-26">
            {{ $route.query._title || $route.meta.title }}
          </span>
        </template>
      </van-nav-bar>
      <!--顶部导航栏 end-->
      <router-view></router-view>

      <!--底部菜单栏 start-->
      <van-tabbar
          class="tw-mx-position-center tw-max-w-view-port"
          v-model="tabBarIndex" v-if="hasTabBar"
          @change="i=>$router.push({name:(TabbarConfig.data||[{}])[i].routeName})">
        <van-tabbar-item v-for="(item,i) of TabbarConfig.data||[]" :key="i">
          <span :class="i===tabBarIndex?'tw-text-dark':'tw-text-light'">{{ item.title }}</span>
          <template #icon>
            <van-icon :name="i===tabBarIndex?item.iconActive:item.icon"/>
          </template>
        </van-tabbar-item>
      </van-tabbar>
      <!--底部菜单栏 end-->

    </van-config-provider>
  </van-pull-refresh>
</template>

<style lang="less" scoped>
.config-provider {
  z-index: -1;
  min-height: 100vh;
  box-sizing: border-box;

  &.padding-nav-bar {
  @apply tw-pt-46; // vant顶部导航栏默认高度为46px（这里使用了tailwindcss 的@apply指令）
  }

  &.padding-tab-bar {
  @apply tw-pb-50; // vant底部导航栏默认高度为50px（这里使用了tailwindcss 的@apply指令）
  }
}


</style>
