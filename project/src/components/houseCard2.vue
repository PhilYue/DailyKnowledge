<template>
<!-- 整租房源列表 -->
  <div>
    <ul>
    	<li v-for="(houseList, index) in houseLists" class="houseCard" >
    		<div class="houseCardHead f-cb" @click="houseCardListShow(houseList, index, $event)">
    			<p class="house">{{ houseList.zone }} · {{ houseList.blockName }}<font v-if="houseList.buildingNo !== '' && houseList.buildingNo !== null"> · {{houseList.buildingNo}}栋</font></p>
    			<p class="number"><span v-if="houseList.totalNumber == 0">0</span><span v-else>{{ houseList.totalNumber }}</span></p>
    		</div>
    		<div class="houseCardList" v-if="houseList.listShow">
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
            @password="password"></houseCardList>
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
import houseCardList from './houseCardList1'
export default {
  data: function () {
    return {
      houseSpaceManagerId: '',
      dialogVisible1: false,
      thisHouseList: [],
      clickList: [],
      houseSearch: {},
      mix: {
        houseResourcesUrl: this.$store.state.houseUrl + 'list/houseSpace' // 房源列表
      }
    }
  },
  components: {
    houseCardList
  },
  props: ['houseLists', 'tableDataWay', 'elTabPane', 'houseType', 'houseClick', 'searchList', 'newStatus', 'userRole', 'role'],
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
      this.$emit('openDetail', data, 'ENTIRE_RENT')
    },
    openeditForm (data) {
      this.$emit('openeditForm', data)
    },
    copy (obj) {
      let newobj = {}
      for (let attr in obj) {
        newobj[attr] = obj[attr]
      }
      return newobj
    },
    roomTransform (data, userRole) {
      let arr = []
      for (let p in data) {
        switch (data[p].decorateType) {
          case 'ROUGHCAST_HOUSE':
            data[p].decorateType1 = '毛坯房'
            break
          case 'SIMPLE_DECORATION_HOUSE':
            data[p].decorateType1 = '简装'
            break
          case 'REFINED_DECORATION_HOUSE':
            data[p].decorateType1 = '精装'
            break
        }
        for (let i in data[p].resHouseSpaceBeanList) {
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
              data[p].resHouseSpaceBeanList[i].houseSpaceStatus1 = '签订合同中'
              break
            case 'LC_NOT_TE':
              data[p].resHouseSpaceBeanList[i].houseSpaceStatus1 = '合同未生效'
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
              data[p].resHouseSpaceBeanList[i].houseSpaceStatus1 = '签订合同中'
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
          if (data[p].resHouseSpaceBeanList[i].houseSpaceStatus === 'RENTABLE' && userRole[0] !== 200) { // 可出租的时候运营部、销售部、管家都可以申请
            data[p].resHouseSpaceBeanList[i].isSendPassword = true
          } else if (data[p].resHouseSpaceBeanList[i].houseSpaceStatus !== 'RENTABLE') { // 不可出租的时候运营部可以申请
            if (userRole[0] === 0) {
              data[p].resHouseSpaceBeanList[i].isSendPassword = true
            } else {
              data[p].resHouseSpaceBeanList[i].isSendPassword = false
            }
          }
        }
      }
      for (let p in data) {
        for (let i in data[p].resHouseSpaceBeanList) {
          let list = {}
          list = this.copy(data[p])
          // if (data[p].resHouseSpaceBeanList[i].houseSpaceStatus !== 'RENTABLE')
          if (data[p].resHouseSpaceBeanList[i].houseSpaceStatus !== 'RENTABLE') {
            if (data[p].resHouseSpaceBeanList[i].actualRentalPrice !== '' && data[p].resHouseSpaceBeanList[i].actualRentalPrice !== null) {
              data[p].resHouseSpaceBeanList[i].rentalPrice1 = data[p].resHouseSpaceBeanList[i].actualRentalPrice / 1000 + '元/月'
            } else {
              data[p].resHouseSpaceBeanList[i].rentalPrice1 = '暂无定价'
            }
          } else {
            if (data[p].resHouseSpaceBeanList[i].expectedRentalPrice !== '' && data[p].resHouseSpaceBeanList[i].expectedRentalPrice !== null) {
              data[p].resHouseSpaceBeanList[i].rentalPrice1 = data[p].resHouseSpaceBeanList[i].expectedRentalPrice / 1000 + '元/月'
            } else {
              data[p].resHouseSpaceBeanList[i].rentalPrice1 = '暂无定价'
            }
          }
          if (data[p].resHouseSpaceBeanList[i].houseSpaceName !== '' && data[p].resHouseSpaceBeanList[i].houseSpaceName !== null) {
            data[p].resHouseSpaceBeanList[i].roomNo1 = data[p].roomNo + '' + data[p].resHouseSpaceBeanList[i].houseSpaceName
          } else {
            data[p].resHouseSpaceBeanList[i].roomNo1 = data[p].roomNo
          }
          // data[p].resHouseSpaceBeanList[i].rentalPrice1 = data[p].resHouseSpaceBeanList[i].rentalPrice / 1000
          data[p].resHouseSpaceBeanList[i].houseSpaceArea1 = data[p].resHouseSpaceBeanList[i].houseSpaceArea / 1000
          arr.push(Object.assign(list, data[p].resHouseSpaceBeanList[i]))
        }
      }
      return arr
    },
    houseCardListShow (houseList, data, ev) {
      if (!houseList.listShow) {
        let dataList = {}
        // dataList = this.searchList
        dataList.loginId = this.searchList.loginId
        dataList.houseSpaceManagerType = this.searchList.houseSpaceManagerType
        dataList.houseSpaceProcess = this.searchList.houseSpaceProcess
        dataList.loginId = this.searchList.loginId
        dataList.otherHouseSpaceStatus = this.searchList.otherHouseSpaceStatus
        dataList.propertyType = this.searchList.propertyType
        dataList.zoneId = this.searchList.zoneId
        dataList.keywordAddress = this.searchList.keywordAddress
        delete dataList.pageSize
        delete dataList.pageNo
        dataList.houseSpaceManagerType = 'HOUSE'
        dataList.propertyType = 'C'
        dataList.houseSpaceProcess = 'RENTABLE_PROCESS'
        dataList.loginId = this.$store.state.currentUser.uid
        dataList.blockName = houseList.blockName
        dataList.buildingNo = houseList.buildingNo
        dataList.isLoginId = true
        dataList.otherHouseSpaceStatus = this.newStatus
        this.houseSearch = dataList
        this.$http.post(this.mix.houseResourcesUrl, dataList).then(res => {
          if (res.body.code === 200) {
            houseList.listShow = true
            houseList.list = res.body.data.list
            houseList.list = this.$options.methods.roomTransform(houseList.list, this.userRole)
          } else if (res.body.code === 10000) {
            houseList.listShow = true
            houseList.list = []
          }
        })
      } else {
        // $('.el-tab-pane').eq(this.elTabPane).find('.houseCardHead').eq(data).next().slideToggle()
        // let display = ev.target.nextElementSibling.style.display
        // if (display === 'none') {
        //   ev.target.nextElementSibling.style.display = 'block'
        // } else {
        //   ev.target.nextElementSibling.style.display = 'none'
        // }
        // for (let i = 0; i < ev.path.length; i++) {
        //   if (ev.path[i].className === 'houseCardHead f-cb') {
        //     let display = ev.path[i].nextElementSibling.style.display
        //     if (display === 'none') {
        //       ev.path[i].nextElementSibling.style.display = 'block'
        //     } else {
        //       ev.path[i].nextElementSibling.style.display = 'none'
        //     }
        //   }
        // }
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
      value.houseSpaceId = value.houseSpaceId
      this.$emit('addFile', value)
    },
    synchronization (value) {
      value.houseSpaceId = value.houseSpaceId
      value.keywordAddress = value.keywordAddress
      this.$emit('synchronization', value)
    },
    password (value, type) {
      value.houseSpaceId = value.houseSpaceId
      value.keywordAddress = value.keywordAddress
      this.$emit('password', value, type)
    },
    frozen (value, data) { // 冻结房源
      let url = this.$store.state.houseUrl + 'update/houseSpaceStatus'
      this.$confirm('确定冻结房源?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post(url, value).then((res) => {
          if (res.body.code === 200) {
            this.$message({
              message: '冻结成功',
              type: 'success'
            })
            this.$emit('frozenRental')
            this.$http.post(this.mix.houseResourcesUrl, this.houseSearch).then(res => {
              if (res.body.code === 200) {
                data.listShow = true
                data.list = res.body.data.list
                data.list = this.$options.methods.roomTransform(data.list, this.userRole)
              } else if (res.body.code === 10000) {
                data.listShow = true
                data.list = []
              }
            })
          } else {
            this.$message({
              message: '冻结失败',
              type: 'error'
            })
          }
        }, (res) => {
          this.$message({
            message: '网络有误',
            type: 'error'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消冻结'
        })
      })
    },
    thaw (value, data) { // 解冻房源
      let url = this.$store.state.houseUrl + 'update/houseSpaceStatus'
      this.$confirm('确定解冻房源?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post(url, value).then((res) => {
          if (res.body.code === 200) {
            this.$message({
              message: '解冻成功',
              type: 'success'
            })
            this.$emit('frozenRental')
            this.$http.post(this.mix.houseResourcesUrl, this.houseSearch).then(res => {
              if (res.body.code === 200) {
                data.listShow = true
                data.list = res.body.data.list
                data.list = this.$options.methods.roomTransform(data.list, this.userRole)
              } else if (res.body.code === 10000) {
                data.listShow = true
                data.list = []
              }
            })
          } else {
            this.$message({
              message: '解冻失败',
              type: 'error'
            })
          }
        }, (res) => {
          this.$message({
            message: '网络有误',
            type: 'error'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消解冻'
        })
      })
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
