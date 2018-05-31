<template>
  <div class="wrapper">
    <div class="list" v-for="(item, index) in list">
      <div class="list-top">
        <div class="list-top-div">
          <text class="list-top-text1">{{item.pwdType | capitalize}}</text>
          <text v-if="item.pwdStatus === 'LOCKED'" class="list-top-text1Locked">(已冻结)</text>
        </div>
        <text class="list-top-text2">{{item.userName}}</text>
        <text class="list-top-text2">{{item.userPhone}}</text>
        <image @click="frozenPwd(item)" class="img" src="https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/frozen.png" resize="stretch"></image>
      </div>
      <div class="list-bottom">
        <text class="list-top-text3">有效期:{{item.beginTime}}-{{item.endTime}}</text>
        <image @click="deletePwd(item)" class="img" src="https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/delete.png" resize="stretch"></image>
      </div>
    </div>
    <text v-if="list.length !== 0 && (this.$store.state.currentUser.roleData.indexOf('运营部经理') !== -1 || this.$store.state.currentUser.roleData.indexOf('运营主管') !== -1 || this.$store.state.currentUser.roleData.indexOf('运营专员') !== -1)" class="bottom-btn" @click="deleteAll(list)">全部删除</text>
  </div>
</template>
<script>

import dingtalk from 'dingtalk-javascript-sdk';

