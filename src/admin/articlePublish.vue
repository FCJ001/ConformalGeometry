<template>
  <div id="articlePublish">
      <div class="container">
            <h2>文章发布</h2>
            <p>文章标题：</p>
        <el-input v-if="isShow" v-model="data.model.title" style="width:80%" placeholder="请输入内容"></el-input>
        <el-input v-else v-model="data.model.title" style="width:80%" placeholder="请输入内容"></el-input>
            <!-- <p><img v-show="imageUrl" :src="imageUrl" alt="笔记中的图片"></p> -->
        <p>文章封面图</p>
         <el-upload
          class="avatar-uploader"
          limit="1"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="(res) => {data.model.icon=res.url}"
              >
          <img v-if="data.model.icon" :src="data.model.icon" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>

        <p>文章简介：</p>
        <el-input v-if="isShow" type="textarea" :rows="4" style="width:80%" placeholder="请输入文章简介..." v-model="data.model.brief"></el-input>
        <el-input v-else type="textarea" :rows="4" style="width:80%" placeholder="请输入文章简介..." v-model="data.model.brief"></el-input>
        <p>文章主体内容：</p>

        <!-- <v-md-editor v-model="data.model.body" :disabled-menus="[]" height="400px"  @upload-image="handleUploadImage" ref="mavon"></v-md-editor> -->
        <md-editor v-model="data.model.body" @on-upload-img="onUploadImg" :marked-heading-id="generateId"/>
        <!-- <p>文章标签：</p>
        <el-input v-if="isShow" v-model="data.model.body" style="width:200px" placeholder="请输入内容"></el-input>
        <el-input v-else v-model="data.model.body" style="width:200px" placeholder="请输入内容"></el-input> -->
        <p>文章分类：</p>
        <el-input v-if="isShow"  v-model="data.model.categories" style="width:200px" placeholder="请输入内容"></el-input>
        <el-input v-else v-model="data.model.category" style="width:200px" placeholder="请输入内容"></el-input>
        <div class="event-Button">
            <el-button @click="handeleClick" type="primary">保存</el-button>
            <el-button v-show="!isShow" @click="handleCancel" type="default">取消</el-button>
        </div>
      </div>

  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { fetchCategories, writeBlogs } from '../request/api.js'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter()
// const instance = getCurrentInstance()
// const _this = instance.appContext.config.globalProperties

const data = reactive({
  model: {},
  categories: [],
  body: ''
})
const generateId = (_text, _level, index) => `heading-${index}`
MdEditor.config({
  markedRenderer (renderer) {
    renderer.heading = (text, level, _r, _s, index) => {
      const id = generateId(text, level, index)
      return `<h${level} id="${id}">${text}</h${level}>`
    }
    return renderer
  }
})
// watch(() => data.model, () => {
//   // 此时newValue为数组
//   console.log(data.model)
// },
// {
//   deep: true
// })

const wroteBlog = async () => {
  await writeBlogs(data.model)
}

const getCategories = async () => {
  const res = await fetchCategories()
  data.categories = res.data
}
getCategories()

function handeleClick () {
  wroteBlog()
  router.push('/admin/article')
}

const onUploadImg = async (files, callback) => {
  const res = await Promise.all(
    files.map((file) => {
      return new Promise((resolve, reject) => {
        const form = new FormData()
        form.append('file', file)

        axios
          .post('/api/admin/api/upload', form, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((res) => resolve(res))
          .catch((error) => reject(error))
      })
    })
  )
  callback(res.map((item) => item.data.url))
}
</script>

<style lang="scss">
#articlePublish{
    padding-top: 2rem;
    padding-right: 15rem;
    position: relative;
    z-index: 99;
    h2{
        margin-bottom: 2rem;
    }
    .container {
            position: relative;
            z-index: 99;
            img {
                width: 400px;
                // height: 300px;
            }
            p {
                color: #333;
                font-weight: bold;
                margin: 1rem 0;
            }
            .event-Button {
                margin-top: 1rem;
                button {
                    margin-right: 1rem;
                }
            }
            .avatar-uploader .el-upload {
  border: 1px dashed rgb(33, 33, 34);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);

}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 278px;
  height: 178px;
  text-align: center;
}
        }
}
</style>
