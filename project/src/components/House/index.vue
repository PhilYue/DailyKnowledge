<style scoped>
.house span{
  display: inline-block
}
.houseCardHead{
  cursor: pointer
}

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
	background-image: url('../../../static/img/detail.png');
}
.houseRoomList .houseMoveMenu  .HMMHetong{
	background-image: url('../../../static/img/hetong.png');
}
.houseRoomList .houseMoveMenu .HMMChange{
	background-image: url('../../../static/img/change.png');
}
.houseRoomList .houseMoveMenu .HMMJisuan{
	background-image: url('../../../static/img/jisuan.png');
}
.houseRoomList .houseMoveMenu .HMMEdit{
	background-image: url('../../../static/img/edit.png');
}
.houseRoomList .houseMoveMenu .HMMGContract{
	background-image: url('../../../static/img/rent.png');
}
.houseRoomList .houseMoveMenu .upload{
	background-image: url('../../../static/img/upload.png');
}
.houseRoomList .houseMoveMenu .syn{
	background-image: url('../../../static/img/alipay.png');
}
.houseRoomList .houseMoveMenu .password{
	background-image: url('../../../static/img/sendPassword.png');
}
.houseRoomList .houseMoveMenu .frozen{
	background-image: url(../../../static/img/frozen.png);
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

<template>
<!-- 整租房源列表 -->
  <div>
    <ul>
      <li v-for="(house, index) in data" :key="index" class="houseCard" >
        <div class="houseCardHead f-cb" @click="houseCardListShow(index, $event)">
          <p class="house">{{ house.zone }} · {{ house.blockName }}<span v-if="house.buildingNo">&nbsp;· {{ house.buildingNo }}栋</span><span v-if="house.unitNo">{{ house.unitNo }}单元</span><span v-if="house.roomNo">{{ house.roomNo }}室</span></p>
          <p class="number"><span v-if="house.totalNumber == 0">0</span><span v-else>{{ house.resHouseSpaceBeanList.length }}</span></p>
        </div>
        <div class="houseCardList" style="display: none;">
          <ul class="f-cb">
            <room
              v-for="(item, key) in house.resHouseSpaceBeanList"
              :key="key"
              :context="item"
              @click="handleClick"
            />
          </ul>
          <!-- <house-card-list
            :data="house.resHouseSpaceBeanList"
            :tableDataWay="tableDataWay"
            :houseType="houseType"
            :role="role"
            @openForm="openForm"
            @openeditForm="openeditForm"
            @click="openDetail"
            @openDialogVisible="openDialog"
            @addContract="addContract"
            @openRental="openRental"
            @addFile="addFile"
            @synchronization="synchronization"
            @frozen="frozen"
            @thaw="thaw"
            @password="password"/> -->
        </div>
      </li>
    </ul>
    <!-- 提示弹窗开始 -->
    <el-dialog title="提示" :visible.sync="dialogVisible1" size="tiny">
      <p class="dialog-p">转为合租？</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 提示弹窗结束 -->
 </div>
</template>
<script>
import Room from './Room'
export default {
  props: ['data', 'tableDataWay', 'elTabPane', 'houseType', 'houseClick', 'searchList', 'userRole', 'role'],

  data: function () {
    return {
      houseSpaceManagerId: '',
      dialogVisible1: false,
      thisHouseList: [],
      clickList: [],
      mix: {
        houseResourcesUrl: this.$store.state.houseUrl + 'list/houseSpace' // 房源列表
      }
    }
  },
  components: {
    Room
  },

  methods: {
    handleClick(businessId) {
      this.$emit('child-click', businessId)
    },

    openForm: function (data) {
      this.$emit('listenToParentEvent', data.resHouseSpaceBeanList[0].houseSpaceId, 'entir')
    },
    openDialog: function (data) {
      this.dialogVisible1 = true
      this.houseSpaceManagerId = data.houseSpaceManagerId
    },
    openeditForm (data) {
      this.$emit('openeditForm', data)
    },
  
    houseCardListShow (data, ev) {
      // $('.houseCardHead').eq(data).next().slideToggle()
      // for (let i = 0; i < ev.path.length; i++) {
      if (ev.toElement) {
        if (ev.toElement.className === 'houseCardHead f-cb') {
          let display = ev.toElement.nextElementSibling.style.display
          if (display === 'none') {
            ev.toElement.nextElementSibling.style.display = 'block'
          } else {
            ev.toElement.nextElementSibling.style.display = 'none'
          }
        } else if (ev.toElement.parentElement.className === 'houseCardHead f-cb') {
          let display = ev.toElement.parentElement.nextElementSibling.style.display
          if (display === 'none') {
            ev.toElement.parentElement.nextElementSibling.style.display = 'block'
          } else {
            ev.toElement.parentElement.nextElementSibling.style.display = 'none'
          }
        } else if (ev.toElement.parentElement.parentElement.className === 'houseCardHead f-cb') {
          let display = ev.toElement.parentElement.parentElement.nextElementSibling.style.display
          if (display === 'none') {
            ev.toElement.parentElement.parentElement.nextElementSibling.style.display = 'block'
          } else {
            ev.toElement.parentElement.parentElement.nextElementSibling.style.display = 'none'
          }
        }
      } else if (ev.originalTarget) {
        if (ev.originalTarget.className === 'houseCardHead f-cb') {
          let display = ev.originalTarget.nextElementSibling.style.display
          if (display === 'none') {
            ev.originalTarget.nextElementSibling.style.display = 'block'
          } else {
            ev.originalTarget.nextElementSibling.style.display = 'none'
          }
        } else if (ev.originalTarget.parentElement.className === 'houseCardHead f-cb') {
          let display = ev.originalTarget.parentElement.nextElementSibling.style.display
          if (display === 'none') {
            ev.originalTarget.parentElement.nextElementSibling.style.display = 'block'
          } else {
            ev.originalTarget.parentElement.nextElementSibling.style.display = 'none'
          }
        } else if (ev.originalTarget.parentElement.parentElement.className === 'houseCardHead f-cb') {
          let display = ev.originalTarget.parentElement.parentElement.nextElementSibling.style.display
          if (display === 'none') {
            ev.originalTarget.parentElement.parentElement.nextElementSibling.style.display = 'block'
          } else {
            ev.originalTarget.parentElement.parentElement.nextElementSibling.style.display = 'none'
          }
        }
      }
    },
    addContract (data, value) {
      this.$emit('addContract', data, value)
    },
    openRental (value) {
      this.$emit('openRental', value)
    },
    addFile (value) {
      this.$emit('addFile', value)
    },
    synchronization (value) {
      this.$emit('synchronization', value)
    },
    password (value, type) {
      this.$emit('password', value, type)
    },
    frozen (value) { // 冻结房源
      this.$emit('frozen', value)
    },
    thaw (value) { // 解冻房源
      this.$emit('thaw', value)
    }
  }
}
</script>
