<template>
  <button
    @click="goBack"
    class="mb-6 flex items-center space-x-2 text-blue-600 hover:text-blue-800"
  >
    <svg
      class="w-5 h-5"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path>
    </svg>
    <span>Kembali ke Menu</span>
  </button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function goBack() {
  router.push('/menu');
}
</script>
