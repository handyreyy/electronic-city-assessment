<template>
  <Transition name="fade-scale" appear>
    <div
      v-if="isOpen"
      class="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="bg-white p-6 rounded shadow-lg max-w-sm w-full flex flex-col gap-4">
        <h2 class="text-xl font-bold">{{ title }}</h2>

        <slot>
          <p>{{ message }}</p>
        </slot>

        <div class="flex justify-end space-x-2 mt-4">
          <Button text="Tidak" type="button" :onClick="cancel" variant="secondary" />
          <Button text="Ya" type="button" :onClick="confirm" variant="primary" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import Button from '@/components/Button.vue';

const { isOpen, title, message } = defineProps<{
  isOpen: boolean;
  title: string;
  message?: string;
}>();

const emit = defineEmits(['confirm', 'cancel']);

function confirm() {
  emit('confirm');
}

function cancel() {
  emit('cancel');
}
</script>

<style scoped>
.fade-scale-enter-active, .fade-scale-leave-active {
  transition: all 0.3s ease;
}
.fade-scale-enter-from, .fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
.fade-scale-enter-to, .fade-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
