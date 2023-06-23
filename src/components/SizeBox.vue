<script lang="ts" setup>
import {computed} from "vue";
import {px2vw} from "@/utils/helpers";

interface IProps {
  width?: number | string
  height?: number | string
}

const props = defineProps<IProps>()
const styles = computed(() => {
  const style: Partial<any> = {}
  if (props.width) {
    const size = Number(props.width)
    style.width = isNaN(size) ? props.width : px2vw(size);
  }
  if (props.height) {
    const size = Number(props.height)
    style.height = isNaN(size) ? props.height : px2vw(size);
  }
  return style
})
</script>
<template>
  <div :style="styles" class="size-box--container">

  </div>
</template>

<style lang="less" scoped>
.size-box--container {
  width: 100%;
  flex-shrink: 0;
}
</style>