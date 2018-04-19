<template>
<!-- 新建房源及修改 -->
	<div>
		<el-form :model="form" :inline="true">
		  <el-form-item label="房东姓名" :label-width="formLabelWidth">
		    <!-- <el-input v-model="form.userName"  auto-complete="off"></el-input> -->
		    <el-autocomplete class="inline-input" v-model="form.landlordName" :fetch-suggestions="userQuerySearch" placeholder="请输入内容" @select="userSelect" :disabled="true"></el-autocomplete>
		  </el-form-item>
		  <el-form-item label="房东联系方式" :label-width="formLabelWidth">
		    <el-input v-model="form.landlordPhone" auto-complete="off" :disabled="true"></el-input>
		  </el-form-item>
		  <el-form-item label="房源编号" :label-width="formLabelWidth">
		    <el-input v-model="form.businessId" :disabled="true" auto-complete="off" style="width:169px" readonly></el-input>
		  </el-form-item>
		  <el-form-item label="所属片区" :label-width="formLabelWidth">
		    <el-select v-model="form.zoneId" style="width:169px" :disabled="disabled" @change="unitChange">
		      <el-option v-for="item in unit" :label="item.text" :value="item.id" :key="item.text"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="地址" :label-width="formLabelWidth">
	      <el-autocomplete class="inline-input" :disabled="disabled" v-model="form.blockName" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
	  		<el-input v-model="form.buildingNo" :disabled="disabled" auto-complete="off" style="width:40px"></el-input>栋
	  		<el-input v-model="form.unitNo" :disabled="disabled" auto-complete="off" style="width:40px"></el-input>单元
	  		<el-input v-model="form.roomNo" :disabled="disabled" auto-complete="off" style="width:80px"></el-input>号
		  </el-form-item>
		  <el-form-item label="房间面积" :disabled="disabled" :label-width="formLabelWidth" v-if="rentType === 'join'">
		    <el-input v-model="form.houseSpaceArea1" auto-complete="off" style="width:100px"></el-input>
		    <p class="houseSizeP">㎡</p>
		  </el-form-item>
      <el-form-item label="房间面积" :disabled="disabled" :label-width="formLabelWidth" v-if="rentType === 'entir'">
        <el-input v-model="form.houseSpaceManagerArea1" auto-complete="off" style="width:100px"></el-input>
        <p class="houseSizeP">㎡</p>
      </el-form-item>
		  <el-form-item label="户型" :label-width="formLabelWidth">
		    <el-select v-model="form.bedroomNumber1" :disabled="disabled" style="width:67px">
		      <el-option label="1室" value="1"></el-option>
		      <el-option label="2室" value="2"></el-option>
		      <el-option label="3室" value="3"></el-option>
		      <el-option label="4室" value="4"></el-option>
		      <el-option label="5室" value="5"></el-option>
		      <el-option label="6室" value="6"></el-option>
		    </el-select>
		    <el-select v-model="form.livingRoomNumber1" :disabled="disabled" style="width:67px">
		      <el-option label="1厅" value="1"></el-option>
		      <el-option label="2厅" value="2"></el-option>
		      <el-option label="3厅" value="3"></el-option>
		      <el-option label="4厅" value="4"></el-option>
		      <el-option label="5厅" value="5"></el-option>
		      <el-option label="6厅" value="6"></el-option>
		    </el-select>
		    <el-select v-model="form.kitchenNumber1" :disabled="disabled" style="width:67px">
		      <el-option label="1厨" value="1"></el-option>
		      <el-option label="2厨" value="2"></el-option>
		      <el-option label="3厨" value="3"></el-option>
		      <el-option label="4厨" value="4"></el-option>
		      <el-option label="5厨" value="5"></el-option>
		      <el-option label="6厨" value="6"></el-option>
		    </el-select>
		    <el-select v-model="form.toiletNumber1" :disabled="disabled" style="width:67px">
		      <el-option label="1卫" value="1"></el-option>
		      <el-option label="2卫" value="2"></el-option>
		      <el-option label="3卫" value="3"></el-option>
		      <el-option label="4卫" value="4"></el-option>
		      <el-option label="5卫" value="5"></el-option>
		      <el-option label="6卫" value="6"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="朝向" :label-width="formLabelWidth" :disabled="disabled" label-width="62px">
		    <el-select v-model="form.direction" placeholder="东" style="width:90px">
		      <el-option label="东" value="EAST"></el-option>
		      <el-option label="南" value="SOUTH"></el-option>
		      <el-option label="西" value="WEST"></el-option>
		      <el-option label="北" value="NORTH"></el-option>
		      <el-option label="东南" value="SOUTHEAST"></el-option>
		      <el-option label="东北" value="NORTHEAST"></el-option>
		      <el-option label="西南" value="SOUTHWEST"></el-option>
		      <el-option label="西北" value="NORTHWEST"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="预定收房价格" :label-width="formLabelWidth" v-if="houseType === 'rent'">
		    <el-input v-model="form.getPrice1" auto-complete="off" style="width:100px"></el-input>
		    <p class="houseSizeP">元</p>
		  </el-form-item>
      <el-form-item label="预定出租价格" :label-width="formLabelWidth" v-if="houseType === 'get'">
        <el-input v-model="form.rentalPrice1" auto-complete="off" style="width:100px"></el-input>
        <p class="houseSizeP">元</p>
      </el-form-item>
		  <el-form-item label="房间配备" :label-width="formLabelWidth">
		    <el-checkbox-group v-model="form.houseSpaceFeatureList">
			    <el-checkbox label="WIFI" value="WIFI">WIFI</el-checkbox>
			    <el-checkbox label="PARK" value="PARK">停车位</el-checkbox>
			    <el-checkbox label="FACE_SOUTH" value="FACE_SOUTH">朝南</el-checkbox>
			    <el-checkbox label="PRIVATE_TOILET" value="PRIVATE_TOILET">独卫</el-checkbox>
			    <el-checkbox label="DUAL_BALCONY" value="DUAL_BALCONY">双阳台</el-checkbox>
			</el-checkbox-group>
		  </el-form-item>
		  <el-form-item label="房间描述" :label-width="formLabelWidth">
		    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.houseSpaceDescribe" style="width:444px;"></el-input>
		  </el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
		  <el-button @click="closeForm()">取 消</el-button>
		  <el-button type="primary" @click="submitEdit">修 改</el-button>
		</div>
	</div>
