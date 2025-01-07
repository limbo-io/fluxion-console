import axios from 'axios'
import {ElNotification} from "element-plus";

export const http = axios.create({
  // baseURL: process.env.VUE_APP_baseUrl, // api的base_url 配置后，请求会拼接对应uri
  timeout: 120000, // request timeout
})

// 响应拦截器
http.interceptors.response.use(response => {
  const responseCode = response.data.code
  if (responseCode !== 200) {
    // 交给catch处理
    return Promise.reject(response.data)
  }
  response.data.originResponse = response
  return response.data
}, error => {
  ElNotification({
    message: error.message,
    type: 'error',
    showClose: true,
    duration: 3000
  })
  return Promise.reject(error)
})

export default http
