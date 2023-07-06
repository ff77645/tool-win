const sharp = require('sharp')


const defaultOptions = {
    jpeg:{
        // 1-100
        quality:80,
    },
    png:{
        // 0-9
        // progressive:true,
        // compressionLevel:9,
        // adaptiveFiltering:true,
        // mozjpeg:true,
        palette:true,
        quality:10
    },
    webp:{
        // 1-100
        quality:80,
        // 无损压缩
        lossless:false,        
    }
}

async function handle(file){
    return new Promise((resolve,reject)=>{
        sharp(file.path)[file.type](defaultOptions[file.type]).toFile(file.output,(err,info)=>{
            resolve(err ? {err} : {
                ...info,
                name:file.name,
                o_size:file.size,
                input:file.path,
                output:file.output,
            })
        })
    })
}

export async function compressImg(files){
    const l = files.length
    const results = []
    for(let i = 0;i<l;i++){
        results.push(await handle(files[i]))
    }
    return results
}
