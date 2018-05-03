import axios, { baseUrl } from './_config'
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
  pay: `${baseUrl}:21550/pay/`,
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
  lock: `${baseUrl}:21151/lock/`,
}

export const api = {
  house: {
    list: (params) => axios.post(urljoin(urlList.house, 'list/houseSpaceInHouseSpaceManager'), params)
  }
}
