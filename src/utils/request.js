import axios from 'axios'
import { Message } from 'element-ui'
const service = axios.create({
  timeout: 15000 // 統一timeout設定
})
// before request
service.interceptors.request.use(config => {
  return config
}, error => {
  console.log(error)
  return Promise.reject(error)
})
// after response
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.errors) {
      return Promise.reject(res)
    } else {
      return res
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
export default service
