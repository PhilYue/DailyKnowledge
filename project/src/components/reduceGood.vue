<template>
<!-- 房源新增物品 -->
  <div name="fade">
    <el-dialog title="物品搬出" :visible.sync="goodRFormShow">
      <el-form :inline="true">
      	<ul>
			<li class="goodList2">
				<el-form-item label="物品去向:" :label-width="formLabelWidth">
			    	<el-radio-group v-model="source"  @change="goodSource">
			        	<el-radio class="radio" :label="1">仓库</el-radio>
					    <el-radio class="radio" :label="2">其他房间</el-radio>
					</el-radio-group>
				</el-form-item>
			</li>
		</ul>
		<ul v-if="source === 1">
			<li v-for="(item, index) in goodList" class="goodList1" :class="{firstList: index === 0, lastList: index === goodList.length - 1}">
				<el-form-item label="物品类型:" :label-width="formLabelWidth">
				  <el-select v-model="item.goodType" placeholder="请选择" @change="goodListChange(item)" style="width:100px">
				    <el-option
				      v-for="option in goodTypeLists"
				      :key="option.value"
				      :label="option.label"
				      :value="option.value">
				    </el-option>
				  </el-select>
				</el-form-item>
				<el-form-item label="物品:" label-width="50px">
				  <el-select v-model="item.id" placeholder="请选择" style="width:200px">
				    <el-option
				      v-for="option in item.goodList"
				      :key="option.id"
				      :label="option.fixedAssetsName"
				      :value="option.id">
				    </el-option>
				  </el-select>
				</el-form-item>
				<el-form-item label="数量:" label-width="50px">
					<el-input type="text" v-model="item.goodNumber" placeholder="请输入内容" style="width:50px"></el-input>
				</el-form-item>
	            <p class="add" @click="addGoodType(goodList)"></p>
	            <p class="reduce" @click="reduceGoodType(goodList, index)"></p>
	      	</li>
	        <div slot="footer" class="dialog-footer">
	          <el-button @click="closeGoodAdd">取 消</el-button>
	          <el-button type="primary" @click="submitGoodType">确 定</el-button>
	        </div>
      	</ul>
		<ul v-if="source === 2">
			<li v-for="(item, index) in goodListToHouse" class="goodList1" :class="{firstList: index === 0, lastList: index === goodListToHouse.length - 1}">
		    <el-form-item label="详细地址" :label-width="formLabelWidth">
					<el-select v-model="item.houseSpaceId" :filterable="remote" :remote="remote" placeholder="请输入关键词" :remote-method="remoteMethod"  style="width:490px">
					  	<el-option
					      v-for="restaurant in restaurants" :key="restaurant.value" :label="restaurant.value" :value="restaurant.houseSpaceManagerId">
					  	</el-option>
					</el-select>
		    </el-form-item>
				<el-form-item label="物品类型:" :label-width="formLabelWidth">
				  <el-select v-model="item.goodType" placeholder="请选择" style="width:119px" @change="houseChange(item)">
				    <el-option
				      v-for="option in goodTypeLists"
				      :key="option.value"
				      :label="option.label"
				      :value="option.value">
				    </el-option>
				  </el-select>
				</el-form-item>
				<el-form-item label="物品:" label-width="width:50px">
				  <el-select v-model="item.id" placeholder="请选择" style="width:200px">
				    <el-option
				      v-for="option in item.goodList"
				      :key="option.id"
				      :label="option.fixedAssetsName"
				      :value="option.id">
				    </el-option>
				  </el-select>
				</el-form-item>
				<el-form-item label="数量:" label-width="width:50px">
					<el-input type="text" v-model="item.goodNumber" placeholder="请输入内容" style="width:50px"></el-input>
				</el-form-item>
	            <p class="add" @click="addGoodTypes(goodListToHouse)"></p>
	            <p class="reduce" @click="reduceGoodType(form, index)"></p>
	      	</li>
	        <div slot="footer" class="dialog-footer">
	          <el-button @click="closeGoodAdd">取 消</el-button>
	          <el-button type="primary" @click="submitGoodType1">确 定</el-button>
	        </div>
      	</ul>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import $ from 'jquery'
