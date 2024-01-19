<template>
  <el-tabs v-model="currentTab" type="border-card" stretch class="h-screen">
    <el-tab-pane label="图片" name="image">
      <div class="function-wrap">
        <el-card @click="handleNav(item.path)" class="text-sm text-center text-slate-500" shadow="hover" v-for="item in imageMenu" :key="item.name">
          {{ item.name }}
        </el-card>
      </div>
    </el-tab-pane>
    <el-tab-pane label="视频" name="video">
      <div class="function-wrap">
        <el-card @click="handleNav(item.path)" class="text-sm text-center text-slate-500" shadow="hover" v-for="item in videoMenu" :key="item.name">
          {{ item.name }}
        </el-card>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'


const currentTab = ref('image')

const router = useRouter()

const handleNav = path =>{
  router.push(path)
}

const imageMenu = [
  {
    name:'图片压缩',
    path:'/image/compress'
  }
]
const videoMenu = [
  {
    name:'视频管理',
    path:'/video/manage'
  }
]


</script>
<style lang="scss" scoped>
.function-wrap{
display: grid;
grid-template-columns: repeat(auto-fill,80px);
grid-template-rows: repeat(auto-fill,80px);
}
</style>