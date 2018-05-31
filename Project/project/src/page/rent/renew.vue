<template>
  <div>
      <!-- 右侧主内容区 -->
      <div class="main-right" >
      <!-- 头部搜索和筛选 -->
        <div class="main-right-search">
          <div class="main-right-search-span">
            <a v-for="rent in rents" :class="{selectActive: activeName == rent}" @click="selected(rent)">{{rent}}</a>
          </div>
          <div class="fr search-cont">
            <el-input @keydown.enter.native="search()" class="rent1-input" v-model="input" placeholder="租客手机号,租客姓名,房源信息"></el-input>
            <el-button type="primary" @click="search()">搜索</el-button>
          </div>
          <!-- 公共片区筛选组件 -->
          <area-select @sendUnitId="getUnitId" :areaData="areaData"></area-select>
        </div>
        <!-- 列表主内容 -->
        <div class="main-right-main">
          <div class="list-contain">
            <div class="list-contain-main">
            <!-- 列表组件 -->
              <lease-list :listData="listData">
                <template slot-scope="props" class="pad9">
                  <el-col :span="2" class="pad9">
                  <!-- 续租待确认显示的按钮 -->
                    <el-dropdown v-if="listData[props.index].leaseStatus === 'WARENEWAL'" menu-align="start">
                      <el-button>
                        <span>操作</span>
                        <i class="el-icon-caret-bottom el-icon--right"></i>
                      </el-button>
                      <el-dropdown-menu slot="dropdown">
                        <!-- <el-dropdown-item @click.native="confirm(props)">确定</el-dropdown-item> -->
                         <el-dropdown-item v-if="!isGudong" @click.native="openMoney(props)">录入费用</el-dropdown-item>
                         <!-- <el-dropdown-item @click.native="cancel(props)">驳回申请</el-dropdown-item> -->
                         <el-dropdown-item v-if="!isGudong" @click.native="openList(props)">欠费账单</el-dropdown-item>
                         <el-dropdown-item @click.native="openDetail(props)">详情</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                    <!-- 续租费用未结清显示的按钮 -->
                    <el-dropdown v-else menu-align="start">
                      <el-button>
                        <span>操作</span>
                        <i class="el-icon-caret-bottom el-icon--right"></i>
                      </el-button>
                      <el-dropdown-menu slot="dropdown">
                        <!-- <el-dropdown-item @click.native="cancel(props)">驳回申请</el-dropdown-item> -->
                        <el-dropdown-item v-if="!isGudong" @click.native="openMoney(props)">录入费用</el-dropdown-item>
                        <el-dropdown-item v-if="!isGudong" @click.native="openList(props)">欠费账单</el-dropdown-item>
                        <el-dropdown-item @click.native="openDetail(props)">详情</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                </template>
              </lease-list>
            </div>
          </div>
          <h3 class="noData" v-show="noData">暂无数据</h3>
          <div class="paging">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="cur_page"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalCount">
            </el-pagination>
          </div>
          <!-- 详情子组件 -->
          <lease-detail :detailShow="detailShow" :leaseId="leaseId"></lease-detail>
          <!-- 录入金额 -->
          <record-money :recordMoneyShow="recordMoneyShow" :recordMoneyData="recordMoneyData"></record-money>
          <!-- 合并费用 -->
          <merge :mergeShow="mergeShow" :mergeId="mergeId"></merge>
        </div>
      </div>
  </div>
