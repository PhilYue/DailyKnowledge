<template>
  <div class="houseManager">
    <!-- 右侧主内容区 -->
    <div class="main-right yxr-ui " >
      <!-- <houseSearch :seachData="searchData" place="请输入房源编号、小区或房东信息" :activeName="activeName" @search="houseSearch"></houseSearch> -->
      <div class='search'>
        <div class='main-right-search-span'>
          <ul>
            <li v-for='(rent, ind) in searchData' class="searchList">
              <p :value="rent.value">{{ rent.head }}</p>
              <div v-if="ind === 0" style="display:inline-block; width:calc(100% - 100px);"><a v-for='(item, index) in rent.content' :title='item.text' :class='{selectActive: index ==0}' @click="houseSearch(rent.value, item.value)" :value="item.value">{{item.text}}</a></div>
              <div v-if="ind !== 0" style="display:inline-block; width:calc(100% - 100px);"><a v-for='(item, index) in rent.content' :title='item.text' :class='{selectActive: index ==0}' :value="item.value">{{item.text}}</a></div>
            </li>
          </ul>
        </div>
        <el-input placeholder="请输入小区" v-model="searchList.keywordAddress" auto-complete="off" v-on:keyup.enter.native="houseSearch1" style="width:300px"></el-input>
        <el-button type='primary' @click="houseSearch1">搜索</el-button>
      </div>
      <div class="main-right-main">
        <!-- 寓小二 列表 开始 未完成 -->
        <el-button type="primary" @click="depositAddShow()">新增房源</el-button>
        <trusteeship
        :listData="tableData2"
        @listenToParentEvent="houseEditForm"
        @depositDeatilShow="depositDeatilShow"
        @depositapprovalY="depositapproval"
        @depositapprovalN="depositapproval"
        @depositNewTrustship="depositNewTrustship"
        @depositing="depositing"
        @refuseDsposit="refuseDsposit"
        @houseRental="houseRental"
        @depositDesgin="depositDesgin"
        @depositDesginEnd="depositDesginEnd"
        @renovationing="renovationing"
        @houseCheck="houseCheck"
        @houseEditShow="houseEditShow"
        v-if="totlePage > 0">
      </trusteeship>
      <h3 v-if="totlePage === 0" style="text-align:center">暂无数据</h3>
      <div class="block" v-if="totlePage > 0">
        <el-pagination class="paging" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage2" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="sizes, prev, pager, next, jumper" :total="totlePage"></el-pagination>
      </div>
      <!-- 寓小二 列表 结束 未完成 -->
    </div>
  </div>

  <!-- 编辑测算数据 -->
  <el-dialog title="编辑测算数据" :visible.sync="dialogEditVisible">
    <depositEdit :showData="showData" :form="tableData4" @listenToParentEvent="editForm"></depositEdit>
  </el-dialog>

  <!-- 新建托管弹窗 -->
  <el-dialog title="新增房源" :visible.sync="dialogAddVisible" top="7%">
    <depositAdd :formLabelWidth="formLabelWidth" :mix="mix" :disabled="dialogAddVisibledisabled" @listenToParentEvent="closeForm" @addSuccess="addSuccess"></depositAdd>
  </el-dialog>

  <!-- 房源详情 -->
  <houseDetail :houseId="houseDetail" :show="show" :mix="mix" :detailClick="detailClick" :houseDetailText="'房源详情'"></houseDetail>
  <!-- 房源详情合同 -->

  <el-dialog title="新增房东合同" :visible.sync="dialogVisible" top="7%">
    <trusteeshipAdd :trusteeshipAdd="trusteeshipAdd" :houseId="trusteeshipAdd.businessId" :disabled="disabled" :formLabelWidth="formLabelWidth" :text="houseText" :mix="mix" :countClick="countClick" @listenToParentEvent="closeTrusteeshipAdd" @addTrusteeshopSuccess="addTrusteeshopSuccess"></trusteeshipAdd>
  </el-dialog>

  <!-- 审批同意 -->
  <el-dialog :title="dialogApprovalTitle" :visible.sync="dialogApprovalVisible">
    <el-form :model="approval">
      <el-form-item label="说明" :label-width="formLabelWidth">
        <el-input v-model="approval.fileExplain" auto-complete="off"></el-input>
      </el-form-item>
      <!-- <el-form-item label="附件" :label-width="formLabelWidth">
        <el-upload class="upload-demo" :auto-upload="autoUpload" :before-upload="beforeAvatarUpload" :on-change="process" :on-error="error" list-type="picture-card" drag action="" multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="approvalSubmitN()">取 消</el-button>
      <el-button type="primary" @click="approvalSubmit()">提 交</el-button>
      <!-- <el-button type="primary" @click="approvalSubmitN()" v-if="!dialogApprovalContent">提 交2</el-button> -->
    </div>
  </el-dialog>

  <!-- 修改弹窗开始 -->
  <el-dialog title="编辑房源" :visible.sync="houseEditVisible">
    <houseEdit :houseId="houseEdit" :disabled="false" :mix="mix" :editClick="editClick" :formLabelWidth="formLabelWidth" rentType="entir" houseType="rent"  @submitEdit="submitEdit" @listenToParentEvent="closeEditForm"></houseEdit>
  </el-dialog>
  <!-- 修改弹窗结束 -->
</div>
</div>
  </div>
  <!-- 寓小二左弹窗结束 -->
  </div>
