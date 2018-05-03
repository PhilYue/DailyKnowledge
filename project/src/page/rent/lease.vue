<template>
  <div>
      <!-- 右侧主内容区 -->
      <div class="main-right" >
      <!-- 头部搜索和筛选 -->
        <div class="main-right-search">
          <div class="main-right-search-span">
            <a v-for="(rent, index) in rents" :key="index" :class="{selectActive: activeName == rent}" @click="selected(rent)">{{rent}}</a>
          </div>
          <div class="fr search-cont">
            <el-input @keydown.enter.native="search()" class="rent1-input" v-model="input" placeholder="租客手机号,租客姓名,房源信息"></el-input>
            <el-button type="primary" @click="search()">搜索</el-button>
          </div>
          <div>
            <!-- 即将到期天数筛选 -->
            <el-dropdown v-if="select1" menu-align="start" class="el-dropdown" @command="handleCommand">
              <span class="el-dropdown-link">
                {{day}}<i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="即将到期天数">即将到期天数</el-dropdown-item>
                <el-dropdown-item command="3天内到期">3天内到期</el-dropdown-item>
                <el-dropdown-item command="7天内到期">7天内到期</el-dropdown-item>
                <el-dropdown-item command="10天内到期">10天内到期</el-dropdown-item>
                <el-dropdown-item command="15天内到期">15天内到期</el-dropdown-item>
                <el-dropdown-item command="30天内到期">30天内到期</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!-- 已搬入天数筛选 -->
            <el-dropdown v-if="select2" menu-align="start" class="el-dropdown" @command="handleCommand2">
              <span class="el-dropdown-link">
                {{day2}}<i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="已搬入天数">已搬入天数</el-dropdown-item>
                <el-dropdown-item command="已搬入3天">已搬入3天</el-dropdown-item>
                <el-dropdown-item command="已搬入7天">已搬入7天</el-dropdown-item>
                <el-dropdown-item command="已搬入10天">已搬入10天</el-dropdown-item>
                <el-dropdown-item command="已搬入15天">已搬入15天</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!-- 公共片区筛选组件 -->
            <areaSelect @sendUnitId="getUnitId" :areaData="areaData"></areaSelect>
          </div>
        </div>
        <!-- 列表主内容 -->
        <div class="main-right-main">
          <div class="list-contain">
            <div class="list-contain-main">
            <!-- 列表组件 -->
              <leaseList :listData="listData">
                <template slot-scope="props" class="pad9">
                  <el-col :span="2" class="pad9">
                    <!-- 已结束状态 -->
                    <el-dropdown v-if="listData[props.index].leaseStatus === 'END'" menu-align="start">
                      <el-button>
                        <span>操作</span>
                        <i class="el-icon-caret-bottom el-icon--right"></i>
                      </el-button>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-if="!isGudong" @click.native="openList(props)">欠费账单</el-dropdown-item>
                        <el-dropdown-item @click.native="openDetail(props)">详情</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown v-else-if="listData[props.index].leaseStatus === 'WATHROW' || listData[props.index].leaseStatus === 'WASUBLET' || listData[props.index].leaseStatus === 'WARENEWAL' || listData[props.index].leaseStatus === 'WACHANGR'" menu-align="start">
                      <el-button>
                        <span>操作</span>
                        <i class="el-icon-caret-bottom el-icon--right"></i>
                      </el-button>
                      <el-dropdown-menu slot="dropdown">
                        <!-- <el-dropdown-item @click.native="cancel(props)">取消申请</el-dropdown-item> -->
                        <el-dropdown-item v-if="!isGudong" @click.native="openMoney(props)">录入费用</el-dropdown-item>
                        <el-dropdown-item v-if="!isGudong" @click.native="openList(props)">欠费账单</el-dropdown-item>
                        <el-dropdown-item @click.native="openDetail(props)">详情</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                    <!-- 其他状态显示的按钮openDetail(props) -->
                    <el-dropdown v-else menu-align="start">
                      <el-button>
                        <span>操作</span>
                        <i class="el-icon-caret-bottom el-icon--right"></i>
                      </el-button>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-if="!isGudong" @click.native="applyChangeHouse(props)">换房</el-dropdown-item>
                        <el-dropdown-item v-if="listData[props.index].endTime - 2592000000 <= new Date().getTime() && !isGudong" @click.native="applyRenew(props)">续租</el-dropdown-item>
                        <el-dropdown-item v-if="!isGudong" @click.native="sublet(props)">转租</el-dropdown-item>
                        <el-dropdown-item v-if="!isGudong" @click.native="applyCancel(props)">退租</el-dropdown-item>
                        <el-dropdown-item v-if="!isGudong" @click.native="openMoney(props)">录入费用</el-dropdown-item>
                        <el-dropdown-item v-if="!isGudong" @click.native="openList(props)">欠费账单</el-dropdown-item>
                        <el-dropdown-item @click.native="openDetail(props)">详情</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                </template>
              </leaseList>
            </div>
          </div>
          <h3 class="noData" v-show="noData">暂无数据</h3>
          <div class="paging">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="cur_page"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalCount">
            </el-pagination>
          </div>
          <!-- 新建出租合同表单 -->
          <contract-form :contractForm="contractForm" :contractFormData="contractFormData"></contract-form>
          <!-- 录入金额 -->
          <recordMoney :recordMoneyShow="recordMoneyShow" :recordMoneyData="recordMoneyData"></recordMoney>
          <!-- 合并费用 -->
          <merge :mergeShow="mergeShow" :mergeId="mergeId"></merge>
          <!-- 详情子组件 -->
          <leaseDetail :detailShow="detailShow" :leaseId="leaseId"></leaseDetail>
          <!-- 退租表单组件 -->
          <cancelRentForm :cancelRentForm="cancelRentForm" :cancelRentFormShow="cancelRentFormShow" :cancelRentFormData="cancelRentFormData"></cancelRentForm>
          <!-- 转租表单组件 -->
          <changeRentForm :changeRentForm="changeRentForm" :changeRentFormShow="changeRentFormShow" :changeRentFormData="changeRentFormData"></changeRentForm>
          <!-- 换房表单组件 -->
          <huan-rent-form
            :huanRentForm="huanRentForm" :huanRentFormShow="huanRentFormShow" :huanRentFormData="huanRentFormData"
            @submit="showHuanDetail"
          ></huan-rent-form>
        </div>
      </div>
      <!-- <div class="dialog_bg"></div> -->
  </div>
