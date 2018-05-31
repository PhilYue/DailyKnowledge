<template>
  <div>
       <common-head></common-head>
       <main>
       		<div class="houseManager">
       			<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			      <el-tab-pane label="房源管理" name="first">
		          <div class='search f-cb'>
		            <!-- <div class='main-right-search-span'>
		              <ul>
		                <li v-for='(rent, ind) in searchData' class="searchList">
		                  <p :value="rent.value">{{ rent.head }}</p>
		                  <div v-if="ind === 0" style="display:inline-block; width:calc(100% - 100px);"><a v-for='(item, index) in rent.content' :title='item.text' :class='{selectActive: index ==0}' @click="houseSearch1(rent.value, item.value)" :value="item.value">{{item.text}}</a></div>
		                  <div v-if="ind !== 0" style="display:inline-block; width:calc(100% - 100px);"><a v-for='(item, index) in rent.content' :title='item.text' :class='{selectActive: index ==0}' :value="item.value">{{item.text}}</a></div>
		                </li>
		              </ul>
		            </div> -->
		            <el-input placeholder="请输入房源编号或小区" auto-complete="off" style="width:300px" v-model="houseWord" @keyup.enter.native="houseInput"></el-input>
		            <el-button type='primary' @click="houseInput">搜索</el-button>
		          </div>
    					<div class="conList" v-if="housePage.totlePage > 0">
    						<div class="list-contain-div" v-for="(item, index) in listData" @click="depositDeatilShow1(item, $event)">
    						  <el-row>
    						    <el-col :span="1" style="height:55px;"></el-col>
    						    <el-col :span="6">
                        <div class="lin55"><el-tooltip class="item" effect="light" content="房间编号" placement="top"><span>{{ item.businessId }}</span></el-tooltip></div>
                    </el-col>
    						    <el-col :span="3">
                      <el-tooltip class="item" effect="light" content="房间状态" placement="top">
                        <div class="lin55" style="line-height:20px; vertical-align:middle; display:table-cell"><span class="houseSpaceStatus" v-bind:class="[{ red : item.houseSpaceStatusChinese==='空置'}]" :value="item.houseSpaceStatus">{{ item.houseSpaceStatusChinese }}</span></div>
                      </el-tooltip>
                    </el-col>
    						    <el-col :span="7">
                      <el-tooltip class="item" effect="light" content="地址" placement="top">
      						      <div class="lin55">
      						        <p>{{ item.keywordAddress }}</p>
      						      </div>
                      </el-tooltip>
    						    </el-col>
    						    <el-col :span="4">
                      <el-tooltip class="item" effect="light" content="房东信息" placement="top">
      						      <div class="pad8">
      						        <p>{{item.landlordName}}</p>
      						        <p>{{item.landlordPhone}}</p>
      						      </div>
                      </el-tooltip>
    						    </el-col>
    						    <el-col :span="2">
    						    	<div class="lin55">
    									<div class="el-dropdown">
                        <button type="button" @click="depositDeatilShow(item)" class="el-button el-button--default">
    										<span class="el-dropdown-link">详情
                          <i class="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                        </button>
    									</div>
    						    	</div>
    						    </el-col>
    						    <slot></slot>
    						  </el-row>
    						</div>
    					</div>
				      <h3 v-if="housePage.totlePage === 0 && loading !== 0" style="text-align:center; margin-top:50px;">暂无数据</h3>
				      <div class="block" v-if="housePage.totlePage > 0">
				        <el-pagination class="paging" @size-change="houseSizeChange" @current-change="houseCurrentChange" :current-page.sync="housePage.pageNo" :page-sizes="[10, 20, 30, 40]" :page-size="housePage.pageSize" layout="sizes, prev, pager, next, jumper" :total="housePage.totlePage"></el-pagination>
				       </div>
			    </el-tab-pane>
			    <el-tab-pane label="合同管理" name="second">
              <div class='search f-cb'>
                <!-- <div class='main-right-search-span'>
                  <ul>
                    <li v-for='(rent, ind) in searchData1' class="searchList">
                      <p :value="rent.value">{{ rent.head }}</p>
                      <div v-if="ind === 0" style="display:inline-block; width:calc(100% - 100px);"><a v-for='(item, index) in rent.content' :title='item.text' :class='{selectActive: index ==0}' @click="houseSearch1(rent.value, item.value)" :value="item.value">{{item.text}}</a></div>
                      <div v-if="ind !== 0" style="display:inline-block; width:calc(100% - 100px);"><a v-for='(item, index) in rent.content' :title='item.text' :class='{selectActive: index ==0}' :value="item.value">{{item.text}}</a></div>
                    </li>
                  </ul>
                </div> -->
                <el-input placeholder="请输入房源编号或小区" auto-complete="off" style="width:300px" v-model="contractWord" @keyup.enter.native="contractInput"></el-input>
                <el-button type='primary' @click="contractInput">搜索</el-button>
              </div>
            <div class="conList" v-if="contractPage.totlePage > 0">
              <div class="list-contain-div" v-for="item in contractLists">
                <div @click="openAddForm1(item, $event)">
                  <el-row>
                    <el-col :span="1"></el-col>
                    <el-col :span="2">
                      <div class="">
                         <img src="https://o6niowncl.qnssl.com/user-default-img-b-14.png" width="50"/>
                      </div>
                    </el-col>
                    <el-col :span="3">
                      <div class="lin55"><p><el-tooltip class="item" effect="light" content="合同编号" placement="top"><span>{{ item.contractNumber }}</span></el-tooltip></p></div>
                    </el-col>
                    <!-- <el-col :span="3"><div class="lin55" title="合同状态" style="line-height:20px; vertical-align:middle; display:table-cell"><span class="houseSpaceStatus" v-bind:class="[{red : item.contractStatusChange==='待签订', green : item.contractStatusChange==='签订中', blue : item.contractStatusChange==='已签订' || item.contractStatusChange==='已生效' }]" :value="item.houseSpaceStatus"><p>{{ item.contractStatusChange }}</p></span></div></el-col> -->
                    <el-col :span="3">
                        <div class="lin55" style="line-height:20px; vertical-align:middle; display:table-cell"><el-tooltip class="item" effect="light" content="合同状态" placement="top"><span class="houseSpaceStatus" :value="item.houseSpaceStatus"><p>{{ item.contractStatusChange }}</p></span></el-tooltip></div>
                    </el-col>
                    <el-col :span="6">
                        <div class="lin55">
                          <p><el-tooltip class="item" effect="light" content="地址" placement="top"><span>{{ item.searchHouseSpaceBean.keywordAddress }}</span></el-tooltip></p>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="lin55">
                          <p><el-tooltip class="item" effect="light" content="生效时间-到期时间" placement="top"><span>{{ item.startTime }} -- {{ item.endTime }}</span></el-tooltip></p>
                        </div>
                    </el-col>
                    <el-col :span="3">
                      <el-tooltip class="item" effect="light" content="用户信息" placement="top">
                        <div class="pad8">
                          <p><span class="name-pos">{{item.partBName}}</span></p>
                          <p>{{item.partBPhone}}</p>
                        </div>
                      </el-tooltip>
                    </el-col>
                    <el-col :span="2">
                      <div class="lin55" style="display: table-cell; vertical-align:middle;">
                        <div class="el-dropdown">
                          <button type="button" class="el-button el-button--default" @click="openAddForm(item)">
                          <span class="el-dropdown-link">详情
                            <i class="el-icon-caret-bottom el-icon--right"></i>
                          </span>
                          </button>
                        </div>
                      </div>
                    </el-col>
                    <slot></slot>
                  </el-row>
                </div>
              </div>
            </div>
              <h3 v-if="contractPage.totlePage === 0 && loading !== 0" style="text-align:center; margin-top:50px;">暂无数据</h3>
              <div class="block" v-if="contractPage.totlePage > 0">
                <el-pagination class="paging" @size-change="contractSizeChange" @current-change="contractCurrentChange" :current-page.sync="contractPage.pageNumber" :page-sizes="[10, 20, 30, 40]" :page-size="contractPage.pageSize" layout="sizes, prev, pager, next, jumper" :total="contractPage.totlePage"></el-pagination>
               </div>
          </el-tab-pane>
			  </el-tabs>
       		</div>
		  <!-- 房源详情 -->
      <houseDetail
        :houseSpaceId="detailHouseId"
        :houseDetailShows="houseDetailShow"
        :zIndex="zIndex"
        :houseDetailText="'房源详情'"
        :clickCount="clickCount"
        :detailHouseType="detailHouseType"
        :detailShowPage="detailShowPage"
        houseEditWay="0"
        @showPersonDetail="showPersonDetail"
        @showRentalDetail="showPersonDetail"
        @rentalDetail="rentalDetail"
        @houseEdit="houseEdit"
        @houseGoodAdd="houseGoodAdd"
        @goodReduce="goodReduce"
        @contractDetail="contractDetail"
      ></houseDetail>
		  <!-- 房源详情合同 -->
      <!-- 房源详情开始 -->
      <userDetail :personId="personId" :perclick="perclick" :userDetail="userDetailShow" :zIndex="zIndex" :houseDetailText="'用户详情'"></userDetail>
      <!-- 房源详情结束 -->
      <!-- 房源详情开始 -->
      <rentalDetail :tableData="houseDetail" :userDetailShow="rentalDetailShow" :zIndex="zIndex" :houseDetailText="'财务详情'"></rentalDetail>
      <!-- 房源详情结束 -->

      <!-- 房源详情开始 -->
      <conDetail :conDetail="conDetailShow" :houseDetailText="'合同详情'" conType="con" :contractId="contratId" :detailClick="detailClick"  @closeDetail="closeForm"></conDetail>
      <!-- 房源详情结束 -->
      <!-- 物品新增开始 -->
      <goodAdd
        :goodFormShow="goodFormShow"
        :houseId="addHouseId"
        :goodClickCount="goodClickCount"
        @closeGoodAdd="closeGoodAdd"
        @goodAddSuccess="closeGoodAdd">
      </goodAdd>
      <!-- 物品新增结束 -->

      <!-- 物品搬出开始 -->
      <reduceGood :goodFormShow="goodRFormShow" :houseId="addHouseId" :reduceCount="reduceCount" @closeGoodAdd="closeGoodAdd" @submitEdit="reduceGoodSuccess"></reduceGood>
      <!-- 物品搬出结束 -->
      </main>
  </div>
