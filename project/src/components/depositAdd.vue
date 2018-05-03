<template>
<!-- 新建托管 -->
	<div>
    <el-tabs v-model="activeName2" type="card" @tab-click="tableClick">
      <el-tab-pane label="分散式" name="1"></el-tab-pane>
      <el-tab-pane label="集中式" name="2"></el-tab-pane>
    </el-tabs>
    <div v-if="tableNumber === '1'">
        <el-form :model="addBean" :inline="true">
          <el-form-item label="房东姓名" :label-width="formLabelWidth">
            <el-autocomplete class="inline-input" v-model="addBean.landlordName" :trigger-on-focus="false" :fetch-suggestions="userQuerySearch" placeholder="" @select="userSelect"></el-autocomplete>
          </el-form-item>
          <el-form-item label="房东联系方式" :label-width="formLabelWidth">
            <el-input v-model="addBean.landlordPhone" :disabled="disabled" length="11" auto-complete="off" @change="houseQuerySearch1"></el-input>
          </el-form-item>
          <el-form-item label="房源性质" :label-width="formLabelWidth" style="display:block">
            <el-select v-model="addBean.originalRentType" :disabled="disabled" @change="houseQuerySearch1" style="width:169px;">
              <el-option :keys="1" label="合租" value="JOINT_RENT"></el-option>
              <el-option :keys="1" label="整租" value="ENTIRE_RENT"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="房源地址" :label-width="formLabelWidth" style="display:block"  class="is-required">
            <el-select
              v-model="addBean.houseSpaceManagerId"
              filterable
              remote
              placeholder=""
              :remote-method="houseQuerySearch" style="width:470px" @change="handleSelect">
              <el-option
                v-for="item in houseRestaurants"
                :key="item.houseSpaceManagerId"
                :label="item.keywordAddressManager"
                :value="item.houseSpaceManagerId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分租房间数:" :label-width="formLabelWidth" v-if="addBean.originalRentType === 'JOINT_RENT'">
              <el-select v-model="addBean.roomNumber" style="width:169px" placeholder="东" :disabled="disabled" @change="changeRoomNumber">
                <el-option :label="item" :value="item" :key="item" v-for="item in addBean.bedroom_number"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="套房总面积:" :label-width="formLabelWidth">
              <el-input v-model="addBean.houseSpaceManagerArea" :disabled="disabledFalse" auto-complete="off"></el-input>
          </el-form-item>
          <ul>
            <li v-for="(item, index) in addBean.reqBaseSaveHouseSpaceBeanList" class="roomNumberList">
              <el-form-item label="房间名:" :label-width="formLabelWidth" v-if="addBean.originalRentType === 'JOINT_RENT'">
                <el-input v-model="item.roomName" :disabled="disabled" auto-complete="off" style="width:169px" readonly="readonly"></el-input>
              </el-form-item>
              <el-form-item label="房间面积:" :label-width="formLabelWidth" class="is-required">
                <el-input v-model="item.houseSpaceArea1" style="width:169px" :disabled="disabled" auto-complete="off"></el-input>
                <p class="houseSizeP">㎡</p>
              </el-form-item>
              <el-form-item label="房间朝向" :label-width="formLabelWidth">
                <el-select v-model="item.direction" style="width:169px" placeholder="东" :disabled="disabled">
                  <el-option label="东" value="EAST"></el-option>
                  <el-option label="南" value="SOUTH"></el-option>
                  <el-option label="西" value="WEST"></el-option>
                  <el-option label="北" value="NORTH"></el-option>
                  <el-option label="东南" value="SOUTHEAST"></el-option>
                  <el-option label="东北" value="NORTHEAST"></el-option>
                  <el-option label="西南" value="SOUTHWEST"></el-option>
                  <el-option label="西北" value="NORTHWEST"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="出租价格" :label-width="formLabelWidth" class="is-required">
                <el-input v-model="item.rentalPrice1" style="width:169px" :disabled="disabled" auto-complete="off"></el-input>
                <p class="houseSizeP">元</p>
              </el-form-item>
              <el-form-item label="房间配备" :label-width="formLabelWidth" class="checkbox">
                <el-checkbox-group v-model="item.houseSpaceFeatureList" :disabled="disabled">
                  <el-checkbox label="WIFI" value="WIFI">WIFI</el-checkbox>
                  <el-checkbox label="PARK" value="PARK">停车位</el-checkbox>
                  <el-checkbox label="FACE_SOUTH" value="FACE_SOUTH">朝南</el-checkbox>
                  <el-checkbox label="PRIVATE_TOILET" value="PRIVATE_TOILET">独卫</el-checkbox>
                  <el-checkbox label="DUAL_BALCONY" value="DUAL_BALCONY">双阳台</el-checkbox>
                  <el-checkbox label="AIR_CONDITIONER" value="AIR_CONDITIONER">空凋</el-checkbox>
                  <el-checkbox label="PRIVATE_BALCONY" value="PRIVATE_BALCONY">私人阳台</el-checkbox>
              </el-checkbox-group>
              </el-form-item>
            </li>
          </ul>
          <el-form-item label="房间描述" :label-width="formLabelWidth" style="margin-top:22px;">
            <el-input type="textarea" :disabled="disabled" :rows="2" placeholder="" v-model="addBean.houseSpaceDescribe" style="width:470px;"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeForm()">取 消</el-button>
          <el-button type="primary" @click="depositAdd('addBean')">保 存</el-button>
        </div>
    </div>
    <div v-if="tableNumber === '2'">
      <el-form :model="centralizeData" :inline="true" ref="centralizeData" :rules="rules3">
        <el-form-item label="房东姓名" :label-width="formLabelWidth" class="is-required">
          <el-autocomplete class="inline-input" v-model="centralizeData.landlordName" :fetch-suggestions="userQuerySearch1" placeholder="" @select="userSelect1"></el-autocomplete>
        </el-form-item>
        <el-form-item label="房东联系方式" :label-width="formLabelWidth" class="is-required">
          <el-input v-model="centralizeData.landlordPhone" :disabled="disabled" length="11" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="房东证件" :label-width="formLabelWidth"  class="is-required">
          <el-select v-model="centralizeData.landlordCertType" :disabled="disabled" placeholder="证件类型" style="width:100px">
            <el-option :keys="1" label="身份证" value="ID"></el-option>
            <el-option :keys="1" label="护照" value="P"></el-option>
            <el-option :keys="1" label="驾驶执照" value="DL"></el-option>
            <el-option :keys="1" label="工商营业执照" value="BL"></el-option>
          </el-select>
          <el-form-item >
            <el-input v-model="centralizeData.landlordCertNumber" :disabled="disabled" auto-complete="off" style="width:175px"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="房东性别" label-width="80px" prop="phone">
          <el-radio class="radio" v-model="centralizeData.sex" label="M">男</el-radio>
          <el-radio class="radio" v-model="centralizeData.sex" label="F">女</el-radio>
        </el-form-item>
        <el-form-item label="房屋产权证号" label-width="120px" required>
          <el-input v-model="centralizeData.houseOwnershipCertificateNumber" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="购买保险" label-width="120px">
          <el-radio class="radio" v-model="centralizeData.insuranceStatus" label="YES">是</el-radio>
          <el-radio class="radio" v-model="centralizeData.insuranceStatus" label="NO">否</el-radio>
        </el-form-item>
        <el-form-item label="片区" :label-width="formLabelWidth" class="is-required">
          <!-- <el-select v-model="centralizeData.zoneId" :disabled="disabled" style="width:167px" @change="changeZone">
            <el-option v-for="item in unit" :label="item.text" :key="item.text" :value="item.id"></el-option>
          </el-select> -->
          <el-cascader v-model="centralizeData.zoneData" :options="unit" @change="changeZone" :props="props" :show-all-levels="false" style="width:169px;"></el-cascader>
        </el-form-item>
        <el-form-item label="小区名称" :label-width="formLabelWidth" class="is-required">
          <el-form-item>
            <el-autocomplete class="inline-input" v-model="centralizeData.blockName" :fetch-suggestions="querySearch" @select="handleSelect1" placeholder=""></el-autocomplete>
          </el-form-item>
        </el-form-item>
        <el-form-item label="所在楼栋" :label-width="formLabelWidth" class="is-required">
            <el-input v-model="centralizeData.buildingNo" :disabled="disabled" length="11" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所在单元" :label-width="formLabelWidth">
            <el-input  v-model="centralizeData.unitNo" :disabled="disabled" length="11" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="总楼层数" :label-width="formLabelWidth" class="is-required">
            <el-input v-model="centralizeData.floor" :disabled="disabled" @blur="addFloor" length="11" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="每层房间数" :label-width="formLabelWidth" class="is-required">
            <el-input v-model="centralizeData.roomNumber" :disabled="disabled" length="11" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择楼层" :label-width="formLabelWidth" v-if="centralizeData.currentFloor1" class="is-required">
          <ul v-model="centralizeData.currentFloor1" class="floorModel" style="width:480px;">
            <li v-for="floor in parseInt(centralizeData.floor)" class="floor" @click="chooseFloor">{{floor}}</li>
          </ul>
        </el-form-item>
        <ul class="houseSpaceManagerTypeUl">
          <li v-for="(type, index) in centralizeData.reqCommonCentralizeHouseSpaceBeanList" class="houseSpaceManagerTypeLi">
            <el-form-item label="房型" :label-width="formLabelWidth" class="is-required">
                <el-input v-model="type.name" :disabled="disabled" placeholder="名称" length="11" auto-complete="off" style="width:80px" @blur="inputBlur(type, index)"></el-input>
                <el-select v-model="type.bedroomNumber" :disabled="disabled" style="width:70px">
                  <el-option label="1室" value="1" key="1"></el-option>
                  <el-option label="2室" value="2" key="2"></el-option>
                  <el-option label="3室" value="3" key="3"></el-option>
                  <el-option label="4室" value="4" key="4"></el-option>
                  <el-option label="5室" value="5" key="5"></el-option>
                  <el-option label="6室" value="6" key="6"></el-option>
                </el-select>
                <el-select v-model="type.livingRoomNumber" :disabled="disabled" style="width:70px">
                  <el-option label="0厅" value="0" key="0"></el-option>
                  <el-option label="1厅" value="1" key="1"></el-option>
                  <el-option label="2厅" value="2" key="2"></el-option>
                  <el-option label="3厅" value="3" key="3"></el-option>
                  <el-option label="4厅" value="4" key="4"></el-option>
                  <el-option label="5厅" value="5" key="5"></el-option>
                  <el-option label="6厅" value="6" key="6"></el-option>
                </el-select>
                <el-select v-model="type.toiletNumber" :disabled="disabled" style="width:70px">
                  <el-option label="1卫" value="1" key="1"></el-option>
                  <el-option label="2卫" value="2" key="2"></el-option>
                  <el-option label="3卫" value="3" key="3"></el-option>
                  <el-option label="4卫" value="4" key="4"></el-option>
                  <el-option label="5卫" value="5" key="5"></el-option>
                  <el-option label="6卫" value="6" key="6"></el-option>
                </el-select>
                <el-select v-model="type.direction" placeholder="东" :disabled="disabled" style="width:85px">
                  <el-option label="东" value="EAST"></el-option>
                  <el-option label="南" value="SOUTH"></el-option>
                  <el-option label="西" value="WEST"></el-option>
                  <el-option label="北" value="NORTH"></el-option>
                  <el-option label="东南" value="SOUTHEAST"></el-option>
                  <el-option label="东北" value="NORTHEAST"></el-option>
                  <el-option label="西南" value="SOUTHWEST"></el-option>
                  <el-option label="西北" value="NORTHWEST"></el-option>
                </el-select>
                <el-input :disabled="disabled" v-model="type.houseSpaceManagerArea1" @blur="inputBlur(type, index)" placeholder="面积" length="11" auto-complete="off" style="width:80px; position:relative;">
                </el-input>
                <p style="position:absolute; top:calc(50% - 18px); right:5px;">㎡</p>
            </el-form-item>
            <el-form-item label="房间配备" :label-width="formLabelWidth" class="checkbox">
              <el-checkbox-group v-model="type.houseSpaceFeatureList" :disabled="disabled">
                <el-checkbox label="WIFI" value="WIFI">WIFI</el-checkbox>
                <el-checkbox label="PARK" value="PARK">停车位</el-checkbox>
                <el-checkbox label="FACE_SOUTH" value="FACE_SOUTH">朝南</el-checkbox>
                <el-checkbox label="PRIVATE_TOILET" value="PRIVATE_TOILET">独卫</el-checkbox>
                <el-checkbox label="DUAL_BALCONY" value="DUAL_BALCONY">双阳台</el-checkbox>
                <el-checkbox label="AIR_CONDITIONER" value="AIR_CONDITIONER">空凋</el-checkbox>
                <el-checkbox label="PRIVATE_BALCONY" value="PRIVATE_BALCONY">私人阳台</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <p class="add" @click="addHouseType"></p>
            <p class="reduce" @click="reduceHouseType(centralizeData.reqCommonCentralizeHouseSpaceBeanList, index)"></p>
          </li>
        </ul>
        <el-form-item label="确定房间" :label-width="formLabelWidth" style="display:block;">
          <ul style="width:470px; display:block;" class="f-cb">
            <div class="f-cb" style="float:left; width:320px;">
              <li v-for="(type, index) in centralizeData.reqCommonCentralizeHouseSpaceBeanList" v-if="type.name !== '' && type !== null" style="display:inline-block; margin-right:10px; cursor:pointer; float:left;" @click="addHouse(index)">
                <p>{{type.name}}<span style="color:#666; font-size:10px">(点击选择房间)</span></p>
              </li>
            </div>
            <div class="f-cb" style="float:right;">
            <li style="display:inline-block; margin-right:10px; cursor:pointer; float:right;">
              <el-button type="primary" @click="getHouseList">查看房间列表</el-button>
            </li>
            </div>
          </ul>
        </el-form-item>
        <el-form-item label="意向价格" :label-width="formLabelWidth">
          <el-input v-model="centralizeData.getPrice1" :disabled="disabled" auto-complete="off"></el-input>
          <p class="houseSizeP">元</p>
        </el-form-item>
        <el-form-item label="房间描述" :label-width="formLabelWidth">
          <el-input type="textarea" :disabled="disabled" :rows="2" placeholder="" v-model="centralizeData.memo" style="width:470px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeForm()">取 消</el-button>
        <el-button type="primary" @click="depositAdd1">保 存</el-button>
      </div>
    </div>

    <el-dialog title="选择房源户型" :visible.sync="chooseHouseTypeShow" top="30%" style="height:100%; overflose-x:hidden; background:rgba(0,0,0,.5;" :modal="false" :close-on-click-modal="false">
      <div class='houseChoose'>
        <el-checkbox-group v-model="houseSpaceListChoose">
          <li v-for="item in houseSpaceList" v-if="item.length > 0"><div v-if="item[0].length === 3">{{item[0].substr(0, 1)}}楼</div><div v-else>{{item[0].substr(0, 2)}}楼</div><el-checkbox v-for="list in item" :label="list" :key="list" class="roomList">{{list}}</el-checkbox></li>
        </el-checkbox-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="chooseHouseTypeShow = !chooseHouseTypeShow">取 消</el-button>
        <el-button type="primary" @click="chooseHouseListTrue">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="已选择的房间列表" :visible.sync="chooseHouseListShow" top="30%" style="height:100%; overflose-x:hidden; background:rgba(0,0,0,.5);" :modal="false" :close-on-click-modal="false" class="chooseHouseListShow">
      <div class='houseChoose'>
        <el-checkbox-group v-model="houseSpaceListChoose">
          <li v-for="(item, index) in this.centralizeData.reqCommonCentralizeHouseSpaceBeanList">
            <div>{{item.name}}（{{item.bedroomNumber}}室{{item.livingRoomNumber}}厅{{item.toiletNumber}}卫）{{item.roomList}}</div>
            <el-tag
              v-for="tag in item.roomNoList"
              :key="tag"
              :closable="true"
              type="primary"
              @close="removeRoomList(index, item.roomNoList, tag)"
            >
            {{tag}}
            </el-tag>
          </li>
        </el-checkbox-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="chooseHouseListShow = !chooseHouseListShow">关 闭</el-button>
        <!-- <el-button type="primary" @click="chooseHouseListTrue">确 定</el-button> -->
      </div>
    </el-dialog>

    <el-dialog title="选择省市" :visible.sync="addShow" :modal="false" size="tiny" top="70%" class="addShow">
      <el-form :model="centralizeData" :inline="true" label-width="100px">
        <div>
          <el-form-item label="省市区" :label-width="formLabelWidth">
            <el-select v-model="centralizeData.province" style="width:145px" placeholder="选择省份" @change="changeP">
              <el-option v-for="list in address.pLists"  :key="list.province" :label="list.province" :value="list.provinceId"></el-option>
            </el-select>
            <el-select v-model="centralizeData.city" style="width:145px" placeholder="选择城市" @change="changeC">
              <el-option v-for="list in address.cLists" :key="list.city" :label="list.city" :value="list.cityId"></el-option>
            </el-select>
            <el-select v-model="centralizeData.district" style="width:145px" placeholder="选择区县" @change="changeD">
              <el-option v-for="list in address.dLists" :key="list.area" :label="list.area" :value="list.areaId"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="addShow = false">取 消</el-button> -->
        <el-button type="primary" @click="depositAdd1()">确 定</el-button>
      </div>
    </el-dialog>
	</div>
