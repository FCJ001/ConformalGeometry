<template>
  <div id="index">
      <div class="container" v-if="!data.isAdmin">
        <Header :showSome="showSome"></Header>
        <div v-show="!TypeChange" class="moon" :style="{ backgroundImage: `url(${data.backgroundImage})` }"></div>
        <div v-show="TypeChange"  class="night"></div>
        <Light @changeBackground="changeBG"/>
        <div class="content">
            <div class="catelogue" v-if="!data.isTop">
                 <h2>目录</h2>
            <div
              class="menu-title"

              v-for="item in data.Top"
              :key="item.id"
              :class="{ active: item.id === data.currenIndex }"
                :style="{ paddingLeft: `${item.indent}em` }"
            @click="scrollTo(item.id);choose(item.id)"
            >
              {{ item.text }}
            </div>
            </div>
            <div class="left" ref="left" v-if="data.isTop">
                <div class="info" >
                    <div class="img">
                        <img src="@/assets/images/baby.jpg">
                    </div>
                    <div class="intro" >
                        <p class="name">Heartless</p>
                        <p class="desc">A handsome man</p>
                    </div>
                </div>
                <div class="scroll">
                    <div class="nav">
                    <el-row style="height:100%">
                        <el-col :span="25" style="height:100%;width:232px;background:rgba($color: #2b2c28, $alpha: 0.6)">

                         <el-menu
                            class="el-menu-vertical-demo"
                            text-color="#cbced4"
                            active-text-color="#fff"
                            >
                             <div class="navTitle">
                                <span>导航</span>
                            </div>
                            <el-menu-item index="1" >
                           <el-icon><User /></el-icon>
                            <span>首页</span>
                            </el-menu-item>
                            <el-menu-item index="2" >
                            <el-icon><document /></el-icon>
                            <span>Demo</span>
                            </el-menu-item>
                            <el-menu-item index="3" >
                            <el-icon><document /></el-icon>
                            <span>云相册</span>
                            </el-menu-item>
                            <el-menu-item index="4">
                            <el-icon><setting /></el-icon>
                            <span>留言板</span>
                            </el-menu-item>
                            <el-menu-item index="5">
                            <el-icon><setting /></el-icon>
                            <span>个人信息</span>
                            </el-menu-item>
                             <div class="navTitle">
                                <span>其它</span>
                            </div>
                            <el-menu-item index="6" @click="goAdmin">
                           <el-icon><Baseball /></el-icon>
                            <span>后台入口</span>
                            </el-menu-item>

                        </el-menu>
                        </el-col>
                    </el-row>
                    </div>
                </div>
                <!-- <div class="bottom">
                    <i class="el-icon-setting"></i>管理后台
                </div> -->
            </div>
            <div class="main" :style="{backgroundColor: bgColor}" ref="main">
                <!-- <div class="header">
                    <h1>Heartless</h1>
                    <h3>迷失的人迷失了，相逢的人会再相逢</h3>
                </div> -->
                <keep-alive>
                    <router-view class="router" :style="{backgroundColor: bgColor}" />
                </keep-alive>
                <div class="foot">
                    粤ICP备2021032727号
                </div>
            </div>
            <div  class="right" :style="{backgroundColor: bgColor}">
                <div class="recent">
                    <!-- <div class="title">最近文章</div> -->
                    <Recent/>
                </div>
                <div class="aboutBlog">
                    <Blog/>
                </div>
                <div class="contact">
                    <Contact/>
                </div>
            </div>
        </div>

      </div>
      <div v-if="data.isAdmin" >
            <div class="moon"  :style="{ backgroundImage: `url(${data.backgroundImage})` }"></div>
            <keep-alive>
                <router-view class="router_content" ></router-view>
            </keep-alive>
      </div>
        <Music />

  </div>
</template>

<script setup>
import Header from '../components/Header'
import Recent from '../components/ArticleComponents/Recent'
import Blog from '../components/Index/Blog'
import Contact from '../components/Index/Contact'
import Music from '../components/Index/Music.vue'
import emitter from '@/utils/eventBus.js'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed, onMounted, reactive, watch } from 'vue'
import bg1 from '../assets/images/bgpicture/1.jpg'
import bg2 from '../assets/images/bgpicture/2.jpg'
import bg3 from '../assets/images/bgpicture/3.jpg'
import bg4 from '../assets/images/bgpicture/4.jpg'
const router = useRouter()
const store = useStore()

const data = reactive({
  isAdmin: false,
  Top: '',
  isTop: '',
  music: false,
  currenIndex: 0,
  timer: null,
  backgroundImage: bg1,
  // 把所有图片放到数组，用于获取下标来获取图片
  imgs: [bg1, bg2, bg3, bg4]
})
emitter.on('Music', msg => {
  data.music = msg
//   console.log(msg)
//   console.log(msg)
})
emitter.on('Top', msg => {
  data.Top = msg
//   console.log(msg)
})
emitter.on('Toc', msg => {
//   data.currenIndex = msg
  choose(msg)
//   console.log(msg)
})
function choose (para) {
  data.currenIndex = para
//   console.log(para)
}

function scrollTo (id) {
  // 绑定 toc 点击事件
  const node = document.querySelector('[data-id="' + id + '"]')
  if (!node) {
    return
  }
  node.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'nearest'
  })
}
// 跳转到后台管理
function goAdmin () {
//   data.isAdmin = true

  router.push('/admin/login')
  store.commit('isAdmin', true)
}

data.isAdmin = computed(() => {
//   return store.commit('isAdmin', true)
  return store.state.isAdmin
})

