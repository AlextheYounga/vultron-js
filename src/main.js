import { createApp } from 'vue'
const { ipcRenderer } = require('electron')
import App from './App.vue'
import { createVueWait } from 'vue-wait'
import router from './router'
import './assets/tailwind.css'
const schema = require('../database/schema.json')
const SessionManager = require('../framework/Session/session-manager')

const VueWait = createVueWait()

const app = createApp(App)
	.use(VueWait)
	.use(router)

app.config.globalProperties.$electron = ipcRenderer
app.config.globalProperties.$schema = schema
app.config.globalProperties.$session = SessionManager

app.mount('#app')