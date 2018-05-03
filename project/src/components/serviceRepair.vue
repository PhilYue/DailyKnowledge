<template>
<!-- :style="{zIndex: zIndex}" -->
  <div class="houseDetail" >
    <transition name="fade">
      <div v-if="conDetailShow" class="dialog" :style="height" style="width:600px">
        <el-row class="height-w100">
       	  <el-col class="form-cont" :span="8" style="padding:0; background: #eee; margin-top:0;">
	       	<el-menu default-active="1" class="el-menu-vertical-demo" theme="dark">
  		      <el-menu-item index="1">{{houseDetailText}}</el-menu-item>
  		    </el-menu>
		  </el-col>
          <el-col class="form-cont" :span="16">
            <!-- <el-col class="line" :span="24"><p class="HDTitle">{{form.houseSpaceName}}</p></el-col> -->
            <div class="HDContent">
            	<ul>
                <li>
					          <el-col class="line" :span="24"><h3>基本信息</h3></el-col>
                    <el-col class="line" :span="9">订单编号: </el-col>
                    <el-col class="line" :span="14">{{form.formNumber}}</el-col>
                    <el-col class="line" :span="9">创建人: </el-col>
                    <el-col class="line" :span="14">{{form.originatorName}}</el-col>
                    <el-col class="line" :span="9" v-if="form.originatorPhone">创建人电话: </el-col>
                    <el-col class="line" :span="14" v-if="form.originatorPhone">{{form.originatorPhone}}</el-col>
                    <el-col class="line" :span="9">地址: </el-col>
                    <el-col class="line" :span="14">{{form.location}}</el-col>
                    <el-col class="line" :span="9">创建时间: </el-col>
                    <el-col class="line" :span="14">{{form.originatorTimeL}}</el-col>
                    <!-- <el-col class="line" :span="9">预计上门时间: </el-col>
                    <el-col class="line" :span="14">{{form.time}}</el-col> -->
                    <el-col class="line" :span="9" v-if="form.tenantName">租客姓名: </el-col>
                    <el-col class="line" :span="14" v-if="form.tenantName">{{form.tenantName}}</el-col>
                    <el-col class="line" :span="9" v-if="form.tenantPhone">租客电话: </el-col>
                    <el-col class="line" :span="14" v-if="form.tenantPhone">{{form.tenantPhone}}</el-col>
                    <span v-if="form.goodLength > 0">
                      <el-col class="line" :span="9">报修物品: </el-col>
                      <el-col class="line" :span="14" v-for="(asset, index) in form.resFixedAssetsBeans" :key="index">
                        <span v-if='index === (form.goodLength - 1)'>{{asset}}</span>
                        <span v-else>{{asset}}、</span>
                      </el-col>
                    </span>
                    <el-col class="line" :span="9">服务说明: </el-col>
                    <el-col class="line" :span="14">{{form.memo}}</el-col>
                    <el-col class="line" :span="9">责任归属: </el-col>
                    <el-col class="line" :span="14">{{form.accountability}}</el-col>
                </li>
                <li>
                	<div v-if="form.receiverName">
						          <el-col class="line" :span="24"><h3>本次服务信息</h3></el-col>
	                    <el-col class="line" :span="9">服务人员姓名: </el-col>
	                    <el-col class="line" :span="14">{{form.receiverName}}</el-col>
	                    <el-col class="line" :span="9">服务人员电话: </el-col>
	                    <el-col class="line" :span="14">{{form.receiverPhone}}</el-col>
                      <el-col class="line" :span="9">接单时间: </el-col>
                      <el-col class="line" :span="14">{{form.serverAcceptTimeL1}}</el-col>
                      <!-- <el-col class="line" :span="9">上门时间: </el-col>
                      <el-col class="line" :span="14">{{form.processTimeL1}}</el-col> -->
                      <el-col class="line" :span="9">反馈时间: </el-col>
                      <el-col class="line" :span="14">{{form.processTimeL1}}</el-col>
                      <el-col class="line" :span="9">回访时间: </el-col>
                      <el-col class="line" :span="14">{{form.visitTimeL1}}</el-col>
	                    <el-col class="line" :span="9">服务结果: </el-col>
	                    <el-col class="line" :span="14">{{form.processResult}}</el-col>
	                    <el-col class="line" :span="9" v-if="form.processResultMemo">服务反馈: </el-col>
	                    <el-col class="line" :span="14" v-if="form.processResultMemo">{{form.processResultMemo}}</el-col>
	                    <el-col class="line" :span="9" v-if="form.visitMemo">回访说明: </el-col>
	                    <el-col class="line" :span="14" v-if="form.visitMemo">{{form.visitMemo}}</el-col>
	                </div>
                </li>
                <li>
                  <el-col class="line" :span="24" v-if="form.length > 1"><h3>历史服务信息</h3></el-col>
                	<div v-for="(item, index) in form.maintenanceServerListBeans" v-if=" index < form.length - 1">
                  		<el-col class="line" :span="24"><div style=" margin: 10px 0 0; font-size:14px; font-weight:bold;">第{{index + 1}}服务</div></el-col>
	                    <el-col class="line" :span="9">服务人员姓名: </el-col>
	                    <el-col class="line" :span="14">{{item.receiverName}}</el-col>
	                    <el-col class="line" :span="9">服务人员电话: </el-col>
	                    <el-col class="line" :span="14">{{item.receiverPhone}}</el-col>
                      <el-col class="line" :span="9">接单时间: </el-col>
                      <el-col class="line" :span="14">{{item.serverAcceptTimeL1}}</el-col>
                      <el-col class="line" :span="9">上门时间: </el-col>
                      <el-col class="line" :span="14">{{item.processTimeL1}}</el-col>
                      <el-col class="line" :span="9">回访时间: </el-col>
                      <el-col class="line" :span="14">{{item.visitTimeL1}}</el-col>
	                    <el-col class="line" :span="9">服务结果: </el-col>
	                    <el-col class="line" :span="14">{{item.processResult}}</el-col>
	                    <el-col class="line" :span="9" v-if="item.visitMemo">服务反馈: </el-col>
	                    <el-col class="line" :span="14" v-if="item.visitMemo">{{item.visitMemo}}</el-col>
	                    <el-col class="line" :span="9" v-if="item.visitMemo">回访说明: </el-col>
	                    <el-col class="line" :span="14" v-if="item.visitMemo">{{item.visitMemo}}</el-col>
                  	</div>
                </li>
            	</ul>
            </div>
          </el-col>
        </el-row>
        <div @click="close" class="">
        	<!-- <p class="houseEdit">编辑</p> -->
        	<span class="el-icon-close closeIco"></span>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import $ from 'jquery'
