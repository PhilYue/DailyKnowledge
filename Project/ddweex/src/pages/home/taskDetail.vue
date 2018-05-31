<template>
  <div class="wrapper">
  <!-- 待审核流程 -->
    <div v-if="data">
      <div v-for="(item,index) in data.variables.users">
        <text v-if="item.representative === 'PARTB'" class="top">{{item.userName}}的出租合同</text>
      </div>
      <div class="cont">
        <div class="cont-div">
          <text class="cont-div-fl">租期时间</text>
          <text class="cont-div-fr">{{new Date(data.variables.startTime).toLocaleDateString()}} - {{new Date(data.variables.endTime).toLocaleDateString()}}</text>
        </div>
        <div class="cont-div" v-if="data.variables.payCycle">
          <text class="cont-div-fl">付款方式</text>
          <text class="cont-div-fr">{{data.variables.payCycle | cycleFilter}}</text>
        </div>
        <div v-if="data.variables.guidePrice" class="cont-div">
          <text class="cont-div-fl">房源指导价</text>
          <text class="cont-div-fr">{{data.variables.guidePrice / 1000}}</text>
        </div>
        <div class="cont-div">
          <text class="cont-div-fl">租金</text>
          <text class="cont-div-fr">{{data.variables.rental / 1000}}</text>
        </div>
        <div class="cont-div">
          <text class="cont-div-fl">押金</text>
          <text class="cont-div-fr">{{data.variables.deposit / 1000}}</text>
        </div>
        <div v-if="data.variables.firstCreditAmount" class="cont-div">
          <text class="cont-div-fl">首月减免金额</text>
          <text class="cont-div-fr">{{data.variables.firstCreditAmount / 1000}}</text>
        </div>
      </div>
      <div class="cont-memo" v-if="data.variables.memo">
        <text class="cont-div-fl">原因</text>
        <text class="cont-div-memo">{{data.variables.memo}}</text>
      </div>
      <!-- 底部按钮 -->
      <div class="contract-bottom">
        <text class="contract-bottom-fl" @click="operation('不同意', '/contract/updateFlow', 'GET', 'confirm', {selectOption:2}, 'confirm.rent.contract.nopass', data.operation.options[1].businessParams, null)">不同意</text>
        <text class="contract-bottom-fr" @click="operation('同意', '/contract/updateFlow', 'GET', 'confirm', {selectOption:1}, 'confirm.rent.contract.waisign', data.operation.options[0].businessParams, null)">同意</text>
      </div>
    </div>
    <div v-if="data2">
      <div>
        <text class="top">{{data2.tenantName}}的出租合同</text>
      </div>
      <div class="cont">
        <div class="cont-div">
          <text class="cont-div-fl">租期时间</text>
          <text class="cont-div-fr">{{new Date(Number(data2.contracStartTime)).toLocaleDateString()}} - {{new Date(Number(data2.contractEndTime)).toLocaleDateString()}}</text>
        </div>
        <div class="cont-div" v-if="data2.payCycle">
          <text class="cont-div-fl">付款方式</text>
          <text class="cont-div-fr">{{data2.payCycle | cycleFilter}}</text>
        </div>
        <div v-if="data2.guidePrice" class="cont-div">
          <text class="cont-div-fl">房源指导价</text>
          <text class="cont-div-fr">{{data2.guidePrice / 1000}}</text>
        </div>
        <div class="cont-div">
          <text class="cont-div-fl">租金</text>
          <text class="cont-div-fr">{{data2.rental / 1000}}</text>
        </div>
        <div class="cont-div">
          <text class="cont-div-fl">押金</text>
          <text class="cont-div-fr">{{data2.deposit / 1000}}</text>
        </div>
        <div v-if="data2.firstCreditAmount" class="cont-div">
          <text class="cont-div-fl">首月减免金额</text>
          <text class="cont-div-fr">{{data2.firstCreditAmount / 1000}}</text>
        </div>
      </div>
      <div class="cont-memo" v-if="data2.memo">
        <text class="cont-div-fl">原因</text>
        <text class="cont-div-memo">{{data2.memo}}</text>
      </div>
    </div>
  </div>
</template>
<script>

import dingtalk from 'dingtalk-javascript-sdk';

