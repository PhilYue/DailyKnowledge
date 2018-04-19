<template>
<!-- 新建维修 -->
	<div>
		<el-form :model="form" class="repairForm" label-width="110px" :inline="true">
			<el-form-item label="详细地址" required>
				<el-select v-model="house" :filterable="remote" :remote="remote" :remote-method="remoteMethod" @change="houseChange"  style="width:484px">
				  	<el-option v-for="item in restaurants" :key="item.value" :label="item.value" :value="item">
				  	</el-option>
				</el-select>
	      </el-form-item>
	      <!-- <div v-for="(item, index) in form.maintainedItems" class="goodList1" :class="{firstList: index === 0, lastList: index === form.maintainedItems.length - 1}">
				  <el-form-item label="选择物品类别">
	            	<el-select v-model="item.goodType" @change="goodTypeChange(item)" style="width:176px">
	              		<el-option v-for="goodType in goodTypeList" :label="goodType.label" :value="goodType.value" :key="goodType.label"></el-option>
	            	</el-select>
	          	</el-form-item>
	          	<el-form-item label="选择物品名称" required>
	            	<el-select v-model="item.itemId" style="width:176px" @change="goodChoose">
	              		<el-option v-for="goodList in item.goodLists" :label="goodList.fixedAssetsName" :value="goodList.id" :key="goodList.fixedAssetsName"></el-option>
                    <el-option label="其他" value="0" key="0"></el-option>
	            	</el-select>
	          	</el-form-item>
		        <p class="add" @click="addGoodType"></p>
		        <p class="reduce" @click="reduceGoodType(index)"></p>
	        </div> -->
  			<el-form-item label="选择上门日期" required>
  				<el-date-picker
  			      v-model="form.date"
  			      type="date"
  			       style="width:176px"
  			      :picker-options="pickerOptions0">
  			    </el-date-picker>
  	        </el-form-item>
  			<el-form-item label="选择上门时间" required >
  				<!-- <el-time-select
  				  v-model="form.time"
  				   style="width:176px"
  				  :picker-options="{
  				    start: '08:00',
  				    step: '00:30',
  				    end: '20:00'
  				  }">
  				</el-time-select> -->
          <el-select v-model="form.time" placeholder="请选择" class="time" style="width:185px">
            <el-option value="9" label="9:00-11:00"></el-option>
            <el-option value="11" label="11:00-13:00"></el-option>
            <el-option value="13" label="13:00-15:00"></el-option>
            <el-option value="15" label="15:00-17:00"></el-option>
            <el-option value="17" label="17:00-19:00"></el-option>
          </el-select>
	       </el-form-item>
        <el-form-item label="选择报修物品" required >
          <el-select v-model="form.goodList1" placeholder="请选择区域" style="width:159px" @change="goodListChange1">
            <el-option v-for="list in goodLists1" :key="list.categoryName" :value="list.categoryName" :label="list.categoryName"></el-option>
          </el-select>
          <el-select v-model="form.goodList2" placeholder="请选择分类" style="width:159px" @change="goodListChange2">
            <el-option v-for="list in goodLists2" :key="list.categoryName" :value="list.categoryName" :label="list.categoryName"></el-option>
          </el-select>
          <el-select v-model="form.goodList3" placeholder="请选择物品" style="width:159px" @change="goodListChange3">
            <el-option v-for="list in goodLists3" :key="list.id" :value="list.id" :label="list.categoryName"></el-option>
          </el-select>
         </el-form-item>
      	<el-form-item label="备注描述" required>
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
      house: '',
      form: {
        zone: '',
        unitId: '',
        keywordAddress: '',
        houseSpaceId: '',
        date: '',
        time: '',
        goodList1: '',
        goodList2: '',
        goodList3: '',
        maintainedItems: [
          {
            goodType: 'E_METER',
            goodLists: [],
            itemId: ''
          }
        ],
        // maintainedItemIds: [],
        memo: '',
        serverType: 'MAINTAIN'
      },
      restaurants: [],
      remote: true,
      goodTypeList: [
        {
          value: 'E_METER',
          label: '电表'
        },
        {
          value: 'W_METER',
          label: '水表'
        },
        {
          value: 'G_METER',
          label: '煤气表'
        },
        {
          value: 'DOOR_LOCK',
          label: '门锁'
        },
        {
          value: 'FURNITURE',
          label: '家具'
        },
        {
          value: 'HA',
          label: '家电'
        },
        {
          value: 'RESTS',
          label: '其他'
        },
        {
          value: 'BROAD_BAND',
          label: '宽带'
        }
      ],
      goodList: [],
      goodLists1: [],
      goodLists2: [],
      goodLists3: [],
      mix: {
        treeArea: this.$store.state.accountUrl + 'unit/tree/f/area', // 查询片区
        houseList: this.$store.state.houseUrl + 'list/houseSpace', // 房源地址查找
        serviceAdd: this.$store.state.serviceUrl + 'addMaintainForm',
        list: this.$store.state.houseUrl + 'list/fixedAssets', // 物品列表
        goodListUrl: this.$store.state.categoryUrl + 'repair_category/all' // 物品列表
      },
      clickOver: true
    }
  },
  props: ['addclickCount'],
  created: function () {
    this.$options.methods.getGoodLists(this)
  },
  watch: {
    addclickCount: function (value) {
      this.$options.methods.unitSelect(this)
      this.$options.methods.getGoodLists(this)
      let list = {}
      list.zone = ''
      list.unitId = ''
      list.keywordAddress = ''
      list.houseSpaceId = ''
      list.maintainedItems = []
      list.memo = ''
      list.serverType = 'MAINTAIN'
      let list1 = {}
      list1.goodType = 'E_METER'
      list1.itemId = ''
      list1.goodLists = []
      list.maintainedItems.push(list1)
      this.form = list
      this.house = ''
      this.clickOver = true
    }
  },
  mounted () {
    $('.el-dialog--small,.el-dialog--tiny').width(650)
  },
  methods: {
    closeForm () {
      this.$emit('closeForm')
      this.$options.methods.bgForm(this)
    },
    show () {
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
    },
    unitSelect (_this) { // 搜索片区
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
    goodTypeChange (value) {
      let req = {}
      req.houseSpaceId = this.form.houseSpaceId
      req.fixedAssetsType = value.goodType
      req.houseSpaceType = 'HOUSE_SPACE'
      this.$options.methods.goodSearch(this, this.mix.list, req, value)
    },
    houseChange (value) {
      let list = {}
      list.goodType = 'E_METER'
      list.goodName = ''
      list.goodLists = []
      this.form.maintainedList = []
      this.form.maintainedList.push(list)
      // this.form.unitId = value.unitId
      // this.form.houseSpaceId = value.houseSpaceId
      let req = {}
      req.houseSpaceId = this.form.houseSpaceId
      req.fixedAssetsType = 'E_METER'
      req.houseSpaceType = 'HOUSE_SPACE'
      this.$options.methods.goodSearch(this, this.mix.list, req, this.form.maintainedItems[0])
    },
    goodSearch (_this, url, req, value) {
      value.goodLists = []
      value.itemId = '0'
      _this.$http.post(url, req).then(function (res) {
        if (res.body.code === 200) {
          value.goodLists = res.body.data[0].resFixedAssetsBeanList
          value.itemId = res.body.data[0].resFixedAssetsBeanList[0].id
        }
      })
    },
    goodNameChange (index, value) {
      this.form.maintainedList[index].goodName = value
    },
    submit () { // 提交
      // console.log(this.form)
      if (this.clickOver) {
        this.clickOver = false
        let count = 0
        let unitId = this.house.unitId
        this.form.unitId = this.house.unitId
        this.form.houseSpaceId = this.house.houseSpaceManagerId
        for (var i in this.form.maintainedItems) {
          if (this.form.maintainedItems[i].itemId === '') {
            count++
          }
        }
        if (count > 0) {
          this.$message({
            message: '请选择维修物品',
            type: 'error'
          })
          this.clickOver = true
        } else if (this.form.houseSpaceId === '') {
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
            message: '请选择上门时间',
            type: 'error'
          })
          this.clickOver = true
        } else if (this.form.memo === '') {
          this.$message({
            message: '请填写备注描述',
            type: 'error'
          })
          this.clickOver = true
        } else {
          this.$store.commit('getNewWorkflowToken', {'processKey': this.$store.state.processKey.maintain, 'processTenantId': unitId})
          this.form.originatorPhone = this.$store.state.currentUser.UserPhone
          let start = (new Date(this.form.date)).getTime() + parseInt(this.form.time) * 60 * 60 * 1000
          let end = (new Date(this.form.date)).getTime() + (parseInt(this.form.time) + 2) * 60 * 60 * 1000

          // let date = this.form.time.split(':')[0] * 60 * 60 * 1000 + this.form.time.split(':')[0] * 60 * 1000
          // this.form.preAccessTimeL = start + date
          var _this = this
          this.form.userId = this.$store.state.currentUser.uid
          this.form.preStartingTime = start
          this.form.preFinalTime = end
          let goodL = {}
          goodL.itemId = this.form.goodList3
          this.form.maintainedItems = []
          this.form.maintainedItems.push(goodL)
          _this.$http.post(this.mix.serviceAdd, this.form, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/*; charset=utf-8',
              'userId': this.$store.state.currentUser.uid,
              'workflowToken': this.$store.state.workflowToken,
              'processTenantId': unitId,
              'processKey': this.$store.state.processKey.maintain
            }
          }).then((res1) => {
            if (res1.body.code === 200) {
              _this.$message({
                message: '维修新建成功',
                type: 'success'
              })
              // 回调刷新任务列表
              this.$root.task.$emit('submitForm', 1)
              _this.$emit('closeForm')
              _this.$options.methods.bgForm(this)
            } else {
              _this.$message({
                message: '维修新建失败',
                type: 'error'
              })
            }
            this.clickOver = true
          })
        }
      }
    },
    bgForm (_this) { // 初始化form
      let list = {}
      list.zone = ''
      list.unitId = ''
      list.keywordAddress = ''
      list.houseSpaceId = ''
      list.maintainedItems = []
      list.memo = ''
      list.serverType = 'MAINTAIN'
      let list1 = {}
      list1.goodType = 'E_METER'
      list1.itemId = ''
      list1.goodLists = []
      list.maintainedItems.push(list1)
      _this.form = list
    },
    addGoodType () { // 新增物品选项
      let list = {}
      list.goodType = 'E_METER'
      list.itemId = ''
      list.goodLists = []

      let req = {}
      req.houseSpaceId = this.form.houseSpaceId
      req.fixedAssetsType = 'E_METER'
      this.$options.methods.goodSearch(this, this.mix.list, req, list)
      this.form.maintainedItems.push(list)
    },
    reduceGoodType (index) { // 删除当前物品
      this.form.maintainedItems.splice(index, 1)
    },
    goodChoose (value) {
    },
    getGoodLists (_this) {
      _this.$http.post(_this.mix.goodListUrl).then(function (res) {
        if (res.body.code === 200) {
          _this.goodLists1 = res.body.data
          _this.goodLists2 = res.body.data[0].children
          _this.goodLists3 = res.body.data[0].children[0].children
          _this.form.goodList1 = _this.goodLists1[0].categoryName
          _this.form.goodList2 = _this.goodLists2[0].categoryName
          _this.form.goodList3 = _this.goodLists3[0].categoryName
        }
      })
    },
    goodListChange1 (value) {
      for (let i = 0; i < this.goodLists1.length; i++) {
        if (value === this.goodLists1[i].categoryName) {
          this.goodLists2 = this.goodLists1[i].children
          this.form.goodList2 = this.goodLists2[0].categoryName
        }
      }
      console.log(this.goodLists2)
    },
    goodListChange2 (value) {
      for (let i = 0; i < this.goodLists2.length; i++) {
        if (value === this.goodLists2[i].categoryName) {
          this.goodLists3 = this.goodLists2[i].children
          this.form.goodList3 = this.goodLists3[0].id
        }
      }
    },
    goodListChange3 (value) {
      // for (let i = 0; i < this.goodLists3.length; i++) {
      //   if (value === this.goodLists3[i].categoryName) {
      //     this.goodLists3 = this.goodLists2[i].children
      //     // this.form.goodList3 = this.goodLists3[0].categoryName
      //     this.form.maintainedItems[0].itemId = this.goodLists2[i].id
      //   }
      // }
    }
  },
  // updated () {
  //   this.getNewWorkflowToken('maintain', {})
  // },
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
  	text-align: center;
    text-align: right;
    padding-right: 35px;
  }
  .add{
    position:absolute;
    top:0;
    right:0px;
    width: 16px;
    height: 36px;
    background: url('../../static/img/add.png') center center / 16px 16px;
    background-repeat: no-repeat;
    cursor: pointer;
    display: none;
  }
  .reduce{
    position:absolute;
    top:0;
    right:0px;
    width: 16px;
    height: 36px;
    background: url('../../static/img/reduce.png') center center / 16px 16px;
    background-repeat: no-repeat;
    cursor: pointer;
    display: block;
  }
  .repairForm .goodList1{
    margin-top: 0;
    position: relative;
  }
  .repairForm .goodList1.firstList{
    padding-top: 0px;
    border-top-width: 0;
  }
  .repairForm .goodList1.lastList .reduce{
    display: none;
  }
  .repairForm .goodList1.lastList .add{
    display: block;
  }
</style>