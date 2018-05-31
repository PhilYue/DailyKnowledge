<template>
<!-- 新建房源及修改 -->
	<div>
		<el-form :model="form" :inline="true">
		  <houseUser :form="form.houseLandlordBean" :formLabelWidth="formLabelWidth" :ten="landlord" v-if="form.houseLandlordBean.isTrue"></houseUser>
		  <houseUser :form="form.houseRenter" :formLabelWidth="formLabelWidth" :ten="renter" v-if="form.houseRenter.isTrue"></houseUser>
		  <houseRescoure1 :form="form" :formLabelWidth="formLabelWidth"></houseRescoure1>
		  <el-form-item label="房间面积" :label-width="formLabelWidth">
		    <el-input v-model="form.area" auto-complete="off" style="width:100px"></el-input>
		    <p class="houseSizeP">㎡</p>
		  </el-form-item>
		  <el-form-item label="户型" :label-width="formLabelWidth">
		    <el-select v-model="form.bedroomNumber" style="width:67px">
		      <el-option label="1室" value="1"></el-option>
		      <el-option label="2室" value="2"></el-option>
		      <el-option label="3室" value="3"></el-option>
		      <el-option label="4室" value="4"></el-option>
		      <el-option label="5室" value="5"></el-option>
		      <el-option label="6室" value="6"></el-option>
		    </el-select>
		    <el-select v-model="form.livingRoomNumber" style="width:67px">
		      <el-option label="1厅" value="1"></el-option>
		      <el-option label="2厅" value="2"></el-option>
		      <el-option label="3厅" value="3"></el-option>
		      <el-option label="4厅" value="4"></el-option>
		      <el-option label="5厅" value="5"></el-option>
		      <el-option label="6厅" value="6"></el-option>
		    </el-select>
		    <el-select v-model="form.kitchenNumber" style="width:67px">
		      <el-option label="1厨" value="1"></el-option>
		      <el-option label="2厨" value="2"></el-option>
		      <el-option label="3厨" value="3"></el-option>
		      <el-option label="4厨" value="4"></el-option>
		      <el-option label="5厨" value="5"></el-option>
		      <el-option label="6厨" value="6"></el-option>
		    </el-select>
		    <el-select v-model="form.toiletNumber" style="width:67px">
		      <el-option label="1卫" value="1"></el-option>
		      <el-option label="2卫" value="2"></el-option>
		      <el-option label="3卫" value="3"></el-option>
		      <el-option label="4卫" value="4"></el-option>
		      <el-option label="5卫" value="5"></el-option>
		      <el-option label="6卫" value="6"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="朝向" :label-width="formLabelWidth" label-width="62px">
		    <el-select v-model="form.direction" placeholder="东" style="width:70px">
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
		  <el-form-item label="预定出租价格" :label-width="formLabelWidth">
		    <el-input v-model="form.housePrice" auto-complete="off" style="width:100px"></el-input>
		    <p class="houseSizeP">元</p>
		  </el-form-item>
		  <el-form-item label="房间配备" :label-width="formLabelWidth">
		    <el-checkbox-group v-model="form.houseFeatureEnumList">
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
		  <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
		</div>
	</div>
</template>
<script>
import houseRescoure1 from './houseRescoure1'  //  新建房源
import houseUser from './houseUser'  //  新建房源
export default {
  data: function () {
    return {
      landlord: '房东',
      renter: '租客'
    }
  },
  props: ['form', 'formLabelWidth'],
  mounted () {
    this.show()
  },
  methods: {
    closeForm () {
      this.$emit('listenToParentEvent', true)
    },
    show () {
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