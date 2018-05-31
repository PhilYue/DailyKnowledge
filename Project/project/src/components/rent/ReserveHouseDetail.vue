<template>
  <div>
    <transition name="fade">
      <div v-if="detailShow.show" class="dialog" :style="height">
        <el-row class="height-w100">
          <el-col class="form-contL" :span="6" style="padding:0;">
            <el-menu :default-active="menuData" class="el-menu-vertical-demo" theme="dark">
              <el-menu-item index="contract">预定详情</el-menu-item>
            </el-menu>
          </el-col>
          <el-col class="form-cont" :span="18">
            <div class="contain">
              <div class="clear">
                <h3 :span="24">租客信息</h3>
                <el-col :span="8" class="title">预定编号</el-col>
                <el-col :span="16">
                  <div class="content">{{detailData.reservationNumber}}</div>
                </el-col>
                <el-col :span="8" class="title">姓名</el-col>
                <el-col :span="16">
                  <div class="content">{{detailData.userName}}</div>
                </el-col>
                <el-col :span="8" class="title">手机号</el-col>
                <el-col :span="16">
                  <div class="content">{{detailData.userPhone}}</div>
                </el-col>
              </div>
              <div class="clear">
                <h3 :span="24">房源信息</h3>
                <el-col :span="8" class="title">定金</el-col>
                <el-col :span="16">
                  <div class="content">{{(detailData.earnest / 1000).toFixed(2)}}</div>
                </el-col>
                <el-col :span="8" class="title">房源指导价</el-col>
                <el-col :span="16">
                  <div class="content">{{(detailData.guidePrice / 1000).toFixed(2)}}</div>
                </el-col>
                <el-col :span="8" class="title">房源类型</el-col>
                <el-col :span="16">
                  <div v-if="detailData.houseRentType === 'ENTIRE_RENT'" class="content">套房</div>
                  <div v-else-if="detailData.houseRentType === 'JOINT_RENT'" class="content">单间</div>
                </el-col>
                <el-col :span="8" class="title">房源名称</el-col>
                <el-col :span="16">
                  <div class="content">{{detailData.houseSpaceName}}</div>
                </el-col>
                <el-col :span="8" class="title">销售人员</el-col>
                <el-col :span="16">
                  <div class="content">{{detailData.enterName}}</div>
                </el-col>
                <el-col :span="8" class="title" v-if="detailData.memo">其他约定</el-col>
                <el-col :span="16" v-if="detailData.memo">
                  <div class="content">{{detailData.memo}}</div>
                </el-col>
                <el-col :span="8" class="title">预定状态</el-col>
                <el-col :span="16">
                  <div v-if="detailData.reservationStatus === 'WAITPAY'" class="content">待支付</div>
                  <div v-else-if="detailData.reservationStatus === 'ALPAY'" class="content">已支付</div>
                  <div v-else-if="detailData.reservationStatus === 'BUCON'" class="content">已新建出租合同</div>
                  <div v-else class="content">已取消</div>
                </el-col>
              </div>
            </div>
          </el-col>
        </el-row>
        <!-- <span class="edit" @click="edit()">编辑</span> -->
        <div @click="detailShow.show = !detailShow.show" class="el-icon-close closeIco"></div>
      </div>
    </transition>
    <!-- 表单组件 -->
    <reserve-form :reserveForm="reserveForm" :reserveFormData="reserveFormData"></reserve-form>
  </div>
