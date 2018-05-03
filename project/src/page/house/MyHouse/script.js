import $ from 'jquery'
import houseCard from '../../../components/houseCard'  //  合租房源列表
import houseCard1 from '../../../components/houseCard1'  //  集中式房源列表
import houseCard2 from '../../../components/houseCard2'  //  整租房源列表
import houseCardList from '../../../components/houseCardList'  //  房源卡片
import houseEdit from '../../../components/houseEdit'  //  编辑房源
import depositEdit from '../../../components/depositEdit'  //  托管信息编辑
import houseDetail from '../../../components/houseDetail'  //  提示弹窗
import userDetail from '../../../components/userDetail'  //  提示弹窗
import rentalDetail from '../../../components/rentalDetail'  //  提示弹窗
import goodAdd from '../../../components/goodAdd'  //  物品新增
import reduceGood from '../../../components/reduceGood'  //  物品新增
import conDetail from '../../../components/conDetail'  //  顶部搜索
import contractForm from '../../../components/contractForm'
import upload from '../../../components/upload' // 上传附件
import housePassword from '../../../components/housePassword' // 上传附件
import contractDetail from '../../../components/contractDetail' // 租客合同详情
import areaSelect from '../../../components/areaSelect'  // 公共片区筛选组件

import TagPinner from './TagPinner'
import JointRent from './components/JointRent/'
import { urlList } from '@/xhr'

