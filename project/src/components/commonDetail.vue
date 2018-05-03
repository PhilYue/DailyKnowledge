<template>
  <div>
    <transition name="fade">
      <div v-if="show.show" class="dialog" :style="height">
        <el-row class="height-w100">
          <el-col class="form-contL" :span="6" style="padding:0;">
            <el-menu :default-active="menuData" class="el-menu-vertical-demo" theme="dark">
              <el-menu-item index="contract">预约详情</el-menu-item>
            </el-menu>
          </el-col>
          <el-col class="form-cont" :span="18">
            <div class="contain">
              <div class="clear">
                <h3>租客信息</h3>
                <el-col :span="8" class="title">预约编号</el-col>
                <el-col :span="16">
                  <div class="content">{{detailData.appointmentNumber}}</div>
                </el-col>
                <el-col :span="8" class="title">姓名</el-col>
                <el-col :span="16">
                  <div class="content">{{detailData.userName}}</div>
                </el-col>
                <el-col :span="8" class="title">手机号</el-col>
                <el-col :span="16">
                  <div class="content">{{detailData.userPhone}}</div>
                </el-col>
                <el-col :span="8" class="title">上门时间</el-col>
                <el-col :span="16">
                  <div class="content">{{new Date(detailData.appointmentTime).toLocaleDateString()}}</div>
                </el-col>
                <el-col :span="8" class="title">价格区间</el-col>
                <el-col :span="16">
                  <div class="content">{{detailData.rentRange}}</div>
                </el-col>
                <el-col v-if="detailData.feedback" :span="8" class="title">看房反馈</el-col>
                <el-col v-if="detailData.feedback" :span="16">
                  <div class="content">{{detailData.feedback}}</div>
                </el-col>
                <el-col v-if="detailData.source" :span="8" class="title">租客来源</el-col>
                <el-col v-if="detailData.source" :span="16">
                  <div v-if="detailData.source === 'MEDI'" class="content">个人中介</div>
                  <div v-else-if="detailData.source === 'CMEDI'" class="content">公司中介</div>
                  <div v-else-if="detailData.source === 'INTRO'" class="content">租客介绍</div>
                  <div v-else-if="detailData.source === 'CITY58'" class="content">58同城</div>
                  <div v-else-if="detailData.source === 'MANET'" class="content">赶集</div>
                  <div v-else-if="detailData.source === 'DBNET'" class="content">豆瓣</div>
                  <div v-else-if="detailData.source === 'SPNET'" class="content">春眠</div>
                  <div v-else-if="detailData.source === 'HZNET'" class="content">嗨住</div>
                  <div v-else-if="detailData.source === 'WECHAT'" class="content">微信公众号</div>
                  <div v-else-if="detailData.source === 'DTBET'" class="content">地推</div>
                  <div v-else-if="detailData.source === 'PATYJ'" class="content">甲方</div>
                  <div v-else-if="detailData.source === 'FLOOR19'" class="content">19楼</div>
                  <div v-else-if="detailData.source === 'OTHER'" class="content">其他</div>
                </el-col>
              </div>
              <div class="clear">
                <h3>房源信息</h3>
                <el-col :span="8" class="title">房源类型</el-col>
                <el-col :span="16">
                  <div v-if="detailData.houseRentType === 'ENTIRE_RENT'" class="content">套房</div>
                  <div v-else-if="detailData.houseRentType === 'JOINT_RENT'" class="content">单间</div>
                </el-col>
                <el-col :span="8" class="title">房源名称</el-col>
                <el-col :span="16">
                  <div class="content">{{detailData.houseSpaceName}}</div>
                </el-col>
                <el-col v-if="detailData.houseKeeperName" :span="8" class="title">销售人员</el-col>
                <el-col v-if="detailData.houseKeeperName" :span="16">
                  <div class="content">{{detailData.houseKeeperName}}</div>
                </el-col>
                <el-col v-if="detailData.memo" :span="8" class="title">备注信息</el-col>
                <el-col v-if="detailData.memo" :span="16">
                  <div class="content">{{detailData.memo}}</div>
                </el-col>
                <el-col :span="8" class="title">预约状态</el-col>
                <el-col :span="16">
                  <div v-if="detailData.appointmentStatus === 'WAITPICK'" class="content">待领取</div>
                  <div v-else-if="detailData.appointmentStatus === 'WAITTODOOR'" class="content">待上门</div>
                  <div v-else-if="detailData.appointmentStatus === 'ALTODOOR'" class="content">已上门</div>
                  <div v-else-if="detailData.appointmentStatus === 'CANCLE'" class="content">已取消</div>
                  <div v-else-if="detailData.appointmentStatus === 'ALRES'" class="content">已预定</div>
                  <div v-else-if="detailData.appointmentStatus === 'BUCON'" class="content">已签订合同</div>
                  <div v-else-if="detailData.appointmentStatus === 'ALAPPRAISE'" class="content">已评价</div>
                </el-col>
              </div>
            </div>
          </el-col>
        </el-row>
        <!-- <span class="edit" @click="edit()">编辑</span> -->
        <div @click="show.show = !show.show" class="el-icon-close closeIco"></div>
      </div>
    </transition>
    <!-- 预约表单组件 -->
      <appointForm :houseAppoint="houseAppointData" :form="form"></appointForm>
  </div>
</template>
<script>
import appointForm from '../components/appointForm'
const height = window.screen.height - 51
import $ from 'jquery'
export default {
  name: 'detail',
  data: function () {
    return {
      height: 'height:' + height + 'px',
      houseAppointData: {
        show: false
      },
      form: {},
      detailData: '',
      role: '', // 角色名
      editData: '',
      menuData: 'contract'
    }
  },
  methods: {
    loadDetail (id) {
      // 获取详情数据
      this.$http.get(this.$store.state.rentUrl + 'appointment/get/' + id, {
      }).then(function (response) {
        var data = response.data
        if (data.code === 200) {
          this.detailData = data.data.list[0]
        }
      }, function (response) {
        console.log(response.status)
      })
    }
  },
  props: ['appointmentId', 'show'],
  components: {
    appointForm
  },
  mounted: function () {
    this.$nextTick(function () {
      var $this = this
      $('body').click(function (event) {
        if (event.target.closest('.dialog') === null) {
          $this.show.show = false
        }
      })
    })
  },
  watch: {
    'show.show': function (val, oldVal) {
      if (val === true) {
        this.loadDetail(this.appointmentId)
      }
    }
  }
}
</script>
<style scoped>
::-webkit-scrollbar {display:none}
::-moz-scrollbar {display:none}
::-ms-scrollbar {display:none}
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
.edit{
  position: absolute;
  top: 12px;
  right: 45px;
  cursor: pointer;
}
.edit:hover{
  color: red;
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
  margin-bottom: 20px;
}
</style>