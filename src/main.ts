// Components
import ElementPlus from "element-plus";
import i18n from "@/i18n";
import router from "@/router";
import pinia from "@/stores";
import axios from "@/plugins/axios";
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Style
import '@vue-flow/core/dist/style.css';
import '@/styles/main.scss';
import '@/styles/workflow.scss';
import "element-plus/dist/index.css";

const app = createApp(App)

app
  .use(ElementPlus)
  .use(i18n)
  .use(router)
  .use(pinia)

app.config.globalProperties.$request = axios

app.mount('#app')