export default {
  name: 'taskDetail',
  data: function(){
    return {
      data: '',
      data2: ''
    }
  },
  computed: {
  },
  mounted: function(){
    this.data = this.$route.params.data
    this.data2 = this.$route.params.data2
    dingtalk.ready(function(){
      const dd = dingtalk.apis;
      // 设置导航
      dd.biz.navigation.setTitle({
        title: '流程详情'
      });
    });
  },
  methods: {
    // 修改状态统一接口POST
    changStatus (apiMethod, url, data, processBusinessKey, processInstanceId, taskId) {
      if (apiMethod === 'POST') {
        this.$http.post(url,
          data
        , {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/*; charset=utf-8',
            'userId': this.$store.state.currentUser.uid,
            'workflowToken': this.$store.state.workflowToken,
            'taskId': taskId,
            'processInstanceId': processInstanceId,
            'processBusinessKey': processBusinessKey
          }
        }).then(function (response) {
          var data = response.data
          if (data.code === 200) {
            dingtalk.ready(function(){
              const dd = dingtalk.apis;
              dd.device.notification.alert({
                message: "操作成功",
                title: "提示",//可传空
                buttonName: "确定"
              });
            });
          } else {
            dingtalk.ready(function(){
              const dd = dingtalk.apis;
              dd.device.notification.alert({
                message: "操作失败",
                title: "提示",//可传空
                buttonName: "确定"
              });
            });
          }
        }, function (response) {
          dingtalk.ready(function(){
            const dd = dingtalk.apis;
            dd.device.notification.alert({
              message: response.status,
              title: "提示",//可传空
              buttonName: "确定"
            });
          });
        })
      } else {
        this.$http.get(url + '/' + data,
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/*; charset=utf-8',
              'userId': this.$store.state.currentUser.uid,
              'workflowToken': this.$store.state.workflowToken,
              'taskId': taskId,
              'processInstanceId': processInstanceId,
              'processBusinessKey': processBusinessKey
            }
          }).then(function (response) {
            var data = response.data
            if (data.code === 200) {
              dingtalk.ready(function(){
                const dd = dingtalk.apis;
                dd.device.notification.alert({
                  message: '操作成功',
                  title: "提示",//可传空
                  buttonName: "确定"
                });
              });
              this.$router.push({ name: 'taskList'})
            } else {
              dingtalk.ready(function(){
                const dd = dingtalk.apis;
                dd.device.notification.alert({
                  message: '操作失败',
                  title: "提示",//可传空
                  buttonName: "确定"
                });
              });
            }
          }, function (response) {
            dingtalk.ready(function(){
              const dd = dingtalk.apis;
              dd.device.notification.alert({
                message: response.status,
                title: "提示",//可传空
                buttonName: "确定"
              });
            });
          })
      }
    },
    // 流程控制
    operation (hint, actionUrl, requestMethod, actionType, workflowParams, actionTarget, businessParams, options) {
      let that = this
      dingtalk.ready(function(){
        const dd = dingtalk.apis;
        dd.device.notification.confirm({
          message: "确定进行此操作",
          title: "提示",
          buttonLabels: ['取消', '确定'],
          onSuccess : function(result) {
            if (result.buttonIndex === 1) {
              // 弹框同意取消
              if (actionType === 'confirm') {
                let req = that.data
                that.$store.commit('getMidWorkflowToken', {'processKey': req.processBusinessKey, 'variables': workflowParams})
                let apiUrl
                // 确定取消弹框
                if (actionType === 'confirm') {
                  if (req.processBusinessType === 'rent') {
                    // 新签合同链接
                    apiUrl = that.$store.state.apiUrl + '23250' + actionUrl
                  }
                  // 如果是合同同意取消
                  if (requestMethod === 'POST') {
                    let apiData = {}
                    for (let i = 0; i <= businessParams.length - 1; i++) {
                      apiData[businessParams[i].key] = businessParams[i].value
                    }
                    that.changStatus(requestMethod, apiUrl, apiData, req.processBusinessKey, that.data.processInstanceId, that.data.taskId)
                  } else if (requestMethod === 'GET') {
                    let apiData = ''
                    for (let i = 0; i <= businessParams.length - 1; i++) {
                      apiData += businessParams[i].value + '/'
                    }
                    that.changStatus(requestMethod, apiUrl, apiData, req.processBusinessKey, that.data.processInstanceId, that.data.taskId)
                  }
                }
              }
            }
          },
          onFail : function(err) {}
        });
      });
    },
  },
  filters: {
    cycleFilter: function(value) {
      if (value === 'ONEMON') {
        return '月付'
      } else if (value === 'THREEMON') {
        return '季付'
      } else if (value === 'SIXMON') {
        return '半年一付'
      } else if (value === 'TWELVEMON') {
        return '一年一付'
      } else if (value === 'TWOMON') {
        return '二月一付'
      } else if (value === 'FOURMON') {
        return '四月一付'
      } else if (value === 'ONEPAY') {
        return '一次付清'
      }
    }
  }
}
</script>
<style scoped>
.contract-bottom-fl{
  width: 375px;
  height: 90px;
  line-height: 90px;
  color: #666;
  text-align: center;
  font-size: 28px;
  background-color: #fff;
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
.contract-bottom{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 750px;
  height: 90px;
  flex-direction: row;
  align-items: center;
}
.cont-div-memo{
  font-size: 28px;
  color: #999;
}
.cont-memo{
  width: 750px;
  border: 1px solid #E0E0E0;
  padding: 30px;
  background-color: #fff;
}
.cont-div-fl{
  color: #333;
  font-size: 28px;
}
.cont-div-fr{
  color: #999;
  font-size: 28px;
}
.cont-div{
  width: 690px;
  height: 100px;
  margin-left: 30px;
  border-bottom: 1px solid #E0E0E0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.cont{
  width: 750px;
  border-top:1px solid #E0E0E0;
  border-bottom:1px solid #E0E0E0;
  margin-bottom: 30px;
  background-color: #fff;
}
.top{
  width: 750px;
  height: 100px;
  font-size: 28px;
  color: #333;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  margin:30px 0;
}
.wrapper {
  display: flex;
  flex-direction: column;
  width: 750px;
  align-items: center;
}
</style>
