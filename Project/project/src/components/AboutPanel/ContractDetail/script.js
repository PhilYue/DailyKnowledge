import LeaseDetail from '@/components/rent/LeaseDetail'
import { api } from '@/xhr'
import { contractStatus, signType } from '@/filters'

export default {
  props: {
    contractId: String,
  },

  data () {
    return {
      currentMenu: 'contract',

      leaseId: '',
      leaseShowing: false,
      info: {},
      created: false, // controls child component of transition
    }
  },

  components: {
    LeaseDetail,
  },

  computed: {
    findUser() {
      return (this.info.users && this.info.users.length)
        ? this.info.users.find(item => item.representative === 'PARTB') : []
    },
  },

  filters: {
    contractStatus,
    signType,
    poundage(val) {
      const dict = {
        SPAID: '有偿转租',
        SNOTPAID: '无偿转租',
        CPAID: '有偿换房',
        CNOTPAID: '无偿换房',
      }

      return dict[val]
    }
  },

  created() {
    this.loadData()
  },

  mounted() {
    // slideIn
    this.created = true
  },

  methods: {
    deletePeople(id) {
      api.followUser.destroy(id)
        .then(res => {
          if (res.data.code === 200) {
            this.$message.success('删除成功')
            this.loadData()
          } else {
            this.$message.error(res.data.message)
          }
        })
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
