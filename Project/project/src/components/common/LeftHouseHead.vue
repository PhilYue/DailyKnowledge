<!-- 左侧导航 -->
<template>
    <div>
        <div class="main-left">
          <el-menu :default-active="navselected" class="el-menu-vertical-demo" :router="true">
            <el-menu-item index="/house/house1" style="padding:0; text-lalign:center;">我的房源</el-menu-item>
            <!-- <el-menu-item index="/house/newHouse">收房流程</el-menu-item> -->
            <el-menu-item index="/house/trusteeship" style="padding:0; text-lalign:center;">房东合同</el-menu-item>
            <!-- <el-menu-item index="/house/deposit">房东托管</el-menu-item> -->
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
      navselected: '/house/house1'
    }
  },
  methods: {
    getNavType () {
      this.navselected = this.$store.state.houseleftnavnum
    }
  },
  watch: {
    // 监测store.state
    '$store.state.houseleftnavnum': 'getNavType'
  }
}
</script>
<style scoped>
main .main-left{text-align: center;-webkit-box-flex: 0;-ms-flex: 0 0 200px;flex: 0 0 200px;}
/*main .el-menu{background-color: transparent!important;}*/
.el-menu{
  /*padding-top: 20px;*/
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