const {writeFile} = require('fs')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const ffmpeg = require('fluent-ffmpeg')
ffmpeg.setFfmpegPath(ffmpegPath)
const log = console.log

async function mergeVideos(arrayPathVideos,outputPath){
   return new Promise(async(resolve,reject)=>{
      await allVideosForMerge(arrayPathVideos)
      ffmpeg()
      .input('temp\\all videos.txt')
      .inputOption('-f concat')
      .inputOption('-safe 0')
      .outputOption('-c copy')
      .save(`${outputPath}`)
      .on('start',()=> log(`joining videos, wait ...`))
      .on('end',()=> resolve(log(`Video successfully created! \n Destiny: ${__dirname}/${outputPath}`)))
      .on('error',(err)=> reject(err))
   })

   async function allVideosForMerge(arrayPathVideos){
      let allPathVideos = arrayPathVideos.map(value => `file ${value}`).join('\n')
      await createTxt(allPathVideos)
   }

   async function createTxt(textToFile){
      return new Promise(resolve => writeFile('temp\\all videos.txt',textToFile,()=> resolve()))
   }
}

module.exports = mergeVideos