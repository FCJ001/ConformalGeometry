<template>

  <div id="detail">
    <!-- 标题 -->
    <header class="detail_header" :style=color>
      <h1 style="font-size:1.6rem">
        <i class="iconfont icon-lianjie"></i>
        {{data.title}}
      </h1>
      <!-- 时间 -->
      <h3 style="padding-top:1rem;">
        <p>作者:chunJiu Fu {{dateFliter(data.createdAt) }}发布</p>
        <p>于{{dateFliter(data.updatedAt) }}更新</p>
      </h3>
      <!-- 标签 -->
      <div class="tags">
        <!-- <Tag :color="bgColor[index]" v-for="(item,index) in lablesList" :key="index">{{item}}</Tag> -->
      </div>
    </header>
    <!-- 内容区 -->
<div class="mark" ref="scroll">
           <markdown :body="data.body"/>
</div>
  </div>
</template>

<script setup>
import { nextTick, onMounted, reactive } from 'vue'
import markdown from '../../admin/markdownEdit.vue'
import 'md-editor-v3/lib/style.css'
import axios from 'axios'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import { marked } from 'marked'
import Toc from '../../plugins/Toc'
import emitter from '@/utils/eventBus.js'
const route = useRoute()
const data = reactive({
  title: '',
  createdAt: '',
  updatedAt: '',
  body: '',
  Index: '',
  list: [],
  Comments: [],
  articleToc: [],
  parentComments: []
})
// console.log(route.params)
const para = route.params.id
// const y = ref(0)
onMounted(() => {
  window.onscroll = () => {
    for (let i = 0; i < data.articleToc.length; i++) {
      const id = data.articleToc[i].id
      const node = document.querySelector('[data-id="' + id + '"]')
      const x = node.getBoundingClientRect().top
      data.list.push(x)
    }
    console.log((data.articleToc.length) - 1)
    for (let j = 0; j < data.articleToc.length; j++) {
    //   if (j === 0) {
    //     emitter.emit('Toc', data.articleToc[0].id)
    //   }
      //   if (j === ((data.articleToc.length) - 1)) {
      //     emitter.emit('Toc', data.articleToc[data.list[(data.articleToc.length) - 1]].id)
      //   }
      if (data.list[j] < 0 && data.list[j + 1] > 0) {
        emitter.emit('Toc', data.articleToc[j + 1].id)
      }
    }
    data.list = []
  }
})

const getArcticleList = async () => {
  const res = await axios.get(`/api/web/api/articles/list/${para}`)
  console.log(res)
  data.model = res.data
  data.title = res.data.title

  data.createdAt = res.data.createdAt
  data.updatedAt = res.data.updatedAt
  const tocData = Toc(marked(res.data.body))
  data.body = tocData.article
  data.articleToc = tocData.toc

  const articleToc = tocData.toc
  emitter.emit('Top', articleToc)
  //   console.log(articleToc)
  emitter.emit('Toc', data.articleToc[0].id)
}
const dateFliter = (val, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return dayjs(val).format(format)
}
onMounted(() => {
  getArcticleList()
  nextTick(() => {

  })
})

</script>

<style lang='scss'>
#detail {
    // padding-left: 24rem;
    // padding-right: 24rem;
    .detail_header {
        padding-left: 25px;
        padding-top: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-bottom: 23px;
        h1{
            width: 100%;
            text-align: left;
            display: block;
        }
        h3{
            width: 100%;
            text-align: left;
            display: block;
            margin-bottom: 1rem;
        }
        .tags {
        margin-top: 0.5rem;
        }
    }
    .mark{
        // height: 200px;
        // width: 75%;

    .cyanosis-theme{

            background: rgba(226, 224, 225, 0.9);

}
    }
    // .content{
    //     p{
    //         line-height: 2;
    //         display: block !important;

    //           img{
    //         padding-top: 6px;
    //         display: block !important;
    //          margin: 0 auto !important;
    //         width: 85% !important;
    //     }
    //     }

    //     .article-box{
    //         border: 1px solid #2d8cf0;
    //         border-radius: 5px;
    //         min-height: 180px;
    //         margin-bottom: 40px;
    //         padding: 2rem;
    //     }
    // }
}
@media screen and(max-width:992px) {
    #detail{
        .detail_header{
            height: 10rem;
        }
        .content{
            // padding: 0 1rem;
            .article-box{
                padding: 1rem;
            }
        }
    }
}
.v-note-wrapper .v-note-panel .v-note-show .v-show-content, .v-note-wrapper .v-note-panel .v-note-show .v-show-content-html{
    background: rgba($color: #edeeea, $alpha: 0.6);
}
</style>
