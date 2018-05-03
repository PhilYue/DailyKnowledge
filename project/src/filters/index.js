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
    WAIT_TRUST: '待托管',
    ASSESSING: '评估中',
    APPROVED: '审核通过',
    SIGNING_DC: '签订托管合同中',
    DC_NOT_TE: '托管合同未生效',
    DC_TE: '托管合同已生效',
    DESIGNING: '设计中',
    CONSTRUCTING: '施工中',
    CHECKING: '验收中',
    RETAIN: '保留',
    RENTABLE: '空置',
    RESERVED: '已预定',
    SIGNING_LC: '签订租赁合同中',
    RENTED: '已出租',
    FREEZING: '已冻结',
    DELETED: '已删除'
  }

  return dict[val]
}
