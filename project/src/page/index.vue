<template>
  <div class="index">
       <commonHead></commonHead>
       <div class="pos-rel search1" style="background-color: #e5e9f2; text-align:center; padding:0; margin: 0; padding-top: 30px;">
          <div style="display:inline-block; position: relative">
            <el-input class="rent1-input" style="width:400px;" v-model="searchData" placeholder="搜索:房源编号,小区名字,租客姓名,手机号" @change="searchEvent" v-on:keyup.enter.native="searchDetail1()" @focus="open1"></el-input>
            <!-- <el-button type="primary">搜索</el-button> -->
            <!-- <router-link tag="span" class="el-button el-button--primary" :to="{path: '/search', query: {searchData: searchData, searchWay: '2'}}">
              <span>搜索</span>
            </router-link> -->
            <p class="el-button el-button--primary" @click="searchDetail1()">搜索</p>
            <div v-if="searchDiv" class="search-div" style="text-align:left; top: 37px;">
              <div>房源
                <p v-if="houseLists.length === 0">暂无数据</p>
                <div v-if="houseLists.length > 0">
                <p style="cursor:pointer" v-for="houseList in houseLists.data" @click="searchDetail(houseList, 'first')"><span>{{houseList.keywordAddress}}</span></p>
                </div>
              </div>
              <div>合同
                <p v-if="contractLists.length === 0">暂无数据</p>
                <div v-if="contractLists.length > 0">
                  <p style="cursor:pointer" v-for="contractList in contractLists.data" @click="searchDetail(contractList, 'second')">
                    <span>{{contractList.contractNumber}}<br>{{contractList.searchHouseSpaceBean.keywordAddress}}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
       <main>
       <!-- 统计的数据 -->
          <div class="index-main yxr-ui dashboard-content">
            <div class="room-statistics-block">
              <div class="row margin category-list">
                <!-- 收房管理 -->
                <!-- <div class="col-1-4 list-item">
                  <h2>收房管理</h2>
                  <ul class="type">
                    <li>
                      <span>昨日收房</span>
                      <span class="number">{{Statistics.yesterdayGetHouseSpaceNumber}}</span>
                      <span>套</span>
                    </li>
                    <li>
                      <span>本周收房</span>
                      <span class="number">{{Statistics.thisWeekGetHouseSpaceNumber}}</span>
                      <span>套</span>
                    </li>
                    <li>
                      <span>本月收房</span>
                      <span class="number">{{Statistics.thisMonthGetHouseSpaceNumber}}</span>
                      <span>套</span>
                    </li>
                  </ul>
                </div> -->
                <!-- 出房管理 -->
                <!-- <div class="col-1-4 list-item">
                  <h2>出房管理</h2>
                  <ul class="type">
                    <li>
                      <span>昨日新签</span>
                      <span class="number">{{Statistics.yesterdaySignContractNumber}}</span>
                      <span>个</span>
                    </li>
                    <li>
                      <span>本周新签</span>
                      <span class="number">{{Statistics.thisWeekSignContractNumber}}</span>
                      <span>个</span>
                    </li>
                    <li>
                      <span>本月新签</span>
                      <span class="number">{{Statistics.thisMonthSignContractNumber}}</span>
                      <span>个</span>
                    </li>
                  </ul>
                </div> -->
                <!-- 库存管理 -->
                <!-- <div class="col-1-4 list-item">
                  <h2>库存管理</h2>
                  <ul class="type">
                    <li>
                      <span>全部房源</span>
                      <span class="number">{{Statistics.totalHouseSpaceNumber}}</span>
                      <span>套</span>
                    </li>
                    <li>
                      <span>空置房源</span>
                      <span class="number">{{Statistics.vacancyHouseSpaceNumber}}</span>
                      <span>套</span>
                    </li>
                    <li>
                      <span>已租房源</span>
                      <span class="number">{{Statistics.inRentHouseSpaceNumber}}</span>
                      <span>套</span>
                    </li>
                  </ul>
                </div> -->
              </div>
            </div>
          </div>
          <!-- 内容 -->
          <el-tabs :style="heigh" type="border-card" @tab-click="tabClick">
            <el-tab-pane label="待办任务">
              <div class="main-right-search-span">
                <a v-for="rent in rents2" :class="{selectActive: activeName2 == rent}" @click="selected2(rent)">{{rent}}</a>
              </div>
              <areaSelect @sendUnitId="getTaskUnitId" :areaData="taskareaData"></areaSelect>
              <!-- <div class="fr search-cont">
                <el-input class="rent1-input" @keydown.enter.native="searchTask()" v-model="inputTask" placeholder="姓名,手机号,小区名称"></el-input>
                <el-button type="primary" @click="searchTask()">搜索</el-button>
              </div> -->
              <div class="list-contain-main">
                <task :taskData="taskData" @submit="submit">
                </task>
              </div>
              <h3 class="noData" v-if="taskData === ''">暂无数据</h3>
            </el-tab-pane>
            <el-tab-pane label="应收账单">
              <!--金额类型-->
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
              <!--财务类型-->
              <el-dropdown menu-align="start" class="el-dropdown" @command="handleCommand2">
                <span class="el-dropdown-link houseRentType">
                  {{moneyType2}}<i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="全部">全部</el-dropdown-item>
                  <el-dropdown-item command="押金">押金</el-dropdown-item>
                  <el-dropdown-item command="抵扣">抵扣</el-dropdown-item>
                  <el-dropdown-item command="定金">定金</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <div class="main-right-search-span">
                <a v-for="rent in rents" :class="{selectActive: activeName == rent}" @click="selected(rent)">{{rent}}</a>
              </div>
              <div v-if="selectedShow" class="main-right-search-span">
                <el-date-picker
                  v-model="minTime"
                  type="date"
                  placeholder="支付时间段筛选"
                  @change="searchTime()">
                </el-date-picker>
                -
                <el-date-picker
                  v-model="maxTime"
                  type="date"
                  placeholder="支付时间段筛选"
                  @change="searchTime()">
                </el-date-picker>
              </div>
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
                          <el-dropdown-item v-if="!isGudong" @click.native="addTip(props)">添加备注</el-dropdown-item>
                          <el-dropdown-item v-if="!isGudong" @click.native="confirmMoney(props)">收款</el-dropdown-item>
                          <el-dropdown-item v-if="!isGudong && isYunyingRole" @click.native="split(props)">分拆费用</el-dropdown-item>
                          <el-dropdown-item @click.native="openDetail(props)">详情</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </el-col>
                    <el-col v-else-if="listData[props.index].orderStatus === 'SUC'|| listData[props.index].orderStatus === 'PDOFF' || listData[props.index].orderStatus === 'PDON' || listData[props.index].orderStatus === 'DISTRIBUTED'" :span="2" class="pad9">
                      <el-dropdown menu-align="start">
                        <el-button>
                          <span>操作</span>
                          <i class="el-icon-caret-bottom el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item v-if="!isGudong" @click.native="addTip(props)">添加备注</el-dropdown-item>
                          <el-dropdown-item v-if="isRole" @click.native="confirmCollect(props)">确认</el-dropdown-item>
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
                          <el-dropdown-item v-if="!isGudong" @click.native="addTip(props)">添加备注</el-dropdown-item>
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
              <!-- 费用详情组件 -->
              <payDetail :detailShow="detailShow" :payData="payData"></payDetail>
              <!-- 分拆费用弹窗 -->
              <el-dialog title="分拆费用" :visible.sync="dialogFormVisible" size="tiny">
                <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="51px" class="demo-ruleForm">
                  <el-form-item
                    label="金额"
                    prop="money"
                    :rules="[
                      { required: true, message: '每笔分拆金额不能为空'},
                      { type: 'number', message: '每笔分拆金额必须为数字值'}
                    ]"
                  >
                  <el-input type="money" v-model.number="numberValidateForm.money" :autofocus="true" auto-complete="off" placeholder="请输入每笔分拆金额"></el-input>
                  </el-form-item>
                  <el-button class="merge-btn" type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
                </el-form>
              </el-dialog>
            </el-tab-pane>
            <el-tab-pane label="应付账单">
              <payList></payList>
            </el-tab-pane>
            <el-tab-pane label="退租账单">
              <payRentList></payRentList>
            </el-tab-pane>
          </el-tabs>
      </main>
  </div>
