<template>
  <div>
    <div class="main-right" >
      <!-- 右侧主内容区 -->
      <div class="main-right-search">
      <!-- 全租分租筛选 -->
        <!-- <div class="main-right-search-span">
          <a v-for="rent2 in rents2" :class="{selectActive: activeName2 == rent2}" @click="selected2(rent2)">{{rent2}}</a>
        </div> -->
        <div class="fr search-cont">
          <el-input class="rent1-input" v-model="input" @keydown.enter.native="search()" placeholder="租客手机号,租客姓名,房源信息"></el-input>
          <el-button type="primary" @click="search()">搜索</el-button>
        </div>
        <!-- 合同状态筛选 -->
        <div class="main-right-search-span">
          <a v-for="rent in rents" :class="{selectActive: activeName == rent}" @click="selected(rent)">{{rent}}</a>
        </div>
        <!-- 公共片区筛选组件 -->
        <area-select @sendUnitId="getUnitId" :areaData="areaData"></area-select>
      </div>
      <div class="main-right-main">
        <div class="list-contain">
          <div class="list-contain-main">
            <contract-list :listData="listData">
              <template slot-scope="props" class="pad9">
                <el-col :span="2" class="pad9">
                <!-- 待审核 -->
                <el-dropdown v-if="listData[props.index].contractStatus === 'TOAUDIT'" menu-align="start">
                    <el-button>
                      <span>操作</span>
                      <i class="el-icon-caret-bottom el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                     <!--  <el-dropdown-item @click.native="calcel(props)">驳回</el-dropdown-item>
                      <el-dropdown-item v-if="loginPhone === '18298296986' || loginPhone === '18895312300' || loginPhone === '18768405867' || loginPhone === '13738103646'" @click.native="examine(props)">审核</el-dropdown-item> -->
                      <!-- <el-dropdown-item @click.native="openWatch1(props)">查看合同</el-dropdown-item> -->
                      <el-dropdown-item v-if="!isGudong" @click.native="openUploac(props)">上传附件</el-dropdown-item>
                      <el-dropdown-item @click.native="openDetail(props)">详情</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                <!-- 待签订 -->
                  <el-dropdown v-else-if="listData[props.index].contractStatus === 'WAISIGN'" menu-align="start">
                    <el-button>
                      <span>操作</span>
                      <i class="el-icon-caret-bottom el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-if="$store.state.currentUser.roleData.indexOf('运营部经理') !== -1 || $store.state.currentUser.roleData.indexOf('运营主管') !== -1 || $store.state.currentUser.roleData.indexOf('运营专员') !== -1" @click.native="calcel(props)">取消</el-dropdown-item>
                      <!-- <el-dropdown-item @click.native="confirmQian(props)">签订</el-dropdown-item> -->
                      <!-- <el-dropdown-item @click.native="openWatch1(props)">查看合同</el-dropdown-item> -->
                      <el-dropdown-item @click.native="openDetail(props)">详情</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <!-- 签订中 -->
                  <el-dropdown v-else-if="listData[props.index].contractStatus === 'SIGNING'" menu-align="start">
                    <el-button>
                      <span>操作</span>
                      <i class="el-icon-caret-bottom el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <!-- <el-dropdown-item @click.native="calcel(props)">取消</el-dropdown-item>
                      <el-dropdown-item v-if="listData[props.index].SIGN === 'NOTSIGN'" @click.native="confirmQian(props)">签订</el-dropdown-item> -->
                      <!-- <el-dropdown-item @click.native="openWatch1(props)">查看合同</el-dropdown-item> -->
                      <el-dropdown-item @click.native="openDetail(props)">详情</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <!-- 取消的状态 -->
                  <el-dropdown v-else-if="listData[props.index].contractStatus === 'CANCEL'" menu-align="start">
                    <el-button>
                      <span>操作</span>
                      <i class="el-icon-caret-bottom el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <!-- <el-dropdown-item @click.native="openWatch1(props)">查看合同</el-dropdown-item> -->
                      <el-dropdown-item @click.native="openDetail(props)">详情</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <!-- 已签订和已生效状态 -->
                  <el-dropdown v-else-if="listData[props.index].contractStatus === 'ALSIGN' || listData[props.index].contractStatus === 'EFFECT'"menu-align="start">
                    <el-button>
                      <span>操作</span>
                      <i class="el-icon-caret-bottom el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <!-- <el-dropdown-item @click.native="openWatch(props)">查看合同</el-dropdown-item> -->
                      <el-dropdown-item v-if="!isGudong" @click.native="openUploac(props)">上传附件</el-dropdown-item>
                      <el-dropdown-item @click.native="openDetail(props)">详情</el-dropdown-item>
                      <el-dropdown-item @click.native="addPeople(props)">添加随住人员</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <!-- 其他情况 -->
                  <el-dropdown v-else menu-align="start">
                    <el-button>
                      <span>操作</span>
                      <i class="el-icon-caret-bottom el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <!-- <el-dropdown-item @click.native="openWatch(props)">查看合同</el-dropdown-item> -->
                      <el-dropdown-item @click.native="openDetail(props)">详情</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </template>
            </contract-list>
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
        <contract-detail :detailShow="detailShow" :contractId="contractId"></contract-detail>
        <!-- 上传附件组件 -->
        <upload :uploadData="uploadData" :urlLists="urlLists" :uploadName="uploadName" @uploadSuccess='uploadSuccess' :detailClick="detailClick" typeArr="image/png,image/jpg,image/gif,image/jpeg"></upload>
        <add-people-form :contractId="addPeopleFormId" :addPeopleFormShow="addPeopleFormShow"></add-people-form>
      </div>
    </div>   
  </div>
