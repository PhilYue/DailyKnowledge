<template>
  <div class="contract">
    <el-dialog @close="resetForm('changeRentForm')" title="转租清单" :visible.sync="changeRentFormShow.show" size="small">
      <el-form inline ref="changeRentForm" :rules="rules" :model="changeRentForm" label-width="126px" label-position="right">
      <!-- 姓名手机号 -->
	      <el-form-item label="" prop="changeType">
		      <el-radio-group @change="getPay" v-model="changeRentForm.changeType">
		        <el-radio class="radio" label="SPAID">有责转租</el-radio>
		        <el-radio class="radio" label="SNOTPAID">无责转租</el-radio>
		      </el-radio-group>
	      </el-form-item>
	      <el-form-item label="" prop="time">
	        <el-date-picker
	          @change="getPay"
		      v-model="changeRentForm.time"
		      type="date"
		      placeholder="选择转租日期">
		    </el-date-picker>
	      </el-form-item>
      </el-form>
      <el-table :data="tableData" highlight-current-row border>
  	    <el-table-column property="businessType" :formatter="businessType" label="金额类型" width="100"></el-table-column>
  	    <el-table-column property="moneyType" :formatter="moneyType" label="收支" width="80"></el-table-column>
  	    <el-table-column property="rangeTime" :formatter="rangeTime" label="金额周期" width="175"></el-table-column>
  	    <el-table-column property="amount" :formatter="amount" label="金额数目"></el-table-column>
  	    <el-table-column property="memo" :formatter="memo" label="备注"></el-table-column>
  	  </el-table>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="resetForm('changeRentForm')">重 置</el-button> -->
        <el-button v-if="buttonShow" type="primary" @click="submitForm('changeRentForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'contractForm',
  data: function () {
    return {
      tableData: [], // 财务表格数据
      changeType: '',
      buttonShow: true,
      changeRentForm: {},
      rules: {
        changeType: [
          { required: true, message: '请选择是否有偿转租', trigger: 'blur' }
        ],
        time: [
          { type: 'date', required: true, message: '请选择转租时间', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    businessType: function (row, column, cellValue) {
      if (row.payPurposeType === 'REN' && row.financeType === 'INC' || row.payPurposeType === 'REN' && row.financeType === 'PAY') {
        return '租金'
      } else if (row.payPurposeType === 'REN' && row.financeType === 'DESP') {
        return '押金'
      } else if (row.payPurposeType === 'REN' && row.financeType === 'DISC') {
        return '抵扣'
      } else if (row.payPurposeType === 'REN' && row.financeType === 'EARNEST') {
        return '定金'
      } else if (row.payPurposeType === 'WATER') {
        return '水费'
      } else if (row.payPurposeType === 'ELEC') {
        return '电费'
      } else if (row.payPurposeType === 'GAS') {
        return '煤气费'
      } else if (row.payPurposeType === 'COM') {
        return '赔偿费'
      } else if (row.payPurposeType === 'CLEAN') {
        return '清洁费'
      } else if (row.payPurposeType === 'MAIN') {
        return '维修费'
      } else if (row.payPurposeType === 'CONSUME') {
        return '消费'
      } else if (row.payPurposeType === 'OTH') {
        return '其他'
      } else if (row.payPurposeType === 'MANAGECOST') {
        return '手续费'
      } else if (row.payPurposeType === 'PERFEE') {
        return '物管费'
      } else if (row.payPurposeType === null) {
        return '总计'
      }
    },
    moneyType: function (row, column, cellValue) {
      if (row.financeType === 'INC') {
        return '收款'
      } else if (row.financeType === 'DESP') {
        if (row.memo === 'pay') {
          return '退款'
        } else {
          return '收款'
        }
      } else {
        return '退款'
      }
    },
    amount: function (row, column, cellValue) {
      return row.amount !== '' ? row.amount / 1000 : ''
    },
    memo: function (row, column, cellValue) {
      if (row.memo === 'pay' || row.memo === 'inc') {
        return ''
      } else {
        return row.memo
      }
    },
    rangeTime: function (row, column, cellValue) {
      return row.payDurationStartTime !== null ? new Date(row.payDurationStartTime).toLocaleDateString() + '-' + new Date(row.payDurationEndTime).toLocaleDateString() : ''
    },
    // 重置数据
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.tableData = []
    },
    // 获取费用信息
    getPay () {
      if (this.changeRentForm.time && this.changeRentForm.changeType) {
        // 获取详情数据
        this.$http.post(this.$store.state.rentUrl + 'lease/preAudit',
          {
            leaseId: this.changeRentFormData.id,
            outTime: Date.parse(this.changeRentForm.time),
            poundage: this.changeRentForm.changeType
          }
        ).then(function (response) {
          var data = response.data
          if (data.data.total.length !== 0) {
            this.tableData = data.data.incOrPay.concat(data.data.total)
            this.buttonShow = true
          } else if (data.data.notConfirm.length !== 0) {
            this.tableData = data.data.notConfirm
            this.buttonShow = false
          } else {
            this.tableData = []
            this.buttonShow = true
          }
        }, function (response) {
          console.log(response.status)
        })
      }
    },
    // 提交转租表单
    submitForm (changeRentForm) {
      this.$refs[changeRentForm].validate((valid) => {
        if (valid) {
          // 将转租表单打开
          this.changeRentFormData.data.poundage = this.changeRentForm.changeType
          this.changeRentFormData.data.expiredOutTime = this.changeRentForm.time
          this.changeRentFormData.data.startTime = new Date(Date.parse(this.changeRentForm.time) + 86400000)
          this.$root.changeRentForm.$emit('changeRentForm', this.changeRentFormData.data)
          this.$refs[changeRentForm].resetFields()
          this.tableData = ''
          this.changeRentFormShow.show = false
        }
      })
    }
  },
  props: ['changeRentFormData', 'changeRentFormShow']
}
</script>
<style scoped>
.w100p{
  width: 100%;
}
.timeWidth{
  width: 130px!important;
}
.contract .el-input, .el-input__inner {
    width: auto;
}
.textarea{
  width: 100%!important;
}
.el-form--inline .el-form-item{
  margin-right: 0;
}
.radio{
  position: relative;
  top: -1px;
}
</style>














