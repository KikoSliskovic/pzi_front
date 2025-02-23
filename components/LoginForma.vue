<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

interface LoginForm {
  email: string;
  password: string;
}

const loginForm = ref<LoginForm>({ email: '', password: '' });
const errorMessage = ref<string | null>(null);
const router = useRouter();

const handleSubmit = async () => {
  const form = loginForm.value;
  if (!form) {
    console.error('Form is not available');
    return;
  }
  const email = form.email;
  const password = form.password;

  try {
    // // Fetch CSRF token first
    // const csrfResponse = await fetch('http://localhost:8000/sanctum/csrf-cookie', {
    //   method: 'GET',
    //   credentials: 'include',
    // });

    // if (!csrfResponse.ok) {
    //   throw new Error('Failed to fetch CSRF token');
    // }

    // Proceed with login request
    const response = await fetch('http://pzi.test/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    if (data.message === 'Login successful') {
      router.push('/');
    } else {
      errorMessage.value = 'Invalid credentials';
    }
  } catch (error) {
    console.error('Error:', error);
    errorMessage.value = 'An error occurred. Please try again.';
  }
};
</script>

<template>
  <v-container
      class="d-flex justify-center align-center"
      style="height: 100vh; background-image: url('assets/pozadina.png'); background-size: cover; background-position: center;"
  >    <v-row class="d-flex justify-center align-center" style="width: 100%;">
      <v-col cols="12" style="max-width: 80%">
        <v-card class="pa-13">
          <v-card-title class="text-h5 pb-8">Prijava u sustav</v-card-title>
          <v-card-text>
              <v-text-field v-model="loginForm.email" label="E-pošta" type="email" required></v-text-field>
              <v-text-field v-model="loginForm.password" label="Lozinka" type="password" required></v-text-field>
          </v-card-text>
        </v-card>
          <v-img href="#" @click="handleSubmit"
              src="assets/dugme_prijava.svg"
              max-height="70"
              alt="Logo2"
              style="display: block; margin: auto; margin-top: 20px"
          ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>