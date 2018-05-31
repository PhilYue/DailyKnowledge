<template>
<!-- :style="{zIndex: zIndex}" -->
  <div class="houseDetail dialog" :style="height" v-if="conDetailShow">
    <transition name="fade">
      <div class="dialog" :style="height" style="width:600px">
        <el-row class="height-w100">
          <el-col class="form-cont" :span="8" style="padding:0; background: #eee; margin-top:0;">
          <el-menu default-active="1" :default-active="menuData" class="el-menu-vertical-demo" theme="dark">
            <el-menu-item index="contract" @click="menuClick('contract')">合同信息</el-menu-item>
            <!-- <el-menu-item index="house" @click="menuClick('house')">房源信息</el-menu-item> -->
          </el-menu>
      </el-col>
          <el-col class="form-cont" :span="16">
            <el-col class="line" :span="24"><p class="HDTitle">{{form.houseSpaceName}}</p></el-col>
            <p class="eitdButton" @click="editContract" v-if="conType !== 'con'">编辑</p>
            <div class="HDContent">
              <ul v-if="menuData === 'contract'">
                <li class="f-cb">
                    <el-col class="line" :span="24"><h3>基本信息</h3></el-col>
                    <el-col class="line" :span="24">
                    <el-col class="line" :span="8">合同编号: </el-col>
                    <el-col class="line" :span="14">{{form.contractNumber}}</el-col>
                    <span v-for="(list, index) in form.users">
                      <el-col class="line" :span="8" v-if="index === 0">甲方: </el-col>
                      <el-col class="line" :span="14" v-if="index === 0"> {{list.userName}}</el-col>
                      <el-col class="line" :span="8" v-if="index === 0">甲方联系方式: </el-col>
                      <el-col class="line" :span="14" v-if="index === 0">{{list.userPhone}}</el-col>
                      <el-col class="line" :span="8" v-if="index === 1">乙方: </el-col>
                      <el-col class="line" :span="14" v-if="index === 1"> {{list.userName}}</el-col>
                      <el-col class="line" :span="8" v-if="index === 1">乙方联系方式: </el-col>
                      <el-col class="line" :span="14" v-if="index === 1">{{list.userPhone}}</el-col>
                    </span>
                    <el-col class="line" :span="8">租金: </el-col>
                    <el-col class="line" :span="14">{{form.rental1}}</el-col>
                    <el-col class="line" :span="8">付款周期: </el-col>
                    <el-col class="line" :span="14">{{form.payWay}}</el-col>
                    <el-col class="line" :span="8">押金: </el-col>
                    <el-col class="line" :span="14">{{form.deposit1}}</el-col>
                    <el-col class="line" :span="8">合同类型: </el-col>
                    <el-col class="line" :span="14">{{form.contractType}} - {{form.signType}}</el-col>
                    <el-col class="line" :span="8">合同状态: </el-col>
                    <el-col class="line" :span="14">{{form.contractStatusChange}}</el-col>
                    <el-col class="line" :span="8">生效时间: </el-col>
                    <el-col class="line" :span="14">{{form.startTime}} - {{form.endTime}}</el-col>
                      </el-col>
                  </li>
                  <li class="f-cb">
                    <el-col class="line" :span="24"><h3>房源信息</h3></el-col>
                    <el-col class="line" :span="24">
                      <!-- <el-col class="line" :span="8">房源编号: </el-col>
                      <el-col class="line" :span="14"> {{tableData.businessId}}</el-col> -->
                      <el-col class="line" :span="8">房源面积: </el-col>
                      <el-col class="line" :span="14" v-if="tableData.houseSpaceArea"> {{tableData.houseSpaceArea / 1000}}平方米</el-col>
                      <el-col class="line" :span="14" v-else-if="tableData.houseSpaceManagerArea"> {{tableData.houseSpaceManagerArea / 1000}}平方米</el-col>
                      <el-col class="line" :span="14" v-else> 暂无信息</el-col>
                      <!-- <el-col class="line" :span="8">房源状态:</el-col>
                      <el-col class="line" :span="14">{{tableData.houseSpaceStatus1}}</el-col> -->
                      <span>
                        <el-col class="line" :span="8">房源类型: </el-col>
                        <el-col class="line" :span="14"> <span v-if="tableData.bedroomNumber">{{tableData.bedroomNumber}}室</span><span v-if="tableData.livingRoomNumber">{{tableData.livingRoomNumber}}厅</span><span v-if="tableData.kitchNumber">{{tableData.kitchNumber}}厨</span><span v-if="tableData.toiletNumber">{{tableData.toiletNumber}}卫</span></el-col>
                      </span>
                      <el-col class="line" :span="8" v-if="tableData.direction">朝向:</el-col>
                      <el-col class="line" :span="14" v-if="tableData.direction">{{tableData.direction}}</el-col>
                      <el-col class="line" :span="8">装修类型:</el-col>
                      <el-col class="line" :span="14" v-if="tableData.decorateType1">{{tableData.decorateType1}}</el-col>
                      <el-col class="line" :span="14" v-else>暂无信息</el-col>
                    </el-col>
                  </li>
              </ul>
            </div>
          </el-col>
        </el-row>
        <div @click="close" class="">
          <!-- <p class="houseEdit">编辑</p> -->
          <span class="el-icon-close closeIco"></span>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import $ from 'jquery'
