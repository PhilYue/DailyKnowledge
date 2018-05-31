<template>
  <div>
      <!-- 右侧主内容区 -->
      <div class="main-right yxr-ui" >
        <div class="search">
          <input type="text" name="" placeholder="请输入小区名、租客名或者租客联系方式">
          <el-row>
            <el-col :span="24">
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <p>状态:</p>
              <ul>
                <li>正常</li>
                <li>异常</li>
              </ul>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <p>片区:</p>
              <ul>
                <li>北软</li>
                <li>随寓</li>
                <li>随寓1</li>
              </ul>
            </el-col>
          </el-row>
        </div>      
        <!-- <el-row>
          <el-col :span="8"><p>营销人员</p><input type="text" name=""></el-col>
          <el-col :span="8"><p>片区</p><select><option>城东</option></select></el-col>
          <el-col :span="8"><input type="submit" value="搜索" name=""></el-col>
        </el-row> -->
        <el-table
          highlight-current-row
          stripe
          :data="tableData3"
          border
          style="width: 100%"
          height="500">
          <el-table-column
            fixed
            type="index"
            label="序号"
            width="75">
          </el-table-column>
          <el-table-column
            prop="name"
            label="房间号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="province"
            label="使用人员"
            width="120">
          </el-table-column>
          <el-table-column
            prop="city"
            label="小区"
            width="120">
          </el-table-column>
          <el-table-column
            prop="address"
            label="状态"
            width="100">
          </el-table-column>
          <el-table-column
            prop=""
            label="操作"
            fixed="right"
            width="150">
            <template slot-scope="scope">
              <el-button
                size="small" @click='open("确认开门？")'>开门</el-button>
              <el-button
                size="small"
                type="danger" @click='open("确认禁用？")'>禁用</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- <div class="houseInfo">
          <el-row>
            <el-col :span="24"><h2>房间详情</h2></el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <p class="infoTit">租客姓名</p>
              <input type="text" class="staffName" value="张三虎" name="">
            </el-col>
            <el-col :span="12">
              <p class="infoTit">租客手机号</p>
              <input type="text" class="staffId" value="123456" name="">
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <p class="infoTit">地址</p>
              <input type="text" class="infoAddress" value="祥园路35号" name="">
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <p class="infoTit">房型</p>
              <input type="text" class="infoCity" value="四室一厅" name="">
            </el-col>
            <el-col :span="12">
              <p class="infoTit">面积</p>
              <input type="text" class="infoSize" value="90" name="">
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <p class="infoTit">价格</p>
              <input type="text" class="infoPrice" value="5000" name="">
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <p class="infoTit">房东姓名</p>
              <input type="text" class="landleName" value="123456" name="">
            </el-col>
            <el-col :span="12">
              <p class="infoTit">房东手机号</p>
              <input type="text" class="landlePhone" value="5000" name="">
            </el-col>
          </el-row>
        </div> -->
      <!-- 寓小二左弹窗 开始 -->
      <div class="left-panel-container yxr-ui animated slideInRight" id="left-panel-type-house-info">
        <div class="container-mask"></div>
        <div class="left-panel" id="left-panel-2-1013519-1278201-0">
          <div class="house-info-left-panel">
            <div class="detail-info">
              <i style="position:absolute;right:40px;color:#5bcecc" class="iconfont icon-editpencil hover-red hand">编辑</i>
              <i class="close-left-panel iconfont icon-del" @click="closePanel"></i>
            </div>
            <div class="row title">
            <div class="col-1-1">
              <h2>德信东望·12栋2单元1201室·C</h2>
            </div>
          </div>
          <div class="categroy bg-gray-2">
          <ul class="filter-list">
            <li class="active">房源信息</li>
            <li>房源信息</li>
          </ul>
        </div>
        <div class="content show">
          <div class="houseInfo">
            <el-row>
              <el-col :span="24"><h2>房间详情</h2></el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <p class="infoTit">租客姓名</p>
                <input type="text" class="staffName" value="张三虎" name="">
              </el-col>
              <el-col :span="12">
                <p class="infoTit">租客手机号</p>
                <input type="text" class="staffId" value="123456" name="">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <p class="infoTit">地址</p>
                <input type="text" class="infoAddress" value="祥园路35号" name="">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <p class="infoTit">房型</p>
                <input type="text" class="infoCity" value="四室一厅" name="">
              </el-col>
              <el-col :span="12">
                <p class="infoTit">面积</p>
                <input type="text" class="infoSize" value="90" name="">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <p class="infoTit">价格</p>
                <input type="text" class="infoPrice" value="5000" name="">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <p class="infoTit">房东姓名</p>
                <input type="text" class="landleName" value="123456" name="">
              </el-col>
              <el-col :span="12">
                <p class="infoTit">房东手机号</p>
                <input type="text" class="landlePhone" value="5000" name="">
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>
      <!-- 寓小二左弹窗 开始 -->
      </div>
    <div class="pop">
      <div class="popBorder">
        <div class="popContent">
          <h2></h2>
          <div class="popList">
            <ul class="f-cb">
              <li>
                <p></p>
              </li>
            </ul>
            <input type="submit" value="确认" name="" @click="close">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  name: 'rent',
  data: function () {
    return {
      activeName: 'first',
      tableData3: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '正常',
        zip: '正常'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '正常',
        zip: '正常'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '异常',
        zip: '异常'
      }]
    }
  },
  methods: {
    open (message) {
      $('.pop li p').text(message)
      $('.pop').fadeIn(250)
      $('.pop').css('display', 'table')
    },
    close () {
      $('.pop').fadeOut(250)
    },
    closePanel () {
      $('#left-panel-type-house-info').fadeOut(250)
    },
    rowClick () {
      $('#left-panel-type-house-info').fadeIn(250)
    }
  },
  created () {
    this.$store.state.serviceleftnavnum = '/service/lock'
    this.$store.state.topIndex = '/service/repair'
  }
}
</script>
<style scoped>
@import '../../../static/css/app.css';
/* 主内容区 */
main .main-right{padding: 30px; }
</style>
















