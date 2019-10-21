<template>
  <div>
    <h1>Sample Page</h1>
    <ol>
      <li><el-button  type="primary" @click="openModal">開啟modal</el-button></li>
    </ol>
    <sample-modal id="sampleModal" title="sample"/>
  </div>
</template>
<script>
import vComponent from '@/core/vComponent'
import sampleModal from './sampleModal'
export default {
  name: 'Sample',
  extends: vComponent,
  components: { sampleModal },
  methods: {
    openModal () {
      this.showModal('sampleModal')
    }
  }
}
</script>
