<template>
  <div class="reserve">
    <el-dialog title="预定房源" :close-on-click-modal="false" :visible.sync="reserveForm.show" size="small" top="5%">
      <el-form inline ref="reserveFormData" :rules="rules" :model="reserveFormData" label-width="126px" label-position="right">
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input @blur="blurName()" v-model="reserveFormData.name" placeholder="姓名" :disabled="reserveFormData.nameS"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号" prop="phone">
              <el-input @blur="blur()" v-model="reserveFormData.phone" @keyup.native="search()" placeholder="手机号" :maxlength="11" :disabled="reserveFormData.phoneS"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
              <el-form-item label="定金" prop="money">
                <el-input v-model="reserveFormData.money" :disabled="reserveFormData.moneyS" placeholder="定金" :maxlength="11"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="房源名称" prop="house">
              <el-select
                class="sousuo"
                v-model="reserveFormData.house"
                filterable
                remote
                placeholder="请输入关键词"
                :remote-method="remoteMethod"
                :loading="loading">
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
        <el-row>
          <el-col :span="24">
            <el-form-item :span="24" class="w100p" label="备注" prop="memo">
              <el-input :span="24" type="textarea" class="textarea" autosize placeholder="请输入备注" v-model="reserveFormData.memo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('reserveFormData')">重 置</el-button>
        <el-button type="primary" @click="submitForm('reserveFormData')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'reserveForm',
  data: function () {
    // 手机号验证
    var checkphone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      }
      setTimeout(() => {
        if (!(/^1[3,4,5,7,8,9]\d{9}$/.test(value))) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      }, 1000)
    }
    // 日期验证
    var checkDate = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请选择退租日期'))
      }
      setTimeout(() => {
        if (Date.parse(value) < Date.parse(this.reserveFormData.startTime)) {
          callback(new Error('退租日期时间不能小于起租日期'))
        } else {
          callback()
        }
      }, 1000)
    }
    return {
      // 小管家数据
      houseKeeperData: '',
      rentType2: '',
      houtaiName: null,
      houtaiCardId: null,
      options2: JSON.parse(this.$store.state.currentUser.keeperData),
      props: {
        value: 'label',
        children: 'cities'
      },
      // select搜索数据
      options4: [],  // 搜索出来的列表数据
      list: [],
      loading: false,
      states: [],
      houseId: '',
      // 验证规则
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 32, message: '请输入正确的姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, validator: checkphone, trigger: 'blur' }
        ],
        goTime: [
          { type: 'date', required: true, message: '请选择签合同时间', trigger: 'change' }
        ],
        rentType2: [
          { required: true, message: '请选择支付周期', trigger: 'change' }
        ],
        startTime: [
          { type: 'date', required: true, message: '请选择起租日期', trigger: 'change' }
        ],
        endTime: [
          { type: 'date', required: true, validator: checkDate, trigger: 'change' }
        ],
        source: [
          { required: true, message: '请选择租客来源', trigger: 'change' }
        ],
        // 押金
        deposit: [
          { required: true, message: '请输入押金金额', trigger: 'blur' }
        ],
        // 身份证验证
        cardId: [
          { required: true, message: '请输入身份证', trigger: 'blur' },
          { min: 18, max: 18, message: '请输入正确的身份证', trigger: 'blur' }
        ],
        money: [
          { required: true, message: '请输入定金金额', trigger: 'blur' }
        ],
        // houseRentType: [
        //   { required: true, message: '请选择房源类型', trigger: 'change' }
        // ],
        // 租金验证
        rentMoney: [
          { required: true, message: '请输入租金金额', trigger: 'blur' }
        ],
        // 居住人数验证
        livesNumber: [
          { required: true, message: '请输入居住人数', trigger: 'blur' }
        ],
        house: [
          { required: true, message: '请输入房源名称', trigger: 'blur' }
        ],
        people: [
          { type: 'array', required: true, message: '请选择销售人员名字', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    // 重置数据
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 获取小管家id
    changeHouseKeeper (val) {
      let keeper = JSON.parse(this.$store.state.currentUser.keeperData)
      for (var i = 0; i <= keeper.length - 1; i++) {
        for (var j = 0; j <= keeper[i].cities.length - 1; j++) {
          if (val[1] === keeper[i].cities[j].label) {
            this.reserveFormData.houseKeeperId = keeper[i].cities[j].id
          }
        }
      }
    },
    // 提交表单
    submitForm (reserveFormData) {
      this.$refs[reserveFormData].validate((valid) => {
        // 验证通过
        if (valid) {
          // 修改预定信息
          if (this.reserveFormData.type === '1') {
            this.$http.post(this.$store.state.rentUrl + 'reservation/update', {
              reservationId: this.reserveFormData.reservationId, // 预定记录id
              enterId: this.$store.state.currentUser.uid,
              userName: this.reserveFormData.name,   // 姓名
              userPhone: this.reserveFormData.phone, // 手机号
              earnest: this.reserveFormData.money * 1000, // 定金
              houseSpaceId: this.houseId, // 房源id
              unitId: this.unitId, // 片区id
              memo: this.reserveFormData.memo // 备注
            }, {
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(function (res) {
              var data = res.data
              if (data.code === 200) {
                // 表单隐藏
                this.reserveForm.show = false
                // 重置表单数据
                this.$refs[reserveFormData].resetFields()
                this.$root.reserveHouse.$emit('submitForm', 1)
                this.$message('预定信息修改成功')
              } else if (data.code === 10029) {
                this.$message('操作失败')
              } else {
                this.$message('信息填写有误,请检查后提交')
              }
            }, function (res) {
              console.log(res.reservationStatus)
            })
          } else {
            // 触发流程
            // this.$store.commit('getNewWorkflowToken', {'processKey': 'PROCESS-KEY-RENT', 'processTenantId': this.unitId, 'variables': {startType: 2}})
            // 新增预定信息
            this.$http.post(this.$store.state.rentUrl + 'reservation/add', {
              reservationId: this.reserveFormData.reservationId, // 预定记录id
              enterId: this.$store.state.currentUser.uid,
              userName: this.reserveFormData.name,   // 姓名
              userPhone: this.reserveFormData.phone, // 手机号
              earnest: this.reserveFormData.money * 1000, // 定金
              houseSpaceId: this.houseId, // 房源id
              unitId: this.unitId, // 片区id
              memo: this.reserveFormData.memo // 备注
            }, {
              headers: {
                'Content-Type': 'application/json',
                'userid': this.$store.state.currentUser.uid,
                'workflowToken': this.$store.state.workflowToken,
                'processTenantId': this.unitId,
                'processKey': 'PROCESS-KEY-RENT'
              }
            }).then(function (res) {
              var data = res.data
              if (data.code === 200) {
                this.reserveForm.show = false
                this.$refs[reserveFormData].resetFields()
                // 刷新预定列表
                this.$root.reserveHouse.$emit('submitForm', 1)
                this.$message('预定信息添加成功')
                // 触发事件刷新任务列表
                this.$root.task.$emit('submitForm', 1)
                if (this.reserveFormData.fromAppoint === true) {
                  // 如果预约到预定成功触发改预约状态
                  this.$root.appoint.$emit('changeStatus', '')
                }
              } else if (data.code === 10029) {
                this.$message('操作失败')
              } else {
                this.$message('信息填写有误,请检查后提交')
              }
            }, function (res) {
              console.log(res.status)
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 选择房源类型后清空房源数据
    changeHouseRentType () {
      this.options4 = []
      this.reserveFormData.house = ''
    },
    // 搜索房源
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        // 输入之后调用接口
        this.$http.post(this.$store.state.houseUrl + 'list/houseSpace', {
          keywordAddress: query,
          // rentType: this.reserveFormData.houseRentType,
          pageNo: 1,
          pageSize: 9999,
          houseSpaceStatus: 'RENTABLE',
          loginId: this.$store.state.currentUser.uid
        }).then(function (response) {
          var data = response.data
          if (data.code === 200) {
            var i, j
            for (i = 0; i <= data.data.list.length - 1; i++) {
              for (j = 0; j <= data.data.list[i].resHouseSpaceBeanList.length - 1; j++) {
                this.states.push(data.data.list[i].resHouseSpaceBeanList[j].keywordAddress)
                this.houseId = data.data.list[i].resHouseSpaceBeanList[j].houseSpaceId
                this.unitId = data.data.list[i].zoneId
                if (data.data.list[i].resHouseSpaceBeanList[j].guidePrice) {
                  if (data.data.list[i].resHouseSpaceBeanList[j].guidePrice === null) {
                    this.reserveFormData.guidePrice = 0
                  } else {
                    this.reserveFormData.guidePrice = data.data.list[i].resHouseSpaceBeanList[j].guidePrice / 1000
                  }
                } else {
                  this.reserveFormData.guidePrice = 0
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
          }
        }, function (response) {
          console.log(response.status)
        })
      } else {
        this.options4 = []
      }
    },
    // 根据手机号查询是否有预约记录
    search () {
      if (this.reserveFormData.phone.length === 11) {
        this.$http.post(this.$store.state.rentUrl + 'appointment/list', {
          userPhone: this.reserveFormData.phone,
          loginId: this.$store.state.currentUser.uid
        }).then(function (response) {
          if (response.data.data) {
            var data = response.data.data.list[0]
            // this.reserveFormData.houseRentType = data.houseRentType
            this.reserveFormData.house = data.houseSpaceName
          }
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
      if (/^1[3,4,5,7,8,9]\d{9}$/.test(this.reserveFormData.phone)) {
        this.$http.get(this.$store.state.accountUrl + 'user/info/p/' + this.reserveFormData.phone, {
        }).then(function (response) {
          let data = response.data
          if (data.data !== null) {
            this.houtaiName = data.data.username
            this.blurName()
            this.yonghuId = data.data.id
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
      console.log(this.houtaiName)
      if (this.houtaiName && this.reserveFormData.name) {
        if (this.houtaiName !== this.reserveFormData.name) {
          this.$message({
            showClose: true,
            message: '用户信息与系统信息不匹配，请核对后重新输入',
            type: 'error',
            duration: 2000
          })
          this.reserveFormData.name = ''
        }
      }
    },
    // 对比身份证
    blurCardId () {
      console.log(this.houtaiCardId)
      if (this.houtaiCardId && this.reserveFormData.cardId) {
        if (this.houtaiCardId !== this.reserveFormData.cardId) {
          this.$message({
            showClose: true,
            message: '用户信息与系统信息不匹配，请核对后重新输入',
            type: 'error',
            duration: 2000
          })
          this.reserveFormData.cardId = ''
        }
      }
    },
    // 起租时间
    changeTime2 (val) {
      if (this.reserveFormData.rentRange) {
        this.changeLabel(this.reserveFormData.rentRange)
      }
    },
    // 退租时间
    changeTime (val) {
      let v
      if (this.reserveFormData.rentRange === '1月') {
        v = 1
      } else if (this.reserveFormData.rentRange === '3月') {
        v = 3
      } else if (this.reserveFormData.rentRange === '6月') {
        v = 6
      } else if (this.reserveFormData.rentRange === '1年') {
        v = 12
      } else {
      }
      this.$http.post(this.$store.state.contractUrl + 'getTime', {
        nowTime: Date.parse(this.reserveFormData.startTime),
        index: v
      }).then(function (response) {
        let data = response.data
        if (data.data !== null) {
          if (this.reserveFormData.endTime === data.data) {
          } else {
            this.reserveFormData.rentRange = ''
          }
        }
      }, function (response) {
        console.log(response.status)
      })
    },
    // 选择时间标签
    changeLabel (val) {
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
        nowTime: Date.parse(this.reserveFormData.startTime),
        index: v
      }).then(function (response) {
        let data = response.data
        if (data.data !== null) {
          this.reserveFormData.endTime = data.data
        }
      }, function (response) {
        console.log(response.status)
      })
    }
  },
  props: ['reserveForm', 'reserveFormData'],
  created () {
  },
  watch: {
    'reserveFormData.people': function (val, oldVal) {
      this.changeHouseKeeper(val)
    },
    'reserveFormData.house': function (val, oldVal) {
      this.remoteMethod(val)
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
.reserve .el-input, .el-input__inner {
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














