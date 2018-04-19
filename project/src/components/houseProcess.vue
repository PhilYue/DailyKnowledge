<template>
	<!-- 步骤条 -->
	<div>
		<div class="el-step is-horizontal" :class="[ { isFinish: tableDatas[0][0].department != ''}, { isFinished: tableDatas[1][0].department != ''} ]">
			<div class="el-step__head is-text is-horizontal">
				<div class="el-step__line">
					<i class="el-step__line-inner"></i>
				</div>
				<span class="el-step__icon">
					<div>1</div>
				</span>
			</div>
			<div class="el-step__main">
				<span v-for="item in tableDatas[0]">
					<div class="el-step__title">{{item.department}} · {{item.posi}}</div>
					<div class="el-step__description">{{item.opinion}}</div>
				</span>
			</div>
		</div>
		<div class="el-step is-horizontal" :class="[ { isFinish: tableDatas[1][0].department != ''}, { isFinished: tableDatas[2][0].department != ''} ]">
			<div class="el-step__head is-text is-horizontal">
				<div class="el-step__line">
					<i class="el-step__line-inner"></i>
				</div>
				<span class="el-step__icon">
					<div>2</div>
				</span>
			</div>
			<div class="el-step__main">
				<span v-for="item in tableDatas[1]">
					<div class="el-step__title">{{item.department}} · {{item.posi}}</div>
					<div class="el-step__description">{{item.opinion}}</div>
				</span>
			</div>
		</div>
		<div class="el-step is-horizontal" :class="{ isFinished: tableDatas[2][0].department != '' }">
			<div class="el-step__head is-text is-horizontal">
				<span class="el-step__icon">
					<div>3</div>
				</span>
			</div>
			<div class="el-step__main">
				<span v-for="item in tableDatas[2]">
					<div class="el-step__title">{{item.department}} · {{item.posi}}</div>
					<div class="el-step__description">{{item.opinion}}</div>
				</span>
			</div>
		</div>
	</div>
</template>
<script>
export default {
  name: 'detail',
  data: function () {
    return {
    }
  },
  props: ['tableDatas']
}
</script>
<style scoped>
/*右侧弹窗*/
.el-step{
	width: 140px; margin-right: 0px;
}
.el-step__line{
	margin-right: 0px;
	width: 100%;
	top: 13px;
	z-index: 0;
}
.el-step__icon{
	position: relative;
	z-index: 1;
}
.el-step__line-inner{
	transition-delay: 0ms; border-width: 1px; width: 0%;
}
.isFinish .el-step__line-inner{
	width: 50%;
}
.isFinished .el-step__line-inner{
	width: 100%;
}
.el-step__main{
	margin-left: 0px;
}
.el-step__main{
	color: #8391a5;
}
.isFinish .el-step__main, .isFinished .el-step__main{
	color: #20a0ff;
}
.el-step__head.is-text{
	color: #fff;
	border-color: #bfcbd9;
	background-color: #bfcbd9;
}
.isFinish .el-step__head.is-text, .isFinished .el-step__head.is-text{
	color: #fff;
	background-color: #20a0ff;
	border-color: #20a0ff;
}
</style>