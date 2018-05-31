<template>
<!-- 完成维修 -->
	<div>
		<el-form label-width="130px" :inline="true">
          	<el-form-item label="服务反馈" required>
            	<el-select v-model="forms.processResult" :style="width">
              		<el-option label="已修好" value="SUCCESS" key="已修成" v-if="serviceType === 'repair'"></el-option>
              		<el-option label="未修好" value="FAILURE" key="未修成" v-if="serviceType === 'repair'"></el-option>
              		<el-option label="已完成" value="SUCCESS" key="已完成" v-if="serviceType === 'clean'"></el-option>
              		<el-option label="未完成" value="FAILURE" key="未修成" v-if="serviceType === 'clean'"></el-option>
            	</el-select>
          	</el-form-item>
          	<el-form-item label="责任归属">
            	<el-select v-model="forms.accountability" :style="width">
              		<el-option label="公司责任" value="COMPANY" key="已完成"></el-option>
              		<el-option label="用户责任" value="INDIVIDUAL" key="未修成"></el-option>
            	</el-select>
          	</el-form-item>
          	<el-form-item label="是否私自购买配件">
            	<el-select v-model="forms.parts" :style="width">
              		<el-option label="是" value="0" key="未修成"></el-option>
              		<el-option label="否" value="1" key="未修成"></el-option>
            	</el-select>
          	</el-form-item>
          	<el-form-item label="花费的金额" v-if="forms.parts === '0'">
            	<el-input type="text"v-model="forms.partsMoney1" :style="width"></el-input>
            	<p class="money">元</p>
          	</el-form-item>
          	<!-- <el-form-item label="是否收取客户费用">
            	<el-select v-model="forms.tenant" :style="width">
              		<el-option label="是" value="0" key="未修成"></el-option>
              		<el-option label="否" value="1" key="未修成"></el-option>
            	</el-select>
          	</el-form-item>
          	<el-form-item label="收取的金额" v-if="forms.tenant === '0'">
            	<el-input type="text"v-model="forms.tenantMoney1" :style="width"></el-input>
            	<p class="money">元</p>
          	</el-form-item> -->
			<el-form-item label="上门日期" required>
				<el-date-picker
				  :style="width"
			      v-model="forms.date"
			      type="date">
			    </el-date-picker>
	        </el-form-item>
          	<el-form-item label="说明">
            	<el-input type="textarea" :rows="2" v-model="forms.processResultMemo" style="width:465px"></el-input>
          	</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
		  	<el-button @click="closeForm()">取 消</el-button>
		  	<el-button type="primary" @click="submit">确 定</el-button>
		</div>
	</div>
