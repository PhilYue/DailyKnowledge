<template>
  <div>
      <!-- 右侧主内容区 -->
      <div class="main-right" >
        <div class="main-right-search">
          <div class="main-right-search-span">
            <a v-for="rent in rents" :class="{selectActive: activeName == rent}" @click="selected(rent)">{{rent}}</a>
          </div>
          <!-- <div class="fr search-cont">
            <el-input class="rent1-input" v-model="input" placeholder="搜索:租客手机号,租客姓名"></el-input>
            <el-button type="primary">搜索</el-button>
          </div> -->
        </div>
        <div class="main-right-main">
          <div class="list-contain">
            <el-table
              ref="singleTable"
              :data="tableData"
              highlight-current-row
              :total="totalCount"
              @current-change="handleCurrentChange">
              <el-table-column
                prop="estimatedPayTime"
                label="应支付时间"
                :formatter="estimatedPayTime"
                >
              </el-table-column>
              <el-table-column
                prop="houseSpaceName"
                label="地址"
                width="200"
                >
              </el-table-column>
              <el-table-column
                prop="userName"
                label="姓名"
                >
              </el-table-column>
              <el-table-column
                prop="businessType"
                label="来源"
                :formatter="businessType"
                >
              </el-table-column>
              <el-table-column
                prop="rangeTime"
                label="账单周期"
                :formatter="rangeTime"
                width="165"
                >
              </el-table-column>
              <el-table-column
                prop="chargType"
                label="类型"
                :formatter="chargType"
                >
              </el-table-column>
              <el-table-column
                prop="amount"
                label="总额(元)"
                :formatter="amount"
                >
              </el-table-column>
              <el-table-column
                prop="houseKeeperName"
                label="签约人"
                >
              </el-table-column>
              <el-table-column
                prop="overdeuDays"
                label="逾期天"
                >
              </el-table-column>
            </el-table>
          </div>
          <div class="paging">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="cur_page"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalCount">
            </el-pagination>
          </div>
        </div>
      </div>
  </div>
</template>
<script>

export default {
  name: 'accountReceivable', // 预约看房页面
  data: () => {
    return {
      input: '',
      rents: ['全部', '租金', '押金', '抵扣', '定金', '水费', '电费', '煤气费', '赔偿费', '清洁费', '维修费', '消费', '其他'],
      activeName: '全部',
      // 搜索条件
      bean: '',
      // 默认每页数据量
      pagesize: 10,
      // 当前页码
      cur_page: 1,
      // 默认数据总数
      totalCount: 0,
      tableData: []
    }
  },
  methods: {
    // 当前页码改变触发
    handleCurrentChange (val) {
      this.bean.pageNo = val
      this.cur_page = val
      this.loadData(this.bean)
    },
    // 每页条数变化触发
    handleSizeChange (val) {
      this.pagesize = val
      this.bean.pageSize = val
      this.loadData(this.bean)
    },
    businessType: function (row, column, cellValue) {
      return row.businessType === 'RES' ? '预定' : row.businessType === 'RENT' ? '租约' : '托管'
    },
    chargType: function (row, column, cellValue) {
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
      }
    },
    amount: function (row, column, cellValue) {
      return row.amount !== '' ? row.amount / 1000 : ''
    },
    estimatedPayTime: function (row, column, cellValue) {
      return row.estimatedPayTime !== '' ? new Date(row.estimatedPayTime).toLocaleDateString() : ''
    },
    // 账单周期
    rangeTime: function (row, column, cellValue) {
      return row.payDurationStartTime !== null ? new Date(row.payDurationStartTime).toLocaleDateString() + '-' + new Date(row.payDurationEndTime).toLocaleDateString() : ''
    },
    // 获取列表数据
    loadData: function (bean) {
      this.$http.post(this.$store.state.rentUrl + 'planfee/list',
        bean
      ).then(function (response) {
        var data = response.data
        if (data.data.list !== null) {
          this.totalCount = data.data.totalCount
          this.tableData = data.data.list
        } else {
          this.totalCount = 0
          this.listData = ''
          // this.$message({
          //   showClose: true,
          //   message: '暂无数据',
          //   type: 'error',
          //   duration: 2000
          // })
        }
      }, function (response) {
        console.log(response.status)
      })
    },
    // 同级选中,根据状态筛选
    selected (rent) {
      this.activeName = rent
      if (rent === '全部') {
        this.bean.chargType = null
      } else if (rent === '押金') {
        this.bean.chargType = 'REN'
        this.bean.financeType = 'DESP'
      } else if (rent === '租金') {
        this.bean.chargType = 'REN'
        this.bean.financeType = 'INC'
      } else if (rent === '抵扣') {
        this.bean.chargType = 'REN'
        this.bean.financeType = 'DISC'
      } else if (rent === '定金') {
        this.bean.chargType = 'REN'
        this.bean.financeType = 'EARNEST'
      } else if (rent === '水费') {
        this.bean.chargType = 'WATER'
      } else if (rent === '电费') {
        this.bean.chargType = 'ELEC'
      } else if (rent === '煤气费') {
        this.bean.chargType = 'GAS'
      } else if (rent === '赔偿费') {
        this.bean.chargType = 'COM'
      } else if (rent === '清洁费') {
        this.bean.chargType = 'CLEAN'
      } else if (rent === '维修费') {
        this.bean.chargType = 'MAIN'
      } else if (rent === '消费') {
        this.bean.chargType = 'CONSUME'
      } else if (rent === '其他') {
        this.bean.chargType = 'OTH'
      }
      this.loadData(this.bean)
    }
  },
  components: {
  },
  created () {
    this.bean = {
      pageSize: this.pagesize,
      pageNo: this.cur_page,
      loginId: this.$store.state.currentUser.uid
    }
    this.loadData(this.bean)
    this.$store.state.adminleftnavnum = '/table/accountReceivable'
    this.$store.state.topIndex = '/table/accountReceivable'
  }
}
</script>
<style scoped>
/* 主内容区 */
main .main-right{
  padding: 30px; 
}
.rent1-input{
  width: 40%;
}
.main-right-main{
  margin-top: 30px;
}
.main-right-search-span{
  font-size: 13px;
  margin-bottom: 15px;
}
.main-right-search-span a{
  margin-right: 30px;
  display: inline-block;
  height: 36px;
  line-height: 36px;
  cursor: pointer;
}
.selectActive{
  color: #20a0ff;
}

/*列表css*/
.list-contain-main{
  padding: 0 25px;
  border:1px solid #eee;
}
.pad9{
  padding: 9px 0;
}
.paging{
  text-align: right;
  margin-top: 20px;
}
.el-table{
  font-size: 12px;
}
</style>
















