<template>
	<div>
		<div v-for="item in items">
	  		<div v-if="item.type == 'input'" class="f-cb">
	  			<el-col :span="24">
		  			<el-form-item :label="item.label" :label-width="formLabelWidth">
					    <el-input v-model="item.value" auto-complete="off"></el-input>
					</el-form-item>
				    <p class="houseSizeP" v-if="item.model == 'size'">㎡</p>
				    <p class="houseSizeP" v-if="item.model == 'price'">元</p>
				</el-col>
	  		</div>
	  		<div v-else-if="item.type == 'select'" class="f-cb">
	  			<el-col :span="24">
		  			<el-form-item :label="item.label" :label-width="formLabelWidth">
					    <el-select v-model="item.value" placeholder="请选择">
					      <el-option v-for="it in item.option" :label="it.label" :value="it.value" :key="it.value"></el-option>
					    </el-select>
					</el-form-item>
				</el-col>
	  		</div>
	  		<div v-else-if="item.type == 'checkbox'" class="f-cb">
	  			<el-col :span="24">
		  			<el-form-item :label="item.label" :label-width="formLabelWidth">
					    <el-checkbox-group v-model="item.value">
						    <el-checkbox v-for="op in item.option" :label="op" :key="op"></el-checkbox>
						</el-checkbox-group>
					</el-form-item>
				</el-col>
	  		</div>
	  		<div v-else-if="item.type == 'radio'" class="f-cb">
	  			<el-col :span="24">
		  			<el-form-item :label="item.label" :label-width="formLabelWidth">
					    <el-radio class="radio" v-model="item.value" v-for="op in item.option" :label="op.value" :key="op.value">{{op.label}}</el-radio>
					</el-form-item>
				</el-col>
	  		</div>
	  	</div>
  	</div>
</template>
<script>
import $ from 'jquery'
export default {
  name: 'form',
  data: function () {
    return {
      landlord: '房东',
      renter: '租客',
      formLabelWidth: '120px'
    }
  },
  props: ['items'],
  mounted () {
    $('.el-dialog--small,.el-dialog--tiny').width(650)
  },
  methods: {
    closeForm () {
      this.$emit('listenToParentEvent', close)
    },
    submitEdit () {
      console.log(this.form)
      console.log(this.formLabelWidth)
    }
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
	text-align: center;
}
</style>