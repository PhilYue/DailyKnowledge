<template>
  <!-- 房源门锁密码申请 -->
  <div class="houseDetail housePWD">
    <el-dialog title="密码管理" :visible.sync="visible" size="small" top="20%" @close="emitClose">
      <el-tabs v-model="activeName" type="card" @tab-click="handleTabClick">
        <!-- 密码授权 -->
        <el-tab-pane label="密码授权" name="first">
          <el-form inline :model="form" label-width="126px" label-position="right">
            <div v-if="resHouseSpaceBeanList.length">
              <el-form-item label="选择门锁" label-width="120px" class='pwdRadio'>
                <el-radio class="radio" v-model="form.houseId" :key="resHouseSpaceBeanList[0].houseSpaceId" :label="resHouseSpaceBeanList[0].houseSpaceId">外门锁密码</el-radio>
                <el-radio class="radio" v-model="form.houseId" :key="houseSpace.houseSpaceId" :label="houseSpace.houseSpaceId" v-for="(houseSpace, index) in resHouseSpaceBeanList.slice(1, resHouseSpaceBeanList.length)">{{houseSpace.houseSpaceName}}房间</el-radio>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="密码类型" label-width="120px">
                <el-radio class="radio" v-model="form.pwdType" key="NORMAL" label="NORMAL" v-if="data.houseSpaceStatus !== 'RENTABLE'">租客密码</el-radio>
                <el-radio class="radio" v-model="form.pwdType" key="CUSTOM" label="CUSTOM" v-if="role === 0">自定义密码</el-radio>
                <el-radio class="radio" v-model="form.pwdType" key="TEMP" label="TEMP">看房密码</el-radio>
                <el-radio class="radio" v-model="form.pwdType" key="DYNAMIC" label="DYNAMIC">离线密码</el-radio>
              </el-form-item>
            </div>
            <div v-if="form.pwdType === 'CUSTOM'">
              <el-form-item label="失效时间" label-width="120px">
                <el-date-picker v-model="form.endTime1" type="date"></el-date-picker>
              </el-form-item>
            </div>
            <el-form-item label="授权人姓名" prop="name">
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
                <el-button @click="emitClose">关 闭</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <!-- 密码记录 -->
        <el-tab-pane label="密码记录" name="second">
          <el-table :data="tableData" border style="width: 625px" empty-text="暂无数据">
            <el-table-column prop="index" label="序号" width="60"></el-table-column>
            <el-table-column prop="pwdType" :formatter="pwdType" label="密码类型" width="100"></el-table-column>
            <el-table-column prop="duration" label="有效期" width="183"></el-table-column>
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
              @current-change="currentChange"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>
<script>
import { api } from '@/xhr'
import { pwdType } from '@/filters'
import moment from 'moment'

