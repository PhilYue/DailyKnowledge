<!-- 左侧导航 -->
<template>
    <div>
        <div class="main-left">
          <el-menu :default-active="navselected" class="el-menu-vertical-demo" :router="true">
            <el-menu-item index="/menu/menu1">常用菜单</el-menu-item>
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
      navselected: '/menu/menu1'
    }
  },
  methods: {
    getNavType () {
      this.navselected = this.$store.state.menuleftnavnum
    }
  },
  watch: {
    // 监测store.state
    '$store.state.menuleftnavnum': 'getNavType'
  }
}
</script>
<style scoped>
main .main-left{text-align: center;-webkit-box-flex: 0;-ms-flex: 0 0 200px;flex: 0 0 200px;}
main .el-menu{background-color: transparent!important;}
.el-menu-item{
  padding: 0 40px!important;
}
/* 导航栏菜单选中效果 */
.isActive{color: #20a0ff!important;}
 #app main .aside .is-active{color: #475669;}
</style>