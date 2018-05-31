<template>
  <div class="wrapper">
    <div class="search-cont">
      <input class="houseList-input" type="text" @input="getsearch" placeholder="请输入房间号或小区名"/>
      <text class="search-btn" @click="search">搜索</text>
    </div>
    <div class="houseList-select">
      <text class="houseList-select-text" @click="getType">{{type}}</text>
      <text class="houseList-select-text" @click="getArea">{{area}}</text>
      <text class="houseList-select-text" @click="getMoney">{{money}}</text>
      <text class="houseList-select-text" @click="getStatus">{{status}}</text>
    </div>
    <!-- 滚动列表 -->
    <scroller class="scroller" @scroll="scroll" loadmoreoffset="100" @loadmore="onloading" :show-scrollbar="false" :style="styleObject">
      <div class="cell" :key="index" v-for="(item, index) in houseData">
        <div class="houseList-div" @click="goDetail(item)">
          <image class="img" :src="item.resHouseSpaceFileBeanList ? item.resHouseSpaceFileBeanList[0].fileUrl + '?x-oss-process=image/resize,w_170,h_130,limit_0' : 'https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/small.png'" resize="stretch"></image>
          <div class="houseList-div-fr">
            <text v-if="item.keywordAddress" class="houseList-div-fr-title">{{item.keywordAddress}}</text>
            <text v-if="item.houseSpaceArea" class="houseList-div-fr-des">{{item.houseSpaceArea / 1000}}㎡ | {{item.direction | capitalize}}</text>
            <div v-if="item.houseSpaceStatus" class="houseList-div-fr-span"><text :class="item.houseSpaceStatus === 'RENTABLE' ? 'houseList-div-fr-labelOn':'houseList-div-fr-label'">{{item.houseSpaceStatus | statusFilters}}</text></div>
            <text v-if="item.expectedRentalPrice" class="houseList-div-fr-money">{{item.expectedRentalPrice / 1000}}元/月</text>
          </div>
        </div>
      </div>
    </scroller>
    <!-- 底部导航 -->
    <nav v-if="this.$store.state.currentUser.roleData.indexOf('营销部经理') !== -1" :data="navClass"></nav>
  </div>
