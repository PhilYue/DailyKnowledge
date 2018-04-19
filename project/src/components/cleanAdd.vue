<template>
<!-- 新建保洁 -->
	<div>
		<el-form :model="form" label-width="110px" :inline="true">
			<el-form-item label="详细地址" required>
				<el-select v-model="house" :filterable="remote" :remote="remote" placeholder="请输入关键词" :remote-method="remoteMethod" style="width:484px" @change="houseChange">
				  	<el-option v-for="item in restaurants" :key="item.value" :label="item.value" :value="item">
				  	</el-option>
				</el-select>
	   </el-form-item>
			<el-form-item label="选择上门日期" required>
				<el-date-picker
			      v-model="form.date"
			      type="date"
           style="width:176px"
			      :picker-options="pickerOptions0">
			  </el-date-picker>
	    </el-form-item>
      <el-form-item label="选择上门时间" required>
        <el-select v-model="form.time" placeholder="选择上门时间" class="time" style="width:185px">
          <el-option value="9" label="9:00-11:00"></el-option>
          <el-option value="11" label="11:00-13:00"></el-option>
          <el-option value="13" label="13:00-15:00"></el-option>
          <el-option value="15" label="15:00-17:00"></el-option>
          <el-option value="17" label="17:00-19:00"></el-option>
        </el-select>
     </el-form-item>
			<!-- <el-form-item label="选择上门时间" required>
				<el-time-select
				  v-model="form.time"
           style="width:176px"
				  :picker-options="{
				    start: '08:00',
				    step: '00:30',
				    end: '20:00'
				  }">
				</el-time-select>
	    </el-form-item> -->
            <el-form-item label="说明">
              <el-input type="textarea" :rows="2" v-model="form.memo" style="width:484px"></el-input>
            </el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
		  	<el-button @click="closeForm()">取 消</el-button>
		  	<el-button type="primary" @click="submit">确 定</el-button>
		</div>
	</div>
