import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElIconModules from '@element-plus/icons-vue'
import axios from 'axios'
// Markdown组件

// import axios from './request/http.js'
// import NProgress from 'nprogress'

// import './request/http.js'

// 引入样式
import './assets/css/common.css'

// 引入图标库
import './assets/icon/icon.css'

// import http from './request/http'
const app = createApp(App)

for (const iconName in ElIconModules) {
  app.component(iconName, ElIconModules[iconName])
}
// app.config.globalProperties.$http = axios
// app.config.globalProperties.$http = http
axios.defaults.baseURL = ''
// 请求超时时间
axios.defaults.timeout = 10000

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    if (localStorage.token) {
      config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    if (err.response.data.message) {
      if (err.response.status === 401) {
        router.push('/login')
      }
    }

    return Promise.reject(err)
  }
)

app.mixin({
  computed: {
    uploadUrl () {
      return 'http://localhost:3000/admin/api' + '/upload'
    }
  },
  methods: {
    getAuthHeaders () {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})

router.beforeEach((to, from, next) => {
  if (to.path.includes('admin')) {
    store.commit('isAdmin', true)
  } else {
    store.commit('isAdmin', false)
  }
  next()
})

router.beforeEach((to, from, next) => {
  if (to.path.includes('detail')) {
    store.commit('isCatelogue', false)
  } else {
    store.commit('isCatelogue', true)
  }
  next()
})
app.use(store).use(router).use(ElementPlus).mount('#app')
