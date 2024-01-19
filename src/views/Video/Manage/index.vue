<template>
  <section class="bg-slate-700 h-screen flex flex-col flex-nowrap">
    <PageHeader @back="onBack" class="p-5 flex-none">
      <template #content>视频管理</template>
    </PageHeader>
    <div 
      class="flex-1 grid overflow-hidden p-3" 
      ref="videoWrapRef"
      :style="gridStyle"
    >
      <el-card
        v-for="item in videoList"
        :key="item.name" 
        shadow="always" 
        class="flex justify-center items-center box-border"
      >
        {{ item.name }}
      </el-card>
      <el-card 
        @click="onAdd" 
        shadow="always" 
        class="flex justify-center items-center box-border"
      >
        <el-icon size="36"><Plus /></el-icon>
      </el-card>
    </div>
  </section>
</template>
<script setup>
import PageHeader from '@/components/PageHeader'
import {Plus} from '@element-plus/icons-vue'
import {computed,ref,onMounted,reactive} from 'vue'

const onBack = ()=>{
  console.log('onBack');
}
const videoWrapRef = ref(null)
const videoList = ref([
  
])

const onAdd = ()=>{
  videoList.value.push({
    name:videoList.value.length+1
  })
}
let wrapReact = reactive({
  width:100,
  height:100,
})
const getWrapSize = ()=>{
  const {width,height} = videoWrapRef.value.getBoundingClientRect()
  wrapReact.width = width - 24
  wrapReact.height = height - 24
}
onMounted(()=>{
  getWrapSize()
})

const getCols = (col,row=1) =>{
  if(col === 1 && row == 1) return 2
  const width = (wrapReact.width - (col - 1) * 10) / col
  const height = (wrapReact.height - (row - 1) * 10) / row
  if(width > height) return col
  return getCols(Math.ceil(col / 2),row+1)
}

const gridStyle = computed(()=>{
  const col = getCols(videoList.value.length)
  return {
    gap:'10px',
    gridTemplateColumns:`repeat(${col}, 1fr)`
  }
})

</script>
<style lang="scss">

.bg{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
</style>