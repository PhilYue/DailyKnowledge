<template>
	<!-- 新建房源及修改的用户信息 -->
	<div>
	  <el-form-item :label="(ten+'姓名')" :data="ten" :label-width="formLabelWidth">
	    <el-input v-model="form.name" :disabled="disabled" auto-complete="off" style="width:80px"></el-input>
	  </el-form-item>
	  <el-form-item :label="ten+'证件'" label-width="80px">
	    <el-select v-model="form.idType.count" :disabled="disabled" placeholder="" style="width:100px">
	      <el-option label="身份证" value="ID"></el-option>
	      <el-option label="护照" value="P"></el-option>
	      <el-option label="驾驶执照" value="DL"></el-option>
	      <el-option label="工商营业执照" value="BL"></el-option>
	    </el-select>
	    <el-input v-model="form.identify" :disabled="disabled" auto-complete="off" style="width:170px"></el-input>
	  </el-form-item>
	  <el-form-item :label="ten+'联系方式'" :label-width="formLabelWidth">
	    <el-input v-model="form.phone" :disabled="disabled" auto-complete="off"></el-input>
	  </el-form-item>
	</div>
</template>
<script>
export default {
  data: function () {
    return {
    }
  },
  props: ['form', 'formLabelWidth', 'ten', 'disabled']
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