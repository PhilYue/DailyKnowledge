新增房东合同

<template>
  <div class="trustshipAdd">
    <el-tabs v-model="houseType" type="card">
      <el-tab-pane label="分散式合同" name="DISTRIBUTE">

        <el-form :model="form" :inline="true" style="width:650px; margin:0 auto;">
          <template>
            <el-form-item label="房东姓名" :label-width="formLabelWidth" class="is-required">
              <el-autocomplete class="inline-input" v-model="houseForm.landlordName" :fetch-suggestions="userQuerySearch" :trigger-on-focus="false"
                @select="setHouseFormLandlord" />
            </el-form-item>

            <el-form-item label="房东联系方式" prop="landlordPhone" :label-width="formLabelWidth">
              <el-input v-model="houseForm.landlordPhone" auto-complete="off" @blur="userCheck"></el-input>
            </el-form-item>

            <el-form-item label="房东证件" :label-width="formLabelWidth" class="is-required">
              <el-select v-model="houseForm.landlordCertType" style="width:169px">
                <el-option label="身份证" value="ID"></el-option>
                <el-option label="护照" value="P"></el-option>
                <el-option label="驾驶执照" value="DL"></el-option>
                <el-option label="工商营业执照" value="BL"></el-option>
                <el-option label="港澳通行证" value="HK"></el-option>
                <el-option label="台湾通行证" value="TW"></el-option>
              </el-select>

              <el-input v-model.number="houseForm.landlordCertNumber" auto-complete="off" style="width:300px" :minlength="15" :maxlength="18"
                @blur="userCheck" />
            </el-form-item>
            <el-form-item label="收款银行" :label-width="formLabelWidth">
              <el-select v-model="delegateContractForm.bankName" style="width:169px;" @change="backChange">
                <el-option :label="bank.bankName" :value="bank.bankName" :key="bank.bankName" v-for="bank in bankList"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开户支行" :label-width="formLabelWidth" class="is-required">
              <el-autocomplete class="inline-input" v-model="delegateContractForm.bankOfAccounts" :fetch-suggestions="bankQuerySearch"
                placeholder="" :trigger-on-focus="false" />
            </el-form-item>
            <el-form-item label="收款账号" :label-width="formLabelWidth" class="is-required">
              <el-input v-model="delegateContractForm.bankAccount" auto-complete="off" placeholder="" style=""></el-input>
            </el-form-item>
            <el-form-item label="收款人姓名" :label-width="formLabelWidth" class="is-required">
              <el-input v-model="delegateContractForm.payeeName" auto-complete="off" placeholder=""></el-input>
            </el-form-item>
          </template>

          <divider/>

          <template>

            <div>
              <el-form-item label="地址" :label-width="formLabelWidth" required>
                <el-autocomplete class="inline-input" v-model="blockForm.blockName" :fetch-suggestions="querySearch1" placeholder="" @select="setBlockFormByBlock"
                />
              </el-form-item>
              <el-form-item>
                <el-input v-model="houseForm.buildingNo" auto-complete="off" style="width:70px; margin-right:5px;"></el-input>栋
              </el-form-item>
              <el-form-item>
                <el-input v-model="houseForm.unitNo" auto-complete="off" style="width:70px; margin-right:5px; margin-left: 5px;"></el-input>单元
              </el-form-item>
              <el-form-item prop="roomNo">
                <el-input v-model="houseForm.roomNo" auto-complete="off" style="width:70px; margin-right:5px; margin-left: 5px;"></el-input>号
              </el-form-item>
            </div>



            <div>
              <el-form-item label="户型" :label-width="formLabelWidth">
                <el-select v-model.number="houseForm.bedroomNumber" style="width:115px">
                  <el-option v-for="(o, key) in max.bedroomNumber" :key="key" :label="`${o}室`" :value="o" />
                </el-select>
                <el-select v-model.number="houseForm.livingRoomNumber" style="width:115px">
                  <el-option v-for="(o, key) in max.livingRoomNumber" :key="key" :label="`${o}厅`" :value="o" />
                </el-select>
                <el-select v-model.number="houseForm.kitchenNumber" style="width:115px">
                  <el-option v-for="(o, key) in max.livingRoomNumber" :key="key" :label="`${o}厨`" :value="o" />
                </el-select>
                <el-select v-model.number="houseForm.toiletNumber" style="width:115px">
                  <el-option v-for="(o, key) in max.bedroomNumber" :key="key" :label="`${o}卫`" :value="o" />
                </el-select>
              </el-form-item>

              <el-form-item label="片区" :label-width="formLabelWidth">
                <el-cascader v-model="houseForm.zoneId" :options="options.zoneId" @change="setHouseFormZone" :props="{
                  label: 'text',
                  value: 'id',
                  children: 'children'
                }" :show-all-levels="false" style="width:169px;" />
              </el-form-item>

              <el-form-item label="装修类型" label-width="120px">
                <el-select v-model="houseForm.decorateType" style="width: 169px;">
                  <el-option label="毛坯房" value="R"></el-option>
                  <el-option label="简装" value="S"></el-option>
                  <el-option label="精装修" value="RD"></el-option>
                  <el-option label="豪华装修" value="A"></el-option>
                </el-select>
              </el-form-item>
            </div>

            <el-form-item label="总楼高" label-width="120px" required>
              <el-select v-model="houseForm.floorHeight" style="width: 169px;">
                <el-option v-for="(o, key) in max.floorHeight" :key="key" :label="o" :value="o" />
              </el-select>
            </el-form-item>

            <el-form-item label="房源性质" label-width="120px">
              <el-radio class="radio" v-model="houseForm.originalRentType" label="JOINT_RENT">合租</el-radio>
              <el-radio class="radio" v-model="houseForm.originalRentType" label="ENTIRE_RENT">整租</el-radio>
            </el-form-item>

            <el-form-item label="房源面积" :label-width="formLabelWidth" required>
              <el-input v-model="houseForm.houseSpaceManagerArea" auto-complete="off"></el-input>
              <p class="houseSizeP">㎡</p>
            </el-form-item>

            <el-form-item label="购买保险" label-width="120px">
              <el-radio class="radio" v-model="houseForm.insuranceStatus" label="YES">是</el-radio>
              <el-radio class="radio" v-model="houseForm.insuranceStatus" label="NO">否</el-radio>
            </el-form-item>

            <el-form-item label="所在楼层" label-width="120px" required>
              <el-select v-model="houseForm.currentFloor" style="width: 169px;">
                <el-option v-for="(o, key) in max.currentFloor" :key="key" :label="o" :value="o" />
              </el-select>
            </el-form-item>

            <div>
              <el-form-item label="房屋证件类型" label-width="120px" required>
                <el-select v-model="houseForm.houseOwnershipCertificateType" style="width: 169px;">
                  <el-option label="房屋所有权证书" value="OFFICIAL"></el-option>
                  <el-option label="预售证书" value="PRE_SELL"></el-option>
                  <el-option label="抽签通知证书" value="DRAW_NOTIFY"></el-option>
                  <el-option label="其他" value="OTHER"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="房屋证件号" label-width="120px" required>
                <el-input v-model="houseForm.houseOwnershipCertificateNumber" auto-complete="off"></el-input>
              </el-form-item>
            </div>

          </template>

          <divider/>

          <template>

            <el-form-item label="托管开始时间" :label-width="formLabelWidth" class="is-required">
              <el-date-picker type="date" placeholder="" v-model="delegateContractForm.startTime" style="width: 169px;" @change="chooseEndTime2"></el-date-picker>
            </el-form-item>
            <el-form-item label="合同时长" :label-width="formLabelWidth" class="is-required">
              <el-select v-model="delegateContractForm.year" style="width:46px;" @change="chooseEndTime2" class="displaySelect">
                <el-option v-for="(o, key) in max.year" :key="key" :label="parseInt(o) - 1" :value="parseInt(o) - 1" />
              </el-select>
              <p style="width:13px; text-align:left; display: inline-block; margin-left: -3px;">年</p>
              <el-select v-model="delegateContractForm.month" style="width:46px;" @change="chooseEndTime2" class="displaySelect">
                <el-option v-for="(o, key) in max.month" :key="key" :label="parseInt(o) - 1" :value="parseInt(o) - 1" />
              </el-select>
              <p style="width:13px; text-align:center; display: inline-block; margin-left: -3px;">月</p>
              <el-select v-model="delegateContractForm.day" style="width:46px;" @change="chooseEndTime2" class="displaySelect">
                <el-option v-for="(o, key) in max.day" :key="key" :label="parseInt(o) - 1" :value="parseInt(o) - 1" />
              </el-select>

              <p style="width:14px; text-align:center; display: inline-block; margin-left: -3px;">日</p>
            </el-form-item>

            <el-form-item label="托管结束时间" :label-width="formLabelWidth" class="is-required">
              <el-date-picker type="date" placeholder="" v-model="delegateContractForm.endTime" style="width: 169px;" :disabled="true"></el-date-picker>
            </el-form-item>

            <div>
              <el-form-item label="免租方式" :label-width="formLabelWidth">
                <el-select v-model="delegateContractForm.freeStyle" style="width:169px;">
                  <el-option label="无" value="0"></el-option>
                  <el-option label="一次性免租" value="1"></el-option>
                  <el-option label="周期性免租" value="2"></el-option>
                </el-select>
              </el-form-item>

              <template v-if="delegateContractForm.freeStyle !== '0'">
                <el-form-item label="免租时长" :label-width="formLabelWidth">
                  <el-select v-model="delegateContractForm.freeMonth" style="width:75px;" class="displaySelect">
                    <el-option v-for="(o, key) in max.freeMonth" :key="key" :label="parseInt(o) - 1" :value="parseInt(o) - 1" />
                  </el-select>
                  <span style="width:13px; text-align:center; display: inline-block; margin-left: -3px;">月</span>

                </el-form-item>

                <el-form-item>
                  <el-select v-model="delegateContractForm.freeDay" style="width:75px;" class="displaySelect">
                    <el-option v-for="(o, key) in max.freeDay" :key="key" :label="parseInt(o) - 1" :value="parseInt(o) - 1" />
                  </el-select>
                  <span style="width:12px; text-align:center; display: inline-block; margin-left: -3px;">日</span>
                </el-form-item>
              </template>
            </div>

            <div>
              <el-form-item label="空置期" :label-width="formLabelWidth">
                <el-select v-model="delegateContractForm.decorationStyle" style="width:169px;">
                  <el-option label="无" value="0"></el-option>
                  <el-option label="有" value="1"></el-option>
                </el-select>
              </el-form-item>

              <template v-if="delegateContractForm.decorationStyle !== '0'">
                <el-form-item label="空置时长" :label-width="formLabelWidth">
                  <el-select v-model="delegateContractForm.decorationMonth" style="width:75px;" class="displaySelect">
                    <el-option v-for="(o, key) in max.decorationMonth" :key="key" :label="parseInt(o) - 1" :value="parseInt(o) - 1" />
                  </el-select>
                  <span style="width:13px; text-align:center; display: inline-block; margin-left: -3px;">月</span>
                </el-form-item>

                <el-form-item>
                  <el-select v-model="delegateContractForm.decorationDay" style="width:75px;" class="displaySelect">
                    <el-option v-for="(o, key) in max.decorationDay" :key="key" :label="parseInt(o) - 1" :value="parseInt(o) - 1" />
                  </el-select>
                  <span style="width:12px; text-align:center; display: inline-block; margin-left: -3px;">日</span>
                </el-form-item>
              </template>
            </div>

            <el-form-item label="收房价格" :label-width="formLabelWidth" class="is-required">
              <el-input v-model.number="houseForm.housePrice" auto-complete="off" placeholder="" @change="changeRental"></el-input>
              <p class="houseSizeP">元/月</p>
            </el-form-item>
            <el-form-item label="押金" :label-width="formLabelWidth" class="is-required">
              <el-input v-model="delegateContractForm.deposit1" auto-complete="off" placeholder="" style=""></el-input>
              <p class="houseSizeP">元</p>
            </el-form-item>

            <!--  <el-form-item label="违约金" :label-width="formLabelWidth" class="is-required">
                <el-input v-model="delegateContractForm.penalty1" auto-complete="off" placeholder="" style=""></el-input>
                <p class="houseSizeP">元</p>
            </el-form-item> -->
            <el-form-item label="付款周期" :label-width="formLabelWidth">
              <el-select v-model="delegateContractForm.payCycle" placeholder="请选择" style="width:169px;">
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
                <el-select v-model="delegateContractForm.addType" placeholder="" style="width:169px;" @change="openAddType">
                  <el-option label="无" value="NOTRISE"></el-option>
                  <el-option label="按金额递增" value="RISEBYAMOUNT"></el-option>
                  <el-option label="按百分比递增" value="RISEBYPER"></el-option>
                  <el-option label="不规则递增" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="按金额递增" v-if="delegateContractForm.addType == 'RISEBYAMOUNT'" :label-width="formLabelWidth">
                <el-input v-model="delegateContractForm.addAmount1" auto-complete="off" placeholder=""></el-input>
                <p class="houseSizeP">元/月</p>
              </el-form-item>
              <el-form-item label="按百分比递增" v-if="delegateContractForm.addType == 'RISEBYPER'" :label-width="formLabelWidth">
                <el-input v-model="delegateContractForm.addPer1" auto-complete="off" placeholder=""></el-input>
                <p class="houseSizeP">%</p>
              </el-form-item>
              <el-form-item label="租金递增周期" :label-width="formLabelWidth" v-if="delegateContractForm.addType == 'RISEBYAMOUNT' || delegateContractForm.addType == 'RISEBYPER'">
                <el-select v-model="delegateContractForm.addCycle" placeholder="" style="width:169px;">
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
              <el-input v-model="delegateContractForm.waterMeterNumber1" auto-complete="off" placeholder="" style=""></el-input>
            </el-form-item>
            <el-form-item label="电底数" class="is-required" :label-width="formLabelWidth">
              <el-input v-model="delegateContractForm.electricMeterNumber1" auto-complete="off" placeholder="" style=""></el-input>
            </el-form-item>
            <el-form-item label="天然气底数" class="is-required" :label-width="formLabelWidth">
              <el-input v-model="delegateContractForm.gasMeterNumber1" auto-complete="off" placeholder="" style=""></el-input>
            </el-form-item> -->

            <el-form-item label="授权代表" :label-width="formLabelWidth" class="is-required">
              <el-cascader v-model="delegateContractForm.housekeeper" placeholder="授权代表" :options="options.housekeeper" @change="changeHouseKeeper"
                :props="{
                label: 'label',
                value: 'label',
                children: 'cities'
              }" :show-all-levels="false" style="width:169px;" />
            </el-form-item>

            <el-form-item label="备注" :label-width="formLabelWidth">
              <el-input type="textarea" placeholder="" v-model="delegateContractForm.memo" style="width:470px;"></el-input>
            </el-form-item>

          </template>
        </el-form>


        <div class="dialog-footer">
          <el-button @click="closeForm()">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
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
                <tr v-for="(item, index) in addWay" :key="index">
                  <td>
                    <el-date-picker v-model="item.time" type="date" size="mini" class="date" :readonly="readonly" :style="width">
                    </el-date-picker> -
                    <el-date-picker v-model="item.endTime" type="date" size="mini" class="date" :readonly="readonly" :style="width">
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
                <el-select v-model="blockForm.province" style="width:145px" placeholder="选择省份" @change="changeP">
                  <el-option v-for="list in address.pLists" :key="list.province" :label="list.province" :value="list.provinceId"></el-option>
                </el-select>
                <el-select v-model="blockForm.city" style="width:145px" placeholder="选择城市" @change="changeC">
                  <el-option v-for="list in address.cLists" :key="list.city" :label="list.city" :value="list.cityId"></el-option>
                </el-select>
                <el-select v-model="blockForm.district" style="width:145px" placeholder="选择区县">
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
      </el-tab-pane>

      <el-tab-pane label="集中式合同" name="CENTRALIZE">
        <focus-contract></focus-contract>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script src="./script.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
