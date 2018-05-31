<template>
  <div v-show="show.show">
    <div class="bg"></div>
    <!-- 优惠规则弹窗 -->
    <div class="rule-div">
      <text class="rule-div-title">定金记录</text>
      <image @click="close" class="img" src="https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/close.png" resize="stretch"></image>
      <div class="rule-div-cont">
        <div class="rule-div-for" v-for="(item, index) in data" @click="sendDingjin(item, index)">
          <text class="rule-div-for-title">定金{{index + 1}}</text>
          <text class="rule-div-for-cont">房源名称:  {{item.houseSpaceName}}</text>
          <text class="rule-div-for-cont">定金信息:  {{item.userName}}于{{item.registerTime}}已交定金{{item.earnest / 1000}}元</text>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dingtalk from 'dingtalk-javascript-sdk';
export default {
  name: 'dingjinHistory',
  data: function(){
    return {
    }
  },
  computed: {
  },
  mounted: function(){
  },
  props: ['data', 'show'],
  methods: {
    // 关闭弹窗
    close: function (e) {
      this.show.show = false
    },
    // 将选择的优惠规则传到合同表单
    sendDingjin: function (item, index) {
      let data = {}
      data.item = item
      data.index = index
      let that = this
      dingtalk.ready(function(){
        const dd = dingtalk.apis;
        dd.device.notification.confirm({
          message: "是否确定将此房源定金结转过来",
          title: "提示",
          buttonLabels: ['取消', '确定'],
          onSuccess : function(result) {
            if (result.buttonIndex === 1) {
              that.$emit('sendDingjin', data)
            } else {
            }
          },
          onFail : function(err) {}
        });
      });
    }
  },
  filters: {
  }
}
</script>
<style scoped>
.rule-div-cont{
  height: 500px;
  overflow-y: auto;
}
.rule-div-for-bottom{
  flex-direction: column;
  justify-content: space-between;
}
.img{
  position: absolute;
  right: 20px;
  top: 20px;
  width: 60px;
  height: 60px;
}
.rule-div-for{
  padding: 30px 0;
  border-bottom: 1px solid #E0E0E0;
}
.rule-div-for-cont{
  color: #666;
  font-size: 24px;
}
.rule-div-for-title{
  font-size: 24px;
  color: #FBB13F;
  margin-bottom: 10px;
}
.bg{
  width: 750px;
  height: 1334px;
  background-color: rgba(0,0,0,.2);
  position: fixed;
  left: 0;
  top: 0;
}
.rule-div{
  position: fixed;
  left: 60px;
  top: 300px;
  border-radius: 20px;
  width: 630px;
  padding: 0px 30px 40px 30px;
  background-color: #fff;
}
.rule-div-title{
  text-align: center;
  width: 570px;
  padding: 30px 0;
  border-bottom: 1px solid #E0E0E0;
  color: #333;
  font-size: 36px;
}
</style>
