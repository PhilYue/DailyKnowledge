<style scoped>
  .add-class{
    position: relative;
    right: -300px;
    top: 0;
    cursor: pointer;
  }
</style>
<template>
	<div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <!-- 合同编号和业主姓名 -->
      <el-row>
        <el-col :span="12">
          <el-form-item label="纸质合同编号" prop="contractNum">
            <el-input v-model="form.contractNum" placeholder="请输入纸质合同编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="业主姓名" prop="name">
            <el-input v-model="form.name" placeholder="请输入业主姓名"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 业主证件类型和号码 -->
      <el-row>
        <el-col :span="12">
          <el-form-item label="业主证件类型" prop="certType">
            <el-select v-model="form.certType" placeholder="请选择业主证件类型">
              <el-option label="身份证" value="ID"></el-option>
              <el-option label="护照" value="P"></el-option>
              <el-option label="驾驶执照" value="DL"></el-option>
              <el-option label="工商营业执照" value="BL"></el-option>
              <el-option label="港澳通行证" value="HK"></el-option>
              <el-option label="台湾通行证" value="TW"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="业主证件号码" prop="certNum">
            <el-input v-model="form.certNum" placeholder="请输入业主证件号码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 法人姓名和法人联系方式 -->
      <el-row>
        <el-col :span="12">
          <el-form-item label="法人姓名" prop="legalName">
            <el-input v-model="form.legalName" placeholder="请输入法人姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="法人联系方式" prop="legalPhone">
            <el-input v-model="form.legalPhone" placeholder="请输入法人联系方式"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 收款银行和开户支行 -->
      <el-row>
        <el-col :span="12">
          <el-form-item label="收款银行" prop="cashBank">
            <el-input v-model="form.cashBank" placeholder="请输入收款银行"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开户支行" prop="openBank">
            <el-input v-model="form.openBank" placeholder="请输入开户支行"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 收款账号和收款人姓名 -->
      <el-row>
        <el-col :span="12">
          <el-form-item label="收款账号" prop="account">
            <el-input v-model="form.account" placeholder="请输入收款账号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="收款人姓名" prop="accountName">
            <el-input v-model="form.accountName" placeholder="请输入收款人姓名"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 是否开票和发票类型 -->
      <el-row>
        <el-col :span="12">
          <el-form-item label="是否开票" prop="invoiceTrue">
            <el-radio-group v-model="form.invoiceTrue">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="this.form.invoiceTrue" label="发票类型" prop="invoiceType">
            <el-select v-model="form.invoiceType" placeholder="请选择发票类型">
              <el-option label="增值税专用发票" value="ID"></el-option>
              <el-option label="普通发票" value="P"></el-option>
              <el-option label="专业发票" value="DL"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 项目名称和省份选择 -->
      <el-row>
        <el-col :span="12">
          <el-form-item label="项目名称" prop="projectName">
            <el-autocomplete 
            v-model="form.projectName" 
            :fetch-suggestions="querySearch1" 
            placeholder="请输入项目名称" 
            @select="handleSelect">
            </el-autocomplete>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="省份" prop="province">
            <el-select @change="changeProvince" v-model="form.province" placeholder="请选择省份">
              <el-option
                v-for="(item, index) in options"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="城市" prop="city">
            <el-select @change="changeCity" v-model="form.city" placeholder="请选择城市">
              <el-option
                v-for="(item, index) in optionsCity"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="区县" prop="district">
            <el-select v-model="form.district" placeholder="请选择区县">
              <el-option
                v-for="(item, index) in optionsDistrict"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="片区" prop="unitId">
            <el-cascader 
            v-model="form.unitId"
            :options="unitData"
            @change="unitChange"
            :props="propsUnit"
            :show-all-levels="false"
            placeholder="请选择片区">
            </el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 车位数量和我方签约主体 -->
      <el-row>
        <el-col :span="12">
          <el-form-item label="车位数量" prop="carNum">
            <el-input v-model="form.carNum" placeholder="请输入车位数量"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="我方签约主体" prop="signName">
            <el-input v-model="form.signName" placeholder="请输入我方签约主体"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 签约时间和收房价格主体 -->
      <el-row>
        <el-col :span="12">
          <el-form-item label="签约时间" prop="signTime">
            <el-date-picker
              v-model="form.signTime"
              type="date"
              placeholder="选择签约时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="收房价格" prop="price">
            <el-input v-model="form.price" placeholder="请输入收房价格（元/天·m²）"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 合同开始时间和合同时长 -->
      <el-row>
        <el-col :span="12">
          <el-form-item label="托管开始时间" prop="startTime">
              <el-date-picker type="date" placeholder="请选择托管时间" v-model="form.startTime" @change="chooseEndTime2"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同时长">
            <el-select v-model="form.year" style="width:46px;" @change="chooseEndTime2" class="displaySelect">
              <el-option label="0" value="0"></el-option>
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="5" value="5"></el-option>
              <el-option label="6" value="6"></el-option>
              <el-option label="7" value="7"></el-option>
              <el-option label="8" value="8"></el-option>
              <el-option label="9" value="9"></el-option>
              <el-option label="10" value="10"></el-option>
              <el-option label="11" value="11"></el-option>
              <el-option label="12" value="12"></el-option>
              <el-option label="13" value="13"></el-option>
              <el-option label="14" value="14"></el-option>
              <el-option label="15" value="15"></el-option>
              <el-option label="16" value="16"></el-option>
              <el-option label="17" value="17"></el-option>
              <el-option label="18" value="18"></el-option>
              <el-option label="19" value="19"></el-option>
              <el-option label="20" value="20"></el-option>
            </el-select>
            <p style="width:13px; text-align:left; display: inline-block; margin-left: -3px;">年</p>
            <el-select v-model="form.month" style="width:46px;" @change="chooseEndTime2" class="displaySelect">
              <el-option label="0" value="0"></el-option>
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="5" value="5"></el-option>
              <el-option label="6" value="6"></el-option>
              <el-option label="7" value="7"></el-option>
              <el-option label="8" value="8"></el-option>
              <el-option label="9" value="9"></el-option>
              <el-option label="10" value="10"></el-option>
              <el-option label="11" value="11"></el-option>
              <!-- <el-option label="12" value="12"></el-option> -->
            </el-select>
            <p style="width:13px; text-align:center; display: inline-block; margin-left: -3px;">月</p>
            <el-select v-model="form.day" style="width:46px;" @change="chooseEndTime2" class="displaySelect">
              <el-option label="0" value="0"></el-option>
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="5" value="5"></el-option>
              <el-option label="6" value="6"></el-option>
              <el-option label="7" value="7"></el-option>
              <el-option label="8" value="8"></el-option>
              <el-option label="9" value="9"></el-option>
              <el-option label="10" value="10"></el-option>
              <el-option label="11" value="11"></el-option>
              <el-option label="12" value="12"></el-option>
              <el-option label="13" value="13"></el-option>
              <el-option label="14" value="14"></el-option>
              <el-option label="15" value="15"></el-option>
              <el-option label="16" value="16"></el-option>
              <el-option label="17" value="17"></el-option>
              <el-option label="18" value="18"></el-option>
              <el-option label="19" value="19"></el-option>
              <el-option label="20" value="20"></el-option>
              <el-option label="21" value="21"></el-option>
              <el-option label="22" value="22"></el-option>
              <el-option label="23" value="23"></el-option>
              <el-option label="24" value="24"></el-option>
              <el-option label="25" value="25"></el-option>
              <el-option label="26" value="26"></el-option>
              <el-option label="27" value="27"></el-option>
              <el-option label="28" value="28"></el-option>
              <el-option label="29" value="29"></el-option>
              <el-option label="30" value="30"></el-option>
              <!-- <el-option label="31" value="31"></el-option> -->
            </el-select>
            <p style="width:14px; text-align:center; display: inline-block; margin-left: -3px;">日</p>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 免租期 -->
      <el-row>
        <el-col :span="12">
          <el-form-item label="托管结束时间" prop="endTime">
            <el-date-picker type="date" placeholder="请选择托管时间" v-model="form.endTime" :disabled="true"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12" prop="freeStartTime">
          <el-form-item label="免租时长">
            <el-date-picker
              v-model="form.freeStartTime"
              type="daterange"
              placeholder="选择免租时长"
              style="width:210px;">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 押金和押金支付时间 -->
      <el-row>
        <el-col :span="12">
          <el-form-item label="押金" prop="deposit">
            <el-input v-model="form.deposit" placeholder="请输入押金"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="押金支付时间" prop="depositTime">
            <el-date-picker
              v-model="form.depositTime"
              type="date"
              placeholder="请选择押金支付时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 费用列表循环 -->
      <el-row :key="index" v-for="(item, index) in payArr">
        <el-col :span="12">
          <el-form-item label="费用开始时间">
            <el-date-picker type="date" placeholder="请选择费用开始时间" v-model="item.startTime"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="费用结束时间">
            <el-date-picker type="date" placeholder="请选择费用结束时间" v-model="item.endTime"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="费用金额">
            <el-input v-model="item.money" placeholder="请输入费用金额"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="收费提前天数">
            <el-input v-model="item.day" placeholder="请输入收费提前天数"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <img @click="addPay" class="add-class" src="../../static/img/add.png">
      <!-- 授权代表 -->
      <el-row>
        <el-col :span="12">
          <el-form-item label="授权代表" prop="housekeeper">
            <el-cascader v-model="form.housekeeper" placeholder="授权代表" :options="options2" @change="changeHouseKeeper" :props="props" :show-all-levels="false" ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同总金额" prop="totalPrice">
            <el-input v-model="form.totalPrice" placeholder="请输入合同总金额"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="备注" prop="memo">
            <el-input type="textarea" placeholder="备注" v-model="form.memo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="fr dialog-footer">
      <el-button @click="resetForm('form')">重 置</el-button>
      <el-button type="primary" @click="submitForm('form')">确 定</el-button>
    </div>
	</div>
