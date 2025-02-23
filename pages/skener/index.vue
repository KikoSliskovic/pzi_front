<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isMobile = ref(false);
const isScanning = ref(false);
const videoElement = ref<HTMLVideoElement | null>(null);
let stream: MediaStream | null = null;

const checkScreenSize = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth <= 768;
  }
};

const startCamera = async () => {
  if (!isMobile.value || !videoElement.value || !navigator.mediaDevices?.getUserMedia) return;

  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" }
    });
    if (videoElement.value) {
      videoElement.value.srcObject = stream;
      isScanning.value = true;
    }
  } catch (error) {
    console.error("Kamera nije dostupna:", error);
  }
};

const stopCamera = () => {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    stream = null;
    isScanning.value = false;
  }
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);

  if (isMobile.value) {
    startCamera();
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreenSize);
  stopCamera();
});
</script>

<template>
  <Navbar />
  <v-main class="d-flex justify-center align-center">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <!-- Desktop verzija - Prikazuje poruku -->
          <v-card v-if="!isMobile" class="pa-6 text-center elevation-12">
            <v-card-title class="text-h5 font-weight-bold">Koristite mobilni uređaj</v-card-title>
            <v-card-text class="text-subtitle-1">
              Skeniranje QR koda moguće je samo putem mobilnog uređaja.  
              Molimo koristite svoj telefon ili tablet za nastavak.
            </v-card-text>
          </v-card>

          <!-- Mobilna verzija - Prikazuje kameru -->
          <video v-else ref="videoElement" autoplay playsinline v-show="isScanning"></video>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<style scoped>
.v-card {
  border-radius: 12px;
  background: #f8f9fa;
}

.text-h5 {
  color: #37474f;
}

.text-subtitle-1 {
  color: #607d8b;
}

video {
  width: 100%;
  max-height: 400px;
  border: 2px solid #ccc;
  border-radius: 8px;
}
</style>
