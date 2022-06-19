<script setup>
import {ref} from "vue"

const props = defineProps({
  name: String, // 名称
  statusText: String, // 状态
  time: String, // 时间
  timeLabel: {
    type: String,
    default: '有效期'
  }, // 状态
  code: [String, Number], // 卡号
  value: [String, Number], // 面值
  phone: [String, Number], // 联系电话
  disabled: Boolean, // 是否禁用
  showUseText: Boolean, // 是否隐藏按钮
  useText: {
    type: String,
    default: '去使用',
  }
});

const showPopover = ref(false);
const emits = defineEmits(['click', 'togglePopover'])
const onClick = (e) => {
  if (showPopover.value) {
    showPopover.value = false;
  }
  emits("click", e);
}
const onShowPopover = (e) => {
  showPopover.value = !showPopover.value;
  emits("togglePopover", showPopover.value);
}
</script>

<template>
  <div :class="`ticket-container ${props.disabled?'disabled':''}`" @click="onClick">
    <div class="tw-flex tw-flex-col tw-bg-white tw-rounded-12 tw-mb-10 ticket-box">
      <div class="tw-flex-1 tw-rounded-t-12 ticket-body">
        <div class="tw-flex tw-flex-row tw-justify-between tw-pt-20 tw-px-15">
          <div class="tw-text-16 tw-text-dark tw-truncate tw-flex-1">
            {{ name }}
          </div>
          <div class="tw-text-red-500">
            <span class="tw-text-12">￥</span>
            <span class="tw-text-28">{{ value }}</span>
          </div>
        </div>
        <div class="tw-text-12 tw-leading-25 tw-px-15 tw-text-dark tw-truncate">
          卡号: {{ code }}
        </div>
        <div v-if="phone&&phone.length>0" class="tw-text-12 tw-leading-25 tw-px-15 tw-text-dark tw-truncate">
          客服电话: {{ phone }}
        </div>
      </div>
      <div class="divider-box">
        <div class="divider"></div>
      </div>
      <div class="tw-flex tw-flex-row tw-justify-between tw-leading-40 tw-px-15">
        <!--<div @click.stop="onShowPopover" class="tw-flex tw-z-10 tw-flex-row tw-items-center tw-text-light tw-text-14">-->
        <!--  <span>使用规则</span>-->
        <!--  <van-icon name="arrow-down"/>-->
        <!--</div>-->
        <div class="tw-flex tw-flex-row tw-items-center tw-text-light tw-text-12 tw-text-light">
          <span>{{ timeLabel }}：</span>
          <span>{{ time }}</span>
        </div>
        <div>
          <span class="tw-text-12 tw-text-light tw-px-5">{{ statusText }}</span>
          <VanTag v-if="showUseText" :color="props.disabled?'#D8D8D8':''" type="danger" size="medium" round plain>
            {{ props.useText }}
          </VanTag>
        </div>
      </div>
    </div>

    <!--使用规则弹框 start-->
    <div class="popover-box" v-if="showPopover" @click.stop>
      <div class="tw-rounded-12 tw-text-dark tw-leading-24 popover-content">
        <p>1、可与其他类型券叠加使用；可循环使用； </p>
        <p>2、部分商品不参与优惠券活动；</p>
        <p>3、同类券不可叠加使用；</p>
        <p>4、恶意购买或利用程序漏洞等行为，我司有权取消优惠资格。</p>
      </div>
    </div>
    <!--使用规则弹框 end-->


  </div>
</template>

<style lang="less" scoped>
@dividerDotSize: 15px;
@dividerDotColor: #f8f8f8;
@dividerDotMargin: 20px;

.ticket-container {
  position: relative;
  user-select: none;
  //filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.1));

  .popover-box { // 使用规则弹框
    width: 100%;
    position: absolute;
    top: 130px;
    font-size: 14px;
    z-index: 99999;

    .popover-content {
      position: relative;
      width: auto;
      height: auto;
      padding: 10px;
      background-color: #ffffff;
      filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.2));

      &:before {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        top: -19px;
        left: 30px;
        border: solid 10px transparent;
        border-bottom-color: #ffffff;
      }
    }

  }
}

&.disabled {
  .ticket-body {
  @apply tw-bg-gray-400;

    .tw-text-dark, .tw-text-red-500 {
      color: #ffffff;
    }
  }
}

.ticket-box {
  min-height: 152px;
  height: auto;
  //overflow: hidden;

  .divider-box {
    position: relative;
    padding: 0 @dividerDotMargin;

    .divider {
      border-bottom: dashed 1px rgba(0, 0, 0, 0.1);
    }


    &:before, &:after {
      //filter: drop-shadow(0px 0px 4px @dividerDotColor);
      position: absolute;
      content: "";
      width: @dividerDotSize;
      height: @dividerDotSize;
      border-radius: 50%;
      background-color: @dividerDotColor;
      top: 50%;
    }

    &:before {
      left: 0;
      transform: translate3d(-40%, -50%, 0);
    }

    &:after {
      right: 0;
      transform: translate3d(40%, -50%, 0);
    }
  }
}
</style>
