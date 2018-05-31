<template>
  <div class="contract">
    <template v-if="contractForm.show">
    <el-dialog :show-close="contractFormData.dialog" :close-on-press-escape="contractFormData.dialog" :close-on-click-modal="false" top="5%" :title="contractFormData.title" :visible.sync="contractForm.show" size="small">
      <el-form inline ref="contractFormData" :rules="rules" :model="contractFormData" label-width="126px" label-position="right">
      <!-- 是否为电子合同 -->
        <el-row v-if="contractFormData.storageTypeShow && this.$store.state.currentUser.roleData.indexOf('运营部经理') !== -1">
          <el-col :span="12">
            <el-form-item label="合同性质" prop="storageType">
              <el-radio class="radio" v-model="contractFormData.storageType" label="ELE">电子合同</el-radio>
              <el-radio class="radio" v-model="contractFormData.storageType" label="PAPER">纸质合同</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
      <!-- 姓名手机号 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input @blur="blurName()" v-model="contractFormData.name" placeholder="姓名" :disabled="contractFormData.nameS"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号" prop="phone">
              <el-input @blur="blur()" v-model="contractFormData.phone" :disabled="contractFormData.phoneS" @keyup.native="search()" placeholder="手机号" :maxlength="13"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 紧急联系人电话 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="紧急联系人电话" prop="urgentPhone">
              <el-input v-model="contractFormData.urgentPhone" placeholder="手机号" :maxlength="11"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 证件类型和国籍 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="证件类型" prop="certificateType">
              <el-select v-model="contractFormData.certificateType" placeholder="请选择证件类型">
                <el-option label="身份证" value="ID"></el-option>
                <el-option label="护照" value="P"></el-option>
                <el-option label="营业执照" value="BL"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="this.contractFormData.certificateType === 'P'" :span="12">
            <el-form-item label="国籍" prop="nationality">
              <el-input v-model="contractFormData.nationality" placeholder="国籍"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 身份证号性别 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="证件号码" prop="cardId">
              <el-input @blur="blurCardId()" v-model="contractFormData.cardId" :disabled="contractFormData.cardIdS" placeholder="证件号码" :maxlength="18"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="sex">
              <el-radio class="radio" v-model="contractFormData.sex" label="M">男</el-radio>
              <el-radio class="radio" v-model="contractFormData.sex" label="F">女</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 房源名称 -->
        <el-row>
          <el-col :span="24">
            <el-form-item label="房源名称" prop="houseSpaceName">
              <el-select
                v-model="contractFormData.houseSpaceName"
                filterable
                remote
                class="sousuo"
                placeholder="请输入关键词"
                :remote-method="remoteMethod"
                :loading="loading"
                :disabled="contractFormData.houseSpaceNameS">
                <el-option
                  v-for="item in options4"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 起租退租时间 -->
        <el-row>
          <el-col :span="24">
            <el-form-item label="租期时间" prop="startTime">
              <el-date-picker
                class="timeWidth"
                v-model="contractFormData.startTime"
                type="date"
                placeholder="起租时间"
                @change="changeTime2"
                :disabled="contractFormData.startTimeS">
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="endTime">
              <el-date-picker
                class="timeWidth"
                v-model="contractFormData.endTime"
                type="date"
                placeholder="退租时间"
                @change="changeTime"
                :disabled="contractFormData.endTimeS">
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="rentRange">
              <el-radio-group :disabled="contractFormData.rentRangeS" v-model="contractFormData.rentRange" class="radio" @change="changeLabel">
                <el-radio-button label="1月">1月</el-radio-button>
                <el-radio-button label="3月">3月</el-radio-button>
                <el-radio-button label="6月">6月</el-radio-button>
                <el-radio-button label="1年">1年</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="12">
            <el-form-item label="房源类型" prop="houseRentType">
              <el-col>
                <el-select @change="changeHouseRentType" class="w100p" :disabled="contractFormData.houseRentTypeS" v-model="contractFormData.houseRentType" placeholder="请选择房源类型">
                  <el-option :key="1" v-for="item in houseRentType" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row> -->
        <!-- 免租期开始结束时间 -->
        <!-- <el-row>
          <el-col :span="12">
            <el-form-item label="免租期开始时间" prop="rentFreeStart">
              <el-date-picker
                v-model="contractFormData.rentFreeStart"
                type="date"
                placeholder="免租期开始时间"
                >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="免租期结束时间" prop="rentFreeEnd">
              <el-date-picker
                v-model="contractFormData.rentFreeEnd"
                type="date"
                placeholder="免租期结束时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row> -->
        <!-- 租金押金 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="租金" prop="rentMoney">
              <el-input placeholder="请输入租金" v-model="contractFormData.rentMoney"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="押金" prop="deposit">
              <el-input placeholder="请输入押金" v-model="contractFormData.deposit"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 日租月租,支付周期,首月减免金额 -->
        <el-row :span="24">
          <!-- <el-col :span="12">
            <el-form-item label="租赁类型" prop="rentType1">
              <el-select v-model="contractFormData.rentType1" placeholder="请选择租赁类型">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item label="支付周期" prop="rentType2">
              <el-select @change="guyuMoneyMonth()" v-model="contractFormData.rentType2" placeholder="请选择支付周期">
                <el-option
                  v-for="(item, index) in options2"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="this.contractFormData.projectTrue !== 'yes'" :span="12">
            <el-form-item label="首月减免金额" prop="firstMoney">
              <el-input @blur="firstMoneyMonth()" placeholder="首月减免金额" v-model="contractFormData.firstMoney"></el-input>
            </el-form-item>
          </el-col>

          <!-- 网络费支付周期 -->
          <el-col :span="12">
            <el-form-item label="网络费支付周期" prop="wlCycle">
              <el-select v-model="contractFormData.wlCycle" placeholder="请选择网络费支付周期">
                <el-option
                  v-for="(item, index) in options2"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 网络费金额 -->
          <el-col :span="12">
            <el-form-item label="网络费金额" prop="wlNum">
              <el-input placeholder="网络费金额" v-model="contractFormData.wlNum"></el-input>
            </el-form-item>
          </el-col>

          <!-- 物业费支付周期 -->
          <el-col :span="12">
            <el-form-item label="物业费支付周期" prop="wyCycle">
              <el-select v-model="contractFormData.wyCycle" placeholder="请选择物业费支付周期">
                <el-option
                  v-for="(item, index) in options2"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 物业费金额 -->
          <el-col :span="12">
            <el-form-item label="物业费金额" prop="wyNum">
              <el-input placeholder="物业费金额" v-model="contractFormData.wyNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 定金 -->
        <el-row v-if="contractFormData.earnestShow">
          <el-col :span="12">
            <el-form-item label="定金" prop="earnest">
              <el-input :disabled="contractFormData.earnestShow" placeholder="请输入定金" v-model="contractFormData.earnest"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 是否有偿 -->
        <!-- <el-row v-if="contractFormData.poundageShow">
          <el-col :span="12">
            <el-form-item label="是否有偿" prop="poundage">
              <el-select v-model="contractFormData.poundage" placeholder="是否有偿">
                <el-option v-if="contractFormData.zhuanzuShow" label="转租有偿" value="SPAID"></el-option>
                <el-option v-if="contractFormData.zhuanzuShow" label="转租无偿" value="SNOTPAID"></el-option>
                <el-option v-if="contractFormData.huanfangShow" label="换房有偿" value="CPAID"></el-option>
                <el-option v-if="contractFormData.huanfangShow" label="换房无偿" value="CNOTPAID"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row> -->
        <!-- 转接过来的项目计费 -->
        <!-- <el-row>
          <el-col :span="12">
            <el-form-item label="转接项目" prop="projectTrue">
              <el-select v-model="contractFormData.projectTrue" placeholder="是否为转接过来项目">
                <el-option label="是" value="yes"></el-option>
                <el-option label="否" value="no"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="this.contractFormData.projectTrue === 'yes'" :span="12">
            <el-form-item label="收费时间" prop="secStartTime">
              <el-date-picker
                v-model="contractFormData.secStartTime"
                type="date"
                placeholder="第二次收费开始时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row> -->
        <!-- 上调类型 -->
        <!-- <el-row>
          <el-col v-if="this.contractFormData.rentType2 !== 'ONEPAY'" :span="12">
            <el-form-item label="上调类型" prop="addType">
              <el-select v-model="contractFormData.addType" placeholder="请选择上调类型">
                <el-option label="不上调" value="NOTRISE"></el-option>
                <el-option label="金额数" value="RISEBYAMOUNT"></el-option>
                <el-option label="百分比" value="RISEBYPER"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="签约时间" prop="signTime">
              <el-date-picker
                v-model="contractFormData.signTime"
                type="date"
                placeholder="签约时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row> -->
        <!-- 上调周期和上调金额百分比 -->
        <!-- <el-row>
          <el-col v-if="this.contractFormData.addType === 'RISEBYAMOUNT' || this.contractFormData.addType === 'RISEBYPER'" :span="12">
            <el-form-item label="上调周期" prop="addCycle">
              <el-select v-model="contractFormData.addCycle" placeholder="请选择上调周期">
                <el-option
                  v-for="item in addCycle"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="this.contractFormData.addType === 'RISEBYAMOUNT'" :span="12">
            <el-form-item label="上调金额数" prop="addAmount">
              <el-input v-model="contractFormData.addAmount" auto-complete="off" placeholder="请输入上调金额数"></el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="this.contractFormData.addType === 'RISEBYPER'" :span="12">
            <el-form-item label="上调百分比" prop="addPer">
              <el-input v-model="contractFormData.addPer" auto-complete="off" placeholder="请输入上调百分比"></el-input>
            </el-form-item>
          </el-col>
        </el-row> -->
        <!-- 加收费用 -->
        <!-- <el-row>
          <el-col :span="12">
            <el-form-item label="加收费用" prop="otherMoney">
              <el-input placeholder="请输入其他加收费用" v-model="contractFormData.otherMoney"></el-input>
            </el-form-item>
          </el-col>
        </el-row> -->
        <!-- 已收和签约时间 -->
        <el-row>
          <!-- <el-col :span="12">
            <el-form-item label="违约金金额" prop="penalty">
              <el-input placeholder="请输入违约金金额" v-model="contractFormData.penalty"></el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item label="租客来源" prop="source">
              <el-col>
                <el-select class="w100p" v-model="contractFormData.source" placeholder="请选择租客来源">
                  <el-option :key="index" v-for="(item, index) in source" :value="item.value" :label="item.name"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="销售人员" prop="people">
              <el-cascader
                v-model="contractFormData.people"
                placeholder="销售人员"
                :options="options22"
                @change="changeHouseKeeper"
                :props="props"
                :show-all-levels="false"
              ></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="居住人数" prop="livesNumber">
              <el-input placeholder="请输入居住人数" v-model="contractFormData.livesNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="最多可居住人数" prop="allowNumber">
              <el-input placeholder="请输入最多可居住人数" v-model="contractFormData.allowNumber"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12"  v-if="this.contractFormData.fromLeaseType === 'huanfang' || this.contractFormData.fromLeaseType === 'zhuanzu'">
            <el-form-item :label="contractFormData.banchuName" prop="expiredOutTime">
              <el-date-picker
                v-model="contractFormData.expiredOutTime"
                type="date"
                :placeholder="contractFormData.banchuName">
              </el-date-picker>
            </el-form-item>
          </el-col> -->
        </el-row>
        <!-- <el-row>
          <el-col :span="12">
            <el-form-item label="可看房时间" prop="allowWatchTime">
              <el-date-picker
                v-model="contractFormData.allowWatchTime"
                type="date"
                placeholder="可看房时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row> -->
        <!-- 备注 -->
        <el-row>
          <el-col :span="24">
            <el-form-item :span="24" class="w100p" label="备注" prop="memo">
              <el-input :span="24" type="textarea" class="textarea" :autosize="{ minRows: 3, maxRows: 6}" placeholder="请输入备注" v-model="contractFormData.memo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('contractFormData')">重 置</el-button>
        <el-button type="primary" @click="submitForm('contractFormData')">确 定</el-button>
      </div>
    </el-dialog>
    </template>
  </div>
