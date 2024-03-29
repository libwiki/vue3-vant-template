<script lang="ts" setup>
import {useUserStore} from "@/store/userStore";
import {showConfirmDialog, showToast} from "vant";
import {px2vw} from "@/utils/helpers";
import _ from "lodash";
import AuthHelpers from "@/utils/AuthHelpers";
import {useRouter} from "vue-router";
import Configs from "@/config/Configs";
import {useRefresh} from "@/hooks/useRefresh";

const router = useRouter();
const userStore = useUserStore();

const refreshHelper = useRefresh();

refreshHelper.onRefresh(v => { // 监听处理页面的下拉刷新事件
  console.log('下拉刷新触发')
  refreshHelper.toggleLoading(false) // 关闭下拉刷新动画
})

async function onLogout() {
  try {
    await showConfirmDialog({
      title: '提示',
      message: '确定退出登录吗？',
    });
    AuthHelpers.removeUserInfo()
    await router.replace({name: Configs.loginRouteName})
  } catch (e) {
    if (_.isString(e)) {
      return
    }
    showToast(e.message)
  }
}
</script>

<template>
  <div class="tw-relative tw-flex tw-flex-col tw-justify-between header-box">
    <div class="tw-bg-red-500 tw-z-0 header-box-bg"></div>
    <div class="tw-flex tw-z-0 tw-flex-row tw-px-15 tw-flex-1 header">
      <div class="flex-row tw-text-white tw-leading-26 tw-px-15">
        <div>
          <van-image
              round
              :width="px2vw(50)"
              :height="px2vw(50)"
              src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"/>
        </div>
        <div class="tw-px-10">
          <div class="tw-text-18">{{ userStore.userinfo.info.nickname }}</div>
          <div class="tw-text-14 tw-text-gray-100">
            {{ userStore.userinfo.info.sex === 'female' ? '男生' : '女生' }}
          </div>
        </div>
      </div>
    </div>
    <div
        class="tw-bg-white tw-z-0 tw-mx-15 tw-px-20 tw-rounded-12 tw-shadow-sm tw-flex tw-flex-row  tw-justify-between account-box">
      <div class="tw-flex tw-flex-row tw-items-center tw-text-16 tw-text-dark">
        <van-icon class="tw-text-16 tw-mr-5" name="paid"/>
        <div>我的卡包</div>
      </div>
      <div class="tw-flex tw-flex-row tw-items-center">
        <VanButton @click="$router.push({name:'coupons'})" class="tw-px-10" size="mini" type="danger" round>
          查看
        </VanButton>
      </div>
    </div>
  </div>
  <div class="tw-py-15">
    <van-cell-group class="tw-shadow-sm" inset>
      <van-cell @click="onLogout" title="退出登录" is-link/>
    </van-cell-group>
  </div>
</template>

<style lang="less" scoped>
@headerBoxHeight: 220px;
@accountBoxHeight: 70px;
.header-box {
  height: @headerBoxHeight;

  .header-box-bg {
    position: absolute;
    //z-index: -1;
    width: 100%;
    height: (@headerBoxHeight - @accountBoxHeight/2);
  }

  .header {
    padding-top: 80px;
  }

  .account-box {
    height: @accountBoxHeight;
  }
}
</style>