</template>
<script>
import $ from 'jquery'
import houseRescoure1 from './houseRescoure1'  //  新建房源
import houseUser from './houseUser'  //  新建房源
export default {
  beforeCreate: function () {
    let treeArea = this.$store.state.accountUrl + 'unit/tree/f/area'
    // 搜索小区
    this.$options.methods.unitSelect(this, treeArea)
    this.$options.methods.gbForm()
  },
  data: function () {
    return {
      width: 'width:160px',
      landlord: '房东',
      renter: '租客',
      unit: [], // 片区列表
      forms: {
        parts: '1',
        accountability: 'COMPANY',
        partsMoney: 0,
        partsMoney1: 0,
        tenantMoney1: 0,
        tenantMoney: 0,
        tenant: '1',
        date: '',
        processResultMemo: '',
        processResult: '',
        homeMaintainTimeL: ''
      },
      mix: {
        treeArea: this.$store.state.accountUrl + 'unit/tree/f/area', // 查询片区
        houseList: this.$store.state.houseUrl + 'list/block', // 房源地址查找
        update: this.$store.state.serviceUrl + 'updateProcessingResult' // 房源地址查找
      },
      clickOver: true
    }
  },
  mounted () {
    $('.el-dialog--small,.el-dialog--tiny').width(650)
  },
  props: ['serviceType', 'repairId', 'clickCount', 'options'],
  watch: {
    clickCount: function () {
      this.$options.methods.gbForm()
      let list = {}
      list.parts = '1'
      list.accountability = 'COMPANY'
      list.partsMoney = 0
      list.partsMoney1 = 0
      list.tenantMoney1 = 0
      list.tenantMoney = 0
      list.tenant = '1'
      list.date = ''
      list.processResultMemo = ''
      list.processResult = ''
      list.homeMaintainTimeL = ''
      this.forms = list
      this.clickOver = true
    }
  },
  methods: {
    closeForm () {
      this.$emit('closeForm')
      this.$options.methods.gbForm()
    },
    show () {
    },
    querySearch (queryString, cb) { // 小区信息
      if (queryString !== '') {
        var dataList = {}
        // var restaurant = []
        dataList.userType = 'P'
        dataList.keywordAddress = queryString
        dataList.houseSpaceManagerType = 'HOUSE'
        dataList.rentType = 'ENTIRE_RENT'
        dataList.houseSpaceProcess = 'GET_PROCESS'
        dataList.houseSpaceStatus = 'APPROVED'
        dataList.zoneId = this.forms.zoneId
        this.restaurants = []
        let token = ''
        token = this.$store.state.workflowToken
        this.$http.post(this.mix.houseList, dataList, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/*; charset=utf-8',
            'userid': this.$store.state.currentUser.uid,
            'workflowToken': token
          }
        }).then(({data}) => {
          for (var p in data.data.list) {
            if (data.data.list !== '' && data.data.list !== null) {
              for (var i in data.data.list[p].resHouseSpaceManagerBeanList) {
                let restaurant = {}
                restaurant.value = data.data.list[p].resHouseSpaceManagerBeanList[i].resHouseSpaceBeanList[0].keywordAddress
                restaurant.houseSpaceManagerId = data.data.list[p].resHouseSpaceManagerBeanList[i].resHouseSpaceBeanList[0].houseSpaceId
                this.restaurants.push(restaurant)
              }
            }
          }
        })
      }
      // 调用 callback 返回建议列表的数据
      cb(this.restaurants)
    },
    createFilter (queryString) { // 小区信息
      return (restaurant) => {
        return (restaurant.value.indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect (item) { // 选择小区信息
      this.forms.houseSpaceId = item.houseSpaceManagerId
    },
    unitSelect (_this, userUrl) { // 搜索片区
      _this.$http.get(userUrl).then(({data}) => {
        var data1 = data.data.children
        _this.unit = data1
        // _this.addBean.zone = _this.unit[0].text
        // _this.addBean.zoneId = _this.unit[0].id
      })
    },
    zoneChange (data) { // 选择片区
      // console.log(data)
      this.addBean.zoneId = data
    },
    submit () {
      if (this.clickOver) {
        this.clickOver = false
        if (this.forms.processResult === '') {
          this.$message({
            message: '请选择服务结果',
            type: 'error'
          })
          this.clickOver = true
        } else if (this.forms.date === '') {
          this.$message({
            message: '请选择上门时间',
            type: 'error'
          })
          this.clickOver = true
        } else {
          let workflowParams
          for (let i = 0; i <= this.options.length - 1; i++) {
            if (this.forms.processResult === this.options[i].actionTarget) {
              workflowParams = this.options[i].workflowParams
            }
          }
          let url = this.mix.update
          this.forms.formId = this.repairId
          this.forms.partsMoney = this.forms.partsMoney1 * 1000
          this.forms.tenantMoney = this.forms.tenantMoney1
          this.forms.homeMaintainTimeL = (new Date(this.forms.date)).getTime()
          this.$store.commit('getMidWorkflowToken', {'processKey': this.repairId, 'variables': workflowParams})
          this.forms.userId = this.$store.state.currentUser.uid
          this.$http.post(url, this.forms, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/*; charset=utf-8',
              'userId': this.$store.state.currentUser.uid,
              'workflowToken': this.$store.state.workflowToken,
              'taskId': this.$store.state.taskId,
              'processInstanceId': this.$store.state.processInstanceId,
              'processBusinessKey': this.repairId
            }
          }).then(function (res) {
            if (res.body.code === 200) {
              this.$options.methods.gbForm()
              this.$emit('closeForm')
              this.$message({
                message: '反馈成功',
                type: 'success'
              })
              this.$root.task.$emit('submitForm', 1)
              this.$options.methods.gbForm()
            } else if (res.body.code === 10031) {
              this.$options.methods.gbForm()
              this.$message({
                message: '您没有权限操作该条数据',
                type: 'warning'
              })
            } else {
              this.$message({
                message: '反馈失败',
                type: 'error'
              })
            }
            this.clickOver = true
          })
        }
      }
    },
    gbForm () {
      let list = {}
      list.parts = '1'
      list.accountability = 'COMPANY'
      list.partsMoney = 0
      list.partsMoney1 = 0
      list.tenantMoney1 = 0
      list.tenantMoney = 0
      list.tenant = '1'
      list.date = ''
      list.processResultMemo = ''
      list.processResult = ''
      list.homeMaintainTimeL = ''
      this.forms = list
    }
  },
  components: {
    houseRescoure1, houseUser
  }
}
</script>
<style scoped>
.houseSizeP{
  display: inline-block;
  margin-left: -30px;
  position: relative;
}
.dialog-footer{
	text-align: right;
  padding-right: 35px;
}
.money{
	position: absolute;
	right: 10px;
	top: 0;
	line-height: 36px;
}
</style>