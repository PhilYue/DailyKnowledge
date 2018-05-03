<template>
  <div>
     <commonHead></commonHead>
     <main>
      <el-row style="width:100%;">
        <el-col :span="2">
          <leftMenuHead></leftMenuHead>
        </el-col>
        <el-col :span="22">
           <!-- 右侧主内容区 -->
          <div class="main-right" >
              <router-view class="view">
              </router-view>
          </div>
        </el-col>
      </el-row> 
    </main>
  </div>
</template>
<script>
import commonHead from '../components/commonHead'
import leftMenuHead from '../components/leftMenuHead'
export default {
  name: 'menu',
  data: function () {
    return {
    }
  },
  components: {
    commonHead,
    leftMenuHead
  }
}
</script>
<style scoped>
/* 主内容区 */
main{display: -webkit-box;display: -ms-flexbox;display: flex; border: solid 30px #E9ECF1;  background-color: #F9FAFC;  }
main .main-right{-webkit-box-flex:1;-ms-flex:1;flex:1; background-color: #fff;min-height: 800px;}
</style>
















