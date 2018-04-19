<template>
  <div class="taskDetail">
    <transition name="fade">
      <div v-if="taskDetailShow.show" class="dialog" :style="height">
        <el-row class="height-w100">
          <el-col class="form-contL" :span="6" style="padding:0;">
              <el-menu :default-active="menuData" class="el-menu-vertical-demo" theme="dark">
                <el-menu-item class="menu-style" index="contract" @click="menuClick('contract')">租客合同详情</el-menu-item>
                <el-menu-item class="menu-style" index="lease" @click="menuClick('lease')">旧租约详情</el-menu-item>
              </el-menu>
          </el-col>
          <el-col class="form-cont" :span="18">
            <div v-show="newContract" class="contain">
              <div class="clear">
                <h3>租客信息</h3>
                <el-col :span="8" class="title">姓名</el-col>
                <el-col :span="16">
                  <div class="content">{{detailData.userName}}</div>
                </el-col>
                <el-col :span="8" class="title">手机号</el-col>
                <el-col :span="16">
                  <div class="content">{{detailData.userPhone}}</div>
                </el-col>
                <el-col v-if="detailData.idCard" :span="8" class="title">身份证</el-col>
                <el-col v-if="detailData.idCard" :span="16">
                  <div class="content">{{detailData.idCard}}</div>
                </el-col>
                <el-col v-if="detailData.sex" :span="8" class="title">性别</el-col>
                <el-col v-if="detailData.sex" :span="16">
                  <div class="content" v-if="detailData.sex === 'M'">男</div>
                  <div class="content" v-else-if="detailData.sex === 'F'">女</div>
                </el-col>
                <el-col v-if="detailData.source" :span="8" class="title">租客来源</el-col>
                <el-col v-if="detailData.source" :span="16">
                  <div v-if="detailData.source === 'MEDI'" class="content">中介</div>
                  <div v-else-if="detailData.source === 'INTRO'" class="content">租客介绍</div>
                  <div v-else-if="detailData.source === 'CITY58'" class="content">58同城</div>
                  <div v-else-if="detailData.source === 'MANET'" class="content">赶集</div>
                  <div v-else-if="detailData.source === 'DBNET'" class="content">豆瓣</div>
                  <div v-else-if="detailData.source === 'SPNET'" class="content">春眠</div>
                  <div v-else-if="detailData.source === 'HZNET'" class="content">嗨住</div>
                  <div v-else-if="detailData.source === 'WECHAT'" class="content">微信公众号</div>
                  <div v-else-if="detailData.source === 'PATYJ'" class="content">甲方</div>
                  <div v-else-if="detailData.source === 'DTBET'" class="content">地推</div>
                  <div v-else-if="detailData.source === 'FLOOR19'" class="content">19楼</div>
                  <div v-else-if="detailData.source === 'OTHER'" class="content">其他</div>
                </el-col>
                <el-col v-if="detailData.memo" :span="8" class="title">备注</el-col>
                <el-col v-if="detailData.memo" :span="16">
                  <div class="content">{{detailData.memo}}</div>
                </el-col>
              </div>
              <div class="clear">
                <h3>合同信息</h3>
                <el-col :span="8" class="title">合同状态</el-col>
                <el-col :span="16">
                  <div class="content" v-if="detailData.contractStatus === 'WAISIGN'">待签订</div>
                  <div class="content" v-else-if="detailData.contractStatus === 'SIGNING'">签订中</div>
                  <div class="content" v-else-if="detailData.contractStatus === 'ALSIGN'">已签订</div>
                  <div class="content" v-else-if="detailData.contractStatus === 'EFFECT'">已生效</div>
                  <div class="content" v-else-if="detailData.contractStatus === 'EARLYEND'">提前结束</div>
                  <div class="content" v-else-if="detailData.contractStatus === 'END'">正常结束</div>
                  <div class="content" v-else-if="detailData.contractStatus === 'CANCEL'">已取消</div>
                  <div class="content" v-else-if="detailData.contractStatus === 'TOAUDIT'">待审核</div>
                </el-col>
                <el-col :span="8" class="title">合同类型</el-col>
                <el-col :span="16">
                  <div class="content" v-if="detailData.signType==='NEW'">新签合同</div>
                  <div class="content" v-else-if="detailData.signType==='RENEWAL'">续租合同</div>
                  <div class="content" v-else-if="detailData.signType==='SUBLET'">转租合同</div>
                  <div class="content" v-else-if="detailData.signType==='CHANGE'">换房合同</div>
                </el-col>
                <el-col :span="8" class="title">合同编号</el-col>
                <el-col :span="16">
                  <div class="content">{{detailData.contractNumber}}</div>
                </el-col>
                <el-col :span="8" class="title">居住人数</el-col>
                <el-col :span="16">
                  <div class="content">{{detailData.livesNumber}}</div>
                </el-col>
                <el-col :span="8" class="title">起租-退租时间</el-col>
                <el-col :span="16">
                  <div class="content">{{new Date(detailData.startTime).toLocaleDateString()}}-{{new Date(detailData.endTime).toLocaleDateString()}}</div>
                </el-col>
                <!-- <el-col v-if="detailData.chargLogBeanList.length !== 0" :span="8" class="title">免租期时间</el-col>
                <el-col v-if="detailData.chargLogBeanList.length !== 0" :span="16">
                  <div class="content">{{new Date(detailData.chargLogBeanList[0].rentalFreeStart).toLocaleDateString()}}-{{new Date(detailData.chargLogBeanList[0].rentalFreeEnd).toLocaleDateString()}}</div>
                </el-col> -->
                <!-- 上调类型 -->
                <el-col v-if="detailData.chargLogBeanList.length !== 0" :span="8" class="title">上调类型</el-col>
                <el-col v-if="detailData.chargLogBeanList.length !== 0" :span="16">
                  <div v-if="detailData.chargLogBeanList[0].addType === 'NOTRISE'" class="content">不上调</div>
                  <div v-else-if="detailData.chargLogBeanList[0].addType === 'RISEBYAMOUNT'" class="content">上调金额数</div>
                  <div v-else class="content">百分比上调</div>
                </el-col>
                <!-- 上调周期 -->
                <el-col v-if="detailData.chargLogBeanList.length !== 0" :span="8" class="title">上调周期</el-col>
                <el-col v-if="detailData.chargLogBeanList.length !== 0" :span="16">
                  <div v-if="detailData.chargLogBeanList[0].addCycle === 'ONEMON'" class="content">1月增长</div>
                  <div v-else-if="detailData.chargLogBeanList[0].addCycle === 'THREEMON'" class="content">3月增长</div>
                  <div v-else-if="detailData.chargLogBeanList[0].addCycle === 'SIXMON'" class="content">6月增长</div>
                  <div v-else-if="detailData.chargLogBeanList[0].addCycle === 'TWELVEMON'" class="content">12月增长</div>
                  <div v-else-if="detailData.chargLogBeanList[0].addCycle === 'TWOMON'" class="content">2月增长</div>
                  <div v-else-if="detailData.chargLogBeanList[0].addCycle === 'FOURMON'" class="content">4月增长</div>
                  <div v-else class="content">不上调</div>
                </el-col>
                <!-- 上调金额数 -->
                <el-col v-if="detailData.chargLogBeanList.length !== 0" :span="8" class="title">上调金额数</el-col>
                <el-col v-if="detailData.chargLogBeanList.length !== 0" :span="16">
                  <div class="content">{{detailData.chargLogBeanList[0].addAmount}}</div>
                </el-col>
                <!-- 上调百分比 -->
                <el-col v-if="detailData.chargLogBeanList.length !== 0" :span="8" class="title">上调百分比</el-col>
                <el-col v-if="detailData.chargLogBeanList.length !== 0" :span="16">
                  <div class="content">{{detailData.chargLogBeanList[0].addPer}}</div>
                </el-col>
                <el-col v-if="detailData.rentType" :span="8" class="title">租赁类型</el-col>
                <el-col v-if="detailData.rentType" :span="16">
                  <div v-if="detailData.rentType === 'MONTH'" class="content">月租</div>
                  <div v-else class="content">日租</div>
                </el-col>
                <el-col :span="8" class="title">租赁方式</el-col>
                <el-col :span="16">
                  <div class="content" v-if="detailData.houseRentType === 'ENTIRE_RENT'">全租</div>
                  <div class="content" v-else>分租</div>
                </el-col>
                <el-col v-if="detailData.chargLogBeanList.length !== 0" :span="8" class="title">支付周期</el-col>
                <el-col v-if="detailData.chargLogBeanList.length !== 0" :span="16">
                  <div v-if="detailData.chargLogBeanList[0].cycle === 'ONEMON'" class="content">月付</div>
                  <div v-else-if="detailData.chargLogBeanList[0].cycle === 'THREEMON'" class="content">季付</div>
                  <div v-else-if="detailData.chargLogBeanList[0].cycle === 'SIXMON'" class="content">半年一付</div>
                  <div v-else-if="detailData.chargLogBeanList[0].cycle ==='TWELVEMON'" class="content">一年一付</div>
                  <div v-else-if="detailData.chargLogBeanList[0].cycle === 'TWOMON'" class="content">二月一付</div>
                  <div v-else-if="detailData.chargLogBeanList[0].cycle === 'FOURMON'" class="content">四月一付</div>
                  <div v-else-if="detailData.chargLogBeanList[0].cycle === 'ONEPAY'" class="content">一次付清</div>
                </el-col>
                <el-col :span="8" class="title">租金</el-col>
                <el-col :span="16">
                  <div class="content">{{(detailData.rental / 1000).toFixed(2)}}</div>
                </el-col>
                <el-col :span="8" class="title">押金</el-col>
                <el-col :span="16">
                  <div class="content">{{(detailData.deposit / 1000).toFixed(2)}}</div>
                </el-col>
                <el-col :span="8" class="title">定金</el-col>
                <el-col :span="16">
                  <div class="content">{{(detailData.earnest / 1000).toFixed(2)}}</div>
                </el-col>
                <!-- <el-col :span="8" class="title">违约金</el-col>
                <el-col :span="16">
                  <div class="content">{{(detailData.penalty / 1000).toFixed(2)}}</div>
                </el-col> -->
                <el-col v-if="detailData.additionalCosts" :span="8" class="title">其他费用</el-col>
                <el-col v-if="detailData.additionalCosts" :span="16">
                  <div class="content">{{detailData.additionalCosts}}</div>
                </el-col>
                <el-col :span="8" class="title">签约时间</el-col>
                <el-col :span="16">
                  <div class="content">{{new Date(detailData.signTime).toLocaleDateString()}}</div>
                </el-col>
                <el-col v-if="detailData.houseKeeperName" :span="8" class="title">销售人员</el-col>
                <el-col v-if="detailData.houseKeeperName" :span="16">
                  <div class="content">{{detailData.houseKeeperName}}</div>
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
                <el-col v-if="detailData.guidePrice" :span="8" class="title">指导价</el-col>
                <el-col v-if="detailData.guidePrice" :span="16">
                  <div class="content">{{detailData.guidePrice / 1000}}</div>
                </el-col>
              </div>
            </div>
            <div v-show="!newContract" class="contain">
              <div class="clear">
                <h3>租客信息</h3>
                <el-col :span="8" class="title">姓名</el-col>
                <el-col :span="16">
                  <div class="content">{{detailDataN.userName}}</div>
                </el-col>
                <el-col :span="8" class="title">手机号</el-col>
                <el-col :span="16">
                  <div class="content">{{detailDataN.userPhone}}</div>
                </el-col>
                <el-col v-if="detailDataN.idCard" :span="8" class="title">身份证</el-col>
                <el-col v-if="detailDataN.idCard" :span="16">
                  <div class="content">{{detailDataN.idCard}}</div>
                </el-col>
                <el-col v-if="detailDataN.sex" :span="8" class="title">性别</el-col>
                <el-col v-if="detailDataN.sex" :span="16">
                  <div class="content" v-if="detailDataN.sex === 'M'">男</div>
                  <div class="content" v-else-if="detailDataN.sex === 'F'">女</div>
                </el-col>
                <el-col v-if="detailDataN.source" :span="8" class="title">租客来源</el-col>
                <el-col v-if="detailDataN.source" :span="16">
                  <div v-if="detailDataN.source === 'MEDI'" class="content">个人中介</div>
                  <div v-else-if="detailDataN.source === 'CMEDI'" class="content">公司中介</div>
                  <div v-else-if="detailDataN.source === 'INTRO'" class="content">租客介绍</div>
                  <div v-else-if="detailDataN.source === 'CITY58'" class="content">58同城</div>
                  <div v-else-if="detailDataN.source === 'MANET'" class="content">赶集</div>
                  <div v-else-if="detailDataN.source === 'DBNET'" class="content">豆瓣</div>
                  <div v-else-if="detailDataN.source === 'SPNET'" class="content">春眠</div>
                  <div v-else-if="detailDataN.source === 'HZNET'" class="content">嗨住</div>
                  <div v-else-if="detailDataN.source === 'WECHAT'" class="content">微信公众号</div>
                  <div v-else-if="detailDataN.source === 'DTBET'" class="content">地推</div>
                  <div v-else-if="detailDataN.source === 'PATYJ'" class="content">甲方</div>
                  <div v-else-if="detailDataN.source === 'FLOOR19'" class="content">19楼</div>
                  <div v-else-if="detailDataN.source === 'OTHER'" class="content">其他</div>
                </el-col>
                <el-col v-if="detailDataN.memo" :span="8" class="title">备注</el-col>
                <el-col v-if="detailDataN.memo" :span="16">
                  <div class="content">{{detailDataN.memo}}</div>
                </el-col>
              </div>
              <div class="clear">
                <h3>合同信息</h3>
                <el-col :span="8" class="title">合同状态</el-col>
                <el-col :span="16">
                  <div class="content" v-if="detailDataN.contractStatus === 'WAISIGN'">待签订</div>
                  <div class="content" v-else-if="detailDataN.contractStatus === 'SIGNING'">签订中</div>
                  <div class="content" v-else-if="detailDataN.contractStatus === 'ALSIGN'">已签订</div>
                  <div class="content" v-else-if="detailDataN.contractStatus === 'EFFECT'">已生效</div>
                  <div class="content" v-else-if="detailDataN.contractStatus === 'EARLYEND'">提前结束</div>
                  <div class="content" v-else-if="detailDataN.contractStatus === 'END'">正常结束</div>
                  <div class="content" v-else-if="detailDataN.contractStatus === 'CANCEL'">已取消</div>
                  <div class="content" v-else-if="detailDataN.contractStatus === 'TOAUDIT'">待审核</div>
                </el-col>
                <el-col :span="8" class="title">合同编号</el-col>
                <el-col :span="16">
                  <div class="content">{{detailDataN.contractNumber}}</div>
                </el-col>
                <el-col :span="8" class="title">居住人数</el-col>
                <el-col :span="16">
                  <div class="content">{{detailDataN.livesNumber}}</div>
                </el-col>
                <el-col :span="8" class="title">起租-退租时间</el-col>
                <el-col :span="16">
                  <div class="content">{{new Date(detailDataN.startTime).toLocaleDateString()}}-{{new Date(detailDataN.endTime).toLocaleDateString()}}</div>
                </el-col>
                <!-- <el-col v-if="detailDataN.chargLogBeanList.length !== 0" :span="8" class="title">免租期时间</el-col>
                <el-col v-if="detailDataN.chargLogBeanList.length !== 0" :span="16">
                  <div class="content">{{new Date(detailDataN.chargLogBeanList[0].rentalFreeStart).toLocaleDateString()}}-{{new Date(detailDataN.chargLogBeanList[0].rentalFreeEnd).toLocaleDateString()}}</div>
                </el-col> -->
                <!-- 上调类型 -->
                <el-col v-if="detailDataN.chargLogBeanList.length !== 0" :span="8" class="title">上调类型</el-col>
                <el-col v-if="detailDataN.chargLogBeanList.length !== 0" :span="16">
                  <div v-if="detailDataN.chargLogBeanList[0].addType === 'NOTRISE'" class="content">不上调</div>
                  <div v-else-if="detailDataN.chargLogBeanList[0].addType === 'RISEBYAMOUNT'" class="content">上调金额数</div>
                  <div v-else class="content">百分比上调</div>
                </el-col>
                <!-- 上调周期 -->
                <el-col v-if="detailDataN.chargLogBeanList.length !== 0" :span="8" class="title">上调周期</el-col>
                <el-col v-if="detailDataN.chargLogBeanList.length !== 0" :span="16">
                  <div v-if="detailDataN.chargLogBeanList[0].addCycle === 'ONEMON'" class="content">1月增长</div>
                  <div v-else-if="detailDataN.chargLogBeanList[0].addCycle === 'THREEMON'" class="content">3月增长</div>
                  <div v-else-if="detailDataN.chargLogBeanList[0].addCycle === 'SIXMON'" class="content">6月增长</div>
                  <div v-else-if="detailDataN.chargLogBeanList[0].addCycle === 'TWELVEMON'" class="content">12月增长</div>
                  <div v-else-if="detailDataN.chargLogBeanList[0].addCycle === 'TWOMON'" class="content">2月增长</div>
                  <div v-else-if="detailDataN.chargLogBeanList[0].addCycle === 'FOURMON'" class="content">4月增长</div>
                  <div v-else class="content">不上调</div>
                </el-col>
                <!-- 上调金额数 -->
                <el-col v-if="detailDataN.chargLogBeanList.length !== 0" :span="8" class="title">上调金额数</el-col>
                <el-col v-if="detailDataN.chargLogBeanList.length !== 0" :span="16">
                  <div class="content">{{detailDataN.chargLogBeanList[0].addAmount}}</div>
                </el-col>
                <!-- 上调百分比 -->
                <el-col v-if="detailDataN.chargLogBeanList.length !== 0" :span="8" class="title">上调百分比</el-col>
                <el-col v-if="detailDataN.chargLogBeanList.length !== 0" :span="16">
                  <div class="content">{{detailDataN.chargLogBeanList[0].addPer}}</div>
                </el-col>
                <el-col v-if="detailDataN.rentType" :span="8" class="title">租赁类型</el-col>
                <el-col v-if="detailDataN.rentType" :span="16">
                  <div v-if="detailDataN.rentType === 'MONTH'" class="content">月租</div>
                  <div v-else class="content">日租</div>
                </el-col>
                <el-col :span="8" class="title">租赁方式</el-col>
                <el-col :span="16">
                  <div class="content" v-if="detailDataN.houseRentType === 'ENTIRE_RENT'">全租</div>
                  <div class="content" v-else>分租</div>
                </el-col>
                <el-col v-if="detailDataN.chargLogBeanList.length !== 0" :span="8" class="title">支付周期</el-col>
                <el-col v-if="detailDataN.chargLogBeanList.length !== 0" :span="16">
                  <div v-if="detailDataN.chargLogBeanList[0].cycle === 'ONEMON'" class="content">月付</div>
                  <div v-else-if="detailDataN.chargLogBeanList[0].cycle === 'THREEMON'" class="content">季付</div>
                  <div v-else-if="detailDataN.chargLogBeanList[0].cycle === 'SIXMON'" class="content">半年一付</div>
                  <div v-else-if="detailDataN.chargLogBeanList[0].cycle === 'TWELVEMON'" class="content">一年一付</div>
                  <div v-else-if="detailDataN.chargLogBeanList[0].cycle === 'TWOMON'" class="content">二月一付</div>
                  <div v-else-if="detailDataN.chargLogBeanList[0].cycle === 'FOURMON'" class="content">四月一付</div>
                  <div v-else-if="detailDataN.chargLogBeanList[0].cycle === 'ONEPAY'" class="content">一次付清</div>
                </el-col>
                <el-col :span="8" class="title">租金</el-col>
                <el-col :span="16">
                  <div class="content">{{(detailDataN.rental / 1000).toFixed(2)}}</div>
                </el-col>
                <el-col :span="8" class="title">押金</el-col>
                <el-col :span="16">
                  <div class="content">{{(detailDataN.deposit / 1000).toFixed(2)}}</div>
                </el-col>
                <el-col :span="8" class="title">定金</el-col>
                <el-col :span="16">
                  <div class="content">{{(detailDataN.earnest / 1000).toFixed(2)}}</div>
                </el-col>
                <!-- <el-col :span="8" class="title">违约金</el-col>
                <el-col :span="16">
                  <div class="content">{{(detailDataN.penalty / 1000).toFixed(2)}}</div>
                </el-col> -->
                <el-col v-if="detailDataN.additionalCosts" :span="8" class="title">其他费用</el-col>
                <el-col v-if="detailDataN.additionalCosts" :span="16">
                  <div class="content">{{detailDataN.additionalCosts}}</div>
                </el-col>
                <el-col :span="8" class="title">签约时间</el-col>
                <el-col :span="16">
                  <div class="content">{{new Date(detailDataN.signTime).toLocaleDateString()}}</div>
                </el-col>
                <el-col v-if="detailDataN.houseKeeperName" :span="8" class="title">销售人员</el-col>
                <el-col v-if="detailDataN.houseKeeperName" :span="16">
                  <div class="content">{{detailDataN.houseKeeperName}}</div>
                </el-col>
              </div>
              <div class="clear">
                <h3>房源信息</h3>
                <el-col v-if="detailDataN.houseSpaceName" :span="8" class="title">房源名称</el-col>
                <el-col v-if="detailDataN.houseSpaceName" :span="16">
                  <div class="content">{{detailDataN.houseSpaceName}}</div>
                </el-col>
                <el-col v-if="detailDataN.guidePrice" :span="8" class="title">指导价</el-col>
                <el-col v-if="detailDataN.guidePrice" :span="16">
                  <div class="content">{{detailDataN.guidePrice / 1000}}</div>
                </el-col>
              </div>
            </div>
          </el-col>
        </el-row>
        <div @click="taskDetailShow.show = !taskDetailShow.show" class="el-icon-close closeIco"></div>
      </div>
    </transition>
  </div>
