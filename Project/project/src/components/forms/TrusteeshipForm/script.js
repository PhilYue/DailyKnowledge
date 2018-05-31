// 有哪些接口请求

import $ from 'jquery'
import focusContract from '@/components/focusContract'

let Divider = {
  template: `<div style="border-bottom:1px solid #cecece; width: 610px; margin-bottom: 22px;"></div>`,
}

// 选项迭代
const max = {
  bedroomNumber: 6,
  livingRoomNumber: 6,
  kitchenNumber: 6,
  toiletNumber: 6,
  floorHeight: 40,
  currentFloor: 40,
  year: 20,
  month: 12,
  day: 31,
  freeMonth: 11,
  freeDay: 31,
  decorationMonth: 11,
  decorationDay: 32,
}

let houseChange1 = {
  uId: '',
  houseSpaceManagerId: '',
  businessId: '',
  blockName: '',
  detailAddress: '',
  startTime: '', // 托管开始时间
  endTime: '', // 托管结束时间
  freeStartTime: '', // 免租开始时间
  freeEndTime: '', // 免租结束时间
  rental: '', // 收房价格
  deposit: 0, // 押金
  rental1: '', // 收房价格
  deposit1: '', // 押金
  payWay: '1',
  during: '',
  payCycle: 'ONEMON', // 支付周期
  addType: 'NOTRISE', // 租金递增方式
  addCycle: 'NORISE', // 租金递增周期
  addAmount: '',
  addPer: '',
  addAmount1: '',
  addPer1: '',
  payMethod: 'CYCLE',
  payTime: '',
  buildingNo: '', // 楼号
  unitNo: null, // 单元号
  roomNo: '', // 室号
  payeeName: '', // 收款人姓名
  bankAccount: '', // 收款账号
  bankName: '网络有误', // 收款银行
  bankOfAccounts: '', // 开户支行
  memo: '',
  houseSpaceId: '',
  conType: '1', // 合同分类
  housekeeperName: '', // 小管家姓名
  housekeeperPhone: '', // 小管家联系方式
  housekeeper: [],
  userName: '',
  waterMeterReading: '', // 水表读数
  electricMeterReading: '', // 电表读数
  gasMeterReading: '', // 天然气读数
  waterMeterNumber1: '', // 水表读数
  electricMeterNumber1: '', // 电表读数
  gasMeterNumber1: '', // 天然气读数
  certificateType: 'ID', // 房东证件类型
  certificateNum: '', // 房东证件号
  userPhone: '', // 房东手机号
  bedroomNumber: '1',
  livingRoomNumber: '1',
  toiletNumber: '1',
  kitchenNumber: '1',
  direction: 'EAST',
  houseSpaceManagerArea1: '',
  houseSpaceManagerArea: '',
  rentType: 'JOINT_RENT',
  decorateType: 'R',
  zoneId: '',
  zone: '',
  district: '',
  insuranceStatus: 'YES',
  houseOwnershipCertificateNumber: '', // 房产证号
  penalty: '',
  penalty1: '',
  freeStyle: '0',
  year: '0',
  month: '0',
  day: '0',
  freeMonth: '0',
  freeDay: '0',
  decorationStyle: '0',
  decorationMonth: '0',
  decorationDay: '0',
  floorHeight: '',
  city: '',
  province: '',
  blockId: '',
  currentFloor: '',
  reqChargInputLogBeanList: [ // 计费规则
    {
      payCycle: 'ONEMON',
      addAmount1: '',
      addAmount: '',
      addPer1: '',
      addPer: '',
      addCycle: 'NORISE',
      addType: 'NOTRISE',
      businessType: '',
      chargType: 'REN',
      cycle: 'ONEMON',
      endChargTime: '',
      financeType: 'INC',
      initialAmount: '',
      startChargTime: ''
    }
  ]
}

let form = {
  uId: '',
  houseSpaceManagerId: '',
  businessId: '',
  blockName: '',
  detailAddress: '',
  startTime: '', // 托管开始时间
  endTime: '', // 托管结束时间
  freeStartTime: '', // 免租开始时间
  freeEndTime: '', // 免租结束时间
  rental: '', // 收房价格
  deposit: 0, // 押金
  rental1: '', // 收房价格
  deposit1: '', // 押金
  payWay: '1',
  during: '',
  payCycle: 'ONEMON', // 支付周期
  addType: 'NOTRISE', // 租金递增方式
  addCycle: 'NORISE', // 租金递增周期
  addAmount: '',
  addPer: '',
  addAmount1: '',
  addPer1: '',
  payMethod: 'CYCLE',
  payTime: '',
  buildingNo: '', // 楼号
  unitNo: null, // 单元号
  roomNo: '', // 室号
  payeeName: '', // 收款人姓名
  bankAccount: '', // 收款账号
  bankName: '网络有误', // 收款银行
  bankOfAccounts: '', // 开户支行
  memo: '',
  houseSpaceId: '',
  conType: '1', // 合同分类
  housekeeperName: '', // 小管家姓名
  housekeeperPhone: '', // 小管家联系方式
  housekeeper: [],
  userName: '',
  waterMeterReading: '', // 水表读数
  electricMeterReading: '', // 电表读数
  gasMeterReading: '', // 天然气读数
  waterMeterNumber1: '', // 水表读数
  electricMeterNumber1: '', // 电表读数
  gasMeterNumber1: '', // 天然气读数
  certificateType: 'ID', // 房东证件类型
  certificateNum: '', // 房东证件号
  userPhone: '', // 房东手机号
  bedroomNumber: '1',
  livingRoomNumber: '1',
  toiletNumber: '1',
  kitchenNumber: '1',
  direction: 'EAST',
  houseSpaceManagerArea1: '',
  houseSpaceManagerArea: '',
  rentType: 'JOINT_RENT',
  decorateType: 'R',
  zoneId: '',
  zone: '',
  district: '',
  insuranceStatus: 'YES',
  houseOwnershipCertificateNumber: '', // 房产证号
  penalty: '',
  penalty1: '',
  freeStyle: '0',
  year: '0',
  month: '0',
  day: '0',
  freeMonth: '0',
  freeDay: '0',
  decorationStyle: '0',
  decorationMonth: '0',
  decorationDay: '0',
  floorHeight: '',
  city: '',
  province: '',
  blockId: '',
  zoneData: [],
  currentFloor: '',
  houseCertificateType: 'OFFICIAL', // 房屋证件类型
  reqChargInputLogBeanList: [ // 计费规则
    {
      payCycle: 'ONEMON',
      addAmount1: '',
      addAmount: '',
      addPer1: '',
      addPer: '',
      addCycle: 'NORISE',
      addType: 'NOTRISE',
      businessType: '',
      chargType: 'REN',
      cycle: 'ONEMON',
      endChargTime: '',
      financeType: 'INC',
      initialAmount: '',
      startChargTime: ''
    }
  ]
}

