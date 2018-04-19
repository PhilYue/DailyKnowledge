<template>
<!-- 新建托管合同 -->
  <div class="trustshipAdd">
    <el-form :model="form" :inline="true" style="width:650px; margin:0 auto;">
      <el-form-item label="房东姓名" :label-width="formLabelWidth" class="is-required">
        <!-- <el-input v-model="form.userName"  auto-complete="off"></el-input> -->
        <el-autocomplete
          class="inline-input"
          v-model="form.userName"
          :fetch-suggestions="userQuerySearch"
          :trigger-on-focus="false"
          @select="userSelect"></el-autocomplete>
      </el-form-item>
      <el-form-item label="房东联系方式" prop="userPhone" :label-width="formLabelWidth">
        <el-input v-model="form.userPhone" auto-complete="off" @blur="userCheck"></el-input>
      </el-form-item>
      <el-form-item label="房东证件" :label-width="formLabelWidth"  class="is-required">
        <el-select v-model="form.certificateType" placeholder="" style="width:169px">
          <el-option label="身份证" value="ID"></el-option>
          <el-option label="护照" value="P"></el-option>
          <el-option label="驾驶执照" value="DL"></el-option>
          <el-option label="工商营业执照" value="BL"></el-option>
          <el-option label="港澳通行证" value="HK"></el-option>
          <el-option label="台湾通行证" value="TW"></el-option>
        </el-select>
        <el-input v-model="form.certificateNum" prop="certificateNum" auto-complete="off" style="width:300px" :minlength="15" :maxlength="18" @blur="userCheck"></el-input>
      </el-form-item>
      <el-form-item label="收款银行" :label-width="formLabelWidth">
        <el-select v-model="form.bankName" placeholder="" style="width:169px;" @change="backChange">
          <el-option :label="bank.bankName" :value="bank.bankName" :key="bank.bankName" v-for="bank in bankList"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开户支行" :label-width="formLabelWidth" class="is-required">
        <!-- <el-select v-model="form.bankOfAccounts" filterable :filter-method="bankQuerySearch" style="width:169px;">
          <el-option
            v-for="item in bankOfAccount"
            :key="item.branchBankName"
            :label="item.branchBankName"
            :value="item.branchBankName">
          </el-option>
        </el-select> -->
        <el-autocomplete
          class="inline-input"
          v-model="form.bankOfAccounts"
          :fetch-suggestions="bankQuerySearch"
          placeholder=""
          :trigger-on-focus="false"></el-autocomplete>
      </el-form-item>
      <el-form-item label="收款账号" :label-width="formLabelWidth" class="is-required">
        <el-input v-model="form.bankAccount" auto-complete="off" placeholder="" style=""></el-input>
      </el-form-item>
      <el-form-item label="收款人姓名" :label-width="formLabelWidth"  class="is-required">
        <el-input v-model="form.payeeName" auto-complete="off" placeholder=""></el-input>
      </el-form-item>
      <div style="border-bottom:1px solid #cecece; width: 610px; margin-bottom: 22px;"></div>
      <el-form-item label="地址" :label-width="formLabelWidth" required>
        <el-form-item>
          <el-autocomplete class="inline-input" v-model="form.blockName" :fetch-suggestions="querySearch1" placeholder="" @select="handleSelect"></el-autocomplete>
        </el-form-item>
        <el-input v-model="form.buildingNo" auto-complete="off" style="width:70px; margin-right:5px;"></el-input>栋
        <el-input v-model="form.unitNo" auto-complete="off" style="width:70px; margin-right:5px; margin-left: 5px;"></el-input>单元
        <el-form-item prop="roomNo">
         <el-input v-model="form.roomNo" auto-complete="off" style="width:70px; margin-right:5px; margin-left: 5px;"></el-input>号
        </el-form-item>
      </el-form-item>
      <div>
      <el-form-item label="户型" :label-width="formLabelWidth">
        <el-select v-model="form.bedroomNumber" style="width:115px">
          <el-option label="1室" value="1"></el-option>
          <el-option label="2室" value="2"></el-option>
          <el-option label="3室" value="3"></el-option>
          <el-option label="4室" value="4"></el-option>
          <el-option label="5室" value="5"></el-option>
          <el-option label="6室" value="6"></el-option>
        </el-select>
        <el-select v-model="form.livingRoomNumber" style="width:115px">
          <el-option label="1厅" value="1"></el-option>
          <el-option label="2厅" value="2"></el-option>
          <el-option label="3厅" value="3"></el-option>
          <el-option label="4厅" value="4"></el-option>
          <el-option label="5厅" value="5"></el-option>
          <el-option label="6厅" value="6"></el-option>
        </el-select>
        <el-select v-model="form.kitchenNumber" style="width:115px">
          <el-option label="1厨" value="1"></el-option>
          <el-option label="2厨" value="2"></el-option>
          <el-option label="3厨" value="3"></el-option>
          <el-option label="4厨" value="4"></el-option>
          <el-option label="5厨" value="5"></el-option>
          <el-option label="6厨" value="6"></el-option>
        </el-select>
        <el-select v-model="form.toiletNumber" style="width:115px">
          <el-option label="1卫" value="1"></el-option>
          <el-option label="2卫" value="2"></el-option>
          <el-option label="3卫" value="3"></el-option>
          <el-option label="4卫" value="4"></el-option>
          <el-option label="5卫" value="5"></el-option>
          <el-option label="6卫" value="6"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="片区" :label-width="formLabelWidth">
        <el-cascader v-model="form.zoneData" :options="unit" @change="unitChange" :props="props" :show-all-levels="false" style="width:169px;"></el-cascader>
        <!-- <el-select v-model="form.zoneId" style="width:169px" @change="unitChange">
          <el-option v-for="item in unit" :label="item.text" :value="item.id" :key="item.text"></el-option>
        </el-select> -->
      </el-form-item>
      <el-form-item label="装修类型" label-width="120px">
        <el-select v-model="form.decorateType" style="width: 169px;">
          <el-option label="毛坯房" value="R"></el-option>
          <el-option label="简装" value="S"></el-option>
          <el-option label="精装修" value="RD"></el-option>
          <el-option label="豪华装修" value="A"></el-option>
        </el-select>
      </el-form-item>
      </div>
        <el-form-item label="总楼高" label-width="120px" required>
          <el-select v-model="form.floorHeight" style="width: 169px;">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
            <el-option label="6" value="6"></el-option>
            <el-option label="7" value="7"></el-option>
            <el-option label="8" value="8"></el-option>
            <el-option label="9" value="9"></el-option>
            <el-option label="10" value="10"></el-option>
            <el-option label="11" value="11"></el-option>
            <el-option label="12" value="12"></el-option>
            <el-option label="13" value="13"></el-option>
            <el-option label="14" value="14"></el-option>
            <el-option label="15" value="15"></el-option>
            <el-option label="16" value="16"></el-option>
            <el-option label="17" value="17"></el-option>
            <el-option label="18" value="18"></el-option>
            <el-option label="19" value="19"></el-option>
            <el-option label="20" value="20"></el-option>
            <el-option label="21" value="21"></el-option>
            <el-option label="22" value="22"></el-option>
            <el-option label="23" value="23"></el-option>
            <el-option label="24" value="24"></el-option>
            <el-option label="25" value="25"></el-option>
            <el-option label="26" value="26"></el-option>
            <el-option label="27" value="27"></el-option>
            <el-option label="28" value="28"></el-option>
            <el-option label="29" value="29"></el-option>
            <el-option label="30" value="30"></el-option>
            <el-option label="31" value="31"></el-option>
            <el-option label="32" value="32"></el-option>
            <el-option label="33" value="33"></el-option>
            <el-option label="34" value="34"></el-option>
            <el-option label="35" value="35"></el-option>
            <el-option label="36" value="36"></el-option>
            <el-option label="37" value="37"></el-option>
            <el-option label="38" value="38"></el-option>
            <el-option label="39" value="39"></el-option>
            <el-option label="40" value="40"></el-option>
          </el-select>
        </el-form-item>
      <el-form-item label="房源性质" label-width="120px">
        <el-radio class="radio" v-model="form.rentType" label="JOINT_RENT">合租</el-radio>
        <el-radio class="radio" v-model="form.rentType" label="ENTIRE_RENT">整租</el-radio>
      </el-form-item>
      <el-form-item label="房源面积" :label-width="formLabelWidth" required>
        <el-input v-model="form.houseSpaceManagerArea1" auto-complete="off"></el-input>
        <p class="houseSizeP">㎡</p>
      </el-form-item>
      <el-form-item label="购买保险" label-width="120px">
        <el-radio class="radio" v-model="form.insuranceStatus" label="YES">是</el-radio>
        <el-radio class="radio" v-model="form.insuranceStatus" label="NO">否</el-radio>
      </el-form-item>
      <el-form-item label="所在楼层" label-width="120px" required>
        <el-select v-model="form.currentFloor" style="width: 169px;">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
          <el-option label="5" value="5"></el-option>
          <el-option label="6" value="6"></el-option>
          <el-option label="7" value="7"></el-option>
          <el-option label="8" value="8"></el-option>
          <el-option label="9" value="9"></el-option>
          <el-option label="10" value="10"></el-option>
          <el-option label="11" value="11"></el-option>
          <el-option label="12" value="12"></el-option>
          <el-option label="13" value="13"></el-option>
          <el-option label="14" value="14"></el-option>
          <el-option label="15" value="15"></el-option>
          <el-option label="16" value="16"></el-option>
          <el-option label="17" value="17"></el-option>
          <el-option label="18" value="18"></el-option>
          <el-option label="19" value="19"></el-option>
          <el-option label="20" value="20"></el-option>
          <el-option label="21" value="21"></el-option>
          <el-option label="22" value="22"></el-option>
          <el-option label="23" value="23"></el-option>
          <el-option label="24" value="24"></el-option>
          <el-option label="25" value="25"></el-option>
          <el-option label="26" value="26"></el-option>
          <el-option label="27" value="27"></el-option>
          <el-option label="28" value="28"></el-option>
          <el-option label="29" value="29"></el-option>
          <el-option label="30" value="30"></el-option>
          <el-option label="31" value="31"></el-option>
          <el-option label="32" value="32"></el-option>
          <el-option label="33" value="33"></el-option>
          <el-option label="34" value="34"></el-option>
          <el-option label="35" value="35"></el-option>
          <el-option label="36" value="36"></el-option>
          <el-option label="37" value="37"></el-option>
          <el-option label="38" value="38"></el-option>
          <el-option label="39" value="39"></el-option>
          <el-option label="40" value="40"></el-option>
        </el-select>
      </el-form-item>
      <div>
        <el-form-item label="房屋证件类型" label-width="120px" required>
          <el-select v-model="form.houseCertificateType" style="width: 169px;">
            <el-option label="房屋所有权证书" value="OFFICIAL"></el-option>
            <el-option label="预售证书" value="PRE_SELL"></el-option>
            <el-option label="抽签通知证书" value="DRAW_NOTIFY"></el-option>
            <el-option label="其他" value="OTHER"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房屋证件号" label-width="120px" required>
          <el-input v-model="form.houseOwnershipCertificateNumber" auto-complete="off"></el-input>
        </el-form-item>
      </div>
      <!-- {{unit}} -->
      <!-- <el-form-item label="朝向" :label-width="formLabelWidth" label-width="55px">
        <el-select v-model="form.direction" placeholder="东" style="width:90px">
          <el-option label="东" value="EAST"></el-option>
          <el-option label="南" value="SOUTH"></el-option>
          <el-option label="西" value="WEST"></el-option>
          <el-option label="北" value="NORTH"></el-option>
          <el-option label="东南" value="SOUTHEAST"></el-option>
          <el-option label="东北" value="NORTHEAST"></el-option>
          <el-option label="西南" value="SOUTHWEST"></el-option>
          <el-option label="西北" value="NORTHWEST"></el-option>
        </el-select>
      </el-form-item> -->
      <div style="border-bottom:1px solid #cecece; width: 610px; margin-bottom: 22px;"></div>
      <!-- <div style="border-top:1px solid #ccc; margin-bottom:22px; width:100%;"></div> -->

      <el-form-item label="托管开始时间"  :label-width="formLabelWidth"  class="is-required">
          <el-date-picker type="date" placeholder="" v-model="form.startTime" style="width: 169px;" @change="chooseEndTime2"></el-date-picker>
          <!-- <el-date-picker type="date" placeholder="" v-model="form.endTime"  style="width: 146px;" placeholder="托管结束时间" @change="chooseEndTime2"></el-date-picker>
          <el-radio-group v-model="form.during" @change="changeDuringTime" class="radio">
            <el-radio-button label="3年"></el-radio-button>
            <el-radio-button label="4年"></el-radio-button>
            <el-radio-button label="5年"></el-radio-button>
            <el-radio-button label="6年"></el-radio-button>
          </el-radio-group> -->
      </el-form-item>
      <el-form-item label="合同时长" :label-width="formLabelWidth" class="is-required">
        <el-select v-model="form.year" style="width:46px;" @change="chooseEndTime2" class="displaySelect">
          <el-option label="0" value="0"></el-option>
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
          <el-option label="5" value="5"></el-option>
          <el-option label="6" value="6"></el-option>
          <el-option label="7" value="7"></el-option>
          <el-option label="8" value="8"></el-option>
          <el-option label="9" value="9"></el-option>
          <el-option label="10" value="10"></el-option>
          <el-option label="11" value="11"></el-option>
          <el-option label="12" value="12"></el-option>
          <el-option label="13" value="13"></el-option>
          <el-option label="14" value="14"></el-option>
          <el-option label="15" value="15"></el-option>
          <el-option label="16" value="16"></el-option>
          <el-option label="17" value="17"></el-option>
          <el-option label="18" value="18"></el-option>
          <el-option label="19" value="19"></el-option>
          <!-- <el-option label="20" value="20"></el-option> -->
        </el-select>
        <p style="width:13px; text-align:left; display: inline-block; margin-left: -3px;">年</p>
        <el-select v-model="form.month" style="width:46px;" @change="chooseEndTime2" class="displaySelect">
          <el-option label="0" value="0"></el-option>
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
          <el-option label="5" value="5"></el-option>
          <el-option label="6" value="6"></el-option>
          <el-option label="7" value="7"></el-option>
          <el-option label="8" value="8"></el-option>
          <el-option label="9" value="9"></el-option>
          <el-option label="10" value="10"></el-option>
          <el-option label="11" value="11"></el-option>
          <!-- <el-option label="12" value="12"></el-option> -->
        </el-select>
        <p style="width:13px; text-align:center; display: inline-block; margin-left: -3px;">月</p>
        <el-select v-model="form.day" style="width:46px;" @change="chooseEndTime2" class="displaySelect">
          <el-option label="0" value="0"></el-option>
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
          <el-option label="5" value="5"></el-option>
          <el-option label="6" value="6"></el-option>
          <el-option label="7" value="7"></el-option>
          <el-option label="8" value="8"></el-option>
          <el-option label="9" value="9"></el-option>
          <el-option label="10" value="10"></el-option>
          <el-option label="11" value="11"></el-option>
          <el-option label="12" value="12"></el-option>
          <el-option label="13" value="13"></el-option>
          <el-option label="14" value="14"></el-option>
          <el-option label="15" value="15"></el-option>
          <el-option label="16" value="16"></el-option>
          <el-option label="17" value="17"></el-option>
          <el-option label="18" value="18"></el-option>
          <el-option label="19" value="19"></el-option>
          <el-option label="20" value="20"></el-option>
          <el-option label="21" value="21"></el-option>
          <el-option label="22" value="22"></el-option>
          <el-option label="23" value="23"></el-option>
          <el-option label="24" value="24"></el-option>
          <el-option label="25" value="25"></el-option>
          <el-option label="26" value="26"></el-option>
          <el-option label="27" value="27"></el-option>
          <el-option label="28" value="28"></el-option>
          <el-option label="29" value="29"></el-option>
          <el-option label="30" value="30"></el-option>
          <!-- <el-option label="31" value="31"></el-option> -->
        </el-select>
        <p style="width:14px; text-align:center; display: inline-block; margin-left: -3px;">日</p>
      </el-form-item>
      <el-form-item label="托管结束时间"  :label-width="formLabelWidth"  class="is-required">
        <el-date-picker type="date" placeholder="" v-model="form.endTime" style="width: 169px;" :disabled="true"></el-date-picker>
      </el-form-item>
        <!-- <el-form-item label="免租方式" :label-width="formLabelWidth" required>
          <el-select v-model="form.payMethod" placeholder="请选择" style="width:169px;">
            <el-option label="一次性免租" value="ONECR"></el-option>
            <el-option label="周期性免租" value="CYCLE"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="免租期" :label-width="formLabelWidth" required v-if="form.payMethod === 'CYCLE'">
          <el-input v-model="form.payTime" auto-complete="off" placeholder="" style=""></el-input>
          <p class="houseSizeP">天/年</p>
        </el-form-item>
        <div v-if="form.payMethod === 'ONECR'">
          <el-form-item label="免租开始时间" :label-width="formLabelWidth" required>
            <el-date-picker type="date" placeholder="" v-model="form.freeStartTime"  style="width: 165px;"></el-date-picker>
          </el-form-item>
          <el-form-item label="免租结束时间" :label-width="formLabelWidth">
            <el-date-picker type="date" placeholder="" v-model="form.freeEndTime"  style="width: 165px;"></el-date-picker>
          </el-form-item>
        </div> -->
        <!-- <el-form-item label="免租开始时间" :label-width="formLabelWidth" v-if="form.addType !== '3'">
            <el-date-picker type="date" placeholder="" v-model="form.freeStartTime"  style="width: 169px;"></el-date-picker>
        </el-form-item>
        <el-form-item label="免租结束时间" :label-width="formLabelWidth" v-if="form.addType !== '3'">
            <el-date-picker type="date" placeholder="" v-model="form.freeEndTime"  style="width: 169px;"></el-date-picker>
        </el-form-item> -->
        <div>
          <el-form-item label="免租方式" :label-width="formLabelWidth">
            <el-select v-model="form.freeStyle" style="width:169px;">
              <el-option label="无" value="0"></el-option>
              <el-option label="一次性免租" value="1"></el-option>
              <el-option label="周期性免租" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="免租时长" :label-width="formLabelWidth" v-if="form.freeStyle !== '0'">
            <el-select v-model="form.freeMonth" style="width:75px;" class="displaySelect">
              <el-option label="0" value="0"></el-option>
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="5" value="5"></el-option>
              <el-option label="6" value="6"></el-option>
              <el-option label="7" value="7"></el-option>
              <el-option label="8" value="8"></el-option>
              <el-option label="9" value="9"></el-option>
              <el-option label="10" value="10"></el-option>
              <!-- <el-option label="11" value="11"></el-option>
              <el-option label="12" value="12"></el-option> -->
            </el-select>
            <p style="width:13px; text-align:center; display: inline-block; margin-left: -3px;">月</p>
            <el-select v-model="form.freeDay" style="width:75px;" class="displaySelect">
              <el-option label="0" value="0"></el-option>
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="5" value="5"></el-option>
              <el-option label="6" value="6"></el-option>
              <el-option label="7" value="7"></el-option>
              <el-option label="8" value="8"></el-option>
              <el-option label="9" value="9"></el-option>
              <el-option label="10" value="10"></el-option>
              <el-option label="11" value="11"></el-option>
              <el-option label="12" value="12"></el-option>
              <el-option label="13" value="13"></el-option>
              <el-option label="14" value="14"></el-option>
              <el-option label="15" value="15"></el-option>
              <el-option label="16" value="16"></el-option>
              <el-option label="17" value="17"></el-option>
              <el-option label="18" value="18"></el-option>
              <el-option label="19" value="19"></el-option>
              <el-option label="20" value="20"></el-option>
              <el-option label="21" value="21"></el-option>
              <el-option label="22" value="22"></el-option>
              <el-option label="23" value="23"></el-option>
              <el-option label="24" value="24"></el-option>
              <el-option label="25" value="25"></el-option>
              <el-option label="26" value="26"></el-option>
              <el-option label="27" value="27"></el-option>
              <el-option label="28" value="28"></el-option>
              <el-option label="29" value="29"></el-option>
              <el-option label="30" value="30"></el-option>
              <!-- <el-option label="31" value="31"></el-option> -->
            </el-select>
            <p style="width:12px; text-align:center; display: inline-block; margin-left: -3px;">日</p>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="空置期" :label-width="formLabelWidth">
            <el-select v-model="form.decorationStyle" style="width:169px;">
              <el-option label="无" value="0"></el-option>
              <el-option label="有" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="空置时长" :label-width="formLabelWidth" v-if="form.decorationStyle !== '0'">
            <el-select v-model="form.decorationMonth" style="width:75px;" class="displaySelect">
              <el-option label="0" value="0"></el-option>
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="5" value="5"></el-option>
              <el-option label="6" value="6"></el-option>
              <el-option label="7" value="7"></el-option>
              <el-option label="8" value="8"></el-option>
              <el-option label="9" value="9"></el-option>
              <el-option label="10" value="10"></el-option>
              <!-- <el-option label="11" value="11"></el-option>
              <el-option label="12" value="12"></el-option> -->
            </el-select>
            <p style="width:13px; text-align:center; display: inline-block; margin-left: -3px;">月</p>
            <el-select v-model="form.decorationDay" style="width:75px;" class="displaySelect">
              <el-option label="0" value="0"></el-option>
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="5" value="5"></el-option>
              <el-option label="6" value="6"></el-option>
              <el-option label="7" value="7"></el-option>
              <el-option label="8" value="8"></el-option>
              <el-option label="9" value="9"></el-option>
              <el-option label="10" value="10"></el-option>
              <el-option label="11" value="11"></el-option>
              <el-option label="12" value="12"></el-option>
              <el-option label="13" value="13"></el-option>
              <el-option label="14" value="14"></el-option>
              <el-option label="15" value="15"></el-option>
              <el-option label="16" value="16"></el-option>
              <el-option label="17" value="17"></el-option>
              <el-option label="18" value="18"></el-option>
              <el-option label="19" value="19"></el-option>
              <el-option label="20" value="20"></el-option>
              <el-option label="21" value="21"></el-option>
              <el-option label="22" value="22"></el-option>
              <el-option label="23" value="23"></el-option>
              <el-option label="24" value="24"></el-option>
              <el-option label="25" value="25"></el-option>
              <el-option label="26" value="26"></el-option>
              <el-option label="27" value="27"></el-option>
              <el-option label="28" value="28"></el-option>
              <el-option label="29" value="29"></el-option>
              <el-option label="30" value="30"></el-option>
              <el-option label="31" value="31"></el-option>
            </el-select>
            <p style="width:12px; text-align:center; display: inline-block; margin-left: -3px;">日</p>
          </el-form-item>
        </div>
        <!-- </el-form-item> -->
        <el-form-item label="收房价格" :label-width="formLabelWidth" class="is-required">
            <el-input v-model="form.rental1" auto-complete="off" placeholder="" @change="changeRental"></el-input>
            <p class="houseSizeP">元/月</p>
        </el-form-item>
        <el-form-item label="押金" :label-width="formLabelWidth" class="is-required">
            <el-input v-model="form.deposit1" auto-complete="off" placeholder="" style=""></el-input>
            <p class="houseSizeP">元</p>
        </el-form-item>
       <!--  <el-form-item label="违约金" :label-width="formLabelWidth" class="is-required">
            <el-input v-model="form.penalty1" auto-complete="off" placeholder="" style=""></el-input>
            <p class="houseSizeP">元</p>
        </el-form-item> -->
        <el-form-item label="付款周期" :label-width="formLabelWidth">
          <el-select v-model="form.payCycle" placeholder="请选择" style="width:169px;">
            <el-option label="月付" value="ONEMON"></el-option>
            <el-option label="二月付" value="TWOMON"></el-option>
            <el-option label="四月付" value="FOURMON"></el-option>
            <el-option label="季付" value="THREEMON"></el-option>
            <el-option label="半年付" value="SIXMON"></el-option>
            <el-option label="一年付" value="TWELVEMON"></el-option>
            <el-option label="全付" value="ONEPAY"></el-option>
          </el-select>
        </el-form-item>
        <div>
        <el-form-item label="租金递增方式" :label-width="formLabelWidth">
          <el-select v-model="form.addType" placeholder="" style="width:169px;" @change="openAddType">
            <el-option label="无" value="NOTRISE"></el-option>
            <el-option label="按金额递增" value="RISEBYAMOUNT"></el-option>
            <el-option label="按百分比递增" value="RISEBYPER"></el-option>
            <el-option label="不规则递增" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="按金额递增" v-if="form.addType == 'RISEBYAMOUNT'" :label-width="formLabelWidth">
          <el-input v-model="form.addAmount1" auto-complete="off" placeholder=""></el-input>
          <p class="houseSizeP">元/月</p>
        </el-form-item>
        <el-form-item label="按百分比递增" v-if="form.addType == 'RISEBYPER'" :label-width="formLabelWidth">
          <el-input v-model="form.addPer1" auto-complete="off" placeholder=""></el-input>
          <p class="houseSizeP">%</p>
        </el-form-item>
        <el-form-item label="租金递增周期" :label-width="formLabelWidth" v-if="form.addType == 'RISEBYAMOUNT' || form.addType == 'RISEBYPER'">
          <el-select v-model="form.addCycle" placeholder="" style="width:169px;">
            <el-option label="无" value="NORISE"></el-option>
            <el-option label="一月一次" value="ONEMON"></el-option>
            <el-option label="两月一次" value="TWOMON"></el-option>
            <el-option label="三月一次" value="THREEMON"></el-option>
            <el-option label="四月一次" value="FOURMON"></el-option>
            <el-option label="半年一次" value="SIXMON"></el-option>
            <el-option label="一年一次" value="TWELVEMON"></el-option>
          </el-select>
        </el-form-item>
      </div>
        <!-- <el-form-item label="水底数" class="is-required" :label-width="formLabelWidth">
          <el-input v-model="form.waterMeterNumber1" auto-complete="off" placeholder="" style=""></el-input>
        </el-form-item>
        <el-form-item label="电底数" class="is-required" :label-width="formLabelWidth">
          <el-input v-model="form.electricMeterNumber1" auto-complete="off" placeholder="" style=""></el-input>
        </el-form-item>
        <el-form-item label="天然气底数" class="is-required" :label-width="formLabelWidth">
          <el-input v-model="form.gasMeterNumber1" auto-complete="off" placeholder="" style=""></el-input>
        </el-form-item> -->
      <el-form-item label="授权代表" :label-width="formLabelWidth"  class="is-required">
        <el-cascader v-model="form.housekeeper" placeholder="授权代表" :options="options2" @change="changeHouseKeeper" :props="props" :show-all-levels="false" style="width:169px;"></el-cascader>
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input type="textarea" placeholder="" v-model="form.memo" style="width:470px;"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeForm()">取 消</el-button>
      <el-button type="primary" @click="submitForm('form')">确 定</el-button>
    </div>


    <el-dialog title="定义递增方式" :visible.sync="addTypeShow" :modal="modal" size="full">
      <el-form :model="form" :inline="true" label-width="100px">
        <div>
          <table style="width:100%;" border="1">
            <tr>
              <td style="width:28%;">递增时间</td>
              <!-- <td>结束时间</td> -->
              <td>金额</td>
              <!-- <td>免租开始时间</td>
              <td>免租结束时间</td> -->
              <td style="width:28%;">递增标准</td>
              <!-- <td>递增周期</td> -->
            </tr>
            <tr v-for="(item, index) in addWay">
              <td>
                  <el-date-picker
                    v-model="item.time"
                    type="date"
                    size="mini"
                    class="date"
                    :readonly="readonly"
                    :style="width">
                  </el-date-picker> - 
                  <el-date-picker
                    v-model="item.endTime"
                    type="date"
                    size="mini"
                    class="date"
                    :readonly="readonly"
                    :style="width">
                  </el-date-picker>
              </td>
              <!-- <td>
                  <el-date-picker
                    v-model="item.endtime"
                    type="date"
                    size="mini"
                    class="date"
                    @change="chooseEndTime(item, index)"
                    :style="width">
                  </el-date-picker>
              </td> -->
              <td v-if="index === 0">
                  {{item.amount}}
              </td>
              <td v-if="index > 0">
                  <el-input v-model="item.amount" auto-complete="off" :style="width" size="mini"></el-input>
              </td>
              <!-- <td>
                  <el-date-picker type="date" class="date" placeholder="" v-model="item.rentFreeStart" size="mini" :style="width"></el-date-picker>
              </td> -->
              <!-- <td>
                  <el-date-picker
                    v-model="item.rentFreeEnd"
                    type="date"
                    size="mini"
                    class="date"
                    @onClick="chooseTime(item)"
                    :style="width">
                  </el-date-picker>
              </td> -->
              <td>
                  <el-form-item label="" label-width="0px" style="margin-right:0px; margin-bottom:0; line-height:22px;" v-if="index > 0">
                    <el-input v-model="item.addPer1" auto-complete="off" placeholder="" size="mini" @change="changePrice(item, index)" style="width:70px"></el-input>
                    <p class="houseSizeP">%</p>
                  </el-form-item>
                  <el-form-item label="" label-width="0px" style="margin-right:0px; margin-bottom:0; line-height:22px;" v-if="index > 0">
                    <el-input v-model="item.addAmount1" auto-complete="off" placeholder="" size="mini" @change="changePrice(item, index)" style="width:90px"></el-input>
                    <p class="houseSizeP">元/月</p>
                  </el-form-item>
              </td>
             <!--  <td>
                <div style="position:relative">
                  <el-select v-model="item.addCycle" placeholder="" :style="width" size="mini">
                    <el-option label="无" value="NORISE"></el-option>
                    <el-option label="一月一次" value="ONEMON"></el-option>
                    <el-option label="两月一次" value="TWOMON"></el-option>
                    <el-option label="三月一次" value="THREEMON"></el-option>
                    <el-option label="四月一次" value="FOURMON"></el-option>
                    <el-option label="半年一次" value="SIXMON"></el-option>
                    <el-option label="一年一次" value="TWELVEMON"></el-option>
                  </el-select>
                  <p class="add" @click="addHouseType" v-if="index === (addWay.length - 1)"></p>
                </div>
              </td> -->
            </tr>
          </table>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addTypeShow = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="选择省市" :visible.sync="addShow" :modal="modal" size="tiny" top="70%" class="addShow">
      <el-form :model="form" :inline="true" label-width="100px">
        <div>
          <el-form-item label="省市区" :label-width="formLabelWidth">
            <el-select v-model="form.province" style="width:145px" placeholder="选择省份" @change="changeP">
              <el-option v-for="list in address.pLists" :key="list.province" :label="list.province" :value="list.provinceId"></el-option>
            </el-select>
            <el-select v-model="form.city" style="width:145px" placeholder="选择城市" @change="changeC">
              <el-option v-for="list in address.cLists" :key="list.city" :label="list.city" :value="list.cityId"></el-option>
            </el-select>
            <el-select v-model="form.district" style="width:145px" placeholder="选择区县" @change="changeD">
              <el-option v-for="list in address.dLists" :key="list.area" :label="list.area" :value="list.areaId"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="addShow = false">取 消</el-button> -->
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  name: 'trusteeshopAdd',
  beforeCreate: function () {
    var uesrApi = this.$store.state.accountUrl + 'user/list' // 房东
    // let treeArea = this.$store.state.accountUrl + 'unit/tree/f/area'
    // 搜索小区
    // this.$options.methods.unitSelect(this, treeArea)
    // 搜索小区
    var dataList = {}
    dataList.userType = 'P'
    // // 搜索房东
    // this.$options.methods.landlordSearch(this, uesrApi, dataList)
    dataList.userType = 'M'
    this.$options.methods.repSearch(this, uesrApi, dataList)
  },
  created: function () {
    let username = ''
    this.$http.get(this.$store.state.accountUrl + 'user/info/id/' + this.$store.state.currentUser.uid,
    ).then(function (response) {
      var data = response.data
      if (data.code === 200) {
        username = data.data.username
        // this.form.housekeeper[0] = '小管家'
        this.form.housekeeper = [localStorage.getItem('role'), username]
        this.form.housekeeperName = username
        this.form.housekeeperPhone = this.$store.state.currentUser.UserPhone
        this.form.housekeeperId = this.$store.state.currentUser.uid
      }
    })

    let _this = this
    let req = {}
    req.baseDataType = 'SECOND_LEVEL_BANK_INFO'
    req.bankName = ''
    this.$http.post(this.bankSearch, {'baseDataType': 'FIRST_LEVEL_BANK_INFO'}).then(function (res) {
      res = res.body
      if (res.code === 200) {
        _this.bankList = res.data
        _this.form.bankName = res.data[0].bankName
        req.bankName = res.data[0].bankName
        _this.$http.post(_this.bankSearch, req).then(res => {
          if (res.body.code === 200) {
            if (res.body.data.length > 10) {
              _this.bankOfAccount = res.body.data.slice(0, 10)
              _this.bankOfAccounts = res.body.data
            } else {
              _this.bankOfAccounts = res.body.data
              _this.bankOfAccount = res.body.data
            }
          }
        })
      }
    })

    let treeArea = this.$store.state.accountUrl + 'unit/tree/f/area'
    // this.$http.get(treeArea).then(({data}) => {
    //   // var data1 = data.data.children[0].children
    //   var data1 = data.data.children
    //   console.log(data1)
    //   this.unitFormat(this, data.data.children)
    //   this.unit = data1
    //   this.form.zone = this.unit[0].text
    //   this.form.zoneId = this.unit[0].id
    // })
    this.$options.methods.unitSelect(this, treeArea)
  },
  data: function () {
    return {
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      landlord: '房东',
      renter: '租客',
      options2: JSON.parse(this.$store.state.currentUser.houseData),
      // options2: JSON.parse(this.$store.state.currentUser.houseData),
      props: {
        value: 'label',
        children: 'cities'
      },
      unitProps: {
        value: 'text',
        children: 'children'
      },
      addShow: false,
      addShdow: false,
      rules2: {
        userName: [{required: true, message: '请填写房东姓名', trigger: 'blur'}],
        userPhone: [{required: true, message: '请填写房东联系方式', trigger: 'blur'}],
        certificateNum: [{required: true, message: '请填写房东证件号码', trigger: 'blur'}],
        rental: [
          {required: true, message: '请填写收房价格', trigger: 'blur'}
        ],
        rental1: [
          {required: true, message: '请填写收房价格', trigger: 'blur'}
        ],
        bankAccount: [{required: true, message: '请填写收款账号', trigger: 'blur'}],
        bankOfAccounts: [{required: true, message: '请填写开户支行', trigger: 'blur'}],
        deposit: [{required: true, message: '请填写押金数额', trigger: 'blur'}
        ]
      },
      form: {
        uId: '',
        houseSpaceManagerId: '',
        businessId: '',
        blockName: '',
        detailAddress: '',
        startTime: '', // 托管开始时间
        endTime: '', // 托管结束时间
        freeStartTime: '', // 免租开始时间
        freeEndTime: '', // 免租结束时间
        rental: '', // 收房价格
        deposit: 0, // 押金
        rental1: '', // 收房价格
        deposit1: '', // 押金
        payWay: '1',
        during: '',
        payCycle: 'ONEMON', // 支付周期
        addType: 'NOTRISE', // 租金递增方式
        addCycle: 'NORISE', // 租金递增周期
        addAmount: '',
        addPer: '',
        addAmount1: '',
        addPer1: '',
        payMethod: 'CYCLE',
        payTime: '',
        buildingNo: '', // 楼号
        unitNo: '', // 单元号
        roomNo: '', // 室号
        payeeName: '', // 收款人姓名
        bankAccount: '', // 收款账号
        bankName: '网络有误', // 收款银行
        bankOfAccounts: '', // 开户支行
        memo: '',
        houseSpaceId: '',
        conType: '1', // 合同分类
        housekeeperName: '', // 小管家姓名
        housekeeperPhone: '', // 小管家联系方式
        housekeeper: [],
        userName: '',
        waterMeterReading: '', // 水表读数
        electricMeterReading: '', // 电表读数
        gasMeterReading: '', // 天然气读数
        waterMeterNumber1: '', // 水表读数
        electricMeterNumber1: '', // 电表读数
        gasMeterNumber1: '', // 天然气读数
        certificateType: 'ID', // 房东证件类型
        certificateNum: '', // 房东证件号
        userPhone: '', // 房东手机号
        bedroomNumber: '1',
        livingRoomNumber: '1',
        toiletNumber: '1',
        kitchenNumber: '1',
        direction: 'EAST',
        houseSpaceManagerArea1: '',
        houseSpaceManagerArea: '',
        rentType: 'JOINT_RENT',
        decorateType: 'R',
        zoneId: '',
        zone: '',
        district: '',
        insuranceStatus: 'YES',
        houseOwnershipCertificateNumber: '', // 房产证号
        penalty: '',
        penalty1: '',
        freeStyle: '0',
        year: '0',
        month: '0',
        day: '0',
        freeMonth: '0',
        freeDay: '0',
        decorationStyle: '0',
        decorationMonth: '0',
        decorationDay: '0',
        floorHeight: '',
        city: '',
        province: '',
        blockId: '',
        zoneData: [],
        currentFloor: '',
        houseCertificateType: 'OFFICIAL', // 房屋证件类型
        reqChargInputLogBeanList: [ // 计费规则
          {
            payCycle: 'ONEMON',
            addAmount1: '',
            addAmount: '',
            addPer1: '',
            addPer: '',
            addCycle: 'NORISE',
            addType: 'NOTRISE',
            businessType: '',
            chargType: 'REN',
            cycle: 'ONEMON',
            endChargTime: '',
            financeType: 'INC',
            initialAmount: '',
            startChargTime: ''
          }
        ]
      },
      houseChange1: {
        uId: '',
        houseSpaceManagerId: '',
        businessId: '',
        blockName: '',
        detailAddress: '',
        startTime: '', // 托管开始时间
        endTime: '', // 托管结束时间
        freeStartTime: '', // 免租开始时间
        freeEndTime: '', // 免租结束时间
        rental: '', // 收房价格
        deposit: 0, // 押金
        rental1: '', // 收房价格
        deposit1: '', // 押金
        payWay: '1',
        during: '',
        payCycle: 'ONEMON', // 支付周期
        addType: 'NOTRISE', // 租金递增方式
        addCycle: 'NORISE', // 租金递增周期
        addAmount: '',
        addPer: '',
        addAmount1: '',
        addPer1: '',
        payMethod: 'CYCLE',
        payTime: '',
        buildingNo: '', // 楼号
        unitNo: '', // 单元号
        roomNo: '', // 室号
        payeeName: '', // 收款人姓名
        bankAccount: '', // 收款账号
        bankName: '网络有误', // 收款银行
        bankOfAccounts: '', // 开户支行
        memo: '',
        houseSpaceId: '',
        conType: '1', // 合同分类
        housekeeperName: '', // 小管家姓名
        housekeeperPhone: '', // 小管家联系方式
        housekeeper: [],
        userName: '',
        waterMeterReading: '', // 水表读数
        electricMeterReading: '', // 电表读数
        gasMeterReading: '', // 天然气读数
        waterMeterNumber1: '', // 水表读数
        electricMeterNumber1: '', // 电表读数
        gasMeterNumber1: '', // 天然气读数
        certificateType: 'ID', // 房东证件类型
        certificateNum: '', // 房东证件号
        userPhone: '', // 房东手机号
        bedroomNumber: '1',
        livingRoomNumber: '1',
        toiletNumber: '1',
        kitchenNumber: '1',
        direction: 'EAST',
        houseSpaceManagerArea1: '',
        houseSpaceManagerArea: '',
        rentType: 'JOINT_RENT',
        decorateType: 'R',
        zoneId: '',
        zone: '',
        district: '',
        insuranceStatus: 'YES',
        houseOwnershipCertificateNumber: '', // 房产证号
        penalty: '',
        penalty1: '',
        freeStyle: '0',
        year: '0',
        month: '0',
        day: '0',
        freeMonth: '0',
        freeDay: '0',
        decorationStyle: '0',
        decorationMonth: '0',
        decorationDay: '0',
        floorHeight: '',
        city: '',
        province: '',
        blockId: '',
        currentFloor: '',
        reqChargInputLogBeanList: [ // 计费规则
          {
            payCycle: 'ONEMON',
            addAmount1: '',
            addAmount: '',
            addPer1: '',
            addPer: '',
            addCycle: 'NORISE',
            addType: 'NOTRISE',
            businessType: '',
            chargType: 'REN',
            cycle: 'ONEMON',
            endChargTime: '',
            financeType: 'INC',
            initialAmount: '',
            startChargTime: ''
          }
        ]
      },
      count: 0,
      landlordList: [],
      restaurants: [],
      readonly: true,
      restaurants1: [ // 小区
      ],
      userInfo: {
        bean: 2
      },
      bankList: [],
      bankSearch: this.$store.state.searchUrl + 'baseDataInfo', // 查询银行
      repList: [],
      addTypeShow: false, // 控制自定义递增规则弹窗
      modal: false,
      addType: 'NOTRISE',
      width: 'width: 75px;',
      effectTime: '',
      endTime: '',
      unit: [], // 片区列表
      bankOfAccounts: [], // 全部银行支行列表
      bankOfAccount: [], // 部分银行支行列表
      addWay: [ // 不规则递增方式
        {
          time: '',
          getPrice: '',
          addAmount: '',
          addPer: '',
          addAmount1: '',
          addPer1: '',
          rentFreeEnd: '',
          rentFreeStart: ''
        }
      ],
      address: {
        pLists: [],
        cLosts: [],
        dLists: []
      },
      int: 0, // 计数器
      unitList: [], // 片区列表
      clickOver: true // 判断提交结束与否
    }
  },
  watch: {
    addclickCount: function () {
      console.log(this.addclickCount % 2)
      if (this.addclickCount % 2 === 1) {
        let list = {}
        list.uId = ''
        list.houseSpaceManagerId = ''
        list.businessId = ''
        list.blockName = ''
        list.detailAddress = ''
        list.startTime = ''
        list.endTime = ''
        list.freeStartTime = ''
        list.freeEndTime = ''
        list.rental = ''
        list.deposit = 0
        list.rental1 = ''
        list.deposit1 = ''
        list.payWay = '1'
        list.during = ''
        list.payCycle = 'ONEMON'
        list.addType = 'NOTRISE'
        list.addCycle = 'NORISE'
        list.addAmount = ''
        list.addPer = ''
        list.addAmount1 = ''
        list.addPer1 = ''
        list.payMethod = 'CYCLE'
        list.payTime = ''
        list.buildingNo = ''
        list.unitNo = ''
        list.roomNo = ''
        list.payeeName = ''
        list.bankAccount = ''
        list.bankName = '网络有误'
        list.bankOfAccounts = ''
        list.memo = ''
        list.houseSpaceId = ''
        list.conType = '1'
        list.housekeeperName = ''
        list.housekeeperPhone = ''
        list.housekeeper = []
        list.userName = ''
        list.waterMeterReading = ''
        list.electricMeterReading = ''
        list.gasMeterReading = ''
        list.waterMeterNumber1 = ''
        list.electricMeterNumber1 = ''
        list.gasMeterNumber1 = ''
        list.certificateType = 'ID'
        list.certificateNum = ''
        list.userPhone = ''
        list.bedroomNumber = '1'
        list.livingRoomNumber = '1'
        list.toiletNumber = '1'
        list.kitchenNumber = '1'
        list.direction = 'EAST'
        list.houseSpaceManagerArea1 = ''
        list.houseSpaceManagerArea = ''
        list.rentType = 'JOINT_RENT'
        list.decorateType = 'R'
        list.zoneId = ''
        list.zone = ''
        list.district = ''
        list.insuranceStatus = 'YES'
        list.houseOwnershipCertificateNumber = '' // 房产证号
        list.penalty = ''
        list.penalty1 = ''
        list.freeStyle = '0'
        list.year = '0'
        list.month = '0'
        list.day = '0'
        list.freeMonth = '0'
        list.freeDay = '0'
        list.decorationStyle = '0'
        list.decorationMonth = '0'
        list.decorationDay = '0'
        list.floorHeight = ''
        list.reqChargInputLogBeanList = []
        list.zoneData = []
        list.city = ''
        list.province = ''
        list.district = ''
        list.blockId = ''
        list.currentFloor = ''
        list.houseCertificateType = 'OFFICIAL'
        let list1 = {}
        list1.payCycle = 'ONEMON'
        list1.addAmount1 = ''
        list1.addAmount = ''
        list1.addPer1 = ''
        list1.addPer = ''
        list1.addCycle = 'NORISE'
        list1.addType = 'NOTRISE'
        list1.businessType = ''
        list1.chargType = 'REN'
        list1.cycle = 'ONEMON'
        list1.endChargTime = ''
        list1.financeType = 'INC'
        list1.initialAmount = ''
        list1.startChargTime = ''
        list.reqChargInputLogBeanList.push(list1)
        this.form = list
        this.addShow = false

        let username = ''
        this.$http.get(this.$store.state.accountUrl + 'user/info/id/' + this.$store.state.currentUser.uid,
        ).then(function (response) {
          var data = response.data
          if (data.code === 200) {
            username = data.data.username
            // this.form.housekeeper[0] = '小管家'
            this.form.housekeeper = [localStorage.getItem('role'), username]
            this.form.housekeeperName = username
            this.form.housekeeperPhone = this.$store.state.currentUser.UserPhone
            this.form.housekeeperId = this.$store.state.currentUser.uid
          }
        })

        let _this = this
        let req = {}
        req.baseDataType = 'SECOND_LEVEL_BANK_INFO'
        req.bankName = ''
        this.$http.post(this.bankSearch, {'baseDataType': 'FIRST_LEVEL_BANK_INFO'}).then(function (res) {
          res = res.body
          if (res.code === 200) {
            _this.bankList = res.data
            _this.form.bankName = res.data[0].bankName
            req.bankName = res.data[0].bankName
            _this.$http.post(_this.bankSearch, req).then(res => {
              if (res.body.code === 200) {
                if (res.body.data.length > 10) {
                  _this.bankOfAccount = res.body.data.slice(0, 10)
                  _this.bankOfAccounts = res.body.data
                } else {
                  _this.bankOfAccounts = res.body.data
                  _this.bankOfAccount = res.body.data
                }
                for (let i = 0; i < _this.bankOfAccount.length; i++) {
                  _this.bankOfAccount[i].value = _this.bankOfAccount[i].branchBankName
                }
                for (let i = 0; i < _this.bankOfAccounts.length; i++) {
                  _this.bankOfAccounts[i].value = _this.bankOfAccounts[i].branchBankName
                }
              }
            })
          }
        })
        // let treeArea = this.$store.state.accountUrl + 'unit/tree/f/area'
        this.$options.methods.unitSelect(this, this.$store.state.accountUrl + 'unit/tree/f/area')
        // this.$http.get(treeArea).then(({data}) => {
        //   // var data1 = data.data.children[0].children
        //   var data1 = data.data.children
        //   this.unit = data1
        //   this.form.zone = this.unit[0].text
        //   this.form.zoneId = this.unit[0].id
        // })
      }
    }
  },
  props: ['formLabelWidth', 'disable', 'mix', 'addclickCount'],
  methods: {
    // 小管家id
    changeHouseKeeper (val) {
      var results = val[0] ? this.options2.filter(this.keeperFilter(val[0])) : this.options2
      for (var k = 0; k <= results[0].cities.length - 1; k++) {
        if (val[1] === results[0].cities[k].label) {
          this.form.housekeeperId = results[0].cities[k].id
          this.form.housekeeperPhone = results[0].cities[k].phone
        }
      }
    },
    keeperFilter (queryString) { // 房东信息
      return (restaurant) => {
        return (restaurant.label.indexOf(queryString.toLowerCase()) === 0)
      }
    },
    closeForm () {
      this.$options.methods.show()
      this.form = {}
      this.form = this.houseChange1
      this.$emit('listenToParentEvent', false)
    },
    show () {
      let list = {}
      list.uId = ''
      list.houseSpaceManagerId = ''
      list.businessId = ''
      list.blockName = ''
      list.detailAddress = ''
      list.startTime = ''
      list.endTime = ''
      list.freeStartTime = ''
      list.freeEndTime = ''
      list.rental = ''
      list.deposit = 0
      list.rental1 = ''
      list.deposit1 = ''
      list.payWay = '1'
      list.during = ''
      list.payCycle = 'ONEMON'
      list.addType = 'NOTRISE'
      list.addCycle = 'NORISE'
      list.addAmount = ''
      list.addPer = ''
      list.addAmount1 = ''
      list.addPer1 = ''
      list.payMethod = 'CYCLE'
      list.payTime = ''
      list.buildingNo = ''
      list.unitNo = ''
      list.roomNo = ''
      list.payeeName = ''
      list.bankAccount = ''
      list.floorHeight = ''
      list.bankName = '网络有误'
      list.bankOfAccounts = ''
      list.memo = ''
      list.houseSpaceId = ''
      list.conType = '1'
      list.housekeeperName = ''
      list.housekeeperPhone = ''
      list.housekeeper = []
      list.userName = ''
      list.waterMeterReading = ''
      list.electricMeterReading = ''
      list.gasMeterReading = ''
      list.waterMeterNumber1 = ''
      list.electricMeterNumber1 = ''
      list.gasMeterNumber1 = ''
      list.certificateType = 'ID'
      list.certificateNum = ''
      list.userPhone = ''
      list.bedroomNumber = '1'
      list.livingRoomNumber = '1'
      list.toiletNumber = '1'
      list.kitchenNumber = '1'
      list.direction = 'EAST'
      list.houseSpaceManagerArea1 = ''
      list.houseSpaceManagerArea = ''
      list.rentType = 'JOINT_RENT'
      list.decorateType = 'R'
      list.zoneId = ''
      list.zone = ''
      list.district = ''
      list.insuranceStatus = 'YES'
      list.houseOwnershipCertificateNumber = '' // 房产证号
      list.penalty = ''
      list.penalty1 = ''
      list.freeStyle = '0'
      list.year = '0'
      list.month = '0'
      list.day = '0'
      list.freeMonth = '0'
      list.freeDay = '0'
      list.decorationStyle = '0'
      list.decorationMonth = '0'
      list.decorationDay = '0'
      list.currentFloor = ''
      list.reqChargInputLogBeanList = []
      list.houseCertificateType = 'OFFICIAL'
      let list1 = {}
      list1.payCycle = 'ONEMON'
      list1.addAmount1 = ''
      list1.addAmount = ''
      list1.addPer1 = ''
      list1.addPer = ''
      list1.addCycle = 'NORISE'
      list1.addType = 'NOTRISE'
      list1.businessType = ''
      list1.chargType = 'REN'
      list1.cycle = 'ONEMON'
      list1.endChargTime = ''
      list1.financeType = 'INC'
      list1.initialAmount = ''
      list1.startChargTime = ''
      list.reqChargInputLogBeanList.push(list1)
      this.form = list
    },
    submitForm (rules2) { // 提交合同
      console.log(toString(this.form.userPhone))
      if (this.clickOver) { // 判断当前是否正在提交
        let pass = false
        let phone = parseInt(this.form.userPhone)
        let name = this.form.userName
        let certificateNum = this.form.certificateNum
        var updateApi = this.$store.state.accountUrl + 'user/update'
        let bool = this.$options.methods.userBloon(name) && this.$options.methods.userBloon(phone) && this.$options.methods.userBloon(certificateNum) && this.userInfo.name === name && parseInt(this.userInfo.phone) === phone && this.userInfo.certificateNum === certificateNum
        if (this.userInfo.bean === 1) { // 判断用户有误注册
          pass = true
        } else if (this.userInfo.bean === 2) { // 判断用户信息是否完善
          if (this.userInfo.bool === 1) {
            if (bool) { // 如果输入信息跟获取到的信息完全一致
              pass = true
            } else { // 如果输入信息跟获取到的信息不完全一致
              pass = false
            }
          }
        } else if (this.userInfo.bean === 3) { // 如果用户信息不完善
          pass = true
          let userList = {}
          userList.id = this.userInfo.userId
          if (this.userInfo.bool === 1) {
            userList.username = this.userInfo.userName
          } else if (this.userInfo.bool === 2) {
            userList.phone = this.userInfo.userPhone
          } else if (this.userInfo.bool === 3) {
            userList.certificateNum = this.userInfo.certificateNum
          }
          this.$http.post(updateApi, userList).then(res => {
            console.log(res)
          })
        }
        this.clickOver = false
        var data1 = this.form
        data1.signType = 'NEW'
        data1.contractType = 'DELEGATE'
        var apiUrl = this.$store.state.contractUrl + 'addDelegateContract'
        let houseUrl = this.$store.state.houseUrl + 'save/houseSpaceManager'
        var effectTime = (new Date(this.form.startTime)).getTime()
        let endTime = this.form.endTime
        var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
        var freestartTime = (new Date(this.form.freeStartTime)).getTime()
        var freeendTime = (new Date(this.form.freeEndTime)).getTime()
        var msg = ''
        // let certificateNum = this.$options.methods.IdentityCodeValid(data1.certificateNum, this)
        // let certificateNum = true
        data1.userPhone = parseInt(data1.userPhone)
        data1.penalty1 = 0
        // console.log(data1)
        if (!pass) {
          msg = '用户信息与系统信息不匹配，请核对后重新输入'
          // this.form.userPhone = phone
          this.$message({
            message: msg,
            type: 'error'
          })
          this.clickOver = true
        } else if (data1.blockName === '') {
          msg = '请输入小区名'
          this.$message({
            message: msg,
            type: 'error'
          })
          this.clickOver = true
        } else if (data1.buildingNo === '' || data1.roomNo === '') {
          msg = '请输入正确的房间地址'
          this.$message({
            message: msg,
            type: 'error'
          })
          this.clickOver = true
        } else if (isNaN(data1.houseSpaceManagerArea1) || !reg.test(data1.houseSpaceManagerArea1)) {
          msg = '请输入房间面积'
          this.$message({
            message: msg,
            type: 'error'
          })
          this.clickOver = true
        } else if (data1.houseOwnershipCertificateNumber === null || data1.houseOwnershipCertificateNumber === '') {
          msg = '请输入房屋产权证号码'
          this.$message({
            message: msg,
            type: 'error'
          })
          this.clickOver = true
        } else if (data1.floorHeight === '' || data1.floorHeight === null) {
          msg = '请选择总楼高'
          this.$message({
            message: msg,
            type: 'error'
          })
          this.clickOver = true
        } else if (data1.currentFloor === '' || data1.currentFloor === null) {
          msg = '请选择所在楼层'
          this.$message({
            message: msg,
            type: 'error'
          })
          this.clickOver = true
        } else if (isNaN(effectTime)) {
          msg = '请输入托管开始时间'
          this.$message({
            message: msg,
            type: 'error'
          })
          this.clickOver = true
        } else if (endTime <= effectTime) {
          msg = '请输入正确的托管时长'
          this.$message({
            message: msg,
            type: 'error'
          })
          this.clickOver = true
        } else if (freeendTime <= freestartTime && data1.addType !== '3') {
          msg = '请输入正确免租结束时间'
          this.$message({
            message: msg,
            type: 'error'
          })
          this.clickOver = true
        } else if (!reg.test(this.form.rental1) || this.form.rental1 < 0) {
          msg = '请输入正确收房价格'
          this.$message({
            message: msg,
            type: 'error'
          })
          this.clickOver = true
          this.form.rental1 = ''
          this.form.deposit1 = ''
        } else if (!reg.test(this.form.penalty1) || this.form.penalty1 < 0) {
          msg = '请输入正确违约金'
          this.$message({
            message: msg,
            type: 'error'
          })
          this.clickOver = true
          this.form.rental1 = ''
          this.form.deposit1 = ''
        } else if (!reg.test(this.form.deposit1) || this.form.deposit1 <= 0) {
          msg = '请输入正确押金'
          this.$message({
            message: msg,
            type: 'error'
          })
          this.clickOver = true
          this.form.deposit1 = ''
        } else if (this.form.addType === 'RISEBYAMOUNT' && (this.form.addAmount1 === null || this.form.addAmount1 === '')) {
          msg = '请填写正确的递增金额'
          this.$message({
            message: msg,
            type: 'error'
          })
          this.clickOver = true
        } else if (this.form.addType === 'RISEBYPER' && (this.form.addPer1 === null || this.form.addPer1 === '')) {
          msg = '请填写正确的递增百分比'
          this.$message({
            message: msg,
            type: 'error'
          })
          this.clickOver = true
        } else if (this.form.payeeName === '' || this.form.payeeName === null) {
          msg = '请输入收款人姓名'
          this.$message({
            message: msg,
            type: 'error'
          })
          this.clickOver = true
        } else {
          if (this.form.city === '' || this.form.city === null) {
            // this.$http.post(search)
            msg = '请您填写小区地址'
            this.$message({
              message: msg,
              type: 'error'
            })
            this.addShow = true
            this.clickOver = true
            let _this = this
            this.$http.post(this.bankSearch, {'baseDataType': 'PROVINCE__INFO'}).then(function (valueP) {
              _this.address.pLists = valueP.data.data
              _this.$http.post(_this.bankSearch, {'baseDataType': 'CITY_INFO', 'provinceId': valueP.data.data[0].provinceId}).then(function (valueC) {
                _this.address.cLists = valueC.data.data
                _this.$http.post(_this.bankSearch, {'baseDataType': 'AREA_INFO', 'cityId': valueC.data.data[0].cityId}).then(function (valueD) {
                  _this.address.dLists = valueD.data.data
                })
              })
            })
          } else {
            let searchUrl = this.$store.state.blockUrl + 'save'
            let req = {}
            req.blockName = this.form.blockName
            req.city = this.form.city
            req.province = this.form.province
            req.district = this.form.district
            this.$http.post(searchUrl, req).then(function (valueD) {
              if (valueD.body.code === 200) {
                let list = {}
                if (data1.addType !== '3') {
                  list.addAmount = data1.addAmount1 * 1000
                  list.addCycle = data1.addCycle
                  list.addPer = data1.addPer1 * 1000
                  list.addType = data1.addType
                  list.businessType = 'DEL'
                  list.chargType = 'REN'
                  list.cycle = data1.payCycle
                  list.endChargTime = endTime
                  list.financeType = 'PAY'
                  list.initialAmount = data1.rental1 * 1000
                  list.startChargTime = effectTime
                  list.rentalFreeStart = freestartTime
                  list.rentalFreeEnd = freeendTime
                  data1.reqChargInputLogBeanList = []
                  data1.reqChargInputLogBeanList.push(list)
                }
                data1.blockId = valueD.body.data.pid
                // 转换免租期
                data1.rentalFreeStart = freestartTime
                data1.rentalFreeEnd = freeendTime
                // 转换托管时间
                data1.startTime = effectTime
                data1.endTime = endTime
                // 水电天然气读数
                data1.waterMeterReading = data1.waterMeterNumber1 * 1000
                data1.electricMeterReading = data1.electricMeterNumber1 * 1000
                data1.gasMeterReading = data1.gasMeterNumber1 * 1000
                // 押金
                data1.deposit = parseInt(data1.deposit1) * 1000
                // 租金
                data1.rental = parseInt(data1.rental1) * 1000
                data1.reqChargInputLogBeanList[0].initialAmount = data1.rental
                // 违约金
                // data1.penalty = parseInt(data1.penalty1) * 1000
                data1.penalty = 0
                // 递增金额
                data1.addAmount = data1.addAmount1 * 1000
                data1.reqChargInputLogBeanList[0].addAmount1 = data1.addAmount1
                data1.reqChargInputLogBeanList[0].addAmount = data1.addAmount1 * 1000
                // data1.reqChargInputLogBeanList[0].addCycle = data1.addCycle
                // 递增百分比
                data1.addPer = data1.addPer1 * 1000
                data1.housekeeperName = data1.housekeeper[1]
                data1.loginId = this.$store.state.currentUser.uid
                data1.enterId = this.$store.state.currentUser.uid
                data1.unitId = data1.zoneId
                // console.log(data1)
                this.$http.post(houseUrl, {
                  'bedroomNumber': data1.bedroomNumber,
                  'currentFloor': data1.currentFloor,
                  'blockName': data1.blockName,
                  'buildingNo': data1.buildingNo,
                  'unitNo': data1.unitNo,
                  'getPrice': data1.rental,
                  'houseSpaceManagerArea': data1.houseSpaceManagerArea1 * 1000,
                  'houseSpaceManagerDirection': data1.direction,
                  'houseSpaceManagerType': 'HOUSE',
                  'inputPersonnelId': this.$store.state.currentUser.uid,
                  'kitchenNumber': data1.kitchenNumber,
                  'landlordCertNumber': data1.certificateNum,
                  'landlordCertType': data1.certificateType,
                  'landlordName': data1.userName,
                  'landlordPhone': data1.userPhone,
                  'livingRoomNumber': data1.livingRoomNumber,
                  'propertyType': 'D',
                  'originalRentType': data1.rentType,
                  'roomNo': data1.roomNo,
                  'toiletNumber': data1.toiletNumber,
                  'zoneId': data1.zoneId,
                  'zone': data1.zone,
                  'decorateType': data1.decorateType,
                  'insuranceStatus': data1.insuranceStatus,
                  'houseOwnershipCertificateNumber': data1.houseOwnershipCertificateNumber,
                  'province': data1.province,
                  'city': data1.city,
                  'district': data1.district,
                  'blockId': data1.blockId,
                  'floorHeight': data1.floorHeight,
                  'houseOwnershipCertificateType': data1.houseCertificateType
                }).then(res => {
                  console.log(res.body.code)
                  if (res.body.code === 200 || res.body.code === 10002) {
                    data1.houseSpaceId = res.body.data
                    this.$http.post(apiUrl, data1).then(({data}) => {
                      if (data.code === 200) {
                        this.$message({
                          message: '新建合同成功',
                          type: 'success'
                        })
                        this.count = 0
                        this.$emit('addTrusteeshopSuccess', false)
                        // this.form = {}
                        // this.houseChange1 = {}
                        this.$options.methods.show()
                        this.clickOver = true
                        // console.log(this.houseChange1)
                        // this.form = this.houseChange1
                        let username = ''
                        this.$http.get(this.$store.state.accountUrl + 'user/info/id/' + this.$store.state.currentUser.uid,
                        ).then(function (response) {
                          var data = response.data
                          if (data.code === 200) {
                            username = data.data.username
                            // this.form.housekeeper[0] = '小管家'
                            this.form.housekeeper = [localStorage.getItem('role'), username]
                            this.form.housekeeperName = username
                            this.form.housekeeperPhone = this.$store.state.currentUser.UserPhone
                            this.form.housekeeperId = this.$store.state.currentUser.uid
                          } else {
                            this.clickOver = true
                          }
                        })
                      } else if (data.code === 10001) {
                        this.$message({
                          message: '该房源已经签订过房东合同，请不要重复签订',
                          type: 'error'
                        })
                        this.clickOver = true
                      } else {
                        this.$message({
                          message: data.message,
                          type: 'error'
                        })
                        this.clickOver = true
                      }
                      // this.clickOver = true
                    }, (data) => {
                      this.clickOver = true
                    })
                  } else {
                    this.$message({
                      message: res.body.message,
                      type: 'error'
                    })
                    this.clickOver = true
                  }
                }, (res) => {
                  this.clickOver = true
                })
              } else {
                this.$message({
                  message: valueD.body.message,
                  type: 'error'
                })
                this.clickOver = true
              }
            }, (valueD) => {
              this.clickOver = true
              this.$message({
                message: '网络有误',
                type: 'error'
              })
            })
          }
        }
        // this.clickOver = true
      }
    },
    userQuerySearch (queryString, cb) { // 房东信息
      var dataList = {}
      dataList.username = queryString
      // 搜索房东
      this.landlordList = []
      this.$http.post(this.mix.userUrl, dataList).then(({data}) => {
        var option = []
        if (data.code === 200) {
          var data1 = data.data.list
          var op = {}
          for (let i = 0; i < data1.length; i++) {
            if (data1[i].username === '' || data1[i].username === null || typeof (data1[i].username) === 'undefined') {
            } else {
              op = {}
              op.id = data1[i].id
              op.phone = data1[i].phone
              op.sex = data1[i].sex
              op.value = data1[i].username
              option.push(op)
            }
          }
        } else {
          option = []
        }
        this.landlordList = option
        var restaurants = this.landlordList
        var results = restaurants
        var result = []
        for (let i = 0; i < results.length && i < 10; i++) {
          result[i] = results[i]
        }
        // 调用 callback 返回建议列表的数据
        cb(result)
      })
    },
    userFilter (queryString) { // 房东信息
      return (restaurant) => {
        return (restaurant.value.indexOf(queryString.toLowerCase()) === 0)
      }
    },
    userSelect (item) { // 选择房东信息
      this.form.userPhone = item.phone
      this.form.userId = item.id
      this.form.sex = item.sex
      var url = this.mix.userId + item.id
      this.$http.get(url).then(({data}) => {
        if (data.code === 200) {
          this.form.certificateType = data.data.certType
          this.form.certificateNum = data.data.certNumber
          this.userInfo.name = this.form.userName
          this.userInfo.phone = item.phone
          this.userInfo.certificateNum = data.data.certNumber
          this.userInfo.bean = 2
          this.userInfo.bool = 1
        } else if (data.code === 10000) {
          this.userInfo.certificateNum = ''
          this.userInfo.bean = 3
          this.userInfo.bool = 3
        }
      })
    },
    querySearch (queryString, cb) { // 小区信息
      if (queryString !== '') {
        var dataList = {}
        dataList.userType = 'P'
        dataList.keywordAddress = queryString
        dataList.houseSpaceManagerType = 'HOUSE'
        dataList.rentType = 'ENTIRE_RENT'
        dataList.houseSpaceProcess = 'GET_PROCESS'
        dataList.houseSpaceStatus = 'APPROVED'
        this.restaurants = []
        this.$http.post(this.mix.houseList, dataList).then(({data}) => {
          for (var p in data.data.list) {
            if (data.data.list !== '' && data.data.list !== null) {
              for (var i in data.data.list[p].resHouseSpaceManagerBeanList) {
                let restaurant = {}
                restaurant.value = data.data.list[p].resHouseSpaceManagerBeanList[i].resHouseSpaceBeanList[0].keywordAddress
                restaurant.houseSpaceManagerId = data.data.list[p].resHouseSpaceManagerBeanList[i].resHouseSpaceBeanList[0].houseSpaceId
                restaurant.zoneId = data.data.list[p].resHouseSpaceManagerBeanList[i].zoneId
                this.restaurants.push(restaurant)
              }
            }
          }
        })
      }
      // 调用 callback 返回建议列表的数据
      cb(this.restaurants)
    },
    createFilter (queryString) { // 小区信息
      return (restaurant) => {
        return (restaurant.value.indexOf(queryString.toLowerCase()) === 0)
      }
    },
    querySearch1 (queryString, cb) { // 小区信息
      this.restaurants1 = []
      if (queryString) {
        let req = {}
        req.baseDataType = 'BLOCK_INFO'
        req.blockName = queryString
        this.$http.post(this.bankSearch, req).then(res => {
          if (res.body.code === 200) {
            let len = 0
            if (res.body.data.length > 10) {
              len = 10
            } else {
              len = res.body.data.length
            }
            for (let i = 0; i < len; i++) {
              let list = {}
              list.value = res.body.data[i].blockName
              list.district = res.body.data[i].district
              list.province = res.body.data[i].province
              list.city = res.body.data[i].city
              list.pid = res.body.data[i].pid
              this.restaurants1.push(list)
            }
          }
        })
      }
      var restaurants = this.restaurants1
      // 调用 callback 返回建议列表的数据
      cb(restaurants)
    },
    blockNameChange () {},
    handleSelect (item) { // 选择小区信息
      let _this = this
      _this.form.blockName = item.value
      _this.form.province = item.province
      _this.form.city = item.city
      _this.form.district = item.district
      _this.form.blockId = item.pid
    },
    repQuerySearch (queryString, cb) { // 小管家信息
      var restaurants = this.repList
      var results = queryString ? restaurants.filter(this.userFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    repSelect (item) { // 选择小管家信息
      this.form.housekeeperPhone = item.phone
      this.form.housekeeperName = item.value
      this.form.housekeeperId = item.id
    },
    backChange (value) { // 根据银行搜索支行信息
      let _this = this
      let req = {}
      this.form.bankOfAccounts = ''
      req.baseDataType = 'SECOND_LEVEL_BANK_INFO'
      req.bankName = value
      _this.$http.post(_this.bankSearch, req).then(res => {
        if (res.body.code === 200) {
          if (res.body.data.length > 10) {
            _this.bankOfAccount = res.body.data.slice(0, 10)
            _this.bankOfAccounts = res.body.data
          } else {
            _this.bankOfAccounts = res.body.data
            _this.bankOfAccount = res.body.data
          }
          for (let i = 0; i < _this.bankOfAccount.length; i++) {
            _this.bankOfAccount[i].value = _this.bankOfAccount[i].branchBankName
          }
          for (let i = 0; i < _this.bankOfAccounts.length; i++) {
            _this.bankOfAccounts[i].value = _this.bankOfAccounts[i].branchBankName
          }
        }
      })
    },
    landlordSearch (_this, userUrl, dataList) { // 搜索房东信息
      _this.landlordList = []
      _this.$http.post(userUrl, dataList).then(({data}) => {
        var option = []
        if (data.code === 200) {
          var data1 = data.data.list
          var op = {}
          for (var i = 0; i < data1.length; i++) {
            if (data1[i].username === '' || data1[i].username === null || typeof (data1[i].username) === 'undefined') {
            } else {
              op = {}
              op.id = data1[i].id
              op.phone = data1[i].phone
              op.sex = data1[i].sex
              op.value = data1[i].username
              option.push(op)
            }
          }
        } else {
          option = []
        }
        _this.landlordList = option
        console.log(_this.landlordList)
      })
    },
    repSearch (_this, userUrl, dataList) { // 搜索房东信息
      _this.$http.post(userUrl, dataList).then(({data}) => {
        var data1 = data.data.list
        var op = {}
        var option = []
        for (var i = 0; i < data1.length; i++) {
          if (data1[i].username === '' || data1[i].username === null || typeof (data1[i].username) === 'undefined') {
          } else {
            op = {}
            op.id = data1[i].id
            op.phone = data1[i].phone
            op.sex = data1[i].sex
            op.value = data1[i].username
            option.push(op)
          }
        }
        _this.repList = option
      })
    },
    openAddType (value) { // 打开不规则递增
      var effectTime = (new Date(this.form.startTime)).getTime()
      var addType = this.form.addType
      var _this = this
      if (value === '3') {
        if (isNaN(effectTime)) {
          this.$message({
            message: '请先选择合同开始时间',
            type: 'error'
          })
          this.addType = addType
        } else if (this.form.year === '0') {
          this.$message({
            message: '请先选择合同时长',
            type: 'error'
          })
          this.addType = addType
        } else if (this.form.rental1 === '' || this.form.rental1 === null) {
          this.$message({
            message: '请先输入收房价格',
            type: 'error'
          })
          this.addType = addType
        } else if (this.form.freeStyle !== '0' && (this.form.freeMonth === '0' && this.form.freeDay === '0')) {
          this.$message({
            message: '请先选择正确的免租时长',
            type: 'error'
          })
          this.addType = addType
        } else if (this.form.decorationStyle !== '0' && (this.form.decorationMonth === '0' && this.form.decorationDay === '0')) {
          this.$message({
            message: '请先选择正确的空置时长',
            type: 'error'
          })
          this.addType = addType
        } else {
          // 计算开始时间
          effectTime = new Date(effectTime)
          let year1 = effectTime.getFullYear()
          let month1 = effectTime.getMonth() + 1
          let day1 = effectTime.getDate()
          // 计算合同开始时间
          this.effectTime = effectTime.getFullYear() + '/' + (effectTime.getMonth() + 1) + '/' + effectTime.getDate()
          // 计算最终结束时间
          var endTime = _this.$options.methods.time((year1 + parseInt(this.form.year)), (month1 + parseInt(this.form.month)), (day1 + parseInt(this.form.day)), _this) + ' 23:59:59'
          endTime = (new Date(endTime)).getTime()
          endTime = new Date(endTime - 24 * 60 * 60 * 1000)

          let len = parseInt(this.form.year)
          let time1 = _this.$options.methods.time(year1, (month1 + parseInt(this.form.month)), (day1 + parseInt(this.form.day)), _this)
          let time2 = _this.$options.methods.time(year1, (month1 + parseInt(this.form.decorationMonth)), (day1 + parseInt(this.form.decorationDay)), _this)
          if ((new Date(time1)).getTime() > (new Date(time2)).getTime()) {
            len++
          }
          this.endTime = endTime.getFullYear() + '/' + (endTime.getMonth() + 1) + '/' + endTime.getDate()
          endTime = new Date(effectTime - 24 * 60 * 60 * 1000)
          let year = endTime.getFullYear()
          let month = endTime.getMonth() + 1
          let day = endTime.getDate()

          // 计算最终合同结束时间
          endTime = endTime.getTime()
          if (this.form.decorationStyle !== '0') {
            // 计算递增开始时间
            var startTime = _this.time(year1, (month1 + parseInt(this.form.decorationMonth)), (day1 + parseInt(this.form.decorationDay)), _this) + ' 00:00:00'
            startTime = new Date((new Date(startTime)).getTime())
            year1 = startTime.getFullYear()
            month1 = startTime.getMonth() + 1
            day1 = startTime.getDate()
            // 计算递增周期结束时间
            endTime = new Date(startTime - 24 * 60 * 60 * 1000)
            year = endTime.getFullYear()
            month = endTime.getMonth() + 1
            day = endTime.getDate()
          }

          let obj = []
          this.addWay = []
          if ((month === 2 && day === 28 && !this.$options.methods.getYear(year)) || (month === 2 && day === 29 && this.$options.methods.getYear(year))) {
            for (let i = 0; i < len; i++) {
              let time
              if (this.$options.methods.getYear(year + i)) {
                time = (year + i + 1) + '-2-29'
              } else {
                time = (year + i + 1) + '-2-28'
              }
              if (i === (len - 1)) {
                time = this.endTime
              }
              let list = {}
              list.time = (year1 + i) + '-03-01'
              list.endTime = time
              list.getPrice1 = ''
              list.amount = this.form.rental1
              list.addAmount = ''
              list.addPer = ''
              list.addAmount1 = 0
              list.addPer1 = 0
              list.rentFreeEnd = ''
              list.rentFreeStart = ''
              list.addCycle = 'NORISE'
              obj.push(list)
              this.addWay = obj
            }
          } else {
            for (let i = 0; i < len; i++) {
              let time = (year + i + 1) + '/' + month + '/' + day
              if (i === (len - 1)) {
                time = this.endTime
              }
              let list = {}
              let getPrice1 = this.form.rental1
              list.time = (year1 + i) + '/' + month1 + '/' + day1
              list.endTime = time
              list.getPrice1 = getPrice1
              list.amount = getPrice1
              list.addAmount = ''
              list.addPer = ''
              list.addAmount1 = 0
              list.addPer1 = 0
              list.rentFreeEnd = ''
              list.rentFreeStart = ''
              list.getPrice1 = ''
              list.addCycle = 'NORISE'
              obj.push(list)
              this.addWay = obj
            }
          }
          this.form.addType = value
          this.addType = this.form.addType
          this.addTypeShow = true
          console.log(this.addWay)
        }
      } else {
        this.form.addType = value
      }
    },
    getYear (year) {
      return (year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0)
    },
    changePrice (item, index) { // 按比例递增
      if (index === 0) {
        item.amount = (this.form.rental1 * (this.addWay[index].addPer1 / 100 + 1)).toFixed(2)
      } else {
        item.amount = (this.addWay[index - 1].amount * (this.addWay[index].addPer1 / 100 + 1)).toFixed(2)
      }
      var len = this.addWay.length
      for (let i = 0; i < len; i++) {
        if (!isNaN(this.addWay[i].addAmount1) && this.addWay[i].addAmount1 !== 0) {
          // 当金额存在且不为零时，以金额算
          if (i === 0) {
            this.addWay[i].amount = (parseInt(this.form.rental1) + parseInt(this.addWay[i].addAmount1)).toFixed(2)
          } else {
            this.addWay[i].amount = (parseInt(this.addWay[i - 1].amount) + parseInt(this.addWay[i].addAmount1)).toFixed(2)
          }
        } else if ((this.addWay[i].addAmount1 === 0 || isNaN(this.addWay[i].addAmount1)) && isNaN(this.addWay[i].addPer1) && this.addWay[i].addPer1 !== 0) {
          // 比存在且不为0 且金额不存在或者金额为0
          if (i === 0) {
            this.addWay[i].amount = (this.form.rental1 * (this.addWay[i].addPer1 / 100 + 1)).toFixed(2)
          } else {
            this.addWay[i].amount = (this.addWay[i - 1].amount * (this.addWay[i].addPer1 / 100 + 1)).toFixed(2)
          }
        } else if ((isNaN(this.addWay[i].addAmount1) && isNaN(this.addWay[i].addPer1)) || ((this.addWay[i].addAmount1) === 0 && this.addWay[i].addPer1) === 0) {
          // 如果百分比以及金额全为空，则设备份比以及金额全为0
          this.addWay[i].addPer1 = 0
          this.addWay[i].addAmount1 = 0
          if (i === 0) {
            this.addWay[i].amount = this.form.rental1
          } else {
            this.addWay[i].amount = this.addWay[i - 1].amount
          }
        }
      }
    },
    changePrice1 (item, index) { // 按金额递增
      if (isNaN(this.addWay[index].addAmount1)) {
        this.addWay[index].addAmount1 = 0
      }
      if (index === 0) {
        item.amount = parseInt(this.form.rental1) + parseInt(this.addWay[index].addAmount1)
      } else {
        item.amount = parseInt(this.addWay[index - 1].amount) + parseInt(this.addWay[index].addAmount1)
      }
    },
    chooseTime (value) {
    },
    chooseEndTime (item, index) {
      // 合同生效时间
      // let effectTime = (new Date(this.form.effectTime)).getTime()
      // 合同结束时间
      let endTime = (new Date(this.endTime)).getTime()
      // 最后结束时间
      // ****
      // 格式化结束时间
      let lastEndTime = new Date(item.endtime)
      lastEndTime = lastEndTime.getFullYear() + '/' + (lastEndTime.getMonth() + 1) + '/' + lastEndTime.getDate() + ' 00:00:00'
      lastEndTime = (new Date(item.endtime)).getTime()
      let len = this.addWay.length
      if (lastEndTime > endTime) {
        this.$message({
          message: '当前结束时间不应晚于合同结束时间，请重新选择',
          type: 'error'
        })
        item.endtime = ''
      } else {
        // 循环验证index之后的表格时间与当前结束时间的大小
        for (let i = (index + 1); i < len; i++) {
          // this.addWay[i]的开始时间
          let end1 = new Date(this.addWay[i].endtime)
          end1 = end1.getFullYear() + '/' + (end1.getMonth() + 1) + '/' + end1.getDate() + ' 00:00:00'
          end1 = (new Date(end1)).getTime()
          // 如果当前的结束时间晚于this.addWay[i]的结束时间。则删除this.addWay[i]
          if (lastEndTime >= end1) {
            this.addWay.splice(i, 1)
            i--
            len--
          } else {
            // 如果当前的结束时间晚于this.addWay[i]的结束时间。则this.addWay[i]的开始时间为当前结束时间的之后一天
            let time = new Date(lastEndTime + 24 * 60 * 60 * 1000)
            this.addWay[i].time = time.getFullYear() + '/' + (time.getMonth() + 1) + '/' + time.getDate()
          }
        }
      }
    },
    addHouseType () {
      let list = {}
      list.time = ''
      list.endtime = ''
      list.getPrice = ''
      list.addAmount = ''
      list.addPer = ''
      list.addAmount1 = 0
      list.addPer1 = 0
      list.rentFreeEnd = ''
      list.rentFreeStart = ''
      list.getPrice1 = ''
      list.amount = ''
      list.addCycle = 'NORISE'
      this.addWay.push(list)
    },
    time (feYear, feMonth, feDay, _this) {
      let monthDay = 31
      let month = feMonth % 12
      if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
        monthDay = 31
      } else if (month === 4 || month === 6 || month === 9 || feMonth === 11) {
        monthDay = 30
      } else if (_this.$options.methods.getYear(feYear) && month === 2) {
        monthDay = 29
      } else if (!_this.$options.methods.getYear(feYear) && month === 2) {
        monthDay = 28
      }
      if (feDay > monthDay) {
        feMonth++
        feDay -= monthDay
      }
      if (feMonth > 12) {
        feYear++
        feMonth -= 12
      }
      return (feYear + '/' + feMonth + '/' + feDay)
    },
    submitAdd () {
      let len = this.addWay.length
      let arr = []
      let count = 0
      if (this.form.freeStyle !== '0' && this.form.freeMonth === '0' && this.form.freeDay === '0') {
        this.$message({
          message: '请输入正确的免租时间',
          type: 'error'
        })
      } else {
        for (let i = 0; i < len; i++) {
          // 格式化开始时间
          let s = new Date(this.addWay[i].time)
          s = s.getFullYear() + '/' + (s.getMonth() + 1) + '/' + s.getDate() + ' 00:00:00'
          s = (new Date(s)).getTime()
          // 格式化结束时间
          let e = new Date(this.addWay[i].endTime)
          e = e.getFullYear() + '/' + (e.getMonth() + 1) + '/' + e.getDate() + ' 23:59:59'
          e = (new Date(e)).getTime()
          // 格式化免租开始时间
          this.addWay[i].rentFreeStart = this.addWay[i].time
          let fs = new Date(this.addWay[i].rentFreeStart)
          fs = fs.getFullYear() + '/' + (fs.getMonth() + 1) + '/' + fs.getDate() + ' 00:00:00'
          console.log(fs)
          fs = (new Date(fs)).getTime()
          var fe
          this.addWay[i].rentFreeEnd = this.addWay[i].time
          if (this.form.freeStyle === '0') {
            // 格式化免租结束时间
            fe = new Date(this.addWay[i].rentFreeEnd)
            fe = fe.getFullYear() + '/' + (fe.getMonth() + 1) + '/' + fe.getDate() + ' 00:00:00'
            fe = (new Date(fe)).getTime()
          } else if (this.form.freeStyle === '2') { // 周期性免租
            fe = new Date(this.addWay[i].rentFreeEnd)
            let feYear = fe.getFullYear()
            let feMonth = fe.getMonth() + 1 + parseInt(this.form.freeMonth)
            let feDay = fe.getDate() + parseInt(this.form.freeDay)
            fe = this.$options.methods.time(feYear, feMonth, feDay, this) + ' 23:59:59'
            fe = (new Date(fe)).getTime()
          } else if (this.form.freeStyle === '1') { // 周期性免租
            if (i === 0) {
              fe = new Date(this.addWay[i].rentFreeEnd)
              let feYear = fe.getFullYear()
              let feMonth = fe.getMonth() + 1 + parseInt(this.form.freeMonth)
              let feDay = fe.getDate() + parseInt(this.form.freeDay)
              // console.log()
              fe = this.$options.methods.time(feYear, feMonth, feDay, this) + ' 23:59:59'
              fe = (new Date(fe)).getTime()
            } else {
              fe = new Date(this.addWay[i].rentFreeEnd)
              fe = fe.getFullYear() + '/' + (fe.getMonth() + 1) + '/' + fe.getDate() + ' 00:00:00'
              fe = (new Date(fe)).getTime()
            }
          }
            // 开始检测数据正确性
          if (fs < s) {
            this.$message({
              message: '请确保免租开始时间晚于开始时间',
              type: 'error'
            })
            count++
            break
          } else if (fs > fe) {
            this.$message({
              message: '请确保免租开始时间早于免租结束时间',
              type: 'error'
            })
            count++
            break
          } else {
            if (fe > e) {
              fe = e
            }
            // 开始检测免租期所处位置以便将相应的计费时间传递给后台
            let list = {}
            list.addCycle = 'NORISE' // 默认后台无递增，递增金额在前端完成
            list.initialAmount = this.addWay[i].amount * 1000
            list.businessType = 'DEL'
            list.chargType = 'REN'
            list.financeType = 'PAY'
            if (this.addWay[i].addAmount1 !== null && this.addWay[i].addPer1 !== null && this.addWay[i].addAmount1 !== 0 && this.addWay[i].addPer1 !== 0) {
              list.addType = 'NOTRISE'
              list.addAmount = this.addWay[i].addAmount1 * 1000
            } else if (this.addWay[i].addAmount1 !== null && this.addWay[i].addPer1 !== null && this.addWay[i].addAmount1 !== 0 && this.addWay[i].addPer1 === 0) {
              list.addType = 'NOTRISE'
              list.addAmount = this.addWay[i].addAmount1 * 1000
            } else if (this.addWay[i].addAmount1 !== null && this.addWay[i].addPer1 !== null && this.addWay[i].addAmount1 === 0 && this.addWay[i].addPer1 !== 0) {
              list.addType = 'NOTRISE'
              list.addPer = this.addWay[i].addPer1 * 1000
            } else {
              list.addType = 'NOTRISE'
            }
            if (i === (len - 1)) {
              this.form.endTime = e
            }
            list.rentalFreeStart = fs
            list.rentalFreeEnd = fe
            list.startChargTime = s
            list.endChargTime = e
            list.cycle = this.form.payCycle
            arr.push(list)
          }
        }
        if (count === 0) {
          this.form.reqChargInputLogBeanList = arr
          this.addTypeShow = false
        }
      }
    },
    unitSelect (_this, userUrl) { // 搜索片区
      _this.unitList = []
      _this.$http.get(userUrl).then(({data}) => {
        var data1 = data.data.children
        // console.log(data.data.children)
        _this.unitFormat(_this, data.data.children)
        // console.log(JSON.parse(_this.$store.state.currentUser.houseData))
        // console.log(data1)
        _this.unit = data1
        _this.form.zoneData[0] = _this.unit[0].text
        _this.form.zone = _this.unit[0].text
        _this.form.zoneId = _this.unit[0].id
      })
    },
    unitFormat (_this, arr) { // 格式化片区列表
      // console.log(arr)
      for (let i = 0; i < arr.length; i++) {
        // arr[i].value = arr[i].text
        arr[i].value = arr[i].id
        arr[i].label = arr[i].text
        arr[i].cities = arr[i].children
        _this.unitList.push(arr[i])
        if (arr[i].children !== null && arr[i].children !== [] && arr[i].children !== '') {
          _this.unitFormat(_this, arr[i].children)
        }
      }
      return arr
    },
    unitChange (value) {
      // this.unitSearch(this, value[value.length - 1], this.unit)
      // console.log(this.unitList)
      // console.log(this.form)
      for (let i in this.unitList) {
        if (this.unitList[i].text === value[value.length - 1]) {
          this.form.zone = this.unitList[i].text
          this.form.zoneId = this.unitList[i].id
        }
      }
      console.log(this.form)
    },
    unitSearch (_this, value, arr) {
      for (let i in arr) {
        // console.log(arr[i].text, value)
        if (arr[i].text === value) {
          _this.form.zone = _this.unit[i].text
          _this.form.zoneId = _this.unit[i].id
        }
        if (arr[i].children !== null && arr[i].children !== [] && arr[i].children !== '') {
          _this.unitFormat(_this, arr[i].children)
        }
      }
      return arr
    },
    bankQuerySearch (queryString, cb) { // 搜索银行支行
      if (queryString) {
        let restaurants = this.bankOfAccounts
        var results = queryString ? restaurants.filter(this.createFilter1(queryString)) : restaurants
        if (results.length > 10) {
          this.bankOfAccount = results.slice(0, 10)
        } else {
          this.bankOfAccount = results
        }
        cb(results)
      }
      // this.bankOfAccount = results
    },
    createFilter1 (queryString) {
      return (restaurant) => {
        return (restaurant.branchBankName.indexOf(queryString) > 0)
      }
    },
    IdentityCodeValid (code, _this) { // 身份证校验
      // code = '33260319780604606X'
      var city = {
        11: '北京',
        12: '天津',
        13: '河北',
        14: '山西',
        15: '内蒙古',
        21: '辽宁',
        22: '吉林',
        23: '黑龙江',
        31: '上海',
        32: '江苏',
        33: '浙江',
        34: '安徽',
        35: '福建',
        36: '江西',
        37: '山东',
        41: '河南',
        42: '湖北',
        43: '湖南',
        44: '广东',
        45: '广西',
        46: '海南',
        50: '重庆',
        51: '四川',
        52: '贵州',
        53: '云南',
        54: '西藏',
        61: '陕西',
        62: '甘肃',
        63: '青海',
        64: '宁夏',
        65: '新疆',
        71: '台湾',
        81: '香港',
        82: '澳门',
        91: '国外'
      }
      var tip = ''
      var pass = true
      // if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
      //   tip = '身份证号格式错误'
      //   pass = false
      // } else if (!city[code.substr(0, 2)]) {
      //   tip = '地址编码错误'
      //   pass = false
      // } else {
      // 18位身份证需要验证最后一位校验位
      if (code.length === 18) {
        code = code.split('')
        // ∑(ai×Wi)(mod 11)
        // 加权因子
        var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]
        // 校验位
        var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ]
        var sum = 0
        var ai = 0
        var wi = 0
        for (var i = 0; i < 17; i++) {
          ai = code[i]
          wi = factor[i]
          sum += ai * wi
        }
        if (code[17] === 'X') {
          if (parity[sum % 11] !== 'X') {
            tip = '校验位错误'
            pass = false
          }
        } else if (parity[sum % 11] !== parseInt(code[17])) {
          tip = '校验位错误'
          pass = false
        }
      }
      // }
      console.log(tip, city)
      // if (!pass) {
      //   _this.$message({
      //     message: tip,
      //     type: 'error'
      //   })
      // }
      return pass
    },
    changeRental (value) {
      this.form.deposit1 = value
    },
    changeDuringTime () {
      let year = ''
      let during = this.form.during
      // 获取当前时间
      let effectTime = (new Date(this.form.startTime)).getTime()
      // 获取当前前一天时间
      effectTime = new Date(effectTime - 24 * 60 * 60 * 1000)
      if (during === '3年' && !isNaN(effectTime)) {
        year = 3
        this.form.endTime = (effectTime.getFullYear() + year) + '/' + (effectTime.getMonth() + 1) + '/' + effectTime.getDate() + ' 00:00:00'
      } else if (during === '4年' && !isNaN(effectTime)) {
        year = 4
        this.form.endTime = (effectTime.getFullYear() + year) + '/' + (effectTime.getMonth() + 1) + '/' + effectTime.getDate() + ' 00:00:00'
      } else if (during === '5年' && !isNaN(effectTime)) {
        year = 5
        this.form.endTime = (effectTime.getFullYear() + year) + '/' + (effectTime.getMonth() + 1) + '/' + effectTime.getDate() + ' 00:00:00'
      } else if (during === '6年' && !isNaN(effectTime)) {
        year = 6
        this.form.endTime = (effectTime.getFullYear() + year) + '/' + (effectTime.getMonth() + 1) + '/' + effectTime.getDate() + ' 00:00:00'
      }
    },
    chooseEndTime2 () {
      // let effectTime = new Date((new Date(this.form.startTime)).getTime() - 24 * 60 * 60 * 1000)
      // 获取当前选中的开始时间
      // console.log(this.form.startTime)
      let effectTime = new Date(this.form.startTime)
      // console.log(effectTime)
      // 计算出开始时间中的年份+选择托管时长中的年份
      let year = effectTime.getFullYear() + parseInt(this.form.year)
      // 计算出开始时间中的月份+选择托管时长中的月份
      let month = effectTime.getMonth() + 1 + parseInt(this.form.month)
      // 如果结果月份超过12，则年份+1
      if (month > 12) {
        year++
        month -= 12
      }
      // let day = effectTime.getDate() + parseInt(this.form.day)
      // 计算出开始时间中的天+选择托管时长中的天
      let day = effectTime.getDate()

      // 获取加上年月的新的结束时间
      let time = year + '-' + month + '-' + day + ' 23:59:59'
      // console.log(time)
      let time1 = new Date(new Date(time).getTime() + (parseInt(this.form.day) - 1) * 24 * 60 * 60 * 1000)
      year = time1.getFullYear()
      month = time1.getMonth() + 1
      day = time1.getDate()
      // console.log(year + '-' + month + '-' + day)
      // console.log('-----------------')
      // 重新获取结束时间年月日

      if (!isNaN(effectTime)) {
        this.form.endTime = new Date(this.$options.methods.time(year, month, day, this) + ' 23:59:59').getTime()
      }
    },
    userCheck () {
      let userPhone = this.$store.state.accountUrl + 'user/info/p/'
      let userId = this.$store.state.accountUrl + 'user/info/cert/'
      let phone = this.form.userPhone
      let name = this.form.userName
      var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
      // let certificateType = this.form.certificateType
      let certificateNum = this.form.certificateNum
      phone = phone.replace(/ /g, '')
      if (this.$options.methods.userBloon(name) && this.$options.methods.userBloon(phone) && this.$options.methods.userBloon(certificateNum)) { // 判断姓名、手机号、证件号是否为空
        if (name.includes(' ')) { // 判断姓名是否有空格
          this.$message({
            message: '您输入的姓名有误，请确认后重新输入',
            type: 'error'
          })
        } else if (phone.includes(' ') || !reg.test(phone)) {
          this.$message({ // 判断手机号是否有空格
            message: '您输入的手机号有误，请确认后重新输入',
            type: 'error'
          })
        // } else if (certificateNum.includes(' ') || !this.$options.methods.IdentityCodeValid(certificateNum, this)) {
        } else if (certificateNum.includes(' ')) {
          this.$message({ // 判断证件号是否有空格
            message: '您输入的证件号有误，请确认后重新输入',
            type: 'error'
          })
        } else {
          userPhone = userPhone + phone
          this.$http.get(userPhone).then(res => { // 通过手机号获取id
            if (res.body.code === 200) {
              userId = userId + res.body.data.id
              if (res.body.data.username) {
                this.userInfo.name = res.body.data.username
              }
              if (res.body.data.phone) {
                this.userInfo.phone = parseInt(res.body.data.phone)
              }
              this.$http.get(userId).then(resId => { // 通过id获取到详细信息
                if (resId.body.code === 200) {
                  // 判断用户名、手机号、身份证号是否为空，如果不为空，则将信息放入userInfo中
                  if (resId.body.data.certNumber) {
                    this.userInfo.certificateNum = resId.body.data.certNumber
                  }
                  // 判断用户信息是否完善
                  if (res.body.data.username === null || res.body.data.phone === null || resId.body.data.certNumber === null) {
                    this.userInfo.userId = resId.body.data.id
                    this.userInfo.bean = 3
                    if (this.userInfo.name === null) {
                      this.userInfo.bool = 3
                    } else if (this.userInfo.phone === null) {
                      this.userInfo.bool = 4
                    } else if (this.userInfo.phone === null) {
                      this.userInfo.bool = 5
                    }
                  } else if (name !== this.userInfo.name || parseInt(phone) !== this.userInfo.phone || certificateNum !== this.userInfo.certificateNum) { // 判断身份信息是否完全正确
                    this.$message({
                      message: '用户信息与系统信息不匹配，请核对后重新输入',
                      type: 'error'
                    })
                    this.userInfo.bean = 2
                    this.userInfo.bool = 2
                  } else { // 用户信息无误
                    this.userInfo.bean = 2
                    this.userInfo.bool = 1
                  }
                // } else if (res.body.code === 10000) {
                //   this.userInfo.bean = 1
                } else if (resId.body.code === 10000) {
                  this.userInfo.certificateNum = ''
                  this.userInfo.bean = 3
                  this.userInfo.bool = 3
                } else {
                  // this.$message({
                  //   message: '网络错误',
                  //   type: 'error'
                  // })
                  this.userInfo.bean = 2
                  this.userInfo.bool = 2
                }
              })
            } else if (res.body.code === 10000) { // 用户未注册
              this.userInfo.bean = 1
            } else {
              // this.$message({ // 判断证件号是否有空格
              //   message: '网络错误1',
              //   type: 'error'
              // })
            }
          })
        }
      }
      // if (isNaN(phone))
    },
    userCheck1 (_this) {
      let phone = _this.form.userPhone
      let name = _this.form.userName
      let certificateNum = _this.form.certificateNum
      if ((_this.$options.methods.userBloon(name) && _this.$options.methods.userBloon(phone) && (_this.$options.methods.userBloon(certificateNum)) && _this.userInfo.name === name && _this.userInfo.phone === phone && _this.userInfo.certificateNum === certificateNum)) {
        _this.userInfo.bean = 1
      }
      // if (isNaN(phone))
    },
    userBloon (user) {
      return (user !== '' && user !== null)
    },
    changeP (item) { // 改变省份
      let _this = this
      // console.log(111)
      this.$http.post(this.bankSearch, {'baseDataType': 'CITY_INFO', 'provinceId': item}).then(function (valueD) {
        _this.address.cLists = valueD.data.data
        _this.form.city = valueD.data.data[0].cityId
        this.form.district = ''
      })
    },
    changeC (item) { // 改变城市
      console.log(item)
      let _this = this
      this.$http.post(this.bankSearch, {'baseDataType': 'AREA_INFO', 'cityId': item}).then(function (valueD) {
        _this.address.dLists = valueD.data.data
        _this.form.district = valueD.data.data[0].areaId
      })
      // console.log(item)
      // let _this = this
      // $.ajax({
      //   url: _this.bankSearch,
      //   type: 'post',
      //   dataType: 'json',
      //   contentType: 'application/json',
      //   data: JSON.stringify({'baseDataType': 'AREA_INFO', 'cityId': item})
      // }).done(function (valueD) {
      //   console.log(valueD)
      //   _this.address.dLists = valueD.data
      //   _this.form.district = valueD.data[0].id
      // }).fail(function () {
      //   console.log('error')
      // }).always(function () {
      //   console.log('complete')
      // })
      // console.log(this.address)
    },
    changeD (item) { // 改变区县
      // console.log(333)
      // let searchUrl = this.$store.state.searchUrl + 'save'
      // let req = {}
      // console.log(this.form)
      // req.blockName = this.form.blockName
      // req.city = this.form.city
      // req.province = this.form.province
      // req.district = this.form.district
      // this.$http.post(searchUrl, req).then(function (valueD) {
      //   console.log(valueD)
      // })
    }
  }
}
$('.el-dialog--small').width(650)
</script>
<style scoped>
@import '../../static/css/app.css';
.houseSizeP{
  display: inline-block;
  position: absolute;
  right: 5px;
  top: 0;
}
.dialog-footer{
  text-align: right;
  padding-right: 35px;
}
table{
  border:1px solid #666;
}
tr{
  border-top:1px solid #666;
  position: relative;
}
tr td{
  width: 13%; text-align:center; padding: 5px 2px; border-right:1px solid #666;
}
tr .el-input--mini .el-input__inner{
  padding-right: 3px 5px;
}
tr .el-form--inline .el-form-item{
  margin-right: 5px
}
.date .el-input__icon+.el-input__inner{
  padding: 3px 5px;
}
.el-dialog__body table, .el-form-item__content .houseSizeP{
  font-size: 12px
}
tr .el-form-item__content{
  line-height: 22px;
}
tr .aaa{
  position: relative;
  display: inline-block
}
tr .add{
  position:absolute; top:calc(50% - 18px); right:-20px;
  width: 16px;
  height: 36px;
  background: url('../../static/img/add.png') center center / 16px 16px;
  background-repeat: no-repeat;
  cursor: pointer;
  /*display: none;*/
}
.el-radio-group{
  margin-top: -2px;
}
</style>