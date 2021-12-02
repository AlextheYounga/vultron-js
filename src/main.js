import { createApp } from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import './assets/tailwind.css'
const axios = require('axios')
const { ipcRenderer } = require('electron')
const schema = require('./database/schema.json');

// Creates db if db does not exist.
const app = createApp(App)

app.config.globalProperties.$http = () => axios
app.config.globalProperties.$api = ipcRenderer
app.config.globalProperties.$schema = schema

app.use(router)
	.use(VueRouter)
	.mount('#app')