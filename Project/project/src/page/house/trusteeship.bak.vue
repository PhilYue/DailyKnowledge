<template>
  <div class="houseManager">
    <!-- 右侧主内容区 -->
    <div  class="main-right" >
        <div class='search f-cb'>
          <div class='main-right-search-span'>
            <ul>
              <li v-for='(rent, ind) in searchData' :key="ind" class="searchList">
                <!-- <p :value="rent.value">{{ rent.head }}</p> -->
                <div v-if="ind === 0" style="display:inline-block; width:calc(100% - 100px)"><a v-for='(item, index) in rent.content' :title='item.text' :class='{selectActive: index ==0}' @click="houseSearch(rent.value, item.value)" :value="item.value">{{item.text}}</a></div>
                <div v-if="ind !== 0" style="display:inline-block; width:calc(100% - 100px)"><a v-for='(item, index) in rent.content' :title='item.text' :class='{selectActive: index ==0}' :value="item.value">{{item.text}}</a></div>
              </li>
            </ul>
          </div>
          <div class='main-left-search-span'>
            <el-input placeholder="请输入房东姓名、手机号或房源地址" @keydown.enter.native="houseSearch1" v-model="searchList.input" auto-complete="off" style="width:300px"></el-input>
            <el-button type='primary' @click="houseSearch1">搜索</el-button>
          </div>
      </div>
      <div class="main-right-main">
        <trusteeshipList
          :listData="tableData3"
          @openAddForm="openAddForm"
          @renewFormShow="openRenewForm()"
          @openUploac="openUploac"
          @depositSure="depositSure"
          @openContract="openContract"
          v-if="totlePage > 0"/>
        <h3 v-if="totlePage === 0 && loading !== 0" style="text-align:center">暂无数据</h3>
        <div class="block"  v-if="totlePage > 0">
          <el-pagination class="paging" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage2" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totlePage"></el-pagination>
        </div>
      </div>

      <!-- 租约详情弹窗 -->
      <el-dialog title="托管详情" :visible.sync="dialogFormVisible"  top="10%" width="650px">
        <depositDetail
          :form="houseChange"
          :disabled="disabled"
          :editDepositForm="editDepositForm"
          :formLabelWidth="formLabelWidth"
          @listenToParentEvent="closeForm"
          @submitForm="submitForm"
          @editForm="editDeposit"></depositDetail>
      </el-dialog>
      <!-- 房源详情开始 -->
      <conDetail
       :conDetail="conDetailShow"
       :houseDetailText="'合同详情'"
       conType="con"
       :contractId="contractId"
       :detailClick="detailClick"
       @editContract="editContract"
       @closeDetail="closeForm"></conDetail>
      <!-- 房源详情结束 -->
      <!-- <div class="upload"> -->
      <upload :uploadData="uploadData" :uploadName="uploadName" :urlLists="urlLists" title="附件上传" @uploadSuccess='uploadSuccess' :detailClick="detailClick" typeArr="image/png,image/jpg,image/gif,image/jpeg"></upload>
      <!-- </div> -->

    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import Upload from '@/components/common/Upload' // 上传附件
