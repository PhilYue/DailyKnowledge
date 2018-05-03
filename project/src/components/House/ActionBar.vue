<style>
.houseRoomList .houseMoveMenu .upload{
	background-image: url(../../../static/img/upload.png);
}
.houseRoomList .houseMoveMenu .syn{
	background-image: url(../../../static/img/alipay.png);
}
.houseRoomList .houseMoveMenu .password{
	background-image: url(../../../static/img/sendPassword.png);
}
.houseRoomList .houseMoveMenu .frozen{
	background-image: url(../../../static/img/frozen.png);
}
.houseRoomList .newFont {
	font-weight: bold;
}
</style>

<template>
  <div>
    <div class="rental" v-if="statusText === '已冻结'">
      <div>
        <img src="../../../static/img/frozening.png" />
      </div>
    </div>
    <div class="rental" v-else-if="statusText !== '空置'" @click="handleClick('rental')">
      <div>
        <img src="https://o6niowncl.qnssl.com/user-default-img-b-14.png" width="35" />
      </div>
      <p v-if="tenantName">{{tenantName}}</p>
      <p v-else>暂无信息</p>
    </div>

    <div class="houseStatus" :class="{houseStatusGreen : statusText !== '空置'}">
      <p :class="{rentalStatus : statusText === '空置'}">{{status | houseSpaceStatus}}</p>
      <div class="houseMoveMenu">
        <el-tooltip class="item" effect="light" content="查看详情" placement="top">
          <div class="Detial houseMoveList" @click="handleClick('detail')"></div>
        </el-tooltip>

        <el-tooltip class="item" effect="light" content="新增租客合同" placement="top">
          <div v-if="isYungYing && statusText === '空置' && role !== 10"  class="Contract houseMoveList" @click="handleClick('add')"></div>
        </el-tooltip>

        <template v-if="role !== 10">
          <el-tooltip class="item" effect="light" content="附件上传" placement="top">
            <div class="upload houseMoveList" @click="handleClick('upload')"></div>
          </el-tooltip>
          <el-tooltip class="item" effect="light" content="同步蘑菇" placement="top">
            <div class="syn houseMoveList" @click="handleClick('sync')"></div>
          </el-tooltip>
          <el-tooltip class="item" effect="light" content="密码授权" placement="top">
            <div v-if="isSendPassword" class="password houseMoveList" @click="handleClick('password')"></div>
          </el-tooltip>

          <template v-if="role === 0">
            <el-tooltip v-if="statusText === '空置'" class="item" effect="light" content="冻结房源" placement="top">
              <div class="frozen houseMoveList" @click="handleClick('frozen')"></div>
            </el-tooltip>
            <el-tooltip v-else-if="statusText === '已冻结'" class="item" effect="light" content="解冻房源" placement="top">
              <div class="frozen houseMoveList" @click="handleClick('thaw')"></div>
            </el-tooltip>
          </template>
        </template>

      </div>
    </div>

  </div>
</template>

<script>
import { houseSpaceStatus } from '@/filters'

export default {
  props: {
    status: String,
    isSendPassword: Boolean,
    tenantName: String,
    role: Number,
  },

  data() {
    return {
      isYungYing: true,
    }
  },

  computed: {
    statusText() {
      return houseSpaceStatus(this.status)
    }
  },

  filters: {
    houseSpaceStatus
  },

  methods: {
    handleClick(type) {
      this.$emit('click', type)
    },
  }
}
</script>