</template>
<script>
// 列表组件
import LeaseList from '@/components/rent/LeaseList'
import LeaseDetail from '@/components/rent/LeaseDetail'
// import $ from 'jquery'
// 录入金额的组件
import RecordMoney from '@/components/rent/RecordMoney'
import AreaSelect from '@/components/common/AreaSelect'  // 公共片区筛选组件
// 合并费用的组件
import Merge from '@/components/rent/Merge'
export default {
  name: 'renew',  // 续租管理页面
  data: function () {
    return {
      // 城市筛选data
      areaData: [],
      // 暂无数据
      noData: false,
      // 未结清费用数据
      mergeShow: {
        show: false
      },
      mergeId: '',
      isGudong: this.$store.state.currentUser.isGudong,
      // 续租数据
      rents: ['全部', '续租待确认', '续租已确认', '已续租'],
      activeName: '全部',
      input: '',
      // 列表数据
      listData: [],
      leaseId: '',
      detailShow: {
        show: false
      },
      // 搜索条件
      bean: '',
      // 默认每页数据量
      pagesize: 10,
      // 当前页码
      cur_page: 1,
      // 默认数据总数
      totalCount: 0,
      // 录入金额
      recordMoneyShow: {
        show: false
      },
      recordMoneyData: {}
    }
  },
  methods: {
    // 取消申请
    cancel (props) {
      this.$confirm('是否确定驳回申请?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: (action, instance) => {
          if (action === 'confirm') {
            // 改变状态为出租中
            this.$http.post(this.$store.state.rentUrl + 'lease/flowUpdateLease', {
              id: this.listData[props.index].id,
              leaseStatus: 'RENTING',
              loginId: this.$store.state.currentUser.uid
            }).then(function (response) {
              var data = response.data
              if (data.code === 200) {
                this.loadData(this.bean)
              }
            }, function (response) {
              console.log(response.status)
            })
          }
        }
      })
    },
    // 头部搜索
    search () {
      let r = /^\+?[1-9][0-9]*$/ // 正整数
      let s = /0\d{3}-\d{7,8}/
      if (r.test(this.input) && this.input.length === 11 || s.test(this.input) && this.input.length === 13) {
        this.bean.userPhone = this.input
        this.bean.keyWord = null
      } else {
        this.bean.keyWord = this.input
        this.bean.userPhone = null
      }
      this.bean.loginId = this.$store.state.currentUser.uid
      this.loadData(this.bean)
    },
    getUnitId: function (data) {
      this.bean.zoneId = data
      this.loadData(this.bean)
    },
    // 加载第一次城市筛选
    loadFirst: function (e) {
      this.areaData.push({
        id: '3e2fe4faa399476786dda82bde78052c',
        name: '随寓'
      })
    },
    // 同级选中,根据状态筛选
    selected (rent) {
      this.activeName = rent
      if (rent === '全部') {
        this.bean.leaseStatus = 'RENEWAL'
      } else if (rent === '续租待确认') {
        this.bean.leaseStatus = 'WARENEWAL'
      } else if (rent === '续租已确认') {
        this.bean.leaseStatus = 'ALRENEWAL'
      } else if (rent === '已续租') {
        this.bean.leaseStatus = 'REND'
      }
      this.loadData(this.bean)
    },
    // 当前页码改变触发
    handleCurrentChange (val) {
      this.bean.pageNo = val
      this.cur_page = val
      this.loadData(this.bean)
    },
    // 每页条数变化触发
    handleSizeChange (val) {
      this.pagesize = val
      this.bean.pageSize = val
      this.loadData(this.bean)
    },
    // 获取列表数据
    loadData: function (bean) {
      this.$http.post(this.$store.state.rentUrl + 'lease/list',
        bean
      ).then(function (response) {
        var data = response.data
        if (data.data !== null) {
          this.listData = data.data.list
          this.totalCount = data.data.totalCount
          this.noData = false
        } else {
          this.totalCount = 0
          this.listData = ''
          this.noData = true
          // this.$message({
          //   showClose: true,
          //   message: '暂无数据',
          //   type: 'error',
          //   duration: 2000
          // })
        }
      }, function (response) {
        console.log(response.status)
      })
    },
    // 确认退房
    confirm (props) {
      this.$confirm('是否同意续租?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: (action, instance) => {
          if (action === 'confirm') {
            console.log(props.index)
            // 改变状态为已取消
            this.$http.post(this.$store.state.rentUrl + 'lease/flowUpdateLease', {
              id: this.listData[props.index].id,
              leaseStatus: 'ALRENEWAL',
              loginId: this.$store.state.currentUser.uid
            }).then(function (response) {
              var data = response.data
              console.log(data)
              if (data.code === 200) {
                this.$message({
                  type: 'info',
                  message: '已同意续租'
                })
                this.loadData(this.bean)
              }
            }, function (response) {
              console.log(response.status)
            })
          } else {
          }
        }
      })
    },
    // 打开详情页Thu Oct 25 2018 00:00:00 GMT+0800 (CST)
    openDetail (props) {
      this.leaseId = this.listData[props.index].id
      this.detailShow.show = true
    },
    // 录入费用
    openMoney (props) {
      this.recordMoneyShow.show = true
      this.recordMoneyData = {
        addAmount: '',
        addPer: '',
        addType: '',
        financeType: '',
        chargType: '',
        endChargTime: '',
        initialAmount: '',
        cycle: '',
        startChargTime: '',
        unit: '',
        addCycle: null,
        addUnit: null,
        once: 'once',
        leaseId: this.listData[props.index].id
      }
    },
    // 打开欠费账单
    openList (props) {
      this.mergeId = this.listData[props.index].id
      this.mergeShow.show = true
    }
  },
  components: {
    LeaseList,
    LeaseDetail,
    RecordMoney,
    AreaSelect,
    Merge
  },
  created () {
    this.bean = {
      leaseStatus: 'RENEWAL',
      pageSize: this.pagesize,
      pageNo: this.cur_page,
      loginId: this.$store.state.currentUser.uid
    }
    // 加载出第一次加载的城市
    this.loadFirst()
    this.$store.state.adminleftnavnum = '/rent/renew'
    this.$store.state.topIndex = '/rent/lease'
    this.loadData(this.bean)
  }
}
</script>
<style scoped>
.el-dropdown-menu__item{
  font-size: 14px;
}
/* 主内容区 */
main .main-right{
  padding: 30px; 
}
.rent1-input{
  width: 40%;
}
.main-right-main{
  margin-top: 30px;
}
.main-right-search-span{
  font-size: 13px;
  margin-bottom: 15px;
}
.main-right-search-span a{
  margin-right: 30px;
  display: inline-block;
  height: 36px;
  line-height: 36px;
  cursor: pointer;
}
.el-table{
  border:none;
}
.selectActive{
  color: #20a0ff;
}

/*列表css*/
.list-contain-main{
  padding: 0 25px;
  border:1px solid #eee;
}
.pad9{
  padding: 9px 0;
}
.paging{
  text-align: right;
  margin-top: 20px;
}
.el-dropdown{
  margin-right: 20px;
}
</style>

































