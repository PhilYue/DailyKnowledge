<template>
  <div>
      <!-- 右侧主内容区 -->
      <div class="main-right" >
        <div class="main-right-search">
          <div class="main-right-search-span">
            <a v-for="rent in rents" :class="{selectActive: activeName == rent}" @click="selected(rent)">{{rent}}</a>
          </div>
          <div class="fr search-cont">
            <el-input class="rent1-input" @keydown.enter.native="search()" v-model="input" placeholder="租客手机号,租客姓名,房源信息"></el-input>
            <el-button type="primary" @click="search()">搜索</el-button>
          </div>
        </div>
        <div class="main-right-main">
          <div class="list-contain">
            <div class="list-contain-main">
              <common-list :listData="listData">
                <template slot-scope="props" class="pad9">
                  <el-col :span="2" class="pad9">
                  <!-- 待上门状态 -->
                    <el-dropdown v-if="listData[props.index].appointmentStatus === 'WAITTODOOR'" menu-align="start">
                      <el-button>
                        <span>操作</span>
                        <i class="el-icon-caret-bottom el-icon--right"></i>
                      </el-button>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-if="!isGudong" @click.native="already(props)">已上门</el-dropdown-item>
                        <!-- <el-dropdown-item @click.native="openbjForm(props)">编辑</el-dropdown-item> -->
                        <el-dropdown-item v-if="!isGudong" @click.native="confirm(props)">取消</el-dropdown-item>
                        <el-dropdown-item v-if="!isGudong" @click.native="yuding(props)">预定</el-dropdown-item>
                        <el-dropdown-item v-if="!isGudong" @click.native="openContractForm(props)">新建合同</el-dropdown-item>
                        <el-dropdown-item @click.native="openDetail(props)">详情</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  <!-- 已上门状态 -->
                    <el-dropdown v-else-if="listData[props.index].appointmentStatus === 'ALTODOOR'" menu-align="start">
                      <el-button>
                        <span>操作</span>
                        <i class="el-icon-caret-bottom el-icon--right"></i>
                      </el-button>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-if="!isGudong" @click.native="yuding(props)">预定</el-dropdown-item>
                        <el-dropdown-item v-if="!isGudong" @click.native="openContractForm(props)">新建合同</el-dropdown-item>
                        <el-dropdown-item @click.native="openDetail(props)">详情</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  <!-- 已取消状态 -->
                    <el-dropdown v-else-if="listData[props.index].appointmentStatus === 'CANCLE'" menu-align="start">
                      <el-button>
                        <span>操作</span>
                        <i class="el-icon-caret-bottom el-icon--right"></i>
                      </el-button>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-if="!isGudong" @click.native="returnGo(props)">重新上门</el-dropdown-item>
                        <el-dropdown-item @click.native="openDetail(props)">详情</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  <!-- 其他状态 -->
                    <el-button v-else>
                      <span>详情</span>
                      <i class="el-icon-caret-bottom el-icon--right"></i>
                    </el-button>
                  </el-col>
                </template>
              </common-list>
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
          <!-- 详情组件 -->
          <common-detail :show="detailDialog" :appointmentId="appointmentId"></common-detail>
          <!-- 预约表单组件 -->
          <appoint-form :houseAppoint="houseAppointData" :form="form"></appoint-form>
          <!-- 预定表单组件 -->
          <reserve-form :reserveForm="reserveForm" :reserveFormData="reserveFormData"></reserve-form>
          <!-- 合同表单组件 -->
          <contract-form :contractForm="contractForm" :contractFormData="contractFormData"></contract-form>
        </div>
      </div>
  </div>