</template>
<script>
import $ from 'jquery'
import areaSelect from '../components/areaSelect'  // 公共片区筛选组件
import commonHead from '../components/commonHead'  // 头部组件
import collectList from '../components/collectList' // 应收列表组件
import payDetail from '../components/payDetail' // 费用详情组件
import payList from '../components/payList' // 应付账单组件
import payRentList from '../components/payRentList' // 退租账单组件
import task from '../components/task' // 流程列表组件
const height1 = $(window).height() - 191
var $this = this
export default {
  name: 'index',
  data: function () {
    $this = this
    return {
      // 城市筛选data
      areaData: [],
      taskareaData: [],
      inputTask: '',
      // 根据状态显示时间段筛选
      selectedShow: false,
      // 控制财务人员按钮审批
      isRole: '',
      isYunyingRole: '',
      isGudong: this.$store.state.currentUser.isGudong,
      // 费用列表筛选最小最大时间
      minTime: '',
      maxTime: '',
      // 费用列表根据状态筛选
      rents: ['全部', '未收款', '支付成功', '财务已确认'],
      // 流程筛选筛选
      rents2: ['全部', '出租流程', '换租流程', '退租流程', '续租流程', '转租流程', '维保流程'],
      activeName: '全部',
      activeName2: '出租流程',
      noData: false,
      heigh: {
        height: height1 + 'px'
      },
      dialogFormVisible: false,
      numberValidateForm: {
        money: ''
      },
      yqShow: true,
      payId: '', // 每笔费用id
      searchDiv: false, // 搜索下拉框
      moneyType: '金额类型',
      moneyType2: '财务类型',
      input: '', // 搜索输入默认值
      listData: [], // 列表数据
      taskData: [], // 任务列表数据
      bean: '', // 筛选条件
      taskBean: '', // 流程筛选条件
      pagesize: 10, // 默认每页数据量
      cur_page: 1,   // 当前页码
      totalCount: 0, // 默认数据总数
      Statistics: '',
      detailShow: {
        show: false
      },
      payData: {},
      searchData: '',
      int: 0,
      autofocus: true,
      houseLists: {
        data: [],
        length: 0
      }, // 搜索出来的房源列表
      contractLists: {
        data: [],
        length: 0
      }, // 搜索出来的房源列表
      mix: {
        search: this.$store.state.searchUrl + 'both' // 搜索引擎
      }
    }
  },
  components: {
    areaSelect,
    collectList,
    commonHead,
    payDetail,
    payList,
    payRentList,
    task
  },
  computed: {
    // 仅读取，值只须为函数
    height: function () {
      return 1282 * 1205 / 2348
    }
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
      } else if (command === '手续费') {
        this.bean.payPurposeType = 'MANAGECOST'
      }
      this.loadData(this.bean)
    },
    handleCommand2 (command) {
      console.log(command)
      this.moneyType2 = command
      if (command === '全部') {
        this.bean.financeType = null
      } else if (command === '押金') {
        this.bean.financeType = 'DESP'
      } else if (command === '抵扣') {
        this.bean.financeType = 'DISC'
      } else if (command === '定金') {
        this.bean.financeType = 'EARNEST'
      }
      this.loadData(this.bean)
    },
    getUnitId: function (data) {
      this.bean.zoneId = data
      this.loadData(this.bean)
    },
    getTaskUnitId: function (data) {
      this.taskBean.selectUnitId = data
      this.loadTaskData(this.taskBean)
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
    // 加载第一次城市筛选
    loadFirst: function (e) {
      this.$http.get(this.$store.state.accountUrl + 'user/info/id/' + this.$store.state.currentUser.uid,
      ).then(function (response) {
        var data = response.data
        if (data.code === 200) {
          this.$http.get(this.$store.state.accountUrl + 'unit/info/' + data.data.unitid, {
          }).then(function (response) {
            var data = response.data
            if (data.code === 200) {
              this.areaData.push({
                id: data.data.id,
                name: data.data.name
              })
              this.taskareaData.push({
                id: data.data.id,
                name: data.data.name
              })
            }
          }, function (response) {
            console.log(response.status)
          })
        }
      }, function (response) {
        console.log(response.status)
      })
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
    selected2 (rent) {
      this.activeName2 = rent
      if (rent === '全部') {
        this.taskBean.taskType = null
      } else if (rent === '出租流程') {
        this.taskBean.taskType = 'PROCESS-KEY-RENT-V'
      } else if (rent === '换租流程') {
        this.taskBean.taskType = 'PROCESS-KEY-RENT-CHANGE'
      } else if (rent === '退租流程') {
        this.taskBean.taskType = 'PROCESS-KEY-TERMINATE'
      } else if (rent === '续租流程') {
        this.taskBean.taskType = 'PROCESS-KEY-RENEWAL'
      } else if (rent === '转租流程') {
        this.taskBean.taskType = 'PROCESS-KEY-SUBLET'
      } else if (rent === '维保流程') {
        this.taskBean.taskType = 'PROCESS-KEY-MAINTAIN'
      }
      this.loadTaskData(this.taskBean)
    },
    // 费用列表同级选中,根据状态筛选
    selected (rent) {
      this.activeName = rent
      if (rent === '全部') {
        this.bean.orderPhase = null
        this.selectedShow = false
        this.bean.orderStatus = null
        this.bean.minPayTime = null
        this.bean.maxPayTime = null
        this.minTime = null
        this.maxTime = null
      } else if (rent === '未收款') {
        this.selectedShow = false
        this.bean.orderPhase = 'UnPaid'
        this.bean.orderStatus = null
        this.bean.minPayTime = null
        this.bean.maxPayTime = null
        this.minTime = null
        this.maxTime = null
      } else if (rent === '支付成功') {
        this.selectedShow = true
        this.bean.orderPhase = 'Paid'
        this.bean.orderStatus = null
      } else if (rent === '财务已确认') {
        this.selectedShow = true
        this.bean.orderPhase = null
        this.bean.orderStatus = 'CONFIRM'
      }
      this.loadData(this.bean)
    },
    // 分拆费用
    split (props) {
      this.payId = this.listData[props.index].id
      this.dialogFormVisible = true
    },
    // 提交分拆费用表单
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 请求分拆费用接口
          this.$http.post(this.$store.state.payUrl + 'split', {
            amount: this.numberValidateForm.money * 1000,
            id: this.payId
          }).then(function (response) {
            var data = response.data
            if (data.code === 200) {
              this.dialogFormVisible = false
              this.$refs[formName].resetFields()
              this.$message('费用分拆成功')
              // 待收列表数据加载
              this.loadData(this.bean)
            }
          }, function (response) {
            console.log(response.status)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    searchTime () {
      if (this.minTime && this.maxTime) {
        this.bean.minPayTime = Date.parse(this.minTime)
        this.bean.maxPayTime = Date.parse(this.maxTime)
        this.loadData(this.bean)
      } else {
        this.bean.minPayTime = null
        this.bean.maxPayTime = null
        this.loadData(this.bean)
      }
    },
    // 小管家确认线下已收钱
    confirmMoney (props) {
      this.$prompt('是否确定已收款?(点击确定后代表线下已收钱)', '提示', {
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
          orderStatus: 'PDOFF',
          statusChangeMemo: value
        }).then(function (response) {
          var data = response.data
          if (data.code === 200) {
            this.loadData(this.bean)
            this.$message({
              type: 'info',
              message: '收款成功'
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
    // 添加财务账单备注
    addTip (props) {
      let memo
      if (this.listData[props.index].memo === null) {
        memo = ''
      } else {
        memo = this.listData[props.index].memo
      }
      this.$prompt('添加账单备注', '提示', {
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
          memo: memo + value + '(' + this.$store.state.currentUser.username + new Date().toLocaleDateString().replace(/\//g, '-') + new Date().toLocaleTimeString() + ')'
        }).then(function (response) {
          var data = response.data
          if (data.code === 200) {
            this.$message({
              type: 'info',
              message: '添加成功'
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
    // 财务已确认方法
    confirmCollect (props) {
      this.$prompt('是否确定已收款?(点击确定代表财务已收钱)', '提示', {
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
              message: '确认成功'
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
    submit () { // 刷新列表
      this.$options.methods.loadTaskData(this.taskBean)
    },
    loadTaskData (taskBean) {
       // 请求待办任务的数据
      this.$http.post(this.$store.state.workflowUrl + 'tasks', taskBean)
      .then(function (response) {
        var data = response.data
        if (data.data.length !== 0) {
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
        this.loadTaskData(this.taskBean)
      } else if (tab.label === '应收账单') {
        this.loadData(this.bean)
      }
    },
    // 根据登录用户id获取用户角色
    getRole () {
      this.$http.get(this.$store.state.accountUrl + 'role/list/u/' + this.$store.state.currentUser.uid
      ).then(function (response) {
        var data = response.data
        if (data.code === 200) {
          let list = data.data
          for (var i = 0; i <= list.length - 1; i++) {
            if (list[i].name === '出纳') {
              this.isRole = true
              localStorage.removeItem('isGudong')
            } else if (list[i].name === '合作伙伴') {
              this.$store.dispatch('getGudong', {'isGudong': true})
            } else if (list[i].name === '运营部经理' || list[i].name === '运营主管' || list[i].name === '运营专员') {
              this.isYunyingRole = true
            } else {
              localStorage.removeItem('isGudong')
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
    searchEvent (value) {
      this.searchDiv = false
      this.houseLists.data = []
      this.houseLists.length = 0
      this.contractLists.data = []
      this.contractLists.length = 0
      var req = {}
      req.keyword = value
      req.loginId = this.$store.state.currentUser.uid
      let url = this.mix.search
      this.$http.post(url, req, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/*; charset=utf-8'
        }
      }).then(res => {
        if (res.body.code === 200) {
          if (res.body.data.searchHouseSpaceBeanList === null) {
            this.houseLists.data = []
            this.houseLists.length = 0
          } else {
            this.houseLists.data = res.body.data.searchHouseSpaceBeanList
            this.houseLists.length = res.body.data.searchHouseSpaceBeanList.length
          }
          if (res.body.data.searchContractBeanList === null) {
            this.contractLists.data = []
            this.contractLists.length = 0
          } else {
            this.contractLists.data = res.body.data.searchContractBeanList
            this.contractLists.length = res.body.data.searchContractBeanList.length
          }
          this.searchDiv = true
        } else {
          this.searchDiv = true
        }
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
      businessType: 'RENT',
      financeTypeSet: 'RECEIVABLE'
    }
    this.taskBean = {
      userId: this.$store.state.currentUser.uid,
      taskType: 'PROCESS-KEY-RENT-V',
      order: 'desc'
    }
    // 根据用户id获取用户角色
    this.getRole()
    // 根据用户id获取用户角色列表
    this.$store.dispatch('getRole', {'id': this.$store.state.currentUser.uid})
    // 待收列表数据加载
    this.loadData(this.bean)
    this.loadTaskData(this.taskBean)
    this.loadFirst()
    // 数据统计
    // this.count()
    this.$root.task.$on('submitForm', value => {
      setTimeout(this.loadTaskData(this.taskBean), 100) // 加载任务列表
    })
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
  margin-top: 40px;
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
















