<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <LoginForm />
  </div>
</template>

<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue';

definePageMeta({
  middleware: 'redirect-if-auth'
});
</script>
