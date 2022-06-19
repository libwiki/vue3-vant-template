<script setup>
import {reactive} from "vue";
import {useUserLogin} from "../../hooks/user/useUserLogin";
import {useCountDown} from "../../hooks/useCountDown";
import wxLogo from "../../assets/icons/wx_logo.png"
import Config from "../../config/Config";
import {useRoute} from "vue-router";
import {isEmpty} from "../../utils/helpers";

const route = useRoute();
const loginHelper = useUserLogin();
const countDownHelper = useCountDown();
countDownHelper.recover(); // 保证用户刷新页面时恢复倒计时

// 发送短信验证码
const onSendCode = async () => {
  if (countDownHelper.data.value > 0) { // 倒计时内禁止频繁发送短信
    return;
  }
  const success = await loginHelper.sendCode(formData.phone)
  if (success) { // 启动一个60s的倒计时
    countDownHelper.start(60)
  }

}

const formData = reactive({
  phone: "",
  code: "",
});
const onWxLogin = () => {
  const appId = Config.wxAppId;
  const href = window.location.href.replace(window.location.search, '')
  const redirectUrl = encodeURIComponent(href)
  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
}

const loginByWxCode = () => {
  const code = route.query.code;
  if (isEmpty(code)) {
    return
  }
  loginHelper.wxLogin(code)
}
loginByWxCode(); // 如果url请求链接存在code参数会认为是微信登录


</script>

<template>
  <div class="tw-pt-40 tw-px-20">
    <div class="tw-pt-24 tw-px-20 tw-rounded-12 tw-bg-white">
      <van-field
          class="tw-border-b tw-border-gray-100"
          placeholder="请输入任意的手机号码"
          type="tel"
          maxlength="11"
          v-model="formData.phone" label="手机号码"/>
      <van-field
          class="tw-border-b tw-border-gray-100"
          placeholder="任意的验证码"
          type="number"
          v-model="formData.code"
          maxlength="6"
          label="验证码">
        <template #button>
          <van-button
              :disabled="countDownHelper.data.value > 0"
              @click="onSendCode"
              size="mini" type="primary">
            {{ countDownHelper.data.value > 0 ? `${countDownHelper.data.value}s后重新获取` : "发送验证码" }}
          </van-button>
        </template>
      </van-field>
      <div class="tw-pt-50 tw-w-full">
        <VanButton @click="loginHelper.login(formData.phone,formData.code)" type="danger" round block>
          立即登录
        </VanButton>
      </div>
      <van-divider>或者</van-divider>
      <div class="row-flex-center tw-pb-50 tw-w-full">
        <van-image @click="onWxLogin" :src="wxLogo" class="tw-w-50 tw-h-auto"/>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.test {
}
</style>
