import urljoin from 'urljoin'
import { urlList } from '@/xhr'
import {getUid, getUserPhone} from './utils'
import moment from 'moment'

export default {
  data () {
    return {
      urlList
    }
  },

  methods: {
    urljoin,
    getUid,
    getUserPhone,
    moment
  }
}
