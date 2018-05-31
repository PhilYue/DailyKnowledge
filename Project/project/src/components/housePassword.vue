<template>
  <!-- 房源门锁密码申请 -->
  <div class="houseDetail housePWD">
    <el-dialog title="密码管理" size="small" :visible.sync="bol" top="20%" @close="close">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <!-- 密码授权 -->
        <el-tab-pane label="密码授权" name="first">
          <el-form inline :model="form" label-width="126px" label-position="right">
            <div v-if="this.houseData.houseList[0].rentType !== 'JOINT_RENT'">
              <el-form-item label="选择门锁" label-width="120px" class='pwdRadio'>
                <!-- <div>{{this.form.houseList}}</div> -->
                <el-radio class="radio" v-model="form.housePosition" :key="index" :label="index" v-for="(list, index) in this.form.houseList">{{list.houseSpaceName | houseSpaceNameFilter}}房间</el-radio>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="密码类型" label-width="120px">
                <el-radio class="radio" v-model="form.pwdType1" key="NORMAL" label="NORMAL" v-if="data.houseSpaceStatus !== 'RENTABLE'">租客密码</el-radio>
                <el-radio class="radio" v-model="form.pwdType1" key="CUSTOM" label="CUSTOM" v-if="role === 0">自定义密码</el-radio>
                <!-- <el-radio class="radio" v-model="form.pwdType1" key="TEMP" label="TEMP">临时密码</el-radio> -->
                <!-- <el-radio class="radio" v-model="form.pwdType" label="DYNAMIC">动态密码</el-radio> -->
                <el-radio class="radio" v-model="form.pwdType1" key="TEMP" label="TEMP">看房密码</el-radio>
                <el-radio class="radio" v-model="form.pwdType1" key="DYNAMIC" label="DYNAMIC">离线密码</el-radio>
              </el-form-item>
            </div>
            <!-- <div v-if="form.pwdType1 === 'NORMAL'">
              <el-form-item label="密码时长" label-width="120px">
                <el-radio class="radio" v-model="form.duration" key="NORMAL" label="NORMAL">合同时间</el-radio>
                <el-radio class="radio" v-model="form.duration" key="CUSTOM" label="CUSTOM">自定义时间</el-radio>
              </el-form-item>
              <<<<<<< HEAD
                          </div>
                          <div v-if="form.duration === 'CUSTOM' && form.pwdType1 === 'NORMAL'">
              =======
            </div> -->
            <div v-if="form.pwdType1 === 'CUSTOM'">
              <el-form-item label="失效时间" label-width="120px">
                <el-date-picker v-model="form.endTime1" type="date"></el-date-picker>
              </el-form-item>
            </div>
            <el-form-item label="授权人姓名" prop="name">
              <!-- <el-input v-model="form.smsPhone"></el-input> -->
              <el-autocomplete
                class="inline-input"
                v-model="form.smsUserName"
                :fetch-suggestions="userQuerySearch"
                :trigger-on-focus="false"
                @select="userSelect"></el-autocomplete>
            </el-form-item>
            <el-form-item label="授权人手机号" prop="phone">
              <el-input v-model="form.smsPhone" :maxlength="11"></el-input>
            </el-form-item>
            <el-form-item class="dialog-footer">
              <!-- <div slot="footer" class="dialog-footer"> -->
                <el-button @click="close">关 闭</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
              <!-- </div> -->
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <!-- 密码记录 -->
        <el-tab-pane label="密码记录" name="second">
          <el-table :data="tableData" border style="width: 625px" empty-text="暂无数据">
            <el-table-column prop="index" label="序号" width="60"></el-table-column>
            <el-table-column prop="pwdTypeChange" label="密码类型" width="100"></el-table-column>
            <el-table-column prop="time" label="有效期" width="183"></el-table-column>
            <el-table-column prop="userName" label="姓名" width="90"></el-table-column>
            <el-table-column prop="userPhone" label="手机号" width="100"></el-table-column>
            <el-table-column label="操作" width="90">
              <template slot-scope="scope">
                <el-button @click="frozen(scope.row)" v-if="scope.row.pwdStatus === 'NORMAL' && role === 0" type="text" size="small">冻结</el-button>
                <el-button @click="thaw(scope.row)" v-if="scope.row.pwdStatus !== 'NORMAL' && role === 0" style="color: rgba(229, 45, 45, 1);" type="text" size="small">解冻</el-button>
                <el-button @click="del(scope.row)" type="text" size="small" v-if="role === 0">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div>
            <el-button v-if="role === 0 && lockId" @click="deleteAll" type="text" size="small" class="deleteAll">删除锁上全部密码</el-button>
            <el-pagination
              layout="total, prev, pager, next"
              :total="pageInfo.pageTotal"
              :current-page.sync="pageInfo.pageNo"
              :page-size="5"
              @current-change="currentChange">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      form: {
        lockType: '',
        pwdType1: 'TEMP',
        smsPhone: '',
        smsUserName: '',
        housePosition: 0,
        duration: 'NORMAL',
        endTime1: ''
        // : false
      },
      pageInfo: {
        pageSize: 5,
        pageNo: 1,
        pageTotal: 0
      },
      show: false,
      false: true,
      value8: '',
      data: {},
      isClick: false,
      activeName: 'first',
      tableData: [],
      str: [],
      index: 0,
      bol: true,
      lockId: null, // Eidt by Mark.
    }
  },
  mounted: function () {
    this.loadHouse()
    this.form.houseList = this.houseData.houseList[0].resHouseSpaceBeanList
    console.log(this.houseData.houseList[0].rentType)
  },
  destroyed: function () {
    // this.form.houseList = []
  },
  props: ['pwData', 'role', 'houseData'],
  methods: {
    loadHouse: function () {
      this.pwdType1 = 'TEMP'
      this.activeName = 'first'
      this.form.pwdType1 = 'TEMP'
      this.form.duration = 'NORMAL'
      this.form.endTime1 = ''
      this.index
      this.str = []
      this.formatForm(this)
      if (this.pwData.rentType === 'JOINT_RENT') {
        this.data = this.pwData
      } else {
        // this.data = this.pwData.resHouseSpaceBeanList[0]
        this.data = this.pwData
        this.data.rentType = this.pwData.rentType
        this.data.userRole = this.pwData.userRole
      }
      if (this.pwData.rentType === 'JOINT_RENT') {
        this.form.lockType = 'JOINT_RENT'
        this.form.houseId = this.data.houseSpaceId
        // this.form.houseId = this.data.houseSpaceManagerId
      } else {
        // this.form.houseId = this.data.houseSpaceManagerId // Edit by Mark.
        this.form.houseId = this.data.houseSpaceId
      }
      this.form.houseName = this.data.keywordAddressGeographic
      this.form.opUserName = this.$store.state.currentUser.username
      this.form.endTime1 = ''
      this.form.opUserId = this.$store.state.currentUser.uid
      if (this.data.houseSpaceStatus === 'RENTABLE') {
        this.form.smsPhone = this.$store.state.currentUser.UserPhone
        this.form.smsUserName = this.$store.state.currentUser.username
      } else {
        this.form.smsPhone = this.data.tenantPhone
        this.form.smsUserName = this.data.tenantName
        let list = {}
        list.contractType = 'RENT'
        list.houseSpaceId = this.data.houseSpaceId
        list.loginId = this.$store.state.currentUser.uid
        let url = this.$store.state.contractUrl + 'list'
        this.$http.post(url, list).then(function (res) {
          if (res.body.code === 200) {
            for (let i = 0; i < res.body.data.list.length; i++) {
              if (res.body.data.list[i].contractStatus === 'ALSIGN' || res.body.data.list[i].contractStatus === 'EFFECT' || res.body.data.list[i].contractStatus === 'TOAUDIT') {
                this.form.beginTime = res.body.data.list[i].startTime
                this.form.endTime = res.body.data.list[i].endTime
                // console.log(this.pwData)
                // console.log(this.data)
                // console.log(this.form)
              }
            }
          }
        })
      }
      this.pageInfo.pageNo = 1
      this.pageInfo.pageTotal = 0
    },
    submitForm: function () {
      if (!this.isClick) {
        this.isClick = true
        let time = new Date()

        // 如果当前选中的是公共锁
        if (this.form.lockType === 'ENTIRE_RENT') {
          this.form.houseId = this.data.houseSpaceManagerId
          // 那么houseID就是houseSpaceManagerId
          if (this.pwData.rentType === 'JOINT_RENT') {
            // 如果当前出租方式是合租，那么houseName就是keywordAddressManagerGeographic
            this.form.houseName = this.data.keywordAddressManagerGeographic
          } else {
            // 如果当前出租方式是整租，那么houseName就是keywordAddress
            this.form.houseName = this.data.keywordAddress
          }
        }
        if (time.getTime() > this.form.beginTime) {
          this.form.beginTime = time.getTime()
        }
        if (this.form.pwdType1 === 'TEMP') {
          // 如果密码类型是临时密码，计算时间，当前时间+1h
          this.form.endTime = time.getTime() + 1 * 60 * 1000
        } else if (this.form.pwdType1 === 'DYNAMIC') {
          // 如果密码类型是动态密码或是离线密码，计算时间，当前时间+1h
          this.form.endTime = time.getTime() + 1 * 60 * 60 * 1000
        }

        if (this.form.pwdType1 === 'CUSTOM') {
          // 如果选择自定义时间，那么失效时间就是选择的时间，且将传递的数据的pwdType 改为CUSTOM
          if (this.form.endTime1 === null || this.form.endTime1 === '') {
            this.$message({
              message: '请选择失效时间',
              type: 'error'
            })
            this.isClick = false
          } else {
            // console.log(this.form.endTime1.getFullYear() + '-' + (this.form.endTime1.getMonth() + 1) + '-' + this.form.endTime1.getDate() + ' 23:59:59')
            let time1 = this.form.endTime1.getFullYear() + '-' + (this.form.endTime1.getMonth() + 1) + '-' + this.form.endTime1.getDate() + ' 23:59:59'
            this.form.endTime = new Date(time1).getTime()
            // 以下为数据验证
            if (this.form.smsUserName === '' || this.form.smsUserName === null) {
              this.$message({
                message: '请填写授权人姓名',
                type: 'error'
              })
              this.isClick = false
            } else if (this.form.smsPhone === '' || this.form.smsPhone === null) {
              this.$message({
                message: '请填写授权人手机号',
                type: 'error'
              })
              this.isClick = false
            } else {

              if (this.form.housePosition === 'ALL') {
                // 如果房间是全租，切选择发送全部密码
                // let list = {}
                // 暂时不考虑大房间的密码
                // list.houseSpaceId = this.form.houseId
                // list.keywordAddress = this.form.houseName
                // this.form.houseList.unshift(list)
                // 如果选择自定义结束时间
                //
                for (let i in this.form.houseList) {
                  let data = {}
                  data = this.form.houseList[i]
                  data.houseId = this.form.houseList[i].houseSpaceId
                  data.houseName = this.form.houseList[i].keywordAddressGeographic
                  data.endTime = this.form.endTime
                  data.lockType = this.form.lockType
                  data.opUserId = this.form.opUserId
                  data.opUserName = this.form.opUserName
                  data.pwdType = 'CUSTOM'
                  data.smsPhone = this.form.smsPhone
                  data.smsUserName = this.form.smsUserName
                  this.sendReq(data, i, this)
                  // console.log(data)
                }
                // console.log('全部密码')
              } else if (this.form.housePosition === 'ENTIRE_RENT') {
                // 如果是全租，且选择公共锁  目前不考虑
                let data = {}
                data = this.form.houseList[0]
                data.houseId = this.form.houseList[0].houseSpaceId
                data.houseName = this.form.houseList[0].keywordAddressGeographic
                data.endTime = this.form.endTime
                data.lockType = this.form.lockType
                data.opUserId = this.form.opUserId
                data.opUserName = this.form.opUserName
                data.pwdType = this.form.pwdType1
                data.smsPhone = this.form.smsPhone
                data.smsUserName = this.form.smsUserName
                this.sendReq(data, 0, this)
              } else {
                // 如果是非全租
                let data = {}
                data = this.form
                data.pwdType = 'CUSTOM'
                this.sendReq(data, 0, this)
              }
              // console.log(this.form.houseList)
              // }
            }
          }
        } else if (this.form.pwdType1 === 'NORMAL') {
          // 如果密码类型是租客密码
          if (this.form.smsUserName === '' || this.form.smsUserName === null) {
            this.$message({
              message: '请填写授权人姓名',
              type: 'error'
            })
            this.isClick = false
          } else if (this.form.smsPhone === '' || this.form.smsPhone === null) {
            this.$message({
              message: '请填写授权人手机号',
              type: 'error'
            })
            this.isClick = false
          } else {

            if (this.form.housePosition === 'ALL') {
              // 如果房间是全租，切选择发送全部密码
              // let list = {}
              // 暂时不考虑大房间的密码
              // list.houseSpaceId = this.form.houseId
              // list.keywordAddress = this.form.houseName
              // this.form.houseList.unshift(list)
              // 如果没有选择自定义时间
              for (let i in this.form.houseList) {
                let data = {}
                data = this.form.houseList[i]
                data.houseId = this.form.houseList[i].houseSpaceId
                data.houseName = this.form.houseList[i].keywordAddressGeographic
                data.endTime = this.form.endTime
                data.lockType = this.form.lockType
                data.opUserId = this.form.opUserId
                data.opUserName = this.form.opUserName
                data.pwdType = 'NORMAL'
                data.smsPhone = this.form.smsPhone
                data.smsUserName = this.form.smsUserName
                this.sendReq(data, i, this)
                // console.log(data)
              }
              // console.log('全部密码')
            } else if (this.form.housePosition === 'ENTIRE_RENT') {
              // 如果是全租，且选择公共锁  目前不考虑
              let data = {}
              data = this.form.houseList[0]
              data.houseId = this.form.houseList[0].houseSpaceId
              data.houseName = this.form.houseList[0].keywordAddressGeographic
              data.endTime = this.form.endTime
              data.lockType = this.form.lockType
              data.opUserId = this.form.opUserId
              data.opUserName = this.form.opUserName
              data.pwdType = 'NORMAL'
              data.smsPhone = this.form.smsPhone
              data.smsUserName = this.form.smsUserName
              this.sendReq(data, 0, this)
            } else {
              let data = {}
              // 如果是非全租
              data = this.form
              data.pwdType = 'NORMAL'
              this.sendReq(data, 0, this)
            }
            // console.log(this.form.houseList)
            // }
          }
        } else {
          // 否则
          if (this.form.smsUserName === '' || this.form.smsUserName === null) {
            this.$message({
              message: '请填写授权人姓名',
              type: 'error'
            })
            this.isClick = false
          } else if (this.form.smsPhone === '' || this.form.smsPhone === null) {
            this.$message({
              message: '请填写授权人手机号',
              type: 'error'
            })
            this.isClick = false
          } else {

            if (this.form.housePosition === 'ALL') {
              // 如果房间是全租，切选择发送全部密码
              // let list = {}
              // 暂时不考虑大房间的密码
              // list.houseSpaceId = this.form.houseId
              // list.keywordAddress = this.form.houseName
              // this.form.houseList.unshift(list)
              // 如果没有选择自定义时间
              for (let i in this.form.houseList) {
                let data = {}
                data = this.form.houseList[i]
                data.houseId = this.form.houseList[i].houseSpaceId
                data.houseName = this.form.houseList[i].keywordAddressGeographic
                data.endTime = this.form.endTime
                data.lockType = this.form.lockType
                data.opUserId = this.form.opUserId
                data.opUserName = this.form.opUserName
                data.pwdType = this.form.pwdType1
                data.smsPhone = this.form.smsPhone
                data.smsUserName = this.form.smsUserName
                this.sendReq(data, i, this)
                // console.log(data)
              }
              // console.log('全部密码')
            } else if (this.form.housePosition === 'ENTIRE_RENT') {
              // 如果是全租，且选择公共锁  目前不考虑
              let data = {}
              data = this.form.houseList[0]
              data.houseId = this.form.houseList[0].houseSpaceId
              data.houseName = this.form.houseList[0].keywordAddressGeographic
              data.endTime = this.form.endTime
              data.lockType = this.form.lockType
              data.opUserId = this.form.opUserId
              data.opUserName = this.form.opUserName
              data.pwdType = this.form.pwdType1
              data.smsPhone = this.form.smsPhone
              data.smsUserName = this.form.smsUserName
              this.sendReq(data, 0, this)
            } else {
              let data = {}
              // 如果是非全租
              data = this.form
              data.pwdType = this.form.pwdType1
              this.sendReq(data, 0, this)
            }
            // console.log(this.form.houseList)
            // }
          }
        }
      } else {
        this.$message({
          message: '密码申请成功。',
          type: 'success'
        })
      }
    },
    sendReq (req, index, _this) {
      const h = _this.$createElement
      let url = _this.$store.state.lockUrl + 'sendpwd'
      _this.$http.post(url, req).then((res) => {
        _this.index++
        if (_this.form.housePosition === 'ALL') {
          if (res.body.code === 200) {
            if (this.form.pwdType1 === 'DYNAMIC') {
              // _this.str += _this.form.houseList[index].keywordAddress + ':动态密码为：' + res.body.data + '<br>'
              _this.str[index] = h('p', { style: 'margin-bottom: 10px' }, _this.form.houseList[index].keywordAddress + ':离线密码为：' + res.body.data)
            } else if (this.form.pwdType1 === 'CUSTOM') {
              // _this.str += _this.form.houseList[index].keywordAddress + ':动态密码为：' + res.body.data + '<br>'
              _this.str[index] = h('p', { style: 'margin-bottom: 10px' }, _this.form.houseList[index].keywordAddress + ':动态密码为：' + res.body.data)
            } else {
              // _this.str += _this.form.houseList[index].keywordAddress + ':密码申请成功。' + '<br>'
              _this.str[index] = h('p', { style: 'margin-bottom: 10px' }, _this.form.houseList[index].keywordAddress + ':密码申请成功。')
            }
          } else if (res.body.code === 10027) {
            // _this.str += _this.form.houseList[index].keywordAddress + ':密码短信发送失败，请联系相关技术人员。' + '<br>'
            _this.str[index] = h('p', { style: 'margin-bottom: 10px' }, _this.form.houseList[index].keywordAddress + ':密码短信发送失败，请联系相关技术人员。')
          } else if (res.body.code === 10032) {
            // _this.str += _this.form.houseList[index].keywordAddress + ':请确认该房间是否有智能门锁。' + '<br>'
            _this.str[index] = h('p', { style: 'margin-bottom: 10px' }, _this.form.houseList[index].keywordAddress + ':请确认该房间是否有智能门锁。')
          } else if (res.body.code === 10019) {
            // _this.str += _this.form.houseList[index].keywordAddress + ':' + res.body.message + '<br>'
            _this.str[index] = h('p', { style: 'margin-bottom: 10px' }, _this.form.houseList[index].keywordAddress + ':' + res.body.message)
          } else if (res.body.code === 10001 || res.body.code === 10017) {
            // _this.str += _this.form.houseList[index].keywordAddress + ':' + res.body.message + '<br>'
            _this.str[index] = h('p', { style: 'margin-bottom: 10px' }, _this.form.houseList[index].keywordAddress + ':' + res.body.message)
          } else {
            // _this.str += _this.form.houseList[index].keywordAddress + ':密码申请失败，请重试。' + '<br>'
            _this.str[index] = h('p', { style: 'margin-bottom: 10px' }, _this.form.houseList[index].keywordAddress + ':密码申请失败，请重试。')
          }
          if (_this.index === _this.form.houseList.length) {
            _this.$msgbox({
              title: '消息',
              message: h('p', null, _this.str),
              confirmButtonText: '确定',
              type: 'success'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '申请结束!'
              })
              _this.index = 0
              _this.$emit('closePw')
            })
          }
        } else {
          if (res.body.code === 200) {
            if (this.form.pwdType1 === 'DYNAMIC') {
              this.$confirm('离线密码为：' + res.body.data, '提示', {
                confirmButtonText: '确定',
                type: 'success'
              })
            } else if (this.form.pwdType1 === 'CUSTOM') {
              this.$confirm('自定义密码为：' + res.body.data, '提示', {
                confirmButtonText: '确定',
                type: 'success'
              })
            } else if (this.form.pwdType1 === 'TEMP') {
              this.$confirm('看房密码为：' + res.body.data, '提示', {
                confirmButtonText: '确定',
                type: 'success'
              })
            } else {
              this.$message({
                message: '密码申请成功。',
                type: 'success'
              })
            }
            this.$emit('closePw')
          } else if (res.body.code === 10027) {
            this.$message({
              message: '短信发送失败，请联系相关技术人员。',
              type: 'error'
            })
          } else if (res.body.code === 10032) {
            this.$message({
              message: '请确认该门是否有智能门锁。',
              type: 'error'
            })
          } else if (res.body.code === 10019) {
            this.$message({
              message: res.body.message,
              type: 'error'
            })
          } else if (res.body.code === 10001 || res.body.code === 10017) {
            this.$message({
              message: res.body.message,
              type: 'error'
            })
          } else {
            this.$message({
              message: '密码申请失败，请重试。',
              type: 'error'
            })
          }
          _this.index = 0
        }
        _this.isClick = false
        // res.body.index = index
      }, (res1) => {
        _this.isClick = false
        return false
      })
    },
    userQuerySearch: function (queryString, cb) {
      if (queryString) {
        let dataList = {}
        // dataList.userType = 'P'
        dataList.username = queryString
        let url = this.$store.state.accountUrl + 'user/list'
        this.$http.post(url, dataList).then(({data}) => {
          let option = []
          if (data.code === 200) {
            var data1 = data.data.list
            var op = {}
            for (let i = 0; i < data1.length; i++) {
              if (data1[i].username === '' || data1[i].username === null || typeof (data1[i].username) === 'undefined') {
              } else {
                op = {}
                op.id = data1[i].id
                op.phone = data1[i].phone
                op.sex = data1[i].sex
                op.value = data1[i].username
                option.push(op)
              }
            }
          } else {
            option = []
          }
          var restaurants = option
          var results = restaurants
          var result = []
          for (let i = 0; i < results.length && i < 10; i++) {
            result[i] = results[i]
          }
          // 调用 callback 返回建议列表的数据
          cb(result)
        })
      }
    },
    userSelect: function (item) {
      this.form.smsPhone = item.phone
    },
    close: function () {
      this.$emit('closePw')
    },
    handleClick (tab, event) {
      if (tab.name === 'second') {
        const roomIndex = this.form.housePosition
        let houseId = this.form.houseList.length ? this.form.houseList[roomIndex].houseSpaceId : this.form.houseId

        this.pageInfo.pageNo = 1
        let recordReq = {}
        // Edit by Mark.
        recordReq.houseId = houseId // this.form.houseId
        recordReq.pageSize = 5
        recordReq.pageNo = 1
        recordReq.houseName = this.form.houseName
        // recordReq.opTime =
        recordReq.opUserId = this.form.opUserId
        recordReq.opUserName = this.form.opUserName
        recordReq.loginId = this.$store.state.currentUser.uid

        const requestLockId = (houseId) => {
          const url = this.$store.state.lockUrl + 'searchOnelock'
          return this.$http.post(url, houseId)
        }

        requestLockId(this.form.houseId).then(res => {
          // debugger
          if (res.body.code === 200 && res.body.data) {
            this.lockId = res.body.data
          } else {
            this.$message.error('未能查找到有效门锁')
          }

          this.record(this, recordReq)
        })
      }
    },
    formatForm (_this) {
      _this.form.lockType = ''
      _this.form.pwdType = 'TEMP'
      _this.form.smsPhone = ''
      _this.form.smsUserName = ''
      _this.form.housePosition = 0
    },
    frozen (data) {
      let url = this.$store.state.lockUrl + 'frozen'
      let req = {}
      req.frozen = true
      req.lockId = data.lockId
      req.pwdid = data.pwdId
      req.houseId = this.form.houseId
      req.opUserName = this.form.opUserName
      req.houseId = this.form.houseId
      req.houseName = this.form.houseName
      this.$http.post(url, req).then(res => {
        if (res.body.code === 200) {
          this.$message({
            message: '密码冻结成功。',
            type: 'success'
          })
          let recordReq = {}
          recordReq.houseId = this.form.houseId
          recordReq.pageSize = 5
          recordReq.pageNo = this.pageInfo.pageNo
          recordReq.houseName = this.form.houseName
          // recordReq.opTime =
          recordReq.opUserId = this.form.opUserId
          recordReq.opUserName = this.form.opUserName
          recordReq.loginId = this.$store.state.currentUser.uid
          this.record(this, recordReq)
        } else if (res.body.code === 10001) {
          this.$message({
            message: '系统有误，请联系相关人员。',
            type: 'error'
          })
        } else {
          this.$message({
            message: '密码冻结失败。',
            type: 'error'
          })
        }
      })
    },
    thaw (data) {
      let url = this.$store.state.lockUrl + 'frozen'
      let req = {}
      req.frozen = false
      req.lockId = data.lockId
      req.pwdid = data.pwdId
      req.opUserId = this.form.opUserId
      req.opUserName = this.form.opUserName
      req.houseId = this.form.houseId
      req.houseName = this.form.houseName
      this.$http.post(url, req).then(res => {
        if (res.body.code === 200) {
          this.$message({
            message: '密码解冻成功。',
            type: 'success'
          })
          let recordReq = {}
          recordReq.houseId = this.form.houseId
          recordReq.pageSize = 5
          recordReq.pageNo = this.pageInfo.pageNo
          recordReq.houseName = this.form.houseName
          // recordReq.opTime =
          recordReq.opUserId = this.form.opUserId
          recordReq.opUserName = this.form.opUserName
          recordReq.loginId = this.$store.state.currentUser.uid
          this.record(this, recordReq)
        } else if (res.body.code === 10001) {
          this.$message({
            message: '系统有误，请联系相关人员。',
            type: 'error'
          })
        } else {
          this.$message({
            message: '密码解冻失败。',
            type: 'error'
          })
        }
      })
    },
    del (data) {
      let url = this.$store.state.lockUrl + 'del'
      // let url = this.$store.state.lockUrl + 'del'
      let req = {}
      req.lockId = data.lockId
      req.loginId = this.$store.state.currentUser.uid
      req.pwdId = data.pwdId
      req.pwdIndex = data.pwdIndex
      req.pid = data.pid
      req.type = 'ONE'
      this.$http.post(url, req).then(res => {
        if (res.body.code === 200) {
          this.$message({
            message: '删除成功。',
            type: 'success'
          })
          let recordReq = {}
          recordReq.houseId = this.form.houseId
          recordReq.pageSize = 5
          recordReq.pageNo = this.pageInfo.pageNo
          recordReq.houseName = this.form.houseName
          // recordReq.opTime =
          recordReq.opUserId = this.form.opUserId
          recordReq.opUserName = this.form.opUserName
          recordReq.loginId = this.$store.state.currentUser.uid
          this.record(this, recordReq)
        }
      })
    },
    deleteAll () {
      const { lockId } = this
      if (lockId) {
        let url = this.$store.state.lockUrl + 'del'
        let req = {
          lockId,
          loginId: this.$store.state.currentUser.uid,
          type: 'ALL',
        }
        this.$http.post(url, req).then(res => {
          if (res.body.code === 200) {
            this.$message({
              message: '删除成功。',
              type: 'success'
            })
            let recordReq = {}
            recordReq.houseId = this.form.houseId
            recordReq.pageSize = 5
            recordReq.pageNo = this.pageInfo.pageNo
            recordReq.houseName = this.form.houseName
            // recordReq.opTime =
            recordReq.opUserId = this.form.opUserId
            recordReq.opUserName = this.form.opUserName
            recordReq.loginId = this.$store.state.currentUser.uid
            this.record(this, recordReq)
          } else if (res.body.code === 10015) {
            this.$message({
              message: '您操作次数过于频繁，请稍后重新操作。',
              type: 'warning'
            })
            let recordReq = {}
            recordReq.houseId = this.form.houseId
            recordReq.pageSize = 5
            recordReq.pageNo = this.pageInfo.pageNo
            recordReq.houseName = this.form.houseName
            // recordReq.opTime =
            recordReq.opUserId = this.form.opUserId
            recordReq.opUserName = this.form.opUserName
            recordReq.loginId = this.$store.state.currentUser.uid
            this.record(this, recordReq)
          } else {
            this.$message.error(res.body.message)
          }
        })
      } else {
        this.$message.error('无可删密码的门锁。')
      }
    },
    record (_this, req) {
      _this.tableData = []
      let url = _this.$store.state.lockUrl + 'list/pwd'
      _this.$http.post(url, req).then(res => {
        if (res.body.code === 200) {
          _this.pageInfo.pageTotal = res.body.data.totalCount
          for (let i = 0; i < res.body.data.list.length; i++) {
            res.body.data.list[i].index = (req.pageNo - 1) * req.pageSize + i + 1
            switch (res.body.data.list[i].pwdType) {
              case 'TEMP':
                res.body.data.list[i].pwdTypeChange = '看房密码'
                break
              case 'NORMAL':
                res.body.data.list[i].pwdTypeChange = '租客密码'
                break
              case 'DYNAMIC':
                res.body.data.list[i].pwdTypeChange = '动态密码'
                break
              case 'CUSTOM':
                res.body.data.list[i].pwdTypeChange = '自定义密码'
                break
            }
            let start = new Date(res.body.data.list[i].beginTime)
            let end = new Date(res.body.data.list[i].endTime)
            res.body.data.list[i].time = start.getFullYear() + '/' + (start.getMonth() + 1) + '/' + start.getDate() + ' - ' + end.getFullYear() + '/' + (end.getMonth() + 1) + '/' + end.getDate()
            // res.body.data[i].end = end.getFullYear() + '/' + (end.getMonth() + 1) + '/' + end.getDate()
          }
          _this.tableData = res.body.data.list
        }
      })
    },
    currentChange (data) {
      this.pageInfo.pageNo = data
      let recordReq = {}
      recordReq.houseId = this.form.houseId
      recordReq.pageSize = 5
      recordReq.pageNo = data
      recordReq.loginId = this.$store.state.currentUser.uid
      this.record(this, recordReq)
    }
  },
  // 过滤器
  filters: {
    houseSpaceNameFilter: function (value) {
      if (!value) {
        return '外门锁'
      } else {
        return value
      }
    }
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
  padding-right: 22px;
  width: 603px;
  /*text-align: center;*/
}
.el-pagination{
  text-align: right;
  margin-top: 22px;
  float: right;
}
.el-table tr:hover{
  background: #fff;
}
.el-table .el-table__row:hover{
  background: #fff;
}
.deleteAll{
  margin-top: 22px;
}
</style>