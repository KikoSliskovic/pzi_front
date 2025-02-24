<script setup >
</script>

<template>
  <v-main>
    <div class="fill-height">
      <v-row>
        <v-col class="v-col-12 v-col-md-6 pb-0">
          <div class="right-pane">
            <!-- Right Side Content -->
            <LoginForma />
          </div>
        </v-col>
        <!-- Right Panel: Hide on smaller screens -->
        <v-col class="v-col-12 v-col-md-6"
            style="display: flex; justify-content: center; align-items: center; height: 100vh; position: relative">
          <v-img
              src="assets/Logo2.png"
              max-height="250"
              alt="Logo2"
              style="display: block; margin: auto;"
          ></v-img>
          <div class="fill-height">
            <!-- Left Side Content (buttons) -->
            <a href="https://aai.sum.ba/" target="_blank">
              <button class="transparent-button bottom-left">O eduID sustavu</button>
            </a>
            <a href="https://aai.sum.ba/" target="_blank">
              <button class="transparent-button bottom-right">Pomoć</button>
            </a>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-main>
</template>



<style scoped>

.left-pane {
  flex: 1;
  background-color: white;
}

.right-pane {
  flex: 1;
  height: 100vh;
  background-image: url('assets/pozadina.png');
  background-size: cover;
  background-position: center;
}

.transparent-button {
  background: none;
  border: none;
  color: #0379FD;
  font-size: 1rem;
  cursor: pointer;
  position: absolute;
}

.bottom-left {
  bottom: 25px;
  left: 1%;
}

.bottom-right {
  bottom: 25px;
  right: 4%;
}
</style>