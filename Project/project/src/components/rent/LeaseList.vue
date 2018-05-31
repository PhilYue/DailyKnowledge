<template>
  <div>
    <div class="list-contain-div" v-for="(item,index) in listData">
      <div>
        <el-row>
        <!-- 姓名 -->
          <el-col :span="2">
            <div class="">
               <img src="https://o6niowncl.qnssl.com/user-default-img-b-14.png" width="50"/>
            </div>
          </el-col>
          <!-- 电话 -->
          <el-col :span="5">
            <div class="pad8">
              <p>{{item.userName}}</p>
              <p>{{item.userPhone}}</p>
            </div>
          </el-col>
        <!-- 签约时间和状态 -->
          <el-col :span="7">
            <div class="pad8">
              <el-tooltip effect="light" placement="top">
               <div slot="content">起租/退租时间</div>
               <span>{{new Date(item.startTime).toLocaleDateString()}}-{{new Date(item.endTime).toLocaleDateString()}}</span>
              </el-tooltip>
              <p>{{item.houseSpaceName}}</p>
            </div>
          </el-col>
        <!-- 房源名称 -->
          <el-col :span="4">
            <div class="lin55">
              <p v-if="item.leaseStatus === 'NOEFFECT'">
                待生效
              </p>
              <p v-else-if="item.leaseStatus === 'RENTING'">
                出租中
              </p>
              <p v-else-if="item.leaseStatus === 'OWEING'">
                欠费中
              </p>
              <p v-else-if="item.leaseStatus === 'WABEOUT'">
                欠费待清退
              </p>
              <p v-else-if="item.leaseStatus === 'WATHROW'">
                退租待确认
              </p>
              <p v-else-if="item.leaseStatus === 'WASUBLET'">
                转租待确认
              </p>
              <p v-else-if="item.leaseStatus === 'ALCONSUB'">
                转租已确认
              </p>
              <p v-else-if="item.leaseStatus === 'WARENEWAL'">
                续租待确认
              </p>
              <p v-else-if="item.leaseStatus === 'ALRENEWAL'">
                续租已确认
              </p>
              <p v-else-if="item.leaseStatus === 'WACHANGR'">
                换房待确认
              </p>
              <p v-else-if="item.leaseStatus === 'ALCHANGR'">
                换房已确认
              </p>
              <p v-else-if="item.leaseStatus === 'END'">
                租约已结束
              </p>
              <p v-else-if="item.leaseStatus === 'CHEND'">
                已换房
              </p>
              <p v-else-if="item.leaseStatus === 'THEND'">
                提前结束
              </p>
              <p v-else-if="item.leaseStatus === 'SUEND'">
                已转租
              </p>
              <p v-else-if="item.leaseStatus === 'NSTHROW'">
                退租费用未结清
              </p>
              <p v-else-if="item.leaseStatus === 'ASTHROW'">
                退租费用已结清
              </p>
              <p v-else-if="item.leaseStatus === 'NSUBLET'">
                转租费用未结清
              </p>
              <p v-else-if="item.leaseStatus === 'ASUBLET'">
                转租费用已结清
              </p>
              <p v-else-if="item.leaseStatus === 'REND'">
                已续租
              </p>
              <p v-else-if="item.leaseStatus === 'HOLD'">
                租约超期
                <span class="red">{{dateDiff(new Date(item.endTime).toLocaleDateString(),new Date(new Date().getTime()).toLocaleDateString())}}天</span>
              </p>
            </div>
          </el-col>
        <!-- 租金押金 -->
          <el-col :span="4">
            <div class="pad8">
              <p>租金:{{(item.rental / 1000).toFixed(2)}}</p>
              <el-tooltip effect="light" placement="top">
                <div slot="content">押金</div>
                <span>押金:{{(item.deposit / 1000).toFixed(2)}}</span>
              </el-tooltip>
              <!-- <span v-if="item.rentType === 'MONTH'"> | 月租 |</span>
              <span v-else> | 日租 |</span> -->
              <span v-if="item.payCycle === 'ONEMON'"> | 月付</span>
              <span v-else-if="item.payCycle === 'THREEMON'"> | 季付</span>
              <span v-else-if="item.payCycle === 'SIXMON'"> | 半年一付</span>
              <span v-else-if="item.payCycle === 'TWELVEMON'"> | 一年一付</span>
              <span v-else-if="item.payCycle === 'TWOMON'"> | 二月一付</span>
              <span v-else-if="item.payCycle === 'FOURMON'"> | 四月一付</span>
              <span v-else-if="item.payCycle === 'ONEPAY'"> | 一次付清</span>
            </div>
          </el-col>
        <!-- 按钮组件 -->
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
  props: ['listData'],
  components: {
  }
}
</script>
<style scoped>
.list-contain-div{
  padding: 10px 0;
  font-size: 13px;
  color: #555;
  border-top:1px solid #eee;
}
.list-contain-div:first-child{
  border-top:none;
}
.red{
  color: red;
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100px;
  display: inline-block;
}
</style>














