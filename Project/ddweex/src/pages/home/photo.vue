<template>
  <div class="wrapper">
    <text @click="getPhoto">拍照</text>
    <image class="img" src="http://static.dingtalk.com/media/lADPBbCc1bi2lvXNAoDNAWg_360_640.jpg" resize="contain"></image>
  </div>
</template>
<script>

import dingtalk from 'dingtalk-javascript-sdk';

export default {
  name: 'houseDetail',
  data: function(){
    return {
      img: '11'
    }
  },
  computed: {
  },
  mounted: function(){
    this.$http.post(this.$store.state.accountUrl + 'thirdparty/jsapi_sign', {
      url: 'http://192.168.1.33:8081/'
    }).then(function (response) {
      var data = response.data
      if (data.code === 200) {
        dingtalk.ready(function(){
          dingtalk.config({
            agentId: '171455496',
            corpId: 'ding941e1c6d6c330e94',
            timeStamp: data.data.timeStamp,
            nonceStr: data.data.nonceStr,
            signature: data.data.signature,
            jsApiList: [
              'biz.util.uploadImageFromCamera' // 需要用到的jsAPI都列在这里
            ]
          });
        })
      }
    }, function (response) {
      console.log(response.status)
    })
  },
  methods: {
    getPhoto: function (e) {
      let that = this
      dingtalk.ready(function(){
        const dd = dingtalk.apis;
        dd.biz.util.uploadImageFromCamera({
          compression: true,//(是否压缩，默认为true)
          quality: 50, // 图片压缩质量, 
          resize: 50, // 图片缩放率
          stickers: {   // 水印信息
            time: "",
            dateWeather: "",
            username: "",
            address: ""
          },
          onSuccess : function(result) {
            alert(result)
            that.img = result
          },
          onFail : function(err) {
            console.log(err)
          }
        });
      });
    }
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
.img{
  width: 600px;
  height: 600px;
}
</style>