</template>
<script>
import ReserveForm from '@/components/rent/ReserveForm'
const height = window.screen.height - 51
import $ from 'jquery'
export default {
  name: 'detail',
  data: function () {
    return {
      height: 'height:' + height + 'px',
      reserveForm: {
        show: false
      },
      reserveFormData: {},
      role: '', // 角色名
      editData: '',
      menuData: 'contract',
      detailData: ''
    }
  },
  methods: {
    // 打开详情页
    loadDetail (id) {
      // 获取详情数据
      this.$http.get(this.$store.state.rentUrl + 'reservation/get/' + id, {
      }).then(function (response) {
        var data = response.data
        if (data.code === 200) {
          this.detailData = data.data
        }
      }, function (response) {
        console.log(response.status)
      })
    },
    edit () {
      // 根据管家用户id获取角色名
      let keeper = JSON.parse(this.$store.state.currentUser.keeperData)
      for (var i = 0; i <= keeper.length - 1; i++) {
        for (var j = 0; j <= keeper[i].cities.length - 1; j++) {
          if (keeper[i].cities[j].id === this.detailData.houseKeeperId) {
            this.role = keeper[i].label
          }
        }
      }
      // 获取详情数据
      this.$http.get(this.$store.state.rentUrl + 'reservation/get/' + this.detailData.reservationId, {
      }).then(function (response) {
        var data = response.data
        if (data.code === 200) {
          this.editData = data.data
          this.detailShow.show = false
          this.reserveForm.show = true
          let houseRentType, rentType2
          if (this.editData.houseRentType === 'ENTIRE_RENT') {
            houseRentType = '套房'
          } else if (this.editData.houseRentType === 'JOINT_RENT') {
            houseRentType = '单间'
          }
          // 支付周期判断
          if (this.editData.rentType2 === 'ONEMON') {
            rentType2 = '月付'
          } else if (this.editData.rentType2 === 'THREEMON') {
            rentType2 = '季付'
          } else if (this.editData.rentType2 === 'SIXMON') {
            rentType2 = '半年一付'
          } else if (this.editData.rentType2 === 'TWELVEMON') {
            rentType2 = '一年一付'
          } else {
            rentType2 = '一次付清'
          }
          this.reserveFormData = {
            name: this.editData.userName, // 姓名
            phone: this.editData.userPhone, // 手机号
            cardId: this.editData.idNumber, // 身份证
            money: (this.editData.earnest / 1000).toString(), // 定金
            rentMoney: (this.editData.rental / 1000).toString(), // 租金
            deposit: (this.editData.deposit / 1000).toString(), // 押金
            startTime: new Date(this.editData.startTime), // 合同生效（起租）时间
            endTime: new Date(this.editData.endTime), // 合同结束（退租）时间
            goTime: new Date(this.editData.expiredSignContractTime), // 预计签合同时间
            houseRentType: houseRentType,
            livesNumber: (this.editData.livesNumber).toString(), // 居住人数
            memo: this.editData.memo, // 备注
            rentType2: rentType2,
            people: [this.role, this.editData.houseKeeperName],
            house: this.editData.houseSpaceName,
            reservationId: this.editData.reservationId,
            houseKeeperId: this.editData.houseKeeperId,
            type: '1',
            userId: this.editData.userId,
            nameS: true,
            phoneS: true,
            source: this.editData.source // 租客来源
          }
        }
      }, function (response) {
        console.log(response.status)
      })
    }
  },
  props: ['reserveHouseId', 'detailShow'],
  components: {
    ReserveForm
  },
  mounted: function () {
    this.$nextTick(function () {
      var $this = this
      $('body').click(function (event) {
        if (event.target.closest('.dialog') === null) {
          $this.detailShow.show = false
        }
      })
    })
  },
  watch: {
    'detailShow.show': function (val, oldVal) {
      if (val === true) {
        this.loadDetail(this.reserveHouseId)
      }
    }
  }
}
</script>
<style scoped>
::-webkit-scrollbar {
  display:none
}
.el-menu{
  background-color: #d3dce6;
}
.el-menu-item{
  background-color: #d3dce6;
  border-left: 3px solid #d3dce6;
  transition: all .5s;
}
.el-menu-item:hover{
  background-color: #fff;
  border-color: #20a0ff;
  color: #333;
}
.el-menu-item.is-active{
  background-color: #fff;
  border-color: #20a0ff;
  color: #333;
}
.edit{
  position: absolute;
  top: 12px;
  right: 45px;
  cursor: pointer;
}
.edit:hover{
  color: red;
}
/*右侧弹窗*/
.dialog{
  width: 50%;
  position:fixed;
  top: 61px;
  background-color: #fff;
  right: 0;
  border-right:3px solid #ccc;
  z-index: 9999;
  border-top: 1px solid #e0e0e0;
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
  padding: 30px 50px;
  overflow-y: auto;
}
.form-contL{
  height: calc(100vh - 88px);
}
.closeIco{
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
}
.contain{
  color: #555;
  font-size: 13px;
}
.content{
  padding-bottom: 13px;
}
h3{
  padding-bottom: 5px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 18px;
}
</style>