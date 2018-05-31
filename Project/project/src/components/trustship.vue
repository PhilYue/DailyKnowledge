 <template>
  <!-- 收房列表  -->
  <div class="conList">
    <div class="list-contain-div" v-for="item in listData">
      <el-row>
        <el-col :span="1" style="height:55px;"></el-col>
        <el-col :span="4"><div class="lin55" title="编号">{{ item.resHouseSpaceBeanList[0].businessId }}</div></el-col>
        <el-col :span="3"><div class="lin55" title="状态" style="line-height:20px; vertical-align:middle; display:table-cell"><span class="houseSpaceStatus" v-bind:class="[{ red : item.houseSpaceStatus1==='待托管', green : item.houseSpaceStatus1==='评估通过' || item.houseSpaceStatus1==='评估中' }]" :value="item.houseSpaceStatus">{{ item.houseSpaceStatus1 }}</span></div></el-col>
        <!-- <el-col :span="3"><div class="lin55" title="状态" style="line-height:20px; vertical-align:middle; display:table-cell"><span class="houseSpaceStatus" v-bind:class="[{ red : item.houseSpaceStatus==='待托管', green : item.houseSpaceStatus==='审核通过' || item.houseSpaceStatus==='评估中' }]" :value="item.houseSpaceStatus">{{ item.houseSpaceStatus }}</span></div></el-col> -->
        <el-col :span="5">
          <div class="pad8">
            <p title="地址">{{ item.resHouseSpaceBeanList[0].keywordAddress }}</p>
            <p title="时间">{{ item.startTime }}</p>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="pad8">
            <p title="审核部门">{{ item.examineDepartment }} · {{ item.examineStaff }}</p>
            <p title="审核意见">{{ item.examineResult }}</p>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="pad8">
            <p title="房东姓名">{{item.landlordName}}</p>
            <p title="房东联系方式">{{item.landlordPhone}}</p>
          </div>
        </el-col>
        <el-col :span="2">
        	<div class="lin55">
				<!-- <el-dropdown>
				  <span class="el-dropdown-link">
				    操作<i class="el-icon-caret-bottom el-icon--right"></i>
				  </span>
				  <el-dropdown-menu slot="dropdown">
				    <el-dropdown-item @click="alert(2)">查看详情</el-dropdown-item>
				    <el-dropdown-item>信息编辑</el-dropdown-item>
				    <el-dropdown-item>审核通过</el-dropdown-item>
					<el-dropdown-item>审核不通过</el-dropdown-item>
				  </el-dropdown-menu>
				</el-dropdown> -->
				<div class="el-dropdown">
            <button type="button" class="el-button el-button--default">
					<span class="el-dropdown-link">操作<i class="el-icon-caret-bottom el-icon--right"></i></span></button>
				    <ul class="el-dropdown-menu">
				    	<li class="el-dropdown-menu__item" @click="depositDeatilShow(item)">查看详情</li>
              <!-- <li class="el-dropdown-menu__item" @click="depositEditShow(item)">房源测算</li> -->
              <li class="el-dropdown-menu__item" @click="houseEditShow(item)">房源编辑</li>
              <li class="el-dropdown-menu__item" v-if="item.houseSpaceStatus1 === '待托管'" @click="depositing(item)">接受托管</li>
              <li class="el-dropdown-menu__item" v-if="item.houseSpaceStatus1 === '待托管'" @click="refuseDsposit(item)">拒绝托管</li>
				    	<li class="el-dropdown-menu__item" v-if="item.houseSpaceStatus1 === '评估中'" @click="depositapprovalY(item)">评估通过</li>
				    	<li class="el-dropdown-menu__item" v-if="item.houseSpaceStatus1 === '评估中'" @click="depositapprovalN(item)">评估不通过</li>
              <li class="el-dropdown-menu__item" v-if="item.houseSpaceStatus1 === '评估通过'" @click="depositNewTrustship(item)">新建合同</li>
              <li class="el-dropdown-menu__item" v-if="item.houseSpaceStatus1 === '托管合同已生效'" @click="houseRental(item)">房源空置</li>
              <li class="el-dropdown-menu__item" v-if="item.houseSpaceStatus1 === '托管合同已生效'" @click="depositDesgin(item)">开始设计</li>
              <li class="el-dropdown-menu__item" v-if="item.houseSpaceStatus1 === '设计中'" @click="depositDesginEnd(item)">设计完成</li>
              <li class="el-dropdown-menu__item" v-if="item.houseSpaceStatus1 === '施工中'" @click="renovationing(item)">装修完成</li>
              <li class="el-dropdown-menu__item" v-if="item.houseSpaceStatus1 === '验收中'" @click="houseCheck(item)">验收</li>
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
    refuseDsposit (data) { // 拒绝托管
      this.$emit('refuseDsposit', data)
    },
    depositDeatilShow (data) {
      this.$emit('depositDeatilShow', data)
    },
    houseEditShow (data) { // 房源编辑
      this.$emit('houseEditShow', data)
    },
    depositapprovalY (data) {
      this.$emit('depositapprovalY', true, data)
    },
    depositapprovalN (data) {
      this.$emit('depositapprovalY', false, data)
    },
    depositNewTrustship (data) {
      this.$emit('depositNewTrustship', data)
    },
    depositing (data) { // 开始审核
      this.$emit('depositing', data)
    },
    houseRental (data) { // 房源空置
      this.$emit('houseRental', data)
    },
    depositDesgin (data) { // 开始设计
      this.$emit('depositDesgin', data)
    },
    depositDesginEnd (data) { // 设计完成，开始装修
      this.$emit('depositDesginEnd', data)
    },
    renovationing (data) { // 装修完成，开始验收
      this.$emit('renovationing', data)
    },
    houseCheck (data) { // 验收完成
      this.$emit('houseCheck', data)
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
	display: none;
	z-index: 0;
	background: #fff;
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
.houseManager .houseSpaceStatus{
  width: 95px;
}
</style>














