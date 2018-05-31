<template>
  <div class="houseDetail user-info" style="z-index:10;">
    <div class="u-mask" @click="handleClick"></div>

    <transition name="fade">
      <div v-if="created" class="dialog">
        <el-row class="height-w100">
          <el-col class="form-cont" :span="8" style="padding:0; background: #eee; margin-top:0;">
            <el-menu default-active="1" class="user-info-menu" theme="dark">
              <el-menu-item class="user-info-menu-item" index="1">用户信息</el-menu-item>
            </el-menu>
          </el-col>
          <el-row class="form-cont" :span="14">
            <el-col class="line" :span="24">
              <p class="HDTitle">{{info.keywordAddress}}</p>
            </el-col>
            <!-- <p class="eitdButton">编辑</p> -->
            <div class="HDContent">
              <ul>
                <li class="f-cb">
                  <el-col class="line" :span="24">
                    <h3>基本信息</h3>
                  </el-col>
                  <el-col class="line" :span="24">
                    <el-col class="line" :span="6">姓名: </el-col>
                    <el-col class="line" :span="14"> {{info.username}}</el-col>
                    <el-col class="line" :span="6">年龄: </el-col>
                    <el-col class="line" :span="14"> 23</el-col>
                    <el-col class="line" :span="6">性别: </el-col>
                    <el-col class="line" :span="14" v-if="info.sex === 'F'"> 男</el-col>
                    <el-col class="line" :span="14" v-else-if="info.sex === 'M'"> 女</el-col>
                    <el-col class="line" :span="14" v-else> 暂无信息</el-col>
                    <el-col class="line" :span="6">联系方式: </el-col>
                    <el-col class="line" :span="14"> {{info.phone}}</el-col>
                    <el-col class="line" :span="6">邮箱: </el-col>
                    <el-col class="line" :span="14"> {{info.email}}</el-col>
                    <!-- <el-col class="line" :span="6">入职日期: </el-col>
              			<el-col class="line" :span="14"> 2017-09-09</el-col>
              			<el-col class="line" :span="6">居住地: </el-col>
              			<el-col class="line" :span="14"> 北软随寓人才公寓</el-col>
              			<el-col class="line" :span="6">所属部门: </el-col>
              			<el-col class="line" :span="14"> 北软片区</el-col> -->
                    <div class="f-cb">
                      <el-col class="line" :span="6">人员类型: </el-col>
                      <el-col class="line" :span="14" v-if="info.userType === 'A'"> 工作人员</el-col>
                      <el-col class="line" :span="14" v-if="info.userType === 'P'"> 房东</el-col>
                    </div>
                    <!-- <el-col class="line" :span="14" v-if="info.userType === 'P'"> 租客</el-col> -->
                    <el-col class="line" :span="6">证件类型: </el-col>
                    <el-col class="line" :span="14"> {{info.certType | certType}}</el-col>
                    <el-col class="line" :span="6">证件号码: </el-col>
                    <el-col class="line" :span="14"> {{info.certNumber}}</el-col>
                  </el-col>
                </li>
              </ul>
            </div>
          </el-row>
        </el-row>

        <div @click="handleClick">
          <span class="el-icon-close closeIco"></span>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import { certType } from '@/filters'
  import { api } from '@/xhr'

  export default {
    props: {
      id: String
    },

    data: function () {
      return {
        created: false,

        info: {},
      }
    },

    created () {
      this.loadData()
    },

    filters: {
      certType
    },

    mounted() {
      // slideIn
      this.created = true
    },

    methods: {
      loadData() {
        api.userInfo.retrieve(this.id).then(res => {
          if (res.data.code === 200) {
            this.info = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })

      },

      handleClick() {
        this.created = false

        const slideOut = () => {
          const animationDuration = 500
          setTimeout(() => {
            this.$emit('close')
          }, animationDuration)
        }

        slideOut()
      },
    },
  }

</script>

<style lang="scss" scoped>
  .u-mask {
    width: 100vw;
    height: 100vh;
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0;
  }

  .user-info {
    .user-info-menu {
      height: 100%;
      .user-info-menu-item {
        border-width: initial;
        border-bottom: none;
        font-size: 14px;
        line-height: 56px;
        text-align: center;
        padding-left: 0 !important;
      }
    }
  }

  /*右侧弹窗*/

  .dialog {
    width: 550px;
    top: 62px;
    height: calc(100vh - 62px);
    position: fixed;
    background-color: #fff;
    right: 0;
    /*border-right:3px solid #ccc;*/
    z-index: 1999;
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

  .el-menu-vertical-demo {
    height: 100%;
  }

  .height-w100 {
    height: 100%;
    overflow-y: auto;
  }

  .form-cont {
    height: 100%;
    padding: 15px 50px;
    overflow-y: auto;
    /*border-left: 1px solid #eef1f6;*/
  }

  .closeIco {
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
  }

  .houseEdit {
    color: #13CE66;
    position: absolute;
    right: 40px;
    cursor: pointer;
    top: 15px;
    font-size: 16px;
    line-height: 16px;
  }

  .HDTitle {
    width: 350px;
    height: 26px;
    line-height: 16px;
    font-size: 16px;
    margin-bottom: 20px;
    word-wrap: break-word;
  }

  .textRight {
    text-align: right;
  }

  .HDContent li {
    line-height: 24px;
    font-size: 13px;
    padding: 20px 0;
    border-bottom: 1px solid #e3e3e3;
  }

  .HDContent li:first-child {
    padding-top: 0;
  }

  .HDContent li:last-child {
    border-width: 0;
  }

  .el-menu--dark {
    background: #d3dce6;
    /*color: #555;*/
  }

  .el-menu-item:first-child {
    margin-top: 28px;
  }

  .houseDetail .el-menu-item {
    /*display: none;*/
    color: #333;
    background-color: #d3dce6;
    border-left: 3px solid #d3dce6;
    transition: all .5s;
  }

  .el-menu-item:hover {
    background-color: #fcfcfc;
    border-color: #fcfcfc;
  }

  .el-menu-item.is-active {
    background-color: #fcfcfc;
    border-color: #20a0ff;
  }

  .el-menu-item:first-child{
    margin-top: 28px;
  }
  .el-menu-item{
    /*display: none;*/
    color: #333;
    background-color: #d3dce6;
    border-left: 3px solid #d3dce6;
    transition: all .5s;
  }
  .el-menu-item:hover{
    background-color: #fcfcfc;
    border-color: #fcfcfc;
  }
  .el-menu-item.is-active{
    background-color: #fcfcfc;
    border-color: #20a0ff;
  }

  .HDContent li h3 {
    border-bottom: 1px solid #e3e3e3;
    padding: 10px 0;
    margin-top: 20px;
  }

  .el-col-6,
  .el-col-14 {
    margin-top: 10px;
  }

</style>
