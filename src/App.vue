<template>
  <el-config-provider :locale="currentLocale">
    <router-view/>
  </el-config-provider>
</template>

<script lang="ts" setup>
import zhCn from "element-plus/es/locale/lang/zh-cn";

const currentLocale = computed(() => {
  return zhCn; // todo 国际化
})
</script>
