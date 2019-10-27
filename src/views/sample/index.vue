<template>
  <div>
    <h1>Sample Page</h1>
    <ol>
      <li><el-button  type="primary" @click="openModal">開啟modal</el-button></li>
      <li><el-button  type="success" @click="fetchData">fetch讀取api資料</el-button></li>
      <li><el-button  type="success" @click="doRequest">fetchURL讀取api資料</el-button></li>
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
    },
    async fetchData () {
      const result = await this.fetch('sample')
      console.log(result)
    },
    async doRequest () {
      const result = await this.fetchURL('localhost:3138/sample/text', 'GET', { x: 1, y: 2 })
      console.log(result)
    }
  }
}
</script>
