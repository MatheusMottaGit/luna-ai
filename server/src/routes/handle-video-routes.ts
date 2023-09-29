import { FastifyInstance } from "fastify";
import { z } from "zod";
import fs from 'node:fs';
import ytdl from "ytdl-core";
import ffmpeg from 'fluent-ffmpeg'
import ffmpegStatic from 'ffmpeg-static'
import { openai } from "../lib/openai";

export async function videoRoutes(app: FastifyInstance) {
  app.get('/audio', async (request, reply) => {
    const paramsSchema = z.object({
      youtubeVideoId: z.string()
    })

    const { youtubeVideoId } = paramsSchema.parse(request.query)

    const download = () => new Promise<void>((resolve, reject) => {
      const videoURL = `https://www.youtube.com/embed/${youtubeVideoId}`

      console.log('[DOWNLOAD_STARTED]')

      ytdl(videoURL, {
        quality: 'lowestaudio',
        filter: 'audioonly'
      })
        .on('end', () => {
          console.log('[SUCESSFULL_DOWNLOAD]')
          resolve()
        })
        .on('error', () => {
          console.log('[DOWNLOAD_FAILED]')
          reject()
        })
        .pipe(fs.createWriteStream('videos/output.mp4'))
    })

    const convertVideoToAudio = () => new Promise<void>((resolve, reject) => {
      ffmpeg.setFfmpegPath(ffmpegStatic as string)

      console.log('[CONVERSION_STARTED]')

      ffmpeg()
        .input('videos/output.mp4')
        .outputOptions('-ab', '64k')
        .saveToFile('videos/output.mp3')
        .on('end', () => {
          console.log('[CONVERSION_FINISHED]')
          resolve()
        })
        .on('error', (error) => {
          console.log(error)
          reject()
        })
    })

    const generateTranscription = () => new Promise<void>((resolve, reject) => {
      openai.audio.transcriptions.create({
        file: fs.createReadStream('videos/output.mp3'),
        model: 'whisper-1',
      })
        .then(response => {
          console.log('[TRANSCRIPTION_STARTED]')

          const transcription = response.text
          console.log(transcription.slice(0, 220).concat('...'))
          resolve()
        })
        .catch(err => {
          console.log(err)
          reject()
        })
    })

    await download()
    await convertVideoToAudio()
    await generateTranscription()
  })
}