<script setup>
import {ref} from "vue";
import Ticket from "../../../components/coupon/Ticket.vue";
import {useRefreshStore} from "../../../store/refreshStore";
import {EventsEnum} from "../../../events/EventsEnum";

const refreshStore = useRefreshStore()
window.emitter.on(EventsEnum.onRefresh, () => {
  console.log('下拉刷新触发')
  refreshStore.loading = false; // 关闭下拉刷新动画
}); // 监听处理页面的下拉刷新事件

const tableData = ref([]);
const initData = async () => {
  tableData.value = [
    {name: '抵扣券', code: "Tx0001", value: 100, time: "2022-06-19", phone: '10086', status: 1},
    {name: '抵扣券22', code: "Tx0002", value: 20, time: "2022-06-19", phone: '10086', status: 0},
  ]
}
initData();
</script>

<template>
  <div class="tw-px-10 tw-py-10">
    <Ticket
        :name="item.name"
        :value="item.value"
        :time="item.time"
        :code="item.code"
        :phone="item.phone"
        :disabled="item.status===0"
        :status-text="item.status>0?'待使用':'已使用'"
        v-for="(item,i) of tableData"
        :key="i"/>
  </div>
</template>

<style lang="less" scoped>

</style>
