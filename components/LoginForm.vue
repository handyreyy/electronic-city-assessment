<template>
  <form @submit.prevent="onSubmit" class="max-w-md w-full bg-white p-8 rounded shadow-md space-y-6">
    <h1 class="text-2xl font-bold text-center mb-6">Login</h1>

    <div class="flex flex-col">
      <label for="email" class="mb-1 font-medium">Email</label>
      <input
        id="email"
        v-model="emailValue"
        type="email"
        class="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        placeholder="you@example.com"
      />
      <span v-if="emailErrorMessage" class="text-red-500 text-sm mt-1">
        {{ emailErrorMessage }}
      </span>
    </div>

    <div class="flex flex-col">
      <label for="password" class="mb-1 font-medium">Password</label>
      <input
        id="password"
        v-model="passwordValue"
        type="password"
        class="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        placeholder="Password"
      />
      <span v-if="passwordErrorMessage" class="text-red-500 text-sm mt-1">
        {{ passwordErrorMessage }}
      </span>
    </div>

    <button
      type="submit"
      class="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700"
    >
      Login
    </button>
  </form>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { loginSchema } from '@/schemas/loginSchema';
import { useRouter } from 'vue-router';

const router = useRouter();

const { handleSubmit } = useForm({
  validationSchema: loginSchema,
});

const { value: emailValue, errorMessage: emailErrorMessage } = useField('email');
const { value: passwordValue, errorMessage: passwordErrorMessage } = useField('password');

const onSubmit = handleSubmit((values) => {
  // console.log('Form submitted:', values);
  localStorage.setItem('isLoggedIn', 'true');
  router.push('/menu');
});
</script>
