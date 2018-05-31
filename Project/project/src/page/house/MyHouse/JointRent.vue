合租Tab

<template>
  <div>
  <div class='search f-cb' style="margin-bottom:0;">
    <div class='main-right-search-span mySelf'>
      <ul>
        <tag-pinner :context="navContext" @change="handleChange" />

        <div style="position: relative; width: calc((100vw - 60px) * 0.91 - 60px); margin-top:10px;">
          <area-select @select="handleSelect"/>
        </div>
      </ul>
    </div>

    <div class='main-left-search-span'>
      <el-input
        placeholder="请输入房源地址"
        auto-complete="off"
        style="width:300px"
        v-model="kw"
        @keyup.enter.native="loadData"
      />
      <el-button type='primary' @click="loadData">搜索</el-button>
    </div>

  </div>

  <template>
    <house
      v-for="(house, key) in data"
      :key="key"
      :context="house"
      @update="loadAll"
    />

    <el-pagination
      v-if="this.data.length > 0"
      class="paging"
      style="text-align:right;"
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[10, 20, 30, 40]"
      v-bind="pagination"
      @size-change="pagination.sizeChangeHandler"
      @current-change="pagination.currentChangeHandler"
    />

    <h3
      v-if="this.data.length === 0 && loaded"
      style="text-align:center; margin-top:50px;">暂无数据</h3>
  </template>

</div>
</template>

<script>
  import House from '@/components/House/'
  import AreaSelect from './components/AreaSelect' // 公共片区筛选组件

  import TagPinner from './components/TagPinner'
  import { api } from '@/xhr'

  // 合租类型
  const originalRentType = 'JOINT_RENT'

  export default {
    components: {
      House,
      AreaSelect,
      TagPinner
    },
    data: function () {
      return {
        data: [],

        currentTag: undefined,

        kw: '',

        pagination: {
          currentPage: 1,
          pageSize: 10,
          total: 0,

          sizeChangeHandler: (pageSize) => {
            this.pagination.pageSize = pageSize
            this.handleChange(this.currentTag)
          },
          currentChangeHandler: (currentPage) => {
            this.pagination.currentPage = currentPage
            this.handleChange(this.currentTag)
          }
        },

        loaded: false,

        navContext: {},

        zoneId: null
      }
    },

    created() {
      this.loadAll()
    },

    methods: {
      loadAll() {
        this.loadData()
        this.loadNavContext()
      },
      
      handleSelect(id) {
        this.zoneId = id
        this.loadAll()
      },
      
      loadNavContext() {
        const url = this.urljoin(this.urlList.house, 'count/OtherStatus')
        let params = {
          houseSpaceManagerType: 'HOUSE',
          houseSpaceProcess: 'RENTABLE_PROCESS',
          propertyType: 'D',
          originalRentType,
          loginId: this.getUid(),
          zoneId: this.zoneId,
        }
        this.$http.post(url, params).then(({body}) => {
          if (body.code === 200) {
            this.navContext = body.data
          } else {
            this.$message.error(body.message)
          }
        })
      },
      
      handleChange(id) {
        this.currentTag = id
        this.loadData()
      },

      loadData() {
        // 合租
        const pagination = {
          pageNo: this.pagination.currentPage,
          pageSize: this.pagination.pageSize,
        }

        let queryParams = {
          loginId: this.getUid(),
          originalRentType,
          otherHouseSpaceStatus: this.currentTag,
          houseSpaceProcess: 'RENTABLE_PROCESS',
          propertyType: 'D',
          isLoginId: true,
          zoneId: this.zoneId,
          keywordAddress: this.kw,

          ...pagination,
        }

        api.house.list(queryParams).then(res => {
          this.loaded = true
          let data = res.data

          if (data.code === 200) {

            this.pagination.total = data.data.totalCount

            this.data = res.data.data.list
          } else {
            // silent
            // this.$message.error(data.message)
            this.data = []
          }
        })
      },

    },
  }
</script>
