<template>
  <div class="appointForm">
    <el-dialog title="预约看房" :visible.sync="houseAppoint.show" size="small" :close-on-click-modal="false">
      <el-form inline ref="form" :rules="rules" :model="form" label-width="126px" label-position="right">
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input @blur="blurName" v-model="form.name" placeholder="姓名" :disabled="form.nameS"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号" prop="phone">
              <el-input @blur="blur" v-model="form.phone" placeholder="手机号" :maxlength="11" :disabled="form.phoneS"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="上门时间" prop="goTime">
              <el-col>
              <el-date-picker
                class="par-0"
                v-model="form.goTime"
                type="date"
                placeholder="上门时间"
                :picker-options="pickerOptions"
                :default-value="now"
                >
              </el-date-picker>
              </el-col>
          </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="销售人员" prop="people">
                <el-cascader
                  v-model="form.people"
                  placeholder="销售人员"
                  :options="options2"
                  @change="changeHouseKeeper"
                  :props="props"
                  :show-all-levels="false"
                ></el-cascader>
              </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="12">
            <el-form-item label="房源类型" prop="houseRentType">
              <el-col>
                <el-select @change="changeHouseRentType" class="w100p" v-model="form.houseRentType" placeholder="请选择房源类型">
                  <el-option :key="1" v-for="item in houseRentType" :value="item.value" :label="item.name"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row>
          <el-col :span="24">
            <el-form-item label="房源名称" prop="house">
              <el-select
                class="sousuo"
                v-model="form.house"
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
          <el-col :span="12">
            <el-form-item label="价格区间" prop="rentRange">
              <el-col>
                <el-select class="w100p" v-model="form.rentRange" placeholder="请选择价格区间">
                  <el-option :key="1" v-for="item in rentRange" :value="item.name"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="租客来源" prop="source">
              <el-col>
                <el-select class="w100p" v-model="form.source" placeholder="请选择租客来源">
                  <el-option :key="1" v-for="item in source" :value="item.value" :label="item.name"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :span="24" class="w100p" label="备注" prop="desc">
              <el-input :span="24" autosize class="textarea" placeholder="备注" type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('form')">重 置</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'houseAppoint',
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
    return {
      houtaiName: null,
      // 小管家数据
      houseKeeperData: '',
      options2: [],
      options3: [],
      props: {
        value: 'label',
        children: 'cities'
      },
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      now: Date.now(),
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
          name: '甲方',
          value: 'PATYJ'
        }
      ],
      rentRange: [
        {
          name: '500以下'
        },
        {
          name: '500-1000'
        },
        {
          name: '1000-1500'
        },
        {
          name: '1500-2000'
        },
        {
          name: '2000-3000'
        },
        {
          name: '3000-5000'
        },
        {
          name: '5000以上'
        }
      ],
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 32, message: '请输入正确的姓名', trigger: 'blur' }
        ],
        phone: [
          { type: 'number', required: true, validator: checkphone, trigger: 'blur' }
        ],
        goTime: [
          { type: 'date', required: true, message: '请选择上门时间', trigger: 'change' }
        ],
        // houseRentType: [
        //   { required: true, message: '请选择房源类型', trigger: 'change' }
        // ],
        source: [
          { required: true, message: '请选择租客来源', trigger: 'change' }
        ],
        house: [
          { required: true, message: '请输入房源名称', trigger: 'change' }
        ],
        people: [
          { type: 'array', required: true, message: '请选择销售人员名字', trigger: 'change' }
        ],
        desc: [
          { required: false, message: '请输入备注', trigger: 'blur' }
        ],
        rentRange: [
          { required: true, message: '请输入期望价格区间', trigger: 'change' }
        ]
      },
      // select搜索数据
      options4: [],  // 搜索出来的列表数据
      list: [],
      loading: false,
      states: [],
      houseId: '',
      houseData: ''
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
            this.form.houseKeeperId = keeper[i].cities[j].id
          }
        }
      }
    },
    // 提交预约表单
    submitForm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          // 修改预约
          if (this.form.type === '1') {
            this.$http.post(this.$store.state.rentUrl + 'appointment/update', {
              appointmentId: this.form.appointmentId,  // 预约记录id
              userName: this.form.name, // 用户姓名
              userPhone: this.form.phone, // 电话号码
              houseSpaceId: this.houseId,  // 房源id
              unitId: this.unitId, // 片区id
              appointmentTime: Date.parse(this.form.goTime),  // 上门时间
              memo: this.form.desc, // 备注
              rentRange: this.form.rentRange, // 价格区间
              houseKeeperId: this.form.houseKeeperId,  // 小管家id
              source: this.form.source // 租客来源
            }, {
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(function (res) {
              var data = JSON.parse(JSON.stringify(res.data))
              if (data.code === 200) {
                // 触发预约列表加载事件
                this.$root.appoint.$emit('submitForm', 1)
                this.$message('预约信息修改成功')
                this.houseAppoint.show = false
              } else if (data.code === 10029) {
                this.$message('操作失败')
              } else {
                this.$message('信息填写有误,请检查后提交')
              }
            }, function (res) {
              console.log(res.status)
            })
          } else {
            // 新建预约流程和任务
            // this.$store.commit('getNewWorkflowToken', {'processKey': 'PROCESS-KEY-RENT', 'processTenantId': this.unitId})
            // 新增预约
            this.$http.post(this.$store.state.rentUrl + 'appointment/add', {
              houseSpaceId: this.houseId, // 房源id
              unitId: this.unitId, // 片区id
              userName: this.form.name, // 用户姓名
              userPhone: this.form.phone, // 电话号码
              appointmentTime: Date.parse(this.form.goTime), // 上门时间
              memo: this.form.desc, // 备注信息
              houseKeeperId: this.form.houseKeeperId, // 小管家id
              rentRange: this.form.rentRange, // 价格区间
              source: this.form.source
            }, {
              headers: {
                'Content-Type': 'application/json'
                // 'userid': this.$store.state.currentUser.uid,
                // 'workflowToken': this.$store.state.workflowToken,
                // 'processTenantId': this.unitId,
                // 'processKey': 'PROCESS-KEY-RENT'
              }
            }).then(function (res) {
              var data = JSON.parse(JSON.stringify(res.data))
              if (data.code === 200) {
                // 触发事件
                this.$root.appoint.$emit('submitForm', 1)
                // 添加成功
                this.houseAppoint.show = false
                this.$refs[form].resetFields()
                this.$message('预约信息添加成功')
                // 触发事件刷新任务列表
                this.$root.task.$emit('submitForm', 1)
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
      this.form.house = ''
    },
    // 搜索房源获取houseId
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        // 输入之后调用接口
        this.$http.post(this.$store.state.houseUrl + 'list/houseSpace?token=' + this.$store.state.currentUser.UserToken, {
          keywordAddress: query,
          pageNo: 1,
          pageSize: 9999,
          // rentType: this.form.houseRentType,
          houseSpaceStatus: 'RENTABLE',
          loginId: this.$store.state.currentUser.uid
        }).then(function (response) {
          var data = response.data
          console.log(data)
          if (data.code === 200) {
            var i, j
            for (i = 0; i <= data.data.list.length - 1; i++) {
              for (j = 0; j <= data.data.list[i].resHouseSpaceBeanList.length - 1; j++) {
                this.states.push(data.data.list[i].resHouseSpaceBeanList[j].keywordAddress)
                this.houseId = data.data.list[i].resHouseSpaceBeanList[j].houseSpaceId
                this.unitId = data.data.list[i].zoneId
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
    // 获取小管家列表
    getHousekeeperData () {
      this.$http.get(this.$store.state.accountUrl + 'role/list/f/u/X/' + this.$store.state.currentUser.uid, {
      }).then(function (response) {
        var data = response.data
        if (data.code === 200) {
          for (var i = 0; i <= data.data.length - 1; i++) {
            this.options2[i] = {'label': data.data[i].name, cities: []}
            this.houseKeeperData = data.data[i].users
            for (var j = 0; j <= this.houseKeeperData.length - 1; j++) {
              this.options2[i].cities[j] = {'label': this.houseKeeperData[j].username, id: this.houseKeeperData[j].id, phone: this.houseKeeperData[j].phone}
            }
            this.$store.dispatch('getKeeperData', {'keeperData': JSON.stringify(this.options2)})
          }
        }
      }, function (response) {
        console.log(response.status)
      })
    },
    // 获取销售专员列表
    getHouseData () {
      this.$http.get(this.$store.state.accountUrl + 'role/list/f/u/T/' + this.$store.state.currentUser.uid, {
      }).then(function (response) {
        var data = response.data
        if (data.code === 200) {
          for (var i = 0; i <= data.data.length - 1; i++) {
            this.options3[i] = {'label': data.data[i].name, cities: []}
            this.houseData = data.data[i].users
            for (var j = 0; j <= this.houseData.length - 1; j++) {
              this.options3[i].cities[j] = {'label': this.houseData[j].username, id: this.houseData[j].id, phone: this.houseData[j].phone}
            }
            this.$store.dispatch('getHouseData', {'houseData': JSON.stringify(this.options3)})
          }
        }
      }, function (response) {
        console.log(response.status)
      })
    },
    // 手机号失去焦点后去查
    blur () {
      this.houtaiName = ''
      // 如果手机号正确
      if (/^1[3,4,5,7,8,9]\d{9}$/.test(this.form.phone)) {
        this.$http.get(this.$store.state.accountUrl + 'user/info/p/' + this.form.phone, {
        }).then(function (response) {
          let data = response.data
          if (data.data !== null) {
            this.houtaiName = data.data.username
            this.blurName()
          }
        }, function (response) {
          console.log(response.status)
        })
      }
    },
    // 对比姓名
    blurName () {
      if (this.houtaiName && this.form.name) {
        if (this.houtaiName !== this.form.name) {
          this.$message({
            showClose: true,
            message: '用户信息与系统信息不匹配，请核对后重新输入',
            type: 'error',
            duration: 2000
          })
          this.form.name = ''
        }
      }
    }
  },
  props: ['houseAppoint', 'form'],
  created () {
    this.getHousekeeperData()
    this.getHouseData()
  },
  watch: {
    'form.people': function (val, oldVal) {
      this.changeHouseKeeper(val)
    },
    'form.house': function (val, oldVal) {
      this.remoteMethod(val)
    }
  }
}
</script>
<style scoped>
.w100p{
  width: 100%;
}
.appointForm .el-input, .el-input__inner {
    width: auto!important;
}
</style>














