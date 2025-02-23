import { defineNuxtConfig } from 'nuxt/config'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // enable 0.0.0.0
  devServer: {
    host: '0.0.0.0',
  },  
  ssr: false,
  compatibilityDate: '2024-11-01',
  // generate env
  runtimeConfig: {
    public: {
      apiUrl: 'http://localhost:3000',
    }
  },
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  css: [
    '@/assets/css/main.css', // Ensure this is the correct path
  ],
  modules: [
    function (_options, nuxt) {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins = config.plugins || [];
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@pinia/nuxt',
    '@nuxt/ui',
    // Add any other modules here
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})