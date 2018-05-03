
<template>
  <div class="houseManager">
    <!-- 右侧主内容区 -->
    <div  class="main-right yxr-ui" >
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="合租" name="first">
          <joint-rent @expand="handleExpandJointRent"/>
        </el-tab-pane>
        <el-tab-pane label="整租" name="second">
          <div class='search f-cb'>
            <div class='main-right-search-span mySelf'>
              <ul>
                  <div style="display:inline-block; margin-top:5px;" class="houseStatus">
                    <a class="newStatus cur"><p>全部({{statusCount.allNumber}})</p></a>
                    <a class="newStatus" id="RENTABLE"><p>空置({{statusCount.rentableNumber}})</p></a>
                    <a style="padding-right: 10px;">
                      <p class="newStatus" id="LOCKING">锁定中({{statusCount.lockingNumber}})</p>
                      <i class="p-drow"></i>
                      <ul class="p-select">
                        <li class="newStatus" id="LOCKING" data="LOCKING">锁定中({{statusCount.lockingNumber}})</li>
                        <li class="newStatus" id="RESERVED">已预订({{statusCount.reservedNumber}})</li>
                        <li class="newStatus" id="SIGNING_LC">签订合同中({{statusCount.signingLeaseContractNumber}})</li>
                        <li class="newStatus" id="LC_NOT_TE">合同未生效({{statusCount.leaseContractNotTakeEffectNumber}})</li>
                      </ul>
                    </a>
                    <a style="padding-right: 10px;">
                      <p class="newStatus" id="RENTED">已出租({{statusCount.rentedNumber}})</p>
                      <i class="p-drow"></i>
                      <ul class="p-select">
                        <li class="newStatus" id="RENTED">已出租({{statusCount.rentedNumber}})</li>
                        <li class="newStatus" id="OVERDUE_CHECK_OUT">逾期退房({{statusCount.overdueCheckOutNumber}})</li>
                        <li class="newStatus" id="EXPIRED_NEXT_HALF_MONTH">半月到期({{statusCount.expiredNextHalfMonthNumber}})</li>
                        <li class="newStatus" id="EXPIRED_THIS_MONTH">本月到期({{statusCount.expiredThisMonthNumber}})</li>
                        <li class="newStatus" id="EXPIRED_NEXT_MONTH">次月到期({{statusCount.expiredNextMonthNumber}})</li>
                      </ul>
                    </a>
                    <a class="newStatus" id="FREEZING"><p>已冻结({{statusCount.freezingNumber}})</p></a>
                  </div>
                  <div style="position: relative; width: calc((100vw - 60px) * 0.91 - 60px); margin-top:10px;">
                    <!-- <div style='margin-bottom:10px;'>
                        <span v-for="(zoneList, index) in searchData.zoneLists">
                          <div class="next" v-if="index !== 0"></div>
                          <div class="houseZone" id="aede8b194e2549aa9e0d9de96fb4bdd4" @click="chooseUnit1(zoneList)">{{zoneList.name}}</div>
                        </span>
                    </div>
                    <div>
                      <a v-for="(list, index) in searchData.zoneChildren" @click="chooseUnit2(list)">{{list.name}}</a>
                    </div> -->
                    <areaSelect @sendUnitId="getUnitId" :areaData="searchData.zoneLists"></areaSelect>
                  </div>
                </li>
              </ul>
            </div>
            <div class='main-left-search-span'>
              <el-input placeholder="请输入房源地址" auto-complete="off" style="width:300px" v-model="searchList1.keywordAddress" v-on:keyup.enter.native="houseHouseSearch"></el-input>
              <el-button type='primary' @click="houseHouseSearch">搜索</el-button>
            </div>
          </div>
          <!-- <el-button v-if="houseButtonShow && housePage > 0" type="primary" class="house_button" @click="slideDown">展开全部房源</el-button> -->
          <!-- <el-button v-if="!houseButtonShow && housePage > 0" type="primary" class="house_button" @click="slideUp">收起全部房源</el-button> -->
          <houseCard1
            :houseLists="entireRentData"
            :elTabPane="elTabPane"
            :tableDataWay="tableDataWay"
            :houseClick="houseClick"
            houseType="C"
            :searchList="searchList1"
            :newStatus = "houseSpaceStatus.DEntryType"
            :userRole="userRole"
            :role="userRole[0]"
            @openeditForm="openEditForm"
            @listenToParentEvent="openForm"
            @openDetail="openDetail"
            @openDialogVisible="openDialog"
            @addContract="addContract"
            @openRental="showPersonDetail"
            @houseCardListShow="houseCardListShow"
            @addFile="addFile"
            @synchronization="synchronization"
            @password="password"
            @frozenRental="frozenRental">
            </houseCard1>
          <div class="block"  v-if="housePage > 0">
            <el-pagination
              class="paging"
              @size-change="houseSizeChange"
              @current-change="houseCurrentChange"
              :current-page.sync="houseCurrentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="housePageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="housePage">
            </el-pagination>
          </div>
          <!-- <div class="loading" v-if="loading === 0"></div> -->
          <h3 v-if="housePage === 0 && loading !== 0" style="text-align:center; margin-top:50px;">暂无数据</h3>
        </el-tab-pane>
        <el-tab-pane label="集中式整租" name="third">
          <div class='search f-cb'>
            <div class='main-right-search-span mySelf'>
              <ul>
                  <div style="display:inline-block; margin-top:5px;" class="houseStatus">
                    <a class="newStatus cur"><p>全部({{statusCount.allNumber}})</p></a>
                    <a class="newStatus" id="RENTABLE"><p>空置({{statusCount.rentableNumber}})</p></a>
                    <a style="padding-right: 10px;">
                      <p class="newStatus" id="LOCKING">锁定中({{statusCount.lockingNumber}})</p>
                      <i class="p-drow"></i>
                      <ul class="p-select">
                        <li class="newStatus" id="LOCKING" data="LOCKING">锁定中({{statusCount.lockingNumber}})</li>
                        <li class="newStatus" id="RESERVED">已预订({{statusCount.reservedNumber}})</li>
                        <li class="newStatus" id="SIGNING_LC">签订合同中({{statusCount.signingLeaseContractNumber}})</li>
                        <li class="newStatus" id="LC_NOT_TE">合同未生效({{statusCount.leaseContractNotTakeEffectNumber}})</li>
                      </ul>
                    </a>
                    <a style="padding-right: 10px;">
                      <p class="newStatus" id="RENTED">已出租({{statusCount.rentedNumber}})</p>
                      <i class="p-drow"></i>
                      <ul class="p-select">
                        <li class="newStatus" id="RENTED">已出租({{statusCount.rentedNumber}})</li>
                        <li class="newStatus" id="OVERDUE_CHECK_OUT">逾期退房({{statusCount.overdueCheckOutNumber}})</li>
                        <li class="newStatus" id="EXPIRED_NEXT_HALF_MONTH">半月到期({{statusCount.expiredNextHalfMonthNumber}})</li>
                        <li class="newStatus" id="EXPIRED_THIS_MONTH">本月到期({{statusCount.expiredThisMonthNumber}})</li>
                        <li class="newStatus" id="EXPIRED_NEXT_MONTH">次月到期({{statusCount.expiredNextMonthNumber}})</li>
                      </ul>
                    </a>
                    <a class="newStatus" id="FREEZING"><p>已冻结({{statusCount.freezingNumber}})</p></a>
                  </div>
                  <div style="position: relative; width: calc((100vw - 60px) * 0.91 - 60px); margin-top:10px;">
                    <!-- <div style='margin-bottom:10px;'>
                        <span v-for="(zoneList, index) in searchData.zoneLists">
                          <div class="next" v-if="index !== 0"></div>
                          <div class="houseZone" @click="chooseUnit1(zoneList)">{{zoneList.name}}</div>
                        </span>
                    </div>
                    <div>
                      <a v-for="(list, index) in searchData.zoneChildren" @click="chooseUnit2(list)">{{list.name}}</a>
                    </div> -->
                    <areaSelect @sendUnitId="getUnitId" :areaData="searchData.zoneLists"></areaSelect>
                  </div>
                </li>
              </ul>
            </div>
            <div class='main-left-search-span'>
              <el-input placeholder="请输入房源地址" auto-complete="off" style="width:300px" v-model="searchList2.keywordAddress" v-on:keyup.enter.native="houseHouseSearch3"></el-input>
              <el-button type='primary' @click="houseHouseSearch3">搜索</el-button>
            </div>
          </div>
          <!-- <el-button v-if="houseButtonShow && housePage > 0" type="primary" class="house_button" @click="slideDown">展开全部房源</el-button> -->
          <!-- <el-button v-if="!houseButtonShow && housePage > 0" type="primary" class="house_button" @click="slideUp">收起全部房源</el-button> -->
          <houseCard2
            :houseLists="centralizedRentData"
            :elTabPane="elTabPane"
            :tableDataWay="tableDataWay"
            :houseClick="houseClick"
            houseType="D"
            :searchList="searchList2"
            :newStatus = "houseSpaceStatus.CEntryType"
            :userRole="userRole"
            :role="userRole[0]"
            @openeditForm="openEditForm"
            @listenToParentEvent="openForm"
            @openDetail="openDetail"
            @openDialogVisible="openDialog"
            @addContract="addContract"
            @openRental="showPersonDetail"
            @houseCardListShow="houseCardListShow"
            @addFile="addFile"
            @synchronization="synchronization"
            @password="password"
            @frozenRental="frozenRental1">
          </houseCard2>
          <h3 v-if="!centralized.hasData" style="text-align:center; margin-top:50px;">暂无数据</h3>
          <div class="block"  v-if="centralized.hasData">
            <el-pagination
              class="paging"
              @size-change="houseSizeChange1"
              @current-change="houseCurrentChange1"
              :current-page.sync="centralized.currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="centralized.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="centralized.totleSize">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>

      <!-- 房源详情开始 -->
      <houseDetail
        :houseSpaceId="detailHouseId"
        :houseDetailShows="houseDetailShow"
        :zIndex="zIndex"
        :houseDetailText="'房源详情'"
        :clickCount="clickCount"
        :detailHouseType="detailHouseType"
        :detailShowPage="detailShowPage"
        houseEditWay="1"
        @showPersonDetail="showPersonDetail"
        @showRentalDetail="showPersonDetail"
        @rentalDetail="rentalDetail"
        @houseEdit="houseEdit"
        @houseGoodAdd="houseGoodAdd"
        @goodReduce="goodReduce"
        @contractDetail="contractDetail"
        @rentContractDetail="rentContractDetail"
      ></houseDetail>
      <!-- 房源详情结束 -->

      <!-- 房源详情开始 -->
      <rentalDetail :tableData="houseDetail" :userDetailShow="rentalDetailShow" :zIndex="zIndex" :houseDetailText="'财务详情'"></rentalDetail>
      <!-- 房源详情结束 -->

      <!-- 合同详情开始 -->
      <conDetail
        :conDetail="conDetailShow"
        :houseDetailText="'合同详情'"
        conType="con"
        :contractId="contratId"
        :detailClick="detailClick"
        @closeDetail="closeForm"
        @showPersonDetail="showPersonDetail">
      </conDetail>
      <!-- 合同详情结束 -->

      <!-- 用户详情开始 -->
      <userDetail :personId="personId" :perclick="perclick" :userDetail="userDetailShow" :zIndex="zIndex" :houseDetailText="'用户详情'"></userDetail>
      <!-- 用户详情结束 -->

      <!-- 编辑测算数据 -->
      <el-dialog title="编辑测算数据" :visible.sync="dialogEditVisible">
        <depositEdit :showData="showData" :form="tableData4" @listenToParentEvent="closeEditForm"></depositEdit>
      </el-dialog>

      <!-- 修改弹窗开始 -->
      <el-dialog title="编辑房源" top="7%" :visible.sync="houseEditVisible">
        <houseEdit
          :form="houseChange"
          :houseId="houseId"
          :mix="mix"
          :disabled="true"
          :editClick="editClick"
          :formLabelWidth="formLabelWidth"
          :rentType="rentType"
          houseType="get"
          @submitEdit="submitEdit"
          @listenToParentEvent="closeForm">
        </houseEdit>
      </el-dialog>
      <!-- 修改弹窗结束 -->

      <!-- 物品新增开始 -->
      <goodAdd
        :goodFormShow="goodFormShow"
        :houseId="addHouseId"
        :goodClickCount="goodClickCount"
        @closeGoodAdd="closeGoodAdd"
        @goodAddSuccess="closeGoodAdd">
      </goodAdd>
      <!-- 物品新增结束 -->

      <!-- 物品搬出开始 -->
      <reduceGood
        :goodFormShow="goodRFormShow"
        :houseId="addHouseId"
        :reduceCount="reduceCount"
        @closeGoodAdd="closeGoodAdd"
        @submitEdit="reduceGoodSuccess">
        </reduceGood>
      <!-- 物品搬出结束 -->
      <contractForm :contractForm="contractForm" :contractFormData="contractFormData1"></contractForm>
      <!-- 上传附件 -->
      <!-- <div class="upload"> -->
      <upload :uploadData="uploadData" :uploadName="uploadName" :urlLists="urlLists" @uploadSuccess='uploadSuccess' :detailClick="detailClick" typeArr="image/png,image/jpg,image/gif,image/jpeg"></upload>
      <!-- </div> -->

      <!-- 房源门锁密码修改 -->
      <housePassword
        :pwShow="pwShow"
        :role="userRole[0]"
        :pwData="pwData"
        @closePw="closePw">
      </housePassword>

      <!-- 租客合同详情 -->
      <contractDetail :detailShow="rentContractDetailShow" :contractId="contratId"></contractDetail>
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style scoped>
@import '../../../../static/css/app.css';
/* 主内容区 */
main .main-right{padding: 30px; }
main{
  border-color: #e5e9f2;
}
.el-dialog--small.el-dialog{
  min-width: 630px!important;
}
.el-pagination{
  text-align: right;
  margin-top: 20px;
}
.house_button{
  margin-bottom: 20px;
}
.search{
  margin-bottom: 0;
}
</style>
