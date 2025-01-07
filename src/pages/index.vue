<template>
  <el-container>
    <h1>{{ t('name') }}</h1>
  </el-container>

</template>

<script lang="ts" setup>
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()
</script>
