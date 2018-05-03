<template>
  <div>
    <div class="list-contain-div" v-for="(item,index) in listData">
      <div>
        <el-row>
          <el-col :span="2">
            <div class="lin55">
               <img src="https://o6niowncl.qnssl.com/user-default-img-b-14.png" width="50"/>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="pad8">
              <p>{{item.userName}}</p>
              <p>{{item.userPhone}}</p>
            </div>
          </el-col>
          <el-col :span="2">
            <div v-if="item.payChannelType === 'ALIQRCODE'">
              <div class="lin55">
              </div>
            </div>
            <div v-else class="pad8">
              <div v-show="yqShow">
                <p>
                   <el-tooltip effect="light" placement="top">
                     <div slot="content">通知支付时间</div>
                     <span>{{new Date(item.newPayDeadlineTime).toLocaleDateString()}}</span>
                   </el-tooltip>
                </p>
                <div v-if="item.orderStatus === 'NEW' && item.newPayDeadlineTime < Date.parse(new Date())">
                  <p class="orange" v-if="7 >= dateDiff(new Date(item.newPayDeadlineTime).toLocaleDateString(),new Date(new Date().getTime()).toLocaleDateString()) > 0">逾期{{dateDiff(new Date(item.newPayDeadlineTime).toLocaleDateString(),new Date(new Date().getTime()).toLocaleDateString())}}天</p>
                  <p class="red" v-else-if="dateDiff(new Date(item.newPayDeadlineTime).toLocaleDateString(),new Date(new Date().getTime()).toLocaleDateString()) > 7">逾期{{dateDiff(new Date(item.newPayDeadlineTime).toLocaleDateString(),new Date(new Date().getTime()).toLocaleDateString())}}天</p>
                  <p v-else>无逾期</p>
                </div>
                <div v-else>无逾期</div>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="lin55" v-if="item.payDurationStartTime === null">
            线下扫码支付
            </div>
            <div class="lin55" v-else>
              <el-tooltip effect="light" placement="top">
                 <div slot="content">费用区间</div>
                 <span>{{new Date(item.payDurationStartTime).toLocaleDateString()}} - {{new Date(item.payDurationEndTime).toLocaleDateString()}}</span>
               </el-tooltip>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="pad8">
              <p>{{item.houseSpaceName}}</p>
              <p v-if="item.memo && item.memo.indexOf(')') !== -1" class="beizhu">{{item.memo.split(')').reverse()[1]}})</p>
              <p v-else-if="item.memo && item.memo.indexOf(')') === -1" class="beizhu">{{item.memo}})</p>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="pad8" v-if="item.payTime">
               <p v-if="item.orderStatus === 'NEW'">未支付</p>
               <p v-else-if="item.orderStatus === 'PAYING'">支付中</p>
               <p v-else-if="item.orderStatus === 'SUC'">支付成功
               <span v-if="item.payChannelType">({{item.payChannelType | payType}})</span></p>
               <p v-else-if="item.orderStatus === 'FAIL'">支付失败</p>
               <p v-else-if="item.orderStatus === 'PDOFF'">线下已支付
               <span v-if="item.payChannelType">({{item.payChannelType | payType}})</span></p>
               <p v-else-if="item.orderStatus === 'PDON'">线上直接转账已支付
               <span v-if="item.payChannelType">({{item.payChannelType | payType}})</span></p>
               <p v-else-if="item.orderStatus === 'MER'">已被合并</p>
               <p v-else-if="item.orderStatus === 'SPL'">已被分拆</p>
               <p v-else-if="item.orderStatus === 'MAKE_BILLS'">已制单</p>
               <p v-else-if="item.orderStatus === 'RET'">已返还</p>
               <p v-else-if="item.orderStatus === 'RETURNING'">返还中</p>
               <p v-else-if="item.orderStatus === 'DISTRIBUTED'">已分账</p>
               <p v-else-if="item.orderStatus === 'NOT_RETURN'">不需要返还</p>
               <p v-else-if="item.orderStatus === 'DEL'">已删除</p>
               <p v-else-if="item.orderStatus === 'ISSUED'">已开发票</p>
               <p v-else-if="item.orderStatus === 'CF'">已被结转</p>
               <p v-else-if="item.orderStatus === 'PARTPAID'">分拆后部分已支付
               <span v-if="item.payChannelType">({{item.payChannelType | payType}})</span></p>
               <p v-else-if="item.orderStatus === 'FULLYPAID'">分拆后全部已支付
               <span v-if="item.payChannelType">({{item.payChannelType | payType}})</span></p>
               <p v-else-if="item.orderStatus === 'MERGEDPAID'">合并后总订单已支付
               <span v-if="item.payChannelType">({{item.payChannelType | payType}})</span></p>
               <p v-else-if="item.orderStatus === 'CONFIRM'">财务已确认
               <span v-if="item.payChannelType">({{item.payChannelType | payType}})</span></p>
               <p v-else-if="item.orderStatus === 'CUR_SPL_CONF'">部分分拆生成订单已确认
               <span v-if="item.payChannelType">({{item.payChannelType | payType}})</span></p>
               <p v-else-if="item.orderStatus === 'ALL_SPL_CONF'">全部分拆生成订单已确认
               <span v-if="item.payChannelType">({{item.payChannelType | payType}})</span></p>
               <p v-else-if="item.orderStatus === 'MER_CONF'">合并后的账单已确认
               <span v-if="item.payChannelType">({{item.payChannelType | payType}})</span></p>
              <el-tooltip effect="light" placement="top">
               <div slot="content">支付时间</div>
               <span>{{new Date(item.payTime).toLocaleDateString().replace(/\//g,"-") + new Date(item.payTime).toLocaleTimeString()}}</span>
              </el-tooltip>
            </div>
            <div v-else class="lin55">
              <el-tooltip effect="light" placement="top">
               <div slot="content">订单状态</div>
                 <span v-if="item.orderStatus === 'NEW'">未支付</span>
                 <span v-else-if="item.orderStatus === 'PAYING'">支付中</span>
                 <span v-else-if="item.orderStatus === 'SUC'">支付成功</span>
                 <span v-else-if="item.orderStatus === 'FAIL'">支付失败</span>
                 <span v-else-if="item.orderStatus === 'PDOFF'">线下已支付</span>
                 <span v-else-if="item.orderStatus === 'MAKE_BILLS'">已制单</span>
                 <span v-else-if="item.orderStatus === 'PDON'">线上直接转账已支付</span>
                 <span v-else-if="item.orderStatus === 'MER'">已被合并</span>
                 <span v-else-if="item.orderStatus === 'SPL'">已被分拆</span>
                 <span v-else-if="item.orderStatus === 'RET'">已返还</span>
                 <span v-else-if="item.orderStatus === 'RETURNING'">返还中</span>
                 <span v-else-if="item.orderStatus === 'NOT_RETURN'">不需要返还</span>
                 <span v-else-if="item.orderStatus === 'DISTRIBUTED'">已分账</span>
                 <span v-else-if="item.orderStatus === 'DEL'">已删除</span>
                 <span v-else-if="item.orderStatus === 'ISSUED'">已开发票</span>
                 <span v-else-if="item.orderStatus === 'PARTPAID'">分拆后部分已支付</span>
                 <span v-else-if="item.orderStatus === 'FULLYPAID'">分拆后全部已支付</span>
                 <span v-else-if="item.orderStatus === 'MERGEDPAID'">合并后总订单已支付</span>
                 <span v-else-if="item.orderStatus === 'CONFIRM'">财务已确认</span>
              </el-tooltip>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="pad8">
              <p>
                <span v-if="item.financeType === 'DESP'">押金</span>
                <span v-else-if="item.financeType === 'DISC'">抵扣</span>
                <span v-else-if="item.financeType === 'EARNEST'">定金</span>
                <span v-if="item.payPurposeType === 'REN' && item.financeType !== 'DESP' && item.financeType !== 'EARNEST' && item.financeType !== 'DISC'">租金.{{item.periodNumber}}期</span>
                <span v-else-if="item.payPurposeType === 'REN' && item.financeType === 'DESP' || item.financeType === 'EARNEST' || item.financeType === 'DISC'">(租金)</span>
                <span v-else-if="item.payPurposeType === 'WATER'">水费</span>
                <span v-else-if="item.payPurposeType === 'ELEC'">电费</span>
                <span v-else-if="item.payPurposeType === 'GAS'">煤气费</span>
                <span v-else-if="item.payPurposeType === 'COM'">赔偿费</span>
                <span v-else-if="item.payPurposeType === 'CLEAN'">清洁费</span>
                <span v-else-if="item.payPurposeType === 'MAIN'">维修费</span>
                <span v-else-if="item.payPurposeType === 'CONSUME'">消费</span>
                <span v-else-if="item.payPurposeType === 'OTH'">其他</span>
                <span v-else-if="item.payPurposeType === 'PERFEE'">物管费</span>
                <span v-else-if="item.payPurposeType === 'NETWORK'">网络费</span>
                <span v-else-if="item.payPurposeType === 'MANAGECOST'">手续费</span>
                <span v-else-if="item.payPurposeType === 'CHANGE_FEE'">换房费用</span>
                <span v-else-if="item.payPurposeType === 'SUBLET_FEE'">转租费用</span>
                <span v-else-if="item.payPurposeType === 'CANCEL_FEE'">退租费用</span>
              </p>
              <p>{{(item.amount / 1000).toFixed(2)}}</p>
            </div>
          </el-col>
          <slot :index="index"></slot>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'list',
  data: function () {
    return {
    }
  },
  props: ['listData', 'yqShow'],
  methods: {
    dateDiff (startDateString, endDateString) {
      var separator = '/' // 日期分隔符
      var startDates = startDateString.split(separator)
      var endDates = endDateString.split(separator)
      var startDate = new Date(startDates[0], startDates[1] - 1, startDates[2])
      var endDate = new Date(endDates[0], endDates[1] - 1, endDates[2])
      return parseInt(Math.abs(endDate - startDate) / 1000 / 60 / 60 / 24) // 把相差的毫秒数转换为天数
    }
  },
  filters: {
    // 朝向过滤
    payType: function (value) {
      if (value === 'ALIPAY') {
        return '支付宝'
      } else if (value === 'WECHAT') {
        return '微信支付'
      } else if (value === 'UNION') {
        return '银联'
      } else if (value === 'WALLET') {
        return '钱包支付'
      } else if (value === 'EBANK') {
        return '网银'
      } else if (value === 'CASH') {
        return '线下现金支付'
      } else if (value === 'H5ALIPAY') {
        return '网页版支付宝'
      } else if (value === 'H5WECHAT') {
        return '网页版微信'
      } else if (value === 'ALIQRCODE') {
        return '支付宝二维码'
      }
    }
  }
}
</script>
<style scoped>
.beizhu{
  color: #ccc;
  overflow: hidden; /*自动隐藏文字*/
  text-overflow: ellipsis;/*文字隐藏后添加省略号*/
  white-space: nowrap;/*强制不换行*/
}
.list-contain-div{
  padding: 10px 0;
  font-size: 13px;
  color: #555;
  border-top:1px solid #eee;
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
.name-pos{
  position: relative;
  top: -18px;
  right: -8px;
}
.orange{
  color: orange;
}
.red{
  color: red;
}
</style>














