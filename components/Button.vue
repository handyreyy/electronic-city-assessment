<template>
  <button
    :type="type"
    :disabled="disabled"
    @click="onClick"
    :class="[
      'px-4 py-2 rounded font-semibold transition-colors duration-300 flex items-center justify-center gap-2',
      variantClass,
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    ]"
  >
    <slot>
      {{ text }}
    </slot>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  text: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'danger' | 'success'
  disabled?: boolean
}>()

const variantClass = computed(() => {
  switch (props.variant) {
    case 'danger':
      return 'bg-red-500 text-white hover:bg-red-600'
    case 'success':
      return 'bg-green-500 text-white hover:bg-green-600'
    case 'primary':
      return 'bg-blue-600 text-white hover:bg-blue-700'
    case 'secondary':
      return 'bg-transparent text-blue-600 hover:bg-blue-50'
    default:
      return 'bg-gray-300 text-white hover:bg-gray-400'
  }
})
</script>
