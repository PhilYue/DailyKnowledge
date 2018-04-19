<template>
  <div class="recordMoney">
    <el-dialog title="录入费用" :visible.sync="recordMoneyShow.show" :close-on-click-modal="false">
      <el-form :model="recordMoneyData" inline ref="recordMoneyData" :rules="rules" label-width="126px" label-position="right">
      <!-- 金额类型和金额数目 -->
        <el-row>
            <el-col :span="12">
              <el-form-item label="金额类型" prop="chargType">
                <el-select v-model="recordMoneyData.chargType" placeholder="请选择金额类型">
                  <el-option label="租金" value="REN"></el-option>
                  <!-- <el-option label="押金" value="REN"></el-option> -->
                  <!-- <el-option label="水费" value="WATER"></el-option>
                  <el-option label="电费" value="ELEC"></el-option>
                  <el-option label="煤气费" value="GAS"></el-option> -->
                  <el-option label="赔偿" value="COM"></el-option>
                  <!-- <el-option label="消费" value="CONSUME"></el-option> -->
                  <!-- <el-option label="定金" value="REN"></el-option> -->
                  <!-- <el-option label="维修" value="MAIN"></el-option>
                  <el-option label="保洁" value="CLEAN"></el-option> -->
                  <el-option label="物管费" value="PERFEE"></el-option>
                  <el-option label="其他费用" value="OTH"></el-option>
                  <el-option label="手续费" value="MANAGECOST"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="金额数目" prop="initialAmount">
                <el-input v-model="recordMoneyData.initialAmount" auto-complete="off" placeholder="请输入金额"></el-input>
              </el-form-item>
            </el-col>
        </el-row>
        <!-- 开始结束时间 -->
        <el-row>
          <el-col :span="12">
            <el-form-item v-if="this.recordMoneyData.once === 'noOnce'" label="费用开始时间" prop="startChargTime">
              <el-date-picker
                class="timeWidth"
                v-model="recordMoneyData.startChargTime"
                type="date"
                placeholder="费用开始时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item v-if="this.recordMoneyData.once === 'once'" label="费用时间" prop="startChargTime">
              <el-date-picker
                class="timeWidth"
                v-model="recordMoneyData.startChargTime"
                type="date"
                placeholder="费用时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="金额流向" prop="financeType">
              <el-select v-model="recordMoneyData.financeType">
                <el-option label="向租客收取" value="INC"></el-option>
                <el-option v-if="isRole" label="支付给租客" value="PAY"></el-option>
                <el-option v-if="isRole" label="抵扣" value="DISC"></el-option> 
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 是否是一次性收费 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="收费类型" prop="once">
              <el-select v-model="recordMoneyData.once" placeholder="请选择收费类型">
                <el-option label="一次性收费" value="once"></el-option>
                <el-option label="周期性收费" value="noOnce"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- memo备注 -->
          <el-col :span="12">
            <el-form-item label="备注" prop="memo">
              <el-input v-model="recordMoneyData.memo" auto-complete="off" placeholder="请输入备注"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 收费单位 -->
        <el-row v-if="this.recordMoneyData.once === 'noOnce'">
            <el-col :span="12">
              <el-form-item label="收费周期" prop="cycle">
                <el-input v-model="recordMoneyData.cycle" auto-complete="off" placeholder="请输入收费周期"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="周期单位" prop="unit">
                <el-select v-model="recordMoneyData.unit">
                  <el-option label="日" value="DAY"></el-option>
                  <el-option label="月" value="MONTH"></el-option>
                  <el-option label="年" value="YEAR"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
        </el-row>
        <!-- 金额流向 -->
        <el-row>
          <el-col v-if="this.recordMoneyData.once === 'noOnce'" :span="12">
            <el-form-item label="上调类型" prop="addType">
              <el-select v-model="recordMoneyData.addType" placeholder="请选择上调类型">
                <el-option label="不上调" value="NOTRISE"></el-option>
                <el-option label="金额数" value="RISEBYAMOUNT"></el-option>
                <el-option label="百分比" value="RISEBYPER"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 上调类型 -->
        <el-row v-if="this.recordMoneyData.once === 'noOnce'">
            <el-col :span="12">
              <el-form-item label="费用结束时间" prop="endChargTime">
                <el-date-picker
                  class="timeWidth"
                  v-model="recordMoneyData.endChargTime"
                  type="date"
                  placeholder="费用结束时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col v-if="this.recordMoneyData.addType === 'RISEBYAMOUNT'" :span="12">
              <el-form-item label="上调金额数" prop="addAmount">
                <el-input v-model="recordMoneyData.addAmount" auto-complete="off" placeholder="请输入上调金额数"></el-input>
              </el-form-item>
            </el-col>
            <el-col v-if="this.recordMoneyData.addType === 'RISEBYPER'" :span="12">
              <el-form-item label="上调百分比" prop="addPer">
                <el-input v-model="recordMoneyData.addPer" auto-complete="off" placeholder="请输入上调百分比"></el-input>
              </el-form-item>
            </el-col>
        </el-row>
        <!-- 增长单位 -->
        <el-row v-if="this.recordMoneyData.addType === 'RISEBYAMOUNT' || this.recordMoneyData.addType === 'RISEBYPER'">
            <el-col :span="12">
              <el-form-item label="增长周期" prop="addCycle">
                <el-input v-model="recordMoneyData.addCycle" auto-complete="off" placeholder="请输入增长周期"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="增长单位" prop="addUnit">
                <el-select v-model="recordMoneyData.addUnit">
                  <el-option label="日" value="DAY"></el-option>
                  <el-option label="月" value="MONTH"></el-option>
                  <el-option label="年" value="YEAR"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="recordMoney('recordMoneyData')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

