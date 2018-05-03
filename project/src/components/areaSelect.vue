<template>
  <div>
    <div class="areaSelect">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item v-for="(item, index) in areaData" key="index" @click.native="select(item.id, item.name, index)">{{item.name}}</el-breadcrumb-item>
  	  </el-breadcrumb>
    </div>
  	<div class="areaSelect">
      <span v-if="selectData" class="select-span">区域:</span>
      <span class="select-span" v-for="(item, index) in selectData" :key="index" @click="select2(item.id, item.name, index)">{{item.name}}</span>
  	</div>
  </div>
</template>
<script>
export default {
  name: 'areaSelect',
  data: function () {
    return {
      selectData: ''
    }
  },
  methods: {
    select: function (id, name, index) {
      this.$http.get(this.$store.state.accountUrl + 'unit/child/' + id, {
      }).then(function (response) {
        var data = response.data
        this.selectData = data.data
        this.areaData.push({
          id: id,
          name: name
        })
        this.areaData.splice(index + 1)
        this.$emit('sendUnitId', id)
      }, function (response) {
        console.log(response.status)
      })
    },
    select2: function (id, name, index) {
      this.$http.get(this.$store.state.accountUrl + 'unit/child/' + id, {
      }).then(function (response) {
        var data = response.data
        this.selectData = data.data
        this.areaData.push({
          id: id,
          name: name
        })
        this.$emit('sendUnitId', id)
      }, function (response) {
        console.log(response.status)
      })
    }
  },
  props: ['areaData'],
  created: function () {
  }
}
</script>
<style scoped>
.areaSelect{
  flex-direction: row;
}
.select-span{
	position: relative;
	top: 20px;
	margin-right: 10px;
  font-size: 13px;
  line-height: 1;
  color: #48576a;
  cursor: pointer;
}
.select-span:hover{
  color: #20a0ff;
}
.el-breadcrumb{
  margin-top: 10px;
}
.el-breadcrumb .el-breadcrumb__item:last-child span{
  color: #20a0ff!important;
}
</style>

