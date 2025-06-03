<template>
  <Header />
  <SpelledOutForm />
</template>

<script setup lang="ts">
import SpelledOutForm from '@/components/SpelledOutForm.vue';
import Header from '@/components/Header.vue';

definePageMeta({
  middleware: 'auth'
});
</script>
