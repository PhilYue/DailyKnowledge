<template>
  <div class="houseDetail" :style="{zIndex: zIndex}">
    <transition name="fade">
      <div v-if="houseDetailShow" class="dialog" :style="height" style="width:600px" >
        <el-row class="height-w100">
          <el-col class="form-cont" :span="8" style="padding:0; background: #eee; margin-top:0;">
              <el-menu :default-active="menuData" class="el-menu-vertical-demo" theme="dark">
                <el-menu-item index="house" @click="menuClick('house')" style="padding: 0; text-align:center;">房源详情</el-menu-item>
                <el-menu-item index="pay" @click="menuClick('pay')" style="padding: 0; text-align:center;">财务信息</el-menu-item>
                <el-menu-item index="contract" @click="menuClick('contract')" style="padding: 0; text-align:center;">合同信息</el-menu-item>
                <el-menu-item index="good" @click="menuClick('good')" style="padding: 0; text-align:center;">物品列表</el-menu-item>
                <el-menu-item index="img" @click="menuClick('img')" style="padding: 0; text-align:center;">图片列表</el-menu-item>
              </el-menu>
          </el-col>
          <el-col class="form-cont" :span="16">
            <el-col class="line" :span="24"><p class="HDTitle">{{tableData.keywordAddress}}</p></el-col>
            <!-- <p class="eitdButton" v-if="menuData === 'house' && houseEditWay === '1'" @click="houseEdit()">编辑</p> -->
            <div class="HDContent">
              <ul v-if="menuData === 'house'">
                <li class="f-cb">
                  <el-col class="line" :span="24"><h3>基本信息</h3></el-col>
                  <el-col class="line" :span="24">
                    <el-col class="line" :span="8">房源编号: </el-col>
                    <el-col class="line" :span="14"> {{tableData.businessId}}</el-col>
                    <el-col class="line" :span="8">房源面积: </el-col>
                    <el-col class="line" :span="14"> {{tableData.houseSpaceArea / 1000}}平方米</el-col>
                    <el-col class="line" :span="8">房源状态:</el-col>
                    <el-col class="line" :span="14">{{tableData.houseSpaceStatus1}}</el-col>
                    <span v-if="tableData.rentType !== 'JOINT_RENT'">
                      <el-col class="line" :span="8">房源类型: </el-col>
                      <el-col class="line" :span="14"> <span v-if="tableData.bedroomNumber">{{tableData.bedroomNumber}}室</span><span v-if="tableData.livingRoomNumber">{{tableData.livingRoomNumber}}厅</span><span v-if="tableData.kitchNumber">{{tableData.kitchNumber}}厨</span><span v-if="tableData.toiletNumber">{{tableData.toiletNumber}}卫</span></el-col>
                    </span>
                    <el-col class="line" :span="8" v-if="tableData.direction">朝向:</el-col>
                    <el-col class="line" :span="14" v-if="tableData.direction">{{tableData.direction}}</el-col>
                    <el-col class="line" :span="8">装修类型:</el-col>
                    <el-col class="line" :span="14" v-if="tableData.decorateType1">{{tableData.decorateType1}}</el-col>
                    <el-col class="line" :span="14" v-else>暂无信息</el-col>
                    <el-col class="line" :span="8">房间配备:</el-col>
                    <el-col class="line" :span="14">{{tableData.houseSpaceFeatureLists}}</el-col>
                  </el-col>
                </li>
                <li class="f-cb">
                  <el-col class="line" :span="24"><h3>价格</h3></el-col>
                  <el-col class="line" :span="24">
                    <el-col class="line" :span="8">收房价格:</el-col>
                    <el-col class="line" :span="14" v-if="tableData.getPrice">{{tableData.getPrice / 1000}}元</el-col>
                    <el-col class="line" :span="14" v-else>暂无定价</el-col>
                    <el-col class="line" :span="8">出租指导价格:</el-col>
                    <el-col class="line" :span="14" v-if="tableData.rentalPrice1">{{tableData.rentalPrice1}}元</el-col>
                    <el-col class="line" :span="14"  v-if="!tableData.rentalPrice1">暂无定价</el-col>
                    <el-col class="line" :span="8" v-if="tableData.rentalStatus">实际出租价格:</el-col>
                    <el-col class="line" :span="14" v-if="tableData.rentalStatus && tableData.actualRentalPrice1">{{tableData.actualRentalPrice1}}元</el-col>
                    <el-col class="line" :span="14"   v-if="tableData.rentalStatus && !tableData.actualRentalPrice1">暂无定价</el-col>
                  </el-col>
                </li>
                <!-- <li class="f-cb">
                  <el-col class="line" :span="24"><h3>管家信息</h3></el-col>
                  <el-col class="line" :span="24">
                    <el-col class="line" :span="8">姓名:</el-col>
                    <el-col class="line" :span="14"><p style="display:inline-block; position:relative;">暂无信息</p></el-col>
                    <el-col class="line" :span="8">联系方式:</el-col>
                    <el-col class="line" :span="14">暂无信息</el-col>
                  </el-col>
                </li> -->
                <li class="f-cb">
                  <el-col class="line" :span="24"><h3>房东信息</h3></el-col>
                  <el-col class="line" :span="24">
                    <el-col class="line" :span="8">姓名:</el-col>
                    <el-col class="line" :span="14">
                      <p style=" height:24px; line-height:24px; vertical-align:top; display:inline-block">
                        <span class="name-pos" style="cursor:pointer;"  @click="showPersonDetail(tableData.landlordId)">{{tableData.landlordName}}</span>
                        <p class="button" style="padding:0;" @click="showPersonDetail(tableData.landlordId)"></p>
                      </p>
                    </el-col>
                    <el-col class="line" :span="8">联系方式:</el-col>
                    <el-col class="line" :span="14">{{tableData.landlordPhone}}</el-col>
                    <el-col class="line" :span="8" v-if="tableData.startTime">托管开始时间:</el-col>
                    <el-col class="line" :span="14" v-if="tableData.startTime">{{tableData.startTime}}</el-col>
                    <el-col class="line" :span="8" v-if="tableData.endTime">托管结束时间:</el-col>
                    <el-col class="line" :span="14" v-if="tableData.endTime">{{tableData.endTime}}</el-col>
                  </el-col>
                </li>
                <li class="f-cb" v-if="tableData.houseSpaceStatus1 === '已出租' || tableData.houseSpaceStatus1 === '已预定'">
                  <el-col class="line" :span="24"><h3>租客信息</h3></el-col>
                  <el-col class="line" :span="24">
                    <el-col class="line" :span="8">姓名:</el-col>
                    <el-col class="line" :span="14" v-if="tableData.tenantName">
                      <p style=" height:24px; line-height:24px; vertical-align:top; display:inline-block">
                        <span style="cursor:pointer;" class="name-pos"  @click="showPersonDetail(tableData.tenantId)">{{tableData.tenantName}}</span>
                        <p class="button" style="padding:0;" @click="showPersonDetail(tableData.tenantId)"></p>
                      </p>
                    </el-col>
                    <el-col class="line" :span="14" v-else>暂无信息</el-col>
                    <el-col class="line" :span="8">联系方式:</el-col>
                    <el-col class="line" :span="14" v-if="tableData.tenantPhone">{{tableData.tenantPhone}}</el-col>
                    <el-col class="line" :span="14" v-else>暂无信息</el-col>
                  </el-col>
                </li>
              </ul>
              <ul v-if="menuData === 'pay'"  @click="rentalDetail">
                <li class="f-cb rentalPrice" v-for="payList in payLists">
                  <el-col :span="16" v-if="payList.payTime" style="margin-top:0;">
                    <div class="pad8">
                       <p style="display:inline-block; height:40px; line-height:40px; vertical-align:top">
                        <el-tooltip class="item" effect="light" content="支付时间" placement="top"><span class="name-pos">{{payList.payTime}}</span></el-tooltip></p>
                    </div>
                  </el-col>
                  <el-col :span="16" v-else style="margin-top:0;">
                    <div class="pad8">
                       <p style="height:20px; line-height:w0px;">
                        <el-tooltip class="item" effect="light" content="创建时间" placement="top">
                          <span class="name-pos">{{payList.payDurationStartTime}} - {{payList.payDurationEndTime}}</span>
                        </el-tooltip>
                        </p>
                    </div>
                  </el-col>
                  <el-col :span="8" style="margin-top:0;">
                    <div class="lin55">
                       <p style="height:20px; line-height:20px;">
                          <span class="name-pos"><nobr>{{payList.financeType}} ￥{{payList.amount / 1000}}</nobr></span>
                        </p>
                       <p style=" height:20px; line-height:20px;"><span class="name-pos">{{payList.orderStatus}}</span></p>
                    </div>
                  </el-col>
                  <!-- <el-col :span="4" style="margin-top:0;">
                    <div class="">
                       <p style=" height:40px; line-height:40px; vertical-align:top"></p>
                    </div>
                  </el-col>
                  <el-col :span="4" style="margin-top:0;">
                    <div class="">
                    </div>
                  </el-col> -->
                </li>
                <!-- <li class="f-cb rentalPrice" @click="rentalDetail">
                  <el-col :span="8">
                    <div class="">
                       <img src="https://o6niowncl.qnssl.com/user-default-img-b-14.png" width="40"/>
                       <p style="display:inline-block; height:40px; line-height:40px; vertical-align:top"><span class="name-pos">阮翔</span></p>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="">
                       <p style="height:40px; line-height:40px; vertical-align:top"><span class="name-pos">1500￥</span></p>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="">
                       <p style=" height:40px; line-height:40px; vertical-align:top"><span class="name-pos">房租</span></p>
                    </div>
                  </el-col>
                  <el-col :span="3">
                    <div class="">
                       <p style=" height:40px; line-height:40px; vertical-align:top"><span class="name-pos">已交</span></p>
                    </div>
                  </el-col>
                </li> -->
                <h3 v-if="payPage.totleSize === 0 && payPage.loading !== 0" style="text-align:center">暂无信息</h3>
                <div class="block" v-if="payPage.totleSize > payPage.pageSize">
                  <el-pagination small class="paging" @size-change="paySizeChange" @current-change="payCurrentChange" :current-page.sync="payPage.pageNo" :page-size="payPage.pageSize" layout="prev, pager, next" :total="payPage.totleSize"></el-pagination>
                </div>
              </ul>
              <ul v-if="menuData === 'contract'" class="contractList">
                <li class="f-cb" v-for="contract in contractLists">
                  <el-col :span="10" class="contractLine">
                    <div>
                       <p><span class="name-pos">{{contract.contractNumber}}</span></p>
                    </div>
                  </el-col>
                  <el-col :span="14" class="contractLine textAlignRight">
                    <div>
                       <el-tooltip class="item" effect="light" content="合同时间" placement="top">
                       <p ><span class="name-pos">{{contract.startTime}} - {{contract.endTime}}</span></p>
                     </el-tooltip>
                    </div>
                  </el-col>
                  <el-col :span="10" class="contractLine ">
                    <div>
                       <p><span class="name-pos">{{contract.contractType1}}({{contract.contractStatusChange}})</span></p>
                    </div>
                  </el-col>
                  <el-col :span="14" class="contractLine textAlignRight">
                      <div><el-button type="primary" @click="contractDetail(contract)">查看合同</el-button></div>
                  </el-col>
                </li>
                <h3 v-if="contractPage.totleSize === 0 && contractPage.loading !== 0  " style="text-align:center">暂无信息</h3>
                <div class="block" v-if="contractPage.totleSize > contractPage.pageSize">
                  <el-pagination small class="paging" @size-change="paySizeChange" @current-change="contractCurrentChange" :current-page.sync="contractPage.pageNo" :page-size="contractPage.pageSize" layout="prev, pager, next" :total="contractPage.totleSize"></el-pagination>
                </div>
                <!-- <li class="f-cb">
                  <el-col :span="8">
                    <div class="">
                       <p style="display:inline-block; height:40px; line-height:40px; vertical-align:top"><span class="name-pos">2017002362</span></p>
                    </div>
                  </el-col>
                  <el-col :span="3">
                    <div class="">
                       <p style="height:40px; line-height:40px; vertical-align:top"><span class="name-pos">已签订</span></p>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div class="">
                       <p style=" height:40px; line-height:40px; vertical-align:top"><span class="name-pos">托管合同</span></p>
                    </div>
                  </el-col>
                  <el-col :span="11">
                    <div class="">
                       <p style=" height:40px; line-height:40px; vertical-align:top"><span class="name-pos">2017-10-28 -- 2018-11-8</span></p>
                    </div>
                  </el-col>
                </li> -->
              </ul>
              <ul v-if="menuData === 'good'">
                <el-button type="primary" size="small" @click="goodAdd">物品增配</el-button>
                <el-button type="primary" size="small" @click="goodReduce">物品搬出</el-button>
                <div v-if="goodPage.totleSize !== 0">
                <li class="f-cb" v-for="goodList in goodLists">
                  <h4 class="goodListH4">{{goodList.fixedAssetsType1}}</h4>
                  <div class="goodList" v-for="list in goodList.resFixedAssetsBeanList">
                    <el-col :span="8" style="margin-top:0">
                      <div class="lin55">
                         <p style="height:40px; line-height:40px; vertical-align:top"><span class="name-pos">{{list.fixedAssetsName}}*{{list.fixedAssetsNumber}}</span></p>
                      </div>
                    </el-col>
                    <el-col :span="8" style="margin-top:0">
                      <div class="">
                         <p style=" height:40px; line-height:40px; vertical-align:top; display:inline-block"><span class="name-pos">{{list.inputPersonnelName}}</span></p><p class="button" @click="showPersonDetail(list.inputPersonnelId)"></p>
                      </div>
                    </el-col>
                    <el-col :span="8" style="margin-top:0">
                      <div class="lin55">
                         <p style=" height:40px; line-height:40px; vertical-align:top"><span class="name-pos">{{list.time}}</span></p>
                      </div>
                    </el-col>
                  </div>
                </li>
                </div>
                <h3 v-else style="text-align:center; margin-top:20px;">暂无信息</h3>
                <!-- <li class="f-cb">
                  <el-col :span="8">
                    <div class="">
                       <p style="display:inline-block; height:40px; line-height:40px; vertical-align:top"><span class="name-pos">2017002362</span></p>
                    </div>
                  </el-col>
                  <el-col :span="3">
                    <div class="">
                       <p style="height:40px; line-height:40px; vertical-align:top"><span class="name-pos">洗衣机</span></p>
                    </div>
                  </el-col>
                  <el-col :span="3">
                    <div class="">
                       <p style=" height:40px; line-height:40px; vertical-align:top"><span class="name-pos">2台</span></p>
                    </div>
                  </el-col>
                  <el-col :span="3">
                    <div class="">
                       <p style=" height:40px; line-height:40px; vertical-align:top"><span class="name-pos">搬入</span></p>
                    </div>
                  </el-col>
                  <el-col :span="3">
                    <div class="">
                       <p style=" height:40px; line-height:40px; vertical-align:top; display:inline-block"><span class="name-pos">阮翔</span></p><p class="button" @click="showDetail(tableData)"></p>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="">
                       <p style=" height:40px; line-height:40px; vertical-align:top"><span class="name-pos">2017-09-09</span></p>
                    </div>
                  </el-col>
                </li> -->
              </ul>
              <ul v-if="menuData === 'img'">
                <div class="imgList f-cb">
                  <li v-for="(item, index) in imgLists" @click="openBigImg(index, $event)">
                    <a href="javascript:void(0)" target="_blank">
                      <div class="img">
                        <div>
                          <span>
                            <img :src="item.fileUrl + '?x-oss-process=style/zoom_rule'">
                          </span>
                        </div>
                        <div class="btn1">
                          <div @click="toTop(item)"><p>置顶</p></div>
                          <div @click="deleteImg(item)"><p>删除</p></div>
                        </div>
                      </div>
                      <p>{{item.fileName}}</p>
                    </a>
                  </li>
                </div>
                <div class="bigImg">
                  <span class="cell">
                    <div class="table">
                      <div>
                        <span class="cell"><img src=""></span>
                        <p class="el-icon-arrow-left" @click="showPrevImg()"></p>
                        <p class="el-icon-arrow-right" @click="showNextImg()"></p>
                      </div>
                    </div>
                  </span>
                  <p class="closeIco" @click="closeBigImg"></p>
                </div>
              </ul>
            </div>
          </el-col>
        </el-row>
        <div @click="close" class="">
          <span class="el-icon-close closeIco"></span>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import $ from 'jquery'
