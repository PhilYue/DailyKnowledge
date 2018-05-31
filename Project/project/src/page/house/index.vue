房源管理组件

<template>
  <div>
     <common-head></common-head>
     <main>
      <el-row style="width:100%;">
        <el-col :span="2">
          <left-house-head></left-house-head>
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
import LeftHouseHead from '@/components/common/LeftHouseHead'
export default {
  name: 'house',
  data: function () {
    return {
    }
  },
  components: {
    CommonHead,
    LeftHouseHead
  }
}
</script>

<style scoped>
::-webkit-scrollbar {display:none}
::-moz-scrollbar {display:none}
::-ms-scrollbar {display:none}
/* 主内容区 */
main{display: -webkit-box;display: -ms-flexbox;display: flex;  border: solid 30px #e5e9f2;  background-color: #d3dce6;  }
main .main-right{-webkit-box-flex:1;-ms-flex:1;flex:1; background-color: #fff;}
</style>
