</template>
<script>
import CommonList from '@/components/rent/CommonList'
import AppointForm from '@/components/rent/AppointForm'
import ReserveForm from '@/components/rent/ReserveForm'
import ContractForm from '@/components/rent-contract/ContractForm'
import CommonDetail from '@/components/rent/CommonDetail'
// import $ from 'jquery'
export default {
  name: 'rent', // 预约看房页面
  data: function () {
    return {
      // 详情组件
      appointmentId: '',
      detailDialog: {
        show: false
      },
      isGudong: this.$store.state.currentUser.isGudong,
      // 暂无数据
      noData: false,
      // 合同
      contractForm: {
        show: false
      },
      // 合同表单数据
      contractFormData: {},
      input: '',
      rents: ['全部', '待上门', '已上门', '已取消', '已新建预定', '已新建出租合同'],
      activeName: '全部',
      listData: [],
      // 预约表单
      form: {},
      // 预定表单显示隐藏
      reserveForm: {
        show: false
      },
      // 预定表单
      reserveFormData: {},
      // 搜索条件
      bean: '',
      editData: '',
      // 默认每页数据量
      pagesize: 10,
      // 当前页码
      cur_page: 1,
      // 默认数据总数
      totalCount: 0,
      houseAppointData: {
        show: false
      },
      // 角色名
      role: ''
    }
  },
  methods: {
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
    // 预约到预定信息生成
    yuding: function (props) {
      // 根据管家用户id获取角色名
      let keeper = JSON.parse(this.$store.state.currentUser.keeperData)
      for (var i = 0; i <= keeper.length - 1; i++) {
        for (var j = 0; j <= keeper[i].cities.length - 1; j++) {
          if (keeper[i].cities[j].id === this.listData[props.index].houseKeeperId) {
            this.role = keeper[i].label
          }
        }
      }
      // 获取详情数据
      this.$http.get(this.$store.state.rentUrl + 'appointment/get/' + this.listData[props.index].appointmentId, {
      }).then(function (response) {
        var data = response.data
        if (data.code === 200) {
          this.editData = data.data.list[0]
          this.reserveForm.show = true
          this.reserveFormData = {
            name: this.editData.userName, // 预约的用户姓名
            phone: this.editData.userPhone, // 预约的用户手机号
            houseRentType: this.editData.houseRentType, // 预约的房源类型
            house: this.editData.houseSpaceName, // 预约的房源名称
            houseKeeperId: this.editData.houseKeeperId, // 预约的小管家id
            people: [this.role, this.editData.houseKeeperName], // 预约记录的小管家名字
            nameS: true,
            phoneS: true,
            fromAppoint: true,  // 判断从预约进入到预定成功
            appointmentId: this.listData[props.index].appointmentId,
            source: this.editData.source,
            moneyS: false,
            cardIdS: false
          }
        }
      }, function (response) {
        console.log(response.status)
      })
    },
    // 打开合同签订表单
    openContractForm (props) {
      // 根据用户id获取角色名
      let keeper = JSON.parse(this.$store.state.currentUser.keeperData)
      for (var i = 0; i <= keeper.length - 1; i++) {
        for (var j = 0; j <= keeper[i].cities.length - 1; j++) {
          if (keeper[i].cities[j].id === this.listData[props.index].houseKeeperId) {
            this.role = keeper[i].label
            this.housekeeperName = keeper[i].cities[j].label
            this.housekeeperPhone = keeper[i].cities[j].phone
          }
        }
      }
      // 获取详情数据
      this.$http.get(this.$store.state.rentUrl + 'appointment/get/' + this.listData[props.index].appointmentId, {
      }).then(function (response) {
        var data = response.data
        if (data.code === 200) {
          this.editData = data.data.list[0]
          this.contractForm.show = true
          this.contractFormData = {
            name: this.editData.userName, // 租客姓名
            phone: this.editData.userPhone, // 租客手机号
            houseRentType: this.editData.houseRentType, // 房源类型
            houseSpaceName: this.editData.houseSpaceName, // 房源名称
            houseKeeperId: this.editData.houseKeeperId, // 预约的小管家id
            people: [this.role, this.editData.houseKeeperName], // 预约记录的小管家名字
            housekeeperPhone: this.housekeeperPhone,
            housekeeperName: this.housekeeperName,
            signType: 'NEW',
            title: '新建租客合同',
            nameS: true,
            phoneS: true,
            earnestShow: false,
            fromAppoint: true,  // 判断从预约进入到预定成功
            appointmentId: this.listData[props.index].appointmentId,
            source: this.editData.source,
            addType: 'NOTRISE'
          }
        }
      }, function (response) {
        console.log(response.status)
      })
    },
    // 获取列表数据
    loadData: function (bean) {
      this.$http.post(this.$store.state.rentUrl + 'appointment/list',
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
    // 同级选中,根据状态筛选
    selected (rent) {
      this.activeName = rent
      if (rent === '全部') {
        this.bean.appointmentStatus = null
      } else if (rent === '待领取') {
        this.bean.appointmentStatus = 'WAITPICK'
      } else if (rent === '待上门') {
        this.bean.appointmentStatus = 'WAITTODOOR'
      } else if (rent === '已上门') {
        this.bean.appointmentStatus = 'ALTODOOR'
      } else if (rent === '已取消') {
        this.bean.appointmentStatus = 'CANCLE'
      } else if (rent === '已新建预定') {
        this.bean.appointmentStatus = 'ALRES'
      } else if (rent === '已新建出租合同') {
        this.bean.appointmentStatus = 'BUCON'
      } else if (rent === '已评价') {
        this.bean.appointmentStatus = 'ALAPPRAISE'
      }
      this.loadData(this.bean)
    },
    // 打开编辑表单,
    openbjForm (props) {
      // 根据用户id获取角色名
      let keeper = JSON.parse(this.$store.state.currentUser.keeperData)
      for (var i = 0; i <= keeper.length - 1; i++) {
        for (var j = 0; j <= keeper[i].cities.length - 1; j++) {
          if (keeper[i].cities[j].id === this.listData[props.index].houseKeeperId) {
            this.role = keeper[i].label
          }
        }
      }
      // 获取详情数据
      this.$http.get(this.$store.state.rentUrl + 'appointment/get/' + this.listData[props.index].appointmentId, {
      }).then(function (response) {
        var data = response.data
        if (data.code === 200) {
          this.editData = data.data.list[0]
          this.houseAppointData.show = true
          this.form = {
            name: this.editData.userName, // 用户姓名
            phone: this.editData.userPhone, // 用户手机号
            goTime: new Date(this.editData.appointmentTime), // 用户上门时间
            desc: this.editData.memo, // 用户备注
            houseRentType: this.editData.houseRentType, // 房源类型
            source: this.editData.source, // 租客来源
            house: this.editData.houseSpaceName, // 房源名称
            appointmentId: this.editData.appointmentId, // 预约记录的id
            type: '1', // 用于判断是编辑还是新增预约
            rentRange: this.editData.rentRange, // 预约的价格区间
            houseKeeperId: this.editData.houseKeeperId, // 预约的小管家id
            people: [this.role, this.editData.houseKeeperName], // 预约记录的小管家名字
            nameS: true, // 预约记录的名字不能选
            phoneS: true // 预约记录的手机号能选
          }
        }
      }, function (response) {
        console.log(response.status)
      })
    },
    // 打开详情页Thu Oct 25 2018 00:00:00 GMT+0800 (CST)
    openDetail (props) {
      this.appointmentId = this.listData[props.index].appointmentId
      this.detailDialog.show = true
    },
    // 确定已取消
    confirm (props) {
      this.$confirm('是否取消此条看房预约?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: (action, instance) => {
          if (action === 'confirm') {
            // 改变状态为已取消
            this.$http.post(this.$store.state.rentUrl + 'appointment/update', {
              appointmentId: this.listData[props.index].appointmentId,
              appointmentStatus: 'CANCLE'
            }, {
              headers: {
                'Content-Type': 'application/json',
                'userId': this.$store.state.currentUser.uid,
                'workflowToken': this.$store.state.workflowToken,
                'taskId': this.$store.state.taskId,
                'processInstanceId': this.$store.state.processInstanceId,
                'processBusinessKey': this.listData[props.index].appointmentId
              }
            }).then(function (response) {
              var data = response.data
              if (data.code === 200) {
                this.$message({
                  type: 'info',
                  message: '此看房预约已取消'
                })
                this.loadData(this.bean)
              }
            }, function (response) {
              console.log(response.status)
            })
          } else {
          }
        }
      })
    },
    // 确定已上门
    already (props) {
      // this.$store.commit('getMidWorkflowToken', {'processKey': this.listData[props.index].appointmentId, 'variables': ''})
      this.$prompt('是否确定已上门', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: '',
        inputPlaceholder: '请输入看房反馈'
      }).then(({ value }) => {
        this.$http.post(this.$store.state.rentUrl + 'appointment/update', {
          appointmentId: this.listData[props.index].appointmentId,  // 预约记录id
          appointmentStatus: 'ALTODOOR',
          feedback: value // 备注
        }, {
          headers: {
            'Content-Type': 'application/json',
            'userId': this.$store.state.currentUser.uid,
            'workflowToken': this.$store.state.workflowToken,
            'taskId': this.$store.state.taskId,
            'processInstanceId': this.$store.state.processInstanceId,
            'processBusinessKey': this.listData[props.index].appointmentId
          }
        }).then(function (res) {
          if (res.data.code === 200) {
            this.$message({
              type: 'info',
              message: '此看房预约状态已修改'
            })
            this.loadData(this.bean)
          }
        }, function (res) {
          console.log(res.status)
        })
      }).catch(() => {
      })
    },
    // 重新上门
    returnGo (props) {
      this.$confirm('是否确定重新上门?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: (action, instance) => {
          if (action === 'confirm') {
            // 改变状态为待上门
            this.$http.post(this.$store.state.rentUrl + 'appointment/update', {
              appointmentId: this.listData[props.index].appointmentId,
              appointmentStatus: 'WAITTODOOR'
            }).then(function (response) {
              var data = response.data
              if (data.code === 200) {
                this.$message({
                  type: 'info',
                  message: '此看房预约状态已修改'
                })
                this.loadData(this.bean)
              }
            }, function (response) {
              console.log(response.status)
            })
          } else {
          }
        }
      })
    }
  },
  components: {
    CommonList,
    AppointForm,
    ReserveForm,
    ContractForm,
    CommonDetail
  },
  created () {
    this.bean = {
      pageSize: this.pagesize,
      pageNo: this.cur_page,
      loginId: this.$store.state.currentUser.uid
    }
    this.$store.state.adminleftnavnum = '/rent/rent1'
    this.$store.state.topIndex = '/rent/lease'
    this.loadData(this.bean)
    this.$root.appoint.$on('submitForm', value => {
      this.loadData(this.bean)
    })
    // 改变预约状态
    this.$root.appoint.$on('changeStatus', value => {
      this.loadData(this.bean)
    })
  }
}
</script>
<style scoped>
.el-dropdown-menu__item{
  font-size: 14px;
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
</style>
















