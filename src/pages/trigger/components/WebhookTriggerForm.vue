<template>
  {{ model.name }}
</template>

<script lang="ts" setup>
  import { WebhookTrigger } from '@/types/trigger'

  const model = defineModel<WebhookTrigger>({ required: true })
</script>
