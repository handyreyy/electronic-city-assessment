<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-8 text-center space-y-6">
    <h1 class="text-5xl font-bold text-gray-700">{{ statusCode }}</h1>
    <p class="text-lg text-gray-700">
      {{ message }}
    </p>

    <Button
      text="Kembali ke Login"
      variant="secondary"
      @click="router.push('/login')"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import Button from '@/components/Button.vue';

const route = useRoute();
const router = useRouter();

const statusCode = route.query.statusCode || 500;
const message = route.query.message || 'Terjadi kesalahan pada server.';
</script>
