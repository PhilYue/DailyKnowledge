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
              <p v-if="item.contractStatus === 'WAISIGN'">
                待签订
              </p>
              <p v-else-if="item.contractStatus === 'SIGNING'">
                签订中
              </p>
              <p v-else-if="item.contractStatus === 'ALSIGN'">
                已签订
              </p>
              <p v-else-if="item.contractStatus === 'EFFECT'">
                已生效
              </p>
              <p v-else-if="item.contractStatus === 'CHEND'">
                已换房
              </p>
              <p v-else-if="item.contractStatus === 'THEND'">
                提前退租
              </p>
              <p v-else-if="item.contractStatus === 'SUEND'">
                已转租
              </p>
              <p v-else-if="item.contractStatus === 'END'">
                正常结束
              </p>
              <p v-else-if="item.contractStatus === 'CANCEL'">
                已取消
              </p>
              <p v-else-if="item.contractStatus === 'TOAUDIT'">
                待审核
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
              <span v-if="item.chargLogBeanList.length !== 0"> | 
                <!-- <span v-if="item.rentType ==='MONTH'">月租 | </span>
                <span v-else>日租 | </span> -->
                <span v-if="item.chargLogBeanList[0].cycle === 'ONEMON'">月付</span>
                <span v-else-if="item.chargLogBeanList[0].cycle === 'THREEMON'">季付</span>
                <span v-else-if="item.chargLogBeanList[0].cycle === 'SIXMON'">半年一付</span>
                <span v-else-if="item.chargLogBeanList[0].cycle === 'TWELVEMON'">一年一付</span>
                <span v-else-if="item.chargLogBeanList[0].cycle === 'TWOMON'">二月一付</span>
                <span v-else-if="item.chargLogBeanList[0].cycle === 'FOURMON'">四月一付</span>
                <span v-else-if="item.chargLogBeanList[0].cycle === 'ONEPAY'">一次付清</span>
              </span>
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
  props: ['listData'],
  methods: {
  },
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