export default {
  name: 'doorDetail',
  data: function(){
    return {
      houseDetailData: {},
      list: []
    }
  },
  computed: {
  },
  filters: {
    // 朝向过滤
    capitalize: function (value) {
      if (value === 'NORMAL') {
        return '租客密码'
      } else if (value === 'TEMP') {
        return '看房密码'
      } else if (value === 'DYNAMIC') {
        return '离线密码'
      }else if (value === 'CUSTOM') {
        return '租客自定义'
      }
    }
  },
  mounted: function(){
    this.houseDetailData = JSON.parse(this.$store.state.currentUser.houseData)
    this.getList()
    dingtalk.ready(function(){
      const dd = dingtalk.apis;
      // 设置导航
      dd.biz.navigation.setTitle({
        title: '密码记录'
      });
    });
  },
  methods: {
    // 获取时间
    gshtime: function (time) {   
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
      str+= day + "-";
      if(hh == 0)  
      str+= "0";
      str+= hh + "时"; 
      return(str);   
    },
    // 获取生效中列表密码
    getList: function (e) {
      this.$http.post(this.$store.state.lockUrl + 'list/pwd', {
        houseId: this.houseDetailData.houseSpaceId,
        houseName: this.houseDetailData.keywordAddress,
        opUserId: this.$store.state.currentUser.uid,
        opUserName: this.$store.state.currentUser.userName,
        pageNo: 1,
        pageSize: 99
      }).then(function (response) {
        var data = response.data
        if (data.data) {
          for (var i = 0; i <= data.data.list.length - 1; i ++) {
            data.data.list[i].beginTime = this.gshtime(new Date(data.data.list[i].beginTime))
            data.data.list[i].endTime = this.gshtime(new Date(data.data.list[i].endTime))
          }
          this.list = data.data.list
        } else {
          this.list = []
          dingtalk.ready(function(){
            const dd = dingtalk.apis;
            dd.device.notification.alert({
              message: "暂无数据",
              title: "提示",//可传空
              buttonName: "确定"
            });
          });
        }
      }, function (response) {
        console.log(response.status)
      })
    },
    // 冻结密码
    frozenPwd: function (item) {
      let that = this
      let frozen,message,messageSuc,messageFail
      if (item.pwdStatus === 'LOCKED') {
        frozen = false
        message = '是否确定解冻此密码'
        messageSuc = '解冻成功'
        messageFail = '解冻失败'
      } else {
        frozen = true
        message = '是否确定冻结此密码'
        messageSuc = '冻结成功'
        messageFail = '冻结失败'
      }
      if (that.$store.state.currentUser.roleData.indexOf('运营部经理') !== -1 || that.$store.state.currentUser.roleData.indexOf('运营专员') !== -1 || that.$store.state.currentUser.roleData.indexOf('运营主管') !== -1) {
        dingtalk.ready(function(){
          const dd = dingtalk.apis;
          dd.device.notification.confirm({
            message: message,
            title: "提示",
            buttonLabels: ['取消', '确定'],
            onSuccess : function(result) {
              if (result.buttonIndex === 1) {
                // 冻结密码接口
                that.$http.post(that.$store.state.lockUrl + 'frozen', {
                  frozen: frozen,
                  houseId: that.houseDetailData.houseSpaceId,
                  houseName: that.houseDetailData.keywordAddress,
                  opUserId: that.$store.state.currentUser.uid,
                  opUserName: that.$store.state.currentUser.userName,
                  lockId: item.lockId,
                  pwdid: item.pwdId
                }).then(function (response) {
                  var data = response.data
                  if (data.code === 200) {
                    dingtalk.ready(function(){
                      const dd = dingtalk.apis;
                      dd.device.notification.alert({
                        message: messageSuc,
                        title: "提示",//可传空
                        buttonName: "确定",
                        onSuccess : function() {
                          that.getList()
                        }
                      });
                    });
                  } else {
                    dingtalk.ready(function(){
                      const dd = dingtalk.apis;
                      dd.device.notification.alert({
                        message: messageFail,
                        title: "提示",//可传空
                        buttonName: "确定",
                        onSuccess : function() {
                          that.getList()
                        }
                      });
                    });
                  }
                }, function (response) {
                  console.log(response.status)
                })
              }
            },
            onFail : function(err) {}
          });
        });
      } else {
        dingtalk.ready(function(){
          const dd = dingtalk.apis;
          dd.device.notification.alert({
            message: '暂无权限',
            title: "提示",//可传空
            buttonName: "确定"
          });
        });
      }
    },
    // 删除密码
    deletePwd: function (item) {
      let that = this
      if (that.$store.state.currentUser.roleData.indexOf('运营部经理') !== -1 || that.$store.state.currentUser.roleData.indexOf('运营专员') !== -1 || that.$store.state.currentUser.roleData.indexOf('运营主管') !== -1) {
        dingtalk.ready(function(){
          const dd = dingtalk.apis;
          dd.device.notification.confirm({
            message: "是否确定删除此密码",
            title: "提示",
            buttonLabels: ['取消', '确定'],
            onSuccess : function(result) {
              if (result.buttonIndex === 1) {
                // 删除密码接口
                that.$http.post(that.$store.state.lockUrl + 'del', {
                  lockId: item.lockId,
                  loginId: that.$store.state.currentUser.uid,
                  pwdId: item.pwdId,
                  pwdIndex: item.pwdIndex,
                  type: 'ONE'
                }).then(function (response) {
                  var data = response.data
                  if (data.code === 200) {
                    dingtalk.ready(function(){
                      const dd = dingtalk.apis;
                      dd.device.notification.alert({
                        message: "删除成功",
                        title: "提示",//可传空
                        buttonName: "确定",
                        onSuccess : function() {
                          that.getList()
                        }
                      });
                    });
                  } else {
                    dingtalk.ready(function(){
                      const dd = dingtalk.apis;
                      dd.device.notification.alert({
                        message: "删除失败",
                        title: "提示",//可传空
                        buttonName: "确定",
                        onSuccess : function() {
                          that.getList()
                        }
                      });
                    });
                  }
                }, function (response) {
                  console.log(response.status)
                })
              }
            },
            onFail : function(err) {}
          });
        });
      } else {
        dingtalk.ready(function(){
          const dd = dingtalk.apis;
          dd.device.notification.alert({
            message: '暂无权限',
            title: "提示",//可传空
            buttonName: "确定"
          });
        });
      }
    },
    // 删除全部密码
    deleteAll: function (list) {
      let that = this
      if (that.$store.state.currentUser.roleData.indexOf('运营部经理') !== -1 || that.$store.state.currentUser.roleData.indexOf('运营专员') !== -1 || that.$store.state.currentUser.roleData.indexOf('运营主管') !== -1) {
        dingtalk.ready(function(){
          const dd = dingtalk.apis;
          dd.device.notification.confirm({
            message: "是否确定删除全部密码",
            title: "提示",
            buttonLabels: ['取消', '确定'],
            onSuccess : function(result) {
              if (result.buttonIndex === 1) {
                // 删除密码接口
                that.$http.post(that.$store.state.lockUrl + 'del', {
                  lockId: list[0].lockId,
                  loginId: that.$store.state.currentUser.uid,
                  type: 'ALL'
                }).then(function (response) {
                  var data = response.data
                  if (data.code === 200) {
                    dingtalk.ready(function(){
                      const dd = dingtalk.apis;
                      dd.device.notification.alert({
                        message: "删除全部密码成功",
                        title: "提示",//可传空
                        buttonName: "确定",
                        onSuccess : function() {
                          that.getList()
                        }
                      });
                    });
                  } else {
                    dingtalk.ready(function(){
                      const dd = dingtalk.apis;
                      dd.device.notification.alert({
                        message: "删除全部密码失败",
                        title: "提示",//可传空
                        buttonName: "确定",
                        onSuccess : function() {
                          that.getList()
                        }
                      });
                    });
                  }
                }, function (response) {
                  console.log(response.status)
                })
              }
            },
            onFail : function(err) {}
          });
        });
      } else {
        dingtalk.ready(function(){
          const dd = dingtalk.apis;
          dd.device.notification.alert({
            message: '暂无权限',
            title: "提示",//可传空
            buttonName: "确定"
          });
        });
      }
    }
  }
}
</script>
<style scoped>
.bottom-btn{
  position: fixed;
  bottom:0;
  left: 0;
  align-items: center;
  justify-content: center;
  width: 750px;
  height: 90px;
  background-color: #FBB13F;
  color: #fff;
  font-size: 32px;
}
.list-top-text1{
  font-size: 28px;
  color: #FBB13F;
}
.list-top-text1Locked{
  font-size: 26px;
  color: #20a0ff;
}
.list-top-text2{
  font-size: 28px;
  color: #666;
}
.list-top-text3{
  font-size: 26px;
  color: #666;
}
.img{
  width: 30px;
  height: 30px;
}
.list-top{
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
}
.list-bottom{
  flex-direction: row;
  justify-content: space-between;
}
.list{
  width: 750px;
  height: 160px;
  padding: 30px;
  border-top: 1px solid #E0E0E0;
  border-bottom: 1px solid #E0E0E0;
  margin-top: 30px;
  background-color: #fff;
}
.wrapper {
  display: flex;
  flex-direction: column;
  width: 750px;
  align-items: center;
}
.list-top-div{
  flex-direction: row;
}
</style>
