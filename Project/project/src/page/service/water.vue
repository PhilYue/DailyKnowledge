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
                <li>欠费</li>
                <li>临近欠费</li>
              </ul>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <p>管家:</p>
              <ul>
                <li>随寓1</li>
                <li>随寓1</li>
                <li>随寓1</li>
              </ul>
            </el-col>
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
            prop="province"
            label="本月已用量"
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
            width="250">
            <template slot-scope="scope">
              <el-button
                size="small" @click="open">短信提醒</el-button>
              <el-button
                size="small" @click="rowClick">断水记录</el-button>
              <el-button
                size="small" @click="open1">停用</el-button>
            </template>
          </el-table-column>
        </el-table>
        <p>本月用水量：11111   本月水费：1111</p>
      </div>

      <!-- 寓小二左弹窗 -->
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
            <li class="active">断水记录</li>
          </ul>
        </div>
        <div class="content show">
          <el-table
            highlight-current-row
            stripe
            :data="tableData"
            border
            style="width: 100%"
            height="250">
            <el-table-column
              sortable
              fixed
              prop="date"
              label="序号"
              width="150">
            </el-table-column>
            <el-table-column
              prop="name"
              label="断电时间"
              width="120">
            </el-table-column>
            <el-table-column
              prop="province"
              label="欠费金额"
              width="120">
            </el-table-column>
            <el-table-column
              prop="city"
              label="缴费时间"
              width="120">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- 寓小二左弹窗结束 -->
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
        address: '已欠费',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '已欠费',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '正常',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '正常',
        zip: 200333
      }],
      tableData: [{
        date: 1,
        name: '2017-09-17',
        province: '10',
        city: '2017-09-18'
      }, {
        date: 1,
        name: '2017-09-17',
        province: '10',
        city: '2017-09-18'
      }, {
        date: 1,
        name: '2017-09-17',
        province: '10',
        city: '2017-09-18'
      }, {
        date: 1,
        name: '2017-09-17',
        province: '10',
        city: '2017-09-18'
      }, {
        date: 1,
        name: '2017-09-17',
        province: '10',
        city: '2017-09-18'
      }]
    }
  },
  methods: {
    open () {
      this.$alert('已发送', '', {
        confirmButtonText: '确认'
        // callback: action => {
        //   this.$message({
        //     type: 'info',
        //     message: '12312'
        //   })
        // }
      })
    },
    open1 () {
      this.$alert('确认停用？', '', {
        confirmButtonText: '确认'
        // callback: action => {
        //   this.$message({
        //     type: 'info',
        //     message: '12312'
        //   })
        // }
      })
    },
    closePanel () {
      $('#left-panel-type-house-info').fadeOut(250)
    },
    rowClick () {
      $('#left-panel-type-house-info').fadeIn(250)
    }
  },
  created () {
    this.$store.state.serviceleftnavnum = '/service/electric'
    this.$store.state.topIndex = '/service/repair'
  }
}
</script>
<style scoped>
@import '../../../static/css/app.css';
/* 主内容区 */
main .main-right{padding: 30px; }
</style>
















