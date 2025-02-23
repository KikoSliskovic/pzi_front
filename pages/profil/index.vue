<script setup >
import axios from 'axios';
import { nextTick } from 'process';
import { onMounted, ref } from 'vue';
import { useRuntimeConfig } from 'nuxt/app';


const userData = ref([
]);

const runtimeConfig = useRuntimeConfig();

const user = ref(null);

const getUser = async () => {
  try {
    const response = await axios.get(`${runtimeConfig.public.apiUrl}/api/user`, {withCredentials: true});
    user.value = response.data.user;
    userData.value = [
      { title: 'Ime', text: response.data.user.name },
      { title: 'Email', text: response.data.user.email },
      { title: 'Uloga', text: response.data.user.roles.map(role => role.name).join(', ') },
      // { title: 'Broj indeksa', text: response.data.user.index_number },
      // { title: 'Godina studija', text: response.data.user.study_year },
      // { title: 'Smjer', text: response.data.user.study_program },
    ];
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

<template>
  <Navbar />
  <v-main>
    <div v-if="user">
      <h1 class="blue-title">Moji podaci EDU-ID ({{ user.name }})</h1>
      <h2 class="ispod-naslova">Profil / ({{ user.name }})</h2>
      <div class="profile-section">
        <div class="profile-info">
          <div class="profile-picture"></div>
          <div class="gradient-line"></div>
          <a href="https://eduid.sum.ba/cards/be5ebe40-57a1-103b-a181-001994087817" target="_blank">
            <button class="view-card-button">Pogledaj digitalnu iskaznicu</button>
          </a>
        </div>
        <div class="user-data">
          <div v-for="(item, index) in userData" :key="index" class="data-item">
            <h3 class="data-title">{{ item.title }}</h3>
            <div class="data-rectangle">{{ item.text }}</div>
          </div>
        </div>
      </div>
    </div>
  </v-main>
</template>

<style scoped>
.blue-title {
  color: rgb(23, 97, 255);
  font-size: 2.5em;
  margin-left: 40px;
  margin-top: 20px;
}

.ispod-naslova {
  margin-left: 40px;
}




.gradient-line {
  width: 50%;
  height: 2px;
  background: linear-gradient(#23a6d5, #23d5ab);
  margin-bottom: 20px;
}

.view-card-button {
  background-color: #23a6d5;
  color: white;
  padding: 10px 25px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.user-data {
  width: 100%;
}

.data-item {
  margin-bottom: 15px;
}

.data-title {
  font-size: 1.2em;
  margin-bottom: 5px;
}

.data-rectangle {
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
}

/* za mobitel */
@media (max-width: 600px) {
  .profile-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}

.profile-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 0;
}

.profile-picture {
  width: 150px;
  height: 200px;
  background-color: #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  background-image: url('assets/60111.jpg');
  background-size: cover;
  background-position: center;
}
}

/* za vece od mobitela */
@media (min-width: 768px) {
  .user-data {
    width: 70%;
  }

  .profile-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
}

.profile-info {
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  margin-right: 20; /* Reset the left margin */
  justify-content: center; /* Center the content */
  align-content: center;
}

.profile-picture {
  width: 150px;
  height: 200px;
  background-color: #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  background-image: url('assets/60111.jpg');
  background-size: cover;
  background-position: center;
}
}
</style>