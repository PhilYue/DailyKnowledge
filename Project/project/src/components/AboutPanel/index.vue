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

  /*右侧弹窗*/
  .dialog{
    width: 50%;
    position:fixed;
    top: 62px;
    background-color: #fff;
    right: 0;
    /*border-right:3px solid #ccc;*/
    z-index: 1999;
  }
  .fade-enter-active, .fade-leave-active {
    transition: right .5s
  }
  .fade-enter, .fade-leave-to {
    right: -50%;
  }
  .fade-enter-to, .fade-leave {
    right: 0;
  }
  .el-menu-vertical-demo{
    height: 100%;
  }
  .height-w100{
    height: 100%;
    overflow-y: auto;
  }
  .form-cont{
    height: calc(100vh - 60px);
    padding: 55px 50px;
    overflow-y: auto;
    overflow-x: hidden;
    /*border-left: 1px solid #eef1f6;*/
  }
  .closeIco{
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
  }
  .houseEdit{
    color: #13CE66;
    position: absolute;
    right: 40px;
    cursor: pointer;
    top: 15px;
    font-size: 16px;
    line-height: 16px;
  }
  .HDTitle{
    width: 350px;
    height: 26px;
    line-height: 16px;
    font-size: 16px;
    margin-bottom: 20px;
    word-wrap:break-word ;
  }
  .textRight{
    text-align: right;
  }
  .HDContent li{
    line-height: 24px;
    font-size: 13px;
    padding: 10px 0;
    /*border-bottom: 1px solid #e3e3e3;*/
  }
  .HDContent li h3{
    border-bottom: 1px solid #e3e3e3;
    padding: 10px 0 5px;
    margin-top: 5px;
    margin-bottom: 10px;
  }
  .HDContent li:first-child{
    padding-top: 0;
  }
  .HDContent li:last-child{
    border-width: 0;
  }
  .el-menu--dark{
    background-color: #d3dce6;
    /*background: #ebebeb;*/
    /*color: #555;*/
  }
  .el-menu-item{
    /*color: #555;*/
    /*border-left: 3px solid #ebebeb;*/
  }
  .el-menu--dark .el-menu-item:hover, .el-menu--dark .el-submenu__title:hover{
    /*background: #f6f8f9;*/
    /*border-color: #20a0ff;*/
  }
  .el-menu-item.is-active{
    /*background: #f6f8f9;*/
    /*color: #555;*/
    /*border-color:#20a0ff;*/
  }
  .el-menu-item:first-child{
    margin-top: 28px;
  }
  .houseDetail .el-menu-item{
    /*display: none;*/
    color: #333;
    background-color: #d3dce6;
    border-left: 3px solid #d3dce6;
    transition: all .5s;
  }
  .houseDetail .el-menu-item:hover{
    background-color: #fcfcfc;
    border-color: #fcfcfc;
  }
  .houseDetail .el-menu-item.is-active{
    background-color: #fcfcfc;
    border-color: #20a0ff;
  }
  .houseDetail .eitdButton{
    position: absolute;
    right: 40px;
    top: 9px;
    font-size: 19px;
    color: #20a0ff;
    cursor: pointer;
  }
  .button{
    width: 16px;
    height: 16px;
    display: inline-block;
    background: url(../../../static/img/detail1.png) left center / 16px 16px;
    background-repeat: no-repeat;
    cursor: pointer;
    padding-top: 10px;
  }
  .button img{
    width: 100%;
    height: 100%;
    cursor: pointer
  }
  .rentalPrice{
    cursor: pointer
  }
  .block{
    text-align: center;
    margin-top: 20px;
  }
  .el-col-8, .el-col-14{
    margin-top: 10px;
  }
  .el-button--primary{
    /*width: 35%;*/
    background-color: #fff;
    color: #20a0ff;
  }
  .el-button--primary:hover{
    background-color: #20a0ff;
    color: #fff;
  }
  .goodList{
    margin-bottom: 10px;
    margin-top: 5px;
  }
  .goodListH4{
    padding: 5px 0;
    margin-top: 10px;
    border-bottom: 1px solid #ccc
  }
  .imgList{
    padding-top: 40px;
  }
  .imgList li{
    width: 125px;
    float: left;
    height: 150px;
    margin-bottom: 10px;
    margin-right: 10px;
    padding: 0;
  }
  .imgList li:nth-child(2n){
    margin-right: 0;
  }
  /*.imgList li .img{
    width: 100%;
    height: 125px;
    display: table;
    border: 1px solid #cecece;
  }*/
  .imgList li .img{
    width: 100%;
    height: 125px;
    /*display: table;*/
    border: 1px solid #cecece;
    overflow: hidden;
    position: relative;
  }
  .imgList li .img div{
    width: 100%;
    height: 125px;
    display: table;
    /*border: 1px solid #cecece;*/
   }

  .imgList li .img span{
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
  .imgList li .img img{
    max-height: 125px;
    max-width: 125px;
  }
  .imgList li .img .btn1{
    height: 20px;
    /*border-top: 1px solid #cecece;*/
    /*border-top-width: 0;*/
    position: absolute;
    background: rgba(0,0,0,.5);
    transition: all .25s;
    -webkit-transition: all .25s;
    bottom: 0;
    left: 0;
    opacity: 0;
    -webkit-opacity: 0;
  }
  .imgList li .btn1 div{
    border-top: 1px solid #cecece;
    border-width: 0;
    height: 28px;
  }
  .imgList li .btn1 p{
    width: 50%;
    height: 20px;
    line-height: 20px;
    border-radius: 3px;
    margin: 4px 25%;
    /*float: left;*/
    background: #20a0ff;
    color: #fff;
  }
  .imgList li:hover .img .btn1{
    opacity: 1;
    -webkit-opacity: 1;
  }
  .imgList li p{
    text-align: center;
    font-size: 14px;
    color: #333;
    overflow: hidden; white-space: nowrap; text-overflow: ellipsis; 
  }
  .bigImg{
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0,0,0,.5);
    z-index: 1000;
    display: none;
  }
  .bigImg .cell{
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
  .bigImg .table{
    width: 60vw;
    height: 60vh;
    /*overflow: hidden;*/
    display: table;
    background: #fff;
    display: inline-block;
    position: relative;
  }
  .bigImg .table div{
    display: table;
    width: 100%;
    height: 100%;
  }
  .bigImg img{
    max-height: 60vh;
    max-width: 60vw;
  }
  .bigImg .closeIco{
    width: 100px;
    height: 100px;
    background: url(../../../static/img/close.svg) no-repeat left center / 25px 25px;
    cursor: pointer
  }
  .el-icon-arrow-right,.el-icon-arrow-left{
    font-size: 30px;
    color: #fff;
    position: absolute;
    /*height: 100%;*/
    top: 50%;
    cursor: pointer;
  }
  .el-icon-arrow-right{
    right: -40px;
  }
  .el-icon-arrow-left{
    left: -40px;
  }
  .contractLine{
    height: 26px;
    line-height: 26px;
    margin-top: 0;
  }
  .contractList li{
    border-bottom: 1px solid #e3e3e3
  }
  .contractLine .el-button{
    padding: 6px 5px;
    font-size: 12px;
  }
  .textAlignRight{
    text-align: right;
  }
</style>

<template>
  <div class="houseDetail" style="zIndex:100;">
    <div class="u-mask" @click="handleClose"></div>

    <transition name="fade">
      <div v-if="created" class="dialog" style="width:600px; height:calc(100vh-61px);">
        <el-row class="height-w100">
          <el-col class="form-cont" :span="8" style="padding:0; background: #eee; margin-top:0;">
            <el-menu :default-active="currentMenu" class="el-menu-vertical-demo" theme="dark">
              <el-menu-item
                v-for="(menu, key) in menus"
                :key="key"
                :index="menu.index"
                @click="handleClick(menu.index)"
                style="padding: 0; text-align:center;">
                {{menu.text}}
              </el-menu-item>
            </el-menu>
          </el-col>

          <el-col class="form-cont" :span="16">
            <el-col class="line" :span="24">
              <p class="HDTitle">{{title}}</p>
            </el-col>

            <div class="HDContent">
              <slot></slot>
              <component :is="currentComponent" :context="context"/>
            </div>
          </el-col>
        </el-row>

        <div @click="handleClose">
          <span class="el-icon-close closeIco"></span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import HouseInfo from './HouseInfo'
  import PayInfo from './PayInfo'
  import ContractInfo from './ContractInfo'
  import GoodsInfo from './GoodsInfo'
  import ImageInfo from './ImageInfo'

  export default {
    props: {
      context: Object,
      title: String,
      menus: {
        type: Array,
        default: () => (
          [
            {
              index: 'HouseInfo',
              text: '房源详情'
            },
            {
              index: 'PayInfo',
              text: '财务信息'
            },
            {
              index: 'ContractInfo',
              text: '合同信息'
            },
            {
              index: 'GoodsInfo',              
              text: '物品列表'
            },
            {
              index: 'ImageInfo',              
              text: '图片列表'
            }
          ]
        )
      }
    },

    components: {
      HouseInfo,
      PayInfo,
      ContractInfo,
      GoodsInfo,
      ImageInfo,
    },

    mounted() {
      // slideIn
      this.created = true
    },

    data() {
      return {
        currentMenu: this.menus.length ? this.menus[0].index : 'HouseInfo',

        created: false, // child component of transition.
      }
    },

    computed: {
      currentComponent() {
        return this.$options.components[this.currentMenu]
      }
    },

    methods: {
      handleClose() {
        this.created = false

        const slideOut = () => {
          const animationDuration = 500
          setTimeout(() => {
            this.$emit('close')
          }, animationDuration)
        }

        slideOut()
      },

      handleClick(menu) {
        this.currentMenu = menu
      },
    }
  }
</script>