</template>

<script>
export default {
  props: [
    'contractForm',
    'contractFormData', // 表单对象
    'options'
  ],
  data: function () {
    // 手机号验证
    var checkphone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      }
      setTimeout(() => {
        if (!(/^1[3,4,5,7,8,9]\d{9}$/.test(value)) && value.length !== 13) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      }, 1000)
    }
    // 身份证和护照验证
    var checkIdcard = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('证件号码不能为空'))
      }
      setTimeout(() => {
        if (value.length !== 9 && value.length !== 18 && value.length !== 10 && value.length !== 15) {
          callback(new Error('请输入正确的证件号码'))
        } else {
          callback()
        }
      }, 100)
    }
    // 日期验证
    var checkDate = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请选择退租日期'))
      }
      setTimeout(() => {
        if (Date.parse(value) < Date.parse(this.contractFormData.startTime)) {
          callback(new Error('退租日期时间不能小于起租日期'))
        } else {
          callback()
        }
      }, 1000)
    }
    return {
      // 计费规则月份
      firstMonthEnd: '',
      guyufirstMonthEnd: '',
      guyuthreeMonthEnd: '',
      // 上一份合同id
      id: '',
      houtaiName: null,
      houtaiCardId: null,
      // 小管家数据
      houseKeeperData: '',
      houseKeeperId: '',
      options22: JSON.parse(this.$store.state.currentUser.keeperData),
      props: {
        value: 'label',
        children: 'cities'
      },
      // 租客来源
      source: [
        {
          name: '个人中介',
          value: 'MEDI'
        },
        {
          name: '公司中介',
          value: 'CMEDI'
        },
        {
          name: '租客介绍',
          value: 'INTRO'
        },
        {
          name: '58同城',
          value: 'CITY58'
        },
        {
          name: '赶集网',
          value: 'MANET'
        },
        {
          name: '豆瓣',
          value: 'DBNET'
        },
        {
          name: '春眠',
          value: 'SPNET'
        },
        {
          name: '嗨住',
          value: 'HZNET'
        },
        {
          name: '微信公众号',
          value: 'WECHAT'
        },
        {
          name: '19楼',
          value: 'FLOOR19'
        },
        {
          name: '其他',
          value: 'OTHER'
        },
        {
          name: '地推',
          value: 'DTBET'
        },
        {
          name: '甲方结转',
          value: 'PATYJ'
        }
      ],
      title: '新建租客合同',
      // options1: [{
      //   value: 'DAY',
      //   label: '日租'
      // }, {
      //   value: 'MONTH',
      //   label: '月租'
      // }],
      addCycle: [
        {
          value: 'ONEMON',
          label: '每1月增长'
        }, {
          value: 'THREEMON',
          label: '每3月增长'
        },
        {
          value: 'SIXMON',
          label: '每6月增长'
        }, {
          value: 'TWELVEMON',
          label: '每12月增长'
        }, {
          value: 'TWOMON',
          label: '每2月增长'
        }, {
          value: 'FOURMON',
          label: '每4月增长'
        }
      ],
      options2: [// 支付周期判断
        {
          value: 'ONEMON',
          label: '月付'
        }, {
          value: 'THREEMON',
          label: '季付'
        },
        {
          value: 'SIXMON',
          label: '半年一付'
        }, {
          value: 'TWELVEMON',
          label: '一年一付'
        }, {
          value: 'TWOMON',
          label: '二月一付'
        }, {
          value: 'FOURMON',
          label: '四月一付'
        },
        {
          value: 'ONEPAY',
          label: '一次付清'
        },
        {
          value: 'GYIRRE',
          label: '顾寓不规则计费'
        }
      ],
      // // 免租期开始结束时间在租赁期内
      // pickerOptionsStart: {
      //   // 设置禁止选的日期
      //   disabledDate (time) {
      //     return time.getTime() < Date.now() - 8.64e7
      //   }
      // },
      // pickerOptionsEnd: {
      //   // 设置禁止选的日期
      //   disabledDate (time) {
      //     return time.getTime() < Date.now() - 8.64e7
      //   }
      // },
      // houseRentType: [
      //   {
      //     name: '单间',
      //     value: 'JOINT_RENT'
      //   },
      //   {
      //     name: '套房',
      //     value: 'ENTIRE_RENT'
      //   }
      // ],
      sex: '',
      rentType2: '',
      rules: {
        // 姓名
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 32, message: '请输入正确的姓名', trigger: 'blur' }
        ],
        // 手机号验证
        phone: [
          { required: true, validator: checkphone, trigger: 'blur' }
        ],
        // 紧急联系人手机号验证
        urgentPhone: [
          { required: true, validator: checkphone, trigger: 'blur' }
        ],
        // 国籍验证
        nationality: [
          { required: true, message: '请输入国籍', trigger: 'blur' }
        ],
        // 身份证验证
        cardId: [
          { required: true, validator: checkIdcard, trigger: 'blur' }
        ],
        // rentRange: [
        //   { required: false, message: '请选择租赁期限', trigger: 'change' }
        // ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        storageType: [
          { required: true, message: '请选择合同性质', trigger: 'blur' }
        ],
        // houseRentType: [
        //   { required: true, message: '请选择房源类型', trigger: 'change' }
        // ],
        houseSpaceName: [
          { required: true, message: '请输入房源名称', trigger: 'change' }
        ],
        memo: [
          { required: false, message: '请输入备注', trigger: 'blur' }
        ],
        startTime: [
          { type: 'date', required: true, message: '请选择起租日期', trigger: 'change' }
        ],
        // allowWatchTime: [
        //   { type: 'date', required: true, message: '请选择可看房日期', trigger: 'change' }
        // ],
        expiredOutTime: [
          { type: 'date', required: true, message: '请选择搬出时间', trigger: 'change' }
        ],
        endTime: [
          { type: 'date', required: true, validator: checkDate, trigger: 'change' }
        ],
        // rentType1: [
        //   { required: true, message: '请选择租赁类型', trigger: 'change' }
        // ],
        poundage: [
          { required: true, message: '请选择是否有偿', trigger: 'change' }
        ],
        source: [
          { required: true, message: '请选择租客来源', trigger: 'change' }
        ],
        // 居住人数验证
        livesNumber: [
          { required: true, message: '请输入居住人数', trigger: 'blur' }
        ],
        // 最多居住人数验证
        allowNumber: [
          { required: true, message: '请输入最多可居住人数', trigger: 'blur' }
        ],
        rentType2: [
          { required: true, message: '请选择支付周期', trigger: 'change' }
        ],
        certificateType: [
          { required: true, message: '请选择证件类型', trigger: 'change' }
        ],
        addCycle: [
          { required: true, message: '请选择上调周期', trigger: 'change' }
        ],
        people: [
          { type: 'array', required: true, message: '请选择销售人员', trigger: 'change' }
        ],
        rentMoney: [
          { required: true, message: '请输入租金金额', trigger: 'blur' }
        ],
        deposit: [
          { required: true, message: '请输入押金金额', trigger: 'blur' }
        ],
        earnest: [
          { required: true, message: '请输入定金金额', trigger: 'blur' }
        ],
        // penalty: [
        //   { required: true, message: '请输入违约金金额', trigger: 'blur' }
        // ],
        signTime: [
          { type: 'date', required: true, message: '请选择签约日期', trigger: 'change' }
        ],
        otherMoney: [
          { required: false, message: '请输入其他金额', trigger: 'blur' }
        ],
        addType: [
          { required: true, message: '请选择上调类型', trigger: 'change' }
        ],
        addAmount: [
          { required: true, message: '请输入每周期上调金额数', trigger: 'blur' }
        ],
        addPer: [
          { required: true, message: '请输入每周期上调百分比数', trigger: 'blur' }
        ]
      },
      // select搜索数据
      options4: [],  // 搜索出来的列表数据
      list: [],
      loading: false,
      states: [],
      guidePrice: ''
    }
  },
  methods: {
    // 重置数据
    resetForm (formName) {
      if (this.$refs[formName]) {
        this.$refs[formName].resetFields()
      }
    },
    // 获取小管家id
    changeHouseKeeper (val) {
      let keeper = JSON.parse(this.$store.state.currentUser.keeperData)
      for (var i = 0; i <= keeper.length - 1; i++) {
        for (var j = 0; j <= keeper[i].cities.length - 1; j++) {
          if (val[1] === keeper[i].cities[j].label) {
            this.contractFormData.houseKeeperId = keeper[i].cities[j].id
            this.contractFormData.housekeeperName = keeper[i].cities[j].label
            this.contractFormData.housekeeperPhone = keeper[i].cities[j].phone
          }
        }
      }
    },
    // 提交表单
    submitForm (contractFormData) {
      this.$refs[contractFormData].validate((valid) => {
        if (valid) {
          // 判断增长周期
          let addCycle
          if (this.contractFormData.addCycle === 'ONEMON') {
            addCycle = 'ONEMON'
          } else if (this.contractFormData.addCycle === 'THREEMON') {
            addCycle = 'THREEMON'
          } else if (this.contractFormData.addCycle === 'SIXMON') {
            addCycle = 'SIXMON'
          } else if (this.contractFormData.addCycle === 'TWELVEMON') {
            addCycle = 'TWELVEMON'
          } else if (this.contractFormData.addCycle === 'TWOMON') {
            addCycle = 'TWOMON'
          } else if (this.contractFormData.addCycle === 'FOURMON') {
            addCycle = 'FOURMON'
          } else {
            addCycle = 'NORISE'
          }
          // 如果选择不上调清除上调周期
          if (this.contractFormData.addType === 'NOTRISE') {
            addCycle = 'NORISE'
            this.contractFormData.addPer = ''
          }
          // 新建启动流程
          this.$store.commit('getNewWorkflowToken', {'processKey': this.contractFormData.processKey, 'processTenantId': this.contractFormData.unitId, 'variables': {selectOption: 2, assigneeA: this.contractFormData.houseKeeperId, assigneeB: this.contractFormData.assigneeB}})
          // 计费规则
          let moneyRule = [
            {
              addAmount: this.contractFormData.addAmount * 1000,
              addPer: this.contractFormData.addPer * 1000,
              chargType: 'REN',
              businessType: 'RENT',
              financeType: 'INC',
              addType: this.contractFormData.addType,
              endChargTime: Date.parse(this.contractFormData.endTime),
              initialAmount: this.contractFormData.rentMoney * 1000,
              startChargTime: Date.parse(this.contractFormData.startTime),
              addCycle: addCycle,
              rentFreeStart: Date.parse(this.contractFormData.rentFreeStart),          // 免租期时间开始
              rentFreeEnd: Date.parse(this.contractFormData.rentFreeEnd),          // 免租期时间结束
              cycle: this.contractFormData.rentType2 // 支付周期
            }
          ]
          // 存在首月减写入计费规则
          if (this.contractFormData.firstMoney) {
            // 第一个月的计费规则
            moneyRule.push(
              {
                chargType: 'REN',
                businessType: 'RENT',
                financeType: 'DISC',
                addType: 'NOTRISE',
                endChargTime: this.firstMonthEnd,
                initialAmount: this.contractFormData.firstMoney * 1000,
                startChargTime: Date.parse(this.contractFormData.startTime),
                addCycle: 'NORISE',
                cycle: 'ONEMON' // 支付周期
              }
            )
          }
          // 存在网络费且有网络费支付周期写入计费规则
          if (this.contractFormData.wlCycle && this.contractFormData.wlNum) {
            // 第一个月的计费规则
            moneyRule.push(
              {
                chargType: 'NETWORK',
                businessType: 'RENT',
                financeType: 'INC',
                addType: 'NOTRISE',
                endChargTime: Date.parse(this.contractFormData.endTime),
                initialAmount: this.contractFormData.wlNum * 1000,
                startChargTime: Date.parse(this.contractFormData.startTime),
                addCycle: 'NORISE',
                cycle: this.contractFormData.wlCycle // 支付周期
              }
            )
          }
          // 存在物业费且有物业费支付周期写入计费规则
          if (this.contractFormData.wyCycle && this.contractFormData.wyNum) {
            // 第一个月的计费规则
            moneyRule.push(
              {
                chargType: 'PERFEE',
                businessType: 'RENT',
                financeType: 'INC',
                addType: 'NOTRISE',
                endChargTime: Date.parse(this.contractFormData.endTime),
                initialAmount: this.contractFormData.wyNum * 1000,
                startChargTime: Date.parse(this.contractFormData.startTime),
                addCycle: 'NORISE',
                cycle: this.contractFormData.wyCycle // 支付周期
              }
            )
          }
          // 新建出租合同
          this.$http.post(this.$store.state.contractUrl + 'addLeaContract', {
            marketingRules: this.contractFormData.marketingRules,
            storageType: this.contractFormData.storageType, // 纸质合同还是电子合同
            contractType: 'RENT',                         // 合同类型
            userName: this.contractFormData.name,              // 用户姓名
            userPhone: this.contractFormData.phone,             // 手机号
            urgentPhone: this.contractFormData.urgentPhone,             // 紧急联系人手机号
            loginId: this.$store.state.currentUser.uid,       // 登录人id
            certificateNum: this.contractFormData.cardId,              // 身份证
            poundage: this.contractFormData.poundage, // 有偿还是无偿
            certificateType: this.contractFormData.certificateType,
            sex: this.contractFormData.sex,                    // 性别
            // houseRentType: this.contractFormData.houseRentType,        // 房源类型
            houseSpaceName: this.contractFormData.houseSpaceName,  // 房源名称
            houseSpaceId: this.contractFormData.houseSpaceId,  // 房源id
            unitId: this.contractFormData.unitId, // 片区id
            startTime: Date.parse(this.contractFormData.startTime),       // 合同生效（起租）时间
            endTime: Date.parse(this.contractFormData.endTime),            // 合同结束（退租）时间
            rentType: 'MONTH',        // 租赁类型
            rental: this.contractFormData.rentMoney * 1000,           // 月租金
            deposit: this.contractFormData.deposit * 1000,         // 押金
            earnest: this.contractFormData.earnest * 1000,         // 定金
            memo: this.contractFormData.memo,
            // penalty: this.contractFormData.penalty * 1000, // 违约金金额
            signTime: Date.parse(this.contractFormData.signTime),          // 签约时间
            // additionalCosts: this.contractFormData.otherMoney,  // 额外费用
            housekeeperId: this.contractFormData.houseKeeperId, // 小管家id
            housekeeperName: this.contractFormData.housekeeperName,
            housekeeperPhone: this.contractFormData.housekeeperPhone,
            signType: this.contractFormData.signType,
            secStartTime: Date.parse(this.contractFormData.secStartTime),
            id: this.contractFormData.id,
            livesNumber: this.contractFormData.livesNumber, // 居住人数
            allowNumber: this.contractFormData.allowNumber, // 最多可居住人数
            enterId: this.$store.state.currentUser.uid, // 登录人id
            originalContractId: this.contractFormData.originalContractId,
            guidePrice: this.contractFormData.guidePrice,
            reqChargInputLogBeanList: moneyRule,
            // allowWatchTime: Date.parse(this.contractFormData.allowWatchTime),
            expiredOutTime: Date.parse(this.contractFormData.expiredOutTime),
            firstCreditAmount: this.contractFormData.firstMoney * 1000,
            source: this.contractFormData.source // 租客来源
          }, {
            headers: {
              'Content-Type': 'application/json',
              'userid': this.$store.state.currentUser.uid,
              'workflowToken': this.$store.state.workflowToken,
              'processTenantId': this.contractFormData.unitId,
              'processKey': this.contractFormData.processKey
            }
          }).then(function (res) {
            var data = res.data
            if (data.code === 200) {
              this.contractForm.show = false
              this.$refs[contractFormData].resetFields()
              this.$message('租客合同添加成功')
              // 触发事件刷新合同列表
              this.$root.contract.$emit('submitForm', 1)
              // 触发事件刷新任务列表
              this.$root.task.$emit('submitForm', 1)
              if (this.contractFormData.fromAppoint === true) {
                // 如果预约到新建合同成功触发改预约列表
                this.$root.appoint.$emit('changeStatus', '')
              }
              if (this.contractFormData.fromReserve === true) {
                // 如果预定到新建合同成功触发改预定列表
                this.$root.reserveHouse.$emit('changeStatus', '')
              }
              if (this.contractFormData.fromLease === true) {
                this.$root.lease.$emit('changeStatus', '1')
              }
            } else if (data.code === 10029) {
              this.$message('操作失败')
            } else {
              this.$message('信息填写有误,请检查后提交')
            }
          }, function (res) {
            console.log(res.status)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 选择房源类型后清空房源数据
    // changeHouseRentType () {
    //   this.options4 = []
    //   this.contractFormData.houseSpaceName = ''
    // },
    // 拿第一个月的结束时间
    firstMoneyMonth () {
      if (this.contractFormData.firstMoney && this.contractFormData.startTime && this.contractFormData.endTime) {
        this.$http.post(this.$store.state.contractUrl + 'getTime', {
          nowTime: Date.parse(this.contractFormData.startTime),
          index: 1
        }).then(function (response) {
          let data = response.data
          if (data.data !== null) {
            this.firstMonthEnd = data.data
          }
        }, function (response) {
          console.log(response.status)
        })
      }
    },
    // 顾寓时间选择
    guyuMoneyMonth () {
      if (this.contractFormData.startTime && this.contractFormData.endTime && this.contractFormData.rentType2 === 'GYIRRE') {
        // 拿第一个月的时间
        this.$http.post(this.$store.state.contractUrl + 'getTime', {
          nowTime: Date.parse(this.contractFormData.startTime),
          index: 1
        }).then(function (response) {
          let data = response.data
          if (data.data !== null) {
            this.guyufirstMonthEnd = data.data
          }
        }, function (response) {
          console.log(response.status)
        })
        // 拿第三个月的时间
        this.$http.post(this.$store.state.contractUrl + 'getTime', {
          nowTime: Date.parse(this.contractFormData.startTime),
          index: 3
        }).then(function (response) {
          let data = response.data
          if (data.data !== null) {
            this.guyuthreeMonthEnd = data.data
          }
        }, function (response) {
          console.log(response.status)
        })
      }
    },
    // 搜索房源
    remoteMethod (query) {
      if (query) {
        this.loading = true
        // 输入之后调用快速搜索接口
        this.$http.post(this.$store.state.houseUrl + 'list/houseSpace', {
          keywordAddress: query,
          pageNo: 1,
          pageSize: 99,
          // rentType: this.contractFormData.houseRentType,
          loginId: this.$store.state.currentUser.uid,
          houseSpaceStatus: 'RENTABLE'
        }).then(function (response) {
          var data = response.data
          if (data.code === 200) {
            var i, j
            for (i = 0; i <= data.data.list.length - 1; i++) {
              for (j = 0; j <= data.data.list[i].resHouseSpaceBeanList.length - 1; j++) {
                this.states.push(data.data.list[i].resHouseSpaceBeanList[j].keywordAddress)
                this.contractFormData.houseSpaceId = data.data.list[i].resHouseSpaceBeanList[j].houseSpaceId
                this.contractFormData.unitId = data.data.list[i].zoneId
                if (data.data.list[i].resHouseSpaceBeanList[j].guidePrice) {
                  if (data.data.list[i].resHouseSpaceBeanList[j].guidePrice === null) {
                    this.contractFormData.guidePrice = 0
                  } else {
                    this.contractFormData.guidePrice = data.data.list[i].resHouseSpaceBeanList[j].guidePrice / 1000
                  }
                } else {
                  this.contractFormData.guidePrice = 0
                }
              }
            }
            setTimeout(() => {
              this.loading = false
              this.options4 = this.list.filter(item => {
                return item.label
                  .indexOf(query) > -1
              })
            }, 200)
            this.list = this.states.map(item => {
              return { value: item, label: item }
            })
            this.states = []
          } else {
            this.loading = false // 无数据
            this.options4 = []
          }
        }, function (response) {
          console.log(response.status)
        })
      } else {
        this.options4 = []
      }
    },
    // 根据手机号查询用户
    search () {
      if (this.contractFormData.phone && this.contractFormData.phone.length === 11) {
        this.$http.post(this.$store.state.accountUrl + 'user/list', {
          username: this.contractFormData.name,
          phone: this.contractFormData.phone
        }).then(function (response) {
          var res = response.data
          if (res.data !== null) {
            this.contractFormData.assigneeB = res.data.list[0].id
          }
        }, function (response) {
          console.log(response.status)
        })
      }
    },
    // 起租时间
    changeTime2 (val) {
      if (this.contractFormData.rentRange) {
        this.changeLabel(this.contractFormData.rentRange)
      }
    },
    // 退租时间
    changeTime (val) {
      if (this.contractFormData.firstMoney) {
        this.firstMoneyMonth()
      }
      if (this.contractFormData.rentType2 === 'GYIRRE') {
        this.guyuMoneyMonth()
      }
      if (this.contractFormData.rentRange !== '') {
        let v
        if (this.contractFormData.rentRange === '1月') {
          v = 1
        } else if (this.contractFormData.rentRange === '3月') {
          v = 3
        } else if (this.contractFormData.rentRange === '6月') {
          v = 6
        } else if (this.contractFormData.rentRange === '1年') {
          v = 12
        } else {
        }
        this.$http.post(this.$store.state.contractUrl + 'getTime', {
          nowTime: Date.parse(this.contractFormData.startTime),
          index: v
        }).then(function (response) {
          let data = response.data
          if (data.data !== null) {
            if (this.contractFormData.endTime === new Date(data.data).toString()) {
            } else {
              this.contractFormData.rentRange = ''
            }
          }
        }, function (response) {
          console.log(response.status)
        })
      }
    },
    // 选择标签
    changeLabel (val) {
      if (val) {
        let v
        if (val === '1月') {
          v = 1
        } else if (val === '3月') {
          v = 3
        } else if (val === '6月') {
          v = 6
        } else if (val === '1年') {
          v = 12
        } else {
        }
        this.$http.post(this.$store.state.contractUrl + 'getTime', {
          nowTime: Date.parse(this.contractFormData.startTime),
          index: v
        }).then(function (response) {
          let data = response.data
          this.contractFormData.endTime = new Date(data.data).toString()
        }, function (response) {
          console.log(response.status)
        })
      }
    },
    // 手机号失去焦点后去查
    blur () {
      this.houtaiName = ''
      this.houtaiCardId = ''
      // 如果手机号正确
      if (/^1[3,4,5,7,8,9]\d{9}$/.test(this.contractFormData.phone)) {
        this.$http.get(this.$store.state.accountUrl + 'user/info/p/' + this.contractFormData.phone, {
        }).then(function (response) {
          let data = response.data
          if (data.data !== null) {
            this.houtaiName = data.data.username
            this.yonghuId = data.data.id
            this.blurName()
            if (this.yonghuId) {
              this.$http.get(this.$store.state.accountUrl + 'user/info/cert/' + this.yonghuId, {
              }).then(function (response) {
                let data = response.data
                if (data.data !== null) {
                  this.houtaiCardId = data.data.certNumber
                  this.blurCardId()
                }
              }, function (response) {
                console.log(response.status)
              })
            }
          }
        }, function (response) {
          console.log(response.status)
        })
      }
    },
    // 对比姓名
    blurName () {
      if (this.houtaiName && this.contractFormData.name) {
        if (this.houtaiName !== this.contractFormData.name) {
          this.$message({
            showClose: true,
            message: '用户信息与系统信息不匹配，请核对后重新输入',
            type: 'error',
            duration: 2000
          })
          this.contractFormData.name = ''
        }
      }
    },
    // 对比身份证
    blurCardId () {
      if (this.houtaiCardId && this.contractFormData.cardId && this.contractFormData.certificateType === 'ID') {
        if (this.houtaiCardId !== this.contractFormData.cardId) {
          this.$message({
            showClose: true,
            message: '用户信息与系统信息不匹配，请核对后重新输入',
            type: 'error',
            duration: 2000
          })
          this.contractFormData.cardId = ''
        }
      }
    }
  },
  mounted () {
    this.contractFormData.title = '新增租客纸质合同'
    this.contractFormData.processKey = 'PROCESS-KEY-RENT-V11'
  },
  watch: {
    'contractFormData.people': function (val, oldVal) {
      this.changeHouseKeeper(val)
    },
    'contractFormData.phone': 'search',
    'contractFormData.houseSpaceName': function (val, oldVal) {
      this.remoteMethod(val)
    },
    'contractForm.show': function (val, oldVal) {
      this.houtaiName = ''
      this.houtaiCardId = ''
      // 新加的数据都会被重置
      if (oldVal === true) {
        this.resetForm('contractFormData')
      }
      // this.resetForm('contractFormData')
    }
  }
}
</script>
<style scoped>
.w100p{
  width: 100%;
}
.timeWidth{
  width: 130px!important;
}
.contract .el-input, .el-input__inner {
    width: auto;
}
.textarea{
  width: 100%!important;
}
.el-form--inline .el-form-item{
  margin-right: 0;
}
.radio{
  position: relative;
  top: -1px;
}
</style>
