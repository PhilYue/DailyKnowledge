<template>
	<!-- 合租房源列表卡片 -->
  <div>
    <ul class="f-cb">
    	<li v-for="roomlist in houseRoomLists.resHouseSpaceBeanList" class="houseRoomList" :class="{ green:roomlist.houseSpaceStatus1 == '已出租' || roomlist.houseSpaceStatus1 == '已预定' }">
    		<div class="HRLCon" @click="openDetail1($event, roomlist)">
				<!-- 房源地址 -->
				<p title="地址" class="newFont">{{roomlist.houseSpaceName}}</p>
    			<!-- 业务ID -->
				<!-- <p title="编号">{{houseRoomList.businessId}}</p> -->
	    		<p class="houseRoomPrice">
	    			<span>{{roomlist.rentalPrice1}}</span>
	    			{{roomlist.decorateType1}}
	    		</p>
	    		<p>
	    			<span v-if="roomlist.houseSpaceArea !== '' || roomlist.houseSpaceArea !== null">{{roomlist.houseSpaceArea / 1000}}㎡</span>
	    			<span v-if="roomlist.houseSpaceArea === '' || roomlist.houseSpaceArea === null || roomlist.direction === '' || roomlist.direction === null">·</span>{{roomlist.direction1}}</p>
	    		<!-- <p>{{houseRoomList.houseSpaceStatus1}} -->
	    			<!-- <span v-if="houseRoomList.idleDuration" class="emptyHouse">(空置{{houseRoomList.idleDuration}}天)</span> -->
	    		<!-- </p> -->
	    		<div class="houseStatus" :class="{houseStatusGreen : roomlist.houseSpaceStatus1 !== '空置'}">
	    			<p :class="{rentalStatus : roomlist.houseSpaceStatus1 === '空置'}">{{roomlist.houseSpaceStatus1}}</p>
	    			<div class="houseMoveMenu">
			    		<div class="Detial houseMoveList" @click="openDetail(roomlist)"><el-tooltip class="item" effect="light" content="查看详情" placement="top"><span></span></el-tooltip></div>
		    			<!-- <el-tooltip class="item" effect="light" content="新增租客合同" placement="top"> -->
			    			<div class="Contract houseMoveList" v-if="isYungYing && roomlist.houseSpaceStatus1 === '空置' && role !== 10" @click="addContract(roomlist)">
			    				<el-tooltip class="item" effect="light" content="新增租客合同" placement="top"><span></span></el-tooltip>
			    			</div>
			    		<!-- </el-tooltip> -->
			    		<!-- </el-tooltip> -->
		    			<!-- <el-tooltip class="item" effect="light" content="附件上传" placement="top"> -->
			    			<div class="upload houseMoveList" @click="addFile(roomlist)" v-if="role !== 10"><el-tooltip class="item" effect="light" content="附件上传" placement="top"><span></span></el-tooltip></div>
			    			<div class="syn houseMoveList" @click="synchronization(roomlist)" v-if="role !== 10">
			    				<el-tooltip class="item" effect="light" content="同步蘑菇" placement="top"><span></span></el-tooltip>
			    			</div>
			    			<div class="password houseMoveList" @click="password(roomlist, houseRoomLists)" v-if="roomlist.isSendPassword === true && role !== 10">
			    				<el-tooltip class="item" effect="light" content="密码授权" placement="top"><span></span></el-tooltip>
			    			</div>
			    			<div class="frozen houseMoveList" @click="frozen(roomlist)" v-if="roomlist.houseSpaceStatus1 === '空置' && role === 0">
			    				<el-tooltip class="item" effect="light" content="冻结房源" placement="top"><span></span></el-tooltip>
			    			</div>
			    			<div class="frozen houseMoveList" @click="thaw(roomlist)" v-if="roomlist.houseSpaceStatus1 === '已冻结' && role === 0">
			    				<el-tooltip class="item" effect="light" content="解冻房源" placement="top"><span></span></el-tooltip>
			    			</div>
			    		<!-- </el-tooltip> -->
		    		</div>
	    		</div>
	    		<div class="rental" v-if="roomlist.houseSpaceStatus1 !== '空置' && roomlist.houseSpaceStatus1 !== '已冻结'" @click="openRental(roomlist.tenantId)">
	    			<div><img src="https://o6niowncl.qnssl.com/user-default-img-b-14.png" width="35"/></div>
	    			<p v-if="roomlist.tenantName">{{roomlist.tenantName}}</p>
	    			<p v-else>暂无信息</p>
	    		</div>
	    		<div class="rental" v-if="roomlist.houseSpaceStatus1 === '已冻结'">
	    			<div><img src="../../static/img/frozening.png"/></div>
	    		</div>
	    		<!-- <div class="houseMoveMenu">
	    			<div class="HMMGrounp HMMGDetial" @click="openDetail(houseRoomList)">
	    				<span></span>
	    				<div class="HMMGrounpHover">
	    					<p>查看详情</p>
	    					<span></span>
	    				</div>
	    			</div>
	    			<div class="HMMGrounp HMMGContract" v-if="houseRoomList.houseSpaceStatus1 === '空置'" @click="addContract(houseRoomList)">
	    				<span></span>
	    				<div class="HMMGrounpHover">
	    					<p>新建出租合同</p>
	    					<span></span>
	    				</div>
	    			</div>
	    			<div class="HMMGrounp HMMHetong">
	    				<span></span>
	    				<div class="HMMGrounpHover">
	    					<p>查看合同</p>
	    					<span></span>
	    				</div>
	    			</div>
	    			<div class="HMMGrounp HMMChange" v-if="tableDataWay === 'house1'" @click="openDialogVisible(houseRoomLists)">
	    				<span></span>
	    				<div class="HMMGrounpHover">
	    					<p>转为整租</p>
	    					<span></span>
	    				</div>
	    			</div>
	    			<div class="HMMGrounp HMMChange" v-if="tableDataWay === 'house2'" @click="openDialogVisible(houseRoomLists)">
	    				<span></span>
	    				<div class="HMMGrounpHover">
	    					<p>转为合租</p>
	    					<span></span>
	    				</div>
	    			</div>
	    			<div class="HMMGrounp HMMDetail" v-if="tableDataWay === 'house'" @click="openDialogVisible('删除房源？')">
	    				<span></span>
	    				<div class="HMMGrounpHover">
	    					<p>删除房源</p>
	    					<span></span>
	    				</div>
	    			</div>
	    			<div class="HMMGrounp HMMJisuan" @click="openeditForm()">
	    				<span></span>
	    				<div class="HMMGrounpHover">
	    					<p>测算房源</p>
	    					<span></span>
	    				</div>
	    			</div>
	    			<div class="HMMGrounp HMMEdit" @click="openForm(houseRoomList)">
	    				<span></span>
	    				<div class="HMMGrounpHover">
	    					<p>修改房源</p>
	    					<span></span>
	    				</div>
	    			</div>
	    		</div> -->
    		</div>
    	</li>
    </ul>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  data: function () {
    return {
      isYungYing: false
    }
  },
  mounted () {
    if (this.$store.state.currentUser.roleData.indexOf('运营部经理') !== -1) {
      this.isYungYing = true
    }
  },
  props: ['houseRoomLists', 'tableDataWay', 'role'],
  methods: {
    open () {
      // $('.pop').fadeIn(250)
      // $('.pop').css('display', 'table')
      $('.el-dialog__wrapper').fadeIn()
    },
    openForm (data) {
      this.$emit('listenToParentEvent', data)
    },
    openDetail (businessId) {
      this.$emit('openDetail', businessId, 'JOINT_RENT')
    },
    openDetail1 (event, businessId) {
      if (event.target.closest('.houseMoveMenu') === null && event.target.closest('.rental') === null) {
        this.$emit('openDetail', businessId, 'JOINT_RENT')
      }
    },
    openDialogVisible: function (text) {
      this.$emit('openDialogVisible', text)
    },
    openeditForm () {
      this.$emit('openeditForm', true)
    },
    addContract (data) {
      this.$emit('addContract', data.keywordAddress, 'JOINT_RENT')
    },
    openRental (value) { // 打开租客详情
      this.$emit('openRental', value)
    },
    addFile (value) { // 上传附件
      this.$emit('addFile', value)
    },
    synchronization (value) { // 同步到蘑菇租房
      this.$emit('synchronization', value)
    },
    password (value, list) { // 密码授权
      this.$emit('password', value, 'JOINT_RENT')
    },
    frozen (value) { // 冻结房源
      // let url = this.$store.state.houseUrl + 'update/houseSpaceStatus'
      let req = {}
      req.houseSpaceId = value.houseSpaceId
      req.houseSpaceStatus = 'FREEZING'
      this.$emit('frozen', req)
    },
    thaw (value) { // 解冻房源
      let req = {}
      req.houseSpaceId = value.houseSpaceId
      req.houseSpaceStatus = 'RENTABLE'
      this.$emit('thaw', req)
    }
  }
}
</script>
<style scoped>
.emptyHouse{
	color: red;
}
.houseRoomList.green .HRLCon{
	border-color: rgba(0, 128, 0, .6);
}
.HRLCon p{
	height: 20px;
}
.houseRoomList .houseMoveMenu  .HMMGrounp{
	background-size: 16px 16px;
	background-position: center center;
	background-repeat: no-repeat;
}
.houseRoomList .houseMoveMenu  .HMMGDetial{
	background-image: url('../../static/img/detail.png');
}
.houseRoomList .houseMoveMenu  .HMMHetong{
	background-image: url('../../static/img/hetong.png');
}
.houseRoomList .houseMoveMenu .HMMChange{
	background-image: url('../../static/img/change.png');
}
.houseRoomList .houseMoveMenu .HMMJisuan{
	background-image: url('../../static/img/jisuan.png');
}
.houseRoomList .houseMoveMenu .HMMEdit{
	background-image: url('../../static/img/edit.png');
}
.houseRoomList .houseMoveMenu .HMMGContract{
	background-image: url('../../static/img/rent.png');
}
.houseRoomList .houseMoveMenu .upload{
	background-image: url('../../static/img/upload.png');
}
.houseRoomList .houseMoveMenu .syn{
	background-image: url('../../static/img/alipay.png');
}
.houseRoomList .houseMoveMenu .password{
	background-image: url('../../static/img/sendPassword.png');
}
.houseRoomList .houseMoveMenu .frozen{
	background-image: url('../../static/img/frozen.png');
}
.houseRoomList .houseMoveMenu span{
	display: block;
	height: 100%;
	width: 100%;
}
.houseRoomList .newFont {
	font-weight: bold;
}
</style>