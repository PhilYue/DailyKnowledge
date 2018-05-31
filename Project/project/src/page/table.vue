<template>
  <div>
     <common-head></common-head>
     <main :style="heigh">
      <el-row style="width:100%;">
        <el-col :span="2">
          <left-table-head></left-table-head>
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
import CommonHead from '@/components/common/CommonHead'
import LeftTableHead from '@/components/common/LeftTableHead'
const height1 = $(window).height() - 121
export default {
  data: function () {
    return {
      heigh: {
        height: height1 + 'px'
      }
    }
  },
  components: {
    CommonHead,
    LeftTableHead
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
















