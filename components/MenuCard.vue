<template>
  <div
    @click="navigate"
    class="bg-white p-8 rounded shadow-md flex flex-col items-center justify-center cursor-pointer hover:bg-blue-100 transition"
  >
    <h2 class="text-xl font-bold mb-2">{{ title }}</h2>
    <p class="text-gray-500">Klik untuk masuk</p>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  route: {
    type: String,
    required: true
  }
});

const router = useRouter();

function navigate() {
  router.push(props.route);
}
</script>
