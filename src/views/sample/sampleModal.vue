<template>
  <el-dialog :title="title" :visible.sync="isVisible" :close-on-click-modal="false" :append-to-body="isAppend" width="100%"/>
</template>
<script>
import vModal from '@/core/vModal'
export default {
  name: 'VModal',
  extends: vModal,
  methods: {
  }
}
</script>
<style scoped lang='scss'>
</style>
