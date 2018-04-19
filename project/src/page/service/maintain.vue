<template>
  <div>
    <!-- 右侧主内容区 -->
    <div class="main-right yxr-ui" >
      <div class='search'>
        <div class='main-right-search-span'>
          <ul>
            <li v-for='(rent, ind) in searchData' class="searchList">
              <p :value="rent.value">{{ rent.head }}</p>
              <div v-if="ind === 0" style="display:inline-block; width:calc(100% - 100px);"><a v-for='(item, index) in rent.content' :title='item.text' :class='{selectActive: index ==0}' @click="cleanList(rent.value, item.value)" :value="item.value">{{item.text}}</a></div>
              <div v-if="ind !== 0" style="display:inline-block; width:calc(100% - 100px);"><a v-for='(item, index) in rent.content' :title='item.text' :class='{selectActive: index ==0}' :value="item.value">{{item.text}}</a></div>
            </li>
          </ul>
        </div>
        <el-input placeholder="请输入房源编号或小区" auto-complete="off" style="width:300px" v-model="searchList.keywordAddress"></el-input>
        <el-button type='primary' >搜索</el-button>
      </div>
      <el-button type='primary' @click="repairAdd">新建保养</el-button>
      <div class="cleanBody conList">
        <ul>
          <li class="list-contain-div" v-for="(item, index) in tableData">
            <el-row @click="showDetail(item, index)">
              <el-col :span="1" style="height:55px;"></el-col>
              <el-col :span="3">
                <div class="lin55">
                  <p title="订单编号">{{ item.bussionId }}</p>
                </div>
              </el-col>
              <el-col :span="3">
                <p class="pad8" title="报修人">{{ item.rental }}</p>
                <p class="pad8" title="联系方式">{{ item.phone }}</p>
              </el-col>
              <el-col :span="2"><div class="lin55" title="状态" style="line-height:20px; vertical-align:middle; display:table-cell"><span class="houseSpaceStatus" :value="item.houseSpaceStatus">{{ item.status }}</span></div></el-col>
              <el-col :span="6">
                <p title="地址" class="pad8">{{ item.unitName }} · {{ item.keywordAddress }}</p>
                <p title="时间" class="pad8">{{ item.time }}</p>
              </el-col>
              <el-col :span="4">
                <div class="lin55">
                  <p title="报修说明">{{ item.memo }}</p>
                </div>
              </el-col>
              <el-col :span="2">
                <div class="lin55">
                  <p title="责任归属">{{item.charge}}</p>
                </div>
              </el-col>
              <el-col :span="2">
                <div class="lin55">
              <div class="el-dropdown">
                <span class="el-dropdown-link">
                  操作<i class="el-icon-caret-bottom el-icon--right"></i></span>
                  <ul class="el-dropdown-menu">
                    <li class="el-dropdown-menu__item" @click="showDetail(item, index)">查看详情</li>
                    <li class="el-dropdown-menu__item" @click="feedback(item)">反馈</li>
                    <li class="el-dropdown-menu__item">取消</li>
                  </ul>
              </div>
                </div>
              </el-col>
              <slot></slot>
            </el-row>
            <div class="clean_detail">
              <el-form :inline="true" label-width="120px" :model="dataDetail">
                <el-form-item label="订单编号" :style="detailListwidth">
                  <p>{{dataDetail.bussionId}}</p>
                </el-form-item>
                <el-form-item label="报修人" :style="detailListwidth">
                  <p>{{dataDetail.rental}}</p>
                </el-form-item>
                <el-form-item label="报修人联系方式" :style="detailListwidth">
                  <p>{{dataDetail.phone}}</p>
                </el-form-item>
                <el-form-item label="所属片区" :style="detailListwidth">
                  <p>{{dataDetail.unitName}}</p>
                </el-form-item>
                <el-form-item label="地址" :style="detailListwidth">
                  <p>{{dataDetail.keywordAddress}}</p>
                </el-form-item>
                <el-form-item label="报修说明" :style="detailListwidth">
                  <p>{{dataDetail.memo}}</p>
                </el-form-item>
                <el-form-item label="报修时间" :style="detailListwidth">
                  <p>{{dataDetail.time}}</p>
                </el-form-item>
                <el-form-item label="预计上门时间" :style="detailListwidth">
                  <p>{{dataDetail.time1}}</p>
                </el-form-item>
                <el-form-item label="责任归属" :style="detailListwidth">
                  <p>{{dataDetail.charge}}</p>
                </el-form-item>
              </el-form>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 新建弹窗开始 -->
    <el-dialog title="新增保洁" :visible.sync="cleanAddVisible">
      <cleanAdd @closeForm="closeForm" service="maintain"></cleanAdd>
    </el-dialog>
    <!-- 新建弹窗结束 -->

    <!-- 反馈弹窗开始 -->
    <el-dialog title="维修完成" :visible.sync="feedbackVisible">
      <feedback @closeForm="closeForm" :repairId="repairId"></feedback>
    </el-dialog>
    <!-- 反馈弹窗结束 -->
  </div>
