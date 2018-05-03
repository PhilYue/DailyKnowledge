<template>
  <div>
  <div class='search f-cb' style="margin-bottom:0;">
    <div class='main-right-search-span mySelf'>
      <ul>
        <tag-pinner :context="statusCount" @change="handleChange" />

        <div style="position: relative; width: calc((100vw - 60px) * 0.91 - 60px); margin-top:10px;">
          <areaSelect @sendUnitId="getUnitId" :areaData="searchData.zoneLists"></areaSelect>
        </div>
      </ul>
    </div>
    <div class='main-left-search-span'>
      <el-input placeholder="请输入房源地址" auto-complete="off" style="width:300px" v-model="kw" v-on:keyup.enter.native="loadData"></el-input>
      <el-button type='primary' @click="loadData">搜索</el-button>
    </div>
  </div>

<!-- <span>0888098</span> -->
  <house :data="data" :elTabPane="elTabPane" :tableDataWay="tableDataWay" :mix="mix" :searchList="searchList"
    :userRole="userRole" :role="userRole[0]" @openeditForm="openEditForm" @listenToParentEvent="openForm"
    @addContract="addContract" @openRental="showPersonDetail" @addFile="addFile" @synchronization="synchronization" @password="password"
    @frozen="frozen" @thaw="thaw"
    @child-click="handleChildClick"
  />

  <!-- <div class="loading" v-if="loading === 0"></div> -->
  <h3 v-if="totlePage === 0 && loading !== 0" style="text-align:center; margin-top:50px;">暂无数据</h3>
  <div class="block" v-else-if="totlePage > 0">
    <el-pagination class="paging" style="text-align:right;"
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[10, 20, 30, 40]"
      v-bind="pagination"
      @size-change="pagination.sizeChangeHandler"
      @current-change="pagination.currentChangeHandler">
    </el-pagination>
  </div>
</div>
</template>

