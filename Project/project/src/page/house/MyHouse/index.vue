
<style scoped>
@import '../../../../static/css/app.css';
/* 主内容区 */
main .main-right{padding: 30px; }
main{
  border-color: #e5e9f2;
}
.el-dialog--small.el-dialog{
  min-width: 630px!important;
}
.el-pagination{
  text-align: right;
  margin-top: 20px;
}
.house_button{
  margin-bottom: 20px;
}
.search{
  margin-bottom: 0;
}
</style>

<template>
  <div class="houseManager">
    <div  class="main-right yxr-ui" >
      <el-tabs v-model="currentTab" type="card" @tab-click="handleTabClick">
        <el-tab-pane label="合租" name="first">
          <joint-rent v-if="currentTab === 'first'"/>
        </el-tab-pane>
        
        <el-tab-pane label="整租" name="second">
          <entire-rent v-if="currentTab === 'second'" />
        </el-tab-pane>
        
        <el-tab-pane label="集中式整租" name="third">
          <cent-entire-rent v-if="currentTab === 'third'"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import JointRent from './JointRent'
import EntireRent from './EntireRent'
import CentEntireRent from './CentEntireRent'

export default {
  components: {
    JointRent,
    EntireRent,
    CentEntireRent,
  },

  data: function () {
    return {
      currentTab: 'first',
    }
  },

  methods: {
    handleTabClick() { },
  }
}

</script>