</template>
<script>
import $ from 'jquery'
import houseRescoure1 from './houseRescoure1'  //  新建房源
import houseUser from './houseUser'  //  新建房源
export default {
  name: 'form',
  beforeCreate: function () {
    // let treeArea = this.$store.state.accountUrl + 'unit/tree/f/area'
    // 搜索小区
    // this.$options.methods.unitSelect(this, treeArea)
  },
  data: function () {
    return {
      pickerOptions0: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      landlord: '房东',
      renter: '租客',
      unit: [], // 片区列表
      restaurants: [],
      remote: true,
      house: '',
      form: {
        zone: '',
        zoneId: '',
        keywordAddress: '',
        houseSpaceId: '',
        originatorPhone: '',
        serverType: 'CLEAN',
        date: '',
        time: '',
        mome: ''
      },
      mix: {
        treeArea: this.$store.state.accountUrl + 'unit/tree/f/area', // 查询片区
        houseList: this.$store.state.houseUrl + 'list/houseSpace', // 房源地址查找
        cleanAdd: this.$store.state.serviceUrl + 'addMaintainForm' // 新增
      },
      clickOver: true
    }
  },
  props: ['service'],
  mounted () {
    $('.el-dialog--small,.el-dialog--tiny').width(650)
  },
  methods: {
    closeForm () {
      this.$emit('closeForm')
      this.form.houseSpaceId = ''
    },
    houseChange (value) {
      this.form.unitId = value.unitId
    },
    remoteMethod (queryString) { // 小区信
      if (queryString !== '') {
        let url = this.$store.state.searchUrl + 'query/jurisdiction'
        let req = {}
        req.keyword = queryString
        req.esType = 'HOUSE_SPACE'
        req.pageNumber = 1
        req.pageSize = 10
        req.loginId = this.$store.state.currentUser.uid
        req.searchType = 'MATCH_PHRASE'
        // var dataList = {}
        // dataList.keywordAddress = queryString
        // dataList.houseSpaceManagerType = 'HOUSE'
        // dataList.houseSpaceProcess = 'RENTABLE_PROCESS'
        // dataList.houseSpaceStatus = 'RENTABLE'
        // dataList.pageNo = 1
        // dataList.pageSize = 10
        // dataList.loginId = this.$store.state.currentUser.uid
        // dataList.isLoginId = true
        this.restaurants = []
        this.$http.post(url, req).then(({data}) => {
          if (data.code === 200) {
            let list = []
            list = data.data.list
            for (var p in list) {
              // for (var i in list[p].resHouseSpaceBeanList) {
              //   let restaurant = {}
              //   restaurant.value = list[p].resHouseSpaceBeanList[i].keywordAddress
              //   restaurant.houseSpaceManagerId = list[p].resHouseSpaceBeanList[i].houseSpaceId
              //   restaurant.unitId = list[p].zoneId
              //   this.restaurants.push(restaurant)
              // }
              let restaurant = {}
              restaurant.value = list[p].keywordAddress
              restaurant.houseSpaceManagerId = list[p].houseSpaceId
              restaurant.unitId = list[p].zoneId
              this.restaurants.push(restaurant)
            }
            console.log(this.restaurants)
          }
        })
      }
    },
    createFilter (queryString) { // 小区信息
      return (restaurant) => {
        return (restaurant.value.indexOf(queryString.toLowerDae()) === 0)
      }
    },
    handleSelect (item) { // 选择小区信息
      this.form.houseSpaceId = item.houseSpaceManagerId
      this.form.unitId = item.unitId
    },
    unitSelect (_this, userUrl) { // 搜索片区
      let url = _this.$store.state.accountUrl + 'unit/tree/f/area'
      _this.$http.get(url).then(({data}) => {
        var data1 = data.data.children[0].children
        _this.unit = data1
        _this.form.unitId = _this.unit[0].id
        _this.form.zone = _this.unit[0].text
      })
    },
    zoneChange (data) { // 选择片区
      this.form.zoneId = data
    },
    submit () {
      if (this.clickOver) {
        this.clickOver = false
        let unitId = this.house.unitId
        this.form.unitId = this.house.unitId
        this.form.houseSpaceId = this.house.houseSpaceManagerId
        if (this.form.houseSpaceId === '') {
          this.$message({
            message: '请选择详细地址',
            type: 'error'
          })
          this.clickOver = true
        } else if (this.form.date === '') {
          this.$message({
            message: '请选择上门日期',
            type: 'error'
          })
          this.clickOver = true
        } else if (this.form.time === '') {
          this.$message({
            message: '请选择上门',
            type: 'error'
          })
          this.clickOver = true
        } else {
          this.$store.commit('getNewWorkflowToken', {'processKey': 'PROCESS-KEY-MAINTAIN', 'processTenantId': unitId})
          this.form.originatorPhone = this.$store.state.currentUser.UserPhone
          let start = (new Date(this.form.date)).getTime()
          let date = this.form.time.split(':')[0] * 60 * 60 * 1000 + this.form.time.split(':')[0] * 60 * 1000
          this.form.preAccessTimeL = start + date
          this.form.originatorPhone = this.$store.state.currentUser.UserPhone
          let start1 = (new Date(this.form.date)).getTime() + parseInt(this.form.time) * 60 * 60 * 1000
          let end = (new Date(this.form.date)).getTime() + (parseInt(this.form.time) + 2) * 60 * 60 * 1000
          this.form.preStartingTime = start1
          this.form.preFinalTime = end
          this.form.userId = this.$store.state.currentUser.uid
          this.$http.post(this.mix.cleanAdd, this.form, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/*; charset=utf-8',
              'userId': this.$store.state.currentUser.uid,
              'workflowToken': this.$store.state.workflowToken,
              'processTenantId': unitId,
              'processKey': 'PROCESS-KEY-MAINTAIN'
            }
          }).then(function (res) {
            if (res.body.code === 200) {
              this.$message({
                message: '新建成功',
                type: 'success'
              })
              this.$emit('closeForm')
              this.form.houseSpaceId = ''
              this.form.date = ''
              this.form.time = ''
              this.form.memo = ''
            } else {
              this.$message({
                message: '新建失败',
                type: 'error'
              })
            }
            this.clickOver = true
          })
        }
      }
    }
  },
  components: {
    houseRescoure1, houseUser
  }
}
</script>
<style scoped>
.houseSizeP{
  display: inline-block;
  margin-left: -30px;
  position: relative;
}
.dialog-footer{
  text-align: right;
  padding-right: 35px;
}
</style>