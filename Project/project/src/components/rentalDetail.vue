<template>
  <div class="houseDetail" :style="{zIndex: zIndex}">
    <transition name="fade">
      <div v-if="rentalDetailShow" class="dialog" :style="height" style="width:600px">
        <el-row class="height-w100">
       	  <el-col class="form-cont" :span="6" style="padding:0; background: #eee;">
  	       	<el-menu default-active="1" class="el-menu-vertical-demo" theme="dark">
    		      <el-menu-item index="1">财务信息</el-menu-item>
    		    </el-menu>
		      </el-col>
          <el-col class="form-cont" :span="16">
            <el-col class="line" :span="24">
              <p class="HDTitle">{{tableData.keywordAddress}}</p>
            </el-col>
            <p class="eitdButton">编辑</p>
            <div class="HDContent">
            	<ul>
            		<li class="f-cb">
	                  <el-col class="line" :span="24"><h2>基本信息</h2></el-col>
	                  <el-col class="line" :span="5"></el-col>
	                  <el-col class="line" :span="18">
                			<el-col class="line textRight" :span="9">姓名: </el-col>
                			<el-col class="line" :span="14"> 阮翔</el-col>
                			<el-col class="line textRight" :span="9">编号: </el-col>
                			<el-col class="line" :span="14"> 123456</el-col>
                			<el-col class="line textRight" :span="9">联系方式: </el-col>
                			<el-col class="line" :span="14"> 15757118054</el-col>
                			<el-col class="line textRight" :span="9">金额: </el-col>
                			<el-col class="line" :span="14"> 1500</el-col>
                			<el-col class="line textRight" :span="9">类型: </el-col>
                			<el-col class="line" :span="14"> 收入</el-col>
                			<el-col class="line textRight" :span="9">说明: </el-col>
                			<el-col class="line" :span="14"> 房租</el-col>
                			<el-col class="line textRight" :span="9">是否付款: </el-col>
                			<el-col class="line" :span="14"> 已付</el-col>
                			<el-col class="line textRight" :span="9">付款时间: </el-col>
                			<el-col class="line" :span="14"> 2019/09/09</el-col>
                  	</el-col>
                	</li>
            	</ul>
            </div>
          </el-col>
        </el-row>
        <div @click="rentalDetailShow = !rentalDetailShow" class="">
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
  beforeCreate: function () {
    // var mix = this.$store.state.houseUrl + 'get/' + this.tableData.id // 房源列表
    // this.$http.get(mix).then(({data}) => {
    //   
    // })
  },
  created: function () {
    
  },
  name: 'detail',
  data: function () {
    return {
      height: 'height:' + height + 'px'
    }
  },
  mounted () {
    $('.el-dialog--small,.el-dialog--tiny').width(650)
  },
  components: {
    houseProcess
  },
  methods: {
    showHousekeeperDetail (data) {
      this.$emit('showHousekeeperDetail', data)
    },
    showRentalDetail (data) {
      this.$emit('showRentalDetail', data)
    }
  },
  props: ['tableData', 'userDetailShow', 'houseDetailText', 'zIndex', 'rentalDetailShow']
}
</script>
<style scoped>
/*右侧弹窗*/
.dialog{
  width: 50%;
  position:fixed;
  top: 61px;
  background-color: #fff;
  right: 0;
  border-right:3px solid #ccc;
  z-index: 999;
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
  padding: 15px;
  overflow-y: auto;
  border-left: 1px solid #eef1f6;
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
	font-size: 14px;
  padding: 20px 0;
  border-bottom: 1px solid #e3e3e3;
}
.HDContent li:first-child{
  padding-top: 0;
}
.HDContent li:last-child{
  border-width: 0;
}
.el-menu--dark{
	background: #ebebeb;
	color: #555;
}
.el-menu-item{
	color: #555;
	border-left: 3px solid #ebebeb;
}
.el-menu--dark .el-menu-item:hover, .el-menu--dark .el-submenu__title:hover{
	background: #f6f8f9;
	border-color: #20a0ff;
}
.houseDetail .el-menu-item.is-active{
	background: #f6f8f9;
	color: #555;
	border-color:#20a0ff;
}
.el-menu-item:first-child{
	margin-top: 20px;
}
.houseDetail .el-menu-item{
  /*display: none;*/
}
.houseDetail .eitdButton{
  position: absolute;
  right: 40px;
  top: 9px;
  font-size: 19px;
  color: #20a0ff;
  cursor: pointer;
}
</style>