<template>
  <div class="wrapper">
    <text @click="getPhoto">拍照</text>
  </div>
</template>
<script>

import dingtalk from 'dingtalk-javascript-sdk';

export default {
  name: 'houseDetail',
  data: function(){
    return {
    }
  },
  computed: {
  },
  mounted: function(){
    // this.$http.post(this.$store.state.accountUrl + 'thirdparty/jsapi_sign', {
    //   url: 'http://192.168.1.35:8080/#/'
    // }).then(function (response) {
    //   var data = response.data
    //   alert(JSON.stringify(data))
    //   if (data.code === 200) {
    //     dd.config({
    //       agentId: '171455496',
    //       corpId: 'ding941e1c6d6c330e94',
    //       timeStamp: data.data.timeStamp,
    //       nonceStr: data.data.nonceStr,
    //       signature: data.data.signature,
    //       jsApiList: [
    //         'runtime.info', // 需要用到的jsapi都列在这里
    //         'biz.util.uploadImageFromCamera'
    //       ]
    //     });
    //   }
    // }, function (response) {
    //   console.log(response.status)
    // })
    // dingtalk.ready(function(){
    //   const dd = dingtalk.apis;
    //   dd.biz.util.uploadImageFromCamera({
    //     compression: true,//(是否压缩，默认为true)
    //     quality: 50, // 图片压缩质量, 
    //     resize: 50, // 图片缩放率
    //     stickers: {   // 水印信息
    //       time: "08:35",
    //       dateWeather: "2016.05.06 周六·晴转多云 16℃",
    //       username: "王晓",
    //       address: "西湖·杭州"
    //     },
    //     onSuccess : function(result) {
    //          //onSuccess将在图片上传成功之后调用
    //         /*
    //         [
    //           'http://gtms03.alicdn.com/tps/i3/TB1VF6uGFXXXXalaXXXmh5R_VXX-237-236.png'
    //         ]
    //         */
    //     },
    //     onFail : function(err) {}
    //   });
    // })
  },
  methods: {
    getPhoto: function (e) {
      alert(1)
      dingtalk.ready(function(){
        const dd = dingtalk.apis;
        alert(2)
        dd.biz.util.uploadImageFromCamera({
          compression: true,//(是否压缩，默认为true)
          quality: 50, // 图片压缩质量, 
          resize: 50, // 图片缩放率
          stickers: {   // 水印信息
            time: "08:35",
            dateWeather: "2016.05.06 周六·晴转多云 16℃",
            username: "王晓",
            address: "西湖·杭州"
          },
          onSuccess : function(result) {
            alert(result)
          },
          onFail : function(err) {
            alert(JSON.stringify(err))
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
</style>