</template>
<script>
import ContractList from '@/components/rent-contract/ContractList'
import ContractDetail from '@/components/rent-contract/ContractDetail'
import AddPeopleForm from '@/components/rent-contract/AddPeopleForm' // 添加随住人员组件
import Upload from '@/components/common/Upload' // 上传附件
import AreaSelect from '@/components/common/AreaSelect'  // 公共片区筛选组件
// import $ from 'jquery'

export default {
  name: 'contract',  // 出租合同管理页面
  data: function () {
    return {
      // 添加随住人员数据
      addPeopleFormId: '',
      addPeopleFormShow: {
        show: false
      },
      // 城市筛选data
      areaData: [],
      // 上传附件组件数据
      uploadData: {
        show: false
      },
      isGudong: this.$store.state.currentUser.isGudong,
      uploadName: {
        title: 'PDF上传',
        btnName: 'PDF'
      },
      urlLists: { // 返回链接列表
        contractId: '',
        addrList: []
      },
      detailClick: 0,
      // 详情组件
      contractId: '',
      detailShow: {
        show: false
      },
      // 登录人手机号
      loginPhone: localStorage.getItem('currentUserPhone'),
      // 暂无数据
      noData: false,
      input: '',
      rents: ['全部', '待审核', '待签订', '签订中', '已签订', '已生效', '已结束', '提前结束', '已取消'],
      activeName: '全部',
      rents2: ['全部', '分租', '全租'],
      activeName2: '全部',
      listData: [],
      // 搜索条件
      bean: '',
      // 默认每页数据量
      pagesize: 10,
      // 当前页码
      cur_page: 1,
      // 默认数据总数
      totalCount: 0
    }
  },
  methods: {
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
    },
    // 调起上传附件组件
    openUploac (props) {
      this.uploadData.show = true
      this.urlLists.contractId = this.listData[props.index].id
      this.urlLists.type = 'contract'
      this.detailClick++
    },
    // 组件显示
    uploadSuccess () {
      this.uploadData.show = false
      this.detailClick++
    },
    getUnitId: function (data) {
      this.bean.zoneId = data
      this.loadData(this.bean)
    },
    // 添加随住人员表单
    addPeople: function (props) {
      this.addPeopleFormId = this.listData[props.index].id
      this.addPeopleFormShow.show = true
    },
    // 加载第一次城市筛选
    loadFirst: function (e) {
      this.areaData.push({
        id: '3e2fe4faa399476786dda82bde78052c',
        name: '随寓'
      })
    },
    // 打开出租合同pdf
    openWatch (props) {
      // 获取详情数据
      this.$http.get(this.$store.state.contractUrl + 'getContractDetailsById/' + this.listData[props.index].id, {
      }).then(function (response) {
        var data = response.data
        this.detailData = data.data
        this.pdfData = data.data
        if (data.code === 200) {
          for (var j = 0; j <= this.detailData.users.length - 1; j++) {
            if (this.detailData.users[j].representative === 'PARTB') {
              this.pdfData.userName = this.detailData.users[j].userName
              this.pdfData.userPhone = this.detailData.users[j].userPhone
              this.pdfData.idCard = this.detailData.users[j].certificateNumber
              this.pdfData.sex = this.detailData.users[j].sex
            } else if (this.detailData.users[j].representative === 'PARTA') {
              this.pdfData.houseKeeperName = this.detailData.users[j].userName
            }
          }
          let payCycle
          if (this.pdfData.chargLogBeanList[0].cycle === 'ONEMON') {
            payCycle = '月付'
          } else if (this.pdfData.chargLogBeanList[0].cycle === 'THREEMON') {
            payCycle = '季付'
          } else if (this.pdfData.chargLogBeanList[0].cycle === 'SIXMON') {
            payCycle = '半年一付'
          } else if (this.pdfData.chargLogBeanList[0].cycle === 'TWELVEMON') {
            payCycle = '一年一付'
          } else if (this.pdfData.chargLogBeanList[0].cycle === 'TWOMON') {
            payCycle = '二月一付'
          } else if (this.pdfData.chargLogBeanList[0].cycle === 'FOURMON') {
            payCycle = '四月一付'
          } else if (this.pdfData.chargLogBeanList[0].cycle === 'ONEPAY') {
            payCycle = '一次付清'
          }
          // 填充数据到pdf
          this.$http.post(this.$store.state.pdfUrl + 'pdf/gen', {
            data: {
              userName: this.pdfData.userName,
              certificateNum: this.pdfData.idCard,
              houseSpaceName: this.pdfData.keywordAddressGeographic,
              houseSpaceArea: this.pdfData.houseSpaceArea / 1000,
              startTime: new Date(this.pdfData.startTime).toLocaleDateString(),
              endTime: new Date(this.pdfData.endTime).toLocaleDateString(),
              rental: this.pdfData.rental / 1000,
              Drental: this.digitUppercase(this.pdfData.rental / 1000),
              payCycle: payCycle,
              deposit: this.pdfData.deposit / 1000,
              phone: this.pdfData.userPhone,
              earnest: this.pdfData.earnest / 1000,
              signTime: new Date(this.pdfData.signTime).toLocaleDateString(),
              totalRental: this.pdfData.totalRental / 1000,
              DtotalRental: this.digitUppercase(this.pdfData.totalRental / 1000)
            },
            templateFileName: 'leaseContract'
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
    // 打开出租合同pdf2
    openWatch1 (props) {
      // 获取详情数据
      this.$http.get(this.$store.state.contractUrl + 'getContractDetailsById/' + this.listData[props.index].id, {
      }).then(function (response) {
        var data = response.data
        this.detailData = data.data
        this.pdfData = data.data
        if (data.code === 200) {
          for (var j = 0; j <= this.detailData.users.length - 1; j++) {
            if (this.detailData.users[j].representative === 'PARTB') {
              this.pdfData.userName = this.detailData.users[j].userName
              this.pdfData.userPhone = this.detailData.users[j].userPhone
              this.pdfData.idCard = this.detailData.users[j].certificateNumber
              this.pdfData.sex = this.detailData.users[j].sex
            } else if (this.detailData.users[j].representative === 'PARTA') {
              this.pdfData.houseKeeperName = this.detailData.users[j].userName
            }
          }
          let payCycle
          if (this.pdfData.chargLogBeanList[0].cycle === 'ONEMON') {
            payCycle = '月付'
          } else if (this.pdfData.chargLogBeanList[0].cycle === 'THREEMON') {
            payCycle = '季付'
          } else if (this.pdfData.chargLogBeanList[0].cycle === 'SIXMON') {
            payCycle = '半年一付'
          } else if (this.pdfData.chargLogBeanList[0].cycle === 'TWELVEMON') {
            payCycle = '一年一付'
          } else if (this.pdfData.chargLogBeanList[0].cycle === 'TWOMON') {
            payCycle = '二月一付'
          } else if (this.pdfData.chargLogBeanList[0].cycle === 'FOURMON') {
            payCycle = '四月一付'
          } else if (this.pdfData.chargLogBeanList[0].cycle === 'ONEPAY') {
            payCycle = '一次付清'
          }
          // 填充数据到pdf
          this.$http.post(this.$store.state.pdfUrl + 'pdf/gen', {
            data: {
              houseSpaceName: this.pdfData.houseSpaceName,
              startTime: new Date(this.pdfData.startTime).toLocaleDateString(),
              endTime: new Date(this.pdfData.endTime).toLocaleDateString(),
              rental: this.pdfData.rental / 1000,
              Drental: this.digitUppercase(this.pdfData.rental / 1000),
              payCycle: payCycle,
              deposit: this.pdfData.deposit / 1000,
              earnest: this.pdfData.earnest / 1000,
              totalRental: this.pdfData.totalRental / 1000,
              DtotalRental: this.digitUppercase(this.pdfData.totalRental / 1000),
              houseSpaceArea: this.pdfData.houseSpaceArea / 1000 // 面积
            },
            templateFileName: 'leaseContract'
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
      this.$http.post(this.$store.state.contractUrl + 'list',
        bean
      ).then(function (response) {
        var data = response.data
        if (data.data !== null) {
          this.listData = data.data.list
          for (var i = 0; i <= this.listData.length - 1; i++) {
            for (var j = 0; j <= this.listData[i].users.length - 1; j++) {
              if (this.listData[i].users[j].representative === 'PARTB') {
                this.listData[i].userName = this.listData[i].users[j].userName
                this.listData[i].userPhone = this.listData[i].users[j].userPhone
                this.listData[i].idCard = this.listData[i].users[j].certificateNum
                this.listData[i].sex = this.listData[i].users[j].sex
              } else if (this.listData[i].users[j].representative === 'PARTA') {
                this.listData[i].houseKeeperName = this.listData[i].users[j].userName
                this.listData[i].SIGN = this.listData[i].users[j].signStatus
              }
            }
          }
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
    // 同级选中,根据状态筛选
    selected (rent) {
      this.activeName = rent
      if (rent === '全部') {
        this.bean.contractStatus = null
      } else if (rent === '待签订') {
        this.bean.contractStatus = 'WAISIGN'
      } else if (rent === '签订中') {
        this.bean.contractStatus = 'SIGNING'
      } else if (rent === '已签订') {
        this.bean.contractStatus = 'ALSIGN'
      } else if (rent === '已生效') {
        this.bean.contractStatus = 'EFFECT'
      } else if (rent === '终止中') {
        this.bean.contractStatus = 'ENDING'
      } else if (rent === '已结束') {
        this.bean.contractStatus = 'END'
      } else if (rent === '提前结束') {
        this.bean.contractStatus = 'EARLYEND'
      } else if (rent === '已取消') {
        this.bean.contractStatus = 'CANCEL'
      } else if (rent === '待审核') {
        this.bean.contractStatus = 'TOAUDIT'
      }
      this.loadData(this.bean)
    },
    // 筛选全租分租
    selected2 (rent2) {
      this.activeName2 = rent2
      if (rent2 === '全部') {
        this.bean.houseRentType = null
      } else if (rent2 === '分租') {
        this.bean.houseRentType = 'JOINT_RENT'
      } else if (rent2 === '全租') {
        this.bean.houseRentType = 'ENTIRE_RENT'
      }
      this.loadData(this.bean)
    },
    // 打开详情页
    openDetail (props) {
      this.contractId = this.listData[props.index].id
      this.detailShow.show = true
    },
    // 确定正在签订中
    confirmQian (props) {
      this.$confirm('是否确定签订?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: (action, instance) => {
          if (action === 'confirm') {
            // 改变状态为签订中
            this.$http.post(this.$store.state.contractUrl + 'updateByParStatus', {
              contractId: this.listData[props.index].id,
              userId: this.$store.state.currentUser.uid
            }).then(function (response) {
              var data = response.data
              if (data.code === 200) {
                this.$message({
                  type: 'info',
                  message: '合同正在签订中'
                })
                this.loadData(this.bean)
              } else {
                this.$message({
                  type: 'error',
                  message: '您目前没权限签订'
                })
              }
            }, function (response) {
              console.log(response.status)
            })
          } else {
          }
        }
      })
    },
    // 确定已签订
    confirmYi (props) {
      this.$confirm('是否确定已签订?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: (action, instance) => {
          if (action === 'confirm') {
            console.log(props.index)
            // 改变状态为已取消
            this.$http.post(this.$store.state.contractUrl + 'update', {
              contractId: this.listData[props.index].id,
              enumContractStatus: 'ALSIGN'
            }).then(function (response) {
              var data = response.data
              console.log(data)
              if (data.code === 200) {
                this.listData[props.index].contractStatus = 'ALSIGN'
                this.$message({
                  type: 'info',
                  message: '合同已签订'
                })
              }
            }, function (response) {
              console.log(response.status)
            })
          } else {
          }
        }
      })
    },
    // 确定已取消
    calcel (props) {
      this.$confirm('是否确定取消?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: (action, instance) => {
          if (action === 'confirm') {
            // 改变状态为已取消
            this.$http.get(this.$store.state.contractUrl + 'updateContractStatus/' + this.listData[props.index].id, {
              contractId: this.listData[props.index].id,
            }).then(function (response) {
              var data = response.data
              console.log(data)
              if (data.code === 200) {
                this.$message({
                  type: 'info',
                  message: '合同已取消'
                })
                this.loadData(this.bean)
              } else {
                this.$message({
                  type: 'info',
                  message: '取消失败'
                })
              }
            }, function (response) {
              console.log(response.status)
            })
          } else {
          }
        }
      })
    },
    // 合同审核通过
    examine (props) {
      this.$confirm('是否同意合同签订', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: (action, instance) => {
          if (action === 'confirm') {
            console.log(props.index)
            // 改变状态为待签订
            this.$http.get(this.$store.state.contractUrl + 'update', {
              contractId: this.listData[props.index].id,
              enumContractStatus: 'WAISIGN'
            }).then(function (response) {
              var data = response.data
              console.log(data)
              if (data.code === 200) {
                this.$message({
                  type: 'info',
                  message: '合同已审核通过'
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
    }
  },
  components: {
    ContractList,
    ContractDetail,
    AddPeopleForm,
    Upload,
    AreaSelect
  },
  created () {
    this.bean = {
      pageSize: this.pagesize,
      pageNo: this.cur_page,
      contractType: 'RENT',
      loginId: this.$store.state.currentUser.uid
    }
    // 加载出第一次加载的城市
    this.loadFirst()
    this.$store.state.adminleftnavnum = '/rent/contract'
    this.$store.state.topIndex = '/rent/lease'
    this.loadData(this.bean)
    this.$root.contract.$on('submitForm', value => {
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
  display: block;
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
















