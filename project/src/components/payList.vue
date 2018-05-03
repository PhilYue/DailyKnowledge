<template>
  <div class="index">
    <el-dropdown menu-align="start" class="el-dropdown" @command="handleCommand">
      <span class="el-dropdown-link houseRentType">
        {{moneyType}}<i class="el-icon-caret-bottom el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="全部">全部</el-dropdown-item>
        <el-dropdown-item command="租金">租金</el-dropdown-item>
        <el-dropdown-item command="水费">水费</el-dropdown-item>
        <el-dropdown-item command="电费">电费</el-dropdown-item>
        <el-dropdown-item command="煤气费">煤气费</el-dropdown-item>
        <el-dropdown-item command="赔偿费">赔偿费</el-dropdown-item>
        <el-dropdown-item command="清洁费">清洁费</el-dropdown-item>
        <el-dropdown-item command="维修费">维修费</el-dropdown-item>
        <el-dropdown-item command="消费">消费</el-dropdown-item>
        <el-dropdown-item command="物管费">物管费</el-dropdown-item>
        <el-dropdown-item command="手续费">手续费</el-dropdown-item>
        <el-dropdown-item command="其他">其他</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="main-right-search-span">
      <a v-for="rent in rents" :class="{selectActive: activeName == rent}" @click="selected(rent)">{{rent}}</a>
    </div>
    <!-- <div v-if="selectedShow" class="main-right-search-span">
      <el-date-picker
        v-model="minTime"
        type="date"
        placeholder="选择日期"
        @change="searchTime()">
      </el-date-picker>
      -
      <el-date-picker
        v-model="maxTime"
        type="date"
        placeholder="选择日期"
        @change="searchTime()">
      </el-date-picker>
    </div> -->
    <div class="fr search-cont">
      <el-input class="rent1-input" @keydown.enter.native="search()" v-model="input" placeholder="搜索:姓名,手机号,小区名称"></el-input>
      <el-button type="primary" @click="search()">搜索</el-button>
    </div>
    <!-- 公共片区筛选组件 -->
    <areaSelect @sendUnitId="getUnitId" :areaData="areaData"></areaSelect>
    <div class="list-contain-main">
      <collectList :listData="listData" :yqShow="yqShow">
        <template slot-scope="props" class="pad9">
          <el-col v-if="listData[props.index].orderStatus === 'NEW'" :span="2" class="pad9">
            <el-dropdown menu-align="start">
              <el-button>
                <span>操作</span>
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-show="isRole && !isGudong" @click.native="addTip(props)">制单</el-dropdown-item>
                <el-dropdown-item @click.native="openDetail(props)">详情</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col v-else-if="listData[props.index].orderStatus === 'MAKE_BILLS'" :span="2" class="pad9">
            <el-dropdown menu-align="start">
              <el-button>
                <span>操作</span>
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-show="isRole2 && !isGudong" @click.native="confirm(props)">确认</el-dropdown-item>
                <el-dropdown-item @click.native="openDetail(props)">详情</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col v-else :span="2" class="pad9">
            <el-dropdown menu-align="start">
              <el-button>
                <span>操作</span>
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="openDetail(props)">详情</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </template>
      </collectList>
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
    <!-- 预定生成费用详情 -->
    <payDetail :detailShow="detailShow" :detailData="detailData" :payData="payData"></payDetail>
    <!-- 房东合同详情 -->
    <conDetail
     :conDetail="conDetailShow"
     :houseDetailText="'合同详情'"
     conType="con"
     :contractId="contractId"
     :detailClick="detailClick"
     @closeDetail="closeForm"></conDetail>
  </div>
