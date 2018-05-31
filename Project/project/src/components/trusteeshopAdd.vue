<template>
<!-- 新建托管合同 -->
	<div>
		<el-form :model="form" :inline="true">
		  <el-form-item label="房东姓名" :label-width="formLabelWidth" class="is-required">
		    <el-autocomplete class="inline-input" v-model="form.userName" :fetch-suggestions="userQuerySearch" placeholder="请输入内容" @select="userSelect"></el-autocomplete>
		  </el-form-item>
		  <el-form-item label="房东联系方式" :label-width="formLabelWidth" class="is-required">
		    <el-input v-model="form.phoneNum" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-form-item label="房东证件" :label-width="formLabelWidth" class="is-required">
		    <el-select v-model="form.cerType" placeholder="" style="width:169px">
		      <el-option label="身份证" value="ID"></el-option>
		      <el-option label="护照" value="P"></el-option>
		      <el-option label="驾驶执照" value="DL"></el-option>
		      <el-option label="工商营业执照" value="BL"></el-option>
		    </el-select>
		    <el-input v-model="form.cerNum" prop="cerNum" auto-complete="off" style="width:190px" :minlength="15" :maxlength="18"></el-input>
		  </el-form-item>
      <el-form-item label="管家" :label-width="formLabelWidth"  class="is-required">
        <el-cascader v-model="form.housekeeper" placeholder="管家" :options="options2" @change="changeHouseKeeper" :props="props" :show-all-levels="false" style="width:169px;"></el-cascader>
      </el-form-item>
      <el-form-item label="房源编号" :label-width="formLabelWidth">
        <el-input v-model="form.businessId" :disabled="true" auto-complete="off" style="width:165px"></el-input>
      </el-form-item>
      <el-form-item label="地址" :label-width="formLabelWidth">
        <input style="width:470px;" type="text" class="el-input__inner is-disabled" :value="form.keywordAddress" name="">
      </el-form-item>
      <el-form-item label="托管开始时间" :label-width="formLabelWidth"  class="is-required" >
        <el-date-picker type="date" placeholder="" v-model="form.effectTime" style="width: 165px;"></el-date-picker>
      </el-form-item>
      <el-form-item label="托管结束时间" :label-width="formLabelWidth"  class="is-required">
        <el-date-picker type="date" placeholder="" v-model="form.endTime"  style="width: 165px;"></el-date-picker>
      </el-form-item>
      <el-form-item label="免租开始时间" :label-width="formLabelWidth"  class="is-required">
          <el-date-picker type="date" placeholder="" v-model="form.freeStartTime"  style="width: 165px;"></el-date-picker>
        </el-form-item>
        <el-form-item label="免租结束时间" :label-width="formLabelWidth"  class="is-required">
          <el-date-picker type="date" placeholder="" v-model="form.freeEndTime"  style="width: 165px;"></el-date-picker>
        </el-form-item>
      <el-form-item label="收房价格" :label-width="formLabelWidth"  class="is-required">
        <el-input v-model="form.rental1" auto-complete="off" placeholder=""></el-input>
        <p class="houseSizeP">元/月</p>
      </el-form-item>
      <el-form-item label="押金" :label-width="formLabelWidth"  class="is-required">
        <el-input v-model="form.deposit1" auto-complete="off" placeholder="" style=""></el-input>
        <p class="houseSizeP">元</p>
      </el-form-item>
      <el-form-item label="付款周期" :label-width="formLabelWidth" style="display:block">
        <el-select v-model="form.payCycle1" placeholder="请选择" style="width:169px;">
          <el-option label="月付" value="1"></el-option>
          <el-option label="二月付" value="6"></el-option>
          <el-option label="四月付" value="7"></el-option>
          <el-option label="季付" value="2"></el-option>
          <el-option label="半年付" value="3"></el-option>
          <el-option label="一年付" value="4"></el-option>
          <el-option label="全付" value="5"></el-option>
        </el-select>
      </el-form-item>
      <div>
	      <el-form-item label="租金递增方式" :label-width="formLabelWidth">
	        <el-select v-model="addType" placeholder="" style="width:169px;" @change="openAddType">
	          <el-option label="无" value="NOTRISE"></el-option>
	          <el-option label="按金额递增" value="RISEBYAMOUNT"></el-option>
	          <el-option label="按百分比递增" value="RISEBYPER"></el-option>
            <el-option label="不规则递增" value="3"></el-option>
	        </el-select>
	      </el-form-item>
	      <el-form-item label="按金额递增" v-if="addType === 'RISEBYAMOUNT'" :label-width="formLabelWidth">
	        <el-input v-model="form.addAmount1" auto-complete="off" placeholder=""></el-input>
	        <p class="houseSizeP">元/月</p>
	      </el-form-item>
	      <el-form-item label="按百分比递增" v-if="addType === 'RISEBYPER'" :label-width="formLabelWidth">
	        <el-input v-model="form.addPer1" auto-complete="off" placeholder=""></el-input>
	        <p class="houseSizeP">%</p>
	      </el-form-item>
      </div>
      <div>
        <el-form-item label="水底数" :label-width="formLabelWidth" class="is-required">
          <el-input v-model="form.waterMeterNumber1" auto-complete="off" placeholder="" style=""></el-input>
        </el-form-item>
        <el-form-item label="电底数" :label-width="formLabelWidth" class="is-required">
          <el-input v-model="form.electricMeterNumber1" auto-complete="off" placeholder="" style=""></el-input>
        </el-form-item>
        <el-form-item label="天然气底数" :label-width="formLabelWidth" class="is-required">
          <el-input v-model="form.gasMeterNumber1" auto-complete="off" placeholder="" style=""></el-input>
        </el-form-item>
      </div>
		  <el-form-item label="收款账号" :label-width="formLabelWidth" class="is-required">
		    <el-input v-model="form.bankAccount" auto-complete="off" placeholder="" style=""></el-input>
		  </el-form-item>
		  <el-form-item label="收款银行" :label-width="formLabelWidth">
		    <el-select v-model="form.bankName" placeholder="" style="width:169px;" @change="backChange">
			    <el-option :label="bank.bankName" :value="bank.bankName" :key="bank.bankName" v-for="bank in bankList"></el-option>
			  </el-select>
		  </el-form-item>
		  <el-form-item label="开户支行" :label-width="formLabelWidth" class="is-required">
		    <el-input v-model="form.bankOfAccounts" auto-complete="off" placeholder="" style=""></el-input>
        <!-- <el-autocomplete
          class="inline-input"
          v-model="form.bankOfAccounts"
          :fetch-suggestions="bankQuerySearch"
          placeholder="请输入内容"
        ></el-autocomplete> -->
		  </el-form-item>
		  <el-form-item label="备注" :label-width="formLabelWidth">
		    <el-input type="textarea" placeholder="" v-model="form.remarks" style="width:444px;"></el-input>
		  </el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
		  <el-button @click="closeForm()">取 消</el-button>
		  <el-button type="primary" @click="submitForm('form')">确 定</el-button>
		</div>

    <el-dialog title="定义递增方式" :visible.sync="addTypeShow" :modal="modal" size="full">
      <el-form :model="form" :inline="true" label-width="100px">
        <div>
          <table style="width:100%;" border="1">
            <tr>
              <td>开始时间</td>
              <td>结束时间</td>
              <td>金额</td>
              <td>免租开始时间</td>
              <td>免租结束时间</td>
              <td style="width:28%;">递增标准</td>
            </tr>
            <tr>
              <td><p>{{effectTime}}</p></td>
              <td><p>{{endTime}}</p></td>
              <td><p>{{form.rental1}}</p></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr v-for="(item, index) in addWay">
              <td>
                  <el-date-picker
                    v-model="item.time"
                    type="date"
                    size="mini"
                    class="date"
                    :style="width">
                  </el-date-picker>
              </td>
              <td>
                  <el-date-picker
                    v-model="item.endtime"
                    type="date"
                    size="mini"
                    class="date"
                    @change="chooseEndTime(item, index)"
                    :style="width">
                  </el-date-picker>
              </td>
              <td>
                  <el-input v-model="item.amount" auto-complete="off" :style="width" size="mini"></el-input>
              </td>
              <td>
                  <el-date-picker type="date" class="date" placeholder="" v-model="item.rentFreeStart" size="mini" :style="width"></el-date-picker>
              </td>
              <td>
                  <el-date-picker
                    v-model="item.rentFreeEnd"
                    type="date"
                    size="mini"
                    class="date"
                    @onClick="chooseTime(item)"
                    :style="width">
                  </el-date-picker>
              </td>
              <td>
                  <el-form-item label="" label-width="0px" style="margin-right:0px; margin-bottom:0; line-height:22px;">
                    <el-input v-model="item.addPer1" auto-complete="off" placeholder="" size="mini" @change="changePrice(item, index)" style="width:70px"></el-input>
                    <p class="houseSizeP">%</p>
                  </el-form-item>
                  <el-form-item label="" label-width="0px" style="margin-right:0px; margin-bottom:0; line-height:22px;">
                    <el-input v-model="item.addAmount1" auto-complete="off" placeholder="" size="mini" @change="changePrice(item, index)" style="width:90px"></el-input>
                    <p class="houseSizeP">元/月</p>
                  </el-form-item>
                  <div class="aaa" v-if="index === (addWay.length - 1)"><p class="add" @click="addHouseType"></p></div>
              </td>
            </tr>
          </table>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addTypeShow = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd">确 定</el-button>
      </div>
    </el-dialog>
	</div>