</template>
<script>
// 列表组件
import leaseList from '../../components/leaseList'
import ContractForm from '../../components/contractForm'
// import $ from 'jquery'
// 录入金额的组件
import recordMoney from '../../components/recordMoney'
import areaSelect from '../../components/areaSelect'  // 公共片区筛选组件
import merge from '../../components/merge' // 合并费用的组件
import cancelRentForm from '../../components/cancelRentForm' // 退租表单申请组件
import changeRentForm from '../../components/changeRentForm' // 转租表单申请组件
import HuanRentForm from '../../components/huanRentForm' // 换房表单申请组件
import leaseDetail from '../../components/leaseDetail'
export default {
  components: {
    leaseList,
    ContractForm,
    recordMoney,
    merge,
    leaseDetail,
    areaSelect,
    cancelRentForm,
    changeRentForm,
    HuanRentForm
  },
  data: function () {
    return {
      // 退租表单数据
      cancelRentForm: {},
      cancelRentFormShow: {
        show: false
      },
      cancelRentFormData: {},
      // 转租表单数据
      changeRentForm: {},
      changeRentFormShow: {
        show: false
      },
      changeRentFormData: {},
      // 转租表单数据
      huanRentForm: {},
      huanRentFormShow: {
        show: false
      },
      huanRentFormData: {},
      // 城市筛选data
      areaData: [],
      // 详情组件
      leaseId: '',
      detailShow: {
        show: false
      },
      day: '即将到期天数',
      day2: '已搬入天数',
      select1: true,
      select2: true,
      // 录入时间的数据
      dialogFormVisible: false,
      addTimeForm: {},
      isGudong: this.$store.state.currentUser.isGudong,
      timeId: '',
      formLabelWidth: '100px',
      rules: {
        allowWatchTime: [
          { type: 'date', required: true, message: '请选择预计搬出时间', trigger: 'change' }
        ],
        expiredOutTime: [
          { type: 'date', required: true, message: '预计搬出时间', trigger: 'change' }
        ]
      },
      // 登录人手机号
      loginPhone: localStorage.getItem('currentUserPhone'),
      // 暂无数据
      noData: false,
      // 未结清费用数据
      mergeShow: {
        show: false
      },
      mergeId: '',
      // 搜索筛选的数据
      rents: ['全部', '待生效', '出租中', '欠费中', '租约超期', '租约已结束', '提前结束'],
      activeName: '全部',
      input: '',
      listData: [], // 列表数据
      bean: '', // 搜索条件
      pagesize: 10, // 默认每页数据量
      cur_page: 1, // 当前页码
      totalCount: 0, // 默认数据总数
      contractForm: {
        show: false
      },
      contractFormData: {},
      recordMoneyShow: {
        show: false
      },
      recordMoneyData: {}
    }
  },
  methods: {
    // 即将到期天数筛选
    handleCommand (command) {
      this.day = command
      if (command === '即将到期天数') {
        this.bean.searchDays = null
        this.bean.searchType = null
        this.select2 = true
      } else if (command === '3天内到期') {
        this.bean.searchDays = 3
        this.bean.searchType = 'WILLEND'
        this.select2 = false
      } else if (command === '7天内到期') {
        this.bean.searchDays = 7
        this.bean.searchType = 'WILLEND'
        this.select2 = false
      } else if (command === '10天内到期') {
        this.bean.searchDays = 10
        this.bean.searchType = 'WILLEND'
        this.select2 = false
      } else if (command === '15天内到期') {
        this.bean.searchDays = 15
        this.bean.searchType = 'WILLEND'
        this.select2 = false
      } else if (command === '30天内到期') {
        this.bean.searchDays = 30
        this.bean.searchType = 'WILLEND'
        this.select2 = false
      }
      this.loadData(this.bean)
    },
    getUnitId: function (data) {
      this.bean.zoneId = data
      this.loadData(this.bean)
    },
    // 加载第一次城市筛选
    loadFirst: function (e) {
      this.areaData.push({
        id: '3e2fe4faa399476786dda82bde78052c',
        name: '随寓'
      })
    },
    // 已搬入天数筛选
    handleCommand2 (command) {
      this.day2 = command
      if (command === '已搬入天数') {
        this.bean.searchDays = null
        this.bean.searchType = null
        this.select1 = true
      } else if (command === '已搬入3天') {
        this.bean.searchDays = 3
        this.bean.searchType = 'ALIN'
        this.select1 = false
      } else if (command === '已搬入7天') {
        this.bean.searchDays = 7
        this.bean.searchType = 'ALIN'
        this.select1 = false
      } else if (command === '已搬入10天') {
        this.bean.searchDays = 10
        this.bean.searchType = 'ALIN'
        this.select1 = false
      } else if (command === '已搬入15天') {
        this.bean.searchDays = 15
        this.bean.searchType = 'ALIN'
        this.select1 = false
      }
      this.loadData(this.bean)
    },
    // 头部搜索
    search () {
      let r = /^\+?[1-9][0-9]*$/ // 正整数
      let s = /0\d{3}-\d{7,8}/
      if (r.test(this.input) && this.input.length === 11 || s.test(this.input) && this.input.length === 13) {
        this.bean.userPhone = this.input
        this.bean.keyWord = null
      } else {
        this.bean.keyWord = this.input
        this.bean.userPhone = null
      }
      this.bean.loginId = this.$store.state.currentUser.uid
      this.loadData(this.bean)
    },
    // 同级选中,根据状态筛选
    selected (rent) {
      this.activeName = rent
      if (rent === '全部') {
        this.bean.leaseStatus = 'OTHER'
      } else if (rent === '待生效') {
        this.bean.leaseStatus = 'NOEFFECT'
      } else if (rent === '出租中') {
        this.bean.leaseStatus = 'RENTING'
      } else if (rent === '欠费中') {
        this.bean.leaseStatus = 'OWEING'
      } else if (rent === '退租待确认') {
        this.bean.leaseStatus = 'WATHROW'
      } else if (rent === '退租已确认') {
        this.bean.leaseStatus = 'ALTHROW'
      } else if (rent === '转租待确认') {
        this.bean.leaseStatus = 'WASUBLET'
      } else if (rent === '转租已确认') {
        this.bean.leaseStatus = 'ALCONSUB'
      } else if (rent === '换房待确认') {
        this.bean.leaseStatus = 'WACHANGR'
      } else if (rent === '换房已确认') {
        this.bean.leaseStatus = 'ALCHANGR'
      } else if (rent === '续租待确认') {
        this.bean.leaseStatus = 'WARENEWAL'
      } else if (rent === '续租已确认') {
        this.bean.leaseStatus = 'ALRENEWAL'
      } else if (rent === '租约已结束') {
        this.bean.leaseStatus = 'END'
      } else if (rent === '提前结束') {
        this.bean.leaseStatus = 'EAYLEND'
      } else if (rent === '租约超期') {
        this.bean.leaseStatus = 'HOLD'
      }
      this.loadData(this.bean)
    },
    // 当前页码改变触发
    handleCurrentChange (val) {
      this.bean.pageNo = val
      this.cur_page = val
      this.loadData(this.bean)
    },
    // 每页条数变化触发
    handleSizeChange (val) {
      this.pagesize = val
      this.bean.pageSize = val
      this.loadData(this.bean)
    },
    // 获取列表数据
    loadData: function (bean) {
      this.$http.post(this.$store.state.rentUrl + 'lease/list',
        bean
      ).then(function (response) {
        var data = response.data
        if (data.data !== null) {
          this.listData = data.data.list
          this.totalCount = data.data.totalCount
          this.noData = false
        } else {
          this.totalCount = 0
          this.listData = ''
          this.noData = true
          // this.$message({
          //   showClose: true,
          //   message: '暂无数据',
          //   type: 'error',
          //   duration: 2000
          // })
        }
      }, function (response) {
        console.log(response.status)
      })
    },
    // 申请退房
    applyCancel (props) {
      this.cancelRentForm = {
        cancelType: '',
        time: '',
        type: ''
      }
      this.cancelRentFormShow.show = true
      this.cancelRentFormData.id = this.listData[props.index].id
      this.cancelRentFormData.unitId = this.listData[props.index].unitId
    },
    // 改变租约状态
    changeStatus (id, status) {
      // 改变租约状态
      this.$http.post(this.$store.state.rentUrl + 'lease/flowUpdateLease', {
        id: id,
        leaseStatus: status,
        loginId: this.$store.state.currentUser.uid
      }).then(function (response) {
        var data = response.data
        if (data.code === 200) {
          this.$message({
            type: 'info',
            message: '此租约状态已修改'
          })
          this.loadData(this.bean)
        }
      }, function (response) {
        console.log(response.status)
      })
    },
    // 换房
    applyChangeHouse (props) {
      this.huanRentFormShow.show = true
      this.huanRentFormData.id = this.listData[props.index].id
      this.huanRentForm = {
        changeType: '',
        time: ''
      }
      this.huanRentFormData.data = {
        marketingRules: 'NEEDAUDIT',
        storageTypeShow: true,
        storageType: 'ELE',
        title: '新建换房电子合同',
        dialog: true,
        name: this.listData[props.index].userName,
        phone: this.listData[props.index].userPhone,
        cardId: this.listData[props.index].documentsNumber,
        sex: this.listData[props.index].sex,
        id: this.listData[props.index].id,
        signType: 'CHANGE',
        zhuanzuShow: false,
        huanfangShow: true,
        houseSpaceName: '',
        originalContractId: this.listData[props.index].contractId,
        source: this.listData[props.index].source,
        addType: 'NOTRISE',
        earnestShow: false,
        livesNumber: (this.listData[props.index].livesNumber).toString(),
        fromLease: true,
        people: null,
        poundageShow: true,
        // rentRangeS: true,
        fromLeaseType: 'huanfang',
        processKey: 'PROCESS-KEY-RENT-CHANGE-V6',
        nameS: true,
        phoneS: true,
        cardIdS: true,
        startTimeS: true
      }
    },
    // 续租
    applyRenew (props) {
      // 打开新建合同
      this.contractForm.show = true
      this.contractFormData = {
        marketingRules: 'NEEDAUDIT',
        storageTypeShow: true,
        storageType: 'ELE',
        title: '新建续租电子合同',
        dialog: true,
        name: this.listData[props.index].userName,
        phone: this.listData[props.index].userPhone,
        cardId: this.listData[props.index].documentsNumber,
        sex: this.listData[props.index].sex,
        houseRentType: this.listData[props.index].houseRentType,
        houseSpaceName: this.listData[props.index].houseSpaceName,
        rentMoney: (this.listData[props.index].rental / 1000).toString(),
        deposit: (this.listData[props.index].deposit / 1000).toString(),
        id: this.listData[props.index].id,
        originalContractId: this.listData[props.index].contractId,
        signType: 'RENEWAL',
        processKey: 'PROCESS-KEY-RENEWAL-V8',
        source: this.listData[props.index].source,
        addType: 'NOTRISE',
        earnestShow: false,
        houseSpaceId: this.listData[props.index].houseSpaceId,
        unitId: this.listData[props.index].unitId,
        startTime: new Date(this.listData[props.index].endTime + 86400000),
        endTime: null,
        houseRentTypeS: true,
        startTimeS: true,
        houseSpaceNameS: true,
        fromLease: true,
        nameS: true,
        phoneS: true,
        cardIdS: true,
        fromLeaseType: 'xuzu',
        guidePrice: this.listData[props.index].guidePrice
      }
    },
    // 转租
    sublet (props) {
      this.changeRentForm = {
        changeType: '',
        time: ''
      }
      this.changeRentFormShow.show = true
      this.changeRentFormData.id = this.listData[props.index].id
      // 转租数据
      this.changeRentFormData.data = {
        marketingRules: 'NEEDAUDIT',
        storageTypeShow: true,
        storageType: 'ELE',
        title: '新建转租电子合同',
        dialog: true,
        people: null,
        houseRentType: this.listData[props.index].houseRentType,
        houseSpaceName: this.listData[props.index].houseSpaceName,
        id: this.listData[props.index].id,
        signType: 'SUBLET',
        originalContractId: this.listData[props.index].contractId,
        addType: 'NOTRISE',
        poundageShow: true,
        earnestShow: false,
        houseSpaceId: this.listData[props.index].houseSpaceId,
        unitId: this.listData[props.index].unitId,
        houseRentTypeS: true,
        houseSpaceNameS: true,
        zhuanzuShow: true,
        huanfangShow: false,
        fromLease: true,
        fromLeaseType: 'zhuanzu',
        guidePrice: this.listData[props.index].guidePrice,
        processKey: 'PROCESS-KEY-SUBLET-V5',
        startTimeS: true
      }
    },
    // 取消申请
    cancel (props) {
      this.$confirm('是否确定取消申请?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: (action, instance) => {
          if (action === 'confirm') {
            // 改变状态为出租中
            this.$http.post(this.$store.state.rentUrl + 'lease/flowUpdateLease', {
              id: this.listData[props.index].id,
              leaseStatus: 'RENTING',
              loginId: this.$store.state.currentUser.uid
            }).then(function (response) {
              var data = response.data
              if (data.code === 200) {
                this.loadData(this.bean)
              }
            }, function (response) {
              console.log(response.status)
            })
          }
        }
      })
    },
    // 打开详情页Thu Oct 25 2018 00:00:00 GMT+0800 (CST)
    openDetail (props) {
      this.leaseId = this.listData[props.index].id
      this.detailShow.show = true
    },
    // 录入费用
    openMoney (props) {
      this.recordMoneyShow.show = true
      this.recordMoneyData = {
        addAmount: '',
        addPer: '',
        addType: '',
        financeType: '',
        chargType: '',
        endChargTime: '',
        initialAmount: '',
        cycle: '',
        startChargTime: '',
        unit: '',
        addCycle: null,
        addUnit: null,
        once: 'once',
        leaseId: this.listData[props.index].id
      }
    },
    // 打开欠费账单
    openList (props) {
      this.mergeId = this.listData[props.index].id
      this.mergeShow.show = true
    },

    showHuanDetail (form) {
      console.log(200, form)
      this.contractForm.show = true
      this.contractFormData = form
    }
  },

  created () {
    this.bean = {
      leaseStatus: 'OTHER',
      pageSize: this.pagesize,
      pageNo: this.cur_page,
      loginId: this.$store.state.currentUser.uid
    }
    this.$store.state.adminleftnavnum = '/rent/lease'
    this.$store.state.topIndex = '/rent/lease'
    this.loadData(this.bean)
    // 加载出第一次加载的城市
    this.loadFirst()
    // 改变租约的状态
    this.$root.lease.$on('changeStatus', value => {
      this.loadData(this.bean)
    })
    // 转租财务表单确认后
    this.$root.changeRentForm.$on('changeRentForm', value => {
      this.contractForm.show = true
      this.contractFormData = value
    })
    // 换房财务表单确认后
    this.$root.huanRentForm.$on('huanRentForm', value => {
      this.contractForm.show = true
      this.contractFormData = value
    })
  }
}
</script>
<style scoped>
.el-dropdown-menu__item{
  font-size: 14px;
}
.dialog_bg{
  width: 100%;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0,0,0,.5);
}
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
.main-right-search-span{
  font-size: 13px;
  margin-bottom: 15px;
}
.main-right-search-span a{
  margin-right: 30px;
  display: inline-block;
  height: 36px;
  line-height: 36px;
  cursor: pointer;
}
.el-table{
  border:none;
}
.selectActive{
  color: #20a0ff;
}

/*列表css*/
.list-contain-main{
  padding: 0 25px;
  border:1px solid #eee;
}
.pad9{
  padding: 9px 0;
}
.paging{
  text-align: right;
  margin-top: 20px;
}
.el-dropdown{
  margin-right: 20px;
}
.h4{
  margin-top: 20px;
}
.button_merge{
  position: absolute;
  bottom: 20px;
  right: 20px;
}
.dialog_merge{
  padding-bottom: 70px;
}
</style>
