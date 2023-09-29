import fastify from "fastify";
import cors from '@fastify/cors'
import { downloadVideoRoute } from "./routes/download-youtube-video";
import 'dotenv/config'

const app = fastify()

app.register(cors, {
  origin: '*'
})

app.register(downloadVideoRoute)

app.listen({
  port: 3333
}).then(() => {
  console.log('server running!')
})