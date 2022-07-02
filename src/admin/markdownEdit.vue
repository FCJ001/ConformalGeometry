<template>
    <div>
       <md-editor v-model="content" :marked-heading-id="getId" :previewOnly=true preview-theme="cyanosis"></md-editor>
        <!-- <button @click="submit">提交</button> -->
    </div>
</template>

<script setup>
// import axios from 'axios'
import { defineProps, toRefs } from 'vue'
import MdEditor from 'md-editor-v3'

const props = defineProps({
  body: String
})
const { body } = toRefs(props)

const content = body
// console.log(body)
const getId = (_text, _level, index) => {
  return `heading-${index}`
}
// 设置链接在新窗口打开
MdEditor.config({
  markedRenderer (renderer) {
    renderer.link = (href, title, text) => {
      return `<a href="${href}" title="${title}" target="_blank">${text}</a>`
    }

    return renderer
  }
})
MdEditor.config({
  markedRenderer (renderer) {
    renderer.heading = (text, level, raw, _s, index) => {
      // 你不能直接调用默认的markedHeadingId，但是它很简单
      // 如果你的id与raw不相同，请一定记得将你的生成方法通过markedHeadingId告诉编辑器
      // 否则编辑器默认的目录定位功能无法正确使用
      const id = getId(text, level, index)

      if (text !== raw) {
        return `<h${level} id="${id}">${text}</h${level}>`
      } else {
        return `<h${level} id="${id}"><a href="#${id}">${raw}</a></h${level}>`
      }
    }

    return renderer
  }
})

</script>

<style lang="scss" scoped>
.cyanosis-theme{
  background: red !important;
}
</style>
