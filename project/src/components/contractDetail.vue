<template>
  <div>
    <transition name="fade">
      <div v-if="detailShow.show" class="dialog" :style="height">
        <el-row class="height-w100">
          <el-col class="form-contL" :span="6" style="padding:0;">
              <el-menu :default-active="menuData" class="el-menu-vertical-demo" @select="select">
                <el-menu-item index="contract">租客合同详情</el-menu-item>
                <el-menu-item v-if="this.oldLeaseId && !this.terShow" index="lease">旧租约详情</el-menu-item>
                <el-menu-item v-if="this.oldLeaseId && this.terShow" index="lease">租约详情</el-menu-item>
              </el-menu>
          </el-col>
          <el-col v-if="detailData" class="form-cont" :span="18">
            <div class="contain">
              <div class="clear">
                <h3>租客信息</h3>
                <el-col :span="8" class="title">姓名</el-col>
                <el-col :span="16">
                  <div class="content">{{detailData.userName}}</div>
                </el-col>
                <el-col v-if="detailData.sex" :span="8" class="title">性别</el-col>
                <el-col v-if="detailData.sex" :span="16">
                  <div class="content" v-if="detailData.sex === 'M'">男</div>
                  <div class="content" v-else-if="detailData.sex === 'F'">女</div>
                </el-col>
                <el-col :span="8" class="title">手机号</el-col>
                <el-col :span="16">
                  <div class="content">{{detailData.userPhone}}</div>
                </el-col>
                <el-col v-if="detailData.certificateType" :span="8" class="title">证件类型</el-col>
                <el-col v-if="detailData.certificateType" :span="16">
                  <div v-if="detailData.certificateType === 'ID'" class="content">身份证</div>
                  <div v-else class="content">护照</div>
                </el-col>
                <el-col v-if="detailData.nationality" :span="8" class="title">国籍</el-col>
                <el-col v-if="detailData.nationality" :span="16">
                  <div class="content">{{detailData.nationality}}</div>
                </el-col>
                <el-col v-if="detailData.idCard" :span="8" class="title">证件号码</el-col>
                <el-col v-if="detailData.idCard" :span="16">
                  <div class="content">{{detailData.idCard}}</div>
                </el-col>
                <el-col v-if="detailData.urgentPhone" :span="8" class="title">紧急联系人电话</el-col>
                <el-col v-if="detailData.urgentPhone" :span="16">
                  <div class="content">{{detailData.urgentPhone}}</div>
                </el-col>
              </div>
              <div class="clear">
                <h3>合同信息</h3>
                <!-- 合同编号 -->
                <el-col :span="8" class="title">合同编号</el-col>
                <el-col :span="16">
                  <div class="content">{{detailData.contractNumber}}</div>
                </el-col>

                <el-col :span="8" class="title">合同类型</el-col>
                <el-col :span="16">
                  <div class="content" v-if="detailData.signType === 'NEW'">新签合同</div>
                  <div class="content" v-else-if="detailData.signType === 'RENEWAL'">续租合同</div>
                  <div class="content" v-else-if="detailData.signType === 'SUBLET'">转租合同</div>
                  <div class="content" v-else-if="detailData.signType === 'CHANGE'">换房合同</div>
                </el-col>

                <el-col :span="8" class="title">合同状态</el-col>
                <el-col :span="16">
                  <div class="content" v-if="detailData.contractStatus === 'WAISIGN'">待签订</div>
                  <div class="content" v-else-if="detailData.contractStatus === 'SIGNING'">签订中</div>
                  <div class="content" v-else-if="detailData.contractStatus === 'ALSIGN'">已签订</div>
                  <div class="content" v-else-if="detailData.contractStatus === 'EFFECT'">已生效</div>
                  <div class="content" v-else-if="detailData.contractStatus === 'EARLYEND'">提前结束</div>
                  <div class="content" v-else-if="detailData.contractStatus === 'CHEND'">已换房</div>
                  <div class="content" v-else-if="detailData.contractStatus === 'THEND'">提前退租</div>
                  <div class="content" v-else-if="detailData.contractStatus === 'SUEND'">已转租</div>
                  <div class="content" v-else-if="detailData.contractStatus === 'END'">正常结束</div>
                  <div class="content" v-else-if="detailData.contractStatus === 'CANCEL'">已取消</div>
                  <div class="content" v-else-if="detailData.contractStatus === 'TOAUDIT'">待审核</div>
                </el-col>
                
                <el-col v-if="detailData.storageType" :span="8" class="title">合同性质</el-col>
                <el-col v-if="detailData.storageType" :span="16">
                  <div class="content" v-if="detailData.storageType === 'ELE'">电子合同</div>
                  <div class="content" v-else-if="detailData.storageType === 'PAPER'">纸质合同</div>
                </el-col>

                <el-col v-if="detailData.memo" :span="8" class="title">备注</el-col>
                <el-col v-if="detailData.memo" :span="16">
                  <div class="content">{{detailData.memo}}</div>
                </el-col>
                <el-col v-if="detailData.poundage" :span="8" class="title">是否有偿</el-col>
                <el-col v-if="detailData.poundage" :span="16">
                  <div class="content" v-if="detailData.poundage === 'SPAID'">有偿转租</div>
                  <div class="content" v-else-if="detailData.poundage === 'SNOTPAID'">无偿转租</div>
                  <div class="content" v-else-if="detailData.poundage === 'CPAID'">有偿换房</div>
                  <div class="content" v-else-if="detailData.poundage === 'CNOTPAID'">无偿换房</div>
                </el-col>
      
                <el-col :span="8" class="title">居住人数</el-col>
                <el-col :span="16">
                  <div class="content">{{detailData.livesNumber}}</div>
                </el-col>
                <el-col :span="8" class="title">起租-退租时间</el-col>
                <el-col :span="16">
                  <div class="content">{{new Date(detailData.startTime).toLocaleDateString()}}-{{new Date(detailData.endTime).toLocaleDateString()}}</div>
                </el-col>
                <el-col v-if="detailData.expiredOutTime" :span="8" class="title">搬出时间</el-col>
                <el-col v-if="detailData.expiredOutTime" :span="16">
                  <div class="content">{{new Date(detailData.expiredOutTime).toLocaleDateString()}}</div>
                </el-col>
                <!-- 计费规则详情 -->
                <div v-if="detailData.chargLogBeanList.length !== 0">
                  <el-col v-if="detailData.chargLogBeanList[0].rentalFreeStart" :span="8" class="title">免租期时间</el-col>
                  <el-col v-if="detailData.chargLogBeanList[0].rentalFreeStart" :span="16">
                    <div class="content">{{new Date(detailData.chargLogBeanList[0].rentalFreeStart).toLocaleDateString()}}-{{new Date(detailData.chargLogBeanList[0].rentalFreeEnd).toLocaleDateString()}}
                    </div>
                  </el-col>
                  <!-- 上调类型 -->
                  <el-col :span="8" class="title" v-if="detailData.chargLogBeanList[0].addType !== 'NOTRISE'">上调类型</el-col>
                  <el-col :span="16" v-if="detailData.chargLogBeanList[0].addType !== 'NOTRISE'">
                    <div v-if="detailData.chargLogBeanList[0].addType === 'NOTRISE'" class="content">不上调</div>
                    <div v-else-if="detailData.chargLogBeanList[0].addType === 'RISEBYAMOUNT'" class="content">上调金额数</div>
                    <div v-else class="content">百分比上调</div>
                  </el-col>
                  <!-- 上调周期 -->
                  <el-col  v-if="detailData.chargLogBeanList[0].addType !== 'NOTRISE'" :span="8" class="title">上调周期</el-col>
                  <el-col v-if="detailData.chargLogBeanList[0].addType !== 'NOTRISE'" :span="16">
                    <div v-if="detailData.chargLogBeanList[0].addCycle === 'ONEMON'" class="content">1月增长</div>
                    <div v-else-if="detailData.chargLogBeanList[0].addCycle === 'THREEMON'" class="content">3月增长</div>
                    <div v-else-if="detailData.chargLogBeanList[0].addCycle === 'SIXMON'" class="content">6月增长</div>
                    <div v-else-if="detailData.chargLogBeanList[0].addCycle === 'TWELVEMON'" class="content">12月增长</div>
                    <div v-else-if="detailData.chargLogBeanList[0].addCycle === 'TWOMON'" class="content">2月增长</div>
                    <div v-else-if="detailData.chargLogBeanList[0].addCycle === 'FOURMON'" class="content">4月增长</div>
                    <div v-else class="content">不上调</div>
                  </el-col>
                  <!-- 上调金额数 -->
                  <el-col v-if="detailData.chargLogBeanList[0].addAmount" :span="8" class="title">上调金额数</el-col>
                  <el-col v-if="detailData.chargLogBeanList[0].addAmount" :span="16">
                    <div class="content">{{(detailData.chargLogBeanList[0].addAmount / 1000).toFixed(2)}}</div>
                  </el-col>
                  <!-- 上调百分比 -->
                  <el-col v-if="detailData.chargLogBeanList[0].addPer" :span="8" class="title">上调百分比</el-col>
                  <el-col v-if="detailData.chargLogBeanList[0].addPer" :span="16">
                    <div class="content">{{detailData.chargLogBeanList[0].addPer / 1000}}</div>
                  </el-col>
                  <!-- <el-col v-if="detailData.rentType" :span="8" class="title">租赁类型</el-col>
                  <el-col v-if="detailData.rentType" :span="16">
                    <div v-if="detailData.rentType === 'MONTH'" class="content">月租</div>
                    <div v-else class="content">日租</div>
                  </el-col> -->
                  <el-col :span="8" class="title">租赁方式</el-col>
                  <el-col :span="16">
                    <div class="content" v-if="detailData.houseRentType === 'ENTIRE_RENT'">全租</div>
                    <div class="content" v-else>分租</div>
                  </el-col>
                  <el-col :span="8" class="title">支付周期</el-col>
                  <el-col :span="16">
                    <div v-if="detailData.chargLogBeanList[0].cycle === 'ONEMON'" class="content">月付</div>
                    <div v-else-if="detailData.chargLogBeanList[0].cycle === 'THREEMON'" class="content">季付</div>
                    <div v-else-if="detailData.chargLogBeanList[0].cycle === 'SIXMON'" class="content">半年一付</div>
                    <div v-else-if="detailData.chargLogBeanList[0].cycle === 'TWELVEMON'" class="content">一年一付</div>
                    <div v-else-if="detailData.chargLogBeanList[0].cycle === 'TWOMON'" class="content">二月一付</div>
                    <div v-else-if="detailData.chargLogBeanList[0].cycle === 'FOURMON'" class="content">四月一付</div>
                    <div v-else-if="detailData.chargLogBeanList[0].cycle === 'ONEPAY'" class="content">一次付清</div>
                  </el-col>
                </div>

                <el-col :span="8" class="title">租金</el-col>
                <el-col :span="16">
                  <div class="content">{{(detailData.rental / 1000).toFixed(2)}}</div>
                </el-col>
                <el-col :span="8" class="title">押金</el-col>
                <el-col :span="16">
                  <div class="content">{{(detailData.deposit / 1000).toFixed(2)}}</div>
                </el-col>
                <el-col v-if="detailData.firstCreditAmount" :span="8" class="title">首月减免金额</el-col>
                <el-col v-if="detailData.firstCreditAmount" :span="16">
                  <div class="content">{{detailData.firstCreditAmount / 1000}}</div>
                </el-col>
                <el-col v-if="detailData.earnest" :span="8" class="title">定金</el-col>
                <el-col v-if="detailData.earnest" :span="16">
                  <div class="content">{{(detailData.earnest / 1000).toFixed(2)}}</div>
                </el-col>
                <!-- <el-col :span="8" class="title">违约金</el-col>
                <el-col :span="16">
                  <div class="content">{{(detailData.penalty / 1000).toFixed(2)}}</div>
                </el-col> -->
                <!-- <el-col v-if="detailData.additionalCosts" :span="8" class="title">其他费用</el-col>
                <el-col v-if="detailData.additionalCosts" :span="16">
                  <div class="content">{{detailData.additionalCosts}}</div>
                </el-col> -->
                <!-- <el-col :span="8" class="title">签约时间</el-col>
                <el-col :span="16">
                  <div class="content">{{new Date(detailData.signTime).toLocaleDateString()}}</div>
                </el-col> -->
                <el-col v-if="detailData.source" :span="8" class="title">租客来源</el-col>
                <el-col v-if="detailData.source" :span="16">
                  <div v-if="detailData.source === 'MEDI'" class="content">个人中介</div>
                  <div v-else-if="detailData.source === 'CMEDI'" class="content">公司中介</div>
                  <div v-else-if="detailData.source === 'INTRO'" class="content">租客介绍</div>
                  <div v-else-if="detailData.source === 'CITY58'" class="content">58同城</div>
                  <div v-else-if="detailData.source === 'MANET'" class="content">赶集</div>
                  <div v-else-if="detailData.source === 'DBNET'" class="content">豆瓣</div>
                  <div v-else-if="detailData.source === 'SPNET'" class="content">春眠</div>
                  <div v-else-if="detailData.source === 'HZNET'" class="content">嗨住</div>
                  <div v-else-if="detailData.source === 'WECHAT'" class="content">微信公众号</div>
                  <div v-else-if="detailData.source === 'PATYJ'" class="content">甲方结转</div>
                  <div v-else-if="detailData.source === 'DTBET'" class="content">地推</div>
                  <div v-else-if="detailData.source === 'FLOOR19'" class="content">19楼</div>
                  <div v-else-if="detailData.source === 'OTHER'" class="content">其他</div>
                </el-col>
                
                <el-col v-if="detailData.houseKeeperName" :span="8" class="title">销售人员</el-col>
                <el-col v-if="detailData.houseKeeperName" :span="16">
                  <div class="content">{{detailData.houseKeeperName}}</div>
                </el-col>

                <el-col v-if="detailData.createTime" :span="8" class="title">合同创建时间</el-col>
                <el-col v-if="detailData.createTime" :span="16">
                  <div class="content">{{new Date(detailData.createTime).toLocaleDateString().replace(/\//g,"-")}} - {{new Date(detailData.createTime).toLocaleTimeString()}}</div>
                </el-col>
                <el-col v-if="detailData.enterName" :span="8" class="title">合同录入人员</el-col>
                <el-col v-if="detailData.enterName" :span="16">
                  <div class="content">{{detailData.enterName}}</div>
                </el-col>
                <el-col v-if="detailData.attachmentList.length !== 0" :span="8" class="title">PDF</el-col>
                <el-col v-if="detailData.attachmentList.length !== 0" :span="16">
                  <a target="_blank" :href="detailData.attachmentList[0]">点击查看</a>
                </el-col>

              </div>
              <div class="clear">
                <h3>房源信息</h3>
                <el-col v-if="detailData.houseSpaceName" :span="8" class="title">房源名称</el-col>
                <el-col v-if="detailData.houseSpaceName" :span="16">
                  <div class="content">{{detailData.houseSpaceName}}</div>
                </el-col>
                <el-col v-if="detailData.houseSpaceArea" :span="8" class="title">房源面积</el-col>
                <el-col v-if="detailData.houseSpaceArea" :span="16">
                  <div class="content">{{detailData.houseSpaceArea / 1000}}㎡</div>
                </el-col>
                <el-col v-if="detailData.guidePrice" :span="8" class="title">房源指导价</el-col>
                <el-col v-if="detailData.guidePrice" :span="16">
                  <div class="content">{{(detailData.guidePrice / 1000).toFixed(2)}}元</div>
                </el-col>
              </div>
              <!-- 随住人员信息 -->
              <div class="clear">
                <h3 v-if="peopleData.length !== 0">随住人员</h3>
                <div class="clear" v-if="peopleData.length !== 0">
                  <div :class="[index % 2 === 0 ? activeClass : '', fl, w50p]" v-for="(item,index) in peopleData">
                      <el-col v-if="item.userName" :span="8" class="title">姓名</el-col>
                      <el-col v-if="item.userName" :span="16">
                        <div class="content">{{item.userName}}</div>
                      </el-col>
                      <el-col v-if="item.userPhone" :span="8" class="title">手机号</el-col>
                      <el-col v-if="item.userPhone" :span="16">
                        <div class="content">{{item.userPhone}}</div>
                      </el-col>
                      <el-col v-if="item.certificateNumber" :span="8" class="title">身份证</el-col>
                      <el-col v-if="item.certificateNumber" :span="16">
                        <div class="content">{{item.certificateNumber}}</div>
                      </el-col>
                      <el-button class="pad20" type="primary" @click="deletePeople(item.id)">删除</el-button>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <div @click="detailShow.show = !detailShow.show" class="el-icon-close closeIco"></div>
      </div>
    </transition>
    <!-- 租约详情子组件 -->
    <leaseDetail :detailShow="leaseDetailShow" :leaseId="leaseId"></leaseDetail>
  </div>
</template>
<script>
import leaseDetail from '../components/leaseDetail'
const height = document.body.offsetHeight - 51
import $ from 'jquery'
export default {
  name: 'detail',
  data: function () {
    return {
      height: 'height:' + height + 'px',
      menuData: 'contract',
      detailData: '',
      fl: 'fl',
      w50p: 'w-50p',
      activeClass: 'activeClass',
      peopleData: '',
      // 详情组件
      leaseId: '',
      leaseDetailShow: {
        show: false
      }
    }
  },
  methods: {
    // 点击旧租约标签加载旧租约
    select (index, indexPath) {
      if (index === 'lease') {
        this.leaseId = this.oldLeaseId
        this.leaseDetailShow.show = true
      }
    },
    loadDetail (id) {
      // 获取详情数据
      this.$http.get(this.$store.state.contractUrl + 'getContractDetailsById/' + id, {
      }).then(function (response) {
        var data = response.data
        if (data.code === 200) {
          this.detailData = data.data
          for (var j = 0; j <= this.detailData.users.length - 1; j++) {
            if (this.detailData.users[j].representative === 'PARTB') {
              this.detailData.userName = this.detailData.users[j].userName
              this.detailData.userPhone = this.detailData.users[j].userPhone
              this.detailData.idCard = this.detailData.users[j].certificateNumber
              this.detailData.sex = this.detailData.users[j].sex
              this.detailData.certificateType = this.detailData.users[j].certificateType
            } else if (this.detailData.users[j].representative === 'PARTA') {
              this.detailData.houseKeeperName = this.detailData.users[j].userName
            }
          }
          this.$http.get(this.$store.state.contractUrl + 'listFollow/' + id, {
          }).then(function (response) {
            var data = response.data
            if (data.code === 200) {
              this.peopleData = data.data
            }
          }, function (response) {
            console.log(response.status)
          })
        }
      }, function (response) {
        console.log(response.status)
      })
    },
    deletePeople (id) {
      this.$http.post(this.$store.state.contractUrl + 'deleteFollowUser/' + id, {
        id: id
      }, {
      }).then(function (res) {
        let data = res.data
        if (data.code === 200) {
          this.$message('删除成功')
          this.loadDetail(this.contractId)
        }
      }, function (res) {
        console.log(res.status)
      })
    }
  },
  props: ['contractId', 'detailShow', 'oldLeaseId', 'terShow'],
  mounted: function () {
    this.$nextTick(function () {
      var $this = this
      $('body').click(function (event) {
        if (event.target.closest('.dialog') === null) {
          $this.detailShow.show = false
        }
      })
    })
  },
  components: {
    leaseDetail
  },
  watch: {
    'detailShow.show': function (val, oldVal) {
      if (val === true) {
        this.loadDetail(this.contractId)
      }
    }
  }
}
</script>
<style scoped>
::-webkit-scrollbar {display:none}
::-moz-scrollbar {display:none}
::-ms-scrollbar {display:none}
/*右侧弹窗*/
.pad20{
  margin-bottom: 20px;
}
.el-menu{
  background-color: #d3dce6;
}
.activeClass{
  margin-bottom: 19px;
  border-bottom: 1px dashed #ccc;
}
.w-50p{
  width: 100%;
}
.el-menu-item{
  background-color: #d3dce6;
  border-left: 3px solid #d3dce6;
  transition: all .5s;
}
.el-menu-item:hover{
  background-color: #fff;
  border-color: #20a0ff;
  color: #333;
}
.el-menu-item.is-active{
  background-color: #fff;
  border-color: #20a0ff;
  color: #333;
}
.dialog{
  width: 50%;
  position:fixed;
  top: 61px;
  background-color: #fff;
  right: 0;
  border-right:3px solid #ccc;
  border-top: 1px solid #ccc;
  z-index: 9999;
}
.fade-enter-active, .fade-leave-active {
  transition: right .5s
}
.fade-enter, .fade-leave-to {
  right: -50%;
}
.fade-enter-to, .fade-leave {
  right: 0;
}
.el-menu-vertical-demo{
  height: 100%;
}
.height-w100{
  height: 100%;
  overflow-y: auto;
}
.form-cont{
  height: calc(100vh - 60px);
  padding: 30px 50px;
  overflow-y: auto;
}
.form-contL{
  height: calc(100vh - 88px);
}
.closeIco{
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
}
.contain{
  color: #555;
  font-size: 13px;
}
.content{
  padding-bottom: 13px;
}
h3{
  padding-bottom: 5px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
}
</style>