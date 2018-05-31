<template>
  <div>
    <el-row class="contract-info-item" v-for="(contract, index) in data" :key="index">
      <el-col :span="10">
        <div>
          <p>
            <span class="_text">{{contract.contractNumber}}</span>
          </p>
        </div>
      </el-col>
      <el-col :span="14" class="textAlignRight">
        <div>
          <el-tooltip class="item" effect="light" content="合同时间" placement="top">
            <p>
              <span class="_text">{{contract.startTime | date}} - {{contract.endTime | date}}</span>
            </p>
          </el-tooltip>
        </div>
      </el-col>
      <el-col :span="10">
        <div>
          <p>
            <span class="_text">{{contract.contractType | contractType}}({{contract.contractStatus | contractStatus}})</span>
          </p>
        </div>
      </el-col>
      <el-col :span="14" class="textAlignRight">
        <div>
          <el-button type="primary" @click="handleClick(contract)">查看合同</el-button>
        </div>
      </el-col>
    </el-row>

    <div v-if="pagination.totalSize > pagination.pageSize" class="block">
      <el-pagination
        small
        class="paging"
        layout="prev, pager, next"
        :current-page.sync="pagination.pageNo"
        :page-size="pagination.pageSize"
        :total="pagination.totalSize"
        @current-change="loadData"
      />
    </div>

    <h3 v-if="pagination.totalSize === 0" class="_help-text">暂无信息</h3>

    <!-- Child component region -->
    <contract-detail
      v-if="childShowing"
      :contractId="currentItem.id"
      @close="closeItemDetail"
    />
  </div>
</template>

<script>
  import moment from 'moment'
  import { contractStatus, contractType } from '@/filters'
  import ContractDetail from './ContractDetail'
  import { api } from '@/xhr'

  export default {
    props: {
      context: Object,
    },

    data() {
      return {
        data: [],
        pagination: {
          totalCount: null,
          pageNo: 1,
          pageSize: 10
        },

        currentItem: {},
        childShowing: false,
      }
    },

    components: {
      ContractDetail
    },

    filters: {
      date(val) {
        return moment(val).format('YYYY/MM/YY')
      },
      contractStatus,
      contractType
    },

    created () {
      this.loadData()
    },

    methods: {
      loadData() {
        api.contract.list({houseSpaceId: this.context.houseSpaceId})
          .then(res => {
            let { data } = res.data
            this.data = data.list

            this.pagination.totalCount = data.totalCount
            this.pagination.pageNo = data.pageNo
          })
      },

      handleClick(contract) {
        this.currentItem = contract
        this.childShowing = true
      },

      closeItemDetail() {
        this.childShowing = false
      }
    }
  }

</script>

<style lang="scss" scoped>
  .contract-info-item {
    padding: 10px 0;
    border-bottom: 1px solid #e3e3e3;

    &:last-child {
      border-bottom: none;
    }

    ._text {
      line-height: 24px;
      font-size: 13px;
      padding: 10px 0;
    }

    ._help-text {
      border-bottom: 1px solid #e3e3e3;
      padding: 10px 0 5px;
      margin-top: 5px;
      margin-bottom: 10px;
    }

    .el-button {
      padding: 6px 5px;
      font-size: 12px;
    }

    .el-button--primary{
      background-color: #fff;
      color: #20a0ff;
    }
    .el-button--primary:hover{
      background-color: #20a0ff;
      color: #fff;
    }
    .textAlignRight{
      text-align: right;
    }
  }
</style>
