<template>
  <div>
    <div class="list-contain-div" v-for="(item,index1) in taskData">
      <div>
        <!-- 顶部流程名字和编号 -->
        <el-row class="bg-col-gray">
          <el-col :span="3">
            <div v-if="item.processBusinessType === 'maintain'" class="lin40 bg-name2">
              {{item.processDefinitionName}}
            </div>
            <div v-else class="lin40 bg-name">
              {{item.processDefinitionName}}
            </div>
          </el-col>
          <el-col :span="4">
          <!-- 维保流程 -->
            <div v-if="item.processBusinessType === 'maintain'" class="lin40">
              工单号:{{item.variables.formNumber}}
            </div>
          <!-- 新建退租流程 -->
            <div v-if="item.processBusinessType === 'rent.terminate'" class="lin40">
              合同编号:{{item.variables.contractNum}}
            </div>
          <!-- 新建出租续租合同流程 -->
            <div v-if="item.processBusinessType === 'renewal' || item.processBusinessType === 'rent.change' || item.processBusinessType === 'rent.sublet' || item.processBusinessType === 'rent'" class="lin40">
              合同编号:{{item.variables.contractNumber}}
            </div>
          </el-col>
          <el-col :span="3">
            <div class="lin40">任务发起人:{{item.processStartUserName}}</div>
          </el-col>
          <el-col :span="13"></el-col>
        </el-row>

        <el-row>
        <!-- 任务名称 -->
          <el-col :span="3">
            <div class="lin55 padL">
            {{item.taskDefinitionName}}
            </div>
          </el-col>
        <!-- 任务发起人名字和手机号 -->
          <el-col :span="4">
          <!-- 维保流程 -->
            <div v-if="item.processBusinessType === 'maintain'" class="pad8">
              <p v-if="item.variables.tenantName">{{item.variables.tenantName}}</p>
              <p v-if="item.variables.tenantPhone">{{item.variables.tenantPhone}}</p>
            </div>
          <!-- 退租流程 -->
            <div class="pad8" v-if="item.processBusinessType === 'rent.terminate'">
              <div>
                <p v-if="item.variables.userName">{{item.variables.userName}}</p>
                <p v-if="item.variables.userPhone">{{item.variables.userPhone}}</p>
              </div>
            </div>
          <!-- 出租流程 -->
            <div class="pad8" v-if="item.processBusinessType === 'renewal' || item.processBusinessType === 'rent.change' || item.processBusinessType === 'rent.sublet' || item.processBusinessType === 'rent'">
              <div v-for="(item,index3) in taskData[index1].variables.users">
                <p v-if="item.representative === 'PARTB'">{{item.userName}}</p>
                <p v-if="item.representative === 'PARTB'">{{item.userPhone}}</p>
              </div>
            </div>
          </el-col>
        <!-- 合同期间和房源地址1，2 -->
          <el-col :span="7">
          <!-- 维保流程 -->
            <div v-if="item.processBusinessType === 'maintain'" class="lin55">
              <!-- <p>合同期间</p> -->
              {{item.variables.location}}
            </div>
          <!-- 新建出租流程 -->
            <div v-if="item.processBusinessType === 'renewal' || item.processBusinessType === 'rent.change' || item.processBusinessType === 'rent.sublet' || item.processBusinessType === 'rent'" class="pad8">
              <p>{{new Date(item.variables.startTime).toLocaleDateString()}} - {{new Date(item.variables.endTime).toLocaleDateString()}}</p>
              <p>{{item.variables.houseSpaceName}}</p>
            </div>
          <!-- 新建退租流程 -->
            <div v-if="item.processBusinessType === 'rent.terminate'" class="pad8">
              <p>{{new Date(item.variables.startTime).toLocaleDateString()}} - {{new Date(item.variables.endTime).toLocaleDateString()}}</p>
              <p>{{item.variables.houseSpaceName}}</p>
            </div>
          </el-col>
          <!-- 业务的数据 -->
          <el-col :span="7">
          <!-- 维保流程 -->
            <div class="pad8" v-if="item.processBusinessType === 'maintain'">
              <p>期望上门时间:
              {{new Date(item.variables.preStartingTime).getFullYear() + '-' + (new Date(item.variables.preStartingTime).getMonth() + 1) + '-' + new Date(item.variables.preStartingTime).getDate() + ' ' + new Date(item.variables.preStartingTime).getHours() + ':00-' + new Date(item.variables.preFinalTime).getHours() + ':00'}}
              </p>
              <p>
                <span v-if="item.variables.resFixedAssetsBeans[0]">维修物品:{{item.variables.resFixedAssetsBeans[0]}},</span>
                <span>备注:{{item.variables.memo}}</span>
              </p>
            </div>
          <!-- 新建续租流程 -->
            <div class="pad8" v-if="item.processBusinessType === 'renewal' || item.processBusinessType === 'rent.change' || item.processBusinessType === 'rent.sublet' || item.processBusinessType === 'rent'">
              <p>
                <span>租金:{{(item.variables.rental / 1000).toFixed(2)}}</span>
                <span>押金:{{(item.variables.deposit / 1000).toFixed(2)}}</span>
                <span v-if="item.variables.guidePrice">指导价:{{(item.variables.guidePrice / 1000).toFixed(2)}}</span>
              </p>
              <p>备注:{{item.variables.memo}}</p>
            </div>
          <!-- 新建出租流程 -->
            <div class="pad8" v-if="item.processBusinessType === 'rent.terminate'">
              <p>
                <span>租金:{{(item.variables.rental / 1000).toFixed(2)}}</span>
                <span>押金:{{(item.variables.deposit / 1000).toFixed(2)}}</span>
                <span v-if="item.variables.guidePrice">指导价:{{(item.variables.guidePrice / 1000).toFixed(2)}}</span>
              </p>
              <p>备注:{{item.variables.memo}}</p>
            </div>
          </el-col>
          <!-- 进度 -->
          <!-- <el-col :span="3">
            <div class="lin55 pos-rel">
            <el-dropdown menu-align="start">
              <span><i class="icon"></i>进度</span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <el-steps class="steps" finish-status="finish" direction="vertical" :active="3">
                    <el-step title="1天前" description="描述描述"></el-step>
                    <el-step title="1天前" description="描述描述"></el-step>
                    <el-step title="明天" description="描述描述"></el-step>
                  </el-steps>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            </div>
          </el-col> -->
          <el-col :span="3" class="pad9">
            <el-dropdown menu-align="start">
              <el-button>
                <span>操作</span>
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(item,index2) in taskData[index1].operation.options" key="index2" @click.native="operation(index1, item.hint, item.actionUrl, item.requestMethod, item.actionType, item.workflowParams, item.actionTarget, item.businessParams, item.options)">{{item.hint}}</el-dropdown-item>
                <el-dropdown-item @click.native="openDetails($event, index1)">详情</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 预定表单组件 -->
    <reserve-form :reserveForm="reserveForm" :reserveFormData="reserveFormData"></reserve-form>
    <!-- 新建合同表单组件 -->
    <contract-form :options="options" :contractForm="contractForm" :contractFormData="contractFormData"></contract-form>
    <!-- 维修反馈 -->
    <el-dialog title="服务反馈" :visible.sync="repairOverVisible">
      <repairOver @closeForm="closeForm" :options="options" :repairId="repairId" :clickCount="clickCount" serviceType="repair"></repairOver>
    </el-dialog>
    <!-- 回访 -->
    <el-dialog title="回访" :visible.sync="feedbackVisible">
      <feedback @closeForm="closeForm" :options="options" :repairId="repairId" :clickCount="clickCount" serviceType="repair"></feedback>
    </el-dialog>
    <!-- 维修详情开始 -->
    <serviceRepair :conDetail="conDetailShow" :clickCount="addclickCount1" houseDetailText="维修详情" conType="repair" :serviceId="serviceId" @closeDetail="closeDetail"></serviceRepair>
    <!-- 合同详情组件 -->
    <contract-detail :terShow="terShow" :oldLeaseId="oldLeaseId" :detailShow="detailShow" :contractId="contractId"></contract-detail>
  </div>
