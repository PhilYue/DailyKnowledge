房间组件 - 参见组件属性
<style lang="scss" scoped>
  @media screen and (min-width: 1500px) {
    .room {
      width: calc((100% - 16px * 4 - 16px) / 5);
    }
  }

  @media screen and (max-width: 1500px) {
    .room {
      width: calc((100% - 16px * 3 - 16px) / 4);
    }
  }

  @media screen and (max-width: 1200px) {
    .room {
      width: calc((100% - 32px - 16px) / 3);
    }
  }

  .room {
    float: left;
    background: #fff;
    margin: 8px;
  }

  .room__main {
    font-size: 14px;
    padding: 8px;
    position: relative;
  }

  .room__title {
    font-weight: bold;
    margin-bottom: .5em;
    height: 20px;
  }

  .room__meta {
    line-height: 1.5;
    margin-bottom: 8px;
  }

  .room__image {
    text-align: center;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .room__person {
    position: absolute;
    right: 8px;
    top: 8px;
    max-width: 6em;
    text-align: center;
  }

  .room__name {
    max-width: 5em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>

<template>
  <div
    class="room"
    :class="{ green: room.houseSpaceStatus === 'RENTED' || room.houseSpaceStatus === 'RESERVED' }"
    @mouseover="isActionShowing = true"
    @mouseout="isActionShowing = false"
  >
    <div class="room__main" @click="handleAction('detail')">
      <div class="room__title">{{houseSpaceName}}</div>
      <div class="room__meta">
        <div>
          <span>{{price ? price + '元/月' : '暂无定价'}}</span>
        </div>

        <div>
          {{roomNumberDesc}} {{room.houseSpaceArea / 1000}}㎡ {{room.direction | direction}}
        </div>
      </div>

      <template>
        <div v-if="room.houseSpaceStatus === 'FREEZING'" class="room__image">
          <img src="../../../static/img/frozening.png" />
        </div>

        <div v-if="room.houseSpaceStatus !== 'RENTABLE'" class="room__person" @click.stop="handleAction('user')">
          <div class="room__avatar">
            <img src="https://o6niowncl.qnssl.com/user-default-img-b-14.png" width="35" />
          </div>
          <div class="room__name">{{room.tenantName || '未知用户'}}</div>
        </div>
      </template>

      <action-bar
        :triggered="isActionShowing"
        :status="room.houseSpaceStatus"
        :role="0"
        @click="handleAction"
      />

    </div>


    <!-- 房源门锁密码修改 -->
    <password-d-form
      v-if="pwdFormShowing"
      :role="0"
      :context="room"
      @close="handleClose('pwdFormShowing')"
    />

    <upload-d-form
      v-if="uploadFormShowing"
      :context="room"
      @close="handleClose('uploadFormShowing')"
    />

    <about-panel
      v-if="aboutPanelShowing"
      :title="room.keywordAddress"
      :context="room"
      @close="handleClose('aboutPanelShowing')"
    />

    <contract-form
      v-if="contractFormShowing"
      :contractForm="contractForm"
      :contractFormData="contractFormData"
    />

    <user-info
      v-if="userInfoShowing"
      :id="room.tenantId"
      @close="handleClose('userInfoShowing')"
    />

  </div>
</template>

<script>
import { direction } from '@/filters'
import { urlList } from '@/xhr'
import ActionBar from './ActionBar'
import PasswordDForm from './PasswordDForm'
import UploadDForm from './UploadDForm'
import RoomDetail from './RoomDetail'
import AboutPanel from '../AboutPanel'
import ContractForm from '@/components/rent-contract/ContractForm'
import UserInfo from '@/components/AboutPanel/UserInfo'
import {messageCancel, report} from '@/lib'

export default {
  props: {
    context: Object,
    role: Number,
    rentType: {
      type: String,
      default: 'JOINT_RENT'
    }
  },

  components: {
    ActionBar,
    PasswordDForm,
    UploadDForm,
    RoomDetail,
    AboutPanel,
    ContractForm,
    UserInfo,
  },

  data: function () {
    return {
      isYungYing: false,

      pwdFormShowing: false,
      uploadFormShowing: false,
      aboutPanelShowing: false,
      contractFormShowing: false,
      userInfoShowing: false,

      isActionShowing: false,

      contractForm: {
        show: false
      },
      contractFormData: {}

    }
  },

  computed: {
    ENTIRE_RENT() {
      return this.rentType === 'ENTIRE_RENT'
    },

    room() {
      return this.ENTIRE_RENT
        ? this.context.resHouseSpaceBeanList[0] : this.context
    },

    houseSpaceName() {
      let {buildingNo, unitNo, roomNo, houseSpaceName} = this.context
      
      return this.ENTIRE_RENT
        ? `${buildingNo ? buildingNo + '栋' : ''}` +
          `${unitNo ? unitNo + '单元' : ''}` +
          `${roomNo}号`
          : houseSpaceName
    },
    
    price() {
      let {houseSpaceStatus, actualRentalPrice, expectedRentalPrice} = this.room
      if (houseSpaceStatus === 'FREEZING') return null
      
      const actualStatus = ['RENTED', 'RESERVED', 'SIGNING_LC', 'LC_NOT_TE']

      return (actualStatus.includes(houseSpaceStatus)
        ? actualRentalPrice : expectedRentalPrice) / 1000
    },

    roomNumberDesc() {
      return this.ENTIRE_RENT
        ? `${this.context.bedroomNumber}室${this.context.livingRoomNumber || 0}厅 ·` : ''
    }
  },
  
  filters: {
    direction
  },

  mounted () {
    if (this.$store.state.currentUser.roleData.indexOf('运营部经理') !== -1) {
      this.isYungYing = true
    }
  },

  methods: {
    add () {
      this.contractFormData.people = [localStorage.getItem('role'), this.$store.state.currentUser.username]
      this.contractForm.show = true
      this.contractFormData = JSON.parse(JSON.stringify(this.contractFormData))
      // this.contractFormData.houseSpaceName = data
      // this.contractFormData.houseRentType = type
      this.contractFormShowing = true
    },
    
    // 解冻房源
    thaw () {
      this.$confirm('确定解冻房源?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let url = this.urljoin(this.urlList.house, 'update/houseSpaceStatus')
        let params = {
          houseSpaceId: this.room.houseSpaceId,
          houseSpaceStatus: 'RENTABLE',
        }
        this.$http.post(url, params).then((res) => {
          report(res.body, '解冻', () => {
            this.$emit('update')
          })
        })
      }).catch(messageCancel.bind(this, '解冻'))
    },
    
    // 冻结房源
    frozen () {
      this.$confirm('确定冻结房源?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let url = this.urljoin(this.urlList.house, 'update/houseSpaceStatus')
        let params = {
          houseSpaceId: this.room.houseSpaceId,
          houseSpaceStatus: 'FREEZING',
        }

        this.$http.post(url, params).then((res) => {
          report(res.body, '冻结', () => {
            this.$emit('update')
          })
        })
      }).catch(messageCancel.bind(this, '冻结'))
    },
    
    sync() {
      let message = '确定同步房间：' + this.room.keywordAddress + ' 到蘑菇租房?'
      this.$confirm(message).then(_ => {
        let url = urlList.alipay + 'alipayHouseUploadByHouseSpaceId'
        let params = {
          houseSpaceId: this.room.houseSpaceId,
          tpRentType: 'ALIPAY'
        }

        this.$http.post(url, params).then(function (res) {
          if (res.body.code === 200) {
            this.$message({
              message: '同步成功',
              type: 'success'
            })
          } else if (res.body.code === 10015) {
            this.$message({
              message: '请确认该房源处于可出租状态',
              type: 'error'
            })
          } else {
            this.$message({
              message: '同步失败',
              type: 'error'
            })
          }
        }).catch(() => {
          this.$message.error('同步服务不可用')
        })
      })
      .catch(_ => {})
    },

    showUserInfo() {
      this.userInfoShowing = true
    },

    handleClose(visibleType) {
      this[visibleType] = false
    },

    handleAction(type) {
      if (type === 'password') {
        this.pwdFormShowing = true
      } else if (type === 'sync') {
        this.sync()
      } else if (type === 'upload') {
        this.uploadFormShowing = true
      } else if (type === 'detail') {
        this.aboutPanelShowing = true
      } else if (type === 'frozen') {
        // 冻结
        this.frozen()
      } else if (type === 'thaw') {
        // 解冻
        this.thaw()
      } else if (type === 'add') {
        // 新建合同
        this.add()
      } else if (type === 'user') {
        // 用户信息
        this.showUserInfo()
      }
    },
  }
}
</script>
