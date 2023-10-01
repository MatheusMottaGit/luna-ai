import fastify from "fastify";
import { downloadVideoRoute } from "./routes/download-youtube-video";
import 'dotenv/config'
import { uploadRoute } from "./routes/upload-video";
import { generateTranscriptionRoute } from "./routes/generate-transcription";
import { fastifyCors } from "@fastify/cors";

const app = fastify()

app.register(fastifyCors, {
  origin: '*'
})

app.register(downloadVideoRoute)
app.register(uploadRoute)
app.register(generateTranscriptionRoute)

app.listen({
  port: 3333
}).then(() => {
  console.log('server running!')
})