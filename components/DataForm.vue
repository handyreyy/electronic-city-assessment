<template>
  <div class="relative min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="fixed top-4 left-4">
      <BackButton />
    </div>

    <form
      @submit.prevent="onSubmit"
      class="w-full max-w-2xl bg-white p-10 rounded-lg shadow-lg space-y-6"
    >
      <h1 class="text-3xl font-bold text-center text-gray-800">Form Data</h1>

      <div class="flex flex-col">
        <label class="mb-2 font-medium text-gray-700">Nama</label>
        <input
          v-model="nameValue"
          type="text"
          placeholder="Masukkan nama"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg"
        />
        <span v-if="nameError" class="text-red-500 text-sm mt-1">{{ nameError }}</span>
      </div>

      <div class="flex flex-col">
        <label class="mb-2 font-medium text-gray-700">Tanggal Lahir</label>
        <input
          v-model="birthdateValue"
          type="date"
          :max="todayString"
          :class="[
            'w-full px-4 py-3 border border-gray-300 rounded-lg',
            birthdateValue ? 'text-gray-900' : 'text-gray-400'
          ]"
        />
      </div>

      <div class="flex flex-col">
        <label class="mb-2 font-medium text-gray-700">Nomor Handphone</label>
        <div class="relative">
          <span class="absolute left-4 top-3 text-gray-500">+62</span>
          <input
            v-model="phoneInput"
            type="text"
            placeholder="81234567890"
            @input="onPhoneInput"
            class="w-full pl-16 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
          />

        </div>
        <span v-if="phoneError" class="text-red-500 text-sm mt-1">{{ phoneError }}</span>
      </div>

      <div class="flex flex-col">
        <label class="mb-2 font-medium text-gray-700">Alamat</label>
        <textarea
          v-model="addressValue"
          placeholder="Masukkan alamat"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg"
        />
        <span v-if="addressError" class="text-red-500 text-sm mt-1">{{ addressError }}</span>
      </div>

      <div class="flex flex-col">
        <label class="mb-2 font-medium text-gray-700">Provinsi</label>
        <select
          v-model="provinceValue"
          @change="onProvinceChange"
          :class="[
          'w-full px-4 py-3 border border-gray-300 rounded-lg',
          provinceValue ? 'text-gray-900' : 'text-gray-400',
          ]"
        >
          <option value="" disabled selected hidden>Pilih Provinsi</option>
          <option v-for="prov in provinces" :key="prov.name" :value="prov.name">
            {{ prov.name }}
          </option>
        </select>
        <span v-if="provinceError" class="text-red-500 text-sm mt-1">{{ provinceError }}</span>
      </div>

      <div class="flex flex-col">
        <label class="mb-2 font-medium text-gray-700">Kota</label>
        <select
          v-model="cityValue"
          :disabled="!provinceValue"
          :class="[
          'w-full px-4 py-3 border border-gray-300 rounded-lg',
          cityValue ? 'text-gray-900' : 'text-gray-400',
          ]"
        >
          <option value="" disabled selected hidden>Pilih Kota</option>
          <option v-for="city in cities" :key="city" :value="city">
            {{ city }}
          </option>
        </select>
        <span v-if="cityError" class="text-red-500 text-sm mt-1">{{ cityError }}</span>
      </div>

      <div class="flex flex-col">
        <label class="mb-2 font-medium text-gray-700">Negara</label>
        <select
          v-model="stateValue"
          :class="[
          'w-full px-4 py-3 border border-gray-300 rounded-lg',
          stateValue ? 'text-gray-900' : 'text-gray-400',
          ]"
        >
          <option value="" disabled selected hidden>Pilih Negara</option>
          <option value="Indonesia">Indonesia</option>
        </select>
        <span v-if="stateError" class="text-red-500 text-sm mt-1">{{ stateError }}</span>
      </div>

      <div class="flex flex-col">
        <label class="mb-2 font-medium text-gray-700">Upload Foto</label>
        <input
          type="file"
          ref="fileInput"
          @change="onFileChange"
          accept="image/*"
          class="w-full"
        />
        <div v-if="previewUrl" class="mt-4">
          <img :src="previewUrl" alt="Preview" class="w-32 h-32 object-cover rounded-lg" />
        </div>
      </div>

      <Button class="w-full" text="Simpan" type="submit" variant="primary" />

      <ConfirmModal
        :isOpen="showModal"
        title="Konfirmasi Data"
        @confirm="confirmSave"
        @cancel="cancelSave"
      >
        <ul class="space-y-2 list-disc list-inside text-left">
          <li><strong>Nama:</strong> {{ nameValue }}</li>
          <li v-if="birthdateValue"><strong>Tanggal Lahir:</strong> {{ birthdateValue }}</li>
          <li><strong>Phone:</strong> {{ phoneValue }}</li>
          <li><strong>Alamat:</strong> {{ addressValue }}</li>
          <li><strong>Provinsi:</strong> {{ provinceValue }}</li>
          <li><strong>Kota:</strong> {{ cityValue }}</li>
          <li><strong>Negara:</strong> {{ stateValue }}</li>
          <li v-if="photoValue">
            <strong>Foto:</strong>
            <img :src="previewUrl" alt="Preview" class="w-16 h-16 object-cover rounded mt-2" />
          </li>
        </ul>
      </ConfirmModal>

      <Snackbar :message="snackbarMessage" :visible="showSnackbar" />

    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useForm, useField } from 'vee-validate';
