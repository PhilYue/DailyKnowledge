<template>
  <div class="houseManager">
      <!-- 右侧主内容区 -->
      <div class="main-right yxr-ui " >
          <div class='search'>
            <div class='main-right-search-span'>
              <ul>
                <li v-for='(rent, ind) in searchData' class="searchList">
                  <p :value="rent.value">{{ rent.head }}</p>
                  <div v-if="ind === 0" style="display:inline-block"><a v-for='(item, index) in rent.content' :title='item.text' :class='{selectActive: index ==0}' @click="houseSearch1(rent.value, item.value)" :value="item.value">{{item.text}}</a></div>
                  <div v-if="ind !== 0" style="display:inline-block"><a v-for='(item, index) in rent.content' :title='item.text' :class='{selectActive: index ==0}' :value="item.value">{{item.text}}</a></div>
                </li>
              </ul>
            </div>
              <el-input placeholder="请输入房源编号、小区或房东信息" v-model="searchList.houseName" auto-complete="off" style="width:300px" @change="houseSearch" v-on:keyup.enter.native='houseSearch'></el-input>
            <el-button type='primary' @click="houseSearch">搜索</el-button>
        </div>
        <div class="main-right-main">
          <!-- <el-button type="primary" @click="depositAddShow()">新增房源</el-button> -->
          <depositList :listData="tableData2" @renewFormShow="renewFormShow" @listenToParentEvent="editForm" @ending="ending" v-if="totlePage > 0"></depositList>
          <h3 v-if="totlePage === 0" style="text-align:center">暂无数据</h3>
          <div class="block"  v-if="totlePage > 0">
            <el-pagination class="paging" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage2" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="sizes, prev, pager, next, jumper" :total="totlePage"></el-pagination>
          </div>
        </div>
      </div>
      <!-- 托管详情弹窗 -->
      <el-dialog title="托管详情" :visible.sync="dialogFormVisible">
        <depositDetail :editDepositForm="editDepositForm" :contractId="contractId" :renewFormClick="renewFormClick" :formLabelWidth="formLabelWidth" :disabled="disabled" @listenToParentEvent="closeForm" @editForm="editDeposit" @submitForm="submitForm"></depositDetail>
      </el-dialog>
      <!-- 续约合同 -->
      <el-dialog title="续约" :visible.sync="dialogRenewVisible">
        <trusteeshipRenewForm :form="houseChange1" :formLabelWidth="formLabelWidth" @addTrusteeshopSuccess="addTrusteeshopSuccess" @listenToParentEvent="closeTrusteeshipRenewAdd()"></trusteeshipRenewForm>
      </el-dialog>
      <!-- <el-dialog title="新增房源" :visible.sync="dialogAddVisible">
        <depositAdd :formLabelWidth="formLabelWidth" :mix="mix" :disabled="dialogAddVisibledisabled" @listenToParentEvent="closeForm" @depositAdd="depositAdd" @addSuccess="addSuccess"></depositAdd>
      </el-dialog> -->

      <!-- 房源详情开始 -->
      <conDetail :conDetail="conDetailShow" :houseDetailText="'合同详情'" :contractId="contractId" :detailClick="detailClick" @editContract="editContract" @closeDetail="closeForm"></conDetail>
      <!-- 房源详情结束 -->
    </div>
  </div>
</div>
<!-- 寓小二左弹窗结束 -->
  </div>
