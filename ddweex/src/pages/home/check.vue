<template>
  <div class="wrapper">
  </div>
</template>
<script>

import dingtalk from 'dingtalk-javascript-sdk';

export default {
  name: 'check',
  data: function(){
    return {
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
        title: '钉钉开放平台'
      });
      // 免登陆授权
      dd.runtime.permission.requestAuthCode({
        corpId: "ding941e1c6d6c330e94",
        onSuccess: function(result) {
          that.$http.get(that.$store.state.accountUrl + 'thirdparty/dding_userinfo/' + result.code, 
          ).then(function (response) {
            var data = response.data
            if (data.code === 200) {
              if (data.data.sysUserId === null) {
                that.$router.push({ name: 'home', params: {data: data.data}})
              } else {
                that.$store.dispatch('getRole', {'id': data.data.sysUserId})
                // 已有userId免登陆保存
                that.$store.dispatch('setUserId', {'userName': data.data.userName, 'userPhone': data.data.userPhone, 'uid': data.data.sysUserId, 'deviceId': data.data.deviceId})
                that.$router.push({ name: 'houseList'})
              }
            }
          }, function (response) {
            console.log(response.status)
          })
        },
        onFail : function(err) {
          dingtalk.ready(function(){
            const dd = dingtalk.apis;
            dd.device.notification.alert({
              message: result.code,
              title: "提示",//可传空
              buttonName: "确定"
            });
          });
        }
      })
      // }
    });
  },
  methods: {
  }
}
</script>
<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  width: 750px;
  align-items: center;
}
</style>
