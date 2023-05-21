import { createApp } from 'vue'
import store from './store/index.ts'
import 'virtual:svg-icons-register'
import './assets/style/style.css'
import './assets/style/variable.css'
import "katex/dist/katex.min.css"
import "highlight.js/styles/atom-one-dark.css"
// import '@/assets/style/clipboard.css'
// import "highlight.js/styles/dark.css";
import SvgIcon  from './components/SvgIcon/index.vue'

import App from './App.vue'
import router from './router'


const app = createApp(App)
app.component('svg-icon', SvgIcon).use(router).use(store).mount('#app')
