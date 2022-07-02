<template>

        <div id="music" ref="music">
      <div class="img" ref="img" @click="showControl">
          <img :src="data.img[data.id]" alt="图片" ref="img1" :class="!data.isPlaying?'rotate':''">
      </div>
      <div class="main">
          <div class="text">
              <span class="name">{{data.lyric[data.id]}}</span>
              <span class="artist">-{{data.auth[data.id]}}</span>
          </div>
          <div class="font">
             <div class="icon1">
               <el-icon @click="lastSong"><CaretLeft /></el-icon>
               <el-icon v-if="data.isPlaying"  @click=playMusic(data.isPlaying)> <VideoPlay /></el-icon>
               <el-icon v-else @click=playMusic(data.isPlaying)><VideoPause /></el-icon>
              <el-icon @click="nextSong" ><CaretRight /></el-icon>
             </div>
             <div class="slider">
              <!-- <el-icon size="10"><Mic /></el-icon> -->
              <!-- <i>volume</i> -->
              <el-slider v-model="data.volume"  size="small" @change="changeVolume"></el-slider>
             </div>
          </div>
      </div>

  </div>
  <audio  :src="data.url[data.id]" ref="music"  autoplay  @ended="audioFinished">
      </audio>

</template>

<script setup>
import axios from 'axios'
import { onMounted, reactive, ref } from 'vue'
import emitter from '@/utils/eventBus.js'

const data = reactive({
  isPlaying: true,
  url: [],
  img: [],
  lyric: [],
  auth: [],
  id: 1,
  volume: 50

})

const music = ref(null)

const getMusic = async () => {
  const res = await axios.get('/api/web/api/music')
  // console.log(res.data)
  data.url = res.data[0]
  data.img = res.data[1]
  data.lyric = res.data[2]
  data.auth = res.data[3]
}

function changeVolume (val) {
  data.volume = val
  music.value.pause()
  music.value.volume = data.volume / 100
  music.value.play()
}
function lastSong () {
  if (data.id === 0) {
    data.id = data.url.length - 1
    // music.value.pause()

    playMusic(true)
  } else {
    data.id = data.id - 1

    playMusic(true)
  }
}
function nextSong () {
  if (data.id < data.url.length - 1) {
    data.id = data.id + 1
    playMusic(true)
  } else {
    data.id = 0
    playMusic(true)
  }
}
function audioFinished () {
  if (data.id < data.url.length - 1) {
    data.id++
    playMusic(true)
  } else {
    data.id = 0
    playMusic(true)
  }
}
function playMusic (val) {
  if (val) {
    music.value.volume = data.volume / 100
    music.value.play()
    data.isPlaying = false
    emitter.emit('Music', true)
  } else {
    music.value.pause()
    data.isPlaying = true
    emitter.emit('Music', false)
  }
}
onMounted(() => {
  getMusic()
})

</script>

<style lang='scss' scoped>

#music{
    position: fixed;
    bottom: 50px;
    right: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    transition: all 1.2s;
    .img{
        width: 50px;
        height: 50px;
        border-top-left-radius: 50%;
        border-bottom-left-radius: 50%;
        overflow: hidden;
        padding: 5px;
        // margin-right: 15px;
        box-shadow: 0 0 5px #ccc;
        // background-color: rgba($color: #2b2c28, $alpha: 0.6);
        background-color: #2b2c28;
        img{
            border-radius: 50%;
            width: 100%;
            // height: 100%;
        }
    }
    .main{
        height: 100%;
        padding-right: 8px;
        width: 150px;
        // background-color: rgba($color: #2b2c28, $alpha: 0.6);
        background-color: #2b2c28;
        .text{
            margin-bottom: 5px;
            text-align: center;
        }
        .name{
            margin-right: 8px;
            font-size: 14px;
            color: #A6A8B1;
        }
        .artist{
            font-size: 12px;
            color: #666;
        }
    }
    .font{
      display: flex;
        i{
            cursor: pointer;
            font-size: 20px;
            margin: 0 0px;
            color: #A6A8B1;
            display: inline;
         .el-icon{
            padding-top: 2px;
        }
        .icon1{
          margin-right: 10px;
        }
        }
      .slider{
        // display: flex;
        // flex-direction:column;
        flex:2;
        margin-left: 10px;
        // position:relative;
            i{
          font-size: 0.5px;
          position:absolute;
          left: 4x;
          top: -10px;
        }
        .el-slider{

        }
      }
    }
}
@keyframes myRotate {
    0% { transform: rotate(0deg);}
    100% { transform: rotate(360deg);}
}
@-webkit-keyframes myRotate {
    0% { transform: rotate(0deg);}
    100% { transform: rotate(360deg);}
}
// 旋转类
.rotate{
    animation: myRotate 8s infinite linear;
}
</style>
