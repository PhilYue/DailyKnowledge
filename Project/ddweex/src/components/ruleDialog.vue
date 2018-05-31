<template>
  <div v-show="show.show">
    <div class="bg"></div>
    <!-- 优惠规则弹窗 -->
    <div class="rule-div">
      <text class="rule-div-title">营销规则</text>
      <image @click="close" class="img" src="https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/close.png" resize="stretch"></image>
      <div class="rule-div-cont">
        <div class="rule-div-for" v-for="(item, index) in data" @click="sendRule(item, index)">
          <text class="rule-div-for-title">规则{{index + 1}}</text>
          <div class="rule-div-for-bottom">
            <text class="rule-div-for-cont">租金{{item.actualRent / 1000}}元,</text>
            <text class="rule-div-for-cont">押金{{item.actualDeposit / 1000}}元</text>
            <div v-for="(item1, index1) in data[index].saleContentResponseBodyList">
              <text class="rule-div-for-cont">  {{item1.preferentialPurpose | preferentialPurposeFilter}}{{item1.valueType | valueTypeFilter}}{{item1.preferentialValue / 1000}}</text>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dingtalk from 'dingtalk-javascript-sdk';
export default {
  name: 'ruleDialog',
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
    sendRule: function (item, index) {
      let data = {}
      data.item = item
      data.index = index
      this.$emit('sendRule', data)
    }
  },
  filters: {
    preferentialPurposeFilter: function (value) {
      if (value === 'ELECTRIC_VOUCHER') {
        return '电费代金券'
      } else if (value === 'FIRST_MONTH_PREF') {
        return '首月减免'
      } else if (value === 'RENT_RISE') {
        return '价格上涨'
      } else if (value === 'RENT_REDUCTION') {
        return '租金代金券'
      } else if (value === 'WATER_VOUCHER') {
        return '水费代金券'
      }
    },
    valueTypeFilter: function (value) {
      if (value === 'AMOUNT') {
        return '固定额度'
      } else if (value === 'DISCOUNT') {
        return '折扣'
      } else if (value === 'PERCENT') {
        return '百分比调整'
      }
    }
  }
}
</script>
<style scoped>
.rule-div-cont{
  height: 500px;
  overflow-y: auto;
}
.rule-div-for-bottom{
  flex-direction: row;
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
  margin-bottom: 20px;
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