<script>
  import $ from 'jquery'
  import House from '@/components/House/' //  合租房源列表
  import areaSelect from '../../../../../components/areaSelect' // 公共片区筛选组件

  import TagPinner from '../../TagPinner'
  import { api } from '@/xhr'

  export default {
    components: {
      House,
      areaSelect,
      TagPinner
    },
    data: function () {
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
              list: [{
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
              list: [{
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
        houseDetailShow: false, // 控制房源详情显示与否
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

        /* Edit by Mark. */
        tabId: 'ENTIRE_RENT', // JOINT_RENT
        data: [],

        currentTag: undefined,

        kw: '',

        pagination: {
          currentPage: 1,
          pageSize: 10,
          total: 0,

          sizeChangeHandler: (pageSize) => {
            this.pagination.pageSize = pageSize
            this.handleChange(this.currentTag)
          },
          currentChangeHandler: (currentPage) => {
            this.pagination.currentPage = currentPage
            this.handleChange(this.currentTag)
          }
        },
      }
    },
    mounted() {
      this.loadData(undefined)
    },

    methods: {
      /* Edit by Mark. */
      handleChildClick(businessId) {
        console.log(businessId)
        this.$emit('expand', businessId.houseSpaceId)
      },

      handleChange(id) {
        this.currentTag = id
        this.loadData()
      },

      loadData() {
        // 合租
        const originalRentType = 'JOINT_RENT'
        const pagination = {
          pageNo: this.pagination.currentPage,
          pageSize: this.pagination.pageSize,
        }

        let queryParams = {
          loginId: this.$store.state.currentUser.uid,
          originalRentType,
          otherHouseSpaceStatus: this.currentTag,
          houseSpaceProcess: 'RENTABLE_PROCESS',
          propertyType: 'D',
          isLoginId: true,
          zoneId: '',
          keywordAddress: this.kw,

          ...pagination,
        }

        api.house.list(queryParams).then(res => {
          let data = res.data

          if (data.code === 200) {
            res.data.data.list.forEach((item, i) => {
              item.resHouseSpaceBeanList.forEach((space, j) => {
                data.data.list[i].resHouseSpaceBeanList[j].keywordAddressManagerGeographic = data.data.list[i].keywordAddressManagerGeographic
                if (data.data.list[i].resHouseSpaceBeanList[j].houseSpaceStatus === 'RENTABLE' && this.userRole[0] !==
                  200) { // 可出租的时候运营部、销售部、管家都可以申请
                  data.data.list[i].resHouseSpaceBeanList[j].isSendPassword = true
                } else if (data.data.list[i].resHouseSpaceBeanList[j].houseSpaceStatus !== 'RENTABLE') { // 不可出租的时候运营部可以申请
                  if (this.userRole[0] === 0) {
                    data.data.list[i].resHouseSpaceBeanList[j].isSendPassword = true
                  } else {
                    data.data.list[i].resHouseSpaceBeanList[j].isSendPassword = false
                  }
                }
              })
            })
            this.roomTransform(data.data.list)
            this.totleflatShareData = data.data.list
            this.loading = 1

            this.pagination = {
              ...this.pagination,
              total: data.data.totalCount,
            }
            this.totlePage = data.data.totalCount
            this.flatShareData = data.data.list

            this.data = res.data.data.list
          }
        })
      },
      intoString: function (obj) { // 将对象中的int类型转换为string类型
        for (var p in obj) {
          if (obj[p] !== '' && obj[p] !== null && typeof (obj[p]) === 'number') {
            obj[p] = obj[p].toString()
          }
        }
        return obj
      },
      openForm: function (data, rentType) { // 显示编辑弹窗
        this.houseEditVisible = true
        // this.houseId = data.resHouseSpaceBeanList[0].houseSpaceId
        this.houseId = data
        this.originalRentType = rentType
        this.editClick++
          // this.houseChange = this.$options.methods.intoString(data)
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
      openEditForm(data) {},
      closeEditForm(data) {
        this.dialogEditVisible = false
      },

      slideDown() { // 展开全部房源
        $('.houseList').eq(this.elTabPane).find('.houseCardHead').next().slideDown()
        this.houseButtonShow = !this.houseButtonShow
      },
      slideUp() { // 展开全部房源
        $('.houseList').eq(this.elTabPane).find('.houseCardHead').next().slideUp()
        this.houseButtonShow = !this.houseButtonShow
      },
      roomTransform(data) {
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
              if (data[p].resHouseSpaceBeanList[i].actualRentalPrice !== '' && data[p].resHouseSpaceBeanList[i].actualRentalPrice !==
                null) {
                data[p].resHouseSpaceBeanList[i].rentalPrice1 = data[p].resHouseSpaceBeanList[i].actualRentalPrice /
                  1000 + '元/月'
              } else {
                data[p].resHouseSpaceBeanList[i].rentalPrice1 = '暂无定价'
              }
            } else {
              if (data[p].resHouseSpaceBeanList[i].expectedRentalPrice !== '' && data[p].resHouseSpaceBeanList[i].expectedRentalPrice !==
                null) {
                data[p].resHouseSpaceBeanList[i].rentalPrice1 = data[p].resHouseSpaceBeanList[i].expectedRentalPrice /
                  1000 + '元/月'
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
      roomSearch(_this, url, dataList) { // 合租搜索
        dataList.loginId = _this.$store.state.currentUser.uid
        dataList.isLoginId = true
        // console.log(_this)
        // dataList.zoneId = _this.searchData.zoneLists[_this.searchData.zoneLists.length - 1].id
        dataList.zoneId = _this.zoneId
        _this.loading = 0
        dataList.keywordAddress = _this.searchList.keywordAddress
        _this.$http.post(url, dataList).then(({
          data
        }) => {
          if (data.code === 200) {
            for (let i = 0; i < data.data.list.length; i++) {
              for (let j = 0; j < data.data.list[i].resHouseSpaceBeanList.length; j++) {
                data.data.list[i].resHouseSpaceBeanList[j].keywordAddressManagerGeographic = data.data.list[i].keywordAddressManagerGeographic
                if (data.data.list[i].resHouseSpaceBeanList[j].houseSpaceStatus === 'RENTABLE' && _this.userRole[0] !==
                  200) { // 可出租的时候运营部、销售部、管家都可以申请
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
      roomSearch1(_this, url, dataList) { // 合租搜索
        dataList.loginId = _this.$store.state.currentUser.uid
        dataList.isLoginId = true
        _this.loading = 0
        dataList.keywordAddress = _this.searchList.keywordAddress
        _this.$http.post(url, dataList).then(({
          data
        }) => {
          if (data.code === 200) {
            for (let i = 0; i < data.data.list.length; i++) {
              for (let j = 0; j < data.data.list[i].resHouseSpaceBeanList.length; j++) {
                data.data.list[i].resHouseSpaceBeanList[j].keywordAddressManagerGeographic = data.data.list[i].keywordAddressManagerGeographic
                if (data.data.list[i].resHouseSpaceBeanList[j].houseSpaceStatus === 'RENTABLE' && _this.userRole[0] !==
                  200) { // 可出租的时候运营部、销售部、管家都可以申请
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
      houseCardListShow(data) {
        this.houseClick++
          // this.centralizedRentData[data].showList = true
          // console.log(this)
          // this.$bus.emit('houseCard1', {'houseLists': this.entireRentData})
      },
      showPersonDetail(data) {
        this.userDetailShow = true
        this.perclick++
          this.personId = data
      },
      showRentalDetail(data) {
        this.userDetailShow = true
        this.zIndex++
      },
      rentalDetail() {
        this.rentalDetailShow = true
        this.zIndex++
      },
      houseEdit(data) {
        this.houseEditVisible = true
        this.houseId = data
        this.editClick++
      },
      closeDetailShow() {},
      houseGoodAdd(data) {
        this.goodFormShow = true
        this.addHouseId = data
        this.goodClickCount++
      },
      addContract(data, type) {
        this.contractFormData.people = [localStorage.getItem('role'), this.$store.state.currentUser.username]
        this.contractForm.show = true
        this.contractFormData1 = JSON.parse(JSON.stringify(this.contractFormData))
        this.contractFormData1.houseSpaceName = data
        this.contractFormData1.houseRentType = type
      },
      password(data, type) {
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
      closePw() {
        this.pwShow = false
      },
      loadName() {
        this.$http.get(this.$store.state.accountUrl + 'user/info/id/' + this.$store.state.currentUser.uid).then(
          function (response) {
            var data = response.data
            if (data.code === 200) {
              this.username = data.data.username
            }
          },
          function (response) {
            // console.log(response.status)
          })
      },
      uploadSuccess() {
        // $('.upload').fadeOut()
        this.uploadData.show = false
        this.detailClick++
      },
      addFile(value) {
        // console.log(value.houseSpaceId)
        this.uploadData.show = true
        this.urlLists.houseSpaceId = value.houseSpaceId
        this.urlLists.houseSpaceFileType = 'C'
        this.urlLists.houseSpaceStatus = value.houseSpaceStatus
        this.urlLists.reqFileBeanList = []
        this.urlLists.type = 'house'
        this.detailClick++
      },
      searchUnit(unitId, _this) { // 根据id查找当期片区详情
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
      unitInfo(unitId, _this) { // 根据id查找当期片区的子片区
        // _this.$http.get(_this.mix.unitInfo + unitId).then(function (value) {
        //   if (value.body.code === 200) {
        //     _this.searchData.zoneLists = []
        //     _this.searchData.zoneLists[0] = value.body.data
        //   }
        // })
        _this.searchData.zoneLists.push({
          id: '3e2fe4faa399476786dda82bde78052c',
          name: '随寓'
        })
      },
      getUnitId(value) {
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
        }

        $('.el-tab-pane').eq(this.elTabPane).find('.houseCardList').slideUp()
      },
      otherStatus(_this, url, req) { // 统计各种的状态的房源的数量
        // req.zoneId = _this.searchData.zoneLists[_this.searchData.zoneLists.length - 1].id
        req.zoneId = this.zoneId
        _this.$http.post(url, req).then(function (data) {
          if (data.body.code === 200) {
            _this.statusCount = data.body.data
          }
        })
      },
      otherStatus1(_this, url, req) { // 统计各种的状态的房源的数量
        _this.$http.post(url, req).then(function (data) {
          if (data.body.code === 200) {
            _this.statusCount = data.body.data
          }
        })
      },
      synchronization(value) { // 同步到蘑菇租房
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

      // 冻结合租房源
      frozen(value) {
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

      // 冻结合租房源
      thaw(value) {
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
    },
    created() {
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

</script>