import reduceGood from './reduceGood'  //  房源列表
const height = window.screen.height - 61
export default {
  name: 'detail',
  data: function () {
    return {
      height: 'height:' + height + 'px',
      menuData: 'house',
      // houseSpaceId: '',
      tableData: {},
      goodLists: [], // 物品列表
      payLists: [], // 支付列表
      contractLists: [], // 合同列表
      imgLists: [], // 图片列表
      payPage: {
        pageSize: 10,
        pageNo: 1,
        totleSize: 0,
        loading: 0
      },
      contractPage: {
        pageSize: 10,
        pageNo: 1,
        totleSize: 0,
        loading: 0
      },
      goodPage: {
        totleSize: 0
      },
      houseDetailShow: false,
      mix: {
        goodList: this.$store.state.houseUrl + 'list/fixedAssets', // 查询物品列表
        payList: this.$store.state.payUrl + 'list', // 查询物品列表
        contractList: this.$store.state.contractUrl + 'list', // 查询物品列表
        picStick: this.$store.state.houseUrl + 'file/stick', // 附件置顶
        detelePic: this.$store.state.houseUrl + 'file/delete/' // 删除图片
      },
      picIndex: 0,
      loading: 0 // 判断是否是第一次加载页面
    }
  },
  props: ['houseSpaceId', 'clickCount', 'detailShowPage', 'detailHouseType', 'houseDetailShows', 'houseDetailText', 'zIndex', 'houseEditWay'],
  watch: {
    houseDetailShows: function (value) {
      if (this.houseSpaceId) {
        this.contractLists = []
        this.contractPage.payTotleSize = 0
        this.goodLists = []
        this.goodPage.totleSize = 0
        this.payLists = []
        this.payPage.totleSize = 0
        this.$options.methods.getHouseDetail(this)
        this.$options.methods.getGoodList(this)
        // this.$options.methods.getPayList(this)
        this.$options.methods.getContractList(this)
        this.$options.methods.getImgList(this)
        this.menuData = this.detailShowPage
        this.houseDetailShow = this.houseDetailShows
      }
    }
  },
  created () {
    this.contractLists = []
    this.contractPage.payTotleSize = 0
    this.goodLists = []
    this.goodPage.totleSize = 0
    this.payLists = []
    this.payPage.totleSize = 0
    this.$options.methods.getHouseDetail(this)
    this.$options.methods.getGoodList(this)
    this.$options.methods.getContractList(this)
    this.$options.methods.getImgList(this)
    this.menuData = this.detailShowPage
  },
  methods: {
    getHouseDetail (_this) { // 获取房屋详情
      let url = _this.$store.state.houseUrl + 'get'
      _this.$http.post(url, {houseSpaceId: _this.houseSpaceId}).then(({data}) => {
        if (data.code === 200) {
          _this.$options.methods.entireRentSummation(data.data)
          _this.tableData = data.data
          _this.tableData.time = []
        }
        if (data.code === 1000) {
          _this.tableData = []
        }
      })
    },
    getGoodList (_this) { // 获取物品列表
      _this.goodLists = []
      _this.goodPage.totleSize = 0
      let url = _this.$store.state.houseUrl + 'list/fixedAssets'
      _this.goodLists = []
      _this.goodPage.totleSize = 0
      _this.$http.post(url, {houseSpaceId: _this.houseSpaceId, houseSpaceType: 'HOUSE_SPACE'}).then(({data}) => {
        if (data.code === 200) {
          data.data = this.goodListsTransform(data.data)
          _this.goodLists = data.data
          _this.goodPage.totleSize = data.data.length
        }
        if (data.code === 1000) {
          _this.goodLists = []
          _this.goodPage.totleSize = 0
        }
      })
    },
    getPayList (_this) { // 获取支付列表
      _this.payPage.loading = 0
      _this.payLists = []
      _this.payPage.totleSize = 0
      let url = _this.$store.state.payUrl + 'list'
      _this.$http.post(url, {houseId: _this.houseSpaceId, pageNo: _this.payPage.pageNo, pageSize: _this.payPage.pageSize, contractId: _this.contractId}).then(function (res) {
        let data = res.body
        if (data.code === 200) {
          _this.payPage.totleSize = data.data.totalCount
          data.data = this.payListsTransform(data.data.list)
          _this.payLists = data.data
        } else {
          _this.payLists = []
          _this.payPage.totleSize = 0
        }
        _this.payPage.loading = 1
      })
    },
    getContractList (_this) { // 获取合同列表
      _this.payLists = []
      _this.contractPage.payTotleSize = 0
      _this.contractPage.loading = 0
      let req = {}
      req.houseSpaceId = _this.houseSpaceId
      req.pageNo = _this.contractPage.pageNo
      req.pageSize = _this.contractPage.pageSize
      req.loginId = _this.$store.state.currentUser.uid
      // req.contractType = 'RENT'
      _this.$http.post(_this.mix.contractList, req).then(function (res) {
        let data = JSON.parse(res.bodyText)
        if (data.code === 200) {
          _this.contractPage.totleSize = data.data.totalCount
          _this.contractLists = _this.$options.methods.conList(_this.contractLists)
          // let list = {}
          _this.contractLists = _this.$options.methods.conStatus(data.data.list)
          for (let i = 0; i < _this.contractLists.length; i++) {
            if (_this.contractLists[i].contractType1 !== '出租合同') {
              _this.tableData = Object.assign({}, _this.tableData, {
                startTime: _this.contractLists[i].startTime,
                endTime: _this.contractLists[i].endTime
              })
            }
            if (_this.contractLists[i].contractStatus === 'EFFECT') {
              _this.contractId = _this.contractLists[i].id
              this.$options.methods.getPayList(_this)
            }
          }
        } else {
          _this.payLists = []
          _this.contractPage.payTotleSize = 0
        }
        _this.contractPage.loading = 1
      })
    },
    getImgList (_this) { // 获取图片列表
      _this.imgLists = []
      let url = _this.$store.state.houseUrl + 'list/houseSpaceFile'
      _this.$http.post(url, {'houseSpaceId': _this.houseSpaceId}).then(function (data) {
        if (data.body.code === 200) {
          _this.imgLists = data.body.data
        }
      })
    },
    goodListsTransform (data) {
      for (var i in data) {
        switch (data[i].fixedAssetType) {
          case 'E_METER':
            data[i].fixedAssetsType1 = '电表'
            break
          case 'W_METER':
            data[i].fixedAssetsType1 = '水表'
            break
          case 'G_METER':
            data[i].fixedAssetsType1 = '煤气表'
            break
          case 'DOOR_LOCK':
            data[i].fixedAssetsType1 = '门锁'
            break
          case 'FURNITURE':
            data[i].fixedAssetsType1 = '家具'
            break
          case 'HA':
            data[i].fixedAssetsType1 = '家电'
            break
          case 'RESTS':
            data[i].fixedAssetsType1 = '其他'
            break
          case 'BROAD_BAND':
            data[i].fixedAssetsType1 = '宽带'
            break
        }
        for (var j in data[i].resFixedAssetsBeanList) {
          var startTime = new Date(data[i].resFixedAssetsBeanList[j].createTime)
          data[i].resFixedAssetsBeanList[j].time = startTime.getFullYear() + '/' + (startTime.getMonth() + 1) + '/' + startTime.getDate()
        }
      }
      return data
    },
    payListsTransform (data) {
      for (var i in data) {
        if (data[i].payDurationStartTime) {
          var payTime = new Date(data[i].payDurationStartTime)
          data[i].payDurationStartTime = payTime.getFullYear() + '/' + (payTime.getMonth() + 1) + '/' + payTime.getDate()
        }
        if (data[i].payDurationEndTime) {
          var createTime = new Date(data[i].payDurationEndTime)
          data[i].payDurationEndTime = createTime.getFullYear() + '/' + (createTime.getMonth() + 1) + '/' + createTime.getDate()
        }
        if (data[i].payTime) {
          var payTime1 = new Date(data[i].payTime)
          data[i].payTime = payTime1.getFullYear() + '/' + (payTime1.getMonth() + 1) + '/' + payTime1.getDate()
        }
        // if (data[i].payPurposeType === 'REN') {
        //   console.log(data[i].financeType)
        //   switch (data[i].financeType) {
        //     case 'INC':
        //       data[i].financeType = '租金'
        //       break
        //     case 'PAY':
        //       data[i].financeType = '支出'
        //       break
        //     case 'DISC':
        //       data[i].financeType = '抵扣'
        //       break
        //     case 'DESP':
        //       data[i].financeType = '押金'
        //       break
        //     case 'EARNEST':
        //       data[i].financeType = '定金'
        //       break
        //   }
        // }
        switch (data[i].financeType) {
          case 'INC':
            data[i].financeType = '租金'
            break
          case 'PAY':
            data[i].financeType = '支出'
            break
          case 'DISC':
            data[i].financeType = '抵扣'
            break
          case 'DESP':
            data[i].financeType = '押金'
            break
          case 'EARNEST':
            data[i].financeType = '定金'
            break
        }
        switch (data[i].orderStatus) {
          case 'NEW':
            data[i].orderStatus = '未支付'
            break
          case 'PAYING':
            data[i].orderStatus = '支付中'
            break
          case 'SUC':
            data[i].orderStatus = '支付成功'
            break
          case 'FAIL':
            data[i].orderStatus = '支付失败'
            break
          case 'PDOFF':
            data[i].orderStatus = '线下已支付'
            break
          case 'PDON':
            data[i].orderStatus = '线上直接转账已支付'
            break
          case 'PARTPAID':
            data[i].orderStatus = '分拆后部分已支付'
            break
          case 'FULLYPAID':
            data[i].orderStatus = '分拆后全部已支付'
            break
          case 'MERGEDPAID':
            data[i].orderStatus = '合并后总订单已支付'
            break
          case 'MER':
            data[i].orderStatus = '已被合并'
            break
          case 'SPL':
            data[i].orderStatus = '已被分拆'
            break
          case 'RETURNING':
            data[i].orderStatus = '返还中'
            break
          case 'NOT_RETURN':
            data[i].orderStatus = '不需要返还'
            break
          case 'RET':
            data[i].orderStatus = '已返还'
            break
          case 'CF':
            data[i].orderStatus = '已结转'
            break
          case 'DEL':
            data[i].orderStatus = '已删除'
            break
          case 'CONFIRM':
            data[i].orderStatus = '已确认'
            break
          case 'ISSUED':
            data[i].orderStatus = '已开发票'
            break
          case 'CUR_SPL_CONF':
            data[i].orderStatus = '部分分拆生成订单已确认'
            break
          case 'ALL_SPL_CONF':
            data[i].orderStatus = '全部分拆生成订单已确认'
            break
          case 'MER_CONF':
            data[i].orderStatus = '总账单已确认'
            break
        }
        // let payPurposeType = data[i].financeType
        // switch (payPurposeType) {
        //   case 'REN':
        //     payPurposeType = '租金'
        //     break
        //   case 'WATER':
        //     payPurposeType = '水费'
        //     break
        //   case 'ELEC':
        //     payPurposeType = '电费'
        //     break
        //   case 'GAS':
        //     payPurposeType = '煤气费'
        //     break
        //   case 'COM':
        //     payPurposeType = '赔偿'
        //     break
        //   case 'MAIN':
        //     payPurposeType = '维修'
        //     break
        //   case 'CLEAN':
        //     payPurposeType = '保洁'
        //     break
        //   case 'CONSUME':
        //     payPurposeType = '消费'
        //     break
        //   case 'OTH':
        //     payPurposeType = '其他费用'
        //     break
        // }
        // data[i].payPurposeType = payPurposeType
      }
      return data
    },
    conStatus (data) { // 转换合同状态以及合同生效时间以及结束时间
      var len = data.length
      for (var i = 0; i < len; i++) {
        var pay = data[i].contractStatus
        switch (pay) {
          case 'WAISIGN':
            data[i].contractStatusChange = '待签订'
            break
          case 'SIGNING':
            data[i].contractStatusChange = '签订中'
            break
          case 'ALSIGN':
            data[i].contractStatusChange = '已签订'
            break
          case 'EFFECT':
            data[i].contractStatusChange = '已生效'
            break
          case 'ENDING':
            data[i].contractStatusChange = '终止中'
            break
          case 'EARLYEND':
            data[i].contractStatusChange = '提前结束'
            break
          case 'CANCEL':
            data[i].contractStatusChange = '取消'
            break
          case 'TOAUDIT':
            data[i].contractStatusChange = '待审核'
            break
          case 'END':
            data[i].contractStatusChange = '正常结束'
            break
        }
        switch (data[i].contractType) {
          case 'RENT':
            data[i].contractType1 = '出租合同'
            break
          case 'DELEGATE':
            data[i].contractType1 = '托管合同'
            break
        }
        switch (data[i].payCycle) {
          case 'ONEMON':
            data[i].payWay = '月付'
            data[i].payCycleChange = '1'
            break
          case 'THREEMON':
            data[i].payWay = '季付'
            data[i].payCycleChange = '2'
            break
          case 'SIXMON':
            data[i].payWay = '半年一付'
            data[i].payCycleChange = '3'
            break
          case 'TWELVEMON':
            data[i].payWay = '年付'
            data[i].payCycleChange = '4'
            break
          case 'ONEPAY':
            data[i].payWay = '全额'
            data[i].payCycleChange = '5'
            break
          case 'TWOMON':
            data[i].payWay = '二月付'
            data[i].payCycleChange = '6'
            break
          case 'FOURMON':
            data[i].payWay = '四月付'
            data[i].payCycleChange = '7'
            break
        }
        var startTime = new Date(data[i].startTime)
        data[i].startTime = startTime.getFullYear() + '/' + (startTime.getMonth() + 1) + '/' + (startTime.getDate())
        var endTime = new Date(data[i].endTime)
        data[i].endTime = endTime.getFullYear() + '/' + (endTime.getMonth() + 1) + '/' + (endTime.getDate())
        data[i].rental1 = data[i].rental / 1000
        data[i].deposit1 = data[i].deposit / 1000
        if (data[i].rentFreeStart !== null && data[i].rentFreeStart !== '') {
          startTime = new Date(data[i].rentFreeStart)
          data[i].rentFreeStart = startTime.getFullYear() + '/' + (startTime.getMonth() + 1) + '/' + (startTime.getDate())
        }
        if (data[i].rentFreeEnd !== null && data[i].rentFreeEnd !== '') {
          endTime = new Date(data[i].rentFreeEnd)
          data[i].rentFreeEnd = endTime.getFullYear() + '/' + (endTime.getMonth() + 1) + '/' + (endTime.getDate())
        }
      }
      return data
    },
    conList (data) { // 将房东信息从user拎到list表中
      for (var p in data) {
        if (data[p].users !== '' && data[p].users !== null) {
          for (var i in data[p].users) {
            if (data[p].users[i].representative === 'PARTB') {
              data[p].username = data[p].users[i].userName
              data[p].userName = data[p].users[i].userName
              data[p].phoneNum = data[p].users[i].phoneNum
              data[p].cerNum = data[p].users[i].cerNum
              data[p].UserId = data[p].users[i].id
              data[p].conId = data[p].users[i].conId
              data[p].bankAccount = data[p].users[i].bankAccount
              data[p].bankName = data[p].users[i].bankName
              data[p].cerType = data[p].users[i].certificateType
              data[p].contractType = 'DELEGATE'
              data[p].signType = 'NEW'
            }
          }
        }
      }
      return data
    },
    paySizeChange () { // 支付没页数改变
    },
    payCurrentChange () { // payCurrentChange
      this.$options.methods.getPayList(this)
    },
    contractCurrentChange () {
      this.$options.methods.getContractList(this)
    },
    entireRentSummation (data) { // 累加整租空置数量
      data.houseSpaceArea1 = data.houseSpaceArea / 1000
      if (data.actualRentalPrice !== null && data.actualRentalPrice !== '' && data.houseSpaceStatus === 'RENTED') {
        data.actualRentalPrice1 = data.actualRentalPrice / 1000
        data.rentalStatus = true
      }
      if (data.expectedRentalPrice) {
        data.rentalPrice1 = data.expectedRentalPrice / 1000
      } else {
        data.rentalPrice1 = null
      }
      switch (data.houseSpaceStatus) {
        case 'WAIT_DELEGATE':
          data.houseSpaceStatus1 = '待托管'
          break
        case 'ASSESSING':
          data.houseSpaceStatus1 = '评估中'
          break
        case 'APPROVED':
          data.houseSpaceStatus1 = '审核通过'
          break
        case 'SIGNING_C':
          data.houseSpaceStatus1 = '签订托管合同中'
          break
        case 'LC_NOT_TE':
          data.houseSpaceStatus1 = '托管合同未生效'
          break
        case 'DC_TE':
          data.houseSpaceStatus1 = '托管合同已生效'
          break
        case 'DESIGNING':
          data.houseSpaceStatus1 = '设计中'
          break
        case 'CONSTRUCTING':
          data.houseSpaceStatus1 = '施工中'
          break
        case 'CHECKING':
          data.houseSpaceStatus1 = '验收中'
          break
        case 'RETAIN':
          data.houseSpaceStatus1 = '保留'
          break
        case 'RENTABLE':
          data.houseSpaceStatus1 = '空置'
          break
        case 'RESERVED':
          data.houseSpaceStatus1 = '已预定'
          break
        case 'SIGNING_LC':
          data.houseSpaceStatus1 = '签订租赁合同中'
          break
        case 'RENTED':
          data.houseSpaceStatus1 = '已出租'
          break
        case 'FREEZING':
          data.houseSpaceStatus1 = '已冻结'
          break
        case 'DELETED':
          data.houseSpaceStatus1 = '已删除'
          break
      }
      // 转换装修类型
      switch (data.decorateType) {
        case 'R':
          data.decorateType1 = '毛坯房'
          break
        case 'S':
          data.decorateType1 = '简装'
          break
        case 'RD':
          data.decorateType1 = '精装'
          break
        case 'A':
          data.decorateType1 = '豪华装修'
          break
        case '':
          data.decorateType1 = ''
          break
      }
      // 转换朝向
      switch (data.direction) {
        case 'EAST':
          data.direction = '东'
          break
        case 'SOUTH':
          data.direction = '南'
          break
        case 'WEST':
          data.direction = '西'
          break
        case 'NORTH':
          data.direction = '北'
          break
        case 'SOUTHEAST':
          data.direction = '东南'
          break
        case 'NORTHEAST':
          data.direction = '东北'
          break
        case 'SOUTHWEST':
          data.direction = '西南'
          break
        case 'NORTHWEST':
          data.direction = '西北'
          break
      }
      let houseFeatureEnumList = ''
      if (data.houseSpaceFeatureList.length > 0) {
        for (let i = 0; i < data.houseSpaceFeatureList.length; i++) {
          let str = ''
          switch (data.houseSpaceFeatureList[i]) {
            case 'WIFI':
              str = 'WIFI'
              break
            case 'PARK':
              str = '停车位'
              break
            case 'FACE_SOUTH':
              str = '朝南'
              break
            case 'PRIVATE_TOILET':
              str = '独卫'
              break
            case 'DUAL_BALCONY':
              str = '双阳台'
              break
            case 'AIR_CONDITIONER':
              str = '空凋'
              break
            case 'PRIVATE_BALCONY':
              str = '私人阳台'
              break
          }
          if (i > 0) {
            houseFeatureEnumList += '， ' + str
          } else {
            houseFeatureEnumList += str
          }
        }
      } else {
        houseFeatureEnumList = '暂无信息'
      }
      data.houseSpaceFeatureLists = houseFeatureEnumList
      return data
    },
    showPersonDetail (data) {
      this.$emit('showPersonDetail', data)
    },
    showRentalDetail (data) {
      this.$emit('showRentalDetail', data)
    },
    menuClick (data) {
      this.menuData = data
      if (data === 'pay') {
        this.$options.methods.getPayList(this)
      }
    },
    rentalDetail () {
      this.$emit('rentalDetail')
    },
    houseEdit () {
      this.$emit('houseEdit', this.houseSpaceId)
    },
    goodAdd () {
      this.$emit('houseGoodAdd', this.houseSpaceId)
    },
    contractDetail (data) {
      if (data.contractType === 'RENT') {
        this.$emit('rentContractDetail', data.id)
      } else {
        this.$emit('contractDetail', data.id)
      }
    },
    goodReduce () {
      this.$emit('goodReduce', this.houseSpaceId)
    },
    openBigImg (index, ev) {
      let _this = this
      if (ev.toElement) {
        if (ev.toElement.tagName !== 'P') {
          $('.bigImg').css('display', 'table')
          $('.bigImg img').attr('src', _this.imgLists[index].fileUrl)
        }
      } else if (ev.originalTarget) {
        if (ev.originalTarget.tagName !== 'P') {
          $('.bigImg').css('display', 'table')
          $('.bigImg img').attr('src', _this.imgLists[index].fileUrl)
        }
      }
      _this.picIndex = index
    },
    closeBigImg () {
      $('.bigImg').css('display', 'none')
    },
    toTop (item) {
      let list = {}
      list.houseSpaceId = this.houseSpaceId
      list.fileId = item.id
      let url = this.mix.picStick
      this.$confirm('确定置顶图片?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post(url, list).then((res) => {
          if (res.body.code === 200) {
            this.$message({
              message: '置顶成功',
              type: 'success'
            })
            this.getImgList(this)
          } else {
            this.$message({
              message: '置顶失败',
              type: 'error'
            })
          }
        }, (res) => {
          this.$message({
            message: '网络有误',
            type: 'error'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消置顶'
        })
      })
    },
    deleteImg (item) {
      let url = this.mix.detelePic + item.id
      this.$confirm('确定删除图片?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.get(url).then((res) => {
          if (res.body.code === 200) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getImgList(this)
          } else {
            this.$message({
              message: '删除失败',
              type: 'error'
            })
          }
        }, (res) => {
          this.$message({
            message: '网络有误',
            type: 'error'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    showPrevImg () {
      let length = this.imgLists.length
      let _this = this
      if (_this.picIndex === 0) {
        _this.picIndex = length - 1
      } else {
        _this.picIndex--
      }
      $('.bigImg img').css('display', 'none')
      $('.bigImg img').attr('src', _this.imgLists[_this.picIndex].fileUrl)
      setTimeout(_this.imgShow(), 100)
    },
    imgShow () {
      $('.bigImg img').css('display', 'block')
    },
    showNextImg () {
      let length = this.imgLists.length
      let _this = this
      if (_this.picIndex === (length - 1)) {
        _this.picIndex = 0
      } else {
        _this.picIndex++
      }
      $('.bigImg img').css('display', 'none')
      $('.bigImg img').attr('src', _this.imgLists[_this.picIndex].fileUrl)
      setTimeout(_this.imgShow(), 100)
    },
    close () {
      this.houseDetailShow = !this.houseDetailShow
      this.houseDetailShows = !this.houseDetailShows
    }
  },
  components: {
    reduceGood
  }
}
</script>
<style scoped>
  /*右侧弹窗*/
  .dialog{
    width: 50%;
    position:fixed;
    top: 62px;
    background-color: #fff;
    right: 0;
    /*border-right:3px solid #ccc;*/
    z-index: 1999;
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
    padding: 55px 50px;
    overflow-y: auto;
    overflow-x: hidden;
    /*border-left: 1px solid #eef1f6;*/
  }
  .closeIco{
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
  }
  .houseEdit{
    color: #13CE66;
    position: absolute;
    right: 40px;
    cursor: pointer;
    top: 15px;
    font-size: 16px;
    line-height: 16px;
  }
  .HDTitle{
    width: 350px;
    height: 26px;
    line-height: 16px;
    font-size: 16px;
    margin-bottom: 20px;
    word-wrap:break-word ;
  }
  .textRight{
    text-align: right;
  }
  .HDContent li{
    line-height: 24px;
    font-size: 13px;
    padding: 10px 0;
    /*border-bottom: 1px solid #e3e3e3;*/
  }
  .HDContent li h3{
    border-bottom: 1px solid #e3e3e3;
    padding: 10px 0 5px;
    margin-top: 5px;
    margin-bottom: 10px;
  }
  .HDContent li:first-child{
    padding-top: 0;
  }
  .HDContent li:last-child{
    border-width: 0;
  }
  .el-menu--dark{
    background-color: #d3dce6;
    /*background: #ebebeb;*/
    /*color: #555;*/
  }
  .el-menu-item{
    /*color: #555;*/
    /*border-left: 3px solid #ebebeb;*/
  }
  .el-menu--dark .el-menu-item:hover, .el-menu--dark .el-submenu__title:hover{
    /*background: #f6f8f9;*/
    /*border-color: #20a0ff;*/
  }
  .el-menu-item.is-active{
    /*background: #f6f8f9;*/
    /*color: #555;*/
    /*border-color:#20a0ff;*/
  }
  .el-menu-item:first-child{
    margin-top: 28px;
  }
  .houseDetail .el-menu-item{
    /*display: none;*/
    color: #333;
    background-color: #d3dce6;
    border-left: 3px solid #d3dce6;
    transition: all .5s;
  }
  .houseDetail .el-menu-item:hover{
    background-color: #fcfcfc;
    border-color: #fcfcfc;
  }
  .houseDetail .el-menu-item.is-active{
    background-color: #fcfcfc;
    border-color: #20a0ff;
  }
  .houseDetail .eitdButton{
    position: absolute;
    right: 40px;
    top: 9px;
    font-size: 19px;
    color: #20a0ff;
    cursor: pointer;
  }
  .button{
    width: 16px;
    height: 16px;
    display: inline-block;
    background: url('../../static/img/detail1.png') left center / 16px 16px;
    background-repeat: no-repeat;
    cursor: pointer;
    padding-top: 10px;
  }
  .button img{
    width: 100%;
    height: 100%;
    cursor: pointer
  }
  .rentalPrice{
    cursor: pointer
  }
  .block{
    text-align: center;
    margin-top: 20px;
  }
  .el-col-8, .el-col-14{
    margin-top: 10px;
  }
  .el-button--primary{
    /*width: 35%;*/
    background-color: #fff;
    color: #20a0ff;
  }
  .el-button--primary:hover{
    background-color: #20a0ff;
    color: #fff;
  }
  .goodList{
    margin-bottom: 10px;
    margin-top: 5px;
  }
  .goodListH4{
    padding: 5px 0;
    margin-top: 10px;
    border-bottom: 1px solid #ccc
  }
  .imgList{
    padding-top: 40px;
  }
  .imgList li{
    width: 125px;
    float: left;
    height: 150px;
    margin-bottom: 10px;
    margin-right: 10px;
    padding: 0;
  }
  .imgList li:nth-child(2n){
    margin-right: 0;
  }
  /*.imgList li .img{
    width: 100%;
    height: 125px;
    display: table;
    border: 1px solid #cecece;
  }*/
  .imgList li .img{
    width: 100%;
    height: 125px;
    /*display: table;*/
    border: 1px solid #cecece;
    overflow: hidden;
    position: relative;
  }
  .imgList li .img div{
    width: 100%;
    height: 125px;
    display: table;
    /*border: 1px solid #cecece;*/
   }

  .imgList li .img span{
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
  .imgList li .img img{
    max-height: 125px;
    max-width: 125px;
  }
  .imgList li .img .btn1{
    height: 20px;
    /*border-top: 1px solid #cecece;*/
    /*border-top-width: 0;*/
    position: absolute;
    background: rgba(0,0,0,.5);
    transition: all .25s;
    -webkit-transition: all .25s;
    bottom: 0;
    left: 0;
    opacity: 0;
    -webkit-opacity: 0;
  }
  .imgList li .btn1 div{
    border-top: 1px solid #cecece;
    border-width: 0;
    height: 28px;
  }
  .imgList li .btn1 p{
    width: 50%;
    height: 20px;
    line-height: 20px;
    border-radius: 3px;
    margin: 4px 25%;
    /*float: left;*/
    background: #20a0ff;
    color: #fff;
  }
  .imgList li:hover .img .btn1{
    opacity: 1;
    -webkit-opacity: 1;
  }
  .imgList li p{
    text-align: center;
    font-size: 14px;
    color: #333;
    overflow: hidden; white-space: nowrap; text-overflow: ellipsis; 
  }
  .bigImg{
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0,0,0,.5);
    z-index: 1000;
    display: none;
  }
  .bigImg .cell{
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
  .bigImg .table{
    width: 60vw;
    height: 60vh;
    /*overflow: hidden;*/
    display: table;
    background: #fff;
    display: inline-block;
    position: relative;
  }
  .bigImg .table div{
    display: table;
    width: 100%;
    height: 100%;
  }
  .bigImg img{
    max-height: 60vh;
    max-width: 60vw;
  }
  .bigImg .closeIco{
    width: 100px;
    height: 100px;
    background: url('../../static/img/close.svg') no-repeat left center / 25px 25px;
    cursor: pointer
  }
  .el-icon-arrow-right,.el-icon-arrow-left{
    font-size: 30px;
    color: #fff;
    position: absolute;
    /*height: 100%;*/
    top: 50%;
    cursor: pointer;
  }
  .el-icon-arrow-right{
    right: -40px;
  }
  .el-icon-arrow-left{
    left: -40px;
  }
  .contractLine{
    height: 26px;
    line-height: 26px;
    margin-top: 0;
  }
  .contractList li{
    border-bottom: 1px solid #e3e3e3
  }
  .contractLine .el-button{
    padding: 6px 5px;
    font-size: 12px;
  }
  .textAlignRight{
    text-align: right;
  }
</style>