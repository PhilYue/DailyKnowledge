import {Message} from 'element-ui'

export function underDevelopment() {
  Message.warning('点我无效，此功能已被封禁，且尚在评审中。')
}

export function messageCancel(action) {
  const dict = {
    delete: '删除'
  }
  Message.info(`已取消${dict[action] || action || '操作'}。`)
}

export function report(data, type = '', success, error) {
  let map = {
    create: '新增',
    update: '修改',
    destroy: '删除'
  }
  let msg = map[type] || type || '操作'

  if (data.code === 200) {
    Message.success(msg + '成功。')
    success && typeof success === 'function' && success(data)
  } else {
    Message.error(msg + '失败。' + data.msg)
    error && typeof error === 'function' && error(data)    
  }
}

export function getUid() {
  return sessionStorage.getItem('uid') || localStorage.getItem('uid')
}

export function getUserPhone() {
  return sessionStorage.getItem('currentUserPhone') || localStorage.getItem('currentUserPhone')
}
