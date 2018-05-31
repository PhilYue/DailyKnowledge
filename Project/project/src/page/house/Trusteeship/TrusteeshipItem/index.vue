<template>
  <div class="trusteeship-item">
    <el-row>
      <el-col :span="4">
        <div class="">
          <img src="https://o6niowncl.qnssl.com/user-default-img-b-14.png" width="50" />
          <p style="padding-left:10px;">
            <span class="name-pos">{{context.userName}}</span>
          </p>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="lin55">
          <p>
            <el-tooltip class="item" effect="light" content="合同编号" placement="top">
              <span>{{ context.contractNumber }}</span>
            </el-tooltip>
          </p>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="lin55" style="margin: 0 auto;">
          <p>
            <el-tooltip class="item" effect="light" content="合同状态" placement="top">
              <span>{{ context.contractStatus | contractStatus }}</span>
            </el-tooltip>
          </p>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="lin55">
          <!-- <p title="房源编号">{{ context.houseID }}</p> -->
          <p>
            <el-tooltip class="item" effect="light" content="地址" placement="top">
              <span>{{ context.houseSpaceName }}</span>
            </el-tooltip>
          </p>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="lin55">
          <p>
            <el-tooltip class="item" effect="light" content="生效时间-到期时间" placement="top">
              <span>{{ context.startTime | date }} - {{ context.endTime | date }}</span>
            </el-tooltip>
          </p>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="lin55">
          <p>
            <el-tooltip class="item" effect="light" content="房东联系方式" placement="top">
              <span>{{context.phoneNum}}</span>
            </el-tooltip>
          </p>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="lin55" style="display: table-cell; vertical-align:middle;">
          <div class="el-dropdown">
            <button type="button" class="el-button el-button--default">
              <span class="el-dropdown-link" @click="showDetail(context)">详情
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
            </button>
            <ul class="el-dropdown-menu">
              <li class="el-dropdown-menu__item" @click="depositSure(context)" v-if="context.contractStatusChange === '待签订' || context.contractStatusChange === '签订中'">确认签订</li>
              <!-- <li class="el-dropdown-menu__item" @click="showDetail(item)">查看详情</li> -->
              <li class="el-dropdown-menu__item" @click="openUploac(context)">上传附件</li>
            </ul>
          </div>
        </div>
      </el-col>
      <slot></slot>
    </el-row>

    <trusteeship-detail
      v-if="contractDetailShowing"
      :contract-id="context.id"
      @close="contractDetailShowing = false"
    />
  </div>
</template>

<script src="./script.js"></script>

<style lang="scss" src="./style.scss" scoped></style>