</template>
<script>
import $ from 'jquery'
import commonlist from '../../components/commonlist'  //  房源列表
import houseCard from '../../components/houseCard'  //  房源列表
import trusteeship from '../../components/trustship'  //  房源列表
import depositEdit from '../../components/depositEdit'  //  托管信息编辑
import houseDetail from '../../components/newHouseDetail'  //  托管信息编辑
import trusteeshipAdd from '../../components/trusteeshopAdd'    // 新增托管合同
import depositAdd from '../../components/depositAdd'  //  新建托管
import houseEdit from '../../components/houseEdit'  //  编辑房源
import houseSearch from '../../components/houseSearch'  //  顶部搜索
var $this = this
export default {
  name: 'rent',
  beforeCreate: function () {
    var mix = {
      'houseResourcesUrl': this.$store.state.houseUrl + 'list/houseSpace' // 房源列表
    }
    var data = {}
    data.houseSpaceManagerType = 'HOUSE'
    data.rentType = 'ENTIRE_RENT'
    data.houseSpaceProcess = 'GET_PROCESS'
    data.pageNo = 1
    data.pageSize = 10
    data.loginId = this.$store.state.currentUser.uid
    this.$options.methods.getHouseList(this, mix.houseResourcesUrl, data)
  },
  data: function () {
    $this = this
    return {
      searchData: [ // 搜索列表
        {
          head: '房源状态：',
          value: 'houseSpaceStatus',
          content: [
            {
              text: '全部',
              value: 'ALL'
            },
            {
              text: '待托管',
              value: 'WAIT_DELEGATE'
            },
            {
              text: '评估中',
              value: 'ASSESSING'
            },
            {
              text: '评估通过',
              value: 'APPROVED'
            },
            {
              text: '签订合同中',
              value: 'SIGNING_DC'
            },
            {
              text: '合同未生效',
              value: 'DC_NOT_TE'
            },
            {
              text: '合同已生效',
              value: 'DC_TE'
            },
            {
              text: '设计中',
              value: 'DESIGNING'
            },
            {
              text: '保留',
              value: 'RETAIN'
            }
          ]
        }
        // {
        //   head: '片区：',
        //   value: 'zone',
        //   content: [
        //     {
        //       text: '全部',
        //       value: null
        //     },
        //     {
        //       text: '随寓',
        //       value: ''
        //     },
        //     {
        //       text: '北软',
        //       value: ''
        //     },
        //     {
        //       text: '城东',
        //       value: ''
        //     }
        //   ]
        // }
      ],
      hidden: 'overflow: hidden',
      searchList: { // 搜索信息
        keywordAddress: '',
        houseSpaceManagerType: 'HOUSE',
        houseSpaceProcess: 'GET_PROCESS',
        rentType: 'ENTIRE_RENT'
      },
      activeName: 'first',
      houseSpaceManagerId: '',
      autoUpload: false,
      currentPage2: 1, // 当前分页
      pageSize: 10, // 当前分页数据量
      totlePage: 0, // 总数据数
      houseChange: {},
      houseChange1: {
        uId: '',
        houseSpaceManagerId: '',
        businessId: '',
        blockName: '',
        detailAddress: '',
        effectTime: '', // 托管开始时间
        endTime: '', // 托管结束时间
        freeStartTime: '', // 免租开始时间
        freeEndTime: '', // 免租结束时间
        rental: '', // 收房价格
        deposit: '', // 押金
        payWay: '1',
        payCycle: '1', // 支付周期
        payCycle1: '1', // 支付周期
        addType: '0', // 租金递增方式
        addAmount: '', // 租金递增金额
        houseFeatureEnumList: '',
        addPer: '', // 租金递增百分比
        addAmount1: '', // 租金递增金额
        addPer1: '', // 租金递增百分比
        buildingNo: '1', // 楼号
        unitNo: '', // 单元号
        roomNo: '', // 室号
        payeeName: '', // 收款人姓名
        bankAccount: '', // 收款账号
        bankName: '2', // 收款银行
        bankOfAccounts: '', // 开户支行
        memo: '',
        contractType: '1', // 合同分类
        housekeeperName: '', // 小管家姓名
        housekeeperPhone: '', // 小管家联系方式
        userName: '',
        waterMeterNumber: '', // 水表读数
        electricMeterNumber: '', // 电表读数
        gasMeterNumber: '', // 天然气读数
        waterMeterNumber1: '', // 水表读数
        electricMeterNumber1: '', // 电表读数
        gasMeterNumber1: '', // 天然气读数
        cerType: 'ID', // 房东证件类型
        cerNum: '', // 房东证件号
        phoneNum: '' // 房东手机号
      },
      tableData: [
        {
          name: '王小虎',
          phone: '18868195927',
          region: '北软区域',
          address: '德信东望',
          size: '10平方-15平方',
          houseSpaceManagerType: '一室一厅一卫',
          des: '描述'
        }
      ],
      addBean: { // 新增托管数据
        area: 0, // 面积
        bedroomNumber: 0, // 卧室数量
        blockName: '', // 小区
        buildingNo: '', // 栋
        businessId: '', // 业务ID
        certNumber: '', // 证件号码
        currentFloor: 0, // 当前楼层
        enumCertyp: 'ID', // 身份证件类型
        floorHeight: 0, // 总楼高
        houseSpaceDescribe: '', // 描述
        houseFeatureEnumList: [], // 优势
        kitchenNumber: 0, // 厨房数量
        livingRoomNumber: 0, // 客厅数量
        housekeeperId: '',
        housekeeperName: '',
        phone: '', // 手机号
        roomNo: '', // 室号
        toiletNumber: 0, // 卫生间数量
        towd: 'EAST', // 朝向
        zone: '', // 片区
        unitNo: '', // 单元号
        userName: '',
        sex: '1'
      },
      houseDetail: {
        businessId: 'hs1234',
        zoneId: '城北',
        area: 80,
        rentalPrice: 2500,
        bedroomNumber: 2, // 卧室
        livingRoomNumber: 2, // 客厅
        kitchNumber: '1', // 厨房
        toiletNumber: '1', // 卫生间
        blockName: '桂花城',
        detailAddress: '1栋1单元1603',
        direction: '南',
        decorateType: '精装',
        houseSpaceName: 'A',
        currentStatus: '未租',
        username: '', // 去潘哥那边拿
        vacancyTime: 20, // 空置的天数
        process: [
          [
            {
              department: '设计部', // 部门
              posi: '审核人', // 负责人
              opinion: '同意', // 意见
              fileMemo: '看好未来收益', // 说明
              enclosure: [
                {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
                {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
              ]// 附件
            }
          ],
          [
            {
              department: '设计部', // 部门
              posi: '审核人', // 负责人
              opinion: '同意', // 意见
              fileMemo: '看好未来收益', // 说明
              enclosure: [
                {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
                {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
              ]// 附件
            },
            {
              department: '设计部', // 部门
              posi: '审核人', // 负责人
              opinion: '同意', // 意见
              fileMemo: '看好未来收益', // 说明
              enclosure: [
                {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
                {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
              ]// 附件
            }
          ],
          [
            {
              department: '', // 部门
              posi: '', // 负责人
              opinion: '', // 意见
              fileMemo: '', // 说明
              enclosure: []// 附件
            }
          ]
        ],
        goodList: [ // 物品清单
          {
            name: '床1.2m',
            count: 2,
            ascription: '公司'
          }
        ]
      }, // 控制房源详情里的展示信息
      formLabelWidth: '120px',
      houseText: '',
      dialogVisible: false,
      dialogFormVisible: false,
      dialogEditVisible: false, // 编辑测算数据弹窗
      dialogApprovalVisible: false, // 编辑审批意见
      dialogAddVisible: false, // 新建托管
      dialogApprovalTitle: '',
      dialogApprovalContent: true, // 判断审核动作
      disabled: true,
      dialogAddVisibledisabled: false, // 新增托管可用
      input: '',
      houseEditVisible: false,
      houseEdit: {}, // 修改房源信息
      tableDataWay: 'house',
      tableData2: [], // 当前列表数据
      totleData: [], // 所有的列表数据
      tableData4: [ // 测算流程需要输入的信息
        {
          department: '设计部',
          house: [
            {
              name: 'A',
              information: [
                {
                  type: 'input', // 填写类型  输入框
                  label: '房源面积', // 填写的名称
                  model: 'size',
                  value: ''
                },
                {
                  type: 'select',
                  value: '2',
                  label: '朝向',
                  option: [ // select下拉框的内容及value
                    {
                      label: '东', // 内容
                      value: '1'  // value
                    },
                    {
                      label: '南', // 内容
                      value: '2'  // value
                    }
                  ]
                },
                {
                  type: 'checkbox', // 复选框
                  value: ['WIFI', '朝南', '停车位'], // 默认选选中多选框内容
                  label: '特色',
                  option: ['WIFI', '朝南', '停车位', '双阳台'] // 所有的多选框内容
                },
                {
                  type: 'radio', // 单选框
                  value: '1', // 默认选选中多选框内容
                  label: '床铺大小',
                  option: [
                    {
                      value: '1',
                      label: '1.2m'
                    },
                    {
                      value: '2',
                      label: '1.5m'
                    },
                    {
                      value: '3',
                      label: '1.8m'
                    }
                  ] // 所有的多选框内容
                }
              ]
            },
            {
              name: 'B',
              information: [
                {
                  type: 'input', // 填写类型  输入框
                  label: '房源面积', // 填写的名称
                  model: 'size',
                  value: ''
                },
                {
                  type: 'select',
                  value: '2',
                  label: '朝向',
                  option: [ // select下拉框的内容及value
                    {
                      label: '东', // 内容
                      value: '1'  // value
                    },
                    {
                      label: '南', // 内容
                      value: '2'  // value
                    }
                  ]
                },
                {
                  type: 'checkbox', // 复选框
                  value: ['WIFI', '朝南', '停车位'], // 默认选选中多选框内容
                  label: '特色',
                  option: ['WIFI', '朝南', '停车位', '双阳台'] // 所有的多选框内容
                },
                {
                  type: 'radio', // 单选框
                  value: '1', // 默认选选中多选框内容
                  label: '床铺大小',
                  option: [
                    {
                      value: '1',
                      label: '1.2m'
                    },
                    {
                      value: '2',
                      label: '1.5m'
                    },
                    {
                      value: '3',
                      label: '1.8m'
                    }
                  ] // 所有的多选框内容
                }
              ]
            },
            {
              name: 'C',
              information: [
                {
                  type: 'input', // 填写类型  输入框
                  label: '房源面积', // 填写的名称
                  model: 'size',
                  value: ''
                },
                {
                  type: 'select',
                  value: '2',
                  label: '朝向',
                  option: [ // select下拉框的内容及value
                    {
                      label: '东', // 内容
                      value: '1'  // value
                    },
                    {
                      label: '南', // 内容
                      value: '2'  // value
                    }
                  ]
                },
                {
                  type: 'checkbox', // 复选框
                  value: ['WIFI', '朝南', '停车位'], // 默认选选中多选框内容
                  label: '特色',
                  option: ['WIFI', '朝南', '停车位', '双阳台'] // 所有的多选框内容
                },
                {
                  type: 'radio', // 单选框
                  value: '1', // 默认选选中多选框内容
                  label: '床铺大小',
                  option: [
                    {
                      value: '1',
                      label: '1.2m'
                    },
                    {
                      value: '2',
                      label: '1.5m'
                    },
                    {
                      value: '3',
                      label: '1.8m'
                    }
                  ] // 所有的多选框内容
                }
              ]
            }
          ]
        },
        {
          department: '设计部',
          house: [
            {
              name: 'A',
              information: [
                {
                  type: 'input', // 填写类型  输入框
                  label: '房源面积', // 填写的名称
                  model: 'size',
                  value: ''
                },
                {
                  type: 'select',
                  value: '2',
                  label: '朝向',
                  option: [ // select下拉框的内容及value
                    {
                      label: '东', // 内容
                      value: '1'  // value
                    },
                    {
                      label: '南', // 内容
                      value: '2'  // value
                    }
                  ]
                },
                {
                  type: 'checkbox', // 复选框
                  value: ['WIFI', '朝南', '停车位'], // 默认选选中多选框内容
                  label: '特色',
                  option: ['WIFI', '朝南', '停车位', '双阳台'] // 所有的多选框内容
                },
                {
                  type: 'radio', // 单选框
                  value: '1', // 默认选选中多选框内容
                  label: '床铺大小',
                  option: [
                    {
                      value: '1',
                      label: '1.2m'
                    },
                    {
                      value: '2',
                      label: '1.5m'
                    },
                    {
                      value: '3',
                      label: '1.8m'
                    }
                  ] // 所有的多选框内容
                }
              ]
            },
            {
              name: 'B',
              information: [
                {
                  type: 'input', // 填写类型  输入框
                  label: '房源面积', // 填写的名称
                  model: 'size',
                  value: ''
                },
                {
                  type: 'select',
                  value: '2',
                  label: '朝向',
                  option: [ // select下拉框的内容及value
                    {
                      label: '东', // 内容
                      value: '1'  // value
                    },
                    {
                      label: '南', // 内容
                      value: '2'  // value
                    }
                  ]
                },
                {
                  type: 'checkbox', // 复选框
                  value: ['WIFI', '朝南', '停车位'], // 默认选选中多选框内容
                  label: '特色',
                  option: ['WIFI', '朝南', '停车位', '双阳台'] // 所有的多选框内容
                },
                {
                  type: 'radio', // 单选框
                  value: '1', // 默认选选中多选框内容
                  label: '床铺大小',
                  option: [
                    {
                      value: '1',
                      label: '1.2m'
                    },
                    {
                      value: '2',
                      label: '1.5m'
                    },
                    {
                      value: '3',
                      label: '1.8m'
                    }
                  ] // 所有的多选框内容
                }
              ]
            },
            {
              name: 'C',
              information: [
                {
                  type: 'input', // 填写类型  输入框
                  label: '房源面积', // 填写的名称
                  model: 'size',
                  value: ''
                },
                {
                  type: 'select',
                  value: '2',
                  label: '朝向',
                  option: [ // select下拉框的内容及value
                    {
                      label: '东', // 内容
                      value: '1'  // value
                    },
                    {
                      label: '南', // 内容
                      value: '2'  // value
                    }
                  ]
                },
                {
                  type: 'checkbox', // 复选框
                  value: ['WIFI', '朝南', '停车位'], // 默认选选中多选框内容
                  label: '特色',
                  option: ['WIFI', '朝南', '停车位', '双阳台'] // 所有的多选框内容
                },
                {
                  type: 'radio', // 单选框
                  value: '1', // 默认选选中多选框内容
                  label: '床铺大小',
                  option: [
                    {
                      value: '1',
                      label: '1.2m'
                    },
                    {
                      value: '2',
                      label: '1.5m'
                    },
                    {
                      value: '3',
                      label: '1.8m'
                    }
                  ] // 所有的多选框内容
                }
              ]
            }
          ]
        },
        {
          department: '投资部',
          house: [
            {
              name: 'A',
              information: [
                {
                  type: 'input', // 填写类型  输入框
                  label: '房源面积', // 填写的名称
                  model: 'size',
                  value: ''
                },
                {
                  type: 'select',
                  value: '2',
                  label: '朝向',
                  option: [ // select下拉框的内容及value
                    {
                      label: '东', // 内容
                      value: '1'  // value
                    },
                    {
                      label: '南', // 内容
                      value: '2'  // value
                    }
                  ]
                },
                {
                  type: 'checkbox', // 复选框
                  value: ['WIFI', '朝南', '停车位'], // 默认选选中多选框内容
                  label: '特色',
                  option: ['WIFI', '朝南', '停车位', '双阳台'] // 所有的多选框内容
                },
                {
                  type: 'radio', // 单选框
                  value: '1', // 默认选选中多选框内容
                  label: '床铺大小',
                  option: [
                    {
                      value: '1',
                      label: '1.2m'
                    },
                    {
                      value: '2',
                      label: '1.5m'
                    },
                    {
                      value: '3',
                      label: '1.8m'
                    }
                  ] // 所有的多选框内容
                }
              ]
            },
            {
              name: 'B',
              information: [
                {
                  type: 'input', // 填写类型  输入框
                  label: '房源面积', // 填写的名称
                  model: 'size',
                  value: ''
                },
                {
                  type: 'select',
                  value: '2',
                  label: '朝向',
                  option: [ // select下拉框的内容及value
                    {
                      label: '东', // 内容
                      value: '1'  // value
                    },
                    {
                      label: '南', // 内容
                      value: '2'  // value
                    }
                  ]
                },
                {
                  type: 'checkbox', // 复选框
                  value: ['WIFI', '朝南', '停车位'], // 默认选选中多选框内容
                  label: '特色',
                  option: ['WIFI', '朝南', '停车位', '双阳台'] // 所有的多选框内容
                },
                {
                  type: 'radio', // 单选框
                  value: '1', // 默认选选中多选框内容
                  label: '床铺大小',
                  option: [
                    {
                      value: '1',
                      label: '1.2m'
                    },
                    {
                      value: '2',
                      label: '1.5m'
                    },
                    {
                      value: '3',
                      label: '1.8m'
                    }
                  ] // 所有的多选框内容
                }
              ]
            },
            {
              name: 'C',
              information: [
                {
                  type: 'input', // 填写类型  输入框
                  label: '房源面积', // 填写的名称
                  model: 'size',
                  value: ''
                },
                {
                  type: 'select',
                  value: '2',
                  label: '朝向',
                  option: [ // select下拉框的内容及value
                    {
                      label: '东', // 内容
                      value: '1'  // value
                    },
                    {
                      label: '南', // 内容
                      value: '2'  // value
                    }
                  ]
                },
                {
                  type: 'checkbox', // 复选框
                  value: ['WIFI', '朝南', '停车位'], // 默认选选中多选框内容
                  label: '特色',
                  option: ['WIFI', '朝南', '停车位', '双阳台'] // 所有的多选框内容
                },
                {
                  type: 'radio', // 单选框
                  value: '1', // 默认选选中多选框内容
                  label: '床铺大小',
                  option: [
                    {
                      value: '1',
                      label: '1.2m'
                    },
                    {
                      value: '2',
                      label: '1.5m'
                    },
                    {
                      value: '3',
                      label: '1.8m'
                    }
                  ] // 所有的多选框内容
                }
              ]
            }
          ]
        }
      ],
      showData: { // 测算流程已填写的内容
        size: '80',
        direction: '1',
        cities: ''
      },
      show: {
        show: false
      },
      editClick: 0,
      approval: {
        houseSpaceId: '',
        fileExplain: '',
        fileType: 'CHECK_ENCLOSURE',
        reqFileBeanList: []
      },
      int: 0,
      trusteeshipAdd: {},
      mix: {
        depositAddUrl: this.$store.state.houseUrl + 'save/houseSpace', // 新增托管
        depositapprovalUrl: this.$store.state.houseUrl + 'update/houseSpaceStatus', // 审核
        houseResourcesUrl: this.$store.state.houseUrl + 'list/houseSpace', // 房源列表
        houseDetailUrl: this.$store.state.houseUrl + 'get', // 根据房源ID查询详细信息
        houseUpdate: this.$store.state.houseUrl + 'update/houseSpace', // 房源修改
        insertFile: this.$store.state.houseUrl + 'insertFile', // 上传各种文件的接口
        userSignUrl: this.$store.state.accountUrl + 'user/info/signin', // 查询用户信息
        userUrl: this.$store.state.accountUrl + 'user/list', // 查询用户列表
        unitTree: this.$store.state.accountUrl + 'unit/tree/all', // 片区列表
        userId: this.$store.state.accountUrl + 'user/info/cert/', // 根据ID搜索身份证
        contractAdd: this.$store.state.contractUrl + 'addTruCon', // 新增合同号
        userPhoneId: this.$store.state.accountUrl + 'user/info/p/' // 根据手机号搜索身份证
      },
      countClick: 0,
      detailClick: 0
    }
  },
  components: {
    commonlist, houseCard, trusteeship, depositEdit, houseDetail, trusteeshipAdd, depositAdd, houseSearch, houseEdit
  },
  created () {
    this.$store.state.houseleftnavnum = '/house/newHouse'
    this.$store.state.topIndex = '/house/house1'
  },
  mounted: function () {
    $('.el-dialog--small,.el-dialog--tiny').width(650)
    if ($this.int === 0) {
      $('body').click(function (event) {
        var _target = event.target
        if (_target.closest('.el-dropdown-menu') === null && _target.closest('.houseDetail.dialog') === null && _target.closest('.el-dialog') === null && $this.show.show === true) {
          $this.show.show = false
          $this.detailClick++
        }
      })
      $this.int = 0
    }
  },
  methods: {
    closePanel () {
      $('#left-panel-type-house-info').fadeOut(250)
    },
    roomSearch () { // 合租搜索
    },
    houseEditForm (data) {
      var list = []
      this.dialogEditVisible = true
      data.houseFeatureEnumList = list
      this.houseChange = data
    },
    editForm (data) { // 关闭编辑弹窗
      this.dialogEditVisible = data
    },
    closeTrusteeshipAdd (data) { // 关闭新增合同弹窗
      this.dialogVisible = data
    },
    directionChange (data) { // 解析房源朝向
      // var direction1
      switch (data.direction) {
        case 'EAST':
          data.direction1 = '东'
          break
        case 'SOUTH':
          data.direction1 = '南'
          break
        case 'WEST':
          data.direction1 = '西'
          break
        case 'NORTH':
          data.direction1 = '北'
          break
        case 'SOUTHEAST':
          data.data.direction1 = '东南'
          break
        case 'NORTHEAST':
          data.direction1 = '东北'
          break
        case 'SOUTHWEST':
          data.direction1 = '西南'
          break
        case 'NORTHWEST':
          data.direction1 = '西北'
          break
      }
      switch (data.decorateType) {
        case 'R':
          data.decorateType1 = '毛坯房'
          break
        case 'S':
          data.decorateType = '简装'
          break
        case 'RD':
          data.decorateType = '精装'
          break
        case 'A':
          data.decorateType = '豪华装修'
          break
      }
      switch (data.resHouseSpaceBeanList[0].houseSpaceStatus) {
        case 'WAIT_DELEGATE':
          data.houseSpaceStatus1 = '待托管'
          break
        case 'ASSESSING':
          data.houseSpaceStatus1 = '评估中'
          break
        case 'APPROVED':
          data.houseSpaceStatus1 = '评估通过'
          break
        case 'SIGNING_DC':
          data.houseSpaceStatus1 = '签订托管合同中'
          break
        case 'DC_NOT_TE':
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
      data.houseSpaceArea1 = data.resHouseSpaceBeanList[0].houseSpaceArea / 1000
      data.rentalPrice1 = data.resHouseSpaceBeanList[0].rentalPrice / 1000
      // data.direction1 = direction1
      return data
    },
    intoString: function (obj) { // 将对象中的int类型转换为string类型
      for (var p in obj) {
        if (obj[p] !== '' && obj[p] !== null && typeof (obj[p]) === 'number') {
          obj[p] = obj[p].toString()
        }
        // obj[p] = parseString(obj[p])
      }
      return obj
    },
    houseEditShow (data) { // 打开房源编辑弹窗
      this.houseEditVisible = true
      this.editClick++
      this.houseEdit = data.resHouseSpaceBeanList[0].houseSpaceId
    },
    submitEdit (data) { // 提交修改
      if (data) {
        this.searchList.pageNo = this.currentPage2
        this.searchList.pageSize = this.pageSize
        this.$options.methods.getHouseList(this, this.mix.houseResourcesUrl, this.searchList)
      }
      this.houseEditVisible = false
    },
    closeEditForm () { // 关闭房源编辑弹窗
      this.houseEditVisible = false
    },
    entireRentTile (data) { // 整租房源平铺，即将部分重要信息从roomList中提取到父对象
      var data1 = data[0]
      data.businessId = data1.businessId
      data.area = data1.area
      data.houseSpaceStatus = data1.houseSpaceStatus
      data.rentalPrice = data1.rentalPrice
      data.direction = data1.direction
      data.direction1 = data1.direction1
      data.keywordAddress = data1.keywordAddress
    },
    addTrusteeshopSuccess () { // 合同添加成功之后刷新列表
      this.dialogVisible = false
      this.searchList.pageNo = this.currentPage2
      this.searchList.pageSize = this.pageSize
      this.$options.methods.getHouseList(this, this.mix.houseResourcesUrl, this.searchList)
    },
    houseSearch (ind, index) { // 修改后搜索的搜索，不支持搜索框
      // var data = {}
      if (index === 'ALL') {
        index = null
      }
      if (this.searchList[ind] !== index) {
        this.searchList[ind] = index
        this.currentPage2 = 1
      }
      this.searchList.pageNo = this.currentPage2
      this.searchList.pageSize = this.pageSize
      this.$options.methods.getHouseList(this, this.mix.houseResourcesUrl, this.searchList) // 根据查询信息查询房源列表
    },
    houseSearch1 () { // 修改后搜索的搜索，不支持搜索框
      this.searchList.pageNo = this.currentPage2
      this.searchList.pageSize = this.pageSize
      this.$options.methods.searchHouseList(this, this.mix.houseResourcesUrl, this.searchList) // 根据查询信息查询房源列表
    },
    closeForm () {
      this.dialogAddVisible = false
    },
    openForm () {},
    depositDeatilShow (data) {
      this.show.show = true
      this.detailClick++
      this.houseDetail.houseSpaceId = data.resHouseSpaceBeanList[0].houseSpaceId
    },
    depositing (data) { // 接受托管
      this.houseSpaceManagerId = data.resHouseSpaceBeanList[0].houseSpaceId
      this.$options.methods.houseSpaceStatus(this, this.mix.depositapprovalUrl, 'ASSESSING')
    },
    refuseDsposit (data) { // 拒绝托管
      this.houseSpaceManagerId = data.resHouseSpaceBeanList[0].houseSpaceId
      this.$options.methods.houseSpaceStatus(this, this.mix.depositapprovalUrl, 'RETAIN')
    },
    depositapproval (data, data1) { // 审批
      // this.dialogApprovalVisible = true
      this.houseSpaceManagerId = data1.resHouseSpaceBeanList[0].houseSpaceId
      // this.approval.houseSpaceId = data1.resHouseSpaceBeanList[0].houseSpaceId
      let houseSpaceStatus = ''
      if (data) {
        // this.dialogApprovalTitle = '审批同意'
        // this.dialogApprovalContent = true
        // this.approval.houseSpaceStatus = 'ASSESSING'
        houseSpaceStatus = 'APPROVED'
      } else {
        // this.dialogApprovalTitle = '审批不同意'
        // this.dialogApprovalContent = false
        // this.approval.houseSpaceStatus = 'RETAIN'
        houseSpaceStatus = 'RETAIN'
      }
      this.$http.post(this.mix.depositapprovalUrl, {
        houseSpaceStatus: houseSpaceStatus, houseSpaceId: this.houseSpaceManagerId
      }).then(({data}) => {
        if (data.code === 200) {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
          this.searchList.pageNo = this.currentPage2
          this.searchList.pageSize = this.pageSize
          this.$options.methods.getHouseList(this, this.mix.houseResourcesUrl, this.searchList)
        } else {
          this.$message({
            message: data.message,
            type: 'warning'
          })
        }
      })
      // this.approval.houseSpaceStatus = data1.resHouseSpaceBeanList[0].houseSpaceStatus
    },
    approvalSubmitN () {
      this.dialogApprovalVisible = false
      this.approval.fileExplain = ''
      this.approval.fileList = []
    },
    approvalSubmit () { // 提交审核意见及附件
      var houseSpaceStatus
      if (this.dialogApprovalContent) {
        houseSpaceStatus = 'APPROVED' // 审核通过
      } else {
        houseSpaceStatus = 'RETAIN' // 审核不通过
      }
      this.$http.post(this.mix.depositapprovalUrl, {
        houseSpaceStatus: houseSpaceStatus, houseSpaceId: this.houseSpaceManagerId
      }).then(({data}) => {
        if (data.code === 200) {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
          this.searchList.pageNo = this.currentPage2
          this.searchList.pageSize = this.pageSize
          this.$options.methods.getHouseList(this, this.mix.houseResourcesUrl, this.searchList)
        } else {
          this.$message({
            message: data.message,
            type: 'warning'
          })
        }
        this.dialogApprovalVisible = false
        this.approval.fileExplain = ''
        this.approval.fileList = []
      })
    },
    depositNewTrustship (data) { // 新建托管合同 弹窗
      this.countClick++
      this.dialogVisible = true
      this.houseChange = this.houseChange1
      this.houseChange.bankAccount = ''
      this.houseChange.bankOfAccounts = ''
      this.houseChange.deposit = ''
      this.houseChange.effectTime = ''
      this.houseChange.endTime = ''
      this.houseChange.freeStartTime = ''
      this.houseChange.freeEndTime = ''
      this.houseChange.addType = '0'
      this.houseChange.addAmount1 = ''
      this.houseChange.addPer1 = ''
      this.houseChange.addAmount = ''
      this.houseChange.addPer = ''
      // 获取列表信息传递到新建合同
      // 房东ID
      this.trusteeshipAdd.uId = data.landlordId
      // 房东姓名
      this.trusteeshipAdd.userName = data.landlordName
      // 房东手机号
      this.trusteeshipAdd.phoneNum = data.landlordPhone
      // 房东证件类型
      this.trusteeshipAdd.cerType = data.landlordCertType
      // 房东证件号
      this.trusteeshipAdd.cerNum = data.landlordCertNumber
      // 房源ID
      this.trusteeshipAdd.houseSpaceManagerId = data.resHouseSpaceBeanList[0].houseSpaceId
      this.trusteeshipAdd.businessId = data.resHouseSpaceBeanList[0].businessId
      // 地址
      this.trusteeshipAdd.buildingNo = data.buildingNo
      this.trusteeshipAdd.unitNo = data.unitNo
      this.trusteeshipAdd.rental1 = ''
      this.trusteeshipAdd.deposit1 = ''
      this.trusteeshipAdd.roomNo = data.roomNo
      this.trusteeshipAdd.blockName = data.blockName
      this.trusteeshipAdd.housekeeperId = ''
      this.trusteeshipAdd.zoneId = data.zoneId
      this.trusteeshipAdd.keywordAddress = data.resHouseSpaceBeanList[0].keywordAddress
      console.log(data)
    },
    houseRental (data) { // 房源空置
      this.houseSpaceManagerId = data.resHouseSpaceBeanList[0].houseSpaceId
      this.$options.methods.houseSpaceStatus(this, this.mix.depositapprovalUrl, 'RENTABLE')
    },
    depositDesgin (data) { // 房源设计中
      console.log(data)
      this.houseSpaceManagerId = data.resHouseSpaceBeanList[0].houseSpaceId
      this.$options.methods.houseSpaceStatus(this, this.mix.depositapprovalUrl, 'DESIGNING')
    },
    depositDesginEnd (data) { // 房源设计完成
      console.log(data)
      this.houseSpaceManagerId = data.resHouseSpaceBeanList[0].houseSpaceId
      this.$options.methods.houseSpaceStatus(this, this.mix.depositapprovalUrl, 'CONSTRUCTING')
    },
    renovationing (data) { // 装修完成
      this.houseSpaceManagerId = data.resHouseSpaceBeanList[0].houseSpaceId
      this.$options.methods.houseSpaceStatus(this, this.mix.depositapprovalUrl, 'CHECKING')
    },
    houseCheck (data) { // 验收
      this.houseSpaceManagerId = data.resHouseSpaceBeanList[0].houseSpaceId
      this.$options.methods.houseSpaceStatus(this, this.mix.depositapprovalUrl, 'RENTABLE')
    },
    process (file, fileList) { // 获取审核附件
      this.approval.reqFileBeanList = fileList
      var reqFileBeanList = this.approval.reqFileBeanList
      for (var p in fileList) {
        reqFileBeanList[p].fileName = fileList[p].name
        reqFileBeanList[p].fileUrl = fileList[p].url
        reqFileBeanList[p].fileSize = fileList[p].size
      }
    },
    addSuccess () { // 房源添加成功
      this.dialogAddVisible = false
      this.searchList.pageNo = this.currentPage2
      this.searchList.pageSize = this.pageSize
      this.$options.methods.getHouseList(this, this.mix.houseResourcesUrl, this.searchList)
    },
    beforeAvatarUpload (file) { // 限制用户上传的图片格式和大小
      const isLt2M = file.size / 1024 / 1024 < 10

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 10MB')
      }
      return isLt2M
    },
    error (file) { // 文件上传失败
      this.$message.error(file.name + '文件上传失败')
    },
    depositAddShow () {
      this.dialogAddVisible = true
    },
    // depositAdd () { // 新建托管
    // },
    pageData (data, pageSize, current) { // 分页
      var tableData = []
      for (var i = ((current - 1) * pageSize); i < (current * pageSize) && i < data.length; i++) {
        tableData.push(data[i])
      }
      return tableData
    },
    handleSizeChange (data) { // 分页数改变时触发
      this.pageSize = data
      this.searchList.pageNo = this.currentPage2
      this.searchList.pageSize = this.pageSize
      this.tableData2 = this.$options.methods.getHouseList(this, this.mix.houseResourcesUrl, this.searchList)
    },
    handleCurrentChange (data) { // 当前页改变时触发
      this.currentPage2 = data
      this.searchList.pageNo = this.currentPage2
      this.searchList.pageSize = this.pageSize
      this.tableData2 = this.$options.methods.getHouseList(this, this.mix.houseResourcesUrl, this.searchList)
    },
    getHouseList (_this, url, searchList) { // 获取房源列表
      _this.totlePage = 0
      _this.tableData2 = []
      if (searchList.houseSpaceStatus === 'RETAIN') {
        delete searchList.houseSpaceProcess
      } else {
        searchList.houseSpaceProcess = 'GET_PROCESS'
      }
      searchList.loginId = _this.$store.state.currentUser.uid
      _this.$http.post(url, searchList).then(({data}) => {
        if (data.code === 200) {
          for (var i = 0; i < data.data.list.length; i++) {
            // 解析房源朝向
            _this.$options.methods.directionChange(data.data.list[i])
            var startTime = new Date(data.data.list[i].createTime)
            data.data.list[i].startTime = startTime.getFullYear() + '-' + (startTime.getMonth() + 1) + '-' + startTime.getDate()
          }
          _this.totlePage = data.data.totalCount
          _this.tableData2 = data.data.list
        } else {
          this.totleData = []
          this.totlePage = 0
          this.tableData2 = []
        }
      })
    },
    searchHouseList (_this, url, searchData) { // 根据查询信息查询房源列表
      searchData.loginId = _this.$store.state.currentUser.uid
      _this.$http.post(url, searchData).then(({data}) => {
        if (data.code === 200) {
          // for (var i = 0; i < data.data.length; i++) {
          //   // 解析房源朝向
          //   _this.$options.methods.entireRentTile(data.data[i])
          //   _this.$options.methods.directionChange(data.data[i])
          // }
          // _this.totleData = data.data
          // _this.totlePage = data.totalHouseSpace
          // _this.tableData2 = _this.$options.methods.pageData(_this.totleData, _this.pageSize, _this.currentPage2)
          for (var i = 0; i < data.data.list.length; i++) {
            // 解析房源朝向
            _this.$options.methods.directionChange(data.data.list[i])
            var startTime = new Date(data.data.list[i].createTime)
            data.data.list[i].startTime = startTime.getFullYear() + '-' + (startTime.getMonth() + 1) + '-' + startTime.getDate()
          }
          _this.totlePage = data.data.totalCount
          _this.tableData2 = data.data.list
        } else {
          _this.totleData = []
          _this.totlePage = 0
          _this.tableData2 = []
        }
      })
    },
    houseSpaceStatus (_this, url, houseSpaceStatus) { // 房源空置
      // searchList.housekeeperId = _this.$store.state.currentUser.uid
      _this.$http.post(url, {
        houseSpaceStatus: houseSpaceStatus, houseSpaceId: _this.houseSpaceManagerId
      }).then(({data}) => {
        if (data.code === 200) {
          _this.$message({
            message: '提交成功',
            type: 'success'
          })
          _this.searchList.pageNo = _this.currentPage2
          _this.searchList.pageSize = _this.pageSize
          _this.$options.methods.getHouseList(_this, _this.mix.houseResourcesUrl, _this.searchList)
        } else {
          _this.$message({
            message: data.message,
            type: 'warning'
          })
        }
        _this.dialogApprovalVisible = false
        _this.approval.name = ''
        _this.approval.fileList = []
      })
    }
  }
}
$('.el-dialog--small').width(650)
</script>
<style scoped>
@import '../../../static/css/app.css';
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
.el-pagination{
  text-align: center;
  margin-top: 20px;
}
</style>
