</template>
<script>
import $ from 'jquery'
import cleanAdd from '../../components/cleanAdd'  //  新建维修
import repairOver from '../../components/repairOver'  //  完成维修
import feedback from '../../components/repairFeedback'  //  完成维修
export default {
  name: 'rent',
  data: function () {
    return {
      activeName: 'first',
      searchData: [ // 搜索数据
        {
          head: '房源状态：',
          value: 'houseSpaceStatus',
          content: [
            {
              text: '全部',
              value: null
            },
            {
              text: '空置',
              value: 'RENTABLE'
            },
            {
              text: '已预定',
              value: 'RESERVED'
            },
            {
              text: '已出租',
              value: 'RENTED'
            }
          ]
        },
        {
          head: '片区：',
          value: 'zone',
          content: [
            {
              text: '全部',
              value: null
            },
            {
              text: '随寓',
              value: ''
            },
            {
              text: '北软',
              value: ''
            },
            {
              text: '城东',
              value: ''
            }
          ]
        }
      ],
      searchList: { // 搜索信息
        houseSpaceStatus: null,
        keywordAddress: ''
      },
      labelWidth: '120px',
      detailListwidth: 'width:40%',
      tableData: [ // 保洁列表
        {
          bussionId: 'BR123456',
          unitName: '北软',
          keywordAddress: '1111',
          rental: 'xxx',
          phone: '15155551151',
          time: '2017-7-5',
          memo: 'adsdadsasads',
          status: '待领取',
          charge: '公司'
        },
        {
          bussionId: 'BR123456',
          unitName: '北软',
          keywordAddress: '1111',
          rental: 'xxx',
          phone: '15155551151',
          time: '2017-7-5',
          memo: 'adsdadsasads',
          status: '待领取',
          charge: '公司'
        }
      ],
      dataDetail: {
        bussionId: 'BR123456',
        unitName: '北软',
        keywordAddress: '1111',
        rental: 'xxx',
        phone: '15155551151',
        time: '2017-7-5',
        memo: 'adsdadsasads',
        status: '待领取',
        charge: '公司',
        time1: '2017-7-6'
      },
      int: 0,
      cleanAddVisible: false,
      repairOverVisible: false,
      feedbackVisible: false,
      repairId: ''
    }
  },
  components: {
    cleanAdd, repairOver, feedback
  },
  mounted: function () {
    if (this.int === 0) {
      $('.el-row').click(function (event) {
        let _target = event.target
        if (_target.closest('.list-contain-div .el-dropdown') === null) {
          $(this).next().slideToggle(400)
          $(this).parent().siblings().find('.clean_detail').slideUp(400)
        }
      })
      this.int = 0
    }
  },
  methods: {
    cleanList (value, data) {
    },
    showDetail (data, index) {
      $('.list-contain-div').eq(index).find('.clean_detail').slideToggle(400)
      $('.list-contain-div').eq(index).siblings().find('.clean_detail').slideUp(400)
    },
    closeForm () { // 关闭新增维系弹窗
      this.cleanAddVisible = false // 关闭新建弹窗
      this.repairOverVisible = false
      this.feedbackVisible = false
    },
    repairAdd () { // 打开新增维修弹窗
      this.cleanAddVisible = true
    },
    repairOver (item) { // 打开结束维修弹窗
      this.repairOverVisible = true
      this.repairId = item.repairId
    },
    feedback (item) {
      this.feedbackVisible = true
      this.repairId = item.repairId
    }
  },
  created () {
    this.$store.state.serviceleftnavnum = '/service/maintain'
    this.$store.state.topIndex = '/service/repair'
  }
}
</script>
<style scoped>
/* @import '../../../static/css/style.css'; */
@import '../../../static/css/app.css';
/* 主内容区 */
main .main-right{padding: 30px; }
.el-col .tableP{ float: none; width: 100%; margin-top: 50px; text-align: left; }
.list-contain-div{
  padding: 5px 0 0 0;
  font-size: 13px;
  color: #555;
  border-top:1px solid #eee;
}
.list-contain-div .el-row{
  padding-bottom: 5px;
  cursor: pointer;
}
.list-contain-div:first-child{
  border-top:none;
}
.lin55{
  height: 55px;
  line-height: 55px;
}
.pad8{
  padding: 8.5px 0;
}
.pad9{
  padding: 9px 0;
}
.el-dropdown{
  z-index: 1;
}
.el-dropdown-menu{
  top: 40px;
  transition: all .5s;
  opacity: 0;
  -webkit-opacity: 0;
  display: none;
  z-index: 0;
  background: #fff;
}
.el-dropdown:hover{
  z-index: 2;
  transition: all .5s;
}
.el-dropdown:hover .el-dropdown-menu{
  opacity: 1;
  -webkit-opacity: 1;
  z-index: 2;
  display: block;
}
.houseManager .houseSpaceStatus{
  width: 95px;
}
.pad8{
  padding: 3px 0;
}
.clean_detail{
  border-top: 1px solid #e6e6e6;
  padding: 10px 3%;
  background: #fafdff;
  display: none;
}
.el-form-item{
  margin-bottom: 0;
}
</style>
