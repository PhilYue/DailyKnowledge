<template>
  <div>
    <header class="header">
      <el-row type="flex">
        <el-col :span="4" class="logo">
          <router-link to="/index"><img src="../../../static/img/logo.png" height="50"/></router-link>
        </el-col>
        <el-col :span="14">
            <el-menu :default-active="navselected" :router="true" class="el-menu-demo" mode="horizontal">
              <el-menu-item index="/house/house1">房源管理</el-menu-item>
              <el-menu-item index="/rent/lease">租赁管理</el-menu-item>
              <el-menu-item index="/service/repair">售后管理</el-menu-item>
              <el-menu-item index="/table/accountReceivable">报表</el-menu-item>
            </el-menu>
        </el-col>
        <!-- <el-col class="head-img" :span="2"> -->
          <!-- <el-dropdown trigger="hover" menu-align="start" class="el-dropdown-link">
            <div>常用菜单</div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><a href="../#/rent/rent1">预约看房</a></el-dropdown-item>
              <el-dropdown-item><a href="../#/rent/lease">出租管理</a></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
        <!-- </el-col> -->
        <el-col :span="2">
          <el-dropdown v-if="!isGudong" @command="openDialog" trigger="hover" menu-align="start" class="dropdown-pos el-dropdown-link">
            <!-- <div><i class="el-icon-plus"></i></div> -->
            <div><i class="el-icon-open"></i></div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="新增房东合同" class="dropDown">新增房东合同</el-dropdown-item>
              <el-dropdown-item command="新增房源" class="dropDown">新增房源</el-dropdown-item>
              <el-dropdown-item command="新增看房预约" class="dropDown">新增看房预约</el-dropdown-item>
              <el-dropdown-item v-if="this.$store.state.currentUser.roleData.indexOf('运营部经理') !== -1" command="新增房源预定" class="dropDown">新增房源预定</el-dropdown-item>
              <el-dropdown-item v-if="this.$store.state.currentUser.roleData.indexOf('运营部经理') !== -1" command="新增租客纸质合同" class="dropDown">新增租客纸质合同</el-dropdown-item>
              <el-dropdown-item command="新建维修工单" class="dropDown">新建维修工单</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col class="head-img" :span="4">
          <el-col :span="24">
            <el-dropdown trigger="hover" menu-align="end" class="headImg-pos el-dropdown-link">
              <div class="clear">
                <div class="dpl-ib head-name">{{username}}</div>
                <div class="headIco dpl-ib fr"><img src="../../../static/img/headIco.png"></div>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><router-link class="link-a" to="/resetLogin">修改密码</router-link></el-dropdown-item>
                <el-dropdown-item><router-link class="link-a" to="/">退出</router-link></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-col>
      </el-row>
    </header>
    <div class="div60"></div>
    <appoint-form :houseAppoint="houseAppointData" :form="form"></appoint-form>
    <reserve-form :reserveForm="reserveForm" :reserveFormData="reserveFormData"></reserve-form>
    <contract-form :contractForm="contractForm" :contractFormData="contractFormData"></contract-form>
    <el-dialog title="新增房源" :visible.sync="dialogAddVisible" top="7%">
      <depositAdd :formLabelWidth="formLabelWidth" :mix="mix" :disable="false" @listenToParentEvent="closeForm"  @addSuccess="closeForm"></depositAdd>
    </el-dialog>
    <el-dialog title="新增房东合同" :visible.sync="dialogVisible" class="trusteeship" top="7%">
      <trusteeshipAdd :disabled="false" :addclickCount="addclickCount" :formLabelWidth="formLabelWidth" :mix="mix" @listenToParentEvent="closeForm" @addTrusteeshopSuccess="closeForm"></trusteeshipAdd>
    </el-dialog>
    <!-- 新建弹窗开始 -->
    <el-dialog title="新增维修" :visible.sync="repairAddVisible">
      <repairAdd @closeForm="closeForm" :addclickCount="addclickCount"></repairAdd>
    </el-dialog>
    <!-- 新建弹窗结束 -->
    <!-- 新建弹窗开始 -->
    <el-dialog title="新增保洁" :visible.sync="cleanAddVisible">
      <cleanAdd @closeForm="closeForm" service="clean"></cleanAdd>
    </el-dialog>
    <!-- 新建弹窗结束 -->
  </div>
