<template>
  <div class="merge">
    <!-- 未结清费用 -->
    <el-dialog class="dialog_merge" title="未结清金额" :visible.sync="mergeShow.show">
      <div v-if="totalAmount !== ''" class="clear merge-cont">
         <el-row class="title">
             <el-col :span="7">费用时间</el-col>
             <el-col :span="6">金额类型</el-col>
             <el-col :span="5">金额数目</el-col>
             <el-col :span="6">金额备注</el-col>
         </el-row>
         <div v-for="item in list">
          <el-row class="cont">
           <el-col :span="7">{{new Date(item.payDurationStartTime).toLocaleDateString()}} - {{new Date(item.payDurationEndTime).toLocaleDateString()}}</el-col>
           <el-col :span="6">
              <span>{{item.financeType | financeTypeFilter}}</span>
              <span v-if="item.financeType === 'DESP' || item.financeType === 'DISC' || item.financeType === 'EARNEST'">(租金)</span>
              <span v-else>{{item.payPurposeType | payPurposeTypeFilter}}</span>
              <span v-if="item.payPurposeType === 'REN' && item.periodNumber">.{{item.periodNumber}}期</span>
           </el-col>
           <el-col :class="item.payPurposeType === 'REN' && item.financeType === 'PAY' ? 'red' : ''" :span="5">¥{{(item.amount / 1000).toFixed(2)}}</el-col>
           <el-col :span="6">{{item.memo}}</el-col>
          </el-row>
         </div>
      </div>
      <h4 v-if="totalAmount !== ''" class="h4 clear">
        <el-row>
          <el-col :span="7">合计:</el-col>
          <el-col class="w-8" :span="6"></el-col>
          <el-col :span="5">¥{{totalAmount}}</el-col>
        </el-row>
      </h4>
      <el-button v-if="buttonShow" class="button_merge" type="primary" @click="merge()">合并费用</el-button>
      <span v-if="totalAmount === ''">暂无欠费</span>
    </el-dialog>
  </div>
</template>
<script>
import {moneyType, financeType} from '@/filters/index.js'
export default {
  name: 'recordMoney',
  data: function () {
    return {
      totalAmount: 0,
      list: '',
      buttonShow: true
    }
  },
  methods: {
    // 合并未结清费用
    openList (id) {
      this.totalAmount = ''
      this.$http.get(this.$store.state.rentUrl + 'lease/getOrder/' + id, {
      }).then(function (response) {
        var data = response.data
        if (data.code === 200) {
          if (data.data.length === 0 || data.data.length === 1) {
            this.buttonShow = false
          } else {
            this.buttonShow = true
          }
          var totalAmount = 0
          var totalId = []
          for (var i = 0; i < data.data.length; i++) {
            if (data.data[i].financeType === 'DISC' || data.data[i].financeType === 'PAY' || data.data[i].financeType === 'DESP') {
              data.data[i].amount = '-' + data.data[i].amount
            }
            totalAmount += data.data[i].amount / 1000
            // 如果是押金则不加进去
            if (data.data[i].financeType !== 'DESP') {
              totalId[i] = data.data[i].id
            }
            if (data.data[i].financeType === 'DESP' && data.data.length === 2) {
              this.buttonShow = false
            }
            this.totalAmount = totalAmount.toFixed(2)
          }
          var totalId2 = []
          for (var j = 0; j <= totalId.length - 1; j++) {
            if (totalId[j] === undefined) {
              totalId.splice(j, 1)
            }
            totalId2 = totalId
          }
          this.totalId = totalId2
          this.list = data.data
        }
      }, function (response) {
        console.log(response.status)
      })
    },
    // 合并费用
    merge () {
      this.$http.post(this.$store.state.payUrl + 'merge', {
        ids: this.totalId
      }).then(function (response) {
        var data = response.data
        if (data.code === 200) {
          this.$message.success('合并成功')
          this.mergeShow.show = false // 关闭弹框
        }
      }, function (response) {
        console.log(response.status)
      })
      console.log(this.totalId)
    }
  },
  filters: {
    // 财务类型过滤
    financeTypeFilter: financeType,
    // 金额类型过滤
    payPurposeTypeFilter: moneyType
  },
  props: ['mergeShow', 'mergeId'],
  watch: {
    'mergeShow.show': function (val, oldVal) {
      this.openList(this.mergeId)
    }
  }
}
</script>
<style scoped>
.merge-cont{
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 5px;
}
.title{
  padding-bottom: 5px;
  border-bottom: 1px solid #e0e0e0;
}
.cont{
  margin-top: 5px;
}
.h4{
  margin-top: 5px;
}
.button_merge{
  float: right;
  margin: 20px 0;
}
.red{
  color: red;
}
</style>