import houseUser from './houseUser'  //  新建房源
export default {
  data: function () {
    // var _this = this
    return {
      inputWidth: 'width:194px;',
      landlord: '房东',
      unit: [],
      restaurants: [],
      remote: true,
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      state4: '',
      renter: '租客',
      source: 1,
      good: { // 物品初始化
        goodSource: 1,
        goodType: 'E_METER',
        goodName: '',
        goodNumber: 1
      },
      goodList: [
        {
          goodType: 'E_METER',
          goodName: '',
          goodNumber: 1,
          goodList: []
        }
      ],
      goodListToHouse: [
        {
          goodType: 'E_METER',
          goodName: '',
          goodNumber: 1,
          houseSpaceId: '',
          goodList: []
        }
      ],
      goodTypeLists: [
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
      goodRFormShow: false,
      formLabelWidth: '90px',
      mix: {
        houseList: this.$store.state.houseUrl + 'list/houseSpace', // 房源地址查找
        cleanAdd: this.$store.state.serviceUrl + 'addMaintainForm' // 新增
      },
      clickOver: true
    }
  },
  props: ['goodFormShow', 'houseId', 'reduceCount'],
  mounted () {
    $('.el-dialog--small,.el-dialog--tiny').width(650)
  },
  watch: {
    reduceCount: function () {
      let url = this.$store.state.houseUrl + 'list/fixedAssets/notClassified' // 查询物品列表
      this.goodRFormShow = this.goodFormShow
      this.bgAddGoodType(this) // 初始化aeddGoodType
      this.bgAddGoodTypes(this) // 初始化aeddGoodTypes
      this.goodListSearch(this.goodList[0], this, url)
      this.goodListSearch(this.goodListToHouse[0], this, url)
      this.clickOver = true
    }
  },
  created () {
    
  },
  methods: {
    closeGoodAdd () {
      this.$emit('closeGoodAdd')
    },
    submitEdit () { // 提交按钮
      this.form.houseSpaceManagerArea = this.form.houseSpaceManagerArea1 * 1000
      this.form.getPrice = this.form.getPrice1 * 1000
      this.$http.post(this.mix.houseUpdate, this.form).then(({data}) => {
        if (data.code === 200) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.$emit('submitEdit', true)
        } else {
          this.$message({
            message: data.message,
            type: 'error'
          })
          this.$emit('submitEdit', false)
        }
      })
    },
    remoteMethod (queryString) { // 小区信息
      if (queryString !== '') {
        var dataList = {}
        dataList.keywordAddress = queryString
        dataList.houseSpaceManagerType = 'HOUSE'
        dataList.houseSpaceProcess = 'RENTABLE_PROCESS'
        dataList.houseSpaceStatus = 'RENTABLE'
        dataList.loginId = this.$store.state.currentUser.uid
        dataList.pageSize = 10
        dataList.pageNo = 1
        this.restaurants = []
        this.$http.post(this.mix.houseList, dataList).then(({data}) => {
          if (data.code === 200) {
            for (var p in data.data.list) {
              for (var i in data.data.list[p].resHouseSpaceBeanList) {
                let restaurant = {}
                // restaurant.value = data.data.list[p].resHouseSpaceManagerBeanList[i].resHouseSpaceBeanList[0].keywordAddress
                // restaurant.houseSpaceManagerId = data.data.list[p].resHouseSpaceManagerBeanList[i].resHouseSpaceBeanList[0].houseSpaceId
                restaurant.value = data.data.list[p].resHouseSpaceBeanList[i].keywordAddress
                restaurant.houseSpaceManagerId = data.data.list[p].resHouseSpaceBeanList[i].houseSpaceId
                this.restaurants.push(restaurant)
              }
            }
          }
        })
      }
    },
    houseChange (item) { // 搜索物品列表
      let url = this.$store.state.houseUrl + 'list/fixedAssets/notClassified' // 查询物品列表
      this.goodListSearch(item, this, url)
    },
    goodSource (data) {
    },
    addGoodType (lists) { // 新增物品选项
      let url = this.$store.state.houseUrl + 'list/fixedAssets/notClassified' // 查询物品列表
      let obj = {}
      obj.goodType = 'E_METER'
      obj.id = ''
      obj.goodNumber = 1
      obj.goodList = []
      this.$options.methods.goodListSearch(obj, this, url)
      lists.push(obj)
    },
    addGoodTypes (lists) {
      let url = this.$store.state.houseUrl + 'list/fixedAssets/notClassified' // 查询物品列表
      let obj = {}
      obj.goodType = 'E_METER'
      obj.id = ''
      obj.goodNumber = 1
      obj.houseSpaceId = ''
      obj.goodList = []
      this.$options.methods.goodListSearch(obj, this, url)
      lists.push(obj)
    },
    bgAddGoodType (_this) { // 初始化aeddGoodType
      let url = this.$store.state.houseUrl + 'list/fixedAssets/notClassified' // 查询物品列表
      let obj = {}
      let arr = []
      obj.goodType = 'E_METER'
      obj.id = ''
      obj.goodNumber = 1
      obj.goodList = []
      this.$options.methods.goodListSearch(obj, this, url)
      arr.push(obj)
      _this.goodList = arr
    },
    bgAddGoodTypes (_this) { // 初始化aeddGoodTypes
      let url = this.$store.state.houseUrl + 'list/fixedAssets/notClassified' // 查询物品列表
      let obj = {}
      let arr = []
      obj.goodType = 'E_METER'
      obj.id = ''
      obj.goodNumber = 1
      obj.houseSpaceId = ''
      obj.goodList = []
      this.$options.methods.goodListSearch(obj, this, url)
      arr.push(obj)
      _this.goodListToHouse = arr
    },
    reduceGoodType (lists, index) { // 删除当前物品
      lists.splice(index, 1)
    },
    goodListChange (obj) { // 搜索搬往仓库的物品列表
      let url = this.$store.state.houseUrl + 'list/fixedAssets/notClassified' // 查询物品列表
      this.goodListSearch(obj, this, url)
    },
    goodListSearch (obj, _this, url) { // 物品搜索
      obj.goodList = []
      obj.id = ''
      _this.$http.post(url, {
        'fixedAssetStatus': 'NORMAL',
        'fixedAssetsType': obj.goodType,
        'houseSpaceId': _this.houseId,
        'houseSpaceType': 'HOUSE_SPACE'
      }).then(function (res) {
        if (res.data.code === 200) {
          obj.goodList = res.data.data[0].resFixedAssetsBeanList
          obj.id = res.data.data[0].resFixedAssetsBeanList[0].id
          // _this.goodList = res.data.data[0]
          
        }
      })
    },
    submitGoodType () {
      if (this.clickOver) {
        this.clickOver = false
        let url = this.$store.state.houseUrl + 'move/fixedAssets' // 查询物品列表
        let req = {}
        req = this.goodList[0]
        req.fixedAssetsId = req.id
        req.houseSpaceId = this.houseId
        req.toHouseSpaceType = 'WAREHOUSE'
        req.md5 = req.goodList[0].md5
        req.moveNumber = req.goodNumber
        req.fromHouseSpaceId = this.houseId
        req.fromHouseSpaceType = 'HOUSE_SPACE'
        this.$http.post(url, req).then(function (res) {
          if (res.data.code === 200) {
            this.$message({
              message: '搬出成功',
              type: 'success'
            })
            this.$emit('closeGoodAdd', true)
          } else {
            this.$message({
              message: '搬出失败',
              type: 'warning'
            })
          }
          this.clickOver = true
        })
      }
    },
    submitGoodType1 () {
      if (this.clickOver) {
        this.clickOver = false
        let url = this.$store.state.houseUrl + 'move/fixedAssets' // 查询物品列表
        let req = {}
        req = this.goodListToHouse[0]
        req.fixedAssetsId = req.id
        // req.houseSpaceId = this.houseId
        req.toFromHouseSpaceId = req.houseSpaceId
        req.toHouseSpaceType = 'HOUSE_SPACE'
        // req.md5 = req.goodList[0].md5
        req.moveNumber = req.goodNumber
        req.fromHouseSpaceId = this.houseId
        req.fromHouseSpaceType = 'HOUSE_SPACE'
        
        this.$http.post(url, req).then(function (res) {
          if (res.data.code === 200) {
            this.$message({
              message: '搬出成功',
              type: 'success'
            })
            this.$emit('closeGoodAdd', true)
          } else {
            this.$message({
              message: '搬出失败',
              type: 'warning'
            })
          }
          this.clickOver = true
        })
      }
    }
  },
  components: {
    houseUser
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
}
.goodList1{
	position: relative;
	margin-top: 5px;
}
.add{
  position:absolute;
  top:calc(50% - 18px);
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
  top:calc(50% - 18px);
  right:0px;
  width: 16px;
  height: 36px;
  background: url('../../static/img/reduce.png') center center / 16px 16px;
  background-repeat: no-repeat;
  cursor: pointer;
  display: block;
}
.goodList1 .el-form-item{
	margin-bottom: 5px;
	/*margin-top: 5px;*/
}
.goodList2 .el-form-item{
  margin-bottom: 5px;
  /*margin-top: 5px;*/
}
.goodList1{
  padding-top: 15px;
  padding-bottom: 10px;
  margin-top: 0;
  position: relative;
  border-top: 1px dotted #999999;
  padding-top: 0px;
}
.goodList1.firstList{
  margin-top: 10px;
  border-top-width: 0;
}
.goodList1.lastList .reduce{
  display: none;
}
.goodList1.lastList .add{
  display: block;
}
</style>
