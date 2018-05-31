import axios from 'axios'
import { Message } from 'element-ui'
import _vue from '@/main'

export const baseUrl = 'http://116.62.166.134'
export const baseUrlSpec = 'http://116.62.166.134'

const transformRequest = (data = {}, headers) => {
  const loginId = _vue.$store.state.currentUser.uid
  if (typeof data === 'string') return data

  return JSON.stringify({...data, loginId})
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