export default {
  props: {
    context: Object,
    role: Number,
    roomIndex: Number,
  },

  data: function () {
    return {
      form: {
        pwdType: 'TEMP',
        smsPhone: '',
        smsUserName: '',
        housePosition: 0,
        houseId: this.context.houseSpaceId,
        houseName: this.context.keywordAddressGeographic,
        opUserId: this.$store.state.currentUser.uid
      },
      pageInfo: {
        pageSize: 5,
        pageNo: 1,
        pageTotal: 0
      },
      false: true,
      value8: '',
      data: {},

      requesting: false,
      activeName: 'first',
      tableData: [],
      str: [],
      index: 0,

      visible: true, // 可见 - 内部控制 - 点击模态框
      lockId: null, // 锁

      resHouseSpaceBeanList: [], // 子房间
    }
  },

  created () {
    const initForm = (context) => {
      this.form.smsUserName = context.tenantName
      this.form.smsPhone = context.tenantPhone
    }

    initForm(this.context)

    const loadHouseSpace = (houseSpaceManagerId) => {
      const url = this.urljoin(this.urlList.house, 'list/houseSpace')
      this.$http.post(url, {
        houseSpaceManagerId,
        loginId: this.getUid(),
        transformType: 'ALL'
      }).then(res => {
        if (res.body.code === 200) {
          this.resHouseSpaceBeanList = res.body.data.list[0].resHouseSpaceBeanList
        }
      })
    }

    loadHouseSpace(this.context.houseSpaceManagerId)
  },

  methods: {
    
    submitForm: function () {
      if (!this.requesting) return
      
      console.log(this.form)

      let time = new Date()
      if (time.getTime() > this.form.beginTime) {
        this.form.beginTime = time.getTime()
      }
      if (this.form.pwdType === 'TEMP') {
        // 如果密码类型是临时密码，计算时间，当前时间+1h
        this.form.endTime = time.getTime() + 1 * 60 * 1000
      } else if (this.form.pwdType === 'DYNAMIC') {
        // 如果密码类型是动态密码或是离线密码，计算时间，当前时间+1h
        this.form.endTime = time.getTime() + 1 * 60 * 60 * 1000
      }

      // 自定义密码
      if (this.form.pwdType === 'CUSTOM') {
        // 如果选择自定义时间，那么失效时间就是选择的时间，且将传递的数据的pwdType 改为CUSTOM
        if (this.form.endTime1 === null || this.form.endTime1 === '') {
          this.$message({
            message: '请选择失效时间',
            type: 'error'
          })
          this.requesting = false
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
            this.requesting = false
          } else if (this.form.smsPhone === '' || this.form.smsPhone === null) {
            this.$message({
              message: '请填写授权人手机号',
              type: 'error'
            })
            this.requesting = false
          } else {
            if (this.form.transform && this.form.housePosition === 'ALL') {
              // 如果房间是全租，切选择发送全部密码
              // let list = {}
              // 暂时不考虑大房间的密码
              // list.houseSpaceId = this.form.houseId
              // list.keywordAddress = this.form.houseName
              // this.form.houseList.unshift(list)
              // 如果选择自定义结束时间
              //
              for (let i in this.form.houseList) {
                let data = {
                  ...this.form.houseList[i],
                  houseId: this.form.houseList[i].houseSpaceId,
                  houseName: this.form.houseList[i].keywordAddressGeographic,
                  endTime: this.form.endTime,
                  opUserId: this.form.opUserId,
                  opUserName: this.form.opUserName,
                  pwdType: 'CUSTOM',
                  smsPhone: this.form.smsPhone,
                  smsUserName: this.form.smsUserName,
                }
                this.sendReq(data, i)
              }
            } else if (this.form.transform && this.form.housePosition === 'ENTIRE_RENT') {
              // 如果是全租，且选择公共锁  目前不考虑
              let data = {}
              data = this.form.houseList[0]
              data.houseId = this.form.houseList[0].houseSpaceId
              data.houseName = this.form.houseList[0].keywordAddressGeographic
              data.endTime = this.form.endTime
              data.opUserId = this.form.opUserId
              data.opUserName = this.form.opUserName
              data.pwdType = this.form.pwdType
              data.smsPhone = this.form.smsPhone
              data.smsUserName = this.form.smsUserName
              this.sendReq(data, 0)
            } else if (this.form.transform) {
              // 如果是全租，且选择的是任意房间的锁
              let num = parseInt(this.form.housePosition)
              let data = {
                ...this.form.houseList[num],
                houseId: this.form.houseList[num].houseSpaceId,
                houseName: this.form.houseList[num].keywordAddressGeographic,
                endTime: this.form.endTime,
                opUserId: this.form.opUserId,
                opUserName: this.form.opUserName,
                pwdType: 'CUSTOM',
                smsPhone: this.form.smsPhone,
                smsUserName: this.form.smsUserName,
              }
              this.sendReq(data, num)
            } else {
              // 如果是非全租
              let data = {}
              data = this.form
              data.pwdType = 'CUSTOM'
              this.sendReq(data, 0)
            }
          }
        }
      } else if (this.form.pwdType === 'NORMAL') {
        // 如果密码类型是租客密码
        if (this.form.smsUserName === '' || this.form.smsUserName === null) {
          this.$message({
            message: '请填写授权人姓名',
            type: 'error'
          })
          this.requesting = false
        } else if (this.form.smsPhone === '' || this.form.smsPhone === null) {
          this.$message({
            message: '请填写授权人手机号',
            type: 'error'
          })
          this.requesting = false
        } else {
          // this.sendReq(this.form)
          console.log(this.form.transform && this.form.housePosition === 'ALL')

          if (this.form.transform && this.form.housePosition === 'ALL') {
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
              data.opUserId = this.form.opUserId
              data.opUserName = this.form.opUserName
              data.pwdType = 'NORMAL'
              data.smsPhone = this.form.smsPhone
              data.smsUserName = this.form.smsUserName
              this.sendReq(data, i)
              // console.log(data)
            }
            // console.log('全部密码')
          } else if (this.form.transform && this.form.housePosition === 'ENTIRE_RENT') {
            // 如果是全租，且选择公共锁  目前不考虑
            let data = {}
            data = this.form.houseList[0]
            data.houseId = this.form.houseList[0].houseSpaceId
            data.houseName = this.form.houseList[0].keywordAddressGeographic
            data.endTime = this.form.endTime
            data.opUserId = this.form.opUserId
            data.opUserName = this.form.opUserName
            data.pwdType = 'NORMAL'
            data.smsPhone = this.form.smsPhone
            data.smsUserName = this.form.smsUserName
            this.sendReq(data, 0)
          } else if (this.form.transform) {
            // 如果是全租，且选择的是任意房间的锁
            let num = parseInt(this.form.housePosition)
            let data = {}
            data = this.form.houseList[num]
            data.houseId = this.form.houseList[num].houseSpaceId
            data.houseName = this.form.houseList[num].keywordAddressGeographic
            data.endTime = this.form.endTime
            data.opUserId = this.form.opUserId
            data.opUserName = this.form.opUserName
            data.pwdType = 'NORMAL'
            data.smsPhone = this.form.smsPhone
            data.smsUserName = this.form.smsUserName
            this.sendReq(data, num)
          } else {
            let data = {}
            // 如果是非全租
            data = this.form
            data.pwdType = 'NORMAL'
            this.sendReq(data, 0)
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
          this.requesting = false
        } else if (this.form.smsPhone === '' || this.form.smsPhone === null) {
          this.$message({
            message: '请填写授权人手机号',
            type: 'error'
          })
          this.requesting = false
        } else {
          // this.sendReq(this.form)
          console.log(this.form.transform && this.form.housePosition === 'ALL')

          if (this.form.transform && this.form.housePosition === 'ALL') {
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
              data.opUserId = this.form.opUserId
              data.opUserName = this.form.opUserName
              data.pwdType = this.form.pwdType
              data.smsPhone = this.form.smsPhone
              data.smsUserName = this.form.smsUserName
              this.sendReq(data, i)
              // console.log(data)
            }
            // console.log('全部密码')
          } else if (this.form.transform && this.form.housePosition === 'ENTIRE_RENT') {
            // 如果是全租，且选择公共锁  目前不考虑
            let data = {}
            data = this.form.houseList[0]
            data.houseId = this.form.houseList[0].houseSpaceId
            data.houseName = this.form.houseList[0].keywordAddressGeographic
            data.endTime = this.form.endTime
            data.opUserId = this.form.opUserId
            data.opUserName = this.form.opUserName
            data.pwdType = this.form.pwdType
            data.smsPhone = this.form.smsPhone
            data.smsUserName = this.form.smsUserName
            this.sendReq(data, 0)
          } else if (this.form.transform) {
            // 如果是全租，且选择的是任意房间的锁
            let num = parseInt(this.form.housePosition)
            let data = {}
            data = this.form.houseList[num]
            data.houseId = this.form.houseList[num].houseSpaceId
            data.houseName = this.form.houseList[num].keywordAddressGeographic
            data.endTime = this.form.endTime
            data.opUserId = this.form.opUserId
            data.opUserName = this.form.opUserName
            data.pwdType = this.form.pwdType
            data.smsPhone = this.form.smsPhone
            data.smsUserName = this.form.smsUserName
            this.sendReq(data, num)
          } else {
            let data = {}
            // 如果是非全租
            data = this.form
            data.pwdType = this.form.pwdType
            this.sendReq(data, 0)
          }
          // console.log(this.form.houseList)
          // }
        }
      }
    },

    sendReq (req, index) {
      const h = this.$createElement

      const setSuccessMsg = (type, pwd) => {
        let str = ''
        if (type === 'DYNAMIC') {
          str = ':离线密码为：' + pwd
        } else if (type === 'CUSTOM') {
          str = ':动态密码为：' + pwd
        } else {
          str = ':密码申请成功。'
        }

        this.str[index] = h('p', { style: 'margin-bottom: 10px' }, this.form.houseList[index].keywordAddress + str)
      }

      const setErrorMsg = (statusCode, msg) => {
        const dict = {
          10027: ':密码短信发送失败，请联系相关技术人员。',
          10032: ':请确认该房间是否有智能门锁。',
          10019: msg,
          10001: msg,
          10017: msg,
        }

        var _msg = dict[statusCode] || ':密码申请失败，请重试。'
        this.str[index] = h('p', { style: 'margin-bottom: 10px' }, this.form.houseList[index].keywordAddress + _msg)
      }

      const calcEndTimeByType = pwdType => {
        let d = new Date()
        if (pwdType === 'TEMP') {
          return d.getTime() + 1 * 60 * 1000
        } else if (pwdType === 'DYNAMIC') {
          return d.getTime() + 1 * 60 * 60 * 1000
        } else {
          return this.form.endTime
        }
      }

      delete req.endTime1
      delete req.housePosition

      req = {
        ...req,
        ...this.form,
        // smsPhone: '18588499001',
        // smsUserName: '王志',
        // pwdType: 'TEMP',
        // opUserId: '51031c77874e419daf2df4bf8f2ecaeb',
        // opUserName: '陈崇磐',
        // houseName: '浙江省杭州市江干区世茂东壹号12栋1单元804室.A',
        // houseId: 'c19f2046cc444cbfaec628c9459629f8',
        // beginTime: 1525745172318,
        // endTime: 1525745232318,
        beginTime: new Date(),
        endTime: calcEndTimeByType(req.pwdType),
      }

      this.requesting = true
      api.password.retrieve(req).then((res) => {
        const _data = res.data
        this.index++
        if (this.form.transform && this.form.housePosition === 'ALL') {
          if (_data.code === 200) {
            setSuccessMsg(this.form.pwdType, _data.data)
          } else {
            setErrorMsg(_data.code, _data.message)
          }

          if (this.index === this.form.houseList.length) {
            this.$msgbox({
              title: '消息',
              message: h('p', null, this.str),
              confirmButtonText: '确定',
              type: 'success'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '申请结束!'
              })
              this.index = 0
              this.emitClose()
            })
          }
        } else {
          if (_data.code === 200) {
            if (this.form.pwdType === 'DYNAMIC') {
              this.$confirm('离线密码为：' + _data.data, '提示', {
                confirmButtonText: '确定',
                type: 'success'
              })
            } else if (this.form.pwdType === 'CUSTOM') {
              this.$confirm('自定义密码为：' + _data.data, '提示', {
                confirmButtonText: '确定',
                type: 'success'
              })
            } else if (this.form.pwdType === 'TEMP') {
              this.$confirm('看房密码为：' + _data.data, '提示', {
                confirmButtonText: '确定',
                type: 'success'
              })
            } else {
              this.$message({
                message: '密码申请成功。',
                type: 'success'
              })
            }
            this.emitClose()
          } else if (_data.code === 10027) {
            this.$message({
              message: '短信发送失败，请联系相关技术人员。',
              type: 'error'
            })
          } else if (_data.code === 10032) {
            this.$message({
              message: '请确认该门是否有智能门锁。',
              type: 'error'
            })
          } else if (_data.code === 10019) {
            this.$message({
              message: _data.message,
              type: 'error'
            })
          } else if (_data.code === 10001 || _data.code === 10017) {
            this.$message({
              message: _data.message,
              type: 'error'
            })
          } else {
            this.$message({
              message: '密码申请失败，请重试。',
              type: 'error'
            })
          }
          this.index = 0
        }
      })

      this.requesting = false
    },

    deleteAll () {
      const { lockId } = this
      if (lockId) {
        let req = {
          lockId,
          type: 'ALL',
        }
        api.password.destroy(req).then(res => {
          let _data = res.data
          if (_data.code === 200) {
            this.$message({
              message: '删除成功。',
              type: 'success'
            })

            this.tableData = []
            this.pageInfo.pageNo = 1
            this.pageInfo.pageTotal = 0
          } else if (_data.code === 10015) {
            this.$message({
              message: '您操作次数过于频繁，请稍后重新操作。',
              type: 'warning'
            })
          } else {
            this.$message.error(_data.message)
          }
        })
      } else {
        this.$message.error('无可删密码的门锁。')
      }
    },

    del (row) {
      let req = {
        lockId: row.lockId,
        pwdId: row.pwdId,
        pwdIndex: row.pwdIndex,
        pid: row.pid,
        type: 'ONE',
      }

      api.password.destroy(req).then(res => {
        let _data = res.data
        if (_data.code === 200) {
          this.$message({
            message: '删除成功。',
            type: 'success'
          })

          const index = this.tableData.findIndex(item => item.lockId === row.lockId)
          this.tableData.splice(index, 1)
        } else {
          this.$message.error(`删除成功。原因：${_data.message}。`)
        }
      })
    },

    currentChange (index) {
      this.pageInfo.pageNo = index
      const houseId = this.context.houseSpaceId
      let requestParams = {
        houseId,
        pageSize: 5,
        pageNo: index,
      }
      this.requestRecord(requestParams)
    },

    pwdType (row, column, cellValue) {
      return pwdType(cellValue)
    },

    requestRecord (req) {
      this.tableData = []
      api.password.list(req).then(res => {
        let _data = res.data
        if (_data.code === 200) {
          this.pageInfo.pageTotal = _data.data.totalCount
          this.tableData = _data.data.list.map((item, i) => ({
            ...item,
            index: (req.pageNo - 1) * req.pageSize + i + 1,
            duration: [moment(item.beginTime).format('YYYY/MM/DD'),
              moment(item.endTime).format('YYYY/MM/DD')].join(' - ')
          }))
        } else if (_data.code === 10000) {
          this.pageInfo.pageTotal = 0
          this.pageInfo.pageNo = 1
          this.$message({
            message: '该房间暂时没有密码记录。',
            type: 'error'
          })
        }
      })
    },

    handleTabClick (tab, event) {
      if (tab.name === 'second') {
        const houseId = this.context.houseSpaceId

        let queryParams = {
          houseId,

          pageSize: 5,
          pageNo: 1,
        }

        api.lock.retrieve(houseId).then(res => {
          if (res.data.code === 200 && res.data.data) {
            this.lockId = res.data.data
          } else {
            this.$message.error('未能查找到有效门锁')
          }

          this.requestRecord(queryParams)
        })

      }
    },

    emitClose: function () {
      this.$emit('close')
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
    formatForm () {
      this.form.pwdType = 'TEMP'
      this.form.smsPhone = ''
      this.form.smsUserName = ''
      this.form.transform = false
      this.form.housePosition = 0
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
          this.requestRecord(recordReq)
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
          this.requestRecord(recordReq)
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