</template>
<script>
import $ from 'jquery'
import houseUser from './houseUser'  //  新建房源
export default {
  name: 'form',
  beforeCreate: function () {
    // var uesrApi = this.$store.state.accountUrl + 'user/list' // 房东
    // 搜索小区
    let treeArea = this.$store.state.accountUrl + 'unit/tree/f/area'
    // var dataList = {}
    // dataList.userType = 'P'
    // 片区搜索
    this.$options.methods.unitSelect(this, treeArea)
    // 搜索房东
    // this.$options.methods.landlordSearch(this, uesrApi, dataList)
  },
  data: function () {
    return {
      landlord: '房东',
      unit: [],
      restaurants: [
        { 'value': '德信晓宸', 'id': '' },
        { 'value': '八方城', 'id': '' },
        { 'value': '德信东望', 'id': '' }
      ],
      renter: '租客',
      form: {},
      int: 0,
      zone: {}
    }
  },
  props: ['houseId', 'formLabelWidth', 'disabled', 'mix', 'editClick', 'houseType', 'rentType'],
  mounted () {
    this.form.houseFeatureEnumList = []
    $('.el-dialog--small,.el-dialog--tiny').width(650)
  },
  beforeUpdate () {
    if (this.int === 0) {
      let url = this.mix.houseDetailUrl
      let houseSpaceId = {}
      houseSpaceId.houseSpaceId = this.houseId
      this.$http.post(url, houseSpaceId).then(({data}) => {
        if (data.code === 200) {
          this.directionChange(data.data)
          this.form = data.data
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
  watch: {
    editClick: function () {
      let url = this.mix.houseDetailUrl
      let houseSpaceId = {}
      houseSpaceId.houseSpaceId = this.houseId
      this.$http.post(url, houseSpaceId).then(({data}) => {
        if (data.code === 200) {
          this.directionChange(data.data)
          this.form = data.data
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
    closeForm () {
      this.$emit('listenToParentEvent', true)
    },
    submitEdit () { // 提交按钮
      // this.houseEdit.houseSpaceId = this.houseEdit.roomBeanList[0].id
      this.form.houseSpaceManagerArea = this.form.houseSpaceManagerArea1 * 1000
      this.form.houseSpaceArea = this.form.houseSpaceArea1 * 1000
      this.form.getPrice = this.form.getPrice1 * 1000
      this.form.rentalPrice = this.form.rentalPrice1 * 1000
      this.form.bedroomNumber = parseInt(this.form.bedroomNumber1)
      this.form.kitchenNumber = parseInt(this.form.kitchenNumber1)
      this.form.livingRoomNumber = parseInt(this.form.livingRoomNumber1)
      this.form.toiletNumber = parseInt(this.form.toiletNumber1)
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
          // this.$emit('submitEdit', false)
        }
      })
    },
    userQuerySearch (queryString, cb) { // 房东信息
      var restaurants = this.landlordList
      var results = queryString ? restaurants.filter(this.userFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    userFilter (queryString) { // 房东信息
      return (restaurant) => {
        return (restaurant.value.indexOf(queryString.toLowerCase()) === 0)
      }
    },
    userSelect (item) { // 选择房东信息
      // console.log(item)
      this.form.phone = item.phone
      this.form.userId = item.id
      this.form.sex = item.sex
    },
    querySearch (queryString, cb) { // 搜索小区信息
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) { // 搜索小区信息
      return (restaurant) => {
        return (restaurant.value.indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect (item) { // 搜索小区信息
    },
    landlordSearch (_this, userUrl, dataList) { // 搜索房东信息
      _this.$http.post(userUrl, dataList).then(({data}) => {
        var data1 = data.data.list
        var op = {}
        var option = []
        for (var i = 0; i < data1.length; i++) {
          if (data1[i].username === '' || data1[i].username === null || typeof (data1[i].username) === 'undefined') {
          } else {
            op = {}
            op.id = data1[i].id
            op.phone = data1[i].phone
            op.sex = data1[i].sex
            op.value = data1[i].username
            option.push(op)
          }
        }
        _this.landlordList = option
      })
    },
    unitSelect (_this, userUrl) { // 搜索小区
      _this.$http.get(userUrl).then(({data}) => {
        var data1 = data.data.children
        _this.unit = data1
        _this.form.zone = _this.unit[0].text
        _this.form.zoneId = _this.unit[0].id
        _this.zone = _this.unit
        console.log(_this.unit)
      })
    },
    unitChange (value) {
      for (let i in this.zone) {
        if (this.zone[i].id === value) {
          this.form.zone = this.zone[i].text
        }
      }
      console.log(this.form)
    },
    directionChange (data) { // 解析房源朝向
      switch (data.decorateType) {
        case 'R':
          data.decorateType1 = '毛坯房'
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
        case 'IN_ASSESS':
          data.houseSpaceStatus1 = '评估中'
          break
        case 'CHECK_PASS':
          data.houseSpaceStatus1 = '审核通过'
          break
        case 'IN_SIGN_TRUSTEESHIP_CONTRACT':
          data.houseSpaceStatus1 = '签订托管合同中'
          break
        case 'IN_TRUST_CONTRACT_NOT_TAKE_EFFECT':
          data.houseSpaceStatus1 = '托管合同未生效'
          break
        case 'IN_TRUST_CONTRACT_TAKE_EFFECT':
          data.houseSpaceStatus1 = '托管合同已生效'
          break
        case 'IN_DESIGN':
          data.houseSpaceStatus1 = '设计中'
          break
        case 'IN_CONSTRUCTION':
          data.houseSpaceStatus1 = '施工中'
          break
        case 'IN_CHECK':
          data.houseSpaceStatus1 = '验收中'
          break
        case 'RESERVE':
          data.houseSpaceStatus1 = '保留'
          break
        case 'RENTABLE':
          data.houseSpaceStatus1 = '空置'
          break
        case 'IN_BOOK':
          data.houseSpaceStatus1 = '已预定'
          break
        case 'IN_SIGN_LEASE_CONTRACT':
          data.houseSpaceStatus1 = '签订租赁合同中'
          break
        case 'IN_RENT':
          data.houseSpaceStatus1 = '已出租'
          break
        case 'IN_FROZEN':
          data.houseSpaceStatus1 = '已冻结'
          break
        case 'DELETED':
          data.houseSpaceStatus1 = '已删除'
          break
      }
      if (data.bedroomNumber) {
        data.bedroomNumber1 = data.bedroomNumber.toString()
      }
      if (data.kitchenNumber) {
        data.kitchenNumber1 = data.kitchenNumber.toString()
      }
      if (data.livingRoomNumber) {
        data.livingRoomNumber1 = data.livingRoomNumber.toString()
      }
      if (data.toiletNumber) {
        data.toiletNumber1 = data.toiletNumber.toString()
      }
      data.houseSpaceManagerArea1 = data.houseSpaceManagerArea / 1000
      data.houseSpaceArea1 = data.houseSpaceArea / 1000
      data.getPrice1 = data.getPrice / 1000
      console.log(data)
      data.rentalPrice1 = data.rentalPrice / 1000
      return data
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
  padding-right: 35px;
}
</style>
