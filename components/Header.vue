<template>
  <div class="fixed top-4 left-4 right-4 flex items-center justify-between z-50">
    <Button
      v-if="showBackButton"
      text=""
      variant="secondary"
      class="flex items-center gap-2"
      @click="goToMenu"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      <span>Kembali ke Menu</span>
    </Button>

    <Button
      text="Logout"
      variant="danger"
      @click="logout"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import Button from '@/components/Button.vue';

const router = useRouter();
const route = useRoute();

const showBackButton = computed(() => route.path !== '/menu');

function goToMenu() {
  router.push('/menu');
}

function logout() {
  localStorage.removeItem('isLoggedIn');
  router.push('/login');
}
</script>