import houseProcess from './houseProcess'  //  房源列表
const height = window.screen.height - 61
export default {
  name: 'detail',
  data: function () {
    return {
      height: 'height:' + height + 'px',
      conDetailShow: false,
      form: {},
      tableData: [],
      menuData: 'contract'
    }
  },
  props: ['houseDetailText', 'conDetail', 'detailClick', 'contractId', 'conType'],
  mounted () {
    $('.el-dialog--small,.el-dialog--tiny').width(650)
  },
  components: {
    houseProcess
  },
  watch: {
    detailClick: function () {
      if (this.contractId) {
        this.conDetailShow = this.conDetail
        this.$options.methods.searchDetail(this)
      }
    }
  },
  methods: {
    getHouseDetail (_this, houseSpaceId) { // 获取房屋详情
      let url = _this.$store.state.houseUrl + 'get'
      _this.$http.post(url, {houseSpaceId: houseSpaceId}).then(({data}) => {
        if (data.code === 200) {
          _this.$options.methods.entireRentSummation(data.data)
          _this.tableData = data.data
        }
        if (data.code === 10000) {
          _this.$http.post(_this.$store.state.houseUrl + 'get/houseSpaceManager', {houseSpaceManagerId: houseSpaceId}).then(function (res) {
            if (res.body.code === 200) {
              _this.$options.methods.entireRentSummation(res.body.data)
              _this.tableData = res.body.data
            }
            if (res.code === 10000) {
              _this.tableData = []
            }
          })
        }
      })
    },
    entireRentSummation (data) { // 累加整租空置数量
      data.houseSpaceArea1 = data.houseSpaceArea / 1000
      if (data.rentalPrice) {
        data.rentalPrice1 = data.rentalPrice / 1000
      } else {
        data.rentalPrice1 = null
      }
      switch (data.houseSpaceStatus) {
        case 'WAIT_DELEGATE':
          data.houseSpaceStatus1 = '待托管'
          break
        case 'ASSESSING':
          data.houseSpaceStatus1 = '评估中'
          break
        case 'APPROVED':
          data.houseSpaceStatus1 = '审核通过'
          break
        case 'SIGNING_C':
          data.houseSpaceStatus1 = '签订托管合同中'
          break
        case 'LC_NOT_TE':
          data.houseSpaceStatus1 = '托管合同未生效'
          break
        case 'DC_TE':
          data.houseSpaceStatus1 = '托管合同已生效'
          break
        case 'DESIGNING':
          data.houseSpaceStatus1 = '设计中'
          break
        case 'CONSTRUCTING':
          data.houseSpaceStatus1 = '施工中'
          break
        case 'CHECKING':
          data.houseSpaceStatus1 = '验收中'
          break
        case 'RETAIN':
          data.houseSpaceStatus1 = '保留'
          break
        case 'RENTABLE':
          data.houseSpaceStatus1 = '空置'
          break
        case 'RESERVED':
          data.houseSpaceStatus1 = '已预定'
          break
        case 'SIGNING_LC':
          data.houseSpaceStatus1 = '签订租赁合同中'
          break
        case 'RENTED':
          data.houseSpaceStatus1 = '已出租'
          break
        case 'FREEZING':
          data.houseSpaceStatus1 = '已冻结'
          break
        case 'DELETED':
          data.houseSpaceStatus1 = '已删除'
          break
      }
      // 转换装修类型
      switch (data.decorateType) {
        case 'R':
          data.decorateType1 = '毛坯房'
          break
        case 'S':
          data.decorateType1 = '简装'
          break
        case 'RD':
          data.decorateType1 = '精装'
          break
        case 'A':
          data.decorateType1 = '豪华装修'
          break
        case '':
          data.decorateType1 = ''
          break
      }
      // 转换朝向
      switch (data.direction) {
        case 'EAST':
          data.direction = '东'
          break
        case 'SOUTH':
          data.direction = '南'
          break
        case 'WEST':
          data.direction = '西'
          break
        case 'NORTH':
          data.direction = '北'
          break
        case 'SOUTHEAST':
          data.direction = '东南'
          break
        case 'NORTHEAST':
          data.direction = '东北'
          break
        case 'SOUTHWEST':
          data.direction = '西南'
          break
        case 'NORTHWEST':
          data.direction = '西北'
          break
      }
      return data
    },
    menuClick (data) {
      this.menuData = data
    },
    showHousekeeperDetail (data) {
      this.$emit('showHousekeeperDetail', data)
    },
    showRentalDetail (data) {
      this.$emit('showRentalDetail', data)
    },
    editContract () {
      this.$emit('editContract', this.contractId)
    },
    close () {
      this.$emit('closeDetail')
    },
    conList (data) { // 将房东信息从user拎到list表中
      if (data.users !== '' && data.users !== null) {
        for (var i in data.users) {
          if (data.users[i].representative === 'PARTB') {
            data.userName = data.users[i].userName
            data.phoneNum = data.users[i].userPhone
            data.cerNum = data.users[i].cerNum
            data.UserId = data.users[i].id
            data.conId = data.users[i].conId
            data.bankAccount = data.users[i].bankAccount
            data.bankName = data.users[i].bankName
            data.cerType = data.users[i].certificateType
            // data.contractType = data.users[i].contractType
            // data.signType = data.users[i].signType
          }
        }
      }
      return data
    },
    showPersonDetail (data) {
      // this.$emit('showPersonDetail', data)
    },
    conStatus (data) { // 转换合同状态以及合同生效时间以及结束时间
      var pay = data.contractStatus
      switch (pay) {
        case 'WAISIGN':
          data.contractStatusChange = '待签订'
          break
        case 'SIGNING':
          data.contractStatusChange = '签订中'
          break
        case 'ALSIGN':
          data.contractStatusChange = '已签订'
          break
        case 'EFFECT':
          data.contractStatusChange = '已生效'
          break
        case 'ENDING':
          data.contractStatusChange = '终止中'
          break
        case 'ALEND':
          data.contractStatusChange = '已结束'
          break
        case 'CANCEL':
          data.contractStatusChange = '取消'
          break
        case 'TOAUDIT':
          data.contractStatusChange = '待审核'
          break
      }
      switch (data.chargLogBeanList[0].cycle) {
        case 'ONEMON':
          data.payWay = '月付'
          data.payCycleChange = '1'
          break
        case 'THREEMON':
          data.payWay = '季付'
          data.payCycleChange = '2'
          break
        case 'SIXMON':
          data.payWay = '半年一付'
          data.payCycleChange = '3'
          break
        case 'TWELVEMON':
          data.payWay = '年付'
          data.payCycleChange = '4'
          break
        case 'ONEPAY':
          data.payWay = '全额'
          data.payCycleChange = '5'
          break
        case 'TWOMON':
          data.payWay = '二月付'
          data.payCycleChange = '6'
          break
        case 'FOURMON':
          data.payWay = '四月付'
          data.payCycleChange = '7'
          break
      }
      switch (data.signType) {
        case 'NEW':
          data.signType = '新签合同'
          break
        case 'SUBLET':
          data.signType = '转租合同'
          break
        case 'RENEWAL':
          data.signType = '续租合同'
          break
        case 'CHANGE':
          data.signType = '换房合同'
          break
      }
      switch (data.contractType) {
        case 'RENT':
          data.contractType = '出租合同'
          break
        case 'DELEGATE':
          data.contractType = '托管合同'
          break
      }
      var startTime = new Date(data.startTime)
      data.startTime = startTime.getFullYear() + '/' + (startTime.getMonth() + 1) + '/' + (startTime.getDate())
      var endTime = new Date(data.endTime)
      data.endTime = endTime.getFullYear() + '/' + (endTime.getMonth() + 1) + '/' + (endTime.getDate())
      data.rental1 = data.rental / 1000
      data.deposit1 = data.deposit / 1000
      if (data.rentFreeStart !== null && data.rentFreeStart !== '') {
        startTime = new Date(data.rentFreeStart)
        data.rentFreeStart = startTime.getFullYear() + '/' + (startTime.getMonth() + 1) + '/' + (startTime.getDate())
      }
      if (data.rentFreeEnd !== null && data.rentFreeEnd !== '') {
        endTime = new Date(data.rentFreeEnd)
        data.rentFreeEnd = endTime.getFullYear() + '/' + (endTime.getMonth() + 1) + '/' + (endTime.getDate())
      }
      console.log(data)
      return data
    },
    searchDetail (_this) {
      let url = _this.$store.state.contractUrl + 'getContractDetailsById/' + _this.contractId
      _this.$http.get(url).then(function (res) {
        if (res.body.code === 200) {
          _this.form = res.body.data
          _this.$options.methods.conList(_this.form)
          _this.$options.methods.conStatus(_this.form)
          _this.$options.methods.getHouseDetail(_this, res.body.data.houseSpaceId)
        }
      })
    }
  }
}
</script>
<style scoped>
/*右侧弹窗*/
.dialog{
  width: 50%;
  position:fixed;
  top: 62px;
  background-color: #fff;
  right: 0;
  border-right:3px solid #fff;
  z-index: 9999;
}
.dialog.houseDetail{
  border-width: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: right .5s
}
.fade-enter, .fade-leave-to {
  right: -50%;
}
.fade-enter-to, .fade-leave {
  right: 0;
}
.el-menu-vertical-demo{
  height: 100%;
}
.height-w100{
  height: 100%;
  overflow-y: auto;
}
.form-cont{
  height: calc(100vh - 60px);
  padding: 55px 30px;
  overflow-y: auto;
  border-left: 1px solid #eef1f6;
}
.closeIco{
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
}
.houseEdit{
  color: #13CE66;
  position: absolute;
  right: 40px;
  cursor: pointer;
  top: 15px;
  font-size: 16px;
  line-height: 16px;
}
.HDTitle{
  /*width: 350px;*/
  /*height: 26px;*/
  line-height: 16px;
  font-size: 16px;
  /*margin-bottom: 20px;*/
  word-wrap:break-word ;
}
.textRight{
  text-align: right;
}
.HDContent li{
  line-height: 24px;
  font-size: 13px;
  padding: 20px 0;
  /*border-bottom: 1px solid #e3e3e3;*/
}
.HDContent li:first-child{
  padding-top: 0;
}
.HDContent li:last-child{
  border-width: 0;
}
.el-menu--dark{
  background: #d3dce6;
  /*color: #555;*/
}
.houseDetail .el-menu--dark{
  background: #d3dce6;
}
.el-menu-item{
  /*color: #555;*/
  /*border-left: 3px solid #ebebeb;*/
}
.el-menu--dark .el-menu-item:hover, .el-menu--dark .el-submenu__title:hover{
  /*background: #f6f8f9;*/
  /*border-color: #20a0ff;*/
}
.el-menu-item.is-active{
  /*background: #f6f8f9;*/
  /*color: #555;*/
  /*border-color:#20a0ff;*/
}
.el-menu-item:first-child{
  margin-top: 28px;
}
.houseDetail .el-menu-item{
  /*display: none;*/
  color: #333;
  background-color: #d3dce6;
  border-left: 3px solid #d3dce6;
  transition: all .5s;
}
.houseDetail .el-menu-item:hover{
  background-color: #fcfcfc;
  border-color: #fcfcfc;
}
.houseDetail .el-menu-item.is-active{
  background-color: #fcfcfc;
  border-color: #20a0ff;
}
.houseDetail .eitdButton{
  position: absolute;
  right: 40px;
  top: 9px;
  font-size: 19px;
  color: #20a0ff;
  cursor: pointer;
}
.el-col-9{
  margin-right: 5px;
  margin-bottom: 5px;
}
.el-col-14{
  margin-bottom: 5px;
  height: 24px;
}
.HDContent li h3{
  border-bottom: 1px solid #e3e3e3;
  padding: 10px 0;
  margin-top: 20px;
}
.el-col-8, .el-col-14{
  margin-top: 10px;
}
</style>