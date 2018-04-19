<template>
  <div>
    <transition name="fade">
      <div v-if="detailShow.show" class="dialog" :style="height">
        <el-row class="height-w100">
          <el-col class="form-contL" :span="6" style="padding:0;">
            <el-menu :default-active="menuData" class="el-menu-vertical-demo" @select="select">
              <el-menu-item index="contract">租约详情</el-menu-item>
              <el-menu-item index="payDetail">财务信息</el-menu-item>
            </el-menu>
          </el-col>
          <el-col class="form-cont" :span="18">
            <div class="contain">
              <div class="clear">
                <h3>租客信息</h3>
                <el-col v-if="detailData.contractNum" :span="8" class="title">合同编号</el-col>
                <el-col v-if="detailData.contractNum" :span="16">
                  <div class="content">{{detailData.contractNum}}</div>
                </el-col>
                <el-col v-if="detailData.userName" :span="8" class="title titleF">姓名</el-col>
                <el-col v-if="detailData.userName" :span="16">
                  <div class="content titleF">{{detailData.userName}}</div>
                </el-col>
                <el-col v-if="detailData.userPhone" :span="8" class="title">手机号</el-col>
                <el-col v-if="detailData.userPhone" :span="16">
                  <div class="content">{{detailData.userPhone}}</div>
                </el-col>
                <el-col v-if="detailData.documentsType" :span="8" class="title">证件类型</el-col>
                <el-col v-if="detailData.documentsType" :span="16">
                  <div v-if="detailData.documentsType === 'ID'" class="content">身份证</div>
                  <div v-else class="content">护照</div>
                </el-col>
                <el-col v-if="detailData.nationality" :span="8" class="title">国籍</el-col>
                <el-col v-if="detailData.nationality" :span="16">
                  <div class="content">{{detailData.nationality}}</div>
                </el-col>
                <el-col v-if="detailData.documentsNumber" :span="8" class="title">证件号码</el-col>
                <el-col v-if="detailData.documentsNumber" :span="16">
                  <div class="content">{{detailData.documentsNumber}}</div>
                </el-col>
                <el-col v-if="detailData.sex" :span="8" class="title">性别</el-col>
                <el-col v-if="detailData.sex" :span="16">
                  <div class="content" v-if="detailData.sex === 'M'">男</div>
                  <div class="content" v-else-if="detailData.sex === 'F'">女</div>
                </el-col>
                <el-col v-if="detailData.livesNumber" :span="8" class="title">居住人数</el-col>
                <el-col v-if="detailData.livesNumber" :span="16">
                  <div class="content titleF">{{detailData.livesNumber}}</div>
                </el-col>
                <el-col v-if="detailData.expiredOutTime" :span="8" class="title">搬出时间</el-col>
                <el-col v-if="detailData.expiredOutTime" :span="16">
                  <div class="content titleF">{{new Date(detailData.expiredOutTime).toLocaleDateString()}}</div>
                </el-col>
              </div>
              <div class="clear">
                <h3>合同信息</h3>
                <el-col v-if="detailData.houseRentType" :span="8" class="title">房源类型</el-col>
                <el-col v-if="detailData.houseRentType" :span="16">
                  <div v-if="detailData.houseRentType === 'ENTIRE_RENT'" class="content">套房</div>
                  <div v-if="detailData.houseRentType === 'JOINT_RENT'" class="content">单间</div>
                </el-col>
                <el-col v-if="detailData.houseSpaceName" :span="8" class="title">房源名称</el-col>
                <el-col v-if="detailData.houseSpaceName" :span="16">
                  <div class="content">{{detailData.houseSpaceName}}</div>
                </el-col>
                <el-col v-if="detailData.startTime" :span="8" class="title">起租-退租时间</el-col>
                <el-col v-if="detailData.startTime" :span="16">
                  <div class="content">{{new Date(detailData.startTime).toLocaleDateString()}}-{{new Date(detailData.endTime).toLocaleDateString()}}</div>
                </el-col>
                <el-col v-if="detailData.expiredOutTime" :span="8" class="title">退租时间</el-col>
                <el-col v-if="detailData.expiredOutTime" :span="16">
                  <div class="content">{{new Date(detailData.expiredOutTime).toLocaleDateString()}}</div>
                </el-col>
                <!-- <el-col v-if="detailData.rentType" :span="8" class="title">租赁类型</el-col>
                <el-col v-if="detailData.rentType" :span="16">
                  <div class="content" v-if="detailData.rentType === 'MONTH'">月租</div>
                  <div class="content" v-else>日租</div>
                </el-col> -->
                <el-col v-if="detailData.poundage" :span="8" class="title">是否有偿</el-col>
                <el-col v-if="detailData.poundage" :span="16">
                  <div class="content" v-if="detailData.poundage === 'SPAID'">转租有偿</div>
                  <div class="content" v-else-if="detailData.poundage === 'SNOTPAID'">转租无偿</div>
                  <div class="content" v-else-if="detailData.poundage === 'CPAID'">换房有偿</div>
                  <div class="content" v-else-if="detailData.poundage === 'CNOTPAID'">换房无偿</div>
                </el-col>
                <el-col v-if="detailData.payCycle" :span="8" class="title">支付周期</el-col>
                <el-col v-if="detailData.payCycle" :span="16">
                  <div class="content" v-if="detailData.payCycle === 'ONEMON'">月付</div>
                  <div class="content" v-else-if="detailData.payCycle === 'THREEMON'">季付</div>
                  <div class="content" v-else-if="detailData.payCycle === 'SIXMON'">半年一付</div>
                  <div class="content" v-else-if="detailData.payCycle === 'TWELVEMON'">一年一付</div>
                  <div class="content" v-else-if="detailData.payCycle === 'TWOMON'">二月一付</div>
                  <div class="content" v-else-if="detailData.payCycle === 'FOURMON'">四月一付</div>
                  <div class="content" v-else-if="detailData.payCycle === 'ONEPAY'">一次付清</div>
                </el-col>
                <el-col v-if="detailData.rental" :span="8" class="title">租金</el-col>
                <el-col v-if="detailData.rental" :span="16">
                  <div class="content">{{(detailData.rental / 1000).toFixed(2)}}</div>
                </el-col>
                <el-col v-if="detailData.deposit" :span="8" class="title">押金</el-col>
                <el-col v-if="detailData.deposit" :span="16">
                  <div class="content">{{(detailData.deposit / 1000).toFixed(2)}}</div>
                </el-col>
                <el-col v-if="detailData.signContractTime" :span="8" class="title">签约时间</el-col>
                <el-col v-if="detailData.signContractTime" :span="16">
                  <div class="content">{{new Date(detailData.signContractTime).toLocaleDateString()}}</div>
                </el-col>
                <!-- 销售人员 -->
                <el-col v-if="detailData.houseKeeperName" :span="8" class="title">销售人员</el-col>
                <el-col v-if="detailData.houseKeeperName" :span="16">
                  <div class="content">{{detailData.houseKeeperName}}</div>
                </el-col>
                <!-- 房源面积 -->
                <el-col v-if="detailData.houseSpaceArea" :span="8" class="title">房源面积</el-col>
                <el-col v-if="detailData.houseSpaceArea" :span="16">
                  <div class="content">{{detailData.houseSpaceArea / 1000}}㎡</div>
                </el-col>
                <!-- 首月减免金额 -->
                <el-col v-if="detailData.firstCreditAmount" :span="8" class="title">首月减免金额</el-col>
                <el-col v-if="detailData.firstCreditAmount" :span="16">
                  <div class="content">{{detailData.firstCreditAmount / 1000}}</div>
                </el-col>
                <!-- 备注信息 -->
                <el-col v-if="detailData.memo" :span="8" class="title">备注</el-col>
                <el-col v-if="detailData.memo" :span="16">
                  <div class="content">{{detailData.memo}}</div>
                </el-col>
              </div>
              <div class="clear">
                <h3>计费规则</h3>
                <div v-for="(item,index) in detailData.chargList">
                  <el-col :span="8" class="title">{{(item).split('&')[0]}}</el-col>
                  <el-col :span="24">
                    <div class="content">{{(item).split('&')[1]}}</div>
                  </el-col>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <div @click="detailShow.show = !detailShow.show" class="el-icon-close closeIco"></div>
      </div>
    </transition>
    <businessDetail :detailShow="detailShowBusiness" :businessId="businessId"></businessDetail>
  </div>
