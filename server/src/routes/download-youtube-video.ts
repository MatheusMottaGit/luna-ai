import { FastifyInstance } from "fastify";
import path from "path";
import ytdl from "ytdl-core";
import { z } from "zod";
import os from 'os'
import fs from 'fs'

export async function downloadVideoRoute(app: FastifyInstance) {
  app.get('/audio', async (request, reply) => {
    const paramsSchema = z.object({
      videoUrl: z.string()
    })

    const { videoUrl } = paramsSchema.parse(request.query)

    try {
      const videoInfo = await ytdl.getInfo(videoUrl)
      const videoTitle = videoInfo.videoDetails.title
      const desktopPath = path.join(os.homedir(), 'Desktop')

      const videoStream = ytdl(videoUrl, {
        quality: 'highestvideo'
      })

      videoStream.pipe(fs.createWriteStream(path.join(desktopPath, `${videoTitle}.mp4`)))

      videoStream
        .on('end', () => {
          reply.status(200).send({ message: 'Successfull download!' })
        })

    } catch (error) {
      console.log(error)
    }
  })
}