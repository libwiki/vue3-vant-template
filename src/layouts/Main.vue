<script setup>

</script>

<template>
  <div class="main-container">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :key="$route.name||$route.path" v-if="$route.meta.keepAlive" :is="Component"/>
      </keep-alive>
      <component :key="$route.name||$route.path" v-if="!$route.meta.keepAlive" :is="Component"/>
    </router-view>
  </div>
</template>

<style lang="less" scoped>

</style>