var $this = this
export default {
  components: {
    houseCard,
    houseCardList,
    houseDetail,
    depositEdit,
    houseCard1,
    houseCard2,
    houseEdit,
    userDetail,
    rentalDetail,
    goodAdd,
    reduceGood,
    conDetail,
    contractForm,
    upload,
    housePassword,
    contractDetail,
    areaSelect,
    TagPinner,
    JointRent
  },

  data: function () {
    $this = this
    return {
      mix: {
        houseResourcesUrl: this.$store.state.houseUrl + 'list/block', // 房源列表
        houseResourceslist: this.$store.state.houseUrl + 'list/houseSpaceInHouseSpaceManager', // 房源列表
        houseDetailUrl: this.$store.state.houseUrl + 'get', // 根据房源ID查询详细信息
        transformUrl: this.$store.state.houseUrl + 'transform', // 分拆合并
        houseUpdate: this.$store.state.houseUrl + 'update/houseSpace', // 房源修改
        unitUrl: this.$store.state.accountUrl + 'unit/child/', // 根据组织Id查询子组织
        unitInfo: this.$store.state.accountUrl + 'unit/info/', // 根据组织Id查询子组织
        otherStatus: this.$store.state.houseUrl + 'count/OtherStatus', // 统计各种的状态的房源的数量
        userRole: this.$store.state.accountUrl + 'role/list/u/' // 根据用户id查询角色列表
      },
      rentType: '',
      loading: 0,
      loading1: 0,
      currentPage2: 1, // 当前分页
      pageSize: 10, // 当前分页数据量
      totlePage: 0, // 总数据数
      houseCurrentPage: 1, // 整租分页
      housePageSize: 10, // 整租每页数
      housePage: 0, // 整租总条数
      housePage1: 0, // 整租总条数
      centralized: { // 集中式整租数据
        totleSize: 0,
        currentPage: 1,
        pageSize: 10,
        hasData: true
      },
      houseChange: {
        businessId: '',
        area: '',
        detailAddress: '1栋1单元1603',
        bedroomNumber: '2', // 卧室
        livingRoomNumber: '2', // 客厅
        kitchNumber: '1', // 厨房
        toiletNumber: '1', // 卫生间
        direction: '2', // 朝向
        blockName: '桂花城',
        buildingNo: '', // 楼号
        unitNo: '', // 单元号
        roomNo: '', // 室号
        cities: [],
        houseSpaceDescribe: '',
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
      show: { // 控制房源详情显示与否
        show: false
      },
      contractForm: {
        show: false
      },
      contractFormData: {
        name: '',
        phone: '',
        cardId: '',
        sex: '男',
        houseSpaceType: '',
        houseSpaceName: '',
        startTime: '',
        endTime: '',
        rentType1: '',
        rentType2: '',
        rentMoney: '',
        deposit: '',
        penalty: '',
        people: [localStorage.getItem('role'), this.$store.state.currentUser.username],
        signTime: '',
        houseKeeperName: '',
        cphone: '',
        otherMoney: '',
        signType: 'NEW',
        addType: 'NOTRISE',
        houseSpaceNameS: true,
        houseRentTypeS: true,
        title: '新增租客合同',
        processKey: 'PROCESS-KEY-RENT-V11',
        storageType: 'PAPER'
      },
      contractFormData1: {},
      userDetailShow: false, // 控制用户详情展示
      rentalDetailShow: false, // 控制财务详情展示
      zIndex: 0,
      houseDetail: [], // 控制房源详情里的展示信息
      dialogFormVisible: false, // 控制修改及新建房源弹窗显示与否
      dialogVisible: false, // 控制提示弹窗显示与否
      dialogEditVisible: false,
      houseEditVisible: false, // 控制编辑弹窗显示
      houseText: '', // 控制提示弹窗的内容
      houseDetailShow: false,  // 控制房源详情显示与否
      houseButtonShow: true, // 控制两个button显示
      formLabelWidth: '120px',
      activeName: 'first',
      flatShareData: [], // 合租数据
      totleflatShareData: [ // 所有的合租数据
      ],
      entireRentData: [ // 整租数据
      ],
      entireRentDetail: [], // 整租详情
      centralizedRentData: [],
      tableDataWay: 'house1',
      tableData4: [], // 测算流程需要输入的信息
      houseId: '',
      detailHouseId: '', // 查看房源详情
      showData: { // 测算流程已填写的内容
        size: '80',
        direction: '1',
        cities: ''
      },
      searchData: { // 搜索数据
        houseStatus: '',
        zoneLists: [],
        zoneChildren: []
      },
      activeName2: 'first',
      searchList: {
        houseSpaceStatus: null,
        keywordAddress: '',
        houseSpaceManagerType: 'HOUSE',
        houseSpaceProcess: 'RENTABLE_PROCESS'
      }, // 搜索信息
      searchList1: {
        houseSpaceStatus: null,
        keywordAddress: '',
        houseSpaceManagerType: 'HOUSE',
        houseSpaceProcess: 'RENTABLE_PROCESS'
      },
      searchList2: {
        houseSpaceStatus: null,
        keywordAddress: '',
        // houseSpaceManagerType: 'HOUSE',
        houseSpaceProcess: 'RENTABLE_PROCESS'
      },
      elTabPane: 0, // 0表示合租 1表示整租 2表示集中式 用于判断点击隐藏
      int: 0,
      goodFormShow: false, //
      addHouseId: '',
      clickCount: 0,
      detailShowPage: 'house',
      goodClickCount: 0,
      goodRFormShow: false, // 控制新增物品弹窗的开关
      reduceCount: 0,
      detailHouseType: '', // 出租类型
      personId: '',
      perclick: 0,
      conDetailShow: false,
      rentContractDetailShow: {
        show: false
      },
      contratId: '',
      detailClick: 0,
      editClick: 0,
      houseClick: 0,
      urlLists: { // 返回链接列表
        houseSpaceId: '',
        addrList: []
      },
      uploadData: {
        show: false
      },
      otherHouseSpaceStatus: null, // 穿透
      houseSpaceStatus: {
        DJoinType: null, // 合租状态
        DEntryType: null, // 整租状态
        CEntryType: null // 集中式整租状态
      }, // 穿透
      statusCount: {
        allNumber: 0,
        expiredNextMonthNumber: 0,
        expiredThisMonthNumber: 0,
        leaseContractNotTakeEffectNumber: 0,
        lockingNumber: 0,
        overdueCheckOutNumber: 0,
        rentableNumber: 0,
        rentedNumber: 0,
        reservedNumber: 0,
        signingLeaseContractNumber: 0
      },
      userRole: [200, 200], // 当前登录角色 0位置判断当前部门，0表示运营部，1表示销售部，2表示管家； 1位置表职位，0表示经理， 1表示主管，2表示专员
      pwData: {},
      pwShow: false,
      uploadName: {
        title: '附件上传',
        btnName: '附件'
      },
      areaData: [],
      zoneId: '',

      tabId: 'ENTIRE_RENT', // JOINT_RENT
    }
  },

  mounted0: function () {
    if ($this.int === 0) {
      $('body').click(function (event) {
        var _target = event.target
        if (_target.closest('.el-message-box__wrapper') === null && _target.closest('.houseRoomList') === null && _target.closest('.houseDetail .dialog') === null && _target.closest('.el-dialog') === null && ($this.houseDetailShow === true || $this.userDetailShow === true)) {
          $this.houseDetailShow = false
          $this.userDetailShow = false
          $this.rentalDetailShow = false
          $this.conDetailShow = false
          $this.pwShow = false
          $this.rentContractDetailShow.show = false
          $this.clickCount++
          $this.detailClick++
          $this.perclick++
          $this.detailShowPage = 'house'
        }
      })
      $this.int = 0
      $('.newStatus').click(function (event) {
        let status = ''
        let label = ''
        // 选中的部分添加cur样式
        let currentTarget = event.currentTarget

        if (!$(currentTarget).hasClass('cur')) {
          if ($this.elTabPane === 0) {
            $('.el-tab-pane:eq(0) .newStatus').removeClass('cur')
          } else if ($this.elTabPane === 1) {
            $('.el-tab-pane:eq(1) .newStatus').removeClass('cur')
          } else if ($this.elTabPane === 2) {
            $('.el-tab-pane:eq(2) .newStatus').removeClass('cur')
          }
          // currentTarget.className = 'newStatus cur'
          $(currentTarget).addClass('cur')

          if (currentTarget.localName === 'a') {
            // console.log(event)
            status = currentTarget.id
          }
          if (currentTarget.localName === 'p') {
            status = currentTarget.id
          }
          if (currentTarget.localName === 'li') {
            status = currentTarget.id
            label = currentTarget.textContent
            currentTarget.parentElement.previousElementSibling.previousElementSibling.className = 'newStatus cur'
            currentTarget.parentElement.previousElementSibling.previousElementSibling.id = status
            currentTarget.parentElement.previousElementSibling.previousElementSibling.innerText = label
          }
        }
        if (status === 'null' || status === '') {
          status = null
        }
        $this.otherHouseSpaceStatus = status
        if ($this.elTabPane === 0) {
          $this.houseSpaceStatus.DJoinType = status
          let dataList = {}
          dataList.originalRentType = 'JOINT_RENT'
          dataList.houseSpaceProcess = 'RENTABLE_PROCESS'
          dataList.propertyType = 'D'
          $this.currentPage2 = 1
          $this.pageSize = 10
          dataList.pageNo = $this.currentPage2
          dataList.pageSize = $this.pageSize
          dataList.otherHouseSpaceStatus = $this.otherHouseSpaceStatus
          $this.houseClick++
          $this.$options.methods.roomSearch($this, $this.mix.houseResourceslist, dataList)
        } else if ($this.elTabPane === 1) {
          $this.houseSpaceStatus.DEntryType = status
          let dataList = {}
          dataList.originalRentType = 'ENTIRE_RENT'
          dataList.houseSpaceProcess = 'RENTABLE_PROCESS'
          dataList.propertyType = 'D'
          $this.houseCurrentPage = 1
          $this.housePageSize = 10
          dataList.pageNo = $this.houseCurrentPage
          dataList.pageSize = $this.housePageSize
          dataList.otherHouseSpaceStatus = status
          $this.houseClick++
          $this.$options.methods.houseSearch2($this, $this.mix.houseResourcesUrl, dataList)
        } else {
          $this.houseSpaceStatus.CEntryType = status
          let dataList = {}
          dataList.originalRentType = 'ENTIRE_RENT'
          dataList.propertyType = 'C'
          $this.centralized.currentPage = 1
          $this.centralized.pageSize = 10
          dataList.pageNo = $this.centralized.currentPage
          dataList.pageSize = $this.centralized.pageSize
          dataList.otherHouseSpaceStatus = status
          $this.houseClick++
          $this.$options.methods.houseSearch3($this, $this.mix.houseResourcesUrl, dataList)
        }
      })
    }
  },
  methods: {
    // 展开合租房间详情
    handleExpandJointRent(houseSpaceId) {
      this.userDetailShow = false
      this.rentalDetailShow = false
      this.conDetailShow = false
      this.clickCount++
      this.detailClick++
      this.perclick++
      this.houseDetailShow = true
      this.detailShowPage = 'house'
      this.detailHouseType = 'JOINT_RENT'
      this.clickCount++
      this.detailHouseId = houseSpaceId
      this.rentType = 'join'
    },
    handleChange(id) {
      console.log(id)
      let queryParams = {
        loginId: this.$store.state.currentUser.uid,
        originalRentType: 'JOINT_RENT',
        houseSpaceProcess: 'RENTABLE_PROCESS',
        propertyType: 'D',
        pageNo: 1,
        pageSize: 10,
        otherHouseSpaceStatus: this.otherHouseSpaceStatus
      }
      // this.$options.methods.roomSearch($this, $this.mix.houseResourceslist, queryParams)

      this.$http.post(`${urlList.house}/list/houseSpaceInHouseSpaceManager`,
        JSON.stringify(queryParams)
      )
        .then(res => {
          console.log(400, res)
        })
    },
    entireRentTile (data) { // 整租房源平铺，即将部分重要信息从roomList中提取到父对象
      var data1 = data.resHouseSpaceBeanList[0]
      data.businessId = data1.businessId
      data.houseSpaceStatus = data1.houseSpaceStatus
      data.direction = data1.direction
      data.direction1 = data1.direction1
      data.keywordAddress = data1.keywordAddress
      data.rentalPrice1 = data.resHouseSpaceBeanList[0].rentalPrice
      // console.log(data)
    },
    intoString: function (obj) { // 将对象中的int类型转换为string类型
      for (var p in obj) {
        if (obj[p] !== '' && obj[p] !== null && typeof (obj[p]) === 'number') {
          obj[p] = obj[p].toString()
        }
      }
      return obj
    },
    submitEdit () {
      if (this.elTabPane === 0) {
        let dataList = {}
        dataList.originalRentType = 'JOINT_RENT'
        dataList.houseSpaceProcess = 'RENTABLE_PROCESS'
        dataList.propertyType = 'D'
        dataList.pageNo = this.currentPage2
        dataList.pageSize = this.pageSize
        this.houseClick++
        this.$options.methods.roomSearch(this, this.mix.houseResourceslist, dataList)
        let dataList1 = {}
        dataList1.houseSpaceManagerType = 'HOUSE'
        dataList1.houseSpaceProcess = 'RENTABLE_PROCESS'
        dataList1.propertyType = 'D'
        dataList1.originalRentType = 'JOINT_RENT'
        dataList1.loginId = this.$store.state.currentUser.uid
        this.$options.methods.otherStatus(this, this.mix.otherStatus, dataList1)
      } else if (this.elTabPane === 1) {
        let dataList = {}
        dataList.originalRentType = 'ENTIRE_RENT'
        dataList.houseSpaceProcess = 'RENTABLE_PROCESS'
        dataList.propertyType = 'D'
        this.houseCurrentPage = 1
        this.housePageSize = 10
        dataList.pageNo = this.houseCurrentPage
        dataList.pageSize = this.housePageSize
        this.houseClick++
        this.$options.methods.houseSearch2(this, this.mix.houseResourcesUrl, dataList)
        let dataList1 = {}
        dataList1.houseSpaceManagerType = 'HOUSE'
        dataList1.houseSpaceProcess = 'RENTABLE_PROCESS'
        dataList1.propertyType = 'D'
        dataList1.originalRentType = 'ENTIRE_RENT'
        dataList1.loginId = this.$store.state.currentUser.uid
        this.$options.methods.otherStatus(this, this.mix.otherStatus, dataList1)
      } else {
        let dataList = {}
        dataList.originalRentType = 'ENTIRE_RENT'
        dataList.propertyType = 'C'
        this.centralized.currentPage = 1
        this.centralized.pageSize = 10
        dataList.pageNo = this.centralized.currentPage
        dataList.pageSize = this.centralized.pageSize
        this.houseClick++
        this.$options.methods.houseSearch3(this, this.mix.houseResourcesUrl, dataList)
        let dataList1 = {}
        dataList1.houseSpaceManagerType = 'HOUSE'
        dataList1.houseSpaceProcess = 'RENTABLE_PROCESS'
        dataList1.propertyType = 'C'
        dataList1.loginId = this.$store.state.currentUser.uid
        this.$options.methods.otherStatus(this, this.mix.otherStatus, dataList1)
      }
      this.houseEditVisible = false
    },
    entireRentSummation (data) { // 累加整租空置数量
      var count = 0
      // data.showList = false
      for (var i = 0; i < data.resHouseSpaceManagerBeanList.length; i++) {
        // if (data.resHouseSpaceManagerBeanList[i].rentableHouseSpaceNumber !== '') {
        //   count += parseInt(data.resHouseSpaceManagerBeanList[i].rentableHouseSpaceNumber)
        // }
        data.resHouseSpaceManagerBeanList[i].houseSpaceArea1 = data.resHouseSpaceManagerBeanList[i].resHouseSpaceBeanList[0].houseSpaceArea / 1000
        if (data.resHouseSpaceManagerBeanList[i].resHouseSpaceBeanList[0].rentalPrice) {
          data.resHouseSpaceManagerBeanList[i].rentalPrice1 = data.resHouseSpaceManagerBeanList[i].resHouseSpaceBeanList[0].rentalPrice / 1000
        } else {
          data.resHouseSpaceManagerBeanList[i].rentalPrice1 = null
        }
        switch (data.resHouseSpaceManagerBeanList[i].resHouseSpaceBeanList[0].houseSpaceStatus) {
          case 'WAIT_DELEGATE':
            data.resHouseSpaceManagerBeanList[i].houseSpaceStatus1 = '待托管'
            break
          case 'ASSESSING':
            data.resHouseSpaceManagerBeanList[i].houseSpaceStatus1 = '评估中'
            break
          case 'APPROVED':
            data.resHouseSpaceManagerBeanList[i].houseSpaceStatus1 = '审核通过'
            break
          case 'SIGNING_DC':
            data.resHouseSpaceManagerBeanList[i].houseSpaceStatus1 = '签订托管合同中'
            break
          case 'DC_NOT_TE':
            data.resHouseSpaceManagerBeanList[i].houseSpaceStatus1 = '托管合同未生效'
            break
          case 'DC_TE':
            data.resHouseSpaceManagerBeanList[i].houseSpaceStatus1 = '托管合同已生效'
            break
          case 'DESIGNING':
            data.resHouseSpaceManagerBeanList[i].houseSpaceStatus1 = '设计中'
            break
          case 'CONSTRUCTING':
            data.resHouseSpaceManagerBeanList[i].houseSpaceStatus1 = '施工中'
            break
          case 'CHECKING':
            data.resHouseSpaceManagerBeanList[i].houseSpaceStatus1 = '验收中'
            break
          case 'RETAIN':
            data.resHouseSpaceManagerBeanList[i].houseSpaceStatus1 = '保留'
            break
          case 'RENTABLE':
            data.resHouseSpaceManagerBeanList[i].houseSpaceStatus1 = '空置'
            break
          case 'RESERVED':
            data.resHouseSpaceManagerBeanList[i].houseSpaceStatus1 = '已预定'
            break
          case 'SIGNING_LC':
            data.resHouseSpaceManagerBeanList[i].houseSpaceStatus1 = '签订合同中'
            break
          case 'LC_NOT_TE':
            data.resHouseSpaceManagerBeanList[i].houseSpaceStatus1 = '合同未生效'
            break
          case 'RENTED':
            data.resHouseSpaceManagerBeanList[i].houseSpaceStatus1 = '已出租'
            break
          case 'FREEZING':
            data.resHouseSpaceManagerBeanList[i].houseSpaceStatus1 = '已冻结'
            break
          case 'DELETED':
            data.resHouseSpaceManagerBeanList[i].houseSpaceStatus1 = '已删除'
            break
        }
        // 转换装修类型
        switch (data.resHouseSpaceManagerBeanList[i].decorateType) {
          case 'R':
            data.resHouseSpaceManagerBeanList[i].decorateType1 = '毛坯房'
            break
          case 'S':
            data.resHouseSpaceManagerBeanList[i].decorateType1 = '简装'
            break
          case 'RD':
            data.resHouseSpaceManagerBeanList[i].decorateType1 = '精装'
            break
          case 'A':
            data.resHouseSpaceManagerBeanList[i].decorateType1 = '豪华装修'
            break
          case '':
            data.resHouseSpaceManagerBeanList[i].decorateType1 = ''
            break
        }
        // 转换朝向
        switch (data.resHouseSpaceManagerBeanList[i].resHouseSpaceBeanList[0].direction) {
          case 'EAST':
            data.resHouseSpaceManagerBeanList[i].direction = '东'
            break
          case 'SOUTH':
            data.resHouseSpaceManagerBeanList[i].direction = '南'
            break
          case 'WEST':
            data.resHouseSpaceManagerBeanList[i].direction = '西'
            break
          case 'NORTH':
            data.resHouseSpaceManagerBeanList[i].direction = '北'
            break
          case 'SOUTHEAST':
            data.resHouseSpaceManagerBeanList[i].direction = '东南'
            break
          case 'NORTHEAST':
            data.resHouseSpaceManagerBeanList[i].direction = '东北'
            break
          case 'SOUTHWEST':
            data.resHouseSpaceManagerBeanList[i].direction = '西南'
            break
          case 'NORTHWEST':
            data.resHouseSpaceManagerBeanList[i].direction = '西北'
            break
        }
      }
      data.rentalCount = count
      return data
    },
    handleClick (tab, event) { // 切换出租方式
      if (tab.name === 'first') {
        // 合租数据
        this.elTabPane = 0
        let dataList = {}
        dataList.houseSpaceManagerType = 'HOUSE'
        dataList.houseSpaceProcess = 'RENTABLE_PROCESS'
        dataList.originalRentType = 'JOINT_RENT'
        dataList.propertyType = 'D'
        this.currentPage2 = 1
        dataList.pageNo = this.currentPage2
        dataList.pageSize = this.pageSize
        // dataList.zoneId = this.searchData.zoneLists[this.searchData.zoneLists.length - 1].id
        dataList.zoneId = this.zoneId
        this.houseClick++
        this.$options.methods.roomSearch(this, this.mix.houseResourceslist, dataList)
        let dataList1 = {}
        dataList1.houseSpaceManagerType = 'HOUSE'
        dataList1.houseSpaceProcess = 'RENTABLE_PROCESS'
        dataList1.propertyType = 'D'
        dataList1.originalRentType = 'JOINT_RENT'
        dataList1.loginId = this.$store.state.currentUser.uid
        this.$options.methods.otherStatus(this, this.mix.otherStatus, dataList1)
      } else if (tab.name === 'second') {
        // 整租数据
        // console.log(this.otherHouseSpaceStatus)
        this.otherHouseSpaceStatus = null
        this.tableDataWay = 'house2'
        this.elTabPane = 1
        let dataList = {}
        dataList.houseSpaceManagerType = 'HOUSE'
        dataList.houseSpaceProcess = 'RENTABLE_PROCESS'
        dataList.originalRentType = 'ENTIRE_RENT'
        this.houseCurrentPage = 1
        this.housePageSize = 10
        dataList.pageNo = this.houseCurrentPage
        dataList.pageSize = this.housePageSize
        // dataList.zoneId = this.searchData.zoneLists[this.searchData.zoneLists.length - 1].id
        dataList.zoneId = this.zoneId
        dataList.propertyType = 'D'
        this.$options.methods.houseSearch2(this, this.mix.houseResourcesUrl, dataList)
        let dataList1 = {}
        dataList1.houseSpaceManagerType = 'HOUSE'
        dataList1.houseSpaceProcess = 'RENTABLE_PROCESS'
        dataList1.propertyType = 'D'
        dataList1.originalRentType = 'ENTIRE_RENT'
        dataList1.loginId = this.$store.state.currentUser.uid
        this.$options.methods.otherStatus(this, this.mix.otherStatus, dataList1)
      } else {
        // console.log(this.otherHouseSpaceStatus)
        this.otherHouseSpaceStatus = null
        this.elTabPane = 2
        let dataList = {}
        this.centralized.pageSize = 10
        this.centralized.currentPage = 1
        dataList.pageNo = this.centralized.currentPage
        dataList.pageSize = this.centralized.pageSize
        dataList.propertyType = 'C'
        dataList.houseSpaceProcess = 'RENTABLE_PROCESS'
        // dataList.zoneId = this.searchData.zoneLists[this.searchData.zoneLists.length - 1].id
        dataList.zoneId = this.zoneId
        this.houseClick++
        this.$options.methods.houseSearch3(this, this.mix.houseResourcesUrl, dataList)
        let dataList1 = {}
        dataList1.houseSpaceManagerType = 'HOUSE'
        dataList1.houseSpaceProcess = 'RENTABLE_PROCESS'
        dataList1.propertyType = 'C'
        // dataList1.originalRentType = 'ENTIRE_RENT'
        dataList1.loginId = this.$store.state.currentUser.uid
        this.$options.methods.otherStatus(this, this.mix.otherStatus, dataList1)
      }
      $('.el-tab-pane').eq(this.elTabPane).find('.houseCardList').slideUp()
    },
    openForm: function (data, rentType) { // 显示编辑弹窗
      this.houseEditVisible = true
      // this.houseId = data.resHouseSpaceBeanList[0].houseSpaceId
      this.houseId = data
      this.originalRentType = rentType
      this.editClick++
      // this.houseChange = this.$options.methods.intoString(data)
    },
    openDetail: function (data, value) { // 显示房源详情
      this.houseDetailShow = false
      this.userDetailShow = false
      this.rentalDetailShow = false
      this.conDetailShow = false
      this.clickCount++
      this.detailClick++
      this.perclick++
      this.houseDetailShow = true
      this.detailShowPage = 'house'
      this.detailHouseType = value
      this.clickCount++
      if (value === 'JOINT_RENT') {
        this.detailHouseId = data.houseSpaceId
        this.rentType = 'join'
      } else {
        // this.detailHouseId = data.resHouseSpaceBeanList[0].houseSpaceId
        this.detailHouseId = data.houseSpaceId
        this.rentType = 'entir'
      }
    },
    closeForm: function (data) { // 关闭新建、编辑弹窗
      this.houseEditVisible = false
      this.conDetailShow = false
      this.detailClick++
    },
    openDialog: function (data) { // 打开提示弹窗
      this.dialogVisible = true
      this.houseText = data
    },
    closeDialog: function () { // 关闭提示弹窗
      this.dialogVisible = false
    },
    openEditForm (data) {
    },
    closeEditForm (data) {
      this.dialogEditVisible = false
    },
    houseSearch1 (ind, index) { // 修改后搜索的搜索，不支持搜索框
      // var data = {}
      if (index === 'ALL') {
        index = null
      }
      this.searchList.houseSpaceStatus = index
      this.searchList.originalRentType = 'JOINT_RENT'
      this.searchList.houseSpaceManagerType = 'HOUSE'
      this.searchList.houseSpaceProcess = 'RENTABLE_PROCESS'
      this.searchList.propertyType = 'D'
      this.currentPage2 = 1
      this.searchList.pageNo = this.currentPage2
      this.searchList.pageSize = this.pageSize
      this.searchList.otherHouseSpaceStatus = this.otherHouseSpaceStatus
      this.$options.methods.roomSearch(this, this.mix.houseResourceslist, this.searchList)
    },
    houseSearch () { // 修改后搜索的搜索，不支持搜索框
      this.searchList.propertyType = 'D'
      this.searchList.originalRentType = 'JOINT_RENT'
      this.currentPage2 = 1
      this.searchList.pageNo = this.currentPage2
      this.searchList.pageSize = this.pageSize
      this.searchList.otherHouseSpaceStatus = this.otherHouseSpaceStatus
      this.$options.methods.roomSearch(this, this.mix.houseResourceslist, this.searchList)
      let dataList1 = {}
      dataList1.houseSpaceManagerType = 'HOUSE'
      dataList1.houseSpaceProcess = 'RENTABLE_PROCESS'
      dataList1.propertyType = 'D'
      dataList1.originalRentType = 'JOINT_RENT'
      dataList1.loginId = this.$store.state.currentUser.uid
      dataList1.keywordAddress = this.searchList.keywordAddress
      this.$options.methods.otherStatus(this, this.mix.otherStatus, dataList1)
    },
    houseHouseSearch1 (ind, index) {
      if (index === 'ALL') {
        index = null
      }
      this.searchList1.houseSpaceStatus = index
      this.searchList1.originalRentType = 'ENTIRE_RENT'
      this.searchList1.propertyType = 'D'
      this.searchList1.blockName = ''
      this.houseCurrentPage = 1
      this.housePageSize = 10
      this.searchList1.pageNo = this.houseCurrentPage
      this.searchList1.pageSize = this.housePageSize
      this.searchList.otherHouseSpaceStatus = this.otherHouseSpaceStatus
      this.$options.methods.houseSearch2(this, this.mix.houseResourcesUrl, this.searchList1)
    },
    houseHouseSearch () {
      // this.searchList1
      this.searchList1.originalRentType = 'ENTIRE_RENT'
      this.searchList1.propertyType = 'D'
      this.searchList1.blockName = ''
      this.houseCurrentPage = 1
      this.housePageSize = 10
      this.searchList1.pageNo = this.houseCurrentPage
      this.searchList1.pageSize = this.housePageSize
      this.searchList.otherHouseSpaceStatus = this.houseSpaceStatus.DJoinType
      this.$options.methods.houseSearch2(this, this.mix.houseResourcesUrl, this.searchList1)
      let dataList1 = {}
      dataList1.houseSpaceManagerType = 'HOUSE'
      dataList1.houseSpaceProcess = 'RENTABLE_PROCESS'
      dataList1.propertyType = 'D'
      dataList1.originalRentType = 'ENTIRE_RENT'
      dataList1.loginId = this.$store.state.currentUser.uid
      dataList1.keywordAddress = this.searchList1.keywordAddress
      this.$options.methods.otherStatus(this, this.mix.otherStatus, dataList1)
    },
    houseHouseSearch2 (ind, index) { // 集中式搜索
      if (index === 'ALL') {
        index = null
      }
      this.searchList2.houseSpaceStatus = index
      this.searchList2.propertyType = 'C'
      this.centralized.pageSize = 10
      this.centralized.currentPage = 1
      this.searchList2.blockName = ''
      this.searchList2.buildingNo = ''
      this.searchList2.pageNo = this.centralized.currentPage
      this.searchList2.pageSize = this.centralized.pageSize
      this.searchList.otherHouseSpaceStatus = this.houseSpaceStatus.DEntryType
      this.$options.methods.houseSearch3(this, this.mix.houseResourcesUrl, this.searchList2)
    },
    houseHouseSearch3 () { // 集中式搜索
      this.searchList2.propertyType = 'C'
      this.searchList2.blockName = ''
      this.searchList2.buildingNo = ''
      this.centralized.pageSize = 10
      this.centralized.currentPage = 1
      this.searchList2.pageNo = this.centralized.currentPage
      this.searchList2.pageSize = this.centralized.pageSize
      this.searchList.otherHouseSpaceStatus = this.houseSpaceStatus.CEntryType
      this.$options.methods.houseSearch3(this, this.mix.houseResourcesUrl, this.searchList2)
      let dataList1 = {}
      dataList1.houseSpaceManagerType = 'HOUSE'
      dataList1.houseSpaceProcess = 'RENTABLE_PROCESS'
      dataList1.propertyType = 'C'
      dataList1.loginId = this.$store.state.currentUser.uid
      dataList1.keywordAddress = this.searchList2.keywordAddress
      this.$options.methods.otherStatus(this, this.mix.otherStatus, dataList1)
    },
    handleSizeChange (data) { // 合租分页数改变时触发
      this.pageSize = data
      this.searchList.originalRentType = 'JOINT_RENT'
      this.searchList.houseSpaceManagerType = 'HOUSE'
      this.searchList.houseSpaceProcess = 'RENTABLE_PROCESS'
      this.searchList.propertyType = 'D'
      this.searchList.pageSize = this.pageSize
      this.searchList.pageNo = this.currentPage2
      this.searchList.otherHouseSpaceStatus = this.houseSpaceStatus.DJoinType
      this.$options.methods.roomSearch(this, this.mix.houseResourceslist, this.searchList)
    },
    handleCurrentChange (data) { // 合租当前页改变时触发
      this.currentPage2 = data
      this.searchList.originalRentType = 'JOINT_RENT'
      this.searchList.houseSpaceManagerType = 'HOUSE'
      this.searchList.houseSpaceProcess = 'RENTABLE_PROCESS'
      this.searchList.propertyType = 'D'
      this.searchList.pageSize = this.pageSize
      this.searchList.pageNo = this.currentPage2
      this.searchList.otherHouseSpaceStatus = this.houseSpaceStatus.DJoinType
      this.$options.methods.roomSearch(this, this.mix.houseResourceslist, this.searchList)
    },
    houseSizeChange (data) { // 整租分页改变时触发
      this.housePageSize = data
      this.searchList1.pageNo = this.houseCurrentPage
      this.searchList1.pageSize = this.housePageSize
      this.searchList1.originalRentType = 'ENTIRE_RENT'
      this.searchList1.houseSpaceManagerType = 'HOUSE'
      this.searchList1.houseSpaceProcess = 'RENTABLE_PROCESS'
      this.searchList1.propertyType = 'D'
      this.searchList1.otherHouseSpaceStatus = this.houseSpaceStatus.DEntryType
      this.$options.methods.houseSearch2(this, this.mix.houseResourcesUrl, this.searchList1)
    },
    houseCurrentChange (data) {
      this.houseCurrentPage = data
      this.searchList1.pageNo = this.houseCurrentPage
      this.searchList1.pageSize = this.housePageSize
      this.searchList1.originalRentType = 'ENTIRE_RENT'
      this.searchList1.houseSpaceManagerType = 'HOUSE'
      this.searchList1.houseSpaceProcess = 'RENTABLE_PROCESS'
      this.searchList1.propertyType = 'D'
      this.searchList1.otherHouseSpaceStatus = this.houseSpaceStatus.DEntryType
      this.$options.methods.houseSearch2(this, this.mix.houseResourcesUrl, this.searchList1)
    },
    houseSizeChange1 (data) { // 集中式分页改变时触发
      // this.housePageSize = data
      this.centralized.pageSize = data
      this.searchList2.pageSize = this.centralized.pageSize
      this.searchList2.pageNo = this.centralized.currentPage
      // this.searchList1.pageNo = this.houseCurrentPage
      // this.searchList1.pageSize = this.housePageSize
      this.searchList2.propertyType = 'C'
      this.searchList2.otherHouseSpaceStatus = this.houseSpaceStatus.CEntryType
      // console.log(this.houseSpaceStatus.CEntryType)
      this.$options.methods.houseSearch3(this, this.mix.houseResourcesUrl, this.searchList2)
    },
    houseCurrentChange1 (data) {
      this.centralized.currentPage = data
      this.searchList2.pageNo = this.centralized.currentPage
      this.searchList2.pageSize = this.centralized.pageSize
      this.searchList2.propertyType = 'C'
      this.searchList2.otherHouseSpaceStatus = this.houseSpaceStatus.CEntryType
      this.$options.methods.houseSearch3(this, this.mix.houseResourcesUrl, this.searchList2)
    },
    slideDown () { // 展开全部房源
      $('.houseList').eq(this.elTabPane).find('.houseCardHead').next().slideDown()
      this.houseButtonShow = !this.houseButtonShow
    },
    slideUp () { // 展开全部房源
      $('.houseList').eq(this.elTabPane).find('.houseCardHead').next().slideUp()
      this.houseButtonShow = !this.houseButtonShow
    },
    roomTransform (data) {
      for (let p in data) {
        for (let i in data[p].resHouseSpaceBeanList) {
          switch (data[p].decorateType) {
            case 'ROUGHCAST_HOUSE':
              data[p].decorateType1 = '毛坯房'
              break
            case 'SIMPLE_DECORATION_HOUSE':
              data[p].decorateType1 = '简装'
              break
            case 'REFINED_DECORATION_HOUSE':
              data[p].decorateType1 = '精装'
              break
          }
          switch (data[p].resHouseSpaceBeanList[i].direction) {
            case 'EAST':
              data[p].resHouseSpaceBeanList[i].direction1 = '东'
              break
            case 'SOUTH':
              data[p].resHouseSpaceBeanList[i].direction1 = '南'
              break
            case 'WEST':
              data[p].resHouseSpaceBeanList[i].direction1 = '西'
              break
            case 'NORTH':
              data[p].resHouseSpaceBeanList[i].direction1 = '北'
              break
            case 'SOUTHEAST':
              data[p].resHouseSpaceBeanList[i].direction1 = '东南'
              break
            case 'NORTHEAST':
              data[p].resHouseSpaceBeanList[i].direction1 = '东北'
              break
            case 'SOUTHWEST':
              data[p].resHouseSpaceBeanList[i].direction1 = '西南'
              break
            case 'NORTHWEST':
              data[p].resHouseSpaceBeanList[i].direction1 = '西北'
              break
          }
          switch (data[p].resHouseSpaceBeanList[i].houseSpaceStatus) {
            case 'WAIT_TRUST':
              data[p].resHouseSpaceBeanList[i].houseSpaceStatus1 = '待托管'
              break
            case 'ASSESSING':
              data[p].resHouseSpaceBeanList[i].houseSpaceStatus1 = '评估中'
              break
            case 'APPROVED':
              data[p].resHouseSpaceBeanList[i].houseSpaceStatus1 = '审核通过'
              break
            case 'SIGNING_DC':
              data[p].resHouseSpaceBeanList[i].houseSpaceStatus1 = '签订托管合同中'
              break
            case 'DC_NOT_TE':
              data[p].resHouseSpaceBeanList[i].houseSpaceStatus1 = '托管合同未生效'
              break
            case 'DC_TE':
              data[p].resHouseSpaceBeanList[i].houseSpaceStatus1 = '托管合同已生效'
              break
            case 'DESIGNING':
              data[p].resHouseSpaceBeanList[i].houseSpaceStatus1 = '设计中'
              break
            case 'CONSTRUCTING':
              data[p].resHouseSpaceBeanList[i].houseSpaceStatus1 = '施工中'
              break
            case 'CHECKING':
              data[p].resHouseSpaceBeanList[i].houseSpaceStatus1 = '验收中'
              break
            case 'RETAIN':
              data[p].resHouseSpaceBeanList[i].houseSpaceStatus1 = '保留'
              break
            case 'RENTABLE':
              data[p].resHouseSpaceBeanList[i].houseSpaceStatus1 = '空置'
              break
            case 'RESERVED':
              data[p].resHouseSpaceBeanList[i].houseSpaceStatus1 = '已预定'
              break
            case 'SIGNING_LC':
              data[p].resHouseSpaceBeanList[i].houseSpaceStatus1 = '签订合同中'
              break
            case 'LC_NOT_TE':
              data[p].resHouseSpaceBeanList[i].houseSpaceStatus1 = '合同未生效'
              break
            case 'RENTED':
              data[p].resHouseSpaceBeanList[i].houseSpaceStatus1 = '已出租'
              break
            case 'FREEZING':
              data[p].resHouseSpaceBeanList[i].houseSpaceStatus1 = '已冻结'
              break
            case 'DELETED':
              data[p].resHouseSpaceBeanList[i].houseSpaceStatus1 = '已删除'
              break
          }
        }
      }
      for (let p in data) {
        for (let i in data[p].resHouseSpaceBeanList) {
          // data[p].resHouseSpaceBeanList[i].rentalPrice1 = data[p].resHouseSpaceBeanList[i].rentalPrice / 1000
          if (data[p].resHouseSpaceBeanList[i].houseSpaceStatus !== 'RENTABLE') {
            if (data[p].resHouseSpaceBeanList[i].actualRentalPrice !== '' && data[p].resHouseSpaceBeanList[i].actualRentalPrice !== null) {
              data[p].resHouseSpaceBeanList[i].rentalPrice1 = data[p].resHouseSpaceBeanList[i].actualRentalPrice / 1000 + '元/月'
            } else {
              data[p].resHouseSpaceBeanList[i].rentalPrice1 = '暂无定价'
            }
          } else {
            if (data[p].resHouseSpaceBeanList[i].expectedRentalPrice !== '' && data[p].resHouseSpaceBeanList[i].expectedRentalPrice !== null) {
              data[p].resHouseSpaceBeanList[i].rentalPrice1 = data[p].resHouseSpaceBeanList[i].expectedRentalPrice / 1000 + '元/月'
            } else {
              data[p].resHouseSpaceBeanList[i].rentalPrice1 = '暂无定价'
            }
          }
          data[p].resHouseSpaceBeanList[i].houseSpaceArea1 = data[p].resHouseSpaceBeanList[i].houseSpaceArea / 1000
        }
      }
      // console.log(data)
      return data
    },

    // Inspected by Mark.
    roomSearch (_this, url, dataList) { // 合租搜索
      dataList.loginId = _this.$store.state.currentUser.uid
      dataList.isLoginId = true
      // console.log(_this)
      // dataList.zoneId = _this.searchData.zoneLists[_this.searchData.zoneLists.length - 1].id
      dataList.zoneId = _this.zoneId
      _this.loading = 0
      dataList.keywordAddress = _this.searchList.keywordAddress
      _this.$http.post(url, dataList).then(({data}) => {
        if (data.code === 200) {
          for (let i = 0; i < data.data.list.length; i++) {
            for (let j = 0; j < data.data.list[i].resHouseSpaceBeanList.length; j++) {
              data.data.list[i].resHouseSpaceBeanList[j].keywordAddressManagerGeographic = data.data.list[i].keywordAddressManagerGeographic
              if (data.data.list[i].resHouseSpaceBeanList[j].houseSpaceStatus === 'RENTABLE' && _this.userRole[0] !== 200) { // 可出租的时候运营部、销售部、管家都可以申请
                data.data.list[i].resHouseSpaceBeanList[j].isSendPassword = true
              } else if (data.data.list[i].resHouseSpaceBeanList[j].houseSpaceStatus !== 'RENTABLE') { // 不可出租的时候运营部可以申请
                if (_this.userRole[0] === 0) {
                  data.data.list[i].resHouseSpaceBeanList[j].isSendPassword = true
                } else {
                  data.data.list[i].resHouseSpaceBeanList[j].isSendPassword = false
                }
              }
            }
          }
          _this.$options.methods.roomTransform(data.data.list)
          _this.totleflatShareData = data.data.list
          _this.totlePage = data.data.totalCount
          _this.flatShareData = data.data.list
          _this.loading = 1
        } else {
          _this.totlePage = 0
          _this.flatShareData = []
          _this.loading = 1
        }
      })
    },
    roomSearch1 (_this, url, dataList) { // 合租搜索
      dataList.loginId = _this.$store.state.currentUser.uid
      dataList.isLoginId = true
      _this.loading = 0
      dataList.keywordAddress = _this.searchList.keywordAddress
      _this.$http.post(url, dataList).then(({data}) => {
        if (data.code === 200) {
          for (let i = 0; i < data.data.list.length; i++) {
            for (let j = 0; j < data.data.list[i].resHouseSpaceBeanList.length; j++) {
              data.data.list[i].resHouseSpaceBeanList[j].keywordAddressManagerGeographic = data.data.list[i].keywordAddressManagerGeographic
              if (data.data.list[i].resHouseSpaceBeanList[j].houseSpaceStatus === 'RENTABLE' && _this.userRole[0] !== 200) { // 可出租的时候运营部、销售部、管家都可以申请
                data.data.list[i].resHouseSpaceBeanList[j].isSendPassword = true
              } else if (data.data.list[i].resHouseSpaceBeanList[j].houseSpaceStatus !== 'RENTABLE') { // 不可出租的时候运营部可以申请
                if (_this.userRole[0] === 0) {
                  data.data.list[i].resHouseSpaceBeanList[j].isSendPassword = true
                } else {
                  data.data.list[i].resHouseSpaceBeanList[j].isSendPassword = false
                }
              }
            }
          }
          _this.$options.methods.roomTransform(data.data.list)
          // data.data.list = _this.$options.methods.roomTransform(data.data.list)
          _this.totleflatShareData = data.data.list
          _this.totlePage = data.data.totalCount
          _this.flatShareData = data.data.list
          _this.loading = 1
        } else {
          _this.totlePage = 0
          _this.flatShareData = []
          _this.loading = 1
        }
      })
    },
    houseSearch2 (_this, url, dataList) { // 整租搜索
      _this.entireRentData = []
      _this.loading = 0
      // _this.centralizedRentData = []
      dataList.loginId = _this.$store.state.currentUser.uid
      dataList.isLoginId = true
      dataList.keywordAddress = _this.searchList1.keywordAddress
      // dataList.zoneId = _this.searchData.zoneLists[_this.searchData.zoneLists.length - 1].id
      dataList.zoneId = _this.zoneId
      _this.$http.post(url, dataList).then(({data}) => {
        if (data.code === 200) {
          for (let i = 0; i < data.data.list.length; i++) {
            data.data.list[i].list = []
            data.data.list[i].listShow = false
            // _this.$options.methods.entireRentSummation(data.data.list[i])
          }
          _this.housePage = data.data.totalCount
          _this.entireRentData = data.data.list
          // _this.centralizedRentData = data.data.list
          _this.loading = 1
        } else {
          _this.housePage = 0
          _this.entireRentData = []
          _this.loading = 1
        }
      })
    },
    houseSearch3 (_this, url, dataList) { // 整租搜索
      // _this.entireRentData = []
      _this.loading1 = 0
      _this.centralizedRentData = []
      _this.centralized.hasData = false
      dataList.loginId = _this.$store.state.currentUser.uid
      // dataList.pageNo = 1
      // dataList.pageSize = 99
      dataList.isLoginId = true
      dataList.keywordAddress = _this.searchList2.keywordAddress
      // dataList.zoneId = _this.searchData.zoneLists[_this.searchData.zoneLists.length - 1].id
      dataList.zoneId = _this.zoneId
      _this.$http.post(url, dataList).then(({data}) => {
        if (data.code === 200) {
          _this.centralized.totleSize = data.data.totalCount
          _this.centralized.hasData = true
          for (let i = 0; i < data.data.list.length; i++) {
            data.data.list[i].list = []
            data.data.list[i].listShow = false
            // _this.$options.methods.entireRentSummation(data.data.list[i])
          }
          _this.housePage = data.data.totalCount
          // _this.entireRentData = data.data.list
          _this.centralizedRentData = data.data.list
          _this.loading = 1
        } else {
          _this.housePage1 = 1
          _this.centralizedRentData = []
          _this.loading1 = 1
          _this.centralized.hasData = false
        }
      })
    },
    houseCardListShow (data) {
      this.houseClick++
      // this.centralizedRentData[data].showList = true
      // console.log(this)
      // this.$bus.emit('houseCard1', {'houseLists': this.entireRentData})
    },
    showPersonDetail (data) {
      this.userDetailShow = true
      this.perclick++
      this.personId = data
    },
    showRentalDetail (data) {
      this.userDetailShow = true
      this.zIndex++
    },
    rentalDetail () {
      this.rentalDetailShow = true
      this.zIndex++
    },
    houseEdit (data) {
      this.houseEditVisible = true
      this.houseId = data
      this.editClick++
    },
    closeDetailShow () {
    },
    houseGoodAdd (data) {
      this.goodFormShow = true
      this.addHouseId = data
      this.goodClickCount++
    },
    closeGoodAdd () {
      this.goodFormShow = false
      this.goodClickCount++
      // this.goodRFormShow = false
      // this.reduceCount++
      this.goodRFormShow = false
      this.detailShowPage = 'good'
      this.reduceCount++
      this.clickCount++
    },
    goodAddSuccess () {
      this.goodClickCount++
      this.clickCount++
      this.detailShowPage = 'good'
      this.goodFormShow = false
      this.goodRFormShow = false
    },
    goodReduce (data) {
      this.addHouseId = data
      this.goodRFormShow = true
      this.detailShowPage = 'good'
      this.reduceCount++
      this.clickCount++
    },
    contractDetail (contratId) {
      this.contratId = contratId
      this.conDetailShow = true
    },
    rentContractDetail (contratId) {
      this.contratId = contratId
      this.rentContractDetailShow.show = true
    },
    reduceGoodSuccess () {
      this.goodRFormShow = false
      this.reduceCount++
      this.clickCount++
    },
    addContract (data, type) {
      this.contractFormData.people = [localStorage.getItem('role'), this.$store.state.currentUser.username]
      this.contractForm.show = true
      this.contractFormData1 = JSON.parse(JSON.stringify(this.contractFormData))
      this.contractFormData1.houseSpaceName = data
      this.contractFormData1.houseRentType = type
    },
    password (data, type) {
      this.pwData = data
      this.pwShow = true
      this.pwData.rentType = type
      this.pwData.userRole = this.userRole
      // console.log(data)
      if (this.userRole[0] === 0) {
        this.pwData.role = 0
      }
      // console.log(this.pwShow)
      // this.contractForm.show = true
    },
    closePw () {
      this.pwShow = false
    },
    loadName () {
      this.$http.get(this.$store.state.accountUrl + 'user/info/id/' + this.$store.state.currentUser.uid,
      ).then(function (response) {
        var data = response.data
        if (data.code === 200) {
          this.username = data.data.username
        }
      }, function (response) {
        // console.log(response.status)
      })
    },
    uploadSuccess () {
      // $('.upload').fadeOut()
      this.uploadData.show = false
      this.detailClick++
    },
    addFile (value) {
      // console.log(value.houseSpaceId)
      this.uploadData.show = true
      this.urlLists.houseSpaceId = value.houseSpaceId
      this.urlLists.houseSpaceFileType = 'C'
      this.urlLists.houseSpaceStatus = value.houseSpaceStatus
      this.urlLists.reqFileBeanList = []
      this.urlLists.type = 'house'
      this.detailClick++
    },
    searchUnit (unitId, _this) { // 根据id查找当期片区详情
      _this.searchData.zoneChildren = []
      _this.$http.get(_this.mix.unitUrl + unitId).then(function (data) {
        if (data.body.code === 200) {
          // _this.searchData.zoneChildren = value.body.data
          // _this.areaData.push({
          //   id: data.body.data.id,
          //   name: data.body.data.name
          // })
          _this.areaData = data.body.data
        }
      })
    },
    unitInfo (unitId, _this) { // 根据id查找当期片区的子片区
      // _this.$http.get(_this.mix.unitInfo + unitId).then(function (value) {
      //   if (value.body.code === 200) {
      //     _this.searchData.zoneLists = []
      //     _this.searchData.zoneLists[0] = value.body.data
      //   }
      // })
      _this.searchData.zoneLists.push(
        {
          id: '3e2fe4faa399476786dda82bde78052c',
          name: '随寓'
        }
      )
    },
    chooseUnit1 (value) {
      let num = ''
      for (let i = 0; i < this.searchData.zoneLists.length; i++) {
        if (value.id === this.searchData.zoneLists[i].id) {
          num = i + 1
        }
        if (num === i) {
          this.searchData.zoneLists.splice(i)
        }
      }
      this.$options.methods.searchUnit(value.id, this)
      if (this.elTabPane === 0) {
        // 合租数据
        let dataList = {}
        dataList.houseSpaceManagerType = 'HOUSE'
        dataList.houseSpaceProcess = 'RENTABLE_PROCESS'
        dataList.originalRentType = 'JOINT_RENT'
        this.currentPage2 = 1
        dataList.pageNo = this.currentPage2
        dataList.pageSize = this.pageSize
        dataList.propertyType = 'D'
        dataList.otherHouseSpaceStatus = this.houseSpaceStatus.DJoinType
        // dataList.zoneId = this.searchData.zoneLists[this.searchData.zoneLists.length - 1].id
        dataList.zoneId = this.zoneId
        this.houseClick++
        this.$options.methods.roomSearch(this, this.mix.houseResourceslist, dataList)
        let dataList1 = {}
        dataList1.houseSpaceManagerType = 'HOUSE'
        dataList1.houseSpaceProcess = 'RENTABLE_PROCESS'
        dataList1.propertyType = 'D'
        dataList1.originalRentType = 'JOINT_RENT'
        dataList1.loginId = this.$store.state.currentUser.uid
        dataList1.keywordAddress = this.searchList.keywordAddress
        this.$options.methods.otherStatus(this, this.mix.otherStatus, dataList1)
      } else if (this.elTabPane === 1) {
        // 整租数据
        this.tableDataWay = 'house2'
        let dataList = {}
        dataList.houseSpaceManagerType = 'HOUSE'
        dataList.houseSpaceProcess = 'RENTABLE_PROCESS'
        dataList.originalRentType = 'ENTIRE_RENT'
        this.houseCurrentPage = 1
        this.housePageSize = 10
        dataList.pageNo = this.houseCurrentPage
        dataList.pageSize = this.housePageSize
        dataList.otherHouseSpaceStatus = this.houseSpaceStatus.DEntryType
        dataList.zoneId = this.zoneId
        // dataList.zoneId = this.searchData.zoneLists[this.searchData.zoneLists.length - 1].id
        dataList.propertyType = 'D'
        this.$options.methods.houseSearch2(this, this.mix.houseResourcesUrl, dataList)
        let dataList1 = {}
        dataList1.houseSpaceManagerType = 'HOUSE'
        dataList1.houseSpaceProcess = 'RENTABLE_PROCESS'
        dataList1.propertyType = 'D'
        dataList1.originalRentType = 'ENTIRE_RENT'
        dataList1.loginId = this.$store.state.currentUser.uid
        dataList1.keywordAddress = this.searchList1.keywordAddress
        this.$options.methods.otherStatus(this, this.mix.otherStatus, dataList1)
      } else {
        let dataList = {}
        this.centralized.pageSize = 10
        this.centralized.currentPage = 1
        dataList.pageNo = this.centralized.currentPage
        dataList.pageSize = this.centralized.pageSize
        dataList.propertyType = 'C'
        dataList.originalRentType = 'ENTIRE_RENT'
        dataList.houseSpaceProcess = 'RENTABLE_PROCESS'
        // dataList.zoneId = this.searchData.zoneLists[this.searchData.zoneLists.length - 1].id
        dataList.zoneId = this.zoneId
        dataList.otherHouseSpaceStatus = this.houseSpaceStatus.CEntryType
        this.houseClick++
        this.$options.methods.houseSearch3(this, this.mix.houseResourcesUrl, dataList)
        let dataList1 = {}
        // dataList1.pageNo = this.centralized.currentPage
        // dataList1.pageSize = this.centralized.pageSize
        dataList1.houseSpaceManagerType = 'HOUSE'
        dataList1.houseSpaceProcess = 'RENTABLE_PROCESS'
        dataList1.propertyType = 'C'
        dataList1.originalRentType = 'ENTIRE_RENT'
        dataList1.loginId = this.$store.state.currentUser.uid
        dataList1.keywordAddress = this.searchList2.keywordAddress
        this.$options.methods.otherStatus(this, this.mix.otherStatus, dataList1)
      }
      $('.el-tab-pane').eq(this.elTabPane).find('.houseCardList').slideUp()
    },
    chooseUnit2 (value) {
      // this.searchData.zoneLists.push(value)
      // console.log(this.searchData.zoneLists)
      this.$options.methods.searchUnit(value.id, this)
      if (this.elTabPane === 0) {
        // 合租数据
        let dataList = {}
        dataList.houseSpaceManagerType = 'HOUSE'
        dataList.houseSpaceProcess = 'RENTABLE_PROCESS'
        dataList.originalRentType = 'JOINT_RENT'
        this.currentPage2 = 1
        dataList.propertyType = 'D'
        dataList.pageNo = this.currentPage2
        dataList.pageSize = this.pageSize
        // dataList.zoneId = this.searchData.zoneLists[this.searchData.zoneLists.length - 1].id
        dataList.zoneId = this.zoneId
        dataList.otherHouseSpaceStatus = this.houseSpaceStatus.DJoinType
        this.houseClick++
        this.$options.methods.roomSearch(this, this.mix.houseResourceslist, dataList)
        let dataList1 = {}
        dataList1.houseSpaceManagerType = 'HOUSE'
        dataList1.houseSpaceProcess = 'RENTABLE_PROCESS'
        dataList1.propertyType = 'D'
        dataList1.originalRentType = 'JOINT_RENT'
        dataList1.loginId = this.$store.state.currentUser.uid
        dataList1.keywordAddress = this.searchList.keywordAddress
        this.$options.methods.otherStatus(this, this.mix.otherStatus, dataList1)
      } else if (this.elTabPane === 1) {
        // 整租数据
        this.tableDataWay = 'house2'
        let dataList = {}
        dataList.houseSpaceManagerType = 'HOUSE'
        dataList.houseSpaceProcess = 'RENTABLE_PROCESS'
        dataList.originalRentType = 'ENTIRE_RENT'
        this.houseCurrentPage = 1
        this.housePageSize = 10
        dataList.pageNo = this.houseCurrentPage
        dataList.pageSize = this.housePageSize
        // dataList.zoneId = this.searchData.zoneLists[this.searchData.zoneLists.length - 1].id
        dataList.zoneId = this.zoneId
        dataList.otherHouseSpaceStatus = this.houseSpaceStatus.DEntryType
        dataList.propertyType = 'D'
        this.$options.methods.houseSearch2(this, this.mix.houseResourcesUrl, dataList)
        let dataList1 = {}
        dataList1.houseSpaceManagerType = 'HOUSE'
        dataList1.houseSpaceProcess = 'RENTABLE_PROCESS'
        dataList1.propertyType = 'D'
        dataList1.originalRentType = 'ENTIRE_RENT'
        dataList1.loginId = this.$store.state.currentUser.uid
        dataList1.keywordAddress = this.searchList1.keywordAddress
        this.$options.methods.otherStatus(this, this.mix.otherStatus, dataList1)
      } else {
        let dataList = {}
        this.centralized.pageSize = 10
        this.centralized.currentPage = 1
        dataList.pageNo = this.centralized.currentPage
        dataList.pageSize = this.centralized.pageSize
        dataList.propertyType = 'C'
        dataList.houseSpaceProcess = 'RENTABLE_PROCESS'
        dataList.originalRentType = 'ENTIRE_RENT'
        // dataList.zoneId = this.searchData.zoneLists[this.searchData.zoneLists.length - 1].id
        dataList.zoneId = this.zoneId
        dataList.otherHouseSpaceStatus = this.houseSpaceStatus.CEntryType
        this.houseClick++
        this.$options.methods.houseSearch3(this, this.mix.houseResourcesUrl, dataList)
        let dataList1 = {}
        dataList1.pageNo = this.centralized.currentPage
        dataList1.pageSize = this.centralized.pageSize
        dataList1.houseSpaceManagerType = 'HOUSE'
        dataList1.houseSpaceProcess = 'RENTABLE_PROCESS'
        dataList1.propertyType = 'C'
        dataList1.originalRentType = 'ENTIRE_RENT'
        dataList1.loginId = this.$store.state.currentUser.uid
        dataList1.keywordAddress = this.searchList2.keywordAddress
        this.$options.methods.otherStatus(this, this.mix.otherStatus, dataList1)
      }
      $('.el-tab-pane').eq(this.elTabPane).find('.houseCardList').slideUp()
    },
    getUnitId (value) {
      console.log(value)
      // this.searchData.zoneLists.push(value)
      this.$options.methods.searchUnit(value, this)
      this.zoneId = value
      // console.log(this.areaData)
      if (this.elTabPane === 0) {
        // 合租数据
        let dataList = {}
        dataList.houseSpaceManagerType = 'HOUSE'
        dataList.houseSpaceProcess = 'RENTABLE_PROCESS'
        dataList.originalRentType = 'JOINT_RENT'
        this.currentPage2 = 1
        dataList.propertyType = 'D'
        dataList.pageNo = this.currentPage2
        dataList.pageSize = this.pageSize
        // dataList.zoneId = this.searchData.zoneLists[this.searchData.zoneLists.length - 1].id
        dataList.zoneId = this.zoneId
        dataList.otherHouseSpaceStatus = this.houseSpaceStatus.DJoinType
        this.houseClick++
        this.$options.methods.roomSearch(this, this.mix.houseResourceslist, dataList)
        let dataList1 = {}
        dataList1.houseSpaceManagerType = 'HOUSE'
        dataList1.houseSpaceProcess = 'RENTABLE_PROCESS'
        dataList1.propertyType = 'D'
        dataList1.originalRentType = 'JOINT_RENT'
        dataList1.loginId = this.$store.state.currentUser.uid
        dataList1.keywordAddress = this.searchList.keywordAddress
        this.$options.methods.otherStatus(this, this.mix.otherStatus, dataList1)
      } else if (this.elTabPane === 1) {
        // 整租数据
        this.tableDataWay = 'house2'
        let dataList = {}
        dataList.houseSpaceManagerType = 'HOUSE'
        dataList.houseSpaceProcess = 'RENTABLE_PROCESS'
        dataList.originalRentType = 'ENTIRE_RENT'
        this.houseCurrentPage = 1
        this.housePageSize = 10
        dataList.pageNo = this.houseCurrentPage
        dataList.pageSize = this.housePageSize
        // dataList.zoneId = this.searchData.zoneLists[this.searchData.zoneLists.length - 1].id
        dataList.zoneId = this.zoneId
        dataList.otherHouseSpaceStatus = this.houseSpaceStatus.DEntryType
        dataList.propertyType = 'D'
        this.$options.methods.houseSearch2(this, this.mix.houseResourcesUrl, dataList)
        let dataList1 = {}
        dataList1.houseSpaceManagerType = 'HOUSE'
        dataList1.houseSpaceProcess = 'RENTABLE_PROCESS'
        dataList1.propertyType = 'D'
        dataList1.originalRentType = 'ENTIRE_RENT'
        dataList1.loginId = this.$store.state.currentUser.uid
        dataList1.keywordAddress = this.searchList1.keywordAddress
        this.$options.methods.otherStatus(this, this.mix.otherStatus, dataList1)
      } else {
        let dataList = {}
        this.centralized.pageSize = 10
        this.centralized.currentPage = 1
        dataList.pageNo = this.centralized.currentPage
        dataList.pageSize = this.centralized.pageSize
        dataList.propertyType = 'C'
        dataList.houseSpaceProcess = 'RENTABLE_PROCESS'
        dataList.originalRentType = 'ENTIRE_RENT'
        // dataList.zoneId = this.searchData.zoneLists[this.searchData.zoneLists.length - 1].id
        dataList.zoneId = this.zoneId
        dataList.otherHouseSpaceStatus = this.houseSpaceStatus.CEntryType
        this.houseClick++
        this.$options.methods.houseSearch3(this, this.mix.houseResourcesUrl, dataList)
        let dataList1 = {}
        dataList1.pageNo = this.centralized.currentPage
        dataList1.pageSize = this.centralized.pageSize
        dataList1.houseSpaceManagerType = 'HOUSE'
        dataList1.houseSpaceProcess = 'RENTABLE_PROCESS'
        dataList1.propertyType = 'C'
        dataList1.originalRentType = 'ENTIRE_RENT'
        dataList1.loginId = this.$store.state.currentUser.uid
        dataList1.keywordAddress = this.searchList2.keywordAddress
        this.$options.methods.otherStatus(this, this.mix.otherStatus, dataList1)
      }
      $('.el-tab-pane').eq(this.elTabPane).find('.houseCardList').slideUp()
    },
    otherStatus (_this, url, req) { // 统计各种的状态的房源的数量
      // req.zoneId = _this.searchData.zoneLists[_this.searchData.zoneLists.length - 1].id
      req.zoneId = this.zoneId
      _this.$http.post(url, req).then(function (data) {
        if (data.body.code === 200) {
          _this.statusCount = data.body.data
        }
      })
    },
    otherStatus1 (_this, url, req) { // 统计各种的状态的房源的数量
      _this.$http.post(url, req).then(function (data) {
        if (data.body.code === 200) {
          _this.statusCount = data.body.data
        }
      })
    },
    synchronization (value) { // 同步到蘑菇租房
      let message = '确定同步房间：' + value.keywordAddress + ' 到蘑菇租房?'
      let url = this.$store.state.alipayUrl + 'alipayHouseUploadByHouseSpaceId'
      let req = {}
      req.houseSpaceId = value.houseSpaceId
      req.tpRentType = 'ALIPAY'
      this.$confirm(message).then(_ => {
        this.$http.post(url, req).then(function (res) {
          // console.log(res)
          if (res.body.code === 200) {
            this.$message({
              message: '同步成功',
              type: 'success'
            })
          } else if (res.body.code === 10015) {
            this.$message({
              message: '请确认该房源处于可出租状态',
              type: 'error'
            })
          } else {
            this.$message({
              message: '同步失败',
              type: 'error'
            })
          }
        })
      })
      .catch(_ => {})
    },
    frozen (value) { // 冻结合租房源
      let url = this.$store.state.houseUrl + 'update/houseSpaceStatus'
      this.$confirm('确定冻结房源?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post(url, value).then((res) => {
          if (res.body.code === 200) {
            this.$message({
              message: '冻结成功',
              type: 'success'
            })
            this.searchList.originalRentType = 'JOINT_RENT'
            this.searchList.houseSpaceManagerType = 'HOUSE'
            this.searchList.houseSpaceProcess = 'RENTABLE_PROCESS'
            this.searchList.pageSize = this.pageSize
            this.searchList.pageNo = this.currentPage2
            this.searchList.otherHouseSpaceStatus = this.houseSpaceStatus.DJoinType
            this.$options.methods.roomSearch(this, this.mix.houseResourceslist, this.searchList)
            let dataList1 = {}
            dataList1.houseSpaceManagerType = 'HOUSE'
            dataList1.houseSpaceProcess = 'RENTABLE_PROCESS'
            dataList1.propertyType = 'D'
            dataList1.originalRentType = 'JOINT_RENT'
            dataList1.loginId = this.$store.state.currentUser.uid
            dataList1.keywordAddress = this.searchList.keywordAddress
            this.$options.methods.otherStatus(this, this.mix.otherStatus, dataList1)
          } else {
            this.$message({
              message: '冻结失败',
              type: 'error'
            })
          }
        }, (res) => {
          this.$message({
            message: '网络有误',
            type: 'error'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消冻结'
        })
      })
    },
    thaw (value) { // 冻结合租房源
      let url = this.$store.state.houseUrl + 'update/houseSpaceStatus'
      this.$confirm('确定解冻房源?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post(url, value).then((res) => {
          if (res.body.code === 200) {
            this.$message({
              message: '解冻成功',
              type: 'success'
            })
            this.searchList.originalRentType = 'JOINT_RENT'
            this.searchList.houseSpaceManagerType = 'HOUSE'
            this.searchList.houseSpaceProcess = 'RENTABLE_PROCESS'
            this.searchList.pageSize = this.pageSize
            this.searchList.pageNo = this.currentPage2
            this.searchList.otherHouseSpaceStatus = this.houseSpaceStatus.DJoinType
            this.$options.methods.roomSearch(this, this.mix.houseResourceslist, this.searchList)
            let dataList1 = {}
            dataList1.houseSpaceManagerType = 'HOUSE'
            dataList1.houseSpaceProcess = 'RENTABLE_PROCESS'
            dataList1.propertyType = 'D'
            dataList1.originalRentType = 'JOINT_RENT'
            dataList1.loginId = this.$store.state.currentUser.uid
            dataList1.keywordAddress = this.searchList.keywordAddress
            this.$options.methods.otherStatus(this, this.mix.otherStatus, dataList1)
          } else {
            this.$message({
              message: '解冻失败',
              type: 'error'
            })
          }
        }, (res) => {
          this.$message({
            message: '网络有误',
            type: 'error'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消解冻'
        })
      })
    },
    frozenRental () { // 冻结整租房源
      let dataList1 = {}
      dataList1.houseSpaceManagerType = 'HOUSE'
      dataList1.houseSpaceProcess = 'RENTABLE_PROCESS'
      dataList1.propertyType = 'D'
      dataList1.originalRentType = 'ENTIRE_RENT'
      dataList1.loginId = this.$store.state.currentUser.uid
      dataList1.keywordAddress = this.searchList1.keywordAddress
      this.$options.methods.otherStatus(this, this.mix.otherStatus, dataList1)
    },
    frozenRental1 () { // 冻结集中式整租房源
      let dataList1 = {}
      dataList1.pageNo = this.centralized.currentPage
      dataList1.pageSize = this.centralized.pageSize
      dataList1.houseSpaceManagerType = 'HOUSE'
      dataList1.houseSpaceProcess = 'RENTABLE_PROCESS'
      dataList1.propertyType = 'C'
      dataList1.originalRentType = 'ENTIRE_RENT'
      dataList1.loginId = this.$store.state.currentUser.uid
      dataList1.keywordAddress = this.searchList2.keywordAddress
      this.$options.methods.otherStatus(this, this.mix.otherStatus, dataList1)
    }
  },
  created () {
    this.$store.state.adminleftnavnum = '/house/house1'
    this.$store.state.topIndex = '/house/house1'
    this.loadName()
    let _this = this
    _this.userRole = [99, 99]
    // _this.userRole = []
    this.$http.get(this.mix.userRole + _this.$store.state.currentUser.uid).then(res => {
      if (res.body.code === 200) {
        let list = res.body.data
        this.username = res.body.username
        for (let i = 0; i < list.length; i++) {
          switch (list[i].aliasName) {
            case 'OPER-MANAGER': // 运营部主管
              if (_this.userRole[0] > 0) {
                _this.userRole = [0, 0]
              }
              break
            case 'OPER-EXECUTIVE': // 运营主管
              if (_this.userRole[0] > 0) {
                _this.userRole = [0, 1]
              }
              break
            case 'OPER-PROFESSIONAL': // 运营专员
              if (_this.userRole[0] > 0) {
                _this.userRole = [0, 2]
              }
              break
            case 'MARKETING-MANAGE': // 营销部经理
              if (_this.userRole[0] > 1) {
                _this.userRole = [1, 0]
              }
              break
            case 'NUVOTONMCU-MANAGER': // 销售主管
              if (_this.userRole[0] > 1) {
                _this.userRole = [1, 1]
              }
              break
            case 'NUVOTONMCU': // 销售专员
              if (_this.userRole[0] > 1) {
                _this.userRole = [1, 2]
              }
              break
            case 'MANAGER-APARTMENT': // 事业部经理
              if (_this.userRole[0] > 2) {
                _this.userRole = [2, 0]
              }
              break
            case 'HOUSEKEEPER': // 小管家
              if (_this.userRole[0] > 2) {
                _this.userRole = [2, 2]
              }
              break
            case 'PARTNER': // 合作伙伴
              if (_this.userRole[0] > 10) {
                _this.userRole = [10, 10]
              }
              break
          }
        }
        var mix = _this.$store.state.houseUrl + 'list/houseSpaceInHouseSpaceManager' // 房源列表
        var dataList = {}
        dataList.houseSpaceManagerType = 'HOUSE'
        dataList.houseSpaceProcess = 'RENTABLE_PROCESS'
        dataList.pageSize = 10
        dataList.pageNo = 1
        dataList.originalRentType = 'JOINT_RENT'
        dataList.propertyType = 'D'
        let userInfo = _this.$store.state.accountUrl + 'user/info/p/'
        let dataList1 = {}
        dataList1.houseSpaceManagerType = 'HOUSE'
        dataList1.houseSpaceProcess = 'RENTABLE_PROCESS'
        dataList1.propertyType = 'D'
        dataList1.originalRentType = 'JOINT_RENT'
        dataList1.loginId = _this.$store.state.currentUser.uid
        dataList1.zoneId = _this.$store.state.currentUser.uid
        let statusUrl = this.$store.state.houseUrl + 'count/OtherStatus'
        _this.$http.get(userInfo + _this.$store.state.currentUser.UserPhone).then(function (value) {
          if (value.body.code === 200) {
            _this.$options.methods.unitInfo(value.body.data.unitid, _this)
            _this.$options.methods.searchUnit(value.body.data.unitid, _this)
            dataList.zoneId = value.body.data.unitid
            this.$options.methods.roomSearch1(_this, mix, dataList)
            dataList1.zoneId = value.body.data.unitid
            this.$options.methods.otherStatus1(_this, statusUrl, dataList1)
          }
        })
      }
    })
  }
}
$(function () {
  $('.filter-list>li').click(function () {
    if (!$(this).hasClass('active')) {
      $(this).addClass('active').siblings().removeClass('active')
      let index = $(this).index()
      $('.house-info-left-panel .content').eq(index).addClass('show').siblings().removeClass('show')
    }
  })
  $('.el-dialog--small').width(650)
})