import depositDetail from '@/components/depositDetail'  //  新建房源
import trusteeshipList from '@/components/trusteeshipList'  //  托管合同列表
import trusteeshipAdd from '@/components/trusteeshopAdd'    // 新增托管合同
import trusteeshipRenewForm from '@/components/trusteeshopRenewForm'  // 合同续约
import houseSearch from '@/components/houseSearch'  //  顶部搜索
import conDetail from '@/components/conDetail'  //  顶部搜索
(function () {
  $('.el-dialog--small,.el-dialog--tiny').width(650)
})
var $this = this
export default {
  name: 'trusteeship',
  beforeCreate: function () {
    var apiUrl = this.$store.state.contractUrl + 'list' // 合同列表
    let dataList = {}
    dataList.contractType = 'DELEGATE'
    dataList.pageNo = 1
    dataList.pageSize = 10
    dataList.loginId = this.$store.state.currentUser.uid
    this.$options.methods.searchHouseList(this, apiUrl, dataList)
  },
  data: function () {
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
  mounted: function () {
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
  components: {
    trusteeshipList, trusteeshipAdd, trusteeshipRenewForm, depositDetail, houseSearch, conDetail, Upload
  },
  methods: {
    submitUpload () {
      this.$refs.upload.submit()
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    closeTrusteeshipAdd () {
      this.dialogVisible = false
    },
    openAddForm (data) {
      this.conDetailShow = true
      this.houseChange = data
      this.houseChange.rental1 = this.houseChange.rental1
      this.houseChange.deposit1 = this.houseChange.deposit1
      this.detailClick++
      this.contractId = data.id
    },
    editContract (contractId) {
      this.dialogFormVisible = true
      this.contractId = contractId
    },
    openRenewForm () {
      this.dialogRenewVisible = true
    },
    closeTrusteeshipRenewAdd () {
      this.dialogRenewVisible = false
    },
    handleSizeChange (data) { // 分页数改变时触发
      this.pageSize = data
      this.searchList.pageSize = this.pageSize
      this.searchList.pageNo = this.currentPage2
      this.searchList.loginId = this.$store.state.currentUser.uid
      this.$options.methods.searchHouseList(this, this.mix.apiUrl, this.searchList)
    },
    handleCurrentChange (data) { // 当前页改变时触发
      this.currentPage2 = data
      this.searchList.pageSize = this.pageSize
      this.searchList.pageNo = this.currentPage2
      this.searchList.loginId = this.$store.state.currentUser.uid
      this.$options.methods.searchHouseList(this, this.mix.apiUrl, this.searchList)
    },
    houseSearch1 () { // 修改后搜索的搜索，不支持搜索框
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
    houseSearch (ind, index) { // 修改后搜索的搜索，不支持搜索框
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
    payment (data) { // 转换支付方式
      var len = data.length
      for (var i = 0; i < len; i++) {
        // var pay = parseInt(data[i].payCycle)
        // console.log(pay)
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
      }
      return data
    },
    closeForm () { // 关闭详情弹窗
      this.dialogFormVisible = false
      this.dialogAddVisible = false
      this.editDepositForm = false
      this.disabled = true
      this.dialogFormVisible = false
      this.conDetailShow = false
      this.detailClick++
    },
    editDeposit () { // 修改合同
      this.editDepositForm = true
      this.disabled = false
    },
    submitForm (data) {
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
      this.$http.post(this.mix.updateCon, data).then(({data}) => {
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
    conStatus (data) { // 转换合同状态以及合同生效时间以及结束时间
      var len = data.length
      for (var i = 0; i < len; i++) {
        var pay = data[i].contractStatus
        switch (pay) {
          case 'WAISIGN':
            data[i].contractStatusChange = '待签订'
            break
          case 'SIGNING':
            data[i].contractStatusChange = '签订中'
            break
          case 'ALSIGN':
            data[i].contractStatusChange = '待生效'
            break
          case 'EFFECT':
            data[i].contractStatusChange = '已生效'
            break
          case 'ENDING':
            data[i].contractStatusChange = '终止中'
            break
          case 'ALEND':
            data[i].contractStatusChange = '已结束'
            break
          case 'CANCEL':
            data[i].contractStatusChange = '取消'
            break
          case 'TOAUDIT':
            data[i].contractStatusChange = '待审核'
            break
        }
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
        var startTime = new Date(data[i].startTime)
        data[i].startTime = startTime.getFullYear() + '/' + (startTime.getMonth() + 1) + '/' + (startTime.getDate())
        var endTime = new Date(data[i].endTime)
        data[i].endTime = endTime.getFullYear() + '/' + (endTime.getMonth() + 1) + '/' + (endTime.getDate())
        data[i].rental1 = data[i].rental / 1000
        data[i].deposit1 = data[i].deposit / 1000
        if (data[i].rentFreeStart !== null && data[i].rentFreeStart !== '') {
          startTime = new Date(data[i].rentFreeStart)
          data[i].rentFreeStart = startTime.getFullYear() + '/' + (startTime.getMonth() + 1) + '/' + (startTime.getDate())
        }
        if (data[i].rentFreeEnd !== null && data[i].rentFreeEnd !== '') {
          endTime = new Date(data[i].rentFreeEnd)
          data[i].rentFreeEnd = endTime.getFullYear() + '/' + (endTime.getMonth() + 1) + '/' + (endTime.getDate())
        }
      }
      return data
    },
    depositSure (res) {
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
    conList (data) { // 将房东信息从user拎到list表中
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
    searchHouseList (_this, apiUrl, dataList) {
      _this.loading = 0
      _this.$http.post(apiUrl, dataList).then(({data}) => {
        _this.totlePage = 0
        _this.tableData3 = []
        if (data.code === 200) {
          var data1 = data.data.list
          _this.$options.methods.conList(data1)
          _this.$options.methods.conStatus(data1)
          _this.totlePage = data.data.totalCount
          // _this.totleData = data1
          _this.tableData3 = data1
          _this.loading = 1
        } else {
          _this.totlePage = 0
          _this.tableData3 = []
          _this.loading = 1
        }
        console.log(_this.tableData3)
      })
    },
    openUploac (contractId) {
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
    uploadSuccess () {
      // $('.upload').fadeOut()
      this.uploadData.show = false
      this.detailClick++
    },
    openContract (contractId) {
      let _this = this
      // 获取详情数据
      this.$http.get(this.$store.state.contractUrl + 'getContractDetailsById/8a23b9fa7ebd4359b8d58ed0c42353d2', {
      }).then(function (response) {
        var data = response.data
        // this.detailData = data.data
        this.pdfData = data.data
        if (data.code === 200) {
          for (var j = 0; j <= this.pdfData.users.length - 1; j++) {
            if (this.pdfData.users[j].representative === 'PARTA') {
              this.pdfData.userName = this.pdfData.users[j].userName
              this.pdfData.userPhone = this.pdfData.users[j].userPhone
              this.pdfData.bankAccount = this.pdfData.users[j].bankAccount
              this.pdfData.bankName = this.pdfData.users[j].bankName
              this.pdfData.bankOfAccounts = this.pdfData.users[j].bankOfAccounts
              this.pdfData.sex = this.pdfData.users[j].sex
              this.pdfData.certificateNumber = this.pdfData.users[j].certificateNumber
            } else if (this.pdfData.users[j].representative === 'PARTB') {
              this.pdfData.houseKeeperName = this.pdfData.users[j].userName
              this.pdfData.houseKeeperPhone = this.pdfData.users[j].userPhone
            }
          }
          // this.pdfData.sTime =
          let startTime = new Date(this.pdfData.chargLogBeanList[0].startChargTime)
          let yearS = startTime.getFullYear()
          let monthS = (startTime.getMonth() + 1)
          let dayS = startTime.getDate()
          startTime = yearS + '年' + monthS + '月' + dayS + '日'
          let endTime = new Date(this.pdfData.chargLogBeanList[0].endChargTime)
          let yearE = endTime.getFullYear()
          let monthE = endTime.getMonth() + 1
          let dayE = endTime.getDate()
          endTime = yearE + '年' + monthE + '月' + dayE + '日'
          let rentalFreeStart = new Date(this.pdfData.chargLogBeanList[0].rentalFreeStart)
          let yearFS = rentalFreeStart.getFullYear()
          let monthFS = rentalFreeStart.getMonth() + 1
          let dayFS = rentalFreeStart.getDate()
          rentalFreeStart = yearFS + '年' + monthFS + '月' + dayFS + '日'
          let rentalFreeEnd = new Date(this.pdfData.chargLogBeanList[0].rentalFreeEnd)
          let yearFE = rentalFreeEnd.getFullYear()
          let monthFE = rentalFreeEnd.getMonth() + 1
          let dayFE = rentalFreeEnd.getDate()
          rentalFreeEnd = yearFE + '年' + monthFE + '月' + dayFE + '日'
          let dayN
          // 计算免租时长
          if (yearFE > yearFS) {
            monthFE += 12
          }
          console.log('合同开始年：' + yearFS, '合同开始月：' + monthFS, '合同开始日：' + dayFS)
          console.log('免租开始年：' + yearFS, '免租开始月：' + monthFS, '免租开始日：' + dayFS)
          console.log('免租结束年：' + yearFE, '免租结束月：' + monthFE, '免租结束日：' + dayFE)
          if (dayFE < dayFS) {
            monthFE--
          }
          if (monthFS === 1 || monthFS === 3 || monthFS === 5 || monthFS === 7 || monthFS === 8 || monthFS === 10 || monthFS === 12) {
            dayN = 31
          } else if (monthFS === 4 || monthFS === 6 || monthFS === 9 || monthFS === 11) {
            dayN = 30
          } else if ((yearFS % 4 === 0) && (yearFS % 100 !== 0 || yearFS % 400 === 0)) {
            dayN = 29
          } else {
            dayN = 28
          }
          let dayD = dayFE + dayN - dayFS + 1
          let monthD = monthFE - monthFS
          let month1 = monthS + monthD
          if (month1 > 12) {
            let year1 = yearS++
            if (month1 === 1 || month1 === 3 || month1 === 5 || month1 === 7 || month1 === 8 || month1 === 10 || month1 === 12) {
              dayN = 31
            } else if (month1 === 4 || month1 === 6 || month1 === 9 || month1 === 11) {
              dayN = 30
            } else if ((year1 % 4 === 0) && (year1 % 100 !== 0 || year1 % 400 === 0)) {
              dayN = 29
            } else {
              dayN = 28
            }
          }
          // console.log("")
          monthD = monthD + dayD / dayN
          let monthL = 12 - monthD

          let signTime = new Date(this.pdfData.signTime)
          signTime = signTime.getFullYear() + '年' + (signTime.getMonth() + 1) + '月' + signTime.getDate() + '日'
          let payCycle
          if (this.pdfData.chargLogBeanList[0].cycle === 'ONEMON') {
            payCycle = '一个月'
          } else if (this.pdfData.chargLogBeanList[0].cycle === 'THREEMON') {
            payCycle = '三个月'
          } else if (this.pdfData.chargLogBeanList[0].cycle === 'SIXMON') {
            payCycle = '六个月'
          } else if (this.pdfData.chargLogBeanList[0].cycle === 'TWELVEMON') {
            payCycle = '一年'
          } else if (this.pdfData.chargLogBeanList[0].cycle === 'TWOMON') {
            payCycle = '二个月'
          } else if (this.pdfData.chargLogBeanList[0].cycle === 'FOURMON') {
            payCycle = '四个月'
          } else if (this.pdfData.chargLogBeanList[0].cycle === 'ONEPAY') {
            payCycle = '一次付清'
          }
          // console.log(_this.pdfData)
          let req = {}
          req.userName = _this.pdfData.userName
          req.phone = _this.pdfData.userPhone
          req.certificateNumber = _this.pdfData.certificateNumber
          req.houseKeeperPhone = _this.pdfData.houseKeeperPhone
          req.startTime = startTime
          req.endTime = endTime
          req.rentalFreeStart = rentalFreeStart
          req.rentalFreeEnd = rentalFreeEnd
          req.mSRental = _this.pdfData.rental / 1000
          req.mBRental = _this.$options.methods.digitUppercase(_this.pdfData.rental / 1000)
          req.tSRental = _this.pdfData.totalRental / 1000
          req.tBRental = _this.$options.methods.digitUppercase(_this.pdfData.totalRental / 1000)
          req.sDeposit = _this.pdfData.deposit / 1000
          req.bDeposit = _this.$options.methods.digitUppercase(_this.pdfData.deposit / 1000)
          req.payDate = startTime
          req.signTime = signTime
          req.payCycle = payCycle
          req.bankAccount = _this.pdfData.bankAccount
          req.bankName = _this.pdfData.bankName + _this.pdfData.bankOfAccounts + '支行'
          req.sPenalty = _this.pdfData.penalty / 1000
          req.bPenalty = _this.$options.methods.digitUppercase(_this.pdfData.penalty / 1000)
          req.monthL = monthL
          req.monthD = monthD
          _this.$http.post(_this.$store.state.houseUrl + 'get/houseSpaceManager', {'houseSpaceManagerId': '3dce58e7a3e84e579cb9b64c5ea32288'}).then(function (res) {
            console.log(res.body.data)
            req.address = res.body.data.keywordAddressGeographic
            req.area = res.body.data.houseSpaceManagerArea / 1000
            // req.houseOwnershipCertificateNumber = req.body.data.houseOwnershipCertificateNumber
            console.log(req)
          })
          // 填充数据到pdf
          this.$http.post(this.$store.state.pdfUrl + 'pdf/gen', {
            data: req,
            templateFileName: 'trusteeship'
          }).then(function (response) {
            console.log(response.data)
            window.open(this.$store.state.pdfUrl + 'pdf/' + response.data.data.pdfId)
          }, function (response) {
            console.log(response.status)
          })
        }
      }, function (response) {
        console.log(response.status)
      })
    },
    // 将数字转换成大写
    digitUppercase (n) {
      var fraction = ['角', '分']
      var digit = [
        '零', '壹', '贰', '叁', '肆',
        '伍', '陆', '柒', '捌', '玖'
      ]
      var unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
      ]
      var head = n < 0 ? '欠' : ''
      n = Math.abs(n)
      var s = ''
      for (i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
      }
      s = s || '整'
      n = Math.floor(n)
      for (var i = 0; i < unit[0].length && n > 0; i++) {
        var p = ''
        for (var j = 0; j < unit[1].length && n > 0; j++) {
          p = digit[n % 10] + unit[1][j] + p
          n = Math.floor(n / 10)
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
      }
      return head + s.replace(/(零.)*零元/, '元')
        .replace(/(零.)+/g, '零')
        .replace(/^整$/, '零元整')
    }
  },
  created () {
    this.$store.state.houseleftnavnum = '/house/trusteeship'
    this.$store.state.topIndex = '/house/house1'
  }
}

</script>
<style scoped>
@import '../../../../static/css/app.css';
/* 主内容区 */
main .main-right{
  padding: 30px; 
}
.rent1-input{
  width: 25%;
}
.main-right-main{
  margin-top: 30px;
}
.main-right-search-span{
  font-size: 13px;
  margin-bottom: 15px;
}
.main-right-search-span a{
  /*margin-left: 10px;*/
  /*display: inline-block;*/
  height: 36px;
  line-height: 36px;
  cursor: pointer;
}
.el-dialog--small{
  width: 650px!important;
}
.el-pagination{
  text-align: right;
  margin-top: 20px;
}
.upload{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  /*display: none;*/
  z-index: 2000;
  background-color: rgba(0,0,0,.3)
}
.houseManager .conList{
  border: 1px solid #e6e6e6;
  /*margin-top: 20px;*/
   margin-top: -35px; 
}
</style>












