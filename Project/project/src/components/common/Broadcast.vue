<template>
  <div v-if="show.show" class="broadCast">
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="item in data" :key="item">
        <img :src="item" />
      </el-carousel-item>
    </el-carousel>
    <div @click="close" class="bg"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: ['data', 'show'],
  methods: {
    close: function () {
      this.show.show = false
    }
  },
  mounted: function () {
  }
}
</script>
<style scoped>
.broadCast{
  position: fixed;
  width:800px;
  left: 50%;
  top: 50%;
  margin-left: -400px;
  margin-top: -150px;
}
.bg{
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, .5)
}
</style>