export default {
  name: 'recordMoney',
  data: function () {
    // 日期验证
    var checkDate = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请选择退租日期'))
      }
      setTimeout(() => {
        if (value < this.recordMoneyData.startTime) {
          callback(new Error('退租日期时间不能小于起租日期'))
        } else {
          callback()
        }
      }, 1000)
    }
    return {
      rules: {
        chargType: [
          { required: true, message: '请选择金额类型', trigger: 'change' }
        ],
        startChargTime: [
          { type: 'date', required: true, message: '请选择开始日期', trigger: 'change' }
        ],
        endChargTime: [
          { type: 'date', required: true, validator: checkDate, trigger: 'change' }
        ],
        initialAmount: [
          { required: true, message: '请输入金额数目', trigger: 'blur' }
        ],
        addType: [
          { required: true, message: '请选择上调类型', trigger: 'change' }
        ],
        financeType: [
          { required: true, message: '请选择金额流向', trigger: 'change' }
        ],
        addAmount: [
          { required: true, message: '请输入每周期上调金额数', trigger: 'blur' }
        ],
        addPer: [
          { required: true, message: '请输入每周期上调百分比数', trigger: 'blur' }
        ],
        unit: [
          { required: true, message: '请选择收费周期单位', trigger: 'change' }
        ],
        cycle: [
          { required: true, message: '请输入收费周期', trigger: 'blur' }
        ],
        addUnit: [
          { required: true, message: '请选择增长单位', trigger: 'change' }
        ],
        addCycle: [
          { required: true, message: '请输入增长周期', trigger: 'blur' }
        ]
      },
      // 控制运营部门审批
      isRole: false
      // pickerOptions: {
      //   // 设置禁止选的日期
      //   disabledDate (time) {
      //     return time.getTime() < Date.now() - 8.64e7
      //   }
      // },
      // pickerOptions2: {
      //   // 设置禁止选的日期
      //   disabledDate (time) {
      //     return time.getTime() < Date.now() - 8.64e7
      //   }
      // }
    }
  },
  methods: {
    // 根据登录用户id获取用户角色
    getRole () {
      this.$http.get(this.$store.state.accountUrl + 'role/list/u/' + this.$store.state.currentUser.uid
      ).then(function (response) {
        var data = response.data
        if (data.code === 200) {
          let list = data.data
          for (var i = 0; i <= list.length - 1; i++) {
            console.log(i)
            if (list[i].name === '运营部经理') {
              this.isRole = true
            }
          }
        }
      }, function (response) {
        console.log(response.status)
      })
    },
    recordMoney (recordMoneyData) {
      // 如果是租金一次性收费设置默认值
      if (this.recordMoneyData.once === 'once') {
        this.recordMoneyData.endChargTime = new Date((Date.parse(this.recordMoneyData.startChargTime) + 86400000))
        this.recordMoneyData.cycle = '1'
        this.recordMoneyData.unit = 'DAY'
        this.recordMoneyData.addType = 'NOTRISE'
      }
      this.$refs[recordMoneyData].validate((valid) => {
        if (valid) {
          // 提交录入的金额
          this.$http.post(this.$store.state.rentUrl + 'chargrule/add', {
            'addAmount': this.recordMoneyData.addAmount * 1000,
            'addPer': this.recordMoneyData.addPer * 1000,
            'addType': this.recordMoneyData.addType,
            'businessType': 'RENT',
            'financeType': this.recordMoneyData.financeType,
            'chargType': this.recordMoneyData.chargType,
            'endChargTime': Date.parse(this.recordMoneyData.endChargTime),
            'initialAmount': this.recordMoneyData.initialAmount * 1000,
            'businessId': this.recordMoneyData.leaseId,
            'cycle': (this.recordMoneyData.cycle).toString(),
            'startChargTime': Date.parse(this.recordMoneyData.startChargTime),
            'unit': this.recordMoneyData.unit,
            'addCycle': this.recordMoneyData.addCycle,
            'addUnit': this.recordMoneyData.addUnit
          }).then(function (response) {
            var data = response.data
            console.log(data)
            if (data.code === 200) {
              this.$message.success('录入成功')
              this.recordMoneyShow.show = false
              // 清空数据
              this.$refs[recordMoneyData].resetFields()
            } else if (data.code === 410) {
              this.$message.error('结束时间应是收费周期整数倍')
            }
          }, function (response) {
            console.log(response.status)
          })
        } else {
        }
      })
    }
  },
  props: ['recordMoneyShow', 'recordMoneyData'],
  created () {
    // 根据用户id获取用户角色
    this.getRole()
  }
}
</script>
<style scoped>
.timeWidth{
  width: 169px!important;
}
</style>