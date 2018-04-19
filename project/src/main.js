// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/route'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Vuex from 'vuex'
import $ from 'jquery'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(Vuex)
Vue.use(ElementUI)
const store = new Vuex.Store({
  state: {
    count: 0,
    // workflowToken: '1',
    // rent服务接口地址
    rentUrl: 'http://192.168.1.11:23150/rent/',
    // house房源接口地址
    houseUrl: 'http://192.168.1.11:23222/house/',
    // contract合同接口地址
    contractUrl: 'http://192.168.1.11:23250/contract/',
    // account登录接口地址
    accountUrl: 'http://192.168.1.11:21000/account/',
    // pdf接口地址
    pdfUrl: 'http://192.168.1.11:21350/oss/',
    // pay接口地址
    payUrl: 'http://192.168.1.11:21550/pay/',
    // 工作流接口地址
    workflowUrl: 'http://192.168.1.11:21600/workflow/',
    // 售后服务接口地址
    serviceUrl: 'http://192.168.1.11:23300/maintain/',
    // 搜索引擎接口地址
    searchUrl: 'http://192.168.1.11:21275/search/',
    // 维修物品接口地址
    categoryUrl: 'http://192.168.1.11:21275/data/',
    // 三级联动接口地址
    blockUrl: 'http://192.168.1.11:21275/block/',
    // 同步房源数据到蘑菇租房
    alipayUrl: 'http://192.168.1.11:21650/house/sync/',
    // 智能门锁
    lockUrl: 'http://192.168.1.11:21151/lock/',
    adminleftnavnum: '',
    houseleftnavnum: '',
    topIndex: '',
    menuleftnavnum: '',
    serviceleftnavnum: '',
    processKey: {
      maintain: 'PROCESS-KEY-MAINTAIN-V10'
    },
    currentUser: {
      get UserPhone () {
        return localStorage.getItem('currentUserPhone')
      },
      get UserToken () {
        return localStorage.getItem('currentUserToken')
      },
      get keeperData () {
        return localStorage.getItem('keeperData')
      },
      get houseData () {
        return localStorage.getItem('houseData')
      },
      get uid () {
        return localStorage.getItem('uid')
      },
      get username () {
        return localStorage.getItem('username')
      },
      get isGudong () {
        return localStorage.getItem('isGudong')
      },
      get roleData () {
        return localStorage.getItem('roleData')
      }
    },
    searchData: {
      get searchData () {
        return localStorage.getItem('searchData')
      },
      get searchType () {
        return localStorage.getItem('searchType')
      },
      get searchDataId () {
        return localStorage.getItem('searchDataId')
      }
    },
    processInstanceId: '', // 流程id
    taskId: '', // 任务id
    workflowToken: ''
  },
  mutations: {
    increment (state) {
      state.count++
    },
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
    setUser (state, {userName, userToken, uid}) {
      // 在这里把用户名和token保存起来
      localStorage.setItem('currentUserPhone', userName)
      localStorage.setItem('currentUserToken', userToken)
      localStorage.setItem('uid', uid)
    },
    setUserName (state, {username}) {
      // 在这里把用户名和token保存起来
      localStorage.setItem('username', username)
    },
    setGudong (state, {isGudong}) {
      // 在这里把用户名和token保存起来
      localStorage.setItem('isGudong', isGudong)
    },
    setKeeperData (state, {keeperData}) {
      localStorage.setItem('keeperData', keeperData)
      let keeper = JSON.parse(keeperData)
      for (var i = 0; i <= keeper.length - 1; i++) {
        for (var j = 0; j <= keeper[i].cities.length - 1; j++) {
          if (keeper[i].cities[j].id === this.state.currentUser.uid) {
            localStorage.setItem('role', keeper[i].label)
          }
        }
      }
    },
    setHouseData (state, {houseData}) {
      localStorage.setItem('houseData', houseData)
      let keeper = JSON.parse(houseData)
      for (var i = 0; i <= keeper.length - 1; i++) {
        for (var j = 0; j <= keeper[i].cities.length - 1; j++) {
          if (keeper[i].cities[j].id === this.state.currentUser.uid) {
            localStorage.setItem('role', keeper[i].label)
          }
        }
      }
      // let keeper = JSON.parse(keeperData)
      // for (var i = 0; i <= keeper.length - 1; i++) {
      //   for (var j = 0; j <= keeper[i].cities.length - 1; j++) {
      //     if (keeper[i].cities[j].id === this.state.currentUser.uid) {
      //       localStorage.setItem('role', keeper[i].label)
      //     }
      //   }
      // }
    },
    setSearchData (state, {searchDataId, searchData, searchType}) {
      localStorage.setItem('searchDataId', searchDataId)
      localStorage.setItem('searchData', searchData)
      localStorage.setItem('searchType', searchType)
    },
    // 保存用户角色
    setRoleData (state, {roleData}) {
      localStorage.setItem('roleData', roleData)
    }
  },
  actions: {
    // 用户名密码登录
    userLogin (context, {userName, userPass}) {
      // 发送get请求做权限认证(真实开发建议用post的方式)
      let url = this.state.accountUrl + 'user/login'
      Vue.http.post(url, {
        loginname: userName,
        password: userPass
      }).then((res) => {
        if (res.data.code === 200) {
          router.push({name: 'index'})  // 跳转到首页
          const token = res.data.data.accessToken
          const uid = res.data.data.userId
          if (token !== '') {
            // 后端API验证通过
            // 调用上面mutations里定义的方法
            context.commit('setUser', {'userName': userName, 'userToken': token, 'uid': uid})
          }
        } else if (res.data.code === 10007) {
          Vue.prototype.$message({
            message: '用户名或密码错误',
            type: 'warning'
          })
        } else if (res.data.code === 10005) {
          Vue.prototype.$message({
            message: '该用户未注册',
            type: 'warning'
          })
        }
      }, (res) => {
        console.log('请求失败进入这里')
      })
    },
    // 短信验证码登录
    userLogin2 (context, {userName, userPass}) {
      // 发送get请求做权限认证(真实开发建议用post的方式111)
      let url = this.state.accountUrl + 'user/login'
      Vue.http.post(url, {
        loginname: userName,
        captchaType: 'SMS', // 短信登录
        captcha: userPass  // 短信验证码
      }).then((res) => {
        console.log(res)
        if (res.data.code === 200) {
          router.push({name: 'index'})  // 跳转到首页
          var token = res.data.data.accessToken
          const uid = res.data.data.userId
          if (token !== '') {
            // 后端API验证通过
            // 调用上面mutations里定义的方法
            context.commit('setUser', {'userName': userName, 'userToken': token, 'uid': uid})
          }
        } else {
          Vue.prototype.$message({
            message: '用户名或验证码错误',
            type: 'warning'
          })
        }
      }, (res) => {
        console.log('请求失败进入这里')
      })
    },
    // 获取小管家数据
    getKeeperData (context, {keeperData}) {
       // 调用上面mutations里定义的方法
      context.commit('setKeeperData', {'keeperData': keeperData})
    },
    // 获取收房专员数据
    getHouseData (context, {houseData}) {
       // 调用上面mutations里定义的方法
      context.commit('setHouseData', {'houseData': houseData})
    },
    getSearchData (context, {searchDataId, searchData, searchType}) {
       // 调用上面mutations里定义的方法
      context.commit('setSearchData', {'searchDataId': searchDataId, 'searchData': searchData, 'searchType': searchType})
    },
    // 获取小管家姓名
    getLoginName (context, {username}) {
       // 调用上面mutations里定义的方法
      context.commit('setUserName', {'username': username})
    },
    // 获取小管家姓名
    getGudong (context, {isGudong}) {
       // 调用上面mutations里定义的方法
      context.commit('setGudong', {'isGudong': isGudong})
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
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  data: {
  // 空的实例放到根组件下，所有的子组件都能调用
    appoint: new Vue(), // 监听预约的盒子
    contract: new Vue(),
    reserveHouse: new Vue(),
    task: new Vue(),
    lease: new Vue(),
    payDetail: new Vue(),
    changeRentForm: new Vue(),
    huanRentForm: new Vue()
  }
})
