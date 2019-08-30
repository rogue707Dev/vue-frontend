<template>
  <div class="layoutContainer">
    <div class="layoutHeader">
      <el-page-header @back="goBack" content="detail">
      </el-page-header>
    </div>
    <div class="layoutBody">
      <transition name="fade" mode="out-in">
        <router-view :key="key"/>
      </transition>
    </div>
  </div>
</template>
<script>
import { value, computed } from '@vue/composition-api'
export default {
  name: 'Layout',
  setup(props, context) {
    const key = computed(() => context.root.$route.name !== undefined ? context.root.$route.name + new Date() : context.root.$route + new Date())
    const goBack = () => {
      console.log('go back')
    }
    return {
      key, goBack
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>
