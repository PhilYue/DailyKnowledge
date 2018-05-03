参见组件属性
<style>
.houseRoomList.green .HRLCon{
	border-color: rgba(0, 128, 0, .6);
}
.HRLCon p{
	height: 20px;
}
.houseRoomList .newFont {
	font-weight: bold;
}
</style>

<template>
  <li class="houseRoomList" :class="{ green:context.houseSpaceStatus1 == '已出租' || context.houseSpaceStatus1 == '已预定' }">
    <!-- Open detail -->
    <div class="HRLCon" @click="handleClick($event, context)">
      <p class="newFont">{{context.houseSpaceName}}</p>
      <p class="houseRoomPrice">
        <span>{{context.rentalPrice1}}</span>
        {{context.decorateType1}}
      </p>

      <p>
        {{context.houseSpaceArea / 1000}}㎡ {{context.direction | direction}}
      </p>

      <action-bar
        :status="context.houseSpaceStatus"
        :is-send-password="context.isSendPassword"
        :tenant-name="context.tenantName"
        :role="0"
      />

    </div>
  </li>
</template>

<script>
import { direction } from '@/filters'
import ActionBar from './ActionBar'

export default {
  props: ['context', 'tableDataWay', 'role'],

  components: {
    ActionBar,
  },

  data: function () {
    return {
      isYungYing: false
    }
  },
  
  filters: {
    direction
  },

  mounted () {
    if (this.$store.state.currentUser.roleData.indexOf('运营部经理') !== -1) {
      this.isYungYing = true
    }
  },

  methods: {
    handleClick (event, businessId) {
      if (event.target.closest('.houseMoveMenu') === null && event.target.closest('.rental') === null) {
        this.$emit('click', businessId, 'JOINT_RENT')
      }
    }
  }
}
</script>
