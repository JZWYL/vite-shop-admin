import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import elementPlus from './plugins/element-plus'
import './styles/index.scss' // 加载全局样式

createApp(App)
  .use(router)
  .use(store, key)
  .use(elementPlus)
  .mount('#app')
