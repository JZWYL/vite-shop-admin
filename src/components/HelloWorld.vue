<template>
  <h1> HelloWorld</h1>
  <abc />
  <Foo msg="你好" />
</template>

<script lang="tsx" setup>
import Foo from './foo'
const abc = <h1>abc</h1>
</script>

<style lang="scss" scoped>

</style>
