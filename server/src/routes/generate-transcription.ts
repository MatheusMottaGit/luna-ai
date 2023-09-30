import { FastifyInstance } from "fastify";

export async function generateTranscriptionRoute(app: FastifyInstance) {
  app.post('video/:videoId/transcription', async (request) => {

  })
}