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
            <el-input class="rent1-input" @keydown.enter.native="search()" v-model="input" placeholder="租客手机号,租客姓名,房源信息"></el-input>
            <el-button type="primary" @click="search()">搜索</el-button>
          </div>
        </div>
        <!-- 列表主内容 -->
        <div class="main-right-main">
          <div class="list-contain">
            <div class="list-contain-main">
            <!-- 列表组件 -->
              <reserveList :listData="listData">
                <template slot-scope="props" class="pad9">
                  <el-col :span="2" class="pad9">
                  <!-- 未支付显示的按钮 -->
                    <el-dropdown v-if="listData[props.index].reservationStatus === 'WAITPAY'" menu-align="start">
                      <el-button>
                        <span>操作</span>
                        <i class="el-icon-caret-bottom el-icon--right"></i>
                      </el-button>
                      <el-dropdown-menu slot="dropdown">
                        <!-- <el-dropdown-item v-if="!isGudong" @click.native="openbjForm(props)">编辑</el-dropdown-item> -->
                        <el-dropdown-item v-if="!isGudong" @click.native="confirm(props)">取消</el-dropdown-item>
                        <el-dropdown-item @click.native="openDetail(props)">详情</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  <!-- 已支付显示的按钮 -->
                    <el-dropdown v-else-if="listData[props.index].reservationStatus === 'ALPAY'" menu-align="start">
                      <el-button>
                        <span>操作</span>
                        <i class="el-icon-caret-bottom el-icon--right"></i>
                      </el-button>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-if="!isGudong" @click.native="openContractForm(props)">新建合同</el-dropdown-item>
                        <!-- <el-dropdown-item v-if="!isGudong" @click.native="openbjForm(props)">编辑</el-dropdown-item> -->
                        <el-dropdown-item v-if="!isGudong" @click.native="confirm(props)">取消</el-dropdown-item>
                        <!-- <el-dropdown-item @click.native="openWatch(props)">查看协议</el-dropdown-item> -->
                        <el-dropdown-item @click.native="openDetail(props)">详情</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                    <!-- 已签订显示的按钮 -->
                    <el-dropdown v-else-if="listData[props.index].reservationStatus === 'BUCON'" menu-align="start">
                      <el-button>
                        <span>操作</span>
                        <i class="el-icon-caret-bottom el-icon--right"></i>
                      </el-button>
                      <el-dropdown-menu slot="dropdown">
                        <!-- <el-dropdown-item @click.native="openWatch(props)">查看协议</el-dropdown-item> -->
                        <el-dropdown-item @click.native="openDetail(props)">详情</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                    <!-- 已取消显示的按钮 -->
                    <el-button v-else>
                      <span>详情</span>
                      <i class="el-icon-caret-bottom el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown"></el-dropdown-menu>
                  </el-col>
                </template>
              </reserveList>
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
          <!-- 表单组件 -->
          <reserveForm :reserveForm="reserveForm" :reserveFormData="reserveFormData"></reserveForm>
          <!-- 合同表单组件 -->
          <contractForm :contractForm="contractForm" :contractFormData="contractFormData"></contractForm>
          <!-- 详情组件 -->
          <reserveHouseDetail :detailShow="detailShow" :reserveHouseId="reserveHouseId"></reserveHouseDetail>
        </div>
      </div>
  </div>
