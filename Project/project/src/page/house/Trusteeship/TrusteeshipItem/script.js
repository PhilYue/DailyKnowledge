import $ from 'jquery'
import Upload from '@/components/common/Upload'
import TrusteeshipDetail from './TrusteeshipDetail'
import {contractStatus, date} from '@/filters'

export default {
  props: {
    context: Object
  },

  components: {
    Upload,
    TrusteeshipDetail
  },

  data() {
    return {
      contractDetailShowing: false,
    }
  },

  filters: {
    contractStatus,
    date
  },

  methods: {
    showDetail(item) {
      this.contractDetailShowing = true
    },

    openUploac({id}) {
      this.$emit('openUploac', id)
    },

    depositSure(data) {
      let params = {
        userPhone: parseInt(this.getUserPhone()),
        userId: this.getUid(),
        contractId: data.id,
        houseSpaceManagerId: data.houseSpaceManagerId,
      }
      this.$http.post(this.urljoin(this.urlList.contract, 'updateByParStatus'), params).then(({
        data
      }) => {
        if (data.code === 200) {
          this.$emit('depositSure', 1)
        } else if (data.code === 10029) {
          this.$emit('depositSure', 2)
        } else {
          this.$emit('depositSure', 3)
        }
      })
    },
  }
}

$('.el-dialog--small,.el-dialog--tiny').width(650)
