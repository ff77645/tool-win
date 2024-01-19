<template>
  <section class="bg-slate-700 h-screen flex flex-col flex-nowrap">
    <PageHeader @back="onBack" class="p-5 flex-none">
      <template #content>图片压缩</template>
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
        v-if="videoList.length <= lay.total"
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
  {
    name:'1',
    src:''
  },
  {
    name:'2',
    src:''
  },
  {
    name:'3',
    src:''
  },
  {
    name:'4',
    src:''
  },
  {
    name:'5',
    src:''
  },
])

const onAdd = ()=>{
  videoList.value.push({
    name:videoList.value.length
  })
}



const layout = reactive({
  width:100,
  height:100,
  minWidth:100,
})
function cacleBoxSize(){
  let {width,height} = videoWrapRef.value.getBoundingClientRect()
  width -= 24
  height -= 24
  layout.minWidth = Math.floor((height - 10) / 2)
  layout.width = width
  layout.height = height
}
const lay = computed(()=>{
  const {width,minWidth} = layout
  let col = videoList.value.length
  let row = 1 
  if(width / col < minWidth) {
    row = 2
    col = Math.floor(col / 2)
  }
  return {
    col,
    row,
    total:col * row
  }
})

const gridStyle = computed(()=>{
  return {
    gridTemplateColumns:`repeat(${lay.value.col},minmax(${layout.minWidth}px,1fr))`,
    gridTemplateRows:`repeat(${lay.value.row},minmax(${layout.minWidth}px,1fr))`,
    gridGap:'10px'
  }
})

</script>