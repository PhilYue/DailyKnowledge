<template>
	<div class='search'>
      <div class='main-right-search-span'>
        <ul>
          <li v-for='(rent, ind) in seachData' class="searchList">
            <p :value="rent.value">{{ rent.head }}</p>
            <a v-for='(item, index) in rent.content' :title='item.text' :class='{selectActive: index ==0}' :value="item.value">{{item.text}}</a>
          </li>
        </ul>
      </div>
        <el-input v-model="state1" :placeholder="place" auto-complete="off" style="width:300px"></el-input>
      <el-button type='primary' @click="search()">搜索</el-button>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  name: 'detail',
  data: function () {
    return {
      restaurants: [],
      state1: '',
      state2: '',
      value8: ''
    }
  },
  props: ['seachData', 'activeName', 'place'],
  methods: {
    handleSelect (item) {
      // console.log(item)
    },
    selected: function (index, data) {
      var el = $('.search .main-right-search-span li').eq(index).find('a').eq(data)
      if (!el.hasClass('selectActive')) {
        el.addClass('selectActive').siblings().removeClass('selectActive')
      }
    },
    search: function () {
      this.$emit('search', true)
    }
  }
}
$(document).on('click', '.searchList a', function () {
  if (!$(this).hasClass('selectActive')) {
    $(this).addClass('selectActive').siblings('a').removeClass('selectActive')
  }
})
</script>
<style scoped>
/* 主内容区 */
.search input[type=text]{
  min-width:300px;
}
</style>

