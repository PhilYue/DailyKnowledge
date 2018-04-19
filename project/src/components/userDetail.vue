<template>
  <div class="houseDetail" :style="{zIndex: zIndex}">
    <transition name="fade">
      <div v-if="userDetailShow" class="dialog" :style="height" style="width:600px">
        <el-row class="height-w100">
       	  <el-col class="form-cont" :span="6" style="padding:0; background: #eee; margin-top:0;">
	       	<el-menu default-active="1" class="el-menu-vertical-demo" theme="dark">
  		      <el-menu-item index="1">用户信息</el-menu-item>
  		    </el-menu>
		  </el-col>
          <el-col class="form-cont" :span="16">
            <el-col class="line" :span="24"><p class="HDTitle">{{tableData.keywordAddress}}</p></el-col>
            <!-- <p class="eitdButton">编辑</p> -->
            <div class="HDContent">
            	<ul>
            		<li class="f-cb">
	                  <el-col class="line" :span="24"><h3>基本信息</h3></el-col>
	                  <el-col class="line" :span="24">
              			<el-col class="line" :span="6">姓名: </el-col>
              			<el-col class="line" :span="14"> {{tableData.username}}</el-col>
              			<el-col class="line" :span="6">年龄: </el-col>
              			<el-col class="line" :span="14"> 23</el-col>
              			<el-col class="line" :span="6">性别: </el-col>
              			<el-col class="line" :span="14" v-if="tableData.sex === 'F'"> 男</el-col>
                    <el-col class="line" :span="14" v-else-if="tableData.sex === 'M'"> 女</el-col>
                    <el-col class="line" :span="14" v-else> 暂无信息</el-col>
              			<el-col class="line" :span="6">联系方式: </el-col>
              			<el-col class="line" :span="14"> {{tableData.phone}}</el-col>
                    <el-col class="line" :span="6">邮箱: </el-col>
                    <el-col class="line" :span="14"> {{tableData.email}}</el-col>
              			<!-- <el-col class="line" :span="6">入职日期: </el-col>
              			<el-col class="line" :span="14"> 2017-09-09</el-col>
              			<el-col class="line" :span="6">居住地: </el-col>
              			<el-col class="line" :span="14"> 北软随寓人才公寓</el-col>
              			<el-col class="line" :span="6">所属部门: </el-col>
              			<el-col class="line" :span="14"> 北软片区</el-col> -->
                    <div class="f-cb">
                      <el-col class="line" :span="6">人员类型: </el-col>
                      <el-col class="line" :span="14" v-if="tableData.userType === 'A'"> 工作人员</el-col>
                      <el-col class="line" :span="14" v-if="tableData.userType === 'P'"> 房东</el-col>
                    </div>
                    <!-- <el-col class="line" :span="14" v-if="tableData.userType === 'P'"> 租客</el-col> -->
                    <el-col class="line" :span="6">证件类型: </el-col>
                    <el-col class="line" :span="14"> {{tableData.certType1}}</el-col>
                    <el-col class="line" :span="6">证件号码: </el-col>
                    <el-col class="line" :span="14"> {{tableData.certNumber}}</el-col>
                    </el-col>
                	</li>
            	</ul>
            </div>
          </el-col>
        </el-row>
        <div @click="userDetailShow = !userDetailShow" class="">
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
    //   console.log(data)
    // })
  },
  name: 'detail',
  data: function () {
    return {
      height: 'height:' + height + 'px',
      userDetailShow: false,
      tableData: {},
      mix: {
        userList: this.$store.state.accountUrl + 'user/info/id/', // 根据ID查询人员详情
        userCert: this.$store.state.accountUrl + 'user/info/cert/' // 根据ID查询人员详情并返回身份证信息
      }
    }
  },
  created: function () {
    if (this.personId) {
      this.userDetailShow = this.userDetail
      this.$options.methods.load(this)
    }
  },
  watch: {
    perclick: function () {
      if (this.personId) {
        this.userDetailShow = this.userDetail
        console.log(this.userDetail)
        this.$options.methods.load(this)
      }
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
    },
    load (_this) {
      let url = _this.mix.userCert + _this.personId
      _this.$http.get(url).then(function (res) {
        console.log(res.body)
        if (res.body.code === 200) {
          _this.infoTransform(res.body.data)
          this.tableData = res.body.data
        }
      })
    },
    infoTransform (data) {
      switch (data.certType) {
        case 'ID':
          data.certType1 = '身份证'
          break
        case 'P':
          data.certType1 = '护照'
          break
        case 'DL':
          data.certType1 = '驾驶执照'
          break
        case 'BL':
          data.certType1 = '工商营业执照'
          break
        case 'HK':
          data.certType1 = '港澳通行证'
          break
        case 'TW':
          data.certType1 = '台湾通行证'
          break
      }
      return data
    }
  },
  props: ['userDetail', 'houseDetailText', 'zIndex', 'perclick', 'personId']
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
  padding: 15px 50px;
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
  border-bottom: 1px solid #e3e3e3;
}
.HDContent li:first-child{
  padding-top: 0;
}
.HDContent li:last-child{
  border-width: 0;
}
.el-menu--dark{
	background: #d3dce6;	/*color: #555;*/
}
/*.el-menu-item{
	color: #555;
	border-left: 3px solid #ebebeb;
}
.el-menu--dark .el-menu-item:hover, .el-menu--dark .el-submenu__title:hover{
	background: #f6f8f9;
	border-color: #20a0ff;
}
.el-menu-item.is-active{
	background: #f6f8f9;
	color: #555;
	border-color:#20a0ff;
}*/
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
.el-menu-item:hover{
  background-color: #fcfcfc;
  border-color: #fcfcfc;
}
.el-menu-item.is-active{
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
.HDContent li h3{
  border-bottom: 1px solid #e3e3e3;
  padding: 10px 0;
  margin-top: 20px;
}
.el-col-6, .el-col-14{
  margin-top: 10px;
}
</style>