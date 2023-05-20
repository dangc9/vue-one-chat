import { createApp } from 'vue'
import store from './store/index.ts'
import 'virtual:svg-icons-register'
import './assets/style/style.css'
import './assets/style/variable.css'
import SvgIcon  from './components/SvgIcon/index.vue'

import App from './App.vue'
import router from './router'


const app = createApp(App)
app.component('svg-icon', SvgIcon).use(router).use(store).mount('#app')
