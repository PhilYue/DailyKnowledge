<template>
  <div class="detail">
    <transition name="fade">
      <div v-if="detailShow.show" class="dialog" :style="height">
        <el-row class="height-w100">
          <el-col class="form-contL" :span="6" style="padding:0;">
            <el-menu @select="select" :default-active="menuData" class="el-menu-vertical-demo">
              <el-menu-item index="pay">费用详情</el-menu-item>
              <el-menu-item index="contract">合同详情</el-menu-item>
              <!-- <el-menu-item index="contract">托管详情</el-menu-item> -->
            </el-menu>
          </el-col>
          <el-col class="form-cont" :span="18">
            <div class="contain">
            <!-- 费用信息 -->
              <div class="clear">
                <h3>费用详情信息</h3>
                <el-col v-if="payData.createTime" :span="8" class="title">生成时间</el-col>
                <el-col v-if="payData.createTime" :span="16">
                  <div class="content">{{new Date(payData.createTime).toLocaleDateString()}}</div>
                </el-col>
                <el-col v-if="payData.newPayDeadlineTime" :span="8" class="title">最后期限</el-col>
                <el-col v-if="payData.newPayDeadlineTime" :span="16">
                  <div class="content">{{new Date(payData.newPayDeadlineTime).toLocaleDateString()}}</div>
                </el-col>
                <el-col v-if="payData.payDurationStartTime" :span="8" class="title">费用周期</el-col>
                <el-col v-if="payData.payDurationStartTime" :span="16">
                  <div class="content">{{new Date(payData.payDurationStartTime).toLocaleDateString()}} - {{new Date(payData.payDurationEndTime).toLocaleDateString()}}</div>
                </el-col>
                <el-col v-if="payData.amount" :span="8" class="title">金额数目</el-col>
                <el-col v-if="payData.amount" :span="16">
                  <div class="content">{{(payData.amount / 1000).toFixed(2)}}</div>
                </el-col>
                <el-col v-if="payData.orderStatus" :span="8" class="title">金额状态</el-col>
                <el-col v-if="payData.orderStatus" :span="16">
                  <div class="content">{{payData.orderStatus | payStatus}}</div>
                </el-col>
                <el-col v-if="payData.payChannelType" :span="8" class="title">支付方式</el-col>
                <el-col v-if="payData.payChannelType" :span="16">
                  <div class="content">{{payData.payChannelType | payMethod}}</div>
                </el-col>
                <el-col v-if="payData.payTime" :span="8" class="title">支付时间</el-col>
                <el-col v-if="payData.payTime" :span="16">
                  <div class="content">{{new Date(payData.payTime).toLocaleDateString()}}</div>
                </el-col>
                <el-col v-if="payData.payPurposeType" :span="8" class="title">金额类型</el-col>
                <el-col v-if="payData.payPurposeType" :span="16" class="">
                  <span>{{payData.financeType | financeTypeFilter}}</span>
                  <span class="content dpl" v-if="payData.financeType === 'DESP' || payData.financeType === 'DISC' || payData.financeType === 'EARNEST'">(租金)</span>
                  <span class="content dpl" v-else>{{payData.payPurposeType | payPurposeTypeFilter}}</span>
                  <span class="content dpl" v-if="payData.payPurposeType === 'REN' && payData.periodNumber">.{{payData.periodNumber}}期</span>
                </el-col>
                <el-col v-if="payData.memo" :span="8" class="title">备注</el-col>
                <el-col v-if="payData.memo" :span="16">
                  <div class="content">{{payData.memo}}</div>
                </el-col>
              </div>
              <!-- 操作记录详情 -->
              <div class="clear">
                <h3 v-if="payData.resPayLogBeanList">操作记录</h3>
                <div class="clear" v-if="payData.resPayLogBeanList">
                  <div :class="[index % 2 === 0 ? activeClass : '', fl, w50p]" v-for="(item,index) in payData.resPayLogBeanList">
                      <el-col v-if="item.userName" :span="8" class="title">操作人</el-col>
                      <el-col v-if="item.userName" :span="16">
                        <div class="content">{{item.userName}}</div>
                      </el-col>
                      <el-col v-if="item.userPhone" :span="8" class="title">操作人手机号</el-col>
                      <el-col v-if="item.userPhone" :span="16">
                        <div class="content">{{item.userPhone}}</div>
                      </el-col>
                      <el-col v-if="item.createTime" :span="8" class="title">操作时间</el-col>
                      <el-col v-if="item.createTime" :span="16">
                        <div class="content">{{new Date(item.createTime).toLocaleDateString().replace(/\//g,"-") + new Date(item.createTime).toLocaleTimeString()}}</div>
                      </el-col>
                      <el-col v-if="item.memo" :span="8" class="title">操作备注</el-col>
                      <el-col v-if="item.memo" :span="16">
                        <div class="content">{{item.memo}}</div>
                      </el-col>
                      <el-col v-if="item.newStatus" :span="8" class="title">操作后状态</el-col>
                      <el-col v-if="item.newStatus" :span="16">
                        <div class="content">{{item.newStatus | payStatus}}</div>
                      </el-col>
                  </div>
                </div>
              </div>
              <!-- 由以下费用合并 -->
              <div class="clear">
                <h3 v-if="payData.mergedSubOrders">由以下费用合并而来</h3>
                <div v-if="payData.mergedSubOrders" class="clear">
                  <div :class="[index % 2 === 0 ? activeClass : '', fl, w50p]" v-for="(item,index) in payData.mergedSubOrders">
                      <el-col v-if="item.createTime" :span="8" class="title">费用区间</el-col>
                      <el-col v-if="item.createTime" :span="16">
                        <div class="content">{{new Date(item.payDurationStartTime).toLocaleDateString()}}-{{new Date(item.payDurationEndTime).toLocaleDateString()}}</div>
                      </el-col>
                      <el-col v-if="item.amount" :span="8" class="title">金额数目</el-col>
                      <el-col v-if="item.amount" :span="16">
                        <div class="content">{{(item.amount / 1000).toFixed(2)}}</div>
                      </el-col>
                      <el-col v-if="item.payPurposeType" :span="8" class="title">金额类型</el-col>
                      <el-col v-if="item.payPurposeType" :span="16" class="">
                        <span>{{item.financeType | financeTypeFilter}}</span>
                        <span class="content dpl" v-if="item.financeType === 'DESP' || item.financeType === 'DISC' || item.financeType === 'EARNEST'">(租金)</span>
                        <span class="content dpl" v-else>{{item.payPurposeType | payPurposeTypeFilter}}</span>
                        <span class="content dpl" v-if="item.payPurposeType === 'REN' && item.periodNumber">.{{item.periodNumber}}期</span>
                      </el-col>
                      <el-col v-if="item.memo" :span="8" class="title">备注</el-col>
                      <el-col v-if="item.memo" :span="16">
                        <div class="content">{{item.memo}}</div>
                      </el-col>
                  </div>
                </div>
              </div>
              <!-- 分割为以下费用 -->
              <div class="clear">
                <h3 v-if="payData.splitSubOrders">分割为以下费用</h3>
                <div v-if="payData.splitSubOrders" class="clear">
                  <div :class="[index % 2 === 0 ? activeClass : '', fl, w50p]" v-for="(item,index) in payData.splitSubOrders">
                      <el-col v-if="item.payDurationStartTime" :span="8" class="title">费用区间</el-col>
                      <el-col v-if="item.payDurationStartTime" :span="16">
                        <div class="content">{{new Date(item.payDurationStartTime).toLocaleDateString()}}-{{new Date(item.payDurationEndTime).toLocaleDateString()}}</div>
                      </el-col>
                      <el-col v-if="item.amount" :span="8" class="title">金额数目</el-col>
                      <el-col v-if="item.amount" :span="16">
                        <div class="content">{{(item.amount / 1000).toFixed(2)}}</div>
                      </el-col>
                      <el-col v-if="item.payPurposeType" :span="12" class="title">金额类型</el-col>
                      <el-col v-if="item.payPurposeType" :span="12" class="">
                        <span>{{item.financeType | financeTypeFilter}}</span>
                        <span class="content dpl" v-if="item.financeType === 'DESP' || item.financeType === 'DISC' || item.financeType === 'EARNEST'">(租金)</span>
                        <span class="content dpl" v-else>{{item.payPurposeType | payPurposeTypeFilter}}</span>
                        <span class="content dpl" v-if="item.payPurposeType === 'REN' && item.periodNumber">.{{item.periodNumber}}期</span>
                      </el-col>
                      <el-col v-if="item.memo" :span="12" class="title">备注</el-col>
                      <el-col v-if="item.memo" :span="12">
                        <div class="content">{{item.memo}}</div>
                      </el-col>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <div @click="detailShow.show = !detailShow.show" class="el-icon-close closeIco"></div>
      </div>
    </transition>
    <!-- 预定详情组件 -->
    <reserve-house-detail :detailShow="detailShowRes" :reserveHouseId="reserveHouseId"></reserve-house-detail>
    <!-- 租约详情子组件 -->
    <lease-detail @selectIndex="selectIndex" :detailShow="detailShowRent" :leaseId="leaseId"></lease-detail>
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
// 过滤账单状态
import {payStatus, moneyType, financeType, payMethod} from '@/filters/index.js'
// 租约详情组件
import LeaseDetail from '@/components/rent/LeaseDetail'
// 预定详情组件
import ReserveHouseDetail from '@/components/rent/ReserveHouseDetail'
import conDetail from '@/components/conDetail' // 合同详情组件
const height = window.screen.height - 51
import $ from 'jquery'
export default {
  name: 'detail',
  data: function () {
    return {
      // 预定详情组件
      detailShowRes: {
        show: false
      },
      reserveHouseId: '',
      // 租约详情组件
      detailShowRent: {
        show: false
      },
      leaseId: '',
      height: 'height:' + height + 'px',
      fl: 'fl',
      w50p: 'w-50p',
      activeClass: 'activeClass',
      menuData: 'pay',
      conDetailShow: false, // 控制房东合同显隐
      contractId: '', // 合同ID
      detailClick: 0
    }
  },
  methods: {
    select (index, indexPath) {
      this.menuData = index
      if (index === 'contract') {
        if (this.payData.businessType === 'RES') {
          this.reserveHouseId = this.payData.businessId
          this.detailShowRes.show = true
        } else if (this.payData.businessType === 'RENT') {
          this.leaseId = this.payData.businessId
          this.detailShowRent.show = true
        } else if (this.payData.businessType === 'DEL') {
          this.contractId = this.payData.businessId
          this.conDetailShow = true
          this.detailClick++
        }
      }
    },
    closeForm () { // 关闭合同详情弹窗
      this.conDetailShow = false
      this.detailClick++
    },
    // 监听租约详情关闭默认标签
    selectIndex: function(val) {
      this.menuData = 'pay'
    }
  },
  components: {
    ReserveHouseDetail,
    LeaseDetail,
    conDetail
  },
  filters: {
    // 金额状态过滤
    payStatus,
    // 财务类型过滤
    financeTypeFilter: financeType,
    // 金额类型过滤
    payPurposeTypeFilter: moneyType,
    // 支付方式过滤
    payMethod
  },
  props: ['detailShow', 'payData'],
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
  created () {
    // 隐藏此弹框
    this.$root.payDetail.$on('payDetailHide', value => {
      this.detailShow.show = false
    })
  }
}
</script>
<style scoped>
.dpl{
  display: inline-block;
}
.activeClass{
  margin-bottom: 19px;
  border-bottom: 1px dashed #ccc;
}
.w-50p{
  width: 100%;
}
.h3{
  margin: 18px 0;
}
.mgb{
  margin-bottom: 18px;
}
::-webkit-scrollbar {display:none}
::-moz-scrollbar {display:none}
::-ms-scrollbar {display:none}
.el-menu{
  background-color: #d3dce6;
}
.detail .el-menu-item{
  background-color: #d3dce6;
  border-left: 3px solid #d3dce6;
  transition: all .5s;
}
.detail .el-menu-item:hover{
  background-color: #fff;
  border-color: #20a0ff;
  color: #333;
}
.detail .el-menu-item.is-active{
  background-color: #fff;
  border-color: #20a0ff;
  color: #333;
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