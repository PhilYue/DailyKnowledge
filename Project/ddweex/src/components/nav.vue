<template>
  <div class="nav">
    <router-link class="nav-div" to="/houseList">
      <image class="img" :src="data.houseImg" resize="stretch"></image>
      <text :class="data.houseText">房源</text>
    </router-link>
    <router-link class="nav-div" to="/taskList">
      <image class="img" :src="data.myImg" resize="stretch"></image>
      <text :class="data.myText">我的</text>
    </router-link>
  </div>
</template>
<script>
import dingtalk from 'dingtalk-javascript-sdk';
export default {
  name: 'nav',
  data: function(){
    return {
    }
  },
  computed: {
  },
  mounted: function(){
  },
  props: ['data'],
  methods: {
  }
}
</script>
<style scoped>
.nav{
  flex-direction: row;
  position: fixed;
  bottom: 0;
  background-color: #f8f8f8;
  width: 100%;
  height: 98px;
  border-top: 1px solid #E0E0E0;
}
.img{
  width: 50px;
  height: 50px;
  margin: 0 auto;
  margin-top: 11px;
}
.nav-div{
  width: 50%;
  text-align: center;
}
.nav-div-text{
  text-align: center;
  font-size: 20px;
  color: #999;
}
.nav-div-textOn{
  text-align: center;
  font-size: 20px;
  color: #FBB13F;
}
</style>
