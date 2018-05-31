<template>
  <div class="wrapper">
    <image class="houseDetail-img" :src="houseDetailData.resHouseSpaceFileBeanList !== null ? houseDetailData.resHouseSpaceFileBeanList[0].fileUrl : 'https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/big.png'" resize="stretch"></image>
    <div class="house-des">
      <image class="houseDetail-imgIcon" :src="tipImg" resize="stretch"></image>
      <text v-if="houseDetailData.keywordAddress" class="house-des-title">{{houseDetailData.keywordAddress}}</text>
      <!-- <text v-if="houseDetailData.startTime" class="house-des-time">托管周期:{{this.gshtime(new Date(houseDetailData.startTime))}}-{{this.gshtime(new Date(houseDetailData.endTime))}}</text> -->
      <div class="house-des-cont">
        <text v-if="houseDetailData.houseSpaceArea" class="house-des-time">面积:{{houseDetailData.houseSpaceArea / 1000}}㎡</text>
        <text class="house-des-tip">|</text>
        <text v-if="houseDetailData.direction" class="house-des-time">朝向:{{houseDetailData.direction | capitalize}}</text>
      </div>
      <text v-if="houseDetailData.expectedRentalPrice" class="house-des-money">{{houseDetailData.expectedRentalPrice / 1000}}元/月</text>
    </div>
    <!--营销规则  -->
    <div class="house-des-rule">
      <text class="house-des-rule-title">营销规则</text>
      <div class="select-div">
        <div class="select-div-div mg-82">
          <text class="select-div-select" @click="getStartTime">{{startTime}}</text>
          <image class="select-div-select-img" src="https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/down.png" resize="stretch"></image>
        </div>
        <div class="select-div-div">
          <text class="select-div-select" @click="getEndTime">{{endTime}}</text>
          <image class="select-div-select-img" src="https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/down.png" resize="stretch"></image>
        </div>
        <div class="select-div-div mg-82">
          <text class="select-div-select" @click="getCycle">{{payCycle}}</text>
          <image class="select-div-select-img" src="https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/down.png" resize="stretch"></image>
        </div>
        <div class="select-div-div">
          <text class="select-div-select1" @click="getRule">查看规则</text>
        </div>
      </div>
    </div>
    <!--租客信息  -->
    <div class="house-des-rule mg156">
      <text class="house-des-rule-title">租客信息</text>
      <div class="select-div">
        <text v-if="houseDetailData.tenantName" class="select-div-people">姓   名:    {{houseDetailData.tenantName}}</text>
        <text v-if="houseDetailData.tenantCertNumber" class="select-div-people">身份证:    {{houseDetailData.tenantCertNumber}}</text>
        <text v-if="houseDetailData.tenantPhone" class="select-div-people">手机号:    {{houseDetailData.tenantPhone}}</text>
      </div>
    </div>
    <!-- 操作按钮 -->
    <div class="house-bottom">
      <text v-if="this.houseDetailData.houseSpaceStatus === 'RENTABLE'" @click="goYuding(houseDetailData.houseSpaceId)" class="house-bottom-yd"><image class="house-bottom-yd-img" src="https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/yd.png" resize="stretch"></image>预定</text>
      <text v-if="this.houseDetailData.houseSpaceStatus === 'RENTABLE' || this.houseDetailData.houseSpaceStatus === 'RESERVED'" @click="goContract(houseDetailData.houseSpaceId)" class="house-bottom-qy">电子签约</text>
      <text :class="msClass" @click="goPassword(houseDetailData.houseSpaceId)">智能门锁</text>
    </div>
    <!-- 优惠规则组件 -->
    <ruleDialog :data="ruleDialogData" :show="ruleDialogShow"></ruleDialog>
  </div>
