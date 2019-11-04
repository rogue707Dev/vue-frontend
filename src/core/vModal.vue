<template>
  <el-dialog :title="title" :visible.sync="isVisible" :close-on-click-modal="false" :append-to-body="isAppend" :fullscreen="fullscreen" width="100%"/>
</template>
<script>
import vComponent from './vComponent'
export default {
  name: 'VModal',
  extends: vComponent,
  props: {
    title: {
      type: String,
      default: 'title'
    },
    isAppend: {
      type: Boolean,
      default: false
    },
    fullscreen: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      modalData: {},
      isVisible: false,
      openerId: null // 開啟這個modal的 opener 的id
    }
  },
  watch: {
    isVisible (val) {
      if (val) {
        const data = this.haveModalData() ? this.getModalData() : {}
        this.$set(this, 'modalData', data)
        this.dataReady()
        setTimeout(() => {
          this.modalBgClicked()
        }, 100)
      }
    }
  },
  created () {
  },
  mounted () {
    this.addInsideModalHandler()
  },
  methods: {
    addInsideModalHandler () {
      this.on('Modal.CMD.Show', (id, boolean, openerId = null, readonly = false) => {
        if (id !== this.id) return // 不是自己這個modal的訊息不收
        if (openerId !== null) this.openerId = openerId // 儲存把自己開起來的openerId
        this.isVisible = boolean
      })
    },
    addEventHandler () {},
    dataReady () {},
    dispatchData (data = null, autoClose = true) {
      if (data !== null) data = this.modalData
      this.emit('Modal.DispatchData', this.id, data, this.openerId)
      if (autoClose) this.close()
    },
    close () {
      this.isVisible = false
    },
    modalBgClicked () {
      const modalBg = document.querySelector('.v-modal')
      if (modalBg !== null) {
        modalBg.addEventListener('click', (event) => {
          this.close()
        })
      }
    }
  }
}
</script>
<style scoped lang='scss'>
</style>