</template>
<script>
import $ from 'jquery'
export default {
  name: 'trusteeshopAdd',
  data: function () {
    return {
      landlord: '房东',
      renter: '租客',
      options2: [],
      state1: [],
      props: {
        value: 'label',
        children: 'cities'
      },
      form: {
        landlordId: '',
        houseSpaceManagerId: '',
        businessId: '',
        blockName: '',
        detailAddress: '',
        cerType: 'ID',
        cerNum: '',
        effectTime: '', // 托管开始时间
        endTime: '', // 托管结束时间
        freeStartTime: '', // 免租开始时间
        freeEndTime: '', // 免租结束时间
        rental: '', // 收房价格
        deposit: 0, // 押金
        payWay: '1',
        payCycle: '1', // 支付周期
        payCycle1: '1', // 支付周期
        addType: 'NOTRISE', // 租金递增方式
        addAmount: '', // 租金递增金额
        houseFeatureEnumList: '',
        addPer: '', // 租金递增百分比
        addAmount1: '', // 租金递增金额
        addPer1: '', // 租金递增百分比
        buildingNo: '1', // 楼号
        unitNo: '', // 单元号
        roomNo: '', // 室号
        payeeName: '', // 收款人姓名
        deposit1: '',
        bankAccount: '', // 收款账号
        bankName: '2', // 收款银行
        bankOfAccounts: '', // 开户支行
        remark: '',
        conType: '1', // 合同分类
        housekeeper: [],
        housekeeperName: '', // 小管家姓名
        housekeeperPhone: '', // 小管家联系方式
        landlordName: '',
        waterMeterReading: '', // 水表读数
        electricMeterReading: '', // 电表读数
        gasMeterReading: '', // 天然气读数
        waterMeterNumber1: '', // 水表读数
        electricMeterNumber1: '', // 电表读数
        gasMeterNumber1: '', // 天然气读数
        landlordCertType: 'ID', // 房东证件类型
        landlordCertNumber: '', // 房东证件号
        landlordPhone: '' // 房东手机号
      },
      form1: {
        landlordId: '',
        houseSpaceManagerId: '',
        businessId: '',
        blockName: '',
        cerType: 'ID',
        cerNum: '',
        detailAddress: '',
        effectTime: '', // 托管开始时间
        endTime: '', // 托管结束时间
        freeStartTime: '', // 免租开始时间
        freeEndTime: '', // 免租结束时间
        rental: '', // 收房价格
        deposit: 0,
        deposit1: '',
        payWay: '1',
        payCycle: '1', // 支付周期
        payCycle1: '1', // 支付周期
        addType: 'NOTRISE', // 租金递增方式
        addAmount: '', // 租金递增金额
        houseFeatureEnumList: '',
        addPer: '', // 租金递增百分比
        addAmount1: '', // 租金递增金额
        addPer1: '', // 租金递增百分比
        buildingNo: '1', // 楼号
        unitNo: '', // 单元号
        roomNo: '', // 室号
        payeeName: '', // 收款人姓名
        bankAccount: '', // 收款账号
        bankName: '2', // 收款银行
        bankOfAccounts: '', // 开户支行
        remark: '',
        conType: '1', // 合同分类
        housekeeper: [],
        housekeeperName: '', // 小管家姓名
        housekeeperPhone: '', // 小管家联系方式
        landlordName: '',
        waterMeterReading: '', // 水表读数
        electricMeterReading: '', // 电表读数
        gasMeterReading: '', // 天然气读数
        waterMeterNumber1: '', // 水表读数
        electricMeterNumber1: '', // 电表读数
        gasMeterNumber1: '', // 天然气读数
        landlordCertType: 'ID', // 房东证件类型
        landlordCertNumber: '', // 房东证件号
        landlordPhone: '' // 房东手机号
      },
      rules2: {
        userName: [{required: true, message: '请填写房东姓名', trigger: 'blur'}],
        phoneNum: [{required: true, message: '请填写房东联系方式', trigger: 'blur'}],
        cerNum: [{required: true, message: '请填写房东证件号码', trigger: 'blur'}],
        // effectTime: [{type: 'date', required: true, message: '请选择托管开始时间', trigger: 'blur'}],
        // endTime: [{type: 'date', required: true, message: '请选择托管结束时间', trigger: 'blur'}],
        // freeStartTime: [{type: 'date', required: true, message: '请选择免租开始时间', trigger: 'blur'}],
        // freeEndTime: [{type: 'date', required: true, message: '请选择免租结束时间', trigger: 'blur'}],
        bankAccount: [{required: true, message: '请填写收款账号', trigger: 'blur'}],
        bankOfAccounts: [{required: true, message: '请填写开户支行', trigger: 'blur'}],
        waterMeterNumber1: [{required: true, message: '请填写水表底数', trigger: 'blur'}],
        electricMeterNumber1: [{required: true, message: '请填写电表底数', trigger: 'blur'}],
        gasMeterNumber1: [{required: true, message: '请填写天然气表底数', trigger: 'blur'}]
      },
      count: 0,
      landlordList: [],
      restaurants: [
        { 'value': '德信晓宸', 'id': '' },
        { 'value': '八方城', 'id': '' },
        { 'value': '德信东望', 'id': '' }
      ],
      bankRestaurants: [],
      repList: [],
      int: 0,
      bankList: [],
      addTypeShow: false, // 控制自定义递增规则弹窗
      modal: false,
      addType: 'NOTRISE',
      width: 'width: 75px;',
      effectTime: '',
      endTime: '',
      addWay: [ // 不规则递增方式
        {
          time: '',
          getPrice: '',
          addAmount: '',
          addPer: '',
          addAmount1: '',
          addPer1: '',
          rentFreeEnd: '',
          rentFreeStart: ''
        }
      ],
      bankSearch: this.$store.state.searchUrl + 'baseDataInfo' // 查询银行
      // trusteeshipAdd: {}
    }
  },
  props: ['trusteeshipAdd', 'houseId', 'formLabelWidth', 'disable', 'mix', 'countClick'],
  watch: {
    countClick: function (value) {
      // 加载个人身份信息
      let url = this.mix.userId + this.trusteeshipAdd.uId
      this.form = $.extend({}, this.form1, this.trusteeshipAdd)
      this.form1 = $.extend({}, this.form1, this.trusteeshipAdd)
      console.log(this.form)
      this.$http.get(url).then(function (res) {
        if (res.body.code === 200) {
          this.form.cerNum = res.body.data.certNumber
          this.form.cerType = res.body.data.certType
        }
      })
      let req = {}
      req.type = 'FIRST_LEVEL_BANK_INFO'
      let _this = this
      $.ajax({
        url: this.bankSearch,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        Accept: 'application/*; charset=utf-8',
        data: '{"type":"FIRST_LEVEL_BANK_INFO"}',
        success: function (res) {
          if (res.code === 200) {
            _this.bankList = res.data
            _this.form.bankName = res.data[0].bankName
            _this.form1.bankName = res.data[0].bankName
          }
        }
      })
      // let arr = []
      // let req1 = {}
      // req1.type = 'SECOND_LEVEL_BANK_INFO'
      // req1.keyword = _this.form.bankName
      // req1.bankName = _this.form.bankName
      // this.$http.post(this.bankSearch, req1).then(function (res) {
      //   console.log(res.body)
      //   if (res.body.code === 200) {
      //     console.log(res.body)
      //     for (var i = 0; i < res.body.data; i++) {
      //       let list = {}
      //       list.value = res.data[i].branchBankName
      //       arr.push(arr)
      //     }
      //     _this.bankRestaurants = arr
      //     _this.form.bankOfAccounts = res.data[0].branchBankName
      //   }
      // })
      // $.ajax({
      //   url: this.bankSearch,
      //   type: 'POST',
      //   dataType: 'json',
      //   contentType: 'application/json; charset=utf-8',
      //   Accept: 'application/*; charset=utf-8',
      //   data: '{"type": "SECOND_LEVEL_BANK_INFO", "keyword": "' + _this.form.bankName + '", "bankName": "' + _this.form.bankName + '"}',
      //   success: function (res) {
      //     if (res.code === 200) {
      //       console.log(res)
      //       for (var i = 0; i < res.data.length; i++) {
      //         let list = {}
      //         list.value = res.data[i].branchBankName
      //         arr.push(arr)
      //       }
      //       _this.bankRestaurants = arr
      //       _this.form.bankOfAccounts = res.data[0].branchBankName
      //       console.log(arr)
      //     }
      //   }
      // })
    }
  },
  mounted () {
    if (this.int === 0) {
      $('.el-dialog--small,.el-dialog--tiny').width(650)
      this.form = $.extend({}, this.form1, this.trusteeshipAdd)
      this.form1 = $.extend({}, this.form1, this.trusteeshipAdd)
      this.options2 = JSON.parse(this.$store.state.currentUser.keeperData)
      this.int = 0
      // 加载个人身份信息
      let url = this.mix.userId + this.trusteeshipAdd.uId
      this.$http.get(url).then(function (res) {
        if (res.body.code === 200) {
          this.form.cerNum = res.body.data.certNumber
          this.form.cerType = res.body.data.certType
        }
      })
      let _this = this
      let req = {}
      req.type = 'FIRST_LEVEL_BANK_INFO'
      $.ajax({
        url: this.bankSearch,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        Accept: 'application/*; charset=utf-8',
        data: '{"type":"FIRST_LEVEL_BANK_INFO"}',
        success: function (res) {
          if (res.code === 200) {
            _this.bankList = res.data
            _this.form.bankName = res.data[0].bankName
            _this.form1.bankName = res.data[0].bankName
          }
        }
      })
      _this.$options.methods.backChange(_this.form.bankName)
      // let arr = []
      // let req1 = {}
      // req1.type = 'SECOND_LEVEL_BANK_INFO'
      // req1.keyword = _this.form.bankName
      // req1.bankName = _this.form.bankName
      // this.$http.post(this.bankSearch, req1).then(function (res) {
      //   console.log(res.body)
      //   if (res.body.code === 200) {
      //     console.log(res.body)
      //     for (var i = 0; i < res.body.data; i++) {
      //       let list = {}
      //       list.value = res.data[i].branchBankName
      //       arr.push(arr)
      //     }
      //     _this.bankRestaurants = arr
      //     _this.form.bankOfAccounts = res.data[0].branchBankName
      //   }
      // })
    }
  },
  methods: {
    // 小管家id
    changeHouseKeeper (val) {
      var results = val[0] ? this.options2.filter(this.keeperFilter(val[0])) : this.options2
      this.form.housekeeper = val
      for (var k = 0; k <= results[0].cities.length - 1; k++) {
        if (val[1] === results[0].cities[k].label) {
          this.form.housekeeperId = results[0].cities[k].id
          this.form.housekeeperPhone = results[0].cities[k].phone
          this.form.housekeeperName = val[1]
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
      this.form = this.form1
    },
    show () {
    },
    submitForm (rules2) {
      var data1 = this.form
      data1.signType = 'NEW'
      data1.contractType = 'DELEGATE'
      var apiUrl = this.$store.state.contractUrl + 'addDelegateContract'
      // var apiUrl = this.$store.state.contractUrl + 'addTrusteeshipContract'
      var effectTime = (new Date(this.form.effectTime)).getTime()
      var endTime = (new Date(this.form.endTime)).getTime()
      var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
      var freestartTime = (new Date(this.form.freeStartTime)).getTime()
      var freeendTime = (new Date(this.form.freeEndTime)).getTime()
      var msg = ''
      data1.rental1 = parseInt(data1.rental1)
      data1.deposit1 = parseInt(data1.deposit1)
      data1.phoneNum = parseInt(data1.phoneNum)
      if (data1.userName === '' || data1.phoneNum === '' || isNaN(data1.phoneNum) || data1.cerNum === '') {
        msg = '请输入房东信息'
        this.$message({
          message: msg,
          type: 'error'
        })
        if (data1.phoneNum === '' || isNaN(data1.phoneNum)) {
          this.form.phoneNum = ''
        }
      } else if (endTime <= effectTime) {
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
      } else if (!reg.test(data1.rental1) || data1.rental1 < 0) {
        msg = '请输入正确收房价格'
        this.$message({
          message: msg,
          type: 'error'
        })
        this.form.rental1 = ''
        this.form.deposit1 = ''
      } else if (!reg.test(data1.deposit1) || data1.deposit1 <= 0) {
        msg = '请输入正确押金'
        this.$message({
          message: msg,
          type: 'error'
        })
        this.form.deposit1 = ''
      } else if (!reg.test(data1.waterMeterNumber1) || data1.waterMeterNumber1 < 0) {
        msg = '请输入正确水表底数'
        this.$message({
          message: msg,
          type: 'error'
        })
      } else if (!reg.test(data1.electricMeterNumber1) || data1.electricMeterNumber1 < 0) {
        msg = '请输入正确电表底数'
        this.$message({
          message: msg,
          type: 'error'
        })
      } else if (!reg.test(data1.gasMeterNumber1) || data1.gasMeterNumber1 < 0) {
        msg = '请输入正确天然气表底数'
        this.$message({
          message: msg,
          type: 'error'
        })
      } else if (data1.housekeeperId === '' || data1.housekeeperId === null) {
        msg = '请选择管家'
        this.$message({
          message: msg,
          type: 'error'
        })
      } else {
        data1.rental = data1.rental1 * 1000
        data1.deposit = data1.deposit1 * 1000
        data1.addAmount = data1.addAmount1 * 1000
        data1.addPer = data1.addPer1 * 1000
        data1.waterMeterReading = data1.waterMeterNumber1 * 1000
        data1.electricMeterReading = data1.electricMeterNumber1 * 1000
        data1.gasMeterReading = data1.gasMeterNumber1 * 1000
        data1.housekeeperName = data1.housekeeper[1]
        // this.$store.commit('getMidWorkflowToken', {'processKey': 'maintain', 'processTenantId': unitId})
        this.$http.post(apiUrl, {
          'addType': data1.addType,
          'addAmount': data1.addAmount,
          'addPer': data1.addPer,
          'bankAccount': data1.bankAccount,
          'bankName': data1.bankName,
          'bankOfAccounts': data1.bankOfAccounts,
          'certificateNum': data1.cerNum,
          'certificateType': data1.cerType,
          'contractType': 'DELEGATE',
          'deposit': data1.deposit,
          'startTime': data1.effectTime,
          'endTime': data1.endTime,
          'inputPersonnelId': this.$store.state.currentUser.uid,
          'houseSpaceId': data1.houseSpaceManagerId,
          'housekeeperId': data1.housekeeperId,
          'housekeeperName': data1.housekeeperName,
          'housekeeperPhone': data1.housekeeperPhone,
          'payCycle': data1.payCycle,
          'userPhone': data1.phoneNum,
          'memo': data1.remarks,
          'rentFreeEnd': data1.rentFreeEnd,
          'rentFreeStart': data1.rentFreeStart,
          'rental': data1.rental,
          'sex': data1.sex,
          'signType': 'NEW',
          'userName': data1.userName,
          'loginId': this.$store.state.currentUser.uid,
          'unitId': data1.zoneId
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(({data}) => {
          if (data.code === 200) {
            this.$message({
              message: '合同新建成功',
              type: 'success'
            })
            this.form = this.form1
            this.$emit('addTrusteeshopSuccess', false)
          } else {
            this.$message({
              message: data.message,
              type: 'error'
            })
          }
        })
      }
    },
    userQuerySearch (queryString, cb) { // 房东信息
      var dataList = {}
      dataList.userType = 'P'
      // 搜索房东
      this.$options.methods.landlordSearch(this, this.mix.userUrl, dataList)
      // }
      var restaurants = this.landlordList
      var results = queryString ? restaurants.filter(this.userFilter(queryString)) : restaurants
      var result = []
      for (var i = 0; i < results.length && i < 5; i++) {
        result[i] = results[i]
      }
      // 调用 callback 返回建议列表的数据
      cb(result)
    },
    userFilter (queryString) { // 房东信息
      return (restaurant) => {
        return (restaurant.value.indexOf(queryString.toLowerCase()) === 0)
      }
    },
    userSelect (item) { // 选择房东信息
      this.form.phoneNum = item.phone
      this.form.userId = item.id
      this.form.sex = item.sex
      var url = this.mix.userId + item.id
      this.$http.get(url).then(({data}) => {
        console.log(data)
        if (data.data) {
          this.form.cerType = data.data.certType
          this.form.cerNum = data.data.certNumber
        }
      })
    },
    querySearch (queryString, cb) { // 小区信息
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) { // 小区信息
      return (restaurant) => {
        return (restaurant.value.indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect (item) { // 选择小区信息
    },
    landlordSearch (_this, userUrl, dataList) { // 搜索房东信息
      _this.$http.post(userUrl, dataList).then(({data}) => {
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
        _this.landlordList = option
      })
    },
    repSearch (_this, userUrl, dataList) { // 搜索房东信息
      _this.$http.post(userUrl, dataList).then(({data}) => {
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
        _this.repList = option
      })
    },
    backChange (value) { // 根据银行搜索支行信息
      let _this = this
      $.ajax({
        url: this.bankSearch,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        Accept: 'application/*; charset=utf-8',
        data: '{"type": "SECOND_LEVEL_BANK_INFO", "keyword": "' + value + '", "bankName": "' + value + '"}',
        success: function (res) {
          for (var i = 0; i < res.data.length; i++) {
            _this.bankRestaurants.value = res.data.branchBankName
          }
          // _this.form.bankOfAccounts = res.data[0].branchBankName
        }
      })
    },
    bankQuerySearch (queryString, cb) { // 根据搜索内容提供建议
      var restaurants = this.bankRestaurants
      console.log(this)
      console.log(this.bankRestaurants)
      var results = queryString ? restaurants.filter(this.createFilter1(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter1 (queryString) {
      return (restaurant) => {
        return (restaurant.value.indexOf(queryString.toLowerCase()) === 0)
      }
    },
    openAddType (value) { // 打开不规则递增
      var effectTime = (new Date(this.form.effectTime)).getTime()
      var endTime = (new Date(this.form.endTime)).getTime()
      var addType = this.form.addType
      if (value === '3') {
        if (isNaN(effectTime)) {
          this.$message({
            message: '请先选择合同结束时间',
            type: 'error'
          })
          this.addType = addType
        } else if (isNaN(endTime)) {
          this.$message({
            message: '请先选择合同开始时间',
            type: 'error'
          })
          this.addType = addType
        } else if (this.form.rental1 === '' || this.form.rental1 === null) {
          this.$message({
            message: '请先输入收房价格',
            type: 'error'
          })
          this.addType = addType
        } else {
          let len = Math.ceil((endTime - effectTime) / (365 * 24 * 60 * 60 * 1000))
          // 计算开始时间
          effectTime = new Date(effectTime)
          let year1 = effectTime.getFullYear()
          let month1 = effectTime.getMonth() + 1
          let day1 = effectTime.getDate()
          // 计算合同开始时间
          this.effectTime = effectTime.getFullYear() + '-' + (effectTime.getMonth() + 1) + '-' + effectTime.getDate()
          // 计算结束时间
          effectTime = new Date(effectTime - 24 * 60 * 60 * 1000)
          let year = effectTime.getFullYear()
          let month = effectTime.getMonth() + 1
          let day = effectTime.getDate()
          // 计算合同结束时间
          endTime = new Date(endTime)
          this.endTime = endTime.getFullYear() + '-' + (endTime.getMonth() + 1) + '-' + endTime.getDate()

          let obj = []
          this.addWay = []
          if ((month === 2 && day === 28 && !this.$options.methods.getYear(year)) || (month === 2 && day === 29 && this.$options.methods.getYear(year))) {
            for (let i = 0; i < len; i++) {
              let time
              if (this.$options.methods.getYear(year + i)) {
                time = (year + i + 1) + '-2-29'
              } else {
                time = (year + i + 1) + '-2-29'
              }
              let list = {}
              list.time = (year1 + i) + '-03-01'
              list.endtime = time
              list.getPrice1 = ''
              list.amount = this.form.rental1
              list.addAmount = ''
              list.addPer = ''
              list.addAmount1 = 0
              list.addPer1 = 0
              list.rentFreeEnd = ''
              list.rentFreeStart = ''
              obj.push(list)
              this.addWay = obj
              console.log(list)
              console.log(this.addWay)
            }
          } else {
            for (let i = 0; i < len; i++) {
              let time = (year + i + 1) + '-' + month + '-' + day
              let list = {}
              let getPrice1 = this.form.rental1
              list.time = (year1 + i) + '-' + month1 + '-' + day1
              list.endtime = time
              list.getPrice1 = getPrice1
              list.amount = getPrice1
              list.addAmount = ''
              list.addPer = ''
              list.addAmount1 = 0
              list.addPer1 = 0
              list.rentFreeEnd = ''
              list.rentFreeStart = ''
              list.getPrice1 = ''
              obj.push(list)
              this.addWay = obj
            }
          }
          this.form.addType = value
          this.addType = this.form.addType
          this.addTypeShow = true
        }
      } else {
        this.form.addType = value
      }
    },
    getYear (year) {
      return (year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0)
    },
    changePrice (item, index) { // 按比例递增
      if (index === 0) {
        item.amount = this.form.rental1 * (this.addWay[index].addPer1 / 100 + 1)
      } else {
        item.amount = this.addWay[index - 1].amount * (this.addWay[index].addPer1 / 100 + 1)
      }
      var len = this.addWay.length
      for (let i = 0; i < len; i++) {
        if (!isNaN(this.addWay[i].addAmount1) && this.addWay[i].addAmount1 !== 0) {
          // 当金额存在且不为零时，以金额算
          if (i === 0) {
            this.addWay[i].amount = parseInt(this.form.rental1) + parseInt(this.addWay[i].addAmount1)
          } else {
            this.addWay[i].amount = parseInt(this.addWay[i - 1].amount) + parseInt(this.addWay[i].addAmount1)
          }
        } else if ((this.addWay[i].addAmount1 === 0 || isNaN(this.addWay[i].addAmount1)) && isNaN(this.addWay[i].addPer1) && this.addWay[i].addPer1 !== 0) {
          // 比存在且不为0 且金额不存在或者金额为0
          if (i === 0) {
            this.addWay[i].amount = this.form.rental1 * (this.addWay[i].addPer1 / 100 + 1)
          } else {
            this.addWay[i].amount = this.addWay[i - 1].amount * (this.addWay[i].addPer1 / 100 + 1)
          }
        } else if ((isNaN(this.addWay[i].addAmount1) && isNaN(this.addWay[i].addPer1)) || ((this.addWay[i].addAmount1) === 0 && this.addWay[i].addPer1) === 0) {
          // 如果百分比以及金额全为空，则设备份比以及金额全为0
          this.addWay[i].addPer1 = 0
          this.addWay[i].addAmount1 = 0
          if (i === 0) {
            this.addWay[i].amount = this.form.rental1
          } else {
            this.addWay[i].amount = this.addWay[i - 1].amount
          }
        }
      }
    },
    changePrice1 (item, index) { // 按金额递增
      if (index === 0) {
        item.amount = parseInt(this.form.rental1) + parseInt(this.addWay[index].addAmount1)
      } else {
        item.amount = parseInt(this.addWay[index - 1].amount) + parseInt(this.addWay[index].addAmount1)
      }
    },
    chooseTime (value) {
      console.log(value)
    },
    chooseEndTime (item, index) {
      console.log(item)
      // 合同生效时间
      // let effectTime = (new Date(this.form.effectTime)).getTime()
      // 合同结束时间
      let endTime = (new Date(this.endTime)).getTime()
      // 最后结束时间
      // ****
      // 格式化结束时间
      let lastEndTime = new Date(item.endtime)
      lastEndTime = lastEndTime.getFullYear() + '-' + (lastEndTime.getMonth() + 1) + '-' + lastEndTime.getDate() + ' 00:00:00'
      lastEndTime = (new Date(item.endtime)).getTime()
      let len = this.addWay.length
      if (lastEndTime > endTime) {
        this.$message({
          message: '当前结束时间不应晚于合同结束时间，请重新选择',
          type: 'error'
        })
        item.endtime = ''
      } else {
        // 循环验证index之后的表格时间与当前结束时间的大小
        for (let i = (index + 1); i < len; i++) {
          // this.addWay[i]的开始时间
          // let start1 = (new Date(this.addWay[i].time)).getTime()
          // this.addWay[i]的结束时间
          let end1 = new Date(this.addWay[i].endtime)
          end1 = end1.getFullYear() + '-' + (end1.getMonth() + 1) + '-' + end1.getDate() + ' 00:00:00'
          end1 = (new Date(end1)).getTime()
          // 如果当前的结束时间晚于this.addWay[i]的结束时间。则删除this.addWay[i]
          if (lastEndTime >= end1) {
            this.addWay.splice(i, 1)
            i--
            len--
          } else {
            // 如果当前的结束时间晚于this.addWay[i]的结束时间。则this.addWay[i]的开始时间为当前结束时间的之后一天
            let time = new Date(lastEndTime + 24 * 60 * 60 * 1000)
            this.addWay[i].time = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate()
          }
        }
      }
    },
    addHouseType () {
      let list = {}
      list.time = ''
      list.endtime = ''
      list.getPrice = ''
      list.addAmount = ''
      list.addPer = ''
      list.addAmount1 = 0
      list.addPer1 = 0
      list.rentFreeEnd = ''
      list.rentFreeStart = ''
      list.getPrice1 = ''
      list.amount = ''
      this.addWay.push(list)
    },
    submitAdd () {
      let len = this.addWay.length
      let arr = []
      let count = 0
      for (let i = 0; i < len; i++) {
        // 格式化开始时间
        let s = new Date(this.addWay[i].time)
        s = s.getFullYear() + '-' + (s.getMonth() + 1) + '-' + s.getDate() + ' 00:00:00'
        s = (new Date(s)).getTime()
        // 格式化结束时间
        let e = new Date(this.addWay[i].endtime)
        e = e.getFullYear() + '-' + (e.getMonth() + 1) + '-' + e.getDate() + ' 24:00:00'
        e = (new Date(e)).getTime()
        // 格式化免租开始时间
        let fs = new Date(this.addWay[i].rentFreeStart)
        fs = fs.getFullYear() + '-' + (fs.getMonth() + 1) + '-' + fs.getDate() + ' 00:00:00'
        fs = (new Date(fs)).getTime()
        // 格式化免租结束时间
        let fe = new Date(this.addWay[i].rentFreeEnd)
        fe = fe.getFullYear() + '-' + (fe.getMonth() + 1) + '-' + fe.getDate() + ' 24:00:00'
        fe = (new Date(fe)).getTime()

        // 判断免租开始时间以及免租结束时间是否同时存在
        console.log((isNaN(fs)))
        if ((isNaN(fs) && isNaN(fe)) || (!isNaN(fs) && !isNaN(fe))) {
          // 开始检测数据正确性
          if (fs < s) {
            this.$message({
              message: '请确保免租开始时间晚于开始时间',
              type: 'error'
            })
            count++
            break
          } else if (fe > e) {
            this.$message({
              message: '请确保免租结束时间早于结束时间',
              type: 'error'
            })
            count++
            break
          } else if (fs >= fe) {
            this.$message({
              message: '请确保免租开始时间早于免租结束时间',
              type: 'error'
            })
            count++
            break
          } else {
            // 开始检测免租期所处位置以便将相应的计费时间传递给后台
            // this.form.addWay = this.addWay
            // this.addTypeShow = false
            let list = {}
            list.initialAmount = this.addWay[i].amount * 1000
            if (this.addWay[i].addAmount1 !== null && this.addWay[i].addPer1 !== null && this.addWay[i].addAmount1 !== 0 && this.addWay[i].addPer1 !== 0) {
              list.addType = 'RISEBYAMOUNT'
              list.addAmount = this.addWay[i].addAmount1 * 1000
            } else if (this.addWay[i].addAmount1 !== null && this.addWay[i].addPer1 !== null && this.addWay[i].addAmount1 !== 0 && this.addWay[i].addPer1 === 0) {
              list.addType = 'RISEBYAMOUNT'
              list.addAmount = this.addWay[i].addAmount1 * 1000
            } else if (this.addWay[i].addAmount1 !== null && this.addWay[i].addPer1 !== null && this.addWay[i].addAmount1 === 0 && this.addWay[i].addPer1 !== 0) {
              list.addType = 'RISEBYPER'
              list.addPer = this.addWay[i].addPer1 * 1000
            }
            console.log(1, list)
            if (fs === s) {
              list.startChargTime = fe
              list.endChargTime = e
              console.log(2, list)
              arr.push(list)
            } else if (fe === e) {
              list.startChargTime = s
              list.endChargTime = fs
              console.log(3, list)
              arr.push(list)
            } else {
              list.startChargTime = s
              list.endChargTime = fs
              console.log(4, list)
              arr.push(list)
              list.startChargTime = fe
              list.endChargTime = e
              console.log(5, list)
              arr.push(list)
            }
          }
        } else {
          // 免租开始时间以及免租结束时间并非同时存在
          this.$message({
            message: '请确保免租开始时间以及免租结束时间同时存在',
            type: 'error'
          })
          count++
          break
        }
      }
      if (count === 0) {
        this.form.addWay = arr
        console.log(arr)
      }
    }
  }
}
$('.el-dialog--small').width(650)
</script>
<style scoped>
@import '../../static/css/app.css';
.houseSizeP{
  display: inline-block;
  position: absolute;
  right: 5px;
  top: 0;
}
.dialog-footer{
	text-align: center;
}
table{
  border:1px solid #666;
}
tr{
  border-top:1px solid #666;
  position: relative;
}
tr td{
  width: 13%; text-align:center; padding: 5px 2px; border-right:1px solid #666;
}
tr .el-input--mini .el-input__inner{
  padding-right: 3px 5px;
}
tr .el-form--inline .el-form-item{
  margin-right: 5px
}
.date .el-input__icon+.el-input__inner{
  padding: 3px 5px;
}
.el-dialog__body table, .el-form-item__content .houseSizeP{
  font-size: 12px
}
tr .el-form-item__content{
  line-height: 22px;
}
tr .aaa{
  position: relative;
  display: inline-block
}
tr .add{
  position:absolute; top:calc(50% - 22px); right:-26px;
  width: 16px;
  height: 36px;
  background: url('../../static/img/add.png') center center / 16px 16px;
  background-repeat: no-repeat;
  cursor: pointer;
  /*display: none;*/
}
</style>
