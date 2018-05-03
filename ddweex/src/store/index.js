import Vue from 'vue';
import Vuex from 'vuex';
import weex from 'weex-vue-render';
import VueResource from 'vue-resource'
import $ from 'jquery'

weex.init(Vue);
import App from '../container/App.vue';
import Router from '../container/router.js';
import dingtalk from 'dingtalk-javascript-sdk';
const { router } = Router(Vue);

new Vue(Vue.util.extend({
  el:'#root',
  router
},App));

let store = null;
export default function Store(Vue){
  Vue.use(VueResource)
  if (!store){
    Vue.use(Vuex);
    store = new Vuex.Store({
      state: {
        processInstanceId: '', // 流程id
        taskId: '', // 任务id
        workflowToken: '',
        houseData: '',
        count: 0,
        // rent服务接口地址
        rentUrl: 'http://120.55.42.62:23150/rent/',
        // house房源接口地址
        houseUrl: 'http://120.55.42.62:23222/house/',
        // contract合同接口地址
        contractUrl: 'http://120.55.42.62:23250/contract/',
        // account登录接口地址
        accountUrl: 'http://120.55.42.62:21000/account/',
        // pdf接口地址
        pdfUrl: 'http://120.55.42.62:21350/oss/',
        // pay接口地址
        payUrl: 'http://121.196.207.31:21550/pay/',
        // 工作流接口地址
        workflowUrl: 'http://120.55.42.62:21600/workflow/',
        // 售后服务接口地址
        serviceUrl: 'http://120.55.42.62:23300/maintain/',
        // 搜索引擎接口地址
        searchUrl: 'http://120.55.42.62:21275/search/',
        // 维修物品接口地址
        categoryUrl: 'http://120.55.42.62:21275/data/',
        // 三级联动接口地址
        blockUrl: 'http://120.55.42.62:21275/block/',
        // 同步房源数据到蘑菇租房
        alipayUrl: 'http://120.55.42.62:21650/house/sync/',
        // 智能门锁
        lockUrl: 'http://121.196.207.31:21151/lock/',
        // 优惠规则接口
        ruleUrl: 'http://121.196.207.31:21777/sale/',
        currentUser: {
          get userName () {
            return localStorage.getItem('userName')
          },
          get userPhone () {
            return localStorage.getItem('userPhone')
          },
          get uid () {
            return localStorage.getItem('uid')
          },
          get deviceId () {
            return localStorage.getItem('deviceId')
          },
          get ddUserId () {
            return localStorage.getItem('ddUserId')
          },
          get houseData () {
            return localStorage.getItem('houseData')
          },
          get roleData () {
            return localStorage.getItem('roleData')
          }
        }
      },
      mutations: {
        // 拿新workflowToken
        getNewWorkflowToken (state, {processKey, processTenantId, variables}) {
          let url = this.state.workflowUrl + 'process/auth/new'
          $.ajax({
            url: url,
            data: JSON.stringify({
              processKey: processKey, // 类似PROCESS-KEY-RENT
              userId: this.state.currentUser.uid, // uid
              processTenantId: processTenantId, // 片区id
              variables: variables // 可变参数
            }),
            contentType: 'application/json',
            cache: false,
            async: false,
            type: 'POST',
            dataType: 'json',
            success: function (result) {
              state.workflowToken = result.data.workflowToken
              state.processInstanceId = result.data.processInstanceId
              // state.taskId = result.data.taskId
            },
            error: function (result) {
              console.log('拿token报错' + JSON.stringify(result))
            }
          })
        },
        // 拿中间点workflowToken
        getMidWorkflowToken (state, {processKey, variables}) {
          let url = this.state.workflowUrl + 'process/auth'
          $.ajax({
            url: url,
            data: JSON.stringify({
              processBusinessKey: processKey, // 从里面是业务id
              userId: this.state.currentUser.uid,
              variables: variables
            }),
            contentType: 'application/json',
            cache: false,
            async: false,
            type: 'POST',
            dataType: 'json',
            success: function (result) {
              state.workflowToken = result.data.workflowToken
              state.processInstanceId = result.data.processInstanceId // 流程实例id
              state.taskId = result.data.taskId
            }
          })
        },
        increment (state) {
          state.count++
        },
        balance (state) {
        },
        // 保存用户信息
        setUser (state, {userName, userPhone, uid , deviceId , ddUserId}) {
          // 在这里把用户名和token保存起来
          localStorage.setItem('userName', userName)
          localStorage.setItem('userPhone', userPhone)
          localStorage.setItem('uid', uid)
          localStorage.setItem('deviceId', deviceId)
          localStorage.setItem('ddUserId', ddUserId)
        },
        // 保存用户角色
        setRoleData (state, {roleData}) {
          localStorage.setItem('roleData', roleData)
        },
        // 保存房源数据
        setHouseData (state, {houseData}) {
          localStorage.setItem('houseData', houseData)
        }
      },
      actions: {
        // 免登陆保存userId
        setUserId (context, {userName, userPhone, uid, deviceId, ddUserId}) {
          context.commit('setUser', {'userName': userName, 'userPhone': userPhone, 'uid': uid, 'deviceId': deviceId, 'ddUserId': ddUserId})
          router.push('houseList')
        },
        // 短信验证码绑定
        userLogin (context, {userName, userCode, ddUserId, deviceId}) {
          // 发送get请求做权限认证(真实开发建议用post的方式111)
          let url = this.state.accountUrl + 'thirdparty/dding_binding'
          Vue.http.post(url, {
            code: userCode,
            ddUserId: ddUserId,
            deviceId: deviceId,
            userPhone: userName
          }).then((res) => {
            if (res.data.code === 200) {
              let data = res.data.data
              context.commit('setUser', {'userName': data.userName, 'userPhone': data.userPhone, 'uid': data.uid, 'deviceId': data.deviceId, 'ddUserId': data.ddUserId})
              // 跳转到首页
              router.push('houseList')
              dingtalk.ready(function(){
                const dd = dingtalk.apis;
                dd.device.notification.alert({
                  message: '绑定成功,请返回重新登录',
                  title: "提示",//可传空
                  buttonName: "确定"
                });
              });
            } else {
              dingtalk.ready(function(){
                const dd = dingtalk.apis;
                dd.device.notification.alert({
                  message: '用户未注册(联系信息部注册)或验证码错误',
                  title: "提示",//可传空
                  buttonName: "确定"
                });
              });
            }
          }, (res) => {
            console.log('请求失败进入这里')
          })
        },
        // 保存房源数据
        getHouseData (context, {houseData}) {
          console.log(router)
           // 调用上面mutations里定义的方法
          context.commit('setHouseData', {'houseData': houseData})
        },
        // 获取角色列表
        getRole (context, {id}) {
          Vue.http.get(this.state.accountUrl + 'role/list/u/' + id
          ).then(function (response) {
            var data = response.data
            if (data.code === 200) {
              let list = data.data
              let roleData = []
              for (var i = 0; i <= list.length - 1; i++) {
                roleData.push(list[i].name)
              }
              // 保存角色数组
              context.commit('setRoleData', {'roleData': roleData})
            }
          }, function (response) {
            console.log(response.status)
          })
        }
      }
    });
  }
  return {
    store
  };
};
