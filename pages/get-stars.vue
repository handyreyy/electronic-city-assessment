<template>
  <Header />
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-8">
    <GetStarsForm />
  </div>
</template>

<script setup lang="ts">
import GetStarsForm from '@/components/GetStarsForm.vue';
import Header from '@/components/Header.vue';

definePageMeta({
  middleware: 'auth'
});
</script>