data.isTop = computed(() => {
//   return store.commit('isAdmin', true)
  return store.state.catelogue
})

watch(() => data.music, () => {
  if (data.music === true) {
    data.timer = setInterval(() => {
    // 随机一个整数，Math.random()*3是随机0到4的整数
      const name = Math.round(Math.random() * 3)
      // 把随机的图片重新放到backgroundImage
      data.backgroundImage = data.imgs[name]
    }, 10000)
  } else {
    clearInterval(data.timer)
  }
})
onMounted(() => {

})
</script>

<style lang='scss' scoped>
body,html{
    width: 100%;
    height: 100%;
}

#index{
    display: flex;
    flex-direction: column;
    width: 100%;
    .moon,.night {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: -1;
    }
    .night {
        background: url('../assets/images/night.gif') center;
    }
    .moon {
        // background: url('../assets/images/bgpicture/3.jpg') no-repeat;
        background-size: 100% 100%;
    }
}
.container{
    width: 1380px;
    margin: 0 auto;
    .content{
        display: flex;
        flex-direction: row;
        .catelogue{
             position: fixed;
            transition: all 1s;
            margin-top: 50px;
            width: 232px;
            height: 50%;
            min-height: 100vh;
            background-color: rgba($color: #f2f2f2, $alpha: 0.6);
            h2{
                text-align: center;
                font-size: 30px;
                line-height: 2.0;
                color: #848181;
            }
            .menu-title{
                color: rgb(0 91 183);
                line-height: 1.5;
                font-size: 20px;
                font-weight:600;
            }
            .active{
               background: #2b2c28;
            }
        }
        .left{
            position: fixed;
            transition: all 1s;
            margin-top: 50px;
            width: 232px;
            height: 100%;
            min-height: 100vh;
            background-color: rgba($color: #2b2c28, $alpha: 0.6);
            .info{
                height: 96px;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 15px;
                border-bottom: 2px solid #dae0de;
                .img{
                    margin-right: 15px;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    box-shadow: 0 0 5px #ccc;
                    overflow: hidden;
                    img{
                        width: 100%;
                        height: 100%;
                        transition: all 1s;
                    }
                    :hover{
                        transform: rotate(360deg);
                    }

                }
                .intro{
                    .name{
                        font-size: 14px;
                        margin-bottom: 5px;
                        color: lightblue;
                        font-weight: bold;
                    }
                    .desc{
                        color: #a0a0a0;
                        font-size: 12px;
                    }
                }
            }
            .scroll{
                top: 148px;
                bottom: 0;
                position: fixed;
                height: 100%;
                overflow-y: scroll;
                overflow-x: scroll;
            }
            .nav{
                position: relative;
                .navTitle{
                    height: 18px;
                    padding: 0 15px;
                    margin-top: 0px;
                    margin-bottom: 15px;
                    color: #a0a0a0;
                }
            }
            ::-webkit-scrollbar {
                display: none;
            }
            ::-webkit-scrollbar-thumb{
                display: none;
            }
        }
        .main{
            margin-top: 50px;
            margin-left: 232px;
            width: 900px;
            min-height: 100vh;
            position: relative;
            transition: all 1s;
            background-color: rgba($color: #f2f2f2, $alpha: 0.6);
            .header{
                height: 102px;
                width: 900px;
                padding: 20px;
                // background-color: #edeeea;
                h1{
                    font-weight: 700;
                }
                h3{
                    font-weight: 600;
                }
            }
            .router{
                width: 100%;
                padding: 10px;
                min-height: 95vh;
                box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
                background-color: rgba($color: #f2f2f2, $alpha: 0.6);
                animation: animate 2s;
            }
            .foot{
                // width: 96%;
                height: 36px;
                line-height: 36px;
                margin: 0 auto;
                text-align: center;
                background-color: rgba($color: #f2f2f2, $alpha: 0.6);
            }
        }
        .right{
            margin-top: 50px;
            // padding: 15px;
            background-color: rgba($color: #edeeea, $alpha: 0.6);
            width: 250px;
            font-size: 17px;
            ul{
                list-style: none;
            }
            .title{
                margin-bottom: 10px;
            }
            .recent{
                padding-top: 12px;
            }
            .aboutBlog{
                padding-top: 12px;
                .el-card{
                    background-color: rgba(222,222,222,0.6);
                }
            }
            .contact{
                padding-top: 12px;
            }
        }
    }
}

/* @media screen and (max-width:992px) {
    #index{
        overflow: hidden;
    }
} */

@media screen and (max-width:1200px) {
  .container{
    width: 100%;
    // overflow: hidden;
    position: relative;
    .content{
        height: 100%;
        .left{
            height: calc(100% - 52px);
            min-height: 100vh;
            position: fixed;
            .scroll{
                height: auto;
            }
        }
        .main{
            min-width: 100%;
            margin-left: 0;
        }
    }
    // .right{
    //     display: none;
    // }
  }
}

.el-menu-vertical-demo{
    background-color: rgba($color: #2b2c28, $alpha: 0.6);
    el-menu-item{
        background-color: rgba($color: #2b2c28, $alpha: 0.6);
    }
    el-menu-item:hover{
        background-color: rgba($color: #2b2c28, $alpha: 0.6);
    }
    .el-menu-item:focus, .el-menu-item:hover{
        background-color: rgba($color: #2b2c28, $alpha: 0.6);
    }
}

.router_content {
    animation: animate 2s;
}

@keyframes animate {
    0% { opacity: 0; transform: translateY(-50px);}
    100% { opacity: 1; transform: translateY(0);}
}

</style>
