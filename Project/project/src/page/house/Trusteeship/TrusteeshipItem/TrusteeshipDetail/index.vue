<template>
  <div>
    <div class="u-mask" @click="handleClick"></div>

    <transition name="fade" appear>
      <div v-if="created" class="dialog" style="height:calc(100vh-61px);">
        <el-row class="height-w100">
          <el-col class="form-contL" :span="6" style="padding:0;">
            <el-menu
              class="side-nav-menu-con"
              :default-active="currentMenu"
              @select="select">
              <el-menu-item index="contract">合同信息</el-menu-item>
              <el-menu-item v-if="info.oldLeaseId" index="lease">{{'租约详情'/*'旧租约详情'*/}}</el-menu-item>
            </el-menu>
          </el-col>
          <el-col v-if="info" class="form-cont" :span="18">
            <div class="contain">
              <div>
                <h3>基本信息</h3>
                <pair label="合同编号：">{{info.contractNumber}}</pair>
                <pair label="甲方：">{{info.users && info.users.length >= 2 ? info.users[0].userName : ''}}</pair>
                <pair label="甲方联系方式：">{{info.users && info.users.length >= 2 ? info.users[0].userPhone : ''}}</pair>
                <pair label="乙方：">{{info.users && info.users.length >= 2 ? info.users[1].userName : ''}}</pair>
                <pair label="乙方联系方式：">{{info.users && info.users.length >= 2 ? info.users[1].userPhone : ''}}</pair>
                <pair label="租金：" :value="info.rental / 1000">{{info.rental / 1000}}</pair>
                <pair label="付款周期：">{{info.payCycle || '暂无信息'}}</pair>
                <pair label="押金：">{{info.deposit / 1000}}</pair>

                <pair label="合同类型：">{{info.contractType | contractType}} - {{info.signType | signType}}</pair>
                <pair label="合同状态：">{{info.contractStatus | contractStatus}}</pair>
                <pair label="生效时间：">{{info.startTime | date}} - {{info.endTime | date}}</pair>
              </div>


              <div>
                <h3>房源信息</h3>
                <pair label="房源面积：">{{info.houseSpaceArea || '暂无信息'}}</pair>
                <pair label="房源类型：">
                  {{getHouseType()}}
                </pair>
                <pair v-if="info.direction" label="朝向：">{{info.direction | direction}}</pair>
                <pair label="装修类型：">{{info.decorateType || '暂无信息'}}</pair>
                
              </div>

            </div>
          </el-col>

        </el-row>

        <div @click="handleClick" class="el-icon-close closeIco"></div>
      </div>
    </transition>

    <!-- 租约详情子组件 -->
  </div>
</template>

<script src="./script.js"></script>

<style scoped>
  .u-mask {
    width: 100vw;
    height: 100vh;
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0;
  }

  .side-nav-menu-con {
    height: 100%;
    padding-top: 28px !important;
  }

  ::-webkit-scrollbar {
    display: none
  }

  ::-moz-scrollbar {
    display: none
  }

  ::-ms-scrollbar {
    display: none
  }

  /*右侧弹窗*/

  .pad20 {
    margin-bottom: 20px;
  }

  .el-menu {
    background-color: #d3dce6;
  }

  .activeClass {
    margin-bottom: 19px;
    border-bottom: 1px dashed #ccc;
  }

  .w-50p {
    width: 100%;
  }

  .el-menu-item {
    background-color: #d3dce6;
    border-left: 3px solid #d3dce6;
    transition: all .5s;
  }

  .el-menu-item:hover {
    background-color: #fff;
    border-color: #20a0ff;
    color: #333;
  }

  .el-menu-item.is-active {
    background-color: #fff;
    border-color: #20a0ff;
    color: #333;
  }

  .dialog {
    width: 50%;
    position: fixed;
    top: 61px;
    background-color: #fff;
    right: 0;
    border-right: 3px solid #ccc;
    border-top: 1px solid #ccc;
    z-index: 9999;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: right .5s
  }

  .fade-enter,
  .fade-leave-to {
    right: -50%;
  }

  .fade-enter-to,
  .fade-leave {
    right: 0;
  }

  .height-w100 {
    height: 100%;
    overflow-y: auto;
  }

  .form-cont {
    height: calc(100vh - 60px);
    padding: 30px 50px;
    overflow-y: auto;
  }

  .form-contL {
    height: calc(100vh - 88px);
  }

  .closeIco {
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
  }

  .contain {
    color: #555;
    font-size: 13px;
  }

  .content {
    padding-bottom: 13px;
  }

  h3 {
    padding-bottom: 5px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
  }

</style>
