<template>
  <!-- 托管合同列表 -->
  <div class="conList">
    <div class="list-contain-div" v-for="item in listData">
      <el-row>
        <el-col :span="4">
          <div class="">
             <img src="https://o6niowncl.qnssl.com/user-default-img-b-14.png" width="50"/>
             <p style="padding-left:10px;"><span class="name-pos">{{item.userName}}</span></p>
          </div>
        </el-col>
        <el-col :span="3">
            <div class="lin55"><p><el-tooltip class="item" effect="light" content="合同编号" placement="top"><span>{{ item.contractNumber }}</span></el-tooltip></p></div>
        </el-col>
        <el-col :span="2">
          <div class="lin55" style="margin: 0 auto;">
              <p><el-tooltip class="item" effect="light" content="合同状态" placement="top"><span>{{ item.contractStatusChange }}</span></el-tooltip></p>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="lin55">
            <!-- <p title="房源编号">{{ item.houseID }}</p> -->
              <p><el-tooltip class="item" effect="light" content="地址" placement="top"><span>{{ item.houseSpaceName }}</span></el-tooltip></p>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="lin55">
              <p><el-tooltip class="item" effect="light" content="生效时间-到期时间" placement="top"><span>{{ item.startTime }} - {{ item.endTime }}</span></el-tooltip></p>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="lin55">
              <p><el-tooltip class="item" effect="light" content="房东联系方式" placement="top"><span>{{item.phoneNum}}</span></el-tooltip></p>
          </div>
        </el-col>
        <el-col :span="2">
        	<div class="lin55" style="display: table-cell; vertical-align:middle;">
  				  <div class="el-dropdown">
                <button type="button" class="el-button el-button--default">
                  <span class="el-dropdown-link" @click="depositEditShow(item)">详情<i class="el-icon-caret-bottom el-icon--right"></i></span>
                </button>
                <ul class="el-dropdown-menu">
                  <li class="el-dropdown-menu__item" @click="depositSure(item)" v-if="item.contractStatusChange === '待签订' || item.contractStatusChange === '签订中'">确认签订</li>
                  <!-- <li class="el-dropdown-menu__item" @click="depositEditShow(item)">查看详情</li> -->
                  <li class="el-dropdown-menu__item" @click="openUploac(item)">上传附件</li>
                  <!-- <li class="el-dropdown-menu__item" @click="openContract(item)">查看合同</li> -->
                  <!-- <li class="el-dropdown-menu__item" >提前终止</li> -->
                  <!-- <li class="el-dropdown-menu__item" @click="renewFormShow()">续约</li> -->
                </ul>
            </div>
        	</div>
        </el-col>
        <slot></slot>
      </el-row>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import upload from './upload' // 上传附件
export default {
  name: 'list',
  data: function () {
    return {
    }
  },
  props: ['listData'],
  uploadData: {
    show: false,
    contractId: ''
  },
  components: {
    upload
  },
  methods: {
    depositEditShow (data) {
      this.$emit('openAddForm', data)
    },
    depositEditShow1 (data, event) {
      if (event.target.closest('.el-dropdown') === null) {
        console.log(11)
        this.$emit('openAddForm', data)
      }
    },
    renewFormShow () {
      this.$emit('renewFormShow', true)
    },
    openUploac (value) {
      // console.log(this.uploadData)
      // this.uploadData.show = true
      // this.uploadData.contractId = value.id
      this.$emit('openUploac', value.id)
    },
    depositSure (data) {
      let dataList = {}
      dataList.userPhone = parseInt(this.$store.state.currentUser.UserPhone)
      dataList.userId = this.$store.state.currentUser.uid
      dataList.contractId = data.id
      dataList.houseSpaceManagerId = data.houseSpaceManagerId
      this.$http.post(this.$store.state.contractUrl + '/updateByParStatus', dataList).then(({data}) => {
        if (data.code === 200) {
          this.$emit('depositSure', 1)
        } else if (data.code === 10029) {
          this.$emit('depositSure', 2)
        } else {
          this.$emit('depositSure', 3)
        }
      })
    },
    openContract (data) {
      this.$emit('openContract', data)
    }
  }
}
$('.el-dialog--small,.el-dialog--tiny').width(650)
</script>
<style scoped>
  .list-contain-div{
    padding: 10px 25px;
    font-size: 13px;
    color: #555;
    cursor: pointer;
    border-top:1px solid #eee;
  }
  .list-contain-div:first-child{
    border-top:none;
  }
  .lin55{
    height: 55px;
    line-height: 55px;
  }
  .pad8{
    padding: 8.5px 0;
  }
  .pad9{
    padding: 9px 0;
  }
  .el-col{
    height: 55px;
  }

  .el-dropdown{
    z-index: 1;
  }
  .el-dropdown-menu{
    top: 60px;
    transition: all .5s;
    /*opacity: 0;*/
    display: none;
    /*right: 0!important;*/
    /*left: auto;*/
    /*-webkit-opacity: 0;*/
    z-index: 0;
    background: #fff;
  }
  .el-dropdown:hover{
    z-index: 2;
    transition: all .5s;
  }
  .el-dropdown:hover .el-dropdown-menu{
    /*opacity: 1;*/
    /*-webkit-opacity: 1;*/
    display: block;
    z-index: 2;
  }
  .list-contain-div .el-col div{
    display: table;
    line-height: 25px;
  }
  .list-contain-div .el-col div p{
    display: table-cell;
    vertical-align: middle;
  }
  .el-dropdown-menu{
    top: 37px;
    margin-top: 0;
  }
.el-dropdown:hover .el-dropdown-menu{
  /*opacity: 1;*/
  /*-webkit-opacity: 1;*/
  z-index: 2;
  display: block;
}
.list-contain-div .el-col .houseSpaceStatus p{
  display: block
}
.el-dropdown-menu__item{
  font-size: 14px;
}
</style>