</template>
<script>
import $ from 'jquery'
import houseRescoure1 from './houseRescoure1'  //  新建房源
import houseUser from './houseUser'  //  新建房源
export default {
  beforeCreate: function () {
    // var uesrApi = this.$store.state.accountUrl + 'user/list' // 房东
    let treeArea = this.$store.state.accountUrl + 'unit/tree/f/area'
    let houseApi = this.$store.state.houseUrl + 'list/houseSpaceManager'
    // 搜索小区
    this.$options.methods.unitSelect(this, treeArea)
    // 搜索房东
    // this.$options.methods.landlordSearch(this, uesrApi, '')
    // 搜索预录入房源
    let req = {}
    req.keywordAddressManager = ''
    req.originalRentType = 'ENTIRE_RENT'
    this.$options.methods.houseListSearch(this, houseApi, req)
  },
  data: function () {
    var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
    var size = (rule, value, callback) => {
      if (!reg.test(value) || value <= 0) {
        callback(new Error('请填写正确的面积'))
      } else {
        callback()
      }
    }
    return {
      landlord: '房东',
      renter: '租客',
      disable: Boolean(this.disabled),
      disabledFalse: true,
      options: [],
      userNameOptions: [],
      activeName2: '1',
      tableNumber: '1',
      chooseHouseTypeShow: false,
      houseRepeat: 0, // 判断集中式房型有无重复
      addBean: { // 新增托管数据
        getPrice: '', // 价格
        getPrice1: '', // 价格
        houseSpaceDescribe: '', // 描述
        zone: '城东片区', // 片区
        zoneId: '', // 片区
        zoneData: [],
        userId: '', // 房东ID
        landlordName: '',
        landlordPhone: '', // 手机号
        propertyType: 'D',
        originalRentType: 'ENTIRE_RENT',
        houseSpaceManagerId: '',
        roomNumber: '0',
        bedroom_number: 4,
        reqBaseSaveHouseSpaceBeanList: [
          {
            bedroomType: 'MASTER',
            direction: 'EAST',
            houseSpaceArea: '',
            houseSpaceArea1: '',
            rentalPrice: '',
            rentalPrice1: '',
            roomName: 'A',
            houseSpaceFeatureList: []
          }
        ]
      },
      addBean1: { // 新增托管数据
        houseSpaceManagerArea: '', // 面积
        bedroomNumber: '1', // 卧室数量
        blockName: '', // 小区
        buildingNo: '', // 栋
        businessId: '', // 业务ID
        currentFloor1: 0, // 当前楼层
        floorHeight: 0, // 总楼高
        getPrice: '', // 价格
        getPrice1: '', // 价格
        houseSpaceDescribe: '', // 描述
        houseSpaceFeatureList: [], // 优势
        kitchenNumber: '1', // 厨房数量
        livingRoomNumber: '1', // 客厅数量
        landlordPhone: '', // 手机号
        roomNo: '', // 室号
        toiletNumber: '1', // 卫生间数量
        direction: 'EAST', // 朝向
        zone: '城东片区', // 片区
        zoneId: '', // 片区
        unitNo: '', // 单元号
        userId: '', // 房东ID
        landlordCertType: 'ID', // 身份证件类型
        landlordCertNumber: '', // 证件号码
        landlordName: '',
        sex: 'M'
      },
      centralizeData: { // 新增集中式房源
        userId: '', // 房东ID
        landlordCertType: 'ID', // 身份证件类型
        landlordCertNumber: '', // 证件号码
        landlordName: '',
        sex: 'M',
        zone: '城东片区', // 片区
        blockName: '', // 小区
        houseSpaceFeatureList: [], // 优势
        housePrice: '', // 价格
        housePrice1: '', // 价格
        floor: 10, // 楼层
        currentFloor1: [], // 选择楼层
        roomNumber: '', // 每层房间数量
        memo: '', // 备注
        unitNo: '',
        buildingNo: '',
        zoneId: '',
        houseOwnershipCertificateNumber: '',
        insuranceStatus: 'YES',
        city: '',
        province: '',
        district: '',
        blockId: '',
        reqCommonCentralizeHouseSpaceBeanList: [ // 户型
          {
            name: '',
            bedroomNumber: '1',
            livingRoomNumber: '1',
            toiletNumber: '1',
            direction: 'EAST',
            houseSpaceManagerArea: '',
            houseSpaceFeatureList: [],
            roomNoList: [],
            roomList: []
          }
        ]
      },
      centralizeData1: { // 新增集中式房源
        userId: '', // 房东ID
        landlordCertType: 'ID', // 身份证件类型
        landlordCertNumber: '', // 证件号码
        landlordName: '',
        sex: 'M',
        zone: '城东片区', // 片区
        blockName: '', // 小区
        houseSpaceFeatureList: [], // 优势
        housePrice: '', // 价格
        housePrice1: '', // 价格
        floor: 10, // 楼层
        currentFloor1: [], // 选择楼层
        roomNumber: '', // 每层房间数量
        memo: '', // 备注
        unitNo: '',
        buildingNo: '',
        houseOwnershipCertificateNumber: '',
        insuranceStatus: 'YES',
        city: '',
        province: '',
        district: '',
        blockId: '',
        reqCommonCentralizeHouseSpaceBeanList: [ // 户型
          {
            name: '',
            bedroomNumber: '1',
            livingRoomNumber: '1',
            toiletNumber: '1',
            direction: 'EAST',
            houseSpaceManagerArea: '',
            roomNoList: []
          }
        ]
      },
      reqCommonCentralizeHouseSpaceBeanList1: { // 集中式备份信息
        name: '',
        bedroomNumber: '1',
        livingRoomNumber: '1',
        toiletNumber: '1',
        direction: 'EAST',
        houseSpaceManagerArea: '',
        roomNoList: []
      },
      reqCommonCentralizeHouseSpaceBeanList: { // 集中式备份信息
        name: '',
        bedroomNumber: '1',
        livingRoomNumber: '1',
        toiletNumber: '1',
        direction: 'EAST',
        houseSpaceManagerArea: '',
        roomNoList: []
      },
      houseSpaceIndex: '',
      houseSpaceList: [], // 集中式房间列表
      houseSpaceListChoose: [], // 当前选中的房间列表
      houseSpaceListing: [], // 集中式房间已被选中的房间列表
      rules2: {
        landlordName: [{required: true, message: '请输入房东姓名', trigger: 'blur'}],
        landlordCertNumber: [{required: true, min: 15, max: 18, message: '请输入房东证件号码', trigger: 'blur'}],
        landlordPhone: [{message: '请输入正确的房东联系方式', trigger: 'blur'}],
        blockName: [{message: '请输入小区', trigger: 'blur'}],
        zone: [{message: '请选择片区', trigger: 'blur'}],
        houseSpaceManagerArea1: [{message: '请输入房间面积', trigger: 'blur'},
          {validator: size, message: '请填写正确的面积', trigger: 'blur'}],
        room: [{message: '请输入正确房型', trigger: 'blur'}],
        roomNo: [{message: '请输入房间号', trigger: 'blur'}]
      },
      rules3: {
        landlordName: [{required: true, message: '请输入房东姓名', trigger: 'blur'}],
        landlordCertNumber: [{required: true, min: 15, max: 18, message: '请输入房东证件号码', trigger: 'blur'}],
        landlordPhone: [{message: '请输入正确的房东联系方式', trigger: 'blur'}],
        blockName: [{required: true, message: '请输入小区', trigger: 'blur'}],
        zone: [{required: true, message: '请选择片区', trigger: 'blur'}],
        // houseSpaceManagerArea1: [{message: '请输入房间面积', trigger: 'blur'},
          // {validator: size, required: true, message: '请填写正确的面积', trigger: 'blur'}],
        room: [{message: '请输入正确房型', trigger: 'blur'}],
        roomNo: [{message: '请输入房间号', trigger: 'blur'}]
        // direction: [{message: '请选择朝向', trigger: 'blur'}]
      },
      restaurants: [
        { 'value': '德信晓宸', 'id': '' },
        { 'value': '八方城', 'id': '' },
        { 'value': '德信东望', 'id': '' }
      ],
      houseRestaurants: [], // 预录入列表
      restaurants1: [], // 预录入列表
      landlordList: [], // 房东列表
      options2: [ // 片区列表
        {
          label: '江苏',
          cities: [
            {
              label: '南京'
            },
            {
              label: '苏州'
            }
          ]
        }, {
          label: '浙江',
          cities: [
            {label: 'hangz', value: ''},
            {label: 'hangz', value: ''}
          ]
        }
      ],
      options4: [],
      loading: true,
      props: {
        value: 'label',
        children: 'cities'
      },
      unit: [], // 片区列表
      readonly: true,
      mix1: {
        treeArea: 'http://116.62.166.134:21000/account/unit/tree/f/area', // 查询片区
        houseApi: this.$store.state.houseUrl + 'list/houseSpaceManager' // 查询预录入房源列表
      },
      address: {
        pLists: [],
        cLosts: [],
        dLists: []
      },
      clickOver: true,
      chooseHouseListShow: false,
      addShow: false,
      removeHouseList: [],
      unitList: [], // 片区列表
      bankSearch: this.$store.state.searchUrl + 'baseDataInfo' // 查询银行
    }
  },
  props: ['mix', 'formLabelWidth', 'disabled'],
  mounted () {
    $('.el-dialog--small,.el-dialog--tiny').width(650)
  },
  methods: {
    landlordSearch (_this, userUrl, name) { // 搜索房东信息
      let dataList = {}
      dataList.pageNo = 1
      dataList.pageSize = 10
      // dataList.userType = 'P'
      dataList.username = name
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
        _this.landlordList = option
      })
      // }
    },
    closeForm () {
      this.$emit('listenToParentEvent', false)
      this.$options.methods.gbAddBean(this)
      this.$options.methods.gbAddBean1(this)
      this.tableNumber = '1'
      this.activeName2 = '1'
    },
    directionChange (data) { // 解析房源朝向
      switch (data) {
        case 'WIFI':
          data = 'WIFI'
          break
        case '停车位':
          data = 'PARK'
          break
        case '朝南':
          data = 'FACE_SOUTH'
          break
        case '独卫':
          data = 'PRIVATE_TOILET'
          break
        case '双阳台':
          data = 'DUAL_BALCONY'
          break
        case '空凋':
          data = 'AIR_CONDITIONER'
          break
        case '私人阳台':
          data = ' PRIVATE_BALCONY'
          break
      }
      return data
    },
    tableClick (data) { // 切换集中式以及分散式
      if (this.clickOver) {
        this.tableNumber = data.name
        this.$options.methods.gbAddBean(this)
        this.$options.methods.gbAddBean1(this)
      }
    },
    depositAdd (rules2) {
      // 新增开始
      if (this.clickOver) {
        this.clickOver = false
        var data = this.addBean
        var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
        var url = this.$store.state.houseUrl + 'save/houseSpace'
        let count = 0
        if (data.houseSpaceManagerId === '' || data.houseSpaceManagerId === null) {
          this.$message({
            message: '请选择正确的房源地址',
            type: 'error'
          })
        } else {
          let houseArea = 0
          for (let i = 0; i < data.reqBaseSaveHouseSpaceBeanList.length; i++) {
            if (data.reqBaseSaveHouseSpaceBeanList[i].houseSpaceArea1 === '' || data.reqBaseSaveHouseSpaceBeanList[i].houseSpaceArea1 === null || !reg.test(data.reqBaseSaveHouseSpaceBeanList[i].houseSpaceArea1)) {
              count = 1
            } else if (data.reqBaseSaveHouseSpaceBeanList[i].rentalPrice1 === '' || data.reqBaseSaveHouseSpaceBeanList[i].rentalPrice1 === null || !reg.test(data.reqBaseSaveHouseSpaceBeanList[i].rentalPrice1)) {
              count = 2
            } else {
              data.reqBaseSaveHouseSpaceBeanList[i].houseSpaceArea = data.reqBaseSaveHouseSpaceBeanList[i].houseSpaceArea1 * 1000
              data.reqBaseSaveHouseSpaceBeanList[i].rentalPrice = data.reqBaseSaveHouseSpaceBeanList[i].rentalPrice1 * 1000
              houseArea += parseInt(data.reqBaseSaveHouseSpaceBeanList[i].houseSpaceArea1)
            }
          }
          if (count === 1) {
            this.$message({
              message: '请选择正确的房间面积',
              type: 'error'
            })
            this.clickOver = true
          } else if (count === 2) {
            this.$message({
              message: '请选择正确的房间出租价格',
              type: 'error'
            })
            this.clickOver = true
          } else if (houseArea > parseInt(data.houseSpaceManagerArea)) {
            this.$message({
              message: '所有房间面积之和不能超过：' + data.houseSpaceManagerArea + '㎡',
              type: 'error'
            })
            this.clickOver = true
          } else {
            this.$http.post(url, data).then(res => {
              if (res.body.code === 200) {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
                this.$emit('addSuccess')
                this.$options.methods.gbAddBean(this)
              } else {
                this.$message({
                  message: res.body.message,
                  type: 'error'
                })
              }
              this.clickOver = true
            })
          }
        }
      }
      // 新增结束
    },
    depositAdd1 () {
      if (this.clickOver) {
        this.clickOver = false
        // var url = 'http://116.62.166.134:23222/house/save/house/centralize'
        var url = this.$store.state.houseUrl + 'save/house/centralize'
        this.centralizeData.houseSpaceManagerType = 'HOUSE'
        this.centralizeData.propertyType = 'C'
        this.centralizeData.originalRentType = 'ENTIRE_RENT'
        let list = this.centralizeData.reqCommonCentralizeHouseSpaceBeanList
        let areaCount = 0
        let roomCount = 0
        this.centralizeData.getPrice = this.centralizeData.getPrice1 * 1000
        this.centralizeData.floorHeight = this.centralizeData.floor
        for (let i in this.centralizeData.reqCommonCentralizeHouseSpaceBeanList) {
          if (list[i].houseSpaceManagerArea1 * 1000 > 0) {
            list[i].houseSpaceManagerArea = list[i].houseSpaceManagerArea1 * 1000
          } else {
            areaCount++
          }
          if (this.centralizeData.reqCommonCentralizeHouseSpaceBeanList[i].roomNoList.length === 0) {
            roomCount++
          }
        }
        if (areaCount > 0) {
          this.$message({
            message: '房源面积有误，请确认后重新提交',
            type: 'error'
          })
          this.clickOver = true
        } else if (roomCount > 0) {
          this.$message({
            message: '请选择正确的房间',
            type: 'error'
          })
          this.clickOver = true
        } else if (this.centralizeData.houseOwnershipCertificateNumber === null || this.centralizeData.houseOwnershipCertificateNumber === '') {
          this.$message({
            message: '请填写房屋产权证号',
            type: 'error'
          })
          this.clickOver = true
        } else {
          if (this.centralizeData.city === '' || this.centralizeData.city === null) {
            // this.$http.post(search)
            let msg = '请您填写小区地址'
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
            this.centralizeData.inputPersonnelId = this.$store.state.currentUser.uid
            let searchUrl = this.$store.state.blockUrl + 'save'
            let req = {}
            req.blockName = this.centralizeData.blockName
            req.city = this.centralizeData.city
            req.province = this.centralizeData.province
            req.district = this.centralizeData.district
            this.$http.post(searchUrl, req).then(function (valueD) {
              if (valueD.body.code === 200) {
                this.centralizeData.blockId = valueD.body.data.pid
                this.$http.post(url, this.centralizeData).then((data1) => {
                  if (data1.body.code === 200) {
                    this.$message({
                      message: '添加成功',
                      type: 'success'
                    })
                    this.$emit('addSuccess')
                    this.$options.methods.gbAddBean1(this)
                    this.tableNumber = '1'
                    this.activeName2 = '1'
                  } else if (data1.body.code === 10002) {
                    this.$message({
                      message: '该房源已存在，请不要重复添加',
                      type: 'error'
                    })
                  } else {
                    this.$message({
                      message: '添加失败',
                      type: 'error'
                    })
                  }
                  this.clickOver = true
                })
              } else {
                this.clickOver = true
              }
            })
          }
        }
      }
    },
    querySearch (queryString, cb) { // 小区信息
      this.restaurants1 = []
      if (queryString) {
        // let req = {}
        // let mix = this.$store.state.houseUrl + 'list/block' // 房源列表
        // req.houseSpaceManagerType = 'HOUSE'
        // req.houseSpaceProcess = 'RENTABLE_PROCESS'
        // req.rentType = 'ENTIRE_RENT'
        // req.pageNo = 1
        // req.pageSize = 10
        // req.propertyType = 'D'
        // req.keywordAddress = queryString
        // req.loginId = this.$store.state.currentUser.uid
        // this.$http.post(mix, req).then(res => {
        //   if (res.body.code === 200) {
        //     // this.restaurants1 = res.body.list
        //     let len = 0
        //     // console.log(res.body.data)
        //     if (res.body.data.totalCount > 10) {
        //       len = 10
        //     } else {
        //       len = res.body.data.totalCount
        //     }
        //     for (let i = 0; i < len; i++) {
        //       let list = {}
        //       list.value = res.body.data.list[i].blockName
        //       list.id = ''
        //       this.restaurants1.push(list)
        //     }
        //   }
        // })
        let req = {}
        req.baseDataType = 'BLOCK_INFO'
        req.blockName = queryString
        let bankSearch = this.$store.state.searchUrl + 'baseDataInfo'
        this.$http.post(bankSearch, req).then(res => {
          if (res.body.code === 200) {
            // _this.form.bankOfAccounts = res.body.data[0].branchBankName
            let len = 0
            // console.log(res.body.data)
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
      // console.log(this.restaurants1)
      // var results = queryString ? restaurants.filter(this.createFilter2(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(restaurants)
    },
    handleSelect1 (item) {
      this.centralizeData.blockName = item.value
      this.centralizeData.province = item.province
      this.centralizeData.city = item.city
      this.centralizeData.district = item.district
      this.centralizeData.blockId = item.pid
    },
    createFilter (queryString) { // 小区信息
      return (restaurant) => {
        return (restaurant.value.indexOf(queryString.toLowerCase()) === 0)
      }
    },
    houseQuerySearch (queryString) { // 搜索预录入房源列表
      // var url = this.$store.state.houseUrl + 'list/houseSpaceManager'
      let req = {}
      req.keywordAddressManager = queryString
      req.landlordPhone = this.addBean.landlordPhone
      req.landlordName = this.addBean.landlordName
      req.originalRentType = this.addBean.originalRentType
      this.$options.methods.houseListSearch(this, this.mix1.houseApi, req)
    },
    houseQuerySearch1 (queryString) { // 搜索预录入房源列表
      let req = {}
      this.houseRestaurants = []
      this.addBean.houseSpaceManagerId = ''
      this.addBean.houseSpaceManagerArea = ''
      req.keywordAddressManager = ''
      req.landlordPhone = this.addBean.landlordPhone
      req.originalRentType = this.addBean.originalRentType
      this.$options.methods.houseListSearch(this, this.mix1.houseApi, req)
      if (this.addBean.originalRentType === 'ENTIRE_RENT') {
        this.$options.methods.changeRoomNumber1(1, this)
      } else {
        this.addBean.roomNumber = 1
      }
    },
    handleSelect (item) { // 选择小区信息
      for (let i = 0; i < this.houseRestaurants.length; i++) {
        if (this.addBean.houseSpaceManagerId === this.houseRestaurants[i].houseSpaceManagerId) {
          this.addBean.bedroom_number = parseInt(this.houseRestaurants[i].bedroomNumber + 1)
          this.addBean.bedroom_number = 10
          this.addBean.roomNumber = 1
          let reqBaseSaveHouseSpaceBeanList = {}
          reqBaseSaveHouseSpaceBeanList.rentalPrice1 = this.houseRestaurants[i].getPrice / 1000
          reqBaseSaveHouseSpaceBeanList.houseSpaceArea1 = this.houseRestaurants[i].houseSpaceManagerArea / 1000
          reqBaseSaveHouseSpaceBeanList.direction = this.houseRestaurants[i].houseSpaceManagerDirection
          reqBaseSaveHouseSpaceBeanList.roomName = 'A'
          reqBaseSaveHouseSpaceBeanList.houseSpaceFeatureList = []
          reqBaseSaveHouseSpaceBeanList.roomName = 'A'
          this.addBean.reqBaseSaveHouseSpaceBeanList = []
          this.addBean.houseSpaceManagerArea = reqBaseSaveHouseSpaceBeanList.houseSpaceArea1
          // switch (i) {
          //   case 0:
          //     reqBaseSaveHouseSpaceBeanList.roomName = 'A'
          //     break
          //   case 1:
          //     reqBaseSaveHouseSpaceBeanList.roomName = 'B'
          //     break
          //   case 2:
          //     reqBaseSaveHouseSpaceBeanList.roomName = 'C'
          //     break
          //   case 3:
          //     reqBaseSaveHouseSpaceBeanList.roomName = 'D'
          //     break
          //   case 4:
          //     reqBaseSaveHouseSpaceBeanList.roomName = 'E'
          //     break
          //   case 5:
          //     reqBaseSaveHouseSpaceBeanList.roomName = 'F'
          //     break
          //   case 6:
          //     reqBaseSaveHouseSpaceBeanList.roomName = 'G'
          //     break
          // }
          this.addBean.reqBaseSaveHouseSpaceBeanList.push(reqBaseSaveHouseSpaceBeanList)
        }
      }
    },
    userQuerySearch (queryString, cb) { // 房东信息
      // if (queryString !== '' && queryString !== null) {
      var option = []
      if (queryString) {
        // 查询租客
        this.$http.post(this.mix.userUrl, {
          username: queryString, pageNo: 1, pageSize: 5
        }).then(({data}) => {
          if (data.code === 200) {
            var data1 = data.data.list
            var op = {}
            for (var i = 0; i < data1.length && i < 5; i++) {
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
            this.landlordList = option
          } else {
            this.landlordList = []
          }
        })
        cb(option)

        // 查询房源
        let req = {}
        req.keywordAddressManager = ''
        req.landlordPhone = this.addBean.landlordPhone
        req.landlordName = this.addBean.landlordName
        req.originalRentType = this.addBean.originalRentType
        this.$options.methods.houseListSearch(this, this.mix1.houseApi, req)
        if (this.addBean.originalRentType === 'ENTIRE_RENT') {
          this.$options.methods.changeRoomNumber1(1, this)
        }
      }
      // }
    },
    userQuerySearch1 (queryString, cb) { // 房东信息
      // if (queryString !== '' && queryString !== null) {
      var option = []
      if (queryString) {
        this.$http.post(this.mix.userUrl, {
          username: queryString, pageNo: 1, pageSize: 5
        }).then(({data}) => {
          if (data.code === 200) {
            var data1 = data.data.list
            var op = {}
            // var option = []
            for (var i = 0; i < data1.length && i < 5; i++) {
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
            this.landlordList = option
          } else {
            this.landlordList = []
          }
        })

        // 查询房源
        let req = {}
        req.keywordAddressManager = ''
        req.landlordPhone = this.addBean.landlordPhone
        req.landlordName = this.addBean.landlordName
        req.originalRentType = this.addBean.originalRentType
        this.$options.methods.houseListSearch(this, this.mix1.houseApi, req)
        if (this.addBean.originalRentType === 'ENTIRE_RENT') {
          this.$options.methods.changeRoomNumber1(1, this)
        }
      }
      cb(option)
      // }
    },
    userFilter (queryString) { // 房东信息
      return (restaurant) => {
        return (restaurant.value.indexOf(queryString.toLowerCase()) === 0)
      }
    },
    userSelect (item) { // 选择房东信息
      this.addBean.landlordPhone = item.phone
      this.addBean.landlordId = item.id
      // 查询房源
      let req = {}
      req.keywordAddressManager = ''
      req.landlordId = this.addBean.landlordId
      req.originalRentType = this.addBean.originalRentType
      this.$options.methods.houseListSearch(this, this.mix1.houseApi, req)
      if (this.addBean.originalRentType === 'ENTIRE_RENT') {
        this.$options.methods.changeRoomNumber1(1, this)
      }
    },
    userSelect1 (item) {
      this.centralizeData.landlordPhone = item.phone
      this.centralizeData.landlordId = item.id
      this.centralizeData.sex = item.sex
      var url = this.mix.userId + item.id
      this.$http.get(url).then(({data}) => {
        if (data.code === 200) {
          this.centralizeData.landlordCertType = data.data.certType
          this.centralizeData.landlordCertNumber = data.data.certNumber
        }
      })
    },
    unitSelect (_this, userUrl) { // 搜索片区
      _this.unitList = []
      _this.$http.get(userUrl).then(({data}) => {
        // var data1 = data.data.children[0].children
        var data1 = data.data.children
        _this.unitFormat(_this, data.data.children)
        _this.unit = data1
        _this.addBean.zone = _this.unit[0].text
        _this.addBean.zoneId = _this.unit[0].id
        _this.centralizeData.zone = _this.unit[0].text
        _this.centralizeData.zoneId = _this.unit[0].id
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
    // zoneChange (data) { // 选择片区
    //   // console.log(data)
    //   this.addBean.zoneId = data
    // },
    unitChange (value) {
      for (let i in this.unit) {
        if (this.unit[i].id === value) {
          this.addBean.zone = this.unit[i].text
        }
      }
    },
    changeZone (value) {
      for (let i in this.unit) {
        if (this.unit[i].id === value) {
          this.centralizeData.zone = this.unit[i].text
        }
      }
    },
    addHouseType () {
      var obj = {}
      obj.bedroomNumber = '1'
      obj.direction = 'EAST'
      obj.houseSpaceList = []
      obj.houseSpaceManagerArea = ''
      obj.livingRoomNumber = '1'
      obj.name = ''
      obj.toiletNumber = '1'
      obj.getPrice1 = ''
      obj.houseSpaceFeatureList = []
      obj.roomNoList = []
      this.centralizeData.reqCommonCentralizeHouseSpaceBeanList.push(obj)
    },
    gbAddBean (_this) { // 格式化addBean
      _this.addBean.houseSpaceManagerArea1 = ''
      _this.addBean.getPrice = ''
      _this.addBean.getPrice1 = ''
      _this.addBean.houseSpaceDescribe = ''
      _this.addBean.houseSpaceFeatureList = []
      _this.addBean.zone = '城东片区'
      _this.addBean.zoneId = ''
      _this.addBean.userId = ''
      _this.addBean.landlordName = ''
      _this.addBean.landlordPhone = ''
      _this.addBean.propertyType = 'D'
      _this.addBean.originalRentType = 'ENTIRE_RENT'
      _this.addBean.houseSpaceManagerId = ''
      _this.addBean.roomNumber = '0'
      _this.addBean.bedroom_number = 4
      _this.addBean.reqBaseSaveHouseSpaceBeanList = []
      let list = {}
      list.bedroomType = 'MASTER'
      list.direction = 'EAST'
      list.houseSpaceArea = ''
      list.houseSpaceArea1 = ''
      list.rentalPrice = ''
      list.rentalPrice1 = ''
      list.roomName = ''
      list.reqBaseSaveHouseSpaceBeanList = []
      list.houseSpaceFeatureList = []
      _this.addBean.reqBaseSaveHouseSpaceBeanList.push(list)
    },
    gbAddBean1 (_this) {
      _this.centralizeData.userId = '' // 房东ID
      _this.centralizeData.landlordCertType = 'ID' // 身份证件类型
      _this.centralizeData.landlordCertNumber = '' // 证件号码
      _this.centralizeData.landlordName = ''
      _this.centralizeData.landlordPhone = ''
      _this.centralizeData.sex = 'M'
      _this.centralizeData.zone = _this.unit[0].text // 片区
      _this.centralizeData.zoneId = _this.unit[0].id // 片区
      _this.centralizeData.blockName = '' // 小区
      _this.centralizeData.housePrice = '' // 价格
      _this.centralizeData.housePrice1 = '' // 价格
      _this.centralizeData.floor = 10 // 楼层
      _this.centralizeData.currentFloor1 = [] // 选择楼层
      _this.centralizeData.roomNumber = '' // 每层房间数量
      _this.centralizeData.memo = '' // 备注
      _this.centralizeData.unitNo = ''
      _this.centralizeData.buildingNo = ''
      _this.centralizeData.city = ''
      _this.centralizeData.province = ''
      _this.centralizeData.district = ''
      _this.centralizeData.blockId = ''
      _this.centralizeData.reqCommonCentralizeHouseSpaceBeanList = [] // 户型
      let list = {}
      list.name = ''
      list.bedroomNumber = '1'
      list.livingRoomNumber = '1'
      list.toiletNumber = '1'
      list.direction = 'EAST'
      list.houseSpaceManagerArea = ''
      list.houseSpaceManagerArea1 = ''
      list.roomNoList = []
      list.houseSpaceFeatureList = [] // 优势
      _this.centralizeData.reqCommonCentralizeHouseSpaceBeanList.push(list)
    },
    inputBlur (item, data) {
      let list = this.centralizeData.reqCommonCentralizeHouseSpaceBeanList
      for (var i = 0; i < (list.length - 1); i++) {
        if (i !== data) {
          if (item.bedroomNumber === list[i].bedroomNumber && item.livingRoomNumber === list[i].livingRoomNumber && item.toiletNumber === list[i].toiletNumber && item.direction === list[i].direction && item.houseSpaceManagerArea1 === list[i].houseSpaceManagerArea1) {
            this.$message({
              message: '房型重复',
              type: 'error'
            })
            this.houseRepeat = 1
          } else {
            this.houseRepeat = 0
          }
        }
      }
    },
    reduceHouseType (lists, index) { // 删除当前物品
      var arr = this.houseSpaceListing
      var arr2 = lists[index].roomNoList
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
          if (arr[i] === arr2[j]) {
            arr.splice(i, 1)
            i--
          }
        }
      }
      lists.splice(index, 1)
    },
    addHouse (data) {
      var _this = this
      var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
      let list1 = this.centralizeData.reqCommonCentralizeHouseSpaceBeanList
      for (var i = 0; i <= (list1.length - 1); i++) {
        for (var j = (list1.length - 1 - i); j >= 0; j--) {
          if (list1[j].bedroomNumber === list1[i].bedroomNumber && list1[j].livingRoomNumber === list1[i].livingRoomNumber && list1[j].toiletNumber === list1[i].toiletNumber && list1[j].direction === list1[i].direction && list1[j].houseSpaceManagerArea1 === list1[i].houseSpaceManagerArea1 && j !== i) {
            _this.$message({
              message: '房型重复',
              type: 'error'
            })
            _this.houseRepeat = 1
          } else if (!list1[j].houseSpaceManagerArea1 || !reg.test(list1[j].houseSpaceManagerArea1)) {
            _this.houseRepeat = 1
            _this.$message({
              message: '请检查房型面积是否填写或者填写是否有误',
              type: 'error'
            })
          } else {
            _this.houseRepeat = 0
            var list = []
            if (_this.centralizeData.currentFloor1 && _this.centralizeData.roomNumber) {
              _this.houseSpaceList = []
              // for (let i = 1; i <= this.centralizeData.floor; i++) {
              _this.centralizeData.currentFloor1 = _this.$options.methods.orderHouseList(_this.centralizeData.currentFloor1)
              for (let i in _this.centralizeData.currentFloor1) {
                let list1 = []
                for (let j = 1; j <= parseInt(_this.centralizeData.roomNumber); j++) {
                  let list2 = []
                  let str = ''
                  if (j < 10) {
                    str = _this.centralizeData.currentFloor1[i] + '0' + j
                  } else {
                    str = _this.centralizeData.currentFloor1[i] + '' + j
                  }
                  list2.push(str)
                  list1 = list1.concat(list2)
                }
                list.push(list1)
              }
              _this.houseSpaceList = list
              // console.log(_this.houseSpaceList)
              var arr = _this.houseSpaceList
              for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < arr[i].length; j++) {
                  for (let k = 0; k < _this.houseSpaceListing.length; k++) {
                    if (parseInt(arr[i][j]) === parseInt(_this.houseSpaceListing[k])) {
                      arr[i].splice(j, 1)
                      j--
                    }
                  }
                }
              }
              _this.chooseHouseTypeShow = true
              _this.houseSpaceIndex = data
            } else {
              _this.$message({
                message: '请输入正确的楼层及每层房间数',
                type: 'error'
              })
            }
          }
        }
      }
    },
    chooseHouseListTrue () {
      var leng = this.houseSpaceIndex
      this.centralizeData.reqCommonCentralizeHouseSpaceBeanList[leng].roomNoList = this.centralizeData.reqCommonCentralizeHouseSpaceBeanList[leng].roomNoList.concat(this.houseSpaceListChoose)
      let arr = []
      arr = this.houseSpaceListing
      this.houseSpaceListing = arr.concat(this.houseSpaceListChoose)
      // console.log(this.centralizeData)
      this.houseSpaceListChoose = []
      this.chooseHouseTypeShow = false
    },
    addFloor () {
      // this.centralizeData.currentFloor1 = []
      let len = this.centralizeData.currentFloor1
      for (var i = 0; i < len.length; i++) {
        if (this.centralizeData.floor < parseInt(len[i])) {
          len.splice(i, 1)
          i--
        }
      }
    },
    chooseFloor (e) { // 选择楼层
      let floor = this.centralizeData.currentFloor1
      let roomList = this.centralizeData.reqCommonCentralizeHouseSpaceBeanList
      if (e.toElement.className.indexOf('cur') < 0) {
        e.toElement.className = 'floor cur'
        floor.splice(floor.length, 0, e.toElement.innerText)
      } else {
        e.toElement.className = 'floor'
        for (var i in floor) {
          if (parseInt(floor[i]) === parseInt(e.toElement.innerText)) {
            for (let j = 0; j < roomList.length; j++) {
              for (let k = roomList[j].roomNoList.length - 1; k >= 0; k--) {
                // console.log('s----  ' + j + '/' + k + '   -----s')
                // console.log(roomList[j])
                // console.log(roomList[j].roomNoList[k])
                // console.log(roomList[j].roomNoList[k].toString().length - 2)
                if (parseInt(roomList[j].roomNoList[k].toString().substr(0, roomList[j].roomNoList[k].toString().length - 2)) === parseInt(floor[i])) {
                  // console.log(roomList[j].roomNoList[k])
                  roomList[j].roomNoList.splice(k, 1)
                }
              }
            }
            for (let k = this.houseSpaceListing.length - 1; k >= 0; k--) {
              // console.log('s----  ' + j + '/' + k + '   -----s')
              // console.log(roomList[j])
              // console.log(roomList[j].roomNoList[k])
              // console.log(roomList[j].roomNoList[k].toString().length - 2)
              if (parseInt(this.houseSpaceListing[k].toString().substr(0, this.houseSpaceListing[k].toString().length - 2)) === parseInt(floor[i])) {
                this.houseSpaceListing.splice(k, 1)
              }
            }
            floor.splice(i, 1)
          }
        }
      }
    },
    houseListSearch (_this, url, req) {
      req.registration = 'PRE'
      _this.$http.post(url, req).then(res => {
        if (res.body.code === 200) {
          if (res.body.data.totalCount > 10) {
            _this.houseRestaurants = res.body.data.list.splice(0, 10)
          } else {
            _this.houseRestaurants = res.body.data.list
          }
        } else {
          _this.houseRestaurants = []
        }
      })
    },
    changeRoomNumber (value) {
      let val = parseInt(value)
      let arr = []
      for (var i = 0; i < val; i++) {
        let list = {}
        list.bedroomType = 'MASTER'
        list.direction = 'EAST'
        list.houseSpaceArea = ''
        list.houseSpaceArea1 = ''
        list.rentalPrice = ''
        list.rentalPrice1 = ''
        list.houseSpaceFeatureList = []
        switch (i) {
          case 0:
            list.roomName = 'A'
            break
          case 1:
            list.roomName = 'B'
            break
          case 2:
            list.roomName = 'C'
            break
          case 3:
            list.roomName = 'D'
            break
          case 4:
            list.roomName = 'E'
            break
          case 5:
            list.roomName = 'F'
            break
          case 6:
            list.roomName = 'G'
            break
          case 7:
            list.roomName = 'H'
            break
          case 8:
            list.roomName = 'I'
            break
          case 9:
            list.roomName = 'J'
            break
          case 10:
            list.roomName = 'K'
            break
          case 11:
            list.roomName = 'L'
            break
          case 12:
            list.roomName = 'M'
            break
          case 13:
            list.roomName = 'N'
            break
          case 14:
            list.roomName = 'O'
            break
          case 15:
            list.roomName = 'P'
            break
        }
        arr.push(list)
      }
      this.addBean.reqBaseSaveHouseSpaceBeanList = arr
    },
    changeRoomNumber1 (value, _this) {
      let val = parseInt(value)
      let arr = []
      for (var i = 0; i < val; i++) {
        let list = {}
        list.bedroomType = 'MASTER'
        list.direction = 'EAST'
        list.houseSpaceArea = ''
        list.houseSpaceArea1 = ''
        list.rentalPrice = ''
        list.rentalPrice1 = ''
        switch (i) {
          case 0:
            list.roomName = 'A'
            break
          case 1:
            list.roomName = 'B'
            break
          case 2:
            list.roomName = 'C'
            break
          case 3:
            list.roomName = 'D'
            break
          case 4:
            list.roomName = 'E'
            break
          case 5:
            list.roomName = 'F'
            break
          case 6:
            list.roomName = 'G'
            break
        }
        arr.push(list)
      }
      _this.addBean.reqBaseSaveHouseSpaceBeanList = arr
    },
    getHouseList () { // 打开房间列表弹窗
      for (let i = 0; i < this.centralizeData.reqCommonCentralizeHouseSpaceBeanList.length; i++) {
        this.centralizeData.reqCommonCentralizeHouseSpaceBeanList[i].roomNoList = this.$options.methods.orderHouseList(this.centralizeData.reqCommonCentralizeHouseSpaceBeanList[i].roomNoList)
        // this.centralizeData.reqCommonCentralizeHouseSpaceBeanList[i] = this.$options.methods.tagHouseList(this.centralizeData.reqCommonCentralizeHouseSpaceBeanList[i])
      }
      this.chooseHouseListShow = true
      // console.log(this.centralizeData)
    },
    orderHouseList (list) {
      let lenhtn = list.length
      let lenhtm = lenhtn
      for (let i = 0; i < lenhtn; i++) {
        list[i] = parseInt(list[i])
      }
      for (let i = 0; i < lenhtn; i++) {
        lenhtm--
        for (let j = 0; j < lenhtm; j++) {
          if (list[j] > list[j + 1]) {
            let a = list[j]
            list[j] = list[j + 1]
            list[j + 1] = a
          }
        }
      }
      return list
    },
    // tagHouseList (req) {
    //   let length = req.roomNoList.length
    //   req.roomList = []
    //   for (let i = 0; i < length; i++) {
    //     let list = {}
    //     list.name = req.roomNoList[i]
    //     list.type = 'primary'
    //     req.roomList.push(list)
    //   }
    //   return req
    // },
    removeRoomList (index, list, tag) {
      // console.log(this.houseSpaceListing)
      this.$options.methods.orderHouseList(this.houseSpaceListing)
      this.removeHouseList.push(list[list.indexOf(tag)].name)
      this.centralizeData.reqCommonCentralizeHouseSpaceBeanList[index].roomNoList.splice(list.indexOf(tag), 1)
      this.houseSpaceListing.splice(this.houseSpaceListing.indexOf(tag), 1)
    },
    changeP (item) { // 改变省份
      let _this = this
      // console.log(111)
      this.$http.post(this.bankSearch, {'baseDataType': 'CITY_INFO', 'provinceId': item}).then(function (valueD) {
        _this.address.cLists = valueD.data.data
        _this.centralizeData.city = valueD.data.data[0].cityId
        this.centralizeData.district = ''
      })
    },
    changeC (item) { // 改变城市
      let _this = this
      this.$http.post(this.bankSearch, {'baseDataType': 'AREA_INFO', 'cityId': item}).then(function (valueD) {
        _this.address.dLists = valueD.data.data
        _this.centralizeData.district = valueD.data.data[0].areaId
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
  },
  components: {
    houseRescoure1, houseUser
  }
}
$('.el-dialog--small').width(650)
</script>
<style scoped>
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
.add{
  position:absolute; top:calc(50% - 22px); right:-10px;
  width: 16px;
  height: 36px;
  background: url('../../static/img/add.png') center center / 16px 16px;
  background-repeat: no-repeat;
  cursor: pointer;
  display: none;
}
.houseSpaceManagerTypeUl{
  border-top: 1px dotted #666;
  margin-bottom: 22px;
}
.houseSpaceManagerTypeLi{
  padding-top: 25px;
  position: relative;
  border-bottom: 1px dotted #666;

}
/*.houseSpaceManagerTypeLi:first-child{
  margin-top: 0;
}*/
.houseSpaceManagerTypeLi:last-child .add{
  display: block;
}
.reduce{
  position:absolute;
  top:calc(50% - 22px);
  right:-10px;
  width: 16px;
  height: 36px;
  background: url('../../static/img/reduce.png') center center / 16px 16px;
  background-repeat: no-repeat;
  cursor: pointer;
  display: block;
}
.houseSpaceManagerTypeLi:last-child .reduce{
  display: none;
}
.floor{
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 16px;
  background: #fff;
  color: #20a0ff;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
  border: 1px solid #20a0ff;
  transition: all .5s;
}
.floor.cur{
  background: #20a0ff;
  color: #fff;
}
.houseChoose li{
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}
.houseChoose li:last-child{
  border-width: 0;
}
.houseChoose li div{
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold
}
.houseChoose .roomList.el-checkbox+.el-checkbox, .houseChoose .roomList{
  margin-left: 0;
  margin-right: 25px;
  margin-bottom: 5px;
}
.roomNumberList{
  border-bottom: 1px solid #eee;
  padding-top: 22px;
}
.roomNumberList:first-child{
  border-top: 1px solid #eee;
}
.el-checkbox-group{
  width: 470px;
}
.el-checkbox+.el-checkbox, .el-checkbox-group label{
  margin-left: 0;
  margin-right: 15px;
}
</style>