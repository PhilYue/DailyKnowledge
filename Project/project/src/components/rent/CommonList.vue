<template>
  <div>
    <div class="list-contain-div" v-for="(item,index) in listData">
      <div>
        <el-row>
          <el-col :span="2">
            <div class="">
               <img src="https://o6niowncl.qnssl.com/user-default-img-b-14.png" width="50"/>
            </div>
          </el-col>
          <!-- 姓名 -->
          <el-col :span="4">
            <div class="pad8">
              <p><span>{{item.userName}}</span></p>
              <p><span>{{item.userPhone}}</span></p>
            </div>
          </el-col>
          <!-- 地址 -->
          <el-col :span="8">
            <div class="lin55">
              <span v-if="item.houseRentType === 'ENTIRE_RENT'">套房</span>
              <span v-else-if="item.houseRentType === 'JOINT_RENT'">单间</span>-{{item.houseSpaceName}}
            </div>
          </el-col>
          <!-- 上门时间 -->
          <el-col :span="2">
            <div class="lin55">
              <el-tooltip effect="light" placement="top">
               <div slot="content">上门时间</div>
               <span>{{new Date(item.appointmentTime).toLocaleDateString()}}</span>
              </el-tooltip>
            </div>
          </el-col>
          <!-- 上门状态 -->
          <el-col :span="3">
            <div class="lin55">
              <p v-if="item.appointmentStatus === 'WAITPICK'">
                待领取
              </p>
              <p v-else-if="item.appointmentStatus === 'WAITTODOOR'">
                待上门
              </p>
              <p v-else-if="item.appointmentStatus === 'ALTODOOR'">
                已上门
              </p>
              <p v-else-if="item.appointmentStatus === 'CANCLE'">
                已取消
              </p>
              <p v-else-if="item.appointmentStatus === 'ALRES'">
                已新建预定
              </p>
              <p v-else-if="item.appointmentStatus === 'BUCON'">
                已新建出租合同
              </p>
              <p v-else-if="item.appointmentStatus === 'ALAPPRAISE'">
                已评价
              </p>
            </div>
          </el-col>
          <!-- 销售人员 -->
          <el-col :span="3">
            <div class="lin55">
            <el-tooltip effect="light" placement="top">
              <div slot="content">销售人员</div>
              <span>{{item.houseKeeperName}}</span>
            </el-tooltip>
            </div>
          </el-col>
          <slot :index="index"></slot>
        </el-row>
      </div>
    </div>
    <!-- 详情组件 -->
    <common-detail :show="detailDialog" :detailData="detailData"></common-detail>
  </div>
</template>
<script>
import CommonDetail from '@/components/rent/CommonDetail'
export default {
  name: 'list',
  data: function () {
    return {
      detailData: '',
      detailDialog: {
        show: false
      }
    }
  },
  methods: {
    openDetail ($event, index) {
      if (this.detailDialog.show === true) {
        this.detailDialog.show === false
      } else {
        if ($event.target.innerHTML === '操作') {
        } else {
          // 获取详情数据
          this.$http.get(this.$store.state.rentUrl + 'appointment/get/' + this.listData[index].appointmentId, {
          }).then(function (response) {
            var data = response.data
            if (data.code === 200) {
              this.detailData = data.data.list[0]
              this.detailDialog.show = true
            }
          }, function (response) {
            console.log(response.status)
          })
        }
      }
    }
  },
  props: ['listData'],
  components: {
    CommonDetail
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














