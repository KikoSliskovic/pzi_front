<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Navbar from '../../components/Navbar.vue'
import axios from "axios";
import { useRoute } from 'vue-router';

const route = useRoute();
const lectures = ref([]);

const fetchData = async () => {
  try {
    const [lecturesRes, ] = await Promise.all([
      axios.get("http://localhost:8000/api/lectures"),
    ]);

    lectures.value = lecturesRes.data;
  } catch (error) {
    console.error("Greška pri dohvaćanju podataka:", error);
  }
};

const storeAttendance = async (qr_code: string, otp: string) => {
  try {
    const response = await axios.post("http://pzi.test/lecture", {
      qr_code,
      otp,
    });
    console.log("Odgovor sa servera:", response.data);
  } catch (error) {
    console.error("Greška pri slanju podataka:", error);
  }
};

onMounted(() => {
  fetchData();
  
  const qr_code = route.query.v as string;
  const otp = route.query.otp as string;
  
  if (qr_code && otp) {
    storeAttendance(qr_code, otp);
  }
});
</script>

<template>
  <Navbar />
  <v-main>
    <div class="table-container">
      <hr>
      <br>
      <hr>
      <br>
      <br>
      <v-row>
          <v-col cols="12">
            <h2>PREDAVANJA</h2>
            <v-table>
              <thead>
                <tr>
                  <th>Index/Student</th>
                  <th>Profesor</th>
                  <th>Kolegij</th>
                  <th>Učionica</th>
                  <th>Datum</th>
                  <th>Prisutnost</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="lecture in lectures" :key="lecture.id">
                  <td>{{ lecture.subject?.name ?? 'N/A' }}</td>
                  <td>{{ lecture.professor?.name ?? 'Nema profesora' }}</td>
                  <td>{{ lecture.subject?.subject_name ?? 'Nema kolegija' }}</td>
                  <td>{{ lecture.classroom?.name ?? 'Nema učionice' }}</td>
                  <td>{{ lecture.date ?? 'Nema datuma' }}</td>
                  <td :class="lecture.attendance ? 'text-green' : 'text-red'">
                    {{ lecture.attendance ? 'Prisutan' : 'Odsutan' }}
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-col>
        </v-row>
      <div class="logo-container">
        <img src="@/assets/Logo2.png" alt="Logo" class="logo">
      </div>
    </div>
  </v-main>
</template>

<style scoped>
.table-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin-top: -50px;
}

table {
  width: 80%;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
}

th, td {
  border: 1px solid #ddd;
  padding: 12px;
}

th {
  background-color: #f2f2f2;
  text-align: left;
}

select {
  margin-left: 8px;
  padding: 4px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.logo-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  max-width: 100px;
  margin-top: 50px; 
}
</style>