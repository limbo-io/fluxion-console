<template>
  {{ model.name }}
</template>

<script lang="ts" setup>
  import { WebhookTriggerConfig } from '@/types/trigger'

  const model = defineModel<WebhookTriggerConfig>({ required: true })
</script>
