<template>
  <div class="img-div">
    <div @mouseover.prevent="mouseover(index)" @mouseout.prevent="mouseout(index)" :key="index" class="img-divImg" v-for="(item, index) in data">
      <img @click="broadcast(data)" :src="item" width="120" height="120"/>
      <div v-if="current === index" class="bg">
        <el-button @click="remove(item)" type="primary">删除</el-button>
      </div>
    </div>
    <broadcast :data="data" :show="broadcastShow"></broadcast>
  </div>
</template>
<script>
import Broadcast from '../common/Broadcast'
export default {
  data () {
    return {
      current: null,
      broadcastShow: {
        show: false
      }
    }
  },
  props: ['typeId', 'data'],
  methods: {
    // 鼠标移进事件
    mouseover: function (index) {
      this.current = index
    },
    // 鼠标移出
    mouseout: function (index) {
      this.current = null
    },
    // 打开轮播图
    broadcast: function (data) {
      this.broadcastShow.show = true
    },
    // 删除图片
    remove: function (data) {
      this.$http.get(this.$store.state.contractUrl + 'delArrachment?addr=' + data,
      ).then(function (res) {
        if (res.data.code === 200) {
          this.$message('删除图片成功')
          this.$emit('refreshDetail', '')
        } else {
          this.$message('删除图片失败')
        }
      })
    }
  },
  components: {
    Broadcast
  },
  mounted: function () {
  }
}
</script>
<style scoped>
.img-div{
  flex-direction: row;
}
.img-divImg{
  display: inline-block;
  width: 47%;
  margin-right: 2%;
  margin-bottom: 10px;
  cursor: pointer;
  position: relative;
}
.bg{
  width: 120px;
  text-align: center;
  background-color: rgba(0, 0, 0, .3);
  padding: 5px 0;
  position: absolute;
  bottom: 0;
}
</style>