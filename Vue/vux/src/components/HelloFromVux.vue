<template>
  <div>
    <div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png">
      <h1> </h1>
    </div>
    <group title="cell demo">
      <cell title="VUX" value="cool" is-link></cell>
      <x-switch title="我是1啊啊"></x-switch>
    </group>
  </div>
</template>

<script>
import { Group, Cell, XSwitch } from 'vux'

export default {
  components: {
    Group,
    Cell,
    XSwitch
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!'
    }
  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 120px;
  height: 120px
}
</style>
