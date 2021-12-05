import {
	createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
const axios = require('axios')
const {
	ipcRenderer
} = require('electron')
const schema = require('./database/schema.json');
import Helpers from './modules/Helpers'

// Creates db if db does not exist.
const app = createApp(App).use(router)

app.config.globalProperties.$http = () => axios
app.config.globalProperties.$api = ipcRenderer
app.config.globalProperties.$schema = schema
app.config.globalProperties.$helpers = Helpers

app.mount('#app')
