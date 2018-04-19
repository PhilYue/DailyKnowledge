<template>
	<!-- 新建房源及修改的房源信息 -->
	<div>
	  <el-form-item label="房源编号" :label-width="formLabelWidth">
	    <el-input v-model="form.houseID" auto-complete="off" style="width:60px" readonly></el-input>
	    <el-input v-model="form.houseID" auto-complete="off" style="width:150px" readonly></el-input>
	  </el-form-item>
	  <el-form-item label="所属片区" :label-width="formLabelWidth">
	    <el-select v-model="form.houseSpaceManagerArea" placeholder="片区" style="width:100px">
	      <el-option label="城北片区" value="城北片区"></el-option>
	      <el-option label="城东片区" value="城东片区"></el-option>
	    </el-select>
	  </el-form-item>
	  <el-form-item label="地址" :label-width="formLabelWidth">
	    <!-- <el-input v-model="form.blockName" auto-complete="off" placeholder="小区名" style="width:105px"></el-input> -->
        <el-select v-model="value8" class="rent1-input hide" filterable placeholder="小区名" style="width:105px;">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
		<el-input v-model="form.buildingNo" auto-complete="off" style="width:40px"></el-input>栋 
		<el-input v-model="form.unitNo" auto-complete="off" style="width:40px"></el-input>单元 
		<el-input v-model="form.roomNo" auto-complete="off" style="width:40px"></el-input>号 
	  </el-form-item>
	</div>
</template>
<script>
export default {
  name: 'form',
  data: function () {
    return {
      options: [
        {
          value: '选项1',
          label: '德信晓宸'
        }, {
          value: '选项2',
          label: '八方城'
        }, {
          value: '选项3',
          label: '桂花城'
        }
      ],
      value8: ''
    }
  },
  props: ['form', 'formLabelWidth']
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
</style>