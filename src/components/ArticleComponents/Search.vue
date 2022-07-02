<template>
  <div id="search">
      <input v-model="searchValue" type="text" v-on:keyup.enter="emitToArticle" placeholder="输入关键词搜索...">
      <i class="el-icon-search" @click="emitToArticle"></i>
  </div>
</template>

<script>

</script>

<style lang="scss">
.shadow {background-color: #FFFFFF;box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);}
#search{
    display: flex;
    align-items: center;
    position: relative;
    width: 20%;
    // margin-bottom: 20px;
    input{
        width: 100%;
        height: 32px;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 20px;
        padding: 6px 0;
        text-indent: 10px;
        outline: none;
    }
    i{
        cursor: pointer;
        font-size: 20px;
        position: absolute;
        right: 16px;
    }
}
</style>
