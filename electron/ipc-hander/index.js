import {readdir} from 'fs/promises'
import {statSync} from 'fs'
import {dialog} from 'electron'
import {compressImg as compressImgFn} from '../utils'

export const showOpenDialog = async (event,opts)=>{
    const { canceled,filePaths } = await dialog.showOpenDialog(opts || {})
    if(canceled) return []
    return filePaths
}

export const fsReaddir = (event,path) =>readdir(path)

export const extractMetadata = (event,path) => statSync(path)

export const extractImgForDir = async (event,path) =>{
    const files = await readdir(path)
    const regx = /\.(JPEG|PNG|WebP|GIF|AVIF|TIFF|SVG)$/i
    return files.filter(i=>regx.test(i)).map(i=>{

    })

}

export const compressImg = (event,files) => {
    files = JSON.parse(files)
    return compressImgFn(files)
}