</template>
<script>
import ruleDialog from '../../components/ruleDialog'  // 营销规则弹窗组件
import dingtalk from 'dingtalk-javascript-sdk';
export default {
  name: 'houseDetail',
  data: function(){
    return {
      houseDetailData: {},
      startTime: '起租时间',
      endTime: '退租时间',
      payCycle: '支付周期',
      tipImg: '',
      ruleDialogShow: {
        show: false
      },
      ruleDialogData: '',
      submit: {},
      msClass: 'house-bottom-ms'
    }
  },
  computed: {
  },
  filters: {
    // 朝向过滤
    capitalize: function (value) {
      if (value === 'EAST') {
        return '东'
      } else if (value === 'SOUTH') {
        return '南'
      } else if (value === 'WEST') {
        return '西'
      } else if (value === 'NORTH') {
        return '北'
      } else if (value === 'SOUTHEAST') {
        return '东南'
      } else if (value === 'NORTHEAST') {
        return '东北'
      } else if (value === 'SOUTHWEST') {
        return '西南'
      } else if (value === 'NORTHWEST') {
        return '西北'
      }
    }
  },
  mounted: function(e){
    this.houseDetailData = JSON.parse(this.$store.state.currentUser.houseData)
    if (this.houseDetailData.houseSpaceStatus === 'RENTABLE') {
      this.tipImg = 'https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/kongzhi.png'
    } else if (this.houseDetailData.houseSpaceStatus === 'SIGNING_LC') {
      this.tipImg = 'https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/qiandingzhong.png'
      this.msClass = 'house-bottom-msW100'
    } else if (this.houseDetailData.houseSpaceStatus === 'FREEZING') {
      this.tipImg = 'https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/dongjie.jpg'
      this.msClass = 'house-bottom-msW100'
    } else if (this.houseDetailData.houseSpaceStatus === 'DC_NOT_TE') {
      this.tipImg = 'https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/weishengxiao.png'
      this.msClass = 'house-bottom-msW100'
    } else if (this.houseDetailData.houseSpaceStatus === 'RESERVED') {
      this.tipImg = 'https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/yiyuding.png'
      this.msClass = 'house-bottom-msW75'
    } else if (this.houseDetailData.houseSpaceStatus === 'RENTED') {
      this.tipImg = 'https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/yichuzu.png'
      this.msClass = 'house-bottom-msW100'
    } else {
      this.msClass = 'house-bottom-msW100'
      this.tipImg = 'https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/suodingzhong.png'
    }
    dingtalk.ready(function(){
      const dd = dingtalk.apis;
      // 设置导航
      dd.biz.navigation.setTitle({
        title: '房源详情'
      });
    });
  },
  methods: {
    // 时间格式转换yyyy-mm-dd
    gshtime: function(time) {   
      var year = time.getFullYear();       //年
      var month = time.getMonth() + 1;  //月
      var day = time.getDate();         //日
      var hh = time.getHours();       //时
      var mm = time.getMinutes();    //分
      var ss = time.getSeconds() //秒
      var str= year + ".";  
      if(month < 10)  
          str+= "0";
      str+= month + ".";  
      if(day < 10)  
          str+= "0";  
      str+= day + "";  
      return(str);   
    },
    // 获取开始时间
    getStartTime: function (e) {
      let that = this
      dingtalk.ready(function(){
        const dd = dingtalk.apis;
        // 获取时间
        dd.biz.util.datepicker({
          format: 'yyyy-MM-dd',
          value: new Date(), //默认显示日期
          onSuccess : function(result) {
            that.startTime = result.value
          },
          onFail : function(err) {}
        })
      });
    },
    // 获取结束时间
    getEndTime: function (e) {
      let that = this
      dingtalk.ready(function(){
        const dd = dingtalk.apis;
        // 获取时间
        dd.biz.util.datepicker({
          format: 'yyyy-MM-dd',
          value: new Date(), //默认显示日期
          onSuccess : function(result) {
            that.endTime = result.value
          },
          onFail : function(err) {}
        })
      });
    },
    // 支付周期筛选
    getCycle: function (e) {
      let that = this
      dingtalk.ready(function(){
        const dd = dingtalk.apis;
        dd.biz.util.chosen({
          source:[{
              key: '月付', //显示文本
              value: 'MONTH' //值，
          },{
              key: '季付', //显示文本
              value: 'SEASON' //值，
          },{
              key: '半年付',
              value: 'HALF_YEAR'
          },{
              key: '年付',
              value: 'YEAR'
          },{
              key: '二月一付',
              value: 'TWO_MONTH'
          },{
              key: '四月一付',
              value: 'FOUR_MONTH'
          },{
              key: '一次付清',
              value: 'LUMP_SUM'
          }],
         selectedKey:'全部' , // 默认选中的key
         onSuccess : function(result) {
            that.payCycle = result.key
            that.submit.payCycle = result.value
          },
         onFail : function(err) {}
        })
      });
    },
    // 获取规则
    getRule: function (e) {
      if (this.endTime !== '退租时间' && this.startTime !== '起租时间' && this.payCycle !== '支付周期') {
        this.$http.post(this.$store.state.ruleUrl + 'activity/list/saleContent', {
          houseSpaceId: this.houseDetailData.houseSpaceId,
          paymentCycle: this.submit.payCycle,
          rentalEndTime: Date.parse(this.endTime),
          rentalStartTime: Date.parse(this.startTime)
        }).then(function (response) {
          var data = response.data
          if (data.data !== null) {
            this.ruleDialogData = data.data
            this.ruleDialogShow.show = true
          } else {
            dingtalk.ready(function(){
              const dd = dingtalk.apis;
              dd.device.notification.alert({
                message: "获取营销规则失败",
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
            message: "请先选择起租退租时间和支付周期",
            title: "提示",//可传空
            buttonName: "确定"
          });
        });
      }
    },
    // 获取密码
    goPassword: function (e) {
      this.$router.push({ name: 'doorList'})
      console.log(e)
    },
    // 新建预定
    goYuding: function (e) {
      this.$router.push({ name: 'yuding'})
      console.log(e)
    },
    // 新建合同
    goContract: function (e) {
      this.$router.push({ name: 'contractForm'})
      console.log(e)
    }
  },
  components: {
    ruleDialog
  }
}
</script>
<style scoped>
.houseDetail-imgIcon{
  width: 100px;
  height: 100px;
  position: absolute;
  right: 0;
  top: 0;
}
.house-bottom-msW100{
  width: 750px;
  height: 90px;
  line-height: 90px;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: #fff;
  background-color: #FBB13F;
}
.house-bottom-msW75{
  width: 550px;
  height: 90px;
  line-height: 90px;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: #fff;
  background-color: #FBB13F;
}
.house-bottom-ms{
  width: 376px;
  height: 90px;
  line-height: 90px;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: #fff;
  background-color: #FBB13F;
}
.house-bottom-qy{
  width: 200px;
  height: 90px;
  line-height: 90px;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: #666;
}
.house-bottom-yd{
  width: 174px;
  height: 90px;
  line-height: 90px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #E0E0E0;
  font-size: 28px;
  color: #666;
}
.house-bottom{
  flex-direction:row;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 750px;
  height: 90px;
  background-color: #fff;
  border-top: 1px solid #E0E0E0;
}
.select-div-people{
  padding-left: 30px;
  font-size: 24px;
  color: #666;
  margin-top: 20px;
}
.mg156{
  margin-bottom: 246px;
}
.mg-82{
  margin-right: 82px;
}
.select-div{
  display: inline-block;
}
.select-div-div{
  display: inline-block;
  width: 274px;
  height: 60px;
  margin-top: 20px;
}
.select-div-select-img{
  width: 20px;
  height: 10px;
  position: absolute;
  right: 20px;
  top: 26px;
}
.select-div-select{
  width: 272px;
  height: 59px;
  line-height: 60px;
  border-radius: 8px;
  color: #999;
  font-size: 24px;
  padding-left: 30px;
  border:1px solid #E0E0E0;
}
.select-div-select1{
  width: 272px;
  height: 59px;
  line-height: 60px;
  border-radius: 8px;
  color: #FBB13F;
  text-align: center;
  font-size: 24px;
  border:1px solid #FBB13F;
}
.house-des-rule-title{
  font-size: 28px;
  padding-left: 30px;
  border-left: 6px solid #FBB13F;
}
.house-des-rule{
  padding: 40px 30px;
  width: 690px;
  height: 280px;
  background-color: #fff;
  margin-top: 30px;
  border-radius: 10px;
}
.house-des-money{
  color: #FBB13F;
  font-size: 32px;
  margin-top: 20px;
}
.house-des-tip{
  position: relative;
  top: 20px;
  font-size: 22px;
  color: #666;
  margin: 0 20px;
}
.house-des-time{
  font-size: 22px;
  color: #666;
  margin-top: 20px;
}
.house-des-title{
  color: #333;
  font-size: 32px;
}
.wrapper {
  display: flex;
  flex-direction: column;
  width: 750px;
  align-items: center;
}
.houseDetail-img{
  width: 750px;
  height: 500px;
}
.house-bottom-yd-img{
  width: 30px;
  height: 27px;
  margin-right: 8px;
}
.house-des{
  width: 690px;
  padding: 40px 0;
  margin-top: -80px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0 1px 7px 0 rgba(0,0,0,0.25);
  flex-direction:column;
  align-items: center;
}
.house-des-cont{
  flex-direction:row;
}
</style>
