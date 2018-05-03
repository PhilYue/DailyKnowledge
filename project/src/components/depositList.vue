<template>
  <!-- 托管列表  -->
  <div class="conList">
    <div class="list-contain-div" v-for="item in listData">
      <el-row>
        <el-col :span="1" style="height:55px;"></el-col>
        <el-col :span="4"><div class="lin55" title="编号">{{ item.contractNumber }}</div></el-col>
        <el-col :span="2"><div class="lin55" title="状态" style="line-height:20px; vertical-align:middle; display:table-cell"><span class="houseSpaceStatus" v-bind:class="[{ red : item.contractStatusChange==='待签订', green : item.contractStatusChange==='签订中', blue : item.contractStatusChange==='已签订' || item.contractStatusChange==='已生效' }]" :value="item.contractStatusChange">{{ item.contractStatusChange }}</span></div></el-col>
        <el-col :span="6">
          <div class="pad8">
            <p title="地址">{{ item.houseSpaceName }}</p>
            <p title="生效时间-到期时间">{{ item.startTime }} -- {{ item.endTime }}</p>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="pad8">
            <p title="房东姓名">{{item.userName}}</p>
            <p title="房东联系方式">{{item.phoneNum}}</p>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="pad8">
            <p title="租金">{{ item.rental1}}元/月<span v-if="item.deposit != ''"> | 押{{item.deposit1}}元</span></p>
            <p title="支付方式">{{ item.payWay }}</p>
          </div>
        </el-col>
        <el-col :span="2">
        	<div class="lin55">
				<div class="el-dropdown">
        <button type="button" class="el-button el-button--default">
					<span class="el-dropdown-link">
				    操作<i class="el-icon-caret-bottom el-icon--right"></i></span>
            </button>
				    <ul class="el-dropdown-menu">
				    	<li class="el-dropdown-menu__item" @click="depositEditShow(item)">查看详情</li>
				    	<!-- <li class="el-dropdown-menu__item" v-if="item.contractStatusChange === '已签订' || item.contractStatusChange === '已生效'" @click="renewFormShow(item)">续约</li> -->
              <!-- <li class="el-dropdown-menu__item" v-if="item.contractStatusChange === '已生效'" @click="ending(item)">提前终止</li> -->
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
export default {
  name: 'list',
  data: function () {
    return {
    }
  },
  methods: {
    depositEditShow (data) {
      this.$emit('listenToParentEvent', data)
    },
    renewFormShow (data) {
      this.$emit('renewFormShow', data)
    },
    ending (data) {
      this.$emit('ending', data)
    }
  },
  props: ['listData']
}
</script>
<style scoped>
.list-contain-div{
  padding: 10px 0;
  font-size: 13px;
  color: #555;
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
.el-dropdown{
	z-index: 1;
}
.el-dropdown-menu{
	top: 40px;
	transition: all .5s;
	opacity: 0;
	-webkit-opacity: 0;
	z-index: 0;
	right: 0;
	left: auto;
	background: #fff;
	display: none;
}
.el-dropdown:hover{
	z-index: 2;
	transition: all .5s;
}
.el-dropdown:hover .el-dropdown-menu{
	opacity: 1;
	-webkit-opacity: 1;
	z-index: 2;
	display: block;
}
</style>














