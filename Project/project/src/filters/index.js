import moment from 'moment'

export const direction = function (val) {
  const dict = {
    EAST: '东',
    SOUTH: '南',
    WEST: '西',
    NORTH: '北',
    SOUTHEAST: '东南',
    NORTHEAST: '东北',
    SOUTHWEST: '西南',
    NORTHWEST: '西北'
  }

  return dict[val]
}

export const houseSpaceStatus = function (val) {
  const dict = {
    WAIT_DELEGATE: '待托管',
    ASSESSING: '评估中',
    APPROVED: '审核通过',
    SIGNING_DC: '签订托管合同中',
    DC_NOT_TE: '已托管合同未生效',
    DC_TE: '已托管合同已生效',
    DESIGNING: '设计中',
    CONSTRUCTING: '施工中',
    CHECKING: '验收中',
    RETAIN: '保留',
    RENTABLE: '空置',
    RESERVED: '已预订',
    SIGNING_LC: '签订租赁合同中',
    LC_NOT_TE: '合同未生效',
    RENTED: '已出租',
    FREEZING: '已冻结',
    DELETED: '已删除',
    TRANSFORM: '已转换(分拆合并)',
  }

  return dict[val]
}

export const pwdType = function (val) {
  const dict = {
    TEMP: '看房密码',
    NORMAL: '租客密码',
    DYNAMIC: '动态密码',
    CUSTOM: '自定义密码'
  }

  return dict[val]
}

// 账单的状态过滤
export const payStatus = function (val) {
  const dict = {
    NEW: '未支付',
    PAYING: '支付中',
    SUC: '支付成功',
    FAIL: '支付失败',
    PDOFF: '线下已支付',
    MER: '已被合并',
    SPL: '已被分拆',
    RETURNING: '返还中',
    RET: '已返还',
    NOT_RETURN: '不需要返还',
    CF: '已结转',
    DEL: '已删除',
    CONFIRM: '已确认',
    MAKE_BILLS: '已制单',
    ISSUED: '已开发票',
    PARTPAID: '分拆后部分已支付',
    FULLYPAID: '分拆后全部已支付',
    CUR_SPL_CONF: '部分分拆生成订单已确认',
    ALL_SPL_CONF: '全部分拆生成订单已确认',
    MERGEDPAID: '合并后总订单已支付',
    MER_CONF: '合并后总账单已确认'
  }
  return dict[val]
}
// 账单的金额类型过滤
export const moneyType = function (val) {
  const dict = {
    REN: '租金',
    WATER: '水费',
    ELEC: '电费',
    GAS: '煤气费',
    COM: '赔偿',
    MAIN: '维修',
    CLEAN: '保洁',
    CONSUME: '消费',
    PERFEE: '物管费',
    NETWORK: '网费',
    MANAGECOST: '手续费',
    OTH: '其他费用',
    CHANGE_FEE: '换房费用',
    SUBLET_FEE: '转租费用',
    CANCEL_FEE: '退租费用'
  }
  return dict[val]
}

// 订单状态
export const orderStatus = function (val) {
  const dict = {
    NEW: '未支付',
    PAYING: '支付中',
    SUC: '支付成功',
    FAIL: '支付失败',
    PDOFF: '线下已支付',
    PDON: '线上直接转账已支付',
    PARTPAID: '分拆后部分已支付',
    FULLYPAID: '分拆后全部已支付',
    MERGEDPAID: '合并后总订单已支付',
    MER: '已被合并',
    SPL: '已被分拆',
    RETURNING: '返还中',
    NOT_RETURN: '不需要返还',
    RET: '已返还',
    CF: '已结转',
    DEL: '已删除',
    CONFIRM: '已确认',
    ISSUED: '已开发票',
    CUR_SPL_CONF: '部分分拆生成订单已确认',
    ALL_SPL_CONF: '全部分拆生成订单已确认',
    MER_CONF: '总账单已确认',
  }

  return dict[val]
}

export const financeType = function (val) {
  const dict = {
    INC: '租金',
    PAY: '支出',
    DISC: '抵扣',
    DESP: '押金',
    EARNEST: '定金',
  }

  return dict[val]
}

export const contractStatus = function (val) {
  const dict = {
    TOAUDIT: '待审核',
    WAISIGN: '待签订',
    SIGNING: '签订中',
    ALSIGN: '已签订',
    ALSIGNDNP: '已签订未支付',
    EFFECT: '已生效',
    END: '正常结束',
    EARLYEND: '提前结束',
    CHEND: '换房导致提前结束',
    THEND: '退租提前结束',
    SUEND: '转租提前结束',
    CANCEL: '取消',
    LATERPULL: '后抓取的合同',
  }

  return dict[val]
}
// 账单的支付方式过滤
export const payMethod = function (val) {
  const dict = {
    ALIPAY: '支付宝',
    WECHAT: '微信支付',
    UNION: '银联',
    WALLET: '钱包支付',
    EBANK: '网银',
    CASH: '线下现金支付',
    H5ALIPAY: '网页版支付宝',
    H5WECHAT: '网页版微信',
    ALIQRCODE: '支付宝二维码'
  }
  return dict[val]
}

export const contractType = function (val) {
  const dict = {
    RENT: '出租合同',
    DELEGATE: '托管合同',
  }
  return dict[val]
}

export const signType = function (val) {
  const dict = {
    NEW: '新签合同',
    RENEWAL: '续租合同',
    SUBLET: '转租合同',
    CHANGE: '换房合同',
  }
  return dict[val]
}

export const houseSpaceFeature = function (val) {
  const dict = {
    WIFI: 'WIFI',
    PARK: '停车位',
    FACE_SOUTH: '朝南',
    PRIVATE_TOILET: '独卫',
    DUAL_BALCONY: '双阳台',
    AIR_CONDITIONER: '空凋',
    PRIVATE_BALCONY: '私人阳台'
  }
  return dict[val]
}

export const decorateType = function (val) {
  const dict = {
    R: '毛坯房',
    S: '简装',
    RD: '精装',
    A: '豪华装修'
  }
  return dict[val]
}

export const certType = function (val) {
  const dict = {
    ID: '身份证',
    P: '护照',
    DL: '驾驶执照',
    BL: '工商营业执照',
    HK: '港澳通行证',
    TW: '台湾通行证'
  }
  return dict[val]
}

export const date = function (val) {
  return moment(val).format('YYYY/MM/DD')
}
