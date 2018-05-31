<template>
	<!-- 整租、集中式房源列表卡片 -->
  <div>
    <ul class="f-cb">
    	<li v-for="houseRoomList in houseRoomLists.list" class="houseRoomList">
    		<div class="HRLCon" @click="openDetail1($event, houseRoomList)">
    			<!-- 业务ID -->
				<!-- <p title="编号">{{houseRoomList.businessId}}</p> -->
				<!-- 房源地址 -->
				<p title="地址" class="newFont">
					<span v-if="houseRoomList.buildingNo">{{houseRoomList.buildingNo}}栋</span><span v-if="houseRoomList.unitNo">{{houseRoomList.unitNo}}单元</span><span v-if="houseRoomList.roomNo">{{houseRoomList.roomNo1}}号</span>
				</p>
	    		<p class="houseRoomPrice">
	    			<span>{{houseRoomList.rentalPrice1}}</span>
	    			<span v-if="houseRoomList.decorateType1 != ''">{{houseRoomLists.decorateType1}}</span>
	    		</p>
	    		<p>{{houseRoomList.bedroomNumber}}室{{houseRoomList.livingRoomNumber}}厅·{{houseRoomList.houseSpaceArea / 1000}}㎡·{{houseRoomList.direction1}}</p>
	    		<div class="houseStatus" :class="{houseStatusGreen : houseRoomList.houseSpaceStatus1 !== '空置'}">
	    			<p :class="{rentalStatus : houseRoomList.houseSpaceStatus1 === '空置'}">{{houseRoomList.houseSpaceStatus1}}</p>
	    			<div class="houseMoveMenu">
		    			<!-- <el-tooltip class="item" effect="light" content="查看详情" placement="top"> -->
			    			<div class="Detial houseMoveList" @click="openDetail(houseRoomList)">
			    				<el-tooltip class="item" effect="light" content="查看详情" placement="top"><span></span></el-tooltip>
			    			</div>
			    		<!-- </el-tooltip> -->
		    			<!-- <el-tooltip class="item" effect="light" content="新增租客合同" placement="top"> -->
			    			<div class="Contract houseMoveList" v-if="isYungYing && houseRoomList.houseSpaceStatus1 === '空置' && role !== 10" @click="addContract(houseRoomList)">
			    				<el-tooltip class="item" effect="light" content="新增租客合同" placement="top"><span></span></el-tooltip>
			    			</div>
			    		<!-- </el-tooltip> -->
		    			<!-- <el-tooltip class="item" effect="light" content="附件上传" placement="top"> -->
			    			<div class="upload houseMoveList" @click="addFile(houseRoomList)" v-if="role !== 10">
			    				<el-tooltip class="item" effect="light" content="附件上传" placement="top"><span></span></el-tooltip>
			    			</div>
			    			<div class="syn houseMoveList" @click="synchronization(houseRoomList)" v-if="role !== 10">
			    				<el-tooltip class="item" effect="light" content="同步蘑菇" placement="top"><span></span></el-tooltip>
			    			</div>
			    			<div class="password houseMoveList" @click="password(houseRoomList)" v-if="houseRoomList.isSendPassword === true && role !== 10">
			    				<el-tooltip class="item" effect="light" content="密码授权" placement="top"><span></span></el-tooltip>
			    			</div>
			    			<div class="frozen houseMoveList" @click="frozen(houseRoomList, houseRoomLists)" v-if="houseRoomList.houseSpaceStatus1 === '空置' && role === 0">
			    				<el-tooltip class="item" effect="light" content="冻结房源" placement="top"><span></span></el-tooltip>
			    			</div>
			    			<div class="frozen houseMoveList" @click="thaw(houseRoomList, houseRoomLists)" v-if="houseRoomList.houseSpaceStatus1 === '已冻结' && role === 0">
			    				<el-tooltip class="item" effect="light" content="解冻房源" placement="top"><span></span></el-tooltip>
			    			</div>
			    		<!-- </el-tooltip> -->
		    		</div>
	    		</div>
	    		<div class="rental" v-if="houseRoomList.houseSpaceStatus1 !== '空置' && houseRoomList.houseSpaceStatus1 !== '已冻结'" @click="openRental(houseRoomList.tenantId)">
	    			<div><img src="https://o6niowncl.qnssl.com/user-default-img-b-14.png" width="35"/></div>
	    			<p>{{houseRoomList.tenantName}}</p>
	    		</div>
	    		<div class="rental" v-if="houseRoomList.houseSpaceStatus1 === '已冻结'">
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
	    			<div class="HMMGrounp HMMChange" v-if="tableDataWay === 'house1'" @click="openDialogVisible(houseRoomList)">
	    				<span></span>
	    				<div class="HMMGrounpHover">
	    					<p>转为整租</p>
	    					<span></span>
	    				</div>
	    			</div>
	    			<div class="HMMGrounp HMMChange" v-if="tableDataWay === 'house2' && houseType === 'C'" @click="openDialogVisible(houseRoomList)">
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
  props: ['houseRoomLists', 'tableDataWay', 'houseType', 'role'],
  methods: {
    open () {
      $('.el-dialog__wrapper').fadeIn()
    },
    openForm (data) { // 编辑房源
      this.$emit('openForm', data)
    },
    openDetail (businessId) {
      this.$emit('openDetail', businessId, 'ENTIRE_RENT')
    },
    openDetail1 (event, businessId) {
      if (event.target.closest('.houseMoveMenu') === null && event.target.closest('.rental') === null) {
        this.$emit('openDetail', businessId, 'ENTIRE_RENT')
      }
    },
    openDialogVisible: function (text) {
      this.$emit('openDialogVisible', text)
    },
    openeditForm () {
      this.$emit('openeditForm', true)
    },
    addContract (data) {
      this.$emit('addContract', data.keywordAddress, 'ENTIRE_RENT')
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
    password (value) { // 密码授权
      this.$emit('password', value, 'ENTIRE_RENT')
    },
    frozen (value, data) { // 冻结房源
      // let url = this.$store.state.houseUrl + 'update/houseSpaceStatus'
      let req = {}
      req.houseSpaceId = value.houseSpaceId
      req.houseSpaceStatus = 'FREEZING'
      this.$emit('frozen', req, data)
    },
    thaw (value, data) { // 解冻房源
      let req = {}
      req.houseSpaceId = value.houseSpaceId
      req.houseSpaceStatus = 'RENTABLE'
      this.$emit('thaw', req, data)
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