<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import Navbar from '../../components/Navbar.vue';
import axios from 'axios';
import { useRuntimeConfig } from 'nuxt/app';

const runtimeConfig = useRuntimeConfig();

// Reaktivne varijable za dropdown podatke
const subjects = ref([]);
const professors = ref([]);
const classrooms = ref([]);

// Selektirane vrijednosti
const selectedSubject = ref(null);
const selectedProfessor = ref(null);
const selectedClassroom = ref(null);
const date = ref(new Date().toISOString().slice(0, 10)); // Automatski postavi na danas

// Pohranjuje kod generiranog QR-a
const qrCodeValue = ref('');
const qrImageUrl = ref(''); // Pohrana URL-a QR koda

// Učitaj podatke za dropdown menije
onMounted(async () => {
  try {
    const responseProfessors = await axios.get('http://localhost:8000/api/professors');
    professors.value = responseProfessors.data;
  } catch (error) {
    console.error('Greška pri učitavanju profesora:', error);
  }

  try {
    const responseSubjects = await axios.get('http://localhost:8000/api/subjects');
    subjects.value = responseSubjects.data;
  } catch (error) {
    console.error('Greška pri učitavanju kolegija:', error);
  }

  try {
    const responseClassrooms = await axios.get('http://localhost:8000/api/classrooms');
    classrooms.value = responseClassrooms.data;
  } catch (error) {
    console.error('Greška pri učitavanju učionica:', error);
  }
});

// Funkcija za dohvat QR slike
const getQrImage = async () => {
  if (!qrCodeValue.value) return; // Ako nema koda, ne izvršavaj
  try {
    const response = await axios.get(`http://pzi.test/qr-code/${qrCodeValue.value}`, { responseType: 'blob' });
    qrImageUrl.value = URL.createObjectURL(response.data);
  } catch (error) {
    console.error('Greška pri dohvaćanju QR slike:', error);
  }
};

// Generiraj QR kod i pohrani vrijednost
const generateQRCode = async () => {
  try {
    const response = await axios.post(runtimeConfig.public.apiUrl + '/generate-qr', {
      professor_id: selectedProfessor.value || 1,
      subject_id: selectedSubject.value || 1,
      classroom_id: selectedClassroom.value || 1,
    }, { withCredentials: true });

    qrCodeValue.value = response.data.value; // Pohrani generirani QR kod
    await getQrImage(); // Dohvati QR sliku odmah nakon generacije
  } catch (error) {
    console.error('Greška pri generiranju QR koda:', error);
  }
};

// Auto-refresh svakih 10 sekundi
watch(qrCodeValue, () => {
  if (qrCodeValue.value) {
    setInterval(getQrImage, 10000);
  }
});
</script>

<template>
  <Navbar />
  <v-main>
    <div class="background min-h-screen flex flex-col items-center justify-center">
      <div class="box bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center">
        <div class="inner-box bg-white-100 p-4 rounded-lg shadow-md mb-15">
          <div v-if="qrImageUrl" class="image-container mb-4">
            <img :src="qrImageUrl" alt="QR kod" class="inner-box-image" />
          </div>
        </div>

        <div class="dropdown-container flex gap-4 w-full">
          <v-select 
            v-model="selectedProfessor"
            :items="professors"
            item-title="name"
            item-value="id"
            label="Profesor"
            outlined
            dense
            class="dropdown"
          ></v-select>

          <v-select
            v-model="selectedSubject"
            :items="subjects"
            item-value="id"
            item-title="subject_name"
            label="Kolegij"
            dense
            outlined
            class="dropdown"
          ></v-select>

          <v-select
            v-model="selectedClassroom"
            :items="classrooms"
            item-title="name"
            item-value="id"
            label="Učionica"
            outlined
            dense
            class="dropdown"
          ></v-select>
        </div>

        <div class="rectangle-label-pair mt-4">
          <v-btn @click="generateQRCode" color="primary" class="rectangleQR mb-2" rounded block>
            <img src="@/assets/Logo2.png" alt="QR Code" class="qr-code-image" />
          </v-btn>
          <p class="label">Generiraj QR Kod</p>
        </div>
      </div>
    </div>
  </v-main>
</template>

<style scoped>
.background {
  background-image: url('@/assets/backgroundpattern.png');
  background-size: cover;
  background-position: center;
}

.box {
  max-width: 1000px;
  width: 100%;
  min-height: 700px; 
  box-shadow: 0 8px 150px rgba(0, 0, 0, 0.596);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.inner-box {
  max-width: 320px;
  width: 100%;
  min-height: 200px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.inner-box-image {
  width: 100%;
  height: auto;
}

.dropdown-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 1%;
}

.dropdown {
  flex: 1;
  border-radius: 20px;
}

.rectangle-label-pair {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  padding-top: 3%;
}

.rectangleQR {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  padding: 0;
  border-radius: 8px;
}

.qr-code-image {
  max-width: 15%;
  max-height: 15%;
  object-fit: contain;
}

.label {
  color: gray;
  text-align: center;
  margin-bottom: 0px;
}

.v-select {
  width: 100%;
}
</style>
