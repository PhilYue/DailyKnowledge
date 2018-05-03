<template>
  <div class="houseManager">
    <!-- 右侧主内容区 -->
    <div class="main-right yxr-ui" >
      <div class='search f-cb'>
        <div class='main-right-search-span'>
          <ul>
            <li v-for='(rent, ind) in searchData' class="searchList">
              <!-- <p :value="rent.value">{{ rent.head }}</p> -->
              <div v-if="ind === 0" style="display:inline-block;"><a v-for='(item, index) in rent.content' :title='item.text' :class='{selectActive: index ==0}' @click="cleanList(rent.value, item.value)" :value="item.value">{{item.text}}</a></div>
              <div v-if="ind !== 0" style="display:inline-block; width:calc(100% - 100px);"><a v-for='(item, index) in rent.content' :title='item.text' :class='{selectActive: index ==0}' :value="item.value">{{item.text}}</a></div>
            </li>
          </ul>
        </div>
        <div class='main-left-search-span'>
          <el-input placeholder="请输入房源地址" auto-complete="off" style="width:300px" @keyup.enter.native="cleanList1" v-model="searchList.location"></el-input>
          <el-button type='primary' @click="cleanList1">搜索</el-button>
        </div>
      </div>
      <el-button type='primary' @click="repairAdd">新建维修</el-button>
      <div class="cleanBody conList" v-if="totlePage !== 0">
        <ul>
          <li class="list-contain-div" v-for="(item, index) in tableData">
            <div>
              <el-row>
                <el-col :span="4">
                  <div class="lin55">
                    <el-tooltip class="item" effect="light" content="订单编号" placement="top">
                      <p>{{ item.formNumber }}</p>
                    </el-tooltip>
                  </div>
                </el-col>
                <el-col :span="4">
                  <el-tooltip class="item" effect="light" content="租客信息" placement="top-start">
                    <div class="lin55">
                      <p class="pad8" style="line-height:20px;">{{ item.tenantName }}</p>
                      <p class="pad8" style="line-height:20px;">{{ item.tenantPhone }}</p>
                    </div>
                  </el-tooltip>
                </el-col>
                <el-col :span="5">
                  <div class="lin55" style="line-height:20px; vertical-align:middle; display:table-cell">
                    <el-tooltip class="item" effect="light" content="状态" placement="top">
                      <span class="houseSpaceStatus" :value="item.houseSpaceStatus">{{ item.status }}</span>
                    </el-tooltip>
                  </div>
                </el-col>
                <el-col :span="9">
                  <p class="pad8"><el-tooltip class="item" effect="light" content="地址" placement="top"><span>{{ item.location }}</span></el-tooltip></p>
                  <p class="pad8"><el-tooltip class="item" effect="light" content="时间" placement="top"><span>{{ item.time }}</span></el-tooltip></p>
                </el-col>
                <el-col :span="2">
                  <div class="lin55">
                <div class="el-dropdown">
                  <button type="button" class="el-button el-button--default" @click="showDetail(item, index)">
                  <span class="el-dropdown-link">
                    详情<i class="el-icon-caret-bottom el-icon--right"></i></span>
                  </button>
                    <!-- <ul class="el-dropdown-menu" v-if="item.status !== '已完成' && item.status !== '已取消'">
                      <li class="el-dropdown-menu__item" @click="showDetail(item, index)">查看详情</li>
                      <li class="el-dropdown-menu__item" v-if="item.status === '待领取'" @click="Orders(item)">领取工单</li>
                      <li class="el-dropdown-menu__item" v-if="item.status === '已领取'" @click="cleanOver(item)">维修完成</li>
                      <li class="el-dropdown-menu__item" v-if="item.status === '待回访'" @click="feedback(item)">回访</li>
                      <li class="el-dropdown-menu__item" v-if="item.status === '待领取'" @click="cancel(item)">取消</li>
                    </ul> -->
                </div>
                  </div>
                </el-col>
                <slot></slot>
              </el-row>
            </div>
          </li>
        </ul>
      </div>
          <h3 v-if="totlePage === 0 && loading !== 0" style="text-align:center; margin-top:70px;">暂无数据</h3>
          <div class="block" v-if="totlePage > 0">
            <el-pagination class="paging" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totlePage"></el-pagination>
          </div>
    </div>
    <!-- 新建弹窗开始 -->
    <el-dialog title="新增维修" :visible.sync="repairAddVisible">
      <repairAdd @closeForm="closeForm" :addclickCount="addclickCount"></repairAdd>
    </el-dialog>
    <!-- 新建弹窗结束 -->

    <!-- 完成弹窗开始 -->
    <el-dialog title="维修反馈" :visible.sync="repairOverVisible">
      <repairOver @closeForm="closeForm" :repairId="repairId" serviceType="repair" :clickCount="addclickCount"></repairOver>
    </el-dialog>
    <!-- 完成弹窗结束 -->

    <!-- 反馈弹窗开始 -->
    <el-dialog title="回访" :visible.sync="feedbackVisible">
      <feedback @closeForm="closeForm" :options="options" :repairId="repairId" serviceType="repair" :clickCount="addclickCount"></feedback>
    </el-dialog>
    <!-- 反馈弹窗结束 -->

    <!-- 维修详情开始 -->
    <serviceRepair :conDetail="conDetailShow" :clickCount="addclickCount1" houseDetailText="维修详情" conType="repair" :serviceId="serviceId" @closeDetail="closeDetail"></serviceRepair>
    <!-- 维修详情结束 -->
  </div>
