<!-- 左侧导航 -->
<template>
    <div>
        <div class="main-left">
          <el-menu :default-active="navselected" class="el-menu-vertical-demo" :router="true">
            <el-menu-item index="/service/repair">维修管理</el-menu-item>
            <el-menu-item index="/service/clean">保洁管理</el-menu-item>
            <!-- <el-menu-item index="/service/maintain">保养管理</el-menu-item> -->
            <!-- <el-menu-item index="/service/lock">智能门锁</el-menu-item>
            <el-menu-item index="/service/electric">智能电表</el-menu-item>
            <el-menu-item index="/service/water">智能水表</el-menu-item> -->
          </el-menu>
        </div>
    </div>
</template>
<script>
export default {
  name: 'leftHouseHead',
  data: function () {
    return {
      active: true,
      navtype: 'horizontal',
      navselected: '/service/repair'
    }
  },
  methods: {
    getNavType () {
      this.navselected = this.$store.state.serviceleftnavnum
    }
  },
  watch: {
    // 监测store.state
    '$store.state.serviceleftnavnum': 'getNavType'
  }
}
</script>
<style scoped>
main .main-left{text-align: center;-webkit-box-flex: 0;-ms-flex: 0 0 200px;flex: 0 0 200px;}
.el-menu-item{
  background-color: #d3dce6;
  border-left: 3px solid #d3dce6;
  transition: all .5s;
}
.el-menu-item:hover{
  background-color: #fff;
  border-color: #20a0ff;
  color: #333;
}
.el-menu-item.is-active{
  background-color: #fff;
  border-color: #20a0ff;
  color: #333;
}

/* 导航栏菜单选中效果 */
.isActive{color: #20a0ff!important;}
 #app main .aside .is-active{color: #475669;}
</style>