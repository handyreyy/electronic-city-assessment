<template>
  <Transition name="fade" appear>
    <div
      v-if="isOpen"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="bg-white p-6 rounded shadow-lg max-w-sm w-full space-y-4">
        <h2 class="text-xl font-bold">{{ title }}</h2>

        <slot>
          <p>{{ message }}</p>
        </slot>

        <div class="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            @click="cancel"
            class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Tidak
          </button>
          <button
            type="button"
            @click="confirm"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Ya
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
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
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