</template>
<script>
import $ from 'jquery'
// 导入预定表单组件
import ReserveForm from '@/components/rent/ReserveForm'
// 导入预定表单组件
import ContractForm from '@/components/rent-contract/ContractForm'
// 维修反馈
import repairOver from '@/components/repairOver'
// 回访
import feedback from '@/components/repairFeedback'
//  维修详情
import serviceRepair from '@/components/serviceRepair'
// 合同详情组件
import ContractDetail from '@/components/rent-contract/ContractDetail'
var $this = this
export default {
  name: 'task',
  data: function () {
    $this = this
    return {
      terShow: '',
      role: '',
      reserveForm: {
        show: false
      },   // 预定表单控制显示
      reserveFormData: {},   // 预定表单数据显示
      contractForm: {
        show: false  // 合同表单控制显示
      },
      contractId: '',
      repairOverVisible: false,
      feedbackVisible: false,
      repairId: '',
      options: '',
      clickCount: 0,
      contractFormData: {}, // 合同表单数据
      // 维修详情组件数据
      conDetailShow: true,
      addclickCount1: 0,
      serviceId: '',
      int: 0,
      // 合同详情数据
      detailShow: {
        show: false
      },
      // 旧租约详情
      oldLeaseId: ''
    }
  },
  methods: {
    // 修改状态统一接口POST
    changStatus (apiMethod, url, data, processBusinessKey, processInstanceId, taskId) {
      console.log(apiMethod)
      console.log(url)
      console.log(data)
      if (apiMethod === 'POST') {
        this.$http.post(url,
          data
        , {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/*; charset=utf-8',
            'userId': this.$store.state.currentUser.uid,
            'workflowToken': this.$store.state.workflowToken,
            'taskId': taskId,
            'processInstanceId': processInstanceId,
            'processBusinessKey': processBusinessKey
          }
        }).then(function (response) {
          var data = response.data
          if (data.code === 200) {
            this.$message({
              type: 'info',
              message: '操作成功',
              duration: 1000
            })
            // 回调刷新任务列表
            this.$root.task.$emit('submitForm', 1)
          }
        }, function (response) {
          console.log(response.status)
        })
      } else {
        this.$http.get(url + '/' + data,
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/*; charset=utf-8',
              'userId': this.$store.state.currentUser.uid,
              'workflowToken': this.$store.state.workflowToken,
              'taskId': taskId,
              'processInstanceId': processInstanceId,
              'processBusinessKey': processBusinessKey
            }
          }).then(function (response) {
            var data = response.data
            if (data.code === 200) {
              this.$message({
                type: 'info',
                message: '操作成功',
                duration: 1000
              })
              // 回调刷新任务列表
              this.$root.task.$emit('submitForm', 1)
            }
          }, function (response) {
            console.log(response.status)
          })
      }
    },
    // 流程控制
    operation (index1, hint, actionUrl, requestMethod, actionType, workflowParams, actionTarget, businessParams, options) {
      console.log(this.taskData[index1])
      console.log(actionType)
      console.log(requestMethod)
      console.log(businessParams)
      // 弹框同意取消
      if (actionType === 'confirm') {
        let req = this.taskData[index1]
        this.$store.commit('getMidWorkflowToken', {'processKey': req.processBusinessKey, 'variables': workflowParams})
        // 确定取消弹窗
        this.$confirm('是否确定此操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          callback: (action, instance) => {
            let apiUrl
            // 确定取消弹框
            if (action === 'confirm') {
              // 根据不同流程显示不同URL
              if (req.processBusinessType === 'maintain') {
                // 维保的链接
                apiUrl = this.$store.state.apiUrl + '23300' + actionUrl
              } else if (req.processBusinessType === 'rent') {
                // 新签合同链接
                apiUrl = this.$store.state.apiUrl + '23250' + actionUrl
              } else if (req.processBusinessType === 'renewal' && actionTarget === 'confirm.rent.contract.workflow') {
                // 续租第一步审核链接
                apiUrl = this.$store.state.apiUrl + '21600' + actionUrl
              } else if (req.processBusinessType === 'renewal') {
                // 续租新签合同链接
                apiUrl = this.$store.state.apiUrl + '23250' + actionUrl
              } else if (req.processBusinessType === 'rent.change' && actionTarget === 'confirm.rent.contract.workflow') {
                // 换房第一步审核链接
                apiUrl = this.$store.state.apiUrl + '21600' + actionUrl
              } else if (req.processBusinessType === 'rent.change') {
                // 换房新签合同链接
                apiUrl = this.$store.state.apiUrl + '23250' + actionUrl
              } else if (req.processBusinessType === 'rent.sublet' && actionTarget === 'confirm.rent.contract.workflow') {
                // 转租第一步审核链接
                apiUrl = this.$store.state.apiUrl + '21600' + actionUrl
              } else if (req.processBusinessType === 'rent.sublet') {
                // 转租新签合同链接
                apiUrl = this.$store.state.apiUrl + '23250' + actionUrl
              } else if (req.processBusinessType === 'rent.terminate' && actionTarget === 'confirm.rent.terminate.workflow') {
                // 退租第一步链接
                apiUrl = this.$store.state.apiUrl + '21600' + actionUrl
              } else if (req.processBusinessType === 'rent.terminate') {
                // 退租第二步链接
                apiUrl = this.$store.state.apiUrl + '23150' + actionUrl
              }
              // 如果是合同同意取消
              if (requestMethod === 'POST') {
                let apiData = {}
                for (let i = 0; i <= businessParams.length - 1; i++) {
                  apiData[businessParams[i].key] = businessParams[i].value
                }
                this.changStatus(requestMethod, apiUrl, apiData, req.processBusinessKey, this.taskData[index1].processInstanceId, this.taskData[index1].taskId)
              } else if (requestMethod === 'GET') {
                let apiData = ''
                for (let i = 0; i <= businessParams.length - 1; i++) {
                  apiData += businessParams[i].value + '/'
                  console.log('我是' + apiData)
                }
                this.changStatus(requestMethod, apiUrl, apiData, req.processBusinessKey, this.taskData[index1].processInstanceId, this.taskData[index1].taskId)
              }
            }
          }
        })
      } else {
        // dialog表单
        if (actionTarget === 'dialog.maintain.visit') { // 回访
          this.feedbackVisible = true
          let req = this.taskData[index1]
          this.repairId = req.processBusinessKey
          console.log(options)
          this.options = options
          this.clickCount++
        } else if (actionTarget === 'dialog.maintain.result') { // 维修反馈
          this.repairOverVisible = true
          let req = this.taskData[index1]
          this.repairId = req.processBusinessKey
          this.options = options
          this.clickCount++
        } else if (actionTarget === 'dialog.contract.sign') { // 新建合同
          // 打开合同表单所有的数据都填充上去有就填充没有不填充
          let req = this.taskData[index1]
          this.contractForm.show = true
          this.contractFormData = req.variables
          this.contractFormData.task = true
          this.contractFormData.processBusinessKey = req.processBusinessKey
          this.options = options
        }
      }
    },
    closeForm () {
      this.repairOverVisible = false
      this.feedbackVisible = false
      this.clickCount++
      this.$emit('submit')
    },
    // 查询详情
    openDetails ($event, index1) {
      if ($event.target.innerHTML === '操作') {
      } else {
        // 打开维保详情
        if (this.taskData[index1].processBusinessType === 'maintain') {
          this.conDetailShow = true
          this.addclickCount1++
          this.serviceId = this.taskData[index1].variables.formId
        } else if (this.taskData[index1].processBusinessType === 'rent') {
        // 打开新签合同详情
          this.contractId = this.taskData[index1].variables.contractId
          this.detailShow.show = true
        } else if (this.taskData[index1].processBusinessType === 'renewal' || this.taskData[index1].processBusinessType === 'rent.change' || this.taskData[index1].processBusinessType === 'rent.sublet') {
          // 打开续租转租换房合同和老租约详情
          this.contractId = this.taskData[index1].variables.contractId
          this.detailShow.show = true
          this.oldLeaseId = this.taskData[index1].variables.oldLeaseId
        } else if (this.taskData[index1].processBusinessType === 'rent.terminate') {
          // 打开续租转租换房合同和老租约详情
          this.contractId = this.taskData[index1].variables.contractId
          this.detailShow.show = true
          this.oldLeaseId = this.taskData[index1].variables.id
          this.terShow = true
        }
      }
    },
    closeDetail () {
      this.conDetailShow = false
      this.addclickCount1++
    }
  },
  props: ['taskData'],
  components: {
    ReserveForm,
    ContractForm,
    repairOver,
    feedback,
    serviceRepair,
    ContractDetail
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
  }
}
</script>
<style scoped>
.icon{
  display: inline-block;
  width: 13px;
  height: 13px;
  background: url('../../static/img/steps.png') no-repeat left center;
  background-size: 100% 100%;
  vertical-align: middle;
  position: relative;
  top: -2px;
  right: 5px;
}
.bg-name{
  background: url('../../static/img/blue.png') no-repeat left center;
  color: #fff;
  padding-left: 10px;
  background-size: 80px 24px;
}
.bg-name2{
  background: url('../../static/img/green.png') no-repeat left center;
  color: #fff;
  padding-left: 10px;
  background-size: 80px 24px;
}
.list-contain-div{
  padding: 0!important;
  font-size: 13px;
  color: #555;
  border:1px solid #eee;
  margin-bottom: 10px;
}
.padL{
  padding-left: 10px!important;
}
.lin55{
  height: 55px;
  line-height: 55px;
}
.lin40{
  height: 40px;
  line-height: 40px;
}
.pad8{
  padding: 8.5px 0;
}
.pad9{
  padding: 9px 0;
}
.name-pos{
  position: relative;
  top: -18px;
  right: -8px;
}
.bg-col-gray{
  background-color: #f5f5f5;
}
.steps{
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: -5px;
  margin-left: -100px;
  z-index: 999;
  padding: 10px 38px 0 10px;
  border: 1px solid #d1dbe5;
  box-shadow: 0 2px 4px rgba(0,0,0,.12), 0 0 6px rgba(0,0,0,.12);
}
</style>














