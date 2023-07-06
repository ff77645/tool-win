const sharp = require('sharp')

async function main(){
    // 4,420,115
    sharp('C:\\Users\\53281\\Pictures\\6a600c338744ebf8ae22d946d6f9d72a6059a77c.png')
    .png(
        {
            // progressive:true,
            compressionLevel:9,
            // adaptiveFiltering:true,
            // mozjpeg:true,
            quality:20
        }
    )
    .toFile('test1.png',(err,info)=>{
        if(err) return
        console.log(info);
        console.log(4420115 - info.size)
    })
}

main()