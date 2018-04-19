<template>
<!-- 新建托管合同 -->
	<div>
		<el-form :model="form" :inline="true">
		  <!-- <houseUser :form="form.houseLandlordBean" :disabled="disable" :formLabelWidth="formLabelWidth" :ten="landlord" v-if="form.houseLandlordBean.isTrue"></houseUser> -->
			<el-form-item label="合同编号" :label-width="formLabelWidth">
			  <el-input v-model="form.contractNumber" :disabled="true" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="地址" :label-width="formLabelWidth">
			  <el-input v-model="form.houseSpaceName" :disabled="true" auto-complete="off" placeholder=""></el-input>
			</el-form-item>
			<el-form-item label="托管开始时间" :label-width="formLabelWidth">
			  <el-input v-model="form.startTime" auto-complete="off" placeholder="" style=""  :disabled="true"></el-input>
			</el-form-item>
			<el-form-item label="托管结束时间" :label-width="formLabelWidth">
			      <el-input v-model="form.endTime" auto-complete="off" placeholder="" style=""  :disabled="true"></el-input>
		    </el-form-item>
			<el-form-item label="免租开始时间" :label-width="formLabelWidth">
			  <el-input v-model="form.rentalFreeStart1" auto-complete="off" placeholder="" style=""  :disabled="true"></el-input>
			</el-form-item>
			<el-form-item label="免租结束时间" :label-width="formLabelWidth">
			  <el-input v-model="form.rentalFreeEnd1" auto-complete="off" placeholder="" style=""  :disabled="true"></el-input>
		    </el-form-item>
		    <el-form-item label="收房价格" :label-width="formLabelWidth">
		      <el-input v-model="form.rental1" auto-complete="off" placeholder="" style=""  :disabled="true"></el-input>
		      <p class="houseSizeP">元/月</p>
		    </el-form-item>
		    <el-form-item label="押金" :label-width="formLabelWidth">
		      <el-input v-model="form.deposit1" auto-complete="off" placeholder="" style=""  :disabled="true"></el-input>
		      <p class="houseSizeP">元</p>
		    </el-form-item>
		    <el-form-item label="付款周期" :label-width="formLabelWidth" style="display:block">
			  <el-select v-model="form.payCycle" placeholder=""  :disabled="disable" style="width:169px;">
			    <el-option label="月付" value="ONEMON"></el-option>
			    <el-option label="二月付" value="TWOMON"></el-option>
			    <el-option label="四月付" value="FOURMON"></el-option>
			    <el-option label="季付" value="THREEMON"></el-option>
			    <el-option label="半年付" value="SIXMON"></el-option>
			    <el-option label="一年付" value="TWELVEMON"></el-option>
			    <el-option label="全付" value="ONEPAY"></el-option>
			  </el-select>
		    </el-form-item>
		    <div>
			    <el-form-item label="租金递增方式" :label-width="formLabelWidth">
				  <el-select v-model="form.addType" placeholder=""  :disabled="disable" style="width:169px;">
				    <el-option label="无" value="NOTRISE"></el-option>
				    <el-option label="按金额递增" value="RISEBYAMOUNT"></el-option>
				    <el-option label="按百分比递增" value="RISEBYPER"></el-option>
				  </el-select>
			    </el-form-item>
			    <el-form-item label="按金额递增" v-if="form.rentalStage == 'RISEBYAMOUNT'" :label-width="formLabelWidth">
			      <el-input v-model="form.addAmount1" auto-complete="off" placeholder="" style=""  :disabled="disabled"></el-input>
			      <p class="houseSizeP">元/月</p>
			    </el-form-item>
			    <el-form-item label="按百分比递增" v-if="form.rentalStage == 'RISEBYPER'" :label-width="formLabelWidth">
			      <el-input v-model="form.addPer1" auto-complete="off" placeholder="" style=""  :disabled="disabled"></el-input>
			      <p class="houseSizeP">%</p>
			    </el-form-item>
		    </div>
		    <el-form-item label="收款账号" :label-width="formLabelWidth">
		      <el-input v-model="form.bankAccount" :disabled="disable" auto-complete="off" placeholder="" style=""></el-input>
		    </el-form-item>
		    <el-form-item label="收款银行" :label-width="formLabelWidth">
		      <el-select v-model="form.bankName" :disabled="disable" placeholder="" style="width:169px;">
			    <el-option label="中国银行" value="1"></el-option>
			    <el-option label="中国建设银行" value="2"></el-option>
			    <el-option label="中国工商银行" value="3"></el-option>
			    <el-option label="中国农业银行" value="4"></el-option>
			    <el-option label="招商银行" value="5"></el-option>
			    <el-option label="杭州银行" value="6"></el-option>
			    <el-option label="杭州联合银行" value="7"></el-option>
			  </el-select>
		    </el-form-item>
		    <el-form-item label="开户支行" :label-width="formLabelWidth">
		      <el-input v-model="form.bankOfAccounts" :disabled="disable" auto-complete="off" placeholder="" style=""></el-input>
		    </el-form-item>
	        <el-form-item label="备注":label-width="formLabelWidth" style="width:100%">
	          <el-input type="textarea" v-model="form.mome" :disabled="disable" style="width:470px;"></el-input>
	        </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="closeForm()">关 闭</el-button>
		    <el-button type="primary" v-if="!editDepositForm && form.contractStatusChange === '待签订'" @click="editForm">编 辑</el-button>
		    <el-button type="primary" v-if="editDepositForm" @click="submitForm(form)">提 交</el-button>
		  </div>
	</div>