</template>
<script>
export default {
  data() {
    return {
      // 费用列表
      payArr: [
        {
          startTime: '',
          endTime: '',
          money: '',
          day: ''
        }
      ],
      // 授权代表格式
      props: {
        value: 'label',
        children: 'cities'
      },
      // 片区格式
      propsUnit: {
        value: 'value',
        children: 'children',
        label: 'label'
      },
      options2: JSON.parse(this.$store.state.currentUser.houseData),
      options: [], // 省份列表数据
      provinceName: '', // 省份名字
      cityName: '', // 城市名字
      optionsCity: [], // 城市列表数据
      optionsDistrict: [], // 区县列表数据
      unitData: [], // 片区列表数据
      houseData: {}, // 小区数据
      form: {
        contractNum: '',
        name: '',
        certType: '',
        certNum: '',
        legalName: '',
        legalPhone: '',
        cashBank: '', // 收款银行
        openBank: '', // 开户支行
        account: '', // 收款账号
        accountName: '', // 收款人姓名
        invoiceTrue: false, // 是否开票
        invoiceType: '', // 发票类型
        projectName: '', // 项目名称
        province: '', // 省份
        city: '', // 城市
        district: '', // 区县
        unitId: [],
        carNum: '',
        signName: '',
        price: '',
        startTime: '',
        year: '0',
        month: '0',
        day: '0',
        endTime: '',
        zoneData: [],
        freeStartTime: '',
        freeEndTime: '',
        deposit: '',
        depositTime: '',
        memo: '',
        housekeeper: [],
        houseSpaceId: '',
        reqChargInputLogBeanList: []
      },
      rules: {
        contractNum: [
          { required: true, message: '请输入纸质合同编号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入业主姓名', trigger: 'blur' }
        ],
        certType: [
          { required: true, message: '请选择业主证件类型', trigger: 'change' }
        ],
        certNum: [
          { required: true, message: '请输入业主证件号码', trigger: 'blur' }
        ],
        legalName: [
          { required: true, message: '请输入法人姓名', trigger: 'blur' }
        ],
        legalPhone: [
          { required: true, message: '请输入法人联系方式', trigger: 'blur' }
        ],
        cashBank: [
          { required: true, message: '请输入收款银行', trigger: 'blur' }
        ],
        openBank: [
          { required: true, message: '请输入开户支行', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入收款账号', trigger: 'blur' }
        ],
        accountName: [
          { required: true, message: '请输入收款人姓名', trigger: 'blur' }
        ],
        invoiceType: [
          { required: true, message: '请选择发票类型', trigger: 'change' }
        ],
        projectName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        carNum: [
          { required: true, message: '请输入车位数量', trigger: 'blur' }
        ],
        signName: [
          { required: true, message: '请输入我方签约主体', trigger: 'blur' }
        ],
        signTime: [
          { type: 'date', required: true, message: '请选择签约时间', trigger: 'change' }
        ],
        depositTime: [
          { type: 'date', required: true, message: '请选择押金支付时间', trigger: 'change' }
        ],
        startTime: [
          { type: 'date', required: true, message: '请选择托管开始时间', trigger: 'change' }
        ],
        endTime: [
          { type: 'date', required: true, message: '请选择托管结束时间', trigger: 'change' }
        ],
        price: [
          { required: true, message: '请输入收房价格', trigger: 'blur' }
        ],
        housekeeper: [
          { required: true, message: '请选择授权代表', trigger: 'blur' }
        ],
        province: [
          { required: true, message: '请选择省份', trigger: 'blur' }
        ],
        city: [
          { required: true, message: '请选择城市', trigger: 'blur' }
        ],
        district: [
          { required: true, message: '请选择区县', trigger: 'blur' }
        ],
        totalPrice: [
          { required: true, message: '请输入合同总金额', trigger: 'blur' }
        ],
        unitId: [
          { required: true, message: '请选择片区', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 请求提交表单方法
    submit: function (form) {
      // 如果没开票删除发票类型属性
      if (this.form.invoiceTrue === false) {
        delete this.form.invoiceType
      }
      let depositTime, freeEndTime, freeStartTime, signTime, startTime
      if (this.form.depositTime) {
        depositTime = Date.parse(this.form.depositTime)
      }
      if (this.form.freeStartTime) {
        freeEndTime = Date.parse(this.form.freeStartTime[1])
        freeStartTime = Date.parse(this.form.freeStartTime[0])
      }
      if (this.form.signTime) {
        signTime = Date.parse(this.form.signTime)
      }
      if (this.form.startTime) {
        startTime = Date.parse(this.form.startTime)
      }
      // 每期费用数组
      for (let index = 0; index <= this.payArr.length - 1; index++) {
        this.form.reqChargInputLogBeanList[index] = {
          startChargTime: Date.parse(this.payArr[index].startTime) || '',
          endChargTime: Date.parse(this.payArr[index].endTime) || '',
          initialAmount: this.payArr[index].money * 1000 || '',
          advanceDays: this.payArr[index].day || ''
        }
      }
      // 提交集中式合同表单
      this.$http.post(this.$store.state.contractUrl + 'addDelegateContract', 
      {
        'bankAccount': this.form.account, // 收款账号
        'bankName': this.form.cashBank, // 银行名称
        'bankOfAccounts': this.form.openBank, // 开户支行
        'ownerCertificateNum': this.form.certNum, // 业主证件号码
        'ownerCertificateType': this.form.certType, // 业主证件类型
        'cityName': this.cityName, // 城市
        'contractMaster': this.form.signName, // 我方签约主体
        'contractStatus': 'ALSIGN', // 合同状态(已签订)
        'signTime': signTime, // 签约时间
        'contractType': 'DELEGATE', // 合同类型（托管合同）
        'deposit': this.form.deposit * 1000, // 押金
        'unitId': this.unitId, // 片区id
        'endTime': this.form.endTime, // 合同结束时间
        'enterId': this.$store.state.currentUser.uid, // 合同录入人id
        'housePrice': this.form.price * 1000, // 收房价格（元/天·m）
        'houseType': 'CENTRALIZE', // 合同类型（集中式）
        'houseSpaceId': this.form.houseSpaceId, // 项目id
        'housekeeperId': this.form.housekeeperId, // 授权代表id
        'housekeeperName': this.form.housekeeper[1], // 授权代表
        'housekeeperPhone': this.form.housekeeperPhone, // 授权代表联系方式
        'invoice': this.form.invoiceTrue, // 是否开票
        'invoiceType': this.form.invoiceType, // 发票类型
        'ownerName': this.form.name, // 业主姓名
        'memo': this.form.memo, // 备注
        'paperNum': this.form.contractNum, // 纸质合同编号
        'parkingNum': this.form.carNum, // 车位数量
        'payeeName': this.form.accountName, // 收款人姓名
        'projectName': this.form.projectName, // 项目名称
        'centralizeRentalFreeEnd': freeStartTime, // 免租期开始时间
        'centralizeRentalFreeStart': freeEndTime, // 免租期结束时间
        'depositPayTime': depositTime, // 押金支付时间
        'reqChargInputLogBeanList': this.form.reqChargInputLogBeanList, // 计费规则集合
        'signType': 'NEW',     // 签订类型（新签合同）
        'startTime': startTime,   // 合同开始时间
        'storageType': 'PAPER',  // 纸质合同
        'totalPrice': this.form.totalPrice * 1000,   // 合同期总金额
        'userName': this.form.legalName,    // 法人名称
        'userPhone': this.form.legalPhone // 法人联系方式
      }
      ).then(function(response) {
        // 响应成功回调
        let data = response.data
        if (data.code === 200) {
          this.$message('新建成功')
          this.$refs[form].resetFields()
          this.payArr = []
        } else {
          this.$message(data.message)
        }
      }, function(response) {
        // 响应错误回调
      })
    },

    // 提交表单
    submitForm (form) {
      if (this.houseData.pid) {
        // 小区已存在直接注册项目
        this.registerProject(form)
      } else {
        // 小区不存在先注册小区
        this.registerHouse(form)
      }
    },

    // 重置数据
    resetForm (formName) {
      if (this.$refs[formName]) {
        this.$refs[formName].resetFields()
      }
    },

    // 添加费用表单
    addPay: function (e) {
      this.payArr.push(
        {
          startTime: '',
          endTime: '',
          money: '',
          day: ''
        }
      )
      console.log(this.payArr)
    },

    // 小管家id
    changeHouseKeeper (val) {
      var results = val[0] ? this.options2.filter(this.keeperFilter(val[0])) : this.options2
      for (var k = 0; k <= results[0].cities.length - 1; k++) {
        if (val[1] === results[0].cities[k].label) {
          this.form.housekeeperId = results[0].cities[k].id
          this.form.housekeeperPhone = results[0].cities[k].phone
        }
      }
      console.log(this.form)
    },

    // 房东信息
    keeperFilter (queryString) { 
      return (restaurant) => {
        return (restaurant.label.indexOf(queryString.toLowerCase()) === 0)
      }
    },

    // 加载第一级的省
    loadCity: function (e) {
      this.$http.post(this.$store.state.searchUrl + 'baseDataInfo', {'baseDataType': 'PROVINCE__INFO'}).then(function(response) {
        // 响应成功回调
        let data = response.data
        if (data.code === 200) {
          this.options = data.data
          for (let i = 0; i <= this.options.length - 1; i++) {
            this.options[i] = {
              value: this.options[i].provinceId,
              label: this.options[i].province
            }
          }
          // console.log(this.options)
        }
      }, function(response) {
        // 响应错误回调
      })
    },

    // 选择省份
    changeProvince: function (val) {
      // 根据省份id拿到名字
      for (let index = 0; index < this.options.length; index++) {
        if (val === this.options[index].value) {
          this.provinceName = this.options[index].label
        }
      }
      this.form.district = ''
      this.$http.post(this.$store.state.searchUrl + 'baseDataInfo', 
      {
        'baseDataType': 'CITY_INFO',
        'provinceId': val,
      }
      ).then(function(response) {
        // 响应成功回调
        let data = response.data
        if (data.code === 200) {
          this.optionsCity = data.data
          for (let i = 0; i <= this.optionsCity.length - 1; i++) {
            this.optionsCity[i] = {
              label: this.optionsCity[i].city,
              value: this.optionsCity[i].cityId
            }
          }
          console.log(this.optionsCity)
        }
      }, function(response) {
        // 响应错误回调
      })
    },

    // 选择城市
    changeCity: function (val) {
      // 根据城市id拿到名字
      for (let index = 0; index < this.optionsCity.length; index++) {
        if (val === this.optionsCity[index].value) {
          this.cityName = this.optionsCity[index].label
        }
      }
      this.form.district = ''
      this.$http.post(this.$store.state.searchUrl + 'baseDataInfo', 
      {
        'baseDataType': 'AREA_INFO',
        'cityId': val,
      }
      ).then(function(response) {
        // 响应成功回调
        let data = response.data
        if (data.code === 200) {
          this.optionsDistrict = data.data
          for (let i = 0; i <= this.optionsDistrict.length - 1; i++) {
            this.optionsDistrict[i] = {
              label: this.optionsDistrict[i].area,
              value: this.optionsDistrict[i].area
            }
          }
          console.log(this.optionsDistrict)
        }
      }, function(response) {
        // 响应错误回调
      })
    },

    // 选择合同时长
    chooseEndTime2 () {
      // 获取当前选中的开始时间
      let effectTime = new Date(this.form.startTime)
      // 计算出开始时间中的年份+选择托管时长中的年份
      let year = effectTime.getFullYear() + parseInt(this.form.year)
      // 计算出开始时间中的月份+选择托管时长中的月份
      let month = effectTime.getMonth() + 1 + parseInt(this.form.month)
      // 如果结果月份超过12，则年份+1
      if (month > 12) {
        year++
        month -= 12
      }
      // 计算出开始时间中的天+选择托管时长中的天
      let day = effectTime.getDate()

      // 获取加上年月的新的结束时间
      let time = year + '-' + month + '-' + day + ' 23:59:59'
      // console.log(time)
      let time1 = new Date(new Date(time).getTime() + (parseInt(this.form.day) - 1) * 24 * 60 * 60 * 1000)
      year = time1.getFullYear()
      month = time1.getMonth() + 1
      day = time1.getDate()
      // 重新获取结束时间年月日

      if (!isNaN(effectTime)) {
        console.log(this.$options.methods.time(year, month, day, this) + ' 23:59:59')
        this.form.endTime = new Date(this.$options.methods.time(year, month, day, this) + ' 23:59:59').getTime()
      }
    },

    // 选择合同时长
    time (feYear, feMonth, feDay, _this) {
      let monthDay = 31
      let month = feMonth % 12
      if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
        monthDay = 31
      } else if (month === 4 || month === 6 || month === 9 || feMonth === 11) {
        monthDay = 30
      } else if (_this.$options.methods.getYear(feYear) && month === 2) {
        monthDay = 29
      } else if (!_this.$options.methods.getYear(feYear) && month === 2) {
        monthDay = 28
      }
      if (feDay > monthDay) {
        feMonth++
        feDay -= monthDay
      }
      if (feMonth > 12) {
        feYear++
        feMonth -= 12
      }
      return (feYear + '/' + feMonth + '/' + feDay)
    },

    // 搜索片区
    unitSelect (userUrl) {
      this.$http.get(userUrl, {}
      ).then(function(response) {
        // 响应成功回调
        // let data = response.data.data.children
        // console.log(this.unitFormat(data))
      }, function(response) {
        // 响应错误回调
      })
    },
    
    // 选择片区
    unitChange: function (val) {
      this.unitId = val[val.length - 1]
      console.log(this.unitId)
    },

    // 片区格式化
    unitFormat (arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].value = arr[i].id
        arr[i].label = arr[i].text
        arr[i].children = arr[i].children
        this.unitData.push(arr[i])
        if (arr[i].children !== null && arr[i].children !== [] && arr[i].children !== '') {
          this.unitFormat(arr[i].children)
        }
      }
    },
    
    // 小区信息
    querySearch1 (queryString, cb) {
      this.restaurants1 = []
      if (queryString) {
        this.houseData.pid = ''
        let req = {}
        req.baseDataType = 'BLOCK_INFO'
        req.blockName = queryString
        this.$http.post(this.$store.state.searchUrl + 'baseDataInfo', req).then(function(res) {
          if (res.body.code === 200) {
            let len = 0
            if (res.body.data.length > 10) {
              len = 10
            } else {
              len = res.body.data.length
            }
            for (let i = 0; i < len; i++) {
              let list = {}
              list.value = res.body.data[i].blockName
              list.district = res.body.data[i].district
              list.province = res.body.data[i].province
              list.city = res.body.data[i].city
              list.pid = res.body.data[i].pid
              this.restaurants1.push(list)
            }
          }
        })
      }
      var restaurants = this.restaurants1
      // 调用 callback 返回建议列表的数据
      cb(restaurants)
    },

    // 选择小区信息
    handleSelect (item) {
      this.houseData = item
    },

    // 根据小区注册项目
    registerProject: function (form) {
      this.$http.post(this.$store.state.houseUrl + 'save/project', 
      {
        'blockId': this.houseData.pid,
        'inputPersonnelId': this.$store.state.currentUser.uid,
        'zoneId': this.unitId
      }).then(function(res) {
        if (res.body.code === 200) {
          this.form.houseSpaceId = res.body.data
          this.submit(form)
        } else {
          this.$message(res.body.message)
        }
      })
    },

    // 注册小区
    registerHouse: function (form) {
      this.$http.post(this.$store.state.blockUrl + 'save', 
      {
        'blockName': this.form.projectName,
        'city': this.cityName,
        'province': this.provinceName,
        'district': this.form.district,
      }).then(function(res) {
        if (res.body.code === 200) {
          this.houseData.pid = res.body.data.pid
          // 之后注册项目
          this.registerProject(form)
        } else {
          this.$message(res.body.message)
        }
      })
    }
  },
  mounted: function (e) {
    // 加载省份一级列表
    this.loadCity()
    // 加载片区数据
    this.unitSelect(this.$store.state.accountUrl + 'unit/tree/f/area')
  }
}
</script>