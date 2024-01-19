<template>
  <section class="bg-slate-700 h-screen flex flex-col flex-nowrap">
    <PageHeader @back="onBack" class="p-5 flex-none">
      <template #content>视频管理</template>
    </PageHeader>
    <div class="flex p-3 justify-between">
      <div class=""></div>
      <div class="flex flex-nowrap items-center">
        <el-select
          v-model="layout.row"
          size="small"
          style="width: 50px"
        >
          <el-option
            v-for="i in 10"
            :key="i"
            :label="i"
            :value="i"
          />
        </el-select>
      </div>
    </div>
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
const videoList = ref([])
const layout = reactive({
  col:1,
  row:1,
})

const onAdd = ()=>{
  videoList.value.push({
    name:videoList.value.length+1
  })
}


</script>
<style lang="scss">

.bg{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
</style>