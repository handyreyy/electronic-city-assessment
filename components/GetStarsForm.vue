<template>
  <div class="relative min-h-screen bg-gray-100 flex items-center justify-center p-4 w-full">

    <form
      @submit.prevent="onSubmit"
      class="w-full max-w-2xl bg-white p-10 rounded-lg shadow-lg space-y-8"
    >
      <h1 class="text-3xl font-bold text-center text-gray-800">Get the Stars</h1>

      <div class="flex flex-col">
        <label for="count" class="mb-2 font-medium text-gray-700">Jumlah Bintang</label>
        <input
          id="count"
          v-model="countValue"
          type="number"
          placeholder="Masukkan angka (1-20)"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
        />
        <span v-if="countErrorMessage" class="text-red-500 text-sm mt-1">
          {{ countErrorMessage }}
        </span>
      </div>

      <div class="flex flex-col">
        <label for="alignment" class="mb-2 font-medium text-gray-700">Alignment Bintang</label>
        <select
          id="alignment"
          v-model="alignmentValue"
          :class="[
            'w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg cursor-pointer',
            alignmentValue ? 'text-gray-900' : 'text-gray-400'
          ]"
        >
          <option value="" disabled hidden>Pilih Alignment</option>
          <option value="left">Rata Kiri</option>
          <option value="center">Rata Tengah</option>
          <option value="right">Rata Kanan</option>
        </select>

        <span v-if="alignmentErrorMessage" class="text-red-500 text-sm mt-1">
          {{ alignmentErrorMessage }}
        </span>
      </div>

      <Button class="w-full" text="Tampilkan Bintang" type="submit" variant="primary" />

      <div v-if="stars.length" class="mt-8 space-y-3">
        <div
          v-for="(starRow, index) in stars"
          :key="index"
          :class="[
            'text-yellow-500 text-3xl',
            alignment === 'left' ? 'text-left' : '',
            alignment === 'center' ? 'text-center' : '',
            alignment === 'right' ? 'text-right' : ''
          ]"
        >
          {{ starRow }}
        </div>
      </div>

    </form>

    <ConfirmModal
      :isOpen="showModal"
      :title="modalTitle"
      :message="modalMessage"
      @confirm="confirmStars"
      @cancel="cancelStars"
    />

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useForm, useField } from 'vee-validate';
import { getStarsSchema } from '@/schemas/getStarsSchema';
import ConfirmModal from '@/components/ConfirmModal.vue';
import Button from '@/components/Button.vue';

const { handleSubmit } = useForm({
  validationSchema: getStarsSchema,
});

const { value: countValue, errorMessage: countErrorMessage } = useField<number>('count');
const { value: alignmentValue, errorMessage: alignmentErrorMessage } = useField<string>('alignment', undefined, {
  initialValue: '',
});


const stars = ref<string[]>([]);
const alignment = ref<string>('');

const showModal = ref(false);
const pendingValues = ref<{ count: number; alignment: string } | null>(null);
const modalTitle = ref('Konfirmasi');
const modalMessage = ref('');

const lastSubmittedValues = ref<{ count: number; alignment: string } | null>(null);

function generateStars(values: { count: number; alignment: string }) {
  const starsArr: string[] = [];
  for (let i = 1; i <= values.count; i++) {
    starsArr.push('⭐'.repeat(i));
  }
  stars.value = starsArr;
  alignment.value = values.alignment;
  lastSubmittedValues.value = { ...values };
}

const onSubmit = handleSubmit((values) => {
  const isSameAsLast =
    lastSubmittedValues.value &&
    values.count === lastSubmittedValues.value.count &&
    values.alignment === lastSubmittedValues.value.alignment;

  if (isSameAsLast) {
    generateStars(values);
  } else {
    pendingValues.value = { ...values };
    modalMessage.value = `Apakah yakin get the stars sebanyak ${values.count} dengan alignment ${values.alignment}?`;
    showModal.value = true;
  }
});

function confirmStars() {
  if (pendingValues.value) {
    generateStars(pendingValues.value);
    pendingValues.value = null;
    showModal.value = false;
  }
}

function cancelStars() {
  pendingValues.value = null;
  showModal.value = false;
}
</script>
