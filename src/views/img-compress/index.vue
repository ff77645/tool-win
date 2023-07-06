<template>
    <el-main class="img-compress">
        <el-row justify="space-between">
            <div>
                <el-button @click="selectFiles">选择文件</el-button>
                <el-button @click="selectDirectory">选择目录</el-button>
                <el-button @click="selectSaveDirectory">选择保存路径</el-button>
                <span v-if="saveDirectory">保存路径：{{ saveDirectory }}</span>
            </div>
            <div>
                <el-button @click="compressStart">开始压缩</el-button>
            </div>
        </el-row>
        <el-table
            :data="fileList"
        >   
            <el-table-column 
                label="图片"
                v-slot="{row}"
            >
                <el-image class="thum-img" :z-index="100" :src="row.src" hide-on-click-modal preview-teleported :preview-src-list="[row.src]"></el-image>
            </el-table-column>
            <el-table-column label="压缩前(B)" prop="size"></el-table-column>
            <el-table-column label="压缩后(B)" v-slot="{row}">
                <div v-if="row.size_after">{{row.size_after}},<span style="color: red;">减小{{row.comp_zise}}</span></div>
            </el-table-column>
            <el-table-column 
                v-for="item in tableProps" 
                :key="item.prop"
                :prop="item.prop"
                :label="item.title"
            ></el-table-column>
            <el-table-column 
                label="操作"
                v-slot="{$index}"
            >
                <el-button @click="deleteFile($index)" size="small" type="danger">删除</el-button>
            </el-table-column>
        </el-table>

    </el-main>
</template>
<script setup>
/* 
step:

选择文件:   1.选择单个文件(可多选)  2.选择目录

配置:
    1.是否覆盖原文件
        fals:新文件存放路径
    2.压缩速度或者比例

开始压缩
*/
import {ref} from 'vue'
import {tableProps} from './helper'


const fileList = ref([])

const appendFiles = filesPath =>{
    if(!filesPath.length) return
    filesPath.forEach(async src=>{
        const data = await electron.extractMetadata(src)
        console.log({data})
        const size_fmt = (data.size / 1024).toFixed(2)
        const name = src.split('\\').at(-1)
        fileList.value.push({
            src:'image://'+src,
            path:src,
            name,
            size:data.size,
            size_fmt,
        })
    })
    console.log({fileList:fileList.value});
}

const deleteFile = index =>{
    fileList.value.splice(index,1)
}

const saveDirectory = ref('')
const selectSaveDirectory =async  ()=>{
    const [directory] = await electron.showOpenDialog({
        title:'选择文件夹',
        properties:[
            'openDirectory'
        ]
    })
    if(!directory) return
    console.log({directory})
    saveDirectory.value = directory
}

const selectDirectory = async ()=>{
    const [path] = await electron.showOpenDialog({
        title:'选择文件夹',
        properties:[
            'openDirectory'
        ]
    })
    console.log({path})
    if(!path) return
    const regx = /\.(JPEG|PNG|WebP|GIF|AVIF|TIFF|SVG)$/i
    const files = await electron.fsReaddir(path)
    appendFiles(files.filter(i=>regx.test(i)).map(i=>path+'\\'+i))
}

const selectFiles = async ()=>{
    const files = await electron.showOpenDialog({
        title:'选择图片',
        filters:[
            {
                name:'img',
                extensions:["JPEG","PNG",'WebP','GIF','AVIF','TIFF','SVG']
            }
        ],
        properties:[
            'multiSelections',
        ]
    })
    console.log({files})
    appendFiles(files)
}

const compressStart = async ()=>{
    const input = fileList.value[0].path
    const output = saveDirectory.value || 'C:\\Users\\53281\\Pictures\\compress'
    console.log({
        input,
        output
    })
    if(!output || !input) return
    fileList.value.forEach(async i=>{
        i.output = output + '\\' + i.name
        i.type = i.name.split('.').at(-1).toLowerCase()
        const res = await electron.compressImg(JSON.stringify([i]))
        console.log({res});
        i.size_after = res.size
        i.comp_zise = ((res.o_size - res.size) / 1024).toFixed(2)
    })
    for(let i=0;i<fileList.value.length;i++){
        const file = fileList.value[i]
        file.output = output + '\\' + file.name
        file.type = file.name.split('.').at(-1).toLowerCase()
        const [res] = await electron.compressImg(JSON.stringify([file]))
        fileList.value[i].size_after = res.size
        fileList.value[i].comp_zise = ((res.o_size - res.size) / 1024).toFixed(2)
    }
    console.log({fileList:fileList.value})
}
</script>
<style lang="scss" scoped>
.thum-img{
    width: 100px;
    height: 100px;
    border-radius: 3px;
    object-position: center;
    object-fit: cover;
}
</style>