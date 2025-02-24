<template>
  <v-app-bar app>
    <v-toolbar-title class="d-none d-md-flex">
      <img class="slika" src="@/assets/Logo2.png" alt="Logo" >
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn class="d-none d-md-flex" color="black" @click="navigateTo({ name: 'profil' })">Profil</v-btn>
    <v-btn class="d-none d-md-flex" color="black" @click="navigateTo({ name: 'skener' })">Skener</v-btn>
    <v-btn class="d-none d-md-flex" color="black" @click="navigateTo({ name: 'table' })">Tablica</v-btn>
    <v-btn v-if="hasRoles(['admin','profesor'])" class="d-none d-md-flex" color="black" @click="navigateTo({ name: 'generator' })">Generator</v-btn>
    <v-btn v-if="!user" class="d-none d-md-flex login-button" @click="navigateTo({ name: 'login' })">Prijavi se</v-btn>
    <v-btn v-else class="d-none d-md-flex login-button" @click="logout">Odjavi se</v-btn>
    <v-btn class="d-md-none" icon @click="drawer = !drawer">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" app temporary>
    <v-list>
      <v-list-item @click="navigateTo({ name: 'profil' })">Profil</v-list-item>
      <v-list-item @click="navigateTo({ name: 'skener' })">Skener</v-list-item>
      <v-list-item @click="navigateTo({ name: 'table' })">Tablica</v-list-item>
      <v-list-item @click="navigateTo({ name: 'generator' })">Generator</v-list-item>
      <v-list-item @click="navigateTo({ name: 'login' })">Prijavi se</v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useRuntimeConfig } from 'nuxt/app';

const runtimeConfig = useRuntimeConfig();

const router = useRouter();

const hasRoles=(roles)=>{
  if(user.value){
//Ako role.name=role, vrati true
    return user.value.roles.some(role => roles.includes(role.name));
  }
  return false;
}

const logout = async () => {
  try {
    await axios.post(`${runtimeConfig.public.apiUrl}/api/logout`, {}, {withCredentials: true});
    user.value = null;
    navigateTo({ name: 'login' });
  } catch (error) {
    console.error('Greška pri odjavi:', error);
  }
};

const navigateTo = (route) => {
  router.push(route);
};

const user = ref(null);

const getUser = async () => {
  try {
    const response = await axios.get(`${runtimeConfig.public.apiUrl}/api/user`, {withCredentials: true});
    user.value = response.data.user;
  } catch (error) {
    console.error('Greška pri dohvaćanju usera:', error);
  }
};

onMounted(() => {
  nextTick(() => {
    getUser();
  });
});

</script>

<style scoped>
.slika {
  margin-left: 50px !important;
  height: 50px !important;
}

.d-none {
  margin-right: 10px;
}

.bold-text {
  font-weight: bold;
}

.login-button {
  background-color: rgb(54, 134, 255);
  color: white;
  font-weight: bold;
  border-radius: 8px;
}

a:visited {
  color: inherit; /* Keeps the original link color */
  text-decoration: none;
}

@media (max-width: 250px) {
  .d-none {
    display: none !important;
  }
  .d-md-flex {
    display: flex !important;
  }
}
</style>