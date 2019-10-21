'use strict'
import Vue from 'vue'
let bus = null
if (bus === null) {
  bus = new Vue({
    data () {
      return {
        classNames: []
      }
    },
    methods: {
      on (eventName, fnName, fn) {
        // 給每個fn fnName以作辨識
        Object.defineProperty(fn, 'fnName', { value: fnName })
        if (this._events[eventName] === undefined) {
          this.$on(eventName, fn)
        } else {
          let haveSame = false
          for (let i = 0; i < this._events[eventName].length; i++) {
            if (this._events[eventName][i].fnName === fnName) {
              // 當已經存在fn 則用新的取代
              haveSame = true
              this._events[eventName][i] = fn
              break
            }
          }
          if (!haveSame) {
            this.$on(eventName, fn)
          }
        }
      },
      emit (eventName, ...args) {
        this.$emit(eventName, ...args)
      },
      off (eventName, fn) {
        // 移除所有的事件監聽
        this.$off(eventName)
      }
    }
  })
}
export default bus
