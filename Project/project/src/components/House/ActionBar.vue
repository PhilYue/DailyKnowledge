房间行为条

<style lang="scss">
.action-bar {
  background: #fff;
  margin: 0 -8px -8px -8px;
  height: 40px;
  line-height: 40px;
  padding: 0 8px;
  position: relative;

  &:after {
    content: '';
    display: table;
    clear: both;
  }

  &.action-bar--triggered {
    background-color: #20a0ff;
    color: #fff;
    .action-bar__icon-con {
      display: block;
    }

    &.action-bar--danger {
      background-color: rgba(229,45,45,.8);
      .action-bar__text {
        color: #fff;
      }
    }
  }

  &.action-bar--danger {
    .action-bar__text {
      color: red;
    }
  }
}

.action-bar__icon-con {
  display: none;
  text-align: right;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  vertical-align: middle;

  .action-bar__icon {
    display: inline-block;
    width: 28px;
    height: 28px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center bottom;
    margin-right: 2px;
    vertical-align: middle;
  }

  .icon-upload{
    background-image: url(../../../static/img/upload.png);
  }
  .icon-syn{
    background-image: url(../../../static/img/alipay.png);
  }
  .icon-password{
    background-image: url(../../../static/img/sendPassword.png);
  }
  .icon-frozen{
    background-image: url(../../../static/img/frozen.png);
  }
  .icon-detail {
    background-image: url(../../../static/img/detail3.png);  
  }
  .icon-contract {
    background-image: url(../../../static/img/rental1.png);
  }

}

</style>

<template>
  <div class="action-bar" :class="{'action-bar--triggered' : triggered, 'action-bar--danger' : RENTABLE}">
    <span class="action-bar__text">{{status | houseSpaceStatus}}</span>

    <div class="action-bar__icon-con">
      <template v-if="role !== 10">
        <template v-if="role === 0">
          <el-tooltip v-if="RENTABLE" class="item" effect="light" content="冻结房源" placement="top">
            <div class="icon-frozen action-bar__icon" @click.stop="handleClick('frozen')"></div>
          </el-tooltip>
          <el-tooltip v-else-if="status === 'FREEZING'" class="item" effect="light" content="解冻房源" placement="top">
            <div class="icon-frozen action-bar__icon" @click.stop="handleClick('thaw')"></div>
          </el-tooltip>
        </template>

        <el-tooltip class="item" effect="light" content="密码授权" placement="top">
          <div class="icon-password action-bar__icon" @click.stop="handleClick('password')"></div>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="同步蘑菇" placement="top">
          <div class="icon-syn action-bar__icon" @click.stop="handleClick('sync')"></div>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="附件上传" placement="top">
          <div class="icon-upload action-bar__icon" @click.stop="handleClick('upload')"></div>
        </el-tooltip>
      </template>


      <el-tooltip class="item" effect="light" content="新增租客合同" placement="top">
        <div v-if="isYungYing && RENTABLE && role !== 10"  class="icon-contract action-bar__icon" @click.stop="handleClick('add')"></div>
      </el-tooltip>

      <el-tooltip class="item" effect="light" content="查看详情" placement="top">
        <div class="icon-detail action-bar__icon" @click.stop="handleClick('detail')"></div>
      </el-tooltip>

    </div>

  </div>
</template>

<script>
import { houseSpaceStatus } from '@/filters'

export default {
  props: {
    status: String,
    role: Number,
    triggered: Boolean,
  },

  data() {
    return {
      isYungYing: true,
    }
  },

  computed: {
    RENTABLE() {
      return this.status === 'RENTABLE'
    }
  },

  filters: {
    houseSpaceStatus
  },

  methods: {
    handleClick(type) {
      this.$emit('click', type)
    },
  }
}
</script>
