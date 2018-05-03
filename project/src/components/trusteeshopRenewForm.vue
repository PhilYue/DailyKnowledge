<template>
<!-- 托管合同续期 -->
  <div>
    <el-form :model="form" ref="form" :rules="rules2" :inline="true">
      <div>
        <el-form-item label="管家" :label-width="formLabelWidth">
          <el-cascader v-model="form.housekeeperName1" placeholder="管家" :options="options2" @change="changeHouseKeeper" :props="props" :show-all-levels="false" style="width:169px;"></el-cascader>
        </el-form-item>
      </div>
      <el-form-item label="托管开始时间" :label-width="formLabelWidth" prop="effectTime" required>
          <el-date-picker type="date" placeholder="" v-model="form.effectTime"  :disabled="disabled" style="width: 169px;" :picker-options="pickerOptions"></el-date-picker>
      </el-form-item>
      <el-form-item label="托管结束时间" :label-width="formLabelWidth" prop="endTime" required>
          <el-date-picker type="date" placeholder="" v-model="form.endTime"  :disabled="disabled" style="width: 169px;" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
      <el-form-item label="免租开始时间" :label-width="formLabelWidth" prop="freeStartTime" required>
          <el-date-picker type="date" placeholder="" v-model="form.freeStartTime"  :disabled="disabled" style="width: 169px;"></el-date-picker>
      </el-form-item>
      <el-form-item label="免租结束时间" :label-width="formLabelWidth" prop="freeEndTime" required>
          <el-date-picker type="date" placeholder="" v-model="form.freeEndTime"  :disabled="disabled" style="width: 169px;"></el-date-picker>
        </el-form-item>
      <el-form-item label="收房价格" prop="rental" :label-width="formLabelWidth">
        <el-input v-model="form.rental1" auto-complete="off" placeholder="" style=""  :disabled="disabled"></el-input>
        <p class="houseSizeP">元/月</p>
      </el-form-item>
      <el-form-item label="押金" prop="trusteeshipDeposit" :label-width="formLabelWidth">
        <el-input v-model="form.deposit1" auto-complete="off" placeholder="" style=""  :disabled="disabled"></el-input>
        <p class="houseSizeP">元</p>
      </el-form-item>
      <el-form-item label="付款周期" :label-width="formLabelWidth" style="display:block">
        <el-select v-model="form.payWay" placeholder=""  :disabled="disabled" style="width:169px;">
          <el-option label="月付" value="1"></el-option>
          <el-option label="季付" value="2"></el-option>
          <el-option label="半年付" value="3"></el-option>
          <el-option label="一年付" value="4"></el-option>
          <el-option label="全付" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="租金递增方式" :label-width="formLabelWidth">
        <el-select v-model="form.addType" placeholder="" style="width:169px;">
          <el-option label="无" value="0"></el-option>
          <el-option label="按金额递增" value="1"></el-option>
          <el-option label="按百分比递增" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="按金额递增" v-if="form.addType == 1" :label-width="formLabelWidth">
        <el-input v-model="form.addAmount1" auto-complete="off" placeholder=""></el-input>
        <p class="houseSizeP">元/月</p>
      </el-form-item>
      <el-form-item label="按百分比递增" v-if="form.addType == 2" :label-width="formLabelWidth">
        <el-input v-model="form.addPer1" auto-complete="off" placeholder=""></el-input>
        <p class="houseSizeP">%</p>
      </el-form-item>
      <el-form-item label="备注":label-width="formLabelWidth" >
        <el-input type="textarea" v-model="form.remarks" style="width:470px;"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeForm()">取 消</el-button>
      <el-button type="primary" @click="submitForm('form')">确 定</el-button>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import houseRescoure1 from './houseRescoure1'  //  新建房源
