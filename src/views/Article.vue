<template>
  <div id="left">
    <el-card class="box-card">
        <div  class="clearfix">
            <h3><i class="iconfont icon-wenzhang"></i>文章列表</h3>
            <h3 style="float:right">共{{data.count}}篇</h3>
        </div>
        <div class="content" v-for="(item) in data.List" :key="item.id">
            <div class="img">

                <img :src="item.icon" alt="图片" @click="detailPage(item._id)">

            </div>
            <div class="text">
                <h2 class="title"><i class="iconfont icon-biezhen"></i> {{item.title}}</h2>
                <p class="desc"><span style="font-size:16px;font-weight:bold">文章简介：</span>{{item.brief}}</p>
                <div class="text-bottom">
                    <div class="creater">
                        <div class="img">
                        <img
                            :src="item.avatar"
                            alt="">
                        </div>
                        <span class="name"><i class="el-icon-user"></i>{{item.name}}</span>
                        <el-icon><Calendar /></el-icon>
                        <span class="time">{{dateFliter(item.createdAt) }}</span>
                        <!-- <span @click="changeLike(item.like_Star, item.id, index)"><i class="iconfont icon-dianzan"></i>{{item.like_Star}}</span> -->
                        <span><i class="iconfont icon-pinglun"></i>{{item.replyCount}} 条评论</span>
                        <span><i class="iconfont icon-zhiboguankanshu"></i>{{item.visited}}</span>
                    </div>
                    <div class="tag">
                        <el-tag><i class="iconfont icon-biaoqian" style="font-size:.8rem;margin-right:.5rem;"></i>{{item.categories[0].name}}</el-tag>
                    </div>
                </div>
            </div>
        </div>
        <div class="paginationWrap">
            <!-- <span>共 {{count}} 篇</span> -->
            <el-pagination
                class="pagination"
                background
                layout="total, prev, pager, next"
                :current-page='page'
                :page-size='pageSize'
                @current-change='handlePageChange'
                :total="count">
            </el-pagination>
        </div>

    </el-card>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { getArcticle } from '../request/api.js'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

// import Toc from '../plugins/Toc.js'
// import { marked } from 'marked'
import dayjs from 'dayjs'
const data = reactive({

  // 总文章数
  count: 0,
  // 文章列表
  List: [],
  // 每页数量
  pageSize: 3,
  // 页数
  currentPage: 1,
  // 点赞数量数组
  likes: [],
  // 标识是否为Category组件传来的
  isCategory: false,
  // 标识是否为Tag组件传来的
  isTag: false
})
const router = useRouter()
const getArcticles = async () => {
  const res = await getArcticle(data.currentPage)

  if (res.status === 200) {
    ElMessage({
      message: '获取文章列表成功！！！',
      type: 'success'
    })
    data.List = res.data.list
    data.page = res.data.totalPage
    data.count = res.data.totalArticles
    // console.log(res.data.list[0])
  } else {
    ElMessage({
      message: '网络出错了,(ノへ￣、)!',
      type: 'warning'
    })
  }
}
function detailPage (id) {
//   router.push(`/detail/${id}`)
//   router.push({ path: `/detail/${id}` })
  router.push({ name: 'detail', params: { id } }) // -> /user/123
}
const dateFliter = (val, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return dayjs(val).format(format)
}

onMounted(() => {
  getArcticles(data.currentPage)
})
</script>

<style lang='scss' scoped>
#left{
    // width: 100%;
  .box-card {
    width: 100%;
    background-color: rgba($color: #f2f2f2, $alpha: 0.6);
    h3{
        display: inline;
    }
    .content{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding-bottom: 1.25rem;
        border-bottom: 1px solid #f3f3f3;
        margin-bottom: 1.25rem;
        .img{
            width:15.625rem;
            margin-right: 1.875rem;
            border-radius: .5rem;
            overflow: hidden;
            cursor: pointer;
            // transition: all 1s;
            :hover{
                transition: all .3s;
                position: relative;
                top: -0.1875rem;
                left: -0.09375rem;
                box-shadow: 0rem 5px 10px 3px #ccc;
            }
            img{
                width: 100%;
            }
        }
        .text{
            width: 32rem;
            min-height: 14rem;
            position: relative;
            .title{
                display: block;
                margin-bottom: 1.25rem;
            }
            .desc{
                height: 6.25rem;
                font-size: 16px;
            }
            .text-bottom{
                width: 100%;
                position: absolute;
                bottom: 0;
                .creater{
                    margin-bottom: 1rem;
                    display: flex;
                    // justify-content: center;
                    align-items: center;
                    flex-wrap: wrap;
                    font-size: 14px;
                    i{
                        margin-right: 8px;
                    }
                    span{
                        font-size: 16px;
                        font-weight: bold;
                        margin-left: .5rem;
                        margin-right: .5rem;
                    }
                    .img{
                        // display: block;
                        width: 3rem;
                        height: 3rem;
                        border-radius: 50%;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .time{
                        display: block;
                        // flex: 1;
                        // width: 13.5rem;
                        margin-left: 2px;

                    }

                }
            }

        }
    }
    @media screen and (max-width: 768px) {
        .content{
            .img{
                width: 100%;
                margin-right: 0;
                margin: .8rem;
            }
            .text{
                .text-bottom{
                    position: relative;
                }
            }
        }
    }
  }
}
@media screen and (max-width: 768px) {
    #left{
        width: 100%;
        // margin: 1rem 0;
    }
}
.paginationWrap{

    .pagination{
        float: right;
        margin-bottom: 1rem;
    }

}

</style>
