<template>
  <div class="wrapper">
    <div class="mgb-50" v-show="show.show">
      <div class="top">
        <text class="top-fz">房源名称</text>
        <text class="top-text">{{data.houseSpaceName}}</text>
      </div>
      <!-- 租客信息表单 -->
      <text class="form-title">租客信息</text>
      <div class="zk-form">
        <div v-if="data.userName" class="zk-form-div">
          <text class="zk-form-div-text">姓名</text>
          <input :disabled="true" class="index-form-input" type="text" :placeholder="data.userName"/>
        </div>
        <div v-if="data.sex" class="zk-form-div">
          <text class="zk-form-div-text">性别</text>
          <div class="zk-form-div-fr">
            <text class="zk-form-div-right">{{data.sex}}</text>
          </div>
        </div>
        <div v-if="data.userPhone" class="zk-form-div">
          <text class="zk-form-div-text">手机号</text>
          <input :disabled="true" class="index-form-input" type="tel" :placeholder="data.userPhone" maxlength="11"/>
        </div>
        <div v-if="data.certificateType" class="zk-form-div">
          <text class="zk-form-div-text">证件类型</text>
          <div class="zk-form-div-fr">
            <text class="zk-form-div-right">{{data.certificateType}}</text>
          </div>
        </div>
        <div v-if="data.nationality" class="zk-form-div">
          <text class="zk-form-div-text">国籍</text>
          <input :disabled="true" class="index-form-input" type="text" :placeholder="data.nationality"/>
        </div>
        <div v-if="data.certificateNum" class="zk-form-div">
          <text class="zk-form-div-text">证件号</text>
          <input :disabled="true" class="index-form-input" type="text" :placeholder="data.certificateNum" maxlength="18"/>
        </div>
        <div v-if="data.earnest" class="zk-form-div">
          <text class="zk-form-div-text">定金抵扣</text>
          <input :disabled="true" class="index-form-input" type="text" :placeholder="data.earnest"/>
          <text class="zk-form-div-text">元</text>
        </div>
        <div class="zk-form-div">
          <text class="zk-form-div-text">紧急联系人电话</text>
          <input :disabled="true" class="index-form-input" type="tel" :placeholder="data.urgentPhone" maxlength="11"/>
        </div>
      </div>
      <!-- 租期信息表单 -->
      <text class="form-title">租期信息</text>
      <div class="zk-form">
        <div v-if="data.startTime" class="zk-form-div">
          <text class="zk-form-div-text">起租时间</text>
          <div class="zk-form-div-fr">
            <text class="zk-form-div-right">{{data.startTime}}</text>
          </div>
        </div>
        <div v-if="data.endTime" class="zk-form-div">
          <text class="zk-form-div-text">退租时间</text>
          <div class="zk-form-div-fr">
            <text class="zk-form-div-right">{{data.endTime}}</text>
          </div>
        </div>
        <div v-if="data.timeRange" class="zk-form-div">
          <text class="zk-form-div-text">租期时长</text>
          <div class="zk-form-div-fr">
            <text class="zk-form-div-right">{{data.timeRange}}</text>
          </div>
        </div>
        <!-- <div v-if="data.sex" class="zk-form-div">
          <text class="zk-form-div-text">租期时长</text>
          <text class="zk-form-div-text">租期时长</text>
        </div> -->
        <div v-if="data.cycle" class="zk-form-div">
          <text class="zk-form-div-text">支付周期</text>
          <div class="zk-form-div-fr">
            <text class="zk-form-div-right">{{data.cycle}}</text>
          </div>
        </div>
        <div v-if="data.rule" class="zk-form-div">
          <text class="zk-form-div-text">营销规则</text>
          <div class="zk-form-div-fr">
            <text class="zk-form-div-right">{{data.rule}}</text>
          </div>
        </div>
      </div>
      <div class="zk-form">
        <div v-if="data.rental" class="zk-form-div">
          <text class="zk-form-div-text">房屋租金</text>
          <input :disabled="true" class="index-form-input" type="text" :placeholder="data.rental" />
          <text class="zk-form-div-text">元/月</text>
        </div>
        <div v-if="data.deposit" class="zk-form-div">
          <text class="zk-form-div-text">房屋押金</text>
          <input :disabled="true" class="index-form-input" type="text" :placeholder="data.deposit" />
          <text class="zk-form-div-text">元</text>
        </div>
        <div v-if="data.firstCreditAmount" class="zk-form-div">
          <text class="zk-form-div-text">首月减免金额</text>
          <input :disabled="true" class="index-form-input" type="text" :placeholder="data.firstCreditAmount" />
          <text class="zk-form-div-text">元</text>
        </div>
      </div>
      <!-- 其他费用表单 -->
      <text class="form-title">其他费用(选填)</text>
      <div class="zk-form">
        <div v-if="data.wuyeCycle || data.wuyemoney" class="zk-form-div">
          <text class="zk-form-div-text">物业费</text>
          <text class="fyCycle">{{data.wuyeCycle}}</text>
          <input :disabled="true" class="fyInput" type="text" :placeholder="data.wuyemoney"/>
          <text class="zk-form-div-text">元</text>
        </div>
        <div v-if="data.wangluoCycle || data.wangluomoney" class="zk-form-div">
          <text class="zk-form-div-text">网络费</text>
          <text class="fyCycle">{{data.wangluoCycle}}</text>
          <input :disabled="true" class="fyInput" type="text" :placeholder="data.wangluomoney"/>
          <text class="zk-form-div-text">元</text>
        </div>
      </div>
      <!-- 其他信息表单 -->
      <text class="form-title">其他信息</text>
      <div class="zk-form">
        <div v-if="data.source" class="zk-form-div">
          <text class="zk-form-div-text">租客来源</text>
          <div class="zk-form-div-fr">
            <text class="zk-form-div-right">{{data.source}}</text>
          </div>
        </div>
        <!-- 最多可居住人数 -->
        <div v-if="data.allowNumber" class="zk-form-div">
          <text class="zk-form-div-text">最多可居住人数</text>
          <div class="zk-form-div-fr">
            <text class="zk-form-div-right">{{data.allowNumber}}</text>
          </div>
        </div>
        <!-- 最多可居住人数 -->
        <div v-if="data.livesNumber" class="zk-form-div">
          <text class="zk-form-div-text">实际居住人数</text>
          <div class="zk-form-div-fr">
            <text class="zk-form-div-right">{{data.livesNumber}}</text>
          </div>
        </div>
        <!-- <div v-if="data.listValue" class="zk-form-div">
          <text class="zk-form-div-text">配置添加</text>
          <div class="zk-form-div-fr">
            <text class="zk-form-div-right">{{data.listValue}}</text>
          </div>
        </div> -->
      </div>
      <!-- 备注 -->
      <text v-if="data.memo" class="form-title">备注信息</text>
      <div v-if="data.memo" class="textarea-bg">
        <textarea :disabled="true" class="textarea" :placeholder="data.memo"></textarea>
      </div>
      <!-- 底部按钮 -->
      <div class="contract-bottom">
        <text class="contract-bottom-fl" @click="goContract">返回</text>
        <text class="contract-bottom-fr" @click="goContract">确定</text>
      </div>
    </div>
  </div>
