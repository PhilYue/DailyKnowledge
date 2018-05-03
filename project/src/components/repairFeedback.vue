<template>
<!-- 完成维修 -->
	<div>
		<el-form :model="form" label-width="130px" :inline="true">
          	<el-form-item label="维修结果" required v-if="serviceType === 'repair'">
            	<el-select v-model="form.visitResult" :style="width">
              		<el-option label="维修成功" value="SUCCESS" key="已完成"></el-option>
              		<el-option label="维修失败" value="FAILURE" key="未修成"></el-option>
            	</el-select>
          	</el-form-item>
            <el-form-item label="保洁结果" required v-if="serviceType === 'clean'">
              <el-select v-model="form.visitResult" :style="width">
                  <el-option label="保洁成功" value="SUCCESS" key="已完成"></el-option>
                  <el-option label="保洁失败" value="FAILURE" key="未完成"></el-option>
              </el-select>
            </el-form-item>
          	<!-- <div>
	          	<el-form-item label="是否私自购买物品">
	            	<el-select v-model="form.hasBuyItemsPrivately" :style="width">
	              		<el-option label="是" value="YES" key="未修成"></el-option>
	              		<el-option label="否" value="NO" key="未修成"></el-option>
	            	</el-select>
	          	</el-form-item>
	          	<el-form-item label="花费的金额" v-if="form.hasBuyItemsPrivately === 'YES'">
	            	<el-input type="text"v-model="form.costMoney1" :style="width"></el-input>
	            	<p class="money">元</p>
	          	</el-form-item>
          	</div>
          	<div>
	          	<el-form-item label="是否收取客户费用">
	            	<el-select v-model="form.hasCharging" :style="width">
	              		<el-option label="是" value="YES" key="是"></el-option>
	              		<el-option label="否" value="NO" key="否"></el-option>
	            	</el-select>
	          	</el-form-item>
	          	<el-form-item label="收取的金额" v-if="form.hasCharging === 'YES'">
	            	<el-input type="text"v-model="form.chargedMoney1" :style="width"></el-input>
	            	<p class="money">元</p>
	          	</el-form-item>
          	</div> -->
          	<el-form-item label="说明">
            	<el-input type="textarea" :rows="2" v-model="form.visitMemo" style="width:465px"></el-input>
          	</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
		  	<el-button @click="closeForm()">取 消</el-button>
		  	<el-button type="primary" @click="submit">确 定</el-button>
		</div>
	</div>
</template>
<script>
// import $ from 'jquery'
import houseRescoure1 from './houseRescoure1'  //  新建房源
import houseUser from './houseUser'  //  新建房源
export default {
  data: function () {
    return {
      width: 'width:160px',
      landlord: '房东',
      renter: '租客',
      unit: [], // 片区列表
      form: {
        visitResult: '',
        hasCharging: 'NO',
        chargedMoney: '',
        chargedMoney1: '',
        hasBuyItemsPrivately: 'NO',
        costMoney: '',
        costMoney1: '',
        formId: '',
        visitManPhone: '',
        visitMemo: ''
      },
      mix: {
        update: this.$store.state.serviceUrl + 'updateVisitResult' // 房源地址查找
      },
      clickOver: true
    }
  },
  props: ['serviceType', 'repairId', 'clickCount', 'options'],
  watch: {
    clickCount: function () {
      this.form.visitResult = ''
      this.form.hasCharging = 'NO'
      this.form.chargedMoney = 0
      this.form.chargedMoney1 = 0
      this.form.hasBuyItemsPrivately = 'NO'
      this.form.costMoney = 0
      this.form.costMoney1 = 0
      this.form.formId = ''
      this.form.visitManPhone = ''
      this.form.visitMemo = ''
      this.clickOver = true
    }
  },
  // mounted () {
  //   $('.el-dialog--small,.el-dialog--tiny').width(650)
  // },
  methods: {
    closeForm () {
      this.$emit('closeForm')
    },
    submit () {
      if (this.clickOver) {
        this.clickOver = false
        if (this.form.visitResult === '') {
          this.$message({
            message: '回访失败',
            type: 'error'
          })
        } else {
          let workflowParams
          for (let i = 0; i <= this.options.length - 1; i++) {
            if (this.form.visitResult === this.options[i].actionTarget) {
              workflowParams = this.options[i].workflowParams
            }
          }
          this.form.chargedMoney = this.form.chargedMoney1 * 1000
          this.form.costMoney = this.form.costMoney1 * 1000
          this.form.visitManPhone = this.$store.state.currentUser.UserPhone
          this.$store.commit('getMidWorkflowToken', {'processKey': this.repairId, 'variables': workflowParams})
          this.form.formId = this.repairId
          this.form.userId = this.$store.state.currentUser.uid
          this.$http.post(this.mix.update, this.form, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/*; charset=utf-8',
              'userId': this.$store.state.currentUser.uid,
              'workflowToken': this.$store.state.workflowToken,
              'taskId': this.$store.state.taskId,
              'processInstanceId': this.$store.state.processInstanceId,
              'processBusinessKey': this.repairId
            }
          }).then(function (res) {
            if (res.body.code === 200) {
              this.$message({
                message: '回访成功',
                type: 'success'
              })
              this.$emit('closeForm')
              this.$root.task.$emit('submitForm', 1)
              // 回访成功之后初始化表单
              this.form.visitResult = ''
              this.form.hasCharging = 'NO'
              this.form.chargedMoney = 0
              this.form.chargedMoney1 = 0
              this.form.hasBuyItemsPrivately = 'NO'
              this.form.costMoney = 0
              this.form.costMoney1 = 0
              this.form.formId = ''
              this.form.visitManPhone = ''
              this.form.visitMemo = ''
            } else {
              this.$message({
                message: '回访失败',
                type: 'error'
              })
            }
            this.clickOver = true
          })
        }
      }
    }
  },
  components: {
    houseRescoure1, houseUser
  }
}
</script>
<style scoped>
.houseSizeP{
  display: inline-block;
  margin-left: -30px;
  position: relative;
}
.dialog-footer{
	text-align: right;
  padding-right: 35px;
}
.money{
	position: absolute;
	right: 10px;
	top: 0;
	line-height: 36px;
}
</style>