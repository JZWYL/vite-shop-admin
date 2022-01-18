<template>
  <el-input
    v-model="searchKey"
    class="w-50 m-2"
    placeholder="请输入内容"
    :prefix-icon="Search"
  />
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'

const searchKey = ref('')
</script>

<style lang="scss" scoped>

</style>
