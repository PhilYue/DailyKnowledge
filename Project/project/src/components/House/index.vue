<style lang="scss" scoped>
.house {
  background: #F0F0F0;
  padding: 10px 16px;
  margin-bottom: 10px;
}

.house__header {
  cursor: pointer;
  &:after {
    content: '';
    display: table;
    clear: both;
  }
}

.house__number {
  float: right;
  margin-right: 30px;
  border-radius: 3px;
  background: #ff4b5e;
  color: #fff;
  width: 40px;
  text-align: center;
  line-height: 20px;
  margin-top: 5px;
  background-color: #20a0ff;
}

.house__main {
  // display: flex;
  // justify-content: space-between;
  margin: 8px -8px;
  &:after {
    content: '';
    display: table;
    clear: both;
  }
}
</style>

<template>
  <div>
    <div class="house">
      <div class="house__header" @click="handleClick">
        <span class="house__title">{{ context.zone }} · {{ context.blockName }}<span v-if="context.buildingNo">&nbsp;· {{ context.buildingNo }}栋</span><span v-if="context.unitNo">{{ context.unitNo }}单元</span><span v-if="context.roomNo">{{ context.roomNo }}室</span></span>
        <span class="house__number">{{number}}</span>
      </div>

      <div v-if="isMainShowing" class="house__main">
        <room
          v-for="(item, key) in children"
          :key="key"
          :context="item"
          :rent-type="rentType"
          @update="handleUpdate"
        />
      </div>
    </div>
 </div>
</template>

<script>
import Room from './Room'
export default {
  props: {
    context: Object,
    rentType: {
      type: String,
      default: 'JOINT_RENT'
    }
  },

  components: {
    Room
  },

  data() {
    return {
      isMainShowing: false,

      // 整租子房间
      data: [],
    }
  },

  computed: {
    ENTIRE_RENT() {
      return this.rentType === 'ENTIRE_RENT'
    },
    
    number() {
      return this.ENTIRE_RENT
        ? this.context.totalNumber : this.context.houseSpaceNumber
    },

    children() {
      return this.ENTIRE_RENT
        ? this.data : this.context.resHouseSpaceBeanList
    }
  },

  watch: {
    // 套房数据变化时，冲洗房间数据
    context(val, oldVal) {
      this.data = []
    }
  },

  methods: {
    loadData(data) {
      this.data = data
    },
    
    handleClick() {
      this.isMainShowing = !this.isMainShowing
      if (this.ENTIRE_RENT && !this.data.length) {
        this.$emit('load', this.context, this.loadData)
      }
    },

    handleUpdate() {
      this.$emit('update')
    }
  }
}
</script>