</template>
<script>
import nav from '../../components/nav';
import dingtalk from 'dingtalk-javascript-sdk';
export default {
  name: 'houseList',
  data: function(){
    return {
      // 底部导航数据
      navClass: {
        houseImg: 'https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/houseOn.png',
        houseText: 'nav-div-textOn',
        myImg: 'https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/my.png',
        myText: 'nav-div-text',
      },
      //头部筛选数据
      type: '类型',
      area: '片区',
      money: '租金',
      status: '状态',
      // 滚动列表数据
      loadinging: false,
      lists: [1, 2, 3, 4, 5],
      styleObject: '',
      // 房源搜索接口数据
      bean: {},
      pageSize: 10,
      pageNumber: 1,
      // 房源列表数据
      houseData: [],
      // 片区筛选数据
      areaData: [],
      sessionBean: {}
    }
  },
  computed: {
  },
  mounted: function(){
    // let sessionBean = sessionStorage.getItem('sessionBean')
    this.bean = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      loginId: this.$store.state.currentUser.uid,
      esType: 'HOUSE_SPACE'
    }
    this.loadData(this.bean)
    dingtalk.ready(function(){
      const dd = dingtalk.apis;
      // 设置导航
      dd.biz.navigation.setTitle({
        title: '房源列表'
      });
    });
    this.styleObject = {
      height: window.innerHeight*2 - 202
    }
  },
  methods: {
    // 整租合租筛选
    getType: function (e) {
      let that = this
      dingtalk.ready(function(){
        const dd = dingtalk.apis;
        dd.biz.util.chosen({
          source:[{
              key: '全部', //显示文本
              value: null //值，
          },{
              key: '整租', //显示文本
              value: 'ENTIRE_RENT' //值，
          },{
              key: '合租',
              value: 'JOINT_RENT'
          },{
              key: '集中式',
              value: 'C'
          }],
         selectedKey:'全部' , // 默认选中的key
         onSuccess : function(result) {
            that.type = result.key
            if (result.key === '整租') {
              that.bean.originalRentType = result.value
              that.bean.propertyType = null
            } else if (result.key === '合租') {
              that.bean.originalRentType = result.value
              that.bean.propertyType = null
            } else if (result.key === '集中式') {
              that.bean.propertyType = result.value
              that.bean.originalRentType = null
            } else if (result.key === '全部') {
              that.bean.propertyType = null
              that.bean.originalRentType = null
            }
            that.houseData = []
            if (that.bean.scroll) {
              that.bean.pageNumber = 0
            } else {
              that.bean.pageNumber = 1
            }
            that.bean.pageSize = 10
            that.loadData(that.bean)
          },
         onFail : function(err) {}
        })
      });
    },
    // 拿到最底层
    getUnit: function (e) {
      this.$http.get(this.$store.state.accountUrl + 'unit/list/area/' + this.$store.state.currentUser.uid
      ).then(function (response) {
        var data = response.data
        if (data.code === 200) {
          for (var i = 0; i <= data.data.length - 1; i ++) {
            this.areaData.push(
              {
                key: data.data[i].text,
                value: data.data[i].id
              }
            )
          }
          let that = this
          dingtalk.ready(function(){
            const dd = dingtalk.apis;
            dd.biz.util.chosen({
              source: that.areaData,
             selectedKey:'' , // 默认选中的key
             onSuccess : function(result) {
                that.area = result.key
                that.bean.zoneId = result.value
                that.houseData = []
                if (that.bean.scroll) {
                  that.bean.pageNumber = 0
                } else {
                  that.bean.pageNumber = 1
                }
                that.bean.pageSize = 10
                that.loadData(that.bean)
              },
             onFail : function(err) {}
            })
          });
        } else {
        }
      }, function (response) {
        console.log(response.status)
      })
    },
    // 筛选片区筛选
    getArea: function (e) {
      this.getUnit()
    },
    // 筛选房源状态
    getStatus: function (e) {
      let that = this
      dingtalk.ready(function(){
        const dd = dingtalk.apis;
        dd.biz.util.chosen({
          source:[{
              key: '全部', //显示文本
              value: null //值，
          },{
              key: '已出租', //显示文本
              value: 'RENTED' //值，
          },{
              key: '空置',
              value: 'RENTABLE'
          },{
              key: '签订合同中',
              value: 'SIGNING_LC'
          },{
              key: '已预订',
              value: 'RESERVED'
          },{
              key: '已冻结',
              value: 'FREEZING'
          },{
              key: '合同未生效',
              value: 'LC_NOT_TE'
          }],
         selectedKey:'全部' , // 默认选中的key
         onSuccess : function(result) {
            that.status = result.key
            if (result.key === '全部') {
              delete that.bean.houseSpaceStatus
            } else {
              that.bean.houseSpaceStatus = result.value
            }
            that.houseData = []
            if (that.bean.scroll) {
              that.bean.pageNumber = 0
            } else {
              that.bean.pageNumber = 1
            }
            that.bean.pageSize = 10
            that.loadData(that.bean)
          },
         onFail : function(err) {}
        })
      });
    },
    // 筛选金额范围
    getMoney: function (e) {
      let that = this
      dingtalk.ready(function(){
        const dd = dingtalk.apis;
        dd.biz.util.chosen({
          source:[{
              key: '不限', //显示文本
              value: null //值，
          },{
              key: '0至1500', //显示文本
              value: 'RENTED' //值，
          },{
              key: '1500至1800',
              value: 'RENTABLE'
          },{
              key: '1800至2300',
              value: 'SIGNING_LC'
          },{
              key: '2300至2600',
              value: 'RESERVED'
          },{
              key: '2600至2900',
              value: 'FREEZING'
          },{
              key: '2900以上',
              value: 'LC_NOT_TE'
          }],
         selectedKey:'不限' , // 默认选中的key
         onSuccess : function(result) {
            if (result.key === '不限') {
              that.bean.minExpectedRentalPrice = 0
              that.bean.maxExpectedRentalPrice = null
            } else if (result.key === '2900以上') {
              that.bean.minExpectedRentalPrice = 2900000
              that.bean.maxExpectedRentalPrice = null
            } else {
              that.bean.minExpectedRentalPrice = Number(result.key.split('至')[0]) * 1000
              that.bean.maxExpectedRentalPrice = Number(result.key.split('至')[1]) * 1000
            }
            that.money = result.key
            that.houseData = []
            if (that.bean.scroll) {
              that.bean.pageNumber = 0
            } else {
              that.bean.pageNumber = 1
            }
            that.bean.pageSize = 10
            that.loadData(that.bean)
          },
         onFail : function(err) {}
        })
      });
    },
    // 加载房源列表数据
    onloading (event) {
      this.bean.pageNumber ++
      this.loadData(this.bean)
    },
    scroll (e) {
      this.bean.scroll = true
    },
    // 搜索房源
    search (e) {
      alert(1)
      dingtalk.config({})
      alert(2)
      this.bean.pageNumber = 1
      this.bean.pageSize = 10
      this.houseData = []
      this.loadData(this.bean)
    },
    getsearch: function (e) {
      this.bean.keyword = e.value
    },
    // 加载房源列表数据
    loadData: function (bean) {
      // sessionStorage.setItem('sessionBean', JSON.stringify(bean))
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
      } else {
        dingtalk.ready(function(){
          const dd = dingtalk.apis;
          dd.device.notification.showPreloader({
            text: "使劲加载中..", //loading显示的字符，空表示不显示文字
            showIcon: true, //是否显示icon，默认true
            onSuccess : function(result) {
                /*{}*/
            },
            onFail : function(err) {}
          })
        });
      }
      // 获取房源列表
      this.$http.post(this.$store.state.searchUrl + 'query/jurisdiction',
        bean
      ).then(function (response) {
        var data = response.data
        if (data.data.list) {
          this.houseData = this.houseData.concat(data.data.list)
          // 隐藏加载图标
          dingtalk.ready(function(){
            const dd = dingtalk.apis;
            dd.device.notification.hidePreloader({
              onSuccess : function(result) {
              },
              onFail : function(err) {}
            })
          });
        } else {
          dingtalk.ready(function(){
            const dd = dingtalk.apis;
            dd.device.notification.hidePreloader({
              onSuccess : function(result) {
              },
              onFail : function(err) {}
            })
            dd.device.notification.alert({
              message: "无更多数据",
              title: "提示",//可传空
              buttonName: "确定"
            });
          });
        }
      }, function (response) {
        console.log(response.status)
      })
    },
    // 跳转到房源详情
    goDetail (item) {
      // 拿托管周期
      this.$http.get(this.$store.state.contractUrl + 'byHouseSpaceManagerId/' + item.houseSpaceManagerId,
      ).then(function (response) {
        var data = response.data
        if (data.code === 200) {
          item.startTime = data.data.startTime
          item.endTime = data.data.endTime
          this.$store.dispatch('getHouseData', {'houseData': JSON.stringify(item)})
          this.$router.push({ name: 'houseDetail'})
        } else {
          this.$store.dispatch('getHouseData', {'houseData': JSON.stringify(item)})
          this.$router.push({ name: 'houseDetail'})
        }
      }, function (response) {
        console.log(response.status)
      })
    }
  },
  components: {
    nav
  },
  // 过滤器
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
    },
    // 状态过滤
    statusFilters: function (value) {
      let that = this
      if (value === 'WAIT_DELEGATE') {
        return '待托管'
      } else if (value === 'ASSESSING') {
        return '评估中'
      } else if (value === 'APPROVED') {
        return '审核通过'
      } else if (value === 'SIGNING_DC') {
        return '签订托管合同中'
      } else if (value === 'DC_NOT_TE') {
        return '托管合同未生效'
      } else if (value === 'DC_TE') {
        return '托管合同已生效'
      } else if (value === 'DESIGNING') {
        return '设计中'
      } else if (value === 'CONSTRUCTING') {
        return '施工中'
      } else if (value === 'CHECKING') {
        return '验收中'
      } else if (value === 'RETAIN') {
        return '保留'
      } else if (value === 'RENTABLE') {
        return '空置'
      } else if (value === 'RESERVED') {
        return '已预订'
      } else if (value === 'SIGNING_LC') {
        return '签订合同中'
      } else if (value === 'LC_NOT_TE') {
        return '租赁合同已签未生效'
      } else if (value === 'RENTED') {
        return '已出租'
      } else if (value === 'FREEZING') {
        return '已冻结'
      } else if (value === 'DELETED') {
        return '已删除'
      } else if (value === 'TRANSFORM') {
        return '已转换(分拆合并)'
      }
    }
  }
}
</script>
<style scoped>
.search-cont{
  width: 690px;
  flex-direction: row;
  justify-content: space-between;
}
.search-btn{
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  width: 150px;
  height: 72px;
  background-color: #ccc;
  color: 333;
  font-size: 24px;
  margin-top: 30px;
}
.houseList-div-fr{
  margin-left: 30px;
  width: 71%;
}
.wrapper {
  display: flex;
  flex-direction: column;
  width: 750px;
  align-items: center;
  background-color: #fff;
  overflow: hidden;
}
.houseList-input{
  width: 500px;
  height: 36px;
  line-height: 36px;
  padding: 36px 0;
  background-color: #f0f0f0;
  font-size: 28px;
  text-align: center;
  border-radius: 5px;
  margin: 30px 0;
  placeholder-color: #999;
}
.houseList-select{
  width: 750px;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #e0e0e0;
}
.img{
  width: 170px;
  height: 130px;
}
.houseList-select-text{
  width: 187.5px;
  align-items: center;
  padding: 24px 0;
  font-size: 28px;
  color: #333;
}
.scroller{
  width: 100%;
}
.houseList-div{
  width: 92%;
  padding: 30px 0;
  border-bottom: 1px solid #e0e0e0;
  flex-direction: row;
  margin: 0 auto;
}
.loading {
  width: 750;
  display: -ms-flex;
  display: -webkit-flex;
  display: flex;
  -ms-flex-align: center;
  -webkit-align-items: center;
  -webkit-box-align: center;
  align-items: center;
}
.indicator-text {
  color: #888888;
  font-size: 42px;
  text-align: center;
}
.indicator {
  margin-top: 16px;
  height: 40px;
  width: 40px;
  color: blue;
}
.houseList-div-fr-title{
  font-size: 28px;
  color: #333;
}
.houseList-div-fr-des{
  font-size: 22px;
  color: #999;
  margin: 10px;
}
.houseList-div-fr-money{
  position: absolute;
  right: 0;
  bottom: 0;
  color: #FBB13F;
  font-size: 36px;
}
.houseList-div-fr-label{
  padding: 2px 5px;
  color: #999;
  font-size: 20px;
  border:1px solid #999;
}
.houseList-div-fr-labelOn{
  padding: 2px 5px;
  color: #E52D2D;
  font-size: 20px;
  border:1px solid #E52D2D;
}
.houseList-div-fr-span{
  flex-direction: row;
}
</style>