</template>
<script>
import $ from 'jquery'
import repairAdd from '../../components/repairAdd'  //  新建维修
import repairOver from '../../components/repairOver'  //  完成维修
import feedback from '../../components/repairFeedback'  //  完成维修
import serviceRepair from '../../components/serviceRepair'  //  完成维修
var $this = this
export default {
  name: 'rent',
  beforeCreate: function () {
    var mix = this.$store.state.serviceUrl + 'queryListByParams' // 维修列表
    let req = {}
    req.serverType = 'MAINTAIN'
    req.pageNo = 1
    req.pageSize = 10
    req.userId = this.$store.state.currentUser.uid
    this.$options.methods.listSearch(this, mix, req)
  },
  data: function () {
    $this = this
    return {
      activeName: 'first',
      loading: 0,
      options: [],
      isGudong: this.$store.state.currentUser.isGudong,
      searchData: [ // 搜索数据
        {
          head: '订单状态：',
          value: 'status',
          content: [
            {
              text: '全部',
              value: ''
            },
            {
              text: '待领取',
              value: 'REQACCEPT'
            },
            {
              text: '已领取',
              value: 'ACCEPTED'
            },
            {
              text: '待回访',
              value: 'ALSERVER'
            },
            {
              text: '已完成',
              value: 'SUCCESS'
            },
            {
              text: '已取消',
              value: 'ALCANCER'
            }
          ]
        }
      ],
      searchList: { // 搜索信息
        serverType: 'MAINTAIN',
        location: ''
      },
      clickCount: 0,
      labelWidth: '120px',
      detailListwidth: 'width:40%',
      tableData: [], // 保洁列表
      dataDetail: {
        bussionId: 'BR123456',
        unitName: '北软',
        keywordAddress: '1111',
        rental: 'xxx',
        phone: '15155551151',
        time: '2017-7-5',
        memo: 'adsdadsasads',
        status: '待领取',
        charge: '公司',
        time1: '2017-7-6'
      },
      int: 0,
      currentPage: 1,
      pageSize: 10,
      totlePage: 0,
      repairAddVisible: false,
      repairOverVisible: false,
      feedbackVisible: false,
      repairId: '',
      addclickCount: 0,
      addclickCount1: 0,
      conDetailShow: false,
      serviceId: '',
      mix: {
        receive: this.$store.state.serviceUrl + 'receiveMaintenance', // 接单
        list: this.$store.state.serviceUrl + 'queryListByParams', // 维修列表
        cancel: this.$store.state.serviceUrl + 'deleteMaintenanceFormById/' // 取消订单
      }
    }
  },
  components: {
    repairAdd, repairOver, feedback, serviceRepair
  },
  mounted: function () {
    if (this.int === 0) {
      $('body').click(function (event) {
        let _target = event.target
        if (_target.closest('.list-contain-div') === null && _target.closest('.dialog') === null && $this.conDetailShow === true) {
          $this.conDetailShow = false
          $this.addclickCount1++
        }
      })
      this.int = 0
    }
  },
  methods: {
    cleanList (value, data) {
      this.searchList[value] = data
      this.currentPage = 1
      this.$options.methods.search(this)
      console.log(this.searchList)
    },
    cleanList1 () {
      this.currentPage = 1
      this.$options.methods.search(this)
    },
    showDetail (data, index) {
      this.conDetailShow = true
      this.addclickCount1++
      this.serviceId = data.id
    },
    showDetail1 (data, index, ev) {
      if (ev.target.closest('.el-dropdown-menu') === null) {
        this.conDetailShow = true
        this.addclickCount1++
        this.serviceId = data.id
      }
    },
    closeForm () { // 关闭新增维系弹窗
      this.repairAddVisible = false
      this.repairOverVisible = false
      this.feedbackVisible = false
      this.addclickCount++
      this.dataDetail = false
      let req = {}
      req.serverType = 'MAINTAIN'
      req.pageNo = this.pageNo
      req.pageSize = this.pageSize
      req.userId = this.$store.state.currentUser.uid
      req.status = this.searchList.status
      this.$options.methods.listSearch(this, this.mix.list, req)
    },
    repairAdd () { // 打开新增维修弹窗
      this.repairAddVisible = true
      this.addclickCount++
    },
    repairOver (item) { // 打开结束维修弹窗
      this.repairOverVisible = true
      this.repairId = item.repairId
    },
    feedback (item) {
      this.feedbackVisible = true
      this.repairId = item.id
    },
    listTransform (data) {
      var startTime = new Date(data.preAccessTimeL)
      data.preAccessTimeL = startTime.getFullYear() + '-' + (startTime.getMonth() + 1) + '-' + startTime.getDate()
      var createTime = new Date(data.createTimeL)
      data.createTime = createTime.getFullYear() + '-' + (createTime.getMonth() + 1) + '-' + createTime.getDate()
      var originatorTimeL = new Date(data.originatorTimeL)
      data.originatorTimeL = originatorTimeL.getFullYear() + '-' + (originatorTimeL.getMonth() + 1) + '-' + originatorTimeL.getDate()
      switch (data.status) {
        case 'REQACCEPT':
          data.status = '待领取'
          break
        case 'ACCEPTED':
          data.status = '已领取'
          break
        case 'PROCESSING':
          data.status = '正在处理'
          break
        case 'REQFOLLOW':
          data.status = '待跟进'
          break
        case 'ALSERVER':
          data.status = '待回访'
          break
        case 'ALVISIT':
          data.status = '已回访'
          break
        case 'SUCCESS':
          data.status = '已完成'
          break
        case 'ALCANCER':
          data.status = '已取消'
          break
      }
      switch (data.accountability) {
        case 'UNDEFINITION':
          data.accountability = '暂无归属'
          break
        case 'COMPANY':
          data.accountability = '公司'
          break
        case 'INDIVIDUAL':
          data.accountability = '个人'
          break
      }
      return data
    },
    stateTransform (data) {
      for (let i = 0; i < data.maintenanceServerListBeans.length; i++) {
        let res = ''
        console.log(data.maintenanceServerListBeans[i].processResult)
        switch (data.maintenanceServerListBeans[i].processResult) {
          case 'SUCCESS':
            res = '维修成功'
            break
          case 'FAILURE':
            res = '维修失败'
            break
          case 'SERSUCCE':
            res = '服务成功'
            break
        }
        data.maintenanceServerListBeans[i].processResult = res
        switch (data.maintenanceServerListBeans[i].visitResult) {
          case 'SUCCESS':
            res = '服务成功'
            break
          case 'FAILURE':
            res = '服务失败'
            break
          case 'SERSUCCE':
            res = '服务成功'
            break
        }
        data.maintenanceServerListBeans[i].visitResult = res
      }
      data.length = data.maintenanceServerListBeans.length
      data.processResult = data.maintenanceServerListBeans[data.length - 1].processResult
      data.processResultMemo = data.maintenanceServerListBeans[data.length - 1].processResultMemo
      data.returnVisitResult = data.maintenanceServerListBeans[data.length - 1].returnVisitResult
      return data
    },
    search (_this) {
      let req = {}
      req.serverType = 'MAINTAIN'
      req.pageNo = _this.currentPage
      req.pageSize = _this.pageSize
      req.userId = _this.$store.state.currentUser.uid
      $.extend(true, req, _this.searchList)
      _this.$options.methods.listSearch(_this, _this.mix.list, req)
    },
    listSearch (_this, url, req) { // 搜索清洁列表
      _this.loading = 0
      _this.$http.post(url, req).then(function (res) {
        if (res.body.code === 200) {
          if (res.body.data !== 0) {
            for (var i in res.body.data.list) {
              res.body.data.list[i] = _this.$options.methods.listTransform(res.body.data.list[i])
              let start = new Date(res.body.data.list[i].preStartingTime)
              let end = new Date(res.body.data.list[i].preFinalTime)
              res.body.data.list[i].time = start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate() + ' ' + start.getHours() + ':00-' + end.getHours() + ':00'
            }
            _this.tableData = res.body.data.list
            _this.totlePage = res.body.data.totalCount
            _this.loading = 1
          } else {
            _this.tableData = []
            _this.totlePage = 0
            _this.loading = 1
          }
        } else {
          _this.tableData = []
          _this.totlePage = 0
          _this.loading = 1
        }
      })
    },
    handleSizeChange (value) { // 每页显示量改变
      this.pageSize = value
      this.$options.methods.search(this)
    },
    handleCurrentChange (value) { // 当前页改变
      this.currentPage = value
      this.$options.methods.search(this)
    },
    Orders (value) { // 抢单
      this.$store.commit('getMidWorkflowToken', {'processKey': value.id, 'variables': {selectOption: 1, nextTaskAssignee: this.$store.state.currentUser.uid}})
      let req = {}
      req.formId = value.id
      req.userId = this.$store.state.currentUser.uid
      this.$http.post(this.mix.receive, req, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/*; charset=utf-8',
          'userId': this.$store.state.currentUser.uid,
          'workflowToken': this.$store.state.workflowToken,
          'taskId': this.$store.state.taskId,
          'processInstanceId': this.$store.state.processInstanceId,
          'processBusinessKey': value.id
        }
      }).then(function (res) {
        if (res.body.code === 200) {
          this.$options.methods.search(this)
          this.$message({
            message: '领取工单成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '领取工单失败',
            type: 'error'
          })
        }
      })
    },
    cleanOver (value) {
      this.repairOverVisible = true
      this.repairId = value.id
    },
    cancel (value) {
      this.$store.commit('getMidWorkflowToken', {'processKey': value.id, 'variables': {selectOption: 1}})
      let msg = '确认取消' + value.formNumber + '订单？'
      let _this = this
      let url = this.mix.cancel + value.id + '/123asdfasffff/'
      this.$confirm(msg)
      .then(_ => {
        _this.$http.get(url, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/*; charset=utf-8',
            'userId': this.$store.state.currentUser.uid,
            'workflowToken': this.$store.state.workflowToken,
            'taskId': this.$store.state.taskId,
            'processInstanceId': this.$store.state.processInstanceId,
            'processBusinessKey': value.id
          }
        }).then(function (res) {
          if (res.body.code === 200) {
            this.$message({
              message: '取消成功',
              type: 'success'
            })
            this.$options.methods.search(this)
          } else {
            this.$message({
              message: '取消失败',
              type: 'error'
            })
          }
        })
      })
      .catch(_ => {})
    },
    closeDetail () {
      this.conDetailShow = false
      this.addclickCount1++
    }
  },
  created () {
    this.$store.state.adminleftnavnum = '/service/repair'
    this.$store.state.topIndex = '/service/repair'
  }
}
</script>
<style scoped>
/* @import '../../../static/css/style.css'; */
@import '../../../static/css/app.css';
/* 主内容区 */
main .main-right{padding: 30px; }
.el-col .tableP{ float: none; width: 100%; margin-top: 50px; text-align: left; }
.list-contain-div{
  padding: 5px 25px 0;
  font-size: 13px;
  color: #555;
  border-top:1px solid #eee;
}
.list-contain-div .el-row{
  padding-bottom: 5px;
  cursor: pointer;
}
.list-contain-div:first-child{
  border-top:none;
}
.lin55{
  height: 55px;
  line-height: 55px;
}
.pad8{
  padding: 8.5px 0;
}
.pad9{
  padding: 9px 0;
}
.el-dropdown{
  z-index: 1;
}
.search .main-right-search-span a{
  /*width: 70px;*/
  margin-right: 20px;
  margin-left: 0;
}
.el-dropdown-menu{
  top: 42px;
  transition: all .5s;
  opacity: 0;
  -webkit-opacity: 0;
  display: none;
  z-index: 0;
  left: auto;
  /*right: 0;*/
  background: #fff;
}
.el-dropdown:hover{
  z-index: 2;
  /*transition: all .1s;*/
}
.el-dropdown:hover .el-dropdown-menu{
  opacity: 1;
  -webkit-opacity: 1;
  z-index: 2;
  display: block;
}
.houseManager .houseSpaceStatus{
  width: 95px;
}
.pad8{
  padding: 3px 0;
}
.clean_detail{
  border-top: 1px solid #e6e6e6;
  padding: 10px 3%;
  background: #fafdff;
  display: none;
}
.el-form-item{
  margin-bottom: 0;
}
.block{
  text-align: right;
  margin-top: 20px;
}
.search{
  margin-bottom: 0;
}
.el-dropdown-menu{
  font-size: 14px;
}
</style>
















