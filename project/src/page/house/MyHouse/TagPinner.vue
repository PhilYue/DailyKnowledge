<style>
  @import '../../../../static/css/app.css';

</style>

<template>
  <div style="display:inline-block; margin-top:5px;" class="houseStatus">
    <simple-tag
      :current-id="currentId"
      text="全部"
      :number="context.allNumber"
      @click="handleClick"
    />

    <simple-tag
      :current-id="currentId"
      id="RENTABLE"
      text="空置"
      :number="context.rentableNumber"
      @click="handleClick"
    />

    <combo-tag
      :current-id="currentId" @click="handleClick"
    >
      <child-tag id="LOCKING" text="锁定中" :number="context.lockingNumber" @click="handleClick"/>
      <child-tag id="RESERVED" text="已预订" :number="context.reservedNumber" @click="handleClick"/>
      <child-tag id="SIGNING_LC" text="签订合同中" :number="context.signingLeaseContractNumber" @click="handleClick"/>
      <child-tag id="LC_NOT_TE" text="合同未生效" :number="context.leaseContractNotTakeEffectNumber" @click="handleClick"/>
    </combo-tag>
    
    <combo-tag
      :current-id="currentId" @click="handleClick"
    >
      <child-tag id="RENTED" text="已出租" :number="context.rentedNumber" @click="handleClick"/>
      <child-tag id="OVERDUE_CHECK_OUT" text="逾期退房" :number="context.overdueCheckOutNumber" @click="handleClick"/>
      <child-tag id="EXPIRED_NEXT_HALF_MONTH" text="半月到期" :number="context.expiredNextHalfMonthNumber" @click="handleClick"/>
      <child-tag id="EXPIRED_THIS_MONTH" text="本月到期" :number="context.expiredThisMonthNumber" @click="handleClick"/>
      <child-tag id="EXPIRED_NEXT_MONTH" text="次月到期" :number="context.expiredNextMonthNumber" @click="handleClick"/>
    </combo-tag>
    
    <simple-tag
      :current-id="currentId"
      id="FREEZING"
      text="已冻结"
      :number="context.freezingNumber"
      @click="handleClick"
    />
  </div>
</template>

<script>
  let SimpleTag = {
    template: `<a class="newStatus" :class="{cur: isActive}" @click="handleClick">
      <p>{{text}}({{number}})</p>
    </a>`,

    props: {
      id: String,
      number: Number,
      text: String,
      active: {
        type: Boolean,
        default: false
      },
      currentId: String,
    },

    computed: {
      isActive() {
        if (this.active) {
          return true
        } else {
          return this.currentId === this.id
        }
      }
    },

    methods: {
      handleClick() {
        this.$emit('click', this.id)
      }
    }
  }

  let ComboTag = {
    template: `<a style="padding-right: 10px;" @click="handleClick">
      <p class="newStatus" :class="{cur: isActive}" :id="context.id">{{context.text}}({{context.number}})</p>
      <i class="p-drow"></i>
      <ul class="p-select">
        <slot></slot>
      </ul>
    </a>`,

    props: {
      currentId: String,
    },

    computed: {
      isActive() {
        if (!this.context || !('id' in this.context)) {
          return false
        } else {
          return this.currentId === this.context.id
        }
      },
    },

    data() {
      return {
        context: {},
      }
    },

    created() {
      this.$on('change', obj => {
        this.context = obj
      })

      this.$on('childrenRecieveData', this.initValues)
    },

    mounted() {
      this.initValues()
    },

    methods: {
      handleClick() {
        this.$emit('click', this.context.id)
      },

      initValues() {
        // Read data from first child.
        const firstComp = this.$children[0]
        if (firstComp) {
          this.context = {
            id: firstComp.id,
            text: firstComp.text,
            number: firstComp.number,
          }
        }
      }
    }
  }

  let ChildTag = {
    template: `<li class="newStatus" :class="{cur: isActive}" :id="id"
      @click.stop="handleClick">{{text}}({{number}})</li>`,

    props: {
      id: String,
      number: Number,
      text: String,
      active: {
        type: Boolean,
        default: false
      },
    },

    computed: {
      isActive() {
        if (this.active) {
          return true
        } else {
          return this.currentId === this.id
        }
      },
      currentId() {
        if (this.$parent) {
          return this.$parent.currentId
        } else {
          return undefined
        }
      }
    },

    methods: {
      handleClick() {
        this.$emit('click', this.id)
        this.$parent.$emit('change', {
          id: this.id,
          text: this.text,
          number: this.number
        })
      }
    },

    watch: {
      number(val, oldVal) {
        if (val) {
          this.$parent.$emit('childrenRecieveData')
        }
      }
    }
  }

  export default {
    props: {
      context: Object,
    },

    components: {
      SimpleTag,
      ComboTag,
      ChildTag,
    },

    data() {
      return {
        currentId: null,
      }
    },

    methods: {
      handleClick(id) {
        this.currentId = id
        // console.log(id)
        this.$emit('change', id)
      }
    }
  }
</script>
