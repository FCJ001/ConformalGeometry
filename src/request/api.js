import axios from 'axios'
// import request from './http'
// import $http  from './http'

// 获取文章列表
function getArcticleList (params) {
  return axios.get('api/web/api/articles/list', params)
}
// export const getArcticleList = () => {
//   return http({ method: 'get', url: 'api/web/api/articles/list' })
// }
// 写博客
function writeBlogs (params) {
  return axios.post('/api/admin/api/rest/articles', params)
}

// 获取文章信息
function getArcticle (para) {
  return axios.get(`/api/web/api/articles/${para}`)
}

// 登录接口
function Login (params) {
  return axios.post('/api/admin/api/login', params)
}
// export const writeBlogs = (data) => {
//   return request({ method: 'post', url: 'api/admin/api/rest/articles', data })
// }
// 获取分类接口
function fetchCategories () {
  return axios.get('/api/admin/api/rest/categories')
}

// export const fetchCategories = () => {
//   return request({ method: 'get', url: 'rest/categories' })
// }

export {
  getArcticle,
  getArcticleList,
  Login,
  writeBlogs,
  fetchCategories
}