</template>
<script>
import $ from 'jquery'
import CommonHead from '@/components/common/CommonHead'  // 头部组件
import CollectList from '@/components/pay/CollectList' // 待收列表组件
import PayDetail from '@/components/pay/PayDetail' // 预定生成详情组件
import task from '@/components/task' // 预约生成详情组件
import houseDetail from '@/components/houseDetail'  //  托管信息编辑
import userDetail from '@/components/userDetail'  //  提示弹窗
import rentalDetail from '@/components/rentalDetail'  //  提示弹窗
import goodAdd from '@/components/goodAdd'  //  物品新增
import reduceGood from '@/components/reduceGood'  //  物品新增
import conDetail from '@/components/conDetail'  //  顶部搜索
var $this = this
export default {
  name: 'index',
  beforeCreated: function () {
    this.$options.methods.load(this)
  },
  data: function () {
    $this = this
    return {
      loading: 0,
      searchData: [ // 搜索数据
        {
          head: '  状态：',
          value: 'houseSpaceStatus',
          content: [
            {
              text: '合租',
              value: 'RENTABLE'
            },
            {
              text: '整租',
              value: 'RESERVED'
            },
            {
              text: '集中式整租',
              value: 'RENTED'
            }
          ]
        },
        {
          head: '房源状态',
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
      searchData1: [ // 搜索数据
        {
          head: '合同类型：',
          value: 'contractType',
          content: [
            {
              text: '托管合同',
              value: 'TRUSTEE'
            },
            {
              text: '出租合同',
              value: 'RENT'
            }
          ]
        },
        {
          head: '合同状态:',
          value: 'contractStatus',
          content: [
            {
              text: '全部',
              value: null
            },
            {
              text: '待签订',
              value: 'WAISIGN'
            },
            {
              text: '签订中',
              value: 'SIGNING'
            },
            {
              text: '已签订',
              value: 'ALSIGN'
            },
            {
              text: '已生效',
              value: 'EFFECT'
            },
            {
              text: '终止中',
              value: 'ENDING'
            },
            {
              text: '已结束',
              value: 'ALEND'
            },
            {
              text: '取消',
              value: 'CANCEL'
            },
            {
              text: '待审核',
              value: 'TOAUDIT'
            }

          ]
        }
      ],
      houseWord: '',
      contractWord: '',
      searchList: {
        houseSpaceStatus: null,
        keywordAddress: ''
      }, // 搜索信息
      listData: [],
      contractLists: [],
      activeName: 'first',
      houseDetail: {
        houseSpaceId: ''
      },
      housePage: {
        totlePage: 0,
        pageNo: 1,
        pageSize: 10
      },
      contractPage: {
        totlePage: 0,
        pageNumber: 1,
        pageSize: 10
      },
      detailHouseId: '', // 查看房源详情
      houseDetailShow: false,  // 控制房源详情显示与否
      zIndex: 0,
      clickCount: 0,
      detailHouseType: '', // 出租类型
      goodFormShow: false, //
      addHouseId: '',
      detailShowPage: 'house',
      goodClickCount: 0,
      goodRFormShow: false, // 控制新增物品弹窗的开关
      reduceCount: 0,
      personId: '',
      perclick: 0,
      conDetailShow: false,
      contratId: '',
      detailClick: 0,
      editClick: 0,
      userDetailShow: false, // 控制用户详情展示
      rentalDetailShow: false, // 控制财务详情展示
      int: 0,
      mix: {
        houseResourcesUrl: this.$store.state.houseUrl + 'list/block', // 房源列表
        houseResourceslist: this.$store.state.houseUrl + 'list/houseSpace', // 房源列表
        houseDetailUrl: this.$store.state.houseUrl + 'get', // 根据房源ID查询详细信息
        transformUrl: this.$store.state.houseUrl + 'transform', // 分拆合并
        houseUpdate: this.$store.state.houseUrl + 'update/houseSpace', // 房源修改
        search: this.$store.state.searchUrl + 'query' // 搜索引擎
      }
    }
  },
  components: {
    CollectList,
    CommonHead,
    PayDetail,
    task,
    houseDetail,
    userDetail,
    rentalDetail,
    goodAdd,
    reduceGood,
    conDetail
  },
  created () {
    this.$options.methods.load(this)
  },
  mounted: function () {
    if ($this.int === 0) {
      $('body').click(function (event) {
        var _target = event.target
        if (_target.closest('.houseRoomList') === null && _target.closest('.houseDetail .dialog') === null && _target.closest('.list-contain-div') === null && _target.closest('.el-dialog') === null && ($this.houseDetailShow === true || $this.conDetailShow === true)) {
          $this.houseDetailShow = false
          $this.userDetailShow = false
          $this.rentalDetailShow = false
          $this.conDetailShow = false
          $this.clickCount++
          $this.detailClick++
          $this.perclick++
          $this.detailShowPage = 'house'
        }
      })
      $this.int = 0
    }
  },
  methods: {

    load: function (_this) {
      _this.loading = 0
      if (_this.$store.state.searchData.searchDataId === 'second') {
        // 显示合同
        _this.activeName = 'second'
        if (_this.$store.state.searchData.searchType === 'false') {
          let list = JSON.parse(_this.$store.state.searchData.searchData)
          _this.contractLists = []
          _this.contractLists.push(list)
          _this.$options.methods.conList(_this.contractLists)
          _this.$options.methods.conStatus(_this.contractLists)
          _this.contractPage.totlePage = _this.contractLists.length
        } else {
          _this.activeName = _this.$store.state.searchData.searchDataId
          _this.$options.methods.contractSearchLists(_this, _this.$store.state.searchData.searchData)
        }
        _this.loading = 1
      } else {
        // 显示房源
        _this.activeName = 'first'
        if (_this.$store.state.searchData.searchType === 'false') {
          let list = JSON.parse(_this.$store.state.searchData.searchData)
          _this.listData = []
          _this.listData.push(list)
          _this.$options.methods.roomTransform(_this.listData)
          _this.housePage.totlePage = _this.listData.length
        } else if (_this.$store.state.searchData.searchType === 'true') {
          _this.$options.methods.houseSearchLists(_this, _this.$store.state.searchData.searchData)
          _this.contractWord = _this.$store.state.searchData.searchData
          _this.houseWord = _this.$store.state.searchData.searchData
        }
        _this.loading = 1
      }
    },
    handleClick (tab, event) {
      if (tab.name === 'first') {
        this.$options.methods.houseSearchLists(this, this.houseWord)
        this.contractWord = ''
      } else {
        this.houseWord = ''
        this.$options.methods.contractSearchLists(this, this.contractWord)
      }
    },
    contractSearchLists (_this, word) {
      _this.loading = 0
      let search = _this.$store.state.searchUrl + 'query/jurisdiction' // 搜索引擎
      let req = {}
      req.keyword = word
      req.esType = 'CONTRACT'
      req.pageNumber = _this.contractPage.pageNumber
      req.pageSize = _this.contractPage.pageSize
      req.searchType = 'MATCH_PHRASE'
      req.loginId = _this.$store.state.currentUser.uid
      // search = search + '?page=' + (_this.contractPage.pageNo - 1) + '&size=' + _this.contractPage.pageSize
      _this.$http.post(search, req, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/*; charset=utf-8'
        }
      }).then(function (res) {
        if (res.body.code === 200) {
          _this.contractLists = []
          _this.contractLists = res.body.data.list
          _this.contractPage.totlePage = res.body.data.totalCount
          _this.$options.methods.conList(_this.contractLists)
          _this.$options.methods.conStatus(_this.contractLists)
          _this.loading = 1
        } else if (res.body.code === 10000) {
          _this.contractLists = []
          _this.loading = 1
          _this.contractPage.totlePage = 0
        }
      })
    },
    houseSearchLists (_this, word) {
      _this.loading = 0
      let search = _this.$store.state.searchUrl + 'query/jurisdiction' // 搜索引擎
      let req = {}
      req.keyword = word
      req.esType = 'HOUSE_SPACE'
      req.pageNumber = _this.housePage.pageNo
      req.pageSize = _this.housePage.pageSize
      req.loginId = _this.$store.state.currentUser.uid
      req.searchType = 'MATCH_PHRASE'
      _this.$http.post(search, req, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/*; charset=utf-8'
        }
      }).then(res => {
        if (res.body.code === 200) {
          _this.listData = []
          _this.listData = res.body.data.list
          _this.housePage.totlePage = res.body.data.totalCount
          _this.$options.methods.roomTransform(_this.listData)
          _this.loading = 1
        } else if (res.body.code === 10000) {
          _this.listData = []
          _this.loading = 1
          _this.housePage.totlePage = 0
        }
      })
    },
    houseInput () {
      this.$options.methods.houseSearchLists(this, this.houseWord)
    },
    contractInput () {
      this.$options.methods.contractSearchLists(this, this.contractWord)
    },
    houseSearch1 (ind, index) { // 修改后搜索的搜索，不支持搜索框
      // var data = {}
      if (index === 'ALL') {
        index = null
      }
      this.searchList.houseSpaceStatus = index
      this.searchList.rentType = 'JOINT_RENT'
      this.$options.methods.roomSearch(this, this.mix.houseResourceslist, this.searchList)
    },
    houseSearch () { // 修改后搜索的搜索，不支持搜索框
      this.searchList.rentType = 'JOINT_RENT'
      this.$options.methods.roomSearch(this, this.mix.houseResourceslist, this.searchList)
    },
    roomTransform (data) {
      for (let p in data) {
        switch (data[p].decorateType) {
          case 'ROUGHCAST_HOUSE':
            data[p].decorateType1 = '毛坯房'
            break
          case 'SIMPLE_DECORATION_HOUSE':
            data[p].decorateType1 = '简装'
            break
          case 'REFINED_DECORATION_HOUSE':
            data[p].decorateType1 = '精装'
            break
        }
        switch (data[p].direction) {
          case 'EAST':
            data[p].direction1 = '东'
            break
          case 'SOUTH':
            data[p].direction1 = '南'
            break
          case 'WEST':
            data[p].direction1 = '西'
            break
          case 'NORTH':
            data[p].direction1 = '北'
            break
          case 'SOUTHEAST':
            data[p].direction1 = '东南'
            break
          case 'NORTHEAST':
            data[p].direction1 = '东北'
            break
          case 'SOUTHWEST':
            data[p].direction1 = '西南'
            break
          case 'NORTHWEST':
            data[p].direction1 = '西北'
            break
        }
        switch (data[p].houseSpaceStatus) {
          case 'WAIT_TRUST':
            data[p].houseSpaceStatus1 = '待托管'
            break
          case 'ASSESSING':
            data[p].houseSpaceStatus1 = '评估中'
            break
          case 'APPROVED':
            data[p].houseSpaceStatus1 = '审核通过'
            break
          case 'SIGNING_DC':
            data[p].houseSpaceStatus1 = '签订托管合同中'
            break
          case 'DC_NOT_TE':
            data[p].houseSpaceStatus1 = '托管合同未生效'
            break
          case 'DC_TE':
            data[p].houseSpaceStatus1 = '托管合同已生效'
            break
          case 'DESIGNING':
            data[p].houseSpaceStatus1 = '设计中'
            break
          case 'CONSTRUCTING':
            data[p].houseSpaceStatus1 = '施工中'
            break
          case 'CHECKING':
            data[p].houseSpaceStatus1 = '验收中'
            break
          case 'RETAIN':
            data[p].houseSpaceStatus1 = '保留'
            break
          case 'RENTABLE':
            data[p].houseSpaceStatus1 = '空置'
            break
          case 'RESERVED':
            data[p].houseSpaceStatus1 = '已预定'
            break
          case 'SIGNING_LC':
            data[p].houseSpaceStatus1 = '签订租赁合同中'
            break
          case 'RENTED':
            data[p].houseSpaceStatus1 = '已出租'
            break
          case 'FREEZING':
            data[p].houseSpaceStatus1 = '已冻结'
            break
          case 'DELETED':
            data[p].houseSpaceStatus1 = '已删除'
            break
        }
      }
      for (let p in data) {
        data[p].rentalPrice1 = data[p].rentalPrice / 1000
        data[p].houseSpaceArea1 = data[p].houseSpaceArea / 1000
      }
      return data
    },
    roomSearch (_this, url, dataList) { // 合租搜索
      _this.$http.post(url, dataList).then(({data}) => {
        if (data.data === null || data.data === '') {
          _this.totlePage = 0
          _this.flatShareData = []
        } else {
          data.data.list = _this.$options.methods.roomTransform(data.data.list)
          // _this.totleflatShareData = data.data.list
          _this.totlePage = data.data.totalCount
          _this.flatShareData = data.data.list
        }
      })
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
          case 'ALEND':
            data[i].contractStatusChange = '已结束'
            break
          case 'CANCEL':
            data[i].contractStatusChange = '取消'
            break
          case 'TOAUDIT':
            data[i].contractStatusChange = '待审核'
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
        data[i].startTime = startTime.getFullYear() + '-' + (startTime.getMonth() + 1) + '-' + (startTime.getDate())
        var endTime = new Date(data[i].endTime)
        data[i].endTime = endTime.getFullYear() + '-' + (endTime.getMonth() + 1) + '-' + (endTime.getDate())
        data[i].rental1 = data[i].rental / 1000
        data[i].deposit1 = data[i].deposit / 1000
        if (data[i].rentFreeStart !== null && data[i].rentFreeStart !== '') {
          startTime = new Date(data[i].rentFreeStart)
          data[i].rentFreeStart = startTime.getFullYear() + '-' + (startTime.getMonth() + 1) + '-' + (startTime.getDate())
        }
        if (data[i].rentFreeEnd !== null && data[i].rentFreeEnd !== '') {
          endTime = new Date(data[i].rentFreeEnd)
          data[i].rentFreeEnd = endTime.getFullYear() + '-' + (endTime.getMonth() + 1) + '-' + (endTime.getDate())
        }
      }
      return data
    },
    conList (data) { // 将房东信息从user拎到list表中
      for (var p in data) {
        if (data[p].users !== '' && data[p].users !== null) {
          for (var i in data[p].users) {
            if (data[p].users[i].representative === 'PARTA') {
              data[p].username = data[p].users[i].userName
              data[p].userName = data[p].users[i].userName
              data[p].phoneNum = data[p].users[i].phoneNum
              data[p].cerNum = data[p].users[i].cerNum
              data[p].id = data[p].users[i].id
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
    submitEdit () {
      if (this.activeName === 'first') {
        this.$options.methods.houseSearchLists(this, this.houseWord)
      } else if (this.activeName === 'second') {
        this.$options.methods.contractSearchLists(this, this.contractWord)
      }
      this.houseEditVisible = false
    },
    closeForm: function (data) { // 关闭新建、编辑弹窗
      this.houseEditVisible = false
      this.conDetailShow = false
      this.detailClick++
      this.clickCount++
    },
    showPersonDetail (data) {
      this.userDetailShow = true
      this.perclick++
      this.personId = data
    },
    contractDetail (contratId) {
      this.contratId = contratId
      this.conDetailShow = true
      this.detailClick++
    },
    openAddForm (data) {
      console.log(data)
      this.conDetailShow = true
      this.houseChange = data
      this.houseChange.rental1 = this.houseChange.rental1
      this.houseChange.deposit1 = this.houseChange.deposit1
      this.detailClick++
      this.contratId = data.contractId
    },
    openAddForm1 (data, ev) {
      if (event.target.closest('.el-dropdown') === null) {
        this.conDetailShow = true
        this.houseChange = data
        this.houseChange.rental1 = this.houseChange.rental1
        this.houseChange.deposit1 = this.houseChange.deposit1
        this.detailClick++
        this.contratId = data.contractId
      }
    },
    depositDeatilShow (value) {
      // this.detailHouseId = value.houseSpaceManagerId
      this.detailHouseId = value.houseSpaceId
      this.houseDetailShow = true
      this.houseDetail.houseSpaceId = value.houseSpaceId
      this.clickCount++
    },
    depositDeatilShow1 (value, ev) {
      if (ev.target.closest('.el-dropdown-menu') === null) {
        this.detailHouseId = value.houseSpaceId
        this.houseDetailShow = true
        this.houseDetail.houseSpaceId = value.houseSpaceId
        this.clickCount++
      }
    },
    showDetail (data) {
      this.userDetailShow = true
      this.zIndex++
      this.clickCount++
    },
    houseSizeChange (value) {
      this.housePage.pageSize = value
      this.$options.methods.houseSearchLists(this, this.houseWord)
    },
    houseCurrentChange (value) {
      this.housePage.pageNo = value
      this.$options.methods.houseSearchLists(this, this.houseWord)
    },
    contractSizeChange (value) {
      this.contractPage.pageSize = value
      this.$options.methods.contractSearchLists(this, this.contractWord)
    },
    contractCurrentChange (value) {
      this.contractPage.pageNumber = value
      this.$options.methods.contractSearchLists(this, this.contractWord)
    },
    showRentalDetail (data) {
      this.userDetailShow = true
      this.zIndex++
    },
    rentalDetail () {
      this.rentalDetailShow = true
      this.zIndex++
    },
    houseEdit (data) {
      this.houseEditVisible = true
      this.houseId = data
    },
    closeDetailShow () {
    },
    houseGoodAdd (data) {
      this.goodFormShow = true
      this.addHouseId = data
      this.goodClickCount++
    },
    closeGoodAdd () {
      this.goodFormShow = false
      this.goodClickCount++
      this.goodRFormShow = false
      this.reduceCount++
      this.clickCount++
      this.detailShowPage = 'good'
    },
    goodAddSuccess () {
      this.goodClickCount++
      this.clickCount++
      this.detailShowPage = 'good'
      this.goodFormShow = false
      this.goodRFormShow = false
    },
    goodReduce (data) {
      this.addHouseId = data
      this.goodRFormShow = true
      this.reduceCount++
    },
    reduceGoodSuccess () {
      this.goodRFormShow = false
      this.reduceCount++
      this.clickCount++
    },
    depositSure (data) { // 确认签订合同
      let dataList = {}
      dataList.userPhone = parseInt(this.$store.state.currentUser.UserPhone)
      dataList.contractId = data.id
      dataList.houseSpaceManagerId = data.houseSpaceManagerId
      this.$http.post(this.$store.state.contractUrl + '/updateByParStatus', dataList).then(({data}) => {
        if (data.code === 200) {
          this.$message({
            message: '签订成功',
            type: 'success'
          })
          this.$options.methods.contractSearchLists(this, this.contractWord)
        } else {
          let msg = ''
          if (data.code === 10029) {
            msg = '您已签订该合同，请不要重复签订'
          } else {
            msg = '您没有权限签订该合同'
          }
          this.$message({
            message: msg,
            type: 'error'
          })
        }
      })
    }
  }
}
</script>
<style scoped>
@import '../../static/css/app.css';
/* 主内容区 */
main{
  border: solid 30px #E9ECF1;
}
.houseManager{
	height: calc(100vh - 181px);
	padding: 30px;
	overflow-x: hidden;
}
.list-contain-div{
  padding: 10px 0;
  font-size: 13px;
  color: #555;
  border-top:1px solid #eee;
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
.el-tabs__content{
	overflow: inherit;
}
.el-dropdown-menu{
	top: 40px;
	opacity: 0;
  /*right: 0;*/
  /*left: auto;*/
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
/*.el-dropdown-link{
  height: 30px;
  line-height: 30px;
  display: block
}*/
.houseManager .houseSpaceStatus{
  width: 95px;
}
.block{
	text-align: center;
	margin-top: 20px;
}
/*.list-contain-div .el-col div{
  display: table;
  line-height: 25px;
}*/
.list-contain-div .el-col div p{
  display: table-cell;
  vertical-align: middle;
}
.list-contain-div .el-col .pad8 p{
  display: block
}
.list-contain-div .el-col .houseSpaceStatus p{
  display: block
}
.el-row{
  height: 55px;
}
.el-row>div{
  height: 55px;
}
</style>
















