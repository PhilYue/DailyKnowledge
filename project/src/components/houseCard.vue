<template>
<!-- 整租房源列表 -->
  <div>
    <ul>
      <li v-for="(houseList, index) in houseLists" :key="index" class="houseCard" >
        <div class="houseCardHead f-cb" @click="houseCardListShow(index, $event)">
          <p class="house">{{ houseList.zone }} · {{ houseList.blockName }}<span v-if="houseList.buildingNo">&nbsp;· {{ houseList.buildingNo }}栋</span><span v-if="houseList.unitNo">{{ houseList.unitNo }}单元</span><span v-if="houseList.roomNo">{{ houseList.roomNo }}室</span></p>
          <p class="number"><span v-if="houseList.totalNumber == 0">0</span><span v-else>{{ houseList.resHouseSpaceBeanList.length }}</span></p>
        </div>
        <div class="houseCardList" style="display: none;">
          <houseCardList
            :houseRoomLists="houseList"
            :tableDataWay="tableDataWay"
            :houseType="houseType"
            :role="role"
            @openForm="openForm"
            @openeditForm="openeditForm"
            @openDetail="openDetail"
            @openDialogVisible="openDialog"
            @addContract="addContract"
            @openRental="openRental"
            @addFile="addFile"
            @synchronization="synchronization"
            @frozen="frozen"
            @thaw="thaw"
            @password="password">
          </houseCardList>
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
// import $ from 'jquery'
import houseCardList from './houseCardList'
export default {
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
    houseCardList
  },
  props: ['houseLists', 'tableDataWay', 'elTabPane', 'houseType', 'houseClick', 'searchList', 'userRole', 'role'],
  // beforeUpdate: function () {
  //   for (let i = 0; i < this.houseLists.length; i++) {
  //     this.houseLists[i].showList = false
  //   }
  //   this.thisHouseList = this.houseLists
  //   console.log(this.thisHouseList)
  // },
  // watch: {
  //   houseClick () {
  //     for (let i = 0; i < this.houseLists.length; i++) {
  //       let list1 = this.houseLists[i]
  //       list1.showList = false
  //       this.$set(this.houseLists, i, list1)
  //       for (let j = 0; j < this.clickList.length; j++) {
  //         if (i === this.clickList[j]) {
  //           let list = this.houseLists[i]
  //           list.showList = true
  //           console.log(list, i)
  //           this.$set(this.houseLists, i, list)
  //           console.log(this.houseLists)
  //         }
  //       }
  //     }
  //   }
  // },
  methods: {
    openForm: function (data) {
      this.$emit('listenToParentEvent', data.resHouseSpaceBeanList[0].houseSpaceId, 'entir')
    },
    openDialog: function (data) {
      this.dialogVisible1 = true
      this.houseSpaceManagerId = data.houseSpaceManagerId
    },
    openDetail: function (data) {
      this.$emit('openDetail', data, 'JOINT_RENT')
    },
    openeditForm (data) {
      this.$emit('openeditForm', data)
    },
    roomTransform (data) {
      for (let p in data) {
        for (let i in data[p].resHouseSpaceBeanList[i].resHouseSpaceBeanList) {
          switch (data[p].resHouseSpaceBeanList[i].decorateType) {
            case 'ROUGHCAST_HOUSE':
              data[p].resHouseSpaceBeanList[i].decorateType1 = '毛坯房'
              break
            case 'SIMPLE_DECORATION_HOUSE':
              data[p].resHouseSpaceBeanList[i].decorateType1 = '简装'
              break
            case 'REFINED_DECORATION_HOUSE':
              data[p].resHouseSpaceBeanList[i].decorateType1 = '精装'
              break
          }
          switch (data[p].resHouseSpaceBeanList[i].direction) {
            case 'EAST':
              data[p].resHouseSpaceBeanList[i].direction1 = '东'
              break
            case 'SOUTH':
              data[p].resHouseSpaceBeanList[i].direction1 = '南'
              break
            case 'WEST':
              data[p].resHouseSpaceBeanList[i].direction1 = '西'
              break
            case 'NORTH':
              data[p].resHouseSpaceBeanList[i].direction1 = '北'
              break
            case 'SOUTHEAST':
              data[p].resHouseSpaceBeanList[i].direction1 = '东南'
              break
            case 'NORTHEAST':
              data[p].resHouseSpaceBeanList[i].direction1 = '东北'
              break
            case 'SOUTHWEST':
              data[p].resHouseSpaceBeanList[i].direction1 = '西南'
              break
            case 'NORTHWEST':
              data[p].resHouseSpaceBeanList[i].direction1 = '西北'
              break
          }
          switch (data[p].resHouseSpaceBeanList[i].houseSpaceStatus) {
            case 'WAIT_TRUST':
              data[p].resHouseSpaceBeanList[i].houseSpaceStatus1 = '待托管'
              break
            case 'ASSESSING':
              data[p].resHouseSpaceBeanList[i].houseSpaceStatus1 = '评估中'
              break
            case 'APPROVED':
              data[p].resHouseSpaceBeanList[i].houseSpaceStatus1 = '审核通过'
              break
            case 'SIGNING_DC':
              data[p].resHouseSpaceBeanList[i].houseSpaceStatus1 = '签订托管合同中'
              break
            case 'DC_NOT_TE':
              data[p].resHouseSpaceBeanList[i].houseSpaceStatus1 = '托管合同未生效'
              break
            case 'DC_TE':
              data[p].resHouseSpaceBeanList[i].houseSpaceStatus1 = '托管合同已生效'
              break
            case 'DESIGNING':
              data[p].resHouseSpaceBeanList[i].houseSpaceStatus1 = '设计中'
              break
            case 'CONSTRUCTING':
              data[p].resHouseSpaceBeanList[i].houseSpaceStatus1 = '施工中'
              break
            case 'CHECKING':
              data[p].resHouseSpaceBeanList[i].houseSpaceStatus1 = '验收中'
              break
            case 'RETAIN':
              data[p].resHouseSpaceBeanList[i].houseSpaceStatus1 = '保留'
              break
            case 'RENTABLE':
              data[p].resHouseSpaceBeanList[i].houseSpaceStatus1 = '空置'
              break
            case 'RESERVED':
              data[p].resHouseSpaceBeanList[i].houseSpaceStatus1 = '已预定'
              break
            case 'SIGNING_LC':
              data[p].resHouseSpaceBeanList[i].houseSpaceStatus1 = '签订租赁合同中'
              break
            case 'RENTED':
              data[p].resHouseSpaceBeanList[i].houseSpaceStatus1 = '已出租'
              break
            case 'FREEZING':
              data[p].resHouseSpaceBeanList[i].houseSpaceStatus1 = '已冻结'
              break
            case 'DELETED':
              data[p].resHouseSpaceBeanList[i].houseSpaceStatus1 = '已删除'
              break
          }
        }
      }
      for (let p in data) {
        for (let i in data[p].resHouseSpaceBeanList) {
          if (data[p].resHouseSpaceBeanList.actualRentalPrice) {
            data[p].resHouseSpaceBeanList[i].rentalPrice1 = data[p].resHouseSpaceBeanList[i].actualRentalPrice / 1000
          } else {
            data[p].resHouseSpaceBeanList[i].rentalPrice1 = data[p].resHouseSpaceBeanList[i].expectedRentalPrice / 1000
          }
          // data[p].resHouseSpaceBeanList[i].rentalPrice1 = data[p].resHouseSpaceBeanList[i].rentalPrice / 1000
          data[p].resHouseSpaceBeanList[i].houseSpaceArea1 = data[p].resHouseSpaceBeanList[i].houseSpaceArea / 1000
        }
      }
      console.log(data)
      return data
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
      // }
      // console.log(ev.toElement.nextElementSibling.style.display)
      // $('.el-tab-pane').eq(this.elTabPane).find('.houseCardHead').eq(data).next().slideToggle()
      // if (!houseList.listShow) {
      //   let dataList = {}
      //   dataList = this.searchList
      //   dataList.houseSpaceManagerType = 'HOUSE'
      //   dataList.houseSpaceProcess = 'RENTABLE_PROCESS'
      //   dataList.rentType = 'JOINT_RENT'
      //   dataList.blockName = houseList.blockName
      //   this.$http.post(this.mix.houseResourcesUrl, dataList).then(res => {
      //     // console.log(res)
      //     if (res.body.code === 200) {
      //       houseList.listShow = true
      //       houseList.list = res.body.data.list
      //       houseList.list = this.$options.methods.roomTransform(houseList.list)
      //       console.log(houseList.list)
      //       // $('.el-tab-pane').eq(this.elTabPane).find('.houseCardHead').eq(data).next().slideToggle()
      //     }
      //   })
      // } else {
      //   $('.el-tab-pane').eq(this.elTabPane).find('.houseCardHead').eq(data).next().slideToggle()
      // }
      // let obj = $('.el-tab-pane').eq(this.elTabPane).find('.houseCardHead').eq(data).next()
      // if (obj.css('display') === 'none') {
      //   obj.css('display', 'block')
      // } else {
      //   obj.css('display', 'none')
      // }
      // let count = 0
      // let len = this.clickList.length
      // for (let i = 0; i < this.clickList.length; i++) {
      //   if (this.clickList[i] === data) {
      //     this.clickList.splice(i, 1)
      //   } else {
      //     count++
      //   }
      // }
      // if (count === len) {
      //   this.clickList.push(data)
      // }
      // this.houseLists[data].showList = true
      // this.$emit('houseCardListShow', data)
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
  },
  mounted () {
    // click()
  }
}
</script>
<style scoped>
.house span{
  display: inline-block
}
.houseCardHead{
  cursor: pointer
}
</style>
