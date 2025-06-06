<template>
  <div class="relative min-h-screen bg-gray-100 flex items-center justify-center p-4">

    <form
      @submit.prevent="onSubmit"
      class="w-full max-w-xl bg-white p-10 rounded-lg shadow-lg space-y-8"
    >
      <h1 class="text-3xl font-bold text-center text-gray-800">Spelled Out</h1>
      <div class="flex flex-col">
        <label for="amount" class="mb-2 font-medium text-gray-700">Nominal (Rp)</label>
        <div class="relative">
          <span class="absolute left-4 top-3 text-gray-500">Rp</span>
          <input
            id="amount"
            v-model="amountInput"
            type="text"
            placeholder="Masukkan nominal"
            @input="onAmountInput"
            class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
          />
        </div>
        <span v-if="amountErrorMessage" class="text-red-500 text-sm mt-1">
          {{ amountErrorMessage }}
        </span>
      </div>

      <Button class="w-full" text="Spelled Out" type="submit" variant="primary" />

      <div v-if="spelledOutResult" class="mt-8 text-lg text-gray-800">
        Terbilang: {{ spelledOutResult }}
      </div>

    </form>
    <ConfirmModal
      :isOpen="showModal"
      :title="modalTitle"
      :message="modalMessage"
      @confirm="confirmSpelledOut"
      @cancel="cancelSpelledOut"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useForm, useField } from 'vee-validate';
import { getSpelledOutSchema } from '@/schemas/spelledOutSchema';
import { numberToWords } from '@/utils/numberToWords';
import { capitalizeWords } from '@/utils/capitalizeWords';
import { formatRupiah } from '@/utils/formatRupiah';
import ConfirmModal from '@/components/ConfirmModal.vue';
import Button from '@/components/Button.vue';

const { handleSubmit } = useForm({
  validationSchema: getSpelledOutSchema,
});

const { value: amountValue, errorMessage: amountErrorMessage } = useField<number>('amount', undefined, {
  initialValue: '',
});

const amountInput = ref('');

const showModal = ref(false);
const modalTitle = ref('Konfirmasi');
const modalMessage = ref('');
const pendingAmount = ref<number | null>(null);
const spelledOutResult = ref('');

function onAmountInput(event: Event) {
  let input = (event.target as HTMLInputElement).value;
  let cleanedInput = input.replace(/\D/g, '');

  if (cleanedInput.length > 15) {
    cleanedInput = cleanedInput.substring(0, 15);
  }

  amountValue.value = cleanedInput ? parseInt(cleanedInput) : null;
  amountInput.value = cleanedInput ? formatRupiah(parseInt(cleanedInput)) : '';
}



const onSubmit = handleSubmit(() => {
  if (amountValue.value !== null) {
    pendingAmount.value = amountValue.value;
    modalMessage.value = `Apakah yakin spelled out nominal Rp${formatRupiah(amountValue.value)}?`;
    showModal.value = true;
  }
});

function confirmSpelledOut() {
  if (pendingAmount.value !== null) {
    const result = numberToWords(pendingAmount.value);
    spelledOutResult.value = capitalizeWords(result) + ' Rupiah';
    pendingAmount.value = null;
    showModal.value = false;
  }
}

function cancelSpelledOut() {
  pendingAmount.value = null;
  showModal.value = false;
}
</script>

