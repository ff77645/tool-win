<template>
    <el-main>
        <div 
            v-for="(item,index) in menuList" 
            :key="index" 
            class="menu-item"
            @click="navTo(item.path)"
        >
            {{ item.name }}
        </div>
    </el-main>
</template>
<script setup>
import {useRouter} from 'vue-router'
const router = useRouter()
const menuList = [
    {name:'图片压缩',path:'/img-compress'},
    {name:'随机数',path:'/random-number'},
    {name:'文件压缩',path:''},
    {name:'加密',path:''},
    {name:'操控游戏',path:''},
    {name:'日期计算',path:''},
]

const navTo = path =>{
    if(!path) return
    router.push(path)
}
</script>
<style scoped lang="scss">
.menu-item{
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-size: 14px;
    color: $text-color;
    border-radius: 10px;
    border: 1px solid $bg-color-2;
    cursor: pointer;
    user-select: none;
    background-color: $border-color;
}
.el-main{
    height: 100vh;
    background-color: $bg-color;
    display: flex;
    flex-flow: row nowrap;
    gap: 20px;
}
</style>