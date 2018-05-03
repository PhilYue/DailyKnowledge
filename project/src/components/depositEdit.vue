<template>
<!-- 测算流程信息修改弹窗 -->
	<div>
		<el-form :inline="true">
		  <div v-for="items in form" class="form-div">
		  	<h3>{{items.department}}</h3>
		  	<el-tabs v-model="activeName2" type="card">
				<el-tab-pane  v-for="houInf in items.house" :label="houInf.name" :key="houInf.name" :name="houInf.name">
			    	<depositEditList :items="houInf.information"></depositEditList>
			    </el-tab-pane>
			    <!-- <depositEditList :items="houInf.information"></depositEditList> -->
			</el-tabs>
		  </div>
		</el-form>
		<div slot="footer" class="dialog-footer">
		  <el-button @click="closeForm()">取 消</el-button>
		  <el-button type="primary" @click="submitEdit()">确 定</el-button>
		</div>
	</div>
</template>
<script>
import $ from 'jquery'
import houseRescoure1 from './houseRescoure1'  //  新建房源
import houseUser from './houseUser'  //  新建房源
import depositEditList from './depositEditList'  //  新建房源
export default {
  data: function () {
    return {
      landlord: '房东',
      renter: '租客',
      formLabelWidth: '120px',
      activeName2: this.form[0].house[0].name
    }
  },
  props: ['form', 'showData'],
  mounted () {
    $('.el-dialog--small,.el-dialog--tiny').width(650)
  },
  methods: {
    closeForm () {
      this.$emit('listenToParentEvent', false)
    },
    submitEdit () {
      console.log(this.form)
      console.log(this.formLabelWidth)
    }
  },
  components: {
    houseRescoure1, houseUser, depositEditList
  }
}
</script>
<style scoped>
.houseSizeP{
  display: inline-block;
  margin-left: -35px;
  position: relative;
  height: 36px;
  line-height: 36px;
}
span{
	display: block
}
.form-div{
	padding-top: 20px;
	padding-bottom: 20px;
	border-bottom: 1px solid #ebebeb;
}
.el-dialog--small{
	width: 650px;
}
.form-div:first-child{
	padding-top: 0;
}
.form-div:last-child{
	border-width: 0;
}
.dialog-footer{
	text-align: right;
  padding-right: 35px;
}
</style>