import houseProcess from './houseProcess'  //  房源列表
const height = window.screen.height - 61
export default {
  name: 'detail',
  data: function () {
    return {
      height: 'height:' + height + 'px',
      conDetailShow: false,
      form: {},
      api: {
        detailApi: this.$store.state.serviceUrl + 'queryMaintenanceFormDetailByFormId/' // 查询服务详情
      }
    }
  },
  props: ['houseDetailText', 'conDetail', 'clickCount', 'serviceId', 'conType'],
  mounted () {
    $('.el-dialog--small,.el-dialog--tiny').width(650)
  },
  components: {
    houseProcess
  },
  watch: {
    clickCount: function () {
      if (this.serviceId) {
        this.conDetailShow = this.conDetail
        this.$options.methods.load(this)
      }
    }
  },
  methods: {
    close () {
      this.$emit('closeDetail')
    },
    listTransform (data) {
      var startTime = new Date(data.preAccessTimeL)
      data.preAccessTimeL = startTime.getFullYear() + '-' + (startTime.getMonth() + 1) + '-' + startTime.getDate()
      var createTime = new Date(data.createTimeL)
      data.createTime = createTime.getFullYear() + '-' + (createTime.getMonth() + 1) + '-' + createTime.getDate() + ' ' + createTime.getHours() + ':' + createTime.getMinutes() + ':' + createTime.getSeconds()
      // 创建时间
      var originatorTimeL = new Date(data.originatorTimeL)
      data.originatorTimeL = originatorTimeL.getFullYear() + '-' + (originatorTimeL.getMonth() + 1) + '-' + originatorTimeL.getDate() + ' ' + originatorTimeL.getHours() + ':' + originatorTimeL.getMinutes() + ':' + originatorTimeL.getSeconds()

      // 期待上门时间
      let start = new Date(data.preStartingTime)
      let end = new Date(data.preFinalTime)
      data.time = start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate() + ' ' + start.getHours() + ':00-' + end.getHours() + ':00'

      // 报修物品
      if (data.resFixedAssetsBeans === '' || data.resFixedAssetsBeans === null) {
        console.log('CLEAN')
      } else {
        data.goodLength = data.resFixedAssetsBeans.length
      }
      switch (data.status) {
        case 'REQACCEPT':
          data.status = '待领取'
          break
        case 'ACCEPTED':
          data.status = '已领取'
          break
        case 'PROCESSING':
          data.status = '正在处理'
          break
        case 'REQFOLLOW':
          data.status = '待跟进'
          break
        case 'ALSERVER':
          data.status = '待回访'
          break
        case 'ALVISIT':
          data.status = '已回访'
          break
        case 'SUCCESS':
          data.status = '已完成'
          break
        case 'ALCANCER':
          data.status = '已取消'
          break
      }
      switch (data.accountability) {
        case 'UNDEFINITION':
          data.accountability = '暂无归属'
          break
        case 'COMPANY':
          data.accountability = '公司责任'
          break
        case 'INDIVIDUAL':
          data.accountability = '个人责任'
          break
      }
      return data
    },
    stateTransform (data) {
      for (let i = 0; i < data.maintenanceServerListBeans.length; i++) {
        let res = ''
        // console.log(data.maintenanceServerListBeans[i].processResult)
        switch (data.maintenanceServerListBeans[i].processResult) {
          case 'SUCCESS':
            res = '售后成功'
            break
          case 'FAILURE':
            res = '售后失败'
            break
          case 'SERSUCCE':
            res = '服务成功'
            break
        }
        data.maintenanceServerListBeans[i].processResult = res
        switch (data.maintenanceServerListBeans[i].visitResult) {
          case 'SUCCESS':
            res = '服务成功'
            break
          case 'FAILURE':
            res = '服务失败'
            break
          case 'SERSUCCE':
            res = '服务成功'
            break
        }
        data.maintenanceServerListBeans[i].visitResult = res
        // 本次接单时间
        if (data.maintenanceServerListBeans[i].serverAcceptTimeL > 0) {
          let serverAcceptTimeL = new Date(data.maintenanceServerListBeans[i].serverAcceptTimeL)
          data.maintenanceServerListBeans[i].serverAcceptTimeL1 = serverAcceptTimeL.getFullYear() + '-' + (serverAcceptTimeL.getMonth() + 1) + '-' + serverAcceptTimeL.getDate() + ' ' + serverAcceptTimeL.getHours() + ':' + serverAcceptTimeL.getMinutes() + ':' + serverAcceptTimeL.getSeconds()
        } else {
          data.maintenanceServerListBeans[i].serverAcceptTimeL1 = '暂无信息'
        }
        // 上门时间
        if (data.maintenanceServerListBeans[i].homeMaintainTimeL > 0) {
          let homeMaintainTimeL = new Date(data.maintenanceServerListBeans[i].homeMaintainTimeL)
          data.maintenanceServerListBeans[i].homeMaintainTimeL1 = homeMaintainTimeL.getFullYear() + '-' + (homeMaintainTimeL.getMonth() + 1) + '-' + homeMaintainTimeL.getDate() + ' ' + homeMaintainTimeL.getHours() + ':' + homeMaintainTimeL.getMinutes() + ':' + homeMaintainTimeL.getSeconds()
        } else {
          data.maintenanceServerListBeans[i].homeMaintainTimeL1 = '暂无信息'
        }
        // 完成时间
        if (data.maintenanceServerListBeans[i].processTimeL > 0) {
          let processTimeL = new Date(data.maintenanceServerListBeans[i].processTimeL)
          data.maintenanceServerListBeans[i].processTimeL1 = processTimeL.getFullYear() + '-' + (processTimeL.getMonth() + 1) + '-' + processTimeL.getDate() + ' ' + processTimeL.getHours() + ':' + processTimeL.getMinutes() + ':' + processTimeL.getSeconds()
        } else {
          data.maintenanceServerListBeans[i].processTimeL1 = '暂无信息'
        }
        // 回访操作时间
        if (data.maintenanceServerListBeans[i].visitTimeL > 0) {
          let visitTimeL = new Date(data.maintenanceServerListBeans[i].visitTimeL)
          data.maintenanceServerListBeans[i].visitTimeL1 = visitTimeL.getFullYear() + '-' + (visitTimeL.getMonth() + 1) + '-' + visitTimeL.getDate() + ' ' + visitTimeL.getHours() + ':' + visitTimeL.getMinutes() + ':' + visitTimeL.getSeconds()
        } else {
          data.maintenanceServerListBeans[i].visitTimeL1 = '暂无信息'
        }
      }
      data.length = data.maintenanceServerListBeans.length
      data.processResult = data.maintenanceServerListBeans[data.length - 1].processResult
      data.processResultMemo = data.maintenanceServerListBeans[data.length - 1].processResultMemo
      data.returnVisitResult = data.maintenanceServerListBeans[data.length - 1].returnVisitResult
      // 本次接单时间
      if (data.maintenanceServerListBeans[data.length - 1].serverAcceptTimeL > 0) {
        let serverAcceptTimeL = new Date(data.maintenanceServerListBeans[data.length - 1].serverAcceptTimeL)
        data.serverAcceptTimeL1 = serverAcceptTimeL.getFullYear() + '-' + (serverAcceptTimeL.getMonth() + 1) + '-' + serverAcceptTimeL.getDate() + ' ' + serverAcceptTimeL.getHours() + ':' + serverAcceptTimeL.getMinutes() + ':' + serverAcceptTimeL.getSeconds()
      } else {
        data.serverAcceptTimeL1 = '暂无信息'
      }
      // 上门时间
      if (data.maintenanceServerListBeans[data.length - 1].homeMaintainTimeL > 0) {
        let homeMaintainTimeL = new Date(data.maintenanceServerListBeans[data.length - 1].homeMaintainTimeL)
        data.homeMaintainTimeL1 = homeMaintainTimeL.getFullYear() + '-' + (homeMaintainTimeL.getMonth() + 1) + '-' + homeMaintainTimeL.getDate() + ' ' + homeMaintainTimeL.getHours() + ':' + homeMaintainTimeL.getMinutes() + ':' + homeMaintainTimeL.getSeconds()
      } else {
        data.homeMaintainTimeL1 = '暂无信息'
      }
      // 完成时间
      if (data.maintenanceServerListBeans[data.length - 1].processTimeL > 0) {
        let processTimeL = new Date(data.maintenanceServerListBeans[data.length - 1].processTimeL)
        data.processTimeL1 = processTimeL.getFullYear() + '-' + (processTimeL.getMonth() + 1) + '-' + processTimeL.getDate() + ' ' + processTimeL.getHours() + ':' + processTimeL.getMinutes() + ':' + processTimeL.getSeconds()
      } else {
        data.processTimeL1 = '暂无信息'
      }
      // 回访操作时间
      if (data.maintenanceServerListBeans[data.length - 1].visitTimeL > 0) {
        let visitTimeL = new Date(data.maintenanceServerListBeans[data.length - 1].visitTimeL)
        data.visitTimeL1 = visitTimeL.getFullYear() + '-' + (visitTimeL.getMonth() + 1) + '-' + visitTimeL.getDate() + ' ' + visitTimeL.getHours() + ':' + visitTimeL.getMinutes() + ':' + visitTimeL.getSeconds()
      } else {
        data.visitTimeL1 = '暂无信息'
      }
      // console.log(data)
      return data
    },
    load (_this) {
      let url = _this.api.detailApi + _this.serviceId
      _this.$http.get(url).then(function (res) {
        if (res.body.code === 200) {
          this.form = this.$options.methods.listTransform(res.body.data)
          this.form = this.$options.methods.stateTransform(this.form)
        }
      })
    }
  }
}
</script>
<style scoped>
/*右侧弹窗*/
.dialog{
  width: 50%;
  position:fixed;
  top: 62px;
  background-color: #fff;
  right: 0;
  /*border-right:3px solid #ccc;*/
  z-index: 1999;
}
.fade-enter-active, .fade-leave-active {
  transition: right .5s
}
.fade-enter, .fade-leave-to {
  right: -50%;
}
.fade-enter-to, .fade-leave {
  right: 0;
}
.el-menu-vertical-demo{
  height: 100%;
}
.height-w100{
  height: 100%;
  overflow-y: auto;
}
.form-cont{
  height: 100%;
  padding: 15px 30px;
  overflow-y: auto;
  /*border-left: 1px solid #eef1f6;*/
}
.closeIco{
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
}
.houseEdit{
	color: #13CE66;
	position: absolute;
	right: 40px;
	cursor: pointer;
	top: 15px;
	font-size: 16px;
	line-height: 16px;
}
.HDTitle{
	width: 350px;
	height: 26px;
	line-height: 16px;
	font-size: 16px;
	margin-bottom: 20px;
  word-wrap:break-word ;
}
.textRight{
	text-align: right;
}
.HDContent li{
	line-height: 24px;
	font-size: 13px;
  padding: 20px 0;
  /*border-bottom: 1px solid #e3e3e3;*/
}
.HDContent li:first-child{
  padding-top: 0;
}
.HDContent li:last-child{
  border-width: 0;
}
.houseDetail .el-menu--dark{
	background: #d3dce6;
	/*color: #555;*/
}
.el-menu-item{
	/*color: #555;*/
	/*border-left: 3px solid #ebebeb;*/
}
.el-menu--dark .el-menu-item:hover, .el-menu--dark .el-submenu__title:hover{
	/*background: #f6f8f9;*/
	/*border-color: #20a0ff;*/
}
.el-menu-item.is-active{
	/*background: #f6f8f9;*/
	/*color: #555;*/
	/*border-color:#20a0ff;*/
}
.el-menu-item:first-child{
	margin-top: 28px;
}
.houseDetail .el-menu-item{
  /*display: none;*/
  color: #333;
  background-color: #d3dce6;
  border-left: 3px solid #d3dce6;
  transition: all .5s;
}
.houseDetail .el-menu-item:hover{
  background-color: #fcfcfc;
  border-color: #fcfcfc;
}
.houseDetail .el-menu-item.is-active{
  background-color: #fcfcfc;
  border-color: #20a0ff;
}
.houseDetail .eitdButton{
  position: absolute;
  right: 40px;
  top: 9px;
  font-size: 19px;
  color: #20a0ff;
  cursor: pointer;
}
.el-col-9{
  /*margin-right: 5px;*/
  /*margin-bottom: 5px;*/
}
.el-col-14{
  margin-bottom: 5px;
}
.HDContent li h3{
  border-bottom: 1px solid #e3e3e3;
  padding: 10px 0;
  margin-top: 20px;
  margin-bottom: 10px;
}
.el-col-6, .el-col-14, .el-col-9{
  margin-top: 10px;
}
.form-cont{
  height: calc(100vh - 60px);
  padding: 55px 50px;
  overflow-y: auto;
  overflow-x: hidden;
  border-left: 1px solid #eef1f6;
}
</style>