<template>
  <div class="pay-info">
    <el-row class="pay-info-item" v-for="(item, index) in data" :key="index">
      <el-col :span="16">
        <el-tooltip
          v-if="item.payTime"
          class="item"
          effect="light"
          content="支付时间"
          placement="top"
        >
          <span class="_text">{{item.payTime}}</span>
        </el-tooltip>

        <el-tooltip
          v-else
          class="item"
          effect="light"
          content="创建时间"
          placement="top"
        >
          <span class="_text">{{item.payDurationStartTime | date}} - {{item.payDurationEndTime | date}}</span>
        </el-tooltip>
      </el-col>

      <el-col :span="8">
        <div class="_text">
          <nobr>{{item.financeType | financeType}} ￥{{item.amount / 1000}}</nobr>
        </div>
        
        <div class="_text">{{item.orderStatus | orderStatus}}</div>
      </el-col>
    </el-row>

    <div v-if="pagination.totalCount > pagination.pageSize" class="block">
      <el-pagination
        class="paging"
        small
        layout="prev, pager, next"
        :current-page.sync="pagination.pageNo"
        :page-size="pagination.pageSize"
        :total="pagination.totalCount"
        @current-change="loadData"
      />
    </div>

    <empty-block v-if="!data.length"/>
  </div>
</template>

<script>
  import moment from 'moment'
  import { orderStatus, financeType } from '@/filters'
  import { api } from '@/xhr'
  import EmptyBlock from '@/components/controls/EmptyBlock'

  export default {
    props: {
      context: Object,
    },

    components: {
      EmptyBlock
    },

    data() {
      return {
        data: [],
        pagination: {
          totalCount: null,
          pageNo: 1,
          pageSize: 10
        },

        contractId: null
      }
    },

    filters: {
      date(val) {
        return moment(val).format('YYYY/MM/YY')
      },
      orderStatus,
      financeType
    },

    created () {
      api.contract.list({houseSpaceId: this.context.houseSpaceId}).then(({data}) => {
        if (data.code === 200) {
          let activeContract = data.data.list.find(item => item.contractStatus === 'EFFECT')
          if (!activeContract) {
            this.$message.info('当前没有已生效的合同。')
            this.pagination.totalCount = 0
            return
          }
          
          this.contractId = activeContract.id
          this.loadData()
        } else {
          this.$message.error(`发生了一个错误，指向合同列表，${data.message}。`)
        }
      })

    },

    methods: {
      loadData() {
        let params = {
          houseId: this.context.houseSpaceId,
          pageNo: this.pagination.pageNo,
          pageSize: this.pagination.pageSize,
          contractId: this.contractId
        }
        
        api.pay.list(params)
          .then(res => {
            let { data } = res.data
            this.data = data.list

            this.pagination.totalCount = data.totalCount
            this.pagination.pageNo = data.pageNo
          })
      }
    }
  }

</script>

<style lang="scss" scoped>
  .pay-info-item {
    margin-bottom: 16px;

    ._text{
      font-size: 13px;
    }
  }
</style>
