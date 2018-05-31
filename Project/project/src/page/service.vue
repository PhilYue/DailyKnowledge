<template>
  <div>
     <common-head></common-head>
     <main>
      <el-row style="width:100%;">
        <el-col :span="2">
          <left-service-head></left-service-head>
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
import CommonHead from '@/components/common/CommonHead'
import LeftServiceHead from '@/components/common/LeftServiceHead'
export default {
  name: 'menu',
  data: function () {
    return {
    }
  },
  components: {
    CommonHead,
    LeftServiceHead
  }
}
</script>
<style scoped>
::-webkit-scrollbar {display:none}
::-moz-scrollbar {display:none}
::-ms-scrollbar {display:none}
/* 主内容区 */
main{display: -webkit-box;display: -ms-flexbox;display: flex;border: solid 30px #E9ECF1;  background-color: #d3dce6;  }
main .main-right{-webkit-box-flex:1;-ms-flex:1;flex:1; background-color: #fff;}
</style>
















