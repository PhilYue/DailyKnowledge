<template>
  <div class="wrapper">
    <div class="top">
      <div class="w-50p" @click="loadDb">
        <text :class="topText1">我的待办</text>
      </div>
      <div class="w-50p" @click="loadAl">
        <text :class="topText2">我已处理</text>
      </div>
    </div>
    <div v-if="topText1 === 'top-textOn'" class="mg88">
      <div class="cont" v-for="(item, index) in taskData" @click="goTaskDetail(item)">
        <div class="title">
          <image class="img" :src="lcImg" resize="stretch"></image>
          <div v-for="(item2,index) in item.variables.users">
            <text class="title-cont" v-if="item2.representative === 'PARTB'">{{item2.userName}}的出租合同审批</text>
          </div>
          <text class="title-right">待审批</text>
        </div>
        <text class="cont-text1">房源地址:{{item.variables.houseSpaceName}}</text>
        <text class="cont-text2">发起时间: {{new Date(item.processStartTime).toLocaleDateString().replace(/\//g,"-") + new Date(item.processStartTime).toLocaleTimeString()}}</text>
      </div>
    </div>
    <scroller :style="styleObject" v-if="topText2 === 'top-textOn'" class="mg88" :show-scrollbar="false" loadmoreoffset="0" @loadmore="onloading">
      <div class="cont" v-for="(item, index) in taskData2" @click="goTaskDetail2(item)">
        <div class="title">
          <image class="img" :src="item.ok ? lcImg : lcImg2" resize="stretch"></image>
          <text class="title-cont">{{item.tenantName}}的出租合同审批</text>
          <text class="title-right2" v-if="item.ok === true">已同意</text>
          <text class="title-right3" v-if="item.ok === false">已拒绝</text>
        </div>
        <text class="cont-text1">房源地址:{{item.houseSpaceName}}</text>
        <text v-if="item.contractCreateTime" class="cont-text2">发起时间: {{new Date(Number(item.contractCreateTime)).toLocaleDateString().replace(/\//g,"-") + new Date(Number(item.contractCreateTime)).toLocaleTimeString()}}</text>
      </div>
    </scroller>
    <!-- 底部导航 -->
    <nav :data="navClass"></nav>
  </div>
</template>
<script>
import nav from '../../components/nav';
import dingtalk from 'dingtalk-javascript-sdk';

export default {
  name: 'taskList',
  data: function(){
    return {
      styleObject: '',
      topText1: 'top-textOn',
      topText2: 'top-text',
      lcImg: 'https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/wait.png',
      lcImg2: 'https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/refuse.png',
      taskBean: {},
      taskBeanAl: {},
      // 待处理流程
      taskData: [],
      // 我已处理的流程
      taskData2: [],
      // 底部导航数据
      navClass: {
        houseImg: 'https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/house.png',
        houseText: 'nav-div-text',
        myImg: 'https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/myOn.png',
        myText: 'nav-div-textOn',
      },
    }
  },
  computed: {
  },
  mounted: function(){
    this.styleObject = {
      height: window.innerHeight*2 - 202
    }
    // 流程默认参数
    this.taskBean = {
      userId: this.$store.state.currentUser.uid,
      order: 'desc',
      taskType: 'PROCESS-KEY-RENT-V15'
    }
    this.taskBeanAl = {
      businessKey: "PROCESS-KEY-RENT-V15",
      pageNo: 0,
      pageSize: 10,
      taskDefinitionKey: "sid-BAB89A78-739E-44D9-AD67-B76C0AA58D30"
    }
    this.loadTaskData(this.taskBean)
    dingtalk.ready(function(){
      const dd = dingtalk.apis;
      // 设置导航
      dd.biz.navigation.setTitle({
        title: '待办任务'
      });
    });
  },
  methods: {
    // 加载待办
    loadDb: function (e) {
      this.topText1 = 'top-textOn'
      this.topText2 = 'top-text'
    },
    // 加载我已处理
    loadAl: function (e) {
      this.topText1 = 'top-text'
      this.topText2 = 'top-textOn'
      this.taskData2 = []
      this.loadTaskData2(this.taskBeanAl)
    },
    onloading (event) {
      this.taskBeanAl.pageNo ++
      this.loadTaskData2(this.taskBeanAl)
    },
    // 加载流程
    loadTaskData2 (taskBeanAl) {
       // 请求待办任务的数据
      this.$http.post(this.$store.state.workflowUrl + 'history', taskBeanAl)
      .then(function (response) {
        var data = response.data
        if (data.data.length !== 0) {
          this.taskData2 = this.taskData2.concat(data.data)
        } else {
          this.taskData2 = []
          dingtalk.ready(function(){
            const dd = dingtalk.apis;
            dd.device.notification.alert({
              message: '数据为空',
              title: "提示",//可传空
              buttonName: "确定"
            });
          });
        }
      }, function (response) {
        console.log(response.status)
      })
    },
    // 加载流程
    loadTaskData (taskBean) {
       // 请求待办任务的数据
      this.$http.post(this.$store.state.workflowUrl + 'tasks', taskBean)
      .then(function (response) {
        var data = response.data
        if (data.data.length !== 0) {
          this.taskData = data.data
        } else {
          this.taskData = ''
          dingtalk.ready(function(){
            const dd = dingtalk.apis;
            dd.device.notification.alert({
              message: '数据为空',
              title: "提示",//可传空
              buttonName: "确定"
            });
          });
        }
      }, function (response) {
        console.log(response.status)
      })
    },
    // 进入待处理详情页
    goTaskDetail: function (e) {
      this.$router.push({name: 'taskDetail', params: {data: e}})
    },
    // 进入已处理详情页
    goTaskDetail2: function (e) {
      this.$router.push({name: 'taskDetail', params: {data2: e}})
    }
  },
  components: {
    nav
  },
}
</script>
<style scoped>
.title-right{
  color: #FBB13F;
  font-size: 28px;
}
.title-right2{
  color: #999;
  font-size: 28px;
}
.title-right3{
  color: #E52D2D;
  font-size: 28px;
}
.cont-text1{
  margin-top: 33px;
  font-size: 28px;
  color: #666;
}
.cont-text2{
  margin-bottom: 30px;
  font-size: 28px;
  color: #666;
}
.title{
  width: 630px;
  height: 84px;
  border-bottom: 1px solid #E0E0E0;
  color: #333;
  font-size: 32px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.cont{
  width: 690px;
  padding: 0 30px;
  margin-left: 30px;
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 30px;
}
.mg88{
  margin-top: 118px;
}
.img{
  width: 20px;
  height: 40px;
}
.w-50p{
  width: 375px;
  justify-content: center;
  align-items: center;
}
.top-textOn{
  width: 220px;
  padding: 24px 0;
  color: #FBB13F;
  font-size: 28px;
  border-bottom: 4px solid #FBB13F;
  text-align: center;
}
.top-text{
  padding: 24px 0;
  width: 220px;
  color: #666;
  font-size: 28px;
  text-align: center;
  border-bottom: 4px solid #fff;
}
.top{
  position: fixed;
  top: 0;
  left: 0;
  width: 750px;
  height: 88px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
  background-color: #fff;
}
.wrapper {
  display: flex;
  flex-direction: column;
  width: 750px;
  align-items: center;
}
</style>
