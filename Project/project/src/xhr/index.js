import axios, { baseUrl, baseUrlSpec } from './_config'
import urljoin from 'urljoin'

export * from './_config'

export const urlList = {
  rent: `${baseUrl}:23150/rent/`,
  // house房源接口地址
  house: `${baseUrl}:23222/house/`,
  // contract合同接口地址
  contract: `${baseUrl}:23250/contract/`,
  // account登录接口地址
  account: `${baseUrl}:21000/account/`,
  // pdf接口地址
  pdf: `${baseUrl}:21350/oss/`,
  // pay接口地址
  pay: `${baseUrlSpec}:21550/pay/`,
  // 工作流接口地址
  workflow: `${baseUrl}:21600/workflow/`,
  // 售后服务接口地址
  service: `${baseUrl}:23300/maintain/`,
  // 搜索引擎接口地址
  search: `${baseUrl}:21275/search/`,
  // 维修物品接口地址
  category: `${baseUrl}:21275/data/`,
  // 三级联动接口地址
  block: `${baseUrl}:21275/block/`,
  // 同步房源数据到蘑菇租房
  alipay: `${baseUrl}:21650/house/sync/`,
  // 智能门锁
  lock: `${baseUrlSpec}:21151/lock/`,

  userInfo: `${baseUrlSpec}:21000/account/user/info/`,
}

export const api = {
  house: {
    list: (params) => axios.post(urljoin(urlList.house, 'list/houseSpaceInHouseSpaceManager'), params),
    retrieve: (id) => axios.post(urljoin(urlList.house, 'get'), {houseSpaceId: id})
  },
  contract: {
    list: (params) => axios.post(urljoin(urlList.contract, 'list'), params),
    retrieve: (id) => axios.get(urljoin(urlList.contract, 'getContractDetailsById', id))
  },
  lock: {
    retrieve: (params) => axios.post(urljoin(urlList.lock, 'searchOnelock'), params),
  },
  password: {
    list: (params) => axios.post(urljoin(urlList.lock, 'list/pwd'), params),
    destroy: (params) => axios.post(urljoin(urlList.lock, 'del'), params),
    retrieve: (params) => axios.post(urljoin(urlList.lock, 'sendpwd'), params),
  },
  contractAttachment: {
    create: (params) => axios.post(urljoin(urlList.contract, 'attachment/add'), params)
  },
  houseFile: {
    create: (params) => axios.post(urljoin(urlList.house, 'save/file'), params)    
  },
  pay: {
    list: (params) => axios.post(urljoin(urlList.pay, 'list'), params)
  },
  followUser: {
    destroy: (id) => axios.post(urljoin(urlList.contract, 'deleteFollowUser', id), {id})    
  },
  userInfo: {
    retrieve: (id) => axios.get(urljoin(urlList.userInfo, 'cert', id)),
  },
}