</template>
<script>
// 详情组件
import reserveHouseDetail from '../../components/reserveHouseDetail'
// 列表组件
import reserveList from '../../components/reserveList'
// 表单组件
import reserveForm from '../../components/reserveForm'
import contractForm from '../../components/contractForm'
// import $ from 'jquery'
export default {
  name: 'reserveHouse', // 预定房源页面
  data: function () {
    return {
      // 详情组件
      detailShow: {
        show: false
      },
      reserveHouseId: '',
      // 暂无数据
      noData: false,
      input: '',
      isGudong: this.$store.state.currentUser.isGudong,
      rents: ['全部', '待支付', '已支付', '已新建出租合同', '已取消'],
      // 选中的状态
      activeName: '全部',
      // 列表数据
      listData: [],
      // 预定表单数据
      reserveFormData: {},
      // 合同
      contractForm: {
        show: false
      },
      // 预定表单控制显示
      reserveForm: {
        show: false
      },
      // 合同表单数据
      contractFormData: {},
      // 搜索条件
      bean: '',
      // 默认每页数据量
      pagesize: 10,
      // 当前页码
      cur_page: 1,
      // 默认数据总数
      totalCount: 0,
      // 默认数据编辑数据
      editData: ''
    }
  },
  methods: {
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
      this.$http.post(this.$store.state.rentUrl + 'reservation/list',
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
    // 打开详情页
    openDetail (props) {
      this.reserveHouseId = this.listData[props.index].reservationId
      this.detailShow.show = true
    },
    // 同级选中,根据状态筛选
    selected (rent) {
      this.activeName = rent
      if (rent === '全部') {
        this.bean.reservationStatus = null
      } else if (rent === '待支付') {
        this.bean.reservationStatus = 'WAITPAY'
      } else if (rent === '已支付') {
        this.bean.reservationStatus = 'ALPAY'
      } else if (rent === '已新建出租合同') {
        this.bean.reservationStatus = 'BUCON'
      } else if (rent === '已取消') {
        this.bean.reservationStatus = 'CANCLE'
      }
      this.loadData(this.bean)
    },
    // 打开编辑表单
    openbjForm (props) {
      // 根据用户id获取角色名
      let keeper = JSON.parse(this.$store.state.currentUser.keeperData)
      for (var i = 0; i <= keeper.length - 1; i++) {
        for (var j = 0; j <= keeper[i].cities.length - 1; j++) {
          if (keeper[i].cities[j].id === this.listData[props.index].houseKeeperId) {
            this.role = keeper[i].label
          }
        }
      }
      // 获取详情数据
      this.$http.get(this.$store.state.rentUrl + 'reservation/get/' + this.listData[props.index].reservationId, {
      }).then(function (response) {
        var data = response.data
        if (data.code === 200) {
          this.editData = data.data
          this.reserveForm.show = true
          console.log(this.editData)
          this.reserveFormData = {
            name: this.editData.userName, // 姓名
            phone: this.editData.userPhone, // 手机号
            cardId: this.editData.idNumber, // 身份证
            money: (this.editData.earnest / 1000).toString(), // 定金
            rentMoney: (this.editData.rental / 1000).toString(), // 租金
            deposit: (this.editData.deposit / 1000).toString(), // 押金
            startTime: new Date(this.editData.startTime), // 合同生效（起租）时间
            endTime: new Date(this.editData.endTime), // 合同结束（退租）时间
            goTime: new Date(this.editData.expiredSignContractTime), // 预计签合同时间
            houseRentType: this.editData.houseRentType,
            livesNumber: (this.editData.livesNumber).toString(), // 居住人数
            memo: this.editData.memo, // 备注
            rentType2: this.editData.payCycle,
            people: [this.role, this.editData.houseKeeperName],
            house: this.editData.houseSpaceName,
            reservationId: this.editData.reservationId,
            houseKeeperId: this.editData.houseKeeperId,
            type: '1',
            userId: this.editData.userId,
            nameS: true,
            phoneS: true,
            moneyS: true,
            cardIdS: true
          }
        }
      }, function (response) {
        console.log(response.status)
      })
    },
    // 打开定金协议
    openWatch (props) {
      // 获取详情数据
      this.$http.get(this.$store.state.rentUrl + 'reservation/get/' + this.listData[props.index].reservationId, {
      }).then(function (response) {
        var data = response.data
        if (data.code === 200) {
          this.pdfData = data.data
          let payCycle
          if (this.pdfData.payCycle === 'ONEMON') {
            payCycle = '月付'
          } else if (this.pdfData.payCycle === 'THREEMON') {
            payCycle = '季付'
          } else if (this.pdfData.payCycle === 'SIXMON') {
            payCycle = '半年一付'
          } else if (this.pdfData.payCycle === 'TWELVEMON') {
            payCycle = '一年一付'
          } else if (this.pdfData.payCycle === 'TWOMON') {
            payCycle = '二月一付'
          } else if (this.pdfData.payCycle === 'FOURMON') {
            payCycle = '四月一付'
          } else if (this.pdfData.payCycle === 'ONEPAY') {
            payCycle = '一次付清'
          }
          // 填充数据到pdf
          this.$http.post(this.$store.state.pdfUrl + 'pdf/gen', {
            data: {
              depositNumber: this.pdfData.reservationNumber, // 预定协议编号
              userName: this.pdfData.userName, // 租客姓名
              idNumber: this.pdfData.idNumber, // 租客身份证号码
              houseSpaceName: this.pdfData.keywordAddressGeographic, // 租客住所
              livesNumber: (this.pdfData.livesNumber).toString(), // 居住人数
              earnest: this.pdfData.earnest / 1000, // 定金金额
              startTime: new Date(this.pdfData.startTime).toLocaleDateString(), // 开始时间
              endTime: new Date(this.pdfData.endTime).toLocaleDateString(), // 结束时间
              rental: this.pdfData.rental / 1000, // 月租金
              registerTime: new Date(this.pdfData.registerTime).toLocaleDateString(), // 登记时间
              payCycle: payCycle, // 付费方式
              deposit: this.pdfData.deposit / 1000, // 押金
              message: '', // 优惠内容
              memo: this.pdfData.memo, // 其他约定
              houseSpaceArea: this.pdfData.houseSpaceArea / 1000, // 面积
              dearnest: this.digitUppercase(this.pdfData.earnest / 1000),
              signContractTime: new Date(this.pdfData.signContractTime).toLocaleDateString()
            },
            templateFileName: 'deposit'
          }).then(function (response) {
            console.log(response.data)
            window.open(this.$store.state.pdfUrl + 'pdf/' + response.data.data.pdfId)
          }, function (response) {
            console.log(response.status)
          })
        }
      }, function (response) {
        console.log(response.status)
      })
    },
    // 打开合同签订表单
    openContractForm (props) {
      // 根据用户id获取角色名
      let keeper = JSON.parse(this.$store.state.currentUser.keeperData)
      for (var i = 0; i <= keeper.length - 1; i++) {
        for (var j = 0; j <= keeper[i].cities.length - 1; j++) {
          if (keeper[i].cities[j].id === this.listData[props.index].houseKeeperId) {
            this.role = keeper[i].label
            this.housekeeperName = keeper[i].cities[j].label
            this.housekeeperPhone = keeper[i].cities[j].phone
          }
        }
      }
      // 获取详情数据
      this.$http.get(this.$store.state.rentUrl + 'reservation/get/' + this.listData[props.index].reservationId, {
      }).then(function (response) {
        var data = response.data
        if (data.code === 200) {
          this.editData = data.data
          this.contractForm.show = true
          this.contractFormData = {
            name: this.editData.userName,
            phone: this.editData.userPhone,
            houseSpaceName: this.editData.houseSpaceName,
            houseSpaceId: this.editData.houseSpaceId,
            earnest: (this.editData.earnest / 1000).toString(),
            signType: 'NEW',
            unitId: this.editData.unitId,
            guidePrice: this.editData.guidePrice,
            title: '新建租客合同',
            fromReserve: true,
            nameS: true,
            phoneS: true,
            houseSpaceNameS: true,
            reservationId: this.editData.reservationId,
            addType: 'NOTRISE',
            earnestShow: false,
            processKey: 'PROCESS-KEY-RENT-V11'
          }
        }
      }, function (response) {
        console.log(response.status)
      })
    },
    // 确定已取消
    confirm (props) {
      this.$confirm('是否取消此条房源预定?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: (action, instance) => {
          if (action === 'confirm') {
            // 改变状态为已取消
            this.$http.post(this.$store.state.rentUrl + 'reservation/update', {
              reservationId: this.listData[props.index].reservationId,
              houseSpaceId: this.listData[props.index].houseSpaceId,  // 房源id
              reservationStatus: 'CANCLE'
            }).then(function (response) {
              var data = response.data
              if (data.code === 200) {
                this.$message({
                  type: 'info',
                  message: '此预定信息已取消'
                })
                this.loadData(this.bean) // 刷新列表数据
              }
            }, function (response) {
              console.log(response.status)
            })
          } else {
          }
        }
      })
    },
    // 将数字转换成大写
    digitUppercase (n) {
      var fraction = ['角', '分']
      var digit = [
        '零', '壹', '贰', '叁', '肆',
        '伍', '陆', '柒', '捌', '玖'
      ]
      var unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
      ]
      var head = n < 0 ? '欠' : ''
      n = Math.abs(n)
      var s = ''
      for (i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
      }
      s = s || '整'
      n = Math.floor(n)
      for (var i = 0; i < unit[0].length && n > 0; i++) {
        var p = ''
        for (var j = 0; j < unit[1].length && n > 0; j++) {
          p = digit[n % 10] + unit[1][j] + p
          n = Math.floor(n / 10)
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
      }
      return head + s.replace(/(零.)*零元/, '元')
        .replace(/(零.)+/g, '零')
        .replace(/^整$/, '零元整')
    }
  },
  components: {
    reserveList,
    reserveForm,
    contractForm,
    reserveHouseDetail
  },
  created () {
    this.bean = {
      pageSize: this.pagesize,
      pageNo: this.cur_page,
      loginId: this.$store.state.currentUser.uid
    }
    this.$store.state.adminleftnavnum = '/rent/reserveHouse'
    this.$store.state.topIndex = '/rent/lease'
    this.loadData(this.bean)
    // 接受事件触发刷新
    this.$root.reserveHouse.$on('submitForm', value => {
      this.loadData(this.bean)
    })
    // 改变预约状态
    this.$root.reserveHouse.$on('changeStatus', value => {
      this.loadData(this.bean)
    })
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
</style>
