</template>
<script>
import $ from 'jquery'
import collectList from '../components/collectList' // 待收列表组件
import areaSelect from '../components/areaSelect'  // 公共片区筛选组件
import payDetail from '../components/payDetail' // 预定生成详情组件
import conDetail from '../components/conDetail' // 合同详情组件
const height1 = $(window).height() - 191
var $this = this
export default {
  name: 'index',
  data: function () {
    $this = this
    return {
      // 城市筛选data
      areaData: [],
      // 根据状态显示时间段筛选
      selectedShow: false,
      // 费用列表筛选最小最大时间
      minTime: '',
      maxTime: '',
      // 费用列表根据状态筛选
      rents: ['全部', '未支付', '已制单', '已确认打款'],
      activeName: '全部',
      isGudong: this.$store.state.currentUser.isGudong,
      noData: false,
      heigh: {
        height: height1 + 'px'
      },
      dialogFormVisible: false,
      numberValidateForm: {
        money: ''
      },
      payId: '', // 每笔费用id
      searchDiv: false, // 搜索下拉框
      moneyType: '金额类型',
      input: '', // 搜索输入默认值
      listData: [], // 列表数据
      yqShow: false,
      taskData: [], // 任务列表数据
      bean: '', // 筛选条件
      pagesize: 10, // 默认每页数据量
      cur_page: 1,   // 当前页码
      totalCount: 0, // 默认数据总数
      Statistics: '',
      detailShow: {
        show: false
      },
      detailData: {},
      payData: {},
      searchData: '',
      int: 0,
      autofocus: true,
      isRole: false,
      isRole2: false,
      conDetailShow: false, // 控制房东合同显隐
      contractId: '', // 合同ID
      detailClick: 0
    }
  },
  components: {
    collectList,
    payDetail,
    areaSelect,
    conDetail
  },
  computed: {
    // 仅读取，值只须为函数
    height: function () {
      return 1282 * 1205 / 2348
    }
  },
  methods: {
    // 头部搜索
    search () {
      if (this.input !== '') {
        this.bean.searchKey = this.input
      } else {
        this.bean.searchKey = null
      }
      this.loadData(this.bean)
    },
    handleCommand (command) {
      console.log(command)
      this.moneyType = command
      if (command === '全部') {
        this.bean.payPurposeType = null
      } else if (command === '租金') {
        this.bean.payPurposeType = 'REN'
      } else if (command === '水费') {
        this.bean.payPurposeType = 'WATER'
      } else if (command === '电费') {
        this.bean.payPurposeType = 'ELEC'
      } else if (command === '煤气费') {
        this.bean.payPurposeType = 'GAS'
      } else if (command === '赔偿费') {
        this.bean.payPurposeType = 'COM'
      } else if (command === '清洁费') {
        this.bean.payPurposeType = 'CLEAN'
      } else if (command === '维修费') {
        this.bean.payPurposeType = 'MAIN'
      } else if (command === '消费') {
        this.bean.payPurposeType = 'CONSUME'
      } else if (command === '其他') {
        this.bean.payPurposeType = 'OTH'
      } else if (command === '物管费') {
        this.bean.payPurposeType = 'PERFEE'
      } else if (command === '网络费') {
        this.bean.payPurposeType = 'NETWORK'
      } else if (command === '手续费') {
        this.bean.payPurposeType = 'MANAGECOST'
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
      this.$http.post(this.$store.state.payUrl + 'simplelist', bean
      ).then(function (response) {
        var data = response.data
        if (data.data) {
          this.listData = data.data.list
          this.totalCount = data.data.totalCount
          this.noData = false
        } else {
          this.listData = ''
          this.totalCount = 0
          this.noData = true
        }
      }, function (response) {
        console.log(response.status)
      })
    },
    // 费用列表同级选中,根据状态筛选
    selected (rent) {
      this.activeName = rent
      if (rent === '全部') {
        this.bean.orderStatus = null
        this.selectedShow = false
      } else if (rent === '未支付') {
        this.selectedShow = false
        this.bean.orderStatus = 'NEW'
      } else if (rent === '已制单') {
        this.selectedShow = true
        this.bean.orderStatus = 'MAKE_BILLS'
      } else if (rent === '已确认打款') {
        this.selectedShow = true
        this.bean.orderStatus = 'CONFIRM'
      }
      this.loadData(this.bean)
    },
    searchTime () {
      if (this.minTime && this.maxTime) {
        this.bean.minPayTime = Date.parse(this.minTime)
        this.bean.maxPayTime = Date.parse(this.maxTime)
        this.loadData(this.bean)
      }
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
    // 添加制单费用备注
    addTip (props) {
      this.$prompt('请输入制单备注信息', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: '',
        inputErrorMessage: '',
        inputPlaceholder: '备注',
        inputValue: ''
      }).then(({ value }) => {
        // 改变状态为线下已收款
        this.$http.post(this.$store.state.payUrl + 'update', {
          loginId: this.$store.state.currentUser.uid,
          id: this.listData[props.index].id,
          orderStatus: 'MAKE_BILLS',
          statusChangeMemo: value
        }).then(function (response) {
          var data = response.data
          if (data.code === 200) {
            this.loadData(this.bean)
            this.$message({
              type: 'info',
              message: '操作成功'
            })
          }
        }, function (response) {
          console.log(response.status)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    // 添加确认费用备注
    confirm (props) {
      this.$prompt('请输入已打款备注信息', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: '',
        inputErrorMessage: '',
        inputPlaceholder: '备注',
        inputValue: ''
      }).then(({ value }) => {
        // 改变状态为线下已收款
        this.$http.post(this.$store.state.payUrl + 'update', {
          loginId: this.$store.state.currentUser.uid,
          id: this.listData[props.index].id,
          orderStatus: 'CONFIRM',
          statusChangeMemo: value
        }).then(function (response) {
          var data = response.data
          if (data.code === 200) {
            this.loadData(this.bean)
            this.$message({
              type: 'info',
              message: '操作成功'
            })
          }
        }, function (response) {
          console.log(response.status)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    loadTaskData (_this) {
       // 请求待办任务的数据
      this.$http.get(this.$store.state.workflowUrl + 'tasks/group/u/' + this.$store.state.currentUser.uid)
      .then(function (response) {
        var data = response.data
        if (data.data !== null) {
          this.taskData = data.data
          for (var i = 0; i <= this.taskData.length - 1; i++) {
            if (this.taskData[i].processBusinessType === 'rent.terminate') {
              let t = i
              this.$http.get(this.$store.state.rentUrl + 'lease/get/' + this.taskData[i].variables.id, {
              }).then(function (response) {
                var data = response.data
                if (data.code === 200) {
                  this.taskData[t].variables = data.data
                }
              }, function (response) {
                console.log(response.status)
              })
            }
          }
        } else {
          this.taskData = ''
        }
      }, function (response) {
        console.log(response.status)
      })
    },
    // 选项卡切换
    tabClick (tab, event) {
      if (tab.label === '待办任务') {
        this.loadTaskData(this)
      }
    },
    // 打开费用的详情
    openDetail (props) {
      this.$http.get(this.$store.state.payUrl + 'get/' + this.listData[props.index].id, {
      }).then(function (response) {
        var data = response.data
        if (data.code === 200) {
          this.payData = data.data
          this.detailShow.show = true
        }
      }, function (response) {
        console.log(response.status)
      })
    },
    // 打开合同详情
    openConDetail (props) {
      // this.$http.get(this.$store.state.payUrl + 'get/' + this.listData[props.index].id, {
      // }).then(function (response) {
      //   var data = response.data
      //   if (data.code === 200) {
      //     this.contractId = data.data.contractId
      //     this.conDetailShow = true
      //     this.detailClick++
      //   }
      // }, function (response) {
      //   console.log(response.status)
      // })
    },
    // 根据登录用户id获取用户角色
    getRole () {
      this.$http.get(this.$store.state.accountUrl + 'role/list/u/' + this.$store.state.currentUser.uid
      ).then(function (response) {
        var data = response.data
        if (data.code === 200) {
          let list = data.data
          for (var i = 0; i <= list.length - 1; i++) {
            if (list[i].name === '运营部经理' || list[i].name === '运营主管' || list[i].name === '运营专员') {
              this.isRole = true
            } else if (list[i].name === '财务助理' || list[i].name === '出纳' || list[i].name === '会计') {
              this.isRole2 = true
            }
          }
        }
      }, function (response) {
        console.log(response.status)
      })
    },
    count () {
      // 数据统计接口
      this.$http.post(this.$store.state.houseUrl + 'count'
      ).then(function (response) {
        var data = response.data
        if (data.code === 200) {
          this.Statistics = response.data.data
        }
      }, function (response) {
        console.log(response.status)
      })
    },
    searchDetail (value, type) {
      // searchType 控制是点击搜索按钮还是直接点击信息，searchDataId 控制是搜索房源还是合同
      this.$store.dispatch('getSearchData', {'searchDataId': type, 'searchData': JSON.stringify(value), 'searchType': false})
      this.$router.push('/search')
    },
    searchDetail1 () {
      // searchType 控制是点击搜索按钮还是直接点击信息，searchDataId 控制是搜索房源还是合同
      this.$store.dispatch('getSearchData', {'searchDataId': '', 'searchData': this.searchData, 'searchType': true})
      this.$router.push('/search')
    },
    open1 () {
      $this.searchDiv = true
    },
    closeForm () { // 关闭合同详情弹窗
      this.conDetailShow = false
      this.detailClick++
    }
    // close1 () {
    //   $this.searchDiv = false
    // }
  },
  created () {
    this.bean = {
      pageSize: this.pagesize,
      pageNo: this.cur_page,
      loginId: this.$store.state.currentUser.uid,
      financeTypeSet: 'WAIT_PAY',
      businessType: 'DEL'
    }
    this.loadFirst()
     // 待收列表数据加载
    this.loadData(this.bean)
    // 根据用户id获取用户角色
    this.getRole()
  },
  mounted: function () {
    if ($this.int === 0) {
      $('body').click(function (event) {
        let _target = event.target
        if (_target.closest('.search1 .rent1-input') === null && _target.closest('.search1 .el-button') === null && _target.closest('.search1 .search-div') === null) {
          $this.searchDiv = false
        }
      })
      $this.int = 0
    }
  }
}
</script>
<style scoped>
.el-dropdown-menu__item{
  font-size: 14px;
}
::-webkit-scrollbar {display:none}
::-moz-scrollbar {display:none}
::-ms-scrollbar {display:none}
.el-tabs--border-card {
  border:none;
  box-shadow:none;
  border-top: 1px solid #d1dbe5;
}
/* 主内容区 */
main{
  /*overflow-y: auto;*/
  overflow-x: hidden;
  border: solid 30px #e5e9f2;
}
.search1{
  background-color: #e5e9f2;
  text-align: center;
  padding-top: 30px;
}
.el-row{
  width: 100%;
  text-align: center;
}
.selectActive{
  color: #20a0ff;
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
.rent1-input{
  width: 30%;
}
.pos-rel{
  position: relative;
}
.el-tabs--border-card>.el-tabs__header{
  background-color: #e5e9f2;
}
.search-div{
  position: absolute;
  left: 0px;
  top: 37px;
  width: calc(400px - 4% - 2px);
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  padding: 5px 2%;
  z-index: 1;
}
.search-div>div{
  padding-top: 5px;
  margin-bottom: 10px;
  border-top: 1px solid #f2f2f2;
}
.search-div>div:first-child{
  border-top: none;
}
.el-dialog__header{
  text-align: center;
}
.merge-btn{
  float: right;
  margin-bottom: 20px;
}
/*主内容头部css*/
.dashboard-content {
    margin: 0 auto;
    /*margin-bottom: 10px;*/
}
.room-statistics-block {
    background-color: #fff;
}
.row.margin:not([class*=col-]) {
    width: initial;
    font-size: 13px;
}
.yxr-ui .row.margin>.col-1-4, .yxr-ui .row.margin>.col-6-24 {
    width: calc(29% - 1px);
    width: -webkit-calc(29% - 1px);
}
.row.margin>[class*=col-]:not(.row) {
    margin-left: 5px;
    margin-right: 5px;
}
.room-statistics-block .category-list .list-item {
    padding: 18px;
}
.room-statistics-block .category-list .list-item h2 {
    font-size: 16px;
    margin-bottom: 20px;
    margin-top: 0;
}
.room-statistics-block .category-list .list-item ul.type li {
    -webkit-flex-wrap: nowrap;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
}
.room-statistics-block .category-list .list-item ul.type li span:first-child {
    min-width: 75%;
    margin-left: 0;
}
.room-statistics-block .category-list .list-item ul.type li span {
    color: #999;
    display: -webkit-inline-box;
    display: -webkit-inline-flex;
    display: -ms-inline-flexbox;
    display: inline-flex;
    margin: 0;
}
.room-statistics-block .category-list .list-item ul.type li span.number {
    color: #000;
    text-align: right;
    width: 50px;
    display: inline-block;
}
.room-statistics-block .category-list .list-item+.list-item>ul.type {
    margin-left: -20px;
    padding-left: 20px;
    border-left: 1px solid #d2d2d2;
}
.list-item{
  display: inline-block;
}
.el-dropdown{
  margin-right: 30px;
}
/*列表css*/
.list-contain-main{
  padding: 0 25px;
  margin-top: 30px;
}
.pad9{
  padding: 9px 0;
}
.paging{
  text-align: right;
  margin-top: 20px;
}
.search1 .rent1-input{
  width: 400px!important;
}
.search-div p{
  font-size: 14px;
  color: #666;
}
</style>
















