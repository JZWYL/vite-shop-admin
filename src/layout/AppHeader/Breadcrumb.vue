<template>
  <div>
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item
        v-for="item in routes"
        :key="item.path"
      >
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'
import { computed } from 'vue'
const router = useRouter()

console.log(router.currentRoute.value.matched)
const routes = computed(() => {
  return router.currentRoute.value.matched.filter(item => item.meta.title)
})
console.log(routes)
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  height: 20px;
  line-height: 20px;
}
</style>
