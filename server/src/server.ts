import fastify from "fastify";
import cors from '@fastify/cors'
import { videoRoutes } from "./routes/handle-video-routes";

const app = fastify()

app.register(cors, {
  origin: '*'
})

app.register(videoRoutes)

app.listen({
  port: 3333
}).then(() => {
  console.log('server running!')
})