<template>
  <div>
    <transition name="fade">
      <div v-if="show.show" class="dialog houseDetail" :style="height" style="width:500px">
        <el-row class="height-w100">
       	  <el-col class="form-cont" :span="6" style="padding:0; width:10px; background:#eee;">
	       	<!-- <el-menu default-active="1" class="el-menu-vertical-demo" theme="dark">
  		      <el-menu-item index="1">导航一</el-menu-item>
  		      <el-menu-item index="2">导航二</el-menu-item>
  		      <el-menu-item index="3">导航三</el-menu-item>
  		    </el-menu> -->
		  </el-col>
          <el-col class="form-cont" :span="18">
            <p class="HDTitle">{{tableData.keywordAddress}}</p>
            <div class="HDContent">
            	<ul>
                <li>
                  <!-- <houseProcess :tableDatas="tableData.process"></houseProcess> -->
                </li>
            		<li class="f-cb">
                  <el-col class="line" :span="10" style="margin-bottom:20px;"><h2>基本信息</h2></el-col>
                  <el-col class="line" :span="24">
                    <div v-if="tableData.businessId" class="f-cb">
              			   <el-col class="line" :span="6">房源编号: </el-col>
              			   <el-col class="line" :span="14"> {{tableData.businessId}}</el-col>
                    </div>
                    <div v-if="tableData.houseSpaceManagerArea" class="f-cb">
              			   <el-col class="line" :span="6">房源面积: </el-col>
              			   <el-col class="line" :span="14"> {{tableData.houseSpaceManagerArea / 1000}}平方米</el-col>
                    </div>
                    <div v-if="" class="f-cb">
                			 <el-col class="line" :span="6">房源类型: </el-col>
                			 <el-col class="line" :span="14"> {{tableData.bedroomNumber}}室{{tableData.livingRoomNumber}}厅{{tableData.kitchNumber}}厨{{tableData.toiletNumber}}卫</el-col>
                    </div>
                    <div v-if="tableData.zone" class="f-cb">
                        <el-col class="line" :span="6">所属片区:</el-col>
                        <el-col class="line" :span="14">{{tableData.zone}}</el-col>
                    </div>
                    <div v-if="tableData.direction" class="f-cb">
                        <el-col class="line" :span="6">朝向:</el-col>
                        <el-col class="line" :span="14">{{tableData.direction1}}</el-col>
                    </div>
                    <div v-if="tableData.decorateType" class="f-cb">
                        <el-col class="line" :span="6">装修类型:</el-col>
                        <el-col class="line" :span="14">{{tableData.decorateType}}</el-col>
                    </div>
                    <div v-if="tableData.getPrice" class="f-cb">
                        <el-col class="line" :span="6">收房价格:</el-col>
                        <el-col class="line" :span="14">{{tableData.getPrice / 1000}}元/月</el-col>
                    </div>
                    <div v-if="tableData.houseSpaceManagerArea" class="f-cb">
                        <el-col class="line" :span="6">房源面积:</el-col>
                        <el-col class="line" :span="14">{{tableData.houseSpaceManagerArea / 1000}}平方米</el-col>
                    </div>
                    <div v-if="tableData.houseSpaceDescribe" class="f-cb">
                        <el-col class="line" :span="6">房源描述:</el-col>
                        <el-col class="line" :span="14">{{tableData.houseSpaceDescribe}}</el-col>
                    </div>
                    <div class="f-cb">
                        <el-col class="line" :span="6">房源状态:</el-col>
                        <el-col class="line" :span="14">{{tableData.houseSpaceStatus1}}</el-col>
                    </div>
                    <div class="f-cb">
                        <el-col class="line" :span="6">房东姓名:</el-col>
                        <el-col class="line" :span="14">{{tableData.landlordName}}</el-col>
                    </div>
                    <div class="f-cb">
                        <el-col class="line" :span="6">房东手机号:</el-col>
                        <el-col class="line" :span="14">{{tableData.landlordPhone}}</el-col>
                    </div>
                    <div class="f-cb">
                        <el-col class="line" :span="6">房间录入时间:</el-col>
                        <el-col class="line" :span="14">{{tableData.createTime}}</el-col>
                    </div>
                  </el-col>
                </li>
                <!-- <li class="f-cb"> -->
                  <span v-for="items in tableData.process">
                    <li class="f-cb" v-for="item in items" v-if="items[0].department != ''">
                      <el-col class="line" :span="4"><h2>{{item.department}}</h2></el-col>
                      <el-col class="line" :span="18" >
                        <el-col class="line" :span="6">审核人: </el-col>
                        <el-col class="line" :span="14"> {{item.posi}}</el-col>
                        <el-col class="line" :span="6">意见: </el-col>
                        <el-col class="line" :span="14"> {{item.opinion}}</el-col>
                        <el-col class="line" :span="6">说明: </el-col>
                        <el-col class="line" :span="14"> {{item.fileMemo}}</el-col>
                        <el-col class="line" :span="6">附件:</el-col>
                        <el-col class="line" :span="14">
                          <span>
                            <div class="showPic" v-for="it in item.enclosure" :title="it.name"><a :href="it.url" target="_blank"><img :src="it.url"></a><p >{{it.name}}</p></div>
                          </span>
                        </el-col>
                      </el-col>
                    </li>
                  </span>
                <!-- </li> -->
                <!-- <li class="f-cb">
                  <el-col class="line" :span="4"><h2>物品清单</h2></el-col>
                  <el-col class="line" :span="18">
                    <div>
                      <p style="width:100px; display:inline-block; margin-left:20px;">物品名</p>
                      <p style="width:50px; display:inline-block">数量</p>
                      <p style="width:50px; display:inline-block">归属</p>
                    </div>
                    <div v-for="good in tableData.goodList">
                      <p style="width:100px; display:inline-block; margin-left:20px;">{{good.name}}</p>
                      <p style="width:50px; display:inline-block">{{good.count}}</p>
                      <p style="width:50px; display:inline-block">{{good.ascription}}</p>
                    </div>
                  </el-col>
                </li> -->
            	</ul>
            </div>
          </el-col>
        </el-row>
        <div @click="show.show = !show.show" class="">
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
const height = window.screen.height - 151
export default {
  name: 'detail',
  data: function () {
    return {
      height: 'height:' + height + 'px;',
      tableData: '',
      int: 0
    }
  },
  beforeUpdate () {
    if (this.int === 0) {
      let url = this.mix.houseDetailUrl
      let houseSpaceId = {}
      houseSpaceId.houseSpaceId = this.houseId.houseSpaceId
      this.$http.post(url, houseSpaceId).then(({data}) => {
        if (data.code === 200) {
          this.directionChange(data.data)
          this.tableData = data.data
        } else {
          this.$message({
            message: data.message,
            type: 'error'
          })
        }
      })
      this.int++
    }
  },
  props: ['houseId', 'show', 'houseDetailText', 'mix', 'detailClick'],
  mounted () {
    $('.el-dialog--small,.el-dialog--tiny').width(450)
  },
  watch: {
    detailClick: function () {
      let url = this.mix.houseDetailUrl
      let houseSpaceId = {}
      houseSpaceId.houseSpaceId = this.houseId.houseSpaceId
      this.$http.post(url, houseSpaceId).then(({data}) => {
        if (data.code === 200) {
          this.directionChange(data.data)
          this.tableData = data.data
        } else {
          this.$message({
            message: data.message,
            type: 'error'
          })
        }
      })
    }
  },
  methods: {
    directionChange (data) { // 解析房源朝向
      var direction1
      switch (data.direction) {
        case 'EAST':
          direction1 = '东'
          break
        case 'SOUTH':
          direction1 = '南'
          break
        case 'WEST':
          direction1 = '西'
          break
        case 'NORTH':
          direction1 = '北'
          break
        case 'SOUTHEAST':
          direction1 = '东南'
          break
        case 'NORTHEAST':
          direction1 = '东北'
          break
        case 'SOUTHWEST':
          direction1 = '西南'
          break
        case 'NORTHWEST':
          direction1 = '西北'
          break
      }
      switch (data.decorateType) {
        case 'R':
          data.decorateType = '毛坯房'
          break
        case 'S':
          data.decorateType = '简装'
          break
        case 'RD':
          data.decorateType = '精装'
          break
        case 'A':
          data.decorateType = '豪华装修'
          break
      }
      switch (data.houseSpaceStatus) {
        case 'WAIT_DELEGATE':
          data.houseSpaceStatus1 = '待托管'
          break
        case 'ASSESSING':
          data.houseSpaceStatus1 = '评估中'
          break
        case 'APPROVED':
          data.houseSpaceStatus1 = '审核通过'
          break
        case 'SIGNING_DC':
          data.houseSpaceStatus1 = '签订托管合同中'
          break
        case 'DC_NOT_TE':
          data.houseSpaceStatus1 = '托管合同未生效'
          break
        case 'DC_TE':
          data.houseSpaceStatus1 = '托管合同已生效'
          break
        case 'DESIGNING':
          data.houseSpaceStatus1 = '设计中'
          break
        case 'CONSTRUCTING':
          data.houseSpaceStatus1 = '施工中'
          break
        case 'CHECKING':
          data.houseSpaceStatus1 = '验收中'
          break
        case 'RETAIN':
          data.houseSpaceStatus1 = '保留'
          break
        case 'RENTABLE':
          data.houseSpaceStatus1 = '空置'
          break
        case 'RESERVED':
          data.houseSpaceStatus1 = '已预定'
          break
        case 'SIGNING_LC':
          data.houseSpaceStatus1 = '签订租赁合同中'
          break
        case 'RENTED':
          data.houseSpaceStatus1 = '已出租'
          break
        case 'FREEZING':
          data.houseSpaceStatus1 = '已冻结'
          break
        case 'DELETED':
          data.houseSpaceStatus1 = '已删除'
          break
      }
      data.houseSpaceArea1 = data.houseSpaceArea / 1000
      data.rentalPrice1 = data.rentalPrice / 1000
      data.direction1 = direction1
      var startTime = new Date(data.createTime)
      data.createTime = startTime.getFullYear() + '-' + (startTime.getMonth() + 1) + '-' + startTime.getDate()
      return data
    }
  },
  components: {
    houseProcess
  }
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
h2{
  font-size: 16px;
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
.HDContent span li:first-child{
  padding-top: 20px;
}
.HDContent span li:last-child{
  border-width: 1px;
}
.el-menu--dark{
	/*background: #ebebeb;*/
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
	margin-top: 20px;
}
.showPic{
  width: 100px;
  height: 120px;
  float: left;
  margin-right: 5px;
  margin-bottom: 10px;
  cursor: pointer;
}
.showPic p{
  text-align: center;
  font-size: 13px;
  line-height: 20px;
  overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
}
.showPic img{
  width: 100%;
  max-height: 100px;
}
.form-cont{
  padding-bottom: 50px;
}
.textRight{
  margin-right: 10px;
}
.f-cb{
  margin-bottom: 5px;
}
</style>