<template>
    <el-main>
        <div class="result-wrap">
            <div class="result-inner">{{ randomText }}</div>
            <div @click="clickIcon" class="copy-icon">
                <el-icon :color="iconColor"><CopyDocument /></el-icon>
            </div>
        </div>
        <el-button @click="generateRandomNum" plain type="success" size="large">生成</el-button>
    </el-main>
</template>

<script setup>
import {ref} from 'vue'
import {CopyDocument} from "@element-plus/icons-vue"

const randomText = ref('')
const iconColor = ref('')
const clickIcon =()=>{
    iconColor.value = '#2E4F4F'
    navigator.clipboard.writeText(randomText.value)
    setTimeout(()=>{
        iconColor.value = ''
    },100)
}
const generateRandomNum = ()=>{
    randomText.value = Math.round(Math.random() * 10000000)
}

</script>

<style lang="scss" scoped>
.el-main{
    height: 100vh;
    background: $primary-1;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    gap: 20px;
}
.result-wrap{
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 18px;
    border: 1px solid $primary-4;
    border-radius: 6px;
    padding: 16px;
    color: $primary-4;
    user-select: none;
    cursor: pointer;
    font-size: 16px;
    // background: $primary-3;
}
</style>