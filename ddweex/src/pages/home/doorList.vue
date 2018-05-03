<template>
  <div class="wrapper">
    <div class="top">
      <text class="top-fz">房源名称</text>
      <text class="top-text">{{houseDetailData.keywordAddress}}</text>
    </div>
    <div class="cont">
      <div class="cont-div">
        <text class="top-fz">密码类型</text>
        <text v-if="this.$store.state.currentUser.roleData.indexOf('运营部经理') !== -1 || this.$store.state.currentUser.roleData.indexOf('运营主管') !== -1 || this.$store.state.currentUser.roleData.indexOf('运营专员') !== -1" :class="topClass1" @click="getCodeType1">租客密码</text>
        <text :class="topClass2" @click="getCodeType2">看房密码</text>
        <text :class="topClass3" @click="getCodeType3">离线密码</text>
      </div>
      <div v-if="houseDetailData.houseSpaceStatus !== 'RENTABLE' && houseDetailData.houseSpaceStatus !== 'FREEZING'">
        <div class="cont-div">
          <text class="top-fz">授权人姓名</text>
          <text class="top-text">{{houseDetailData.tenantName}}</text>
        </div>
        <div class="cont-div bdr-n">
          <text class="top-fz">授权人手机号</text>
          <text class="top-text">{{houseDetailData.tenantPhone}}</text>
        </div>
      </div>
      <div v-else>
        <div class="cont-div">
          <text class="top-fz">授权人姓名</text>
          <text class="top-text">{{this.$store.state.currentUser.userName}}</text>
        </div>
        <div class="cont-div bdr-n">
          <text class="top-fz">授权人手机号</text>
          <text class="top-text">{{this.$store.state.currentUser.userPhone}}</text>
        </div>
      </div>
    </div>
    <div class="top" @click="goDoorDetail">
      <text class="top-fz">密码记录</text>
      <image class="select-div-select-img" src="https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/right.png" resize="stretch"></image>
    </div>
    <text v-if="this.$store.state.currentUser.roleData.indexOf('小管家') !== -1 || this.$store.state.currentUser.roleData.indexOf('销售') !== -1 || this.$store.state.currentUser.roleData.indexOf('运营部经理') !== -1 || this.$store.state.currentUser.roleData.indexOf('运营主管') !== -1 || this.$store.state.currentUser.roleData.indexOf('运营专员') !== -1" class="index-bottom-btn" @click="submit">获取密码</text>
  </div>
</template>
<script>

import dingtalk from 'dingtalk-javascript-sdk';

