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
                     <div slot="content">支付截止时间</div>
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
               <p>{{item.orderStatus | payStatusFilter}}
                 <span v-if="item.payChannelType">({{item.payChannelType | payType}})</span>
               </p>
              <el-tooltip effect="light" placement="top">
               <div slot="content">支付时间</div>
               <span>{{new Date(item.payTime).toLocaleDateString().replace(/\//g,"-") + new Date(item.payTime).toLocaleTimeString()}}</span>
              </el-tooltip>
            </div>
            <div v-else class="lin55">
              <el-tooltip effect="light" placement="top">
               <div slot="content">订单状态</div>
                 <span>{{item.orderStatus | payStatusFilter}}</span>
              </el-tooltip>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="pad8">
              <p>
                <span>{{item.financeType | financeTypeFilter}}</span>
                <span v-if="item.financeType === 'DESP' || item.financeType === 'DISC' || item.financeType === 'EARNEST'">(租金)</span>
                <span v-else>{{item.payPurposeType | payPurposeTypeFilter}}</span>
                <span v-if="item.payPurposeType === 'REN' && item.periodNumber">.{{item.periodNumber}}期</span>
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
import {payStatus, moneyType, financeType, payMethod} from '@/filters/index.js'
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
    // 金额状态过滤
    payStatusFilter: payStatus,
    // 财务类型过滤
    financeTypeFilter: financeType,
    // 金额类型过滤
    payPurposeTypeFilter: moneyType,
    // 朝向过滤
    payType: payMethod
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














