<script>
import bus from '@/utils/EventBus'
import { tmp, removeTmp } from '@/utils/common'
import { getAPI, fetchURL } from '@/utils/api'
import _ from 'lodash'
export default {
  name: 'VComponent',
  data () {
    return {
    }
  },
  computed: {
    params () {
      return this.$route.params
    },
    uid () {
      return `uid_${this._uid}`
    },
    id () {
      return this.$el === undefined || this.$el.getAttribute === undefined ? null : this.$el.getAttribute('id')
    }
  },
  methods: {
    // -- modal
    addModalHandler (modalHandler = null) {
      this.on('Modal.DispatchData', (modalId, modalData, openerId = null) => {
        // 當有指定openerId openerId 要是自己才會接收到, 如果沒有指定openerId 就可直接觸發
        if (openerId === null || openerId === this.id) {
          if (modalHandler === null) {
            this.modalHandler(modalId, modalData)
          } else {
            modalHandler(modalId, modalData)
          }
        }
      })
    },
    modalHandler (modalId, modalData, openerId = null) {
    },
    showModal (modalId, data = null, openerId = null) {
      if (data !== null) this.setModalData(data)
      this.emit('Modal.CMD.Show', modalId, true, openerId)
    },
    setModalData (data) {
      tmp('modalData', data)
    },
    haveModalData () {
      return tmp('modalData') !== null
    },
    getModalData () {
      const data = _.cloneDeep(tmp('modalData'))
      removeTmp('modalData')
      return data
    },
    hideModal (modalId) {
      this.emit('Modal.CMD.Show', modalId, false)
    },
    // -- event 發送與接收
    on (eventNameStr, ...args) {
      // 可接聽多個eventName 以, 區隔
      let fn, fnName
      const eventNames = eventNameStr.split(',')
      if (args.length === 1) {
        fn = args[0]
        fnName = this.id // 設定 fnName預設值
      } else if (args.length === 2) {
        fnName = args[0]
        fn = args[1]
      }
      for (let i = 0; i < eventNames.length; i++) {
        bus.on(eventNames[i], fnName, fn)
      }
    },
    emit (eventName, ...args) {
      bus.emit(eventName, ...args)
    },
    off (eventName, fn) {
      bus.off(eventName, fn)
    },
    async fetch (apiName, ...args) {
      const api = getAPI()
      return new Promise((resolve, reject) => {
        api[apiName](...args).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 以 callback 接收結果
    fetchSync (apiName, ...args) {
      const api = getAPI()
      const callback = args.pop()
      api[apiName](...args).then(response => {
        callback(null, response)
      }).catch(error => {
        callback(error, error)
      })
    },
    async fetchURL (url, method = 'GET', data = null) {
      return new Promise((resolve, reject) => {
        fetchURL(url, method, data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // -- dispatch 用來發送 vuex action
    async dispatch (ActionName, ...args) {
      return new Promise((resolve, reject) => {
        // 當dispatch 發出多args時, 會以array方式傳到store內
        // store.dispatch(ActionName, payload, option) 所以要傳遞的資料必須只能包裝在payload 一個物件內
        const data = args.length === 1 ? args[0] : args
        this.$store.dispatch(ActionName, data).then((response) => {
          resolve(response)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    // 連結
    to (linkPath) {
      this.$router.push(linkPath)
    },
    // 讓 data 內物件的data 其prop可以觸發render , 通常 data{}內的物件 物件prop 異動不會render
    setReactive (dataName, dataObj) {
      // 用原來的資料產生一個 新的物件
      this[dataName] = Object.assign({}, dataObj, dataObj)
    }
  }

}
</script>
<style></style>