</template>
<script>
const height = window.screen.height - 51
// 租约详情组件
import businessDetail from '../components/businessDetail'
import $ from 'jquery'
export default {
  name: 'detail',
  data: function () {
    return {
      height: 'height:' + height + 'px',
      menuData: 'contract',
      detailData: '',
      // 财务信息显示隐藏
      detailShowBusiness: {
        show: false
      },
      businessId: ''
    }
  },
  props: ['leaseId', 'detailShow'],
  methods: {
    loadDetail (id) {
      // 获取详情数据
      this.$http.get(this.$store.state.rentUrl + 'lease/get/' + id, {
      }).then(function (response) {
        var data = response.data
        if (data.code === 200) {
          this.detailData = data.data
        }
      }, function (response) {
        console.log(response.status)
      })
    },
    select (index, indexPath) {
      if (index === 'payDetail') {
        this.businessId = this.detailData.id
        this.detailShowBusiness.show = true
        this.detailShow.show = false
      }
    }
  },
  components: {
    businessDetail
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
        this.loadDetail(this.leaseId)
      }
    }
  }
}
</script>
<style scoped>
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
::-webkit-scrollbar {display:none}
::-moz-scrollbar {display:none}
::-ms-scrollbar {display:none}
/*右侧弹窗*/
.dialog{
  width: 50%;
  position:fixed;
  top: 61px;
  background-color: #fff;
  right: 0;
  border-right:3px solid #ccc;
  z-index: 9999;
  border-top:1px solid #e0e0e0;
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