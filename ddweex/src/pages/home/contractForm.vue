<template>
  <div class="wrapper">
    <div v-show="contractFormShow">
      <div class="top">
        <text class="top-fz">房源名称</text>
        <text class="top-text">{{houseDetailData.keywordAddress}}</text>
      </div>
      <!-- 租客信息表单15757125542 -->
      <text class="form-title">租客信息</text>
      <div class="zk-form">
        <div class="zk-form-div">
          <text class="zk-form-div-text">姓名</text>
          <input ref="input" @blur="blur" :disabled="formData.disabled" @input="getName" class="index-form-input" type="text" :placeholder="preview.userName" />
        </div>
        <div class="zk-form-div" @click="chooseSex">
          <text class="zk-form-div-text">性别</text>
          <div class="zk-form-div-fr">
            <text class="zk-form-div-right">{{formData.sex}}</text>
            <image class="img" src="https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/right.png" resize="stretch"></image>
          </div>
        </div>
        <div class="zk-form-div">
          <text class="zk-form-div-text">手机号</text>
          <input ref="input" :disabled="formData.disabled" @input="getPhone" class="index-form-input" type="tel" :placeholder="preview.userPhone" maxlength="11"/>
        </div>
        <div class="zk-form-div" @click="chooseCertType">
          <text class="zk-form-div-text">证件类型</text>
          <div class="zk-form-div-fr">
            <text class="zk-form-div-right">{{formData.certificateType}}</text>
            <image class="img" src="https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/right.png" resize="stretch"></image>
          </div>
        </div>
        <div class="zk-form-div" v-if="this.formData.certificateType === '护照'">
          <text class="zk-form-div-text">国籍</text>
          <input ref="input" @input="getnationality" class="index-form-input" type="text" placeholder="请输入国籍"/>
        </div>
        <div class="zk-form-div">
          <text class="zk-form-div-text">证件号</text>
          <input ref="input" @input="getCertNum" class="index-form-input" type="text" placeholder="请输入证件号" maxlength="18"/>
        </div>
        <div v-if="this.formData.earnest !== '定金抵扣'" class="zk-form-div">
          <text class="zk-form-div-text">定金抵扣</text>
          <input ref="input" :disabled="true" class="index-form-input" type="text" :placeholder="formData.earnest"/>
          <text class="zk-form-div-text">元</text>
        </div>
        <div class="zk-form-div">
          <text class="zk-form-div-text">紧急联系人电话</text>
          <input ref="input" @input="getUrgentPhone" class="index-form-input" type="tel" placeholder="请输入紧急联系人电话" maxlength="11"/>
        </div>
      </div>
      <!-- 租期信息表单 -->
      <text class="form-title">租期信息</text>
      <div class="zk-form">
        <div class="zk-form-div" @click="chooseStartTime">
          <text class="zk-form-div-text">起租时间</text>
          <div class="zk-form-div-fr">
            <text class="zk-form-div-right">{{formData.startTime}}</text>
            <image class="img" src="https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/right.png" resize="stretch"></image>
          </div>
        </div>
        <div class="zk-form-div" @click="chooseTimeRange">
          <text class="zk-form-div-text">租期时长</text>
          <div class="zk-form-div-fr">
            <text class="zk-form-div-right">{{formData.timeRange}}</text>
            <image class="img" src="https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/right.png" resize="stretch"></image>
          </div>
        </div>
        <div class="zk-form-div" @click="chooseEndTime">
          <text class="zk-form-div-text">退租时间</text>
          <div class="zk-form-div-fr">
            <text class="zk-form-div-right">{{formData.endTime}}</text>
            <image class="img" src="https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/right.png" resize="stretch"></image>
          </div>
        </div>
        <div class="zk-form-div" @click="chooseCycle">
          <text class="zk-form-div-text">支付周期</text>
          <div class="zk-form-div-fr">
            <text class="zk-form-div-right">{{formData.cycle}}</text>
            <image class="img" src="https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/right.png" resize="stretch"></image>
          </div>
        </div>
        <div class="zk-form-div" @click="getRule">
          <text class="zk-form-div-text">营销规则</text>
          <div class="zk-form-div-fr">
            <text class="zk-form-div-right">{{formData.rule}}</text>
            <image class="img" src="https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/right.png" resize="stretch"></image>
          </div>
        </div>
      </div>
      <div class="radio-div" @click="editForm">
        <image class="radio-img" :src="radioiImg" resize="stretch"></image>
        <text class="form-title2">编辑费用(选择此项需经过审批租客方能签订合同)</text>
      </div>
      <div class="zk-form">
        <div class="zk-form-div">
          <text class="zk-form-div-text">房屋租金</text>
          <input ref="input" :disabled="disabled" @input="getRent" class="index-form-input" type="number" placeholder="请输入房屋租金" :value="formData.rental"/>
          <text class="zk-form-div-text">元/月</text>
        </div>
        <div class="zk-form-div">
          <text class="zk-form-div-text">房屋押金</text>
          <input ref="input" :disabled="disabled" @input="getDeposit" class="index-form-input" type="number" placeholder="请输入房屋押金" :value="formData.deposit"/>
          <text class="zk-form-div-text">元</text>
        </div>
        <div class="zk-form-div">
          <text class="zk-form-div-text">首月减免金额</text>
          <input ref="input" :disabled="disabled" @input="getFirstMoney" class="index-form-input" type="number" placeholder="请输入首月减免金额(选填)" :value="formData.firstCreditAmount"/>
          <text class="zk-form-div-text">元</text>
        </div>
      </div>
      <!-- 其他费用表单 -->
      <text v-show="feiyongShow" class="form-title">其他费用(选填)</text>
      <div v-show="feiyongShow" class="zk-form">
        <div class="zk-form-div">
          <text class="zk-form-div-text">物业费</text>
          <text class="fyCycle" @click="getWuyeCycle">{{formData.wuyeCycle}}</text>
          <image class="img" @click="getWuyeCycle" src="https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/right.png" resize="stretch"></image>
          <input ref="input" @input="getWuyeMoney" class="fyInput" type="number" placeholder="金额"/>
          <text class="zk-form-div-text">元/月</text>
        </div>
        <div class="zk-form-div">
          <text class="zk-form-div-text">网络费</text>
          <text class="fyCycle" @click="getWangluoCycle">{{formData.wangluoCycle}}</text>
          <image class="img" @click="getWangluoCycle" src="https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/right.png" resize="stretch"></image>
          <input ref="input" @input="getWangluoMoney" class="fyInput" type="number" placeholder="金额"/>
          <text class="zk-form-div-text">元/月</text>
        </div>
      </div>
      <!-- 其他信息表单 -->
      <text class="form-title">其他信息</text>
      <div class="zk-form">
        <div class="zk-form-div" @click="chooseSource">
          <text class="zk-form-div-text">租客来源</text>
          <div class="zk-form-div-fr">
            <text class="zk-form-div-right">{{formData.source}}</text>
            <image class="img" src="https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/right.png" resize="stretch"></image>
          </div>
        </div>
        <!-- 最多可居住人数 -->
        <div class="zk-form-div" @click="chooseAllowNumber">
          <text class="zk-form-div-text">最多可居住人数</text>
          <div class="zk-form-div-fr">
            <text class="zk-form-div-right">{{formData.allowNumber}}</text>
            <image class="img" src="https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/right.png" resize="stretch"></image>
          </div>
        </div>
        <!-- 最多可居住人数 -->
        <div class="zk-form-div" @click="chooseLivesNumber">
          <text class="zk-form-div-text">实际居住人数</text>
          <div class="zk-form-div-fr">
            <text class="zk-form-div-right">{{formData.livesNumber}}</text>
            <image class="img" src="https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/right.png" resize="stretch"></image>
          </div>
        </div>
        <!-- <div class="zk-form-div" @click="goCheckList">
          <text class="zk-form-div-text">配置添加</text>
          <div class="zk-form-div-fr">
            <text class="zk-form-div-right">{{formData.listValue}}</text>
            <image class="img" src="https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/right.png" resize="stretch"></image>
          </div>
        </div> -->
      </div>
      <!-- 备注 -->
      <text class="form-title">备注信息</text>
      <div class="textarea-bg">
        <textarea class="textarea" @input="getMemo" placeholder="请输入备注" :value="formData.memo"></textarea>
      </div>
      <!-- 底部按钮 -->
      <div class="contract-bottom">
        <text class="contract-bottom-fl" @click="goPreview">预览合同</text>
        <text class="contract-bottom-fr" @click="goNext">提交</text>
      </div>
    </div>
    <!-- 配置清单组件 -->
    <checkList @getCheckListData="getCheckListData" :data="formData.itemsBeanList" :show="checkListShow"></checkList>
    <!-- 优惠规则组件 -->
    <ruleDialog @sendRule="sendRule" :data="ruleDialogData" :show="ruleDialogShow"></ruleDialog>
    <!-- 定金记录组件 -->
    <dingjinHistory @sendDingjin="sendDingjin" :data="dingjinHistoryData" :show="dingjinHistoryShow"></dingjinHistory>
    <!-- 预览合同组件 -->
    <preview @goContract="goContract" :data="previewData" :show="previewShow"></preview>
  </div>
