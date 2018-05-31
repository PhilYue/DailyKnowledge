区域选择

<template>
  <div>
    <div class="areaSelect">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item @click.native="handleClick(rootId)">随寓</el-breadcrumb-item>
        <el-breadcrumb-item
          v-for="(item, index) in selectedData"
          :key="index"
          @click.native="handleClick(item.id)">{{item.name}}</el-breadcrumb-item>
  	  </el-breadcrumb>
    </div>

  	<div v-if="choices.length" class="areaSelect">
      <span class="select-span">区域:</span>
      <span
        class="select-span"
        v-for="(item, index) in choices"
        :key="index"
        @click="select(item.id)">{{item.name}}</span>
  	</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rootId: null,
      
      selectedData: [],
      choices: []
    }
  },

  created () {
    this.rootId = '3e2fe4faa399476786dda82bde78052c'
  },

  methods: {
    select (id) {
      const find = this.choices.find(item => item.id === id)
      if (find) {
        this.selectedData.push(find)
      }

      this.$emit('select', id)
      this.loadChoicesById(id)
    },
    
    handleClick (id) {
      const index = this.selectedData.findIndex(item => item.id === id)
      const rightEnd = this.selectedData.length - 1

      if (index === -1) {
        // 点击了root
        this.selectedData = []
      } else if (index > -1 && index < rightEnd) {
        this.selectedData.splice(index + 1, this.selectedData.length)
      } else if (index === rightEnd) {
        // ignore
        // 不重新加载选项
        return
      }

      this.$emit('select', id)      
      this.loadChoicesById(id)
    },

    loadChoicesById (id) {
      const url = this.urljoin(this.urlList.account, 'unit/child', id)
      this.$http.get(url).then(res => {
        if (res.body.code === 200) {
          this.choices = res.body.data
        } else {
          // silent
          // this.$message.error(res.body.message)
          this.choices = []
        }
      })
    },
  },
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
