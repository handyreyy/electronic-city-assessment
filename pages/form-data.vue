<template>
  <Header />
  <DataForm />
</template>

<script setup lang="ts">
import DataForm from '@/components/DataForm.vue';
import Header from '@/components/Header.vue';

definePageMeta({
  middleware: 'auth'
});
</script>
