<template>
  <div>
     <commonHead></commonHead>
     <main :style="heigh">
      <el-row style="width:100%;">
        <el-col :span="2">
          <leftRentHead></leftRentHead>
        </el-col>
        <el-col :span="22">
          <!-- 右侧主内容区 -->
          <div class="main-right" :style="heigh">
              <router-view class="view">
              </router-view>
          </div>
        </el-col>
      </el-row> 
    </main>
  </div>
</template>
<script>
import $ from 'jquery'
import commonHead from '../components/commonHead'
import leftRentHead from '../components/leftRentHead'
const height1 = $(window).height() - 121
export default {
  name: 'rent',
  data: function () {
    return {
      heigh: {
        height: height1 + 'px'
      }
    }
  },
  components: {
    commonHead,
    leftRentHead
  }
}
</script>
<style scoped>
::-webkit-scrollbar {display:none}
::-moz-scrollbar {display:none}
::-ms-scrollbar {display:none}
/* 主内容区 */
main{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;  
  background-color: #d3dce6;  
  overflow-y: auto;
  border: solid 30px #E9ECF1;
}
main .main-right{
  -webkit-box-flex:1;
  -ms-flex:1;
  flex:1; 
  background-color: #fff;
  overflow-y: auto;
}
</style>
















