import axios from 'axios'
import { Message } from 'element-ui'

export const baseUrl = 'http://116.62.166.134'

const transformRequest = (data = {}, headers) => {
  if (typeof data === 'string') return data

  return JSON.stringify(data)
}

let _axios = axios.create({
  baseURL: baseUrl,
  headers: { 'Content-Type': 'application/json' },
  transformRequest: [transformRequest],
  timeout: 5000
})

_axios.interceptors.response.use(response => response, error => {
  Message.error('服务器连接超时！')
  return Promise.reject(error)
})

export default _axios
