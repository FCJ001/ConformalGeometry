<template>
  <div id="articleManage">
      <h2>文章管理</h2>
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        >
        <el-table-column
        label="文章标题"
        style="width: 30%">
        <template v-slot="scope">
            <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </template>
        </el-table-column>
        <el-table-column
        label="文章简介"
        style="width: 30%">
        <template v-slot="scope">
            <span style="margin-left: 10px">{{ scope.row.brief }}</span>
        </template>
        </el-table-column>
        <el-table-column
        label="文章分类"
        style="width: 30%">
        <template v-slot="scope">
            <span style="margin-left: 10px">{{ scope.row.category }}</span>
        </template>
        </el-table-column>
        <el-table-column
        label="操作"
        style="width: 10%"
        width="180"
        >
        <template v-slot="scope">
            <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.article_id)">删除</el-button>
        </template>
        </el-table-column>
      </el-table>
      <div class="pagination" style="margin-top:2rem">
          <el-pagination
            background
            :page-size='3'
            layout="prev, pager, next"
            @current-change='PageChange'
            :total="count">
          </el-pagination>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      count: 0,
      page: 1,
      pageSize: 3
    }
  }

}

</script>

<style lang='scss' scoped>
#articleManage{
    padding-top: 4rem;
    padding-right: 15rem;
    position: relative;
    z-index: 99;
    h2{
        margin-bottom: 1rem;
    }
}
</style>
