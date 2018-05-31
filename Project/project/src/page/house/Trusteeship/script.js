
import $ from 'jquery'
import Upload from '@/components/common/Upload' // 上传附件
import depositDetail from '@/components/depositDetail'  //  新建房源
import trusteeshipAdd from '@/components/trusteeshopAdd'    // 新增托管合同
import trusteeshipRenewForm from '@/components/trusteeshopRenewForm'  // 合同续约
import houseSearch from '@/components/houseSearch'  //  顶部搜索
import conDetail from '@/components/conDetail'  //  顶部搜索

import TrusteeshipItem from './TrusteeshipItem/'

(function () {
  $('.el-dialog--small,.el-dialog--tiny').width(650)
})
var $this = this
export default {

  components: {
    TrusteeshipItem, trusteeshipAdd, trusteeshipRenewForm, depositDetail, houseSearch, conDetail, Upload
  },

  beforeCreate () {
    var apiUrl = this.$store.state.contractUrl + 'list' // 合同列表
    let dataList = {}
    dataList.contractType = 'DELEGATE'
    dataList.pageNo = 1
    dataList.pageSize = 10
    dataList.loginId = this.$store.state.currentUser.uid
    this.$options.methods.searchHouseList(this, apiUrl, dataList)
  },
  data () {
    $this = this
    return {
      uploadData: {
        show: false
      },
      currentPage2: 1, // 当前分页
      pageSize: 10, // 当前分页数据量
      totlePage: 0, // 总数据数
      activeName: 'first',
      conDetailShow: false,
      loading: 0,
      houseChange: {
        businessId: '',
        blockName: '桂花城',
        detailAddress: '1栋1单元1603',
        buildingNo: '', // 楼号
        unitNo: '', // 单元号
        roomNo: '', // 室号
        trusteeshipStartTime: '2017-8-9', // 托管开始时间
        trusteeshipEndTime: '2022-8-8', // 托管结束时间
        trusteeshipPrice: 2500, // 收房价格
        trusteeshipDeposit: 2500, // 押金
        RentFreeTime: 30, // 免租期限
        payWay: 2,
        payeeName: '阮翔', // 收款人姓名
        payeeAccount: 6000488864422158935, // 收款账号
        payeeBank: '2', // 收款银行
        openingBranch: '杭州白马支行', // 开户支行
        houseLandlordBean: {
          isTrue: true,
          name: '',
          identify: '',
          idType: {
            count: 1,
            list: [
              {
                value: 1,
                label: '身份证'
              },
              {
                value: 2,
                label: '护照'
              },
              {
                value: 3,
                label: '居住证'
              },
              {
                value: 4,
                label: '驾驶证'
              },
              {
                value: 5,
                label: '港澳台通行证'
              }
            ]
          },
          phone: ''
        },
        houseRenter: {
          isTrue: false,
          Name: '',
          Identify: '',
          IDType: {
            count: 1,
            list: [
              {
                value: 1,
                label: '身份证'
              },
              {
                value: 2,
                label: '护照'
              },
              {
                value: 3,
                label: '居住证'
              },
              {
                value: 4,
                label: '驾驶证'
              }
            ]
          },
          Phone: ''
        }
      },
      searchData: [ // 搜索数据
        {
          head: '合同状态：',
          value: 'contractStatus',
          content: [
            {
              text: '全部',
              value: 'ALL'
            },
            {
              text: '待生效',
              value: 'ALSIGN'
            },
            {
              text: '已生效',
              value: 'EFFECT'
            },
            {
              text: '已结束',
              value: 'ALEND'
            }
          ]
        }
        // {
        //   head: '片区：',
        //   value: 'zone',
        //   content: [
        //     {
        //       text: '全部',
        //       value: null
        //     },
        //     {
        //       text: '随寓',
        //       value: ''
        //     },
        //     {
        //       text: '北软',
        //       value: ''
        //     },
        //     {
        //       text: '城东',
        //       value: ''
        //     }
        //   ]
        // }
      ],
      searchList: {
        contractType: 'DELEGATE',
        input: ''
      }, // 搜索列表
      disabled: true,
      tableData: [
        {
          number: '000002',
          phone: '18868178900',
          name: '王大虎',
          money: '1600元',
          state: '生效中',
          confirmTime: '2017-09-07',
          houseName: '锦文雅苑9幢1单元1302-B',
          payType: '押一付三',
          failTime: '2018-09-07',
          contractYear: '一年',
          zuyueState: '换房待确认'
        }
      ],
      houseText: '',
      istData: [],
      dialogVisible: false, // 控制新增托管合同的弹窗显示与否
      dialogRenewVisible: false, // 控制续约弹窗的显示
      dialogFormVisible: false, // 租约详情弹窗
      input: '',
      formLabelWidth: '120px',
      totleData: [],
      tableData3: [],
      detailClick: 0,
      contractId: '',
      int: 0,
      mix: {
        userUrl: this.$store.state.contractUrl + 'user/list', // 查询用户列表
        landlordID: this.$store.state.contractUrl + 'user/info/cert', // 身份证信息
        userSignUrl: this.$store.state.contractUrl + 'user/info/signin', // 查询用户信息
        ending: this.$store.state.contractUrl + 'update/', // 提前终止
        apiUrl: this.$store.state.contractUrl + 'list', // 合同列表
        userId: this.$store.state.contractUrl + 'user/info/cert/', // 根据ID搜索身份证号
        updateCon: this.$store.state.contractUrl + 'updateContent', // 更新合同
        depositAddUrl: this.$store.state.houseUrl + 'add', // 新增托管
        picAdd: this.$store.state.contractUrl + 'attachment/add' // 图片上传地址
      },
      editDepositForm: false,
      urlLists: { // 返回链接列表
        contractId: '',
        addrList: []
      },
      pdfData: {},
      uploadName: {
        title: '附件上传',
        btnName: '附件'
      }
    }
  },
  mounted () {
    if ($this.int === 0) {
      $('body').click(function (event) {
        var _target = event.target
        if (_target.closest('.list-contain-div') === null && _target.closest('.houseDetail .dialog') === null && _target.closest('.el-dialog') === null && $this.conDetailShow === true) {
          $this.conDetailShow = false
          $this.detailClick++
        }
      })
      $this.int = 0
    }
  },

  methods: {
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    closeTrusteeshipAdd() {
      this.dialogVisible = false
    },
    openAddForm(data) {
      this.conDetailShow = true
      this.houseChange = data
      this.houseChange.rental1 = this.houseChange.rental1
      this.houseChange.deposit1 = this.houseChange.deposit1
      this.detailClick++
      this.contractId = data.id
    },
    editContract(contractId) {
      this.dialogFormVisible = true
      this.contractId = contractId
    },
    openRenewForm() {
      this.dialogRenewVisible = true
    },
    closeTrusteeshipRenewAdd() {
      this.dialogRenewVisible = false
    },
    handleSizeChange(data) { // 分页数改变时触发
      this.pageSize = data
      this.searchList.pageSize = this.pageSize
      this.searchList.pageNo = this.currentPage2
      this.searchList.loginId = this.$store.state.currentUser.uid
      this.$options.methods.searchHouseList(this, this.mix.apiUrl, this.searchList)
    },
    handleCurrentChange(data) { // 当前页改变时触发
      this.currentPage2 = data
      this.searchList.pageSize = this.pageSize
      this.searchList.pageNo = this.currentPage2
      this.searchList.loginId = this.$store.state.currentUser.uid
      this.$options.methods.searchHouseList(this, this.mix.apiUrl, this.searchList)
    },
    houseSearch1() { // 修改后搜索的搜索，不支持搜索框
      // let r = /^\+?[1-9][0-9]*$/ // 正整数
      // console.log(this.searchList.input)
      // if (r.test(this.searchList.input)) {
      //   this.searchList.userPhone = this.searchList.input
      //   this.searchList.userName = null
      // } else {
      //   this.searchList.userName = this.searchList.input
      //   this.searchList.userPhone = null
      // }
      this.searchList.contractType = 'DELEGATE'
      this.searchList.pageSize = this.pageSize
      this.currentPage2 = 1
      this.searchList.keyWord = this.searchList.input
      this.searchList.pageNo = this.currentPage2
      this.searchList.loginId = this.$store.state.currentUser.uid
      this.$options.methods.searchHouseList(this, this.mix.apiUrl, this.searchList) // 根据查询信息查询房源列表
    },
    houseSearch(ind, index) { // 修改后搜索的搜索，不支持搜索框
      // var data = {}
      if (index === 'ALL') {
        index = null
      }
      this.searchList[ind] = index
      this.searchList.contractType = 'DELEGATE'
      this.searchList.pageSize = this.pageSize
      this.currentPage2 = 1
      this.searchList.pageNo = this.currentPage2
      this.searchList.loginId = this.$store.state.currentUser.uid
      this.$options.methods.searchHouseList(this, this.mix.apiUrl, this.searchList) // 根据查询信息查询房源列表
    },

    closeForm() { // 关闭详情弹窗
      this.dialogFormVisible = false
      this.dialogAddVisible = false
      this.editDepositForm = false
      this.disabled = true
      this.dialogFormVisible = false
      this.conDetailShow = false
      this.detailClick++
    },
    editDeposit() { // 修改合同
      this.editDepositForm = true
      this.disabled = false
    },
    submitForm(data) {
      data.rental = parseInt(data.rental) / 1000
      data.deposit = parseInt(data.deposit) / 1000
      switch (data.payCycle) {
        case '1':
          data.payCycle = 'THREEMON'
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
          data.cerType = 'PAY_QUARTERLY'
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
      this.$http.post(this.mix.updateCon, data).then(({ data }) => {
        var data2 = data.code
        if (data2 === 200) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.dialogFormVisible = false
          this.editDepositForm = false
          this.searchList.pageSize = this.pageSize
          this.searchList.pageNo = this.currentPage2
          this.searchList.loginId = this.$store.state.currentUser.uid
          this.$options.methods.searchHouseList(this, this.mix.apiUrl, this.searchList)
        } else {
          this.$message({
            message: data.message,
            type: 'error'
          })
        }
      })
    },
    conStatus(data) { // 转换合同状态以及合同生效时间以及结束时间
      var len = data.length
      for (var i = 0; i < len; i++) {
        
        switch (data[i].payCycle) {
          case 'ONEMON':
            data[i].payWay = '月付'
            data[i].payCycleChange = '1'
            break
          case 'THREEMON':
            data[i].payWay = '季付'
            data[i].payCycleChange = '2'
            break
          case 'SIXMON':
            data[i].payWay = '半年一付'
            data[i].payCycleChange = '3'
            break
          case 'TWELVEMON':
            data[i].payWay = '年付'
            data[i].payCycleChange = '4'
            break
          case 'ONEPAY':
            data[i].payWay = '全额'
            data[i].payCycleChange = '5'
            break
          case 'TWOMON':
            data[i].payWay = '二月付'
            data[i].payCycleChange = '6'
            break
          case 'FOURMON':
            data[i].payWay = '四月付'
            data[i].payCycleChange = '7'
            break
        }
        data[i].rental1 = data[i].rental / 1000
        data[i].deposit1 = data[i].deposit / 1000

      }
      return data
    },
    depositSure(res) {
      if (res === 1) {
        this.$message({
          message: '签订成功',
          type: 'success'
        })
        this.searchList.pageSize = this.pageSize
        this.searchList.pageNo = this.currentPage2
        this.searchList.loginId = this.$store.state.currentUser.uid
        this.searchList.contractType = 'DELEGATE'
        this.$options.methods.searchHouseList(this, this.mix.apiUrl, this.searchList)
      } else {
        let msg = ''
        if (res === 2) {
          msg = '您已签订该合同，请不要重复签订'
        } else {
          msg = '您没有权限签订该合同'
        }
        this.$message({
          message: msg,
          type: 'error'
        })
      }
    },
    conList(data) { // 将房东信息从user拎到list表中
      for (var p in data) {
        if (data[p].users !== '' && data[p].users !== null) {
          for (var i in data[p].users) {
            if (data[p].users[i].representative === 'PARTA') {
              data[p].username = data[p].users[i].userName
              data[p].userName = data[p].users[i].userName
              data[p].phoneNum = data[p].users[i].userPhone
              data[p].cerNum = data[p].users[i].cerNum
              data[p].UserId = data[p].users[i].id
              data[p].conId = data[p].users[i].conId
              data[p].bankAccount = data[p].users[i].bankAccount
              data[p].bankName = data[p].users[i].bankName
              data[p].cerType = data[p].users[i].certificateType
              data[p].contractType = 'DELEGATE'
              data[p].signType = 'NEW'
            }
          }
        }
      }
      return data
    },
    searchHouseList(_this, apiUrl, dataList) {
      _this.loading = 0
      _this.$http.post(apiUrl, dataList).then(({ data }) => {
        _this.totlePage = 0
        _this.tableData3 = []
        if (data.code === 200) {
          var data1 = data.data.list
          _this.conList(data1)
          _this.conStatus(data1)
          _this.totlePage = data.data.totalCount
          // _this.totleData = data1
          _this.tableData3 = data1
          _this.loading = 1
        } else {
          _this.totlePage = 0
          _this.tableData3 = []
          _this.loading = 1
        }
        // console.log(_this.tableData3)
      })
    },
    openUploac(contractId) {
      this.uploadData.show = true
      // this.urlLists.url = this.mix.picAdd
      this.urlLists.contractId = contractId
      this.urlLists.type = 'contract'
      this.urlLists.title = '附件上传'
      console.log(this.detailClick)
      this.detailClick++
      // this.contract = contractId
      // this.uploadData.contract = contractId
      // this.uploadData.show = true
      // $('.upload').fadeIn()
    },
    uploadSuccess() {
      // $('.upload').fadeOut()
      this.uploadData.show = false
      this.detailClick++
    },
  
  },
  created() {
    this.$store.state.houseleftnavnum = '/house/trusteeship'
    this.$store.state.topIndex = '/house/house1'
  }
}
