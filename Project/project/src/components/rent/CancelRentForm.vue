<template>
  <div class="contract">
    <el-dialog @close="resetForm('cancelRentForm')" title="退租清单" :visible.sync="cancelRentFormShow.show" size="small">
      <el-form inline ref="cancelRentForm" :rules="rules" :model="cancelRentForm" label-width="126px" label-position="right">
      <!-- 姓名手机号 -->
	      <el-form-item label="" prop="cancelType">
		      <el-radio-group @change="getPay" v-model="cancelRentForm.cancelType">
		        <el-radio class="radio" label="NORMAL">正常退租</el-radio>
		        <el-radio class="radio" label="NNORMAL">非正常退租</el-radio>
		      </el-radio-group>
	      </el-form-item>
	      <el-form-item v-if="this.cancelRentForm.cancelType === 'NNORMAL'" label="" prop="type">
	        <el-select @change="getPay" v-model="cancelRentForm.type" placeholder="类别">
		        <el-option
		          v-for="item in options"
		          :key="item.value"
		          :label="item.label"
		          :value="item.value">
		        </el-option>
	        </el-select>
	      </el-form-item>
	      <el-form-item label="" prop="time">
	        <el-date-picker
	          @change="getPay"
		      v-model="cancelRentForm.time"
		      type="date"
		      placeholder="选择退租日期">
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
        <!-- <el-button @click="resetForm('cancelRentForm')">重 置</el-button> -->
        <el-button v-if="buttonShow" type="primary" @click="submitForm('cancelRentForm')">确 定</el-button>
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
      cancelType: '',
      buttonShow: true,
      options: [{
        value: 'NSETTLE',
        label: '跑路退租'
      }, {
        value: 'ISRESP',
        label: '个人原因退租'
      }, {
        value: 'NORESP',
        label: '公司原因退租'
      }],
      rules: {
        cancelType: [
          { required: true, message: '请选择是否正常退租', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择非正常退租类别', trigger: 'change' }
        ],
        time: [
          { type: 'date', required: true, message: '请选择退租时间', trigger: 'change' }
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
      } else if (row.payPurposeType === 'NETWORK') {
        return '网络费'
      } else if (row.payPurposeType === 'CHANGE_FEE') {
        return '换房费用'
      } else if (row.payPurposeType === 'SUBLET_FEE') {
        return '转租费用'
      } else if (row.payPurposeType === 'CANCEL_FEE') {
        return '退租费用'
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
      if (this.cancelRentForm.cancelType === 'NORMAL') {
        if (this.cancelRentForm.time) {
          // 获取详情数据
          this.$http.post(this.$store.state.rentUrl + 'lease/preAudit',
            {
              leaseId: this.cancelRentFormData.id,
              outTime: Date.parse(this.cancelRentForm.time),
              throwType: 'NORMAL'
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
      } else {
        if (this.cancelRentForm.time && this.cancelRentForm.type) {
          // 获取详情数据
          this.$http.post(this.$store.state.rentUrl + 'lease/preAudit',
            {
              leaseId: this.cancelRentFormData.id,
              outTime: Date.parse(this.cancelRentForm.time),
              throwType: this.cancelRentForm.type
            }
          ).then(function (response) {
            var data = response.data
            console.log(data.data.total)
            console.log(data.data.total.length)
            console.log(typeof data.data.total)
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
      }
    },
    // 提交退租表单
    submitForm (cancelRentForm) {
      this.$refs[cancelRentForm].validate((valid) => {
        if (valid) {
          let throwType
          if (this.cancelRentForm.cancelType === 'NORMAL') {
            throwType = 'NORMAL'
          } else {
            throwType = this.cancelRentForm.type
          }
          // 新建流程token
          this.$store.commit('getNewWorkflowToken', {'processKey': 'PROCESS-KEY-TERMINATE-V5', 'processTenantId': this.cancelRentFormData.unitId})
          // 改变状态为已取消
          this.$http.post(this.$store.state.rentUrl + 'lease/flowUpdateLease', {
            id: this.cancelRentFormData.id,
            throwType: throwType,
            leaseStatus: 'WATHROW',
            expiredOutTime: Date.parse(this.cancelRentForm.time),
            loginId: this.$store.state.currentUser.uid
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/*; charset=utf-8',
              'userId': this.$store.state.currentUser.uid,
              'workflowToken': this.$store.state.workflowToken,
              'processTenantId': this.cancelRentFormData.unitId,
              'processKey': 'PROCESS-KEY-TERMINATE-V5'
            }
          }).then(function (response) {
            var data = response.data
            if (data.code === 200) {
              this.$message({
                type: 'info',
                message: '已申请退租'
              })
              this.$refs[cancelRentForm].resetFields()
              this.cancelRentFormShow.show = false
              // 刷新租约列表
              this.$root.lease.$emit('changeStatus', '1')
            }
          }, function (response) {
            console.log(response.status)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  props: ['cancelRentFormData', 'cancelRentFormShow', 'cancelRentForm']
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














