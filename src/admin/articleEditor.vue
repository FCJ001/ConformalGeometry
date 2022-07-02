<template>
  <div class="articleEditor">
      <div class="navigation">
          <el-row style="height:100%">
            <el-col :span="12" style="height:100%;width:260px;background:#515a6e">
                <el-menu
                :default-active="openIndex"
                class="el-menu-vertical-demo"
                background-color="#515a6e"
                text-color="#cbced4"
                active-text-color="#fff"
                router="router"
                :default-openeds="['1','2','3']"
                >
                <el-submenu index="1">
                    <template v-slot:title style="background:#515a6e">
                    <i class="el-icon-location"></i>
                    <span>内容管理</span>
                    </template>
                    <el-menu-item index="1-1" :route="{ path: '/admin/article/upload/articlePublish', query: {} }">文章发表</el-menu-item>
                    <el-menu-item index="1-2">文章管理</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template v-slot:title>
                    <i class="el-icon-menu"></i>
                    <span >用户管理</span>
                    </template>
                    <el-menu-item  index="2-1">用户列表管理</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template v-slot:title>
                    <i class="el-icon-menu"></i>
                    <span >其他内容</span>
                    </template>
                    <el-menu-item  index="3-1">上传相册</el-menu-item>
                    <!-- <el-menu-item @click.native="$router.push('/admin/article/upload/images')" index="3-2">上传图片</el-menu-item> -->
                    <el-menu-item  index="3-3">发表demo</el-menu-item>
                </el-submenu>
                <el-menu-item index="4"  @click="exitSys">
                    <i class="el-icon-setting"></i>
                    <span >退出管理系统</span>
                </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
      </div>
      <div class="childrenRouter">
          <router-view key="$route.fullPath"/>
      </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'

import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()

const router = useRouter()

function exitSys () {
  router.push('/article')
  store.commit('isAdmin', false)
  ElMessage({
    message: '用户退出登录,(ノへ￣、)!',
    type: 'success'
  })
}
</script>

<style lang='scss'>
.articleEditor {
    width: 100vw;
    height: 100vh;
    display: flex;
    position: relative;
    .navigation {
        width: 100%;
        height: 100%;
        display: flex;
        // padding-right: 100px;
        position: fixed;
        top: 0;
        left: 0;
    }
    // flex-direction: row;
    .childrenRouter {
        flex: 1;
        z-index: 99;
        width: calc(100% - 260px);
        margin-left: 240px;
        padding-left: 50px;
    }
}
.el-submenu .el-menu-item{
    background-color: #363e4f !important;
}
.el-menu-item.is-active {
    background-color: #2d8cf0 !important;
}
.el-menu-item:hover {
    color: #fff !important;
}
</style>
