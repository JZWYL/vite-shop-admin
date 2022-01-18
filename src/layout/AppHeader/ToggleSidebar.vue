<template>
  <el-icon @click="handleCollapse">
    <Fold v-if="!collapseIcon" />
    <Expand v-if="collapseIcon" />
  </el-icon>
</template>

<script lang="ts" setup>
import {
  Fold,
  Expand
} from '@element-plus/icons-vue'
import { useStore } from '@/store'
import { computed } from 'vue'

const store = useStore()

const collapseIcon = computed(() => {
  return store.state.isCollapse
})

const handleCollapse = () => {
  store.commit('setIsCollapse', !store.state.isCollapse)
}
</script>

<style lang="scss" scoped>

</style>
