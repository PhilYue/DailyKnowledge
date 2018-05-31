<!-- 左侧导航 -->
<template>
    <div>
        <div class="main-left">
          <el-menu :default-active="navselected" class="el-menu-vertical-demo" :router="true">
            <el-menu-item index="/table/accountReceivable">预期账单</el-menu-item>
          </el-menu>
        </div>
    </div>
</template>
<script>
export default {
  name: 'leftTableHead',
  data: function () {
    return {
      active: true,
      navtype: 'horizontal',
      navselected: '/rent/accountReceivable'
    }
  },
  methods: {
    getNavType () {
      this.navselected = this.$store.state.adminleftnavnum
    }
  },
  watch: {
    // 监测store.state
    '$store.state.adminleftnavnum': 'getNavType'
  }
}
</script>
<style scoped>
main .main-left{
  text-align: center;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 200px;
  flex: 0 0 200px;
}
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