</template>
<script>
import $ from 'jquery'
import depositDetail from '../../components/depositDetail'  //  托管详情
import houseCard from '../../components/houseCard'  //  房源列表
import depositList from '../../components/depositList'  //  房源列表
import depositEdit from '../../components/depositEdit'  //  托管信息编辑
import trusteeshipRenewForm from '../../components/trusteeshopRenewForm'  // 合同续约
import depositAdd from '../../components/depositAdd'  //  新建托管
import houseSearch from '../../components/houseSearch'  //  顶部搜索
import conDetail from '../../components/conDetail'  //  顶部搜索
var $this = this
export default {
  name: 'rent',
  beforeCreate: function () {
    var apiUrl = this.$store.state.contractUrl + 'list' // 合同列表
    // 搜索小区
    var dataList = {}
    // data.contractType = '1SHIPCONTRACT'
    dataList.contractType = 'DELEGATE'
    dataList.pageNo = 1
    dataList.pageSize = 10
    dataList.loginId = this.$store.state.currentUser.uid
    this.$options.methods.searchHouseList(this, apiUrl, dataList)
  },
  data: function () {
    $this = this
    return {
      currentPage2: 1, // 当前分页
      pageSize: 10, // 当前分页数据量
      totlePage: 0, // 总数据数
      show: true,
      show1: 1,
      int: 0,
      dialogAddVisible: false, // 新增托管显示
      dialogAddVisibledisabled: false,
      searchData: [ // 搜索数据
        {
          head: '托管状态：',
          value: 'contractStatus',
          content: [
            {
              text: '全部',
              value: 'ALL'
            },
            {
              text: '待签订',
              value: 'WAISIGN'
            },
            {
              text: '签订中',
              value: 'SIGNING'
            },
            {
              text: '已签订',
              value: 'ALSIGN'
            },
            {
              text: '已生效',
              value: 'EFFECT'
            },
            {
              text: '已结束',
              value: 'END'
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
        contactStatus: ''
      }, // 搜索列表
      activeName: 'first',
      tableData: [
        {
          name: '王小虎',
          phone: '18868195927',
          region: '北软区域',
          address: '德信东望',
          size: '10平方-15平方',
          houseSpaceManagerType: '一室一厅一卫',
          des: '描述'
        }
      ],
      disabled: true,
      houseChange: {
        houseSpaceManagerId: '',
        area: '',
        blockName: '桂花城',
        detailAddress: '1栋1单元1603',
        trusteeshipStartTime: '2015.1.1', // 托管开始时间
        trusteeshipEndTime: '2019.12.31', // 托管结束时间
        freeStartTime: '2015.1.1', // 免租开始时间
        freeEndTime: '2015.2.1', // 免租结束时间
        remark: '',
        rentalStage: '0', // 租金分阶
        rentalSMoney: '', // 按金额递增
        bedroomNumber: '2', // 卧室
        livingRoomNumber: '2', // 客厅
        kitchNumber: '1', // 厨房
        toiletNumber: '1', // 卫生间
        direction: '2', // 朝向
        buildingNo: '', // 楼号
        unitNo: '', // 单元号
        roomNo: '', // 室号
        contractType: 'DELEGATE', // 合同分类
        cities: [],
        payCycle: '1',
        houseSpaceDescribe: '',
        houseLandlordBeanName: '',
        houseLandlordBeanidentifType: 'ID', // 房东证件类型
        houseLandlordBeanidentif: '', // 房东证件号
        houseLandlordBeanPhone: '', // 房东手机号
        houseLandlordBean: {
          isTrue: true,
          name: '',
          identify: '',
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
      houseChange1: { // 续约
        houseSpaceManagerId: '',
        startTime: '', // 托管开始时间
        endTime: '', // 托管结束时间
        freeStartTime: '', // 免租开始时间
        freeEndTime: '', // 免租结束时间
        payCycle: '1',
        payWay: '1',
        remarks: '',
        deposit: '', // 定金
        rental: '', // 租金
        deposit1: '', // 定金
        rental1: '', // 租金
        addType: '0', // 租金分阶
        addAmount1: '', // 按金额递增
        addPer1: '',
        addAmount: '', // 按金额递增
        addPer: '',
        contractType: 'DELEGATE', // 合同分类
        bankAccount: '',
        bankName: '',
        bankOfAccounts: '',
        cerNum: '',
        cerType: '',
        phoneNum: '',
        sex: 'M',
        userName: ''
      },
      formLabelWidth: '120px',
      dialogFormVisible: false, // 租约详情弹窗
      dialogRenewVisible: false, // 租约续约
      input: '',
      istData: [
        {
          time: '2017-01-06',
          timeName: '上门时间',
          name: '姓名',
          state: '待上门',
          houseName: '房源名称',
          timeTerm: '时间期限',
          phone: '18868195927',
          money: '1600',
          moneyType: '押金'
        },
        {
          time: '2017-01-06',
          timeName: '上门时间',
          name: '姓名',
          state: '已取消',
          houseName: '德信东望·102',
          timeTerm: '时间期限',
          phone: '18868195927',
          money: '1600',
          moneyType: '押金'
        },
        {
          time: '2017-01-06',
          timeName: '上门时间',
          name: '姓名',
          state: '已上门',
          houseName: '德信东望·102德信东望·102',
          timeTerm: '时间期限',
          phone: '18868195927',
          money: '1600',
          moneyType: '租金'
        }
      ],
      tableDataWay: 'house',
      tableData3: [
        [
          {
            businessId: 'hs1234',
            zoneId: '城北',
            area: 80,
            rentalPrice: 2500,
            // houseSpaceManagerType: '三室一厅',
            bedroomNumber: 2, // 卧室
            livingRoomNumber: 2, // 客厅
            // kitchNumber: 1, // 厨房
            // toiletNumber: 1, // 卫生间
            blockName: '桂花城',
            detailAddress: '1栋1单元1603',
            direction: '南',
            decorateType: '精装',
            houseSpaceName: 'A',
            // houseTrusteeshipEndTime: '2020-08-08',
            // address: '杭州市古墩路188号',
            currentStatus: '未租',
            username: '黄xx', // 去潘哥那边拿
            vacancyTime: '' // 空置的天数
          }, {
            businessId: 'hs1234',
            zoneId: '城北',
            area: 80,
            rentalPrice: 2500,
            // houseSpaceManagerType: '三室一厅',
            bedroomNumber: 2, // 卧室
            livingRoomNumber: 2, // 客厅
            // kitchNumber: 1, // 厨房
            // toiletNumber: 1, // 卫生间
            blockName: '桂花城',
            detailAddress: '1栋1单元1603',
            direction: '南',
            decorateType: '精装',
            houseSpaceName: 'B',
            // houseTrusteeshipEndTime: '2020-08-08',
            // address: '杭州市古墩路188号',
            currentStatus: '未租',
            username: '黄xx', // 去潘哥那边拿
            vacancyTime: '' // 空置的天数
          }
        ],
        [
          {
            businessId: 'hs1234',
            zoneId: '城北',
            area: 80,
            rentalPrice: 2500,
            // houseSpaceManagerType: '三室一厅',
            bedroomNumber: 2, // 卧室
            livingRoomNumber: 2, // 客厅
            // kitchNumber: 1, // 厨房
            // toiletNumber: 1, // 卫生间
            blockName: '德信东望',
            detailAddress: '1栋1单元1603',
            direction: '南',
            decorateType: '精装',
            houseSpaceName: 'A',
            // houseTrusteeshipEndTime: '2020-08-08',
            // address: '杭州市古墩路188号',
            currentStatus: '未租',
            username: '黄xx', // 去潘哥那边拿
            vacancyTime: '' // 空置的天数
          }, {
            businessId: 'hs1234',
            zoneId: '城北',
            area: 80,
            rentalPrice: 2500,
            // houseSpaceManagerType: '三室一厅',
            bedroomNumber: 2, // 卧室
            livingRoomNumber: 2, // 客厅
            // kitchNumber: 1, // 厨房
            // toiletNumber: 1, // 卫生间
            blockName: '德信东望',
            detailAddress: '1栋1单元1603',
            direction: '南',
            decorateType: '精装',
            houseSpaceName: 'B',
            // houseTrusteeshipEndTime: '2020-08-08',
            // address: '杭州市古墩路188号',
            currentStatus: '未租',
            username: '黄xx', // 去潘哥那边拿
            vacancyTime: '' // 空置的天数
          }
        ]
      ],
      tableData2: [], // 显示的列表数据
      totleData: [], // 所有数据
      tableData4: [ // 测算流程需要输入的信息
        {
          department: '设计部',
          information: [
            {
              type: 'input', // 填写类型  输入框
              label: '房源面积', // 填写的名称
              model: 'size',
              value: ''
            },
            {
              type: 'select',
              value: '2',
              label: '朝向',
              option: [ // select下拉框的内容及value
                {
                  label: '东', // 内容
                  value: '1'  // value
                },
                {
                  label: '南', // 内容
                  value: '2'  // value
                }
              ]
            },
            {
              type: 'checkbox', // 复选框
              value: ['WIFI', '朝南', '停车位'], // 默认选选中多选框内容
              label: '特色',
              option: ['WIFI', '朝南', '停车位', '双阳台'] // 所有的多选框内容
            },
            {
              type: 'radio', // 单选框
              value: '1', // 默认选选中多选框内容
              label: '床铺大小',
              option: [
                {
                  value: '1',
                  label: '1.2m'
                },
                {
                  value: '2',
                  label: '1.5m'
                },
                {
                  value: '3',
                  label: '1.8m'
                }
              ] // 所有的多选框内容
            }
          ]
        },
        {
          department: '投资部',
          information: [
            {
              type: 'input', // 填写类型  输入框
              label: '房源面积', // 填写的名称
              model: 'size',
              value: ''
            },
            {
              type: 'select',
              value: '2',
              label: '朝向',
              option: [ // select下拉框的内容及value
                {
                  label: '东', // 内容
                  value: '1'  // value
                },
                {
                  label: '南', // 内容
                  value: '2'  // value
                }
              ]
            },
            {
              type: 'checkbox', // 复选框
              value: ['WIFI', '朝南', '停车位'], // 默认选选中多选框内容
              label: '特色',
              option: ['WIFI', '朝南', '停车位', '双阳台'] // 所有的多选框内容
            },
            {
              type: 'radio', // 单选框
              value: '1', // 默认选选中多选框内容
              label: '床铺大小',
              option: [
                {
                  value: '1',
                  label: '1.2m'
                },
                {
                  value: '2',
                  label: '1.5m'
                },
                {
                  value: '3',
                  label: '1.8m'
                }
              ] // 所有的多选框内容
            }
          ]
        }
      ],
      showData: { // 测算流程已填写的内容
        size: '80',
        direction: '1',
        cities: ''
      },
      conDetailShow: false,
      contractId: '',
      detailClick: 0,
      renewFormClick: 0,
      editDepositForm: false,
      mix: {
        userUrl: this.$store.state.accountUrl + 'user/list', // 查询用户列表
        landlordID: this.$store.state.accountUrl + 'user/info/cert', // 身份证信息
        userSignUrl: this.$store.state.accountUrl + 'user/info/signin', // 查询用户信息
        ending: this.$store.state.contractUrl + 'update/', // 提前终止
        apiUrl: this.$store.state.contractUrl + 'list', // 合同列表
        userId: this.$store.state.accountUrl + 'user/info/cert/', // 根据ID搜索身份证号
        updateCon: this.$store.state.contractUrl + 'updateContent', // 更新合同
        depositAddUrl: this.$store.state.houseUrl + 'add' // 新增托管
      }
    }
  },
  mounted: function () {
    if ($this.int === 0) {
      $('body').click(function (event) {
        var _target = event.target
        if (_target.closest('.el-dropdown-menu') === null && _target.closest('.houseDetail .dialog') === null && _target.closest('.el-dialog') === null && $this.conDetailShow === true) {
          $this.conDetailShow = false
          $this.detailClick++
        }
      })
      $this.int = 0
    }
  },
  components: {
    houseCard, depositList, depositEdit, depositDetail, trusteeshipRenewForm, houseSearch, depositAdd, conDetail
  },
  created () {
    this.$store.state.houseleftnavnum = '/house/deposit'
    this.$store.state.topIndex = '/house/house1'
  },
  methods: {
    closePanel () {
      $('#left-panel-type-house-info').fadeOut(250)
    },
    depositAddShow () { // 打开新增托管弹窗
      this.dialogAddVisible = true
    },
    addSuccess () { // 房源添加成功
      this.dialogAddVisible = false
      this.$options.methods.getHouseList(this, this.mix.houseResourcesUrl)
    },
    rowClick () {
      $('#left-panel-type-house-info').fadeIn(250)
    },
    editForm (data) { // 打开详情
      this.conDetailShow = true
      this.detailClick++
      this.contractId = data.id
    },
    renewFormShow (data) {
      this.houseChange1 = data
      this.houseChange1.startTime = ''
      this.houseChange1.endTime = ''
      this.houseChange1.rental = ''
      this.houseChange1.deposit = ''
      this.houseChange1.rental1 = ''
      this.houseChange1.deposit1 = ''
      this.houseChange1.payWay = '1'
      this.houseChange1.payCycle = '1'
      this.houseChange1.addType = '0'
      this.dialogRenewVisible = true
    },
    closeTrusteeshipRenewAdd () {
      this.dialogRenewVisible = false
    },
    closeForm () { // 关闭详情弹窗
      this.dialogFormVisible = false
      this.dialogAddVisible = false
      this.editDepositForm = false
      this.disabled = true
      this.conDetailShow = false
      this.detailClick++
      this.searchList.loginId = this.$store.state.currentUser.uid
      this.searchList.contractType = 'DELEGATE'
      this.$options.methods.searchHouseList(this, this.mix.apiUrl, this.searchList)
    },
    editDeposit () { // 修改合同
      this.editDepositForm = true
      this.disabled = false
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
    pageData (data, pageSize, current) { // 分页
      var tableData = []
      for (var i = ((current - 1) * pageSize); i < (current * pageSize) && i < data.length; i++) {
        tableData.push(data[i])
      }
      return tableData
    },
    handleSizeChange (data) { // 分页数改变时触发
      this.pageSize = data
      this.searchList.pageSize = this.pageSize
      this.searchList.pageNo = this.currentPage2
      this.searchList.loginId = this.$store.state.currentUser.uid
      this.searchList.contractType = 'DELEGATE'
      this.$options.methods.searchHouseList(this, this.mix.apiUrl, this.searchList)
    },
    handleCurrentChange (data) { // 当前页改变时触发
      this.currentPage2 = data
      this.searchList.pageSize = this.pageSize
      this.searchList.pageNo = this.currentPage2
      this.searchList.loginId = this.$store.state.currentUser.uid
      this.searchList.contractType = 'DELEGATE'
      this.$options.methods.searchHouseList(this, this.mix.apiUrl, this.searchList)
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
            data[i].contractStatusChange = '已签订'
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
        data[i].startTime = startTime.getFullYear() + '-' + (startTime.getMonth() + 1) + '-' + (startTime.getDate())
        var endTime = new Date(data[i].endTime)
        data[i].endTime = endTime.getFullYear() + '-' + (endTime.getMonth() + 1) + '-' + (endTime.getDate())
        data[i].rental1 = data[i].rental / 1000
        data[i].deposit1 = data[i].deposit / 1000
        if (data[i].rentFreeStart !== null && data[i].rentFreeStart !== '') {
          startTime = new Date(data[i].rentFreeStart)
          data[i].rentFreeStart = startTime.getFullYear() + '-' + (startTime.getMonth() + 1) + '-' + (startTime.getDate())
        }
        if (data[i].rentFreeEnd !== null && data[i].rentFreeEnd !== '') {
          endTime = new Date(data[i].rentFreeEnd)
          data[i].rentFreeEnd = endTime.getFullYear() + '-' + (endTime.getMonth() + 1) + '-' + (endTime.getDate())
        }
      }
      return data
    },
    ending (data) { // 提前终止
      var api = this.mix.ending + data.id + '/ALEND'

      this.$confirm('此操作将提前终止该合同, 是否继续?', '提示', {
        confirmButtonText: '确定提前终止',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.get(api).then(({data}) => {
          if (data.code === 200) {
            this.$message({
              message: '提前终止成功',
              type: 'success'
            })
            this.searchList.loginId = this.$store.state.currentUser.uid
            this.searchList.contractType = 'DELEGATE'
            this.$options.methods.searchHouseList(this, this.mix.apiUrl, this.searchList)
            this.$emit('addTrusteeshopSuccess', false)
          } else {
            this.$message({
              message: data.message,
              type: 'error'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    addTrusteeshopSuccess () { // 续约成功后修改房源类型
      this.dialogRenewVisible = false
      this.searchList.loginId = this.$store.state.currentUser.uid
      this.searchList.contractType = 'DELEGATE'
      this.$options.methods.searchHouseList(this, this.mix.apiUrl, this.searchList)
    },
    houseSearch1 (ind, index) { // 修改后搜索的搜索，不支持搜索框
      // var data = {}
      if (index === 'ALL') {
        index = null
      }
      this.searchList[ind] = index
      this.searchList.conType = '1'
      this.searchList.pageSize = this.pageSize
      this.searchList.pageNo = this.currentPage2
      this.searchList.loginId = this.$store.state.currentUser.uid
      this.searchList.contractType = 'DELEGATE'
      this.$options.methods.searchHouseList(this, this.mix.apiUrl, this.searchList) // 根据查询信息查询房源列表
    },
    houseSearch () { // 修改后搜索的搜索，不支持搜索框
      this.searchList.conType = '1'
      this.searchList.pageSize = this.pageSize
      this.searchList.pageNo = this.currentPage2
      this.searchList.loginId = this.$store.state.currentUser.uid
      this.searchList.contractType = 'DELEGATE'
      this.$options.methods.searchHouseList(this, this.mix.apiUrl, this.searchList) // 根据查询信息查询房源列表
    },
    submitForm (data) {
      this.dialogFormVisible = false
      this.editDepositForm = false
      this.searchList.contractType = 'DELEGATE'
      this.$options.methods.searchHouseList(this, this.mix.apiUrl, this.searchList)
    },
    conList (data) { // 将房东信息从user拎到list表中
      for (var p in data) {
        if (data[p].users !== '' && data[p].users !== null) {
          for (var i in data[p].users) {
            if (data[p].users[i].representative === 'PARTB') {
              data[p].username = data[p].users[i].userName
              data[p].userName = data[p].users[i].userName
              data[p].phoneNum = data[p].users[i].userPhone
              data[p].cerType = ''
              data[p].cerType = data[p].users[i].cerType
              data[p].c = data[p].users[i].cerType
              data[p].cerNum = data[p].users[i].cerNum
              data[p].userId = data[p].users[i].id
              data[p].conId = data[p].users[i].conId
              data[p].bankAccount = data[p].users[i].bankAccount
              data[p].bankName = data[p].users[i].bankName
              data[p].bankOfAccounts = data[p].users[i].bankOfAccounts
              data[p].certificateType = data[p].users[i].certificateType
              data[p].cerType = data[p].users[i].certificateType
              data[p].conType = '1'
              data[p].signType = 'RENEWAL'
            }
          }
          data[p].cerType = data[p].c
        }
      }
      console.log(data)
      return data
    },
    searchHouseList (_this, apiUrl, dataList) {
      _this.$http.post(apiUrl, dataList).then(({data}) => {
        var data2 = data.data
        if (data2 === '' || data2 === null) {
          _this.totlePage = 0
          _this.totleData = []
          _this.tableData2 = []
        } else {
          var data1 = data.data.list
          _this.$options.methods.payment(data1) // 转换支付方式
          _this.$options.methods.conStatus(data1) // 转换合同状态以及合同生效时间以及结束时间
          _this.totlePage = data2.totalCount
          data1 = _this.$options.methods.conList(data1)
          _this.tableData2 = _this.$options.methods.conList(data1)
        }
      })
    },
    editContract (contractId) {
      this.contractId = contractId
      this.dialogFormVisible = true
      this.renewFormClick++
    }
  }
}
$('.el-dialog--small').width(650)
</script>
<style scoped>
@import '../../../static/css/app.css';
/* 主内容区 */
main .main-right{
  padding: 30px; 
}
.rent1-input{
  width: 40%;
}
.main-right-main{
  margin-top: 30px;
}
.el-pagination{
  margin-top: 20px;
  text-align: center
}
</style>
















