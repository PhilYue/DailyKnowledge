<template>
  <div class="wrapper">
    <div class="top">
      <text class="top-fz">房源名称</text>
      <text class="top-text">{{houseDetailData.keywordAddress}}</text>
    </div>
    <!-- 租客信息表单 -->
    <text class="form-title">租客信息</text>
    <div class="zk-form">
      <div class="zk-form-div">
        <text class="zk-form-div-text">姓名</text>
        <input @input="getName" class="index-form-input" type="text" placeholder="请输入姓名"/>
      </div>
      <div class="zk-form-div">
        <text class="zk-form-div-text">手机号</text>
        <input @input="getPhone" class="index-form-input" type="tel" placeholder="请输入手机号" maxlength="11"/>
      </div>
      <div class="zk-form-div">
        <text class="zk-form-div-text">定金</text>
        <input :disabled="true" class="index-form-input" type="number" :value="houseDetailData.regulationFrontMoneyAmount / 1000" maxlength="11"/>
      </div>
    </div>
    <!-- 备注 -->
    <text class="form-title">备注信息</text>
    <div class="textarea-bg">
      <textarea class="textarea" @input="getMemo" placeholder="请输入备注"></textarea>
    </div>
    <text class="index-bottom-btn" @click="submit">确认提交</text>
  </div>
</template>
<script>

import dingtalk from 'dingtalk-javascript-sdk';

export default {
  name: 'yuding',
  data: function(){
    return {
      submitForm: {},
      houseDetailData: {}
    }
  },
  computed: {
  },
  mounted: function(){
    this.houseDetailData = JSON.parse(this.$store.state.currentUser.houseData)
    this.submitForm.earnest = this.houseDetailData.regulationFrontMoneyAmount
    this.submitForm.enterId = this.$store.state.currentUser.uid
    this.submitForm.houseSpaceId = this.houseDetailData.houseSpaceId
    this.submitForm.unitId = this.houseDetailData.zoneId
    dingtalk.ready(function(){
      const dd = dingtalk.apis;
      // 设置导航
      dd.biz.navigation.setTitle({
        title: '预定'
      });
    });
  },
  methods: {
    // 获取姓名
    getName: function (e) {
      this.submitForm.userName = e.value
    },
    // 获取手机号
    getPhone: function (e) {
      this.submitForm.userPhone = e.value
    },
    // 获取备注
    getMemo: function (e) {
      this.submitForm.memo = e.value
    },
    // 新增预定接口/rent/reservation/add
    submit: function (e) {
      this.$http.post(this.$store.state.rentUrl + 'reservation/add', this.submitForm
      ).then(function (response) {
        var data = response.data
        if (data.code === 200) {
          dingtalk.ready(function(){
            const dd = dingtalk.apis;
            dd.device.notification.alert({
              message: '新建预定成功',
              title: "提示",//可传空
              buttonName: "确定"
            });
          });
          this.$router.push({ name: 'houseList'})
        } else {
          dingtalk.ready(function(){
            const dd = dingtalk.apis;
            dd.device.notification.alert({
              message: '新建预定失败',
              title: "提示",//可传空
              buttonName: "确定"
            });
          });
        }
      }, function (response) {
        console.log(response.status)
      })
    }
  }
}
</script>
<style scoped>
.top-fz{
  font-size: 28px;
}
.top-text{
  color: #999;
  font-size: 28px;
}
.top{
  width: 750px;
  height: 100px;
  margin-top:30px;
  align-items: center;
  padding: 0 30px;
  font-size: 28px;
  background-color: #fff;
  flex-direction: row;
  border-top: 1px solid #E0E0E0;
  border-bottom: 1px solid #E0E0E0;
  justify-content: space-between;
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
.textarea{
  width: 690px;
  background-color: #F0F0F0;
  padding: 10px;
  font-size: 28px;
  color: #999;
  margin: 20px 30px;
  border-color:#F0F0F0;
}
.textarea-bg{
  width: 750px;
  background-color: #fff;
  margin-bottom: 176px;
}
.form-title{
  width: 690px;
  padding-left: 30px;
  margin: 30px 0;
  font-size: 28px;
  color: #666;
  padding-left: 10px;
  border-left: 4px solid #FBB13F;
  margin-left: 30px;
  background-color: #f8f8f8;
}
.wrapper {
  display: flex;
  flex-direction: column;
  width: 750px;
  align-items: center;
}
.index-form-input{
  font-size: 28px;
  placeholder-color:#999;
  color: #999;
  width: 500px;
  text-align: right;
}
.zk-form-div-text{
  font-size: 28px;
  color: #333;
}
.zk-form-div{
  width: 690px;
  height: 100px;
  align-items: center;
  font-size: 28px;
  background-color: #fff;
  flex-direction: row;
  border-bottom: 1px solid #E0E0E0;
  justify-content: space-between;
}
.zk-form{
  width: 750px;
  background-color: #fff;
  align-items: center;
}
</style>
