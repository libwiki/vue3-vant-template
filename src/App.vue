<script lang="ts" setup>
import {isFalse, isTrue, px2vw} from "@/utils/helpers";
import {useRoute, useRouter} from "vue-router";
import {computed, ref, watch} from "vue";
import {useRefreshStore} from "@/store/refreshStore";
import {useIosCompatibility} from "@/hooks/useIosCompatibility";
import Config from "./config/Configs";
import TabbarConfig from "./config/TabbarConfig";
import AuthHelpers from "@/utils/AuthHelpers";
import {refreshSubInstance} from "@/rxjs/RefreshSubject";
import SizeBox from "@/components/SizeBox.vue";
import {useLockPageScroll} from "@/hooks/useLockPageScroll";
import SysSetting from "@/config/SysSetting";

const route = useRoute();
const {scrollRef} = useLockPageScroll(SysSetting.lockBodyScroll);
AuthHelpers.syncUserinfo(false); // 初始化登录用户的信息到store中
useIosCompatibility(); // ios适配


// 是否有顶部导航栏
const hasNavBar = computed(() => {
  return !isTrue(route.meta.hideNavbar);
});


// 是否显示返回按钮
const showBack = computed(() => {
  return isTrue(route.meta.showBack);
})
// 是否有底部菜单栏
const hasTabBar = computed(() => {
  return isTrue(route.meta.tabBar);
});
const routeName = computed(() => {
  return route.name;
})
const bodyStyle = computed(() => {
  const meta = route.meta || {};
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
  <van-config-provider
      :class="configProviderClass"
      :style="bodyStyle"
      :theme-vars="themeVars">
    <div class="app-main">
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
            {{ route.query._title || route.meta.title }}
          </span>
        </template>
      </van-nav-bar>
      <!--顶部导航栏 end-->

      <!--顶部导航栏的填充 start-->
      <SizeBox class="nav-bar-placeholder-box" v-if="hasNavBar"/>
      <!--顶部导航栏的填充 end-->


      <div ref="scrollRef" class="tw-flex-1 tw-overflow-y-auto">
        <van-pull-refresh
            :disabled="isFalse($route.meta.refresh)"
            v-model="refreshStore.loading"
            @refresh="onRefresh">
          <router-view></router-view>
        </van-pull-refresh>
      </div>

      <!--底部菜单栏的填充 start-->
      <SizeBox :height="50" v-if="hasTabBar"/>
      <!--底部菜单栏的填充 end-->

      <!--底部菜单栏 start-->
      <van-tabbar
          class="tw-mx-position-center tw-max-w-view-port"
          v-model="tabBarIndex" v-if="hasTabBar"
          @change="i=>router.push({name:(TabbarConfig.data||[{}])[i].routeName})">
        <van-tabbar-item v-for="(item,i) of TabbarConfig.data||[]" :key="i">
          <span :class="i===tabBarIndex?'tw-text-dark':'tw-text-light'">{{ item.title }}</span>
          <template #icon>
            <van-icon :name="i===tabBarIndex?item.iconActive:item.icon"/>
          </template>
        </van-tabbar-item>
      </van-tabbar>
      <!--底部菜单栏 end-->
    </div>
  </van-config-provider>
</template>

<style lang="less" scoped>
.config-provider {
  z-index: -1;
  user-select: none;
  box-sizing: border-box;

  .app-main {
    height: 100vh;
    .flex-col();
    width: 100%;


    .nav-bar-placeholder-box { // 顶部导航栏的填充
      height: var(--van-nav-bar-height);
    }
  }


}


</style>