</template>
<script>
const height = document.body.offsetHeight - 51
import $ from 'jquery'
export default {
  name: 'detail',
  data: function () {
    return {
      height: 'height:' + height + 'px',
      menuData: 'contract',
      newContract: true
    }
  },
  methods: {
    menuClick (data) {
      this.menuData = data
      if (data === 'contract') {
        this.newContract = true
      } else {
        this.newContract = false
      }
    }
  },
  props: ['detailData', 'taskDetailShow', 'detailDataN'],
  mounted: function () {
    this.$nextTick(function () {
      var $this = this
      $('body').click(function (event) {
        if (event.target.closest('.dialog') === null) {
          $this.taskDetailShow.show = false
        }
      })
    })
  }
}
</script>
<style scoped>
::-webkit-scrollbar {display:none}
::-moz-scrollbar {display:none}
::-ms-scrollbar {display:none}
/*右侧弹窗*/
.menu-style{
  color: #333!important;
}
.el-menu{
  background-color: #d3dce6;
}
.taskDetail .el-menu-item{
  background-color: #d3dce6;
  border-left: 3px solid #d3dce6;
  transition: all .5s;
}
.taskDetail .el-menu-item:hover{
  background-color: #fff!important;
  border-color: #20a0ff;
  color: #333;
}
.taskDetail .el-menu-item.is-active{
  background-color: #fff!important;
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