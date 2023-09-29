import { api } from '@/lib/api'
import { getFFmpeg } from '@/lib/ffmpeg'
import { fetchFile } from '@ffmpeg/util'
import { Upload, PencilRulerIcon } from 'lucide-react'
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from 'react'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'

interface VideoInputProps {
  onVideoUploaded: (videoId: string) => void
}

type Status = 'waiting' | 'converting' | 'uploading' | 'generating' | 'success'

const VideoInputForm = (props: VideoInputProps) => {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [status, setStatus] = useState<Status>('waiting')

  const promptInputRef = useRef<HTMLTextAreaElement>(null)

  function selectFile(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget

    if (!files) {
      return
    }

    const selectedFile = files[0]
    setVideoFile(selectedFile)
  }

  async function convertVideoToAudio(video: File) {
    const ffmpeg = await getFFmpeg()

    await ffmpeg.writeFile('input.mp4', await fetchFile(video))

    await ffmpeg.exec([
      '-i',
      'input.mp4',
      '-map',
      '0:a',
      '-b:a',
      '20k',
      '-acodec',
      'libmp3lame',
      'output.mp3'
    ])

    const data = await ffmpeg.readFile('output.mp3')
    const audioFileBlob = new Blob([data], { type: 'audio/mp3' })
    const audioFile = new File([audioFileBlob], 'output.mp3', {
      type: 'audio/mpeg'
    })

    return audioFile

  }

  async function handleUploadVideo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const prompt = promptInputRef.current?.value

    if (!videoFile) {
      return
    }

    setStatus('converting') //convertendo video em audio

    const audioFile = await convertVideoToAudio(videoFile)

    const data = new FormData()

    data.append('file', audioFile)

    setStatus('uploading')

    const response = await api.post('/videos', data)

    const videoId = response.data.video.id

    setStatus('generating')

    await api.post(`/videos/${videoId}/transcription`, {
      prompt
    })

    setStatus('success')

    props.onVideoUploaded(videoId)
  }

  const previewURL = useMemo(() => {
    if (!videoFile) {
      return null
    }

    return URL.createObjectURL(videoFile)
  }, [videoFile])

  return (
    <>
      <div className="space-y-2">
        <label htmlFor="video"
          className="relative border flex rounded-md aspect-video cursor-pointer border-dashed flex-col items-center justify-center gap-2 text-zinc-600 text-sm hover:bg-zinc-900 transition-all"
        >
          {previewURL ? (
            <video src={previewURL} controls={false} className="pointer-events-none absolute inset-0 rounded-md" />
          ) : (
            <>
              <Upload className="w-4 h-4" />
              Clique e insira o vídeo baixado aqui
            </>
          )}
        </label>
        <input type="file" id="video" accept="video/mp4" className="sr-only" onChange={selectFile} />
      </div>

      <form onSubmit={handleUploadVideo} className='flex flex-col flex-1 gap-2'>
        <Textarea
          className='h-full resize-none leading-relaxed'
          placeholder='Diga à Luna o que ela deve fazer com o seu conteúdo...'
          ref={promptInputRef}
        />

        <Button className='w-full font-bold' type='submit'>
          Executar
          <PencilRulerIcon className='w-4 h-4' />
        </Button>
      </form>
    </>
  )
}

export default VideoInputForm