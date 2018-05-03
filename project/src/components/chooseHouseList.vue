<template>
<!-- 房源新增物品 -->
  <div name="fade">
  	  <div>
        <el-checkbox-group v-model="checkedCities1">
          <el-checkbox v-for="list in houseSpaceList" :label="list" :key="list">{{list}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
  </div>
</template>
<script>
import $ from 'jquery'
import houseUser from './houseUser'  //  新建房源
export default {
  data: function () {
    return {
      inputWidth: 'width:194px;',
      landlord: '房东',
      unit: [],
      restaurants: [
        { 'value': '德信晓宸', 'id': '' },
        { 'value': '八方城', 'id': '' },
        { 'value': '德信东望', 'id': '' }
      ],
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
        goodType: '1',
        goodName: '',
        goodNumber: 1
      },
      goodList: [
        {
          goodType: '1',
          goodName: '',
          goodNumber: 1
        }
      ],
      formHouseList: [ // 从其他房间搬入
        {
          goodType: '1',
          goodName: '',
          goodNumber: 1,
          block: '',
          unitName: '',
          houseNumber: ''
        }
      ],
      formHouse: { // 从其他房间搬入
        goodType: '1',
        goodName: '',
        goodNumber: 1,
        block: '',
        unitName: '',
        houseNumber: ''
      },
      goodBuyList: [ // 新购买物品
        {
          goodType: '',
          goodBrand: '',
          goodName: '',
          goodModel: '',
          goodNumber: 1,
          goodGuarantee: ''
        }
      ],
      goodBuy: {
        goodType: '',
        goodBrand: '',
        goodName: '',
        goodModel: '',
        goodNumber: 1,
        goodGuarantee: ''
      },
      int: 0,
      formLabelWidth: '90px'
    }
  },
  props: ['goodFormShow', 'houseId'],
  mounted () {
    $('.el-dialog--small,.el-dialog--tiny').width(650)
  },
  methods: {
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
	text-align: center;
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
.goodList1:first-child{
  margin-top: 10px;
  border-top-width: 0;
}
.goodList1:last-child .reduce{
  display: none;
}
.goodList1:last-child .add{
  display: block;
}
</style>
