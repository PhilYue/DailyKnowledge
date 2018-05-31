空数据控件

<template>
  <h3 class="empty-block"><slot>暂无信息</slot></h3>  
</template>

<script>
export default {}
</script>

<style>
.empty-block {
  border-bottom: 1px solid #e3e3e3;
  padding: 10px 0 5px;
  margin-top: 5px;
  margin-bottom: 10px;
  text-align: center
}
</style>
