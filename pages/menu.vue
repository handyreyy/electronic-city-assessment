<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-8">
    <Button class="fixed top-4 right-4" text="Logout" variant="danger" :onClick="onLogout" />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
      <MenuCard title="Get the Stars" route="/get-stars" />
      <MenuCard title="Spelled Out" route="/spelled-out" />
      <MenuCard title="Form Data" route="/form-data" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import MenuCard from '@/components/MenuCard.vue';
import Button from '@/components/Button.vue';

definePageMeta({
  middleware: 'auth'
});

const router = useRouter();

function onLogout() {
  localStorage.removeItem('isLoggedIn');
  router.push('/login');
}
</script>
