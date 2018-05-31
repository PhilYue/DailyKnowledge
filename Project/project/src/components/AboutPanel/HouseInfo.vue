<template>
  <main>
    <ul class="house-info">
      <li class="f-cb house-info-item">
        <el-col class="line" :span="24">
          <h3>基本信息</h3>
        </el-col>
        <el-col class="line" :span="24">
          <el-col class="line" :span="8">房源编号: </el-col>
          <el-col class="line" :span="14"> {{info.businessId}}</el-col>
          <el-col class="line" :span="8">房源面积: </el-col>
          <el-col class="line" :span="14"> {{info.houseSpaceArea / 1000}}平方米</el-col>
          <el-col class="line" :span="8">房源状态:</el-col>
          <el-col class="line" :span="14">{{info.houseSpaceStatus | houseSpaceStatus}}</el-col>
          <span v-if="info.rentType && info.rentType !== 'JOINT_RENT'">
            <el-col class="line" :span="8">房源类型: </el-col>
            <el-col class="line" :span="14">
              <span v-if="info.bedroomNumber">{{info.bedroomNumber}}室</span>
              <span v-if="info.livingRoomNumber">{{info.livingRoomNumber}}厅</span>
              <span v-if="info.kitchNumber">{{info.kitchNumber}}厨</span>
              <span v-if="info.toiletNumber">{{info.toiletNumber}}卫</span>
            </el-col>
          </span>
          <el-col class="line" :span="8" v-if="info.direction">朝向:</el-col>
          <el-col class="line" :span="14" v-if="info.direction">{{info.direction | direction}}</el-col>
          <el-col class="line" :span="8">装修类型:</el-col>
          <el-col class="line" :span="14">{{(info.decorateType || '暂无信息') | decorateType}}</el-col>
          <el-col class="line" :span="8">房间配备:</el-col>
          <el-col class="line" :span="14">{{info.houseSpaceFeatureList | houseSpaceFeatureList}}</el-col>
        </el-col>
      </li>

      <li class="f-cb house-info-item">
        <el-col class="line" :span="24">
          <h3>价格</h3>
        </el-col>
        <el-col class="line" :span="24">
          <el-col class="line" :span="8">收房价格:</el-col>
          <el-col class="line" :span="14">{{info.getPrice ? info.getPrice / 1000 : '暂无定价'}}元</el-col>

          <el-col class="line" :span="8">出租指导价格:</el-col>
          <el-col class="line" :span="14">{{info.expectedRentalPrice ? info.expectedRentalPrice / 1000 : '暂无定价'}}元</el-col>

          <template v-if="info.actualRentalPrice">
            <el-col class="line" :span="8">实际出租价格:</el-col>
            <el-col class="line" :span="14">{{info.actualRentalPrice / 1000}}元</el-col>
          </template>
        </el-col>
      </li>

      <li class="f-cb house-info-item">
        <el-col class="line" :span="24">
          <h3>房东信息</h3>
        </el-col>
        <el-col class="line" :span="24">
          <el-col class="line" :span="8">姓名:</el-col>
          <el-col class="line" :span="14">
            <p style=" height:24px; line-height:24px; vertical-align:top; display:inline-block">
              <span class="name-pos" style="cursor:pointer;" @click="showPersonDetail(info.landlordId)">{{info.landlordName}}</span>
              <p class="button" style="padding:0;" @click="showPersonDetail(info.landlordId)"></p>
            </p>
          </el-col>
          <el-col class="line" :span="8">联系方式:</el-col>
          <el-col class="line" :span="14">{{info.landlordPhone}}</el-col>
          <el-col class="line" :span="8" v-if="info.startTime">托管开始时间:</el-col>
          <el-col class="line" :span="14" v-if="info.startTime">{{info.startTime}}</el-col>
          <el-col class="line" :span="8" v-if="info.endTime">托管结束时间:</el-col>
          <el-col class="line" :span="14" v-if="info.endTime">{{info.endTime}}</el-col>
        </el-col>
      </li>

      <li class="f-cb house-info-item" v-if="hasRented">
        <el-col class="line" :span="24">
          <h3>租客信息</h3>
        </el-col>
        <el-col class="line" :span="24">
          <el-col class="line" :span="8">姓名:</el-col>
          <el-col class="line" :span="14" v-if="context.tenantName">
            <p style=" height:24px; line-height:24px; vertical-align:top; display:inline-block">
              <span style="cursor:pointer;" class="name-pos" @click="showPersonDetail(context.tenantId)">{{context.tenantName}}</span>
              <p class="button" style="padding:0;" @click="showPersonDetail(context.tenantId)"></p>
            </p>
          </el-col>
          <el-col class="line" :span="14" v-else>暂无信息</el-col>
          <el-col class="line" :span="8">联系方式:</el-col>
          <el-col class="line" :span="14" v-if="context.tenantPhone">{{context.tenantPhone}}</el-col>
          <el-col class="line" :span="14" v-else>暂无信息</el-col>
        </el-col>
      </li>
    </ul>

    <user-info
      v-if="userInfoShowing"
      :id="userId"
      @close="handleClose"
    />
  </main>
</template>

<script>
  import { isArray } from 'lodash'
  import { direction, houseSpaceStatus, houseSpaceFeature, decorateType } from '@/filters'
  import { api } from '@/xhr'
  import UserInfo from './UserInfo'
  
  export default {
    props: {
      context: Object,
    },

    components: {
      UserInfo
    },

    data () {
      return {
        info: {},

        userInfoShowing: false,
        userId: null,
      }
    },

    computed: {
      hasRented () {
        return this.info.houseSpaceStatus === 'RENTED' || this.info.houseSpaceStatus === 'RESERVED'
      }
    },

    filters: {
      direction,
      houseSpaceStatus,
      decorateType,
      houseSpaceFeatureList (val) {
        if (!isArray(val) || !val.length) return '暂无信息'

        return val.map(item => houseSpaceFeature(item)).join('， ')
      }
    },

    created () {
      this.loadData()
    },

    methods: {
      loadData () {
        const { houseSpaceId } = this.context
        api.house.retrieve(houseSpaceId).then(res => {
          if (res.data.code === 200) {
            this.info = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
      },

      showPersonDetail (landlordId) {
        this.userId = landlordId
        this.userInfoShowing = true        
      },

      handleClose () {
        this.userInfoShowing = false        
      }
    }
  }

</script>

<style scoped>
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

  .house-info .house-info-item{
    line-height: 24px;
    font-size: 13px;
    padding: 10px 0;
    /*border-bottom: 1px solid #e3e3e3;*/
  }
  .house-info .house-info-item h3{
    border-bottom: 1px solid #e3e3e3;
    padding: 10px 0 5px;
    margin-top: 5px;
    margin-bottom: 10px;
  }
  .house-info .house-info-item:first-child{
    padding-top: 0;
  }
  .house-info .house-info-item:last-child{
    border-width: 0;
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