</template>
<script>
import dingtalk from 'dingtalk-javascript-sdk';
export default {
  name: 'preview',
  data: function(){
    return {
    }
  },
  computed: {
  },
  mounted: function(){
    dingtalk.ready(function(){
      const dd = dingtalk.apis;
      // 设置导航
      dd.biz.navigation.setTitle({
        title: '预览合同'
      });
    });
  },
  methods: {
    goContract: function (e) {
      this.$emit('goContract')
    }
  },
  components: {
  },
  props: ['show', 'data']
}
</script>
<style scoped>
.img2{
  width: 30px;
  height: 34px;
}
.fyCycle{
  font-size: 28px;
  color: #666;
}
.fyInput{
  font-size: 28px;
  color: #666;
  width: 100px;
}
.contract-bottom-fl{
  width: 375px;
  height: 90px;
  line-height: 90px;
  color: #666;
  text-align: center;
  font-size: 28px;
  background-color: #fff;
  border-top: 1px solid #E0E0E0;
}
.contract-bottom-fr{
  width: 375px;
  height: 90px;
  line-height: 90px;
  color: #fff;
  text-align: center;
  font-size: 28px;
  background-color: #FBB13F;
}
.mgb-50{
  margin-bottom: 90px;
}
.contract-bottom{
  position: fixed;
  bottom:0;
  left: 0;
  width: 750px;
  height: 90px;
  flex-direction: row;
  align-items: center;
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
.radio-div{
  width: 690px;
  flex-direction: row;
  align-items: center;
}
.radio-img{
  width: 92px;
  height: 88px;
}
.zk-form-div-fr{
  flex-direction: row;
  align-items: center;
}
.img{
  width: 10px;
  height: 20px;
}
.zk-form-div-right{
  color: #999;
  font-size: 28px;
  margin-right: 20px;
}
.top-fz{
  font-size: 28px;
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
.form-title2{
  margin: 30px 0;
  font-size: 28px;
  color: #666;
  background-color: #f8f8f8;
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
.wrapper {
  display: flex;
  flex-direction: column;
  width: 750px;
  align-items: center;
}
</style>
