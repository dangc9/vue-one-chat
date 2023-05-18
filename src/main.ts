import { createApp } from 'vue'
import 'virtual:svg-icons-register'
import './assets/style/style.css'
import './assets/style/variable.css'
// import './assets/style/common.less'
import SvgIcon  from './components/SvgIcon/index.vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.component('svg-icon', SvgIcon).use(router).mount('#app')
