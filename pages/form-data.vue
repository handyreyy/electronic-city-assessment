<template>
  <DataForm />
</template>

<script setup lang="ts">
import DataForm from '@/components/DataForm.vue';

definePageMeta({
  middleware: 'auth'
});
</script>