</template>
<script>
import preview from '../home/preview'  // 预览合同组件
import ruleDialog from '../../components/ruleDialog'  // 营销规则弹窗组件
import dingjinHistory from '../../components/dingjinHistory'  // 定金记录弹窗组件
import dingtalk from 'dingtalk-javascript-sdk';
import checkList from '../home/checkList' // 配置清单弹窗组件
export default {
  name: 'contractForm',
  data: function(){
    return {
      // 流程数据
      contractFormData: {
        processKey: 'PROCESS-KEY-RENT-V15'
      },
      // 控制是否要审核
      shenghe: false,
      // 控制录入额外费用框是否展示
      feiyongShow: false,
      ruleData: {},
      // 优惠规则组件
      ruleDialogShow: {
        show: false
      },
      ruleDialogData: '',
      // 优惠规则组件
      dingjinHistoryShow: {
        show: false
      },
      dingjinHistoryData: '',
      // 合同预览组件
      previewShow: {
        show: false
      },
      previewData: '',
      contractFormShow: true,
      disabled: true,
      houseDetailData: {},
      // 配置清单数据
      checkListShow: {
        show: false
      },
      rule: {},
      preview: {
        userName: '请输入姓名',
        userPhone: '请输入手机号'
      },
      formData: {
        disabled: false,
        earnest: '定金抵扣',
        sex: '请选择性别',
        certificateType: '请选择证件类型',
        startTime: '请选择起租时间',
        endTime: '请选择退租时间',
        timeRange: '请选择租期时长(选填)',
        cycle: '请选择支付周期',
        rule: '请选择营销规则',
        source: '请选择租客来源',
        allowNumber: '请选择最多可居住人数',
        livesNumber: '请选择实际居住人数',
        firstEndMonth: '',
        listValue: '请选择配置',
        wuyeCycle: '物业费支付周期(选填)',
        wangluoCycle: '网络费支付周期(选填)',
        rental: '',
        deposit: '',
        firstCreditAmount: '',
        itemsBeanList: [
          {
            itemsName:'窗',
            itemsNumber: '1'
          },
          {
            itemsName:'窗',
            itemsNumber: '1'
          },
          {
            itemsName:'床',
            itemsNumber: '1'
          }
        ]
      },
      submitForm: {},
      radioiImg: 'https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/radio.png'
    }
  },
  computed: {
  },
  mounted: function(){
    this.houseDetailData = JSON.parse(this.$store.state.currentUser.houseData)
    this.submitForm = {
      houseSpaceId: this.houseDetailData.houseSpaceId,
      houseSpaceName: this.houseDetailData.keywordAddress,
      contractType: 'RENT',
      loginId: this.$store.state.currentUser.uid,
      unitId: this.houseDetailData.zoneId,
      housekeeperId: this.$store.state.currentUser.uid,
      housekeeperName: this.$store.state.currentUser.userName,
      housekeeperPhone: this.$store.state.currentUser.userPhone,
      signType: 'NEW',
      enterId: this.$store.state.currentUser.uid,
      storageType: 'ELE'
    }
    // 如果存在定金
    if (this.houseDetailData.frontMoneyAmount) {
      // 提交表单的数据
      this.submitForm.userName = this.houseDetailData.tenantName
      this.submitForm.userPhone = this.houseDetailData.tenantPhone
      this.submitForm.earnest = this.houseDetailData.frontMoneyAmount
      // 展示表单的数据
      this.formData.userName = this.houseDetailData.tenantName
      this.formData.userPhone = this.houseDetailData.tenantPhone
      this.formData.earnest = this.houseDetailData.frontMoneyAmount / 1000
      this.formData.disabled = true
      // 预览组件的数据
      this.preview.userName = this.houseDetailData.tenantName
      this.preview.userPhone = this.houseDetailData.tenantPhone
      // 拿预定的id
      this.getDingjin(this.houseDetailData.tenantPhone, false)
    }
    this.formData.houseSpaceName = this.houseDetailData.keywordAddress
    dingtalk.ready(function(){
      const dd = dingtalk.apis;
      // 设置导航
      dd.biz.navigation.setTitle({
        title: '新建合同'
      });
    });
  },
  methods: {
    blur: function (e) {
      this.$refs['input'].blur();
    },
    // 获取备注
    getMemo: function (e) {
      this.submitForm.memo = e.value
      this.formData.memo = e.value
    },
    // 获取国籍
    getnationality: function (e) {
      this.submitForm.nationality = e.value
      this.formData.nationality = e.value
    },
    // 获取姓名
    getName: function (e) {
      this.submitForm.userName = e.value
      this.formData.userName = e.value
    },
    // 获取证件号码
    getCertNum: function (e) {
      this.submitForm.certificateNum = e.value
      this.formData.certificateNum = e.value
    },
    // 获取手机号
    getPhone: function (e) {
      this.submitForm.userPhone = e.value
      this.formData.userPhone = e.value
      this.search()
      // 查询是否存在定金
      if (e.value.length === 11) {
        this.getDingjin(e.value, true)
      }
    },
    getUrgentPhone: function (e) {
      this.submitForm.urgentPhone = e.value
      this.formData.urgentPhone = e.value
    },
    // 获取租金
    getRent: function (e) {
      this.submitForm.rental = e.value * 1000
      this.formData.rental = e.value
    },
    // 获取押金
    getDeposit: function (e) {
      this.submitForm.deposit = e.value * 1000
      this.formData.deposit = e.value
    },
    // 获取首月减免
    getFirstMoney: function (e) {
      this.submitForm.firstCreditAmount = e.value * 1000
      this.formData.firstCreditAmount = e.value
      this.firstMoneyMonth()
    },
    // 获取物业费金额
    getWuyeMoney: function (e) {
      this.ruleData.wuyemoney = e.value * 1000
      this.formData.wuyemoney = e.value
    },
    // 获取网络费金额
    getWangluoMoney: function (e) {
      this.ruleData.wangluomoney = e.value * 1000
      this.formData.wangluomoney = e.value
    },
    // 图标的选择
    editForm: function (e) {
      if (this.radioiImg === 'https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/radio.png') {
        this.radioiImg = 'https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/radioOn.png'
        this.disabled = false
        this.feiyongShow = true
        if (this.ruleData.rental) {
          this.resetRule()
        }
      } else {
        this.radioiImg = 'https://sayyoo-bucket-image.oss-cn-hangzhou.aliyuncs.com/radio.png'
        this.disabled = true
        this.feiyongShow = false
      }
    },
    // 时间格式转换yyyy-mm-dd
    gshtime: function (time) {   
      var year = time.getFullYear();       //年
      var month = time.getMonth() + 1;  //月
      var day = time.getDate();         //日
      var hh = time.getHours();       //时
      var mm = time.getMinutes();    //分
      var ss = time.getSeconds() //秒
      var str= year + ".";  
      if(month < 10)  
          str+= "0";
      str+= month + ".";  
      if(day < 10)  
          str+= "0";  
      str+= day + "";  
      return(str);   
    },
    // 根据手机号查询定金
    getDingjin: function (phone, isTure) {
      this.$http.get(this.$store.state.rentUrl + 'reservation/getResByPhone/' + phone
      ).then(function (response) {
        let data = response.data
        if (data.data.length !== 0) {
          if (isTure) {
            // 此房源不存在定金,弹出定金表单选择
            for (var i = 0; i <= data.data.length - 1; i ++) {
              data.data[i].registerTime = this.gshtime(new Date(data.data[i].registerTime))
            }
            this.dingjinHistoryData = data.data
            this.dingjinHistoryShow.show = true
          } else {
            // 此房源存在定金,根据houseId拿到预定id
            for (var i = 0; i <= data.data.length - 1; i ++) {
              if (data.data[i].houseSpaceId = this.houseDetailData.houseSpaceId) {
                this.submitForm.reservationId = data.data[i].reservationId
              }
            }
          }
        } else {
          this.dingjinHistoryShow.show = false
          this.formData.earnest = '定金抵扣'
          this.submitForm.earnest = ''
          this.submitForm.reservationId = ''
        }
      }, function (response) {
        console.log(response.status)
      })
    },
    // 选择性别
    chooseSex: function (e) {
      let that = this
      dingtalk.ready(function(){
        const dd = dingtalk.apis;
        dd.biz.util.chosen({
          source:[{
              key: '男', //显示文本
              value: 'M' //值，
          },{
              key: '女', //显示文本
              value: 'F' //值，
          }],
         selectedKey:'' , // 默认选中的key
         onSuccess : function(result) {
            that.formData.sex = result.key
            that.submitForm.sex = result.value
          },
         onFail : function(err) {}
        })
      });
    },
    // 选择证件类型
    chooseCertType: function (e) {
      let that = this
      dingtalk.ready(function(){
        const dd = dingtalk.apis;
        dd.biz.util.chosen({
          source:[{
              key: '身份证', //显示文本
              value: 'ID' //值，
          },{
              key: '护照', //显示文本
              value: 'P' //值，
          }],
         selectedKey:'' , // 默认选中的key
         onSuccess : function(result) {
            that.formData.certificateType = result.key
            that.submitForm.certificateType = result.value
          },
         onFail : function(err) {}
        })
      });
    },
    // 选择开始时间
    chooseStartTime: function (e) {
      let that = this
      dingtalk.ready(function(){
        const dd = dingtalk.apis;
        // 获取时间
        dd.biz.util.datepicker({
          format: 'yyyy-MM-dd',
          value: new Date(), //默认显示日期
          onSuccess : function(result) {
            that.formData.startTime = result.value
            that.submitForm.startTime = Date.parse(result.value)
            if (that.ruleData.rental) {
              that.resetRule()
            }
          },
          onFail : function(err) {}
        })
      });
    },
    // 选择结束时间
    chooseEndTime: function (e) {
      let that = this
      dingtalk.ready(function(){
        const dd = dingtalk.apis;
        // 获取时间
        dd.biz.util.datepicker({
          format: 'yyyy-MM-dd',
          value: new Date(), //默认显示日期
          onSuccess : function(result) {
            that.formData.timeRange = '请选择租期时长(选填)'
            that.formData.endTime = result.value
            that.submitForm.endTime = Date.parse(result.value)
            if (that.ruleData.rental) {
              that.resetRule()
            }
          },
          onFail : function(err) {}
        })
      });
    },
    // 获取结束时间
    getMyDate: function (str){  
      var oDate = new Date(str),  
      oYear = oDate.getFullYear(),  
      oMonth = oDate.getMonth()+1,  
      oDay = oDate.getDate(),  
      oHour = oDate.getHours(),  
      oMin = oDate.getMinutes(),  
      oSen = oDate.getSeconds(),  
      oTime = oYear +'-'+ this.getzf(oMonth) +'-'+ this.getzf(oDay)//最后拼接时间  
      return oTime;  
    },
    //补0操作  
    getzf: function (num){  
      if(parseInt(num) < 10){  
        num = '0'+num;  
      }  
      return num;  
    },
    // 选择租期时长
    chooseTimeRange: function (e) {
      let that = this
      dingtalk.ready(function(){
        const dd = dingtalk.apis;
        dd.biz.util.chosen({
          source:[{
              key: '1个月', //显示文本
              value: 1 //值，
          },{
              key: '3个月', //显示文本
              value: 3 //值，
          },{
              key: '6个月', //显示文本
              value: 6 //值，
          },{
              key: '1年', //显示文本
              value: 12 //值，
          }],
         selectedKey:'' , // 默认选中的key
         onSuccess : function(result) {
            that.formData.timeRange = result.key
            if (that.formData.startTime !== '请选择起租时间') {
              that.$http.post(that.$store.state.contractUrl + 'getTime', {
                nowTime: that.submitForm.startTime,
                index: result.value
              }).then(function (response) {
                let data = response.data
                if (data.data !== null) {
                  that.formData.endTime = that.getMyDate(data.data)
                  that.submitForm.endTime = data.data
                  if (that.ruleData.rental) {
                    that.resetRule()
                  }
                }
              }, function (response) {
                console.log(response.status)
              })
            }
          },
         onFail : function(err) {}
        })
      });
    },
    // 跳转到预览合同
    goPreview: function (e) {
      this.contractFormShow = false
      this.previewShow.show = true
      this.previewData = this.formData
    },
    resetRule: function (e) {
      // 拿到优惠规则id
      this.submitForm.saleContentId = []
      // 保存优惠规则数据
      this.ruleData = {}
      // 赋值规则几
      this.formData.rule = '请请选择营销规则'
      this.submitForm.saleContentId = []
      // 租金
      this.formData.rental = ''
      this.submitForm.rental = ''
      // 押金
      this.formData.deposit = ''
      this.submitForm.deposit = ''
      // 首月减免
      this.formData.firstCreditAmount = ''
      this.submitForm.firstCreditAmount = ''
    },
    // 获取优惠规则并赋值
    sendRule: function (data) {
      // 拿到优惠规则id
      this.submitForm.saleContentId = []
      for (var i = 0;i <= data.item.saleContentResponseBodyList.length - 1;i ++) {
        this.submitForm.saleContentId.push(data.item.saleContentResponseBodyList[i].saleContentId)
      }
      // 保存优惠规则数据
      this.ruleData.rental = data.item.actualRent
      this.ruleData.deposit = data.item.actualDeposit
      this.ruleData.firstCreditAmount = data.item.firstMonthPreferentialAmount
      this.ruleData.paymentCycle = data.item.paymentCycle
      this.ruleData.rentalEndTime = data.item.rentalEndTime
      this.ruleData.rentalStartTime = data.item.rentalStartTime
      // 赋值规则几
      this.formData.rule = '规则' + (data.index + 1)
      // 租金
      this.formData.rental = data.item.actualRent / 1000
      this.submitForm.rental = data.item.actualRent
      // 押金
      this.formData.deposit = data.item.actualDeposit / 1000
      this.submitForm.deposit = data.item.actualDeposit
      // 首月减免
      this.formData.firstCreditAmount = data.item.firstMonthPreferentialAmount / 1000
      this.submitForm.firstCreditAmount = data.item.firstMonthPreferentialAmount
      this.firstMoneyMonth()
      this.ruleDialogShow.show = false
    },
    // 获取历史记录定金
    sendDingjin: function (data) {
      this.dingjinHistoryShow.show = false
      this.formData.earnest = data.item.earnest / 1000
      this.submitForm.earnest = data.item.earnest
      this.submitForm.reservationId = data.item.reservationId
    },
    // 从预览合同到合同表单页面
    goContract: function (e) {
      this.previewShow.show = false
      this.contractFormShow = true
    },
    // 选择支付周期
    chooseCycle: function (e) {
      let that = this
      dingtalk.ready(function(){
        const dd = dingtalk.apis;
        dd.biz.util.chosen({
          source:[{
              key: '月付', //显示文本
              value: 'ONEMON' //值，
          },{
              key: '季付', //显示文本
              value: 'THREEMON' //值，
          },{
              key: '半年付', //显示文本
              value: 'SIXMON' //值，
          },{
              key: '年付', //显示文本
              value: 'TWELVEMON' //值，
          },{
              key: '二月一付', //显示文本
              value: 'TWOMON' //值，
          },{
              key: '四月一付', //显示文本
              value: 'FOURMON' //值，
          },{
              key: '一次付清', //显示文本
              value: 'ONEPAY' //值，
          }],
         selectedKey:'' , // 默认选中的key
         onSuccess : function(result) {
            that.formData.cycle = result.key
            that.submitForm.cycle = result.value
            if (result.key === '月付') {
              that.rule.cycle = 'MONTH'
            } else if (result.key === '季付') {
              that.rule.cycle = 'SEASON'
            } else if (result.key === '半年付') {
              that.rule.cycle = 'HALF_YEAR'
            } else if (result.key === '年付') {
              that.rule.cycle = 'YEAR'
            } else if (result.key === '二月一付') {
              that.rule.cycle = 'TWO_MONTH'
            } else if (result.key === '四月一付') {
              that.rule.cycle = 'FOUR_MONTH'
            } else if (result.key === '一次付清') {
              that.rule.cycle = 'LUMP_SUM'
            }
            if (that.ruleData.rental) {
              that.resetRule()
            }
          },
         onFail : function(err) {}
        })
      });
    },
    // 选择物业费支付周期
    getWuyeCycle: function (e) {
      let that = this
      dingtalk.ready(function(){
        const dd = dingtalk.apis;
        dd.biz.util.chosen({
          source:[{
              key: '月付', //显示文本
              value: 'ONEMON' //值，
          },{
              key: '季付', //显示文本
              value: 'THREEMON' //值，
          },{
              key: '半年付', //显示文本
              value: 'SIXMON' //值，
          },{
              key: '年付', //显示文本
              value: 'TWELVEMON' //值，
          },{
              key: '二月一付', //显示文本
              value: 'TWOMON' //值，
          },{
              key: '四月一付', //显示文本
              value: 'FOURMON' //值，
          },{
              key: '一次付清', //显示文本
              value: 'ONEPAY' //值，
          }],
         selectedKey:'' , // 默认选中的key
         onSuccess : function(result) {
            that.formData.wuyeCycle = result.key
            that.ruleData.wuyeCycle = result.value
          },
         onFail : function(err) {}
        })
      });
    },
    // 选择网络费支付周期
    getWangluoCycle: function (e) {
      let that = this
      dingtalk.ready(function(){
        const dd = dingtalk.apis;
        dd.biz.util.chosen({
          source:[{
              key: '月付', //显示文本
              value: 'ONEMON' //值，
          },{
              key: '季付', //显示文本
              value: 'THREEMON' //值，
          },{
              key: '半年付', //显示文本
              value: 'SIXMON' //值，
          },{
              key: '年付', //显示文本
              value: 'TWELVEMON' //值，
          },{
              key: '二月一付', //显示文本
              value: 'TWOMON' //值，
          },{
              key: '四月一付', //显示文本
              value: 'FOURMON' //值，
          },{
              key: '一次付清', //显示文本
              value: 'ONEPAY' //值，
          }],
         selectedKey:'' , // 默认选中的key
         onSuccess : function(result) {
            that.formData.wangluoCycle = result.key
            that.ruleData.wangluoCycle = result.value
          },
         onFail : function(err) {}
        })
      });
    },
    // 选择支付周期
    chooseSource: function (e) {
      let that = this
      dingtalk.ready(function(){
        const dd = dingtalk.apis;
        dd.biz.util.chosen({
          source:[{
              key: '个人中介', //显示文本
              value: 'MEDI' //值，
          },{
              key: '公司中介', //显示文本
              value: 'CMEDI' //值，
          },{
              key: '租客介绍', //显示文本
              value: 'INTRO' //值，
          },{
              key: '58同城', //显示文本
              value: 'CITY58' //值，
          },{
              key: '赶集网', //显示文本
              value: 'MANET' //值，
          },{
              key: '豆瓣', //显示文本
              value: 'DBNET' //值，
          },{
              key: '春眠', //显示文本
              value: 'SPNET' //值，
          },{
              key: '嗨住', //显示文本
              value: 'HZNET' //值，
          },{
              key: '微信公众号', //显示文本
              value: 'WECHAT' //值，
          },{
              key: '19楼', //显示文本
              value: 'FLOOR19' //值，
          },{
              key: '其他', //显示文本
              value: 'OTHER' //值，
          },{
              key: '地推', //显示文本
              value: 'DTBET' //值，
          },{
              key: '甲方结转', //显示文本
              value: 'PATYJ' //值，
          }],
         selectedKey:'' , // 默认选中的key
         onSuccess : function(result) {
            that.formData.source = result.key
            that.submitForm.source = result.value
          },
         onFail : function(err) {}
        })
      });
    },
    // 选择最多可居住人数
    chooseAllowNumber: function (e) {
      let that = this
      dingtalk.ready(function(){
        const dd = dingtalk.apis;
        dd.biz.util.chosen({
          source:[{
              key: '1', //显示文本
              value: '1' //值，
          },{
              key: '2', //显示文本
              value: '2' //值，
          },{
              key: '3', //显示文本
              value: '3' //值，
          },{
              key: '4', //显示文本
              value: '4' //值，
          },{
              key: '5', //显示文本
              value: '5' //值，
          },{
              key: '6', //显示文本
              value: '6' //值，
          },{
              key: '7', //显示文本
              value: '7' //值，
          },{
              key: '8', //显示文本
              value: '8' //值，
          },{
              key: '9', //显示文本
              value: '9' //值，
          },{
              key: '10', //显示文本
              value: '10' //值，
          }],
         selectedKey:'' , // 默认选中的key
         onSuccess : function(result) {
            that.formData.allowNumber = result.key
            that.submitForm.allowNumber = result.value
          },
         onFail : function(err) {}
        })
      });
    },
    // 选择实际可居住人数
    chooseLivesNumber: function (e) {
      let that = this
      dingtalk.ready(function(){
        const dd = dingtalk.apis;
        dd.biz.util.chosen({
          source:[{
              key: '1', //显示文本
              value: '1' //值，
          },{
              key: '2', //显示文本
              value: '2' //值，
          },{
              key: '3', //显示文本
              value: '3' //值，
          },{
              key: '4', //显示文本
              value: '4' //值，
          },{
              key: '5', //显示文本
              value: '5' //值，
          },{
              key: '6', //显示文本
              value: '6' //值，
          },{
              key: '7', //显示文本
              value: '7' //值，
          },{
              key: '8', //显示文本
              value: '8' //值，
          },{
              key: '9', //显示文本
              value: '9' //值，
          },{
              key: '10', //显示文本
              value: '10' //值，
          }],
         selectedKey:'' , // 默认选中的key
         onSuccess : function(result) {
            that.formData.livesNumber = result.key
            that.submitForm.livesNumber = result.value
          },
         onFail : function(err) {}
        })
      });
    },
    // 获取规则
    getRule: function (e) {
      if (this.formData.endTime !== '请选择退租时间' && this.formData.startTime !== '请选择起租时间' && this.formData.cycle !== '请选择支付周期') {
        this.$http.post(this.$store.state.ruleUrl + 'activity/list/saleContent', {
          houseSpaceId: this.houseDetailData.houseSpaceId,
          paymentCycle: this.rule.cycle,
          rentalEndTime: this.submitForm.endTime,
          rentalStartTime: this.submitForm.startTime
        }).then(function (response) {
          var data = response.data
          if (data.data !== null) {
            this.ruleDialogData = data.data
            this.ruleDialogShow.show = true
          } else {
            dingtalk.ready(function(){
              const dd = dingtalk.apis;
              dd.device.notification.alert({
                message: '获取营销规则失败',
                title: "提示",//可传空
                buttonName: "确定"
              });
            });
          }
        }, function (response) {
          console.log(response.status)
        })
      } else {
        dingtalk.ready(function(){
          const dd = dingtalk.apis;
          dd.device.notification.alert({
            message: '请选择租期时长和支付周期',
            title: "提示",//可传空
            buttonName: "确定"
          });
        });
      }
    },
    // 选择家具配置
    goCheckList: function (e) {
      this.checkListShow.show = true
      this.contractFormShow = false
    },
    // 选取家具配置后返回
    getCheckListData: function (e) {
      this.contractFormShow = true
      this.checkListShow.show = false
      this.formData.listValue = '已配置'
      this.submitForm.itemsBeanList = e
    },
    // 拿第一个月的结束时间
    firstMoneyMonth () {
      if (this.submitForm.firstCreditAmount && this.submitForm.startTime && this.submitForm.endTime) {
        this.$http.post(this.$store.state.contractUrl + 'getTime', {
          nowTime: this.submitForm.startTime,
          index: 1
        }).then(function (response) {
          let data = response.data
          if (data.data !== null) {
            this.firstEndMonth = data.data
          }
        }, function (response) {
          console.log(response.status)
        })
      }
    },
    // 根据姓名手机号查询用户,并获取租客id
    search () {
      if (this.formData.userPhone && this.formData.userPhone.length === 11) {
        this.$http.post(this.$store.state.accountUrl + 'user/list', {
          username: this.formData.userName,
          phone: this.formData.userPhone
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
    // 下一步
    goNext:function (e) {
      // 判断是否要审核
      if (this.submitForm.rental !== this.ruleData.rental) {
        this.shenghe = true
        this.submitForm.marketingRules = 'NEEDAUDIT'
      } else if (this.submitForm.deposit !== this.ruleData.deposit) {
        this.shenghe = true
        this.submitForm.marketingRules = 'NEEDAUDIT'
      } else if (this.rule.cycle !== this.ruleData.paymentCycle) {
        this.shenghe = true
        this.submitForm.marketingRules = 'NEEDAUDIT'
      } else if (this.submitForm.firstCreditAmount !== this.ruleData.firstCreditAmount) {
        this.shenghe = true
        this.submitForm.marketingRules = 'NEEDAUDIT'
      } else if (this.ruleData.wuyeCycle && this.ruleData.wuyemoney) {
        this.shenghe = true
        this.submitForm.marketingRules = 'NEEDAUDIT'
      } else if (this.ruleData.wangluoCycle && this.ruleData.wangluomoney) {
        this.shenghe = true
        this.submitForm.marketingRules = 'NEEDAUDIT'
      } else {
        this.shenghe = false
        this.submitForm.marketingRules = 'NOAUDIT'
      }
      let moneyRule = [
        {
          chargType: 'REN',
          businessType: 'RENT',
          financeType: 'INC',
          startChargTime: this.submitForm.startTime,
          endChargTime: this.submitForm.endTime,
          initialAmount: this.submitForm.rental,
          cycle: this.submitForm.cycle, // 支付周期
          addCycle: 'NORISE',
          addType: 'NOTRISE'
        }
      ]
      // 存在首月减免
      if (this.submitForm.firstCreditAmount && this.submitForm.marketingRules === 'NEEDAUDIT') {
        this.firstMoneyMonth()
        moneyRule.push(
          // 第一个月的计费规则
          {
            chargType: 'REN',
            businessType: 'RENT',
            financeType: 'DISC',
            startChargTime: this.submitForm.startTime,
            endChargTime: this.firstEndMonth,
            initialAmount: this.submitForm.firstCreditAmount,
            cycle: 'ONEMON', // 支付周期
            addCycle: 'NORISE',
            addType: 'NOTRISE'
          }
        )
      }
      // 存在物业费添加计费规则
      if (this.ruleData.wuyemoney && this.ruleData.wuyeCycle) {
        moneyRule.push(
          // 物业费
          {
            chargType: 'PERFEE',
            businessType: 'RENT',
            financeType: 'INC',
            startChargTime: this.submitForm.startTime,
            endChargTime: this.submitForm.endTime,
            initialAmount: this.ruleData.wuyemoney,
            cycle: this.ruleData.wuyeCycle, // 支付周期
            addCycle: 'NORISE',
            addType: 'NOTRISE'
          }
        )
      }
      // 存在网络费添加计费规则
      if (this.ruleData.wangluomoney && this.ruleData.wangluoCycle) {
        moneyRule.push(
          // 网络费
          {
            chargType: 'NETWORK',
            businessType: 'RENT',
            financeType: 'INC',
            startChargTime: this.submitForm.startTime,
            endChargTime: this.submitForm.endTime,
            initialAmount: this.ruleData.wangluomoney,
            cycle: this.ruleData.wangluoCycle, // 支付周期
            addCycle: 'NORISE',
            addType: 'NOTRISE'
          }
        )
      }
      // 计费规则编写
      this.submitForm.reqChargInputLogBeanList = moneyRule
      // 编辑了租金押金首月减添加其他费用任何一项要审核
      if (this.shenghe === true) {
        // 新建启动流程
        this.$store.commit('getNewWorkflowToken', {'processKey': this.contractFormData.processKey, 'processTenantId': this.houseDetailData.zoneId, 'variables': {selectOption: 2, assigneeA: this.$store.state.currentUser.uid, assigneeB: this.contractFormData.assigneeB}})
      } else {
        // 新建启动流程
        this.$store.commit('getNewWorkflowToken', {'processKey': this.contractFormData.processKey, 'processTenantId': this.houseDetailData.zoneId, 'variables': {selectOption: 1, assigneeA: this.$store.state.currentUser.uid, assigneeB: this.contractFormData.assigneeB}})
      }
      if (!this.submitForm.userName) {
        dingtalk.ready(function(){
          const dd = dingtalk.apis;
          dd.device.notification.alert({
            message: '请输入姓名',
            title: "提示",//可传空
            buttonName: "确定"
          });
        });
      } else if (!this.submitForm.sex) {
        dingtalk.ready(function(){
          const dd = dingtalk.apis;
          dd.device.notification.alert({
            message: '请选择性别',
            title: "提示",//可传空
            buttonName: "确定"
          });
        });
      } else if (!this.submitForm.userPhone) {
        dingtalk.ready(function(){
          const dd = dingtalk.apis;
          dd.device.notification.alert({
            message: '请输入手机号',
            title: "提示",//可传空
            buttonName: "确定"
          });
        });
      } else if (!this.submitForm.certificateType) {
        dingtalk.ready(function(){
          const dd = dingtalk.apis;
          dd.device.notification.alert({
            message: '请选择证件类型',
            title: "提示",//可传空
            buttonName: "确定"
          });
        });
      } else if (!this.submitForm.certificateNum) {
        dingtalk.ready(function(){
          const dd = dingtalk.apis;
          dd.device.notification.alert({
            message: '请输入证件号码',
            title: "提示",//可传空
            buttonName: "确定"
          });
        });
      } else if (!this.submitForm.urgentPhone) {
        dingtalk.ready(function(){
          const dd = dingtalk.apis;
          dd.device.notification.alert({
            message: '请输入紧急联系人电话',
            title: "提示",//可传空
            buttonName: "确定"
          });
        });
      } else if (!this.submitForm.startTime) {
        dingtalk.ready(function(){
          const dd = dingtalk.apis;
          dd.device.notification.alert({
            message: '请选择租期开始时间',
            title: "提示",//可传空
            buttonName: "确定"
          });
        });
      } else if (!this.submitForm.endTime) {
        dingtalk.ready(function(){
          const dd = dingtalk.apis;
          dd.device.notification.alert({
            message: '请选择租期结束时间',
            title: "提示",//可传空
            buttonName: "确定"
          });
        });
      } else if (!this.submitForm.cycle) {
        dingtalk.ready(function(){
          const dd = dingtalk.apis;
          dd.device.notification.alert({
            message: '请选择支付周期',
            title: "提示",//可传空
            buttonName: "确定"
          });
        });
      } else if (!this.submitForm.rental) {
        dingtalk.ready(function(){
          const dd = dingtalk.apis;
          dd.device.notification.alert({
            message: '请输入租金',
            title: "提示",//可传空
            buttonName: "确定"
          });
        });
      } else if (!this.submitForm.deposit) {
        dingtalk.ready(function(){
          const dd = dingtalk.apis;
          dd.device.notification.alert({
            message: '请输入押金',
            title: "提示",//可传空
            buttonName: "确定"
          });
        });
      } else if (!this.submitForm.source) {
        dingtalk.ready(function(){
          const dd = dingtalk.apis;
          dd.device.notification.alert({
            message: '请选择租客来源',
            title: "提示",//可传空
            buttonName: "确定"
          });
        });
      } else {
        dingtalk.ready(function(){
          const dd = dingtalk.apis;
          dd.device.notification.showPreloader({
            text: "使劲提交中..", //loading显示的字符，空表示不显示文字
            showIcon: true, //是否显示icon，默认true
            onSuccess : function(result) {
                /*{}*/
            },
            onFail : function(err) {}
          })
        });
        // 新建出租合同
        this.$http.post(this.$store.state.contractUrl + 'addLeaContract', this.submitForm
        , {
          headers: {
            'Content-Type': 'application/json',
            'userid': this.$store.state.currentUser.uid,
            'workflowToken': this.$store.state.workflowToken,
            'processTenantId': this.houseDetailData.zoneId,
            'processKey': this.contractFormData.processKey
          }
        }).then(function (res) {
          var data = res.data
          // 隐藏加载图标
          dingtalk.ready(function(){
            const dd = dingtalk.apis;
            dd.device.notification.hidePreloader({
              onSuccess : function(result) {
              },
              onFail : function(err) {}
            })
          });
          if (data.code === 200) {
            dingtalk.ready(function(){
              const dd = dingtalk.apis;
              dd.device.notification.alert({
                message: '合同新建成功',
                title: "提示",//可传空
                buttonName: "确定"
              });
            });
            this.$router.push({ name: 'houseList'})
          } else if (data.code === 20001) {
            dingtalk.ready(function(){
              const dd = dingtalk.apis;
              dd.device.notification.alert({
                message: '姓名和身份证不匹配',
                title: "提示",//可传空
                buttonName: "确定"
              });
            });
          } else if (data.code === 20005) {
            dingtalk.ready(function(){
              const dd = dingtalk.apis;
              dd.device.notification.alert({
                message: '个人用户注册失败',
                title: "提示",//可传空
                buttonName: "确定"
              });
            });
          } else {
            dingtalk.ready(function(){
              const dd = dingtalk.apis;
              dd.device.notification.alert({
                message: '新建合同失败',
                title: "提示",//可传空
                buttonName: "确定"
              });
            });
          }
        }, function (res) {
          alert(res.status)
        })
      }
    }
  },
  components: {
    checkList,
    ruleDialog,
    preview,
    dingjinHistory
  }
}
</script>
<style scoped>
.img2{
  width: 30px;
  height: 34px;
}
.fyCycle{
  font-size: 28px;
  color: #666;
}
.fyInput{
  font-size: 28px;
  color: #666;
  width: 100px;
}
.contract-bottom-fl{
  width: 375px;
  height: 90px;
  line-height: 90px;
  color: #666;
  text-align: center;
  font-size: 28px;
  background-color: #fff;
}
.contract-bottom-fr{
  width: 375px;
  height: 90px;
  line-height: 90px;
  color: #fff;
  text-align: center;
  font-size: 28px;
  background-color: #FBB13F;
}
.contract-bottom{
  width: 750px;
  height: 90px;
  flex-direction: row;
  align-items: center;
}
.textarea{
  width: 690px;
  background-color: #F0F0F0;
  padding: 10px;
  font-size: 28px;
  color: #999;
  margin: 20px 30px;
  border-color:#F0F0F0;
}
.textarea-bg{
  width: 750px;
  background-color: #fff;
  margin-bottom: 176px;
}
.radio-div{
  width: 690px;
  flex-direction: row;
  align-items: center;
}
.radio-img{
  width: 92px;
  height: 88px;
}
.zk-form-div-fr{
  flex-direction: row;
  align-items: center;
}
.img{
  width: 10px;
  height: 20px;
}
.zk-form-div-right{
  color: #999;
  font-size: 28px;
  margin-right: 20px;
}
.top-fz{
  font-size: 28px;
}
.index-form-input{
  font-size: 28px;
  placeholder-color:#999;
  color: #999;
  width: 500px;
  text-align: right;
}
.zk-form-div-text{
  font-size: 28px;
  color: #333;
}
.zk-form-div{
  width: 690px;
  height: 100px;
  align-items: center;
  font-size: 28px;
  background-color: #fff;
  flex-direction: row;
  border-bottom: 1px solid #E0E0E0;
  justify-content: space-between;
}
.zk-form{
  width: 750px;
  background-color: #fff;
  align-items: center;
}
.form-title{
  width: 690px;
  padding-left: 30px;
  margin: 30px 0;
  font-size: 28px;
  color: #666;
  padding-left: 10px;
  border-left: 4px solid #FBB13F;
  margin-left: 30px;
  background-color: #f8f8f8;
}
.form-title2{
  margin: 30px 0;
  font-size: 28px;
  color: #666;
  background-color: #f8f8f8;
}
.top-text{
  color: #999;
  font-size: 28px;
}
.top{
  width: 750px;
  height: 100px;
  margin-top:30px;
  align-items: center;
  padding: 0 30px;
  font-size: 28px;
  background-color: #fff;
  flex-direction: row;
  border-top: 1px solid #E0E0E0;
  border-bottom: 1px solid #E0E0E0;
  justify-content: space-between;
}
.wrapper {
  display: flex;
  flex-direction: column;
  width: 750px;
  align-items: center;
}
</style>