import { formDataSchema } from '@/schemas/formDataSchema';
import { provinces } from '@/stores/provinces';
import { todayString } from '@/utils/date';
import BackButton from '@/components/BackButton.vue';
import ConfirmModal from '@/components/ConfirmModal.vue';
import Snackbar from '@/components/Snackbar.vue';
import Button from '@/components/Button.vue';

const { handleSubmit, resetForm } = useForm({
  validationSchema: formDataSchema,
});

const { value: nameValue, errorMessage: nameError } = useField('name');
const { value: birthdateValue, errorMessage: birthdateError } = useField('birthdate');
const { value: phoneValue, errorMessage: phoneError } = useField('phone', undefined, {
  initialValue: '',
});
const { value: addressValue, errorMessage: addressError } = useField('address');
const { value: provinceValue, errorMessage: provinceError } = useField('province', undefined, {
  initialValue: '',
});
const { value: cityValue, errorMessage: cityError } = useField('city', undefined, {
  initialValue: '',
});
const { value: stateValue, errorMessage: stateError } = useField('state', undefined, {
  initialValue: '',
});
const { value: photoValue } = useField('photo');

const cities = ref<string[]>([]);
const phoneInput = ref('');
const showModal = ref(false);
const confirmationMessage = ref('');
const showSnackbar = ref(false);
const snackbarMessage = ref('');
const fileInput = ref<HTMLInputElement | null>(null);

function onProvinceChange() {
  const selectedProvince = provinces.find(p => p.name === provinceValue.value);
  cities.value = selectedProvince ? selectedProvince.cities : [];
}

function onPhoneInput(event: Event) {
  let input = (event.target as HTMLInputElement).value;
  input = input.replace(/\D/g, '');

  if (input.startsWith('0')) {
    input = input.slice(1);
  }

  phoneInput.value = input;
  phoneValue.value = `+62${input}`;
}


const previewUrl = ref<string | null>(null);

function onFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0] || null;
  photoValue.value = file;

  if (file) {
    previewUrl.value = URL.createObjectURL(file);
  } else {
    previewUrl.value = null;
  }
}

const onSubmit = handleSubmit((values) => {
  confirmationMessage.value = `
Nama: ${values.name}
Tanggal Lahir: ${values.birthdate}
No HP: ${values.phone}
Alamat: ${values.address}
Provinsi: ${values.province}
Kota: ${values.city}
Negara: ${values.state}
${photoValue.value ? `Foto: ${photoValue.value.name}` : ''}
  `;
  showModal.value = true;
});

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

async function confirmSave() {
  const userData = {
    name: nameValue.value,
    birthdate: birthdateValue.value,
    phone: phoneValue.value,
    address: addressValue.value,
    province: provinceValue.value,
    city: cityValue.value,
    state: stateValue.value,
    photo: photoValue.value ? await fileToBase64(photoValue.value) : null,
  };

  localStorage.setItem('userData', JSON.stringify(userData));

  console.log('Data Disimpan ke Local Storage:', userData);

  showModal.value = false;

  snackbarMessage.value = 'Data Anda telah berhasil disimpan di Local Storage';
  showSnackbar.value = true;

  setTimeout(() => {
    showSnackbar.value = false;
  }, 3000);

  resetForm();
  phoneInput.value = '';
  previewUrl.value = null;

  if (fileInput.value) {
    fileInput.value.value = '';
  }
}

function cancelSave() {
  showModal.value = false;
}
</script>
