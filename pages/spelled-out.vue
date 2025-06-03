<template>
  <SpelledOutForm />
</template>

<script setup lang="ts">
import SpelledOutForm from '@/components/SpelledOutForm.vue';

definePageMeta({
  middleware: 'auth'
});
</script>
