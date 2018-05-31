import { api } from '@/xhr'
import { contractStatus, signType, date, contractType, direction } from '@/filters'

let Pair = {
  props: {
    label: String,
    value: [String, Number],
  },
  template: `<el-row>` +
    `<el-col :span="8" class="title">{{label}}</el-col>` +
    `<el-col :span="16">` +
      `<div class="content"><slot>{{value}}</slot></div>` +
    `</el-col>` +
    `</el-row>`,
}

export default {
  props: {
    contractId: String,
  },

  data () {
    return {
      currentMenu: 'contract',

      leaseId: '',
      info: {},
      created: false, // controls child component of transition
    }
  },

  components: {
    Pair
  },

  filters: {
    contractStatus,
    signType,
    date,
    contractType,
    direction
  },

  created() {
    this.loadData()
  },

  mounted() {
    // slideIn
    this.created = true
  },

  methods: {
    getHouseType() {
      return (this.info.bedroomNumber ? `${this.info.bedroomNumber}室` : '') +
        (this.info.livingRoomNumber ? `${this.info.livingRoomNumber}厅` : '') +
        (this.info.kitchNumber ? `${this.info.kitchNumber}厨` : '') +
        (this.info.toiletNumber ? `${this.info.toiletNumber}卫` : '') || '暂无信息'
    },

    loadData() {
      api.contract.retrieve(this.contractId).then(res => {
        if (res.data.code === 200) {
          this.info = res.data.data
        } else {
          this.$message.error(res.data.message)
        }
      })
    },

    handleClick() {
      this.created = false

      const slideOut = () => {
        const animationDuration = 500
        setTimeout(() => {
          this.$emit('close')
        }, animationDuration)
      }

      slideOut()
    },

    // 点击旧租约标签加载旧租约
    select(index, indexPath) {
      if (index === 'lease') {
        this.leaseShowing = true
      }
    },
  },
}