</template>
<script>
import AppointForm from '@/components/rent/AppointForm'
import ReserveForm from '@/components/rent/ReserveForm'
import ContractForm from '@/components/rent-contract/ContractForm'
import depositAdd from '@/components/depositAdd'
import repairAdd from '@/components/repairAdd'
import cleanAdd from '@/components/cleanAdd'

import trusteeshipAdd from '@/components/trusteeshopAdd1'

export default {
  name: 'commonHead',
  data: function () {
    return {
      username: '',
      active: true,
      navtype: 'horizontal',
      navselected: '',
      houseAppointData: {
        show: false
      },
      isGudong: this.$store.state.currentUser.isGudong,
      formLabelWidth: '120px',
      reserveForm: {
        show: false
      },
      dialogVisible: false,
      dialogAddVisible: false,
      contractForm: {
        show: false
      },
      form: {
        goTime: '',
        rentRange: '',
        source: ''
      },
      reserveFormData: {
        goTime: new Date(),
        startTime: '',
        endTime: '',
        rentRange: '',
        rentType2: '',
        source: ''
      },
      contractFormData: {
        name: '',
        phone: '',
        certificateType: '',
        cardId: '',
        sex: '',
        houseSpaceName: '',
        earnestShow: false,
        startTime: '',
        endTime: '',
        rentRange: '',
        rentMoney: '',
        deposit: '', // 押金
        rentFreeStart: '',
        rentFreeEnd: '',
        rentType2: '', // 支付周期
        firstMoney: '',
        earnest: '',
        addCycle: '',
        addType: 'NOTRISE',
        source: '',
        livesNumber: '',
        memo: '',
        signType: 'NEW',
        projectTrue: '',
        people: ''
      },
      repairAddVisible: false,
      addclickCount: 0,
      cleanAddVisible: false,
      houseChange: {
        uId: '',
        houseId: '',
        businessId: '',
        blockName: '',
        detailAddress: '',
        effectTime: '', // 托管开始时间
        endTime: '', // 托管结束时间
        freeStartTime: '', // 免租开始时间
        freeEndTime: '', // 免租结束时间
        rental: '', // 收房价格
        deposit: '', // 押金
        payWay: '1',
        payCycle: '1', // 支付周期
        rentalStage: '0', // 租金递增方式
        rentalSMoney: '',
        buildingNo: '1', // 楼号
        unitNo: '1', // 单元号
        roomNo: '1', // 室号
        payeeName: '', // 收款人姓名
        bankAccount: '', // 收款账号
        bankName: '2', // 收款银行
        bankOfAccounts: '', // 开户支行
        remark: '',
        contractType: 'TRUSTEESHIPCONTRACT', // 合同分类
        repName: '', // 小管家姓名
        repPhone: '', // 小管家联系方式
        userName: '',
        cerType: 'ID', // 房东证件类型
        cerNum: '', // 房东证件号
        userPhone: '' // 房东手机号
      },
      mix: {
        userId: this.$store.state.accountUrl + 'user/info/cert/', // 根据ID搜索身份证号
        userUrl: this.$store.state.accountUrl + 'user/list', // 查询用户列表
        userSignUrl: this.$store.state.accountUrl + 'user/info/signin', // 查询用户信息
        depositAddUrl: this.$store.state.houseUrl + 'save/houseSpace/', // 新增托管
        contractAdd: this.$store.state.contractUrl + 'addDelegateContract', // 新增租客纸质合同
        houseList: this.$store.state.houseUrl + 'list/block' // 房源地址查找
      }
    }
  },
  methods: {
    getNavType () {
      this.navselected = this.$store.state.topIndex
    },
    openDialog (command) {
      if (command === '新增看房预约') {
        this.form.people = [localStorage.getItem('role'), this.username]
        this.houseAppointData.show = true
      } else if (command === '新增房源预定') {
        this.reserveFormData.people = [localStorage.getItem('role'), this.username]
        this.reserveForm.show = true
      } else if (command === '新增租客纸质合同') {
        this.contractFormData.people = [localStorage.getItem('role'), this.username]
        this.contractFormData.storageType = 'PAPER'
        this.contractForm.show = true
      } else if (command === '新增房源') {
        this.dialogAddVisible = true
      } else if (command === '新增房东合同') {
        this.dialogVisible = true
        this.addclickCount++
      } else if (command === '新建维修工单') {
        this.repairAddVisible = true
        this.addclickCount++
        console.log(this.addclickCount)
      } else if (command === '新增保洁') {
        this.cleanAddVisible = true
        this.addclickCount++
      }
    },
    loadName () {
      this.$http.get(this.$store.state.accountUrl + 'user/info/id/' + this.$store.state.currentUser.uid,
      ).then(function (response) {
        var data = response.data
        if (data.code === 200) {
          this.username = data.data.username
          // context.commit('setUserName', data.data.username)
          this.$store.dispatch('getLoginName', {'username': data.data.username})
        }
      }, function (response) {
        console.log(response.status)
      })
    },
    closeForm () {
      this.dialogVisible = false
      this.dialogAddVisible = false
      this.repairAddVisible = false
      this.cleanAddVisible = false
      this.addclickCount++
    }
  },
  watch: {
    // 监测store.state
    '$store.state.topIndex': 'getNavType'
  },
  components: {
    AppointForm,
    ReserveForm,
    ContractForm,
    depositAdd,
    trusteeshipAdd,
    cleanAdd,
    repairAdd
  },
  created () {
    this.loadName()
    this.$store.dispatch('getRole', {'id': this.$store.state.currentUser.uid})
  }
}
</script>
<style scoped>
/* 头部导航 */
header{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  transition: all 0.5s ease;
  /*border-top: solid 1px #3091F2;*/
  border-top: solid 1px #fff;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);
}
.div60{
  width: 100%;
  height: 60px;
}
header .el-menu-demo{
  padding-left: 30%;
}
.headIco{
  height: 50px;
  padding: 5px 30px;
  text-align: right;
  padding-left: 0;
}
.logo{
  height: 60px;
  /*background-color: #eef1f6;*/
  padding-left: 30px;
  padding-top: 5px;
}
.resetLogin{
  position: absolute;
  left: 50%;
  margin-left: -150px;
  width: 300px;
}
.head-img{
  text-align: center;
  height: 60px;
  line-height: 60px;
  /*background-color: #eef1f6;*/
}
.head-name{
  text-align: center;
  height: 60px;
  line-height: 60px;
  float: left;
  margin-right: 20px;
}
.dropdown-pos{
  float: left;
  width: 100%;
  /*background-color: #eef1f6;*/
  line-height: 60px;
  text-align: center;
}
.headImg-pos{
  float: right;
}
.el-icon-open{
  /*font-size: 18px;*/
  width: 100%;
  height: 60px;
  display: block;
  line-height: 60px;
  background-image: url('../../../static/img/open1.png');
  background-repeat: no-repeat;
  background-size: 36px 36px;
  background-position: center center;
}
header .el-menu{
  text-align: center;
  padding-left: 0;
}
.el-menu--horizontal .el-menu-item{
  display: inline-block;
  float: none;
}
.link-a{
  display: inline-block;
  width: 100%;
  font-size: 14px;
}
.el-menu{
  background-color: #fff;
}
.el-menu--horizontal .el-menu-item{
  font-size: 16px;
}
.dropDown{
  font-size: 14px;
}
</style>
