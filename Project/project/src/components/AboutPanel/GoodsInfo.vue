<template>
  <ul class="GoodsInfo">
    <el-button
      type="primary"
      class="_btn"
      size="small"
      @click="goodAdd"
    >物品增配</el-button>

    <el-button
      type="primary"
      class="_btn"
      size="small"
      @click="goodReduce"
    >物品搬出</el-button>

    <empty-block v-if="!data.length"/>
  </ul>
</template>

<script>
import {underDevelopment} from '@/lib'

export default {
  data() {
    return {
      data: []
    }
  },

  components: {
    EmptyBlock: () => import('@/components/controls/EmptyBlock')    
  },
  
  methods: {
    goodAdd () {
      // this.$emit('houseGoodAdd', this.houseSpaceId)
      underDevelopment()
    },

    goodReduce() {
      // this.$emit('goodReduce', this.houseSpaceId)
      underDevelopment()
    },
  }
}
</script>

<style lang="scss" scoped>
.GoodsInfo {
  ._btn {
    background-color: #fff;
    color: #20a0ff;
    border-color: #20a0ff;
  }
}
</style>
