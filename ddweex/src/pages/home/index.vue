<template>
  <div class="wrapper">
    <div class="bg-col-white w-100p">
      <div class="clear index-top">
        <image class="img" src="https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/index_logo.png" resize="stretch"></image>
        <text class="index-top-span">为了账户信息的完整性请及时绑定手机</text>
      </div>
      <div class="index-form">
        <div>
          <input @input="getPhone" class="index-form-input" type="tel" placeholder="手机号" maxlength="11"/>
        </div>
        <div class="pos-rel">
          <input @input="getCode" class="index-form-input bd-n" type="tel" maxlength="6" placeholder="请输入短信验证码"/>
          <text @click="sendCode" :class="[isActive ? activeClass : c1]">{{count}}</text>
        </div>
      </div>
    </div>
    <text class="index-bottom-btn" @click="submit">立即绑定</text>
  </div>
</template>
<script>

import dingtalk from 'dingtalk-javascript-sdk';

export default {
  name: 'index',
  data: function(){
    return {
      link: '',
      c1: 'index-btn', 
      isActive: true,
      activeClass: 'unfocus',
      phone: '',
      code: '',
      count: '获取验证码'
    }
  },
  computed: {
  },
  mounted: function(){
    let that = this
    dingtalk.ready(function(){
      const dd = dingtalk.apis;
      // 设置导航
      dd.biz.navigation.setTitle({
        title: '绑定账号'
      });
    });
  },
  methods: {
    // 验证手机号
    getPhone: function (e) {
      if (/^[1][3,4,5,7,8,9][0-9]{9}$/.test(e.value)) {
        this.isActive = false
        this.phone = e.value
      } else {
        this.isActive = true
        this.phone = e.value
      }
    },
    getCode: function (e) {
      this.code = e.value
    },
    // 发送验证码
    sendCode: function (target) {
      if (/^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.phone) && this.count === '获取验证码') {
        const TIME_COUNT = 60
        if (!this.timer) {
          this.count = TIME_COUNT
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--
            } else {
              clearInterval(this.timer)
              this.timer = null
              this.count = '获取验证码'
            }
          }, 1000)
        }
        // 获取短信验证码接口
        this.$http.post(this.$store.state.accountUrl + 'user/sms/send', {
          phone: this.phone
        }).then(function (response) {
          var data = response.data
          console.log(data)
          if (data.code === 200) {
            dingtalk.ready(function(){
              const dd = dingtalk.apis;
              dd.device.notification.alert({
                message: "验证码发送成功",
                title: "提示",//可传空
                buttonName: "确定"
              });
            })
          }
        }, function (response) {
          console.log(response.status)
        })
      } else {
        dingtalk.ready(function(){
          const dd = dingtalk.apis;
          dd.device.notification.alert({
            message: "请输入正确的手机号",
            title: "提示",//可传空
            buttonName: "确定"
          });
        })
      }
    },
    submit: function (target) {
      if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.phone)) {
        dingtalk.ready(function(){
          const dd = dingtalk.apis;
          dd.device.notification.alert({
            message: "请输入正确的手机号",
            title: "提示",//可传空
            buttonName: "确定"
          });
        });
      } else if (this.code.length !== 6) {
        dingtalk.ready(function(){
          const dd = dingtalk.apis;
          dd.device.notification.alert({
            message: "请输入正确的验证码",
            title: "提示",//可传空
            buttonName: "确定"
          });
        });
      } else {
        // 登录接口
        this.$store.dispatch('userLogin', {'userName': this.phone, 'userCode': this.code, 'ddUserId': this.$route.params.data.ddUserId, 'deviceId': this.$route.params.data.deviceId})
      }
    }
  }
}
</script>
<style scoped>
.index-top-span{
  width: 310px;
  margin-left: 10px;
  font-size: 32px;
  color: #FBB13F;
}
.index-top{
  margin: 88px 0;
  flex-direction:row;
}
.img{
  width: 80px;
  height: 100px;
}
.bg-col-white{
  background-color: #fff;
  align-items: center;
}
.wrapper {
  display: flex;
  flex-direction: column;
  width: 750px;
  align-items: center;
}
.index-form{
  width: 750px;
  border-top: 1px solid #E0E0E0;
  border-bottom: 1px solid #E0E0E0;
}
.bd-n{
  border-bottom: none;
}
.index-form-input{
  placeholder-color:#999;
  color: #666;
  width: 690px;
  margin:0 auto;
  line-height: 44px;
  padding: 28px 4%;
  border-bottom: 1px solid #E0E0E0;
}
.index-btn{
  width: 178px;
  height: 60px;
  line-height: 60px;
  border:1px solid #FBB13F;
  color: #FBB13F;
  font-size: 24px;
  text-align: center;
  border-radius: 5px;
  position: absolute;
  right: 4%;
  top: 20px;
}
.index-bottom-btn{
  width: 690px;
  margin:120px auto;
  height: 90px;
  line-height: 90px;
  color: #fff;
  font-size: 32px;
  text-align: center;
  background-color: #FBB13F;
  border-radius: 5px;
}
text.unfocus{
  width: 178px;
  height: 60px;
  line-height: 60px;
  border:1px solid #ccc;
  color: #ccc;
  font-size: 24px;
  text-align: center;
  border-radius: 5px;
  position: absolute;
  right: 4%;
  top: 20px;
}
</style>
