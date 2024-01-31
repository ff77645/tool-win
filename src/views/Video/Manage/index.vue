<template>
  <section class="bg-slate-700 h-screen flex flex-col flex-nowrap">
    <PageHeader @back="onBack" class="p-5 flex-none">
      <template #content>视频管理</template>
    </PageHeader>
    <div class="flex p-3 justify-between">
      <div class="flex gap-3">
        <el-icon @click="showFilesDrawer = !showFilesDrawer" size="26px">
          <Files />
        </el-icon>
        <el-popover placement="botto-end" :width="100" :visible="showGridPopover" :show-arrow="false">
          <template #reference>
            <el-icon @click="showGridPopover = !showGridPopover" size="26px">
              <Grid />
            </el-icon>
          </template>
          <ul class="flex flex-col gap-1">
            <li v-for="row in 5" :key="row">
              <ul class="flex gap-1">
                <li :class="layout.mcol >= col && layout.mrow >= row ? 'bg-blue-500' : 'bg-white'" class="w-6 h-6 rounded-sm" v-for="col in 5" :key="col" @mouseenter="mouseGrid(col, row)" @click="choodeGrid(col, row)"></li>
              </ul>
            </li>
          </ul>
        </el-popover>
      </div>
      <div class="flex flex-nowrap items-center gap-3"></div>
    </div>
    <div class="flex-1 grid overflow-hidden p-3" ref="videoWrapRef" :style="gridStyle">
      <el-card v-for="item in videoList" :key="item.name" shadow="always"
        class="flex justify-center items-center box-border">
        {{ item.name }}
      </el-card>
      <el-card @click="onAdd" shadow="always" class="flex justify-center items-center box-border">
        <el-icon size="36">
          <Plus />
        </el-icon>
      </el-card>
    </div>
  </section>
  <el-drawer
    v-model="showFilesDrawer"
    title="文件列表"
    direction="ltr"
  >
  <div class="h-full flex flex-col overflow-hidden">
    <div class="flex justify-between items-center">
      <div class=""></div>
      <div class="">
        <div class="" @click="toggleViewType">
          <el-icon size="25px" v-if="viewType === 'grid'"><Menu /></el-icon>
          <el-icon size="25px" v-else><Tickets /></el-icon>
        </div>
      </div>
    </div>
    <div class="flex-1 bg-slate-400 overflow-auto"></div>
  </div>
  </el-drawer>
</template>
<script setup>
import PageHeader from '@/components/PageHeader'
import { Plus } from '@element-plus/icons-vue'
import { computed, ref, onMounted, reactive } from 'vue'
import { Files, Grid,Tickets,Menu } from '@element-plus/icons-vue'


const showGridPopover = ref(false)
const showFilesDrawer = ref(false)
const viewType = ref('grid')

const videoWrapRef = ref(null)
const videoList = ref([])
const layout = reactive({
  col: 1,
  row: 1,
  mcol: 0,
  mrow: 0,
})

const gridStyle = computed(()=>{
  return {
    gridTemplateColumns: `repeat(${layout.col}, 1fr)`,
    gridTemplateRows: `repeat(${layout.row}, 1fr)`,
    gap:'12px'
  }
})
const mouseGrid = (col, row) => {
  layout.mcol = col
  layout.mrow = row
}

const choodeGrid = (col, row) => {
  layout.col = col
  layout.row = row
  showGridPopover.value = false
  layout.mcol = 0
  layout.mrow = 0
}
const toggleViewType = ()=>{
  viewType.value = viewType.value === 'grid' ? 'list' : 'grid'
}


const onAdd = () => {
  videoList.value.push({
    name: videoList.value.length + 1
  })
}
const onBack = () => {
  console.log('onBack');
}


</script>
<style lang="scss">
.bg {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
</style>