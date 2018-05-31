<template>
  <div>
    <transition name="fade" appear>
      <div v-if="created" class="dialog" style="height:calc(100vh-61px);">
        <el-row class="height-w100">
          <el-col class="form-contL" :span="6" style="padding:0;">
            <el-menu
              class="side-nav-menu-con"
              :default-active="currentMenu"
              @select="select">
              <el-menu-item index="contract">租客合同详情</el-menu-item>
              <el-menu-item v-if="info.oldLeaseId" index="lease">{{'租约详情'/*'旧租约详情'*/}}</el-menu-item>
            </el-menu>
          </el-col>
          <el-col v-if="info" class="form-cont" :span="18">
            <div class="contain">
              <div class="clear">
                <h3>租客信息</h3>
                <el-col :span="8" class="title">姓名</el-col>
                <el-col :span="16">
                  <div class="content">{{findUser.userName}}</div>
                </el-col>

                <template v-if="findUser.sex">
                  <el-col :span="8" class="title">性别</el-col>
                  <el-col :span="16">
                    <div class="content">{{findUser.sex === 'M' ? '男' : '女'}}</div>
                  </el-col>
                </template>

                <el-col :span="8" class="title">手机号</el-col>
                <el-col :span="16">
                  <div class="content">{{findUser.userPhone}}</div>
                </el-col>

                <template v-if="findUser.certificateType">
                  <el-col :span="8" class="title">证件类型</el-col>
                  <el-col :span="16">
                    <div class="content">
                      {{findUser.certificateType === 'ID' ? '身份证' : (
                        findUser.certificateType === 'BL' ? '营业执照' : '护照'
                      )}}
                    </div>
                  </el-col>
                </template>

                <template v-if="info.nationality">
                  <el-col :span="8" class="title">国籍</el-col>
                  <el-col :span="16">
                    <div class="content">{{info.nationality}}</div>
                  </el-col>
                </template>

                <template v-if="findUser.certificateNumber">
                  <el-col :span="8" class="title">证件号码</el-col>
                  <el-col :span="16">
                    <div class="content">{{findUser.certificateNumber}}</div>
                  </el-col>
                </template>

                <template v-if="info.urgentPhone">
                  <el-col :span="8" class="title">紧急联系人电话</el-col>
                  <el-col :span="16">
                    <div class="content">{{info.urgentPhone}}</div>
                  </el-col>
                </template>
              </div>

              <div class="clear">
                <h3>合同信息</h3>
                <el-col :span="8" class="title">合同编号</el-col>
                <el-col :span="16">
                  <div class="content">{{info.contractNumber}}</div>
                </el-col>

                <el-col :span="8" class="title">合同类型</el-col>
                <el-col :span="16">
                  <div class="content">{{info.signType | signType}}</div>
                </el-col>

                <el-col :span="8" class="title">合同状态</el-col>
                <el-col :span="16">
                  <div class="content">{{info.contractStatus | contractStatus}}</div>
                </el-col>

                <el-col v-if="info.storageType" :span="8" class="title">合同性质</el-col>
                <el-col v-if="info.storageType" :span="16">
                  <div class="content" v-if="info.storageType === 'ELE'">电子合同</div>
                  <div class="content" v-else-if="info.storageType === 'PAPER'">纸质合同</div>
                </el-col>

                <el-col v-if="info.memo" :span="8" class="title">备注</el-col>
                <el-col v-if="info.memo" :span="16">
                  <div class="content">{{info.memo}}</div>
                </el-col>
                <el-col v-if="info.poundage" :span="8" class="title">是否有偿</el-col>
                <el-col v-if="info.poundage" :span="16">
                  <div class="content">{{info.poundage | poundage}}</div>
                </el-col>

                <el-col :span="8" class="title">居住人数</el-col>
                <el-col :span="16">
                  <div class="content">{{info.livesNumber}}</div>
                </el-col>
                <el-col :span="8" class="title">起租-退租时间</el-col>
                <el-col :span="16">
                  <div class="content">{{new Date(info.startTime).toLocaleDateString()}}-{{new Date(info.endTime).toLocaleDateString()}}</div>
                </el-col>
                <el-col v-if="info.expiredOutTime" :span="8" class="title">搬出时间</el-col>
                <el-col v-if="info.expiredOutTime" :span="16">
                  <div class="content">{{new Date(info.expiredOutTime).toLocaleDateString()}}</div>
                </el-col>
                <!-- 计费规则详情 -->
                <div v-if="info.chargLogBeanList && info.chargLogBeanList.length !== 0">
                  <el-col v-if="info.chargLogBeanList[0].rentalFreeStart" :span="8" class="title">免租期时间</el-col>
                  <el-col v-if="info.chargLogBeanList[0].rentalFreeStart" :span="16">
                    <div class="content">{{new Date(info.chargLogBeanList[0].rentalFreeStart).toLocaleDateString()}}-{{new Date(info.chargLogBeanList[0].rentalFreeEnd).toLocaleDateString()}}
                    </div>
                  </el-col>
                  <!-- 上调类型 -->
                  <el-col :span="8" class="title" v-if="info.chargLogBeanList[0].addType !== 'NOTRISE'">上调类型</el-col>
                  <el-col :span="16" v-if="info.chargLogBeanList[0].addType !== 'NOTRISE'">
                    <div v-if="info.chargLogBeanList[0].addType === 'NOTRISE'" class="content">不上调</div>
                    <div v-else-if="info.chargLogBeanList[0].addType === 'RISEBYAMOUNT'" class="content">上调金额数</div>
                    <div v-else class="content">百分比上调</div>
                  </el-col>
                  <!-- 上调周期 -->
                  <el-col v-if="info.chargLogBeanList[0].addType !== 'NOTRISE'" :span="8" class="title">上调周期</el-col>
                  <el-col v-if="info.chargLogBeanList[0].addType !== 'NOTRISE'" :span="16">
                    <div v-if="info.chargLogBeanList[0].addCycle === 'ONEMON'" class="content">1月增长</div>
                    <div v-else-if="info.chargLogBeanList[0].addCycle === 'THREEMON'" class="content">3月增长</div>
                    <div v-else-if="info.chargLogBeanList[0].addCycle === 'SIXMON'" class="content">6月增长</div>
                    <div v-else-if="info.chargLogBeanList[0].addCycle === 'TWELVEMON'" class="content">12月增长</div>
                    <div v-else-if="info.chargLogBeanList[0].addCycle === 'TWOMON'" class="content">2月增长</div>
                    <div v-else-if="info.chargLogBeanList[0].addCycle === 'FOURMON'" class="content">4月增长</div>
                    <div v-else class="content">不上调</div>
                  </el-col>
                  <!-- 上调金额数 -->
                  <el-col v-if="info.chargLogBeanList[0].addAmount" :span="8" class="title">上调金额数</el-col>
                  <el-col v-if="info.chargLogBeanList[0].addAmount" :span="16">
                    <div class="content">{{(info.chargLogBeanList[0].addAmount / 1000).toFixed(2)}}</div>
                  </el-col>
                  <!-- 上调百分比 -->
                  <el-col v-if="info.chargLogBeanList[0].addPer" :span="8" class="title">上调百分比</el-col>
                  <el-col v-if="info.chargLogBeanList[0].addPer" :span="16">
                    <div class="content">{{info.chargLogBeanList[0].addPer / 1000}}</div>
                  </el-col>
                  <!-- <el-col v-if="info.rentType" :span="8" class="title">租赁类型</el-col>
                  <el-col v-if="info.rentType" :span="16">
                    <div v-if="info.rentType === 'MONTH'" class="content">月租</div>
                    <div v-else class="content">日租</div>
                  </el-col> -->
                  <el-col :span="8" class="title">租赁方式</el-col>
                  <el-col :span="16">
                    <div class="content" v-if="info.houseRentType === 'ENTIRE_RENT'">全租</div>
                    <div class="content" v-else>分租</div>
                  </el-col>
                  <el-col :span="8" class="title">支付周期</el-col>
                  <el-col :span="16">
                    <div v-if="info.chargLogBeanList[0].cycle === 'ONEMON'" class="content">月付</div>
                    <div v-else-if="info.chargLogBeanList[0].cycle === 'THREEMON'" class="content">季付</div>
                    <div v-else-if="info.chargLogBeanList[0].cycle === 'SIXMON'" class="content">半年一付</div>
                    <div v-else-if="info.chargLogBeanList[0].cycle === 'TWELVEMON'" class="content">一年一付</div>
                    <div v-else-if="info.chargLogBeanList[0].cycle === 'TWOMON'" class="content">二月一付</div>
                    <div v-else-if="info.chargLogBeanList[0].cycle === 'FOURMON'" class="content">四月一付</div>
                    <div v-else-if="info.chargLogBeanList[0].cycle === 'ONEPAY'" class="content">一次付清</div>
                  </el-col>
                </div>

                <el-col :span="8" class="title">租金</el-col>
                <el-col :span="16">
                  <div class="content">{{(info.rental / 1000).toFixed(2)}}</div>
                </el-col>
                <el-col :span="8" class="title">押金</el-col>
                <el-col :span="16">
                  <div class="content">{{(info.deposit / 1000).toFixed(2)}}</div>
                </el-col>
                <el-col v-if="info.firstCreditAmount" :span="8" class="title">首月减免金额</el-col>
                <el-col v-if="info.firstCreditAmount" :span="16">
                  <div class="content">{{info.firstCreditAmount / 1000}}</div>
                </el-col>
                <el-col v-if="info.earnest" :span="8" class="title">定金</el-col>
                <el-col v-if="info.earnest" :span="16">
                  <div class="content">{{(info.earnest / 1000).toFixed(2)}}</div>
                </el-col>
                <el-col v-if="info.source" :span="8" class="title">租客来源</el-col>
                <el-col v-if="info.source" :span="16">
                  <div v-if="info.source === 'MEDI'" class="content">个人中介</div>
                  <div v-else-if="info.source === 'CMEDI'" class="content">公司中介</div>
                  <div v-else-if="info.source === 'INTRO'" class="content">租客介绍</div>
                  <div v-else-if="info.source === 'CITY58'" class="content">58同城</div>
                  <div v-else-if="info.source === 'MANET'" class="content">赶集</div>
                  <div v-else-if="info.source === 'DBNET'" class="content">豆瓣</div>
                  <div v-else-if="info.source === 'SPNET'" class="content">春眠</div>
                  <div v-else-if="info.source === 'HZNET'" class="content">嗨住</div>
                  <div v-else-if="info.source === 'WECHAT'" class="content">微信公众号</div>
                  <div v-else-if="info.source === 'PATYJ'" class="content">甲方结转</div>
                  <div v-else-if="info.source === 'DTBET'" class="content">地推</div>
                  <div v-else-if="info.source === 'FLOOR19'" class="content">19楼</div>
                  <div v-else-if="info.source === 'OTHER'" class="content">其他</div>
                </el-col>

                <template v-if="info.users && info.users.length >= 2">
                  <el-col :span="8" class="title">销售人员</el-col>
                  <el-col :span="16">
                    <div class="content">{{info.users.find(u => u.representative === 'PARTA').userName}}</div>
                  </el-col>
                </template>

                <el-col v-if="info.createTime" :span="8" class="title">合同创建时间</el-col>
                <el-col v-if="info.createTime" :span="16">
                  <div class="content">{{new Date(info.createTime).toLocaleDateString().replace(/\//g,"-")}} - {{new Date(info.createTime).toLocaleTimeString()}}</div>
                </el-col>
                <el-col v-if="info.enterName" :span="8" class="title">合同录入人员</el-col>
                <el-col v-if="info.enterName" :span="16">
                  <div class="content">{{info.enterName}}</div>
                </el-col>
                <el-col v-if="info.contractPdf" :span="8" class="title">电子合同PDF</el-col>
                <el-col v-if="info.contractPdf" :span="16">
                  <a target="_blank" :href="info.contractPdf">点击查看</a>
                </el-col>

              </div>

              <div class="clear">
                <h3>房源信息</h3>
                <el-col v-if="info.houseSpaceName" :span="8" class="title">房源名称</el-col>
                <el-col v-if="info.houseSpaceName" :span="16">
                  <div class="content">{{info.houseSpaceName}}</div>
                </el-col>
                <el-col v-if="info.houseSpaceArea" :span="8" class="title">房源面积</el-col>
                <el-col v-if="info.houseSpaceArea" :span="16">
                  <div class="content">{{info.houseSpaceArea / 1000}}㎡</div>
                </el-col>
                <el-col v-if="info.guidePrice" :span="8" class="title">房源指导价</el-col>
                <el-col v-if="info.guidePrice" :span="16">
                  <div class="content">{{(info.guidePrice / 1000).toFixed(2)}}元</div>
                </el-col>
              </div>

              <!-- 随住人员信息 -->
              <div v-if="info.followUserList && info.followUserList.length" class="clear">
                <h3>随住人员</h3>
                <div class="clear">
                  <div :class="[index % 2 === 0 ? 'activeClass' : '', 'fl w-50p']" :key="index" v-for="(item, index) in info.followUserList">
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

        <div @click="handleClick" class="el-icon-close closeIco"></div>
      </div>
    </transition>

    <!-- 租约详情子组件 -->
    <lease-detail :detailShow="leaseShowing" :leaseId="info.oldLeaseId"></lease-detail>
  </div>
</template>

<script src="./script.js"></script>

<style scoped>
  .side-nav-menu-con {
    height: 100%;
    padding-top: 28px !important;
  }

  ::-webkit-scrollbar {
    display: none
  }

  ::-moz-scrollbar {
    display: none
  }

  ::-ms-scrollbar {
    display: none
  }

  /*右侧弹窗*/

  .pad20 {
    margin-bottom: 20px;
  }

  .el-menu {
    background-color: #d3dce6;
  }

  .activeClass {
    margin-bottom: 19px;
    border-bottom: 1px dashed #ccc;
  }

  .w-50p {
    width: 100%;
  }

  .el-menu-item {
    background-color: #d3dce6;
    border-left: 3px solid #d3dce6;
    transition: all .5s;
  }

  .el-menu-item:hover {
    background-color: #fff;
    border-color: #20a0ff;
    color: #333;
  }

  .el-menu-item.is-active {
    background-color: #fff;
    border-color: #20a0ff;
    color: #333;
  }

  .dialog {
    width: 50%;
    position: fixed;
    top: 61px;
    background-color: #fff;
    right: 0;
    border-right: 3px solid #ccc;
    border-top: 1px solid #ccc;
    z-index: 9999;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: right .5s
  }

  .fade-enter,
  .fade-leave-to {
    right: -50%;
  }

  .fade-enter-to,
  .fade-leave {
    right: 0;
  }

  .height-w100 {
    height: 100%;
    overflow-y: auto;
  }

  .form-cont {
    height: calc(100vh - 60px);
    padding: 30px 50px;
    overflow-y: auto;
  }

  .form-contL {
    height: calc(100vh - 88px);
  }

  .closeIco {
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
  }

  .contain {
    color: #555;
    font-size: 13px;
  }

  .content {
    padding-bottom: 13px;
  }

  h3 {
    padding-bottom: 5px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
  }

</style>
