<template>
  <h1> 登录页 </h1>
  <img
    :src="logoUrl"
    alt=""
  >
  <el-button>dd</el-button>
</template>

<script lang="ts" setup>
import { getLoginInfo } from '@/api/common'
// 代表加载的是一个类型
import type { ILoginInfo } from '@/api/types/common'
import { onMounted, ref } from '@vue/runtime-core'
const logoUrl = ref<ILoginInfo['login_logo']>()
const list = ref<ILoginInfo['slide']>([])
onMounted(() => {
  getLoginInfo().then(data => {
    console.log(data)
    list.value = data.slide
    logoUrl.value = data.login_logo
  })
})
</script>

<style lang="scss" scoped>

</style>
