<template>
  <div>
    <div class="list-contain-div" v-for="(item,index) in listData">
    <div>
      <el-row>
      <!-- 头像 -->
        <el-col :span="2">
          <div class="">
             <img src="https://o6niowncl.qnssl.com/user-default-img-b-14.png" width="50"/>
          </div>
        </el-col>
        <!-- 电话号码 -->
        <el-col :span="4">
          <div class="pad8">
            <p>{{item.userName}}</p>
            <p>{{item.userPhone}}</p>
          </div>
        </el-col>
        <!-- 房源名称 -->
        <el-col :span="8">
          <div class="lin55">
            <span v-if="item.houseRentType === 'ENTIRE_RENT'">套房</span>
            <span v-else-if="item.houseRentType === 'JOINT_RENT'">单间</span>-{{item.houseSpaceName}}
          </div>
        </el-col>
      <!-- 签约时间 -->
        <el-col :span="2">
          <div class="lin55">
            <el-tooltip effect="light" placement="top">
             <div slot="content">登记时间</div>
             <span>{{new Date(item.registerTime).toLocaleDateString()}}</span>
            </el-tooltip>
          </div>
        </el-col>
          <!-- 状态 -->
        <el-col :span="3">
          <div class="lin55">
            <p v-if="item.reservationStatus === 'WAITPAY'">
              待支付
            </p>
            <p v-else-if="item.reservationStatus === 'ALPAY'">
              已支付
            </p>
            <p v-else-if="item.reservationStatus === 'BUCON'">
              已新建出租合同
            </p>
            <p v-else>
              已取消
            </p>
          </div>
        </el-col>
      <!-- 销售人员和金额 -->
        <el-col :span="3">
          <div class="lin55">
            <!-- <el-tooltip effect="light" placement="top">
              <div slot="content">销售人员</div>
              <span>{{item.houseKeeperName}}</span>
            </el-tooltip> -->
            <p>定金{{(item.earnest / 1000).toFixed(2)}}</p>
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
    openDetail ($event, index) {
      if (this.detailShow.show === true) {
        this.detailShow.show === false
      } else {
        if ($event.target.innerHTML === '操作') {
        } else {
          // 获取详情数据
          this.$http.get(this.$store.state.rentUrl + 'reservation/get/' + this.listData[index].reservationId, {
          }).then(function (response) {
            var data = response.data
            if (data.code === 200) {
              this.detailData = data.data
              this.detailShow.show = true
            }
          }, function (response) {
            console.log(response.status)
          })
        }
      }
    }
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
}
</style>














