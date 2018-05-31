<template>
  <div class="houseManager">
    <!-- 右侧主内容区 -->
    <div  class="main-right" >
        <div class='search f-cb'>
          <div class='main-right-search-span'>
            <ul>
              <li v-for='(rent, ind) in searchData' :key="ind" class="searchList">
                <!-- <p :value="rent.value">{{ rent.head }}</p> -->
                <div v-if="ind === 0" style="display:inline-block; width:calc(100% - 100px)"><a v-for='(item, index) in rent.content' :title='item.text' :class='{selectActive: index ==0}' @click="houseSearch(rent.value, item.value)" :value="item.value">{{item.text}}</a></div>
                <div v-if="ind !== 0" style="display:inline-block; width:calc(100% - 100px)"><a v-for='(item, index) in rent.content' :title='item.text' :class='{selectActive: index ==0}' :value="item.value">{{item.text}}</a></div>
              </li>
            </ul>
          </div>
          <div class='main-left-search-span'>
            <el-input placeholder="请输入房东姓名、手机号或房源地址" @keydown.enter.native="houseSearch1" v-model="searchList.input" auto-complete="off" style="width:300px"></el-input>
            <el-button type='primary' @click="houseSearch1">搜索</el-button>
          </div>
      </div>
      <div class="main-right-main">
        
        <div v-if="totlePage > 0" class="conList">
          <trusteeship-item
            v-for="(item, key) in tableData3"
            :key="key"
            :context="item"
            @openAddForm="openAddForm"
            @renewFormShow="openRenewForm()"
            @openUploac="openUploac"
            @depositSure="depositSure"
          />
        </div>

        <h3 v-if="totlePage === 0 && loading !== 0" style="text-align:center">暂无数据</h3>
        <div class="block"  v-if="totlePage > 0">
          <el-pagination class="paging" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage2" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totlePage"></el-pagination>
        </div>
      </div>

      <!-- 租约详情弹窗 -->
      <el-dialog title="托管详情" :visible.sync="dialogFormVisible"  top="10%" width="650px">
        <depositDetail
          :form="houseChange"
          :disabled="disabled"
          :editDepositForm="editDepositForm"
          :formLabelWidth="formLabelWidth"
          @listenToParentEvent="closeForm"
          @submitForm="submitForm"
          @editForm="editDeposit"></depositDetail>
      </el-dialog>
      
      <upload :uploadData="uploadData" :uploadName="uploadName" :urlLists="urlLists" title="附件上传" @uploadSuccess='uploadSuccess' :detailClick="detailClick" typeArr="image/png,image/jpg,image/gif,image/jpeg"></upload>
      <!-- </div> -->

    </div>
  </div>
</template>
<script src="./script.js"></script>

<style scoped>
@import '../../../../static/css/app.css';
/* 主内容区 */
main .main-right{
  padding: 30px; 
}
.rent1-input{
  width: 25%;
}
.main-right-main{
  margin-top: 30px;
}
.main-right-search-span{
  font-size: 13px;
  margin-bottom: 15px;
}
.main-right-search-span a{
  /*margin-left: 10px;*/
  /*display: inline-block;*/
  height: 36px;
  line-height: 36px;
  cursor: pointer;
}
.el-dialog--small{
  width: 650px!important;
}
.el-pagination{
  text-align: right;
  margin-top: 20px;
}
.upload{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  /*display: none;*/
  z-index: 2000;
  background-color: rgba(0,0,0,.3)
}
.houseManager .conList{
  border: 1px solid #e6e6e6;
  /*margin-top: 20px;*/
   margin-top: -35px; 
}
</style>
