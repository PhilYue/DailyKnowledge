<template>
  <div class="wrapper">
    <div class="cont" v-show="show.show">
      <div class="cont-div" v-for="(item,index) in data">
        <text class="top-fz">{{item.itemsName}}</text>
        <div class="img-div">
          <image @click="reduce(index, item.itemsNumber)" class="img" src="https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/reduce.png" resize="stretch"></image>
          <text class="top-text">{{item.itemsNumber}}</text>
          <image @click="add(index, item.itemsNumber)" class="img" src="https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/add.png" resize="stretch"></image>
        </div>
      </div>
    </div>
    <text v-show="show.show" class="index-bottom-btn" @click="getCheckListData">确认提交</text>
  </div>
</template>
<script>

import dingtalk from 'dingtalk-javascript-sdk';

export default {
  name: 'checkList',
  data: function(){
    return {
    }
  },
  computed: {
  },
  mounted: function(){
    // dingtalk.ready(function(){
    //   const dd = dingtalk.apis;
    //   // 设置导航
    //   dd.biz.navigation.setTitle({
    //     title: 'Dingtalk'
    //   });
    // });
  },
  methods: {
    add: function (index, e) {
      console.log(e)
      this.data[index].itemsNumber ++
    },
    reduce: function (index, e) {
      if (e > 0) {
        this.data[index].itemsNumber --
      }
      console.log(this.data)
    },
    getCheckListData: function (e) {
      this.$emit('getCheckListData', this.data)
    }
  },
  props: ['data', 'show']
}
</script>
<style scoped>
.img-div{
  width: 200px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.img{
  width: 88px;
  height: 88px;
}
.index-bottom-btn{
  width: 92%;
  margin:120px auto;
  height: 90px;
  line-height: 90px;
  color: #fff;
  font-size: 32px;
  text-align: center;
  background-color: #FBB13F;
  border-radius: 5px;
}
.top-text{
  color: #999;
  font-size: 28px;
}
.top-fz{
  font-size: 28px;
}
.cont-div{
  width: 690px;
  height: 100px;
  align-items: center;
  font-size: 28px;
  background-color: #fff;
  flex-direction: row;
  border-bottom: 1px solid #E0E0E0;
  justify-content: space-between;
}
.cont{
  padding: 0 30px;
  width: 750px;
  background-color: #fff;
  border-top: 1px solid #E0E0E0;
  border-bottom: 1px solid #E0E0E0;
  margin-top: 40px;
}
.wrapper {
  display: flex;
  flex-direction: column;
  width: 750px;
  align-items: center;
}
</style>
