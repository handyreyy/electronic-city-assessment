<template>
  <div class="relative min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="fixed top-4 left-4">
      <BackButton />
    </div>

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
      <button
        type="submit"
        class="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-lg"
      >
        Spelled Out
      </button>
      <div v-if="spelledOutResult" class="mt-8 text-lg text-gray-800">
        {{ spelledOutResult }}
      </div>

      <ConfirmModal
        :isOpen="showModal"
        :title="modalTitle"
        :message="modalMessage"
        @confirm="confirmSpelledOut"
        @cancel="cancelSpelledOut"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useForm, useField } from 'vee-validate';
import { getSpelledOutSchema } from '@/schemas/spelledOutSchema';
import { numberToWords } from '@/utils/numberToWords';
import { capitalizeWords } from '@/utils/capitalizeWords';
import { formatRupiah } from '@/utils/formatRupiah';
import BackButton from '@/components/BackButton.vue';
import ConfirmModal from '@/components/ConfirmModal.vue';

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