</template>
<script>
import $ from 'jquery'
import houseRescoure1 from './houseRescoure1'  //  新建房源
import houseUser from './houseUser'  //  新建房源
export default {
  name: 'form',
  data: function () {
    return {
      landlord: '房东',
      renter: '租客',
      disable: Boolean(this.disabled),
      options: [
        {
          value: '选项1',
          label: '德信晓宸'
        }, {
          value: '选项2',
          label: '八方城'
        }, {
          value: '选项3',
          label: '桂花城'
        }
      ],
      value8: '',
      form: {},
      mix: {
        updateCon: this.$store.state.contractUrl + 'updateContent', // 更新合同
        detailCon: this.$store.state.contractUrl + 'getContractDetailsById/' // 更新合同
      }
    }
  },
  props: ['formLabelWidth', 'disabled', 'editDepositForm', 'contractId', 'renewFormClick'],
  mounted () {
    $('.el-dialog--small,.el-dialog--tiny').width(650)
  },
  watch: {
    renewFormClick: function () {
      console.log(111)
      this.$options.methods.load(this)
    }
  },
  created () {
    this.$options.methods.load(this)
    console.log(222)
  },
  methods: {
    load (_this) {
      let url = _this.mix.detailCon + _this.contractId
      _this.$http.get(url).then(function (res) {
        if (res.body.code === 200) {
          // this.$options.methods.conStatus(res.body.data)
          _this.form = _this.$options.methods.conStatus(res.body.data)
          _this.form = _this.$options.methods.conList(_this.form)
          console.log(_this.form)
        }
      })
    },
    closeForm () {
      this.disable = true
      this.$emit('listenToParentEvent', false)
    },
    show () {
    },
    editForm () {
      this.$emit('editForm', true)
      this.disable = false
    },
    conList (data) { // 将房东信息从user拎到list表中
      if (data.users !== '' && data.users !== null) {
        for (var i in data.users) {
          if (data.users[i].representative === 'PARTB') {
            data.userName = data.users[i].userName
            data.phoneNum = data.users[i].userPhone
            data.cerNum = data.users[i].cerNum
            data.UserId = data.users[i].id
            data.conId = data.users[i].conId
            data.bankAccount = data.users[i].bankAccount
            data.bankOfAccounts = data.users[i].bankOfAccounts
            data.bankName = data.users[i].bankName
            data.cerType = data.users[i].certificateType
            data.contractType = 'DELEGATE'
            data.signType = 'NEW'
          }
        }
      }
      return data
    },
    conStatus (data) { // 转换合同状态以及合同生效时间以及结束时间
      var pay = data.contractStatus
      switch (pay) {
        case 'WAISIGN':
          data.contractStatusChange = '待签订'
          break
        case 'SIGNING':
          data.contractStatusChange = '签订中'
          break
        case 'ALSIGN':
          data.contractStatusChange = '已签订'
          break
        case 'EFFECT':
          data.contractStatusChange = '已生效'
          break
        case 'ENDING':
          data.contractStatusChange = '终止中'
          break
        case 'ALEND':
          data.contractStatusChange = '已结束'
          break
        case 'CANCEL':
          data.contractStatusChange = '取消'
          break
        case 'TOAUDIT':
          data.contractStatusChange = '待审核'
          break
      }
      switch (data.payCycle) {
        case 'ONEMON':
          data.payWay = '月付'
          data.payCycleChange = '1'
          break
        case 'THREEMON':
          data.payWay = '季付'
          data.payCycleChange = '2'
          break
        case 'SIXMON':
          data.payWay = '半年一付'
          data.payCycleChange = '3'
          break
        case 'TWELVEMON':
          data.payWay = '年付'
          data.payCycleChange = '4'
          break
        case 'ONEPAY':
          data.payWay = '全额'
          data.payCycleChange = '5'
          break
        case 'TWOMON':
          data.payWay = '二月付'
          data.payCycleChange = '6'
          break
        case 'FOURMON':
          data.payWay = '四月付'
          data.payCycleChange = '7'
          break
      }
      switch (data.signType) {
        case 'NEW':
          data.signType = '新签合同'
          break
        case 'SUBLET':
          data.signType = '转租合同'
          break
        case 'RENEWAL':
          data.signType = '续租合同'
          break
        case 'CHANGE':
          data.signType = '换房合同'
          break
      }
      switch (data.contractType) {
        case 'RENT':
          data.contractType = '出租合同'
          break
        case 'DELEGATE':
          data.contractType = '托管合同'
          break
      }
      var startTime = new Date(data.startTime)
      data.startTime = startTime.getFullYear() + '-' + (startTime.getMonth() + 1) + '-' + (startTime.getDate())
      var endTime = new Date(data.endTime)
      data.endTime = endTime.getFullYear() + '-' + (endTime.getMonth() + 1) + '-' + (endTime.getDate())
      data.rental1 = data.rental / 1000
      data.deposit1 = data.deposit / 1000
      if (data.rentalFreeStart !== null && data.rentalFreeStart !== '') {
        startTime = new Date(data.rentalFreeStart)
        data.rentalFreeStart1 = startTime.getFullYear() + '-' + (startTime.getMonth() + 1) + '-' + (startTime.getDate())
      }
      if (data.rentalFreeEnd !== null && data.rentalFreeEnd !== '') {
        endTime = new Date(data.rentalFreeEnd)
        data.rentalFreeEnd1 = endTime.getFullYear() + '-' + (endTime.getMonth() + 1) + '-' + (endTime.getDate())
      }
      return data
    },
    submitForm () {
      // this.disable = true
      // this.$emit('submitForm', data)
      this.form.contractId = this.form.id
      this.$http.post(this.mix.updateCon, this.form).then(({data}) => {
        var data2 = data.code
        if (data2 === 200) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.$emit('submitForm', data)
        } else {
          this.$message({
            message: data.message,
            type: 'error'
          })
          this.$options.methods.searchHouseList(this, this.mix.apiUrl, this.searchList)
        }
      })
    }
  },
  components: {
    houseRescoure1, houseUser
  }
}
$('.el-dialog--small').width(650)
</script>
<style scoped>
.houseSizeP{
  display: inline-block;
  position: absolute;
  right: 5px;
  top: 0;
}
.dialog-footer{
  text-align: right;
  padding-right: 35px;
}
</style>