export default {
  props: ['formLabelWidth', 'disable', 'mix', 'addclickCount'],

  components: {
    focusContract,
    Divider
  },

  data () {
    return {
      
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      landlord: '房东',
      renter: '租客',
      options2: JSON.parse(this.$store.state.currentUser.houseData),
      unitProps: {
        value: 'text',
        children: 'children'
      },
      addShow: false,
      addShdow: false,
      rules2: {
        userName: [{ required: true, message: '请填写房东姓名', trigger: 'blur' }],
        userPhone: [{ required: true, message: '请填写房东联系方式', trigger: 'blur' }],
        certificateNum: [{ required: true, message: '请填写房东证件号码', trigger: 'blur' }],
        rental: [
          { required: true, message: '请填写收房价格', trigger: 'blur' }
        ],
        rental1: [
          { required: true, message: '请填写收房价格', trigger: 'blur' }
        ],
        bankAccount: [{ required: true, message: '请填写收款账号', trigger: 'blur' }],
        bankOfAccounts: [{ required: true, message: '请填写开户支行', trigger: 'blur' }],
        deposit: [{ required: true, message: '请填写押金数额', trigger: 'blur' }
        ]
      },

      form,

      houseChange1,
      count: 0,
      landlordList: [],
      restaurants: [],
      readonly: true,
      restaurants1: [ // 小区
      ],
      userInfo: {
        bean: 2
      },
      bankList: [],
      bankSearch: this.$store.state.searchUrl + 'baseDataInfo', // 查询银行
      repList: [],
      addTypeShow: false, // 控制自定义递增规则弹窗
      modal: false,
      addType: 'NOTRISE',
      width: 'width: 75px;',
      effectTime: '',
      endTime: '',
      bankOfAccounts: [], // 全部银行支行列表
      bankOfAccount: [], // 部分银行支行列表
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
      address: {
        pLists: [],
        cLosts: [],
        dLists: []
      },
      int: 0, // 计数器

      clickOver: true, // 判断提交结束与否

      // ------
      houseType: 'DISTRIBUTE',

      // 单元表单 - 供POST /block/save使用
      blockForm: {
        province: null,
        city: null,
        district: null,
        blockName: null,
      },

      // 房源表单 - 供POST /house/save/houseSpaceManager使用
      houseForm: {
        ...this.blockForm,
        houseSpaceManagerDirection: 'EAST',
        houseSpaceManagerType: 'HOUSE',
        propertyType: 'D',

        inputPersonnelId: this.getUid(),
      },

      // 委托合同表单 - 供...
      delegateContractForm: {
        houseType: this.houseType,
      },

      unit: [],
      options: {
        zoneId: [],
        housekeeper: JSON.parse(this.$store.state.currentUser.houseData)
      },

    }
  },

  computed: {
    max() {
      let obj = {}
      for (let k in max) {
        obj[k] = Array(max[k]).fill(null).map((item, i) => (i + 1).toString())
      }

      return obj
    }
  },
  
  beforeCreate: function () {
    var uesrApi = this.$store.state.accountUrl + 'user/list' // 房东
    // let treeArea = this.$store.state.accountUrl + 'unit/tree/f/area'
    // 搜索小区
    // this.$options.methods.loadOptions(this, treeArea)
    // 搜索小区
    var dataList = {}
    dataList.userType = 'P'
    // // 搜索房东
    // this.$options.methods.landlordSearch(this, uesrApi, dataList)
    dataList.userType = 'M'
    this.$options.methods.repSearch(this, uesrApi, dataList)
  },

  created () {
    const setLinkedInitValues = () => {
      this.$set(this.houseForm, 'landlordPhone', '')
      this.$set(this.houseForm, 'landlordCertType', '')
      this.$set(this.houseForm, 'landlordCertNumber', '')
    }

    setLinkedInitValues()

    this.setHouseFormDefaultKeeper()

    this.loadOptions()
  },

  methods: {
    // 设置房东证件更多信息
    setHouseFormLandlord(item) {
      this.houseForm.landlordPhone = item.phone
      this.houseForm.userId = item.id
      this.houseForm.sex = item.sex

      let url = this.urljoin(this.urlList.account, 'user/info/cert/', item.id)
      this.$http.get(url).then(({ data }) => {
        if (data.code === 200) {
          this.houseForm.landlordCertType = data.data.certType
          this.houseForm.landlordCertNumber = data.data.certNumber

          // this.userInfo.name = this.form.userName
          // this.userInfo.phone = item.phone
          // this.userInfo.certificateNum = data.data.certNumber
          // this.userInfo.bean = 2
          // this.userInfo.bool = 1
        } else if (data.code === 10000) {
          // this.userInfo.certificateNum = ''
          // this.userInfo.bean = 3
          // this.userInfo.bool = 3
        }
      })
    },

    // 设置授权代表更多信息
    setHouseFormKeeper(selectedData) {

      // var results = val[0] ? this.options2.filter(this.keeperFilter(val[0])) : this.options2
      // for (var k = 0; k <= results[0].cities.length - 1; k++) {
      //   if (val[1] === results[0].cities[k].label) {
      //     this.houseForm.housekeeperId = results[0].cities[k].id
      //     this.houseForm.housekeeperPhone = results[0].cities[k].phone
      //   }
      // }
    },

    // 应变托管结束时间
    chooseEndTime2() {
      this.delegateContractForm.endTime = this.moment(this.delegateContractForm.startTime)
        .add(this.delegateContractForm.year, 'years')
        .add(this.delegateContractForm.month, 'months')
        .add(this.delegateContractForm.day, 'days')
        .format()
    },

    // 设置片区更多信息
    setHouseFormZone(selectedZone) {
      if (selectedZone.length) {
        let rootId = selectedZone[0]
        let findItem = this.options.zoneId.find(z => z.id === rootId)

        if (findItem && findItem.children && findItem.children.length) {
          for (let i = 1; i < selectedZone.length; i++) {
            findItem = findItem.children.find(z => z.id === selectedZone[i]) 
          }
        }
        
        this.houseForm.zone = findItem ? findItem.text : ''
      }

    },

    // 设置小区地址更多信息
    setBlockFormByBlock(item) {
     this.blockForm.province = item.province
     this.blockForm.city = item.city
     this.blockForm.district = item.district
     this.blockForm.blockId = item.pid
    },
    
    // 设置小管家更多信息默认值
    setHouseFormDefaultKeeper() {
      this.$http.get(this.urljoin(this.urlList.account, 'user/info/id/', this.getUid())).then((res) => {
        if (res.data.code === 200) {
          let { id, username, phone, } = res.data.data
          this.houseForm.housekeeper = [localStorage.getItem('role'), username]
          this.houseForm.housekeeperName = username
          this.houseForm.housekeeperPhone = phone
          this.houseForm.housekeeperId = id
        }
      })
    },

    // 房东信息
    userQuerySearch(queryString, cb) {
      // 搜索房东
      this.landlordList = []
      this.$http.post(this.mix.userUrl, {
        username: queryString
      }).then(({ data }) => {
        let option = []
        if (data.code === 200) {
          let data1 = data.data.list
          for (let i = 0; i < data1.length; i++) {
            if (!data1[i].username) {
            } else {
              option.push({
                id: data1[i].id,
                phone: data1[i].phone,
                sex: data1[i].sex,
                value: data1[i].username,
              })
            }
          }
        } else {
          console.error(data.message)
        }
        
        cb(option.slice(0, 10))
      })
    },
    
    loadOptions() {
      // 片区
      const loadZone = () => {
        this.$http.get(this.urljoin(this.urlList.account, 'unit/tree/f/area')).then(({ data }) => {
          this.options.zoneId = data.data.children
          // this.houseForm.zoneId
          
          // this.form.zoneData[0] = this.unit[0].text
          // this.form.zone = this.unit[0].text
          // this.form.zoneId = this.unit[0].id
        })
      }

      loadZone()

      const loadBank = () => {

        this.$http.post(this.bankSearch, { 'baseDataType': 'FIRST_LEVEL_BANK_INFO' }).then((res) => {
          let req = {
            baseDataType: 'SECOND_LEVEL_BANK_INFO',
            bankName: '',
          }

          res = res.body
          if (res.code === 200) {
            this.bankList = res.data
            this.form.bankName = res.data[0].bankName
            req.bankName = res.data[0].bankName
            this.$http.post(this.bankSearch, req).then(res => {
              if (res.body.code === 200) {
                if (res.body.data.length > 10) {
                  this.bankOfAccount = res.body.data.slice(0, 10)
                  this.bankOfAccounts = res.body.data
                } else {
                  this.bankOfAccounts = res.body.data
                  this.bankOfAccount = res.body.data
                }
              }
            })
          }
        })
      }

      loadBank()
    },
    
    keeperFilter(queryString) { // 房东信息
      return (restaurant) => {
        return (restaurant.label.indexOf(queryString.toLowerCase()) === 0)
      }
    },

    closeForm() {
      this.show()
      this.form = {}
      this.form = this.houseChange1
      this.$emit('listenToParentEvent', false)
    },

    show() {
      
    },

    // 点击确定按钮
    submitForm() {
      this.postBlock(this.blockForm, null, null, null, null, (body) => {
        this.postHouse(body.data.pid, (body) => {
          this.delegateContractForm.houseSpaceId = body.data

          // let list = {
          //   addAmount: data1.addAmount1 * 1000,
          //   addCycle: data1.addCycle,
          //   addPer: data1.addPer1 * 1000,
          //   addType: data1.addType,
          //   businessType: 'DEL',
          //   chargType: 'REN',
          //   cycle: data1.payCycle,
          //   endChargTime: endTime,
          //   financeType: 'PAY',
          //   initialAmount: data1.rental1 * 1000,
          //   startChargTime: effectTime,
          //   rentalFreeStart: freestartTime,
          //   rentalFreeEnd: freeendTime,
          // }
          // data1.reqChargInputLogBeanList.push(list)

          this.postDelegateContract()
        })
      })
      /* if (this.clickOver) { // 判断当前是否正在提交
        let pass = false
        let phone = parseInt(this.form.landlordPhone)
        let name = this.form.landlordName
        let certificateNum = this.form.certificateNum
        let bool = this.userBloon(name) && this.userBloon(phone) && this.userBloon(certificateNum) && this.userInfo.name === name && parseInt(this.userInfo.phone) === phone && this.userInfo.certificateNum === certificateNum
        if (this.userInfo.bean === 1) { // 判断用户有误注册
          pass = true
        } else if (this.userInfo.bean === 2) { // 判断用户信息是否完善
          if (this.userInfo.bool === 1) {
            if (bool) { // 如果输入信息跟获取到的信息完全一致
              pass = true
            } else { // 如果输入信息跟获取到的信息不完全一致
              pass = false
            }
          }
        } else if (this.userInfo.bean === 3) { // 如果用户信息不完善
          pass = true
          let bool = this.userInfo.bool
          let userList = {
            id: this.userInfo.userId,
            username: bool === 1 ? this.userInfo.landlordName : undefined,
            phone: bool === 2 ? this.userInfo.landlordPhone : undefined,
            certificateNum: bool === 3 ? this.userInfo.certificateNum : undefined,
          }
          let url = this.urljoin(this.urlList.account, 'user/update')
          this.$http.post(url, userList).then(res => {
          })
        }
        this.clickOver = false
        var data1 = this.form
        data1.signType = 'NEW'
        data1.contractType = 'DELEGATE'
        var effectTime = (new Date(this.form.startTime)).getTime()
        let endTime = this.form.endTime
        var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
        var freestartTime = (new Date(this.form.freeStartTime)).getTime()
        var freeendTime = (new Date(this.form.freeEndTime)).getTime()
        // let certificateNum = this.$options.methods.IdentityCodeValid(data1.certificateNum, this)
        // let certificateNum = true
        data1.landlordPhone = parseInt(data1.landlordPhone)
        data1.penalty1 = 0
        // console.log(data1)
        
        let msg = ''
        const validateParams = (params) => {
          const blankErrors = {
            blockName: '请输入小区名',
            buildingNo: '请输入正确的房间地址',
            roomNo: '请输入正确的房间地址',
            houseSpaceManagerArea1: '请输入房间面积',
            houseOwnershipCertificateNumber: '请输入房屋产权证号码',
            floorHeight: '请选择总楼高',
            currentFloor: '请选择所在楼层',
            startTime: '请输入托管开始时间',
          }

          for (let e in blankErrors) {
            if (!params[e]) {
              return blankErrors[e]
            }
          }

          return ''
        }

        let blankError = validateParams(data1)
        
        if (!pass) {
          msg = '用户信息与系统信息不匹配，请核对后重新输入'
          // this.form.userPhone = phone
          this.$message({
            message: msg,
            type: 'error'
          })
          this.clickOver = true
        } else if (blankError) {
          msg = blankError
          this.$message({
            message: msg,
            type: 'error'
          })
        } else if (endTime <= effectTime) {
          msg = '请输入正确的托管时长'
          this.$message({
            message: msg,
            type: 'error'
          })
          this.clickOver = true
        } else if (freeendTime <= freestartTime && data1.addType !== '3') {
          msg = '请输入正确免租结束时间'
          this.$message({
            message: msg,
            type: 'error'
          })
          this.clickOver = true
        } else if (!reg.test(this.form.rental1) || this.form.rental1 < 0) {
          msg = '请输入正确收房价格'
          this.$message({
            message: msg,
            type: 'error'
          })
          this.clickOver = true
          this.form.rental1 = ''
          this.form.deposit1 = ''
        } else if (!reg.test(this.form.penalty1) || this.form.penalty1 < 0) {
          msg = '请输入正确违约金'
          this.$message({
            message: msg,
            type: 'error'
          })
          this.clickOver = true
          this.form.rental1 = ''
          this.form.deposit1 = ''
        } else if (!reg.test(this.form.deposit1) || this.form.deposit1 <= 0) {
          msg = '请输入正确押金'
          this.$message({
            message: msg,
            type: 'error'
          })
          this.clickOver = true
          this.form.deposit1 = ''
        } else if (this.form.addType === 'RISEBYAMOUNT' && (this.form.addAmount1 === null || this.form.addAmount1 === '')) {
          msg = '请填写正确的递增金额'
          this.$message({
            message: msg,
            type: 'error'
          })
          this.clickOver = true
        } else if (this.form.addType === 'RISEBYPER' && (this.form.addPer1 === null || this.form.addPer1 === '')) {
          msg = '请填写正确的递增百分比'
          this.$message({
            message: msg,
            type: 'error'
          })
          this.clickOver = true
        } else if (this.form.payeeName === '' || this.form.payeeName === null) {
          msg = '请输入收款人姓名'
          this.$message({
            message: msg,
            type: 'error'
          })
          this.clickOver = true
        } else {
          if (this.form.city === '' || this.form.city === null) {
            // this.$http.post(search)
            msg = '请您填写小区地址'
            this.$message({
              message: msg,
              type: 'error'
            })
            this.addShow = true
            this.clickOver = true
            let _this = this
            this.$http.post(this.bankSearch, { 'baseDataType': 'PROVINCE__INFO' }).then(function (valueP) {
              _this.address.pLists = valueP.data.data
              _this.$http.post(_this.bankSearch, { 'baseDataType': 'CITY_INFO', 'provinceId': valueP.data.data[0].provinceId }).then(function (valueC) {
                _this.address.cLists = valueC.data.data
                _this.$http.post(_this.bankSearch, { 'baseDataType': 'AREA_INFO', 'cityId': valueC.data.data[0].cityId }).then(function (valueD) {
                  _this.address.dLists = valueD.data.data
                })
              })
            })
          } else {
            this.postBlock(endTime, data1, effectTime, freestartTime, freeendTime)
          }
        }
        // this.clickOver = true
      } */
    },

    // POST单元信息到单元接口
    postBlock(data1, endTime, effectTime, freestartTime, freeendTime, success) {
      const url = this.urljoin(this.urlList.block, 'save')
      this.$http.post(url, this.blockForm).then((res) => {
        if (res.body.code === 200) {
          success && typeof success === 'function' && success(res.body)
          return
          /* if (data1.addType !== '3') {
            let list = {
              addAmount: data1.addAmount1 * 1000,
              addCycle: data1.addCycle,
              addPer: data1.addPer1 * 1000,
              addType: data1.addType,
              businessType: 'DEL',
              chargType: 'REN',
              cycle: data1.payCycle,
              endChargTime: endTime,
              financeType: 'PAY',
              initialAmount: data1.rental1 * 1000,
              startChargTime: effectTime,
              rentalFreeStart: freestartTime,
              rentalFreeEnd: freeendTime,
            }
            data1.reqChargInputLogBeanList = []
            data1.reqChargInputLogBeanList.push(list)
          }
          data1.blockId = res.body.data.pid
          // 转换免租期
          data1.rentalFreeStart = freestartTime
          data1.rentalFreeEnd = freeendTime
          // 转换托管时间
          data1.startTime = effectTime
          data1.endTime = endTime
          // 水电天然气读数
          data1.waterMeterReading = data1.waterMeterNumber1 * 1000
          data1.electricMeterReading = data1.electricMeterNumber1 * 1000
          data1.gasMeterReading = data1.gasMeterNumber1 * 1000
          // 押金
          data1.deposit = parseInt(data1.deposit1) * 1000
          // 租金
          data1.rental = parseInt(data1.rental1) * 1000
          data1.reqChargInputLogBeanList[0].initialAmount = data1.rental
          // 违约金
          // data1.penalty = parseInt(data1.penalty1) * 1000
          data1.penalty = 0
          // 递增金额
          data1.addAmount = data1.addAmount1 * 1000
          data1.reqChargInputLogBeanList[0].addAmount1 = data1.addAmount1
          data1.reqChargInputLogBeanList[0].addAmount = data1.addAmount1 * 1000
          // data1.reqChargInputLogBeanList[0].addCycle = data1.addCycle
          // 递增百分比
          data1.addPer = data1.addPer1 * 1000
          data1.housekeeperName = data1.housekeeper[1]
          data1.loginId = this.$store.state.currentUser.uid
          data1.enterId = this.$store.state.currentUser.uid
          data1.unitId = data1.zoneId
          data1.houseType = this.houseType

          this.postHouse(data1.blockId, (body) => {
            data1.houseSpaceId = body.data

            this.postDelegateContract(data1)
          }) */
          
        } else {
          this.$message({
            message: res.body.message,
            type: 'error'
          })
          this.clickOver = true
        }
      }, () => {
        this.clickOver = true
      })
    },

    // POST房间数据到房间接口
    postHouse(blockId, success) {
      let form = {
        ...this.blockForm,
        ...this.houseForm,
        houseSpaceManagerArea: this.houseForm.houseSpaceManagerArea * 1000,

        blockId,

        // 后来后台加的字段 - 房源类型 - 取值[分散式、集中式]
        houseType: this.houseType,

        // 这里的zoneId是一个组件绑定数组，后台要的是一个字符串，取数组最后的值
        zoneId: this.houseForm.zoneId[this.houseForm.zoneId.length - 1]
      }

      let url = this.urljoin(this.urlList.house, 'save/houseSpaceManager')
      this.$http.post(url, form).then(res => {
        this.clickOver = true

        if (res.body.code === 200 || res.body.code === 10002) {
          success && typeof success === 'function' && success(res.body)
        } else {
          this.$message({
            message: res.body.message,
            type: 'error'
          })
        }
      }, (res) => {
        this.clickOver = true
      })
    },

    // POST委托合同数据到相关接口
    postDelegateContract() {
      const url = this.urljoin(this.urlList.contract, 'addDelegateContract')
      this.$http.post(url, {
        ...this.blockForm,
        ...this.houseForm,
        ...this.delegateContractForm,
        houseType: this.houseType,
        reqChargInputLogBeanList: []
      }).then(({ data }) => {
        this.clickOver = true

        if (data.code === 200) {
          this.$message({
            message: '新建合同成功',
            type: 'success'
          })
          this.count = 0
          this.$emit('addTrusteeshopSuccess', false)
          // this.form = {}
          // this.houseChange1 = {}
          this.show()
          
          // console.log(this.houseChange1)
          // this.form = this.houseChange1

          this.setHouseFormDefaultKeeper()

        } else if (data.code === 10001) {
          this.$message({
            message: '该房源已经签订过房东合同，请不要重复签订',
            type: 'error'
          })
        } else {
          this.$message({
            message: data.message,
            type: 'error'
          })
        }
      })
    },

    userFilter(queryString) { // 房东信息
      return (restaurant) => {
        return (restaurant.value.indexOf(queryString.toLowerCase()) === 0)
      }
    },
    querySearch(queryString, cb) { // 小区信息
      if (queryString !== '') {
        var dataList = {}
        dataList.userType = 'P'
        dataList.keywordAddress = queryString
        dataList.houseSpaceManagerType = 'HOUSE'
        dataList.rentType = 'ENTIRE_RENT'
        dataList.houseSpaceProcess = 'GET_PROCESS'
        dataList.houseSpaceStatus = 'APPROVED'
        this.restaurants = []
        this.$http.post(this.mix.houseList, dataList).then(({ data }) => {
          for (var p in data.data.list) {
            if (data.data.list !== '' && data.data.list !== null) {
              for (var i in data.data.list[p].resHouseSpaceManagerBeanList) {
                let restaurant = {}
                restaurant.value = data.data.list[p].resHouseSpaceManagerBeanList[i].resHouseSpaceBeanList[0].keywordAddress
                restaurant.houseSpaceManagerId = data.data.list[p].resHouseSpaceManagerBeanList[i].resHouseSpaceBeanList[0].houseSpaceId
                restaurant.zoneId = data.data.list[p].resHouseSpaceManagerBeanList[i].zoneId
                this.restaurants.push(restaurant)
              }
            }
          }
        })
      }
      // 调用 callback 返回建议列表的数据
      cb(this.restaurants)
    },
    createFilter(queryString) { // 小区信息
      return (restaurant) => {
        return (restaurant.value.indexOf(queryString.toLowerCase()) === 0)
      }
    },
    querySearch1(queryString, cb) { // 小区信息
      this.restaurants1 = []
      if (queryString) {
        let req = {}
        req.baseDataType = 'BLOCK_INFO'
        req.blockName = queryString
        this.$http.post(this.bankSearch, req).then(res => {
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
    blockNameChange() { },

    repQuerySearch(queryString, cb) { // 小管家信息
      var restaurants = this.repList
      var results = queryString ? restaurants.filter(this.userFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    repSelect(item) { // 选择小管家信息
      this.form.housekeeperPhone = item.phone
      this.form.housekeeperName = item.value
      this.form.housekeeperId = item.id
    },
    backChange(value) { // 根据银行搜索支行信息
      let _this = this
      let req = {}
      this.form.bankOfAccounts = ''
      req.baseDataType = 'SECOND_LEVEL_BANK_INFO'
      req.bankName = value
      _this.$http.post(_this.bankSearch, req).then(res => {
        if (res.body.code === 200) {
          if (res.body.data.length > 10) {
            _this.bankOfAccount = res.body.data.slice(0, 10)
            _this.bankOfAccounts = res.body.data
          } else {
            _this.bankOfAccounts = res.body.data
            _this.bankOfAccount = res.body.data
          }
          for (let i = 0; i < _this.bankOfAccount.length; i++) {
            _this.bankOfAccount[i].value = _this.bankOfAccount[i].branchBankName
          }
          for (let i = 0; i < _this.bankOfAccounts.length; i++) {
            _this.bankOfAccounts[i].value = _this.bankOfAccounts[i].branchBankName
          }
        }
      })
    },
    landlordSearch(_this, userUrl, dataList) { // 搜索房东信息
      _this.landlordList = []
      _this.$http.post(userUrl, dataList).then(({ data }) => {
        var option = []
        if (data.code === 200) {
          var data1 = data.data.list
          var op = {}
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
        } else {
          option = []
        }
        _this.landlordList = option
        console.log(_this.landlordList)
      })
    },
    repSearch(_this, userUrl, dataList) { // 搜索房东信息
      _this.$http.post(userUrl, dataList).then(({ data }) => {
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
    openAddType(value) { // 打开不规则递增
      var effectTime = (new Date(this.form.startTime)).getTime()
      var addType = this.form.addType
      var _this = this
      if (value === '3') {
        if (isNaN(effectTime)) {
          this.$message({
            message: '请先选择合同开始时间',
            type: 'error'
          })
          this.addType = addType
        } else if (this.form.year === '0') {
          this.$message({
            message: '请先选择合同时长',
            type: 'error'
          })
          this.addType = addType
        } else if (this.form.rental1 === '' || this.form.rental1 === null) {
          this.$message({
            message: '请先输入收房价格',
            type: 'error'
          })
          this.addType = addType
        } else if (this.form.freeStyle !== '0' && (this.form.freeMonth === '0' && this.form.freeDay === '0')) {
          this.$message({
            message: '请先选择正确的免租时长',
            type: 'error'
          })
          this.addType = addType
        } else if (this.form.decorationStyle !== '0' && (this.form.decorationMonth === '0' && this.form.decorationDay === '0')) {
          this.$message({
            message: '请先选择正确的空置时长',
            type: 'error'
          })
          this.addType = addType
        } else {
          // 计算开始时间
          effectTime = new Date(effectTime)
          let year1 = effectTime.getFullYear()
          let month1 = effectTime.getMonth() + 1
          let day1 = effectTime.getDate()
          // 计算合同开始时间
          this.effectTime = effectTime.getFullYear() + '/' + (effectTime.getMonth() + 1) + '/' + effectTime.getDate()
          // 计算最终结束时间
          var endTime = _this.$options.methods.time((year1 + parseInt(this.form.year)), (month1 + parseInt(this.form.month)), (day1 + parseInt(this.form.day)), _this) + ' 23:59:59'
          endTime = (new Date(endTime)).getTime()
          endTime = new Date(endTime - 24 * 60 * 60 * 1000)

          let len = parseInt(this.form.year)
          let time1 = _this.$options.methods.time(year1, (month1 + parseInt(this.form.month)), (day1 + parseInt(this.form.day)), _this)
          let time2 = _this.$options.methods.time(year1, (month1 + parseInt(this.form.decorationMonth)), (day1 + parseInt(this.form.decorationDay)), _this)
          if ((new Date(time1)).getTime() > (new Date(time2)).getTime()) {
            len++
          }
          this.endTime = endTime.getFullYear() + '/' + (endTime.getMonth() + 1) + '/' + endTime.getDate()
          endTime = new Date(effectTime - 24 * 60 * 60 * 1000)
          let year = endTime.getFullYear()
          let month = endTime.getMonth() + 1
          let day = endTime.getDate()

          // 计算最终合同结束时间
          endTime = endTime.getTime()
          if (this.form.decorationStyle !== '0') {
            // 计算递增开始时间
            var startTime = _this.time(year1, (month1 + parseInt(this.form.decorationMonth)), (day1 + parseInt(this.form.decorationDay)), _this) + ' 00:00:00'
            startTime = new Date((new Date(startTime)).getTime())
            year1 = startTime.getFullYear()
            month1 = startTime.getMonth() + 1
            day1 = startTime.getDate()
            // 计算递增周期结束时间
            endTime = new Date(startTime - 24 * 60 * 60 * 1000)
            year = endTime.getFullYear()
            month = endTime.getMonth() + 1
            day = endTime.getDate()
          }

          let obj = []
          this.addWay = []
          if ((month === 2 && day === 28 && !this.$options.methods.getYear(year)) || (month === 2 && day === 29 && this.$options.methods.getYear(year))) {
            for (let i = 0; i < len; i++) {
              let time
              if (this.$options.methods.getYear(year + i)) {
                time = (year + i + 1) + '-2-29'
              } else {
                time = (year + i + 1) + '-2-28'
              }
              if (i === (len - 1)) {
                time = this.endTime
              }
              let list = {}
              list.time = (year1 + i) + '-03-01'
              list.endTime = time
              list.getPrice1 = ''
              list.amount = this.form.rental1
              list.addAmount = ''
              list.addPer = ''
              list.addAmount1 = 0
              list.addPer1 = 0
              list.rentFreeEnd = ''
              list.rentFreeStart = ''
              list.addCycle = 'NORISE'
              obj.push(list)
              this.addWay = obj
            }
          } else {
            for (let i = 0; i < len; i++) {
              let time = (year + i + 1) + '/' + month + '/' + day
              if (i === (len - 1)) {
                time = this.endTime
              }
              let list = {}
              let getPrice1 = this.form.rental1
              list.time = (year1 + i) + '/' + month1 + '/' + day1
              list.endTime = time
              list.getPrice1 = getPrice1
              list.amount = getPrice1
              list.addAmount = ''
              list.addPer = ''
              list.addAmount1 = 0
              list.addPer1 = 0
              list.rentFreeEnd = ''
              list.rentFreeStart = ''
              list.getPrice1 = ''
              list.addCycle = 'NORISE'
              obj.push(list)
              this.addWay = obj
            }
          }
          this.form.addType = value
          this.addType = this.form.addType
          this.addTypeShow = true
          console.log(this.addWay)
        }
      } else {
        this.form.addType = value
      }
    },
    getYear(year) {
      return (year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0)
    },
    changePrice(item, index) { // 按比例递增
      if (index === 0) {
        item.amount = (this.form.rental1 * (this.addWay[index].addPer1 / 100 + 1)).toFixed(2)
      } else {
        item.amount = (this.addWay[index - 1].amount * (this.addWay[index].addPer1 / 100 + 1)).toFixed(2)
      }
      var len = this.addWay.length
      for (let i = 0; i < len; i++) {
        if (!isNaN(this.addWay[i].addAmount1) && this.addWay[i].addAmount1 !== 0) {
          // 当金额存在且不为零时，以金额算
          if (i === 0) {
            this.addWay[i].amount = (parseInt(this.form.rental1) + parseInt(this.addWay[i].addAmount1)).toFixed(2)
          } else {
            this.addWay[i].amount = (parseInt(this.addWay[i - 1].amount) + parseInt(this.addWay[i].addAmount1)).toFixed(2)
          }
        } else if ((this.addWay[i].addAmount1 === 0 || isNaN(this.addWay[i].addAmount1)) && isNaN(this.addWay[i].addPer1) && this.addWay[i].addPer1 !== 0) {
          // 比存在且不为0 且金额不存在或者金额为0
          if (i === 0) {
            this.addWay[i].amount = (this.form.rental1 * (this.addWay[i].addPer1 / 100 + 1)).toFixed(2)
          } else {
            this.addWay[i].amount = (this.addWay[i - 1].amount * (this.addWay[i].addPer1 / 100 + 1)).toFixed(2)
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
    changePrice1(item, index) { // 按金额递增
      if (isNaN(this.addWay[index].addAmount1)) {
        this.addWay[index].addAmount1 = 0
      }
      if (index === 0) {
        item.amount = parseInt(this.form.rental1) + parseInt(this.addWay[index].addAmount1)
      } else {
        item.amount = parseInt(this.addWay[index - 1].amount) + parseInt(this.addWay[index].addAmount1)
      }
    },
    chooseEndTime(item, index) {
      // 合同生效时间
      // let effectTime = (new Date(this.form.effectTime)).getTime()
      // 合同结束时间
      let endTime = (new Date(this.endTime)).getTime()
      // 最后结束时间
      // ****
      // 格式化结束时间
      let lastEndTime = new Date(item.endtime)
      lastEndTime = lastEndTime.getFullYear() + '/' + (lastEndTime.getMonth() + 1) + '/' + lastEndTime.getDate() + ' 00:00:00'
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
          let end1 = new Date(this.addWay[i].endtime)
          end1 = end1.getFullYear() + '/' + (end1.getMonth() + 1) + '/' + end1.getDate() + ' 00:00:00'
          end1 = (new Date(end1)).getTime()
          // 如果当前的结束时间晚于this.addWay[i]的结束时间。则删除this.addWay[i]
          if (lastEndTime >= end1) {
            this.addWay.splice(i, 1)
            i--
            len--
          } else {
            // 如果当前的结束时间晚于this.addWay[i]的结束时间。则this.addWay[i]的开始时间为当前结束时间的之后一天
            let time = new Date(lastEndTime + 24 * 60 * 60 * 1000)
            this.addWay[i].time = time.getFullYear() + '/' + (time.getMonth() + 1) + '/' + time.getDate()
          }
        }
      }
    },
    addHouseType() {
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
      list.addCycle = 'NORISE'
      this.addWay.push(list)
    },
    time(feYear, feMonth, feDay) {
      let monthDay = 31
      let month = feMonth % 12
      if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
        monthDay = 31
      } else if (month === 4 || month === 6 || month === 9 || feMonth === 11) {
        monthDay = 30
      } else if (this.getYear(feYear) && month === 2) {
        monthDay = 29
      } else if (!this.getYear(feYear) && month === 2) {
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
    submitAdd() {
      let len = this.addWay.length
      let arr = []
      let count = 0
      if (this.form.freeStyle !== '0' && this.form.freeMonth === '0' && this.form.freeDay === '0') {
        this.$message({
          message: '请输入正确的免租时间',
          type: 'error'
        })
      } else {
        for (let i = 0; i < len; i++) {
          // 格式化开始时间
          let s = new Date(this.addWay[i].time)
          s = s.getFullYear() + '/' + (s.getMonth() + 1) + '/' + s.getDate() + ' 00:00:00'
          s = (new Date(s)).getTime()
          // 格式化结束时间
          let e = new Date(this.addWay[i].endTime)
          e = e.getFullYear() + '/' + (e.getMonth() + 1) + '/' + e.getDate() + ' 23:59:59'
          e = (new Date(e)).getTime()
          // 格式化免租开始时间
          this.addWay[i].rentFreeStart = this.addWay[i].time
          let fs = new Date(this.addWay[i].rentFreeStart)
          fs = fs.getFullYear() + '/' + (fs.getMonth() + 1) + '/' + fs.getDate() + ' 00:00:00'
          console.log(fs)
          fs = (new Date(fs)).getTime()
          var fe
          this.addWay[i].rentFreeEnd = this.addWay[i].time
          if (this.form.freeStyle === '0') {
            // 格式化免租结束时间
            fe = new Date(this.addWay[i].rentFreeEnd)
            fe = fe.getFullYear() + '/' + (fe.getMonth() + 1) + '/' + fe.getDate() + ' 00:00:00'
            fe = (new Date(fe)).getTime()
          } else if (this.form.freeStyle === '2') { // 周期性免租
            fe = new Date(this.addWay[i].rentFreeEnd)
            let feYear = fe.getFullYear()
            let feMonth = fe.getMonth() + 1 + parseInt(this.form.freeMonth)
            let feDay = fe.getDate() + parseInt(this.form.freeDay)
            fe = this.$options.methods.time(feYear, feMonth, feDay, this) + ' 23:59:59'
            fe = (new Date(fe)).getTime()
          } else if (this.form.freeStyle === '1') { // 周期性免租
            if (i === 0) {
              fe = new Date(this.addWay[i].rentFreeEnd)
              let feYear = fe.getFullYear()
              let feMonth = fe.getMonth() + 1 + parseInt(this.form.freeMonth)
              let feDay = fe.getDate() + parseInt(this.form.freeDay)
              // console.log()
              fe = this.$options.methods.time(feYear, feMonth, feDay, this) + ' 23:59:59'
              fe = (new Date(fe)).getTime()
            } else {
              fe = new Date(this.addWay[i].rentFreeEnd)
              fe = fe.getFullYear() + '/' + (fe.getMonth() + 1) + '/' + fe.getDate() + ' 00:00:00'
              fe = (new Date(fe)).getTime()
            }
          }
          // 开始检测数据正确性
          if (fs < s) {
            this.$message({
              message: '请确保免租开始时间晚于开始时间',
              type: 'error'
            })
            count++
            break
          } else if (fs > fe) {
            this.$message({
              message: '请确保免租开始时间早于免租结束时间',
              type: 'error'
            })
            count++
            break
          } else {
            if (fe > e) {
              fe = e
            }
            // 开始检测免租期所处位置以便将相应的计费时间传递给后台
            let list = {}
            list.addCycle = 'NORISE' // 默认后台无递增，递增金额在前端完成
            list.initialAmount = this.addWay[i].amount * 1000
            list.businessType = 'DEL'
            list.chargType = 'REN'
            list.financeType = 'PAY'
            if (this.addWay[i].addAmount1 !== null && this.addWay[i].addPer1 !== null && this.addWay[i].addAmount1 !== 0 && this.addWay[i].addPer1 !== 0) {
              list.addType = 'NOTRISE'
              list.addAmount = this.addWay[i].addAmount1 * 1000
            } else if (this.addWay[i].addAmount1 !== null && this.addWay[i].addPer1 !== null && this.addWay[i].addAmount1 !== 0 && this.addWay[i].addPer1 === 0) {
              list.addType = 'NOTRISE'
              list.addAmount = this.addWay[i].addAmount1 * 1000
            } else if (this.addWay[i].addAmount1 !== null && this.addWay[i].addPer1 !== null && this.addWay[i].addAmount1 === 0 && this.addWay[i].addPer1 !== 0) {
              list.addType = 'NOTRISE'
              list.addPer = this.addWay[i].addPer1 * 1000
            } else {
              list.addType = 'NOTRISE'
            }
            if (i === (len - 1)) {
              this.form.endTime = e
            }
            list.rentalFreeStart = fs
            list.rentalFreeEnd = fe
            list.startChargTime = s
            list.endChargTime = e
            list.cycle = this.form.payCycle
            arr.push(list)
          }
        }
        if (count === 0) {
          this.form.reqChargInputLogBeanList = arr
          this.addTypeShow = false
        }
      }
    },

    bankQuerySearch(queryString, cb) { // 搜索银行支行
      if (queryString) {
        let restaurants = this.bankOfAccounts
        var results = queryString ? restaurants.filter(this.createFilter1(queryString)) : restaurants
        if (results.length > 10) {
          this.bankOfAccount = results.slice(0, 10)
        } else {
          this.bankOfAccount = results
        }
        cb(results)
      }
      // this.bankOfAccount = results
    },
    createFilter1(queryString) {
      return (restaurant) => {
        return (restaurant.branchBankName.indexOf(queryString) > 0)
      }
    },
    IdentityCodeValid(code, _this) { // 身份证校验
      // code = '33260319780604606X'
      var city = {
        11: '北京',
        12: '天津',
        13: '河北',
        14: '山西',
        15: '内蒙古',
        21: '辽宁',
        22: '吉林',
        23: '黑龙江',
        31: '上海',
        32: '江苏',
        33: '浙江',
        34: '安徽',
        35: '福建',
        36: '江西',
        37: '山东',
        41: '河南',
        42: '湖北',
        43: '湖南',
        44: '广东',
        45: '广西',
        46: '海南',
        50: '重庆',
        51: '四川',
        52: '贵州',
        53: '云南',
        54: '西藏',
        61: '陕西',
        62: '甘肃',
        63: '青海',
        64: '宁夏',
        65: '新疆',
        71: '台湾',
        81: '香港',
        82: '澳门',
        91: '国外'
      }
      var tip = ''
      var pass = true
      // if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
      //   tip = '身份证号格式错误'
      //   pass = false
      // } else if (!city[code.substr(0, 2)]) {
      //   tip = '地址编码错误'
      //   pass = false
      // } else {
      // 18位身份证需要验证最后一位校验位
      if (code.length === 18) {
        code = code.split('')
        // ∑(ai×Wi)(mod 11)
        // 加权因子
        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
        // 校验位
        var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
        var sum = 0
        var ai = 0
        var wi = 0
        for (var i = 0; i < 17; i++) {
          ai = code[i]
          wi = factor[i]
          sum += ai * wi
        }
        if (code[17] === 'X') {
          if (parity[sum % 11] !== 'X') {
            tip = '校验位错误'
            pass = false
          }
        } else if (parity[sum % 11] !== parseInt(code[17])) {
          tip = '校验位错误'
          pass = false
        }
      }
      // }
      console.log(tip, city)
      // if (!pass) {
      //   _this.$message({
      //     message: tip,
      //     type: 'error'
      //   })
      // }
      return pass
    },
    changeRental(value) {
      this.form.deposit1 = value
    },

    userCheck() {
      let userPhone = this.$store.state.accountUrl + 'user/info/p/'
      let userId = this.$store.state.accountUrl + 'user/info/cert/'
      let phone = this.form.userPhone
      let name = this.form.userName
      var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
      // let certificateType = this.form.certificateType
      let certificateNum = this.form.certificateNum
      phone = phone.replace(/ /g, '')
      if (this.$options.methods.userBloon(name) && this.$options.methods.userBloon(phone) && this.$options.methods.userBloon(certificateNum)) { // 判断姓名、手机号、证件号是否为空
        if (name.includes(' ')) { // 判断姓名是否有空格
          this.$message({
            message: '您输入的姓名有误，请确认后重新输入',
            type: 'error'
          })
        } else if (phone.includes(' ') || !reg.test(phone)) {
          this.$message({ // 判断手机号是否有空格
            message: '您输入的手机号有误，请确认后重新输入',
            type: 'error'
          })
          // } else if (certificateNum.includes(' ') || !this.$options.methods.IdentityCodeValid(certificateNum, this)) {
        } else if (certificateNum.includes(' ')) {
          this.$message({ // 判断证件号是否有空格
            message: '您输入的证件号有误，请确认后重新输入',
            type: 'error'
          })
        } else {
          userPhone = userPhone + phone
          this.$http.get(userPhone).then(res => { // 通过手机号获取id
            if (res.body.code === 200) {
              userId = userId + res.body.data.id
              if (res.body.data.username) {
                this.userInfo.name = res.body.data.username
              }
              if (res.body.data.phone) {
                this.userInfo.phone = parseInt(res.body.data.phone)
              }
              this.$http.get(userId).then(resId => { // 通过id获取到详细信息
                if (resId.body.code === 200) {
                  // 判断用户名、手机号、身份证号是否为空，如果不为空，则将信息放入userInfo中
                  if (resId.body.data.certNumber) {
                    this.userInfo.certificateNum = resId.body.data.certNumber
                  }
                  // 判断用户信息是否完善
                  if (res.body.data.username === null || res.body.data.phone === null || resId.body.data.certNumber === null) {
                    this.userInfo.userId = resId.body.data.id
                    this.userInfo.bean = 3
                    if (this.userInfo.name === null) {
                      this.userInfo.bool = 3
                    } else if (this.userInfo.phone === null) {
                      this.userInfo.bool = 4
                    } else if (this.userInfo.phone === null) {
                      this.userInfo.bool = 5
                    }
                  } else if (name !== this.userInfo.name || parseInt(phone) !== this.userInfo.phone || certificateNum !== this.userInfo.certificateNum) { // 判断身份信息是否完全正确
                    this.$message({
                      message: '用户信息与系统信息不匹配，请核对后重新输入',
                      type: 'error'
                    })
                    this.userInfo.bean = 2
                    this.userInfo.bool = 2
                  } else { // 用户信息无误
                    this.userInfo.bean = 2
                    this.userInfo.bool = 1
                  }
                  // } else if (res.body.code === 10000) {
                  //   this.userInfo.bean = 1
                } else if (resId.body.code === 10000) {
                  this.userInfo.certificateNum = ''
                  this.userInfo.bean = 3
                  this.userInfo.bool = 3
                } else {
                  // this.$message({
                  //   message: '网络错误',
                  //   type: 'error'
                  // })
                  this.userInfo.bean = 2
                  this.userInfo.bool = 2
                }
              })
            } else if (res.body.code === 10000) { // 用户未注册
              this.userInfo.bean = 1
            } else {
              // this.$message({ // 判断证件号是否有空格
              //   message: '网络错误1',
              //   type: 'error'
              // })
            }
          })
        }
      }
      // if (isNaN(phone))
    },

    userBloon(user) {
      return (user !== '' && user !== null)
    },
    changeP(item) { // 改变省份
      let _this = this
      // console.log(111)
      this.$http.post(this.bankSearch, { 'baseDataType': 'CITY_INFO', 'provinceId': item }).then(function (valueD) {
        _this.address.cLists = valueD.data.data
        _this.form.city = valueD.data.data[0].cityId
        this.form.district = ''
      })
    },
    changeC(item) { // 改变城市
      console.log(item)
      let _this = this
      this.$http.post(this.bankSearch, { 'baseDataType': 'AREA_INFO', 'cityId': item }).then(function (valueD) {
        _this.address.dLists = valueD.data.data
        _this.form.district = valueD.data.data[0].areaId
      })
    },
  },

  watch: {
    addclickCount() {
      // console.log(this.addclickCount % 2)
      if (this.addclickCount % 2 === 1) {
        let list = {}
        list.uId = ''
        list.houseSpaceManagerId = ''
        list.businessId = ''
        list.blockName = ''
        list.detailAddress = ''
        list.startTime = ''
        list.endTime = ''
        list.freeStartTime = ''
        list.freeEndTime = ''
        list.rental = ''
        list.deposit = 0
        list.rental1 = ''
        list.deposit1 = ''
        list.payWay = '1'
        list.during = ''
        list.payCycle = 'ONEMON'
        list.addType = 'NOTRISE'
        list.addCycle = 'NORISE'
        list.addAmount = ''
        list.addPer = ''
        list.addAmount1 = ''
        list.addPer1 = ''
        list.payMethod = 'CYCLE'
        list.payTime = ''
        list.buildingNo = ''
        list.unitNo = null
        list.roomNo = ''
        list.payeeName = ''
        list.bankAccount = ''
        list.bankName = '网络有误'
        list.bankOfAccounts = ''
        list.memo = ''
        list.houseSpaceId = ''
        list.conType = '1'
        list.housekeeperName = ''
        list.housekeeperPhone = ''
        list.housekeeper = []
        list.userName = ''
        list.waterMeterReading = ''
        list.electricMeterReading = ''
        list.gasMeterReading = ''
        list.waterMeterNumber1 = ''
        list.electricMeterNumber1 = ''
        list.gasMeterNumber1 = ''
        list.certificateType = 'ID'
        list.certificateNum = ''
        list.userPhone = ''
        list.bedroomNumber = '1'
        list.livingRoomNumber = '1'
        list.toiletNumber = '1'
        list.kitchenNumber = '1'
        list.direction = 'EAST'
        list.houseSpaceManagerArea1 = ''
        list.houseSpaceManagerArea = ''
        list.rentType = 'JOINT_RENT'
        list.decorateType = 'R'
        list.zoneId = ''
        list.zone = ''
        list.district = ''
        list.insuranceStatus = 'YES'
        list.houseOwnershipCertificateNumber = '' // 房产证号
        list.penalty = ''
        list.penalty1 = ''
        list.freeStyle = '0'
        list.year = '0'
        list.month = '0'
        list.day = '0'
        list.freeMonth = '0'
        list.freeDay = '0'
        list.decorationStyle = '0'
        list.decorationMonth = '0'
        list.decorationDay = '0'
        list.floorHeight = ''
        list.reqChargInputLogBeanList = []
        list.zoneData = []
        list.city = ''
        list.province = ''
        list.district = ''
        list.blockId = ''
        list.currentFloor = ''
        list.houseCertificateType = 'OFFICIAL'
        let list1 = {}
        list1.payCycle = 'ONEMON'
        list1.addAmount1 = ''
        list1.addAmount = ''
        list1.addPer1 = ''
        list1.addPer = ''
        list1.addCycle = 'NORISE'
        list1.addType = 'NOTRISE'
        list1.businessType = ''
        list1.chargType = 'REN'
        list1.cycle = 'ONEMON'
        list1.endChargTime = ''
        list1.financeType = 'INC'
        list1.initialAmount = ''
        list1.startChargTime = ''
        list.reqChargInputLogBeanList.push(list1)
        this.form = list
        this.addShow = false

        let username = ''
        this.$http.get(this.$store.state.accountUrl + 'user/info/id/' + this.$store.state.currentUser.uid,
        ).then(function (response) {
          var data = response.data
          if (data.code === 200) {
            username = data.data.username
            // this.form.housekeeper[0] = '小管家'
            this.form.housekeeper = [localStorage.getItem('role'), username]
            this.form.housekeeperName = username
            this.form.housekeeperPhone = this.$store.state.currentUser.UserPhone
            this.form.housekeeperId = this.$store.state.currentUser.uid
          }
        })

        let _this = this
        let req = {}
        req.baseDataType = 'SECOND_LEVEL_BANK_INFO'
        req.bankName = ''
        this.$http.post(this.bankSearch, { 'baseDataType': 'FIRST_LEVEL_BANK_INFO' }).then(function (res) {
          res = res.body
          if (res.code === 200) {
            _this.bankList = res.data
            _this.form.bankName = res.data[0].bankName
            req.bankName = res.data[0].bankName
            _this.$http.post(_this.bankSearch, req).then(res => {
              if (res.body.code === 200) {
                if (res.body.data.length > 10) {
                  _this.bankOfAccount = res.body.data.slice(0, 10)
                  _this.bankOfAccounts = res.body.data
                } else {
                  _this.bankOfAccounts = res.body.data
                  _this.bankOfAccount = res.body.data
                }
                for (let i = 0; i < _this.bankOfAccount.length; i++) {
                  _this.bankOfAccount[i].value = _this.bankOfAccount[i].branchBankName
                }
                for (let i = 0; i < _this.bankOfAccounts.length; i++) {
                  _this.bankOfAccounts[i].value = _this.bankOfAccounts[i].branchBankName
                }
              }
            })
          }
        })
        // let treeArea = this.$store.state.accountUrl + 'unit/tree/f/area'
        this.loadOptions(this)
        // this.$http.get(treeArea).then(({data}) => {
        //   // var data1 = data.data.children[0].children
        //   var data1 = data.data.children
        //   this.unit = data1
        //   this.form.zone = this.unit[0].text
        //   this.form.zoneId = this.unit[0].id
        // })
      }
    }
  },

}
$('.el-dialog--small').width(650)