import houseUser from './houseUser'  //  新建房源
export default {
  data: function () {
    return {
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      landlord: '房东',
      renter: '租客',
      repList: [],
      options2: JSON.parse(this.$store.state.currentUser.keeperData),
      props: {
        value: 'label',
        children: 'cities'
      },
      disabled: false,
      rules2: {
        housekeeperName: [{required: true, message: '请填写签约小管家', trigger: 'blur'}],
        housekeeperPhone: [{required: true, message: '请填写管家联系方式', trigger: 'blur'}],
        effectTime: [{type: 'date', required: true, message: '请选择托管开始时间', trigger: 'blur'}],
        endTime: [{type: 'date', required: true, message: '请选择托管结束时间', trigger: 'blur'}],
        freeStartTime: [{type: 'date', required: true, message: '请选择免租开始时间', trigger: 'blur'}],
        freeEndTime: [{type: 'date', required: true, message: '请选择免租结束时间', trigger: 'blur'}],
        rental1: [{required: true, message: '请填写收房价格', trigger: 'blur'}]
      }
    }
  },
  props: ['form', 'formLabelWidth'],
  mounted () {
    $('.el-dialog--small').width(650)
  },
  methods: {
    // 小管家id
    changeHouseKeeper (val) {
      var results = val[0] ? this.options2.filter(this.keeperFilter(val[0])) : this.options2
      for (var k = 0; k <= results[0].cities.length - 1; k++) {
        if (val[1] === results[0].cities[k].label) {
          this.form.housekeeperId = results[0].cities[k].id
          // console.log(results[0])
          this.form.housekeeperPhone = results[0].cities[k].phone
        }
      }
    },
    keeperFilter (queryString) { // 房东信息
      return (restaurant) => {
        return (restaurant.label.indexOf(queryString.toLowerCase()) === 0)
      }
    },
    closeForm () {
      this.$emit('listenToParentEvent', false)
    },
    remoteMethod (query) { // 小管家人员选择
      if (query !== '') {
        this.$http.post(this.$store.state.accountUrl + 'user/list', {
          userType: 'P', username: query
        }).then(({data}) => {
          var data1 = data.data.list
          var op = {}
          var option = []
          for (var i = 0; i < data1.length; i++) {
            if (data1[i].username === '' || data1[i].username === null || typeof (data1[i].username) === 'undefined') {
            } else {
              op = {}
              op.id = data1[i].id
              op.phone = data1[i].phone
              op.sex = data1[i].sex
              op.value = data1[i].username
              option.push(op)
            }
          }
          this.repList = option
          this.repList = this.repList.filter(item => {
            return item.value.toLowerCase().indexOf(query.toLowerCase()) > -1
          })
        })
      } else {
        this.repList = []
      }
    },
    change (value) { // 选中值
      var data
      data = this.repList.filter(item => {
        return item.value.toLowerCase().indexOf(value.toLowerCase()) > -1
      })
      this.form.housekeeperPhone = data[0].phone
      this.form.housekeeperId = data[0].id
    },
    querySearchAsync (queryString, cb) { // 小管家信息
      var restaurants = this.repList
      var results = queryString ? restaurants.filter(this.userFilter(queryString)) : restaurants
      cb(results)
    },
    userFilter (queryString) { // 房东信息
      return (restaurant) => {
        return (restaurant.value.indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect (item) { // 选择小管家信息
      this.form.housekeeperPhone = item.phone
      this.form.housekeeperName = item.value
      this.form.housekeeperName1 = []
      this.form.housekeeperId = item.id
      $('.el-autocomplete input').val(item.value)
    },
    submitForm (rules2) {
      console.log(this.form)
      var data = this.form
      data.originalContractId = data.id
      data.loginId = this.$store.state.currentUser.uid
      var apiUrl = this.$store.state.contractUrl + 'addDelegateContract'
      this.$refs[rules2].validate((valid) => {
        var effectTime = (new Date(this.form.effectTime)).getTime()
        data.startTime = effectTime
        var endTime = (new Date(this.form.endTime)).getTime()
        data.endTime = endTime
        var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
        var freestartTime = (new Date(this.form.freeStartTime)).getTime()
        data.freestartTime = freestartTime
        var freeendTime = (new Date(this.form.freeEndTime)).getTime()
        data.freeendTime = freeendTime
        var msg = ''
        if (endTime <= effectTime) {
          msg = '请输入正确托管结束时间'
          this.$message({
            message: msg,
            type: 'error'
          })
        } else if (freeendTime <= freestartTime) {
          msg = '请输入正确免租结束时间'
          this.$message({
            message: msg,
            type: 'error'
          })
        } else if (!reg.test(this.form.rental1) || this.form.rental1 <= 0) {
          msg = '请输入正确收房价格'
          this.$message({
            message: msg,
            type: 'error'
          })
        } else if (!reg.test(this.form.deposit1) || this.form.deposit1 < 0) {
          msg = '请输入正确押金'
          this.$message({
            message: msg,
            type: 'error'
          })
        } else if (this.form.addType === '1' && (this.form.addAmount1 === null || this.form.addAmount1 === '')) {
          msg = '请填写正确的递增金额'
          this.$message({
            message: msg,
            type: 'error'
          })
        } else if (this.form.addType === '2' && (this.form.addPer1 === null || this.form.addPer1 === '')) {
          msg = '请填写正确的递增百分比'
          this.$message({
            message: msg,
            type: 'error'
          })
        } else if (valid) {
          this.form.rental = this.form.rental1 * 1000
          this.form.deposit = this.form.deposit1 * 1000
          this.form.addAmount = this.form.addAmount1 * 1000
          this.form.addPer = this.form.addPer1 * 1000
          this.form.housekeeperName = this.form.housekeeperName1[1]
          switch (data.payWay) {
            case '1':
              data.payCycle = 'ONEMON'
              break
            case '2':
              data.payCycle = 'THREEMON'
              break
            case '3':
              data.payCycle = 'SIXMON'
              break
            case '4':
              data.payCycle = 'TWELVEMON'
              break
            case '5':
              data.payCycle = 'ONEPAY'
              break
            case '6':
              data.payCycle = 'TWOMON'
              break
            case '7':
              data.payCycle = 'FOURMON'
              break
          }
          switch (data.cerType) {
            case '身份证':
              data.cerType = 'ID'
              break
            case '2':
              data.cerType = 'PAY_PAY_QUARTERLY'
              break
            case '3':
              data.cerType = 'PAY_HALF_YEARLY'
              break
            case '4':
              data.cerType = 'PAY_ANNUAL'
              break
            case '5':
              data.cerType = 'PAY_IN_FULL'
              break
            case '6':
              data.cerType = 'PAY_BIMENSAL'
              break
            case '7':
              data.cerType = 'PAY_FOUR_MONTHLY'
              break
          }
          data.signType = 'RENEWAL'
          this.$http.post(apiUrl, data).then(({data}) => {
            if (data.code === 200) {
              this.$message({
                message: '续约成功',
                type: 'success'
              })
              this.$emit('addTrusteeshopSuccess', false)
            } else {
              this.$message({
                message: data.message,
                type: 'error'
              })
            }
          })
        } else {
          return false
        }
      })
    }
  },
  components: {
    houseRescoure1, houseUser
  }
}
$('.el-dialog--small,.el-dialog--tiny').width(650)
</script>
<style scoped>
.houseSizeP{
  display: inline-block;
  position: absolute;
  right: 5px;
  top: 0;
}
.dialog-footer{
  text-align: center;
}
</style>
