<template>
<!-- 房源新增物品 -->
  <div name="fade">
    <el-dialog title="物品增配" :visible.sync="show">
      <el-form :inline="true">
        <p style="width:100px; display:inline-block; text-align:right;">来源：</p>
        <el-radio-group v-model="source"  @change="goodSource">
           <el-radio class="radio" :label="1">仓库</el-radio>
          <el-radio class="radio" :label="2">其他房间</el-radio>
          <el-radio class="radio" :label="3">购买</el-radio>
        </el-radio-group>
      </el-form>
      <el-form :inline="true">
        <ul v-if="source === 1">
          <li v-for="(item, index) in goodList" class="goodList1" :class="{firstList: index === 0, lastList: index === goodList.length - 1}">
            <el-form-item label="物品类型:" :label-width="formLabelWidth">
              <el-select v-model="item.fixedAssetsType" @change="goodChange(item)" placeholder="请选择" :style="inputWidth">
                <el-option
                  v-for="option in goodTypeLists"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="物品:" :label-width="formLabelWidth">
              <el-select v-model="item.fixedAssetsId" placeholder="请选择" :style="inputWidth">
                <el-option
                  v-for="option in item.goodList"
                  :key="option.id"
                  :label="option.fixedAssetsName"
                  :value="option.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="数量:" :label-width="formLabelWidth">
              <el-input type="text" v-model="item.fixedAssetsNumber" placeholder="请输入内容" :style="inputWidth"></el-input>
            </el-form-item>
            <!-- <el-form-item label="所有权:" :label-width="formLabelWidth">
              <el-input type="text" v-model="item.ownership" placeholder="请输入内容" :style="inputWidth"></el-input>
            </el-form-item> -->
            <p class="add" @click="addGoodList"></p>
            <p class="reduce" @click="reduceGoodType(goodList, index)"></p>
          </li>
          <div slot="footer" class="dialog-footer">
            <el-button @click="closeGoodAdd">取 消</el-button>
            <el-button type="primary" @click="goodAdd">确 定</el-button>
          </div>
        </ul>
        <ul v-if="source === 2">
          <li v-for="(houseList, index) in formHouseList" class="goodList1" :class="{firstList: index === 0, lastList: index === formHouseList.length - 1}">
            <el-form-item label="详细地址" :label-width="formLabelWidth">
              <el-select v-model="houseList.houseSpaceId" :filterable="remote" :remote="remote" placeholder="请输入关键词" :remote-method="remoteMethod" @change="houseChange(houseList)"  style="width:490px">
                  <el-option
                    v-for="item in restaurants" :key="item.value" :label="item.value" :value="item.houseSpaceManagerId">
                  </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="物品类型:" :label-width="formLabelWidth">
              <el-select v-model="houseList.fixedAssetsType" @change="houseChange(houseList)" placeholder="请选择">
                <el-option
                  v-for="option in goodTypeLists"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="物品:" :label-width="formLabelWidth">
              <el-select v-model="houseList.fixedAssetsId" placeholder="请选择">
                <el-option
                  v-for="option in houseList.goodList"
                  :key="option.id"
                  :label="option.fixedAssetsName"
                  :value="option.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="数量:" :label-width="formLabelWidth">
              <el-input type="text" v-model="houseList.fixedAssetsNumber" placeholder="请输入内容" :style="inputWidth"></el-input>
            </el-form-item>
            <!-- <el-form-item label="所有权:" :label-width="formLabelWidth">
              <el-input type="text" v-model="houseList.ownership" placeholder="请输入内容" :style="inputWidth"></el-input>
            </el-form-item> -->
            <p class="add" @click="addFormHouse"></p>
            <p class="reduce" @click="reduceGoodType(formHouseList, index)"></p>
          </li>
          <div slot="footer" class="dialog-footer">
            <el-button @click="closeGoodAdd">取 消</el-button>
            <el-button type="primary" @click="goodAdd1">确 定</el-button>
          </div>
        </ul>
        <ul v-if="source === 3">
          <li v-for="(item, index) in goodBuyList" class="goodList1" :class="{firstList: index === 0, lastList: index === goodBuyList.length - 1}">
            <el-form-item label="物品类型:" :label-width="formLabelWidth">
              <el-select v-model="item.fixedAssetsType" placeholder="请选择">
                <el-option
                  v-for="option in goodTypeLists"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="物品品牌:" :label-width="formLabelWidth">
              <el-input type="text" v-model="item.brand" placeholder="请输入内容" :style="inputWidth"></el-input>
            </el-form-item>
            <el-form-item label="物品型号:" :label-width="formLabelWidth">
              <el-input type="text" v-model="item.modelNumber" placeholder="请输入内容" :style="inputWidth"></el-input>
            </el-form-item>
            <el-form-item label="物品名称:" :label-width="formLabelWidth">
              <el-input type="text" v-model="item.fixedAssetsName" placeholder="请输入内容" :style="inputWidth"></el-input>
            </el-form-item>
            <el-form-item label="数量:" :label-width="formLabelWidth">
              <el-input type="text" v-model="item.fixedAssetsNumber" placeholder="请输入内容" :style="inputWidth"></el-input>
            </el-form-item>
            <el-form-item label="单价:" :label-width="formLabelWidth">
              <el-input type="text" v-model="item.unitPrice1" placeholder="请输入内容" :style="inputWidth"></el-input>
            </el-form-item>
            <el-form-item label="所有权:" :label-width="formLabelWidth">
              <!-- <el-input type="text" v-model="item.ownership" placeholder="请输入内容" :style="inputWidth"></el-input> -->
              <el-select v-model="item.ownership" placeholder="请选择">
                <el-option key="COMPANY" label="公司" value="COMPANY"></el-option>
                <el-option key="LANDLORD" label="房东" value="LANDLORD"></el-option>
                <el-option key="TENANT" label="租客" value="TENANT"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="保修期:" :label-width="formLabelWidth">
              <el-input type="text" v-model="item.warrantyPeriod1" placeholder="请输入内容" :style="inputWidth"></el-input>
            </el-form-item>
            <el-form-item label="购买日期:" :label-width="formLabelWidth">
               <el-date-picker
                v-model="item.purchasingDate1"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <p class="add" @click="addGoodType(goodBuyList, goodBuy)"></p>
            <p class="reduce" @click="reduceGoodType(goodBuyList, index)"></p>
          </li>
          <div slot="footer" class="dialog-footer">
            <el-button @click="closeGoodAdd">取 消</el-button>
            <el-button type="primary" @click="goodAdd2(goodBuyList)">确 定</el-button>
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
  name: 'form',
  data: function () {
    return {
      inputWidth: 'width:194px;',
      landlord: '房东',
      unit: [], // 小区列表
      restaurants: [],
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
      remote: true,
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
      getGoodList: [], // 物品列表
      // getGoodList: [], // 物品列表
      getHouseGoodList: [], // 物品列表
      state4: '',
      renter: '租客',
      source: 1,
      good: { // 物品初始化
        fixedAssetsType: 'E_METER', // 物品类型
        fixedAssetsId: '', // 物品名
        fixedAssetsNumber: 1, // 数量
        ownership: 'COMPANY' // 所有权
      },
      goodList: [ // 选择的物品列表--仓库
        {
          fixedAssetsType: 'E_METER',
          fixedAssetsId: '',
          fixedAssetsNumber: 1,
          ownership: 'COMPANY',
          goodList: []
        }
      ],
      formHouseList: [ // 选择的物品列表--其他房间
        {
          fixedAssetsType: 'E_METER',
          fixedAssetsId: '',
          fixedAssetsId1: '',
          fixedAssetsNumber: 1,
          block: '',
          unitName: '',
          houseNumber: '',
          unitId: '',
          ownership: 'COMPANY',
          goodList: []
        }
      ],
      formHouse: { // 从其他房间搬入
        fixedAssetsType: 'E_METER',
        fixedAssetsId: '',
        fixedAssetsNumber: 1,
        block: '',
        unitName: '',
        houseNumber: '',
        unitId: '',
        ownership: 'COMPANY' // 所有权
      },
      goodBuyList: [ // 选择的物品列表--新购买物品
        {
          fixedAssetsType: '',
          brand: '',
          fixedAssetsName: '',
          modelNumber: '',
          fixedAssetsNumber: 1,
          goodGuarantee: '',
          unitPrice1: 0,
          unitPrice: 0,
          warrantyPeriod1: '',
          warrantyPeriod: 0,
          purchasingDate1: '',
          purchasingDate: ''
        }
      ],
      goodBuy: {
        fixedAssetsType: '',
        brand: '',
        fixedAssetsName: '',
        modelNumber: '',
        fixedAssetsNumber: 1,
        goodGuarantee: '',
        warrantyPeriod1: '',
        warrantyPeriod: 0,
        purchasingDate1: '',
        purchasingDate: ''
      },
      int: 0,
      formLabelWidth: '90px',
      mix: {
        save: this.$store.state.houseUrl + 'save/fixedAssets', // 新增物品
        move: this.$store.state.houseUrl + 'move/fixedAssets', // 新增物品
        houseList: this.$store.state.houseUrl + 'list/houseSpace', // 房源地址查找
        list: this.$store.state.houseUrl + 'list/fixedAssets/notClassified' // 物品列表
      },
      show: false,
      clickOver: true
    }
  },
  props: ['goodFormShow', 'houseId', 'goodClickCount'],
  mounted () {
    $('.el-dialog--small,.el-dialog--tiny').width(650)
  },
  watch: {
    goodClickCount: function (value) {
      this.source = 1
      this.$options.methods.unitSelect(this)
      this.$options.methods.bgGoodBuyList(this)
      this.$options.methods.bgFormHouse(this)
      this.$options.methods.bgGood(this)
      this.show = this.goodFormShow
      this.clickOver = true
    }
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
    goodAdd () {
      if (this.clickOver) {
        this.clickOver = false
        let list = this.goodList
        let req = {}
        req = list[0].goodList[0]
        req.fixedAssetsId = list[0].fixedAssetsId
        req.moveNumber = list[0].fixedAssetsNumber
        req.fixedAssetsType = list[0].fixedAssetsType
        req.fromHouseSpaceType = 'WAREHOUSE'
        req.toFromHouseSpaceId = this.houseId
        req.toHouseSpaceType = 'HOUSE_SPACE'
        req.inputPersonnelPhone = this.$store.state.currentUser.UserPhone
        this.$http.post(this.mix.move, req).then(function (res) {
          if (res.body.code === 200) {
            this.$message({
              message: '搬入成功',
              type: 'success'
            })
            this.$emit('goodAddSuccess', true)
          } else {
            this.$message({
              message: '搬入失败',
              type: 'warning'
            })
          }
          this.clickOver = true
        })
      }
    },
    goodAdd1 () {
      if (this.clickOver) {
        this.clickOver = false
        let list = {}
        list = this.formHouseList[0]
        // list = this.formHouseList[0].goodList[0]
        list.fromHouseSpaceId = list.houseSpaceId
        list.fromHouseSpaceType = 'HOUSE_SPACE'
        list.md5 = list.goodList[0].md5
        list.moveNumber = list.fixedAssetsNumber
        list.toFromHouseSpaceId = this.houseId
        list.toHouseSpaceType = 'HOUSE_SPACE'
        list.inputPersonnelPhone = this.$store.state.currentUser.UserPhone
        this.$http.post(this.mix.move, list).then(function (res) {
          if (res.body.code === 200) {
            this.$message({
              message: '搬入成功',
              type: 'success'
            })
            this.$emit('goodAddSuccess', true)
          } else {
            this.$message({
              message: '搬入失败',
              type: 'warning'
            })
          }
          this.clickOver = true
        })
      }
    },
    goodAdd2 (list) {
      if (this.clickOver) {
        this.clickOver = false
        for (var i in list) {
          list[i].houseSpaceType = 'HOUSE_SPACE'
          list[i].houseSpaceId = this.houseId
          list[i].unitPrice = list[i].unitPrice1 * 1000
          list[i].warrantyPeriod = list[i].warrantyPeriod1 * 1000
          list[i].inputPersonnelId = this.$store.state.currentUser.uid
          let time = list[i].purchasingDate1
          list[i].purchasingDate = (new Date(time)).getTime() // 得到毫秒数
        }
        this.$http.post(this.mix.save, list).then(function (res) {
          res = res.body
          if (res.code === 200) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.$options.methods.bgGoodBuyList(this)
            this.$emit('goodAddSuccess')
          } else {
            this.$message({
              message: res.message,
              type: 'warning'
            })
          }
          this.clickOver = true
        })
      }
    },
    bgGoodBuyList (_this) { // 初始化goodBuyList
      let gBL = {}
      gBL.fixedAssetsType = ''
      gBL.brand = ''
      gBL.fixedAssetsName = ''
      gBL.modelNumber = ''
      gBL.fixedAssetsNumber = 1
      gBL.goodGuarantee = ''
      gBL.ownership = 'COMPANY'
      gBL.unitPrice1 = 0
      gBL.unitPrice = 0
      gBL.warrantyPeriod1 = 0
      gBL.warrantyPeriod = 0
      gBL.purchasingDate1 = ''
      gBL.purchasingDate = ''
      gBL.goodList = []
      _this.goodBuyList = []
      _this.goodBuyList.push(gBL)
    },
    bgFormHouse (_this) { // 初始化formHouse
      let formHouse = {} // 初始化formHouseList
      formHouse.fixedAssetsType = 'E_METER'
      formHouse.fixedAssetsId = ''
      formHouse.houseSpaceId = ''
      formHouse.houseSpaceId1 = ''
      formHouse.fixedAssetsNumber = 1
      formHouse.block = ''
      formHouse.unitName = ''
      formHouse.houseNumber = ''
      formHouse.unitId = ''
      formHouse.goodList = []
      _this.formHouseList = []
      _this.formHouseList.push(formHouse)
    },
    bgGood (_this) { // goodList
      let good = {}
      let req = {}
      good.fixedAssetsType = 'E_METER'
      good.fixedAssetsId = ''
      good.fixedAssetsNumber = 1
      good.goodList = []

      req.fixedAssetStatus = 'NORMAL'
      req.fixedAssetsType = good.fixedAssetsType
      req.houseSpaceType = 'WAREHOUSE'

      _this.$options.methods.goodSearch(_this, _this.mix.list, req, good)
      _this.goodList = []
      _this.goodList.push(good)
    },
    goodSource (data) {
    },
    goodChange (value) { // 从仓库新增时 改变物品类型
      let req = {}
      req.fixedAssetStatus = 'NORMAL'
      req.fixedAssetsType = value.fixedAssetsType
      req.houseSpaceType = 'WAREHOUSE'
      this.$options.methods.goodSearch(this, this.mix.list, req, value)
    },
    formHouseChange (value) {
      let req = {}
      req.fixedAssetStatus = 'NORMAL'
      req.fixedAssetsType = value.fixedAssetsType
      req.houseSpaceType = value
    },
    goodSearch (_this, url, req, value) {
      value.goodList = []
      value.fixedAssetsId = ''
      _this.$http.post(url, req).then(function (res) {
        if (res.body.code === 200) {
          value.goodList = res.body.data
          value.fixedAssetsId = res.body.data[0].id
        }
      })
    },
    addGoodType (lists, list) { // 新增物品选项
      lists.push(list)
    },
    addGoodList () {
      let good = {}
      let req = {}

      good.fixedAssetsType = 'E_METER'
      good.fixedAssetsId = ''
      good.fixedAssetsNumber = 1
      good.goodList = []

      req.fixedAssetStatus = 'NORMAL'
      req.fixedAssetsType = good.fixedAssetsType
      req.houseSpaceType = 'WAREHOUSE'
      this.$options.methods.goodSearch(this, this.mix.list, req, good)
      this.goodList.push(good)
    },
    addFormHouse () { // 初始化formHouse
      let formHouse = {} // 初始化formHouseList
      formHouse.fixedAssetsType = 'E_METER'
      formHouse.fixedAssetsId = ''
      formHouse.fixedAssetsNumber = 1
      formHouse.block = ''
      formHouse.unitName = ''
      formHouse.houseNumber = ''
      formHouse.unitId = ''
      formHouse.goodList = []
      // this.formHouseList = []
      this.formHouseList.push(formHouse)
    },
    reduceGoodType (lists, index) { // 删除当前物品
      lists.splice(index, 1)
    },
    unitSelect (_this) { // 搜索片区
      let url = _this.$store.state.accountUrl + 'unit/tree/f/area'
      _this.$http.get(url).then(({data}) => {
        // var data1 = data.data.children[0].children
        var data1 = data.data.children
        _this.unit = data1
        _this.formHouse.unitId = _this.unit[0].id
        _this.formHouse.zone = _this.unit[0].text
        _this.formHouseList[0].unitId = _this.unit[0].id
        _this.formHouseList[0].unitName = _this.unit[0].text
      })
    },
    remoteMethod (queryString) { // 小区信
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
            console.log(data.data)
            for (var p in data.data.list) {
              for (var i in data.data.list[p].resHouseSpaceBeanList) {
                let restaurant = {}
                // restaurant.value = data.data.list[p].resHouseSpaceBeanList[i].keywordAddress
                // restaurant.houseSpaceManagerId = data.data.list[p].resHouseSpaceBeanList[i].resHouseSpaceBeanList[0].houseSpaceId
                restaurant.value = data.data.list[p].resHouseSpaceBeanList[i].keywordAddress
                restaurant.houseSpaceManagerId = data.data.list[p].resHouseSpaceBeanList[i].houseSpaceId
                this.restaurants.push(restaurant)
              }
            }
          }
        })
      }
    },
    houseChange (houseList) { // 搜索物品列表
      let req = {}
      req.fixedAssetStatus = 'NORMAL'
      req.houseSpaceType = 'HOUSE_SPACE'
      req.fixedAssetsType = houseList.fixedAssetsType
      req.houseSpaceId = houseList.houseSpaceId
      this.$options.methods.goodSearch(this, this.mix.list, req, houseList)
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
.goodList1{
  padding-top: 15px;
  padding-bottom: 10px;
  margin-top: 0;
  position: relative;
  border-top: 1px dotted #999999;
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
