<template>
  <div>
    <el-dialog title="财务信息" :visible.sync="detailShow.show">
	  <el-table :data="tableData" highlight-current-row>
	    <el-table-column property="businessType" :formatter="businessType" label="金额类型" width="150"></el-table-column>
	    <el-table-column property="rangeTime" :formatter="rangeTime" label="金额周期" width="200"></el-table-column>
	    <el-table-column property="amount" :formatter="amount" label="金额数目"></el-table-column>
	    <el-table-column property="orderStatus" :formatter="orderStatus" label="金额状态"></el-table-column>
	  </el-table>
	  <!-- <div class="paging">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="cur_page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </div> -->
	</el-dialog>
  </div>
</template>
<script>
export default {
  name: 'businessDetail',
  data: function () {
    return {
    // 默认数据总数
      // totalCount: 0,
      tableData: [],
      // 默认每页数据量
      // pagesize: 10,
      // // 当前页码
      // cur_page: 1,
      bean: ''
    }
  },
  props: ['businessId', 'detailShow'],
  methods: {
    businessType: function (row, column, cellValue) {
      if (row.chargType === 'REN' && row.financeType === 'INC' || row.chargType === 'REN' && row.financeType === 'PAY') {
        return '租金*' + row.periodicityName + '期'
      } else if (row.chargType === 'REN' && row.financeType === 'DESP') {
        return '押金'
      } else if (row.chargType === 'REN' && row.financeType === 'DISC') {
        return '抵扣'
      } else if (row.chargType === 'REN' && row.financeType === 'EARNEST') {
        return '定金'
      } else if (row.chargType === 'WATER') {
        return '水费'
      } else if (row.chargType === 'ELEC') {
        return '电费'
      } else if (row.chargType === 'GAS') {
        return '煤气费'
      } else if (row.chargType === 'COM') {
        return '赔偿费'
      } else if (row.chargType === 'CLEAN') {
        return '清洁费'
      } else if (row.chargType === 'MAIN') {
        return '维修费'
      } else if (row.chargType === 'CONSUME') {
        return '消费'
      } else if (row.chargType === 'OTH') {
        return '其他'
      } else if (row.chargType === 'MANAGECOST') {
        return '手续费'
      } else if (row.chargType === 'PERFEE') {
        return '物管费'
      }
    },
    orderStatus: function (row, column, cellValue) {
      if (row.orderStatus === 'NEW') {
        return '未支付'
      } else if (row.orderStatus === 'PAYING') {
        return '支付中'
      } else if (row.orderStatus === 'SUC') {
        return '支付成功'
      } else if (row.orderStatus === 'FAIL') {
        return '支付失败'
      } else if (row.orderStatus === 'PDOFF') {
        return '线下已支付'
      } else if (row.orderStatus === 'MAKE_BILLS') {
        return '已制单'
      } else if (row.orderStatus === 'PDON') {
        return '线上直接转账已支付'
      } else if (row.orderStatus === 'MER') {
        return '已被合并'
      } else if (row.orderStatus === 'SPL') {
        return '已被分拆'
      } else if (row.orderStatus === 'RET') {
        return '已返还'
      } else if (row.orderStatus === 'RETURNING') {
        return '返还中'
      } else if (row.orderStatus === 'DISTRIBUTED') {
        return '已分账'
      } else if (row.orderStatus === 'DEL') {
        return '已删除'
      } else if (row.orderStatus === 'ISSUED') {
        return '已开发票'
      } else if (row.orderStatus === 'PARTPAID') {
        return '分拆后部分已支付'
      } else if (row.orderStatus === 'FULLYPAID') {
        return '分拆后全部已支付'
      } else if (row.orderStatus === 'MERGEDPAID') {
        return '合并后总订单已支付'
      } else if (row.orderStatus === 'CONFIRM') {
        return '财务已确认'
      } else if (row.orderStatus === 'CUR_SPL_CONF') {
        return '部分分拆生成订单已确认'
      } else if (row.orderStatus === 'ALL_SPL_CONF') {
        return '全部分拆生成订单已确认'
      } else if (row.orderStatus === 'MER_CONF') {
        return '合并后的账单已确认'
      }
    },
    amount: function (row, column, cellValue) {
      if (row.financeType === 'PAY' && row.amount !== '') {
        return '-' + row.amount / 1000
      } else {
        return row.amount / 1000
      }
    },
    rangeTime: function (row, column, cellValue) {
      return row.payDurationStartTime !== null ? new Date(row.payDurationStartTime).toLocaleDateString() + '-' + new Date(row.payDurationEndTime).toLocaleDateString() : ''
    },
    loadData (bean) {
      // 获取详情数据
      this.$http.post(this.$store.state.rentUrl + 'planfee/listByBusinessId',
        this.bean
      ).then(function (response) {
        var data = response.data
        if (data.data.list !== null) {
          // this.totalCount = data.data.totalCount
          this.tableData = data.data
        } else {
          // this.totalCount = 0
          this.listData = ''
        }
      }, function (response) {
        console.log(response.status)
      })
    }
    // 当前页码改变触发
    // handleCurrentChange (val) {
    //   this.bean.pageNo = val
    //   this.cur_page = val
    //   this.loadData(this.bean)
    // },
    // 每页条数变化触发
    // handleSizeChange (val) {
    //   this.pagesize = val
    //   this.bean.pageSize = val
    //   this.loadData(this.bean)
    // }
  },
  watch: {
    'detailShow.show': function (val, oldVal) {
      if (val === true) {
        this.bean = {
          // pageSize: this.pagesize,
          // pageNo: this.cur_page,
          businessId: this.businessId,
          businessType: 'RENT'
        }
        this.$root.payDetail.$emit('payDetailHide', '')
        this.loadData(this.bean)
      }
    }
  }
}
</script>
<style scoped>
.paging{
  text-align: right;
  margin-top: 20px;
}
</style>