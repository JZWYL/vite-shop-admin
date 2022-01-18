<template>
  <h1> hone页 </h1>
</template>

<script lang="ts" setup>
import { useStore } from '../../store'
const store = useStore()
console.log(store.state.count)
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
  h1 {
    color: $color;
  }
</style>
