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
                  <div v-if="payData.orderStatus === 'NEW'" class="content">未支付</div>
                  <div v-else-if="payData.orderStatus === 'PAYING'" class="content">支付中</div>
                  <div v-else-if="payData.orderStatus === 'SUC'" class="content">支付成功</div>
                  <div v-else-if="payData.orderStatus === 'MAKE_BILLS'" class="content">已制单</div>
                  <div v-else-if="payData.orderStatus === 'FAIL'" class="content">支付失败</div>
                  <div v-else-if="payData.orderStatus === 'PDOFF'" class="content">线下已支付</div>
                  <div v-else-if="payData.orderStatus === 'PDON'" class="content">线上直接转账已支付</div>
                  <div v-else-if="payData.orderStatus === 'MER'" class="content">已被合并</div>
                  <div v-else-if="payData.orderStatus === 'SPL'" class="content">已被分拆</div>
                  <div v-else-if="payData.orderStatus === 'RETURNING'" class="content">返还中</div>
                  <div v-else-if="payData.orderStatus === 'NOT_RETURN'" class="content">不需要返还</div>
                  <div v-else-if="payData.orderStatus === 'DISTRIBUTED'" class="content">已分账</div>
                  <div v-else-if="payData.orderStatus === 'RET'" class="content">已返还</div>
                  <div v-else-if="payData.orderStatus === 'DEL'" class="content">已删除</div>
                  <div v-else-if="payData.orderStatus === 'PARTPAID'" class="content">分拆后部分已支付</div>
                  <div v-else-if="payData.orderStatus === 'FULLYPAID'" class="content">分拆后全部已支付</div>
                  <div v-else-if="payData.orderStatus === 'MERGEDPAID'" class="content">合并后总订单已支付</div>
                  <div v-else-if="payData.orderStatus === 'CONFIRM'" class="content">财务已确认</div>
                  <div v-else-if="payData.orderStatus === 'CUR_SPL_CONF'" class="content">部分分拆生成订单已确认</div>
                  <div v-else-if="payData.orderStatus === 'ALL_SPL_CONF'" class="content">全部分拆生成订单已确认</div>
                  <div v-else-if="payData.orderStatus === 'MER_CONF'" class="content">合并后的账单已确认</div>
                  <div v-else class="content">已开发票</div>
                </el-col>
                <el-col v-if="payData.payChannelType" :span="8" class="title">支付方式</el-col>
                <el-col v-if="payData.payChannelType" :span="16">
                  <div v-if="payData.payChannelType === 'ALIPAY'" class="content">支付宝</div>
                  <div v-else-if="payData.payChannelType === 'WECHAT'" class="content">微信</div>
                  <div v-else-if="payData.payChannelType === 'ALIQRCODE'" class="content">扫码支付</div>
                  <div v-else-if="payData.payChannelType === 'UNION'" class="content">银联</div>
                  <div v-else-if="payData.payChannelType === 'WALLET'" class="content">钱包</div>
                  <div v-else-if="payData.payChannelType === 'EBANK'" class="content">网银</div>
                  <div v-else-if="payData.payChannelType === 'CASH'" class="content">线下现金支付</div>
                  <div v-else-if="payData.payChannelType === 'H5ALIPAY'" class="content">网页版支付宝</div>
                  <div v-else-if="payData.payChannelType === 'H5WECHAT'" class="content">网页版微信</div>
                </el-col>
                <el-col v-if="payData.payTime" :span="8" class="title">支付时间</el-col>
                <el-col v-if="payData.payTime" :span="16">
                  <div class="content">{{new Date(payData.payTime).toLocaleDateString()}}</div>
                </el-col>
                <el-col v-if="payData.payPurposeType" :span="8" class="title">金额类型</el-col>
                <el-col v-if="payData.payPurposeType" :span="16" class="">
                  <span v-if="payData.payPurposeType === 'REN'" class="content dpl">租金.{{payData.periodNumber}}期</span>
                  <span v-else-if="payData.payPurposeType === 'WATER'" class="content dpl">水费</span>
                  <span v-else-if="payData.payPurposeType === 'ELEC'" class="content dpl">电费</span>
                  <span v-else-if="payData.payPurposeType === 'GAS'" class="content dpl">煤气费</span>
                  <span v-else-if="payData.payPurposeType === 'COM'" class="content dpl">赔偿费</span>
                  <span v-else-if="payData.payPurposeType === 'CLEAN'" class="content dpl">清洁费</span>
                  <span v-else-if="payData.payPurposeType === 'MAIN'" class="content dpl">维修费</span>
                  <span v-else-if="payData.payPurposeType === 'CONSUME'" class="content dpl">消费</span>
                  <span v-else-if="payData.payPurposeType === 'OTH'" class="content dpl">其他</span>
                  <span v-else-if="payData.payPurposeType === 'PERFEE'" class="content dpl">物管费</span>
                  <span v-else-if="payData.payPurposeType === 'MANAGECOST'" class="content dpl">手续费</span>
                  <span v-else-if="payData.payPurposeType === 'NETWORK'" class="content dpl">网络费</span>
                  <span v-else-if="payData.payPurposeType === 'CHANGE_FEE'" class="content dpl">换房费用</span>
                  <span v-else-if="payData.payPurposeType === 'SUBLET_FEE'" class="content dpl">转租费用</span>
                  <span v-else-if="payData.payPurposeType === 'CANCEL_FEE'" class="content dpl">退租费用</span>
                  <span v-if="payData.financeType === 'DESP'" class="content dpl">(押金)</span>
                  <span v-else-if="payData.financeType === 'EARNEST'" class="content dpl">(定金)</span>
                  <span v-else-if="payData.financeType === 'DISC'" class="content dpl">(抵扣)</span>
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
                        <div class="content" v-if="item.newStatus === 'NEW'">未支付</div>
                        <div class="content" v-else-if="item.newStatus === 'PAYING'">支付中</div>
                        <div class="content" v-else-if="item.newStatus === 'SUC'">支付成功</div>
                        <div class="content" v-else-if="item.newStatus === 'FAIL'">支付失败</div>
                        <div class="content" v-else-if="item.newStatus === 'MAKE_BILLS'">已制单</div>
                        <div class="content" v-else-if="item.newStatus === 'PDOFF'">线下已支付</div>
                        <div class="content" v-else-if="item.newStatus === 'PDON'">线上直接转账已支付</div>
                        <div class="content" v-else-if="item.newStatus === 'MER'">已被合并</div>
                        <div class="content" v-else-if="item.newStatus === 'SPL'">已被分拆</div>
                        <div class="content" v-else-if="item.newStatus === 'RET'">已返还</div>
                        <div class="content" v-else-if="item.newStatus === 'NOT_RETURN'">不需要返还</div>
                        <div class="content" v-else-if="item.newStatus === 'RETURNING'">返还中</div>
                        <div class="content" v-else-if="item.newStatus === 'DISTRIBUTED'">已分账</div>
                        <div class="content" v-else-if="item.newStatus === 'DEL'">已删除</div>
                        <div class="content" v-else-if="item.newStatus === 'ISSUED'">已开发票</div>
                        <div class="content" v-else-if="item.newStatus === 'PARTPAID'">分拆后部分已支付</div>
                        <div class="content" v-else-if="item.newStatus === 'FULLYPAID'">分拆后全部已支付</div>
                        <div class="content" v-else-if="item.newStatus === 'MERGEDPAID'">合并后总订单已支付</div>
                        <div class="content" v-else-if="item.newStatus === 'CONFIRM'">财务已确认</div>
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
                        <div class="content dpl" v-if="item.payPurposeType === 'REN'">租金.{{item.periodNumber}}期</div>
                        <div v-else-if="item.payPurposeType === 'WATER'" class="content dpl">水费</div>
                        <div v-else-if="item.payPurposeType === 'ELEC'" class="content dpl">电费</div>
                        <div v-else-if="item.payPurposeType === 'GAS'" class="content dpl">煤气费</div>
                        <div v-else-if="item.payPurposeType === 'COM'" class="content dpl">赔偿费</div>
                        <div v-else-if="item.payPurposeType === 'CLEAN'" class="content dpl">清洁费</div>
                        <div v-else-if="item.payPurposeType === 'MAIN'" class="content dpl">维修费</div>
                        <div v-else-if="item.payPurposeType === 'CONSUME'" class="content dpl">消费</div>
                        <div v-else-if="item.payPurposeType === 'OTH'" class="content dpl">其他</div>
                        <div v-else-if="item.payPurposeType === 'PERFEE'" class="content dpl">物管费</div>
                        <div v-else-if="item.payPurposeType === 'MANAGECOST'" class="content dpl">手续费</div>
                        <div v-else-if="item.payPurposeType === 'NETWORK'" class="content dpl">网络费</div>
                        <div v-else-if="item.payPurposeType === 'CHANGE_FEE'" class="content dpl">换房费用</div>
                        <div v-else-if="item.payPurposeType === 'SUBLET_FEE'" class="content dpl">转租费用</div>
                        <div v-else-if="item.payPurposeType === 'CANCEL_FEE'" class="content dpl">退租费用</div>
                        <div v-if="item.financeType === 'DESP'" class="content dpl">(押金)</div>
                        <div v-else-if="item.financeType === 'EARNEST'" class="content dpl">(定金)</div>
                        <div v-else-if="item.financeType === 'DISC'" class="content dpl">(抵扣)</div>
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
                        <div class="content dpl" v-if="item.payPurposeType === 'REN'">租金.{{item.periodNumber}}期</div>
                        <div v-else-if="item.payPurposeType === 'WATER'" class="content dpl">水费</div>
                        <div v-else-if="item.payPurposeType === 'ELEC'" class="content dpl">电费</div>
                        <div v-else-if="item.payPurposeType === 'GAS'" class="content dpl">煤气费</div>
                        <div v-else-if="item.payPurposeType === 'COM'" class="content dpl">赔偿费</div>
                        <div v-else-if="item.payPurposeType === 'CLEAN'" class="content dpl">清洁费</div>
                        <div v-else-if="item.payPurposeType === 'MAIN'" class="content dpl">维修费</div>
                        <div v-else-if="item.payPurposeType === 'CONSUME'" class="content dpl">消费</div>
                        <div v-else-if="item.payPurposeType === 'OTH'" class="content dpl">其他</div>
                        <div v-else-if="item.payPurposeType === 'PERFEE'" class="content dpl">物管费</div>
                        <div v-else-if="item.payPurposeType === 'MANAGECOST'" class="content dpl">手续费</div>
                        <div v-else-if="item.payPurposeType === 'NETWORK'" class="content dpl">网络费</div>
                        <div v-else-if="item.payPurposeType === 'CHANGE_FEE'" class="content dpl">换房费用</div>
                        <div v-else-if="item.payPurposeType === 'SUBLET_FEE'" class="content dpl">转租费用</div>
                        <div v-else-if="item.payPurposeType === 'CANCEL_FEE'" class="content dpl">退租费用</div>
                        <div v-if="item.financeType === 'DESP'" class="content dpl">(押金)</div>
                        <div v-else-if="item.financeType === 'EARNEST'" class="content dpl">(定金)</div>
                        <div v-else-if="item.financeType === 'DISC'" class="content dpl">(抵扣)</div>
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
    <reserveHouseDetail :detailShow="detailShowRes" :reserveHouseId="reserveHouseId"></reserveHouseDetail>
    <!-- 租约详情子组件 -->
    <leaseDetail :detailShow="detailShowRent" :leaseId="leaseId"></leaseDetail>
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
// 租约详情组件
import leaseDetail from '../components/leaseDetail'
// 预定详情组件
import reserveHouseDetail from '../components/reserveHouseDetail'
import conDetail from '../components/conDetail' // 合同详情组件
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
      if (index === 'contract') {
        console.log(this.payData)
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
    }
  },
  components: {
    reserveHouseDetail,
    leaseDetail,
    conDetail
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