export default {
  name: 'doorList',
  data: function(){
    return {
      houseDetailData: {},
      topClass1: 'top-text-radio',
      topClass2: 'top-text-radio',
      topClass3: 'top-text-radio',
      bean: {}
    }
  },
  computed: {
  },
  mounted: function(){
    this.houseDetailData = JSON.parse(this.$store.state.currentUser.houseData)
    dingtalk.ready(function(){
      const dd = dingtalk.apis;
      // 设置导航
      dd.biz.navigation.setTitle({
        title: '发送密码'
      });
    });
  },
  methods: {
    getCodeType1: function (e) {
      this.topClass1 = 'top-text-radioOn'
      this.topClass2 = 'top-text-radio'
      this.topClass3 = 'top-text-radio'
      this.bean.pwdType = 'NORMAL'
    },
    getCodeType2: function (e) {
      this.topClass1 = 'top-text-radio'
      this.topClass2 = 'top-text-radioOn'
      this.topClass3 = 'top-text-radio'
      this.bean.pwdType = 'TEMP'
    },
    getCodeType3: function (e) {
      this.topClass1 = 'top-text-radio'
      this.topClass2 = 'top-text-radio'
      this.topClass3 = 'top-text-radioOn'
      this.bean.pwdType = 'DYNAMIC'
    },
    submit: function (e) {
      this.bean.houseId = this.houseDetailData.houseSpaceId
      this.bean.houseName = this.houseDetailData.keywordAddress
      // 发送人
      this.bean.opUserId = this.$store.state.currentUser.uid
      this.bean.opUserName = this.$store.state.currentUser.userName
      // 接收人
      if (this.houseDetailData.houseSpaceStatus === 'RENTABLE') {
        this.bean.smsPhone = this.$store.state.currentUser.userPhone
        this.bean.smsUserName = this.$store.state.currentUser.userName
      } else {
        this.bean.smsPhone = this.houseDetailData.tenantPhone
        this.bean.smsUserName = this.houseDetailData.tenantName 
      }
      // 发送密码
      if (this.bean.pwdType === 'NORMAL') {
        this.$http.post(this.$store.state.lockUrl + 'sendpwd', this.bean
        ).then(function (response) {
          var data = response.data
          if (data.code === 200) {
            dingtalk.ready(function(){
              const dd = dingtalk.apis;
              dd.device.notification.alert({
                message: "发送成功",
                title: "提示",//可传空
                buttonName: "确定"
              });
            });
          } else {
            dingtalk.ready(function(){
              const dd = dingtalk.apis;
              dd.device.notification.alert({
                message: "发送失败",
                title: "提示",//可传空
                buttonName: "确定"
              });
            });
          }
        }, function (response) {
          console.log(response.status)
        })
      } else {
        // 非合同密码
        if (this.houseDetailData.houseSpaceStatus === 'RESERVED' || this.houseDetailData.houseSpaceStatus === 'RENTABLE' || this.houseDetailData.houseSpaceStatus === 'FREEZING') {
          // 空置,预定状态只有运营和小管家和销售能发送
          if (this.$store.state.currentUser.roleData.indexOf('小管家') !== -1 || this.$store.state.currentUser.roleData.indexOf('销售') !== -1 || this.$store.state.currentUser.roleData.indexOf('运营部经理') !== -1 || this.$store.state.currentUser.roleData.indexOf('运营主管') !== -1 || this.$store.state.currentUser.roleData.indexOf('运营专员') !== -1) {
            this.$http.post(this.$store.state.lockUrl + 'sendpwd_phone', this.bean
            ).then(function (response) {
              var data = response.data
              if (data.code === 200) {
                dingtalk.ready(function(){
                  const dd = dingtalk.apis;
                  dd.device.notification.alert({
                    message: "密码为" + data.data,
                    title: "提示",//可传空
                    buttonName: "确定"
                  });
                });
              } else {
                dingtalk.ready(function(){
                  const dd = dingtalk.apis;
                  dd.device.notification.alert({
                    message: "发送失败",
                    title: "提示",//可传空
                    buttonName: "确定"
                  });
                });
              }
            }, function (response) {
              console.log(response.status)
            })
          } else {
            dingtalk.ready(function(){
              const dd = dingtalk.apis;
              dd.device.notification.alert({
                message: '暂无权限发送',
                title: "提示",//可传空
                buttonName: "确定"
              });
            });
          }
        } else {
          // 非空置,预定状态只有运营能发送
          if (this.$store.state.currentUser.roleData.indexOf('运营部经理') !== -1 || this.$store.state.currentUser.roleData.indexOf('运营主管') !== -1 || this.$store.state.currentUser.roleData.indexOf('运营专员') !== -1) {
            this.$http.post(this.$store.state.lockUrl + 'sendpwd_phone', this.bean
            ).then(function (response) {
              var data = response.data
              if (data.code === 200) {
                dingtalk.ready(function(){
                  const dd = dingtalk.apis;
                  dd.device.notification.alert({
                    message: "密码为" + data.data,
                    title: "提示",//可传空
                    buttonName: "确定"
                  });
                });
              } else {
                dingtalk.ready(function(){
                  const dd = dingtalk.apis;
                  dd.device.notification.alert({
                    message: "发送失败",
                    title: "提示",//可传空
                    buttonName: "确定"
                  });
                });
              }
            }, function (response) {
              console.log(response.status)
            })
          } else {
            dingtalk.ready(function(){
              const dd = dingtalk.apis;
              dd.device.notification.alert({
                message: '暂无权限发送',
                title: "提示",//可传空
                buttonName: "确定"
              });
            });
          }
        }
      }
      // 发送看房和离线密码在页面中显示

    },
    goDoorDetail: function (e) {
      this.$router.push({ name: 'doorDetail'})
    }
  }
}
</script>
<style scoped>
.bdr-n{
  border-bottom: none;
}
.top-fz{
  font-size: 28px;
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
.select-div-select-img{
  width: 10px;
  height: 20px;
}
.top-text-radioOn{
  border:1px solid #FBB13F;
  border-radius: 8px;
  width: 150px;
  height: 60px;
  line-height: 60px;
  font-size: 28px;
  color: #FBB13F;
  align-items: center;
}
.top-text-radio{
  border:1px solid #E0E0E0;
  border-radius: 8px;
  width: 150px;
  height: 60px;
  line-height: 60px;
  font-size: 28px;
  color: #999;
  align-items: center;
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
}
.top-text{
  color: #999;
  font-size: 28px;
}
.top{
  width: 750px;
  height: 100px;
  margin:30px 0;
  align-items: center;
  padding: 0 30px;
  font-size: 28px;
  background-color: #fff;
  flex-direction: row;
  border-top: 1px solid #E0E0E0;
  border-bottom: 1px solid #E0E0E0;
  justify-content: space-between;
}
.wrapper {
  display: flex;
  flex-direction: column;
  width: 750px;
  align-items: center;
}
</style>
